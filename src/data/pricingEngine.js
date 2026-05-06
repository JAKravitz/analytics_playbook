/**
 * pricingEngine.js
 * Pilot pricing: per-layer base $/km², global pilot fraction, contract quarters,
 * per-layer billing cadence (weekly / monthly / quarterly), AOI volume brackets,
 * and optional client ground-truth discount + fixed Pixxel GT fee.
 */

export const LAYER_BILLING_CADENCE = ['quarterly', 'monthly', 'weekly'];

/** Billable deliveries of the layer per calendar quarter for each cadence. */
export const CADENCE_PER_QUARTER = {
  quarterly: 1,
  monthly: 3,
  weekly: 13,
};

export const DEFAULT_PILOT_FRACTION = 0.9;

function volumeLookup(aoiKm2, brackets) {
  let discount = 0;
  for (const b of brackets) {
    if (aoiKm2 >= b.min) discount = b.discount;
    else break;
  }
  return discount;
}

/**
 * Global multipliers applied to each line’s post–early-discount subtotal.
 * (Minimum AOI surcharge × volume discount.)
 */
export function deriveMultipliers(inp) {
  let earlyFactor;
  switch (inp.earlyDiscountType) {
    case 'Early Adopter (10%)':
      earlyFactor = 0.9;
      break;
    case 'Strategic Partner (15%)':
      earlyFactor = 0.85;
      break;
    case 'Custom':
      earlyFactor = 1 - Math.max(0, Math.min(1, inp.customDiscountPct ?? 0));
      break;
    default:
      earlyFactor = 1.0;
  }

  const minAoiMult =
    (inp.aoiKm2 ?? 0) < (inp.minAoiThreshold ?? 0) ? 1 + (inp.minAoiSurcharge ?? 0) : 1;

  const volumeDiscount = volumeLookup(inp.aoiKm2 ?? 0, inp.volumeBrackets ?? []);
  const volumeDiscFactor = 1 - volumeDiscount;

  const totalAddonFactor = minAoiMult * volumeDiscFactor;

  return {
    earlyFactor,
    minAoiMult,
    volumeDiscFactor,
    volumeDiscount,
    totalAddonFactor,
  };
}

function cadenceFactor(cadence) {
  return CADENCE_PER_QUARTER[cadence] ?? CADENCE_PER_QUARTER.quarterly;
}

/**
 * @param {object} line  { include, baseUsdPerKm2, billingCadence? }
 * @param {object} inputs  global inputs
 * @param {object} mults  from deriveMultipliers
 */
export function computeLine(line, inputs, mults) {
  const zero = {
    pilotFraction: 0,
    pilotRate: 0,
    effectiveRate: 0,
    preAddonUsd: 0,
    postAddonUsd: 0,
    localCurrency: 0,
    cadenceFactor: 0,
    quarters: 0,
  };
  if (!line.include) {
    return zero;
  }

  const pilotFraction = inputs.pilotFraction ?? DEFAULT_PILOT_FRACTION;
  const pilotRate = (line.baseUsdPerKm2 ?? 0) * pilotFraction;
  const effectiveRate = pilotRate * mults.earlyFactor;

  const quarters = Math.max(1, Math.floor(inputs.quarters ?? 1));
  const cq = cadenceFactor(line.billingCadence || 'quarterly');
  const preAddonUsd = effectiveRate * (inputs.aoiKm2 ?? 0) * quarters * cq;
  const postAddonUsd = preAddonUsd * mults.totalAddonFactor;
  const localCurrency = postAddonUsd * (inputs.fxRate ?? 1);

  return {
    pilotFraction,
    pilotRate,
    effectiveRate,
    preAddonUsd,
    postAddonUsd,
    localCurrency,
    cadenceFactor: cq,
    quarters,
  };
}

/**
 * @param {object} inputs
 * @param {Array} lines
 */
export function computeQuote(inputs, lines) {
  const mults = deriveMultipliers(inputs);
  const computedLines = (lines ?? []).map((l) => ({
    ...l,
    _calc: computeLine(l, inputs, mults),
  }));

  const totalPreAddonUsd = computedLines.reduce((s, l) => s + l._calc.preAddonUsd, 0);
  const subtotalAfterVolumeMinAoi = computedLines.reduce((s, l) => s + l._calc.postAddonUsd, 0);

  const gtClientDiscountPct = Math.max(0, Math.min(1, inputs.gtClientDiscountPct ?? 0));
  let subtotalAfterClientGt = subtotalAfterVolumeMinAoi;
  if (inputs.gtClient) {
    subtotalAfterClientGt *= 1 - gtClientDiscountPct;
  }

  const gtPixxelFee = inputs.gtPixxel ? Math.max(0, inputs.gtPixxelFeeUsd ?? 0) : 0;
  const totalUsd = subtotalAfterClientGt + gtPixxelFee;
  const totalLocal = totalUsd * (inputs.fxRate ?? 1);

  const aoi = inputs.aoiKm2 ?? 0;
  const quarters = Math.max(1, Math.floor(inputs.quarters ?? 1));
  const denom = aoi * quarters;
  const blendedPreAddonRate = denom > 0 ? totalPreAddonUsd / denom : 0;
  const blendedPostAddonRate = denom > 0 ? subtotalAfterClientGt / denom : 0;

  return {
    mults,
    lines: computedLines,
    totalPreAddonUsd,
    subtotalAfterVolumeMinAoi,
    subtotalAfterClientGt,
    gtPixxelFee,
    blendedPreAddonRate,
    blendedPostAddonRate,
    totalUsd,
    totalLocal,
  };
}

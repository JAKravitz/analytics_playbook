/**
 * Pilot proposal pricing — sourced from product Pricing tabs (IaaS + Aurora).
 * Single source of truth: tracePricing, swipePricing, scopePricing.
 */

import { tracePricing } from './products/pricing/trace.js';
import { swipePricing } from './products/pricing/swipe.js';
import { scopePricing } from './products/pricing/scope.js';
import { pricingMultipliers } from './productPricingShared.js';

export { pricingMultipliers };

const BY_VERTICAL = {
  Agriculture: tracePricing,
  Water: swipePricing,
  Geology: scopePricing,
};

export function getPilotPricing(vertical) {
  return BY_VERTICAL[vertical] ?? null;
}

/** Scale dollar amounts in fee strings (flat or base + $/km²). */
export function scaleFeeString(fee, multiplier = 1) {
  if (!fee || multiplier === 1) return fee;
  if (/custom/i.test(fee)) return fee;
  return fee.replace(/\$([\d,]+(?:\.\d+)?)/g, (_, n) => {
    const val = parseFloat(n.replace(/,/g, ''));
    const scaled = Math.round(val * multiplier * 100) / 100;
    const fmt = Number.isInteger(scaled)
      ? scaled.toLocaleString('en-US')
      : scaled.toFixed(2).replace(/\.?0+$/, '');
    return `$${fmt}`;
  });
}

export function getScaledIaasPricing(vertical, regionalMultiplier = 1) {
  const product = getPilotPricing(vertical);
  if (!product) return null;
  const ap = product.iaas.areaPricing;
  return {
    title: product.iaas.title,
    headline: product.iaas.headline,
    lede: product.iaas.lede,
    headers: ap.headers,
    rows:
      regionalMultiplier === 1
        ? ap.rows
        : ap.rows.map(([band, fee]) => [band, scaleFeeString(fee, regionalMultiplier)]),
    formulaNote: ap.formulaNote,
    deliverables: product.iaas.deliverables,
    notIncluded: product.iaas.notIncluded,
    notes: product.iaas.notes,
  };
}

export function getScaledAuroraPricing(vertical, regionalMultiplier = 1) {
  const product = getPilotPricing(vertical);
  if (!product) return null;
  const sub = product.aurora.subscriptionPricing;
  return {
    headline: product.aurora.headline,
    lede: product.aurora.lede,
    cadenceNote: product.aurora.cadenceNote,
    headers: sub.headers,
    rows:
      regionalMultiplier === 1
        ? sub.rows
        : sub.rows.map((row) => [
            row[0],
            ...row.slice(1).map((cell) => scaleFeeString(cell, regionalMultiplier)),
          ]),
  };
}

/** Sensor-tier multiplier for monitoring pilots (Geology is HSI-only at 1.0×). */
export function sensorMultiplier(sensorTier) {
  if (sensorTier === 'msi') return 0.8;
  if (sensorTier === 'honeybee') return 1.5;
  return 1.0;
}

export const SENSOR_TIER_OPTIONS = [
  { id: 'hsi', label: 'Hyperspectral · Firefly VNIR (1.0×)', mult: 1.0 },
  { id: 'msi', label: 'Multispectral · MSI archive only (0.80×)', mult: 0.8 },
  { id: 'honeybee', label: 'VNIR–SWIR · Honeybee (1.5×)', mult: 1.5, disabledFor: ['Geology'] },
];

export const EARLY_ADOPTER_OPTIONS = [
  { id: 'none', label: 'None · list price (1.0×)', mult: 1.0 },
  { id: 'early-adopter', label: 'Early adopter — first IaaS (15% off · 0.85×)', mult: 0.85 },
  {
    id: 'design-partner',
    label: 'Design partner / strategic (20% off · 0.80×)',
    mult: 0.8,
    requiresApproval: true,
  },
];

export function earlyAdopterMultiplier(id) {
  return EARLY_ADOPTER_OPTIONS.find((o) => o.id === id)?.mult ?? 1;
}

const MONITORING_VERTICALS = new Set(['Agriculture', 'Water']);

/** Combined multiplier stack: regional × sensor (monitoring only) × early adopter. */
export function computeProposalFeeMultiplier({
  vertical,
  regionalMultiplier = 1,
  sensorTierId = 'hsi',
  earlyAdopterId = 'none',
}) {
  const sensor = MONITORING_VERTICALS.has(vertical) ? sensorMultiplier(sensorTierId) : 1;
  const earlyAdopter = earlyAdopterMultiplier(earlyAdopterId);
  const regional = regionalMultiplier ?? 1;
  return {
    regional,
    sensor,
    earlyAdopter,
    combined: regional * sensor * earlyAdopter,
  };
}

/** AOI size bands from the product IaaS pricing table. */
export function getAoiBandOptions(vertical) {
  const product = getPilotPricing(vertical);
  if (!product) return [];
  return product.iaas.areaPricing.rows.map(([label, listFee], index) => {
    const parsed = parseFeeFormula(listFee);
    return {
      id: index,
      label,
      listFee,
      isFlat: parsed.type === 'flat',
      isCustom: parsed.type === 'custom',
    };
  });
}

export function parseFeeFormula(fee) {
  if (!fee) return { type: 'unknown', raw: fee };
  const flat = fee.match(/^\$([\d,]+(?:\.\d+)?)\s*flat/i);
  if (flat) {
    return { type: 'flat', amount: parseFloat(flat[1].replace(/,/g, '')) };
  }
  const perKm = fee.match(/\$([\d.]+)\/km²/i);
  const base = fee.match(/\+\s*\$([\d,]+)\s*base/i);
  if (perKm && base) {
    return {
      type: 'perKm',
      perKm: parseFloat(perKm[1]),
      base: parseFloat(base[1].replace(/,/g, '')),
    };
  }
  if (/custom/i.test(fee)) return { type: 'custom' };
  return { type: 'unknown', raw: fee };
}

/** Representative km² for formula bands when customer km² is not entered. */
export function bandRepresentativeKm2(label) {
  const upTo = label.match(/up to\s*([\d,]+)\s*km/i);
  if (upTo) return parseFloat(upTo[1].replace(/,/g, ''));

  const range = label.match(/([\d,]+)\s*[–-]\s*([\d,]+)\s*km/i);
  if (range) {
    const lo = parseFloat(range[1].replace(/,/g, ''));
    const hi = parseFloat(range[2].replace(/,/g, ''));
    return (lo + hi) / 2;
  }

  const plus = label.match(/([\d,]+)\+\s*km/i);
  if (plus) return parseFloat(plus[1].replace(/,/g, ''));

  return null;
}

/** List-price USD for a band before multipliers (null = custom / unknown). */
export function computeBandListFee(listFee, bandLabel, km2) {
  const parsed = parseFeeFormula(listFee);
  if (parsed.type === 'flat') return parsed.amount;
  if (parsed.type === 'perKm') {
    const km =
      km2 != null && !Number.isNaN(km2) && km2 > 0
        ? km2
        : bandRepresentativeKm2(bandLabel);
    if (km == null) return null;
    return parsed.base + parsed.perKm * km;
  }
  return null;
}

export function formatProposalUsd(amount) {
  if (amount == null || Number.isNaN(amount)) return 'Custom — commercial review';
  return `$${Math.round(amount).toLocaleString('en-US')}`;
}

/**
 * Quote for a selected AOI band with all multipliers applied.
 * @returns {{ bandLabel, listFeeText, listAmount, effectiveAmount, km2Used, km2IsEstimate }}
 */
export function quoteSelectedAoiBand({
  vertical,
  bandIndex,
  km2,
  regionalMultiplier = 1,
  sensorTierId = 'hsi',
  earlyAdopterId = 'none',
}) {
  const bands = getAoiBandOptions(vertical);
  const band = bands[bandIndex] ?? bands[0];
  if (!band) return null;

  const parsed = parseFeeFormula(band.listFee);
  const km2Num = km2 === '' || km2 == null ? null : Number(km2);
  const km2Used =
    parsed.type === 'perKm'
      ? km2Num != null && !Number.isNaN(km2Num) && km2Num > 0
        ? km2Num
        : bandRepresentativeKm2(band.label)
      : null;

  const listAmount = computeBandListFee(band.listFee, band.label, km2Used);
  const mult = computeProposalFeeMultiplier({
    vertical,
    regionalMultiplier,
    sensorTierId,
    earlyAdopterId,
  });
  const effectiveAmount =
    listAmount != null ? Math.round(listAmount * mult.combined) : null;

  const listFeeText =
    parsed.type === 'perKm' && km2Used != null
      ? `${formatProposalUsd(listAmount)} (${band.listFee} @ ${km2Used.toLocaleString('en-US')} km²)`
      : band.listFee;

  return {
    bandLabel: band.label,
    listFeeText,
    listAmount,
    effectiveAmount,
    km2Used,
    km2IsEstimate: parsed.type === 'perKm' && (km2Num == null || Number.isNaN(km2Num) || km2Num <= 0),
    combinedMultiplier: mult.combined,
  };
}

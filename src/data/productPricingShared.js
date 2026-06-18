/**
 * Shared commercial pricing — base + $/km² IaaS bands + Aurora subscription matrix.
 */

import { regionalPricingTiers } from './regionalPricingTiers.js';

export { regionalPricingTiers };

export const PRICING_DISCLAIMER =
  'All fees are indicative placeholders for internal scoping. Apply regional, sensor-tier, and early-adopter multipliers below. Validate against compute cost before presenting to any prospect.';

export const TWO_MODELS_INTRO =
  'Two commercial paths. Insights as a Service is a fixed-scope validation engagement — Pixxel delivers analysis-ready layers for your AOI on defined dates (the commercial equivalent of a pilot). Aurora subscription is ongoing platform access with the full product capability set; price depends only on how often layers refresh and how large your AOI is.';

export const IAAS_LEDE =
  'A scoped analytical engagement: we run the product pipeline over your AOI and deliver maps, vectors, and optional API handoff. This is the validation path before Aurora — fixed scope, analyst-produced deliverables, operationally available layers only. Priced by AOI size: a flat fee below the threshold band, or a base engagement fee plus $/km² above it — per-km² rates step down at volume.';

/** Pixxel AOI bands — shared by Aurora subscription on every product. */
export const AOI_BANDS = [
  'Up to 600 km²',
  '600–3,000 km²',
  '3,000–12,000 km²',
  '12,000+ km²',
];

export const AURORA_CADENCES = ['Quarterly refresh', 'Monthly refresh', 'Weekly refresh'];

export const AURORA_LEDE =
  'Self-service in Aurora with the complete product capability set on every plan. Choose refresh cadence (quarterly, monthly, or weekly) and AOI band; all tiers include the same layers, dashboards, copilot, workflows, and supplementary dataset slots.';

/** Default IaaS volume bands (flat tier is configured separately per product). */
export const IAAS_VOLUME_BANDS = [
  '400–1,200 km²',
  '1,200–3,500 km²',
  '3,500–8,000 km²',
  '8,000+ km²',
];

/**
 * IaaS bands — flat under threshold, then base + declining $/km².
 * @param {{ smallFlat: string, perKmRates: number[], baseFee: number, smallBand?: string, volumeBands?: string[], firstColLabel?: string }} config
 */
export function areaBandRows({
  smallFlat,
  perKmRates,
  baseFee,
  smallBand = 'Up to 400 km²',
  volumeBands = IAAS_VOLUME_BANDS,
  firstColLabel,
}) {
  const base = baseFee.toLocaleString('en-US');
  return {
    firstColLabel: firstColLabel || 'AOI size',
    rows: [
      [smallBand, `${smallFlat} flat`],
      ...volumeBands.map((band, i) => [band, `$${perKmRates[i]}/km² + $${base} base`]),
    ],
  };
}

export function buildIaasPricing(iaasPricing) {
  if (iaasPricing.headers && iaasPricing.rows) {
    return iaasPricing;
  }
  if (iaasPricing.areaBand) {
    const { firstColLabel, rows } = areaBandRows(iaasPricing.areaBand);
    return {
      headers: [firstColLabel, 'Indicative fee'],
      rows,
      formulaNote:
        'Engagement fee = base + (AOI km² × $/km²) for bands above the flat threshold. Apply sensor-tier and regional multipliers to the total.',
    };
  }
  throw new Error('IaaS pricing requires areaPricing or areaBand config');
}

/** @param {string[][]} rows — one row per AOI band: [quarterly, monthly, weekly] monthly subscription USD */
export function buildAuroraMatrix(rows) {
  return {
    headers: ['AOI band', ...AURORA_CADENCES.map((c) => `${c} (USD / month)`)],
    rows: AOI_BANDS.map((band, i) => [band, ...rows[i]]),
  };
}

export const pricingMultipliers = {
  regional: regionalPricingTiers,
  sensor: {
    blurb:
      'List prices assume Firefly VNIR hyperspectral delivery. Apply the sensor-tier multiplier to IaaS engagement fees and Aurora subscription prices.',
    headers: ['Sensor tier', 'Multiplier'],
    rows: [
      ['Multispectral (MSI archive only)', '0.80×'],
      ['Hyperspectral (Firefly VNIR)', '1.0×'],
      ['VNIR–SWIR (Honeybee)', '1.5×'],
    ],
    footnote: 'MSI-only reduces processing cost but limits trait or mineral separation. HSI tasking quoted separately where not included in subscription.',
  },
  earlyAdopter: {
    blurb:
      'Insights as a Service is the validation engagement — fixed-scope analyst delivery before Aurora. Early adopter discounts apply to IaaS fees; full IaaS fee credits toward Aurora conversion when signed within 60 days of completion.',
    headers: ['Program', 'Discount', 'Applies to'],
    rows: [
      ['Early adopter — first IaaS engagement', '15% off list', 'First IaaS engagement per product per customer'],
      ['Design partner / strategic', 'Up to 20% off list', 'CCO approval required; IaaS and Aurora list prices'],
      ['Aurora conversion credit', '100% of IaaS fee', 'Credited toward Aurora subscription if signed within 60 days of IaaS completion'],
    ],
    footnote:
      'Early adopter and design-partner discounts stack with regional and sensor-tier multipliers unless capped by commercial review. Conversion credit applies once per product engagement.',
  },
};

/**
 * @param {{
 *   iaas: object,
 *   aurora: object,
 *   addOns?: object,
 * }} config
 */
export function buildProductPricing({ iaas, aurora, addOns }) {
  return {
    intro: TWO_MODELS_INTRO,
    iaas: {
      title: 'Insights as a Service',
      headline: iaas.headline,
      lede: iaas.lede || IAAS_LEDE,
      areaPricing: buildIaasPricing(iaas.areaPricing ?? { areaBand: iaas.areaBand }),
      deliverables: iaas.deliverables,
      notIncluded: iaas.notIncluded || [],
      notes: iaas.notes || [],
    },
    aurora: {
      title: 'Aurora subscription',
      headline: aurora.headline,
      lede: aurora.lede || AURORA_LEDE,
      capabilities: aurora.capabilities,
      subscriptionPricing: buildAuroraMatrix(aurora.matrix),
      cadenceNote:
        'Every cell is the monthly subscription fee for that AOI band and refresh cadence. Capability set is identical across all cells — only refresh frequency and AOI size change the price.',
    },
    addOns,
    multipliers: pricingMultipliers,
  };
}

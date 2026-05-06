/**
 * pricingPresets.js
 * Default inputs and quote lines for the pilot pricing calculator.
 */

import { seedLayers } from './layersCatalog.js';

function catalogQuoteLine(lineId, layerId, include) {
  const s = seedLayers.find((l) => l.id === layerId);
  if (!s) return null;
  return {
    id: lineId,
    layerId,
    source: 'catalog',
    include,
    name: s.name,
    baseUsdPerKm2: s.baseUsdPerKm2,
    billingCadence: 'quarterly',
  };
}

export const VERTICAL_META = {
  agriculture: { label: 'Agriculture', ratesApproved: true },
  forestry: { label: 'Forestry', ratesApproved: false },
  aquatic: { label: 'Aquatic', ratesApproved: false },
  geology: { label: 'Geology', ratesApproved: false },
  defense: { label: 'Defense', ratesApproved: false },
};

export const EARLY_DISCOUNT_OPTIONS = ['None', 'Early Adopter (10%)', 'Strategic Partner (15%)', 'Custom'];

export const DEFAULT_INPUTS = {
  aoiKm2: 1000,
  minAoiThreshold: 500,
  minAoiSurcharge: 0.25,
  /** Contract length in calendar quarters (replaces “seasons”). */
  quarters: 4,
  pilotFraction: 0.9,
  gtClient: false,
  /** Discount when the client supplies ground truth (applied to subtotal after AOI/volume factors). */
  gtClientDiscountPct: 0.1,
  gtPixxel: false,
  /** Fixed USD fee when Pixxel collects ground truth (added after discounts). */
  gtPixxelFeeUsd: 5000,
  earlyDiscountType: 'None',
  customDiscountPct: 0.1,
  volumeBrackets: [
    { min: 0, max: 999, discount: 0.0 },
    { min: 1000, max: 2499, discount: 0.05 },
    { min: 2500, max: 4999, discount: 0.1 },
    { min: 5000, max: 9_999_999, discount: 0.15 },
  ],
  fxRate: 1,
  fxLabel: 'USD',
};

/**
 * Merge persisted quote inputs with current defaults; migrate legacy keys.
 */
export function mergeQuoteInputs(defaults, storedRaw) {
  const s = storedRaw && typeof storedRaw === 'object' ? storedRaw : {};
  const out = { ...defaults, ...s };
  if (out.quarters == null && typeof s.seasons === 'number') {
    out.quarters = Math.max(1, Math.floor(s.seasons));
  }
  if (out.pilotFraction == null && s.pilotPct && typeof s.pilotPct === 'object') {
    out.pilotFraction = s.pilotPct['Tier 1'] ?? defaults.pilotFraction;
  }
  for (const k of Object.keys(defaults)) {
    if (out[k] === undefined) out[k] = defaults[k];
  }
  return out;
}

/** Ensure each line has billingCadence; strip deprecated pricingTier. */
export function normalizeQuoteLine(line) {
  if (!line || typeof line !== 'object') return line;
  const { pricingTier: _removed, ...rest } = line;
  return {
    ...rest,
    billingCadence: rest.billingCadence || 'quarterly',
  };
}

export const DEFAULT_LINES_BY_VERTICAL = {
  agriculture: [
    catalogQuoteLine('ag-l14', 'l14', true),
    catalogQuoteLine('ag-l20', 'l20', true),
    catalogQuoteLine('ag-l01', 'l01', true),
    catalogQuoteLine('ag-l02', 'l02', true),
    catalogQuoteLine('ag-l21', 'l21', true),
    catalogQuoteLine('ag-l22', 'l22', true),
    catalogQuoteLine('ag-l24', 'l24', true),
    catalogQuoteLine('ag-l06', 'l06', false),
    catalogQuoteLine('ag-l07', 'l07', false),
    catalogQuoteLine('ag-l17', 'l17', false),
    catalogQuoteLine('ag-l27', 'l27', false),
  ].filter(Boolean),
  forestry: [
    catalogQuoteLine('fo-l32', 'l32', true),
    catalogQuoteLine('fo-l33', 'l33', true),
    catalogQuoteLine('fo-l13', 'l13', true),
    catalogQuoteLine('fo-l12', 'l12', true),
    catalogQuoteLine('fo-l22', 'l22', false),
    catalogQuoteLine('fo-l29', 'l29', false),
    catalogQuoteLine('fo-l28', 'l28', false),
  ].filter(Boolean),
  aquatic: [
    { id: 'aq-c1', layerId: null, source: 'custom', include: true, name: 'Water Quality Index (optical)', baseUsdPerKm2: 10, billingCadence: 'quarterly' },
    { id: 'aq-c2', layerId: null, source: 'custom', include: true, name: 'HAB Risk Classification', baseUsdPerKm2: 30, billingCadence: 'quarterly' },
    { id: 'aq-c3', layerId: null, source: 'custom', include: false, name: 'Benthic Habitat Mapping', baseUsdPerKm2: 55, billingCadence: 'quarterly' },
    { id: 'aq-c4', layerId: null, source: 'custom', include: false, name: 'Coastal Change Detection', baseUsdPerKm2: 25, billingCadence: 'quarterly' },
  ],
  geology: [
    { id: 'ge-c1', layerId: null, source: 'custom', include: true, name: 'Surface Mineralogy (VNIR)', baseUsdPerKm2: 40, billingCadence: 'quarterly' },
    { id: 'ge-c2', layerId: null, source: 'custom', include: true, name: 'Alteration Zone Mapping', baseUsdPerKm2: 60, billingCadence: 'quarterly' },
    { id: 'ge-c3', layerId: null, source: 'custom', include: false, name: 'REE / Rare-Earth Prospecting', baseUsdPerKm2: 75, billingCadence: 'quarterly' },
    { id: 'ge-c4', layerId: null, source: 'custom', include: false, name: 'Mining Lifecycle Change Detection', baseUsdPerKm2: 10, billingCadence: 'quarterly' },
  ],
  defense: [
    catalogQuoteLine('de-l31', 'l31', true),
    { id: 'de-c1', layerId: null, source: 'custom', include: true, name: 'Persistent Change Detection', baseUsdPerKm2: 35, billingCadence: 'quarterly' },
    { id: 'de-c2', layerId: null, source: 'custom', include: false, name: 'Object Recognition / Facility Char.', baseUsdPerKm2: 60, billingCadence: 'quarterly' },
    { id: 'de-c3', layerId: null, source: 'custom', include: false, name: 'Terrain Intelligence', baseUsdPerKm2: 30, billingCadence: 'quarterly' },
  ],
};

export const PREFERRED_CATALOG_IDS = {
  agriculture: [
    'l01', 'l02', 'l03', 'l04', 'l05', 'l06', 'l07', 'l08', 'l09', 'l12', 'l14', 'l17', 'l19', 'l20', 'l21', 'l22',
    'l24', 'l25', 'l26', 'l27', 'l30', 'l66', 'l67', 'l68', 'l69', 'l70', 'l71', 'l72',
  ],
  forestry: [
    'l12', 'l13', 'l17', 'l19', 'l21', 'l22', 'l28', 'l29', 'l30', 'l32', 'l33', 'l34', 'l55', 'l56', 'l57', 'l58',
    'l59', 'l60', 'l61', 'l62', 'l63', 'l64', 'l65', 'l111',
  ],
  aquatic: [
    'l35', 'l36', 'l37', 'l38', 'l39', 'l40', 'l41', 'l42', 'l43', 'l44', 'l45', 'l46', 'l47', 'l48', 'l49', 'l50',
    'l51', 'l52', 'l53', 'l54', 'l15', 'l16', 'l17', 'l22', 'l31',
  ],
  geology: [
    'l73', 'l74', 'l75', 'l76', 'l77', 'l78', 'l79', 'l80', 'l81', 'l82', 'l83', 'l84', 'l85', 'l86', 'l87', 'l88',
    'l89', 'l15', 'l16', 'l18', 'l21', 'l22', 'l31', 'l32',
  ],
  defense: [
    'l90', 'l91', 'l92', 'l93', 'l94', 'l95', 'l96', 'l97', 'l98', 'l99', 'l100', 'l101', 'l102', 'l103', 'l104',
    'l105', 'l106', 'l107', 'l108', 'l109', 'l110', 'l31', 'l21', 'l22', 'l23', 'l24', 'l25',
  ],
};

export const DEFAULT_QUOTE = {
  vertical: 'agriculture',
  clientName: '',
  notes: '',
  inputs: { ...DEFAULT_INPUTS },
  lines: DEFAULT_LINES_BY_VERTICAL.agriculture.map((l) => ({ ...l })),
};

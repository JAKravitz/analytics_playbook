/**
 * Default catalog API ids per solution package (`${verticalId}.${packageId}`).
 * Used by PkgCard when editable package state has no saved layer ids.
 *
 * Agriculture, Forestry, and Water use catalog-backed defaults; other verticals return
 * empty lists until their API catalogs are rebuilt.
 */

/** Billable Core API ids included in every agriculture base package. */
const AG_CORE = [
  'field-boundary-api',
  'field-stress-api',
  'attribution-api',
  'confidence-api',
];

/** Billable Core API ids included in every forestry base package. */
const FOREST_CORE = [
  'forest-area-boundary-api',
  'forest-cover-forest-type-api',
  'forest-degradation-detection-api',
  'forest-deforestation-detection-api',
  'forest-fire-corroboration-api',
  'forest-attribution-api',
  'forest-confidence-api',
  'forest-evidence-api',
];

const WATER_CORE = [
  'water-waterbody-boundary-api',
  'water-surface-water-mask-api',
  'water-water-quality-constituent-api',
  'water-non-optical-estimation-api',
  'water-water-quality-anomaly-api',
  'water-threshold-exceedance-api',
  'water-confidence-api',
  'water-optical-inversion-api',
];

export const PACKAGE_CATALOG_DEFAULTS = {
  'agriculture.01': {
    included: [...AG_CORE, 'intervention-api', 'threshold-alert-api'],
    hsi: [],
  },
  'agriculture.02': {
    included: [...AG_CORE, 'intervention-api', 'vra-prescription-api', 'harvest-timing-api'],
    hsi: [],
  },
  'agriculture.03': {
    included: [...AG_CORE, 'yield-risk-api', 'loss-probability-api', 'evidence-api'],
    hsi: [],
  },
  'agriculture.04': {
    included: [...AG_CORE, 'evidence-api'],
    hsi: [],
  },
  'agriculture.05': {
    included: [...AG_CORE, 'harvest-timing-api'],
    hsi: [],
  },
  'forestry.01': {
    included: [
      ...FOREST_CORE,
      'forest-carbon-conversion-api',
      'forest-carbon-stock-change-api',
      'forest-mrv-scoring-delivery-api',
    ],
    hsi: [],
  },
  'forestry.02': {
    included: [...FOREST_CORE, 'forest-threshold-alert-api', 'forest-webhook-delivery-api'],
    hsi: [],
  },
  'forestry.03': {
    included: [
      ...FOREST_CORE,
      'forest-fuel-moisture-api',
      'forest-wildfire-composite-risk-api',
      'forest-burn-severity-api',
      'forest-recovery-monitoring-api',
    ],
    hsi: [],
  },
  'forestry.04': {
    included: [
      ...FOREST_CORE,
      'forest-establishment-detection-api',
      'forest-canopy-establishment-api',
      'forest-growth-trajectory-api',
      'forest-counterfactual-baseline-api',
      'forest-carbon-accumulation-api',
    ],
    hsi: [],
  },
  'water.01': {
    included: [...WATER_CORE],
    hsi: [],
  },
  'water.02': {
    included: [
      ...WATER_CORE,
      'water-hab-classification-api',
      'water-bloom-extent-api',
      'water-bloom-severity-api',
      'water-risk-zone-api',
      'water-temporal-trend-api',
    ],
    hsi: [],
  },
  'water.03': {
    included: [
      ...WATER_CORE,
      'water-benthic-habitat-classification-api',
      'water-bleaching-indicator-api',
    ],
    hsi: [],
  },
};

export function getPackageCatalogDefaults(verticalId, packageId) {
  const key = `${verticalId}.${packageId}`;
  return (
    PACKAGE_CATALOG_DEFAULTS[key] || {
      included: [],
      hsi: [],
    }
  );
}

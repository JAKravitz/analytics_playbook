import { buildProductPricing } from '../../productPricingShared.js';

const AURORA_CAPABILITIES = [
  'Full product API layer stack on subscribed AOI',
  'Aurora dashboards and map-linked views',
  'Copilot for interpreting layers and anomalies',
  'Custom alert workflows and export templates',
  'Slots for supplementary vector and raster datasets',
  'Org sharing, annotations, and saved views',
  'Cloud delivery and webhook endpoints',
];

export const tracePricing = buildProductPricing({
  iaas: {
    headline: 'Field intelligence deliverable',
    areaBand: {
      smallFlat: '$5,500',
      perKmRates: [2, 1.75, 1.25, 1],
      baseFee: 4500,
      smallBand: 'Up to 400 km²',
    },
    deliverables: [
      'Automated farm boundaries and crop / variety classification',
      'Phenology and growth-stage placement from NDVI season curves',
      'One-off vegetation state views per acquisition — PROSAIL traits and narrowband indices for each delivery date',
      'GeoTIFF / vector exports and optional API handoff',
    ],
    notIncluded: [
      'Multi-year trait baselines or persistent archive storage',
      'Ongoing refresh (see Aurora subscription)',
      'Yield forecasts, VRA prescriptions, or end-to-end agronomy workflows',
    ],
    notes: [
      'Traits are snapshot state per delivery date — not a rolling historical baseline (phenology excepted via NDVI curves)',
      'Firefly HSI tasking scoped per engagement; MSI-only delivery eligible for multispectral multiplier',
      'IaaS engagement fee credits toward Aurora conversion within 60 days of completion',
    ],
  },
  aurora: {
    headline: 'TRACE in Aurora',
    capabilities: [
      ...AURORA_CAPABILITIES,
      'Farm boundaries, classification, and gap-filled NDVI phenology curves',
      'PROSAIL traits (LAI, Cab, Cbrown, DW, EWT, Car, leaf N) and narrowband indices (NDRE, MCARI, CWSI, SIF, PSRI) on each refresh',
      'Embeddings-based classification path (beta) where labels are sparse',
    ],
    matrix: [
      ['$500', '$1,050', '$2,850'],
      ['$1,350', '$3,150', '$7,100'],
      ['$3,400', '$7,900', '$18,000'],
      ['Custom', 'Custom', 'Custom'],
    ],
  },
  addOns: {
    headers: ['Add-on', 'Indicative fee', 'Notes'],
    rows: [
      ['Firefly HSI acquisition', 'Per task', 'Quoted by AOI band when not in subscription'],
      ['Webhook alerting', '+$350 / month', 'Trait or index exceedance rules'],
      ['Analyst interpretation deck', 'Per engagement', 'Optional with IaaS deliverable'],
    ],
  },
});

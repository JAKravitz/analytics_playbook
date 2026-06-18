import { buildProductPricing } from '../../productPricingShared.js';

const AURORA_CAPABILITIES = [
  'Full product API layer stack on subscribed waterbodies',
  'Aurora dashboards and map-linked views',
  'Copilot for interpreting constituents and uncertainty',
  'Custom alert workflows and regulatory export templates',
  'Slots for in-situ probes, discharge records, and partner rasters',
  'Org sharing, annotations, and saved views',
  'Cloud delivery and webhook endpoints',
];

export const swipePricing = buildProductPricing({
  iaas: {
    headline: 'Waterbody analysis deliverable',
    areaPricing: {
      headers: ['Waterbody AOI', 'Indicative fee'],
      rows: [
        ['Up to 175 km²', '$4,200 flat'],
        ['175–450 km²', '$5.50/km² + $3,000 base'],
        ['450–1,800 km²', '$4/km² + $3,000 base'],
        ['1,800–6,000 km²', '$2.75/km² + $3,000 base'],
        ['6,000+ km²', '$2/km² + $3,000 base'],
      ],
      formulaNote:
        'Engagement fee = base + (waterbody AOI km² × $/km²) above the flat threshold. Apply sensor-tier and regional multipliers to the total.',
    },
    deliverables: [
      'Aquatic atmospheric correction and analysis-ready water-leaving reflectance',
      'Constituent maps — Chl-a, phycocyanin, CDOM, TSM — with pixel uncertainty',
      'HAB extent and phycocyanin where spectrum supports',
      'IOP decoupling and non-optical proxy layers (screening grade)',
      'One-off state snapshot per delivery date',
    ],
    notIncluded: [
      'Ongoing refresh or Aurora workspace (see Aurora subscription)',
      'Species-level HAB typing before operational validation',
      'Replacement for in-situ probe networks',
    ],
    notes: [
      'Scoped to lakes, reservoirs, rivers, or estuary reaches within the AOI',
      'HSI strongly recommended for bloom deliverables; MSI-only eligible for multispectral multiplier',
      'IaaS engagement fee credits toward Aurora conversion within 60 days of completion',
    ],
  },
  aurora: {
    headline: 'SWIPE in Aurora',
    capabilities: [
      ...AURORA_CAPABILITIES,
      'Constituent, IOP, and uncertainty layers on each refresh',
      'HAB and phycocyanin maps where operational',
      'MicroClim-fused non-optical proxies (DO, pH, ammonia) on each refresh',
    ],
    matrix: [
      ['$450', '$975', '$2,625'],
      ['$1,250', '$2,925', '$6,600'],
      ['$3,150', '$7,350', '$16,500'],
      ['Custom', 'Custom', 'Custom'],
    ],
  },
  addOns: {
    headers: ['Add-on', 'Indicative fee', 'Notes'],
    rows: [
      ['Firefly HSI acquisition', 'Per task', 'Quoted by AOI band'],
      ['Bloom webhook alerting', '+$350 / month', 'Phycocyanin or Chl-a exceedance'],
    ],
  },
});

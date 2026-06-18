import { buildProductPricing } from '../../productPricingShared.js';

const AURORA_CAPABILITIES = [
  'Full SCOPE layer stack on subscribed exploration AOI',
  'Aurora dashboards and target map views',
  'Copilot for spectral evidence and prospectivity scores',
  'Custom workflows — ranked targets, comparison views, export templates',
  'Slots for geochemistry, drill, and legacy geology overlays',
  'Org sharing, annotations, and saved views',
  'Cloud delivery and API access',
];

export const scopePricing = buildProductPricing({
  iaas: {
    headline: 'Exploration campaign deliverable',
    lede:
      'A fixed-scope mineral prospecting engagement over your target AOI. Base + $/km² pricing covers pipeline run, deliverables, and interpretation — episodic, not a rolling subscription.',
    areaBand: {
      smallFlat: '$8,500',
      perKmRates: [3.5, 2.75, 2, 1.75],
      baseFee: 7500,
      smallBand: 'Up to 400 km²',
    },
    deliverables: [
      'Firefly VNIR acquisition(s) over the exploration target',
      'Mineral classification (SAM + MTNF) and iron-oxide / alteration halos',
      'REE continuum-removal proxy and sulfate discrimination (VNIR grade)',
      'Structural framework, prospectivity score, and evidence package',
      'Exploration report and GeoTIFF deliverables',
    ],
    notIncluded: [
      'Ongoing Aurora refresh between campaigns',
      'SWIR-grade REE separation before Honeybee (2027+)',
      'Drill targeting guarantee or resource estimation',
    ],
    notes: [
      'Meaningful deliverables require Firefly HSI — MSI-only not offered for SCOPE IaaS',
      'Typical campaign window 6–12 months; renewal or new target at term end',
      'IaaS engagement fee credits toward Aurora conversion within 60 days of completion',
    ],
  },
  aurora: {
    headline: 'SCOPE in Aurora',
    capabilities: [
      ...AURORA_CAPABILITIES,
      'Mineral classification, alteration, REE proxy, structure, and prospectivity on each refresh',
      'Spectral chip comparison and pixel-level inspector',
      'Campaign archive similarity search where bundled',
    ],
    matrix: [
      ['$675', '$1,500', '$3,900'],
      ['$1,800', '$4,125', '$9,400'],
      ['$4,350', '$10,125', '$22,500'],
      ['Custom', 'Custom', 'Custom'],
    ],
  },
  addOns: {
    headers: ['Add-on', 'Indicative fee', 'Notes'],
    rows: [
      ['Additional HSI task', 'Per task', 'Quoted by AOI band'],
      ['VNIR–SWIR (Honeybee)', '1.5× sensor multiplier', 'When operational'],
      ['Prospectivity webhook alerts', '+$350 / month', 'Exceedance rules on subscribed AOI'],
    ],
  },
});

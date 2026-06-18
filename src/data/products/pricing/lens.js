import {
  AURORA_LEDE,
  buildAuroraMatrix,
  pricingMultipliers,
} from '../../productPricingShared.js';

const AURORA_CAPABILITIES = [
  'Semantic search index built from your entitled archive or AOI',
  'Image, patch, and object queries (text on roadmap) with map-linked results',
  'Per-customer ANN index refreshed on subscription cadence — MSI archive today',
  'Firefly VNIR HSI re-embedding when tasked acquisitions arrive (V3 roadmap)',
  'SSE-powered anomaly detection over archive embedding index (V3 roadmap)',
  'Aurora search UI, saved workflows, and org sharing',
  'Slots for supplementary customer imagery in the index',
  'Similarity search API access',
];

const LENS_INTRO =
  'Three commercial paths. GeoFM Embeddings API (beta) meters encode units over imagery from your archive or AOI — MSI today, Firefly HSI encode on V3 roadmap. Aurora subscription keeps a search-ready index over that same archive, with SSE-powered anomaly detection planned for V3. Insights as a Service is a one-time index-build engagement when you need a validation deliverable before subscribing.';

export const lensPricing = {
  intro: LENS_INTRO,
  embeddingsApi: {
    title: 'GeoFM Embeddings API',
    badge: 'Beta',
    headline: 'Encode your archive — build downstream models on hosted geoFMs',
    lede:
      'A metered API over the customer\u2019s archive or entitled AOI — not a planetary tile store. Each encode unit covers one default patch embedding from DINOv3, Ollmo-earth, Tesserra, or Prithvi. Service is in beta: interfaces and rate limits may change; no production SLA until general availability.',
    unitNote:
      'Encode units are consumed per patch at default tiling (~256 px). Re-embedding after new acquisitions or backbone changes draws from the monthly pool. Open MSI archive trials are scoped to a single AOI; paid tiers require customer entitlement.',
    tiers: [
      {
        name: 'Sandbox',
        price: 'Free',
        period: 'one-time trial',
        encodeUnits: '2,500 encode units',
        scopeNote: 'Enough for a metro-scale MSI archive sample over one AOI',
        features: [
          'Encode open MSI archive over a single AOI (up to 250 km²)',
          'DINOv3 and Prithvi backbones',
          'REST API access and starter notebooks',
          'Vectors exportable for local fine-tuning experiments',
        ],
        accent: 'var(--gray)',
      },
      {
        name: 'Builder',
        price: '$85',
        period: 'USD / month',
        encodeUnits: '18,000 encode units / month',
        scopeNote: 'Typical county-scale MSI archive depth each month',
        features: [
          'Customer archive or entitled AOI — your scenes, your footprint',
          'All four hosted geoFM backbones',
          'Batch vector export and collection management',
          'Email support · beta SLA (best effort)',
        ],
        accent: 'var(--cyan)',
      },
      {
        name: 'Mission',
        price: '$1,450',
        period: 'USD / month',
        encodeUnits: '500,000 encode units / month',
        scopeNote: 'Multi-site portfolio or regional MSI archive monthly re-encode',
        features: [
          'Multi-AOI entitlements and priority encode queue',
          'Private collection namespace',
          'Index refresh hooks into Aurora LENS subscription',
          'Webhook on encode job completion',
          'Firefly VNIR HSI patch encoding (V3 roadmap)',
        ],
        accent: '#A78BFA',
        badge: 'Popular',
      },
      {
        name: 'Fleet',
        price: 'Commercial review',
        period: '',
        encodeUnits: 'Volume encode units',
        scopeNote: 'National-scale archive programs and defense portfolios',
        features: [
          'Dedicated workspace and custom backbone adapters',
          'Commercial imagery and tasking entitlements',
          'ITAR-partitioned collections where required',
          'Named support contact and custom rate limits',
        ],
        accent: 'var(--amber)',
      },
    ],
    betaNote:
      'GeoFM Embeddings API is a beta service. Endpoint schemas, backbone availability, and unit economics are indicative — validate with engineering before customer-facing quotes. MSI encode is operational today; Firefly VNIR HSI patch encoding is V3 roadmap.',
  },
  aurora: {
    title: 'Aurora subscription',
    headline: 'LENS search over your archive',
    lede: AURORA_LEDE,
    capabilities: AURORA_CAPABILITIES,
    subscriptionPricing: buildAuroraMatrix([
      ['$425', '$900', '$2,400'],
      ['$1,125', '$2,625', '$6,000'],
      ['$2,850', '$6,675', '$15,000'],
      ['Custom', 'Custom', 'Custom'],
    ]),
    cadenceNote:
      'Monthly subscription for a search index built from your entitled archive or AOI. Every cell is the same capability set — only AOI band and refresh cadence change the price.',
  },
  indexBuild: {
    title: 'Insights as a Service',
    headline: 'One-time archive index deliverable',
    lede:
      'A fixed-scope engagement to build and hand off a search-ready embedding index over your archive or AOI — validation before Aurora or a parallel path for integrators who host their own UI.',
    headers: ['Archive scope', 'Indicative fee'],
    rows: [
      ['Up to 400 km² archive', '$3,500 flat'],
      ['400–1,500 km²', '$2.25/km² + $3,000 base'],
      ['1,500–6,000 km²', '$1.50/km² + $3,000 base'],
      ['6,000+ km²', 'Custom — commercial review'],
    ],
    deliverables: [
      'One-time ANN index over defined archive depth',
      'Backbone selection memo and ranked similarity demo',
      'Optional API credentials for integrators',
    ],
    notes: [
      'Index-build fee credits toward Aurora conversion within 60 days',
      'Does not include ongoing refresh — see Aurora subscription',
      'MSI archive indexing today; Firefly HSI re-embedding scoped on V3 roadmap',
      'Defense engagements require ITAR review before quoting',
    ],
  },
  addOns: {
    headers: ['Add-on', 'Indicative fee', 'Notes'],
    rows: [
      ['Additional encode units', 'Per 10k units', 'Top-up packs on Builder and Mission tiers'],
      ['Firefly HSI re-embedding', 'Per task + encode units', 'V3 roadmap — out-of-cycle index refresh when HSI tasks arrive'],
      ['SSE-powered anomaly detection', 'Included at V3 Aurora tier', 'Roadmap — archive outlier ranking via embedding index'],
      ['Vertical fine-tuned encoder', 'Custom', 'Roadmap — design partner pricing'],
      ['Additional AOI entitlement', 'Per band', 'Expand archive scope beyond subscription'],
    ],
  },
  multipliers: pricingMultipliers,
};

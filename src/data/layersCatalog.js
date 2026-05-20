import { forestryApiRows } from './forestryCatalogRows.js';
import { waterApiRows } from './waterCatalogRows.js';

/**
 * API Catalog — seed rows for the analytics playbook. Each row is a sellable
 * analytics API endpoint (Agriculture, Forestry, and Water catalogs; more verticals to follow).
 *
 * Schema notes:
 *   - `verticals`: array of vertical ids the row belongs to (multi-valued).
 *     A row with empty `verticals` is hidden from per-vertical surfaces but
 *     still merges from persisted state for back-compat.
 *   - `apiReady` (formerly `ready`): readiness label for the API endpoint.
 *   - `tier`: commercial / access tier (FF / Open / Both). Spectral uplift
 *     story lives in `upliftMsi` / `upliftVnirHsi` / `upliftVnirSwir`.
 *   - `kind`: 'core' | 'internal' | 'addon' — groups rows on vertical pages.
 *     `internal` APIs are bundled on request at no extra charge. Legacy `data` folds into `core`.
 *     User-added rows without `kind` are treated as legacy for grouping only.
 *   - `addonFamily`: optional sub-grouping when `kind === 'addon'`
 *     (e.g. 'Precision Ag', 'Crop Protection', 'Seasonal Risk', 'Alerting').
 *   - `requires`: array of strings (display names of dependencies; may be
 *     other API endpoint names or "(internal)" components).
 *   - `provides`: short one-sentence description of what the endpoint returns.
 *   - `traitDetail`: optional sub-table data for the Trait API spec page.
 *   - `structureDetail`: optional sub-table for the Structure API (forestry).
 *
 * `baseUsdPerKm2` is a working commercial list rate (USD per km²) used by the
 * Pilot Pricing Calculator when adding an API row to a quote.
 */

export const LAYER_STATUSES = ['aurora', 'piloting', 'r&d', 'scoping'];

/** Display label for catalog status (internal id → UI). */
export const LAYER_STATUS_LABELS = {
  aurora: 'Aurora',
  piloting: 'Piloting',
  'r&d': 'R&D',
  scoping: 'Scoping',
};

/** Tag color for catalog status pills. */
export function layerStatusColor(status) {
  if (status === 'aurora') return 'var(--green)';
  if (status === 'piloting') return 'var(--amber)';
  if (status === 'scoping') return 'var(--purple)';
  return 'var(--blue)';
}

export const LAYER_TIERS = ['FF', 'Open', 'Both'];

/** All vertical ids referenced anywhere in the catalog. */
export const LAYER_VERTICALS = ['agriculture', 'forestry', 'water', 'geology', 'defense'];

/** Display label for a vertical id. */
export const LAYER_VERTICAL_LABELS = {
  agriculture: 'Agriculture',
  forestry: 'Forestry',
  water: 'Water',
  geology: 'Geology',
  defense: 'Defense',
};

/** API row kinds used to group on vertical pages. */
export const LAYER_KINDS = ['core', 'internal', 'addon'];

export const LAYER_KIND_LABELS = {
  core: 'Core API',
  internal: 'Internal (on request)',
  addon: 'Add-on API',
};

/** Catalog table: internal (on request) vs external (standard / billable). */
export const CATALOG_ACCESS = ['external', 'internal'];

export const CATALOG_ACCESS_LABELS = {
  external: 'External',
  internal: 'Internal',
};

export function catalogAccessForLayer(layer) {
  return layer?.kind === 'internal' ? 'internal' : 'external';
}

const LEGACY_TIER = { MSI: 'FF', HSI: 'FF', 'MSI/HSI': 'Both' };

/**
 * Bump when seed catalog structure changes (e.g. core → internal/data split).
 * Persisted layer rows re-sync catalog fields from seed on load.
 */
export const CATALOG_VERSION = 6;

/**
 * Migrate persisted rows after renames (shipping→Aurora, MSI→FF, engine→verticals,
 * ready→apiReady). Safe to call on already-migrated rows.
 */
export function normalizeCatalogLayerRow(row) {
  if (!row || typeof row !== 'object') return row;
  const next = { ...row };
  if (next.status === 'shipping') next.status = 'aurora';
  if (LEGACY_TIER[next.tier]) next.tier = LEGACY_TIER[next.tier];
  if (!Array.isArray(next.verticals)) next.verticals = [];
  next.verticals = next.verticals.map((v) => (v === 'aquatic' ? 'water' : v));
  if (next.ready != null && next.apiReady == null) {
    next.apiReady = next.ready;
  }
  delete next.ready;
  delete next.engine;
  return next;
}

/* ──────────────────────────────────────────────────────────────────────────
 * Agriculture API Catalog
 *   Source: Agriculture API Catalog.docx (product).
 *   Base package: Field Stress Monitor — Core API + Internal (on request) + add-ons.
 * ────────────────────────────────────────────────────────────────────────── */

const AG = ['agriculture'];

const agricultureApiRows = [
  // ─── Core API ──────────────────────────────────────────────────────────
  {
    id: 'field-boundary-api',
    name: 'Field Boundary API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'aurora',
    apiReady: 'TBD',
    kind: 'core',
    notes: 'Pixxel-managed field polygons and stable field IDs.',
    provides: 'Pixxel-managed field polygons and stable field IDs',
    requires: [],
    upliftMsi: 'Baseline product on MSI imagery.',
    upliftVnirHsi: 'No uplift',
    upliftVnirSwir: 'No uplift',
    baseUsdPerKm2: 5,
  },
  {
    id: 'field-stress-api',
    name: 'Field Stress API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'aurora',
    apiReady: 'TBD',
    kind: 'core',
    notes: 'Stress score, health score, severity class per field.',
    provides: 'Stress score, health score, severity class per field',
    requires: ['Field Boundary API', 'Phenology API', 'Anomaly API (internal)', 'Climate Forcing API (internal)'],
    upliftMsi: 'Score derived from greenness and structural anomaly proxies.',
    upliftVnirHsi:
      'Pre-symptomatic stress via red-edge chlorophyll depletion (700–730nm) and leaf water content (970nm); stress scored against biochemical state rather than greenness proxy.',
    upliftVnirSwir:
      'Adds canopy water stress at higher sensitivity (1400nm, 1900nm); cellular vs. structural water loss separable — earlier and more specific stress typing.',
    baseUsdPerKm2: 18,
  },
  {
    id: 'attribution-api',
    name: 'Attribution API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'r&d',
    apiReady: 'TBD',
    kind: 'core',
    notes: 'Likely stress driver and plain-language explanation.',
    provides: 'Likely stress driver and plain-language explanation',
    requires: ['Field Stress API'],
    upliftMsi: 'Coarse driver hypotheses from indices and climate context.',
    upliftVnirHsi:
      'Spectral separation of water deficit (970nm), nitrogen/chlorophyll depletion (red-edge slope), and pathogen onset (500–550nm anomalies).',
    upliftVnirSwir:
      'Adds fungal vs. bacterial pathogen separation via lignin/cellulose disruption (2100nm); nutrient deficiency typing extended to P and K proxies.',
    baseUsdPerKm2: 22,
  },
  {
    id: 'confidence-api',
    name: 'Confidence API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'r&d',
    apiReady: 'TBD',
    kind: 'core',
    notes: 'Confidence and uncertainty on all base outputs.',
    provides: 'Confidence and uncertainty on all base outputs',
    requires: ['Field Stress API', 'Attribution API'],
    upliftMsi: 'Confidence from temporal consistency and clear-sky frequency.',
    upliftVnirHsi:
      'Confidence informed by spectral fit quality across red-edge and VNIR water features.',
    upliftVnirSwir:
      'Full-curve spectral fit including SWIR — highest confidence; uncertainty bounds tighter on attribution.',
    baseUsdPerKm2: 6,
  },

  // ─── Core API (classification, forcing, phenology, state, traits) ───────
  {
    id: 'crop-classification-api',
    name: 'Crop Classification API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'aurora',
    apiReady: 'TBD',
    kind: 'internal',
    notes: 'Crop type per field and season.',
    provides: 'Crop type per field and season',
    requires: ['Field Boundary API'],
    upliftMsi: 'Standard MSI classification accuracy on common crops.',
    upliftVnirHsi:
      'Separation of spectrally similar crops (maize vs. sorghum, wheat vs. barley) via full VNIR curve shape.',
    upliftVnirSwir:
      'Adds ligno-cellulosic crop structure differentiation — improved accuracy for mature canopies and mixed crop systems.',
    baseUsdPerKm2: 0,
  },
  {
    id: 'climate-forcing-api',
    name: 'Climate Forcing API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'r&d',
    apiReady: 'TBD',
    kind: 'internal',
    notes: 'Field-level weather and environmental drivers.',
    provides: 'Field-level weather and environmental drivers',
    requires: ['Field Boundary API'],
    upliftMsi: 'MSI/external data driven; no spectral path.',
    upliftVnirHsi: 'No uplift — climate forcing is MSI/external data driven.',
    upliftVnirSwir: 'No uplift',
    baseUsdPerKm2: 0,
  },
  {
    id: 'phenology-api',
    name: 'Phenology API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'aurora',
    apiReady: 'TBD',
    kind: 'internal',
    notes: 'Crop stage, deviation, and growth trajectory.',
    provides: 'Crop stage, deviation, and growth trajectory',
    requires: ['Field Boundary API', 'Crop Classification API', 'Climate Forcing API'],
    upliftMsi: 'NDVI-inflection-based stage estimates.',
    upliftVnirHsi:
      'Stage transitions via chlorophyll a/b ratio shifts and canopy water dynamics; more precise than NDVI inflection alone.',
    upliftVnirSwir:
      'Adds senescence staging via dry matter accumulation (cm) and lignification (2100nm).',
    baseUsdPerKm2: 0,
  },
  {
    id: 'expected-state-api',
    name: 'Expected-State API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'r&d',
    apiReady: 'TBD',
    kind: 'internal',
    notes: 'Expected condition baseline by crop / stage / time window.',
    provides: 'Expected condition baseline by crop / stage / time window',
    requires: ['Field Boundary API', 'Crop Classification API', 'Phenology API', 'Climate Forcing API'],
    upliftMsi: 'Index-space baselines; sensitive to illumination conditions.',
    upliftVnirHsi:
      'Baseline expressed in biophysical units (LAI, cab, cw) — more stable across illumination conditions.',
    upliftVnirSwir:
      'Baseline extended to cm and SWIR-derived traits — richer expected state model with lower uncertainty.',
    baseUsdPerKm2: 0,
  },
  {
    id: 'anomaly-api',
    name: 'Anomaly API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'r&d',
    apiReady: 'TBD',
    kind: 'internal',
    notes: 'Anomaly score and deviation magnitude.',
    provides: 'Anomaly score and deviation magnitude',
    requires: ['Expected-State API'],
    upliftMsi: 'Anomalies in index space.',
    upliftVnirHsi:
      'Anomalies in biophysical trait space (cab, cw deviation) — more interpretable than index anomalies.',
    upliftVnirSwir:
      'Anomalies resolvable into SWIR trait space — water and structural anomalies separable from pigment anomalies.',
    baseUsdPerKm2: 0,
  },
  {
    id: 'trait-api',
    name: 'Trait API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'aurora',
    apiReady: 'TBD',
    kind: 'core',
    notes: 'PROSAIL inversion variables and spectral indices: LAI, cab, cw, cm, Car.',
    provides: 'PROSAIL inversion variables and spectral indices per image: LAI, cab, cw, cm, Car',
    requires: ['Field Boundary API', 'Crop Classification API'],
    upliftMsi: 'Coarse trait estimates from multispectral inversion (see trait detail).',
    upliftVnirHsi: 'See trait detail below.',
    upliftVnirSwir: 'See trait detail below.',
    baseUsdPerKm2: 28,
    traitDetail: {
      headers: ['Trait', 'MSI', 'VNIR HSI', 'VNIR-SWIR HSI', 'Notes'],
      rows: [
        [
          'LAI',
          'Low precision; saturation above ~3',
          'Higher precision; full red-edge inversion reduces saturation',
          'Highest precision; SWIR scattering improves canopy structure inversion',
          '',
        ],
        [
          'cab (Canopy chlorophyll)',
          'Coarse — red-edge bands give correlated estimate',
          'Full red-edge inversion; separates chlorophyll a and b',
          'Same as VNIR; SWIR adds no uplift for cab',
          'Primary nitrogen proxy',
        ],
        [
          'cw (Canopy water content)',
          'No',
          '970nm and 1200nm absorption features',
          'Higher sensitivity at 1400nm and 1900nm — wider dynamic range, lower detection limit',
          'Primary water stress and K-deficiency proxy',
        ],
        [
          'cm (Dry matter / LMA)',
          'No',
          'No — cm features sit at 1600–2300nm',
          'Yes — cellulose, lignin, starch features at 1600–2300nm',
          'Structural maturity and senescence indicator',
        ],
        [
          'Car (Carotenoids)',
          'No',
          'Yes — 500–570nm features separable from chlorophyll',
          'Same as VNIR',
          'Early stress and photoprotection indicator',
        ],
        [
          'Nitrogen indicator',
          'Partial — low precision cab proxy',
          'Higher precision cab-derived proxy; separable from LAI effects',
          'Same as VNIR HSI; SWIR adds no uplift',
          'Model-derived; not direct spectral retrieval',
        ],
        [
          'Phosphorus deficiency indicator',
          'No',
          'Partial — model-derived from LAI suppression and cab deviation',
          'Partial — adds dry matter accumulation anomaly (cm) as additional proxy',
          'Deficiency indicator, not concentration estimate',
        ],
        [
          'Potassium deficiency indicator',
          'No',
          'Partial — model-derived from cw anomaly and stomatal closure signatures',
          'Improved — cw retrieval at higher sensitivity via SWIR; stronger K-deficiency proxy',
          'Deficiency indicator, not concentration estimate',
        ],
        [
          'Lignin / Cellulose',
          'No',
          'No',
          'Yes — 2100nm and 2300nm absorption features',
          'Pathogen and structural stress indicator',
        ],
        [
          'Starch',
          'No',
          'No',
          'Yes — 2100nm starch absorption feature',
          'Maturity and storage compound indicator',
        ],
      ],
    },
  },

  // ─── Add-ons: Precision Ag ─────────────────────────────────────────────
  {
    id: 'intervention-api',
    name: 'Intervention API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'scoping',
    apiReady: 'TBD',
    kind: 'addon',
    addonFamily: 'Precision Ag',
    notes: 'Recommended action: irrigation, nutrient, scouting, spray.',
    provides: 'Recommended action: irrigation, nutrient, scouting, spray',
    requires: ['Field Stress API', 'Attribution API'],
    upliftMsi: 'Actions recommended from coarse stress classes.',
    upliftVnirHsi:
      'Recommendations informed by spectrally attributed stress type — reduces misattributed interventions.',
    upliftVnirSwir:
      'Broader attribution palette (P, K, fungal vs. bacterial) → more specific intervention recommendations.',
    baseUsdPerKm2: 20,
  },
  {
    id: 'vra-prescription-api',
    name: 'VRA Prescription API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'scoping',
    apiReady: 'TBD',
    kind: 'addon',
    addonFamily: 'Precision Ag',
    notes: 'Zone-based variable-rate prescriptions for fertilizer, irrigation, or chemicals.',
    provides:
      'Zone-based variable-rate prescriptions for fertilizer, irrigation, or chemical application',
    requires: ['Intervention API', 'Field Boundary API'],
    upliftMsi: 'NDVI-driven management zones.',
    upliftVnirHsi:
      'Sub-field stress zones defined by biochemical gradients — spatially more precise than NDVI-based zones.',
    upliftVnirSwir:
      'Stress zones informed by SWIR-derived water and structural signals — more accurate irrigation and fungicide prescription zones.',
    baseUsdPerKm2: 24,
  },
  {
    id: 'harvest-timing-api',
    name: 'Harvest Timing API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'piloting',
    apiReady: 'TBD',
    kind: 'addon',
    addonFamily: 'Precision Ag',
    notes: 'Expected harvest readiness window per field.',
    provides: 'Expected harvest readiness window',
    requires: ['Field Boundary API', 'Crop Classification API', 'Phenology API', 'Climate Forcing API'],
    upliftMsi: 'NDVI / NDRE inflection timing.',
    upliftVnirHsi:
      'Maturity staging via chlorophyll decline and canopy water content reduction.',
    upliftVnirSwir:
      'Dry matter accumulation and lignification (2100–2300nm) — harvest timing precision improved for grain and legume crops.',
    baseUsdPerKm2: 18,
  },

  // ─── Add-ons: Crop Protection ──────────────────────────────────────────
  {
    id: 'pest-forewarning-api',
    name: 'Pest Forewarning API',
    verticals: AG,
    tier: 'Both',
    grade: 'exploration',
    status: 'piloting',
    apiReady: 'TBD',
    kind: 'addon',
    addonFamily: 'Crop Protection',
    notes: 'Pest pressure and emergence signals.',
    provides: 'Pest pressure and emergence signals',
    requires: ['Field Boundary API', 'Phenology API', 'Climate Forcing API'],
    upliftMsi: 'Coarse pest-risk flags from climate + index anomalies.',
    upliftVnirHsi:
      'Canopy structural anomalies and reflectance changes consistent with early feeding damage.',
    upliftVnirSwir:
      'Adds feeding-induced cell wall disruption (2100nm cellulose features) — earlier pest damage signal than VNIR alone.',
    baseUsdPerKm2: 28,
  },
  {
    id: 'disease-forewarning-api',
    name: 'Disease Forewarning API',
    verticals: AG,
    tier: 'Both',
    grade: 'exploration',
    status: 'piloting',
    apiReady: 'TBD',
    kind: 'addon',
    addonFamily: 'Crop Protection',
    notes: 'Disease pressure and outbreak signals.',
    provides: 'Disease pressure and outbreak signals',
    requires: ['Field Boundary API', 'Phenology API', 'Climate Forcing API'],
    upliftMsi: 'Coarse disease-risk flags from climate + index anomalies.',
    upliftVnirHsi:
      'Chlorophyll depletion and carotenoid accumulation patterns consistent with early disease onset (500–570nm, 700–730nm).',
    upliftVnirSwir:
      'Adds lignin/cellulose disruption signatures of fungal infection (2100nm); improved separation of fungal vs. bacterial and viral disease.',
    baseUsdPerKm2: 32,
  },

  // ─── Add-ons: Seasonal Risk ────────────────────────────────────────────
  {
    id: 'yield-risk-api',
    name: 'Yield Risk API',
    verticals: AG,
    tier: 'Both',
    grade: 'exploration',
    status: 'scoping',
    apiReady: 'TBD',
    kind: 'addon',
    addonFamily: 'Seasonal Risk',
    notes: 'Relative yield downside risk per field.',
    provides: 'Relative yield downside risk per field',
    requires: ['Field Stress API', 'Attribution API', 'Expected-State API', 'Phenology API', 'Climate Forcing API'],
    upliftMsi: 'Relative-rank yield risk from greenness anomalies.',
    upliftVnirHsi:
      'Yield risk informed by biochemical stress indicators — detects risk earlier in season than MSI-based greenness signals.',
    upliftVnirSwir:
      'Broader stress attribution palette feeding yield model — more accurate risk disaggregation by driver.',
    baseUsdPerKm2: 30,
  },
  {
    id: 'loss-probability-api',
    name: 'Loss Probability API',
    verticals: AG,
    tier: 'Both',
    grade: 'exploration',
    status: 'scoping',
    apiReady: 'TBD',
    kind: 'addon',
    addonFamily: 'Seasonal Risk',
    notes: 'Probability of agronomic or financial loss.',
    provides: 'Probability of agronomic or financial loss',
    requires: ['Yield Risk API', 'Climate Forcing API'],
    upliftMsi: 'Loss probability from greenness anomalies + climate.',
    upliftVnirHsi:
      'Loss probability conditioned on spectrally-detected stress type and severity.',
    upliftVnirSwir:
      'Higher-confidence loss estimates from SWIR-extended stress and structural signals.',
    baseUsdPerKm2: 26,
  },
  {
    id: 'seasonal-outlook-api',
    name: 'Seasonal Outlook API',
    verticals: AG,
    tier: 'Both',
    grade: 'exploration',
    status: 'scoping',
    apiReady: 'TBD',
    kind: 'addon',
    addonFamily: 'Seasonal Risk',
    notes: 'Forward-looking seasonal risk projection.',
    provides: 'Forward-looking seasonal risk projection',
    requires: ['Yield Risk API', 'Loss Probability API', 'Climate Forcing API'],
    upliftMsi: 'Short-horizon outlook from index trajectories.',
    upliftVnirHsi: 'Earlier-season risk detection extends forecast horizon.',
    upliftVnirSwir:
      'SWIR-derived structural signals improve outlook stability across phenological stages.',
    baseUsdPerKm2: 22,
  },
  {
    id: 'portfolio-aggregation-api',
    name: 'Portfolio Aggregation API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'scoping',
    apiReady: 'TBD',
    kind: 'addon',
    addonFamily: 'Seasonal Risk',
    notes: 'Risk roll-up across fields and geographies.',
    provides: 'Risk roll-up across fields and geographies',
    requires: ['Yield Risk API', 'Loss Probability API', 'Field Boundary API'],
    upliftMsi: 'Geometry / statistics; sensor-agnostic.',
    upliftVnirHsi: 'No uplift — aggregation is geometry and statistics.',
    upliftVnirSwir: 'No uplift',
    baseUsdPerKm2: 8,
  },
  {
    id: 'evidence-api',
    name: 'Evidence API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'scoping',
    apiReady: 'TBD',
    kind: 'addon',
    addonFamily: 'Seasonal Risk',
    notes: 'Machine-readable evidence package for reporting and claims.',
    provides: 'Machine-readable evidence package for reporting and claims',
    requires: ['Yield Risk API', 'Loss Probability API', 'Field Stress API', 'Attribution API'],
    upliftMsi: 'Evidence trail anchored on index history and climate context.',
    upliftVnirHsi:
      'Richer spectral evidence trail — biochemical attribution included in evidence package.',
    upliftVnirSwir:
      'Full SWIR-extended attribution in evidence package — strongest defensibility for insurance and regulatory reporting.',
    baseUsdPerKm2: 18,
  },

  // ─── Add-ons: Alerting ─────────────────────────────────────────────────
  {
    id: 'threshold-alert-api',
    name: 'Threshold Alert API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'scoping',
    apiReady: 'TBD',
    kind: 'addon',
    addonFamily: 'Alerting',
    notes:
      'Configurable threshold-based alerts on any subscribed Core or Add-on output. Purchased once, applies across all active subscriptions.',
    provides: 'Configurable threshold-based alerts on any subscribed output',
    requires: ['At least one Core or Add-on API subscription'],
    upliftMsi: 'Trigger from index thresholds.',
    upliftVnirHsi:
      'Earlier trigger via biochemical indicators — estimated 5–10 day lead over MSI-based NDVI triggers.',
    upliftVnirSwir:
      'Earlier still for water and structural stress types detectable only in SWIR.',
    baseUsdPerKm2: 4,
  },
  {
    id: 'webhook-delivery-api',
    name: 'Webhook Delivery API',
    verticals: AG,
    tier: 'Both',
    grade: 'inventory',
    status: 'scoping',
    apiReady: 'TBD',
    kind: 'addon',
    addonFamily: 'Alerting',
    notes: 'Push-based delivery of alerts to customer endpoints.',
    provides: 'Push-based delivery of alerts to customer endpoints',
    requires: ['Threshold Alert API'],
    upliftMsi: 'Standard webhook delivery; payload determined by source API.',
    upliftVnirHsi: 'No uplift',
    upliftVnirSwir: 'No uplift',
    baseUsdPerKm2: 2,
  },
];

import { geologyCatalogRows } from './geologyCatalogRows.js';
import { miningCatalogRows } from './miningCatalogRows.js';
import { diCatalogRows } from './diCatalogRows.js';

export { geologyCatalogRows as geologyApiRows };
export { miningCatalogRows as miningApiRows };
export { diCatalogRows as defenseApiRows };

export const seedLayers = [
  ...agricultureApiRows,
  ...forestryApiRows,
  ...waterApiRows,
  ...geologyCatalogRows,
  ...miningCatalogRows,
  ...diCatalogRows,
];

/** Helper: rows that belong to a vertical (multi-valued match). */
export function layersForVertical(verticalId, layers = seedLayers) {
  return layers.filter((l) => Array.isArray(l.verticals) && l.verticals.includes(verticalId));
}

/** Helper: group API rows by kind (and addonFamily for add-ons). Legacy `kind: 'data'` → core. */
export function groupApiRowsByKind(rows) {
  const groups = { core: [], internal: [], addon: [], legacy: [] };
  for (const r of rows) {
    let kind = r.kind || 'legacy';
    if (kind === 'data') kind = 'core';
    if (groups[kind]) groups[kind].push(r);
    else groups.legacy.push(r);
  }
  return groups;
}

/** Helper: group add-on rows by addonFamily, preserving array order. */
export function groupAddonsByFamily(addons) {
  const families = new Map();
  for (const r of addons) {
    const fam = r.addonFamily || 'Other';
    if (!families.has(fam)) families.set(fam, []);
    families.get(fam).push(r);
  }
  return Array.from(families.entries()).map(([family, rows]) => ({ family, rows }));
}

/**
 * True for ids that used to be short seed-style catalog keys (l01…l111) but are not in the
 * current seed — these must not be resurrected from localStorage/Supabase as "custom" rows after
 * layers are removed from code. True user-added rows use `l` + timestamp (large number).
 */
function isOrphanedLegacySeedId(id, seedById) {
  if (typeof id !== 'string' || seedById[id]) return false;
  const m = /^l(\d+)$/.exec(id);
  if (!m) return false;
  const n = Number(m[1]);
  if (!Number.isFinite(n)) return false;
  return n >= 1 && n <= 250;
}

/**
 * @param {Array} stored  Last saved `state.layers` from persistence.
 * @param {string[]} [removedSeedLayerIds]  Seed ids the user explicitly removed in the UI;
 *   those rows stay hidden when you pull new layers from code.
 */
export function mergeStoredLayersWithSeed(stored, removedSeedLayerIds = []) {
  if (!Array.isArray(stored)) return structuredClone(seedLayers);
  const seedById = Object.fromEntries(seedLayers.map((l) => [l.id, l]));
  const storedById = Object.fromEntries(stored.map((l) => [l.id, l]));
  const removed = new Set(
    (removedSeedLayerIds || []).filter((id) => typeof id === 'string' && seedById[id])
  );

  const mergedSeedOrder = seedLayers
    .filter((s) => !removed.has(s.id))
    .map((s) => {
      const row = storedById[s.id];
      if (!row) return structuredClone(s);
      return normalizeCatalogLayerRow({
        ...s,
        ...row,
        // Catalog structure and copy always follow seed (localStorage used to keep stale `kind: core`).
        kind: s.kind,
        addonFamily: s.addonFamily,
        traitDetail: s.traitDetail,
        structureDetail: s.structureDetail,
        provides: s.provides ?? row.provides,
        requires: Array.isArray(s.requires) ? s.requires : row.requires,
        upliftMsi: s.upliftMsi ?? row.upliftMsi,
        upliftVnirHsi: s.upliftVnirHsi ?? row.upliftVnirHsi,
        upliftVnirSwir: s.upliftVnirSwir ?? row.upliftVnirSwir,
        verticals:
          Array.isArray(row.verticals) && row.verticals.length ? row.verticals : s.verticals,
        baseUsdPerKm2:
          s.kind === 'internal'
            ? s.baseUsdPerKm2
            : typeof row.baseUsdPerKm2 === 'number' && !Number.isNaN(row.baseUsdPerKm2)
              ? row.baseUsdPerKm2
              : s.baseUsdPerKm2,
      });
    });

  const customRows = stored
    .filter((row) => {
      if (seedById[row.id]) return false;
      if (isOrphanedLegacySeedId(row.id, seedById)) return false;
      return true;
    })
    .map((row) =>
      normalizeCatalogLayerRow({
        ...row,
        baseUsdPerKm2:
          typeof row.baseUsdPerKm2 === 'number' && !Number.isNaN(row.baseUsdPerKm2)
            ? row.baseUsdPerKm2
            : 15,
      })
    );

  return [...mergedSeedOrder, ...customRows];
}

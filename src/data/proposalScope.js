/**
 * Pilot proposal scope content; V2 pricing model.
 *
 * V2 model:
 *   Two pilot offerings: Hyperspectral + MSI (default) and MSI-only (0.60×).
 *   Tiers (Basic / Standard / Enterprise) differ by AOI size and Firefly task
 *   count within each offering. Scope is split by sensor tier: MSI outputs on
 *   every pilot; HSI outputs on Hyperspectral + MSI pilots only. Enterprise
 *   adds multi-date analysis and ground truth on monitoring pilots.
 *
 * Exports:
 *   MONITORING_SCOPE  ; Agriculture, Forestry, Water
 *   GEOLOGY_SCOPE     ; Standard + Enterprise (HSI-only)
 *   MINING_SCOPE      ; indicative scope, project-based
 *   DEFENSE_SCOPE     ; indicative scope, project-based
 *   ENTERPRISE_EXTRAS ; additions applied to all monitoring Enterprise tiers
 *   TIER_PARAMS       ; pricing, AOI bands, HSI tasks, duration per tier
 */

/* ─── Tier parameters ─────────────────────────────────────────────────────── */

/**
 * TIER_PARAMS['monitoring'][tier] drives the pricing table and scope header.
 * Prices at Tier 1 (1.0×); multiply by regional factor at render time.
 */
export const TIER_PARAMS = {
  monitoring: {
    Basic: {
      price: 2000,
      msiFactor: 0.6,
      aoi: 'Up to 200 km²',
      hsiTasks: '1 Firefly acquisition',
      duration: '4-6 weeks',
    },
    Standard: {
      price: 8000,
      msiFactor: 0.6,
      aoi: '200-1,000 km²',
      hsiTasks: '2 Firefly acquisitions',
      duration: '6-10 weeks',
    },
    Enterprise: {
      price: 20000,
      msiFactor: 0.6,
      aoi: '1,000+ km²; scope by discussion',
      hsiTasks: '3+ Firefly acquisitions; by discussion',
      duration: '10-16 weeks; by discussion',
      pricePrefix: 'From ',
      projectBased: true,
    },
  },
  geology: {
    Standard: {
      price: 8000,
      aoi: 'Up to 1,000 km²',
      hsiTasks: '1 Firefly acquisition',
      duration: '6-10 weeks',
    },
    Enterprise: {
      price: 20000,
      aoi: '1,000+ km²; scope by discussion',
      hsiTasks: '2+ Firefly acquisitions; by discussion',
      duration: '10-16 weeks; by discussion',
      pricePrefix: 'From ',
      projectBased: true,
    },
  },
};

/* ─── Enterprise extras (applied to all monitoring verticals at Enterprise) ── */

export const ENTERPRISE_EXTRAS = [
  'Multi-date analysis across the available archive; trend and seasonality characterisation across the AOI',
  'Ground truth comparison where customer-provided reference data is available (field LAI, canopy chlorophyll, cover, dry-matter measurements); retrieval accuracy report per matched variable',
];

/* ─── Monitoring scope — per vertical ────────────────────────────────────── */

export const MONITORING_SCOPE = {
  Agriculture: {
    inDevelopment: [
      'Soil NPK / SOC estimation',
      'Irrigation optimization',
      'Yield / biomass / production forecasting',
    ],
    msi: [
      'Crop type classification across the AOI',
      'Phenology stage and growth trajectory summary',
      'Spectral health indices: NDRE, NDVI narrowband, PRI (photosynthetic efficiency), CIgreen, PSRI (senescence marker)',
      'Anomaly detection against MSI seasonal baseline; flagged management units for review',
      'Summary report and GeoTIFF map outputs',
    ],
    hsi: [
      'PROSAIL canopy radiative-transfer inversion: Leaf Area Index (LAI), canopy chlorophyll (cab), canopy water content (cw), carotenoids (Car)',
      'Physiology and health score per management unit derived from HSI biophysical retrievals',
      'Stress attribution hypotheses where the attribution pipeline is available; flags credible cause hypotheses (water deficit, chlorophyll loss, senescence) without replacing field diagnosis',
      'Validation report (~15 pages) and interpretation deck',
    ],
    hsiNote: 'Disease attribution and yield forecasting are not within pilot scope; see "in development" above.',
  },
  Forestry: {
    inDevelopment: [],
    msi: [
      'Forest cover and type classification',
      'Land Use / Land Cover (LULC) mapping',
      'Deforestation and degradation detection',
      'Change detection over available archive',
      'Summary report and GeoTIFF map outputs',
    ],
    hsi: [
      'PROSAIL inversion: LAI, canopy chlorophyll (cab), canopy water content (cw), forest physiology and health score',
      'Above-ground biomass (AGB) proxy estimation',
      'Carbon stock proxy estimation',
      'SAR cloud gap fill where Sentinel-1 data is available over the AOI',
      'Validation report (~15 pages) and interpretation deck',
    ],
  },
  Water: {
    inDevelopment: [
      'Benthic habitat mapping (coral, algae, sand, depth)',
      'HAB forecasting',
    ],
    msi: [
      'Water body classification and surface mask',
      'Water quality constituents: Chl-a, turbidity, CDOM, TSS',
      'Anomaly detection against seasonal water quality baseline',
      'Time-series summary across available archive',
      'Summary report and GeoTIFF map outputs',
    ],
    hsi: [
      'Phycocyanin retrieval; cyanobacteria-specific, 620 nm absorption feature',
      'Full Inherent Optical Property (IOP) retrieval and absorption parameter decomposition',
      'Non-optical proxy estimates: dissolved oxygen (DO), pH, ammonia',
      'HAB classification and bloom extent where signal supports it',
      'Validation report (~15 pages) and interpretation deck',
    ],
  },
};

/* ─── Geology scope ─────────────────────────────────────────────────────── */

export const GEOLOGY_SCOPE = {
  inDevelopment: [
    'Full REE spectral library expansion',
    'Lithium / pegmatite detection',
    'SWIR mineral suite (requires Honeybee; not yet operational)',
  ],
  standard: [
    '1 Firefly VNIR acquisition over exploration target AOI',
    'NDVI masking and vegetation exclusion from analysis',
    'SAM + MTNF mineral classification and abundance mapping',
    'Iron oxide and hydrothermal alteration halo detection (goethite, hematite, jarosite)',
    'Nd continuum removal and REE proxy layer where applicable',
    'Prospectivity score and confidence layer per pixel',
    'Exploration report (~15 pages) and interpretation deck',
  ],
  enterpriseAdditions: [
    '2+ Firefly acquisitions; exact number and AOI by discussion',
    'Multi-target or multi-date comparison where applicable',
    'REE proxy layer and lithium / pegmatite assessment where applicable',
    'Drill target summary and full exploration interpretation report',
  ],
};

/* ─── Project-based scope ─────────────────────────────────────────────────── */

export const MINING_SCOPE = {
  items: [
    'Site boundary definition and change detection over available MSI archive',
    'Tailings storage facility extent, condition, and surface change mapping',
    'Evaporation pond area and condition monitoring',
    'Waste dump characterization and surface change assessment',
    'HSI-derived surface mineralogy and oxidation front detection (subject to Firefly acquisition feasibility)',
    'AMD proxy indicators from HSI where available',
    'Site condition report and ESG-relevant summary',
  ],
  pricing: 'By discussion. Minimum engagement ~$8,000 aligned to Standard monitoring tier; final fee determined by AOI, scope, and HSI task requirements.',
};

export const DEFENSE_SCOPE = {
  items: [
    'Site boundary definition and AI change detection over available archive',
    'Facility footprint mapping and object detection',
    'Site anomaly assessment against established baseline',
    'Terrain characterization for mobility assessment where applicable',
    'Material characterization from HSI where available and permitted',
    'Site intelligence report',
  ],
  pricing: 'By discussion. Minimum engagement $5,000 reflecting security review overhead. Final fee determined by AOI, classification requirements, HSI task requirements, and deliverable scope.',
};

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

/** Compute HSI+MSI and MSI-only prices with regional multiplier. */
export function calcTierPrices(vertical, multiplier = 1.0) {
  const isGeo = vertical === 'Geology';
  const tiers = isGeo
    ? TIER_PARAMS.geology
    : TIER_PARAMS.monitoring;

  return Object.entries(tiers).map(([tier, p]) => {
    const base = p.price;
    const hsiMsi = Math.round(base * multiplier);
    const msiOnly = isGeo ? null : Math.round(base * p.msiFactor * multiplier);
    return {
      tier,
      hsiMsi,
      msiOnly,
      prefix: p.pricePrefix || '',
      aoi: p.aoi,
      hsiTasks: p.hsiTasks,
      duration: p.duration,
      projectBased: !!p.projectBased,
    };
  });
}

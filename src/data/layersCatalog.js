/**
 * Layer catalog — seed rows mirror the standalone playbook artifact
 * (`Downloads/layers`). Edited rows persist via App shared state.
 *
 * `baseUsdPerKm2` is a working commercial list rate (USD per km²) used by the
 * Pilot Pricing Calculator when adding a layer from the catalog. Values are
 * indicative until finance standardizes pricing — edit in the Layer Catalog.
 */

export const LAYER_ENGINES = [
  'Data',
  'Aquatic',
  'Geology',
  'Trait & Structure',
  'Context',
  'Event',
  'Attribution',
  'Prediction',
  'Scoring',
  'SSE',
];

export const LAYER_STATUSES = ['aurora', 'piloting', 'r&d'];

/** Display label for catalog status (internal id → UI). */
export const LAYER_STATUS_LABELS = {
  aurora: 'Aurora',
  piloting: 'Piloting',
  'r&d': 'R&D',
};

export const LAYER_TIERS = ['FF', 'Open', 'Both'];

const LEGACY_TIER = { MSI: 'FF', HSI: 'FF', 'MSI/HSI': 'Both' };

/** Normalize persisted rows after renames (shipping→Aurora, MSI→FF, etc.). */
export function normalizeCatalogLayerRow(row) {
  if (!row || typeof row !== 'object') return row;
  const next = { ...row };
  if (next.status === 'shipping') next.status = 'aurora';
  if (LEGACY_TIER[next.tier]) next.tier = LEGACY_TIER[next.tier];
  return next;
}

export const seedLayers = [
  { id: 'l01', name: 'LAI', engine: 'Trait & Structure', tier: 'FF', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'PROSAIL inversion, calibrated uncertainty', baseUsdPerKm2: 10 },
  { id: 'l02', name: 'Chlorophyll (Cab)', engine: 'Trait & Structure', tier: 'FF', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'PROSAIL, uncertainty propagated', baseUsdPerKm2: 10 },
  { id: 'l03', name: 'Fractional Vegetation Cover', engine: 'Trait & Structure', tier: 'FF', grade: 'inventory', status: 'aurora', ready: 'live', notes: '', baseUsdPerKm2: 9 },
  { id: 'l04', name: 'Canopy Water Content', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q2 2026', notes: 'MSI ceiling — full inventory grade requires SWIR', baseUsdPerKm2: 12 },
  { id: 'l05', name: 'NDVI / EVI / NDRE', engine: 'Trait & Structure', tier: 'Open', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'Reference indices, not standalone product', baseUsdPerKm2: 5 },
  { id: 'l06', name: 'Nitrogen (leaf-level N)', engine: 'Trait & Structure', tier: 'FF', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'HSI differentiator vs MSI competitors', baseUsdPerKm2: 35 },
  { id: 'l07', name: 'Phosphorus (leaf P)', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q2 2026', notes: 'Crop-specific calibration in progress', baseUsdPerKm2: 40 },
  { id: 'l08', name: 'Potassium (leaf K)', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: '', baseUsdPerKm2: 40 },
  { id: 'l09', name: 'Carotenoids', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'r&d', ready: 'Q4 2026', notes: 'Stress signaling indicator', baseUsdPerKm2: 45 },
  { id: 'l10', name: 'Anthocyanins', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'r&d', ready: 'Q4 2026', notes: '', baseUsdPerKm2: 45 },
  { id: 'l11', name: 'Lignin / Cellulose', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'r&d', ready: '2027 (SWIR)', notes: 'Honeybee-dependent', baseUsdPerKm2: 55 },
  { id: 'l12', name: 'Above-Ground Biomass', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Forestry + ag dual-use', baseUsdPerKm2: 50 },
  { id: 'l13', name: 'Canopy Height', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q2 2026', notes: 'Fused with external DEM/GEDI', baseUsdPerKm2: 18 },
  { id: 'l14', name: 'Crop Type Classification', engine: 'Trait & Structure', tier: 'FF', grade: 'inventory', status: 'aurora', ready: 'live', notes: '', baseUsdPerKm2: 10 },
  { id: 'l15', name: 'Atmospheric Correction (L2A)', engine: 'Data', tier: 'Both', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'Foundational', baseUsdPerKm2: 8 },
  { id: 'l16', name: 'Cloud / Shadow Mask', engine: 'Data', tier: 'Both', grade: 'inventory', status: 'aurora', ready: 'live', notes: '', baseUsdPerKm2: 6 },
  { id: 'l17', name: 'MicroClim Features', engine: 'Data', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q2 2026', notes: 'Field-local climate context', baseUsdPerKm2: 14 },
  { id: 'l18', name: 'Co-registration & Lineage', engine: 'Data', tier: 'Both', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'Audit trail', baseUsdPerKm2: 8 },
  { id: 'l19', name: 'Field Baseline (per-AOI)', engine: 'Context', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Hyper-local, climate-conditioned', baseUsdPerKm2: 22 },
  { id: 'l20', name: 'Phenology State', engine: 'Context', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q2 2026', notes: '', baseUsdPerKm2: 15 },
  { id: 'l21', name: 'Anomaly Score', engine: 'Context', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Field-relative, not regional', baseUsdPerKm2: 25 },
  { id: 'l22', name: 'Persistence-filtered Events', engine: 'Event', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Spatial coherence + temporal persistence', baseUsdPerKm2: 32 },
  { id: 'l23', name: 'Event Lifecycle State', engine: 'Event', tier: 'Both', grade: 'exploration', status: 'r&d', ready: 'Q4 2026', notes: '7 event types', baseUsdPerKm2: 28 },
  { id: 'l24', name: 'Cause-of-Stress Hypotheses (MSI)', engine: 'Attribution', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Ranked causal hypotheses', baseUsdPerKm2: 35 },
  { id: 'l25', name: 'Cause-of-Stress Hypotheses (HSI)', engine: 'Attribution', tier: 'FF', grade: 'exploration', status: 'r&d', ready: 'Q4 2026', notes: 'Pigment + nutrient signatures sharpen ranking', baseUsdPerKm2: 50 },
  { id: 'l26', name: 'Stress Risk Forecast (2-4 wk)', engine: 'Prediction', tier: 'Both', grade: 'exploration', status: 'r&d', ready: 'Mar–Apr 2027', notes: 'Forward-looking, not nowcast', baseUsdPerKm2: 40 },
  { id: 'l27', name: 'Vertical Score (Ag)', engine: 'Scoring', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Joint with Platform', baseUsdPerKm2: 28 },
  { id: 'l28', name: 'Vertical Score (Forestry)', engine: 'Scoring', tier: 'Both', grade: 'exploration', status: 'r&d', ready: 'Q4 2026', notes: '', baseUsdPerKm2: 28 },
  { id: 'l29', name: 'Cause-of-Loss Evidence Pack', engine: 'Scoring', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q4 2026', notes: 'Insurance + finance use', baseUsdPerKm2: 35 },
  { id: 'l30', name: 'Alert Triggers (configurable)', engine: 'Scoring', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Threshold + persistence rules', baseUsdPerKm2: 22 },
  { id: 'l31', name: 'Semantic Search (DINOv3 + SAM)', engine: 'SSE', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q2 2026', notes: 'Petabyte archive, object-centric retrieval', baseUsdPerKm2: 55 },
  { id: 'l32', name: 'Deforestation Detection', engine: 'Event', tier: 'FF', grade: 'inventory', status: 'aurora', ready: 'live', notes: '', baseUsdPerKm2: 12 },
  { id: 'l33', name: 'Burn Scar / Fire Severity', engine: 'Event', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q2 2026', notes: '', baseUsdPerKm2: 28 },
  { id: 'l34', name: 'Carbon Stock (exploration)', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'r&d', ready: '2027 (SWIR)', notes: 'NOT MRV-grade until Honeybee', baseUsdPerKm2: 65 },

  /* —— Aquatic / HydroLight (seed: General Water Quality, HAB, coastal scaffolds) —— */
  { id: 'l35', name: 'Chlorophyll-a (water column)', engine: 'Aquatic', tier: 'Both', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'HydroLight inversion — inland + coastal', baseUsdPerKm2: 14 },
  { id: 'l36', name: 'Phycocyanin', engine: 'Aquatic', tier: 'Both', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'HAB indicator; HydroLight', baseUsdPerKm2: 14 },
  { id: 'l37', name: 'CDOM', engine: 'Aquatic', tier: 'Both', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'Colored dissolved organic matter', baseUsdPerKm2: 12 },
  { id: 'l38', name: 'Total Suspended Matter', engine: 'Aquatic', tier: 'Both', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'TSM / sediment load', baseUsdPerKm2: 12 },
  { id: 'l39', name: 'Turbidity', engine: 'Aquatic', tier: 'Both', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'Derived from IOPs / HydroLight', baseUsdPerKm2: 10 },
  { id: 'l40', name: 'Secchi Depth', engine: 'Aquatic', tier: 'Both', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'Water clarity', baseUsdPerKm2: 10 },
  { id: 'l41', name: 'IOPs (a · bb)', engine: 'Aquatic', tier: 'Both', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'Absorption + backscatter', baseUsdPerKm2: 14 },
  { id: 'l42', name: 'Remote-sensing reflectance (Rrs)', engine: 'Aquatic', tier: 'Both', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'Water-leaving reflectance', baseUsdPerKm2: 10 },
  { id: 'l43', name: 'Water pH (non-optical model)', engine: 'Aquatic', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Model-extended; validate per AOI', baseUsdPerKm2: 16 },
  { id: 'l44', name: 'Dissolved Oxygen (non-optical model)', engine: 'Aquatic', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Model-extended', baseUsdPerKm2: 16 },
  { id: 'l45', name: 'Ammonia (non-optical model)', engine: 'Aquatic', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Model-extended', baseUsdPerKm2: 16 },
  { id: 'l46', name: 'HAB Classification Layer', engine: 'Aquatic', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Bloom type / severity class', baseUsdPerKm2: 28 },
  { id: 'l47', name: 'Bloom Extent Mapping', engine: 'Aquatic', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Spatial extent of bloom', baseUsdPerKm2: 24 },
  { id: 'l48', name: 'Bloom Severity Score', engine: 'Aquatic', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: '', baseUsdPerKm2: 26 },
  { id: 'l49', name: 'HAB Risk Zone Mapping', engine: 'Aquatic', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Public-health / utility response', baseUsdPerKm2: 24 },
  { id: 'l50', name: 'Bloom Temporal Trend', engine: 'Aquatic', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Time series — forecast TBD per seed', baseUsdPerKm2: 22 },
  { id: 'l51', name: 'Benthic Substrate Classification', engine: 'Aquatic', tier: 'Both', grade: 'exploration', status: 'r&d', ready: 'TBD', notes: 'Scoping — confirm before proposals', baseUsdPerKm2: 38 },
  { id: 'l52', name: 'Seagrass Extent', engine: 'Aquatic', tier: 'Both', grade: 'exploration', status: 'r&d', ready: 'TBD', notes: 'Benthic scaffold', baseUsdPerKm2: 36 },
  { id: 'l53', name: 'Coastal Shoreline Change', engine: 'Aquatic', tier: 'FF', grade: 'exploration', status: 'r&d', ready: 'TBD', notes: 'Coastal change scaffold', baseUsdPerKm2: 22 },
  { id: 'l54', name: 'Wetland Inundation Extent', engine: 'Aquatic', tier: 'Both', grade: 'exploration', status: 'r&d', ready: 'TBD', notes: 'Wetland / inundation scaffold', baseUsdPerKm2: 24 },

  /* —— Forestry package extensions (seed) —— */
  { id: 'l55', name: 'Structural Loss Layer', engine: 'Event', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q4 2026', notes: 'Forest structural loss vs deforestation alert', baseUsdPerKm2: 14 },
  { id: 'l56', name: 'H-MECH Attribution', engine: 'Attribution', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q4 2026', notes: 'Mechanical vs biological loss', baseUsdPerKm2: 32 },
  { id: 'l57', name: 'Degradation Trend (BFAST-style)', engine: 'Event', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q4 2026', notes: 'Gradual degradation trajectory', baseUsdPerKm2: 20 },
  { id: 'l58', name: 'FIRMS Fire Corroboration', engine: 'Data', tier: 'Both', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'Active fire overlay / corroboration', baseUsdPerKm2: 8 },
  { id: 'l59', name: 'Fuel Moisture Layer (Cw-derived)', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q4 2026', notes: 'Pre-fire fuel state', baseUsdPerKm2: 16 },
  { id: 'l60', name: 'Wildfire Risk Score', engine: 'Scoring', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q4 2026', notes: 'Composite fuel + weather context', baseUsdPerKm2: 26 },
  { id: 'l61', name: 'Canopy Recovery Tracking', engine: 'Context', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q4 2026', notes: 'Post-fire / disturbance recovery', baseUsdPerKm2: 22 },
  { id: 'l62', name: 'Canopy Establishment (ARR)', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Afforestation / reforestation signal', baseUsdPerKm2: 16 },
  { id: 'l63', name: 'Restoration Counterfactual Baseline', engine: 'Context', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Neighbor-consistent baseline', baseUsdPerKm2: 24 },
  { id: 'l64', name: 'Monte Carlo Uncertainty Bounds (Carbon)', engine: 'Scoring', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Exploration-grade MRV — not credit issuance', baseUsdPerKm2: 40 },
  { id: 'l65', name: 'Carbon Change Detection', engine: 'Event', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Stock change signal; exploration grade', baseUsdPerKm2: 38 },

  /* —— Agriculture package extensions (seed) —— */
  { id: 'l66', name: 'Farm Boundary Model', engine: 'Trait & Structure', tier: 'FF', grade: 'inventory', status: 'aurora', ready: 'live', notes: 'Field delineation', baseUsdPerKm2: 12 },
  { id: 'l67', name: 'Climate-Weighted Expected State', engine: 'Context', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Expected crop state vs climate', baseUsdPerKm2: 24 },
  { id: 'l68', name: 'Water Deficit Index', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Drought / stress moisture signal', baseUsdPerKm2: 18 },
  { id: 'l69', name: 'Flood / Waterlogging Flag', engine: 'Event', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Excess water event flag', baseUsdPerKm2: 20 },
  { id: 'l70', name: 'Portfolio Crop Health Index', engine: 'Scoring', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q4 2026', notes: 'Normalized health across portfolio', baseUsdPerKm2: 26 },
  { id: 'l71', name: 'Field-Level Risk Score', engine: 'Scoring', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q4 2026', notes: 'Per-field risk for finance / insurance', baseUsdPerKm2: 28 },
  { id: 'l72', name: 'Spatial Correlation Adjustment', engine: 'Scoring', tier: 'Both', grade: 'exploration', status: 'r&d', ready: 'Q4 2026', notes: 'Portfolio spatial dependence', baseUsdPerKm2: 32 },

  /* —— Geology (seed: prospecting, REE, mining lifecycle) —— */
  { id: 'l73', name: 'Iron Oxide Index', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'live', notes: 'VNIR alteration / iron', baseUsdPerKm2: 22 },
  { id: 'l74', name: 'Gossan Indicator', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'live', notes: 'Weathering / gossan proxy', baseUsdPerKm2: 22 },
  { id: 'l75', name: 'Hydrothermal Alteration Zones', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'live', notes: 'Alteration mapping', baseUsdPerKm2: 28 },
  { id: 'l76', name: 'Clay Mineral Proxies (VNIR)', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'live', notes: 'SWIR upgrade on Honeybee', baseUsdPerKm2: 26 },
  { id: 'l77', name: 'Surface Mineralogy Mapping', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'live', notes: 'Exploration-grade mineralogy', baseUsdPerKm2: 32 },
  { id: 'l78', name: 'Geology Spectral Anomaly Layer', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'live', notes: 'Target generation', baseUsdPerKm2: 24 },
  { id: 'l79', name: 'REE Indicator Layer (VNIR)', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'live', notes: 'SWIR-grade REE awaits Honeybee', baseUsdPerKm2: 42 },
  { id: 'l80', name: 'Carbonatite Proxies', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'live', notes: 'Critical mineral reconnaissance', baseUsdPerKm2: 38 },
  { id: 'l81', name: 'Alkaline Intrusion Mapping', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'live', notes: '', baseUsdPerKm2: 36 },
  { id: 'l82', name: 'Critical Mineral Surface Proxies', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'live', notes: '', baseUsdPerKm2: 40 },
  { id: 'l83', name: 'Geology Spectral Confidence Layer', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'live', notes: 'Per-pixel quality for prospecting', baseUsdPerKm2: 18 },
  { id: 'l84', name: 'Evaporation Pond Monitoring', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'TBD', notes: 'Mining lifecycle — bespoke today', baseUsdPerKm2: 26 },
  { id: 'l85', name: 'Tailings Storage Facility Change', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'TBD', notes: 'TSF change detection', baseUsdPerKm2: 28 },
  { id: 'l86', name: 'Waste Dump Characterization', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'TBD', notes: '', baseUsdPerKm2: 26 },
  { id: 'l87', name: 'Pit Wall & Slope Mapping', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'TBD', notes: '', baseUsdPerKm2: 24 },
  { id: 'l88', name: 'Rehabilitation Progress Tracking', engine: 'Geology', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'TBD', notes: '', baseUsdPerKm2: 22 },
  { id: 'l89', name: 'Acid Mine Drainage Indicators', engine: 'Geology', tier: 'Both', grade: 'exploration', status: 'r&d', ready: 'TBD', notes: 'Spectral + contextual indicators', baseUsdPerKm2: 30 },

  /* —— Defense (seed packages) —— */
  { id: 'l90', name: 'Multi-Temporal Change Layer (site)', engine: 'Event', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Persistent change monitoring', baseUsdPerKm2: 36 },
  { id: 'l91', name: 'Surface Disturbance Classification', engine: 'Event', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: '', baseUsdPerKm2: 34 },
  { id: 'l92', name: 'Activity Signature Detection', engine: 'Event', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: '', baseUsdPerKm2: 38 },
  { id: 'l93', name: 'Site Baseline (SSE-derived)', engine: 'Context', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Embedding-normalized baseline', baseUsdPerKm2: 40 },
  { id: 'l94', name: 'Defense Anomaly Confidence Score', engine: 'Scoring', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Ranked anomaly strength', baseUsdPerKm2: 32 },
  { id: 'l95', name: 'Change Magnitude + Direction', engine: 'Event', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Vector / magnitude change', baseUsdPerKm2: 30 },
  { id: 'l96', name: 'Denied-Area Monitoring', engine: 'Event', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Pattern-of-life / compliance', baseUsdPerKm2: 42 },
  { id: 'l97', name: 'Runway Mapping + Condition Assessment', engine: 'Trait & Structure', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Airfield characterization', baseUsdPerKm2: 38 },
  { id: 'l98', name: 'Apron + Taxiway Characterization', engine: 'Trait & Structure', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: '', baseUsdPerKm2: 34 },
  { id: 'l99', name: 'Facility Footprint Extraction', engine: 'SSE', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Geometry + extent from archive', baseUsdPerKm2: 36 },
  { id: 'l100', name: 'Object Embedding Index (SSE)', engine: 'SSE', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q2 2026', notes: 'Similarity-ready embeddings', baseUsdPerKm2: 52 },
  { id: 'l101', name: 'Cross-Archive Similarity Search', engine: 'SSE', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q2 2026', notes: 'Match sites across time/collects', baseUsdPerKm2: 50 },
  { id: 'l102', name: 'Infrastructure Classification', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Built-up / facility classes', baseUsdPerKm2: 28 },
  { id: 'l103', name: 'Surface Material Characterization (defense HSI)', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Material / camouflage-relevant', baseUsdPerKm2: 48 },
  { id: 'l104', name: 'Terrain Soil Moisture (Cw-derived)', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Mobility / trafficability input', baseUsdPerKm2: 22 },
  { id: 'l105', name: 'Terrain Soil Texture Proxies (HSI)', engine: 'Trait & Structure', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: '', baseUsdPerKm2: 40 },
  { id: 'l106', name: 'Bearing Capacity Indicators', engine: 'Scoring', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Proxy stack for mobility', baseUsdPerKm2: 30 },
  { id: 'l107', name: 'Tankability Score', engine: 'Scoring', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Go / no-go style index', baseUsdPerKm2: 34 },
  { id: 'l108', name: 'Trafficability Classification', engine: 'Scoring', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: '', baseUsdPerKm2: 32 },
  { id: 'l109', name: 'Seasonal Mobility Windows', engine: 'Prediction', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q4 2026', notes: 'When soils support movement', baseUsdPerKm2: 28 },
  { id: 'l110', name: 'Terrain Classification (defense)', engine: 'Trait & Structure', tier: 'Both', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Landform / surface class', baseUsdPerKm2: 26 },
  { id: 'l111', name: 'MRV Evidence Package (exploration)', engine: 'Scoring', tier: 'FF', grade: 'exploration', status: 'piloting', ready: 'Q3 2026', notes: 'Bundled carbon MRV narrative — not credit issuance', baseUsdPerKm2: 45 },
];

/**
 * Merge persisted layer rows with the current seed so new fields (e.g.
 * `baseUsdPerKm2`) backfill without wiping user edits.
 */
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
        baseUsdPerKm2:
          typeof row.baseUsdPerKm2 === 'number' && !Number.isNaN(row.baseUsdPerKm2)
            ? row.baseUsdPerKm2
            : s.baseUsdPerKm2,
      });
    });

  const customRows = stored
    .filter((row) => !seedById[row.id])
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

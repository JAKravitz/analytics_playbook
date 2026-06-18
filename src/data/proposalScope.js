/**
 * Pilot proposal scope content; V3 product alignment.
 *
 * V3 model:
 *   Product pilots: TRACE (agriculture), SWIPE (water), SCOPE (geology).
 *   Monitoring pilots (TRACE, SWIPE): separate MSI Analytics and Hyperspectral products.
 *   Tiers (Basic / Standard / Enterprise) differ by AOI size; Hyperspectral tiers also differ
 *   by Firefly task count. SCOPE geology pilots are HSI-only (Standard / Enterprise).
 *
 * Contract-based defense, mining, forestry, and multi-vertical programs are out of scope here —
 * see Bespoke projects & pipeline in the playbook.
 *
 * Exports:
 *   MONITORING_SCOPE  — TRACE · Agriculture, SWIPE · Water
 *   GEOLOGY_SCOPE     — SCOPE · Geology
 */

/* ─── Monitoring scope — TRACE & SWIPE ───────────────────────────────────── */

export const MONITORING_SCOPE = {
  Agriculture: {
    product: 'TRACE',
    inDevelopment: [
      'Causal attribution (ranked stress drivers)',
      'Soil NPK / SOC estimation',
      'Irrigation optimization',
      'Yield / biomass / production forecasting',
      'NEXUS cube persistence and LENS semantic search',
    ],
    msi: [
      'Farm boundary delineation and crop type classification',
      'Phenology stage and growth trajectory summary',
      'Spectral health indices: NDRE, NDVI narrowband, PRI (photosynthetic efficiency), CIgreen, PSRI (senescence marker)',
      'PROSAIL canopy inversion (MSI-tier): Leaf Area Index (LAI), fAPAR, canopy chlorophyll (cab), canopy water (Cw)',
      'Anomaly detection against MSI seasonal baseline; flagged management units for review',
      'Summary report and GeoTIFF map outputs',
    ],
    hsi: [
      'PROSAIL canopy radiative-transfer inversion: LAI, fAPAR, canopy chlorophyll (cab), canopy water (Cw), carotenoids (Car), dry matter (Cm), anthocyanins (Anth) where signal supports',
      'Physiology and health score per management unit derived from HSI biophysical retrievals',
      'Generalized stress and severity classification from HSI retrievals (not ranked cause attribution)',
      'Validation report (~15 pages) and interpretation deck',
    ],
    hsiNote:
      'Ranked cause attribution, disease-specific diagnosis, and yield forecasting are not within pilot scope; see "in development" above.',
  },
  Water: {
    product: 'SWIPE',
    inDevelopment: [
      'Benthic habitat mapping (coral, algae, sand, depth)',
      'HAB forecasting',
      'Full NEXUS waterbody cube and semantic query',
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
      'Full Inherent Optical Property (IOP) retrieval and absorption parameter decomposition (HydroLight emulator)',
      'Non-optical proxy estimates: dissolved oxygen (DO), pH, ammonia where validated',
      'HAB classification and bloom extent where signal supports it',
      'Validation report (~15 pages) and interpretation deck',
    ],
  },
};

/* ─── Geology scope — SCOPE ─────────────────────────────────────────────── */

export const GEOLOGY_SCOPE = {
  product: 'SCOPE',
  inDevelopment: [
    'Full REE spectral library expansion',
    'Lithium / pegmatite detection',
    'SWIR mineral suite (requires Honeybee; not yet operational)',
    'NEXUS belt-scale cube persistence and semantic search',
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

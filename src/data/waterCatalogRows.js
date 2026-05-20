/** Water API catalog — from Water API Catalog.docx (product). */
const WATER = ['water'];

export const waterApiRows = [
  {
    "id": "water-waterbody-boundary-api",
    "name": "Waterbody Boundary API",
    "provides": "Lake / reservoir / river AOIs and stable IDs",
    "requires": [],
    "upliftMsi": "Baseline product on MSI imagery.",
    "upliftVnirHsi": "No uplift",
    "upliftVnirSwir": "No uplift",
    "baseUsdPerKm2": 5,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "aurora",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "water-surface-water-mask-api",
    "name": "Surface Water Mask API",
    "provides": "Water extent and valid observation mask",
    "requires": [
      "Waterbody Boundary API"
    ],
    "upliftMsi": "Broadband MSI retrievals where mask and atmospheric quality allow.",
    "upliftVnirHsi": "Improved water-land edge delineation via red-edge and NIR water absorption features",
    "upliftVnirSwir": "No significant additional uplift \u2014 water masking well-solved at VNIR",
    "baseUsdPerKm2": 8,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "aurora",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "water-water-quality-constituent-api",
    "name": "Water Quality Constituent API",
    "provides": "Chl-a, phycocyanin, CDOM, TSM, turbidity, IOPs, Secchi depth",
    "requires": [
      "Waterbody Boundary API",
      "Surface Water Mask API",
      "Optical Inversion (internal)"
    ],
    "upliftMsi": "Limited MSI capability \u2014 full product requires VNIR HSI.",
    "upliftVnirHsi": "Improved Chl-a and phycocyanin retrieval via narrow-band red-edge features (700\u2013730nm); phycocyanin detection via 620nm absorption \u2014 not retrievable from MSI",
    "upliftVnirSwir": "Adds CDOM and TSM retrieval at higher precision via SWIR water absorption constraints; improved IOP decomposition",
    "baseUsdPerKm2": 18,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "aurora",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "water-non-optical-estimation-api",
    "name": "Non-Optical Estimation API",
    "provides": "pH, dissolved oxygen, ammonia proxies and inferred values",
    "requires": [
      "Water Quality Constituent API"
    ],
    "upliftMsi": "Broadband MSI retrievals where mask and atmospheric quality allow.",
    "upliftVnirHsi": "Proxy relationships improved by higher-precision Chl-a and phycocyanin inputs",
    "upliftVnirSwir": "Further improved by SWIR-constrained constituent retrievals feeding proxy models",
    "baseUsdPerKm2": 24,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "aurora",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "water-water-quality-anomaly-api",
    "name": "Water Quality Anomaly API",
    "provides": "Deviations from expected water quality behavior",
    "requires": [
      "Water Quality Constituent API"
    ],
    "upliftMsi": "Broadband MSI retrievals where mask and atmospheric quality allow.",
    "upliftVnirHsi": "Anomalies computed in constituent space \u2014 more specific than broadband index anomalies",
    "upliftVnirSwir": "SWIR-constrained constituents reduce retrieval uncertainty \u2014 anomaly detection more sensitive",
    "baseUsdPerKm2": 12,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "r&d",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "water-threshold-exceedance-api",
    "name": "Threshold / Exceedance API",
    "provides": "Configurable water quality exceedance triggers",
    "requires": [
      "Water Quality Constituent API",
      "Water Quality Anomaly API"
    ],
    "upliftMsi": "Broadband MSI retrievals where mask and atmospheric quality allow.",
    "upliftVnirHsi": "Earlier exceedance detection via more sensitive constituent retrievals",
    "upliftVnirSwir": "Higher-confidence exceedances from SWIR-extended retrievals",
    "baseUsdPerKm2": 4,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "scoping",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "water-confidence-api",
    "name": "Confidence API",
    "provides": "Confidence and uncertainty on all outputs",
    "requires": [
      "Water Quality Constituent API",
      "Non-Optical Estimation API"
    ],
    "upliftMsi": "Broadband MSI retrievals where mask and atmospheric quality allow.",
    "upliftVnirHsi": "Confidence informed by spectral fit quality across VNIR water features",
    "upliftVnirSwir": "Full-curve spectral fit including SWIR \u2014 tighter uncertainty bounds on CDOM, TSM, and IOP retrievals",
    "baseUsdPerKm2": 6,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "r&d",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "water-optical-inversion-api",
    "name": "Optical Inversion API",
    "provides": "Core optical retrievals from HSI/MSI: reflectance spectra, absorption and backscattering coefficients",
    "requires": [
      "Waterbody Boundary API",
      "Surface Water Mask API"
    ],
    "upliftMsi": "Limited MSI capability \u2014 full product requires VNIR HSI.",
    "upliftVnirHsi": "Full water-leaving reflectance curve \u2014 narrow-band features enable constituent-specific absorption decomposition not possible with MSI",
    "upliftVnirSwir": "SWIR constraints improve water column optical closure \u2014 more accurate IOP partitioning",
    "baseUsdPerKm2": 24,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "aurora",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "water-hab-classification-api",
    "name": "HAB Classification API",
    "provides": "Likely HAB presence and bloom class",
    "requires": [
      "Water Quality Constituent API"
    ],
    "upliftMsi": "Limited MSI capability \u2014 full product requires VNIR HSI.",
    "upliftVnirHsi": "Phycocyanin detection at 620nm \u2014 cyanobacteria-specific signal not retrievable from MSI broadband; improved bloom class separation",
    "upliftVnirSwir": "SWIR-constrained water optical properties improve bloom class confidence in turbid or CDOM-rich waters",
    "baseUsdPerKm2": 22,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "piloting",
    "apiReady": "TBD",
    "kind": "addon",
    "addonFamily": "HAB Monitor & Forecast"
  },
  {
    "id": "water-bloom-extent-api",
    "name": "Bloom Extent API",
    "provides": "Bloom footprint and affected area",
    "requires": [
      "HAB Classification API",
      "Surface Water Mask API"
    ],
    "upliftMsi": "Broadband MSI retrievals where mask and atmospheric quality allow.",
    "upliftVnirHsi": "Bloom boundary delineated against HSI-informed water mask \u2014 more accurate extent in mixed water-vegetation margins",
    "upliftVnirSwir": "No significant additional uplift for extent mapping",
    "baseUsdPerKm2": 22,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "r&d",
    "apiReady": "TBD",
    "kind": "addon",
    "addonFamily": "HAB Monitor & Forecast"
  },
  {
    "id": "water-bloom-severity-api",
    "name": "Bloom Severity API",
    "provides": "Severity and intensity score",
    "requires": [
      "HAB Classification API",
      "Water Quality Constituent API"
    ],
    "upliftMsi": "Broadband MSI retrievals where mask and atmospheric quality allow.",
    "upliftVnirHsi": "Severity scored on phycocyanin concentration and Chl-a \u2014 spectrally-derived, not proxy-based",
    "upliftVnirSwir": "SWIR-extended constituent retrievals improve severity scoring in optically complex waters",
    "baseUsdPerKm2": 22,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "r&d",
    "apiReady": "TBD",
    "kind": "addon",
    "addonFamily": "HAB Monitor & Forecast"
  },
  {
    "id": "water-risk-zone-api",
    "name": "Risk Zone API",
    "provides": "High-risk zones around bloom conditions",
    "requires": [
      "HAB Classification API",
      "Bloom Extent API"
    ],
    "upliftMsi": "Broadband MSI retrievals where mask and atmospheric quality allow.",
    "upliftVnirHsi": "Risk zones defined by spectrally-confirmed bloom margins \u2014 more defensible than index-threshold zones",
    "upliftVnirSwir": "No significant additional uplift",
    "baseUsdPerKm2": 15,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "piloting",
    "apiReady": "TBD",
    "kind": "addon",
    "addonFamily": "HAB Monitor & Forecast"
  },
  {
    "id": "water-temporal-trend-api",
    "name": "Temporal Trend API",
    "provides": "Time-series trend and bloom evolution",
    "requires": [
      "HAB Classification API",
      "Bloom Extent API",
      "Bloom Severity API"
    ],
    "upliftMsi": "Broadband MSI retrievals where mask and atmospheric quality allow.",
    "upliftVnirHsi": "Trend built on spectrally-consistent constituent retrievals \u2014 less susceptible to inter-scene index drift",
    "upliftVnirSwir": "SWIR-constrained retrievals improve temporal consistency across varying water optical conditions",
    "baseUsdPerKm2": 15,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "aurora",
    "apiReady": "TBD",
    "kind": "addon",
    "addonFamily": "HAB Monitor & Forecast"
  },
  {
    "id": "water-hab-forecast-api",
    "name": "HAB Forecast API",
    "provides": "Forward-looking bloom risk and spread forecast",
    "requires": [
      "HAB Classification API",
      "Temporal Trend API"
    ],
    "upliftMsi": "Broadband MSI retrievals where mask and atmospheric quality allow.",
    "upliftVnirHsi": "Earlier forecast trigger \u2014 HSI detects bloom onset earlier, extending effective forecast lead time",
    "upliftVnirSwir": "SWIR-improved constituent retrievals reduce uncertainty in forecast initial conditions",
    "baseUsdPerKm2": 22,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "scoping",
    "apiReady": "TBD",
    "kind": "addon",
    "addonFamily": "HAB Monitor & Forecast"
  },
  {
    "id": "water-hab-confidence-forecast-api",
    "name": "Confidence API (Forecast) API",
    "provides": "Forecast reliability and uncertainty \u2014 folded into standard Confidence API",
    "requires": [
      "HAB Forecast API",
      "HAB Classification API"
    ],
    "upliftMsi": "Broadband MSI retrievals where mask and atmospheric quality allow.",
    "upliftVnirHsi": "Confidence informed by spectral retrieval quality and bloom classification certainty",
    "upliftVnirSwir": "SWIR-extended retrievals tighten confidence bounds \u2014 particularly in turbid and CDOM-rich waters",
    "baseUsdPerKm2": 6,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "r&d",
    "apiReady": "TBD",
    "kind": "addon",
    "addonFamily": "HAB Monitor & Forecast"
  },
  {
    "id": "water-benthic-habitat-classification-api",
    "name": "Benthic Habitat Classification API",
    "provides": "Sand / algae / coral / seagrass bottom class outputs",
    "requires": [
      "Waterbody Boundary API",
      "Surface Water Mask API",
      "Seafloor Spectral Feature (internal)",
      "Water Column Correction (internal)"
    ],
    "upliftMsi": "Limited MSI capability \u2014 full product requires VNIR HSI.",
    "upliftVnirHsi": "Full VNIR spectral curve enables species-assemblage level benthic discrimination \u2014 MSI broadband conflates bottom classes",
    "upliftVnirSwir": "SWIR adds no uplift for benthic mapping \u2014 SWIR attenuates completely in water column",
    "baseUsdPerKm2": 22,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "r&d",
    "apiReady": "TBD",
    "kind": "addon",
    "addonFamily": "Benthic Mapping"
  },
  {
    "id": "water-bleaching-indicator-api",
    "name": "Bleaching Indicator API",
    "provides": "Bleaching-related condition signals",
    "requires": [
      "Benthic Habitat Classification API"
    ],
    "upliftMsi": "Limited MSI capability \u2014 full product requires VNIR HSI.",
    "upliftVnirHsi": "Bleaching detected via loss of zooxanthellae pigment signal (550\u2013600nm) \u2014 spectrally specific, not possible with MSI",
    "upliftVnirSwir": "No uplift \u2014 SWIR attenuates in water column",
    "baseUsdPerKm2": 28,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "scoping",
    "apiReady": "TBD",
    "kind": "addon",
    "addonFamily": "Benthic Mapping"
  },
  {
    "id": "water-threshold-alert-api",
    "name": "Threshold Alert API",
    "provides": "Configurable threshold-based alerts on any subscribed output",
    "requires": [
      "At least one Core or Add-on API subscription API"
    ],
    "upliftMsi": "Broadband MSI retrievals where mask and atmospheric quality allow.",
    "upliftVnirHsi": "Earlier trigger via spectrally-specific constituent retrievals \u2014 phycocyanin and Chl-a alerts ahead of MSI-detectable bloom signals",
    "upliftVnirSwir": "Earlier still via SWIR-constrained constituent retrievals in optically complex waters",
    "baseUsdPerKm2": 4,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "scoping",
    "apiReady": "TBD",
    "kind": "addon",
    "addonFamily": "Alerting"
  },
  {
    "id": "water-webhook-delivery-api",
    "name": "Webhook Delivery API",
    "provides": "Push-based delivery of alerts to customer endpoints",
    "requires": [
      "Threshold Alert API"
    ],
    "upliftMsi": "Baseline product on MSI imagery.",
    "upliftVnirHsi": "No uplift",
    "upliftVnirSwir": "No uplift",
    "baseUsdPerKm2": 2,
    "verticals": WATER,
    "tier": "Both",
    "grade": "inventory",
    "status": "scoping",
    "apiReady": "TBD",
    "kind": "addon",
    "addonFamily": "Alerting"
  }
];

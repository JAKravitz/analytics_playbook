/** Forestry API catalog — from Forestry API Catalog.docx (product). */
const FORESTRY = ['forestry'];

export const forestryApiRows = 
[
  {
    "id": "forest-area-boundary-api",
    "name": "Area Boundary API",
    "provides": "AOI / parcel / jurisdiction boundaries and stable IDs",
    "requires": [],
    "upliftMsi": "Baseline geometry on MSI and open reference layers.",
    "upliftVnirHsi": "No uplift",
    "upliftVnirSwir": "No uplift",
    "notes": "Foundation geometry for all forest analytics.",
    "baseUsdPerKm2": 5,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "aurora",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "forest-cover-forest-type-api",
    "name": "Forest Cover & Forest Type API",
    "provides": "Forest extent, forest mask, forest class",
    "requires": [
      "Area Boundary API"
    ],
    "upliftMsi": "Forest mask from broadband greenness and texture.",
    "upliftVnirHsi": "Improved species-level forest type discrimination via full VNIR spectral curve — separates broadleaf vs. needleleaf assemblages more accurately.",
    "upliftVnirSwir": "Adds structural forest type separation via canopy water content (1400nm) and lignin/cellulose (2100nm) — improved discrimination of dry vs. wet forest types.",
    "baseUsdPerKm2": 12,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "aurora",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "forest-change-detection-api",
    "name": "Change Detection API",
    "provides": "Forest change signal and disturbance magnitude",
    "requires": [
      "Area Boundary API",
      "Forest Cover & Forest Type API",
      "Expected-State API"
    ],
    "upliftMsi": "Change vs. index baseline.",
    "upliftVnirHsi": "Change signals detected against biochemical baseline — earlier detection of stress-induced pre-disturbance decline.",
    "upliftVnirSwir": "SWIR adds structural change detection (canopy water loss, dry matter shift) before visible canopy loss.",
    "baseUsdPerKm2": 0,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "aurora",
    "apiReady": "TBD",
    "kind": "internal"
  },
  {
    "id": "forest-degradation-detection-api",
    "name": "Degradation Detection API",
    "provides": "Subtle structural degradation and trend detection",
    "requires": [
      "Change Detection API",
      "Expected-State API"
    ],
    "upliftMsi": "Gradual trends in greenness where signal allows.",
    "upliftVnirHsi": "Canopy biochemical decline (cab, cw) detectable before structural thinning visible in MSI.",
    "upliftVnirSwir": "SWIR-derived structural thinning (cm, lignin) detectable earlier and more precisely — key for selective logging and fragmentation detection.",
    "baseUsdPerKm2": 18,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "scoping",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "forest-deforestation-detection-api",
    "name": "Deforestation Detection API",
    "provides": "Abrupt loss and clearing detection",
    "requires": [
      "Change Detection API"
    ],
    "upliftMsi": "Abrupt loss vs. forest mask.",
    "upliftVnirHsi": "Clearing detection against biochemically-informed forest mask — fewer false positives at forest-agriculture boundaries.",
    "upliftVnirSwir": "No significant additional uplift for abrupt clearing — VNIR already sufficient.",
    "baseUsdPerKm2": 14,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "scoping",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "forest-fire-corroboration-api",
    "name": "Fire Corroboration API",
    "provides": "FIRMS / fire-linked corroboration signals",
    "requires": [
      "Area Boundary API",
      "Climate Forcing API"
    ],
    "upliftMsi": "Thermal and FIRMS-driven corroboration; MSI context only.",
    "upliftVnirHsi": "No uplift — fire corroboration is thermal/external data driven.",
    "upliftVnirSwir": "No uplift",
    "baseUsdPerKm2": 8,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "scoping",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "forest-attribution-api",
    "name": "Attribution API",
    "provides": "Likely driver and disturbance class",
    "requires": [
      "Change Detection API",
      "Degradation Detection API",
      "Deforestation Detection API",
      "Fire Corroboration API"
    ],
    "upliftMsi": "Coarse driver classes from indices and change timing.",
    "upliftVnirHsi": "Spectral separation of logging, fire, agricultural encroachment, and drought-induced decline.",
    "upliftVnirSwir": "Adds separation of drought stress vs. pathogen-induced decline via SWIR water and structural signals.",
    "baseUsdPerKm2": 22,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "r&d",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "forest-confidence-api",
    "name": "Confidence API",
    "provides": "Confidence and uncertainty on all base outputs",
    "requires": [
      "Change Detection API",
      "Degradation Detection API",
      "Deforestation Detection API",
      "Attribution API"
    ],
    "upliftMsi": "Confidence from temporal consistency.",
    "upliftVnirHsi": "Confidence informed by spectral fit quality across red-edge and VNIR features.",
    "upliftVnirSwir": "Full-curve spectral fit including SWIR — tighter uncertainty bounds on degradation and attribution outputs.",
    "baseUsdPerKm2": 6,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "r&d",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "forest-evidence-api",
    "name": "Evidence API",
    "provides": "Machine-readable evidence package for monitoring and response",
    "requires": [
      "Attribution API",
      "Confidence API"
    ],
    "upliftMsi": "Evidence trail from indices and change products.",
    "upliftVnirHsi": "Richer spectral evidence trail — biochemical attribution included in evidence package.",
    "upliftVnirSwir": "Full SWIR-extended attribution — strongest defensibility for regulatory and compliance reporting.",
    "baseUsdPerKm2": 15,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "scoping",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "forest-land-cover-api",
    "name": "Land Cover API",
    "provides": "Surrounding land use and non-forest context",
    "requires": [
      "Area Boundary API"
    ],
    "upliftMsi": "Broadband land cover context.",
    "upliftVnirHsi": "Improved separation of spectrally similar land cover classes at forest margins.",
    "upliftVnirSwir": "Adds discrimination of dry vegetation, NPV, and soil classes via SWIR — reduces misclassification at forest-agriculture boundaries.",
    "baseUsdPerKm2": 0,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "aurora",
    "apiReady": "TBD",
    "kind": "internal"
  },
  {
    "id": "forest-climate-forcing-api",
    "name": "Climate Forcing API",
    "provides": "Rainfall, temperature, dryness, and environmental drivers",
    "requires": [
      "Area Boundary API"
    ],
    "upliftMsi": "MSI/external climate stack.",
    "upliftVnirHsi": "No uplift — climate forcing is MSI/external data driven.",
    "upliftVnirSwir": "No uplift",
    "baseUsdPerKm2": 0,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "r&d",
    "apiReady": "TBD",
    "kind": "internal"
  },
  {
    "id": "forest-phenology-api",
    "name": "Phenology API",
    "provides": "Vegetation stage and trajectory context",
    "requires": [
      "Area Boundary API",
      "Forest Cover & Forest Type API",
      "Climate Forcing API"
    ],
    "upliftMsi": "NDVI phenology milestones.",
    "upliftVnirHsi": "Stage transitions via chlorophyll dynamics — more precise than NDVI inflection alone.",
    "upliftVnirSwir": "Adds senescence and dry matter accumulation staging via SWIR.",
    "baseUsdPerKm2": 0,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "aurora",
    "apiReady": "TBD",
    "kind": "internal"
  },
  {
    "id": "forest-expected-state-api",
    "name": "Expected-State API",
    "provides": "Expected forest condition and structure trajectory",
    "requires": [
      "Area Boundary API",
      "Forest Cover & Forest Type API",
      "Climate Forcing API"
    ],
    "upliftMsi": "Index-space expected trajectories.",
    "upliftVnirHsi": "Baseline expressed in biophysical units (LAI, cab, cw) — more stable across illumination and seasonal conditions.",
    "upliftVnirSwir": "Baseline extended to SWIR-derived structural traits — richer expected state model capturing canopy water and dry matter dynamics.",
    "baseUsdPerKm2": 0,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "r&d",
    "apiReady": "TBD",
    "kind": "internal"
  },
  {
    "id": "forest-anomaly-api",
    "name": "Anomaly API",
    "provides": "Deviations from expected forest condition",
    "requires": [
      "Expected-State API"
    ],
    "upliftMsi": "Index anomalies vs. baseline.",
    "upliftVnirHsi": "Anomalies in biophysical trait space (cab, cw deviation) — more interpretable than index anomalies.",
    "upliftVnirSwir": "Anomalies resolvable into SWIR trait space — structural anomalies separable from pigment anomalies.",
    "baseUsdPerKm2": 0,
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "r&d",
    "apiReady": "TBD",
    "kind": "internal"
  },
  {
    "id": "forest-trait-api",
    "name": "Trait API",
    "provides": "Forest canopy biophysical variables per image: LAI, cab, cw, cm, Car",
    "requires": [
      "Area Boundary API",
      "Forest Cover & Forest Type API"
    ],
    "upliftMsi": "Coarse trait estimates from multispectral inversion.",
    "upliftVnirHsi": "See trait detail below.",
    "upliftVnirSwir": "See trait detail below.",
    "notes": "PROSAIL-class traits for forest canopy.",
    "baseUsdPerKm2": 26,
    "traitDetail": {
      "headers": [
        "Trait",
        "MSI",
        "VNIR HSI",
        "VNIR-SWIR HSI",
        "Notes"
      ],
      "rows": [
        [
          "LAI",
          "Low precision; saturation above ~3 in dense canopy",
          "Higher precision; full red-edge inversion reduces saturation",
          "Highest precision; SWIR scattering improves canopy structure inversion in dense tropical forest",
          ""
        ],
        [
          "cab (Canopy chlorophyll)",
          "Coarse — red-edge bands give correlated estimate",
          "Full red-edge inversion — sensitive to early canopy stress and species-level variation",
          "Same as VNIR; SWIR adds no uplift for cab",
          "Early degradation and stress indicator"
        ],
        [
          "cw (Canopy water content)",
          "No",
          "970nm and 1200nm absorption features",
          "Higher sensitivity at 1400nm and 1900nm — wider dynamic range; primary fuel moisture and drought stress indicator",
          "Critical for wildfire risk and drought-induced degradation"
        ],
        [
          "cm (Dry matter / LMA)",
          "No",
          "No — cm features sit at 1600–2300nm",
          "Yes — cellulose, lignin features at 1600–2300nm",
          "Structural degradation, fuel load, and selective logging indicator"
        ],
        [
          "Car (Carotenoids)",
          "No",
          "Yes — 500–570nm features separable from chlorophyll",
          "Same as VNIR",
          "Early stress and senescence indicator"
        ],
        [
          "Lignin / Cellulose",
          "No",
          "No",
          "Yes — 2100nm and 2300nm absorption features",
          "Structural integrity, fuel load, logging damage, and pathogen indicator"
        ]
      ]
    },
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "aurora",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "forest-structure-api",
    "name": "Structure API",
    "provides": "Forest structural variables per image: fAGB, canopy height, forest cover fraction",
    "requires": [
      "Area Boundary API",
      "Forest Cover & Forest Type API",
      "Trait API"
    ],
    "upliftMsi": "Structure proxies from greenness and cover.",
    "upliftVnirHsi": "See structure detail below.",
    "upliftVnirSwir": "See structure detail below.",
    "notes": "Links traits to AGB, height stratification inputs, and cover fraction.",
    "baseUsdPerKm2": 28,
    "structureDetail": {
      "headers": [
        "Variable",
        "MSI",
        "VNIR HSI",
        "VNIR-SWIR HSI",
        "Notes"
      ],
      "rows": [
        [
          "fAGB (Forest aboveground biomass)",
          "Low precision — greenness proxy with high uncertainty in dense canopy",
          "Improved — LAI and cab-informed biomass proxy; reduced saturation in dense forest",
          "Highest precision — SWIR-derived cm and lignin directly constrain biomass estimation; reduces reliance on allometric assumptions",
          "Primary carbon stock input"
        ],
        [
          "Canopy height",
          "No direct retrieval — requires SAR or LiDAR fusion",
          "No direct retrieval — requires SAR or LiDAR fusion",
          "No direct retrieval — requires SAR or LiDAR fusion",
          "HSI improves canopy type classification used to stratify height estimates from SAR/LiDAR"
        ],
        [
          "Forest cover fraction",
          "Moderate — broadband indices confound cover and density",
          "Improved — red-edge and VNIR features better separate sparse vs. dense canopy",
          "Highest precision — SWIR structural features improve sparse canopy and woodland cover fraction retrieval",
          "Key input to MRV and restoration monitoring"
        ]
      ]
    },
    "verticals": FORESTRY,
    "tier": "Both",
    "grade": "inventory",
    "status": "aurora",
    "apiReady": "TBD",
    "kind": "core"
  },
  {
    "id": "forest-expected-restoration-trajectory-api",
    "name": "Expected Restoration Trajectory API",
    "provides": "Expected canopy and vegetation recovery path",
    "addonFamily": "ARR & Restoration Monitoring",
    "requires": [
      "Area Boundary API",
      "Land Cover API",
      "Forest Cover & Forest Type API",
      "Climate Forcing API",
      "Phenology API"
    ],
    "upliftMsi": "Index-based recovery envelope.",
    "upliftVnirHsi": "Trajectory expressed in biophysical units (LAI, cab, cw) — more sensitive to early establishment signals.",
    "upliftVnirSwir": "SWIR-extended trajectory captures structural canopy development milestones.",
    "baseUsdPerKm2": 18,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-establishment-detection-api",
    "name": "Establishment Detection API",
    "provides": "Whether restoration establishment has occurred",
    "addonFamily": "ARR & Restoration Monitoring",
    "requires": [
      "Expected Restoration Trajectory API"
    ],
    "upliftMsi": "Greenness threshold establishment.",
    "upliftVnirHsi": "Establishment detected via chlorophyll emergence and early canopy water signal — earlier than MSI greenness threshold.",
    "upliftVnirSwir": "Earlier still via SWIR canopy water content — detects establishment before full canopy closure.",
    "baseUsdPerKm2": 20,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-canopy-establishment-api",
    "name": "Canopy Establishment API",
    "provides": "Canopy formation and closure progress",
    "addonFamily": "ARR & Restoration Monitoring",
    "requires": [
      "Establishment Detection API",
      "Expected Restoration Trajectory API"
    ],
    "upliftMsi": "Cover fraction trend.",
    "upliftVnirHsi": "Canopy closure tracked via LAI and cab dynamics.",
    "upliftVnirSwir": "SWIR-derived cm and canopy water add structural canopy development signal.",
    "baseUsdPerKm2": 18,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-growth-trajectory-api",
    "name": "Growth Trajectory API",
    "provides": "Vegetation and canopy progress vs. expected",
    "addonFamily": "ARR & Restoration Monitoring",
    "requires": [
      "Canopy Establishment API",
      "Expected Restoration Trajectory API",
      "Phenology API"
    ],
    "upliftMsi": "Progress vs. seasonal index expectation.",
    "upliftVnirHsi": "Progress tracked in biophysical units against biochemically-informed expected trajectory.",
    "upliftVnirSwir": "SWIR structural signals extend trajectory tracking into canopy maturation phase.",
    "baseUsdPerKm2": 17,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-counterfactual-baseline-api",
    "name": "Counterfactual Baseline API",
    "provides": "No-intervention reference trajectory",
    "addonFamily": "ARR & Restoration Monitoring",
    "requires": [
      "Area Boundary API",
      "Land Cover API",
      "Climate Forcing API"
    ],
    "upliftMsi": "Index-based counterfactual.",
    "upliftVnirHsi": "Counterfactual expressed in biophysical units — more stable reference than index-based trajectories.",
    "upliftVnirSwir": "SWIR-extended counterfactual captures structural divergence from intervention areas.",
    "baseUsdPerKm2": 16,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-carbon-accumulation-api",
    "name": "Carbon Accumulation API",
    "provides": "Restoration carbon build-up over time",
    "addonFamily": "ARR & Restoration Monitoring",
    "requires": [
      "Growth Trajectory API",
      "Counterfactual Baseline API",
      "Structure API"
    ],
    "upliftMsi": "Carbon narrative from coarse biomass proxy.",
    "upliftVnirHsi": "Carbon accumulation informed by fAGB trajectory from Structure API.",
    "upliftVnirSwir": "SWIR-derived cm and lignin improve biomass and carbon accumulation estimates.",
    "baseUsdPerKm2": 24,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-historical-baseline-api",
    "name": "Historical Baseline API",
    "provides": "Historical forest loss and degradation baseline",
    "addonFamily": "Carbon MRV & REDD+",
    "requires": [
      "Area Boundary API",
      "Forest Cover & Forest Type API",
      "Climate Forcing API"
    ],
    "upliftMsi": "Historical index trends.",
    "upliftVnirHsi": "Biochemically-informed historical baseline — more sensitive to gradual historical degradation.",
    "upliftVnirSwir": "SWIR structural signals improve historical degradation detection — key for REDD+ additionality assessment.",
    "baseUsdPerKm2": 22,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-carbon-conversion-api",
    "name": "Carbon Conversion API",
    "provides": "Biomass-to-carbon conversion outputs",
    "addonFamily": "Carbon MRV & REDD+",
    "requires": [
      "Structure API"
    ],
    "upliftMsi": "No spectral uplift — conversion is parameter-based.",
    "upliftVnirHsi": "No uplift",
    "upliftVnirSwir": "No uplift",
    "baseUsdPerKm2": 4,
    "grade": "inventory",
    "apiReady": "TBD",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both",
    "status": "scoping"
  },
  {
    "id": "forest-reference-area-api",
    "name": "Reference Area API",
    "provides": "Reference-area selection outputs",
    "addonFamily": "Carbon MRV & REDD+",
    "requires": [
      "Area Boundary API",
      "Historical Baseline API",
      "Land Cover API"
    ],
    "upliftMsi": "Geometry-led reference selection.",
    "upliftVnirHsi": "Improved reference area delineation via forest type discrimination.",
    "upliftVnirSwir": "SWIR adds structural forest type matching — more defensible reference area selection.",
    "baseUsdPerKm2": 12,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-reference-emissions-api",
    "name": "Reference Emissions API",
    "provides": "Reference emission level and baseline emissions",
    "addonFamily": "Carbon MRV & REDD+",
    "requires": [
      "Reference Area API",
      "Historical Baseline API"
    ],
    "upliftMsi": "Emissions from land-cover change counts.",
    "upliftVnirHsi": "Emissions baseline informed by biochemically-sensitive historical degradation detection.",
    "upliftVnirSwir": "SWIR structural signals extend emissions baseline sensitivity to subtle historical degradation.",
    "baseUsdPerKm2": 14,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-carbon-stock-change-api",
    "name": "Carbon Stock Change API",
    "provides": "Carbon gain and loss over time",
    "addonFamily": "Carbon MRV & REDD+",
    "requires": [
      "Structure API",
      "Carbon Conversion API",
      "Degradation Detection API"
    ],
    "upliftMsi": "Stock change from biomass deltas.",
    "upliftVnirHsi": "Stock change driven by biochemically-informed degradation signal — earlier detection of gradual loss.",
    "upliftVnirSwir": "SWIR structural signals improve stock change sensitivity — critical for degradation-driven carbon loss.",
    "baseUsdPerKm2": 20,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-leakage-analysis-api",
    "name": "Leakage Analysis API",
    "provides": "Surrounding displacement and leakage signals",
    "addonFamily": "Carbon MRV & REDD+",
    "requires": [
      "Area Boundary API",
      "Land Cover API",
      "Change Detection API"
    ],
    "upliftMsi": "Boundary buffer land-cover shift.",
    "upliftVnirHsi": "Leakage signals informed by improved land cover discrimination at project boundaries.",
    "upliftVnirSwir": "SWIR adds NPV and dry vegetation discrimination — more accurate leakage delineation.",
    "baseUsdPerKm2": 16,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-mrv-scoring-delivery-api",
    "name": "Scoring & Delivery API",
    "provides": "Packaged MRV scoring outputs",
    "addonFamily": "Carbon MRV & REDD+",
    "requires": [
      "Structure API",
      "Carbon Conversion API",
      "Reference Area API",
      "Reference Emissions API",
      "Carbon Stock Change API",
      "Leakage Analysis API",
      "Confidence API",
      "Evidence API"
    ],
    "upliftMsi": "No spectral uplift — scoring is parameter and methodology driven.",
    "upliftVnirHsi": "No uplift",
    "upliftVnirSwir": "No uplift",
    "baseUsdPerKm2": 6,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-fuel-moisture-api",
    "name": "Fuel Moisture API",
    "provides": "Live and dead fuel moisture indicators",
    "addonFamily": "Wildfire Risk & Recovery",
    "requires": [
      "Area Boundary API",
      "Forest Cover & Forest Type API",
      "Climate Forcing API",
      "Trait API"
    ],
    "upliftMsi": "Coarse moisture context from indices.",
    "upliftVnirHsi": "Partial — 970nm and 1200nm water features provide live fuel moisture proxy.",
    "upliftVnirSwir": "Full retrieval — 1400nm and 1900nm features; dead fuel moisture detectable via SWIR — critical fire weather input.",
    "baseUsdPerKm2": 22,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-fuel-load-structure-api",
    "name": "Fuel Load & Structure API",
    "provides": "Combustible load and structural vulnerability",
    "addonFamily": "Wildfire Risk & Recovery",
    "requires": [
      "Structure API",
      "Trait API"
    ],
    "upliftMsi": "LAI-only fuel proxy.",
    "upliftVnirHsi": "No direct fuel load retrieval at VNIR — LAI proxy only.",
    "upliftVnirSwir": "SWIR-derived cm and lignin from Trait and Structure APIs directly estimate fuel load and structural vulnerability.",
    "baseUsdPerKm2": 24,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "aurora",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-ignition-risk-api",
    "name": "Ignition Risk API",
    "provides": "Likelihood of ignition and susceptibility",
    "addonFamily": "Wildfire Risk & Recovery",
    "requires": [
      "Fuel Moisture API",
      "Fuel Load & Structure API",
      "Climate Forcing API"
    ],
    "upliftMsi": "Weather-only ignition cues.",
    "upliftVnirHsi": "Partial — fuel moisture proxy from VNIR informs ignition model.",
    "upliftVnirSwir": "Full fuel moisture and load from SWIR — highest-confidence ignition risk estimates.",
    "baseUsdPerKm2": 20,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-wildfire-composite-risk-api",
    "name": "Wildfire Composite Risk API",
    "provides": "Combined pre-fire wildfire risk score",
    "addonFamily": "Wildfire Risk & Recovery",
    "requires": [
      "Ignition Risk API",
      "Forest Cover & Forest Type API",
      "Climate Forcing API"
    ],
    "upliftMsi": "Composite from weather and indices.",
    "upliftVnirHsi": "Partial — VNIR-constrained fuel inputs limit composite risk precision.",
    "upliftVnirSwir": "SWIR-derived fuel moisture and load enable highest-confidence composite risk scoring.",
    "baseUsdPerKm2": 22,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-fire-event-detection-api",
    "name": "Fire Event Detection API",
    "provides": "Active and recent fire event identification",
    "addonFamily": "Wildfire Risk & Recovery",
    "requires": [
      "Area Boundary API",
      "Climate Forcing API"
    ],
    "upliftMsi": "Thermal/FIRMS events.",
    "upliftVnirHsi": "No uplift — fire detection is thermal/FIRMS driven.",
    "upliftVnirSwir": "No uplift",
    "baseUsdPerKm2": 7,
    "grade": "inventory",
    "apiReady": "TBD",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both",
    "status": "scoping"
  },
  {
    "id": "forest-burn-perimeter-api",
    "name": "Perimeter Mapping API",
    "provides": "Burn perimeter geometry",
    "addonFamily": "Wildfire Risk & Recovery",
    "requires": [
      "Fire Event Detection API"
    ],
    "upliftMsi": "Thermal perimeter.",
    "upliftVnirHsi": "Burn perimeter mapped against biochemically-informed pre-fire forest mask — improved edge delineation.",
    "upliftVnirSwir": "SWIR burn scar discrimination — improved perimeter accuracy in mixed burned/unburned margins.",
    "baseUsdPerKm2": 14,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-burn-severity-api",
    "name": "Burn Severity API",
    "provides": "Severity and impact intensity",
    "addonFamily": "Wildfire Risk & Recovery",
    "requires": [
      "Perimeter Mapping API",
      "Forest Cover & Forest Type API",
      "Structure API"
    ],
    "upliftMsi": "dNBR-style severity where available.",
    "upliftVnirHsi": "Severity assessed against biochemical pre-fire baseline — cab and cw loss quantified.",
    "upliftVnirSwir": "SWIR structural signals (cm, lignin loss) add structural severity dimension — more complete severity characterization.",
    "baseUsdPerKm2": 18,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-wildfire-seasonal-outlook-api",
    "name": "Seasonal Outlook API",
    "provides": "Forward-looking wildfire risk outlook",
    "addonFamily": "Wildfire Risk & Recovery",
    "requires": [
      "Wildfire Composite Risk API",
      "Climate Forcing API"
    ],
    "upliftMsi": "Seasonal climate outlook with coarse fuel.",
    "upliftVnirHsi": "Outlook informed by VNIR-constrained fuel and moisture inputs.",
    "upliftVnirSwir": "SWIR fuel moisture and load improve seasonal outlook precision — particularly for dead fuel accumulation.",
    "baseUsdPerKm2": 16,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-recovery-monitoring-api",
    "name": "Recovery Monitoring API",
    "provides": "Post-disturbance regrowth and recovery trajectory",
    "addonFamily": "Recovery Monitoring",
    "requires": [
      "Area Boundary API",
      "Forest Cover & Forest Type API",
      "Expected-State API",
      "Climate Forcing API"
    ],
    "upliftMsi": "Greenness return trajectory.",
    "upliftVnirHsi": "Recovery tracked via chlorophyll re-emergence (cab) and canopy water return (970nm, 1200nm) — earlier recovery signal than MSI greenness.",
    "upliftVnirSwir": "SWIR-derived structural recovery (cm, lignin return) tracks canopy structural regeneration — full recovery trajectory from initial regrowth to structural maturity.",
    "baseUsdPerKm2": 19,
    "grade": "exploration",
    "apiReady": "TBD",
    "status": "scoping",
    "notes": "Shared add-on callable from wildfire and ARR workflows.",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both"
  },
  {
    "id": "forest-threshold-alert-api",
    "name": "Threshold Alert API",
    "provides": "Configurable threshold-based alerts on any subscribed output",
    "addonFamily": "Alerting",
    "requires": [
      "At least one Core or Add-on API subscription"
    ],
    "upliftMsi": "Index-threshold alerts.",
    "upliftVnirHsi": "Earlier trigger via biochemical indicators — degradation and disturbance alerts ahead of MSI-detectable canopy loss.",
    "upliftVnirSwir": "Earlier still for structural disturbance types detectable only in SWIR.",
    "baseUsdPerKm2": 4,
    "grade": "inventory",
    "apiReady": "TBD",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both",
    "status": "scoping"
  },
  {
    "id": "forest-webhook-delivery-api",
    "name": "Webhook Delivery API",
    "provides": "Push-based delivery of alerts to customer endpoints",
    "addonFamily": "Alerting",
    "requires": [
      "Threshold Alert API"
    ],
    "upliftMsi": "Standard webhook delivery.",
    "upliftVnirHsi": "No uplift",
    "upliftVnirSwir": "No uplift",
    "baseUsdPerKm2": 2,
    "grade": "inventory",
    "apiReady": "TBD",
    "kind": "addon",
    "verticals": FORESTRY,
    "tier": "Both",
    "status": "scoping"
  }
]

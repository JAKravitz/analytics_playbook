/**
 * Pixxel TRACE — Agriculture product configuration.
 *
 * TRACE = Trait Retrieval and Analysis for Crop Environments.
 * Third operational product in the Products redesign. Sold as a monitoring
 * subscription. The white paper is a generic multi-crop narrative running from
 * the limits of broadband indices through field identity, classification,
 * phenology, narrowband diagnostics, and PROSAIL biophysical retrieval.
 * API layers for integration — not an end-to-end agronomy platform. No NEXUS cube,
 * SSE, VRA, or yield-risk framing in this product.
 *
 * Sub-section copy (claims / messaging / pricing) lives in product data files.
 */

import { tracePricing as agriculturePricing } from './pricing/trace.js';
import { traceApiSchema } from './api/trace.js';

export const agricultureProduct = {
  id: 'agriculture',
  slug: 'agriculture',
  name: 'TRACE',
  fullName: 'Pixxel TRACE',
  acronymExpansion: 'Trait Retrieval and Analysis for Crop Environments',
  color: '#4ADE80',
  tagline: 'Physical crop traits from hyperspectral physics — biophysical state, not greenness proxies.',
  sub: 'Crop Traits · Phenology · Narrowband Indices · PROSAIL · Subscription',
  desc:
    'TRACE turns Firefly hyperspectral and multispectral archives into field-level crop intelligence API layers: automated farm boundaries, variety-level crop classification, phenological stage, a continuous gap-filled season record, narrowband indices (NDRE, MCARI, CWSI, SIF, PSRI), and PROSAIL-inverted biophysical traits (LAI, Cab, Cbrown, DW, EWT, Car, leaf nitrogen). Delivered as analysis-ready rasters and vectors for integration into any agronomy workflow — or visualized on Aurora.',

  landing: {
    lede:
      'TRACE is Pixxel\u2019s crop intelligence API product. It reads each field with radiative-transfer physics, separates the biochemical signals that broadband indices blur together, and delivers the physical traits that govern crop condition \u2014 chlorophyll, water, leaf area, light absorption \u2014 stage by stage through the season, as layers your stack can consume.',
    paragraphs: [
      'Most crop monitoring stops at a greenness index. NDVI and its broadband cousins collapse nitrogen status, water stress, and disease-driven chlorophyll loss into a single number that says a canopy is declining without saying why. TRACE works from the full spectral curve: narrowband indices isolate specific absorptions \u2014 red-edge for canopy chlorophyll and nitrogen, the 970 nm feature for water \u2014 and a PROSAIL inversion retrieves the underlying biophysical traits directly.',
      'Every field is a persistent object: an automated boundary with a stable identity, a crop-type classification, a phenological stage, and a continuous gap-filled trajectory the current observation is read against. That is what turns a reading into a diagnosis \u2014 a red-edge depression at grain fill means something different than the same reading at tillering, and TRACE knows which stage the field is in.',
      'TRACE ships today as API layers and monitoring deliverables on Firefly VNIR and multispectral archives. It is not a full end-to-end agronomy solution \u2014 it provides the retrieval stack other platforms plug into to optimize scouting, supply-base monitoring, or underwriting workflows. Customers integrate the layers into their own tools, or use Pixxel\u2019s Aurora platform to build dashboards on top of them. Semantic search and the NEXUS intelligence cube are north-star capabilities on a separate path \u2014 not part of TRACE today.',
    ],
    commercialModels: [
      {
        title: 'Insights as a Service',
        accent: '#4ADE80',
        body:
          'API-only access to TRACE layers: boundaries, classification, phenology, indices, and PROSAIL traits as refreshed rasters and vectors — integrate into your agronomy stack.',
      },
      {
        title: 'Aurora subscription',
        accent: 'var(--cyan)',
        body:
          'Platform access on top of the same layers: Aurora dashboards, copilot, custom workflows, and supplementary datasets. Price by AOI band and refresh cadence only.',
      },
    ],
    northStar:
      'NEXUS is the north star \u2014 a persistent intelligence cube per field with semantic query across seasons. TRACE feeds that vision with trait and index layers, but TRACE itself is API delivery today: no cube persistence, no SSE integration, no end-to-end workflow. Position it as the physics layer customers build on.',
    outputLayers: [
      {
        layers: [
          { name: 'Farm boundaries', desc: 'Per-field polygons, persistent IDs, and area (ha).' },
          { name: 'Crop classification', desc: 'Crop / variety class per field with confidence score.' },
          { name: 'Phenology', desc: 'Growth stage placement and cycle statistics per field.' },
          { name: 'Gap-filled NDVI', desc: 'Cloud-interpolated season trajectory per field.' },
          { name: 'Narrowband indices', desc: 'NDRE, MCARI, CWSI, SIF, and PSRI per acquisition date.' },
          {
            name: 'PROSAIL traits',
            desc: 'LAI, chlorophyll, brown pigments, dry matter, canopy water, carotenoids, and leaf nitrogen.',
          },
          {
            name: 'Embeddings classification',
            desc: 'Label-sparse crop typing via spectral embeddings.',
            status: 'in-development',
          },
        ],
      },
    ],
  },

  claims: {
    now: [
      'Automated farm boundary detection \u2014 per-field delineation, persistent field IDs, and area',
      'Crop and variety classification \u2014 supervised path when high-quality labels are available; embeddings-based path (beta) for label-sparse regions',
      'Phenology and growth-stage tracking \u2014 where each field sits in the crop calendar, with cycle statistics across the AOI',
      'Gap-filled NDVI season record \u2014 cloud-gap interpolation to a continuous per-field trajectory',
      'Narrowband indices \u2014 NDRE, MCARI, CWSI, SIF, and PSRI resolving chlorophyll, nitrogen, water, photosynthetic efficiency, and senescence signals individually',
      'PROSAIL biophysical retrieval \u2014 LAI, Cab, Cbrown, DW, EWT, Car, and leaf nitrogen content on ISOFIT-corrected reflectance',
    ],
    eoy: [
      'Productized monitoring subscription with standardized delivery scope and Aurora dashboard access',
      'Anomaly alerting against each field\u2019s own seasonal baseline as a customer-facing capability',
      'Embeddings-based crop classification (beta) with on-the-fly training (beta) for label-sparse AOIs',
      'Expanded API catalog documentation and webhook delivery for integrators',
    ],
    never: [
      'Bushel- or tonne-level yield forecasts \u2014 TRACE reports crop traits and indices, not a yield prediction',
      'Variable-rate application (VRA) prescriptions \u2014 out of scope for this product',
      'A replacement for agronomist scouting, soil sampling, or ground truth on its own',
      'SWIR-grade trait separation before the Honeybee constellation (2027+) \u2014 operational traits today are VNIR / MSI',
      'A full end-to-end farm management or agronomy platform \u2014 TRACE is API layers, not the workflow on top',
      'NEXUS cube persistence or semantic search (LENS / SSE) as part of this product \u2014 north star only',
    ],
    hardRules:
      'Never present a trait or index as a yield number. Never imply VRA prescription output. Always state crop growth stage alongside any biophysical reading \u2014 a trait value is only interpretable against phenology. State sensor tier (VNIR / MSI today).',
  },

  messaging: {
    framing:
      'TRACE is operational today as API layers: boundary, classification, phenology, the named narrowband indices, and the full PROSAIL trait stack all ship now on Firefly VNIR and multispectral archives. It is not a full end-to-end agronomy solution \u2014 it delivers the retrieval physics other platforms need to optimize scouting, supply-base monitoring, underwriting, or regional reporting. Customers integrate the layers into their own workflow, or use Pixxel\u2019s Aurora platform to build dashboards on top. No NEXUS cube, no semantic search in this product. Say the grade plainly \u2014 traits-with-stage honesty is the advantage with technical agronomy buyers.',
    integrationNote:
      'Position TRACE as infrastructure, not a finished product experience. We provide the layers; the customer (or Aurora) provides the decision workflow, alerts, prescriptions, and UX. That is intentional \u2014 it lets integrators, agribusiness platforms, and insurers plug hyperspectral trait retrieval into stacks they already run.',
    differentiators: [
      {
        num: '01',
        title: 'API layers, not a platform',
        quote:
          'TRACE delivers analysis-ready boundaries, traits, and indices \u2014 the physics stack behind a scouting app, supply-base dashboard, or underwriting model. Integrate via API, or visualize on Aurora. We do not pretend to be the end-to-end agronomy workflow.',
      },
      {
        num: '02',
        title: 'Traits, not greenness',
        quote:
          'A greenness index tells you a canopy is declining. PROSAIL inversion tells you the chlorophyll, water content, and leaf area behind it \u2014 the physical variables an agronomist or downstream model actually acts on.',
      },
      {
        num: '03',
        title: 'Every reading has a stage',
        quote:
          'A trait value is meaningless without phenology. TRACE attaches every field to its growth stage and its own season trajectory, so an index departure reads as a specific signal, not a generic change in pixel color.',
      },
    ],
    language: {
      use: [
        'API layers for integration',
        'biophysical traits (LAI, Cab, Cbrown, DW, EWT, Car, leaf N)',
        'PROSAIL radiative-transfer inversion',
        'narrowband indices (NDRE, MCARI, CWSI, SIF)',
        'phenology / growth-stage tracking',
        'Aurora dashboards (optional)',
        'crop and variety classification with confidence',
      ],
      avoid: [
        '"complete agronomy platform" or "end-to-end solution"',
        '"yield forecast" or bushel/tonne numbers',
        '"variable-rate prescription" / VRA',
        'NEXUS cube or semantic search as TRACE capabilities today',
        '"NDVI" as the headline product (it is a baseline input)',
        'SWIR traits before Honeybee',
        'trait values without a growth stage',
      ],
    },
    objections: [
      {
        q: 'Is this a complete farm management platform?',
        a:
          'No \u2014 and we are explicit about that. TRACE is the retrieval layer: boundaries, classification, phenology, indices, and PROSAIL traits delivered as APIs and rasters. Your platform, partner, or our Aurora dashboards turn those layers into scouting routes, alerts, or underwriting decisions. That separation is what lets you integrate hyperspectral physics without replacing your existing workflow.',
      },
      {
        q: 'We already get NDVI maps from our current provider.',
        a:
          'NDVI is a useful baseline and TRACE uses it too \u2014 as the gap-filled season trajectory each field is read against. But NDVI saturates and collapses nitrogen, water, and disease signals into one number. TRACE adds narrowband indices that isolate each of those signals and a PROSAIL inversion that retrieves the physical traits (chlorophyll, water content, leaf area) directly, every reading tied to the field\u2019s growth stage \u2014 as layers you can pipe into your own analytics.',
      },
      {
        q: 'Can you tell me what my yield will be?',
        a:
          'No \u2014 and we will not sell a number we cannot stand behind. TRACE reports physical crop traits and indices, stage by stage, so a downstream model or agronomist can reason about condition. It is built to feed scouting prioritization and monitoring workflows, not to output a bushel or tonne forecast.',
      },
      {
        q: 'Does this generate a variable-rate prescription I can load into my equipment?',
        a:
          'Not in this product. TRACE delivers trait and index evidence as analysis-ready layers. Turning that into a prescription is a downstream step in your agronomy stack or a partner workflow \u2014 exactly where integrator buyers want control.',
      },
      {
        q: 'How is hyperspectral better than the multispectral we already use?',
        a:
          'Multispectral is the foundation and TRACE runs on it too. The difference is spectral resolution: Firefly resolves the narrow red-edge and water-absorption features that multispectral averages over, which is what lets PROSAIL separate nitrogen from water limitation instead of reporting a single blended signal. Where a customer only has MSI, TRACE still delivers traits \u2014 the HSI upgrade sharpens the separation.',
      },
      {
        q: 'You are a startup \u2014 is the retrieval validated?',
        a:
          'The methods are canonical: PROSAIL inversion, ISOFIT atmospheric correction, and the named narrowband indices have decades of literature and operational use. PROSAIL outputs are validated against field instruments (LAI-2200, SPAD). What is new is the sensor and the API packaging, and where regional validation is still in progress we label outputs accordingly.',
      },
    ],
  },

  pricing: agriculturePricing,
  apiSchema: traceApiSchema,
};

/**
 * White-paper content — generic multi-crop trait-retrieval narrative.
 * API-layer framing only. NEXUS / SSE are north-star references, not TRACE scope.
 * Figure slots map to assets in public/product-assets/agriculture/.
 */
export const agricultureWhitePaper = {
  eyebrow: 'White paper · Agriculture · TRACE',
  title: 'TRACE: Trait Retrieval and Analysis for Crop Environments',
  lede:
    'How hyperspectral physics becomes field-level API layers \u2014 boundaries, classification, phenology, narrowband indices, and PROSAIL-retrieved biophysical traits \u2014 that integrators and platforms build on. From the limits of a greenness index to the physical state of the canopy, delivered as analysis-ready outputs, not an end-to-end agronomy workflow.',
  headerBar:
    'API-layer product narrative. Reflects the TRACE analytics stack on Firefly VNIR and multispectral archives. NEXUS cube persistence and semantic search are north-star capabilities \u2014 not part of TRACE today.',
  illustrativeBanner:
    'ILLUSTRATIVE CASE STUDY \u00b7 Data and findings are representative examples of TRACE API outputs, not a live customer engagement. Platform views show Aurora on a reference AOI; the same layer architecture is applied across crops and regions.',
  meta: [
    { label: 'Domain', value: 'Row & field crops', sub: 'Multi-crop, multi-region' },
    { label: 'Method', value: 'PROSAIL + narrowband', sub: 'RT inversion on ISOFIT reflectance' },
    { label: 'Sensor', value: 'Firefly VNIR + MSI', sub: 'Sensor-agnostic retrieval' },
    { label: 'Delivery', value: 'API layers', sub: 'Integrate or Aurora dashboards' },
  ],
  sections: [
    {
      num: '00',
      kicker: 'Radiative transfer theory',
      title: 'How vegetation shapes the spectrum',
      figure: 'fig01',
      paragraphs: [
        'A satellite does not measure crop condition directly \u2014 it measures photons scattered and absorbed by soil, leaves, and atmosphere on the way in and out. Vegetation radiative-transfer models (RTMs) encode that physics: canopy structure, leaf angle distribution, soil moisture, and leaf biochemistry jointly determine which wavelengths are absorbed, which are scattered back toward the sensor, and how much signal survives the atmosphere.',
        'PROSAIL and its PROSPECT leaf optics sit at the centre of TRACE. Soil structure and moisture set the background. Canopy density and leaf angle set how light penetrates and exits the stand. Chlorophyll, carotenoids, brown pigments, dry matter, and leaf water thickness set the leaf-level absorption features the model inverts. The engine simulates scattering and absorption through the plant and atmosphere, producing a spectrum a sensor would record \u2014 and TRACE runs that physics in reverse on ISOFIT-corrected Firefly reflectance.',
        'That decomposition is why TRACE can go beyond a greenness index. Broadband NDVI collapses the whole radiative-transfer problem into one ratio. Narrowband indices and PROSAIL inversion recover the biochemical and structural variables that actually produced the curve \u2014 delivered as API layers integrators consume, with Aurora as optional visualization.',
      ],
    },
    {
      num: '01',
      kicker: 'The monitoring problem',
      title: 'Why a greenness index is not enough',
      paragraphs: [
        'Most crop monitoring stops at a broadband vegetation index. NDVI and its relatives are easy to compute and genuinely useful for tracking whether a canopy is growing or declining \u2014 but they collapse everything that matters into a single number. Nitrogen depletion, water stress, and disease-driven chlorophyll loss all push the same index in the same direction, and on a dense canopy the index saturates and stops responding at all.',
        'The agronomic questions that actually drive a decision are more specific. Is this field short on nitrogen, or short on water? Is the chlorophyll signal a fertility problem or the early edge of disease? Has the crop reached the stage where this reading should worry me? A greenness number cannot answer any of these.',
        'TRACE treats the spectrum as the rich signal the RTM describes. Narrowband indices isolate specific absorptions; PROSAIL retrieves the physical traits behind them \u2014 every reading anchored to a field identity and a growth stage.',
      ],
    },
    {
      num: '02',
      kicker: 'Field identity',
      title: 'Every field is a persistent object',
      figure: 'fig02',
      paragraphs: [
        'Intelligence starts with identity. TRACE delineates each field automatically, assigns it a persistent boundary object with a unique ID and an area, and uses that boundary as the anchor every later layer attaches to. A field is not a grid of anonymous pixels that changes shape with each pass \u2014 it is the same object, observed again.',
        'This is what lets the product compare a field to itself over time rather than to its neighbours, and it is the unit every trait, index, and stage statistic is reported against. Boundaries are ingested once and updated only when parcel geometry changes.',
      ],
    },
    {
      num: '03',
      kicker: 'Crop classification',
      title: 'Knowing what is growing where',
      figure: 'fig03',
      paragraphs: [
        'Before any trait is interpreted, TRACE establishes what is actually in each field. Two classification paths are available depending on what label data the customer can provide.',
        'Supervised classification is the default when a region has a sufficient set of high-quality ground labels \u2014 confirmed crop type and, where available, variety polygons or scout records. Hyperspectral and multispectral fusion trains a per-AOI model with per-field confidence scores and uncertainty bounds that widen at earlier development stages.',
        'Embeddings-based classification (beta) is for regions with sparse or no historical labels. Spectral embeddings cluster fields by similarity in latent space, requiring far fewer training samples than a full supervised model \u2014 and supporting on-the-fly training (beta) when a small set of new reference fields becomes available mid-season. Output format is the same API layer; only the training path differs.',
        'Classification is what makes the rest of the analysis honest. Traits and index signals only mean something when unlike crops are not naively stacked together, and the classification layer is what keeps a wheat field\u2019s baseline separate from the rice field beside it.',
      ],
    },
    {
      num: '04',
      kicker: 'Phenology',
      title: 'Where each field sits in the calendar',
      figure: 'fig04',
      paragraphs: [
        'A trait value is only interpretable against growth stage. The same canopy chlorophyll reading means one thing at tillering and something very different at grain fill. TRACE tracks phenology per field \u2014 placing each one in the crop calendar \u2014 and summarises cycle statistics across the AOI, such as how many fields have reached each stage.',
        'Stage awareness is the precondition for diagnosis. It is what turns "this index dropped" into "this index dropped at the stage where that matters," and it is carried alongside every biophysical reading in the product.',
      ],
    },
    {
      num: '05',
      kicker: 'The season record',
      title: 'A continuous trajectory, not a snapshot',
      figure: 'fig05',
      paragraphs: [
        'Clouds and missed passes leave gaps in any optical record. TRACE interpolates across them to produce a continuous, gap-filled NDVI trajectory for every field \u2014 a baseline shape the current observation is read against, rather than a single before/after image pair.',
        'This is the mechanism that makes an anomaly interpretable as an anomaly. A reading is compared to where this field has been all season and to where a healthy crop of the same type and stage should be \u2014 not to an arbitrary previous date that may itself have been an off day.',
      ],
    },
    {
      num: '06',
      kicker: 'Narrowband indices',
      title: 'Resolving the signals broadband blurs',
      figure: 'fig06',
      paragraphs: [
        'The first layer of separation comes from narrowband indices computed on the contiguous spectral curve. Each targets a specific physical or biochemical process that a broadband index averages away.',
        'NDRE reads the red edge (roughly 700\u2013730 nm), the region most sensitive to canopy chlorophyll and nitrogen status, and it keeps responding where NDVI has saturated. MCARI isolates leaf chlorophyll absorption, separating a pigment signal from canopy structure. CWSI tracks canopy water status from the near-infrared water feature. SIF relates to actual photosynthetic activity rather than greenness alone. PSRI (Plant Senescence Reflectance Index) rises as carotenoids dominate over chlorophyll \u2014 surfacing senescence and late-season pigment shifts that broadband greenness misses.',
        'Read together, these indices begin to disentangle the processes a single greenness number conflates. In the grape example below, PSRI separates healthy canopy (low index, steep red-edge reflectance) from senescing blocks (elevated index, flattened red-edge slope) \u2014 a narrowband signal an integrator can route into harvest timing, scouting, or downstream models before any PROSAIL inversion is run.',
      ],
    },
    {
      num: '07',
      kicker: 'Biophysical retrieval',
      title: 'PROSAIL: the physical state of the canopy',
      figure: 'fig07',
      paragraphs: [
        'Beneath the indices is the radiative-transfer inversion. TRACE runs PROSAIL on ISOFIT-corrected reflectance to retrieve the leaf and canopy parameters the forward model encodes \u2014 per pixel, aggregated to the field, with AOI-level distribution statistics. Validated against field instruments such as LAI-2200 and SPAD where available, the inversion states how much chlorophyll, water, or leaf area a canopy holds, not merely how green it looks. The stack stops at layer delivery \u2014 prescriptions, alerts, and workflow UX live in the customer\u2019s platform or in Aurora.',
      ],
      traitParameters: [
        {
          id: 'LAI',
          name: 'Leaf Area Index',
          body:
            'Total one-sided leaf area (m\u00b2) per unit ground area (m\u00b2). A unitless quantity typically between 0 and 8. Higher LAI indicates a denser canopy intercepting and absorbing more light.',
        },
        {
          id: 'Cab',
          name: 'Chlorophyll',
          body:
            'Concentration of chlorophyll in leaves (\u00b5g/cm\u00b2). Higher Cab indicates healthier green foliage with stronger absorption in the red and blue regions and lower reflectance in those bands.',
        },
        {
          id: 'Cbrown',
          name: 'Brown pigments',
          body:
            'Concentration of brown pigments such as tannins associated with senescence or stress. Rising Cbrown reduces canopy greenness and shifts the spectral response across the visible spectrum.',
        },
        {
          id: 'DW',
          name: 'Dry weight',
          body:
            'Dry leaf biomass per unit leaf area (g/m\u00b2), excluding water. Influences shortwave-infrared reflectance through leaf structural and biochemical properties \u2014 relevant to health and productivity estimates.',
        },
        {
          id: 'EWT',
          name: 'Equivalent water thickness',
          body:
            'Leaf water per unit leaf area (cm). Drives absorption features in the near- and shortwave-infrared regions \u2014 a primary variable for vegetation water status and drought assessment.',
        },
        {
          id: 'Car',
          name: 'Carotenoid content',
          body:
            'Carotenoid concentration (\u00b5g/cm\u00b2). Pigments involved in photosynthesis and photoprotection; affect visible reflectance, especially in the blue\u2013green region, and respond to stress and physiological state.',
        },
        {
          id: 'N',
          name: 'Leaf nitrogen content',
          body:
            'Nitrogen concentration in leaf tissue (\u00b5g/cm\u00b2). A key constituent of chlorophyll and photosynthetic proteins; variations influence reflectance in biochemically sensitive bands and support nutrient-status assessment.',
        },
      ],
    },
    {
      num: '08',
      kicker: 'What this enables',
      title: 'One retrieval stack, several downstream workflows',
      outcomes: [
        {
          label: 'Integrator / platform',
          title: 'Physics layers in your stack',
          body:
            'An agritech or ERP platform pipes TRACE boundaries, traits, and indices into its own scouting, alerting, and prescription logic \u2014 hyperspectral retrieval without replacing the workflow customers already run.',
        },
        {
          label: 'Agribusiness',
          title: 'Supply-base condition',
          body:
            'A processor or input company watching its grower base gets consistent crop traits and indices across the footprint on one scale \u2014 defensible condition evidence field by field, consumed in their analytics or on Aurora.',
        },
        {
          label: 'Crop insurer',
          title: 'Condition evidence',
          body:
            'An insurer ingests stage-tied trait and index layers with biophysical evidence \u2014 condition context for underwriting and claims that complements ground inspection rather than depending on it alone.',
        },
        {
          label: 'Government / food security',
          title: 'Regional crop monitoring',
          body:
            'An agency gets consistent classification, phenology, and trait layers across districts \u2014 a reproducible API basis for regional crop monitoring without buying a full farm-management platform.',
        },
      ],
    },
    {
      num: '09',
      kicker: 'What is operational',
      title: 'What ships today, and what is north star',
      paragraphs: [
        'The layers in this paper represent the TRACE API product. They are built on canonical retrieval physics \u2014 PROSAIL inversion, ISOFIT atmospheric correction, and established narrowband indices \u2014 and the framing is honest about what ships as TRACE today versus what lives on the NEXUS north-star path.',
      ],
      statusGroups: [
        {
          label: 'Operational today',
          body:
            'Farm boundary detection, supervised crop and variety classification, phenology and growth-stage tracking, gap-filled NDVI season records, the narrowband index stack (NDRE, MCARI, CWSI, SIF, PSRI), and full PROSAIL biophysical retrieval (LAI, Cab, Cbrown, DW, EWT, Car, leaf nitrogen) on ISOFIT-corrected reflectance. Sensor-agnostic across Firefly VNIR and multispectral archives. Deliverable now as API outputs and monitoring subscriptions.',
        },
        {
          label: 'Being built now',
          body:
            'Embeddings-based classification (beta) and on-the-fly training (beta) for label-sparse regions; productized monitoring subscription packaging with standardized scopes; optional Aurora dashboard access; anomaly alerting against each field\u2019s own seasonal baseline; and expanded webhook delivery for integrators.',
        },
        {
          label: 'North star (not TRACE today)',
          body:
            'NEXUS crop intelligence cube \u2014 persistent, queryable field history that compounds across seasons \u2014 and semantic search (LENS) over that archive. SWIR-grade trait separation on Honeybee (2027+) sharpens water and structural signals VNIR cannot fully separate. These capabilities inform the roadmap but are not sold as part of TRACE.',
        },
      ],
    },
  ],
  footer: 'PIXXEL ANALYTICS · TRACE · INTERNAL WHITE PAPER · WORKING DRAFT · AGRICULTURE CASE STUDY · NOT FOR DISTRIBUTION',
};

/** Figure slots — filenames under public/product-assets/agriculture/. */
export const agricultureFigures = {
  fig01: {
    label: 'Figure 01',
    title: 'Vegetation radiative-transfer model — conceptual explainer',
    src: 'vegetation_rtm.png',
    caption:
      'Vegetation RTMs encode how soil structure, canopy geometry, and leaf biochemistry (chlorophyll, dry matter, water) interact with solar radiation through scattering and absorption processes. PROSAIL simulates the spectrum a satellite records; TRACE inverts that physics on ISOFIT-corrected reflectance to retrieve the underlying traits.',
  },
  fig02: {
    label: 'Figure 02',
    title: 'Farm boundary detection — field identity layer',
    src: 'farm_boundary.png',
    platformNote: 'ILLUSTRATIVE PLATFORM VIEW · Same layer delivered across AOIs',
    caption:
      'Every monitored field receives a persistent boundary object: automated delineation, a unique field ID, and an area. This is the field-level identity that all subsequent layers attach to. Boundaries are ingested once per season and updated only when parcel geometry changes.',
  },
  fig03: {
    label: 'Figure 03',
    title: 'Crop classification — variety and acreage layer',
    src: 'crop_classification.png',
    platformNote: 'ILLUSTRATIVE PLATFORM VIEW · Same layer delivered across AOIs',
    caption:
      'Supervised classification when high-quality labels are available; embeddings-based classification (beta) when they are not. Both deliver the same per-field crop-type layer with confidence scores \u2014 keeping unlike crops from being naively stacked so traits and indices compare on a like-for-like basis.',
  },
  fig04: {
    label: 'Figure 04',
    title: 'Crop growth monitoring — phenology and stage statistics',
    src: 'phenology.png',
    platformNote: 'ILLUSTRATIVE PLATFORM VIEW · Same layer delivered across AOIs',
    caption:
      'Phenology layers track where fields sit in the crop calendar, with cycle statistics summarising how many fields reach each growth stage across the AOI. Every biophysical reading is interpreted against this stage \u2014 the same trait value means different things at tillering and grain fill.',
  },
  fig05: {
    label: 'Figure 05',
    title: 'Gap-filled NDVI — continuous season time series per field',
    src: 'ndvi_gap_fill.png',
    platformNote: 'ILLUSTRATIVE PLATFORM VIEW · Same layer delivered across AOIs',
    caption:
      'Cloud gaps and missed acquisitions are interpolated into a continuous NDVI trajectory for every field. The current observation is read against the field\u2019s own season shape rather than a single before/after image pair \u2014 the mechanism that makes an anomaly interpretable as an anomaly.',
  },
  fig06: {
    label: 'Figure 06',
    title: 'Plant Senescence Reflectance Index — grape vineyard example',
    src: 'psri_grapes.png',
    caption:
      'PSRI map over a vineyard with spectral signatures for healthy (cyan) and senescing (pink) blocks. Senescing canopy shows elevated PSRI and a flattened red-edge slope compared to healthy grapes \u2014 a narrowband index that surfaces pigment transitions broadband greenness misses.',
  },
  fig07: {
    label: 'Figure 07',
    title: 'Crop bio-parameter layer — PROSAIL trait retrieval',
    src: 'biophysical_params.png',
    platformNote: 'ILLUSTRATIVE PLATFORM VIEW · Same layer delivered across AOIs',
    caption:
      'PROSAIL inversion delivers per-pixel biophysical traits (here, Leaf Area Index) as map layers with AOI-level distribution statistics. The same pipeline retrieves Cab, Cbrown, DW, EWT, Car, and leaf nitrogen \u2014 the physical variables that govern crop condition, ground-validated with LAI-2200 and SPAD where available.',
  },
};

/**
 * Pixxel LENS — Semantic Search Engine product configuration.
 *
 * LENS = Latent Embedding for Neural Scene-search.
 * Migrates the former "NEXUS semantic query" page into a first-class product.
 * Two commercial modes: (1) a NEXUS-integrated similarity-search subscription
 * tier over a customer's entitled AOI archive; (2) a hosted GeoFM Embeddings
 * API that exposes raw geospatial foundation-model embeddings (DINOv3,
 * Ollmo-earth, Tesserra, Prithvi) for customers building their own downstream
 * models, classifiers, and retrieval stacks.
 *
 * Sub-section copy (claims / messaging / pricing) lives in product data files.
 */

import { lensPricing } from './pricing/lens.js';
import { lensApiSchema } from './api/lens.js';

export const sseProduct = {
  id: 'sse',
  slug: 'sse',
  name: 'LENS',
  fullName: 'Pixxel LENS',
  acronymExpansion: 'Latent Embedding for Neural Scene-search',
  color: '#A78BFA',
  tagline: 'Search a place you already know by example — and build your own models on our hosted geoFM embeddings.',
  sub: 'Semantic Search · Change · Anomaly (V3) · GeoFM Embeddings',
  desc:
    'LENS is Pixxel\u2019s semantic search engine, built from the customer\u2019s archive or entitled AOI. It encodes that imagery with geospatial foundation models, indexes the history for low-latency retrieval, and returns the most similar scenes, patches, and objects from a reference image, chip, or natural-language query. V1 indexing is MSI-first today; SpotDiff change detection is V2 in development; SSE-powered anomaly detection and Firefly VNIR HSI integration are V3 roadmap. The same backbone is exposed as a hosted GeoFM Embeddings API (beta).',

  landing: {
    lede:
      'LENS turns your archive or AOI into something you can query by example. Every index is built from the customer\u2019s entitled imagery \u2014 not a global tile store. An analyst submits a reference (image, patch, object, or phrase) and LENS returns the most similar observations across that history, ranked and tied back to acquisitions.',
    paragraphs: [
      'Generic embedding APIs search the open internet or a planetary catalog. LENS searches a customer-specific embedding space built from your archive or AOI: encoded with geospatial foundation models, indexed for low-latency retrieval, and deepened with every new acquisition over that footprint. Hyper-local by design \u2014 scoped to what you own and what you task \u2014 and evidence-oriented, so every result points back to a date, a sensor, and a footprint.',
      'Under the hood LENS is backbone-agnostic. It hosts DINOv3, Ollmo-earth, Tesserra, and Prithvi and selects or blends them per retrieval task. That same hosted infrastructure is sold separately as the GeoFM Embeddings API (beta): metered encode units over your archive or AOI so integrators pull vectors and fine-tune on their own labels without serving foundation models themselves.',
      'Similarity search is semi-operational today (V1) on MSI archive and entitled multispectral layers. Object, text, and SpotDiff change capabilities are in development (V2). V3 adds SSE-powered anomaly detection \u2014 surfacing patches and scenes that diverge from the archive\u2019s learned normal in embedding space \u2014 plus Firefly HSI re-embedding when hyperspectral acquisitions task over your AOI. See the version roadmap below.',
    ],
    commercialModels: [
      {
        title: 'GeoFM Embeddings API (beta)',
        accent: 'var(--cyan)',
        body:
          'Metered encode units over your archive or AOI. Sandbox through Fleet tiers — pull hosted geoFM vectors, export batches, and build downstream classifiers without planetary scope or your own FM infrastructure.',
      },
      {
        title: 'Aurora subscription',
        accent: '#A78BFA',
        body:
          'Search index built from your entitled archive or AOI in Aurora: image, patch, and object queries, workflows, and supplementary dataset slots. MSI indexing today; SSE-powered anomaly detection and Firefly HSI re-embedding on V3 roadmap. Price by AOI band and refresh cadence only.',
      },
      {
        title: 'Insights as a Service',
        accent: 'var(--amber)',
        body:
          'One-time index-build engagement over your archive or AOI — validation deliverable with ranked similarity demo before Aurora conversion or for integrators hosting their own UI.',
      },
    ],
    northStar:
      'LENS is how an archive becomes searchable. NEXUS is where it sits \u2014 the intelligence cube is persistent memory, LENS is the query layer, and every new acquisition compounds both.',
    outputLayers: [
      {
        title: 'Search',
        subtitle: 'Query by reference image, patch, object, or natural-language phrase — scoped to entitled archive or AOI.',
        layers: [
          {
            name: 'Similarity search',
            desc: 'Ranked scenes, patches, or objects similar to a reference input.',
            status: 'semi-operational',
          },
          {
            name: 'Text search',
            desc: 'Natural-language query mapped to embedding space → ranked matches.',
            status: 'semi-operational',
          },
          {
            name: 'Object search',
            desc: 'Ranked discrete entities (facilities, waterbodies, canopy patches) in the index.',
            status: 'semi-operational',
          },
        ],
      },
      {
        title: 'Change detection · SpotDiff',
        subtitle: 'Category-specific land-use change between temporal image pairs.',
        layers: [
          {
            name: 'Change mask',
            desc: 'Predicted change mask for a semantic class between T₀ and T₁.',
            status: 'semi-operational',
          },
          {
            name: 'Similarity map',
            desc: 'Dense per-pixel embedding similarity between T₀ and T₁.',
            status: 'semi-operational',
          },
          {
            name: 'Label propagation',
            desc: 'Instance masks propagated from a single reference polygon.',
            status: 'in-development',
          },
        ],
      },
      {
        title: 'Anomaly detection',
        subtitle: 'SSE-powered semantic outlier ranking — V3 roadmap.',
        layers: [
          {
            name: 'Archive anomaly scan',
            desc: 'Outlier patches and scenes vs the entitled archive embedding index.',
            status: 'roadmap',
          },
          {
            name: 'Reference anomaly scan',
            desc: 'Regions diverging from a supplied reference “normal” embedding.',
            status: 'roadmap',
          },
        ],
      },
      {
        title: 'Hosted embeddings',
        subtitle: 'GeoFM Embeddings API (beta) — metered encode units over archive or AOI.',
        layers: [
          {
            name: 'GeoFM embeddings',
            desc: 'Vectors from DINOv3, Ollmo-earth, Tesserra, or Prithvi over entitled imagery.',
            status: 'roadmap',
          },
        ],
      },
    ],
  },

  /** Version roadmap (ported from the old SemanticSearchEngine page). */
  versions: [
    {
      version: 'V1',
      target: 'June 15, 2026',
      accent: 'var(--cyan)',
      status: 'Semi-operational',
      summary:
        'Foundational semantic retrieval over a customer\u2019s monitored archive \u2014 fast image- and patch-level similarity on MSI and entitled multispectral layers. Firefly HSI index integration is V3 roadmap.',
      features: [
        { title: 'Image search', body: 'Query the archive with a reference image (or scene chip) and retrieve the most spectrally and structurally similar observations across the customer\u2019s AOI and history.' },
        { title: 'Patch search', body: 'Search at sub-scene granularity \u2014 a field corner, a tailings cell, a reservoir embayment \u2014 so analysts can match local patterns, not whole-tile averages.' },
        { title: 'Efficient indexing', body: 'Image- and patch-level embedding index built for low-latency retrieval at operational AOI scale. Incremental MSI archive updates today; out-of-cycle HSI re-embedding when Firefly tasks arrive is planned for V3.' },
      ],
    },
    {
      version: 'V2',
      target: 'June 30, 2026',
      accent: 'var(--purple)',
      status: 'In development',
      summary:
        'Moves from scene fragments to persistent objects, text, and motion \u2014 search, track, and compare change in the same semantic space as V1.',
      features: [
        { title: 'Object-based search', body: 'Retrieve and rank discrete objects (facilities, vehicles, canopy patches, water bodies) encoded as first-class entities in the embedding index \u2014 not just arbitrary patches.' },
        { title: 'Text & cross-time search', body: 'Natural-language queries over the indexed archive, plus cross-time object association \u2014 follow a target, field, or asset through the archive as it changes state.' },
        { title: 'Change detection', body: 'SpotDiff: sensor-agnostic, category-specific land-use change between T\u2080/T\u2081 pairs — foundation-model similarity maps fused with language-guided ROI proposals. Complements pixel differencing and NEXUS event engines; masks are analyst-review hypotheses.' },
      ],
    },
    {
      version: 'V3',
      target: 'H2 2026',
      accent: 'var(--amber)',
      status: 'Roadmap',
      summary:
        'HSI depth, operator UX, and SSE-powered anomaly detection woven into the LENS index \u2014 hyperspectral re-embedding, semantic outliers in the archive, and trajectory search over embedding sequences.',
      features: [
        { title: 'SSE-powered anomaly detection', body: 'Rank patches, scenes, and objects that diverge from the customer archive\u2019s embedding neighbourhood \u2014 or from a supplied reference \u201cnormal\u201d state. Operates in the same semantic search engine index as retrieval; complements NEXUS event engines with archive-learned, evidence-linked outlier hypotheses (V3 roadmap).' },
        { title: 'HSI-enriched embedding refresh', body: 'Firefly acquisitions trigger out-of-cycle re-embedding so similarity search, SpotDiff, and anomaly scoring reflect hyperspectral depth where tasked, not MSI-only appearance.' },
        { title: 'Trajectory & state similarity', body: 'Search by temporal pattern \u2014 e.g. \u201cfields that followed this stress curve\u201d or \u201csites that degraded like this reference event\u201d \u2014 built on sequences of embeddings, not single snapshots.' },
        { title: 'Natural-language copilot', body: 'Plain-language questions over the customer embedding space in Aurora \u2014 scoped to AOI and entitlement, with answers grounded in retrieved evidence chips.' },
      ],
    },
    {
      version: 'V4',
      target: '2027+',
      accent: 'var(--green)',
      status: 'Roadmap',
      summary:
        'Hosted GeoFM embeddings opened to customers, vertical-specialized encoders, and packaged APIs aligned with solution tiers \u2014 build your own model on our foundation models.',
      features: [
        { title: 'GeoFM Embeddings API', body: 'Hosted DINOv3, Ollmo-earth, Tesserra, and Prithvi embeddings exposed as a metered API (beta today) \u2014 customers fine-tune on their own labels and build downstream classifiers over their archive or AOI without hosting the foundation model.' },
        { title: 'Vertical fine-tuned encoders', body: 'Domain adapters for agriculture, water, geology, and defense \u2014 same index architecture, encoders tuned for the spectral and structural signals each vertical cares about.' },
        { title: 'Production API & SLAs', body: 'Stable similarity-search and embedding APIs with documented latency, index freshness, and entitlement boundaries.' },
      ],
    },
  ],

  /** GeoFM backbones hosted by LENS. */
  geoFM: [
    { name: 'DINOv3', body: 'Self-supervised visual foundation model fine-tuned on Pixxel MSI / HSI data \u2014 default backbone for scene and patch retrieval. Operational LENS indexing is MSI-first; Firefly HSI patch re-embedding is V3 roadmap.' },
    { name: 'Ollmo-earth', body: 'Earth-observation foundation model trained on multi-sensor satellite imagery \u2014 tuned for the spectral and seasonal variation that general vision models miss.' },
    { name: 'Tesserra', body: 'Geospatial embedding model oriented toward parcel- and tile-level land representation \u2014 useful for agricultural and land-use similarity tasks.' },
    { name: 'Prithvi', body: 'Open geospatial foundation model (NASA / IBM heritage) for earth-observation tasks \u2014 a transparent, well-documented backbone for customers who need reproducibility.' },
  ],

  /** Query paradigm table (ported). */
  queryExamples: [
    { old: '\u201cNDVI dropped more than 0.2\u201d', sse: '\u201cShow me every parcel that looked like Field 12 three weeks before the 2024 outbreak.\u201d' },
    { old: '\u201cDetect change between two dates\u201d', sse: '\u201cFind areas following the same degradation trajectory as this reference event.\u201d' },
    { old: '\u201cFlag anomalies in this AOI\u201d', sse: '\u201cWhich patches in today\u2019s scene are farthest from everything this archive normally looks like?\u201d (SSE-powered anomaly detection, V3)' },
    { old: '\u201cClassify this pixel\u201d', sse: '\u201cFind surfaces in this AOI with a spectral signature similar to this drill-core reference.\u201d' },
  ],

  /** Vertical use cases (ported). */
  verticalUseCases: [
    { title: 'Geology & exploration', eyebrow: 'Geology', accent: '#F5A623', body: 'Find areas spectrally similar to a known alteration signature or drill-core reference across a prospect AOI. V3 HSI re-embedding will sharpen mineral-similarity retrieval where Firefly VNIR is tasked.' },
    { title: 'Mining lifecycle', eyebrow: 'Mining', accent: '#9C6B2E', body: 'Match tailings, pond, or waste-dump conditions to a reference state; track object-level change as site geometry evolves. V3 SSE-powered anomaly detection flags patches that diverge from the site\u2019s archive-learned normal for analyst review.' },
    { title: 'Agriculture & water', eyebrow: 'Monitoring', accent: '#4ADE80', body: 'Retrieve fields, stands, or waterbodies that resemble a pre-outbreak, pre-fire, or pre-bloom condition; patch search supports sub-field scouting. V3 anomaly scoring surfaces outliers against seasonal archive baselines.' },
    { title: 'Defense & intelligence', eyebrow: 'Defense', accent: '#EF5350', body: 'Facility and material similarity within a cleared AOI; V3 SSE-powered anomaly detection ranks semantic outliers for human review \u2014 not autonomous targeting. ITAR and dissemination rules apply.' },
  ],

  claims: {
    now: [
      'Image and patch similarity search over a customer\u2019s archive or entitled AOI (V1, semi-operational) \u2014 MSI and entitled multispectral layers; reference-image and chip queries with ranked, evidence-linked results',
      'Per-customer embedding index built from entitled archive depth \u2014 low-latency approximate-nearest-neighbor retrieval, updated as new MSI scenes ingest',
      'GeoFM-backed encoding \u2014 DINOv3 and additional hosted backbones (trained on Pixxel MSI / HSI data; operational index path is MSI-first today)',
      'Hyper-local scoping \u2014 results bounded by entitlement and archive depth, with acquisition metadata on every match',
    ],
    eoy: [
      'Object-based search, natural-language / text search, and cross-time object association (V2, in development)',
      'SpotDiff category-specific change detection between temporal image pairs — sensor-agnostic MSI / SAR, language-guided class masks (V2, in development)',
      'LENS-powered label and mask propagation from a single reference polygon across a scene (V2)',
      'Archive scene search surfaced in Aurora as an operator workflow',
      'GeoFM Embeddings API (beta) \u2014 metered encode units over customer archive or AOI for integrators',
    ],
    roadmap: [
      'SSE-powered anomaly detection (V3) \u2014 rank patches, scenes, and objects that diverge from the archive embedding neighbourhood or a reference normal state; evidence-linked outlier hypotheses for analyst review',
      'Firefly VNIR HSI integration (V3) \u2014 out-of-cycle re-embedding when tasked hyperspectral acquisitions arrive, sharpening similarity search, SpotDiff, and anomaly scoring',
      'HSI-enriched index refresh hooks in Aurora LENS subscription and GeoFM Embeddings API encode path (V3)',
      'Trajectory and state similarity over embedding sequences (V3)',
    ],
    never: [
      'Planetary or open-world image search outside the customer\u2019s entitled AOI',
      'Operational Firefly HSI indexing or HSI-native similarity search today \u2014 V3 roadmap, not V1/V2',
      'Operational SSE-powered anomaly detection today \u2014 V3 roadmap; outlier ranks are not autonomous alerts',
      'Autonomous targeting, enforcement, or decisions without analyst review \u2014 similarity is a hypothesis, not a verdict',
      'Real-time streaming / live-video analytics \u2014 LENS is archive-centric',
      'A replacement for the NEXUS Context / Event / Attribution engines \u2014 LENS is the query layer, not the detector',
    ],
    hardRules:
      'Similarity is not causation \u2014 results are ranked hypotheses for expert review, especially in defense, carbon, and exploration. SSE-powered anomaly scores (V3) are outlier hypotheses in embedding space, not verified events or enforcement triggers. Never promise planetary search, autonomous decisions, or accuracy figures without validation on the customer AOI. Retrieval quality depends on archive depth and sensor tier; say so.',
  },

  messaging: {
    framing:
      'LENS is semi-operational today as image and patch similarity search over the customer\u2019s archive or AOI (V1) on MSI-first indexing. Object, text, and SpotDiff change are in development (V2). SSE-powered anomaly detection \u2014 semantic outliers against the archive index \u2014 and Firefly HSI re-embedding are V3 roadmap. The GeoFM Embeddings API is beta with no production SLA. Every retrieval and anomaly result is a ranked hypothesis for analyst review. Be precise about version, sensor tier, and roadmap.',
    differentiators: [
      {
        num: '01',
        title: 'Search by example, not by threshold',
        quote:
          'A reference image, a patch, an object, or a phrase returns the most similar observations across the archive. The analyst stops writing index thresholds and starts asking the question they actually have.',
      },
      {
        num: '02',
        title: 'Hyper-local, not planetary',
        quote:
          'LENS searches a customer-specific embedding space scoped to entitled AOIs and archive depth \u2014 and it deepens with every acquisition. The more a place is observed, the better the retrieval gets.',
      },
      {
        num: '03',
        title: 'Bring your own model',
        quote:
          'The same hosted geoFM backbones \u2014 DINOv3, Ollmo-earth, Tesserra, Prithvi \u2014 are exposed as an embeddings API. Teams fine-tune on their own labels and build downstream models without standing up foundation-model infrastructure.',
      },
    ],
    language: {
      use: [
        'semantic / similarity search',
        'search by example (image, patch, object, text)',
        'hosted GeoFM embeddings (DINOv3, Ollmo-earth, Tesserra, Prithvi) — beta API',
        'SpotDiff category-specific change detection',
        'SSE-powered anomaly detection (V3 roadmap)',
        'archive- or AOI-scoped retrieval',
        'MSI-first indexing today · Firefly HSI on V3 roadmap',
        'evidence-linked, ranked results',
        'build your own model on hosted embeddings',
      ],
      avoid: [
        '"planetary" or "search the whole earth"',
        '"autonomous targeting" / decisions without review',
        '"real-time" / live-video analytics',
        '"detects" X (LENS retrieves similar; engines detect)',
        'uncaveated accuracy numbers',
        'committing version dates to customers without sign-off',
        'HSI-native search or HSI index refresh as operational today',
        'SSE-powered anomaly detection as operational today',
        'autonomous anomaly alerts without analyst review',
      ],
    },
    objections: [
      {
        q: 'How is this different from Google Earth Engine or a generic embedding API?',
        a:
          'Those search a global tile store with general-purpose models. LENS builds a customer-specific embedding space from your archive or entitled AOI, encoded with geospatial foundation models fine-tuned on Pixxel data, and it deepens with every acquisition over that footprint. Hyper-local and evidence-oriented \u2014 every match ties back to a date, sensor, and footprint within your scope.',
      },
      {
        q: 'We want to build our own model \u2014 why use your embeddings instead of our own?',
        a:
          'That is the GeoFM Embeddings API (beta). Standing up DINOv3, Ollmo-earth, Tesserra, or Prithvi on satellite imagery is expensive. LENS hosts them as metered encode units over your archive or AOI \u2014 you pull vectors and fine-tune on your labels. You keep your model; we run the backbone. Beta: no production SLA until general availability.',
      },
      {
        q: 'Is this just keyword search on metadata?',
        a:
          'No. LENS encodes the imagery itself \u2014 scenes, patches, and objects \u2014 into a learned embedding space, so similarity is based on visual and spectral content, not tags. Text search (V2) maps language into that same space; it is not a metadata lookup.',
      },
      {
        q: 'Can I trust a similarity result enough to act on it?',
        a:
          'Treat every result as a ranked hypothesis for expert review. Similarity is not causation, and retrieval quality depends on archive depth and sensor tier. In defense, carbon, and exploration we keep a human analyst in the loop and link results back to evidence; we do not promise autonomous decisions.',
      },
      {
        q: 'Does LENS work with Firefly hyperspectral?',
        a:
          'Not operationally today. V1 indexes MSI and entitled multispectral archive layers. V3 adds Firefly VNIR HSI integration: when tasked hyperspectral acquisitions arrive over your AOI, LENS re-embeds out of cycle so similarity search and SpotDiff reflect hyperspectral depth \u2014 not just MSI appearance. Say roadmap, not shipped.',
      },
      {
        q: 'How does LENS anomaly detection relate to NEXUS event engines?',
        a:
          'NEXUS Context and Event engines flag statistical and contextual anomalies on structured signals. SSE-powered anomaly detection (V3) operates in the same embedding index as similarity search \u2014 ranking patches and scenes that are semantically distant from the archive\u2019s learned normal or a reference state. It is complementary: engines surface candidates; LENS validates and expands hypotheses across the archive. V3 roadmap, not operational today.',
      },
      {
        q: 'Does this replace the NEXUS detection engines?',
        a:
          'No \u2014 they are complementary. The Context and Event engines establish baselines and flag anomalies; LENS is the query layer you reach for when a hypothesis needs validation across the archive beyond a single alert. Memory (the cube) plus detection (engines) plus query (LENS).',
      },
    ],
  },

  pricing: lensPricing,
  apiSchema: lensApiSchema,
};

/**
 * White-paper content — LENS semantic search, built around the V1/V2 demo
 * screenshots and the GeoFM "build your own" story. Figure slots map to assets
 * in public/product-assets/sse/.
 */
export const sseWhitePaper = {
  eyebrow: 'White paper · NEXUS · LENS',
  title: 'LENS: Latent Embedding for Neural Scene-search',
  lede:
    'How geospatial foundation models and embeddings turn a customer\u2019s archive or AOI into something you can query by example \u2014 image, patch, object, or phrase \u2014 and how the same hosted backbones power SpotDiff change detection, SSE-powered anomaly detection (V3), and metered encode units for teams building their own models.',
  headerBar:
    'Forward-looking product narrative. Reflects the target output of the Pixxel LENS semantic search engine. V1 is semi-operational on customer archives; V2 is in development; V3 adds SSE-powered anomaly detection and Firefly HSI. GeoFM Embeddings API is a beta service — not production SLA.',
  illustrativeBanner:
    'WORKING DEMONSTRATIONS \u00b7 Figures are real captures from LENS V1 and V2 development on reference AOIs, not a live customer engagement. The same retrieval architecture is applied across customer archives.',
  meta: [
    { label: 'Capability', value: 'Search + change + anomaly', sub: 'Similarity · SpotDiff · SSE outliers (V3)' },
    { label: 'Backbone', value: 'Geospatial FMs', sub: 'DINOv3 · Ollmo-earth · Tesserra · Prithvi' },
    { label: 'Sensors', value: 'MSI today', sub: 'Firefly HSI · V3 roadmap' },
    { label: 'Modes', value: 'Search + embeddings', sub: 'Subscription + hosted API' },
  ],
  sections: [
    {
      num: '00',
      kicker: 'Embeddings primer',
      title: 'From pixels to vectors — geospatial foundation models',
      figure: 'fig00',
      paragraphs: [
        'Earth-observation data arrives as pixels, radar backscatter, and map geometry — high-dimensional and hard to compare directly. Geospatial embeddings compress that complexity into compact numeric vectors: each patch or scene becomes a point in a learned space where proximity means similarity in structure, land cover, and context, not just colour.',
        'A geospatial foundation model is the engine that produces those vectors. Pre-trained on large volumes of satellite and map data, it learns patterns — water bodies cluster apart from forest, urban texture separates from agriculture — without hand-crafted indices for every task. Downstream applications (classification, object detection, change discovery, similarity retrieval) then operate on the embedding space rather than re-learning features from scratch for each engagement.',
        'LENS applies this pipeline to the customer\u2019s archive or entitled AOI. Optical and hyperspectral scenes (and supplementary layers where entitled) pass through hosted geoFMs — DINOv3, Ollmo-earth, Tesserra, Prithvi — to build a customer-specific index. Similarity search is nearest-neighbour retrieval in that space; the GeoFM Embeddings API (beta) exposes the same encode step for integrators building their own models.',
      ],
    },
    {
      num: '01',
      kicker: 'The search problem',
      title: 'Why archive search is not a solved problem',
      paragraphs: [
        'An earth-observation archive is a strange thing to search. It is enormous, it is mostly redundant, and the question an analyst actually has \u2014 "where else does it look like this?" \u2014 cannot be expressed as a metadata filter or a band-ratio threshold. The interesting structure is in the imagery itself, not in its tags.',
        'Web-scale embedding models do not solve this. They are trained on natural images, they search a global index, and they have no notion of a customer\u2019s entitlement, archive depth, or the spectral and seasonal variation that defines satellite data. Pointed at a reservoir or a tailings facility, they retrieve visually generic neighbours, not operationally meaningful ones.',
        'LENS takes the opposite approach: encode the customer\u2019s own archive with geospatial foundation models, index it for fast retrieval, and let an analyst search it by example. Everything that follows is a demonstration of that idea, layer by layer, from the V1 captures to the V2 capabilities now in build.',
      ],
    },
    {
      num: '02',
      kicker: 'V1 demonstration',
      title: 'Image similarity search',
      figure: 'fig01',
      paragraphs: [
        'The foundational capability is image similarity. An analyst supplies a reference \u2014 a scene or a chip \u2014 and LENS returns the most similar observations across the archive, ranked by distance in the embedding space. The three examples here (A, B, C) each show a query scene and the matches it surfaces across different landscapes.',
        'This is the primitive everything else builds on. No thresholds, no SQL, no manual feature engineering \u2014 just a reference and a ranked set of neighbours, each tied to an acquisition. The embedding space captures structural and spectral character, not just colour, so retrieval stays consistent whether the reference is urban, agricultural, or mixed terrain.',
      ],
    },
    {
      num: '03',
      kicker: 'V1 demonstration',
      title: 'More similarity examples',
      figure: 'fig02',
      paragraphs: [
        'Because the index is built over the customer\u2019s full archive, similarity search reaches across acquisition dates and conditions. These further examples (A, B) show matches drawn from different points in the record \u2014 the same place, or places like it, surfaced regardless of when they were captured.',
        'Every result is presented in its spatial context with its footprint and acquisition metadata, so a match is immediately actionable: an analyst sees not just that something is similar, but where and when it was observed.',
      ],
    },
    {
      num: '04',
      kicker: 'V2 in development',
      title: 'Archive scene search in the platform',
      figure: 'fig03',
      paragraphs: [
        'V2 brings semantic search into the operator surface. This capture from the platform shows archive scene search \u2014 browsing and querying the full historical scene archive directly, with results rendered in the workflow rather than returned as raw vectors.',
        'This is the step from a retrieval primitive to an analyst tool: the query, the ranked results, and the map are in one place.',
      ],
    },
    {
      num: '05',
      kicker: 'V2 in development',
      title: 'Text search',
      figure: 'fig04',
      paragraphs: [
        'Text search maps natural-language and keyword queries into the same embedding space the imagery lives in. Instead of supplying a reference image, an analyst describes what they are looking for and LENS retrieves the matching scenes, patches, or objects (A, B).',
        'It is not a metadata lookup \u2014 the language is embedded alongside the imagery, so a textual query returns content-similar results, not tag matches.',
      ],
    },
    {
      num: '06',
      kicker: 'V2 in development',
      title: 'Pixel and object similarity',
      figure: 'fig05',
      paragraphs: [
        'V2 also moves below the scene to pixels and objects. Object-based search encodes discrete entities \u2014 facilities, waterbodies, canopy patches \u2014 as first-class items in the index, so an analyst can retrieve and rank objects, not just tiles (A, B).',
        'That object layer feeds SpotDiff, LENS\u2019s sensor-agnostic change-detection stack (in development): the same embedding space that supports similarity retrieval also drives per-pixel similarity maps, language-guided region proposals, and category-specific change masks between temporal image pairs.',
      ],
    },
    {
      num: '07',
      kicker: 'Change detection',
      title: 'SpotDiff — sensor-agnostic land-use change',
      figure: 'fig06',
      paragraphs: [
        'Pixel differencing answers "something changed" but not "what changed, where, and of which class." SpotDiff composes geospatial foundation models into a zero-shot change pipeline: a temporal image pair (T\u2080, T\u2081) plus optional semantic class guidance (a noun phrase such as "buildings" or "solar farm") produces a category-specific change mask over the customer\u2019s AOI.',
        'The architecture runs in three coupled stages. A feature-similarity module encodes each date through a shared backbone, upsamples patch tokens to per-pixel embeddings, and applies a similarity operator to produce a dense similarity map — low similarity highlights where structure or cover diverged. In parallel, a language-guided ROI proposal module (SWIMS) uses the same images and the class phrase to propose instance masks at T\u2080 and T\u2081, fused temporally into final instance regions. A change operator then combines the similarity map with those masks to emit a predicted change mask scoped to the category of interest.',
        'The design is sensor-agnostic: Sentinel-2 MSI, high-resolution optical, and SAR pairs can feed the same pipeline when entitled in the archive. SpotDiff is in development as part of LENS V2 — complementary to semantic retrieval, not a replacement for NEXUS event engines.',
      ],
    },
    {
      num: '08',
      kicker: 'Change detection',
      title: 'Category-specific change in practice',
      figure: 'fig07',
      paragraphs: [
        'Two representative cases show how SpotDiff separates class semantics from raw difference. In the agricultural-to-solar transition, fallow fields at T\u2080 become a utility-scale solar array at T\u2081. The similarity map concentrates low-similarity signal on the panel footprint; the change operator isolates that region into a solar-farm mask rather than flagging unrelated seasonal vegetation variation elsewhere in the tile.',
        'Urban expansion demonstrates multi-class behaviour in a single complex scene: new building footprints and adjacent land clearing receive distinct change classes from one T\u2080/T\u2081 pair. The workflow — image pair, similarity heatmap, class mask — is the same whether the analyst cares about infrastructure, vegetation loss, or energy installations.',
        'These are illustrative outputs on reference AOIs. Production entitlements, class vocabularies, and validation against customer references are scoped per engagement. Change masks are hypotheses for analyst review, consistent with LENS retrieval policy.',
      ],
    },
    {
      num: '09',
      kicker: 'Change detection',
      title: 'LENS-powered label and mask generation',
      figure: 'fig08',
      paragraphs: [
        'Training and validating change models traditionally requires dense labels — expensive to produce by hand across wide AOIs. LENS closes that loop: an analyst draws a single reference polygon on one example of a target class; the semantic search engine propagates that example across the input image, producing a ground-truth-style mask of every similar instance in the scene.',
        'That mask becomes supervision or QA for SpotDiff and downstream fine-tunes — search by example scales labeling from one polygon to a full tile without a separate annotation toolchain. The same customer archive index used for retrieval supplies the embeddings that drive propagation, so labels stay scoped to entitled imagery and the classes the customer actually cares about.',
        'Together, similarity search, SpotDiff change masks, and LENS-powered label generation form one product surface: find examples, detect category-specific change between dates, and bootstrap labels from a single reference — all over the customer\u2019s archive or AOI.',
      ],
    },
    {
      num: '10',
      kicker: 'V3 roadmap',
      title: 'SSE-powered anomaly detection',
      paragraphs: [
        'Threshold alerts answer whether an index crossed a line. SSE-powered anomaly detection asks a different question: which observations in today\u2019s acquisition are semantically unlike the archive this customer has built over their AOI? Because LENS already encodes every entitled scene and patch into a customer-specific embedding index, anomaly detection reuses that same semantic search engine — scoring distance from the archive\u2019s learned neighbourhood or from an analyst-supplied reference \u201cnormal\u201d chip.',
        'The output is a ranked list of outlier patches and scenes with footprints, acquisition metadata, and distance scores — the same evidence-oriented contract as similarity search. An analyst reviews hypotheses; nothing fires autonomously. This complements NEXUS Context and Event engines, which operate on structured signals and baselines; LENS anomalies live in embedding space and are archive-scoped by construction.',
        'V3 also weaves Firefly HSI re-embedding into the same index so anomaly and similarity scores can use hyperspectral depth where tasked. Platform figures for anomaly workflows are not yet available — architecture and API surface are defined; demonstrations will follow when V3 engineering completes.',
      ],
    },
    {
      num: '11',
      kicker: 'The backbone',
      title: 'Geospatial foundation models in LENS',
      paragraphs: [
        'LENS is backbone-agnostic (see Figure 00 for the embedding pipeline). It hosts DINOv3 for general visual similarity (fine-tuned on Pixxel MSI / HSI data), Ollmo-earth for multi-sensor earth-observation character, Tesserra for parcel- and land-level representation, and Prithvi as a transparent open backbone where reproducibility matters. Operational indexing is MSI-first; Firefly VNIR HSI out-of-cycle re-embedding is V3 roadmap.',
        'The choice of backbone is not cosmetic. General vision models miss the spectral and seasonal variation that defines satellite imagery; earth-observation foundation models are trained for it. Hosting several and routing per task is what keeps retrieval quality high across very different verticals.',
      ],
    },
    {
      num: '12',
      kicker: 'Build your own',
      title: 'Hosted GeoFM embeddings',
      paragraphs: [
        'That hosted infrastructure is also a product in its own right. Through the GeoFM Embeddings API (beta), customers pull embeddings over their archive or AOI, fine-tune on their own labels, and build downstream classifiers, change-detection models, or retrieval systems \u2014 without standing up and serving foundation models themselves.',
        'Standing up DINOv3, Ollmo-earth, Tesserra, or Prithvi on satellite imagery is expensive and specialised. LENS runs the backbone; you keep your model and your labels. Production SLAs remain roadmap; the beta API is available on metered encode-unit tiers today.',
      ],
    },
    {
      num: '13',
      kicker: 'What this enables',
      title: 'One engine, several decisions',
      outcomes: [
        {
          label: 'Analyst',
          title: 'Fast archive exploration',
          body:
            'An analyst stops writing thresholds and starts asking by example \u2014 surfacing every observation that looks like a reference scene, patch, or object across years of archive in seconds.',
        },
        {
          label: 'Government / defense',
          title: 'Site intelligence',
          body:
            'Within a cleared AOI, an analyst retrieves facilities and materials similar to a reference and follows them across time \u2014 human-in-the-loop, with ITAR and dissemination rules applied.',
        },
        {
          label: 'Agribusiness',
          title: 'Field-history query',
          body:
            'A monitoring team retrieves fields or stands that resemble a pre-outbreak or pre-stress condition, using patch search for sub-field scouting and spot-checks.',
        },
        {
          label: 'Monitoring',
          title: 'Category-specific change',
          body:
            'A land-use team runs SpotDiff on entitled MSI or SAR pairs with a class phrase — solar installation, building footprint, land clearing — and reviews category masks alongside similarity search over the same archive.',
        },
        {
          label: 'Operations',
          title: 'Archive anomaly review',
          body:
            'An analyst runs SSE-powered anomaly detection (V3) over a new acquisition — ranking patches farthest from the archive\u2019s embedding normal — and triages outliers alongside NEXUS engine alerts.',
        },
        {
          label: 'Integrator',
          title: 'Build your own model',
          body:
            'A developer pulls hosted geoFM embeddings over their imagery and fine-tunes a downstream classifier or retrieval model \u2014 foundation-model capability without the foundation-model infrastructure.',
        },
      ],
    },
    {
      num: '14',
      kicker: 'What is operational',
      title: 'What ships today, and what is coming',
      paragraphs: [
        'The demonstrations in this paper span shipped and in-build capabilities. Version targets are engineering goals, not customer commitments, and retrieval quality depends on archive depth and sensor tier.',
      ],
      statusGroups: [
        {
          label: 'Semi-operational today (V1)',
          body:
            'Image and patch similarity search over a customer\u2019s archive or entitled AOI, GeoFM-backed encoding on MSI archive today, incremental low-latency index, and evidence-linked ranked results with acquisition metadata.',
        },
        {
          label: 'In development (V2)',
          body:
            'Archive scene search in Aurora, natural-language text search, object-based search with cross-time association, SpotDiff sensor-agnostic category-specific change detection, and LENS-powered label/mask propagation from a single reference polygon.',
        },
        {
          label: 'Roadmap (V3)',
          body:
            'SSE-powered anomaly detection over the archive embedding index; Firefly VNIR HSI out-of-cycle re-embedding; HSI-enriched similarity search, SpotDiff, and anomaly scoring; natural-language copilot; trajectory / state similarity over embedding sequences.',
        },
        {
          label: 'Beta · GeoFM Embeddings API',
          body:
            'Metered encode units over customer archive or AOI — Sandbox through Fleet tiers. Production SLAs and vertical fine-tuned encoders remain roadmap (V3\u2013V4).',
        },
      ],
    },
  ],
  footer: 'PIXXEL ANALYTICS · LENS · NEXUS SEMANTIC SEARCH · INTERNAL WHITE PAPER · WORKING DRAFT · NOT FOR DISTRIBUTION',
};

/**
 * Figure slots — filenames under public/product-assets/sse/.
 * Multi-part figures (Figure X: A, B, C) render their parts together under one
 * label and caption, matching the source document grouping.
 */
export const sseFigures = {
  fig00: {
    label: 'Figure 00',
    title: 'Geospatial embeddings and foundation models',
    src: 'geofm_embeddings_primer.png',
    caption:
      'From input geospatial data (optical satellite imagery, SAR, map layers) through embedding vectors that capture location context in a semantic feature space, to geospatial foundation models pre-trained at scale. The same encode step powers LENS similarity search over a customer archive and the GeoFM Embeddings API (beta) for downstream model building.',
  },
  fig01: {
    label: 'Figure 01',
    title: 'Image similarity search',
    platformNote: 'LENS V1 · Query scene and ranked matches',
    parts: [
      { src: 'sim_search_a.png', sub: 'A' },
      { src: 'sim_search_b.png', sub: 'B' },
      { src: 'sim_search_c.png', sub: 'C' },
    ],
    caption:
      'Three examples (A, B, C) of image similarity search: a reference scene query and the most similar observations LENS retrieves from the archive, ranked by distance in the embedding space. Retrieval stays consistent across urban, agricultural, and mixed terrain \u2014 the V1 primitive everything else builds on.',
  },
  fig02: {
    label: 'Figure 02',
    title: 'More similarity search examples',
    platformNote: 'LENS V1 · Across the archive',
    parts: [
      { src: 'sim_search_d.png', sub: 'A' },
      { src: 'sim_search_e.png', sub: 'B' },
    ],
    caption:
      'Further examples (A, B) with matches drawn from across the customer\u2019s full archive, regardless of acquisition date. Every result carries its footprint and acquisition metadata, so a match is immediately actionable \u2014 not just similar, but located and dated.',
  },
  fig03: {
    label: 'Figure 03',
    title: 'Archive scene similarity search — platform UI',
    src: 'archive_scene_search.png',
    compact: true,
    platformNote: 'LENS V2 · Operator surface',
    caption:
      'Semantic search inside the platform: archive scene search browses and queries the full historical scene archive, with query, ranked results, and map in one workflow \u2014 the step from a retrieval primitive to an analyst tool.',
  },
  fig04: {
    label: 'Figure 04',
    title: 'Text search',
    platformNote: 'LENS V2 · Natural-language query',
    parts: [
      { src: 'text_search_a.png', sub: 'A' },
      { src: 'text_search_b.png', sub: 'B', compact: true },
    ],
    caption:
      'Text search (A, B) maps natural-language and keyword queries into the same embedding space as the imagery. An analyst describes what they want; LENS retrieves content-similar scenes, patches, or objects \u2014 not metadata tag matches.',
  },
  fig05: {
    label: 'Figure 05',
    title: 'Pixel and object similarity search',
    platformNote: 'LENS V2 · Object-level retrieval',
    parts: [
      { src: 'pixel_object_a.png', sub: 'A', compact: true },
      { src: 'pixel_object_b.png', sub: 'B', compact: true },
    ],
    caption:
      'Pixel- and object-level similarity retrieval (A, B). Object-based search encodes discrete entities \u2014 facilities, waterbodies, canopy patches \u2014 as first-class items in the index, so analysts retrieve and rank objects, not just tiles. The same hosted geoFM backbones are exposed through the GeoFM Embeddings API.',
  },
  fig06: {
    label: 'Figure 06',
    title: 'SpotDiff architectural overview',
    src: 'spotdiff_architecture.png',
    platformNote: 'LENS V2 · SpotDiff pipeline (in development)',
    caption:
      'SpotDiff composes foundation-model modules for sensor-agnostic change detection: temporal pair inputs and optional semantic class guidance feed a feature-similarity branch (backbone \u2192 patch tokens \u2192 per-pixel embeddings \u2192 similarity map) and a language-guided ROI branch (SWIMS instance masks fused across T\u2080/T\u2081). A change operator merges both into a category-specific predicted change mask.',
  },
  fig07: {
    label: 'Figure 07',
    title: 'SpotDiff case studies — solar and urban expansion',
    src: 'spotdiff_case_studies.png',
    platformNote: 'LENS V2 · Illustrative AOIs',
    caption:
      'Representative SpotDiff workflows: agricultural land to utility-scale solar (single-class mask) and undeveloped plot to buildings plus land clearing (multi-class masks). Each case runs T\u2080/T\u2081 imagery through a similarity heatmap to a class-specific change map — sensor-agnostic MSI inputs shown here.',
  },
  fig08: {
    label: 'Figure 08',
    title: 'LENS-powered label and mask generator',
    src: 'spotdiff_label_mask_generator.png',
    platformNote: 'LENS V2 · Search-propagated labeling',
    caption:
      'An analyst supplies one reference polygon on a target class; LENS semantic search propagates the example across the scene to produce a ground-truth-style mask of similar instances — scaling supervision for SpotDiff training and validation without hand-labeling every object.',
  },
};

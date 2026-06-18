/**
 * Pixxel SWIPE — Water product configuration.
 *
 * SWIPE = Spectral Water Inversion Processor and Emulator.
 * Second operational product in the Products redesign. Sold as a monitoring
 * subscription and as Insights-as-a-Service (API). The white paper runs from
 * the aquatic radiative-transfer problem through the forward model, the
 * ResNet + MDN inverse emulator, validation, and real Firefly scenes to the
 * operational water-quality products.
 *
 * Sub-section copy (claims / messaging / pricing) lives in product data files.
 */

import { swipePricing as waterPricing } from './pricing/swipe.js';
import { swipeApiSchema } from './api/swipe.js';

export const waterProduct = {
  id: 'water',
  slug: 'water',
  name: 'SWIPE',
  fullName: 'Pixxel SWIPE',
  acronymExpansion: 'Spectral Water Inversion Processor and Emulator',
  color: '#4FC3F7',
  tagline: 'Physics-grounded water quality from any sensor — constituents and IOPs, not band-ratio indices.',
  sub: 'Water Quality · HAB · IOPs · Non-optical · Subscription / API',
  desc:
    'SWIPE is an end-to-end aquatic inversion engine. It corrects the full radiometric path — atmosphere, sunglint, adjacency, and sensor noise — then inverts water-leaving reflectance into constituent concentrations (Chl-a, phycocyanin, CDOM, TSM), inherent optical properties, and MicroClim-fused non-optical proxies (dissolved oxygen, pH, ammonia). Every retrieval ships with pixel-wise uncertainty. Sensor-agnostic, built on a physics-forward synthetic training set.',

  landing: {
    lede:
      'SWIPE is Pixxel\u2019s water intelligence product. It reads inland and coastal water with radiative-transfer physics, separates the atmosphere and surface effects that corrupt aquatic signals, and inverts what is left into the constituents and optical properties that describe water quality \u2014 each with calibrated uncertainty.',
    paragraphs: [
      'Remote sensing over water is harder than over land: the signal that reaches the sensor is a tangle of atmosphere, sunglint, adjacent-land contamination, and a faint water-leaving component. Broadband band-ratio indices collapse all of that into a single number and break down on dynamic waterbodies. SWIPE instead models the physics forward \u2014 building millions of synthetic spectra from first-principles particle optics and radiative transfer \u2014 then trains a ResNet + Mixture Density Network to invert any sensor\u2019s spectrum back to constituents and inherent optical properties.',
      'The result is an end-to-end processor: SWIPE owns its own atmospheric correction, sunglint and adjacency correction, and noise handling \u2014 it does not depend on a separate land-oriented correction. It retrieves chlorophyll-a, phycocyanin (the cyanobacteria pigment behind harmful algal blooms), CDOM, total suspended matter, and the underlying absorption and backscatter properties, and fuses MicroClim climate forcing to estimate non-optical variables \u2014 dissolved oxygen, pH, and ammonia \u2014 that reflectance alone cannot see.',
      'Every product layer carries a per-pixel uncertainty from the network\u2019s posterior, so operators know where to trust a retrieval and where not to. SWIPE ships today as monitoring deliverables and APIs; the same outputs become a persistent, queryable waterbody cube under NEXUS \u2014 our north star \u2014 where every acquisition deepens a baseline you can search by example.',
    ],
    commercialModels: [
      {
        title: 'Insights as a Service',
        accent: '#4FC3F7',
        body:
          'API-only SWIPE layers: reflectance, constituents, HAB, IOPs, non-optical proxies, and uncertainty as refreshed rasters and vectors — integrate into your monitoring or compliance stack.',
      },
      {
        title: 'Aurora subscription',
        accent: 'var(--cyan)',
        body:
          'Platform on top of the same layers: bloom and constituent dashboards, copilot, alert workflows, and supplementary datasets. Price by AOI band and refresh cadence only.',
      },
    ],
    northStar:
      'SWIPE is the operational entry point. NEXUS is where it is headed \u2014 a persistent intelligence cube per waterbody, full-archive semantic query over bloom and constituent history, and compounding water intelligence across seasons.',
    outputLayers: [
      {
        layers: [
          { name: 'Water-leaving reflectance', desc: 'SWIPE-corrected, analysis-ready reflectance rasters.' },
          {
            name: 'Optical constituents',
            desc: 'Chl-a, phycocyanin, CDOM, TSM, and turbidity with per-pixel uncertainty.',
          },
          {
            name: 'Harmful algal blooms',
            desc: 'Phycocyanin retrieval, bloom extent, and phytoplankton carbon where signal supports.',
          },
          {
            name: 'Inherent optical properties',
            desc: 'Absorption and backscatter decomposition; attenuation where signal allows.',
          },
          {
            name: 'Non-optical proxies',
            desc: 'Dissolved oxygen, pH, and ammonia estimates fused with MicroClim — model outputs, not direct measurements.',
          },
        ],
      },
    ],
  },

  claims: {
    now: [
      'Full SWIPE inversion path \u2014 SWIPE-native atmospheric correction, sunglint correction, adjacency correction, and sensor-noise handling (independent of ISOFIT)',
      'Optical constituents \u2014 chlorophyll-a, phycocyanin, CDOM, total suspended matter, and turbidity from full-spectrum inversion, not band ratios',
      'Harmful algal bloom detection \u2014 phycocyanin retrieval and bloom extent, with phytoplankton carbon content where the spectrum supports it',
      'Inherent optical properties \u2014 absorption and backscatter decomposition (phytoplankton vs non-algal particle) and attenuation where signal allows',
      'Non-optical proxies \u2014 dissolved oxygen, pH, and ammonia from MicroClim-fused estimation',
      'Per-pixel uncertainty \u2014 every retrieval ships with a calibrated confidence bound from the MDN posterior',
      'Sensor-agnostic retrieval \u2014 operates across hyperspectral and multispectral sensors; Firefly VNIR is the primary tasked source',
    ],
    eoy: [
      'Productized monitoring subscription with standardized delivery scope and Aurora / Zenith dashboard access',
      'Anomaly and exceedance alerting against each waterbody\u2019s own baseline as a customer-facing capability',
      'NEXUS waterbody cube \u2014 persistent, queryable constituent and bloom history that compounds across seasons',
      'Benthic cover typing for optically shallow waters \u2014 algae / seagrass, sand, coral (in development)',
    ],
    never: [
      'Phytoplankton functional type / species-level discrimination \u2014 not in this product version (roadmap)',
      'Drinking-water safety certification or regulatory compliance sign-off \u2014 SWIPE is supporting evidence, not certification',
      'A replacement for in-situ sampling, lab assays, or statutory monitoring on its own',
      'Benthic / shallow-water typing as an operational claim \u2014 in development, not yet shipping',
    ],
    hardRules:
      'Never present non-optical proxies (DO, pH, ammonia) as direct measurements \u2014 they are model estimates fused with climate forcing. Never claim PFT species ID or benthic typing as operational. Always ship uncertainty with every retrieval and state sensor tier.',
  },

  messaging: {
    framing:
      'SWIPE is operational today: the full inversion path, optical constituents, HAB detection, IOPs, non-optical proxies, and per-pixel uncertainty all ship now across hyperspectral and multispectral sensors. PFT species discrimination is roadmap; benthic typing is in development. The atmospheric correction is SWIPE\u2019s own, not ISOFIT. Say the grade and the uncertainty plainly \u2014 that honesty is the advantage with technical water buyers.',
    differentiators: [
      {
        num: '01',
        title: 'Physics forward, learning inverse',
        quote:
          'SWIPE simulates water from first-principles particle optics and radiative transfer, then learns the inverse. The pattern-matching happens over physically valid spectra \u2014 not empirical band ratios fit to a handful of lakes.',
      },
      {
        num: '02',
        title: 'Uncertainty on every pixel',
        quote:
          'The Mixture Density Network returns a posterior, not a point estimate. Every constituent map ships with a calibrated confidence bound \u2014 a filter for where decisions should and should not be made.',
      },
      {
        num: '03',
        title: 'The whole radiometric path',
        quote:
          'Atmosphere, sunglint, adjacency, and noise are corrected inside SWIPE. We do not hand you a constituent map built on someone else\u2019s land-oriented correction and hope the edges and glint behave.',
      },
    ],
    language: {
      use: [
        'constituent retrieval (Chl-a, phycocyanin, CDOM, TSM)',
        'inherent optical properties (IOPs)',
        'SWIPE-native atmospheric correction',
        'sunglint and adjacency correction',
        'per-pixel uncertainty / MDN posterior',
        'HAB detection via phycocyanin',
        'non-optical proxies (DO, pH, ammonia)',
      ],
      avoid: [
        '"measures" DO / pH / ammonia (they are proxies)',
        '"species ID" or PFT discrimination as operational',
        '"benthic mapping" as operational (in development)',
        '"drinking-water safe" / compliance certification',
        '"ISOFIT" for the aquatic correction path',
        'uncaveated accuracy numbers',
      ],
    },
    objections: [
      {
        q: 'We already use Sentinel-2 / chlorophyll band-ratio indices.',
        a:
          'Band ratios are a reasonable first look but they are empirical and degenerate: sediment, CDOM, and bloom all push the same index, and atmosphere and glint corrupt it. SWIPE inverts the full spectrum against a physics-forward model, so it separates phytoplankton from mineral and dissolved signals, retrieves phycocyanin specifically for cyanobacteria, and reports uncertainty per pixel. It runs on Sentinel-2 too \u2014 the difference is the physics and the separation, not the input.',
      },
      {
        q: 'How can a model trained on synthetic data work on real water?',
        a:
          'Because the synthetic data is physics, not guesses. SWIPE builds spectra from measured particle optics (refractive-index-derived phytoplankton SIOPs, global mineral assemblages, CDOM) run through a radiative-transfer model across hundreds of thousands of atmospheres. Validation against unseen field and airborne data shows the retrievals generalise across geographies, and the uncertainty estimates stay calibrated even on out-of-distribution scenes.',
      },
      {
        q: 'Do you actually measure dissolved oxygen, pH, and ammonia from space?',
        a:
          'No \u2014 those are not optically active, so no sensor measures them directly. SWIPE estimates them as proxies by fusing the optical retrievals with MicroClim climate forcing through a dedicated model. We label them as estimates with uncertainty, useful for screening and trend context, not as substitutes for an in-situ probe.',
      },
      {
        q: 'Can you detect which algae species is blooming?',
        a:
          'We detect the pigment that matters most operationally \u2014 phycocyanin, the marker for cyanobacteria and most harmful blooms \u2014 and quantify bloom extent and phytoplankton carbon. Full phytoplankton functional type and species-level discrimination is on the roadmap, not in this product version, and we say so.',
      },
      {
        q: 'Why not just use ISOFIT for atmospheric correction like the land products?',
        a:
          'Water is a different problem. The water-leaving signal is a few percent of the top-of-atmosphere radiance, and sunglint and adjacent-land contamination dominate the edges. SWIPE carries its own aquatic atmospheric correction plus glint and adjacency correction inside the inversion, characterised on the same synthetic physics it inverts \u2014 so the correction and the retrieval are consistent.',
      },
    ],
  },

  pricing: waterPricing,
  apiSchema: swipeApiSchema,
};

/**
 * White-paper content — SWIPE forward model, ResNet + MDN inverse, and the
 * operational water-quality products. Generic multi-scene narrative.
 * Figure slots map to assets in public/product-assets/water/.
 */
export const waterWhitePaper = {
  eyebrow: 'White paper · Water · SWIPE',
  title: 'SWIPE: Spectral Water Inversion Processor and Emulator',
  lede:
    'How a physics-forward model and a fast inverse emulator turn a corrupted satellite signal into defensible water quality \u2014 across estuaries, rivers, and reservoirs. From the radiative-transfer problem to chlorophyll, phycocyanin, optical properties, and the non-optical variables reflectance cannot see, each with calibrated uncertainty.',
  headerBar:
    'Forward-looking product narrative. Reflects the target output of the Pixxel SWIPE analytics stack across hyperspectral and multispectral sensors. Not all components are operational today.',
  illustrativeBanner:
    'ILLUSTRATIVE CASE STUDY \u00b7 Data and findings are representative examples of SWIPE outputs, not a live customer engagement. Platform and scene views show the product on reference waterbodies; the same inversion architecture is applied across AOIs.',
  meta: [
    { label: 'Domain', value: 'Inland & coastal', sub: 'Reservoirs, rivers, estuaries' },
    { label: 'Method', value: 'Forward RT + ResNet/MDN', sub: 'Synthetic-trained inverse emulator' },
    { label: 'Sensor', value: 'Sensor-agnostic', sub: 'Firefly VNIR primary \u00b7 MSI compatible' },
    { label: 'Outputs', value: 'Constituents + IOPs', sub: 'Optical, non-optical, uncertainty' },
  ],
  sections: [
    {
      num: '00',
      kicker: 'The monitoring problem',
      title: 'What the sensor actually sees over water',
      figure: 'fig01',
      paragraphs: [
        'The signal a satellite records over water is mostly not the water. Light scatters in the atmosphere, glints off the surface, leaks in from adjacent land, and only a few percent of the top-of-atmosphere radiance ever penetrated the water and came back carrying information about what is in it. That faint water-leaving component is what actually encodes chlorophyll, sediment, dissolved organics, and pigments.',
        'Conventional approaches reach for broadband band-ratio indices. They are empirical, they are degenerate \u2014 sediment, CDOM, and a bloom can all move the same index in the same direction \u2014 and they inherit whatever errors a land-oriented atmospheric correction leaves behind. On a dynamic waterbody, that is not good enough to act on.',
        'SWIPE treats this as the inverse problem it actually is. Rather than fit an index, it models the whole forward physics \u2014 how constituents and the atmosphere produce a spectrum \u2014 and then learns to run that physics backwards. Everything that follows is built on that decomposition.',
      ],
    },
    {
      num: '01',
      kicker: 'Building the forward model',
      title: 'Simulating water from first principles',
      figure: 'fig02',
      paragraphs: [
        'You cannot train a reliable model on the handful of well-characterised waterbodies that have matched in-situ spectra. SWIPE solves the data problem by generating it: a physics-forward simulator builds millions of synthetic spectra from the optical properties of the things that are actually in water.',
        'Phytoplankton optical properties come from a two-layer coated-sphere model parameterised by measured refractive indices across dozens of species \u2014 biophysically linked absorption and backscatter, not curve fits. Non-algal particles draw on global mineral assemblages; colored dissolved organic matter and detritus add their own absorption. A Dirichlet process samples realistic mixtures of phytoplankton functional types, sizes, and pigments, and a radiative-transfer solver propagates each combination through the water column, surface, and atmosphere.',
        'The design is deliberately one-to-many: each water state is rendered under hundreds of thousands of atmospheric and geometric conditions, including sunglint and adjacency. That is what teaches the inverse model to attribute the spectrum correctly instead of memorising a single clean case.',
      ],
    },
    {
      num: '02',
      kicker: 'Optical inversion',
      title: 'ResNet and MDN: retrieving what the water contains',
      figure: 'fig03',
      paragraphs: [
        'The inverse engine is a ResNet backbone feeding a Mixture Density Network head. The ResNet learns spectral features from the observed reflectance; the MDN turns those features into a full probability distribution over the constituents \u2014 chlorophyll-a, phycocyanin, CDOM, total suspended matter \u2014 and the underlying optical properties.',
        'Two design choices matter commercially. First, the MDN outputs a posterior, not a point estimate, which handles the many-to-one degeneracy of water spectra and yields a calibrated uncertainty for every pixel. Second, the model is sensor-agnostic: trained on synthetic spectra, it inverts whatever sensor it is given \u2014 Firefly hyperspectral as the primary tasked source, but multispectral archives too \u2014 in milliseconds per pixel rather than the minutes a full physical inversion would take.',
      ],
    },
    {
      num: '03',
      kicker: 'Non-optical inversion',
      title: 'What the spectrum cannot see directly',
      figure: 'fig04',
      paragraphs: [
        'Some of the variables operators care about most \u2014 dissolved oxygen, pH, ammonia \u2014 are not optically active. No sensor measures them directly. SWIPE estimates them with a separate model that fuses the optical retrievals with MicroClim climate forcing, learning the relationships between water state, weather, and these non-optical quantities.',
        'We are deliberate about how this is framed: these are proxies, with their own uncertainty, useful for screening and trend context rather than as a substitute for an in-situ probe. Keeping the non-optical model architecturally distinct from the optical inversion is what lets us be honest about which numbers came from photons and which came from inference.',
      ],
    },
    {
      num: '04',
      kicker: 'Validation',
      title: 'How the model performs against unseen data',
      figure: 'fig05',
      paragraphs: [
        'A synthetic-trained model is only credible if it holds up on real water it never saw. SWIPE is evaluated on independent field and airborne datasets, and on the quality of its uncertainty as much as its point accuracy.',
        'The uncertainty estimates scale with error, stay well-calibrated even on out-of-distribution scenes, and act as a reliable filter \u2014 removing the highest-uncertainty pixels drops the error sharply. That is the property that makes the product safe to operationalise: the model knows, and reports, where it is unsure.',
      ],
    },
    {
      num: '05',
      kicker: 'Firefly in the field',
      title: 'Real hyperspectral data over estuaries and rivers',
      figure: 'fig06',
      paragraphs: [
        'Applied to Firefly acquisitions, the full SWIPE path runs end to end: its own aquatic atmospheric correction, sunglint and adjacency correction, and noise handling produce analysis-ready water-leaving reflectance \u2014 not a land-oriented correction borrowed and hoped to behave over water.',
        'Across estuary and river scenes, the retrievals resolve realistic gradients of the common water-quality constituents, with the spatial detail hyperspectral resolution provides. This is what the operational product looks like on real data.',
      ],
    },
    {
      num: '06',
      kicker: 'HAB detection',
      title: 'Phycocyanin, bloom extent, and carbon',
      figure: 'fig07',
      paragraphs: [
        'Harmful algal blooms are the highest-stakes water-quality signal SWIPE addresses. The product retrieves phycocyanin \u2014 the accessory pigment specific to cyanobacteria \u2014 from its diagnostic absorption near 620 nm, delineates bloom extent, and quantifies phytoplankton carbon content where the spectrum supports it.',
        'This is operational today and it is the use case where physics-based separation matters most: a phycocyanin retrieval distinguishes a cyanobacterial bloom from a harmless sediment plume or a CDOM pulse in a way a broadband index cannot. Species-level functional-type discrimination remains a roadmap item, and we scope claims accordingly.',
      ],
    },
    {
      num: '07',
      kicker: 'Non-optical products',
      title: 'Dissolved oxygen, pH, and ammonia',
      figure: 'fig08',
      paragraphs: [
        'The non-optical layer turns the fused optical-plus-climate model into operator-facing products: dissolved oxygen, pH, and ammonia proxies mapped across the same waterbody, on the same object record as the optical constituents.',
        'Delivered alongside the optical stack, these give a fuller picture of water condition than reflectance alone \u2014 oxygen sag downstream of a bloom, pH shifts, ammonia context \u2014 always carried as model estimates with uncertainty, never as direct measurements.',
      ],
    },
    {
      num: '08',
      kicker: 'IOP and attenuation',
      title: 'Decoupling the water column',
      figure: 'fig09',
      paragraphs: [
        'Beneath the constituent concentrations are the inherent optical properties \u2014 the absorption and backscatter coefficients that physically govern how light moves through water. SWIPE decomposes them, separating the phytoplankton contribution from the non-algal particle contribution and reporting attenuation where the signal allows.',
        'In a sediment-rich delta, this decoupling is what lets the product distinguish a biological signal from a mineral one, rather than lumping all turbidity together. The IOPs are also the bridge to carbon-stock and productivity work that builds on the optical decomposition.',
      ],
    },
    {
      num: '09',
      kicker: 'Sunglint correction',
      title: 'Recovering signal where the surface reflects sky',
      figure: 'fig10',
      paragraphs: [
        'Sunglint \u2014 direct reflection of the sky and sun off the water surface \u2014 can swamp the water-leaving signal entirely. Because SWIPE characterised glint in the same synthetic physics it inverts, it can correct for it inside the retrieval rather than masking glinted pixels out.',
        'The effect is recovered coverage: scenes and viewing geometries that index-based methods would have to discard become usable, which matters for revisit frequency and for catching a bloom on the day it happens.',
      ],
    },
    {
      num: '10',
      kicker: 'Adjacency correction',
      title: 'Removing land contamination at the water\u2019s edge',
      figure: 'fig11',
      paragraphs: [
        'Near shorelines, light scattered from bright adjacent land leaks into water pixels and biases retrievals \u2014 exactly where small reservoirs, river reaches, and near-shore zones live. SWIPE models and removes this adjacency effect as part of the inversion.',
        'The correction sharpens the edges of the waterbody and makes near-shore retrievals trustworthy, so the product works on the small and narrow waterbodies that matter operationally, not just open water far from any coast.',
      ],
    },
    {
      num: '11',
      kicker: 'What this enables',
      title: 'One inversion, several decisions',
      outcomes: [
        {
          label: 'Water utility',
          title: 'Source-water and intake protection',
          body:
            'A utility monitoring its supply reservoir gets early, physics-based bloom and constituent signals with uncertainty \u2014 enough to time sampling, adjust intake depth, or trigger treatment before a problem reaches the plant.',
        },
        {
          label: 'Public health agency',
          title: 'HAB surveillance at scale',
          body:
            'An agency watching many lakes gets phycocyanin-based bloom detection and extent across its whole jurisdiction on a consistent scale \u2014 a defensible basis for advisories and beach closures, not a patchwork of site visits.',
        },
        {
          label: 'Aquaculture operator',
          title: 'Stock-water condition',
          body:
            'An operator gets bloom risk plus non-optical context \u2014 dissolved oxygen and ammonia proxies \u2014 over leases and ponds, flagging conditions that threaten stock before they become a fish kill.',
        },
        {
          label: 'Environmental regulator',
          title: 'Catchment-scale evidence',
          body:
            'A regulator gets consistent, uncertainty-aware water-quality layers across rivers and estuaries \u2014 trend and exceedance evidence that complements a sparse in-situ network rather than depending on it.',
        },
      ],
    },
    {
      num: '12',
      kicker: 'What is operational',
      title: 'What ships today, and what is coming',
      paragraphs: [
        'The products in this paper represent the target output of the SWIPE stack. They are built on canonical aquatic radiative-transfer physics and a validated inverse emulator, and the framing is honest about what ships today versus what is still being built.',
      ],
      statusGroups: [
        {
          label: 'Operational today',
          body:
            'The full SWIPE inversion path \u2014 native atmospheric correction, sunglint, adjacency, and noise handling \u2014 plus optical constituents (Chl-a, phycocyanin, CDOM, TSM), HAB detection with carbon content, IOP and attenuation decomposition, MicroClim-fused non-optical proxies (DO, pH, ammonia), and per-pixel uncertainty. Sensor-agnostic, with Firefly VNIR as the primary tasked source. Deliverable now as monitoring outputs and APIs.',
        },
        {
          label: 'Being built now',
          body:
            'Productized monitoring subscription packaging with Aurora / Zenith dashboard access; anomaly and exceedance alerting against each waterbody baseline; benthic cover typing for optically shallow waters (algae / seagrass, sand, coral); and the NEXUS waterbody cube that turns each AOI into a persistent, queryable record rather than a one-off delivery.',
        },
        {
          label: 'Roadmap',
          body:
            'Phytoplankton functional type and species-level discrimination; expanded shallow-water and reef workflows; and full NEXUS integration \u2014 semantic query across a waterbody\u2019s constituent and bloom history, with intelligence that sharpens the longer SWIPE has watched a region.',
        },
      ],
    },
  ],
  footer: 'PIXXEL ANALYTICS · SWIPE · INTERNAL WHITE PAPER · WORKING DRAFT · WATER QUALITY CASE STUDY · NOT FOR DISTRIBUTION',
};

/** Figure slots — filenames under public/product-assets/water/. */
export const waterFigures = {
  fig01: {
    label: 'Figure 01',
    title: 'The radiative transfer problem in aquatic environments',
    src: 'rt_problem.png',
    platformNote: 'SCHEMATIC · The aquatic signal path',
    caption:
      'The signal reaching the sensor combines atmospheric scattering, surface sunglint, adjacency from neighbouring land, and a small water-leaving component carrying the constituent information. SWIPE decomposes this path rather than collapsing it into an index.',
  },
  fig02: {
    label: 'Figure 02',
    title: 'Aquatic particle modeling for synthetic data',
    src: 'particle_modeling.png',
    platformNote: 'FORWARD MODEL · Particle optics to spectra',
    caption:
      'Phytoplankton optical properties from a refractive-index-based coated-sphere model, mineral assemblages for non-algal particles, and CDOM \u2014 combined by Dirichlet sampling and propagated through radiative transfer to generate millions of physically valid synthetic spectra.',
  },
  fig03: {
    label: 'Figure 03',
    title: 'Inverse architecture — optically active constituents',
    src: 'architecture_optical.png',
    compact: true,
    platformNote: 'ARCHITECTURE · ResNet + MDN',
    caption:
      'A ResNet backbone encodes the observed spectrum; a Mixture Density Network head returns a posterior distribution over each optically active constituent (Chl-a, phycocyanin, CDOM, TSM) and the underlying IOPs \u2014 yielding a calibrated per-pixel uncertainty, not a point estimate.',
  },
  fig04: {
    label: 'Figure 04',
    title: 'Inverse architecture — non-optically active',
    src: 'architecture_nonoptical.png',
    compact: true,
    platformNote: 'ARCHITECTURE · Optical + climate fusion',
    caption:
      'A separate model fuses the optical retrievals with MicroClim climate forcing to estimate non-optically active variables \u2014 dissolved oxygen, pH, ammonia \u2014 as proxies with their own uncertainty. Kept architecturally distinct so the source of each number stays clear.',
  },
  fig05: {
    label: 'Figure 05',
    title: 'Model performance and uncertainty calibration',
    src: 'model_performance.png',
    compact: true,
    platformNote: 'VALIDATION · Unseen field & airborne data',
    caption:
      'Performance against independent datasets, including calibration of the uncertainty estimates. Uncertainty scales with error and stays calibrated out of distribution \u2014 removing the highest-uncertainty pixels sharply reduces error, the property that makes the product safe to operationalise.',
  },
  fig06: {
    label: 'Figure 06',
    title: 'Firefly estuary and river data',
    src: 'firefly_estuary.png',
    platformNote: 'OPERATIONAL · Firefly hyperspectral scenes',
    caption:
      'The full SWIPE path applied to Firefly acquisitions over estuary and river scenes: SWIPE-native atmospheric correction, sunglint and adjacency correction, and constituent retrieval resolving realistic water-quality gradients at hyperspectral detail.',
  },
  fig07: {
    label: 'Figure 07',
    title: 'Harmful algal bloom quantification and carbon content',
    src: 'hab_carbon.png',
    compact: true,
    platformNote: 'OPERATIONAL · Phycocyanin and bloom extent',
    caption:
      'Phycocyanin retrieval from its ~620 nm absorption isolates cyanobacteria-driven blooms, with bloom extent and phytoplankton carbon content where the spectrum supports it \u2014 a physics-based separation a broadband index cannot make.',
  },
  fig08: {
    label: 'Figure 08',
    title: 'Non-optically active constituents',
    src: 'non_optical_constituents.png',
    platformNote: 'OPERATIONAL · MicroClim-fused proxies',
    caption:
      'Dissolved oxygen, pH, and ammonia proxies mapped across the waterbody, derived from the optical retrievals fused with MicroClim climate forcing. Delivered with the optical stack and carried as model estimates with uncertainty, not direct measurements.',
  },
  fig09: {
    label: 'Figure 09',
    title: 'Attenuation modeling for HSI data in a delta',
    src: 'attenuation_delta.png',
    platformNote: 'OPERATIONAL · IOP decomposition',
    caption:
      'Inherent optical property decomposition in a sediment-rich delta \u2014 separating phytoplankton from non-algal-particle absorption and backscatter and reporting attenuation, distinguishing a biological signal from a mineral one rather than lumping all turbidity together.',
  },
  fig10: {
    label: 'Figure 10',
    title: 'Sunglint correction',
    src: 'sunglint_correction.png',
    platformNote: 'CORRECTION · Surface reflection removed',
    caption:
      'Sunglint can swamp the water-leaving signal. Because SWIPE characterised glint in the same physics it inverts, it corrects glinted pixels inside the retrieval rather than masking them out \u2014 recovering coverage in geometries index methods would discard.',
  },
  fig11: {
    label: 'Figure 11',
    title: 'Adjacency correction',
    src: 'adjacency_correction.png',
    platformNote: 'CORRECTION · Land contamination removed',
    caption:
      'Light scattered from bright adjacent land leaks into near-shore water pixels and biases retrievals. SWIPE models and removes the adjacency effect as part of the inversion, sharpening the waterbody edge and making small and narrow waterbodies trustworthy.',
  },
};

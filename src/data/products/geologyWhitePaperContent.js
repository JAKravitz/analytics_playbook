/**
 * SCOPE white-paper content — generic exploration-mineralogy narrative.
 * Figure slots map to assets in public/product-assets/geology/.
 */

export const geologyWhitePaper = {
  eyebrow: 'White paper · Geology · SCOPE',
  title: 'SCOPE: Spectral Characterization for Ore Prospectivity & Exploration',
  lede:
    'How hyperspectral physics becomes exploration-grade campaign deliverables \u2014 mineral classification, alteration halos, REE continuum-removal proxies, structural framework, fused prospectivity, and a pixel-level audit trail. From the limits of broadband indices to ranked, defensible surface targets across any exploration AOI.',
  headerBar:
    'Campaign product narrative. Reflects the SCOPE analytics stack on Firefly VNIR. Exploration grade by design \u2014 not assay or drill-ready output. NEXUS belt-scale cube persistence is a north-star capability, not part of SCOPE today.',
  illustrativeBanner:
    'ILLUSTRATIVE EXAMPLES \u00b7 Data and platform views are representative examples of SCOPE campaign outputs, not a live customer engagement. The same layer architecture applies across exploration AOIs, commodities, and terrains.',
  meta: [
    { label: 'Domain', value: 'Mineral exploration', sub: 'Prospecting \u00b7 REE / critical minerals' },
    { label: 'Method', value: 'SAM + MTNF + fusion', sub: 'Continuum removal \u00b7 MNF structure' },
    { label: 'Sensor', value: 'Firefly VNIR', sub: '470\u2013900 nm \u00b7 exploration grade' },
    { label: 'Delivery', value: 'Campaign layers', sub: 'Raster, vector, report, API' },
  ],
  sections: [
    {
      num: '00',
      kicker: 'The exploration problem',
      title: 'Why broadband screening is not enough',
      paragraphs: [
        'Exploration teams need to narrow large, under-mapped AOIs to ranked follow-up zones before committing field mapping, geophysics, or drilling. Conventional satellite screening leans on broadband band ratios. They flag broad iron staining and gross alteration, but they collapse dozens of narrow diagnostic absorption features into a handful of indices \u2014 and they cannot separate one iron oxide from another, let alone isolate rare-earth or pathfinder absorptions that matter for critical-mineral systems.',
        'The questions that actually drive a campaign are more specific. What minerals are exposed at the surface? Where do alteration halos concentrate? Is there a spectral proxy worth sampling? Does structure frame the anomaly? A single alteration index cannot answer any of these on its own.',
        'SCOPE treats the full VNIR spectral curve as the signal. SAM and MTNF unmix each pixel against a managed reference library, continuum removal isolates configured absorption features, MNF-derived structure adds lithological and lineament context, and fusion turns the evidence stack into ranked target polygons \u2014 each with an auditable spectral basis, not a black-box heat map.',
      ],
    },
    {
      num: '01',
      kicker: 'Surface mineralogy',
      title: 'What is exposed at the pixel',
      figure: 'fig01',
      paragraphs: [
        'Every campaign starts by establishing surface mineralogy. Each valid pixel is classified against the spectral reference library using SAM angle and MTNF abundance, assigning it to diagnostic classes \u2014 iron oxides such as goethite, hematite, and jarosite \u2014 to unclassified ground, or to mask where cloud, shadow, or vegetation invalidate the reading.',
        'These classes are not interchangeable. Their relative abundance and oxidation state track different weathering and alteration regimes and form the first vector toward a buried mineral system. Broadband sensors cannot make this separation; the diagnostic absorptions between 500 and 900 nm require the narrow, contiguous bands Firefly resolves. The classification map is the foundation every later layer attaches to.',
      ],
    },
    {
      num: '02',
      kicker: 'Alteration halos',
      title: 'Pathfinders from iron-oxide assemblages',
      figure: 'fig02',
      paragraphs: [
        'Individual mineral classes become more powerful when read together. The iron-oxide composite blends relative goethite, hematite, and jarosite abundance into a single alteration view over terrain \u2014 a hydrothermal and weathering pathfinder that concentrates attention on intrusive centers, oxidation fronts, and weathering profiles worth interrogating further.',
        'Read as a pathfinder layer, alteration mapping narrows a campaign AOI from broad exposure to the zones where surface chemistry already signals hydrothermal or supergene overprint. It does not prove ore; it prioritizes where the rest of the stack should be read most carefully.',
      ],
    },
    {
      num: '03',
      kicker: 'REE band depth',
      title: 'Continuum-removal proxies for critical minerals',
      figure: 'fig03',
      paragraphs: [
        'Several rare-earth and pathfinder elements have absorption features that survive into the VNIR range. SCOPE isolates configured features with continuum removal \u2014 flattening the spectrum\u2019s background slope so absorption depth can be measured and compared on a fixed scale across the whole campaign.',
        'Band depth is a relative proxy for the presence of a configured absorption, not a concentration, grade, or assay. It tells an exploration team where a spectral signal lifts above background and merits ground follow-up \u2014 nothing more, and we label outputs exactly that way. SWIR-grade separation of sulfates, phyllosilicates, and sharper REE features waits for Honeybee (2027+).',
      ],
    },
    {
      num: '04',
      kicker: 'Structural context',
      title: 'Lithology and lineaments from the spectrum',
      figure: 'fig04',
      paragraphs: [
        'Mineral systems are not randomly placed; structure controls them. From MNF-transformed data SCOPE derives structural views: edge magnitude as a continuous measure of spectral discontinuity, a lineament framework that maps the strongest edges as interpretable structures, and an MNF RGB composite for broad lithological contrast.',
        'Overlaying structure on alteration and proxy evidence turns isolated surface stains into geologically framed anomalies \u2014 targets that sit on major discontinuities or intersections are a different class of hypothesis than pixels with no structural context.',
      ],
    },
    {
      num: '05',
      kicker: 'Geobotanical signal',
      title: 'A low-weight contextual cross-check',
      figure: 'fig05',
      paragraphs: [
        'Where vegetation cover exists, it can carry a faint surface geochemical signature. SCOPE computes a multivariate vegetation-stress anomaly from VNIR indices on vegetated pixels only, expressed as a departure from typical vegetation in the scene.',
        'This is deliberately a low-weight, contextual input \u2014 a cross-check, not a primary line of evidence. In arid or bare terrains it rarely drives a target on its own, but where it coincides with alteration and a configured proxy feature it can add confidence that something at the surface is spectrally distinct.',
      ],
    },
    {
      num: '06',
      kicker: 'Prospectivity fusion',
      title: 'Ranked targets from weighted evidence',
      figure: 'fig06',
      paragraphs: [
        'The fusion layer integrates alteration, REE or pathfinder band depth, structural framework, and the optional geobotanical signal into a continuous 0\u20131 prospectivity surface with analyst-set weights per evidence layer. From that surface SCOPE derives ranked target polygons \u2014 discrete zones ordered by score, suitable for field follow-up.',
        'Each polygon carries a score breakdown by evidence layer, so a geologist can see whether a target is driven by strong alteration, a clean proxy feature, structural position, or the most compelling case: several lines of evidence at once. That is the difference between a heat map and a campaign deliverable a team can defend.',
      ],
    },
    {
      num: '07',
      kicker: 'Pixel inspector',
      title: 'An audit trail to the spectrum',
      figure: 'fig07',
      paragraphs: [
        'A target is only as good as the evidence behind it. The pixel inspector unifies every layer for any point: mineral classification, SAM and MTMF scores, continuum-removal depths, prospectivity value, target membership, and the per-layer contribution to the fused score.',
        'This is what makes SCOPE exploration grade. When a geologist asks why a zone ranked highly, the answer is not a black box \u2014 it is a spectrum, a set of scores, and a documented contribution from each line of evidence. That auditability is what lets a team stand behind where it sends the first field crews.',
      ],
    },
    {
      num: '08',
      kicker: 'What this enables',
      title: 'One retrieval stack, several exploration workflows',
      outcomes: [
        {
          label: 'Junior explorer',
          title: 'Target generation on a budget',
          body:
            'A junior with a large land package and a small field team gets a ranked target list with spectral justification \u2014 concentrating mapping and sampling on the zones most likely to convert, not the whole tenure.',
        },
        {
          label: 'State geological survey',
          title: 'Systematic regional assessment',
          body:
            'A survey gets consistent, comparable mineralogy and prospectivity across a region on one fixed scale \u2014 a reproducible basis for prioritizing public exploration acreage or legacy data gaps.',
        },
        {
          label: 'JV technical partner',
          title: 'Defensible deal screening',
          body:
            'A major evaluating a joint venture gets an auditable evidence package per target \u2014 score breakdowns and spectra \u2014 to screen an opportunity before committing technical and drilling capital.',
        },
        {
          label: 'Critical-minerals program',
          title: 'Belt-scale reconnaissance',
          body:
            'A program office gets a campaign-scale, ranked view of where surface spectral evidence concentrates \u2014 a prioritization layer for national or strategic reconnaissance, not a resource estimate.',
        },
      ],
    },
    {
      num: '09',
      kicker: 'What is operational',
      title: 'What ships today, and what is coming',
      paragraphs: [
        'The layers in this paper represent the SCOPE campaign product. They are built on canonical remote-sensing physics \u2014 SAM, MTNF, continuum removal, and MNF \u2014 and the framing is honest about what ships as SCOPE today versus what lives on the north-star path.',
      ],
      statusGroups: [
        {
          label: 'Operational today',
          body:
            'Firefly VNIR acquisition, atmospheric correction, and surface-validity masking. SAM + MTNF mineral classification, iron-oxide alteration mapping, REE / pathfinder continuum-removal band depth, MNF structural products, geobotanical anomaly (contextual), prospectivity fusion, ranked targets, and the pixel inspector \u2014 deliverable now as analyst-produced campaign outputs (raster, vector, report) with a spectral evidence trail.',
        },
        {
          label: 'Being built now',
          body:
            'Productized campaign packaging with standardized delivery scope and Aurora workspace access; customer-facing archive similarity search where bundled; and expanded API documentation for integrators.',
        },
        {
          label: 'North star (not SCOPE today)',
          body:
            'NEXUS belt-scale cube persistence and semantic search over campaign archives. SWIR-diagnostic mineralogy on Honeybee (2027+) \u2014 sulfates, phyllosilicates, carbonates, and materially sharper REE separation via 2100\u20132300 nm features. These capabilities inform the roadmap but are not sold as part of SCOPE today.',
        },
      ],
    },
  ],
  footer: 'PIXXEL ANALYTICS · SCOPE · INTERNAL WHITE PAPER · WORKING DRAFT · NOT FOR DISTRIBUTION',
};

export const geologyFigures = {
  fig01: {
    label: 'Figure 01',
    title: 'Mineral classification',
    src: 'classification.png',
    platformNote: 'ILLUSTRATIVE PLATFORM VIEW · Same layer delivered across exploration AOIs',
    caption:
      'Every valid pixel is assigned to an iron-oxide class (goethite, hematite, jarosite), to unclassified ground, or to mask, using SAM angle and MTNF abundance against the spectral reference library. Per-class controls, pixel counts, and an optional underlay. This classification is the foundation every later layer attaches to.',
  },
  fig02: {
    label: 'Figure 02',
    title: 'Iron-oxide alteration composite',
    src: 'alteration.png',
    compact: true,
    platformNote: 'ILLUSTRATIVE PLATFORM VIEW · Iron-oxide RGB composite over terrain',
    caption:
      'A multi-mineral alteration view: channel colors represent relative iron-oxide abundance and mixture over terrain. Read as a hydrothermal pathfinder, the composite concentrates attention on zones where weathering and alteration overprint the surface.',
  },
  fig03: {
    label: 'Figure 03',
    title: 'REE / pathfinder band depth',
    src: 'ree_band_depth.png',
    platformNote: 'ILLUSTRATIVE PLATFORM VIEW · Continuum-removal spectral indices',
    caption:
      'Continuum-removed absorption strength at a configured feature (e.g. neodymium-led proxy near ~1200 nm), on a fixed color scale for cross-scene comparison. Band depth is a relative prioritization signal for sampling \u2014 explicitly not a concentration or grade.',
  },
  fig04: {
    label: 'Figure 04',
    title: 'Structural framework',
    src: 'structural.png',
    compact: true,
    platformNote: 'ILLUSTRATIVE PLATFORM VIEW · MNF-derived structure',
    caption:
      'Structural and lithological context in three related views: edge magnitude from MNF-transformed data, a lineament framework on a terrain base, and an MNF RGB composite for broad material contrast. Structure frames where surface anomalies may be geologically meaningful.',
  },
  fig05: {
    label: 'Figure 05',
    title: 'Geobotanical stress anomaly',
    src: 'geobotanical.png',
    platformNote: 'ILLUSTRATIVE PLATFORM VIEW · Vegetated pixels only',
    caption:
      'A multivariate vegetation-stress anomaly from VNIR indices on vegetated pixels only. A deliberately low-weight contextual cross-check \u2014 useful where it coincides with alteration and a proxy feature, but rarely a primary line of evidence on its own.',
  },
  fig06: {
    label: 'Figure 06',
    title: 'Prospectivity fusion and ranked targets',
    src: 'prospectivity.png',
    platformNote: 'ILLUSTRATIVE PLATFORM VIEW · Fused score with ranked target overlay',
    caption:
      'Integrated 0\u20131 prospectivity surface combining alteration, proxy band depth, structure, and optional geobotanical evidence, with per-layer fusion weights. Ranked target polygons are derived from the score \u2014 discrete, ordered zones for field follow-up, each with a score breakdown by evidence layer.',
  },
  fig07: {
    label: 'Figure 07',
    title: 'Pixel inspector',
    src: 'pixel_inspector.png',
    platformNote: 'ILLUSTRATIVE PLATFORM VIEW · Point-level audit trail',
    caption:
      'Point query across every layer: classification, spectral scores, band depths, prospectivity value, target membership, and fusion contribution breakdown. The answer to \u201cwhy did this rank highly?\u201d is a spectrum and a set of scores \u2014 not a black box.',
  },
};

/**
 * Shared layer spec copy — used by the in-app Product Specification view,
 * and by scripts/generate-layer-docs.mjs for Markdown export.
 */

export const LAYER_SPEC_DOC_VERSION = 'Playbook v0.1 · May 2026';

export function hasLayerKeyword(layer, ...words) {
  const n = `${layer.name} ${layer.notes || ''}`.toLowerCase();
  return words.some((w) => n.includes(w.toLowerCase()));
}

export function tierLine(layer) {
  if (layer.tier === 'FF') return 'Pixxel **Firefly** hyperspectral (VNIR) tasking and processing path.';
  if (layer.tier === 'Open') return '**Open** / public datasets as the primary imagery source where applicable.';
  if (layer.tier === 'Both') return '**Firefly and/or open datasets**, depending on product configuration.';
  return 'Data source per delivery configuration.';
}

export function gradeLine(layer) {
  if (layer.grade === 'inventory')
    return '**Inventory grade** in the playbook sense: suitable as a repeatable catalog deliverable where validation and QA paths are defined for supported domains.';
  return '**Exploration grade**: useful for pilots and analysis; scoping, regional validation, or method hardening may still be in flight. Treat outputs as decision-support unless a specific validation memo applies.';
}

function statusDisplay(status) {
  if (status === 'aurora') return 'Aurora';
  if (status === 'piloting') return 'Piloting';
  if (status === 'r&d') return 'R&D';
  if (status === 'shipping') return 'Aurora';
  return status;
}

export function statusLine(layer) {
  return `Catalog status: **${statusDisplay(layer.status)}**. Readiness note: **${layer.ready || 'TBD'}**.`;
}

export function purpose(layer) {
  const l = layer;
  if (hasLayerKeyword(l, 'l2a', 'atmospheric correction'))
    return 'Provide atmospherically corrected surface reflectance so downstream biophysical and thematic products are comparable across dates and sites.';
  if (hasLayerKeyword(l, 'cloud', 'shadow', 'mask'))
    return 'Identify clouds, cloud shadow, and related obscuration so analytics exclude or flag low-quality pixels.';
  if (hasLayerKeyword(l, 'co-registration', 'lineage'))
    return 'Document geometric alignment and processing lineage across captures and derived layers for audit and reproducibility.';
  if (hasLayerKeyword(l, 'microclim'))
    return 'Add field-local meteorological context (e.g. drivers of water stress) to interpret canopy signals and risk.';
  if (hasLayerKeyword(l, 'semantic', 'dino', 'sam'))
    return 'Enable object- or patch-centric search and retrieval over large image archives using learned visual representations.';
  if (hasLayerKeyword(l, 'embedding', 'similarity search', 'cross-archive'))
    return 'Support similarity-based retrieval: find analogous sites, objects, or patterns across time and collections.';
  if (hasLayerKeyword(l, 'facility footprint', 'infrastructure classification'))
    return 'Delineate built structures and facility extent from imagery for monitoring and baseline workflows.';
  if (hasLayerKeyword(l, 'runway', 'apron', 'taxiway'))
    return 'Characterize airfield surfaces and layout for condition assessment and change monitoring (human-reviewed operational use).';
  if (hasLayerKeyword(l, 'denied-area', 'activity signature'))
    return 'Support pattern-of-life and change monitoring in monitoring workflows; outputs are analytic cues, not autonomous judgments.';
  if (hasLayerKeyword(l, 'terrain', 'trafficability', 'tankability', 'bearing capacity', 'mobility'))
    return 'Provide terrain and soil-state proxies relevant to mobility planning; complement — not replace — engineering soils work and ground truth.';
  if (hasLayerKeyword(l, 'material characterization', 'defense hsi'))
    return 'Where HSI signal supports it, summarize surface material cues relevant to characterization workflows; interpretation requires expert review.';
  if (hasLayerKeyword(l, 'carbon stock', 'mrv', 'monte carlo', 'carbon change'))
    return 'Support exploration-grade carbon monitoring narratives and uncertainty framing; not credit issuance unless separately qualified.';
  if (hasLayerKeyword(l, 'deforestation', 'structural loss', 'degradation', 'burn scar', 'fire severity', 'bfast'))
    return 'Detect or characterize forest disturbance, loss, or fire effects for forestry and land monitoring.';
  if (
    hasLayerKeyword(
      l,
      'water quality',
      'hydrolight',
      'chlorophyll-a',
      'phycocyanin',
      'cdom',
      'tsm',
      'turbidity',
      'secchi',
      'iop',
      'rrs',
      'benthic',
      'seagrass',
      'coastal',
      'wetland',
      'hab',
      'bloom'
    )
  )
    return 'Quantify or classify aquatic optical properties, water quality proxies, or related coastal/wetland signals where the optical model applies.';
  if (
    hasLayerKeyword(
      l,
      'geology',
      'oxide',
      'gossan',
      'alteration',
      'mineralogy',
      'ree',
      'carbonatite',
      'tailings',
      'evaporation pond',
      'pit wall',
      'rehabilitation',
      'acid mine'
    )
  )
    return 'Map surface spectral alteration, mineral proxies, or mine-site change relevant to exploration and lifecycle monitoring — not a substitute for field geology or drilling decisions alone.';
  if (hasLayerKeyword(l, 'farm boundary', 'crop type'))
    return 'Delineate fields or classify crop categories to support agricultural analytics at operational scales.';
  if (hasLayerKeyword(l, 'portfolio', 'field-level risk', 'spatial correlation'))
    return 'Aggregate or normalize signals across many fields for portfolio, finance, or insurance-style views.';
  if (hasLayerKeyword(l, 'cause-of-loss', 'evidence pack', 'vertical score', 'alert trigger'))
    return 'Package ranked evidence, scores, or configurable alerts for vertical-specific decision support.';
  if (hasLayerKeyword(l, 'anomaly', 'hypotheses', 'attribution'))
    return 'Surface anomalies or ranked explanatory hypotheses from spectral and contextual data; not ground-truth cause without corroboration.';
  if (hasLayerKeyword(l, 'forecast', 'stress risk'))
    return 'Provide forward-looking or risk-oriented estimates with explicit time horizon; validate horizon and domain before operational reliance.';
  if (hasLayerKeyword(l, 'event', 'persistence', 'lifecycle', 'flood', 'waterlogging'))
    return 'Identify or track events and their persistence over time for alerting and post-event analysis.';
  if (l.engine === 'Trait & Structure')
    return 'Estimate canopy or surface structural/biophysical quantities or thematic classes from reflectance and fusion inputs.';
  if (l.engine === 'Context')
    return 'Establish baselines, seasonal state, or field-relative context so deviations are interpretable.';
  if (l.engine === 'Data') return 'Foundational processing or context layers consumed by multiple downstream products.';
  if (l.engine === 'Prediction')
    return 'Produce estimates that extend beyond the observed present state into a defined forecast or risk window.';
  if (l.engine === 'Scoring') return 'Combine multiple signals into a scalar or low-dimensional score for triage or ranking.';
  if (l.engine === 'SSE') return 'Archive-centric search, segmentation, or embedding workflows over imagery collections.';
  return 'Deliver the named geospatial analytic layer as part of the Pixxel processing catalog, subject to tier and grade constraints.';
}

export function definition(layer) {
  const l = layer;
  if (hasLayerKeyword(l, 'ndvi', 'evi', 'ndre'))
    return 'Per-pixel vegetation indices derived from surface reflectance. Indices are **supporting diagnostics**; product interpretation usually combines them with biophysical inversions or classifiers.';
  if (hasLayerKeyword(l, 'lai'))
    return 'Leaf Area Index (LAI) as a canopy structural variable, typically from a radiative transfer or hybrid inversion with uncertainty where configured.';
  if (hasLayerKeyword(l, 'chlorophyll', 'cab') && !hasLayerKeyword(l, 'water'))
    return 'Canopy chlorophyll content (e.g. Cab) or related pigment proxy from canopy reflectance, with propagated uncertainty when available.';
  if (hasLayerKeyword(l, 'nitrogen', 'phosphorus', 'potassium', 'n-p-k'))
    return 'Leaf or canopy nutrient status indicator from HSI-resolved spectral features; crop and growth-stage calibration affects interpretation.';
  if (hasLayerKeyword(l, 'water column', 'chlorophyll-a', 'phycocyanin'))
    return 'Water-column constituent estimate from aquatic optical inversion (e.g. HydroLight-based chain) at the supported spatial scale.';
  if (hasLayerKeyword(l, 'carbon'))
    return 'Carbon-relevant structural or stock proxy; semantics depend on packaging (exploration vs inventory) and sensor tier.';
  return `Raster (or agreed vector) layer representing **${layer.name}**. Exact units, classes, and dynamic range are specified in the delivery metadata for each order.`;
}

export function inputs(layer) {
  const l = layer;
  const parts = [
    tierLine(l),
    'Atmospherically corrected reflectance where applicable.',
    'Quality masks (cloud/shadow) recommended for interpretation.',
  ];
  if (hasLayerKeyword(l, 'gedi', 'dem', 'fused'))
    parts.push('May fuse ancillary elevation or LiDAR statistics where noted in the layer notes.');
  if (hasLayerKeyword(l, 'microclim', 'weather'))
    parts.push('Meteorological or derived MicroClim features when the layer is documented as climate-conditioned.');
  if (hasLayerKeyword(l, 'hydrolight', 'aquatic', 'water column'))
    parts.push('Aquatic inversion priors and water-type assumptions; validate for inland vs coastal vs optically complex waters.');
  if (hasLayerKeyword(l, 'field baseline', 'farm'))
    parts.push('Field or AOI baseline definition and management zone context where applicable.');
  return parts.join(' ');
}

export function methodSummary(layer) {
  const l = layer;
  if (hasLayerKeyword(l, 'hydrolight', 'iop', 'rrs', 'secchi', 'tsm', 'cdom'))
    return 'Aquatic radiative transfer and inversion stack (HydroLight-family) mapping water-leaving reflectance to IOPs and derived quantities.';
  if (hasLayerKeyword(l, 'prosail', 'lai', 'cab', 'chlorophyll') && l.engine === 'Trait & Structure')
    return 'Canopy radiative transfer inversion (e.g. PROSAIL-class) or equivalent hybrid retrievals from multispectral/hyperspectral reflectance.';
  if (hasLayerKeyword(l, 'bfast', 'trend'))
    return 'Time-series breakpoint or trend analysis on spectral or index trajectories.';
  if (hasLayerKeyword(l, 'firms'))
    return 'Fusion of satellite change signals with active-fire corroboration where available.';
  if (hasLayerKeyword(l, 'semantic', 'dino', 'sam', 'embedding'))
    return 'Deep visual encodings and/or segmentation-assisted patch extraction; similarity is in embedding space with domain-specific calibration.';
  if (hasLayerKeyword(l, 'monte carlo'))
    return 'Uncertainty propagation via ensemble or Monte Carlo sampling over retrieval or model parameters (exploration-grade framing).';
  if (hasLayerKeyword(l, 'anomaly', 'hypotheses'))
    return 'Statistical or model-based deviation from baseline with optional ranked hypotheses from spectral library or expert rules.';
  if (l.engine === 'Geology')
    return 'VNIR/SWIR spectral feature analysis and classification for alteration and mineral proxies; SWIR-dependent layers note Honeybee path.';
  if (l.engine === 'Event')
    return 'Multi-temporal comparison, change magnitude/direction, and persistence filtering as specified for the layer.';
  return 'Pipeline-specific retrieval or classifier consistent with the layer’s engine and tier; detailed algorithm version is tracked per release.';
}

export function outputs(layer) {
  return `Primary deliverable: **${layer.name}** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.`;
}

export function validation(layer) {
  if (layer.grade === 'inventory')
    return 'Validation approach is documented per supported vertical and region; request the validation memo for a specific AOI and season before quoting point accuracy.';
  return 'Pilot and R&D status: expect **explicit pilot validation** before using outputs for high-stakes decisions. Regional and domain transfer may be limited.';
}

export function limitationsList(layer) {
  const l = layer;
  const out = [];
  if (l.tier === 'Open' && hasLayerKeyword(l, 'nutrient', 'pigment', 'lignin', 'cellulose', 'nitrogen'))
    out.push('Some biochemical signals need Firefly-class spectral resolution; interpret alongside data source tier and grade.');
  if (hasLayerKeyword(l, 'honeybee', 'swir', '2027'))
    out.push('SWIR-dependent capability may require future sensor or tasking class (e.g. Honeybee) for full intent.');
  if (hasLayerKeyword(l, 'non-optical'))
    out.push('Non-optical extended quantities rely on auxiliary models; field validation is critical.');
  if (hasLayerKeyword(l, 'scaffold', 'tbd'))
    out.push('Scaffolding layer: scope and method finalized per engagement — do not assume default validation.');
  if (hasLayerKeyword(l, 'mrv', 'credit'))
    out.push('Not MRV/credit issuance grade unless separately contracted and validated.');
  if (l.engine === 'Defense' || hasLayerKeyword(l, 'defense', 'denied', 'runway'))
    out.push('Operational and compliance use requires human review and organizational approval; outputs are analytic inputs.');
  if (out.length === 0)
    out.push(
      'Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.'
    );
  return out;
}

export function limitationsMarkdown(layer) {
  return limitationsList(layer)
    .map((s) => `- ${s}`)
    .join('\n');
}

/** Structured model for the in-app Product Specification layout. */
export function buildLayerSpecModel(layer) {
  const notes = layer.notes ? layer.notes.trim() : '';
  return {
    cover: {
      kicker: 'PIXXEL ANALYTICS LAYER',
      title: 'PRODUCT SPECIFICATION',
      productName: layer.name,
      productId: layer.id,
      inquiries: 'For any inquiries, please write to support@pixxel.space.',
      copyright: '© Pixxel Space Technologies, Inc. All Rights Reserved',
      version: LAYER_SPEC_DOC_VERSION,
    },
    toc: [
      { num: '1', label: 'Layer overview' },
      { num: '2', label: 'Catalog parameters' },
      { num: '3', label: 'Product processing' },
      { num: '4', label: 'Deliverables & metadata' },
      { num: '5', label: 'Quality, validation & limitations' },
      { num: '6', label: 'Commercial reference' },
    ],
    parametersTable: {
      headers: ['Parameter', 'Specification'],
      rows: [
        ['Layer ID', layer.id],
        ['Layer name', layer.name],
        ['Processing engine', layer.engine],
        ['Data source', layer.tier],
        ['Product grade', layer.grade],
        ['Delivery status', layer.status],
        ['Readiness target', layer.ready || 'TBD'],
        ['Catalog notes', notes || '—'],
      ],
    },
    sections: [
      {
        number: '1',
        title: 'LAYER OVERVIEW',
        subsections: [
          {
            number: '1.1',
            title: 'Purpose and scope',
            paragraphs: [
              purpose(layer),
              ...(notes ? [`Catalog notes: ${notes}`] : []),
              gradeLine(layer),
              statusLine(layer),
            ],
          },
          {
            number: '1.2',
            title: 'Definition',
            paragraphs: [definition(layer)],
          },
          {
            number: '1.3',
            title: 'Relationship to imagery products',
            paragraphs: [
              'This specification describes an **analytics layer** derived from Pixxel imagery and platform processing. It is distinct from raw image product levels (L1A–L2A) described in the corporate **Product Specification** document; those levels define radiometric and geometric image corrections. This layer builds on atmospherically corrected surface reflectance and/or fused inputs as described in Sections 3–4.',
            ],
          },
        ],
      },
      {
        number: '2',
        title: 'CATALOG PARAMETERS',
        subsections: [
          {
            number: '2.1',
            title: 'Summary',
            paragraphs: [
              'Catalog parameters are listed in the **summary table** (under Table of contents). Values mirror the Layer Catalog row in the Analytics Playbook. Customer-specific statements of work may supersede playbook defaults.',
            ],
          },
        ],
      },
      {
        number: '3',
        title: 'PRODUCT PROCESSING',
        subsections: [
          {
            number: '3.1',
            title: 'Inputs and dependencies',
            paragraphs: [inputs(layer)],
          },
          {
            number: '3.2',
            title: 'Processing approach',
            paragraphs: [methodSummary(layer)],
          },
        ],
      },
      {
        number: '4',
        title: 'DELIVERABLES & METADATA',
        subsections: [
          {
            number: '4.1',
            title: 'Primary outputs',
            paragraphs: [outputs(layer)],
          },
          {
            number: '4.2',
            title: 'Delivery package',
            paragraphs: [
              'Deliverables follow the **standard customer delivery specification** for the order (GeoTIFF / COG, STAC metadata, and naming conventions aligned with Pixxel processing). Exact band count, auxiliary masks, and sidecar statistics are specified in the order metadata.',
            ],
          },
        ],
      },
      {
        number: '5',
        title: 'QUALITY, VALIDATION & LIMITATIONS',
        subsections: [
          {
            number: '5.1',
            title: 'Validation and performance',
            paragraphs: [validation(layer)],
          },
          {
            number: '5.2',
            title: 'Limitations and failure modes',
            bullets: limitationsList(layer),
          },
        ],
      },
      {
        number: '6',
        title: 'COMMERCIAL REFERENCE',
        subsections: [
          {
            number: '6.1',
            title: 'Indicative list pricing',
            paragraphs: [
              `Playbook **base list rate**: USD **$${layer.baseUsdPerKm2 ?? 0}** per km² (working commercial placeholder until finance standardizes). Final pricing is subject to contract, AOI, SLA, and bundle terms.`,
            ],
          },
        ],
      },
    ],
    glossary: [
      {
        term: 'AOI',
        definition: 'Area of Interest — a defined Earth surface region for targeted data collection and analytics.',
      },
      {
        term: 'FF / Open / Both',
        definition:
          'FF: Pixxel Firefly hyperspectral path. Open: public or licensed open datasets. Both: delivery may combine Firefly tasking and open imagery.',
      },
      {
        term: 'BOA',
        definition: 'Bottom of atmosphere — surface reflectance after atmospheric correction (see corporate product spec for L2A).',
      },
      {
        term: 'STAC',
        definition: 'SpatioTemporal Asset Catalog — metadata convention for discovering and indexing geospatial assets.',
      },
    ],
  };
}

/** Markdown file body for docs/layers export. */
export function buildLayerSpecMarkdown(layer) {
  const notes = layer.notes ? `\n\n**Catalog notes:** ${layer.notes}` : '';
  return `# ${layer.name} (\`${layer.id}\`)

## Document control
- **Layer ID:** ${layer.id}
- **Engine:** ${layer.engine}
- **Data source:** ${layer.tier}
- **Grade:** ${layer.grade}
- **Status:** ${layer.status} · **Readiness:** ${layer.ready || 'TBD'}
- **Doc:** ${LAYER_SPEC_DOC_VERSION} — replace with owner-reviewed version as methods mature.

## Purpose and scope
${purpose(layer)}${notes}

${gradeLine(layer)}

${statusLine(layer)}

## Definition
${definition(layer)}

## Inputs and dependencies
${inputs(layer)}

## Method summary
${methodSummary(layer)}

## Outputs and deliverables
${outputs(layer)}

## Validation and performance
${validation(layer)}

## Limitations and failure modes
${limitationsMarkdown(layer)}

## Operational notes
Indicative list rate in catalog: **$${layer.baseUsdPerKm2 ?? 0}/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See Layer Catalog in the playbook app for package associations and editable checklist wiring.
`;
}

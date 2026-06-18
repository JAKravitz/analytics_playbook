import { useMemo, useState } from 'react';
import {
  Download,
  RotateCw,
  FileText,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
  LevelFormat,
  PageOrientation,
  Footer,
  PageNumber,
  ImageRun,
  Tab,
  TabStopType,
  TabStopPosition,
} from 'docx';
import Callout from '../components/Callout.jsx';
import {
  DOLE_DOC_FONT,
  DOLE_FOOTER_LABEL,
  DOLE_CONTACT_POINTS,
  getExhibitATermsBlocks,
} from '../data/proposalDoleTemplate.js';
import {
  MONITORING_SCOPE,
  GEOLOGY_SCOPE,
} from '../data/proposalScope.js';
import {
  getScaledIaasPricing,
  getScaledAuroraPricing,
  getAoiBandOptions,
  pricingMultipliers,
  sensorMultiplier,
  SENSOR_TIER_OPTIONS,
  EARLY_ADOPTER_OPTIONS,
  computeProposalFeeMultiplier,
  quoteSelectedAoiBand,
  formatProposalUsd,
  scaleFeeString,
} from '../data/pilotProposalPricing.js';

/* ─── Product pilots (v3) ─────────────────────────────────────────────────── */

const PILOT_PRODUCTS = [
  { key: 'Agriculture', label: 'TRACE · Agriculture', short: 'TRACE' },
  { key: 'Water', label: 'SWIPE · Water', short: 'SWIPE' },
  { key: 'Geology', label: 'SCOPE · Geology', short: 'SCOPE' },
];

function pilotProductLabel(key) {
  return PILOT_PRODUCTS.find((p) => p.key === key)?.label ?? key;
}

function pilotProductShort(key) {
  return PILOT_PRODUCTS.find((p) => p.key === key)?.short ?? key;
}

const MONITORING_VERTICALS = new Set(['Agriculture', 'Water']);

const REGIONAL_MULTIPLIERS = [
  { id: 't1', label: 'Tier 1, High Income (1.0×)', value: 1.0 },
  { id: 't2', label: 'Tier 2, Upper-Middle Income (0.75×)', value: 0.75 },
  { id: 't3', label: 'Tier 3, Lower-Middle / Low Income (0.50×)', value: 0.5 },
  { id: 'ngo', label: 'NGO / Multilateral (0.60×)', value: 0.6 },
];

/* ─── Vertical framing (drives executive summary prose) ───────────────────── */

const VERTICAL_FRAMING = {
  Agriculture: {
    product: 'TRACE',
    problem:
      'visibility into crop physiology, health, and stress drivers that broadband multispectral indices alone cannot resolve',
    why:
      "TRACE is Pixxel's agriculture API-layer product: Firefly delivers 400-band VNIR hyperspectral imagery at 5 m resolution for PROSAIL trait retrieval and narrowband indices beyond MSI proxies. Pilots are offered as separate MSI Analytics or Hyperspectral engagements.",
    method:
      'PROSAIL canopy radiative-transfer inversion and spectral health indices benchmarked against the multispectral historical baseline',
  },
  Water: {
    product: 'SWIPE',
    problem:
      'water-body classification and quantitative water-quality monitoring with the specificity needed to distinguish bloom types, constituent drivers, and dynamics not visible to broadband sensors',
    why:
      "SWIPE applies HydroLight inversion physics through a validated emulator: Firefly HSI enables phycocyanin retrieval, full IOP decomposition, and constituent retrievals. MSI Analytics pilots deliver archive-based monitoring without Firefly tasking. These are separate pilot products.",
    method:
      'HydroLight IOP retrieval, HSI-derived water-quality variables, and MSI time-series benchmarking',
  },
  Geology: {
    product: 'SCOPE',
    problem:
      'spatially-resolved mineralogical mapping for exploration targeting and alteration-halo characterisation where field mapping alone is slow and incomplete',
    why:
      "SCOPE is Pixxel's geology campaign product: Firefly's 400-band VNIR signature supports SAM and MTNF mineral classification, iron-oxide and hydrothermal alteration detection, and continuum-removal analysis for REE proxies across the target AOI",
    method:
      'NDVI vegetation masking, SAM + MTNF classification, and continuum-removal analysis for alteration mapping',
  },
};

/* ─── About Pixxel (§2 boilerplate) ──────────────────────────────────────── */

const ABOUT_PIXXEL =
  "Pixxel Space Technologies is a US and India-based space technology company building a commercial hyperspectral Earth observation constellation. Pixxel's Firefly satellites produce 400-band hyperspectral imagery at 5 m spatial resolution across the VNIR range. The analytics team combines radiative transfer inversion, spectral unmixing, and machine learning to produce geospatial evidence through product lines including TRACE (agriculture), SWIPE (water), SCOPE (geology), and LENS (semantic search), with NEXUS as the north-star intelligence architecture.";

const ABOUT_PIXXEL_SPECS = [
  '5 m spatial resolution on operational Firefly constellation',
  '400-band VNIR hyperspectral imagery (continuous spectral sampling)',
  'VNIR operational today; VNIR-SWIR expansion via Honeybee',
  'Constellation path toward daily global revisit',
];

const ABOUT_MSI_HSI_FIGURE = {
  src: '/proposal-assets/msi-hsi.png',
  type: 'png',
  caption:
    'Multispectral vs hyperspectral imaging. Discrete broad bands support land-cover classification; continuous narrow bands support material identification.',
};

const ROADMAP_FIGURE = {
  src: '/proposal-assets/sensor-roadmap.png',
  type: 'png',
  caption: 'Pixxel constellation launch roadmap and sensor specifications.',
};

const AURORA_MODEL_FIGURES = [
  {
    name: 'Farm Boundary Detection',
    body:
      'The model delineates farm boundaries on Sentinel-2 imagery with high spatial precision, enabling identification and mapping of individual farm parcels. This supports crop classification, growth monitoring, and yield estimation.',
    figure: {
      src: '/proposal-assets/aurora-farm-boundary.png',
      type: 'png',
      caption: 'Farm Boundary model output on Pixxel\u2019s Aurora platform.',
    },
  },
  {
    name: 'Crop Growth Monitoring',
    body:
      'Identifies the phenological stages of the crop cycle: Start of Season (SOS), End of Season (EOS), Peak of Season (POS), peak NDVI value, and overall season duration on a per-farm basis.',
    figure: {
      src: '/proposal-assets/aurora-crop-growth.png',
      type: 'png',
      caption: 'Crop Growth Monitoring model output on Pixxel\u2019s Aurora platform.',
    },
  },
  {
    name: 'NDVI Gap-Filling (Sentinel-1 fusion)',
    body:
      'Uses Sentinel-1 SAR data to fill gaps in the NDVI time series caused by cloud cover, ensuring continuous temporal monitoring of crop dynamics regardless of weather conditions.',
    figure: {
      src: '/proposal-assets/aurora-ndvi-gapfill.png',
      type: 'png',
      caption: 'Gap-filled NDVI model output on Pixxel\u2019s Aurora platform.',
    },
  },
  {
    name: 'Crop Classification',
    body:
      'A supervised classification model that identifies crop types across the AOI from user-provided labels, with per-prediction confidence levels. Supports acreage estimation and regional crop distribution analysis.',
    figure: {
      src: '/proposal-assets/aurora-crop-classification.png',
      type: 'png',
      caption: 'Crop Classification model output on Pixxel\u2019s Aurora platform.',
    },
  },
  {
    name: 'Crop Biophysical & Biochemical Parameters',
    body:
      'Estimates crop traits from hyperspectral imagery: Leaf Area Index (LAI), chlorophyll, brown pigments, canopy water, carotenoids, and dry matter. These layers feed stress and management analytics.',
    figure: {
      src: '/proposal-assets/aurora-crop-bioparams.png',
      type: 'png',
      caption: 'Crop bio-parameter model output on Pixxel\u2019s Aurora platform.',
    },
  },
  {
    name: 'Crop Stress Detection',
    body:
      'Classifies stressed areas within the AOI into low, moderate, and high stress categories, quantifies the affected extent, and supports root-cause analysis of crop anomalies.',
    figure: {
      src: '/proposal-assets/aurora-crop-stress.png',
      type: 'png',
      caption: 'Crop Stress model output on Pixxel\u2019s Aurora platform.',
    },
  },
];

const AURORA_PLATFORM_OVERVIEW_FIGURE = {
  src: '/proposal-assets/aurora-platform-overview.png',
  type: 'png',
  caption: 'Aurora workflow from imagery to analytics outputs.',
};

const AURORA_MARKETPLACE_FIGURE = {
  src: '/proposal-assets/aurora-model-marketplace.png',
  type: 'png',
  caption: 'Model Marketplace in the Aurora platform.',
};

const AURORA_CHAT_FIGURE = {
  src: '/proposal-assets/aurora-chat-interface.png',
  type: 'png',
  caption: 'Natural-language chat interface on the Aurora platform.',
};

const AURORA_MODULES = [
  {
    name: 'Image ordering & delivery',
    body:
      'AOI selection or STAC browsing, archive access plus new tasking options, and cloud-native delivery to AWS S3, GCS, and Azure.',
  },
  {
    name: 'Image analysis tools',
    body:
      'Preset indices (NDVI, NDWI, SAVI, etc.) and a custom index builder; split-compare and swipe views for change visualisation.',
  },
  {
    name: 'Model marketplace',
    body:
      'Pre-trained models (change detection, land cover, crop stress, water quality, and others) with export to raster or vector.',
  },
  {
    name: 'Automation via workflows & APIs',
    body:
      'Chain models into pipelines through a no-code workflow builder; full API surface for integration into existing customer scripts and systems.',
  },
  {
    name: 'LLM-powered chat interface',
    body:
      'Natural-language interaction for model recommendations, workflow generation, and AOI guidance.',
  },
  {
    name: 'Enterprise features',
    body:
      'Workspace and project management, role-based access controls, SSO integration, audit logs, and a compliance dashboard.',
  },
];

const AG_DIFFERENTIATORS = [
  'Near-daily hyperspectral revisit: the Firefly constellation overcomes the historical limitation of hyperspectral missions (slow revisit or narrow swath), enabling consistent, timely acquisition of high-fidelity hyperspectral data at the cadence agricultural decisions require.',
  'Scalable hyperspectral data infrastructure: cloud-native processing pipelines handle the terabyte-per-day data volumes typical of hyperspectral, with automated radiometric and geometric corrections and ML-based feature extraction producing analysis-ready products.',
  'Multi-modal fusion as a first principle: no single modality solves agricultural stress detection; the proposed approach combines the high temporal frequency of multispectral (Sentinel-2) with the high spectral resolution of Pixxel hyperspectral imagery for sharper stress discrimination.',
  'Foundational models extended by hyperspectral: Aurora agriculture models are trained on Sentinel-2 today and improve as Pixxel HSI is added, with finer spectral separation between biotic, abiotic, and crop-type signals.',
  'End-to-end stack from acquisition and pre-processing through analytics delivery in Aurora.',
];

/* ─── PoC goals ───────────────────────────────────────────────────────────── */

const POC_GOAL_INTRO = (customerName) =>
  `The core goal of this Proof of Concept is to validate the business value of hyperspectral and multispectral analytics for ${customerName || '[Customer]'}. This will be assessed against three criteria:`;

const POC_GOAL_CRITERIA = [
  'Analytical quality and scientific defensibility of outputs',
  'Degree of improvement over existing monitoring approaches compared to MSI-only analytics',
  'Deployability and scalability for ongoing subscription monitoring',
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function todayIsoDate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatHumanDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map((s) => parseInt(s, 10));
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function customerSlug(name) {
  return (
    (name || 'customer')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'customer'
  );
}

/* ─── Deterministic executive-summary generator ───────────────────────────── */

function regionalMultiplierForForm(form) {
  return REGIONAL_MULTIPLIERS.find((m) => m.id === form.regionalTierId)?.value ?? 1.0;
}

function getFormQuote(form, regionalMultiplier, sensorTierId = form.sensorTierId) {
  return quoteSelectedAoiBand({
    vertical: form.vertical,
    bandIndex: Number(form.aoiBandIndex) || 0,
    km2: form.aoiKm2,
    regionalMultiplier,
    sensorTierId,
    earlyAdopterId: form.earlyAdopterId,
  });
}

function buildExecutiveSummary(form) {
  const { customerName, vertical, aoiDescription } = form;
  const c = customerName?.trim() || '[Customer]';
  const framing = VERTICAL_FRAMING[vertical];
  if (!framing) return '';

  const product = pilotProductShort(vertical);
  const aoiPhrase = aoiDescription?.trim()
    ? aoiDescription.trim()
    : `their ${vertical.toLowerCase()} area of interest`;

  const isMonitoring = MONITORING_VERTICALS.has(vertical);
  const quote = getFormQuote(form, regionalMultiplierForForm(form));

  const para1 =
    `${c} is evaluating whether satellite hyperspectral analytics can deliver ${framing.problem} across ${aoiPhrase}. ` +
    `${framing.why} ` +
    `This ${product} pilot proposal is scoped to test that hypothesis on a representative slice of ${c}'s operations before any commitment to ongoing Aurora monitoring.`;

  const feeClause =
    quote?.effectiveAmount != null
      ? ` Selected AOI band (${quote.bandLabel}): indicative IaaS engagement fee ${formatProposalUsd(quote.effectiveAmount)}${
          quote.km2IsEstimate ? ' (km² midpoint estimate)' : ''
        }.`
      : '';

  let para2;
  if (isMonitoring) {
    para2 =
      `Pixxel will apply ${framing.method} across the AOI. ` +
      `This proposal is structured as an Insights-as-a-Service (IaaS) engagement — the same pricing framework as the ${product} product page: engagement fee by AOI size band, with sensor-tier multiplier (MSI archive 0.80×, Firefly VNIR 1.0×).` +
      feeClause +
      ` Deliverables include GeoTIFF rasters, written reporting, and a joint interpretation review with ${c}.`;
  } else {
    para2 =
      `Pixxel will apply ${framing.method} across the exploration target AOI via Firefly VNIR hyperspectral acquisition. ` +
      `This SCOPE IaaS engagement uses the campaign pricing framework on the product page — flat fee under the threshold band, then base plus declining $/km² for larger AOIs.` +
      feeClause +
      ` Firefly acquisition is required; there is no MSI-only option. Outputs are delivered as GeoTIFF rasters, an exploration report, and an interpretation deck reviewed jointly with ${c}'s geology team.`;
  }

  const para3 =
    `On completion, ${c} will be in a position to assess analytical quality, decision relevance, and operational deployability of Pixxel's ${product} outputs ` +
    `against existing monitoring approaches, and to decide whether to convert into Aurora subscription or a follow-on Insights-as-a-Service engagement. ` +
    `The pilot fee credits in full toward Aurora subscription if signed within 60 days of pilot completion, providing a low-friction path from validation to ongoing operation.`;

  return [para1, para2, para3].join('\n\n');
}

/* ─── DOCX construction ───────────────────────────────────────────────────── */

const DOC_FONT = DOLE_DOC_FONT;
const COLOR_BLACK = '000000';
const COLOR_SLATE = '3A4D5E';
const COLOR_TABLE_HEADER_BG = '1B3A6B';
const COLOR_TABLE_HEADER_FG = 'FFFFFF';
const COLOR_TABLE_ALT_BG = 'F3F1EA';
const COLOR_TABLE_ACCENT_BG = 'EBF4F8';

const PAGE_WIDTH_DXA = 12240;
const PAGE_HEIGHT_DXA = 15840;
const MARGIN_DXA = 1440;

function txt(text, opts = {}) {
  return new TextRun({
    text: String(text ?? ''),
    font: DOC_FONT,
    size: opts.size ?? 22,
    bold: !!opts.bold,
    italics: !!opts.italics,
    color: opts.color || COLOR_BLACK,
    break: opts.break,
  });
}

function para(text, opts = {}) {
  const children = Array.isArray(text) ? text : [txt(text, opts)];
  return new Paragraph({
    children,
    alignment: opts.alignment,
    spacing: { before: opts.before ?? 0, after: opts.after ?? 120, line: 300 },
    pageBreakBefore: !!opts.pageBreakBefore,
    heading: opts.heading,
  });
}

function h1(text) {
  return new Paragraph({
    children: [txt(text, { bold: true, size: 28, color: COLOR_BLACK })],
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 180, line: 276 },
  });
}

function h2(text) {
  return new Paragraph({
    children: [txt(text, { bold: true, size: 24, color: COLOR_BLACK })],
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140, line: 276 },
  });
}

function h3(text) {
  return new Paragraph({
    children: [txt(text, { bold: true, size: 22, color: COLOR_BLACK })],
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100, line: 276 },
  });
}

function doleFooterParagraph() {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      txt(DOLE_FOOTER_LABEL, { size: 18, color: COLOR_SLATE }),
      new TextRun({ children: [new Tab()] }),
      new TextRun({ font: DOC_FONT, size: 18, color: COLOR_SLATE, children: [PageNumber.CURRENT] }),
    ],
  });
}

function witnessSignatureBlock(partyLabel) {
  return [
    para(partyLabel, { bold: true, after: 80 }),
    para('Agreed By:', { after: 60 }),
    para('Name: ____________________________', { after: 60 }),
    para('Title: ____________________________', { after: 60 }),
    para('Date: ____________________________', { after: 200 }),
  ];
}

function buildExhibitASection(customerName) {
  const blocks = [];
  for (const item of getExhibitATermsBlocks(customerName)) {
    if (item.kind === 'heading') {
      blocks.push(item.text.startsWith('Exhibit') ? h1(item.text) : h3(item.text));
    } else if (item.kind === 'para') {
      blocks.push(para(item.text, { after: item.before ? 200 : 160, before: item.before ?? 0 }));
    } else if (item.kind === 'bullet') {
      blocks.push(bullet(item.text));
    } else if (item.kind === 'signaturePixxel') {
      blocks.push(...witnessSignatureBlock('Pixxel'));
    } else if (item.kind === 'signatureCustomer') {
      blocks.push(...witnessSignatureBlock(item.customer));
    }
  }
  return blocks;
}

function buildDoleContactSection(form) {
  const blocks = [
    h1('Contact Points'),
    ...DOLE_CONTACT_POINTS.flatMap((c) => [
      para(c.name, { bold: true, after: 40 }),
      para(c.title, { after: 40 }),
      para(c.email, { after: 160 }),
    ]),
  ];
  if (form.salesName?.trim() || form.salesEmail?.trim()) {
    blocks.push(
      h3('Proposal prepared by'),
      para(form.salesName?.trim() || 'TBD', { bold: true, after: 40 }),
      para(form.salesTitle?.trim() || 'Pixxel Analytics', { after: 40 }),
      para(form.salesEmail?.trim() || 'TBD', { after: 160 })
    );
  }
  return blocks;
}

function bullet(text) {
  return new Paragraph({
    children: [txt(text)],
    numbering: { reference: 'bullets', level: 0 },
    spacing: { before: 0, after: 80, line: 290 },
  });
}

function cell(text, opts = {}) {
  const isHeader = !!opts.header;
  const widthDxa = opts.widthDxa;
  return new TableCell({
    width: widthDxa ? { size: widthDxa, type: WidthType.DXA } : undefined,
    shading: opts.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: opts.fill } : undefined,
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    children: [
      new Paragraph({
        children: [
          txt(text, {
            bold: isHeader || !!opts.bold,
            color: isHeader ? COLOR_TABLE_HEADER_FG : COLOR_BLACK,
            size: opts.size ?? 20,
            italics: !!opts.italics,
          }),
        ],
        spacing: { before: 20, after: 20 },
        alignment: opts.alignment,
      }),
    ],
  });
}

function thinBorder() {
  const b = { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' };
  return { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b };
}

/** Max display width for embedded figures. */
const DOCX_FIGURE_MAX_WIDTH_PX = 560;

async function fetchImageBytes(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not load image: ${url}`);
  return new Uint8Array(await res.arrayBuffer());
}

function measureImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error(`Could not decode image: ${url}`));
    img.src = url;
  });
}

function scaleImageDimensions(naturalW, naturalH, maxW = DOCX_FIGURE_MAX_WIDTH_PX) {
  if (!naturalW || !naturalH) return { width: maxW, height: Math.round(maxW * 0.56) };
  if (naturalW <= maxW) return { width: naturalW, height: naturalH };
  const scale = maxW / naturalW;
  return { width: maxW, height: Math.round(naturalH * scale) };
}

function captionPara(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 240, line: 280 },
    children: [txt(text, { italics: true, size: 18, color: COLOR_SLATE })],
  });
}

function figureParagraph(data, type, transformation) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 80 },
    children: [new ImageRun({ type, data, transformation })],
  });
}

async function embedFigure(blocks, fig) {
  try {
    const [data, dims] = await Promise.all([fetchImageBytes(fig.src), measureImage(fig.src)]);
    const transformation = scaleImageDimensions(dims.width, dims.height);
    blocks.push(figureParagraph(data, fig.type, transformation), captionPara(fig.caption));
  } catch (err) {
    console.warn('Proposal figure skipped:', fig.src, err);
    blocks.push(
      para(`[Figure unavailable: ${fig.caption}]`, { italics: true, color: COLOR_SLATE, after: 200 })
    );
  }
}

async function buildAboutPixxelSection() {
  const blocks = [
    h1('2. About Pixxel'),
    para(ABOUT_PIXXEL, { after: 160 }),
    h3('Constellation capabilities'),
    ...ABOUT_PIXXEL_SPECS.map((s) => bullet(s)),
  ];
  await embedFigure(blocks, ABOUT_MSI_HSI_FIGURE);
  return blocks;
}

async function buildRoadmapSection() {
  const blocks = [h1('3. Pixxel Constellation Launch & Roadmap')];
  await embedFigure(blocks, ROADMAP_FIGURE);
  return blocks;
}

async function buildAgriculturePlatformSection() {
  const blocks = [
    h1('5. Aurora Platform & Deployed Models'),
    para(
      'Pixxel readiness for this pilot spans satellite data acquisition, deployed agriculture analytics models, and the Aurora software platform. The sub-sections below summarise the current state of each.',
      { after: 200 }
    ),

    h2('5.1 Satellite Data Readiness'),
    para(
      'The Firefly constellation of six hyperspectral satellites is operational and actively transmitting data. The first three satellites launched in January 2025 and have completed calibration and validation; analytics-ready data products are being delivered to commercial customers. The second batch of three satellites launched in August 2025 and is currently in calibration. As of late 2025 the constellation produces on the order of 60 hyperspectral acquisitions per day under nominal conditions, and roughly 30 acquisitions per day allowing for cloud cover.',
      { after: 240 }
    ),

    h2('5.2 Agriculture Models Deployed on Aurora'),
    para(
      'Pixxel agriculture models use Sentinel-2 and Sentinel-1 multispectral and SAR data alongside Pixxel hyperspectral imagery within Aurora. The models below are deployed today and underpin the pilot deliverables.',
      { after: 200 }
    ),
  ];

  for (const model of AURORA_MODEL_FIGURES) {
    blocks.push(h3(model.name));
    blocks.push(para(model.body, { after: 80 }));
    await embedFigure(blocks, model.figure);
  }

  blocks.push(
    para(
      'Biophysical parameters, stress indices, and growth-stage outputs from these models feed pilot deliverables and any downstream forewarning or advisory work.',
      { italics: true, after: 240, before: 120 }
    ),

    h2('5.3 The Aurora Platform'),
    para(
      'Aurora is Pixxel\u2019s earth observation platform for searching archives, ordering imagery, running models, and exporting results. It combines Pixxel hyperspectral data with open multispectral and SAR sources. The current release is at https://aurora.pixxel.space/.',
      { after: 160 }
    )
  );
  await embedFigure(blocks, AURORA_PLATFORM_OVERVIEW_FIGURE);

  blocks.push(h3('Key modules'));
  for (const mod of AURORA_MODULES) {
    blocks.push(bullet(`${mod.name}: ${mod.body}`));
  }

  await embedFigure(blocks, AURORA_MARKETPLACE_FIGURE);
  await embedFigure(blocks, AURORA_CHAT_FIGURE);

  blocks.push(
    para(
      'Aurora exposes APIs and workflows so results can be integrated into existing customer systems.',
      { italics: true, after: 240, before: 120 }
    ),

    h2('5.4 Technology Differentiators'),
    para(
      'Pixxel combines satellite hardware, data infrastructure, and analytics for agricultural monitoring.',
      { after: 160 }
    ),
    ...AG_DIFFERENTIATORS.map((d) => bullet(d))
  );

  return blocks;
}

/* ─── IaaS / Aurora pricing tables (DOCX) ───────────────────────────────── */

function twoColumnPricingTable(headers, rows) {
  const colW = [3600, 6360];
  const total = colW.reduce((s, w) => s + w, 0);
  return new Table({
    columnWidths: colW,
    width: { size: total, type: WidthType.DXA },
    borders: thinBorder(),
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) =>
          cell(h, {
            header: true,
            fill: COLOR_TABLE_HEADER_BG,
            widthDxa: colW[i],
            alignment: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
          })
        ),
      }),
      ...rows.map((row, ri) =>
        new TableRow({
          children: row.map((v, i) =>
            cell(v, {
              widthDxa: colW[i],
              fill: ri % 2 === 1 ? COLOR_TABLE_ALT_BG : undefined,
              bold: i === 1,
              alignment: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
            })
          ),
        })
      ),
    ],
  });
}

function buildPricingSection(form, regionalMultiplier, sensorTierId, earlyAdopterId) {
  const iaas = getScaledIaasPricing(form.vertical, regionalMultiplier);
  const aurora = getScaledAuroraPricing(form.vertical, regionalMultiplier);
  const isMonitoring = MONITORING_VERTICALS.has(form.vertical);
  const feeMult = computeProposalFeeMultiplier({
    vertical: form.vertical,
    regionalMultiplier,
    sensorTierId,
    earlyAdopterId,
  });
  const onTopMult = feeMult.sensor * feeMult.earlyAdopter;
  const sensorLabel =
    SENSOR_TIER_OPTIONS.find((o) => o.id === sensorTierId)?.label ??
    'Hyperspectral · Firefly VNIR (1.0×)';
  const earlyAdopterLabel =
    EARLY_ADOPTER_OPTIONS.find((o) => o.id === earlyAdopterId)?.label ?? 'None';

  const scaleRows = (rows) =>
    onTopMult === 1
      ? rows
      : rows.map((row) => [
          row[0],
          ...row.slice(1).map((cell) => scaleFeeString(cell, onTopMult)),
        ]);

  const iaasRows = scaleRows(iaas.rows);
  const auroraRows = scaleRows(aurora.rows);
  const quote = getFormQuote(form, regionalMultiplier, sensorTierId);

  const blocks = [
    h3('Insights as a Service (IaaS)'),
    para(iaas.lede, { after: 120 }),
  ];

  if (quote?.effectiveAmount != null) {
    blocks.push(
      para(
        `Indicative IaaS engagement fee for this proposal: ${formatProposalUsd(quote.effectiveAmount)} ` +
          `(AOI band: ${quote.bandLabel}` +
          (quote.km2Used != null ? `; ${quote.km2Used.toLocaleString('en-US')} km²` : '') +
          (quote.km2IsEstimate ? ', midpoint estimate' : '') +
          `; Tier 1 list ${quote.listFeeText}).`,
        { after: 120 }
      )
    );
  }

  blocks.push(twoColumnPricingTable(iaas.headers, iaasRows));

  if (iaas.formulaNote) {
    blocks.push(para(iaas.formulaNote, { italics: true, after: 120, color: COLOR_SLATE }));
  }

  if (isMonitoring) {
    blocks.push(
      para(`Sensor tier for this proposal: ${sensorLabel}.`, { after: 120 }),
      twoColumnPricingTable(pricingMultipliers.sensor.headers, pricingMultipliers.sensor.rows)
    );
  }

  blocks.push(
    para(`Early adopter program: ${earlyAdopterLabel}.`, { after: 120 }),
    para(
      `Multipliers applied to list fees in this proposal: regional ${feeMult.regional.toFixed(2)}×` +
        (isMonitoring ? ` × sensor ${feeMult.sensor.toFixed(2)}×` : '') +
        ` × early adopter ${feeMult.earlyAdopter.toFixed(2)}×` +
        ` = ${feeMult.combined.toFixed(2)}× effective on Tier 1 list.`,
      { italics: true, after: 160 }
    ),
    h3('Aurora subscription (post-pilot path)'),
    para(aurora.lede, { after: 120 }),
    twoColumnPricingTable(aurora.headers, auroraRows),
    para(aurora.cadenceNote, { italics: true, after: 120, color: COLOR_SLATE }),
    para(
      'Aurora conversion credit: 100% of the IaaS engagement fee credited toward Aurora subscription if signed within 60 days of IaaS completion.',
      { italics: true, after: 200 }
    )
  );

  return blocks;
}

/* ─── §4 builders per vertical type ───────────────────────────────────────── */

const MODELLING_APPROACH = {
  Agriculture: {
    intro:
      'Crop health assessment combines narrowband spectral indices with PROSAIL canopy radiative-transfer inversion to extract biophysical variables that broadband multispectral sensors cannot resolve directly.',
    indicesLabel: 'Spectral indices (MSI and HSI)',
    indices: [
      'Normalized Difference Red Edge Index (NDRE): sensitive to variations in chlorophyll content and photosynthetic efficiency; enables early detection of stress conditions',
      'Photochemical Reflectance Index (PRI): measures changes in photosynthetic efficiency by tracking xanthophyll cycle activity, closely linked to stress response',
      'Green Chlorophyll Index (CIgreen): captures changes in chlorophyll content in the green spectral region; robust indicator of photosynthetic health',
      'Plant Senescence Reflectance Index (PSRI): detects early signs of senescence by highlighting the ratio of carotenoids to chlorophyll; marker of plant aging or stress',
      'Structural Indices (NDVI Narrowband Variants): track changes in canopy structure and density; early indicators of stress-related degradation',
    ],
    prosailLabel: 'PROSAIL biophysical retrievals (HSI)',
    prosail: [
      'Chlorophyll content (Cab): photosynthetic capacity and overall plant health',
      'Leaf nitrogen: correlated with chlorophyll content; rises and falls together as canopy nitrogen status changes',
      'Leaf area index (LAI): canopy density and light interception; primary input to yield and stress models',
      'Canopy water content (Cw): water stress indicator, spectrally unambiguous at HSI resolution',
      'Dry matter content (Cm): structural carbohydrate accumulation and canopy maturity',
      'Carotenoids (Car): photoprotection status and secondary stress indicator',
    ],
  },
  Water: {
    intro:
      'Water quality analytics use HydroLight inversion to solve for inherent optical properties (IOPs) from water-leaving reflectance, rather than empirical band-ratio indices alone. The approach transfers across water bodies without site-specific recalibration.',
    indicesLabel: 'Spectral indices (MSI baseline)',
    indices: [
      'NDWI / MNDWI: water body delineation and extent mapping',
      'Normalised Difference Chlorophyll Index: broadband chlorophyll proxy for MSI time-series baseline',
      'Cyanobacteria Index (CI): bloom flag and scum detection at MSI resolution',
    ],
    prosailLabel: 'HydroLight IOP retrievals (HSI)',
    prosail: [
      'Chlorophyll-a (Chl-a): phytoplankton biomass and eutrophication indicator',
      'Phycocyanin: cyanobacteria-specific pigment; bloom type discrimination not achievable with MSI broadband',
      'Coloured dissolved organic matter (CDOM): water colour and dissolved organic carbon proxy',
      'Total suspended matter (TSM): turbidity and sediment load',
      'Turbidity and Secchi depth: transparency and light attenuation metrics',
      'Inherent optical properties (IOPs): absorption and backscattering coefficients; full optical chain for regulatory reporting',
    ],
  },
};

function buildMonitoringTechnical(form, regionalMultiplier, sensorTierId) {
  const vScope = MONITORING_SCOPE[form.vertical];
  const iaas = getScaledIaasPricing(form.vertical, regionalMultiplier);
  if (!vScope || !iaas) return [];

  const aoiDesc = form.aoiDescription?.trim();
  const quote = getFormQuote(form, regionalMultiplier, sensorTierId);
  const modelling = MODELLING_APPROACH[form.vertical];
  const sensorMult = sensorMultiplier(sensorTierId);
  const sensorLabel =
    SENSOR_TIER_OPTIONS.find((o) => o.id === sensorTierId)?.label ?? 'Firefly VNIR (1.0×)';

  return [
    h1('4. Technical and Commercial Proposal'),
    h2('4.1 Proof of Concept Goals'),
    para(POC_GOAL_INTRO(form.customerName), { after: 120 }),
    ...POC_GOAL_CRITERIA.map((c) => bullet(c)),

    h2('4.2 Area of Interest'),
    para(
      aoiDesc
        ? `AOI: ${aoiDesc}. Exact AOI boundaries are confirmed with the customer at contract signing. For Hyperspectral pilots, Firefly acquisitions are scheduled subject to operational feasibility within the pilot window; if an acquisition is not feasible, the HSI task cost is credited toward Aurora conversion and scope may convert to MSI Analytics product layers or rescheduling by agreement.`
        : `The AOI is confirmed with the customer at contract signing. For Hyperspectral pilots, Firefly acquisitions are scheduled subject to operational feasibility within the pilot window; if an acquisition is not feasible, the HSI task cost is credited toward Aurora conversion and scope may convert to MSI Analytics product layers or rescheduling by agreement.`,
      { after: quote?.effectiveAmount != null ? 80 : 160 }
    ),
    ...(quote?.effectiveAmount != null
      ? [
          para(
            `IaaS pricing band: ${quote.bandLabel}` +
              (quote.km2Used != null
                ? ` (${quote.km2Used.toLocaleString('en-US')} km²${quote.km2IsEstimate ? ', midpoint estimate' : ''})`
                : '') +
              `. Indicative engagement fee: ${formatProposalUsd(quote.effectiveAmount)}.`,
            { after: 160 }
          ),
        ]
      : []),

    h2('4.3 Pilot Scope'),
    para(
      `${vScope.product} Insights-as-a-Service engagement. Pricing follows the ${vScope.product} product page: AOI size band sets the list engagement fee; sensor tier (${sensorLabel}) applies a ${sensorMult}× multiplier. Scope is locked at contract signing against operationally available layers only.`,
      { italics: true, after: 160 }
    ),

    ...(vScope.inDevelopment?.length
      ? [
          para(
            `In development (not in pilot scope): ${vScope.inDevelopment.join('; ')}.`,
            { italics: true, after: 120, before: 200, color: COLOR_SLATE }
          ),
        ]
      : []),

    h3('IaaS deliverables (product page)'),
    ...iaas.deliverables.map((item) => bullet(item)),

    h3('MSI archive retrieval depth'),
    ...vScope.msi.map((item) => bullet(item)),

    h3('Firefly VNIR retrieval depth'),
    ...vScope.hsi.map((item) => bullet(item)),
    ...(vScope.hsiNote
      ? [para(vScope.hsiNote, { italics: true, after: 120, color: COLOR_SLATE })]
      : []),

    ...(iaas.notIncluded?.length
      ? [
          h3('Not included in IaaS'),
          ...iaas.notIncluded.map((item) => bullet(item)),
        ]
      : []),

    ...(modelling
      ? [
          h2('4.4 Analytical Methods'),
          para(modelling.intro, { after: 160 }),
          h3(modelling.indicesLabel),
          ...modelling.indices.map((item) => bullet(item)),
          h3(modelling.prosailLabel),
          ...modelling.prosail.map((item) => bullet(item)),
        ]
      : []),

    h2('4.5 Deliverables'),
    bullet('GeoTIFF rasters for all analytical layers listed in 4.3'),
    bullet('Validation report (PDF) and interpretation deck (PDF / slides)'),
    bullet('Joint interpretation review session with the Pixxel analytics team'),
    para(
      'MSI Analytics pilots deliver a summary report (~5 pages) in place of the full validation report and interpretation deck used for Hyperspectral pilots.',
      { italics: true, after: 120 }
    ),

    h2('4.6 Timeline'),
    bullet(
      form.startDate
        ? `Estimated start: ${formatHumanDate(form.startDate)}`
        : 'Estimated start: to be confirmed at contract signing'
    ),
    para(
      'Typical engagement window is 4–16 weeks depending on AOI size, Firefly tasking, and customer review cycles. Timelines are indicative and subject to acquisition scheduling.',
      { italics: true, after: 240 }
    ),

    h2('4.7 Pricing'),
    ...buildPricingSection(form, regionalMultiplier, sensorTierId, form.earlyAdopterId),
  ];
}

function buildGeologyTechnical(form, regionalMultiplier) {
  const geo = GEOLOGY_SCOPE;
  const iaas = getScaledIaasPricing(form.vertical, regionalMultiplier);
  const aoiDesc = form.aoiDescription?.trim();
  const quote = getFormQuote(form, regionalMultiplier, 'hsi');

  return [
    h1('4. Technical and Commercial Proposal'),
    h2('4.1 Proof of Concept Goals'),
    para(POC_GOAL_INTRO(form.customerName), { after: 120 }),
    ...POC_GOAL_CRITERIA.map((c) => bullet(c)),

    h2('4.2 Area of Interest'),
    para(
      aoiDesc
        ? `Target AOI: ${aoiDesc}. Exact boundaries and exploration target coordinates are confirmed at contract signing.`
        : 'Exploration target AOI confirmed at contract signing.',
      { after: quote?.effectiveAmount != null ? 80 : 160 }
    ),
    ...(quote?.effectiveAmount != null
      ? [
          para(
            `IaaS pricing band: ${quote.bandLabel}` +
              (quote.km2Used != null
                ? ` (${quote.km2Used.toLocaleString('en-US')} km²${quote.km2IsEstimate ? ', midpoint estimate' : ''})`
                : '') +
              `. Indicative campaign fee: ${formatProposalUsd(quote.effectiveAmount)}.`,
            { after: 160 }
          ),
        ]
      : []),
    para(
        "If Firefly acquisition is not feasible within the pilot window, the customer\u2019s choice of full refund or rescheduling applies.",
      { italics: true, after: 120 }
    ),

    h2('4.3 Pilot Scope'),
    para(
      'SCOPE IaaS campaign engagement. Firefly VNIR hyperspectral acquisition is required — MSI-only is not offered. Pricing follows the SCOPE product page (flat fee under threshold, then base + declining $/km²). Larger campaigns may add acquisitions and targets by discussion.',
      { italics: true, after: 160 }
    ),

    para(
      `In development (not in pilot scope): ${geo.inDevelopment.join('; ')}.`,
      { italics: true, after: 120, before: 200, color: COLOR_SLATE }
    ),

    h3('Campaign deliverables'),
    ...(iaas?.deliverables ?? geo.standard).map((item) => bullet(item)),

    h3('Expanded campaigns (by discussion)'),
    ...geo.enterpriseAdditions.map((item) => bullet(item)),

    h2('4.4 Deliverables'),
    bullet('GeoTIFF rasters for all analytical layers listed in 4.3'),
    bullet('Exploration report (~15 pages, PDF) and interpretation deck'),
    bullet('Joint interpretation review session with the Pixxel geology and analytics team'),

    h2('4.5 Timeline'),
    bullet(
      form.startDate
        ? `Estimated start: ${formatHumanDate(form.startDate)}`
        : 'Estimated start: to be confirmed at contract signing'
    ),
    para(
      'Typical campaign window is 6–12 months; single-acquisition pilots often complete in 6–10 weeks after tasking. Timelines are indicative and subject to Firefly scheduling.',
      { italics: true, after: 240 }
    ),

    h2('4.6 Pricing'),
    ...buildPricingSection(form, regionalMultiplier, 'hsi', form.earlyAdopterId),
  ];
}

/* ─── Main DOCX builder ───────────────────────────────────────────────────── */

async function buildProposalDoc(form, executiveSummary, multiplier) {
  const isMonitoring = MONITORING_VERTICALS.has(form.vertical);

  const isAgricultureToc = form.vertical === 'Agriculture';
  const tocLines = [
    '1. EXECUTIVE SUMMARY',
    '2. ABOUT PIXXEL',
    '3. PIXXEL CONSTELLATION LAUNCH & ROADMAP',
    '4. TECHNICAL AND COMMERCIAL PROPOSAL',
    '     4.1 Proof of Concept Goals',
    '     4.2 Area of Interest',
    '     4.3 Pilot Scope',
    ...(isMonitoring ? ['     4.4 Analytical Methods'] : []),
    `     ${isMonitoring ? '4.5' : '4.4'} Deliverables`,
    `     ${isMonitoring ? '4.6' : '4.5'} Timeline`,
    `     ${isMonitoring ? '4.7' : '4.6'} Pricing`,
    ...(isAgricultureToc
      ? [
          '5. AURORA PLATFORM & DEPLOYED MODELS',
          '     5.1 Satellite Data Readiness',
          '     5.2 Agriculture Models Deployed on Aurora',
          '     5.3 The Aurora Platform',
          '     5.4 Technology Differentiators',
        ]
      : []),
    'EXHIBIT A - TERMS OF SERVICE',
    'CONTACT POINTS',
  ];

  const cover = [
    new Paragraph({
      children: [txt('PROOF OF CONCEPT PROPOSAL', { bold: true, size: 48 })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 3200, after: 400 },
    }),
    new Paragraph({
      children: [txt(`Prepared for ${form.customerName || '[Customer]'}`, { size: 28 })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 200 },
    }),
    new Paragraph({
      children: [txt(formatHumanDate(form.proposalDate), { size: 24, color: COLOR_SLATE })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 0 },
    }),
    new Paragraph({ children: [txt('', { size: 22 })], pageBreakBefore: true }),
  ];

  const tocBlock = [
    h1('Table of Contents'),
    ...tocLines.map((line) =>
      new Paragraph({
        children: [txt(line, { size: 22 })],
        spacing: { before: 0, after: 80, line: 276 },
      })
    ),
    new Paragraph({ children: [txt('', { size: 22 })], pageBreakBefore: true }),
  ];

  const execSummary = [
    h1('1. Executive Summary'),
    ...executiveSummary.split(/\n{2,}/).map((p) => para(p.trim(), { after: 200 })),
  ];

  const about = await buildAboutPixxelSection();
  const roadmap = await buildRoadmapSection();

  let technical;
  if (isMonitoring) {
    technical = buildMonitoringTechnical(form, multiplier, form.sensorTierId);
  } else {
    technical = buildGeologyTechnical(form, multiplier);
  }

  const isAgriculture = form.vertical === 'Agriculture';
  const platform = isAgriculture ? await buildAgriculturePlatformSection() : [];

  const exhibitA = buildExhibitASection(form.customerName);
  const contacts = buildDoleContactSection(form);

  return new Document({
    creator: 'Pixxel Analytics Playbook',
    title: `Pixxel Pilot Proposal - ${form.customerName || 'Customer'}`,
    description: `Pilot proposal for ${form.customerName || 'Customer'} (${pilotProductLabel(form.vertical)})`,
    styles: {
      default: {
        document: {
          run: { font: DOC_FONT, size: 22, color: COLOR_BLACK },
          paragraph: { spacing: { line: 300 } },
        },
      },
    },
    numbering: {
      config: [
        {
          reference: 'bullets',
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '\u2022',
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 720, hanging: 360 } } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: PAGE_WIDTH_DXA,
              height: PAGE_HEIGHT_DXA,
              orientation: PageOrientation.PORTRAIT,
            },
            margin: { top: MARGIN_DXA, right: MARGIN_DXA, bottom: MARGIN_DXA, left: MARGIN_DXA },
          },
        },
        footers: {
          default: new Footer({ children: [doleFooterParagraph()] }),
        },
        children: [
          ...cover,
          ...tocBlock,
          ...execSummary,
          ...about,
          ...roadmap,
          ...technical,
          ...platform,
          ...exhibitA,
          ...contacts,
        ],
      },
    ],
  });
}

async function downloadProposalDocx(form, executiveSummary, multiplier) {
  const doc = await buildProposalDoc(form, executiveSummary, multiplier);
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Pixxel-Pilot-Proposal-${customerSlug(form.customerName)}-${
    form.proposalDate || todayIsoDate()
  }.docx`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 0);
}

/* ─── Shared inline styles ────────────────────────────────────────────────── */

const inputStyle = {
  background: 'var(--bg3)',
  border: '1px solid var(--gray2)',
  color: 'var(--text)',
  fontFamily: 'inherit',
  fontSize: 15,
  padding: '8px 10px',
  outline: 'none',
  width: '100%',
  borderRadius: 0,
};
const selectStyle = { ...inputStyle, cursor: 'pointer' };
const labelStyle = {
  display: 'block',
  fontSize: 12,
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: 'var(--gray)',
  marginBottom: 6,
};
const hintStyle = { fontSize: 13, color: 'var(--gray)', marginTop: 4, lineHeight: 1.45 };

/* ─── UI atoms ────────────────────────────────────────────────────────────── */

function FormGroup({ title, children }) {
  return (
    <div style={{ border: '1px solid var(--gray2)', background: 'var(--bg2)', padding: '16px 18px', marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontFamily: "'IBM Plex Mono', ui-monospace, monospace", letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 14 }}>
        {title}
      </div>
      <div style={{ display: 'grid', gap: 14 }}>{children}</div>
    </div>
  );
}

function Field({ label, children, hint, required }) {
  return (
    <div>
      <label style={labelStyle}>
        {label}{required && <span style={{ color: 'var(--cyan)', marginLeft: 4 }}>·</span>}
      </label>
      {children}
      {hint && <div style={hintStyle}>{hint}</div>}
    </div>
  );
}

function FieldRow({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>{children}</div>;
}

/** Live IaaS band preview — matches product Pricing tabs. */
function PricingPreview({
  vertical,
  regionalMultiplier,
  sensorTierId,
  earlyAdopterId,
  aoiBandIndex,
  aoiKm2,
}) {
  const iaas = getScaledIaasPricing(vertical, regionalMultiplier);
  if (!iaas) return null;

  const feeMult = computeProposalFeeMultiplier({
    vertical,
    regionalMultiplier,
    sensorTierId,
    earlyAdopterId,
  });
  const onTopMult = feeMult.sensor * feeMult.earlyAdopter;
  const selectedIndex = Number(aoiBandIndex) || 0;
  const quote = quoteSelectedAoiBand({
    vertical,
    bandIndex: selectedIndex,
    km2: aoiKm2,
    regionalMultiplier,
    sensorTierId,
    earlyAdopterId,
  });

  const thStyle = {
    fontSize: 11,
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'var(--on-navy)',
    background: 'var(--navy)',
    padding: '6px 8px',
    textAlign: 'left',
    borderBottom: '1px solid var(--gray2)',
  };
  const tdStyle = {
    padding: '6px 8px',
    fontSize: 12,
    color: 'var(--text)',
    borderBottom: '1px solid var(--gray2)',
    verticalAlign: 'top',
    lineHeight: 1.45,
  };

  return (
    <div style={{ overflowX: 'auto', marginTop: 4 }}>
      <div style={{ fontSize: 11, color: 'var(--gray)', marginBottom: 8, lineHeight: 1.45 }}>
        {iaas.headline}
        {feeMult.combined !== 1 && (
          <span style={{ color: 'var(--cyan)' }}>
            {' '}
            · {feeMult.combined.toFixed(2)}× effective (regional × sensor × early adopter)
          </span>
        )}
      </div>
      {quote?.effectiveAmount != null && (
        <div
          style={{
            fontSize: 12,
            color: 'var(--white)',
            background: 'var(--navy)',
            border: '1px solid var(--cyan)',
            padding: '10px 12px',
            marginBottom: 10,
            lineHeight: 1.45,
          }}
        >
          <strong style={{ color: 'var(--cyan)' }}>Selected AOI:</strong> {quote.bandLabel}
          {quote.km2Used != null && (
            <span style={{ color: 'var(--gray)' }}>
              {' '}
              · {quote.km2Used.toLocaleString('en-US')} km²
              {quote.km2IsEstimate ? ' (midpoint estimate)' : ''}
            </span>
          )}
          <br />
          <strong style={{ color: 'var(--cyan)' }}>Indicative IaaS fee:</strong>{' '}
          {formatProposalUsd(quote.effectiveAmount)}
        </div>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg3)' }}>
        <thead>
          <tr>
            {iaas.headers.map((h) => (
              <th key={h} style={thStyle}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {iaas.rows.map(([band, fee], index) => {
            const adjusted = onTopMult === 1 ? fee : scaleFeeString(fee, onTopMult);
            const isSelected = index === selectedIndex;
            const rowBg = isSelected ? 'rgba(0, 212, 255, 0.08)' : undefined;
            return (
              <tr key={band} style={{ background: rowBg }}>
                <td
                  style={{
                    ...tdStyle,
                    color: isSelected ? 'var(--cyan)' : 'var(--white)',
                    fontWeight: 600,
                    borderLeft: isSelected ? '3px solid var(--cyan)' : undefined,
                  }}
                >
                  {band}
                </td>
                <td style={{ ...tdStyle, color: 'var(--cyan)', fontWeight: 600 }}>{adjusted}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {iaas.formulaNote && (
        <p style={{ fontSize: 11, color: 'var(--gray)', margin: '8px 0 0', lineHeight: 1.45 }}>
          {iaas.formulaNote}
        </p>
      )}
    </div>
  );
}

/* ─── Initial form state ──────────────────────────────────────────────────── */

function buildInitialForm() {
  return {
    customerName: '',
    contactName: '',
    dealNotes: '',
    vertical: 'Agriculture',
    sensorTierId: 'hsi',
    aoiDescription: '',
    aoiBandIndex: 0,
    aoiKm2: '',
    regionalTierId: 't1',
    earlyAdopterId: 'none',
    proposalDate: todayIsoDate(),
    startDate: '',
    salesName: '',
    salesEmail: '',
    salesTitle: '',
  };
}

/* ─── Main component ──────────────────────────────────────────────────────── */

export default function PilotProposalGenerator({ navigate }) {
  const [form, setForm] = useState(buildInitialForm);
  const [executiveSummary, setExecutiveSummary] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const multiplier = useMemo(
    () => REGIONAL_MULTIPLIERS.find((m) => m.id === form.regionalTierId)?.value ?? 1.0,
    [form.regionalTierId]
  );

  const validation = useMemo(() => {
    const errors = [];
    const warnings = [];
    if (!form.customerName.trim()) errors.push('Customer name is required.');
    if (!form.contactName.trim()) errors.push('Primary contact is required.');
    if (!form.vertical) errors.push('Select a product.');
    if (!form.proposalDate) errors.push('Proposal date is required.');
    if (!form.salesName.trim()) errors.push('Sales rep name is required.');
    if (!form.salesEmail.trim()) errors.push('Sales rep email is required.');
    if (form.earlyAdopterId === 'design-partner') {
      warnings.push(
        'Design partner discount (20% off) requires CCO approval before the proposal is sent.'
      );
    }
    return { errors, warnings, ok: errors.length === 0 };
  }, [form]);

  const update = (field) => (eOrVal) => {
    const next =
      eOrVal && eOrVal.target !== undefined ? eOrVal.target.value : eOrVal;
    setForm((prev) => ({ ...prev, [field]: next }));
  };

  const handleGenerate = () => {
    if (!validation.ok) return;
    setExecutiveSummary(buildExecutiveSummary(form));
    setHasGenerated(true);
    setDownloadError(null);
    requestAnimationFrame(() => {
      const el = document.getElementById('exec-summary-panel');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleRegenerate = () => setExecutiveSummary(buildExecutiveSummary(form));

  const handleDownload = async () => {
    if (!validation.ok || !executiveSummary.trim()) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      await downloadProposalDocx(form, executiveSummary, multiplier);
    } catch (err) {
      console.error(err);
      setDownloadError(err?.message || 'Failed to generate .docx: please retry.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div className="eyebrow">Commercial · Pilot proposal generator</div>
      <h1 className="section-title">Pilot proposal generator.</h1>
      <p className="section-sub">
        Fill in deal context, product (TRACE, SWIPE, or SCOPE), sensor tier, and regional pricing
        band. The tool builds a deterministic executive summary and packages a Pixxel-branded{' '}
        <code>.docx</code> proposal using the same <strong>Insights-as-a-Service</strong> and{' '}
        <strong>Aurora subscription</strong> pricing framework as each product&apos;s Pricing tab.
        Customer name is substituted throughout, including Exhibit A.
      </p>

      <Callout type="warn" label="Internal · indicative">
        All pricing reflects the playbook v3 pilot model. Final fees, scope, and HSI availability are
        confirmed in the scoping call before contract signing. Do not share this tool with customers.
      </Callout>

      <Callout type="info" label="Not for contract-based programs">
        Defense &amp; intelligence, mining lifecycle, forestry, and other bespoke or multi-vertical
        engagements are not generated here. Use{' '}
        {navigate ? (
          <button
            type="button"
            onClick={() => navigate('bespoke-projects')}
            style={{
              padding: 0,
              border: 'none',
              background: 'none',
              color: 'var(--cyan)',
              cursor: 'pointer',
              font: 'inherit',
              textDecoration: 'underline',
            }}
          >
            Bespoke projects &amp; pipeline
          </button>
        ) : (
          'Bespoke projects & pipeline'
        )}{' '}
        for sales process and scoping guidance on those deals.
      </Callout>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 380px',
          gap: 24,
          alignItems: 'start',
          marginTop: 24,
        }}
      >
        {/* ─── Form ─── */}
        <div>
          <FormGroup title="Deal context">
            <FieldRow>
              <Field label="Customer name" required>
                <input
                  style={inputStyle}
                  value={form.customerName}
                  onChange={update('customerName')}
                  placeholder="e.g. Acme Agriculture Pte Ltd"
                />
              </Field>
              <Field label="Primary contact" required>
                <input
                  style={inputStyle}
                  value={form.contactName}
                  onChange={update('contactName')}
                  placeholder="e.g. Dr. Maria Reyes"
                />
              </Field>
            </FieldRow>
            <Field label="Internal deal notes (not included in proposal)">
              <textarea
                style={{ ...inputStyle, minHeight: 70, resize: 'vertical', lineHeight: 1.4 }}
                value={form.dealNotes}
                onChange={update('dealNotes')}
                placeholder="Context for internal use: sales motion, sponsor, decision criteria…"
              />
            </Field>
          </FormGroup>

          <FormGroup title="Product">
            <Field label="Product" required>
              <select
                style={selectStyle}
                value={form.vertical}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    vertical: e.target.value,
                    aoiBandIndex: 0,
                    aoiKm2: '',
                    sensorTierId: 'hsi',
                  }));
                }}
              >
                {PILOT_PRODUCTS.map((p) => (
                  <option key={p.key} value={p.key}>{p.label}</option>
                ))}
              </select>
            </Field>
          </FormGroup>

          {MONITORING_VERTICALS.has(form.vertical) && (
            <FormGroup title="Sensor tier">
              <Field
                label="Sensor tier"
                required
                hint="Applies the product-page sensor multiplier to IaaS fees (MSI 0.80×, Firefly VNIR 1.0×)."
              >
                <select
                  style={selectStyle}
                  value={form.sensorTierId}
                  onChange={update('sensorTierId')}
                >
                  {SENSOR_TIER_OPTIONS.filter(
                    (o) => !o.disabledFor?.includes(form.vertical)
                  ).map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </Field>
            </FormGroup>
          )}

          <FormGroup title="AOI">
            <Field
              label="AOI size band"
              required
              hint="IaaS engagement fee band from the product Pricing tab. Drives the indicative quote in the preview and proposal."
            >
              <select
                style={selectStyle}
                value={form.aoiBandIndex}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    aoiBandIndex: Number(e.target.value),
                    aoiKm2: '',
                  }))
                }
              >
                {getAoiBandOptions(form.vertical).map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label} — {b.listFee}
                  </option>
                ))}
              </select>
            </Field>
            {(() => {
              const band = getAoiBandOptions(form.vertical)[form.aoiBandIndex];
              if (!band || band.isFlat || band.isCustom) return null;
              return (
                <Field
                  label="AOI area (km²)"
                  hint="For formula bands: enter actual km² for an exact fee. Leave blank to use the band midpoint as an estimate."
                >
                  <input
                    style={inputStyle}
                    type="number"
                    min="1"
                    step="1"
                    value={form.aoiKm2}
                    onChange={update('aoiKm2')}
                    placeholder="e.g. 850"
                  />
                </Field>
              );
            })()}
            <Field
              label="AOI description (optional)"
              hint='Geographic context for the executive summary and §4.2. E.g. "banana and pineapple plantations across Philippines and Sri Lanka"'
            >
              <input
                style={inputStyle}
                value={form.aoiDescription}
                onChange={update('aoiDescription')}
                placeholder='e.g. "mixed crop farms across Karnataka and Tamil Nadu"'
              />
            </Field>
          </FormGroup>

          <FormGroup title="Pricing band">
            <Field
              label="Regional pricing tier"
              required
              hint="World Bank income-tier multiplier on list fees."
            >
              <select
                style={selectStyle}
                value={form.regionalTierId}
                onChange={update('regionalTierId')}
              >
                {REGIONAL_MULTIPLIERS.map((m) => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </Field>
            <Field
              label="Early adopter discount"
              hint="Stacks with regional and sensor-tier multipliers per product Pricing tab."
            >
              <select
                style={selectStyle}
                value={form.earlyAdopterId}
                onChange={update('earlyAdopterId')}
              >
                {EARLY_ADOPTER_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
            </Field>
          </FormGroup>

          <FormGroup title="Timeline">
            <FieldRow>
              <Field label="Proposal date" required>
                <input
                  type="date"
                  style={inputStyle}
                  value={form.proposalDate}
                  onChange={update('proposalDate')}
                />
              </Field>
              <Field label="Estimated pilot start (optional)">
                <input
                  type="date"
                  style={inputStyle}
                  value={form.startDate}
                  onChange={update('startDate')}
                />
              </Field>
            </FieldRow>
          </FormGroup>

          <FormGroup title="Prepared by">
            <FieldRow>
              <Field label="Sales rep name" required>
                <input
                  style={inputStyle}
                  value={form.salesName}
                  onChange={update('salesName')}
                  placeholder="e.g. Aakash Parekh"
                />
              </Field>
              <Field label="Sales rep email" required>
                <input
                  type="email"
                  style={inputStyle}
                  value={form.salesEmail}
                  onChange={update('salesEmail')}
                  placeholder="name@pixxel.co.in"
                />
              </Field>
            </FieldRow>
            <Field label="Sales rep title (optional)">
              <input
                style={inputStyle}
                value={form.salesTitle}
                onChange={update('salesTitle')}
                placeholder="e.g. Head of Commercial"
              />
            </Field>
          </FormGroup>
        </div>

        {/* ─── Sidebar ─── */}
        <aside style={{ position: 'sticky', top: 16, display: 'grid', gap: 16 }}>
          <div
            style={{
              border: '1px solid var(--gray2)',
              background: 'var(--bg2)',
              padding: '18px 18px 14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--cyan)',
                marginBottom: 12,
              }}
            >
              <Sparkles size={12} /> Live pricing: {pilotProductLabel(form.vertical)}
            </div>
            <PricingPreview
              vertical={form.vertical}
              regionalMultiplier={multiplier}
              sensorTierId={form.sensorTierId}
              earlyAdopterId={form.earlyAdopterId}
              aoiBandIndex={form.aoiBandIndex}
              aoiKm2={form.aoiKm2}
            />
            <div
              style={{
                marginTop: 10,
                paddingTop: 10,
                borderTop: '1px solid var(--gray2)',
                fontSize: 12,
                color: 'var(--gray)',
                fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                lineHeight: 1.5,
              }}
            >
              {(() => {
                const m = computeProposalFeeMultiplier({
                  vertical: form.vertical,
                  regionalMultiplier: multiplier,
                  sensorTierId: form.sensorTierId,
                  earlyAdopterId: form.earlyAdopterId,
                });
                return (
                  <>
                    Effective ×{' '}
                    <span style={{ color: 'var(--text)' }}>{m.combined.toFixed(2)}</span>
                    <span style={{ display: 'block', marginTop: 4, fontSize: 11 }}>
                      regional {m.regional.toFixed(2)}×
                      {MONITORING_VERTICALS.has(form.vertical) && ` · sensor ${m.sensor.toFixed(2)}×`}
                      {' · early adopter '}
                      {m.earlyAdopter.toFixed(2)}×
                    </span>
                  </>
                );
              })()}
            </div>
          </div>

          {validation.warnings.length > 0 && (
            <div
              style={{
                border: '1px solid var(--amber)',
                background: 'rgba(245, 166, 35, 0.06)',
                padding: '12px 14px',
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
              }}
            >
              <AlertTriangle size={14} color="var(--amber)" style={{ marginTop: 2 }} />
              <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.45 }}>
                {validation.warnings.map((w) => <div key={w}>{w}</div>)}
              </div>
            </div>
          )}

          {!validation.ok && (
            <div
              style={{
                border: '1px solid var(--red)',
                background: 'rgba(239, 83, 80, 0.06)',
                padding: '12px 14px',
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
              }}
            >
              <Info size={14} color="var(--red)" style={{ marginTop: 2 }} />
              <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.45 }}>
                <div style={{ marginBottom: 4, fontWeight: 600 }}>
                  Complete the form to enable proposal generation:
                </div>
                {validation.errors.map((e) => <div key={e}>· {e}</div>)}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleGenerate}
            disabled={!validation.ok}
            style={{
              background: validation.ok ? 'var(--cyan)' : 'var(--gray2)',
              color: validation.ok ? '#001218' : 'var(--gray)',
              border: 'none',
              padding: '12px 14px',
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: validation.ok ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontWeight: 600,
            }}
          >
            <FileText size={14} /> Build executive summary
          </button>
        </aside>
      </div>

      {/* ─── Executive summary + download ─── */}
      {hasGenerated && (
        <div
          id="exec-summary-panel"
          style={{
            marginTop: 32,
            border: '1px solid var(--gray2)',
            background: 'var(--bg2)',
            padding: '20px 22px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 16,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--cyan)',
                  marginBottom: 4,
                }}
              >
                Executive summary · editable
              </div>
              <div style={{ fontSize: 13, color: 'var(--gray)' }}>
                Auto-drafted from the form fields. Refine the prose before downloading: your edits
                are kept until you press <em>Regenerate</em>.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={handleRegenerate}
                style={{
                  background: 'transparent',
                  color: 'var(--text)',
                  border: '1px solid var(--gray2)',
                  padding: '10px 12px',
                  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                  fontSize: 13,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <RotateCw size={12} /> Regenerate
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading || !executiveSummary.trim()}
                style={{
                  background: 'var(--cyan)',
                  color: '#001218',
                  border: 'none',
                  padding: '10px 14px',
                  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                  fontSize: 13,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: downloading || !executiveSummary.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontWeight: 600,
                  opacity: downloading || !executiveSummary.trim() ? 0.6 : 1,
                }}
              >
                <Download size={12} /> {downloading ? 'Packaging…' : 'Download .docx'}
              </button>
            </div>
          </div>
          <textarea
            value={executiveSummary}
            onChange={(e) => setExecutiveSummary(e.target.value)}
            style={{
              ...inputStyle,
              minHeight: 280,
              fontSize: 13,
              lineHeight: 1.55,
              padding: 14,
              resize: 'vertical',
            }}
          />
          {downloadError && (
            <div
              style={{
                marginTop: 12,
                padding: '10px 12px',
                border: '1px solid var(--red)',
                background: 'rgba(239, 83, 80, 0.08)',
                fontSize: 12,
                color: 'var(--text)',
                display: 'flex',
                gap: 8,
                alignItems: 'flex-start',
              }}
            >
              <AlertTriangle size={14} color="var(--red)" style={{ marginTop: 2 }} />
              <div>
                <strong>.docx generation failed.</strong> {downloadError}
              </div>
            </div>
          )}
          <div
            style={{
              marginTop: 16,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              padding: '12px 14px',
              border: '1px solid var(--gray2)',
              background: 'var(--bg3)',
            }}
          >
            <CheckCircle2 size={14} color="var(--cyan)" style={{ marginTop: 2 }} />
            <div style={{ fontSize: 12, color: 'var(--gray)', lineHeight: 1.5 }}>
              Downloaded files are named{' '}
              <code style={{ color: 'var(--text)' }}>
                Pixxel-Pilot-Proposal-{customerSlug(form.customerName)}-
                {form.proposalDate || todayIsoDate()}.docx
              </code>
              . Scope, pricing tables, and contact blocks are built deterministically: only the
              executive summary is editable.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

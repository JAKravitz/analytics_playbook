/**
 * Pixxel SCOPE — Geology product configuration.
 *
 * SCOPE = Spectral Characterization for Ore Prospectivity & Exploration.
 * First operational product in the Products redesign. Campaign-based
 * (Insights-as-a-Service). The white paper is a generic exploration-mineralogy
 * capabilities narrative — multi-AOI, multi-commodity, not a single case study.
 *
 * Sub-section copy (claims / messaging / pricing) lives in product data files.
 */

import { scopePricing as geologyPricing } from './pricing/scope.js';
import { scopeApiSchema } from './api/scope.js';

export const geologyProduct = {
  id: 'geology',
  slug: 'geology',
  name: 'SCOPE',
  fullName: 'Pixxel SCOPE',
  acronymExpansion: 'Spectral Characterization for Ore Prospectivity & Exploration',
  color: '#F5A623',
  tagline: 'Exploration-grade surface mineralogy from hyperspectral physics — not broadband indices.',
  sub: 'Mineral Prospecting · REE / Critical Minerals · Campaign',
  desc:
    'SCOPE turns Firefly hyperspectral acquisitions into ranked exploration targets: mineral classification, iron-oxide alteration halos, REE continuum-removal proxies, structural framework, and a fused prospectivity score with a pixel-level audit trail. Sold as a fixed-scope campaign over a customer-defined AOI — episodic and target-driven, not a continuous subscription.',

  landing: {
    lede:
      'SCOPE is Pixxel\u2019s exploration mineralogy product. It reads the rock surface with hyperspectral physics, maps the minerals and alteration that vector toward ore, and fuses that evidence into ranked, defensible targets a geologist can take to the field.',
    paragraphs: [
      'Most satellite mineral screening relies on broadband ratios that collapse dozens of diagnostic absorption features into a handful of indices. SCOPE works from the full VNIR spectral curve: SAM and MTMF unmix each pixel against a managed reference library, continuum removal isolates rare-earth absorption features, and MNF-derived structure adds the lithological and lineament context that controls where mineral systems sit.',
      'Every layer carries explicit confidence and a spectral evidence trail. SCOPE is exploration grade by design \u2014 built to rank and de-risk follow-up ground work across a belt, not to replace drilling, assay, or resource estimation. Where VNIR cannot reach a diagnostic feature, the product says so, and the SWIR-capable Honeybee constellation is the path to sharper discrimination in 2027+.',
      'SCOPE ships today as analyst-produced campaign deliverables. The same outputs become a persistent, queryable intelligence cube under NEXUS \u2014 our north star \u2014 where every campaign deepens a belt-scale spectral memory you can search by example.',
    ],
    commercialModels: [
      {
        title: 'Insights as a Service',
        accent: '#F5A623',
        body:
          'Campaign APIs over a defined AOI: classification, alteration, REE proxy, structure, prospectivity, confidence, and evidence delivered as raster and vector products. Priced per campaign with a defined number of Firefly HSI tasks.',
      },
      {
        title: 'Aurora subscription',
        accent: 'var(--cyan)',
        body:
          'Campaign workspace for the same layers: target review, copilot over spectral evidence, comparison workflows, and geology overlays. Price by AOI band and refresh cadence only.',
      },
    ],
    northStar:
      'SCOPE is the operational entry point. NEXUS is where it is headed \u2014 a persistent intelligence cube per belt, full-archive semantic query, and compounding spectral memory across campaigns.',
    outputLayers: [
      {
        layers: [
          {
            name: 'Mineral classification',
            desc: 'SAM + MTMF mineral class and abundance per pixel (goethite, hematite, jarosite).',
          },
          { name: 'Alteration halos', desc: 'Iron-oxide alteration and hydrothermal halo mapping.' },
          {
            name: 'REE proxy',
            desc: 'Nd continuum-removal band depth — relative exploration proxy, not assay or grade.',
          },
          { name: 'Structural framework', desc: 'MNF edge magnitude, lineaments, and lithological contrast.' },
          {
            name: 'Prospectivity',
            desc: 'Fused 0–1 exploration score with ranked target polygons and layer breakdown.',
          },
          {
            name: 'Pixel inspector',
            desc: 'Point-query JSON: classification, spectral scores, REE depths, fusion contribution.',
          },
        ],
      },
    ],
  },

  claims: {
    now: [
      'VNIR mineral classification (SAM + MTMF) \u2014 iron oxides, clay alteration, carbonate assemblages where VNIR is diagnostic; piloting as campaign deliverables',
      'Iron-oxide and hydrothermal alteration halo mapping \u2014 goethite, hematite, jarosite separation from 500\u2013900 nm absorption features',
      'REE / critical-mineral surface proxies \u2014 Nd continuum-removal band depth at ~1200 nm; exploration grade, with explicit per-pixel spectral uncertainty',
      'Structural framework \u2014 MNF edge magnitude, lineament contours, and lithological-contrast composites',
      'Prospectivity fusion \u2014 weighted 0\u20131 exploration score with ranked target polygons and per-layer evidence breakdown',
      'Pixel inspector \u2014 unified audit trail of classification, spectral scores, REE depths, and fusion contribution',
    ],
    eoy: [
      'SCOPE campaign as a productized package with standardized delivery scope and Aurora / Zenith dashboard access',
      'Spectral similarity search (semantic query) over the campaign archive as a customer-facing capability',
      'NEXUS cube initialization per belt \u2014 persistent, queryable spectral memory that compounds across campaigns',
    ],
    never: [
      'SWIR-grade mineral mapping or drill-ready resource estimation \u2014 gated on the Honeybee constellation, 2027+',
      'Mineral certification or assay replacement \u2014 spectral output is screening evidence, not ground truth',
      'A substitute for field geological surveys, airborne geophysics, or drilling decisions on their own',
    ],
    hardRules:
      'Never promise drill-ready or resource-grade outputs. Never imply SWIR-diagnostic minerals (sulfates, phyllosilicates) before Honeybee. Every claim must state sensor tier (VNIR today) and output grade (exploration).',
  },

  messaging: {
    framing:
      'SCOPE is operational today as analyst-produced campaign deliverables on Firefly VNIR. It is exploration grade: built to rank and de-risk follow-up, not to replace assay or drilling. SWIR-dependent discrimination and the full NEXUS cube are in active build for 2027+. Say this plainly \u2014 honest grading is the durable advantage with technical exploration buyers.',
    differentiators: [
      {
        num: '01',
        title: 'Physics, not band ratios',
        quote:
          'Broadband indices collapse diagnostic absorption into a few numbers. SCOPE unmixes the full VNIR curve against a managed spectral library \u2014 a mineralogical statement, not a color.',
      },
      {
        num: '02',
        title: 'Evidence you can defend',
        quote:
          'Every target carries a per-layer breakdown, SAM/MTMF scores, and continuum-removal depths. A geologist can audit why a pixel scored high \u2014 down to the spectrum.',
      },
      {
        num: '03',
        title: 'Honest about VNIR limits',
        quote:
          'We map what VNIR can actually see and flag where SWIR is required. Nd continuum removal is real today; sulfate and phyllosilicate discrimination waits for Honeybee.',
      },
    ],
    language: {
      use: [
        'exploration grade / target generation',
        'surface mineralogy and alteration mapping',
        'continuum-removal REE proxy (VNIR)',
        'prospectivity score with evidence trail',
        'spectral confidence / separability',
        'campaign over a defined AOI',
      ],
      avoid: [
        '"drill-ready" or "resource estimate"',
        '"assay-grade" or "certified" mineralogy',
        'SWIR minerals before Honeybee',
        '"detects REE" (we map proxies, not grade)',
        'uncaveated accuracy numbers',
        '"replaces field geology"',
      ],
    },
    objections: [
      {
        q: 'We already use ASTER / Sentinel-2 for alteration mapping.',
        a:
          'Those are the right starting points and we build on the same heritage. The difference is spectral resolution: ASTER has a handful of broad SWIR bands and Sentinel-2 is broadband VNIR-SWIR with no narrow diagnostic features. Firefly resolves the full VNIR curve, so we separate goethite, hematite, and jarosite from their 500\u2013900 nm absorptions and isolate the Nd feature by continuum removal \u2014 discriminations broadband sensors physically cannot make.',
      },
      {
        q: 'Can you actually detect rare earths from orbit?',
        a:
          'We detect a proxy, not grade. Neodymium has narrow absorption features near 580, 740, and ~800\u20131200 nm that survive into VNIR; continuum removal isolates the depth of that feature as a relative indicator. We pair it with iron-oxide alteration halos that vector toward carbonatite and alkaline systems. It is a prioritization signal for ground follow-up, explicitly not an assay or a concentration estimate.',
      },
      {
        q: 'Does this replace our field program or drilling?',
        a:
          'No, and we say so on every deliverable. SCOPE is a screening and targeting layer: it narrows a belt to ranked zones so your field and geophysics budget goes where the evidence is strongest. Targets are hypotheses with a documented spectral basis, to be confirmed by mapping, sampling, and drilling.',
      },
      {
        q: 'You are a startup \u2014 is this validated?',
        a:
          'The methods are canonical remote-sensing physics: SAM, MTMF, continuum removal, and MNF have decades of literature and operational use. What is new is the sensor and the integration. Where regional validation is still in progress we label outputs exploration grade and prefer campaigns with partners who can help us close the loop against known occurrences.',
      },
      {
        q: 'Why a campaign instead of a subscription?',
        a:
          'Exploration is episodic and mobile \u2014 targets move with the program. A campaign gives you a defined AOI, a set number of Firefly tasks, and a fixed delivery scope, with similarity search and dashboard access for the campaign duration. Renew on the same target or open a new one.',
      },
    ],
  },

  pricing: geologyPricing,
  apiSchema: scopeApiSchema,
};

export { geologyWhitePaper, geologyFigures } from './geologyWhitePaperContent.js';

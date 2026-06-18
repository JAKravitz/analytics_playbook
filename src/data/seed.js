/**
 * Seed content for the Pixxel Analytics Playbook.
 *
 * Editable runtime state lives at the top level (`claims`, `objections`,
 * `packages`). All other keys are static copy used to render sections.
 *
 * IDs (`packages.<id>`) are stable. Adding new entries here is fine; renaming
 * existing IDs will orphan saved edits.
 */

export const verticals = {
  agriculture: {
    name: 'Agriculture',
    sub: 'Precision Ag · Farm Risk Scoring · Agri-Finance',
    color: '#D4A017',
    desc:
      'Field-level crop intelligence from MSI baseline and HSI precision upgrade. Covers both agronomic decision support and risk/insurance intelligence — unified under one vertical. Currently delivering bespoke integrated solutions; moving to productized packages by end of 2026.',
  },
  forestry: {
    name: 'Forestry',
    sub: 'Carbon MRV · Deforestation · Wildfire · Conservation',
    color: '#5BE584',
    desc:
      'Forest intelligence spanning carbon stock, deforestation alerting, wildfire risk, and restoration monitoring. Deliverable bespoke today: SAR fAGB, canopy height, species/type classification, PROSAIL inversion, and index-derived disturbance layers. Degradation trends, FIRMS corroboration, and productized alerting ship through 2026; MRV-grade carbon with Honeybee in 2027+.',
  },
  water: {
    name: 'Water',
    sub: 'Water Quality · HAB Intelligence · Benthic & Coastal',
    color: '#4FC3F7',
    desc:
      'Inland and coastal water intelligence built on HydroLight inversion physics. General water quality (optical and non-optical) is operational; HAB classification, benthic mapping, and coastal change detection are scoping or in active development.',
  },
  geology: {
    name: 'Geology',
    sub: 'Mineral Prospecting · REE / Critical Minerals · SSE Campaign',
    color: '#F5A623',
    desc:
      'Exploration-grade surface mineralogy sold as an SSE Campaign Package — episodic and target-driven, not a continuous subscription. VNIR iron-oxide and alteration mapping is built; full REE and sulfate discrimination awaits the SWIR Honeybee constellation. Prospectivity scoring and SSE similarity search are in scoping.',
  },
  mining: {
    name: 'Mining Lifecycle',
    sub: 'Tailings · Waste Dump · AMD · Rehabilitation',
    color: '#9C6B2E',
    desc:
      'Continuous monitoring for operational mine sites: evaporation ponds, tailings storage facilities, waste dumps, pit walls, acid mine drainage precursors, and rehabilitation progress. Same subscription mechanics as Ag / Forestry / Water. Layers are in piloting; unified package and standard reporting templates are being defined.',
  },
  defense: {
    name: 'Defense & Intelligence',
    sub: 'Site Intelligence · Object Detection · Terrain Mobility',
    color: '#EF5350',
    desc:
      'Contract-based (government / defense procurement, FMS, OTA). Site Intelligence Monitor covers persistent change, facility footprint, anomaly detection, and classified event types. Mobility & Terrain add-ons support trafficability and heavy platform assessment. Pricing TBD — not a standard SaaS subscription.',
  },
};

export const packages = {
  agriculture: [
    {
      id: '01',
      name: 'Field Stress Monitor',
      tagline: "What's wrong, where, how bad, and what caused it?",
      badge: 'Q3 2026',
      badgeColor: 'amber',
      body:
        'Core monitoring product for a defined AOI: we establish a field-specific expected state from the archive and climate context, then surface where the crop deviates in space and time. Anomalies are classified into event types (stress onset, persistence, recovery), ranked by severity, and passed into an MSI-grade attribution pipeline that proposes ranked causes — drought, flood, nutrient stress, disease signatures, mechanical damage, and senescence — with sensor tier and confidence called out on every output. MicroClim corroboration helps rule in or out weather-driven explanations. At MSI you get reliable detection and defensible preliminary attribution; ambiguous calls (especially water vs nutrient) are explicitly flagged for HSI follow-up, where added pigments and structure resolve many spectrally degenerate cases.',
      layers: [
        'Farm Boundary Model',
        'Crop Type Classification',
        'Trait Time Series (LAI · Cab · FVC)',
        'Phenology Deviation',
        'Climate-weighted Expected State',
        'Anomaly & Event Feed',
        'MSI Attribution Pipeline',
        'MicroClim Corroboration',
      ],
      hsiLayers: ['Cw · Cm · Car · Anth', 'REIP Shift', 'HSI Attribution (ranked hypotheses)'],
      decision: 'Where to intervene, with what, and how urgently.',
      warning: {
        type: 'warn',
        text:
          'MSI-only attribution can be ambiguous where water stress, nutrient limitation, and senescence look similar; flag ambiguous zones and plan HSI where prescriptions must hold in court or with growers. Archive depth and clear-sky frequency vary by region and season.',
      },
      customerSegments:
        'Large row-crop growers and cooperatives; integrated agritech platforms and retail digital-ag channels; crop consultants serving multi-field accounts; insurers evaluating stress for underwriting (paired with appropriate legal review).',
    },
    {
      id: '02',
      name: 'Precision Intervention Advisor',
      tagline: 'Exactly what to do, at field level — requires HSI.',
      badge: 'Q3 2026',
      badgeColor: 'amber',
      body:
        'Builds on Field Stress Monitor but moves from “what happened” to “what to do next” at sub-field resolution. It requires Pixxel HSI tasking over the AOI: N, P, and K status layers and a nutrient-attribution report (H-NUT) separate true nutrient limitation from canopy-water and structural signals that MSI cannot disentangle. Water stress is expressed using canopy water and LAI–Cw consistency checks; MicroClim supplies VPD and precipitation context so irrigation recommendations are grounded in both physics and local weather. Deliverables include prioritized irrigation windows, zone-scoped nutrient application guidance, and scouting routes — each tied to a spectral evidence chain suitable for agronomist review, not a black-box recommendation.',
      layers: [
        'All Field Stress Monitor layers',
        'Nutrient Status Layer (N · P · K — HSI)',
        'Nutrient Attribution Report (H-NUT)',
        'Water Stress (Cw + LAI-Cw divergence)',
        'MicroClim VPD + Precip',
        'Irrigation Recommendation',
      ],
      warning: {
        type: 'warn',
        text:
          'Requires Pixxel HSI tasking over the AOI. Without HSI tasking, fall back to Field Stress Monitor at MSI-tier confidence.',
      },
      decision:
        'Irrigate this field now, apply nitrogen to these zones, scout these parcels.',
      customerSegments:
        'Growers and agronomy firms running variable-rate programs; enterprises with recurring HSI tasking; input suppliers attaching evidence-backed recommendations to sales motion.',
    },
    {
      id: '03',
      name: 'Seasonal Risk & Yield Assessment',
      tagline: 'How is this season tracking across the portfolio?',
      badge: 'Q4 2026',
      badgeColor: 'amber',
      body:
        'Seasonal intelligence for portfolios and large growers: we accumulate stress signals through the season, weight them by phenology stage so early vegetative stress is treated differently than stress near reproductive windows, and roll that into a relative yield-risk score per field. The score ranks fields within the portfolio — it is not a bushel or tonne forecast and must never be sold as one. We also surface spatial pattern metrics and forewarning-style flags when anomaly textures resemble expansion or coalescence patterns associated with biotic pressure, so teams can prioritize scouting and sampling before damage concentrates. Crop classification anchors comparisons so unlike crops are not naively stacked.',
      layers: [
        'Phenology Deviation Layer',
        'Cumulative Anomaly Score',
        'Phenology Stage Weighting',
        'Yield Risk Score',
        'Anomaly Spatial Pattern',
        'Forewarning Alert',
        'Crop Classification',
      ],
      warning: {
        type: 'warn',
        text:
          'Yield risk score is a relative ranking, not an absolute yield estimate in bushels per acre. Promise a yield risk assessment, not a yield forecast.',
      },
      decision:
        'Portfolio exposure heading into harvest, where to prioritize scouting, pre-season insurance underwriting risk.',
      customerSegments:
        'Multi-field growers and land managers; grain traders and origination desks needing seasonal visibility; insurers and MGAs pricing portfolio or named-peril cover; ag finance monitoring collateral exposure.',
    },
    {
      id: '04',
      name: 'Cause-of-Loss Evidence Package',
      tagline: 'A claim has been filed — what does the satellite record show?',
      badge: 'Q3 2026',
      badgeColor: 'amber',
      body:
        'Purpose-built for when a claim lands: we reconstruct what the satellite record shows about timing, extent, and severity of adverse crop condition, with onset windows and persistence called out where the archive supports it. Cause-of-loss attribution separates weather-driven failure (drought, flood, waterlogging), management or timing issues, and disease or pest signatures where spectral and temporal evidence allows — always with explicit inventory vs exploration grading and sensor-tier flags. MicroClim corroboration ties claims to local moisture and thermal context. Deliverables are structured as an evidence pack: maps, timelines, key layers, uncertainty and lineage — suitable for adjudicator review, not a replacement for field inspection or policy interpretation.',
      layers: [
        'Event Evidence Layer (onset · severity · extent)',
        'Cause-of-Loss Attribution',
        'Crop Failure Risk Score',
        'MicroClim Corroboration',
        'Water Deficit Index',
        'Flood / Waterlogging Flag',
        'Sensor Tier Flags',
        'Audit Trail + Lineage',
      ],
      warning: {
        type: 'stop',
        text:
          'We provide evidence supporting cause-of-loss determination. We do not replace the adjudicator.',
      },
      decision:
        'Claims adjudication support, fraud detection, reinsurance exposure documentation.',
      customerSegments:
        'Property and crop insurers, reinsurers, and TPAs; legal and forensic teams supporting claims; government disaster and relief programs requiring geospatial evidence.',
    },
    {
      id: '05',
      name: 'Agricultural Portfolio Risk',
      tagline: 'Exposure across a loan book, insurance portfolio, or government program.',
      badge: 'Q4 2026',
      badgeColor: 'purple',
      body:
        'Rolls individual field analytics into portfolio-scale views for lenders, insurers, and programs: each field carries a risk score and health index, then we adjust for spatial correlation so a cluster of bad fields in one climate pocket does not get double-counted as independent draws. Outputs include a collateral-risk lens for secured lending, seasonally normalized health so books can be compared quarter to quarter, and aggregation views that reinsurance teams can use to stress exposure — always with clear caveats on vintage, sensor tier, and validation status across regions.',
      layers: [
        'Field-Level Risk Scores (N fields)',
        'Spatial Correlation Adjustment',
        'Portfolio Risk Dashboard',
        'Crop Health Index',
        'Collateral Risk Layer',
        'Seasonal Normalization',
      ],
      decision:
        'Capital allocation, underwriting pricing, reinsurance structuring, agricultural loan portfolio monitoring.',
      warning: {
        type: 'warn',
        text:
          'Spatial correlation adjustment reduces double-counting but does not replace actuarial review. Vintage, sensor tier, and regional validation coverage must be disclosed when comparing books.',
      },
      customerSegments:
        'Ag lenders and development banks; crop insurers and reinsurers; large grain origination and trading desks; government programs monitoring program exposure across geographies.',
    },
  ],

  forestry: [
    {
      id: '01',
      name: 'Carbon MRV',
      tagline: 'Above-ground biomass and carbon stock estimation, with explicit uncertainty.',
      badge: 'Q3 2026 · Exploration',
      badgeColor: 'amber',
      body:
        'Forest carbon and above-ground biomass as a continuous monitoring story: we estimate AGB and carbon stock with explicit Monte Carlo uncertainty so you can see confidence width, not just a point map. Change detection and structural–optical divergence checks flag where canopy structure and optical properties disagree in ways that often merit ground follow-up. Today the whole package is exploration grade — credible for ranking stands, screening portfolios, and planning verification campaigns, but not for issuing credits or claiming inventory MRV compliance. SWIR-capable Honeybee data and expanded validation are prerequisites for tighter bounds.',
      layers: [
        'AGB & Carbon Stock Layer',
        'Monte Carlo Uncertainty Bounds',
        'Carbon Change Detection',
        'AGB-LAI Structural-Optical Divergence',
        'MRV Evidence Package (exploration)',
      ],
      warning: {
        type: 'stop',
        text:
          'Do NOT quote MRV-grade accuracy or use for carbon credit issuance until SWIR (Honeybee) is operational and field validation is complete. 2027+ only.',
      },
      decision:
        'Portfolio triage, additionality screening, stand prioritization for ground verification — not carbon credit issuance.',
      customerSegments:
        'Forest carbon project developers and verifiers; timber investment managers; national forest inventories and climate reporting teams; NGOs tracking forest carbon performance (exploration-grade only until Honeybee validation).',
    },
    {
      id: '02',
      name: 'Deforestation & Degradation Alerting',
      tagline: 'Persistent monitoring of structural forest loss.',
      badge: 'Q4 2026',
      badgeColor: 'green',
      body:
        'Operational forest loss and degradation monitoring: persistent structural loss is separated from seasonal noise, alerts highlight new clearing or canopy collapse, and mechanical vs biological drivers are attributed where spectral and temporal signatures support it. Gradual degradation is tracked with BFAST-style trend analysis; active fire context is corroborated with FIRMS so alerts distinguish burn from mechanical clearing when possible. MSI is production-capable today; HSI strengthens mechanical-loss discrimination and subtle degradation signatures in heterogeneous canopies.',
      layers: [
        'Structural Loss Layer',
        'Deforestation Alert',
        'H-MECH Attribution',
        'Degradation Trend Layer (BFAST)',
        'FIRMS Fire Corroboration',
      ],
      decision:
        'Conservation programs, supply-chain compliance (EUDR-style), concession monitoring.',
      warning: {
        type: 'warn',
        text:
          'Mechanical vs biological attribution confidence depends on canopy heterogeneity and collection geometry; corroborate high-stakes alerts with ancillary evidence where policy or enforcement requires it.',
      },
      customerSegments:
        'Commodity traders and consumer brands with zero-deforestation commitments; national park and conservation agencies; concession holders and FSC-style certification bodies; climate finance monitoring land-use change.',
    },
    {
      id: '03',
      name: 'Wildfire Risk & Recovery',
      tagline: 'Fuel state pre-fire, severity post-fire, recovery tracking after.',
      badge: 'Q4 2026',
      badgeColor: 'amber',
      body:
        'End-to-end wildfire intelligence: pre-season fuel state combines canopy water and dry-matter proxies with weather context to produce a wildfire risk score suited to briefing and prioritization. Post-event, burn scars and severity classes summarize immediate damage; multi-temporal recovery tracks canopy return and structure so restoration and reinsurance workflows have a multi-year line of sight. HSI materially improves fuel chemistry–sensitive signals and severity discrimination where tasked; MSI remains the backbone for broad-area monitoring.',
      layers: [
        'Fuel Moisture Layer (Cw-derived)',
        'Dry Matter Accumulation (Cm)',
        'Wildfire Risk Score',
        'Burn Scar Mapping',
        'Fire Severity Classification',
        'Canopy Recovery Tracking',
      ],
      decision:
        'Pre-fire risk briefings, post-fire damage assessment, restoration prioritization.',
      warning: {
        type: 'warn',
        text:
          'Fuel and severity proxies are not operational fire spread models; integrate with official incident data and local fire authorities for life-safety decisions.',
      },
      customerSegments:
        'Electric utilities and wildland–urban interface planners; state and provincial forest agencies; reinsurers modeling wildfire exposure; restoration contractors tracking burn scar recovery.',
    },
    {
      id: '04',
      name: 'ARR & Restoration Monitoring',
      tagline: 'Afforestation and reforestation accounting with counterfactual baselines.',
      badge: 'Q3 2026',
      badgeColor: 'amber',
      body:
        'Monitoring for ARR and restoration projects: we track canopy establishment, leaf area and fractional cover trajectories, height progression where available, and biomass accumulation against a counterfactual baseline built from comparable untreated areas nearby. The goal is transparent, audit-friendly reporting — showing incremental gain relative to what would likely have happened without intervention — while being honest about sensor limits, seasonality, and the difference between exploration monitoring and credit-grade MRV.',
      layers: [
        'Canopy Establishment Layer',
        'LAI + FVC Trajectory',
        'ARR Carbon Accumulation',
        'Counterfactual Baseline',
        'Canopy Height Progression',
      ],
      decision:
        'Restoration program reporting, additionality evidence, donor and registry updates.',
      warning: {
        type: 'warn',
        text:
          'Counterfactual baselines and ARR trajectories are monitoring-grade until validation and MRV methodology are agreed with the registry or buyer; do not imply credit issuance.',
      },
      customerSegments:
        'Carbon project developers on ARR; bilateral and multilateral climate funds; impact investors tracking restoration KPIs; government reforestation programs.',
    },
  ],

  water: [
    {
      id: '01',
      name: 'General Water Quality',
      tagline: 'Optical and non-optical water column state, today.',
      badge: 'Live',
      badgeColor: 'green',
      body:
        'Physics-first water-column analytics: HydroLight inversion yields chlorophyll-a, phycocyanin, CDOM, TSM, turbidity, Secchi depth, inherent optical properties, and remote-sensing reflectance — the full chain needed for regulatory and operational water-quality workflows, not just a single index. Non-optical extensions provide pH, dissolved oxygen, and ammonia where models are validated for your domain. Shallow or optically complex waters may need AOI-specific calibration and field pairing before promises are made.',
      layers: [
        'Chlorophyll-a',
        'Phycocyanin',
        'CDOM',
        'Total Suspended Matter',
        'Turbidity',
        'Secchi Depth',
        'IOPs (a · bb)',
        'Rrs',
        'Non-optical: pH · DO · Ammonia',
      ],
      decision:
        'Drinking-water source monitoring, aquaculture site management, regulatory compliance.',
      warning: {
        type: 'warn',
        text:
          'Shallow, turbid, or optically complex waters may need AOI-specific calibration and field pairing before regulatory-grade claims; non-optical quantities remain model-extended where noted.',
      },
      customerSegments:
        'Municipal water utilities and watershed districts; state and provincial environment agencies; aquaculture operators; hydropower and industrial intake operators monitoring source quality.',
    },
    {
      id: '02',
      name: 'HAB Monitor & Forecast',
      tagline: 'Bloom classification today; forecasting in scoping.',
      badge: 'Q3 2026 · Forecast TBD',
      badgeColor: 'amber',
      body:
        'Operational bloom intelligence today: classification, spatial extent, severity scoring, risk-zone mapping, and temporal trend views built on phycocyanin and optical bloom signatures suitable for utilities and public-health stakeholders. Forecasting — when and where a bloom will peak — is a separate science and product track; methodology and validation are not locked, so proposals must sell monitoring and early detection, not a guaranteed forecast horizon. Deliverables emphasize actionable maps, thresholds, and change alerts tied to defensible optical retrievals.',
      layers: [
        'HAB Classification Layer',
        'Bloom Extent Mapping',
        'Bloom Severity Score',
        'Phycocyanin',
        'Risk Zone Mapping',
        'Temporal Trend',
      ],
      warning: {
        type: 'warn',
        text:
          'HAB forecasting is in scoping. Do not commit to forecasting capability until methodology and validation timeline are confirmed.',
      },
      decision:
        'Public-health early warning, drinking-water utility response, recreational-water advisories.',
      customerSegments:
        'Drinking-water utilities facing HAB risk; state health and environment departments; lake associations and reservoir operators; insurers with recreational-water exposure.',
    },
    {
      id: '03',
      name: 'Benthic Mapping',
      tagline: 'Substrate, seagrass, and shallow-water characterization.',
      badge: 'Scoping',
      badgeColor: 'dim',
      body:
        'Intended scope: shallow-water substrate classification, seagrass extent and condition, and bottom visibility–limited mapping where bathymetry and optical depth allow retrievals to remain physical. Product packaging, validation density, and commercial SLA are not finalized — expect bespoke science effort, partner hydrographic data, and clear AOI scoping before quoting delivery.',
      scaffold:
        'In scoping. Do not include in proposals without checking current status with the analytics team.',
      decision:
        'Which benthic metrics to prioritize, where to invest in validation, and how to scope bathymetry and field campaigns.',
      warning: {
        type: 'warn',
        text:
          'Not a fixed product package. Confirm science readiness, bathymetry availability, and validation plan with the water team before quoting delivery or SLAs.',
      },
      customerSegments:
        'Coastal and marine resource agencies; offshore wind, cable, and dredging developers; NGOs monitoring seagrass and shallow habitat; research programs with co-funded calibration.',
    },
    {
      id: '04',
      name: 'Coastal & Wetland Change',
      tagline: 'Shoreline movement, inundation extent, and wetland change detection.',
      badge: 'Scoping',
      badgeColor: 'dim',
      body:
        'Intended scope: multi-temporal shoreline and wetland boundary change, episodic inundation extent, and marsh or mudflat degradation signals where tidal and atmospheric contamination can be controlled. Mixed land–water interfaces and fine-scale hydrology usually require project-specific validation and sometimes fusion with radar or lidar; treat timelines and accuracy claims as negotiation items until the package graduates from scoping.',
      scaffold:
        'In scoping. Do not include in proposals without checking current status with the analytics team.',
      decision:
        'Shoreline and wetland change priorities, episodic inundation risk, and where fusion with radar or lidar is required.',
      warning: {
        type: 'warn',
        text:
          'Tidal mixing, mixed land–water pixels, and fine hydrology often require project-specific validation; timelines and accuracy are negotiation items until the package graduates from scoping.',
      },
      customerSegments:
        'Coastal zone management agencies; wetland mitigation banks; ports and navigation authorities; climate adaptation programs tracking shoreline retreat.',
    },
  ],

  mining: [
    {
      id: '01',
      name: 'Mining Lifecycle Monitor',
      tagline: 'Continuous site monitoring across the full mine lifecycle.',
      badge: 'Piloting',
      badgeColor: 'amber',
      body:
        'Base monitoring package for operational mine sites: evaporation pond condition, tailings storage facility change, waste dump characterization, pit wall surface condition, and acid mine drainage precursor signals. VNIR detects oxidation fronts and iron-sulfate precipitation well before surface change is visible in broadband imagery. SWIR (Honeybee) adds oxidation state discrimination and specific AMD mineral indicators (jarosite, schwertmannite). Designed for ESG reporting, regulatory compliance evidence, and operational safety — not geotechnical instrumentation replacement.',
      layers: [
        'Site Boundary API',
        'Evaporation Pond Monitoring API',
        'Tailings Monitoring API',
        'Waste Dump Characterization API',
        'Pit Wall / Slope Mapping API',
        'Water / Contamination Indicator API',
        'Confidence API',
        'Evidence API',
      ],
      decision:
        'Which surface change signals to operationalize for ESG, compliance, or safety workflows; how to integrate with site GIS and alert thresholds.',
      warning: {
        type: 'warn',
        text:
          'Unified package and standard reporting templates are still being finalized. Expect bespoke integration with site GIS, client-specific alert thresholds, and safety constraints on revisit and dissemination.',
      },
      customerSegments:
        'Major mining operators and ESG teams; tailings and dam-safety engineers; environmental consultancies on long-term closure; regulators requiring periodic remote monitoring.',
    },
    {
      id: '02',
      name: 'Rehabilitation & Closure Monitor',
      tagline: 'Restoration trajectory tracking for mine closure compliance.',
      badge: 'Piloting',
      badgeColor: 'amber',
      body:
        'Tracks vegetation re-establishment and surface recovery across rehabilitated mine areas. VNIR detects chlorophyll emergence and canopy water return earlier than MSI broadband greenness. SWIR on Honeybee adds structural recovery metrics (Cm, lignin return) needed to track progression from initial revegetation to structural maturity required for closure certification evidence. Add-on to the core Mining Lifecycle Monitor subscription.',
      layers: [
        'Site Boundary API',
        'Rehabilitation Progress API',
        'Confidence API',
      ],
      decision:
        'Whether rehabilitation trajectories meet closure plan milestones; where targeted intervention or re-seeding is required.',
      warning: {
        type: 'warn',
        text:
          'Closure certification requires independent validation against approved closure plan. Pixxel outputs are supporting evidence, not regulatory certification.',
      },
      customerSegments:
        'Mine closure teams; environmental compliance officers; regulators and government agencies requiring periodic rehabilitation evidence.',
    },
  ],

  geology: [
    {
      id: '01',
      name: 'Mineral Prospecting (VNIR)',
      tagline: 'Surface mineralogy and alteration mapping.',
      badge: 'Built · Deployment TBD',
      badgeColor: 'amber',
      body:
        'Exploration-grade surface mineralogy from VNIR: iron oxide and gossan indicators, hydrothermal alteration footprints, clay proxies where VNIR is informative, and a spectral anomaly layer for ranking follow-up ground work. Outputs are maps and target lists for generative exploration — not drill targeting or resource estimation on their own. The stack is technically built; customer-facing packaging and Aurora delivery sequencing still gate how quickly we standardize deployments across accounts.',
      layers: [
        'Iron Oxide Index',
        'Gossan Indicator',
        'Hydrothermal Alteration Zones',
        'Clay Mineral Proxies (VNIR)',
        'Surface Mineralogy Mapping',
        'Spectral Anomaly Layer',
      ],
      warning: {
        type: 'warn',
        text:
          'Exploration-grade. Suitable for target generation and priority-zone ranking, not drill-ready resource estimation. Aurora platform coordination required.',
      },
      decision:
        'Exploration target generation, priority-zone ranking, follow-up survey planning.',
      customerSegments:
        'Junior and mid-tier mining explorers; government geological surveys; consultants generating grass-roots targets; joint ventures where VNIR screening precedes ground geophysics.',
    },
    {
      id: '02',
      name: 'REE & Critical Mineral Mapping',
      tagline: 'Rare-earth and critical mineral surface indicators.',
      badge: 'Exploration Grade',
      badgeColor: 'amber',
      body:
        'Regional reconnaissance for rare earths and critical minerals using VNIR surface proxies: REE indicator surfaces, carbonatite and alkaline intrusion signatures where they express optically, generic critical-mineral surficial traces, and a per-pixel spectral confidence layer so analysts know where the signal is thin. VNIR alone cannot see many key absorption features — SWIR on Honeybee is the path to materially sharper REE discrimination. Position this as prioritization and belt-scale screening, not assay replacement.',
      layers: [
        'REE Indicator Layer (VNIR)',
        'Carbonatite Proxies',
        'Alkaline Intrusion Mapping',
        'Critical Mineral Surface Proxies',
        'Spectral Confidence Layer',
      ],
      warning: {
        type: 'warn',
        text:
          'SWIR-grade REE mapping awaits Honeybee (2027+). Communicate uncertainty and validation limits clearly.',
      },
      decision:
        'Critical-mineral exploration prioritization, regional reconnaissance, government strategic-resource programs.',
      customerSegments:
        'Critical-mineral explorers and state geological programs; supply-chain security teams in defense and energy; development finance tracking resource corridors.',
    },
    {
      id: '03',
      name: 'Mining Lifecycle Monitoring',
      tagline: 'Operational monitoring across the mine lifecycle.',
      badge: 'Scoping',
      badgeColor: 'dim',
      body:
        'Mine-site lifecycle analytics as a modular stack: evaporation pond extent and change, tailings facility growth and surface state, waste-dump evolution, pit wall and slope stability–relevant geometry, rehabilitation greening and grading signals, and AMD-relevant spectral and contextual indicators. Individual layers are deliverable today on bespoke SOWs; the unified product bundle, alert semantics, and standard reporting templates are still being defined — expect custom integration with site GIS, safety constraints on revisit, and client-specific thresholds.',
      layers: [
        'Evaporation Pond Monitoring',
        'Tailings Storage Facility Change',
        'Waste Dump Characterization',
        'Pit Wall & Slope Mapping',
        'Rehabilitation Progress Tracking',
        'Acid Mine Drainage Indicators',
      ],
      scaffold:
        'In scoping. Individual layers can be delivered today on a bespoke basis; productized package timeline is TBD.',
      decision:
        'Which mine-site change signals to operationalize first, and how to align alerts with site GIS, safety, and environmental compliance workflows.',
      warning: {
        type: 'warn',
        text:
          'Unified alerts and standard reporting templates are not finalized; expect bespoke integration, client-specific thresholds, and safety constraints on revisit and dissemination.',
      },
      customerSegments:
        'Major mining operators and ESG teams; tailings and dam-safety engineers; environmental consultancies on long-term closure; regulators requiring periodic remote monitoring.',
    },
  ],

  defense: [
    {
      id: '01',
      name: 'Change & Anomaly Detection',
      tagline: 'Persistent change, activity signatures, denied-area monitoring.',
      badge: 'Piloting',
      badgeColor: 'amber',
      body:
        'Persistent monitoring for sites and AOIs: multi-temporal change, disturbance taxonomy, and activity signatures layered on SSE-derived baselines so “normal” is archive-grounded, not a single-date snapshot. Ranked anomaly scores and change vectors support triage when collections are irregular. HSI adds material-level discrimination — surface treatments, fill, or camouflage that MSI treats as generic change — and highlights spectral outliers inconsistent with declared land use. All outputs are pilot-grade: tasking cadence, classification thresholds, and reporting format should be co-designed per mission owner.',
      layers: [
        'Multi-temporal Change Layer',
        'Surface Disturbance Classification',
        'Activity Signature Detection',
        'Site Baseline (SSE-derived)',
        'Anomaly Confidence Score',
        'Change Magnitude + Direction',
        'Denied-Area Monitoring',
      ],
      decision:
        'Site activity monitoring, early warning of infrastructure development, pattern-of-life analysis, treaty compliance monitoring.',
      warning: {
        type: 'warn',
        text:
          'Pilot-grade outputs require mission-specific thresholds, cleared dissemination paths, and analyst-in-the-loop review — not autonomous enforcement or targeting decisions.',
      },
      customerSegments:
        'National security and defense organizations; border and maritime monitoring programs; civilian agencies with lawful GEOINT mandates; prime integrators under appropriate compliance frameworks.',
    },
    {
      id: '02',
      name: 'Object & Facility Recognition',
      tagline: 'Airport, runway, and facility characterization.',
      badge: 'Piloting',
      badgeColor: 'amber',
      body:
        'Infrastructure characterization from overhead imagery: runway and apron geometry with condition-oriented descriptors, facility footprints suitable for change tracking, and an embedding-backed index for similarity search across time and collect — find “sites like this one” or match a reference installation. HSI contributes surface material and coating signatures where tasked. Intended for operational assessment, inventory, and planning support — not autonomous targeting; human analysts remain in the loop for interpretation and rules of engagement.',
      layers: [
        'Runway Mapping + Condition Assessment',
        'Apron + Taxiway Characterization',
        'Facility Footprint Extraction',
        'Object Embedding Index (SSE)',
        'Cross-archive Similarity Search',
        'Infrastructure Classification',
        'Surface Material Characterization (HSI)',
      ],
      decision:
        'Air-base operational assessment, logistics infrastructure mapping, cross-region facility inventory, mission planning support.',
      warning: {
        type: 'warn',
        text:
          'Human analysts remain in the loop for interpretation, ROE, and collateral concerns; similarity search can surface look-alikes that still require full-source verification.',
      },
      customerSegments:
        'Air component and joint staffs; civil aviation and airport security planners; engineering and logistics commands; allied partners with shared disclosure agreements.',
    },
    {
      id: '03',
      name: 'Terrain & Mobility Analysis',
      tagline: 'Soil tankability, trafficability, and seasonal mobility windows.',
      badge: 'Piloting',
      badgeColor: 'amber',
      body:
        'Mobility-oriented terrain analytics: canopy–soil moisture proxies, HSI soil texture and composition hints where signal allows, fused bearing-capacity and tankability indices, trafficability classes, and seasonally varying mobility windows driven by moisture and freeze–thaw patterns. Outputs are geospatial layers and summary scores meant for route and corridor planning — they complement, not replace, engineering soils data, engineering reconnaissance, and command risk acceptance.',
      layers: [
        'Soil Moisture (Cw-derived)',
        'Soil Texture Proxies (HSI)',
        'Bearing Capacity Indicators',
        'Tankability Score',
        'Trafficability Classification',
        'Seasonal Mobility Windows',
        'Terrain Classification',
      ],
      decision:
        'Route planning, ground-force maneuver assessment, logistics corridor identification, seasonal access window planning.',
      warning: {
        type: 'warn',
        text:
          'Mobility indices complement — do not replace — engineering soils data, route reconnaissance, and command risk acceptance; freeze–thaw and moisture windows are climatological cues only.',
      },
      customerSegments:
        'Maneuver and engineer formations; humanitarian and disaster access planners; logistics corridors in data-sparse regions; training and wargaming organizations using GEOINT proxies.',
    },
  ],
};

/** Bump when default claims copy changes; stale persisted state resets from seed. */
export const CLAIMS_VERSION = 4;

export const claims = {
  agriculture: {
    now: [
      'PROSAIL-derived LAI, Cab, FVC from MSI with calibrated uncertainty — deployable on bespoke AOIs; regional validation varies',
      'Full PROSAIL suite from HSI (Cw, Cm, Car, N/P/K) for tasked AOIs — inventory grade where validated',
      'Farm boundary model and crop type classification — deployable where regional models or ground-truth exist',
      'Coarse field-level stress and health scoring from MSI traits and indices — severity-style signals, not ranked cause attribution',
      'DINOv3 embedding-based change and anomaly detection on selected dates or short time stacks — AOI-scoped, not full-archive operational monitoring',
      'Individual layer delivery integrated into customer workflows on a bespoke per-engagement basis',
    ],
    eoy: [
      'Field Stress Monitor: full anomaly → event → attribution pipeline, configurable per crop and region',
      'Precision Intervention Advisor: HSI-grade prescriptive recommendations with spectral evidence chains',
      'Cause-of-Loss Evidence Package: defensible, auditable, sensor-tier-flagged insurance outputs',
      'Portfolio Risk Aggregation: multi-field risk scoring with spatial correlation adjustment',
      'Yield Risk Assessment: phenology-weighted cumulative stress scoring across the season',
    ],
    never: [
      'Absolute yield forecast in bushels per acre — we produce yield risk scores, not yield predictions',
      'Ranked stress driver attribution or insurance-grade cause-of-loss narrative before Field Stress Monitor ships',
      'Full-archive MSI change monitoring or event typing — Context Engine and expected-state baselines not live yet',
      'Disease species identification without ground-truth validation data',
      'Real-time monitoring — we are task-triggered, not continuous global surveillance',
    ],
  },
  forestry: {
    now: [
      'SAR-based forest above-ground biomass (fAGB) at 30 m — deployable on bespoke AOIs; exploration grade for carbon accounting, not credit issuance',
      'Deep-learning canopy height model — deployable on bespoke AOIs; regional accuracy varies',
      'Forest species and forest-type classification from optical stacks — deployable where training coverage exists; not registry-grade without validation',
      'PROSAIL canopy inversion (LAI, cab, cw, and related traits) from MSI and tasked HSI',
      'Index-derived burn scar, severity, and disturbance proxies (e.g. dNBR-class indices) on selected scenes — not a continuous fire monitoring product',
      'AOI-scoped forest change and anomaly signals (including DINOv3 embeddings where used) — not full-archive operational alerting',
      'Individual forest layers delivered on a bespoke per-engagement basis',
    ],
    eoy: [
      'Deforestation & Degradation Alerting: persistent MSI monitoring, operational degradation-trend layers, FIRMS corroboration, and preliminary disturbance classes',
      'Wildfire Risk & Recovery: fuel proxies, composite risk scoring, PROSAIL-informed severity, and recovery tracking (MSI backbone; HSI where tasked)',
      'ARR & Restoration Monitoring: establishment, growth trajectories, and counterfactual baselines — exploration grade',
      'Carbon MRV package: SAR fAGB + structure + uncertainty workflow for portfolio triage — still exploration until Honeybee validation',
    ],
    never: [
      'MRV-grade carbon stock estimates suitable for credit issuance — gated on SWIR (Honeybee), 2027+',
      'Operational BFAST-style degradation trends or FIRMS-linked alert corroboration before D&D Alerting ships',
      'Mechanical vs biological disturbance attribution at enforcement-grade confidence before D&D Alerting ships',
      'Continuous global forest surveillance — monitoring is AOI- and archive-scoped, not planet-scale operations',
      'Operational wildfire spread models or life-safety fire prediction — integrate official incident data',
      'Replacing carbon registry auditors or third-party verifiers',
      'Species or type maps sold as registry- or enforcement-grade without regional validation and ground-truth',
    ],
  },
  water: {
    now: [
      'Optical water quality (Chl-a, phycocyanin, CDOM, TSM, turbidity, Secchi, IOPs, Rrs) — deployable today',
      'Non-optical water quality models (pH, DO, ammonia) — deployable today',
      'HAB-relevant pigment retrievals (phycocyanin, chlorophyll-a) — deployable today',
      'Individual layers delivered on a bespoke per-engagement basis',
    ],
    eoy: [
      'General Water Quality: productized optical and non-optical state for inland and coastal waters',
      'HAB Monitor: bloom classification, extent, severity scoring, risk-zone mapping, and temporal trends',
      'HAB Forecasting: forward-looking bloom risk and peak-timing products — methodology and validation per water body',
      'Benthic Mapping: shallow-water substrate, seagrass extent and condition, and bathymetry-limited bottom characterization',
    ],
    never: [
      'HAB forecast horizons or regulatory-grade bloom predictions without validated methodology for that water body',
      'Benthic or seagrass maps sold as survey- or regulatory-grade without bathymetry, field validation, and AOI scoping',
      'Drinking-water safety determinations — we provide signal, the utility makes the call',
    ],
  },
  mining: {
    now: [
      'Tailings and waste-dump surface condition monitoring via VNIR mineralogical change signals — piloting',
      'Evaporation pond extent and condition tracking — piloting',
      'AMD / contamination proxy (iron oxide, sulfate precipitation) in drainage paths — piloting',
    ],
    eoy: [
      'Mining Lifecycle Monitor: unified continuous-monitoring package with standardized ESG reporting templates',
      'Rehabilitation Progress API: canopy water and chlorophyll emergence tracking for closure monitoring',
    ],
    never: [
      'Geotechnical slope stability assessments requiring structural instruments — we provide surface signal, not subsurface',
      'Regulatory compliance certification — we provide supporting evidence, client retains compliance responsibility',
      'Drill-targeting or resource estimation from monitoring outputs',
    ],
  },
  geology: {
    now: [
      'VNIR-based surface mineralogy, alteration mapping, and iron oxide / gossan indicators — built, SSE Campaign packaging in scoping',
      'REE and critical-mineral surface proxy indicators — exploration grade; explicit per-pixel spectral uncertainty included',
      'Prospectivity scoring and spectral similarity search (SSE) — scoping',
    ],
    eoy: [
      'Geology Campaign Package: productized SSE Campaign with defined delivery scope and Aurora dashboard access',
      'REE Proxy API with VNIR Nd continuum removal and carbonatite / alkaline intrusion prospectivity',
    ],
    never: [
      'SWIR-grade mineral mapping or drill-ready resource estimation — gated on Honeybee, 2027+',
      'Mineral certification or assay replacement — spectral output is screening, not ground-truth',
      'Replacing field geological surveys or airborne geophysics campaigns',
    ],
  },
  mining: {
    now: [
      'Tailings and waste-dump surface condition monitoring via VNIR mineralogical change signals — piloting',
      'Evaporation pond extent and condition tracking — piloting',
      'AMD / contamination proxy (iron oxide, sulfate precipitation) in drainage paths — piloting',
    ],
    eoy: [
      'Mining Lifecycle Monitor: unified continuous-monitoring package with standardized ESG reporting templates',
      'Rehabilitation Progress API: canopy water and chlorophyll emergence tracking for closure monitoring',
    ],
    never: [
      'Geotechnical slope stability assessments requiring structural instruments — we provide surface signal, not subsurface',
      'Regulatory compliance certification — we provide supporting evidence, client retains compliance responsibility',
      'Drill-targeting or resource estimation from monitoring outputs',
    ],
  },
  defense: {
    now: [
      'Site anomaly detection, change detection, and event classification over piloted AOIs — piloting',
      'Object detection (vehicles, aircraft, vessels) and facility footprint extraction — piloting',
      'Soil moisture, terrain classification, and trafficability proxies — piloting',
    ],
    eoy: [
      'Site Intelligence Monitor: productized core API suite with documented uncertainty bounds and delivery SLAs',
      'Mobility & Terrain add-ons: soil moisture, bearing capacity, terrain class, and trafficability assessments',
    ],
    never: [
      'Real-time targeting or kinetic decision support',
      'Personnel identification or face/biometric analysis',
      'Operational claims that exceed pilot-validated AOIs and ITAR/export-control constraints',
    ],
  },
};

export const universalNeverClaims = [
  'MRV-grade carbon before SWIR (Honeybee) operational',
  'HAB forecasting before methodology and validation timeline confirmed',
  'SWIR mineral mapping before Honeybee constellation operational',
  'Replacing insurance adjudicators or carbon registry auditors',
  'Real-time / continuous global monitoring',
];

export const objections = [
  {
    q: 'We already use Sentinel-2 / satellite data.',
    a:
      'Sentinel-2 is the foundation of our MSI baseline — we use it too, with 13+ years indexed per field. The difference is what we do with it: PROSAIL-derived biophysical traits (LAI, Cab, FVC) instead of generic indices, a field-specific Context Engine baseline that compares the field to itself across years, and an HSI upgrade that resolves nutrient-vs-water ambiguity that MSI physically cannot.',
  },
  {
    q: 'You are a startup — are your capabilities actually validated?',
    a:
      'Honest answer: many capabilities are validated, some are still being validated. PROSAIL retrievals are well-established remote sensing physics, and HydroLight inversion for water quality is similarly canonical. Where regional accuracy work is still in progress we say so, label outputs exploration grade, and prefer pilots with early adopters who can help us close the loop faster.',
  },
  {
    q: 'Can you do MRV-grade carbon?',
    a:
      'Not yet. V1 AGB and carbon stock estimates are exploration grade — useful for portfolio triage and ground-verification prioritization. MRV-grade outputs require SWIR (Honeybee) plus field validation, which is a 2027+ capability. We will not promise MRV-grade carbon before that.',
  },
  {
    q: 'What is your accuracy?',
    a:
      'This requires a specific answer, not a single headline number. What we can say depends on what is being measured, which sensor tier (MSI vs HSI), and whether regional validation is complete for that AOI. For LAI from MSI we report calibrated uncertainty bounds; for HSI nutrient layers we report ranked causal hypotheses with spectral evidence. Ask us for the specific layer and AOI and we will give a defensible, caveated answer — we are not publishing blanket accuracy percentages in this playbook yet.',
  },
  {
    q: 'How is this different from other geospatial platforms?',
    a:
      'Other platforms sell pixels, regional-scale analytics, or learned embeddings without physical interpretability. NEXUS is hyper-local (the baseline is your field, not a regional model), physically grounded (PROSAIL traits, HydroLight inversion), and queryable through semantic search over your AOI history. The output is decision-ready evidence, not an opaque score from a black-box classifier.',
  },
  {
    q: 'Do you need farm management or ground truth data?',
    a:
      'No. The core intelligence is fully operational on satellite data alone, with optional MicroClim corroboration. Ground truth helps us tighten regional accuracy and is welcome where it is available, but it is not a deployment prerequisite.',
  },
  {
    q: 'Can you do continuous or real-time monitoring?',
    a:
      'We are task-triggered and AOI-scoped, not continuous global surveillance. For most agronomic and risk decisions that is the right cadence; we will be honest about it instead of promising real-time when our revisit and processing windows do not support it.',
  },
];

export const home = {
  eyebrow: 'Analytics Division · Pixxel Space Technologies',
  title: "Building the world's first hyperspectral earth intelligence backbone.",
  body: [
    'The Pixxel Analytics team is a multinational team of people split across the US and India, working across five verticals: agriculture, forestry, water, geology, and defense. We pair remote sensing physics with machine learning and applied earth science to turn satellite observations into decision-ready evidence.',
    'This playbook is the commercial team\'s shared reference for what we sell today, what is shipping by 2027, and how to talk about it honestly. It is internal and intended to evolve as we do — narrative and catalog updates ship through the repo; the Pilot Pricing Calculator stays editable in the app for pilots.',
  ],
  whatWeDo: [
    {
      title: 'Geospatial AI',
      body:
        'NEXUS field intelligence (cube + semantic query), MicroClim integration, and the pipeline that turns acquisitions into queryable evidence.',
    },
    {
      title: 'Applied Science',
      body:
        'PROSAIL inversion, HydroLight retrievals, attribution physics, and the validation work that lets us label outputs inventory or exploration grade with honesty.',
    },
    {
      title: 'Commercial Delivery',
      body:
        'Bespoke integrations today, productized packages by end of 2026 — both backed by the same engines and the same evidence chain.',
    },
    {
      title: 'Research & Validation',
      body:
        'Regional accuracy programs, early-adopter pilots, ground-truth partnerships, and the feedback loop that drives every claim we make.',
    },
  ],
  howToUse: [
    {
      id: 'layers',
      title: 'API Catalog',
      body: 'Every analytics API endpoint in the seed catalog: vertical, kind (Core / Add-on), tier, status, API-ready date, and list rate — filterable; data lives in code.',
    },
    {
      id: 'nexus',
      title: 'NEXUS - NORTH STAR',
      body: 'White paper: unified field intelligence (cube + semantic query), ontology, build status, and roadmap.',
    },
    {
      id: 'sse',
      title: 'LENS · Semantic search',
      body: 'Semantic retrieval over the customer archive, GeoFM embeddings, and the V1–V4 engineering roadmap.',
    },
    {
      id: 'microclim',
      title: 'MICROCLIM-WEATHER',
      body: 'Downscaled weather products and how they corroborate satellite layers.',
    },
    {
      id: 'agriculture',
      title: 'TRACE · Agriculture',
      body: 'Crop trait retrieval, phenology, PROSAIL biophysical variables, and monitoring subscription.',
    },
    {
      id: 'bespoke-projects',
      title: 'Bespoke projects & pipeline',
      body: 'Contract-based work, sales pipeline stages, and where defense and intelligence use cases fit outside standard product tracks.',
    },
    {
      id: 'commercial-requests',
      title: 'Commercial requests',
      body: 'File exhibit and marketing asks; creates a Linear ticket when Vercel + Linear env are configured.',
    },
  ],
  warn:
    'We are still primarily an R&D-stage analytics team delivering bespoke solutions while we build toward productized delivery. Never overclaim maturity.',
};

export const nexus = {
  whitePaper: {
    eyebrow: 'Overview · NEXUS white paper',
    title: 'Field-level intelligence that compounds.',
    subtitle:
      'NEXUS is Pixxel\'s field-level intelligence system: a persistent intelligence cube for every monitored place, plus semantic query over that history. One product, not a database of scenes and a separate search engine.',
    sseLinkLabel: 'Semantic query capabilities and version roadmap',
  },
  unified: {
    title: 'What NEXUS is',
    intro:
      'NEXUS is a field intelligence system with two interdependent parts: an intelligence cube that accumulates a persistent, physically-grounded time series for every monitored place, and a semantic query layer that makes that history searchable in ways no pre-specified alert rule can replicate. The cube is the memory; the query layer is the intelligence that makes the memory actionable.',
    components: [
      {
        title: 'Intelligence cube',
        body:
          'At customer onboarding, the full MSI archive for each AOI is ingested and PROSAIL inversion (vegetation), HydroLight inversion (water), SAR structural context, and MicroClim forcing are applied across the entire time series. The cube a customer receives on day one reflects over 13 years of that location\'s biophysical history. Every subsequent acquisition deepens a record that already knows the field.',
      },
      {
        title: 'Semantic query layer',
        body:
          'DINOv3 embeddings operate over physically retrieved biophysical state vectors, not raw pixels. Similar states sit close in embedding space. The pattern-matching happens in a physically grounded domain: trajectory queries, historical analogues, and anomaly retrieval all index over PROSAIL and HydroLight outputs, not spectral appearance alone.',
      },
    ],
    inseparable:
      'The cube without query is a database you can only interrogate with fixed rules. The query layer without cube history has nothing meaningful to search. One system.',
    onboardingCallout:
      'NEXUS does not have a cold-start problem. At onboarding, PROSAIL inversion, SAR fusion, and MicroClim forcing are applied retroactively across the full MSI archive — typically 13+ years of that AOI\'s biophysical history. Day one delivers baseline intelligence and anomaly detection grounded in a place\'s own record. HSI tasking begins precision-upgrading a cube that already knows the location.',
  },
  ontology: {
    title: 'Objects, not pixels',
    intro:
      'Most Earth observation systems treat the planet as a grid of pixels that change value over time. Each satellite pass produces a new map, analysts compare maps, and change is inferred after the fact. That approach has no memory, no field identity, and no sense of what a specific place is supposed to look like.',
    principle:
      'NEXUS operates on an ontological principle: the world is a collection of persistent, meaningful objects (a rice paddy in Madhya Pradesh, a forest stand in the Congo Basin, a reservoir in California). Each has an identity, a history, and a trajectory. An intelligence system\'s job is not to produce maps but to know those objects deeply enough to detect anomalies, attribute causes, and surface patterns no one thought to look for when the data was collected.',
    technical:
      'Technically: every monitored location has a persistent identity, every observation attaches to that identity, and every derived insight (a stress score, an attribution, a prescription) is grounded in the full history of that specific location rather than a generic model applied from above.',
    plainLanguage:
      'That is what ontology means here: structured identity and meaning, not just data with timestamps.',
    contrast: {
      pixelLabel: 'Pixel-grid view',
      objectLabel: 'Object (ontology) view',
      pixel: [
        'A fresh map every satellite pass',
        'Change inferred by differencing two scenes',
        'No durable identity for a given field',
        'Regional model applied from above',
      ],
      object: [
        'One persistent record per field, stand, or AOI',
        'Anomalies read against that place\'s own history',
        'Stable identity every observation attaches to',
        'Insight grounded in the location\'s full trajectory',
      ],
    },
  },
  problem: {
    title: 'Geospatial intelligence is broken at the field scale.',
    intro:
      'Every customer engagement repeats the same work, ships regional models against local realities, and hands over outputs that buyers cannot defend. That is the gap NEXUS exists to close.',
    cards: [
      { title: 'Repeated Learning', body: 'Every customer engagement re-trains models that should already exist as platform primitives.' },
      { title: 'Regional Not Local', body: 'Regional models are applied to single fields and farms, smoothing over the variation customers actually care about.' },
      { title: 'Black Box Outputs', body: 'Classifier outputs without physical interpretability are unusable for insurance adjudication, registries, or audits.' },
      { title: 'Bespoke Pipelines', body: 'Each engagement spins up a new pipeline instead of stacking on a shared evidence layer.' },
      { title: 'Indices Not Physics', body: 'NDVI and friends summarize symptoms; PROSAIL and HydroLight retrievals express physiochemical state from radiative transfer.' },
      { title: 'Scale Without Precision', body: 'Global coverage at low specificity wins demos but loses procurement.' },
    ],
    callout:
      'NEXUS replaces this with hyper-local, physically grounded field intelligence you can query. Built once per AOI, deepened with every acquisition.',
  },
  capabilities: {
    title: 'What NEXUS does',
    intro:
      'Capabilities, not separate product names. The same system delivers identity, accumulation, interpretation, and evidence.',
    pillars: [
      { num: '01', title: 'Persistent identity', body: 'Every monitored location has a stable object record, not a one-off scene stack.' },
      { num: '02', title: 'Historical accumulation', body: 'Multimodal time series deepens with every clear acquisition and every engine run.' },
      { num: '03', title: 'Semantic querying', body: 'Similarity, trajectory, analogue, and anomaly-style questions over biophysical state, not pixel thresholds alone.' },
      { num: '04', title: 'Climate-conditioned interpretation', body: 'MicroClim forcing fused into the cube so biological signals read as signals, not isolated index moves.' },
      { num: '05', title: 'Decision-ready evidence', body: 'Onset windows, uncertainty, sensor tier, and audit-friendly lineage on outputs.' },
    ],
    queryContrast: {
      old: [
        { title: 'Pixel queries', quote: 'Show me pixels where NDVI dropped by more than 0.2.' },
        { title: 'Change detection', quote: 'Detect change between two scenes.' },
        { title: 'Surface classification', quote: 'Classify this surface into a label.' },
      ],
      nexus: [
        {
          title: 'State similarity',
          quote:
            'Show me every location in this district following the same trajectory as the worst-performing fields from last season.',
        },
        {
          title: 'Trajectory matching',
          quote:
            'Find areas within this project following the same trajectory as this known degradation event.',
        },
        {
          title: 'Spectral analogue',
          quote: 'Find locations in this AOI with a state similar to this reference sample.',
        },
      ],
    },
    queryFootnote:
      'Semantic query is scoped to the customer\'s monitored AOI only. It is not planetary open-world search. Detail by version: see the semantic query roadmap page.',
  },
  physicsIntro:
    'The intelligence cube is built on radiative transfer physics, not pattern matching on spectral indices alone. Vegetation uses PROSAIL canopy inversion; waterbodies use HydroLight aquatic optical modeling (operationalized via a validated deep-learning emulator for computational tractability at scale); geology uses spectral unmixing where applicable. Every retrieval traces back to a physical model with known assumptions and documented uncertainty.',
  physicsVsDinov3:
    'NEXUS uses DINOv3 embeddings in its semantic query layer — a learned model. This does not contradict the physics-first positioning. The embeddings operate over PROSAIL and HydroLight retrieved state vectors, not raw pixel reflectance. The deep-learning emulator for HydroLight is a computational accelerant for physics-grade retrieval, not a replacement for it. Pattern matching happens in a physically grounded space: two states are semantically similar because their biophysical retrievals are similar, not because their spectral appearances happen to cluster.',
  physicsAudit:
    'Every number traces back to a physical model (PROSAIL, HydroLight, or domain-appropriate inversion) with known assumptions and documented uncertainty. That is the difference between a product that survives expert scrutiny and one that does not.',
  inputs: {
    title: 'What feeds the cube',
    items: [
      'Hyperspectral optical: Firefly VNIR (470–900 nm); Honeybee VNIR-SWIR (470–2500 nm, 2027+)',
      'MSI: Sentinel-2, Landsat, PlanetScope (13+ year archive per AOI — PROSAIL inversion applied retroactively at onboarding)',
      'SAR: Sentinel-1 VH/VV for structure, moisture, lodging context (fused across full archive at onboarding)',
      'Climate: MicroClim forcing (GDD, precipitation deficit, VPD, ETa/ET0 — applied across full time series at onboarding)',
      'Ancillary: field boundary, topography, soil type, prior land use where available',
    ],
    onboardingNote:
      'At onboarding, the full archive is processed end-to-end: atmospheric correction, PROSAIL / HydroLight inversion, SAR fusion, and MicroClim contextualization are applied across every available scene. The resulting cube reflects the complete observational and biophysical history of each AOI before the first customer acquisition is scheduled.',
  },
  stack: [
    {
      name: 'Firefly / Honeybee',
      role: 'Sensor layer',
      accent: 'var(--cyan)',
      body:
        'Physics-grade hyperspectral acquisition, radiometrically calibrated. Firefly (VNIR) operational today; Honeybee (VNIR-SWIR) 2027+.',
    },
    {
      name: 'NEXUS intelligence cube',
      role: 'Memory + analytics',
      accent: 'var(--green)',
      body:
        'Multimodal time series per monitored AOI: Data Engine ingestion, PROSAIL and HydroLight retrievals, Context and analytic engines, MicroClim forcing, and semantic query in one persistent object.',
    },
    {
      name: 'NEXUS semantic query',
      role: 'Query layer (part of NEXUS)',
      accent: 'var(--purple)',
      body:
        'DINOv3 embeddings fine-tuned over biophysical state vectors, not raw pixels. Similarity, trajectory matching, anomaly surfacing, and historical analogue retrieval — all scoped to the customer AOI.',
    },
    {
      name: 'MicroClim',
      role: 'Climate forcing (named integration)',
      accent: '#4FC3F7',
      body:
        'Field-level climate variables downscaled and fused into the cube. Conditions every biological interpretation across verticals.',
    },
    {
      name: 'Aurora / Project Zenith',
      role: 'Delivery platform',
      accent: 'var(--amber)',
      body:
        'Customer-facing platform and operator dashboard. Packages NEXUS outputs into vertical products and workflows; not a second intelligence white paper.',
    },
  ],
  architecture: {
    title: 'Inside the NEXUS engines',
    engines: [
      { name: 'Data Engine', eyebrow: 'Initial', accent: 'var(--cyan)', body: 'Initial ingestion and preparation: acquisitions harmonized, ISOFIT atmospheric correction applied, retrievals and forcing layers attached to the persistent object record, and cube state kept current for downstream engines.' },
      { name: 'Trait & Structure', body: 'PROSAIL traits and canopy structure for vegetation; HydroLight IOPs and water-quality retrievals for aquatic AOIs; MSI and HSI across domains.' },
      { name: 'Context Engine', body: 'Field-specific expected-state baselines built from the archive.' },
      { name: 'Semantic query (within NEXUS)', body: 'DINOv3 embeddings and retrieval over biophysical states in the customer AOI.' },
      { name: 'Aurora delivery', body: 'API, Zenith, and vertical packages that expose NEXUS outputs to customers.' },
    ],
  },
  threeComponents: [
    { name: 'NEXUS', body: 'Field intelligence object and semantic query layer.' },
    { name: 'MicroClim', body: 'Climate forcing context layer integrated into the cube.' },
    { name: 'Aurora', body: 'Delivery platform (imagery ordering, models, exports, Zenith).' },
  ],
  techSpecs: {
    title: 'Technical specifications (summary)',
    retrievalHeaders: ['Domain', 'Outputs'],
    retrievals: [
      ['Vegetation (PROSAIL)', 'LAI, cab, Car, Cw, Cm, fAPAR, AGB proxies, red-edge nitrogen proxies'],
      ['Aquatic (HydroLight)', 'Chl-a, phycocyanin, CDOM, TSM, IOPs, Rrs'],
      ['Geology (SAM + MTNF)', 'Mineral abundance, alteration, spectral similarity to reference'],
    ],
    semanticHeaders: ['Topic', 'Detail'],
    semantic: [
      ['Foundation model', 'DINOv3 fine-tuned on Pixxel MSI/HSI'],
      ['Embedding input', 'Biophysical state vectors (not raw pixels only)'],
      ['Query types', 'Similarity, trajectory matching, anomaly surfacing, historical analogue retrieval'],
      ['Scope', 'Per-customer AOI; not global archive search'],
      [
        'Temporal encoding',
        'Open engineering decision (per-acquisition + attention vs spatiotemporal GEOFM vs change-state embeddings). Do not commit in customer-facing language.',
      ],
    ],
  },
  differentiation: {
    title: 'Them vs us.',
    rows: [
      { them: 'Regional models smoothed across fields', us: 'Field-specific baselines derived from the field itself' },
      { them: 'Indices and classifier outputs', us: 'PROSAIL and HydroLight retrievals with calibrated uncertainty' },
      { them: 'Database of scenes to download', us: 'Field intelligence you can query and compound over time' },
      { them: 'Bespoke pipelines per engagement', us: 'Shared engines that deepen the same AOI object' },
      { them: 'Pixels delivered, decisions outsourced', us: 'Decision-ready evidence with onset dates and audit trails' },
      { them: '13-year MSI archive applied through regional models', us: '13-year MSI archive inverted field-by-field through PROSAIL and HydroLight — a location-specific biophysical history, not a regional average applied to it' },
    ],
  },
  sensors: {
    eyebrow: '06 · Inputs & sensors',
    title: 'MSI baseline, HSI precision upgrade.',
    msi: {
      title: 'MSI · Baseline',
      body:
        'Sentinel-2 plus Landsat plus PlanetScope, indexed back 13+ years. Dense temporal record for context baselines and structural change. Limit: cannot disambiguate spectrally similar stressors.',
      example: [
        'Field 47 · MSI tier',
        'LAI and FVC depressed vs field-specific expected state',
        'Cab within normal envelope for growth stage',
        'Stress signature present · attribution ambiguous at MSI tier',
        'Hypothesis set: drought vs nutrient stress (MSI cannot separate spectrally)',
      ],
    },
    hsi: {
      title: 'HSI · Precision Upgrade',
      body:
        'Pixxel hyperspectral with 150+ bands resolves biochemistry MSI cannot. Tasked over customer AOIs as the precision-grade upgrade.',
      example: [
        'Field 47 · HSI tier',
        'Cw depressed vs canopy structure — water stress signal',
        'LAI–Cw divergence corroborates moisture limitation',
        'Nutrient layer indicates secondary nitrogen deficit',
        'Attribution: water stress primary, nitrogen deficit secondary (ranked with spectral evidence)',
      ],
    },
  },
  vignettes: [
    {
      vertical: 'Forestry · Carbon',
      color: '#5BE584',
      persona: 'Congo Basin carbon project developer',
      body:
        'A living NEXUS model of every forest stand in the project area: full observational history, degradation flags, biomass with uncertainty bounds suitable for screening (not credit issuance without Honeybee validation), and area-specific questions without a new bespoke analysis run each time.',
    },
    {
      vertical: 'Geology · Exploration',
      color: '#F5A623',
      persona: 'Atacama exploration geologist',
      body:
        'A mineral intelligence model of the target: embeddings from Firefly acquisitions, queryable for locations that match a reference signature, updated as new tasks arrive, with prospectivity tied to surface mineral physics.',
    },
    {
      vertical: 'Water · Public health',
      color: '#4FC3F7',
      persona: 'Southeast Asia water utility manager',
      body:
        'A HAB intelligence model of the reservoir: pigment retrievals from optical physics, anomalies against that water body\'s baseline, risk context from catchment climate history, and alerts before intake compromise.',
    },
    {
      vertical: 'Defense · Intelligence',
      color: '#EF5350',
      persona: 'Site-monitoring defense analyst',
      body:
        'A physics-grounded site intelligence model: PROSAIL and spectral inversion applied to every facility acquisition, structural change tracked in SAR, and anomaly detection against that specific site\'s own baseline. Semantic query surfaces archive moments where surface state or material signature diverged from the established object record. Analyst in the loop; dissemination constraints apply.',
    },
  ],
  honestScience: {
    title: 'Defensible evidence, not optimistic dashboards.',
    paragraphs: [
      'Pixxel operates in markets where outputs have consequences: carbon screening, insurance, drilling, regulatory water response.',
      'Overconfident outputs are commercially dangerous. Every output carries confidence; every claim is scoped to what the physics supports.',
    ],
    advantage:
      'Conservative, auditable positioning is the durable commercial advantage with expert buyers.',
  },
  whatIsLiveNow:
    'Today: Firefly hyperspectral acquisition, ISOFIT atmospheric correction, PROSAIL and HydroLight biophysical retrieval, and individual vertical layers (stress, water quality, mineral) are operational. Pilot deliveries are analyst-produced at present. The integrated NEXUS platform — persistent field identity, semantic query at scale, and MicroClim-conditioned baselines — is in active build and expected mid 2027.',
  buildStatus: {
    title: 'Build status',
    intro:
      'Many production layers ship today across verticals. They are powerful individually and not yet fully unified into the integrated NEXUS platform described here.',
    columns: [
      {
        accent: 'var(--green)',
        label: 'Operational today',
        items: [
          'Firefly acquisitions, ISOFIT atmospheric correction, PROSAIL and HydroLight biophysical retrieval',
          'Individual stress, water quality, and mineral layers per vertical',
          'Bespoke pilot delivery as analyst-produced outputs',
          'AOI-scoped DINOv3 change and anomaly models on selected engagements',
        ],
      },
      {
        accent: 'var(--cyan)',
        label: 'In active build',
        items: [
          'NEXUS cube data architecture and ingestion pipeline',
          'MicroClim climate forcing integration',
          'NEXUS semantic query embedding architecture',
          'Solution package productization',
          'Project Zenith operator dashboard (Professional tier and above)',
        ],
      },
      {
        accent: 'var(--amber)',
        label: 'Expected mid 2027',
        items: [
          'Fully integrated NEXUS platform: persistent field identity, seasonal accumulation, MicroClim-conditioned baselines, semantic query at scale, multimodal attribution',
          'Honeybee VNIR-SWIR and expanded SWIR-dependent products',
          'Aurora delivery with operator dashboard as default path for monitoring tiers',
        ],
      },
    ],
  },
  doNotClaim: [
    'Full NEXUS platform operational end-to-end today',
    'Semantic query layer in production (in design and early build)',
    'MRV-grade carbon suitable for credit issuance (Honeybee + validation, 2027+)',
    'SWIR-dependent mineral or carbon products before Honeybee',
    'Global semantic search (scoped to customer AOI only)',
    'Committed temporal-encoding architecture for embeddings (engineering open)',
  ],
  roadmap: {
    title: 'Where we are headed.',
    phases: [
      { when: 'H1 2026', title: 'Foundation', body: 'MSI baseline operational; HSI tasking; cube ingestion v1; bespoke deliveries at scale.' },
      { when: 'Q3–Q4 2026', title: 'Intelligence products', body: 'Context, Event, Attribution engines and vertical packages (Ag, Forestry, Water).' },
      { when: 'Mid 2027', title: 'Integrated NEXUS', body: 'Persistent identity, semantic query at scale, MicroClim-conditioned baselines, Aurora/Zenith monitoring path.' },
      { when: '2027+', title: 'SWIR scale', body: 'Honeybee closes SWIR mineral and tighter carbon workflows; platform hardening.' },
    ],
  },
  closing: {
    label: 'The architecture compounds by design',
    paragraphs: [
      'Every new acquisition deepens object records. Every model improvement propagates across monitored AOIs. Every vertical adds a domain of intelligence. Value increases the longer a location has been monitored.',
      'This is not a dashboard or a mapping tool. It is field-level intelligence that knows specific places with increasing depth and delivers knowledge people can act on.',
    ],
  },
  claimContrast: {
    title: 'Two very different products.',
    intro:
      'Planetary coverage at low resolution is a different product from knowing a specific place with depth that survives expert review. Pixxel builds the second.',
    planetary: 'Knows everything about everywhere at low resolution. Coverage without depth is surveillance, not intelligence.',
    hyperlocal:
      'Knows a specific field, stand, waterbody, or site with depth defensible in court, registry, drilling, or briefing.',
  },
};

export const messaging = {
  framing: {
    label: 'Where we are right now — say this honestly',
    body:
      'Pixxel Analytics is in active transition from R&D and bespoke delivery to a productized platform. Deployed today: PROSAIL trait retrievals, HydroLight water quality, and individual vertical layers on bespoke AOIs. NEXUS semantic query and full cube integration are in active build, not production yet. AOI-scoped change and anomaly models exist on selected engagements but are not full-archive operational monitoring. Productized vertical packages target mid 2027. Early-adopter pilots help validate regional accuracy and build the evidence base for inventory-grade claims.',
  },
  differentiators: [
    {
      num: '01',
      title: 'Hyper-Local Intelligence',
      quote: 'Other platforms apply regional models to your field. NEXUS builds the baseline from your field.',
    },
    {
      num: '02',
      title: 'Physical Interpretability',
      quote:
        'A PROSAIL-derived LAI z-score is a scientific statement you can take to an auditor. A classifier output is not.',
    },
    {
      num: '03',
      title: 'HSI Physiological Precision',
      quote: 'MSI tells you something is wrong. HSI tells you exactly what is wrong and why.',
    },
  ],
  language: {
    use: [
      'field-level intelligence',
      'physically grounded',
      'defensible evidence',
      'exploration grade / inventory grade',
      'MSI-tier and HSI-upgraded',
      'early-adopter pilot',
      'configuration-driven delivery',
    ],
    avoid: [
      '"AI-powered" as headline',
      '"MRV-grade" carbon before SWIR',
      '"yield forecast"',
      '"real-time"',
      '"better than Sentinel-2"',
      '"production-ready" for anything still piloting',
      'uncaveated accuracy numbers',
    ],
  },
};

export const seed = {
  verticals,
  packages,
  claims,
  objections,
  universalNeverClaims,
  home,
  nexus,
  messaging,
};

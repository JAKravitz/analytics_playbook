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
    color: '#00C46A',
    desc:
      'Field-level crop intelligence from MSI baseline and HSI precision upgrade. Covers both agronomic decision support and risk/insurance intelligence — unified under one vertical. Currently delivering bespoke integrated solutions; moving to productized packages by end of 2026.',
  },
  forestry: {
    name: 'Forestry',
    sub: 'Carbon MRV · Deforestation · Wildfire · Conservation',
    color: '#5BE584',
    desc:
      'Forest intelligence spanning carbon stock, deforestation alerting, wildfire risk, and restoration monitoring. MSI-tier capability is operational today; SWIR (Honeybee) closes the structural-to-biochemical gap required for MRV-grade carbon claims.',
  },
  aquatic: {
    name: 'Aquatic',
    sub: 'Water Quality · HAB Intelligence · Benthic & Coastal',
    color: '#4FC3F7',
    desc:
      'Inland and coastal water intelligence built on HydroLight inversion physics. General water quality (optical and non-optical) is operational; HAB classification, benthic mapping, and coastal change detection are scoping or in active development.',
  },
  geology: {
    name: 'Geology',
    sub: 'Mineral Prospecting · REE Mapping · Mining Lifecycle',
    color: '#F5A623',
    desc:
      'Surface mineralogy and mining-lifecycle intelligence. VNIR prospecting is built and ready for deployment; full REE and rare-earth mapping awaits the SWIR Honeybee constellation. Mining lifecycle products are still in scoping.',
  },
  defense: {
    name: 'Defense',
    sub: 'Change Detection · Object Recognition · Terrain Intelligence',
    color: '#EF5350',
    desc:
      'Persistent change, facility characterization, and terrain mobility intelligence powered by SSE embeddings and MSI/HSI fusion. All capabilities are in active piloting; productized packages and pricing are pending pilot graduation.',
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

  aquatic: [
    {
      id: '01',
      name: 'General Water Quality',
      tagline: 'Optical and non-optical water column state, today.',
      badge: 'Live',
      badgeColor: 'green',
      body:
        'Physics-first water-column analytics: HydroLight inversion yields chlorophyll-a, phycocyanin, CDOM, TSM, turbidity, Secchi depth, inherent optical properties, and remote-sensing reflectance — the full chain needed for regulatory and operational water-quality workflows, not just a single index. Non-optical extensions provide pH, dissolved oxygen, and ammonia where models are validated for your domain. Deployment assumes appropriate atmospheric correction and mask quality; shallow or optically complex waters may need AOI-specific calibration and field pairing before promises are made.',
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
          'Not a fixed product package. Confirm science readiness, bathymetry availability, and validation plan with the aquatic team before quoting delivery or SLAs.',
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

export const claims = {
  agriculture: {
    now: [
      'PROSAIL-derived LAI, Cab, FVC from MSI with calibrated uncertainty — inventory grade, deployable today',
      'Full PROSAIL suite from HSI (Cw, Cm, Car, N/P/K) for tasked AOIs — inventory grade where validated',
      'Farm boundary model and crop type classification — inventory grade',
      'MSI-based anomaly detection over the 13+ year archive — deployable, Context Engine not yet live',
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
      'Disease species identification without ground-truth validation data',
      'Real-time monitoring — we are task-triggered, not continuous global surveillance',
    ],
  },
  forestry: {
    now: [
      'Deforestation and structural-loss alerts from MSI with sub-hectare detection — deployable today',
      'BFAST-style degradation trends and FIRMS fire corroboration — deployable today',
      'AGB and carbon stock estimation with Monte Carlo uncertainty bounds — exploration grade',
      'Burn scar mapping and fire severity classification — deployable today',
      'Individual layers delivered on a bespoke per-engagement basis',
    ],
    eoy: [
      'Deforestation & Degradation Alerting: productized monitoring with mechanical-vs-biological attribution',
      'Wildfire Risk & Recovery: fuel state pre-fire, severity post-fire, recovery tracking',
      'ARR & Restoration Monitoring: counterfactual baselines and AGB accumulation reporting',
      'Carbon MRV (exploration): portfolio triage and additionality screening with explicit uncertainty',
    ],
    never: [
      'MRV-grade carbon stock estimates suitable for credit issuance — gated on SWIR (Honeybee), 2027+',
      'Replacing carbon registry auditors or third-party verifiers',
      'Species-level forest composition without ground-truth validation',
    ],
  },
  aquatic: {
    now: [
      'Optical water quality (Chl-a, phycocyanin, CDOM, TSM, turbidity, Secchi, IOPs, Rrs) — deployable today',
      'Non-optical water quality models (pH, DO, ammonia) — deployable today',
      'HAB-relevant pigment retrievals (phycocyanin, chlorophyll-a) — deployable today',
      'Individual layers delivered on a bespoke per-engagement basis',
    ],
    eoy: [
      'General Water Quality: productized optical and non-optical state for inland and coastal waters',
      'HAB Monitor: classification, severity scoring, and risk-zone mapping (forecasting still scoping)',
    ],
    never: [
      'HAB forecasting before methodology and validation timeline are confirmed',
      'Benthic and coastal change products before scoping is complete',
      'Drinking-water safety determinations — we provide signal, the utility makes the call',
    ],
  },
  geology: {
    now: [
      'VNIR-based surface mineralogy, alteration mapping, and spectral anomaly detection — built, deployment TBD',
      'REE and critical-mineral surface indicators with per-pixel spectral quality — exploration grade',
      'Individual mining-lifecycle layers (evaporation ponds, tailings change, etc.) on a bespoke basis',
    ],
    eoy: [
      'Mineral Prospecting (VNIR): productized exploration-grade outputs coordinated through Aurora',
      'REE Mapping: improved hypothesis ranking with explicit uncertainty reporting',
    ],
    never: [
      'SWIR-grade mineral mapping or drill-ready resource estimation — gated on Honeybee, 2027+',
      'MRV or critical-mineral certification beyond what the spectral evidence supports',
      'Replacing field geological surveys or geophysical campaigns',
    ],
  },
  defense: {
    now: [
      'SSE-based change and anomaly detection over piloted AOIs — piloting',
      'Runway, apron, and facility footprint extraction — piloting',
      'Soil moisture, tankability, and trafficability proxies — piloting',
      'Bespoke pilot-grade outputs delivered under customer-specific configurations',
    ],
    eoy: [
      'Productized Change & Anomaly Detection with documented uncertainty bounds',
      'Productized Object & Facility Recognition tied to SSE cross-archive search',
      'Productized Terrain & Mobility Analysis suitable for mission planning workflows',
    ],
    never: [
      'Real-time targeting or kinetic decision support',
      'Operational claims that exceed pilot-validated AOIs and conditions',
      'Personnel identification or face/biometric analysis',
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
      'Other platforms sell pixels, regional-scale analytics, or learned embeddings without physical interpretability. NEXUS is hyper-local (the baseline is your field, not a regional model), physically grounded (PROSAIL traits, HydroLight inversion), and queryable through a semantic foundation. The output is decision-ready evidence, not an opaque score from a black-box classifier.',
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
    'The Pixxel Analytics team is fifteen-plus people split across the US and India, working across five verticals: agriculture, forestry, aquatic, geology, and defense. We pair remote sensing physics with machine learning and applied earth science to turn satellite observations into decision-ready evidence.',
    'This playbook is the commercial team\'s shared reference for what we sell today, what is shipping by end of 2026, and how to talk about it honestly. It is internal, editable in-place, and intended to evolve as we do.',
  ],
  whatWeDo: [
    {
      title: 'Geospatial AI',
      body:
        'NEXUS engines, semantic foundation, intelligence cube, and the data pipeline that turns raw acquisitions into queryable evidence.',
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
      title: 'Layer Catalog',
      body: 'Every analytics layer: engine, tier, status, ready date, and notes — editable and filterable.',
    },
    {
      id: 'nexus',
      title: 'NEXUS',
      body: 'Platform vision, engines, architecture graphic, and roadmap that everything else hangs from.',
    },
    {
      id: 'sse',
      title: 'Semantic Search Engine',
      body: 'Scaffold: positioning and technical depth for SSE and archive retrieval (edit over time).',
    },
    {
      id: 'microclim',
      title: 'MicroClim',
      body: 'Scaffold: downscaled weather products and how they corroborate satellite layers (edit over time).',
    },
    {
      id: 'claims',
      title: 'What We Can Claim',
      body: 'The honest line between what we can deliver today and what is coming by end of 2026.',
    },
    {
      id: 'messaging',
      title: 'Messaging & Objections',
      body: 'Language guide, differentiators, and answers to the questions you are going to get asked.',
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
  problem: {
    eyebrow: '01 · The Problem',
    title: 'Geospatial intelligence is broken at the field scale.',
    intro:
      'Every customer engagement repeats the same work, ships regional models against local realities, and hands over outputs that buyers cannot defend. That is the gap NEXUS exists to close.',
    cards: [
      { title: 'Repeated Learning', body: 'Every customer engagement re-trains models that should already exist as platform primitives.' },
      { title: 'Regional Not Local', body: 'Regional models are applied to single fields and farms, smoothing over the variation customers actually care about.' },
      { title: 'Black Box Outputs', body: 'Classifier outputs without physical interpretability are unusable for insurance adjudication, registries, or audits.' },
      { title: 'Bespoke Pipelines', body: 'Each engagement spins up a new pipeline instead of stacking on a shared evidence layer.' },
      { title: 'Indices Not Physics', body: 'NDVI and friends summarize symptoms; PROSAIL traits express causes.' },
      { title: 'Scale Without Precision', body: 'Global coverage at low specificity wins demos but loses procurement.' },
    ],
    callout:
      'NEXUS replaces this with a hyper-local, physically grounded, semantically queryable intelligence cube — built once, deepened with every acquisition.',
  },
  platform: {
    eyebrow: '02 · The Platform',
    title: 'NEXUS is not a pipeline. It is a queryable intelligence cube.',
    pillars: [
      { num: '01', title: 'Hyper-Local', body: 'The baseline is your field, not a regional model.' },
      { num: '02', title: 'Physically Constrained', body: 'PROSAIL, HydroLight, and SAR physics — every output is a scientific statement.' },
      { num: '03', title: 'Semantically Queryable', body: 'Ask the cube questions; do not chase pixels.' },
      { num: '04', title: 'Decision-Ready Evidence', body: 'Onset dates, uncertainty bounds, sensor tiers, audit trails.' },
      { num: '05', title: 'Compounds Over Time', body: 'Every new acquisition adds to the same field-specific archive.' },
    ],
  },
  architecture: {
    eyebrow: '03 · Architecture',
    title: 'Six engines. One intelligence stack.',
    engines: [
      { name: 'Trait & Structure', body: 'PROSAIL traits, canopy structure, and biophysical retrievals across MSI and HSI.' },
      { name: 'Context Engine', body: 'Field-specific expected-state baselines built from the 13+ year archive.' },
      { name: 'Event Engine', body: 'Anomaly detection, event classification, onset dating, and severity scoring.' },
      { name: 'Attribution Engine', body: 'Causal hypothesis ranking with spectral evidence and MicroClim corroboration.' },
      { name: 'Semantic Foundation', body: 'SSE, DINOv3, SAM3, and the semantic web that makes the cube queryable.' },
      { name: 'Aurora Platform', body: 'The delivery layer — packaging engines into vertical products and customer workflows.' },
    ],
  },
  differentiation: {
    eyebrow: '04 · Differentiation',
    title: 'Them vs us.',
    rows: [
      { them: 'Regional models smoothed across fields', us: 'Field-specific baselines derived from the field itself' },
      { them: 'Indices and classifier outputs', us: 'PROSAIL and HydroLight retrievals with calibrated uncertainty' },
      { them: 'Bespoke pipelines per engagement', us: 'Shared engines that compound over time' },
      { them: 'Pixels delivered, decisions outsourced', us: 'Decision-ready evidence with onset dates and audit trails' },
      { them: 'MSI alone', us: 'MSI baseline plus HSI precision upgrade where physics demands it' },
    ],
  },
  sensors: {
    eyebrow: '05 · Sensor Architecture',
    title: 'MSI baseline, HSI precision upgrade.',
    msi: {
      title: 'MSI · Baseline',
      body:
        'Sentinel-2 plus Landsat plus PlanetScope, indexed back 13+ years. Provides the dense temporal record needed for the Context Engine and the structural backbone for change detection. Limit: cannot disambiguate spectrally similar stressors.',
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
        'Pixxel hyperspectral with 150+ bands resolves the biochemistry MSI cannot — Cw, Cm, Car, REIP shifts, and N/P/K signatures. Tasked over customer AOIs as the precision-grade upgrade.',
      example: [
        'Field 47 · HSI tier',
        'Cw depressed vs canopy structure — water stress signal',
        'LAI–Cw divergence corroborates moisture limitation',
        'Nutrient layer indicates secondary nitrogen deficit',
        'Attribution: water stress primary, nitrogen deficit secondary (ranked with spectral evidence)',
      ],
    },
  },
  roadmap: {
    eyebrow: '06 · Roadmap',
    title: 'Where we are headed.',
    phases: [
      { when: 'H1 2026', title: 'Foundation', body: 'MSI baseline operational; HSI tasking workflow; Context Engine v1; first vertical bespoke deliveries at scale.' },
      { when: 'Q3 2026', title: 'Intelligence', body: 'Context + Event + Attribution engines productized; Field Stress Monitor and Precision Intervention Advisor live.' },
      { when: 'Q4 2026', title: 'Products', body: 'Productized vertical packages across Agriculture, Forestry, Aquatic; portfolio risk and cause-of-loss evidence GA.' },
      { when: '2027+', title: 'Scale', body: 'SWIR (Honeybee) closes MRV-grade carbon and SWIR mineral mapping; Aurora platform expands to full self-serve.' },
    ],
  },
};

export const messaging = {
  framing: {
    label: 'Where we are right now — say this honestly',
    body:
      'Pixxel Analytics is in active transition from R&D and bespoke delivery to a productized platform. Deployed today: PROSAIL trait retrievals, HydroLight water quality, SSE object recognition, change detection. The full NEXUS engine stack ships through 2026. We need early-adopter pilots to validate regional accuracy, refine attribution models, and build the evidence base for inventory-grade claims. Customers who engage now get closer collaboration and first-mover advantage in exchange for accepting that some outputs are still exploration grade.',
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

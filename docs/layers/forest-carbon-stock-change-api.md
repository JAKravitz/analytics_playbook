# Carbon Stock Change API (`forest-carbon-stock-change-api`)

## Document control
- **API ID:** forest-carbon-stock-change-api
- **Verticals:** forestry
- **Kind:** addon (Add-on family: Carbon MRV & REDD+)
- **Sensor / access tier:** Both
- **Grade:** exploration
- **Status:** piloting · **API ready:** Q4 2026
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** Stock change from biomass deltas.
- **VNIR HSI adds:** Stock change driven by biochemically-informed degradation signal — earlier detection of gradual loss.
- **VNIR-SWIR HSI adds:** SWIR structural signals improve stock change sensitivity — critical for degradation-driven carbon loss.

## Purpose and scope
Support exploration-grade carbon monitoring narratives and uncertainty framing; not credit issuance unless separately qualified.

**Exploration grade**: useful for pilots and analysis; scoping, regional validation, or method hardening may still be in flight. Treat outputs as decision-support unless a specific validation memo applies.

Catalog status: **Piloting**. API ready: **Q4 2026**.

## Definition
Carbon-relevant structural or stock proxy; semantics depend on packaging (exploration vs inventory) and sensor tier.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Multi-temporal comparison, change magnitude/direction, and persistence filtering as specified for the layer.

## Outputs and deliverables
Primary deliverable: **Carbon Stock Change API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Pilot and R&D status: expect **explicit pilot validation** before using outputs for high-stakes decisions. Regional and domain transfer may be limited.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$20/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

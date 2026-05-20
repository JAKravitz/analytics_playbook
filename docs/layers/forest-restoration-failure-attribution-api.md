# Attribution & Failure Diagnosis API (`forest-restoration-failure-attribution-api`)

## Document control
- **API ID:** forest-restoration-failure-attribution-api
- **Verticals:** forestry
- **Kind:** addon (Add-on family: ARR & Restoration Monitoring)
- **Sensor / access tier:** Both
- **Grade:** exploration
- **Status:** piloting · **API ready:** Q4 2026
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** Coarse failure hypotheses.
- **VNIR HSI adds:** Spectral separation of drought stress, species mismatch, and browsing damage.
- **VNIR-SWIR HSI adds:** Adds structural failure signals — waterlogging, root zone stress via SWIR canopy water dynamics.

## Purpose and scope
Surface anomalies or ranked explanatory hypotheses from spectral and contextual data; not ground-truth cause without corroboration.

**Exploration grade**: useful for pilots and analysis; scoping, regional validation, or method hardening may still be in flight. Treat outputs as decision-support unless a specific validation memo applies.

Catalog status: **Piloting**. API ready: **Q4 2026**.

## Definition
Raster (or agreed vector) layer representing **Attribution & Failure Diagnosis API**. Exact units, classes, and dynamic range are specified in the delivery metadata for each order.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Pipeline-specific retrieval or classifier consistent with the API kind and tier; detailed algorithm version is tracked per release.

## Outputs and deliverables
Primary deliverable: **Attribution & Failure Diagnosis API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Pilot and R&D status: expect **explicit pilot validation** before using outputs for high-stakes decisions. Regional and domain transfer may be limited.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$21/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

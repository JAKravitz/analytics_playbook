# Canopy Establishment API (`forest-canopy-establishment-api`)

## Document control
- **API ID:** forest-canopy-establishment-api
- **Verticals:** forestry
- **Kind:** addon (Add-on family: ARR & Restoration Monitoring)
- **Sensor / access tier:** Both
- **Grade:** exploration
- **Status:** piloting · **API ready:** Q3 2026
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** Cover fraction trend.
- **VNIR HSI adds:** Canopy closure tracked via LAI and cab dynamics.
- **VNIR-SWIR HSI adds:** SWIR-derived cm and canopy water add structural canopy development signal.

## Purpose and scope
Add-on API endpoint composed on top of the Core API base package; sold per-subscription.

**Exploration grade**: useful for pilots and analysis; scoping, regional validation, or method hardening may still be in flight. Treat outputs as decision-support unless a specific validation memo applies.

Catalog status: **Piloting**. API ready: **Q3 2026**.

## Definition
Raster (or agreed vector) layer representing **Canopy Establishment API**. Exact units, classes, and dynamic range are specified in the delivery metadata for each order.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Pipeline-specific retrieval or classifier consistent with the API kind and tier; detailed algorithm version is tracked per release.

## Outputs and deliverables
Primary deliverable: **Canopy Establishment API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Pilot and R&D status: expect **explicit pilot validation** before using outputs for high-stakes decisions. Regional and domain transfer may be limited.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$18/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

# Harvest Timing API (`harvest-timing-api`)

## Document control
- **API ID:** harvest-timing-api
- **Verticals:** agriculture
- **Kind:** addon (Add-on family: Precision Ag)
- **Sensor / access tier:** Both
- **Grade:** inventory
- **Status:** piloting · **API ready:** Q3 2026
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** NDVI / NDRE inflection timing.
- **VNIR HSI adds:** Maturity staging via chlorophyll decline and canopy water content reduction.
- **VNIR-SWIR HSI adds:** Dry matter accumulation and lignification (2100–2300nm) — harvest timing precision improved for grain and legume crops.

## Purpose and scope
Add-on API endpoint composed on top of the Core API base package; sold per-subscription.

**Catalog notes:** Expected harvest readiness window per field.

**Inventory grade** in the playbook sense: suitable as a repeatable catalog deliverable where validation and QA paths are defined for supported domains.

Catalog status: **Piloting**. API ready: **Q3 2026**.

## Definition
Raster (or agreed vector) layer representing **Harvest Timing API**. Exact units, classes, and dynamic range are specified in the delivery metadata for each order.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Pipeline-specific retrieval or classifier consistent with the API kind and tier; detailed algorithm version is tracked per release.

## Outputs and deliverables
Primary deliverable: **Harvest Timing API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Validation approach is documented per supported vertical and region; request the validation memo for a specific AOI and season before quoting point accuracy.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$18/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

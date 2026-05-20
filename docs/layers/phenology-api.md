# Phenology API (`phenology-api`)

## Document control
- **API ID:** phenology-api
- **Verticals:** agriculture
- **Kind:** internal
- **Sensor / access tier:** Both
- **Grade:** inventory
- **Status:** aurora · **API ready:** live
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** NDVI-inflection-based stage estimates.
- **VNIR HSI adds:** Stage transitions via chlorophyll a/b ratio shifts and canopy water dynamics; more precise than NDVI inflection alone.
- **VNIR-SWIR HSI adds:** Adds senescence staging via dry matter accumulation (cm) and lignification (2100nm).

## Purpose and scope
Deliver the named geospatial analytic layer as part of the Pixxel processing catalog, subject to tier and grade constraints.

**Catalog notes:** Crop stage, deviation, and growth trajectory.

**Inventory grade** in the playbook sense: suitable as a repeatable catalog deliverable where validation and QA paths are defined for supported domains.

Catalog status: **Aurora**. API ready: **live**.

## Definition
Per-pixel vegetation indices derived from surface reflectance. Indices are **supporting diagnostics**; product interpretation usually combines them with biophysical inversions or classifiers.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Pipeline-specific retrieval or classifier consistent with the API kind and tier; detailed algorithm version is tracked per release.

## Outputs and deliverables
Primary deliverable: **Phenology API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Validation approach is documented per supported vertical and region; request the validation memo for a specific AOI and season before quoting point accuracy.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$0/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

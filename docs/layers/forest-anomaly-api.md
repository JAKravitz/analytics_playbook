# Anomaly API (`forest-anomaly-api`)

## Document control
- **API ID:** forest-anomaly-api
- **Verticals:** forestry
- **Kind:** internal
- **Sensor / access tier:** Both
- **Grade:** inventory
- **Status:** aurora · **API ready:** live
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** Index anomalies vs. baseline.
- **VNIR HSI adds:** Anomalies in biophysical trait space (cab, cw deviation) — more interpretable than index anomalies.
- **VNIR-SWIR HSI adds:** Anomalies resolvable into SWIR trait space — structural anomalies separable from pigment anomalies.

## Purpose and scope
Surface anomalies or ranked explanatory hypotheses from spectral and contextual data; not ground-truth cause without corroboration.

**Inventory grade** in the playbook sense: suitable as a repeatable catalog deliverable where validation and QA paths are defined for supported domains.

Catalog status: **Aurora**. API ready: **live**.

## Definition
Raster (or agreed vector) layer representing **Anomaly API**. Exact units, classes, and dynamic range are specified in the delivery metadata for each order.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Statistical or model-based deviation from baseline with optional ranked hypotheses from spectral library or expert rules.

## Outputs and deliverables
Primary deliverable: **Anomaly API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Validation approach is documented per supported vertical and region; request the validation memo for a specific AOI and season before quoting point accuracy.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$0/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

# Anomaly API (`anomaly-api`)

## Document control
- **API ID:** anomaly-api
- **Verticals:** agriculture
- **Kind:** internal
- **Sensor / access tier:** Both
- **Grade:** inventory
- **Status:** aurora · **API ready:** live
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** Anomalies in index space.
- **VNIR HSI adds:** Anomalies in biophysical trait space (cab, cw deviation) — more interpretable than index anomalies.
- **VNIR-SWIR HSI adds:** Anomalies resolvable into SWIR trait space — water and structural anomalies separable from pigment anomalies.

## Purpose and scope
Surface anomalies or ranked explanatory hypotheses from spectral and contextual data; not ground-truth cause without corroboration.

**Catalog notes:** Anomaly score and deviation magnitude.

**Inventory grade** in the playbook sense: suitable as a repeatable catalog deliverable where validation and QA paths are defined for supported domains.

Catalog status: **Aurora**. API ready: **live**.

## Definition
Per-pixel vegetation indices derived from surface reflectance. Indices are **supporting diagnostics**; product interpretation usually combines them with biophysical inversions or classifiers.

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

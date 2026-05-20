# Temporal Trend API (`water-temporal-trend-api`)

## Document control
- **API ID:** water-temporal-trend-api
- **Verticals:** water
- **Kind:** addon (Add-on family: HAB Monitor & Forecast)
- **Sensor / access tier:** Both
- **Grade:** inventory
- **Status:** aurora · **API ready:** live
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** Broadband MSI retrievals where mask and atmospheric quality allow.
- **VNIR HSI adds:** Trend built on spectrally-consistent constituent retrievals — less susceptible to inter-scene index drift
- **VNIR-SWIR HSI adds:** SWIR-constrained retrievals improve temporal consistency across varying water optical conditions

## Purpose and scope
Add-on API endpoint composed on top of the Core API base package; sold per-subscription.

**Inventory grade** in the playbook sense: suitable as a repeatable catalog deliverable where validation and QA paths are defined for supported domains.

Catalog status: **Aurora**. API ready: **live**.

## Definition
Raster (or agreed vector) layer representing **Temporal Trend API**. Exact units, classes, and dynamic range are specified in the delivery metadata for each order.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Time-series breakpoint or trend analysis on spectral or index trajectories.

## Outputs and deliverables
Primary deliverable: **Temporal Trend API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Validation approach is documented per supported vertical and region; request the validation memo for a specific AOI and season before quoting point accuracy.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$15/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

# Change Detection API (`forest-change-detection-api`)

## Document control
- **API ID:** forest-change-detection-api
- **Verticals:** forestry
- **Kind:** internal
- **Sensor / access tier:** Both
- **Grade:** inventory
- **Status:** aurora · **API ready:** live
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** Change vs. index baseline.
- **VNIR HSI adds:** Change signals detected against biochemical baseline — earlier detection of stress-induced pre-disturbance decline.
- **VNIR-SWIR HSI adds:** SWIR adds structural change detection (canopy water loss, dry matter shift) before visible canopy loss.

## Purpose and scope
Deliver the named geospatial analytic layer as part of the Pixxel processing catalog, subject to tier and grade constraints.

**Inventory grade** in the playbook sense: suitable as a repeatable catalog deliverable where validation and QA paths are defined for supported domains.

Catalog status: **Aurora**. API ready: **live**.

## Definition
Raster (or agreed vector) layer representing **Change Detection API**. Exact units, classes, and dynamic range are specified in the delivery metadata for each order.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Multi-temporal comparison, change magnitude/direction, and persistence filtering as specified for the layer.

## Outputs and deliverables
Primary deliverable: **Change Detection API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Validation approach is documented per supported vertical and region; request the validation memo for a specific AOI and season before quoting point accuracy.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$0/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

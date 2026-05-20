# Fire Event Detection API (`forest-fire-event-detection-api`)

## Document control
- **API ID:** forest-fire-event-detection-api
- **Verticals:** forestry
- **Kind:** addon (Add-on family: Wildfire Risk & Recovery)
- **Sensor / access tier:** Both
- **Grade:** inventory
- **Status:** aurora · **API ready:** live
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** Thermal/FIRMS events.
- **VNIR HSI adds:** No uplift — fire detection is thermal/FIRMS driven.
- **VNIR-SWIR HSI adds:** No uplift

## Purpose and scope
Identify or track events and their persistence over time for alerting and post-event analysis.

**Inventory grade** in the playbook sense: suitable as a repeatable catalog deliverable where validation and QA paths are defined for supported domains.

Catalog status: **Aurora**. API ready: **live**.

## Definition
Raster (or agreed vector) layer representing **Fire Event Detection API**. Exact units, classes, and dynamic range are specified in the delivery metadata for each order.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Multi-temporal comparison, change magnitude/direction, and persistence filtering as specified for the layer.

## Outputs and deliverables
Primary deliverable: **Fire Event Detection API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Validation approach is documented per supported vertical and region; request the validation memo for a specific AOI and season before quoting point accuracy.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$7/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

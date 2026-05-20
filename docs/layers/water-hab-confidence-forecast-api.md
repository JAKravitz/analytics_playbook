# Confidence API (Forecast) API (`water-hab-confidence-forecast-api`)

## Document control
- **API ID:** water-hab-confidence-forecast-api
- **Verticals:** water
- **Kind:** addon (Add-on family: HAB Monitor & Forecast)
- **Sensor / access tier:** Both
- **Grade:** inventory
- **Status:** piloting · **API ready:** Q3 2026
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** Broadband MSI retrievals where mask and atmospheric quality allow.
- **VNIR HSI adds:** Confidence informed by spectral retrieval quality and bloom classification certainty
- **VNIR-SWIR HSI adds:** SWIR-extended retrievals tighten confidence bounds — particularly in turbid and CDOM-rich waters

## Purpose and scope
Provide forward-looking or risk-oriented estimates with explicit time horizon; validate horizon and domain before operational reliance.

**Inventory grade** in the playbook sense: suitable as a repeatable catalog deliverable where validation and QA paths are defined for supported domains.

Catalog status: **Piloting**. API ready: **Q3 2026**.

## Definition
Raster (or agreed vector) layer representing **Confidence API (Forecast) API**. Exact units, classes, and dynamic range are specified in the delivery metadata for each order.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Pipeline-specific retrieval or classifier consistent with the API kind and tier; detailed algorithm version is tracked per release.

## Outputs and deliverables
Primary deliverable: **Confidence API (Forecast) API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Validation approach is documented per supported vertical and region; request the validation memo for a specific AOI and season before quoting point accuracy.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$6/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

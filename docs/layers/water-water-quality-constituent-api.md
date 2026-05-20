# Water Quality Constituent API (`water-water-quality-constituent-api`)

## Document control
- **API ID:** water-water-quality-constituent-api
- **Verticals:** water
- **Kind:** core
- **Sensor / access tier:** Both
- **Grade:** inventory
- **Status:** aurora · **API ready:** live
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** Limited MSI capability — full product requires VNIR HSI.
- **VNIR HSI adds:** Improved Chl-a and phycocyanin retrieval via narrow-band red-edge features (700–730nm); phycocyanin detection via 620nm absorption — not retrievable from MSI
- **VNIR-SWIR HSI adds:** Adds CDOM and TSM retrieval at higher precision via SWIR water absorption constraints; improved IOP decomposition

## Purpose and scope
Quantify or classify aquatic optical properties, water quality proxies, or related coastal/wetland signals where the optical model applies.

**Inventory grade** in the playbook sense: suitable as a repeatable catalog deliverable where validation and QA paths are defined for supported domains.

Catalog status: **Aurora**. API ready: **live**.

## Definition
Raster (or agreed vector) layer representing **Water Quality Constituent API**. Exact units, classes, and dynamic range are specified in the delivery metadata for each order.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Pipeline-specific retrieval or classifier consistent with the API kind and tier; detailed algorithm version is tracked per release.

## Outputs and deliverables
Primary deliverable: **Water Quality Constituent API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Validation approach is documented per supported vertical and region; request the validation memo for a specific AOI and season before quoting point accuracy.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$18/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

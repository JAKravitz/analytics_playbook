# Structure API (`forest-structure-api`)

## Document control
- **API ID:** forest-structure-api
- **Verticals:** forestry
- **Kind:** core
- **Sensor / access tier:** Both
- **Grade:** inventory
- **Status:** aurora · **API ready:** live
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** Structure proxies from greenness and cover.
- **VNIR HSI adds:** See structure detail below.
- **VNIR-SWIR HSI adds:** See structure detail below.

## Purpose and scope
Core API endpoint in the Field Stress Monitor base package — stress, identity, state, traits, and supporting signals that add-ons build on.

**Catalog notes:** Links traits to AGB, height stratification inputs, and cover fraction.

**Inventory grade** in the playbook sense: suitable as a repeatable catalog deliverable where validation and QA paths are defined for supported domains.

Catalog status: **Aurora**. API ready: **live**.

## Definition
Raster (or agreed vector) layer representing **Structure API**. Exact units, classes, and dynamic range are specified in the delivery metadata for each order.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Canopy radiative transfer inversion (e.g. PROSAIL-class) or equivalent hybrid retrievals from multispectral/hyperspectral reflectance.

## Outputs and deliverables
Primary deliverable: **Structure API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Validation approach is documented per supported vertical and region; request the validation memo for a specific AOI and season before quoting point accuracy.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$28/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

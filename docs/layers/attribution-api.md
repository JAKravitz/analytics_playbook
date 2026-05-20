# Attribution API (`attribution-api`)

## Document control
- **API ID:** attribution-api
- **Verticals:** agriculture
- **Kind:** core
- **Sensor / access tier:** Both
- **Grade:** inventory
- **Status:** aurora · **API ready:** live
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** Coarse driver hypotheses from indices and climate context.
- **VNIR HSI adds:** Spectral separation of water deficit (970nm), nitrogen/chlorophyll depletion (red-edge slope), and pathogen onset (500–550nm anomalies).
- **VNIR-SWIR HSI adds:** Adds fungal vs. bacterial pathogen separation via lignin/cellulose disruption (2100nm); nutrient deficiency typing extended to P and K proxies.

## Purpose and scope
Surface anomalies or ranked explanatory hypotheses from spectral and contextual data; not ground-truth cause without corroboration.

**Catalog notes:** Likely stress driver and plain-language explanation.

**Inventory grade** in the playbook sense: suitable as a repeatable catalog deliverable where validation and QA paths are defined for supported domains.

Catalog status: **Aurora**. API ready: **live**.

## Definition
Leaf Area Index (LAI) as a canopy structural variable, typically from a radiative transfer or hybrid inversion with uncertainty where configured.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Canopy radiative transfer inversion (e.g. PROSAIL-class) or equivalent hybrid retrievals from multispectral/hyperspectral reflectance.

## Outputs and deliverables
Primary deliverable: **Attribution API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Validation approach is documented per supported vertical and region; request the validation memo for a specific AOI and season before quoting point accuracy.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$22/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

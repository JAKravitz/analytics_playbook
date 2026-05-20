# Trait API (`trait-api`)

## Document control
- **API ID:** trait-api
- **Verticals:** agriculture
- **Kind:** core
- **Sensor / access tier:** Both
- **Grade:** inventory
- **Status:** aurora · **API ready:** live
- **Doc:** Playbook v0.1 · May 2026 — replace with owner-reviewed version as methods mature.

## Spectral uplift
- **MSI baseline:** Coarse trait estimates from multispectral inversion (see trait detail).
- **VNIR HSI adds:** See trait detail below.
- **VNIR-SWIR HSI adds:** See trait detail below.

## Purpose and scope
Core API endpoint in the Field Stress Monitor base package — stress, identity, state, traits, and supporting signals that add-ons build on.

**Catalog notes:** PROSAIL inversion variables and spectral indices: LAI, cab, cw, cm, Car.

**Inventory grade** in the playbook sense: suitable as a repeatable catalog deliverable where validation and QA paths are defined for supported domains.

Catalog status: **Aurora**. API ready: **live**.

## Definition
Leaf Area Index (LAI) as a canopy structural variable, typically from a radiative transfer or hybrid inversion with uncertainty where configured.

## Inputs and dependencies
**Firefly and/or open datasets**, depending on product configuration. Atmospherically corrected reflectance where applicable. Quality masks (cloud/shadow) recommended for interpretation.

## Method summary
Canopy radiative transfer inversion (e.g. PROSAIL-class) or equivalent hybrid retrievals from multispectral/hyperspectral reflectance.

## Outputs and deliverables
Primary deliverable: **Trait API** geospatial layer(s). Auxiliary QA or confidence bands may be included where the product line defines them. Delivery format and tiling follow the standard customer delivery spec for the order.

## Validation and performance
Validation approach is documented per supported vertical and region; request the validation memo for a specific AOI and season before quoting point accuracy.

## Limitations and failure modes
- Mixed pixels, poor atmospheric state, extreme canopy structure, and inadequate revisit can degrade retrievals. Always cross-check with QA masks.

## Operational notes
Indicative list rate in catalog: **$28/km²** (commercial placeholder until finance standardizes). Processing cadence and latency follow the order’s capture plan.

## Cross-links
See API Catalog in the playbook app for package associations; package layer lists are defined in code.

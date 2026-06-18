# SWIPE (Water) white-paper figures

Platform screenshots / figure exports for the SWIPE white paper. The white paper
(`src/sections/products/SwipeWhitePaper.jsx`) loads them from
`/product-assets/water/<filename>` and falls back to an "asset pending"
placeholder if a file is missing.

These were extracted from `water.docx` and resized to a 1760px max dimension.
To replace one, overwrite the file in place (keep the same name).

Filenames (from `src/data/products/water.js` → `waterFigures`):

| Slot | Filename | Figure |
|------|----------|--------|
| fig01 | `rt_problem.png` | Radiative transfer problem in aquatic environments |
| fig02 | `particle_modeling.png` | Aquatic particle modeling for synthetic data |
| fig03 | `architecture_optical.png` | Inverse architecture — optically active (ResNet + MDN) |
| fig04 | `architecture_nonoptical.png` | Inverse architecture — non-optically active |
| fig05 | `model_performance.png` | Model performance / uncertainty calibration |
| fig06 | `firefly_estuary.png` | Firefly estuary and river data |
| fig07 | `hab_carbon.png` | HAB quantification and carbon content |
| fig08 | `non_optical_constituents.png` | Non-optically active constituents (DO, pH, ammonia) |
| fig09 | `attenuation_delta.png` | Attenuation / IOP modeling in a delta |
| fig10 | `sunglint_correction.png` | Sunglint correction |
| fig11 | `adjacency_correction.png` | Adjacency correction |

Recommended: wide PNGs (~1600 px), dark UI background to match the white-paper theme.

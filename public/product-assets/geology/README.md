# SCOPE (Geology) white-paper figures

Platform screenshots / figure exports for the SCOPE white paper. The white paper
(`src/sections/products/GeologyWhitePaper.jsx`) loads them from
`/product-assets/geology/<filename>` and falls back to an "asset pending"
placeholder if a file is missing.

These were extracted from `geology figures.docx` and resized to a 1760px max
dimension. To replace one, overwrite the file in place (keep the same name).

Filenames (from `src/data/products/geology.js` → `geologyFigures`):

| Slot | Filename | Figure |
|------|----------|--------|
| fig01 | `classification.png` | Baseline mineral classification |
| fig02 | `alteration.png` | Iron-oxide alteration composite |
| fig03 | `ree_band_depth.png` | REE band depth (Nd continuum removal) |
| fig04 | `structural.png` | Structural framework (three views) |
| fig05 | `geobotanical.png` | Geobotanical stress anomaly |
| fig06 | `prospectivity.png` | Prospectivity fusion + ranked targets |
| fig07 | `pixel_inspector.png` | Pixel inspector |

Recommended: wide PNGs (~1600 px), dark UI background to match the white-paper theme.

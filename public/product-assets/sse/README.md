# LENS (Semantic Search) white-paper figures

Platform screenshots / figure exports for the LENS white paper. The white paper
(`src/sections/products/LensWhitePaper.jsx`) loads them from
`/product-assets/sse/<filename>` and falls back to an "asset pending"
placeholder if a file is missing.

These were extracted from `SSE.docx` and resized to a 1760px max dimension. To
replace one, overwrite the file in place (keep the same name).

Filenames (from `src/data/products/sse.js` → `sseFigures`):

| Slot | Filename | Figure |
|------|----------|--------|
| fig00 | `geofm_embeddings_primer.png` | Geospatial embeddings and foundation models primer |
| fig01 | `sim_search_a.png` | Image similarity search — example A (V1) |
| fig02 | `sim_search_b.png` | Image similarity search — example B (V1) |
| fig03 | `sim_search_c.png` | Image similarity search — example C (V1) |
| fig04 | `sim_search_d.png` | Similarity across acquisition contexts (V1) |
| fig05 | `sim_search_e.png` | Ranked matches in spatial context (V1) |
| fig06 | `archive_scene_search.png` | Archive scene similarity search — platform UI (V2) |
| fig07 | `text_search_a.png` | Text search — platform view (V2) |
| fig08 | `text_search_b.png` | Text search — result detail (V2) |
| fig09 | `pixel_object_a.png` | Pixel and object similarity search — A (V2) |
| fig05 | `pixel_object_b.png` | Pixel and object similarity search — B (V2) |
| fig06 | `spotdiff_architecture.png` | SpotDiff pipeline architectural overview (V2) |
| fig07 | `spotdiff_case_studies.png` | SpotDiff case studies — solar and urban change (V2) |
| fig08 | `spotdiff_label_mask_generator.png` | LENS-powered label and mask generator (V2) |

Recommended: wide PNGs (~1600 px), dark UI background to match the white-paper theme.

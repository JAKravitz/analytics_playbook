/** LENS product API schema — semantic search, SpotDiff change detection, hosted embeddings. */

export const lensApiSchema = {
  intro:
    'LENS is not a per-layer raster catalog. It exposes search, SpotDiff change-detection, SSE-powered anomaly detection, and embedding endpoints over a customer-specific index built from entitled archive depth — hyper-local retrieval, not planetary search. Similarity, text, object, and SpotDiff change paths are semi-operational on MSI archive today; SSE-powered anomaly detection and Firefly VNIR HSI integration are V3 roadmap; GeoFM Embeddings API is roadmap.',
  delivery:
    'JSON ranked match lists with spatial footprints, acquisition metadata, and similarity scores. SpotDiff returns GeoTIFF change masks and optional similarity-map rasters between entitled T₀/T₁ pairs. Anomaly endpoints return ranked outlier patches/scenes with embedding-distance scores. GeoFM Embeddings API returns raw embedding vectors for customer fine-tuning workflows.',
  groups: [
    {
      title: 'Search',
      subtitle: 'Query by reference example — image, patch, object, or text — scoped to entitled archive or AOI.',
      endpoints: [
        {
          name: 'Similarity search',
          path: '/v1/lens/search/similarity',
          method: 'POST',
          returns: 'Ranked scenes, patches, or objects similar to a reference input',
          status: 'semi-operational',
          sensors: 'MSI (operational) · Firefly VNIR HSI (V3 roadmap)',
        },
        {
          name: 'Text search',
          path: '/v1/lens/search/text',
          method: 'POST',
          returns: 'Natural-language query mapped to embedding space → ranked matches',
          status: 'semi-operational',
          sensors: 'Archive index required',
        },
        {
          name: 'Object search',
          path: '/v1/lens/search/objects',
          method: 'POST',
          returns: 'Ranked discrete entities (facilities, waterbodies, canopy patches) encoded in the index',
          status: 'semi-operational',
          sensors: 'Archive index required',
        },
      ],
    },
    {
      title: 'Change detection (SpotDiff)',
      subtitle:
        'Sensor-agnostic, category-specific land-use change between temporal image pairs — semi-operational. Optional semantic class guidance (noun phrase) scopes masks to buildings, solar farms, land clearing, etc. Complements NEXUS event engines; outputs are analyst-review hypotheses.',
      endpoints: [
        {
          name: 'Category change mask',
          path: '/v1/lens/spotdiff/change',
          method: 'POST',
          returns:
            'Predicted change mask (GeoTIFF, H×W) for a semantic class between entitled T₀ and T₁ scene IDs or raster URIs; optional class phrase; multi-class supported per job',
          status: 'semi-operational',
          sensors: 'MSI · SAR · high-res optical (entitled pair)',
        },
        {
          name: 'Temporal similarity map',
          path: '/v1/lens/spotdiff/similarity-map',
          method: 'POST',
          returns:
            'Dense per-pixel embedding similarity map between T₀ and T₁ — foundation-model feature branch; low similarity highlights cover/structure divergence',
          status: 'semi-operational',
          sensors: 'MSI · SAR · high-res optical (entitled pair)',
        },
        {
          name: 'Language-guided ROI',
          path: '/v1/lens/spotdiff/roi',
          method: 'POST',
          returns:
            'Instance masks at T₀ and T₁ from class phrase, temporally fused into final ROI regions (SWIMS branch) — input to change operator or standalone QA',
          status: 'semi-operational',
          sensors: 'MSI · SAR · high-res optical · class phrase required',
        },
        {
          name: 'SpotDiff job status',
          path: '/v1/lens/spotdiff/jobs/{job_id}',
          method: 'GET',
          returns: 'Async job state, acquisition metadata, and signed URLs for change mask / similarity-map deliverables',
          status: 'semi-operational',
          sensors: 'N/A',
        },
      ],
    },
    {
      title: 'Labeling',
      subtitle:
        'Search-propagated masks from a single reference polygon — scales supervision for SpotDiff training and validation without hand-labeling every instance.',
      endpoints: [
        {
          name: 'Label propagation',
          path: '/v1/lens/labels/propagate',
          method: 'POST',
          returns:
            'Ground-truth-style instance mask (GeoTIFF or GeoJSON) of all patches/objects similar to a reference polygon on an input scene',
          status: 'in-development',
          sensors: 'MSI (operational) · archive index required',
        },
      ],
    },
    {
      title: 'Anomaly detection',
      subtitle:
        'SSE-powered semantic outlier ranking over the customer archive index — V3 roadmap. Surfaces patches and scenes that diverge from the archive embedding neighbourhood or a reference normal state. Complements NEXUS event engines; outputs are analyst-review hypotheses, not autonomous alerts.',
      endpoints: [
        {
          name: 'Archive anomaly scan',
          path: '/v1/lens/anomaly/scan',
          method: 'POST',
          returns:
            'Ranked outlier patches/scenes in a target acquisition vs the entitled archive embedding index — distance scores, footprints, and acquisition metadata',
          status: 'roadmap',
          sensors: 'MSI (operational) · Firefly VNIR HSI (V3 roadmap)',
        },
        {
          name: 'Reference anomaly scan',
          path: '/v1/lens/anomaly/reference',
          method: 'POST',
          returns:
            'Ranked regions in a scene that diverge from a supplied reference \u201cnormal\u201d chip or object embedding — same SSE index as similarity search',
          status: 'roadmap',
          sensors: 'Archive index required',
        },
        {
          name: 'Anomaly job status',
          path: '/v1/lens/anomaly/jobs/{job_id}',
          method: 'GET',
          returns: 'Async job state and signed URLs for ranked anomaly result lists or heatmap deliverables',
          status: 'roadmap',
          sensors: 'N/A',
        },
      ],
    },
    {
      title: 'Hosted embeddings',
      subtitle:
        'Pull geospatial foundation-model vectors over your archive or AOI to build downstream models — roadmap; interfaces and SLAs not yet finalized.',
      endpoints: [
        {
          name: 'GeoFM embeddings',
          path: '/v1/lens/embeddings',
          method: 'POST',
          returns:
            'Embedding vectors from DINOv3, Ollmo-earth, Tesserra, or Prithvi over customer archive or AOI imagery',
          status: 'roadmap',
          sensors: 'MSI (operational) · Firefly VNIR HSI encode (V3 roadmap)',
        },
      ],
    },
  ],
  footnote:
    'Paths and response schemas are indicative for internal scoping. Retrieval quality depends on archive depth and sensor tier. SpotDiff masks, anomaly scores, and similarity matches are ranked hypotheses for analyst review — not autonomous detections or enforcement outputs. SSE-powered anomaly detection is V3 roadmap. V1/V2 paths assume MSI archive indexing unless noted; Firefly HSI re-embedding is V3 roadmap. Defense engagements require ITAR review before scoping.',
};

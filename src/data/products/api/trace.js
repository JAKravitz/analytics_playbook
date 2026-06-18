/** TRACE product API schema — simplified layer catalog for integrators. */

export const traceApiSchema = {
  intro:
    'TRACE exposes a small set of REST endpoints over entitled AOIs. Each returns analysis-ready rasters, vectors, or JSON summaries — the same layers delivered in Insights as a Service and refreshed on Aurora subscription cadence.',
  delivery:
    'GeoTIFF rasters, GeoJSON / vector features, or JSON field summaries. Webhook delivery available as an add-on. All responses scoped to entitled AOI and acquisition dates.',
  groups: [
    {
      title: 'Field foundation',
      subtitle: 'Identity, classification, and season context — required context for every trait and index reading.',
      endpoints: [
        {
          name: 'Farm boundaries',
          path: '/v1/trace/boundaries',
          returns: 'Per-field polygons, persistent field IDs, and area (ha)',
          status: 'available',
          sensors: 'MSI · VNIR HSI',
        },
        {
          name: 'Crop classification',
          path: '/v1/trace/classification',
          returns: 'Crop / variety class per field with confidence score',
          status: 'available',
          sensors: 'MSI · VNIR HSI',
        },
        {
          name: 'Phenology',
          path: '/v1/trace/phenology',
          returns: 'Growth stage placement and AOI cycle statistics per field',
          status: 'available',
          sensors: 'MSI · VNIR HSI',
        },
        {
          name: 'Gap-filled NDVI',
          path: '/v1/trace/ndvi',
          returns: 'Cloud-gap-interpolated NDVI season trajectory per field',
          status: 'available',
          sensors: 'MSI · VNIR HSI',
        },
      ],
    },
    {
      title: 'Spectral retrieval',
      subtitle: 'Narrowband indices and PROSAIL biophysical traits — one-off state per delivery date, interpreted against phenology.',
      endpoints: [
        {
          name: 'Narrowband indices',
          path: '/v1/trace/indices',
          returns: 'NDRE, MCARI, CWSI, SIF, PSRI rasters per acquisition date',
          status: 'available',
          sensors: 'VNIR HSI recommended · MSI supported',
        },
        {
          name: 'PROSAIL traits',
          path: '/v1/trace/traits',
          returns: 'LAI, Cab, Cbrown, DW, EWT, Car, leaf nitrogen — per-pixel rasters and field aggregates',
          status: 'available',
          sensors: 'VNIR HSI recommended · MSI supported',
        },
        {
          name: 'Embeddings classification',
          path: '/v1/trace/classification/embeddings',
          returns: 'Label-sparse crop classification via spectral embeddings (beta)',
          status: 'in-development',
          sensors: 'MSI · VNIR HSI',
        },
      ],
    },
  ],
  footnote:
    'Paths and response schemas are indicative for internal scoping — not published customer API documentation. Scope is locked to operationally available pipeline layers; roadmap capabilities (yield forecasting, VRA, causal stress attribution) are not exposed here.',
};

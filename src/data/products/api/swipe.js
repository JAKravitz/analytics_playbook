/** SWIPE product API schema — simplified layer catalog for integrators. */

export const swipeApiSchema = {
  intro:
    'SWIPE exposes a compact REST surface over entitled waterbodies. Atmospheric correction, sunglint and adjacency handling, inversion, and uncertainty are internal to the pipeline — customers receive analysis-ready products, not intermediate correction layers.',
  delivery:
    'GeoTIFF constituent and IOP rasters with per-pixel uncertainty bands, GeoJSON waterbody masks, and JSON summary statistics. Scoped to entitled AOI and delivery dates.',
  groups: [
    {
      title: 'Optical products',
      subtitle: 'Constituents and inherent optical properties from full-spectrum inversion — not band-ratio indices.',
      endpoints: [
        {
          name: 'Water-leaving reflectance',
          path: '/v1/swipe/reflectance',
          returns: 'SWIPE-corrected analysis-ready water-leaving reflectance',
          status: 'available',
          sensors: 'VNIR HSI primary · MSI supported',
        },
        {
          name: 'Constituents',
          path: '/v1/swipe/constituents',
          returns: 'Chl-a, phycocyanin, CDOM, TSM, turbidity — each with per-pixel uncertainty',
          status: 'available',
          sensors: 'VNIR HSI primary · MSI supported',
        },
        {
          name: 'Harmful algal blooms',
          path: '/v1/swipe/hab',
          returns: 'Phycocyanin retrieval, bloom extent, phytoplankton carbon where signal supports',
          status: 'available',
          sensors: 'VNIR HSI recommended',
        },
        {
          name: 'Inherent optical properties',
          path: '/v1/swipe/iops',
          returns: 'Absorption and backscatter decomposition, attenuation where signal allows',
          status: 'available',
          sensors: 'VNIR HSI primary · MSI supported',
        },
      ],
    },
    {
      title: 'Non-optical proxies',
      subtitle: 'Model estimates fused with MicroClim climate forcing — not direct measurements.',
      endpoints: [
        {
          name: 'Water quality proxies',
          path: '/v1/swipe/proxies',
          returns: 'Dissolved oxygen, pH, and ammonia estimates with uncertainty',
          status: 'available',
          sensors: 'Requires optical stack + MicroClim',
        },
      ],
    },
  ],
  footnote:
    'Paths and response schemas are indicative for internal scoping. Non-optical outputs are always labeled as model estimates. PFT species discrimination and benthic habitat mapping are roadmap — not in this schema.',
};

/** SCOPE product API schema — simplified campaign layer catalog. */

export const scopeApiSchema = {
  intro:
    'SCOPE exposes campaign-scoped REST endpoints over a defined exploration AOI. Deliverables are episodic — one or more Firefly acquisitions per campaign — not a rolling subscription refresh. HSI is required for meaningful outputs.',
  delivery:
    'GeoTIFF classification and prospectivity rasters, GeoJSON ranked target polygons, PDF exploration report, and JSON pixel-inspector metadata. Campaign entitlement expires at contract end unless renewed.',
  groups: [
    {
      title: 'Exploration layers',
      subtitle: 'Surface mineralogy, alteration, REE proxy, structure, and fused prospectivity — exploration grade, VNIR today.',
      endpoints: [
        {
          name: 'Mineral classification',
          path: '/v1/scope/classification',
          returns: 'SAM + MTNF mineral class and abundance per pixel (goethite, hematite, jarosite, unclassified)',
          status: 'available',
          sensors: 'VNIR HSI required',
        },
        {
          name: 'Alteration halos',
          path: '/v1/scope/alteration',
          returns: 'Iron-oxide alteration composite and hydrothermal halo mapping',
          status: 'available',
          sensors: 'VNIR HSI required',
        },
        {
          name: 'REE proxy',
          path: '/v1/scope/ree',
          returns: 'Nd continuum-removal band depth — relative proxy, not grade or assay',
          status: 'available',
          sensors: 'VNIR HSI required',
        },
        {
          name: 'Structural framework',
          path: '/v1/scope/structure',
          returns: 'MNF edge magnitude, lineament framework, lithological contrast composite',
          status: 'available',
          sensors: 'VNIR HSI required',
        },
        {
          name: 'Prospectivity',
          path: '/v1/scope/prospectivity',
          returns: 'Fused 0–1 prospectivity surface and ranked target polygons with per-layer score breakdown',
          status: 'available',
          sensors: 'VNIR HSI required',
        },
        {
          name: 'Pixel inspector',
          path: '/v1/scope/inspect',
          method: 'GET',
          returns: 'Point-query JSON: classification, SAM/MTMF scores, REE depths, fusion contribution',
          status: 'available',
          sensors: 'VNIR HSI required',
        },
      ],
    },
  ],
  footnote:
    'Paths and response schemas are indicative for internal scoping. SWIR-grade mineral separation requires Honeybee (2027+). Never present REE band depth as concentration or drill-ready targeting without ground validation.',
};

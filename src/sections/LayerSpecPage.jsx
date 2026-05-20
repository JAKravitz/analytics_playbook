import { ArrowLeft } from 'lucide-react';
import LayerProductSpecDocument from '../components/LayerProductSpecDocument.jsx';
import { seedLayers } from '../data/layersCatalog.js';

export default function LayerSpecPage({ state, layerSpecId, navigate }) {
  const layers = Array.isArray(state.layers) ? state.layers : seedLayers;
  const layer = layerSpecId ? layers.find((l) => l.id === layerSpecId) : null;

  const goCatalog = () => {
    if (typeof navigate === 'function') navigate('layers');
    else if (typeof window !== 'undefined') {
      window.location.hash = 'layers';
    }
  };

  return (
    <div className="product-spec-page">
      <button type="button" className="product-spec-back" onClick={goCatalog}>
        <ArrowLeft size={16} />
        Back to API Catalog
      </button>

      {!layerSpecId && (
        <p className="section-sub">No API selected. Open a specification from the API Catalog.</p>
      )}

      {layerSpecId && !layer && (
        <>
          <p className="section-sub">
            No API found for ID <code>{layerSpecId}</code>. It may have been removed or the link is invalid.
          </p>
        </>
      )}

      {layer && <LayerProductSpecDocument layer={layer} />}
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import ConfBanner from './components/ConfBanner.jsx';
import Sidebar from './components/Sidebar.jsx';
import Home from './sections/Home.jsx';
import NexusWhitePaper from './sections/NexusWhitePaper.jsx';
import Agriculture from './sections/Agriculture.jsx';
import Forestry from './sections/Forestry.jsx';
import Aquatic from './sections/Aquatic.jsx';
import Geology from './sections/Geology.jsx';
import Defense from './sections/Defense.jsx';
import Claims from './sections/Claims.jsx';
import Messaging from './sections/Messaging.jsx';
import Resources from './sections/Resources.jsx';
import LayerCatalog from './sections/LayerCatalog.jsx';
import LayerSpecPage from './sections/LayerSpecPage.jsx';
import SemanticSearchEngine from './sections/SemanticSearchEngine.jsx';
import MicroClim from './sections/MicroClim.jsx';
import Quoting from './sections/Quoting.jsx';
import RevenueModels from './sections/RevenueModels.jsx';
import GroundResearch from './sections/GroundResearch.jsx';
import { seed } from './data/seed.js';
import { seedLayers, mergeStoredLayersWithSeed } from './data/layersCatalog.js';
import { storage } from './data/storage.js';
import { DEFAULT_QUOTE, mergeQuoteInputs, normalizeQuoteLine } from './data/pricingPresets.js';

const sectionMap = {
  home: Home,
  layers: LayerCatalog,
  'layer-spec': LayerSpecPage,
  sse: SemanticSearchEngine,
  microclim: MicroClim,
  nexus: NexusWhitePaper,
  agriculture: Agriculture,
  forestry: Forestry,
  aquatic: Aquatic,
  geology: Geology,
  defense: Defense,
  claims: Claims,
  messaging: Messaging,
  'revenue-models': RevenueModels,
  'ground-research': GroundResearch,
  resources: Resources,
  quoting: Quoting,
};

function parseRouteFromHash() {
  if (typeof window === 'undefined') return { section: 'home', layerSpecId: null };
  const raw = (window.location.hash.replace(/^#/, '') || 'home').trim();
  if (raw.startsWith('layer-spec/')) {
    const layerSpecId = raw.slice('layer-spec/'.length).trim() || null;
    return { section: 'layer-spec', layerSpecId };
  }
  if (sectionMap[raw]) return { section: raw, layerSpecId: null };
  return { section: 'home', layerSpecId: null };
}

function buildInitialState() {
  return {
    claims: structuredClone(seed.claims),
    objections: structuredClone(seed.objections),
    packages: {},
    layers: structuredClone(seedLayers),
    /** Seed catalog ids removed in the UI — kept here so they do not reappear after code updates. */
    removedSeedLayerIds: [],
    quote: structuredClone(DEFAULT_QUOTE),
  };
}

function mergeWithSeed(stored) {
  const base = buildInitialState();
  if (!stored || typeof stored !== 'object') return base;
  const storedQuote = stored.quote && typeof stored.quote === 'object' ? stored.quote : null;
  const removedRaw = Array.isArray(stored.removedSeedLayerIds) ? stored.removedSeedLayerIds : [];
  const removedSeedLayerIds = [...new Set(removedRaw)].filter((id) =>
    seedLayers.some((l) => l.id === id)
  );
  return {
    claims: { ...base.claims, ...(stored.claims || {}) },
    objections: Array.isArray(stored.objections) ? stored.objections : base.objections,
    packages: stored.packages && typeof stored.packages === 'object' ? stored.packages : {},
    layers: mergeStoredLayersWithSeed(
      Array.isArray(stored.layers) ? stored.layers : base.layers,
      removedSeedLayerIds
    ),
    removedSeedLayerIds,
    quote: storedQuote
      ? {
          ...base.quote,
          ...storedQuote,
          inputs: mergeQuoteInputs(base.quote.inputs, storedQuote.inputs || {}),
          lines: Array.isArray(storedQuote.lines)
            ? storedQuote.lines.map(normalizeQuoteLine)
            : base.quote.lines,
        }
      : base.quote,
  };
}

export default function App() {
  const [{ section, layerSpecId }, setRoute] = useState(parseRouteFromHash);
  const [theme, setTheme] = useState('dark');
  const [state, setState] = useState(() => buildInitialState());
  const [hydrated, setHydrated] = useState(false);
  const saveTimer = useRef(null);

  useEffect(() => {
    let cancelled = false;
    storage.get().then((stored) => {
      if (cancelled) return;
      setState(mergeWithSeed(stored));
      setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      storage.set(undefined, state);
    }, 350);
    return () => clearTimeout(saveTimer.current);
  }, [state, hydrated]);

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    const onHash = () => setRoute(parseRouteFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleSelect = (id) => {
    setRoute({ section: id, layerSpecId: null });
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${id}`);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const Section = sectionMap[section] || Home;

  const sectionProps = useMemo(
    () => ({
      state,
      setState,
      navigate: handleSelect,
      layerSpecId,
    }),
    [state, layerSpecId]
  );

  return (
    <>
      <ConfBanner />
      <div className="app-shell">
        <Sidebar
          section={section === 'layer-spec' ? 'layers' : section}
          onSelect={handleSelect}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        />
        <main className="main-area">
          <div className="main-scroll">
            <div
              className="section"
              key={section === 'layer-spec' ? `layer-spec-${layerSpecId || 'none'}` : section}
            >
              <Section {...sectionProps} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

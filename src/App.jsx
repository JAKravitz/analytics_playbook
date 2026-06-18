import { useEffect, useMemo, useRef, useState } from 'react';
import ConfBanner from './components/ConfBanner.jsx';
import Sidebar from './components/Sidebar.jsx';
import Home from './sections/Home.jsx';
import NexusWhitePaper from './sections/NexusWhitePaper.jsx';
import AgricultureProduct from './sections/products/AgricultureProduct.jsx';
import GeologyProduct from './sections/products/GeologyProduct.jsx';
import WaterProduct from './sections/products/WaterProduct.jsx';
import LayerCatalog from './sections/LayerCatalog.jsx';
import LayerSpecPage from './sections/LayerSpecPage.jsx';
import SSEProduct from './sections/products/SSEProduct.jsx';
import MicroClim from './sections/MicroClim.jsx';
import PilotProposalGenerator from './sections/PilotProposalGenerator.jsx';
import CommercialRequests from './sections/CommercialRequests.jsx';
import GroundResearch from './sections/GroundResearch.jsx';
import BespokeProjects from './sections/BespokeProjects.jsx';
import NextStepsTemp from './sections/NextStepsTemp.jsx';
import Resources from './sections/Resources.jsx';
import { seed, CLAIMS_VERSION } from './data/seed.js';
import {
  seedLayers,
  mergeStoredLayersWithSeed,
  CATALOG_VERSION,
} from './data/layersCatalog.js';
import { storage } from './data/storage.js';

const SIDEBAR_COLLAPSED_KEY = 'playbook-sidebar-collapsed';

function readSidebarCollapsed() {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1';
  } catch {
    return false;
  }
}

const sectionMap = {
  home: Home,
  layers: LayerCatalog,
  'layer-spec': LayerSpecPage,
  sse: SSEProduct,
  microclim: MicroClim,
  nexus: NexusWhitePaper,
  agriculture: AgricultureProduct,
  geology: GeologyProduct,
  water: WaterProduct,
  'ground-research': GroundResearch,
  'bespoke-projects': BespokeProjects,
  'next-steps-temp': NextStepsTemp,
  'commercial-requests': CommercialRequests,
  resources: Resources,
  quoting: PilotProposalGenerator,
};

/** Product sections that support #<slug>/<subView> routing. */
const PRODUCT_SECTIONS = new Set(['agriculture', 'geology', 'water', 'sse']);

function parseRouteFromHash() {
  if (typeof window === 'undefined') return { section: 'home', layerSpecId: null, subView: null };
  const raw = (window.location.hash.replace(/^#/, '') || 'home').trim();
  if (raw.startsWith('layer-spec/')) {
    const layerSpecId = raw.slice('layer-spec/'.length).trim() || null;
    return { section: 'layer-spec', layerSpecId, subView: null };
  }
  const [head, sub] = raw.split('/');
  if (PRODUCT_SECTIONS.has(head)) {
    return { section: head, layerSpecId: null, subView: sub || null };
  }
  if (raw === 'aquatic') return { section: 'water', layerSpecId: null, subView: null };
  if (sectionMap[raw]) return { section: raw, layerSpecId: null, subView: null };
  return { section: 'home', layerSpecId: null, subView: null };
}

function buildInitialState() {
  return {
    claims: structuredClone(seed.claims),
    objections: structuredClone(seed.objections),
    packages: {},
    layers: structuredClone(seedLayers),
    /** Seed catalog ids removed in the UI — kept here so they do not reappear after code updates. */
    removedSeedLayerIds: [],
    catalogVersion: CATALOG_VERSION,
    claimsVersion: CLAIMS_VERSION,
  };
}

function mergeWithSeed(stored) {
  const base = buildInitialState();
  if (!stored || typeof stored !== 'object') return base;
  const removedRaw = Array.isArray(stored.removedSeedLayerIds) ? stored.removedSeedLayerIds : [];
  const removedSeedLayerIds = [...new Set(removedRaw)].filter((id) =>
    seedLayers.some((l) => l.id === id)
  );
  const catalogStale =
    stored.catalogVersion == null || stored.catalogVersion !== CATALOG_VERSION;

  // Claims are read-only in the UI — always ship from seed.js (never merge persisted copy).
  const claims = structuredClone(base.claims);

  const storedPackages =
    stored.packages && typeof stored.packages === 'object' ? { ...stored.packages } : {};
  if (storedPackages.aquatic && !storedPackages.water) {
    storedPackages.water = storedPackages.aquatic;
    delete storedPackages.aquatic;
  }

  const layers = mergeStoredLayersWithSeed(
    catalogStale ? base.layers : Array.isArray(stored.layers) ? stored.layers : base.layers,
    removedSeedLayerIds
  );

  return {
    claims,
    objections: Array.isArray(stored.objections) ? stored.objections : base.objections,
    packages: storedPackages,
    layers,
    removedSeedLayerIds,
    catalogVersion: CATALOG_VERSION,
    claimsVersion: CLAIMS_VERSION,
  };
}

export default function App() {
  const [{ section, layerSpecId, subView }, setRoute] = useState(parseRouteFromHash);
  const [theme, setTheme] = useState('dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(readSidebarCollapsed);
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
      const { claims: _claims, ...persisted } = state;
      storage.set(undefined, { ...persisted, claimsVersion: CLAIMS_VERSION });
    }, 350);
    return () => clearTimeout(saveTimer.current);
  }, [state, hydrated]);

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, sidebarCollapsed ? '1' : '0');
    } catch {
      /* ignore quota / private mode */
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    const onHash = () => setRoute(parseRouteFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleSelect = (id) => {
    setRoute({ section: id, layerSpecId: null, subView: null });
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
      subView,
    }),
    [state, layerSpecId, subView]
  );

  return (
    <>
      <ConfBanner />
      <div className={`app-shell${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
        <Sidebar
          section={section === 'layer-spec' ? 'layers' : section}
          onSelect={handleSelect}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        />
        <main className="main-area">
          <div className="main-scroll">
            <div
              className="section"
              key={
                section === 'layer-spec'
                  ? `layer-spec-${layerSpecId || 'none'}`
                  : PRODUCT_SECTIONS.has(section)
                    ? `${section}-${subView || 'landing'}`
                    : section
              }
            >
              <Section {...sectionProps} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

import { useMemo, useState } from 'react';
import { Search, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import {
  seedLayers,
  LAYER_STATUSES,
  LAYER_STATUS_LABELS,
  layerStatusColor,
  LAYER_VERTICALS,
  LAYER_VERTICAL_LABELS,
  CATALOG_ACCESS_LABELS,
  catalogAccessForLayer,
} from '../data/layersCatalog.js';

/** Matches `seed.verticals.*.color` for consistent vertical branding. */
const VERTICAL_COLORS = {
  agriculture: '#D4A017',
  forestry: '#5BE584',
  water: '#4FC3F7',
  geology: '#F5A623',
  mining: '#9C6B2E',
  defense: '#EF5350',
};

/** API / Layer · Verticals · Access · Status · API ready · Spec */
const gridCols =
  'minmax(200px, 1.75fr) minmax(120px, 1.1fr) minmax(4.5rem, 0.7fr) minmax(7.5rem, 1fr) minmax(4.5rem, 0.75fr) 40px';

function FilterSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: '8px 10px',
        background: 'var(--bg3)',
        border: '1px solid var(--gray2)',
        borderRadius: 4,
        fontSize: 13,
        color: 'var(--text)',
        fontFamily: 'inherit',
        minWidth: 140,
      }}
    >
      {options.map(([v, label]) => (
        <option key={v} value={v}>
          {label}
        </option>
      ))}
    </select>
  );
}

function StatusPill({ status, children }) {
  const color = layerStatusColor(status);
  const bg =
    status === 'aurora'
      ? 'rgba(0,196,106,0.12)'
      : status === 'piloting'
        ? 'rgba(245,166,35,0.12)'
        : status === 'scoping'
          ? 'rgba(168,85,247,0.12)'
          : 'rgba(79,195,247,0.12)';
  const Icon =
    status === 'aurora' ? CheckCircle2 : status === 'piloting' ? Clock : AlertCircle;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 8px',
        borderRadius: 3,
        background: bg,
        color,
        fontSize: 11,
        fontWeight: 500,
        fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
        letterSpacing: '0.02em',
      }}
    >
      <Icon size={11} />
      {children}
    </span>
  );
}

function VerticalsCell({ verticals }) {
  if (!Array.isArray(verticals) || verticals.length === 0) {
    return <span style={{ color: 'var(--gray)', fontSize: 11 }}>—</span>;
  }
  return (
    <span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {verticals.map((v) => {
        const accent = VERTICAL_COLORS[v] || '#4FC3F7';
        const isHex = typeof accent === 'string' && /^#[0-9A-Fa-f]{6}$/.test(accent);
        const bg = isHex ? `${accent}22` : 'rgba(79, 195, 247, 0.12)';
        return (
          <span
            key={v}
            style={{
              fontSize: 10,
              fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
              padding: '3px 8px',
              borderRadius: 3,
              border: `1px solid ${accent}`,
              color: accent,
              background: bg,
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              fontWeight: 600,
            }}
          >
            {LAYER_VERTICAL_LABELS[v] || v}
          </span>
        );
      })}
    </span>
  );
}

function AccessCell({ layer }) {
  const access = catalogAccessForLayer(layer);
  return (
    <span
      style={{
        color: 'var(--white)',
        fontSize: 12,
        fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
      }}
    >
      {CATALOG_ACCESS_LABELS[access]}
    </span>
  );
}

function LayerRow({ layer }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: gridCols,
        padding: '12px 16px',
        borderBottom: '1px solid var(--gray2)',
        columnGap: 16,
        rowGap: 8,
        alignItems: 'center',
        fontSize: 15,
      }}
    >
      <div>
        <div style={{ fontWeight: 600, color: 'var(--white)' }}>{layer.name}</div>
        {layer.provides && (
          <div style={{ fontSize: 14, color: 'var(--gray)', marginTop: 2, lineHeight: 1.45 }}>
            {layer.provides}
          </div>
        )}
      </div>
      <div>
        <VerticalsCell verticals={layer.verticals} />
      </div>
      <div>
        <AccessCell layer={layer} />
      </div>
      <div style={{ paddingLeft: 8 }}>
        <StatusPill status={layer.status}>
          {LAYER_STATUS_LABELS[layer.status] || layer.status}
        </StatusPill>
      </div>
      <div style={{ fontFamily: 'IBM Plex Mono, ui-monospace, monospace', color: 'var(--gray)', fontSize: 13 }}>
        {layer.apiReady || '—'}
      </div>
      <a
        href={`#layer-spec/${layer.id}`}
        title="Open API specification"
        style={{
          display: 'flex',
          justifyContent: 'center',
          color: 'var(--cyan)',
          padding: 4,
        }}
        aria-label="API specification"
      >
        <FileText size={16} />
      </a>
    </div>
  );
}

export default function LayerCatalog({ state }) {
  const layers = Array.isArray(state.layers) ? state.layers : seedLayers;
  const [search, setSearch] = useState('');
  const [filterVertical, setFilterVertical] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return layers.filter((l) => {
      const notes = (l.notes || '').toLowerCase();
      const provides = (l.provides || '').toLowerCase();
      if (q && !l.name.toLowerCase().includes(q) && !notes.includes(q) && !provides.includes(q))
        return false;
      if (
        filterVertical !== 'all' &&
        !(Array.isArray(l.verticals) && l.verticals.includes(filterVertical))
      )
        return false;
      if (filterStatus !== 'all' && l.status !== filterStatus) return false;
      return true;
    });
  }, [layers, search, filterVertical, filterStatus]);

  return (
    <>
      <div className="eyebrow">Overview · API catalog</div>
      <h1 className="section-title">{layers.length} Analytics APIs</h1>
      <p className="section-sub">
        Analytics API endpoints in the seed catalog across verticals, with{' '}
        <strong>verticals</strong>, <strong>Access</strong> (internal — on request at no extra charge
        vs external), delivery <strong>status</strong>, and API-ready milestone. Pricing follows the{' '}
        <a href="#revenue-models" style={{ color: 'var(--cyan)' }}>
          revenue model
        </a>{' '}
        (subscription tier, campaigns, contracting) — list $/km² is no longer the primary framing on
        this page.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: 10,
              top: 11,
              color: 'var(--dim)',
              pointerEvents: 'none',
            }}
          />
          <input
            placeholder="Search name, notes, or what it provides…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px 8px 32px',
              background: 'var(--bg3)',
              border: '1px solid var(--gray2)',
              borderRadius: 4,
              fontSize: 13,
              color: 'var(--text)',
            }}
          />
        </div>
        <FilterSelect
          value={filterVertical}
          onChange={setFilterVertical}
          options={[
            ['all', 'All verticals'],
            ...LAYER_VERTICALS.map((v) => [v, LAYER_VERTICAL_LABELS[v] || v]),
          ]}
        />
        <FilterSelect
          value={filterStatus}
          onChange={setFilterStatus}
          options={[
            ['all', 'All status'],
            ...LAYER_STATUSES.map((s) => [s, LAYER_STATUS_LABELS[s] || s]),
          ]}
        />
      </div>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <div
          style={{
            minWidth: 760,
            background: 'var(--bg2)',
            border: '1px solid var(--gray2)',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: gridCols,
              padding: '10px 16px',
              background: 'var(--navy)',
              borderBottom: '1px solid var(--gray2)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--on-navy)',
              columnGap: 16,
              alignItems: 'center',
              fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
            }}
          >
            <div>API / Layer</div>
            <div>Verticals</div>
            <div>Access</div>
            <div style={{ paddingLeft: 8 }}>Status</div>
            <div>API ready</div>
            <div>Spec</div>
          </div>
          {filtered.map((l) => (
            <LayerRow key={l.id} layer={l} />
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray)', fontSize: 13 }}>
              No APIs match these filters.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

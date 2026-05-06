import { useMemo, useState } from 'react';
import {
  Search,
  Plus,
  Edit3,
  Save,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
} from 'lucide-react';
import Callout from '../components/Callout.jsx';
import {
  seedLayers,
  mergeStoredLayersWithSeed,
  LAYER_ENGINES,
  LAYER_STATUSES,
  LAYER_TIERS,
  LAYER_STATUS_LABELS,
} from '../data/layersCatalog.js';

const inputStyle = {
  width: '100%',
  padding: '7px 10px',
  background: 'var(--bg3)',
  border: '1px solid var(--gray2)',
  borderRadius: 3,
  fontSize: 13,
  color: 'var(--text)',
};

const gridCols = '2fr 1.2fr 0.65fr 0.75fr 1fr 0.85fr 40px 48px';

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
  const isAurora = status === 'aurora';
  const isPilot = status === 'piloting';
  const color = isAurora ? 'var(--green)' : isPilot ? 'var(--amber)' : 'var(--blue)';
  const bg = isAurora ? 'rgba(0,196,106,0.12)' : isPilot ? 'rgba(245,166,35,0.12)' : 'rgba(79,195,247,0.12)';
  const Icon = isAurora ? CheckCircle2 : isPilot ? Clock : AlertCircle;
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

function LayerRow({ layer, editing, onEdit, onClose, onUpdate, onRemove }) {
  if (editing) {
    return (
      <div
        style={{
          padding: 16,
          background: 'var(--bg3)',
          borderBottom: '1px solid var(--gray2)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginBottom: 12,
          }}
        >
          <label style={{ display: 'block' }}>
            <div className="layer-label" style={{ marginBottom: 4 }}>Name</div>
            <input
              value={layer.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              style={inputStyle}
            />
          </label>
          <label style={{ display: 'block' }}>
            <div className="layer-label" style={{ marginBottom: 4 }}>Engine</div>
            <select
              value={layer.engine}
              onChange={(e) => onUpdate({ engine: e.target.value })}
              style={inputStyle}
            >
              {LAYER_ENGINES.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: 'block' }}>
            <div className="layer-label" style={{ marginBottom: 4 }}>Tier</div>
            <select
              value={layer.tier}
              onChange={(e) => onUpdate({ tier: e.target.value })}
              style={inputStyle}
            >
              {LAYER_TIERS.map((t) => (
                <option key={t} value={t}>
                  {t === 'FF' ? 'FF (Firefly)' : t === 'Open' ? 'Open (datasets)' : 'Both'}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: 'block' }}>
            <div className="layer-label" style={{ marginBottom: 4 }}>Status</div>
            <select
              value={layer.status}
              onChange={(e) => onUpdate({ status: e.target.value })}
              style={inputStyle}
            >
              {LAYER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {LAYER_STATUS_LABELS[s] || s}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: 'block', gridColumn: '1 / -1' }}>
            <div className="layer-label" style={{ marginBottom: 4 }}>Base list $/km² (pilot calculator)</div>
            <input
              type="number"
              min={0}
              step={1}
              value={layer.baseUsdPerKm2 ?? 0}
              onChange={(e) => onUpdate({ baseUsdPerKm2: Math.max(0, +e.target.value) || 0 })}
              style={{ ...inputStyle, maxWidth: 200 }}
            />
          </label>
          <label style={{ display: 'block', gridColumn: '1 / -1' }}>
            <div className="layer-label" style={{ marginBottom: 4 }}>Ready</div>
            <input
              value={layer.ready}
              onChange={(e) => onUpdate({ ready: e.target.value })}
              style={inputStyle}
            />
          </label>
        </div>
        <label style={{ display: 'block' }}>
          <div className="layer-label" style={{ marginBottom: 4 }}>Notes</div>
          <textarea
            value={layer.notes || ''}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            rows={2}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </label>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <a
            href={`#layer-spec/${layer.id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 14px',
              background: 'var(--bg2)',
              color: 'var(--cyan)',
              border: '1px solid var(--cyan-dim)',
              borderRadius: 3,
              fontSize: 12,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <FileText size={13} /> Product specification
          </a>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '7px 14px',
              background: 'var(--cyan)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: 3,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Save size={13} /> Done
          </button>
          <button
            type="button"
            onClick={onRemove}
            style={{
              padding: '7px 14px',
              background: 'transparent',
              color: 'var(--gray)',
              border: '1px solid var(--gray2)',
              borderRadius: 3,
              fontSize: 12,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Trash2 size={13} /> Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: gridCols,
        padding: '12px 16px',
        borderBottom: '1px solid var(--gray2)',
        gap: 12,
        alignItems: 'center',
        fontSize: 13,
      }}
    >
      <div>
        <div style={{ fontWeight: 600, color: 'var(--white)' }}>{layer.name}</div>
        {layer.notes && (
          <div style={{ fontSize: 12, color: 'var(--gray)', marginTop: 2 }}>{layer.notes}</div>
        )}
      </div>
      <div style={{ color: 'var(--gray)', fontSize: 12 }}>{layer.engine}</div>
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--gray)', fontSize: 12 }}>
        {layer.tier}
      </div>
      <div>
        <input
          type="number"
          min={0}
          step={1}
          title="Commercial list rate — used when adding this layer to Pilot Pricing"
          value={layer.baseUsdPerKm2 ?? 0}
          onChange={(e) => onUpdate({ baseUsdPerKm2: Math.max(0, +e.target.value) || 0 })}
          style={{
            width: '100%',
            maxWidth: 76,
            padding: '4px 8px',
            background: 'var(--bg3)',
            border: '1px solid var(--gray2)',
            borderRadius: 3,
            fontSize: 12,
            fontFamily: 'IBM Plex Mono, monospace',
            color: 'var(--text)',
            textAlign: 'right',
          }}
        />
      </div>
      <div>
        <StatusPill status={layer.status}>
          {LAYER_STATUS_LABELS[layer.status] || layer.status}
        </StatusPill>
      </div>
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--gray)', fontSize: 12 }}>
        {layer.ready}
      </div>
      <a
        href={`#layer-spec/${layer.id}`}
        title="Open Product Specification (PDF-style)"
        style={{
          display: 'flex',
          justifyContent: 'center',
          color: 'var(--cyan)',
          padding: 4,
        }}
        aria-label="Product specification"
      >
        <FileText size={16} />
      </a>
      <button
        type="button"
        onClick={onEdit}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--gray)',
          cursor: 'pointer',
          padding: 4,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        aria-label="Edit layer"
      >
        <Edit3 size={14} />
      </button>
    </div>
  );
}

export default function LayerCatalog({ state, setState }) {
  const layers = Array.isArray(state.layers) ? state.layers : seedLayers;
  const removedSeedCount = (state.removedSeedLayerIds || []).length;
  const [search, setSearch] = useState('');
  const [filterEngine, setFilterEngine] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editing, setEditing] = useState(null);

  const setLayers = (next) => {
    setState((s) => ({
      ...s,
      layers: typeof next === 'function' ? next(s.layers || []) : next,
    }));
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return layers.filter((l) => {
      const notes = (l.notes || '').toLowerCase();
      if (q && !l.name.toLowerCase().includes(q) && !notes.includes(q)) return false;
      if (filterEngine !== 'all' && l.engine !== filterEngine) return false;
      if (filterStatus !== 'all' && l.status !== filterStatus) return false;
      return true;
    });
  }, [layers, search, filterEngine, filterStatus]);

  const update = (id, patch) => {
    setLayers((list) => list.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const remove = (id) => {
    if (typeof window !== 'undefined' && !window.confirm('Remove this layer?')) return;
    const isSeedLayer = seedLayers.some((l) => l.id === id);
    setState((s) => {
      const nextLayers = (s.layers || []).filter((l) => l.id !== id);
      const prev = s.removedSeedLayerIds || [];
      const nextRemoved =
        isSeedLayer && !prev.includes(id) ? [...prev, id] : prev;
      return { ...s, layers: nextLayers, removedSeedLayerIds: nextRemoved };
    });
    setEditing(null);
  };

  const addNew = () => {
    const newLayer = {
      id: `l${Date.now()}`,
      name: 'New layer',
      engine: 'Trait & Structure',
      tier: 'FF',
      grade: 'exploration',
      status: 'r&d',
      ready: 'TBD',
      notes: '',
      baseUsdPerKm2: 15,
    };
    setLayers((list) => [...list, newLayer]);
    setEditing(newLayer.id);
  };

  return (
    <>
      <div className="eyebrow">Overview · Layer catalog</div>
      <h1 className="section-title">{layers.length} Analytics Layers</h1>
      <p className="section-sub">
        Centerpiece reference: engine, sensor tier, a working <strong>Base list $/km²</strong> for
        the Pilot Pricing Calculator, delivery status, ready target, and notes. Search and filter;
        edit list rates directly in the table or open the pencil for full detail. Changes save with
        the rest of the playbook state.
      </p>

      <Callout type="info" label="How to use">
        Use filters to prep for a customer call (for example only <code>Aurora</code> layers).
        Set <strong>Base list $/km²</strong> per layer — that value is copied when you add the layer
        from the catalog on <strong>Commercial → Pilot Pricing Calculator</strong>. Use the{' '}
        <strong>document icon</strong> to open a <strong>Product Specification</strong> page (layout
        aligned with the corporate product spec: cover, TOC, numbered sections, parameter tables,
        glossary). Click the pencil for full edit, then <strong>Done</strong> to collapse. Add
        custom layers with <strong>Add layer</strong>.
      </Callout>
      <Callout type="info" label="Edits vs code in git">
        The catalog is saved with the rest of the playbook (this browser&apos;s{' '}
        <code>localStorage</code>, or Supabase when configured). <strong>Changes you make here override
        seed defaults</strong> for the same layer id when you pull new code or restart{' '}
        <code>npm run dev</code>. <strong>New</strong> layers added in code show up on the next load.
        If you <strong>remove</strong> a built-in row, it stays hidden until you use{' '}
        <strong>Restore removed seed layers</strong> below.
      </Callout>

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
            placeholder="Search name or notes…"
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
          value={filterEngine}
          onChange={setFilterEngine}
          options={[['all', 'All engines'], ...LAYER_ENGINES.map((e) => [e, e])]}
        />
        <FilterSelect
          value={filterStatus}
          onChange={setFilterStatus}
          options={[
            ['all', 'All status'],
            ...LAYER_STATUSES.map((s) => [s, LAYER_STATUS_LABELS[s] || s]),
          ]}
        />
        <button
          type="button"
          onClick={addNew}
          style={{
            padding: '8px 14px',
            background: 'var(--cyan)',
            color: 'var(--bg)',
            border: 'none',
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Plus size={14} /> Add layer
        </button>
      </div>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <div
          style={{
            minWidth: 720,
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
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#fff',
              gap: 12,
              fontFamily: 'IBM Plex Mono, monospace',
            }}
          >
            <div>Layer</div>
            <div>Engine</div>
            <div>Tier</div>
            <div>Base $/km²</div>
            <div>Status</div>
            <div>Ready</div>
            <div>Spec</div>
            <div />
          </div>
          {filtered.map((l) => (
            <LayerRow
              key={l.id}
              layer={l}
              editing={editing === l.id}
              onEdit={() => setEditing(l.id)}
              onClose={() => setEditing(null)}
              onUpdate={(patch) => update(l.id, patch)}
              onRemove={() => remove(l.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray)', fontSize: 13 }}>
              No layers match these filters.
            </div>
          )}
        </div>
      </div>

      {removedSeedCount > 0 && (
        <button
          type="button"
          className="add-btn"
          style={{ marginTop: 0, marginBottom: 24, maxWidth: 420 }}
          onClick={() => {
            setState((s) => ({
              ...s,
              removedSeedLayerIds: [],
              layers: mergeStoredLayersWithSeed(s.layers || [], []),
            }));
          }}
        >
          Restore {removedSeedCount} removed seed layer{removedSeedCount === 1 ? '' : 's'} (undo
          catalog deletes)
        </button>
      )}
    </>
  );
}

import { useState } from 'react';
import { Plus } from 'lucide-react';
import EditableItem from '../components/EditableItem.jsx';
import Callout from '../components/Callout.jsx';
import { seed } from '../data/seed.js';

const COLUMNS = [
  { key: 'now', label: 'Now · Bespoke delivery', cls: 'now' },
  { key: 'eoy', label: 'End of 2026 · NEXUS productized', cls: 'eoy' },
];

export default function Claims({ state, setState }) {
  const [activeVert, setActiveVert] = useState(Object.keys(seed.verticals)[0]);

  const claims = state.claims || {};
  const verticals = seed.verticals;

  const updateClaim = (vert, col, idx, value) => {
    setState((s) => {
      const next = structuredClone(s.claims);
      next[vert][col][idx] = value;
      return { ...s, claims: next };
    });
  };

  const removeClaim = (vert, col, idx) => {
    setState((s) => {
      const next = structuredClone(s.claims);
      next[vert][col].splice(idx, 1);
      return { ...s, claims: next };
    });
  };

  const addClaim = (vert, col) => {
    setState((s) => {
      const next = structuredClone(s.claims);
      next[vert][col].push('');
      return { ...s, claims: next };
    });
  };

  return (
    <>
      <div className="eyebrow">Commercial · Claims</div>
      <h1 className="section-title">What we can claim today vs end of 2026.</h1>
      <p className="section-sub">
        Per vertical: what we can deliver today on a bespoke per-engagement basis, and what
        becomes a productized NEXUS package by end of 2026. Every line is editable inline — keep
        them honest and specific.
      </p>

      <Callout type="stop" label="Hard rules">
        Never promise inventory-grade accuracy before validated. Never promise MRV-grade carbon
        before SWIR (Honeybee). Every claim must specify sensor tier and output grade.
      </Callout>
      <Callout type="info" label="Why this matters">
        We are an R&D-stage analytics team transitioning to productized delivery. Today we deliver
        individual layers on a bespoke per-customer basis. Communicating this honestly builds trust.
      </Callout>

      <div className="row" style={{ margin: '20px 0', gap: 10, flexWrap: 'wrap' }}>
        {Object.entries(verticals).map(([id, v]) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveVert(id)}
            className="badge claims-vert-tab"
            style={{
              cursor: 'pointer',
              borderColor: activeVert === id ? v.color : 'var(--gray2)',
              color: activeVert === id ? v.color : 'var(--text)',
              background:
                activeVert === id
                  ? `color-mix(in srgb, ${v.color} 12%, transparent)`
                  : 'var(--bg3)',
            }}
          >
            <span
              className="dot"
              style={{
                color: v.color,
                width: 11,
                height: 11,
                flexShrink: 0,
              }}
            />
            {v.name}
          </button>
        ))}
      </div>

      {Object.entries(verticals).map(([id, v]) => {
        if (id !== activeVert) return null;
        const c = claims[id] || { now: [], eoy: [], never: [] };
        return (
          <div key={id}>
            <div className="never-block" style={{ marginBottom: 24 }}>
              <div className="label">Never claim · {v.name}</div>
              {(c.never || []).map((text, idx) => (
                <EditableItem
                  key={idx}
                  value={text}
                  onChange={(val) => updateClaim(id, 'never', idx, val)}
                  onRemove={() => removeClaim(id, 'never', idx)}
                  placeholder="New never-claim…"
                />
              ))}
              <div style={{ padding: '10px 0 0' }}>
                <button
                  className="add-btn"
                  style={{ borderColor: 'rgba(239,83,80,0.4)', color: 'var(--red)' }}
                  onClick={() => addClaim(id, 'never')}
                >
                  <Plus size={11} style={{ marginRight: 4, verticalAlign: '-2px' }} />
                  Add never-claim
                </button>
              </div>
            </div>

            <div className="claims-grid">
              {COLUMNS.map((col) => (
                <div className={`claims-col ${col.cls}`} key={col.key}>
                  <div className="col-head">{col.label}</div>
                  <div>
                    {(c[col.key] || []).map((text, idx) => (
                      <EditableItem
                        key={idx}
                        value={text}
                        onChange={(val) => updateClaim(id, col.key, idx, val)}
                        onRemove={() => removeClaim(id, col.key, idx)}
                        placeholder="New claim…"
                      />
                    ))}
                    <div style={{ padding: '10px 12px' }}>
                      <button className="add-btn" onClick={() => addClaim(id, col.key)}>
                        <Plus size={11} style={{ marginRight: 4, verticalAlign: '-2px' }} />
                        Add claim
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="eyebrow" style={{ marginTop: 36 }}>Universal · Never claim</div>
      <div className="card" style={{ borderTop: '2px solid var(--red)' }}>
        <ul className="lang-list">
          {seed.universalNeverClaims.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

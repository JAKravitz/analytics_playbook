import { useState } from 'react';
import { Plus, Pencil, Check, X, ChevronDown, ChevronRight } from 'lucide-react';
import Card from '../components/Card.jsx';
import { seed } from '../data/seed.js';

function Objection({ idx, q, a, onChange, onRemove }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draftQ, setDraftQ] = useState(q);
  const [draftA, setDraftA] = useState(a);

  const save = () => {
    onChange({ q: draftQ.trim(), a: draftA.trim() });
    setEditing(false);
  };

  const cancel = () => {
    setDraftQ(q);
    setDraftA(a);
    setEditing(false);
  };

  return (
    <div className="acc">
      <button className="acc-head" onClick={() => setOpen(!open)}>
        <span>{q || <span style={{ color: 'var(--dim)' }}>(empty objection)</span>}</span>
        <span className="row">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
      </button>

      {open && !editing && (
        <div className="acc-body">
          <p style={{ margin: '0 0 12px' }}>{a}</p>
          <div className="row">
            <button className="icon-btn" onClick={() => setEditing(true)} aria-label="Edit">
              <Pencil size={12} />
            </button>
            <button className="icon-btn danger" onClick={onRemove} aria-label="Remove">
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      {open && editing && (
        <div className="acc-edit-row">
          <input
            type="text"
            value={draftQ}
            onChange={(e) => setDraftQ(e.target.value)}
            placeholder="Objection / question"
            style={{
              width: '100%',
              background: 'var(--bg3)',
              border: '1px solid var(--cyan-dim)',
              color: 'var(--text)',
              fontFamily: 'inherit',
              fontSize: 13,
              padding: '8px 10px',
            }}
          />
          <textarea
            value={draftA}
            rows={4}
            onChange={(e) => setDraftA(e.target.value)}
            placeholder="Response"
            style={{
              width: '100%',
              background: 'var(--bg3)',
              border: '1px solid var(--cyan-dim)',
              color: 'var(--text)',
              fontFamily: 'inherit',
              fontSize: 13,
              padding: '8px 10px',
            }}
          />
          <div className="row">
            <button className="icon-btn" onClick={save} aria-label="Save"><Check size={12} /></button>
            <button className="icon-btn" onClick={cancel} aria-label="Cancel"><X size={12} /></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Messaging({ state, setState }) {
  const objections = state.objections || [];
  const { messaging } = seed;

  const updateObjection = (idx, change) => {
    setState((s) => {
      const next = [...s.objections];
      next[idx] = { ...next[idx], ...change };
      return { ...s, objections: next };
    });
  };

  const removeObjection = (idx) => {
    setState((s) => {
      const next = [...s.objections];
      next.splice(idx, 1);
      return { ...s, objections: next };
    });
  };

  const addObjection = () => {
    setState((s) => ({
      ...s,
      objections: [...s.objections, { q: 'New objection', a: 'Draft response…' }],
    }));
  };

  return (
    <>
      <div className="eyebrow">Commercial · Messaging</div>
      <h1 className="section-title">How to talk about what we do.</h1>
      <p className="section-sub">
        Honest framing, the three core differentiators, the language guide, and a living list of
        objection responses. The objections accordion below is editable inline.
      </p>

      {/* Honest framing */}
      <div
        className="card"
        style={{ borderLeft: '3px solid var(--red)', marginBottom: 24 }}
      >
        <div className="layer-label" style={{ color: 'var(--red)', marginTop: 0 }}>
          {messaging.framing.label}
        </div>
        <p style={{ marginBottom: 0 }}>{messaging.framing.body}</p>
      </div>

      {/* Differentiators */}
      <div className="eyebrow">Core differentiators</div>
      <div className="card-grid grid-3" style={{ marginBottom: 24 }}>
        {messaging.differentiators.map((d) => (
          <Card key={d.num} eyebrow={d.num} title={d.title}>
            <p className="diff-quote">{d.quote}</p>
          </Card>
        ))}
      </div>

      {/* Language guide */}
      <div className="eyebrow">Language guide</div>
      <div className="split-2" style={{ marginBottom: 24 }}>
        <Card title="Use" accent="var(--green)">
          <ul className="lang-list">
            {messaging.language.use.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Card>
        <Card title="Avoid" accent="var(--red)">
          <ul className="lang-list">
            {messaging.language.avoid.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Objections */}
      <div className="eyebrow">Objection handling</div>
      <h2 style={{ margin: '0 0 14px' }}>The questions you will get asked.</h2>

      {objections.map((obj, idx) => (
        <Objection
          key={idx}
          idx={idx}
          q={obj.q}
          a={obj.a}
          onChange={(change) => updateObjection(idx, change)}
          onRemove={() => removeObjection(idx)}
        />
      ))}

      <button className="add-btn" onClick={addObjection}>
        <Plus size={11} style={{ marginRight: 4, verticalAlign: '-2px' }} />
        Add objection
      </button>
    </>
  );
}

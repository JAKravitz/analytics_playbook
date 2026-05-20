import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Card from '../components/Card.jsx';
import { seed } from '../data/seed.js';

function ObjectionAccordion({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="acc">
      <button className="acc-head" type="button" onClick={() => setOpen(!open)}>
        <span>{q || <span style={{ color: 'var(--dim)' }}>(empty objection)</span>}</span>
        <span className="row">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
      </button>

      {open && (
        <div className="acc-body">
          <p style={{ margin: 0 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Messaging({ state }) {
  const objections = state.objections || [];
  const { messaging } = seed;

  return (
    <>
      <div className="eyebrow">Commercial · Messaging</div>
      <h1 className="section-title">How to talk about what we do.</h1>
      <p className="section-sub">
        Honest framing, the three core differentiators, the language guide, and objection responses.
        Copy is maintained in the codebase and deployed with the app.
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
        <ObjectionAccordion key={idx} q={obj.q} a={obj.a} />
      ))}
    </>
  );
}

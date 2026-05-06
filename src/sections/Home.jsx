import { ArrowRight } from 'lucide-react';
import Callout from '../components/Callout.jsx';
import Card from '../components/Card.jsx';
import { seed } from '../data/seed.js';

export default function Home({ navigate }) {
  const { home, verticals } = seed;

  return (
    <>
      <Callout type="stop" label="Internal · Confidential">
        Pixxel Internal Use Only · Proprietary and Confidential. Do not distribute outside Pixxel without analytics-team review.
      </Callout>

      <div className="hero">
        <div className="eyebrow">{home.eyebrow}</div>
        <h1>{home.title}</h1>
        {home.body.map((p, i) => (
          <p key={i} className="lead" style={{ marginBottom: 12 }}>{p}</p>
        ))}
      </div>

      <div className="eyebrow">What the analytics team does</div>
      <div className="card-grid grid-2" style={{ marginBottom: 36 }}>
        {home.whatWeDo.map((c, i) => (
          <Card key={i} title={c.title}>
            <p style={{ margin: 0 }}>{c.body}</p>
          </Card>
        ))}
      </div>

      <div className="eyebrow">The five verticals</div>
      <div className="card-grid grid-3" style={{ marginBottom: 36 }}>
        {Object.entries(verticals).map(([id, v]) => (
          <button
            key={id}
            onClick={() => navigate(id)}
            className="card"
            style={{
              textAlign: 'left',
              cursor: 'pointer',
              borderTop: `2px solid ${v.color}`,
              background: 'var(--bg2)',
              color: 'inherit',
              borderRight: '1px solid var(--gray2)',
              borderBottom: '1px solid var(--gray2)',
              borderLeft: '1px solid var(--gray2)',
              padding: 24,
            }}
          >
            <div className="eyebrow" style={{ color: v.color, marginBottom: 8 }}>
              Vertical
            </div>
            <h3 style={{ margin: '0 0 6px', color: 'var(--white)' }}>{v.name}</h3>
            <p className="muted" style={{ fontSize: 12, margin: '0 0 12px' }}>{v.sub}</p>
            <span className="row" style={{ color: v.color, fontSize: 12 }}>
              Open vertical <ArrowRight size={12} />
            </span>
          </button>
        ))}
      </div>

      <Callout type="warn" label="Be honest">
        {home.warn}
      </Callout>

      <div className="eyebrow" style={{ marginTop: 32 }}>How to use this playbook</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 18,
        }}
      >
        {home.howToUse.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate(c.id)}
            className="card"
            style={{
              textAlign: 'left',
              cursor: 'pointer',
              background: 'var(--bg2)',
              color: 'inherit',
              border: '1px solid var(--gray2)',
              padding: 24,
            }}
          >
            <h3 style={{ margin: '0 0 6px', color: 'var(--white)' }}>{c.title}</h3>
            <p className="muted" style={{ fontSize: 13, margin: '0 0 12px' }}>{c.body}</p>
            <span className="row" style={{ color: 'var(--cyan)', fontSize: 12 }}>
              Open <ArrowRight size={12} />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

import { ArrowRight } from 'lucide-react';
import Callout from '../components/Callout.jsx';
import Card from '../components/Card.jsx';
import { seed } from '../data/seed.js';

const PRODUCTS = [
  { id: 'nexus', name: 'NEXUS', sub: 'North star · Intelligence cube', color: 'var(--green)' },
  { id: 'agriculture', name: 'TRACE', sub: 'Agriculture · Crop traits', color: '#4ADE80' },
  { id: 'geology', name: 'SCOPE', sub: 'Geology · Mineral prospecting', color: '#F5A623' },
  { id: 'water', name: 'SWIPE', sub: 'Water · Quality & HAB', color: '#4FC3F7' },
  { id: 'sse', name: 'LENS', sub: 'Semantic search · GeoFM', color: '#A78BFA' },
  { id: 'microclim', name: 'MICROCLIM', sub: 'Weather · Downscaled climate', color: 'var(--cyan)' },
];

export default function Home({ navigate }) {
  const { home } = seed;

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

      <div className="eyebrow">Products</div>
      <div className="card-grid grid-3" style={{ marginBottom: 36 }}>
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate(p.id)}
            className="card"
            style={{
              textAlign: 'left',
              cursor: 'pointer',
              borderTop: `2px solid ${p.color}`,
              background: 'var(--bg2)',
              color: 'inherit',
              borderRight: '1px solid var(--gray2)',
              borderBottom: '1px solid var(--gray2)',
              borderLeft: '1px solid var(--gray2)',
              padding: 24,
            }}
          >
            <div className="eyebrow" style={{ color: p.color, marginBottom: 8 }}>
              Product
            </div>
            <h3 style={{ margin: '0 0 6px', color: 'var(--white)' }}>{p.name}</h3>
            <p className="muted" style={{ fontSize: 12, margin: '0 0 12px' }}>{p.sub}</p>
            <span className="row" style={{ color: p.color, fontSize: 12 }}>
              Open product <ArrowRight size={12} />
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

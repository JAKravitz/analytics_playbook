import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import ProductPageShell from '../../components/ProductPageShell.jsx';
import Callout from '../../components/Callout.jsx';
import Card from '../../components/Card.jsx';
import ProductApiSchemaView from '../../components/ProductApiSchemaView.jsx';
import { sseProduct } from '../../data/products/sse.js';
import LensWhitePaper from './LensWhitePaper.jsx';
import ProductPricingView from '../../components/ProductPricingView.jsx';
import ProductOutputLayers from '../../components/ProductOutputLayers.jsx';

const VIEWS = [
  { id: 'landing', label: 'Overview' },
  { id: 'claims', label: 'What we can claim' },
  { id: 'messaging', label: 'Messaging & objections' },
  { id: 'whitepaper', label: 'White paper' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'api', label: 'API schema' },
];

/* ── Shared bits ───────────────────────────────────────────────────────── */

function SectionHeader({ label, subtitle, accent }) {
  return (
    <div style={{ marginTop: 32, marginBottom: 16, paddingBottom: 12, borderBottom: `2px solid ${accent}` }}>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
          color: accent,
          textTransform: 'uppercase',
          fontSize: 14,
          letterSpacing: '0.2em',
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      {subtitle && (
        <p style={{ margin: '10px 0 0', color: 'var(--gray)', fontSize: 13, lineHeight: 1.55, maxWidth: 760 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div style={{ overflowX: 'auto', margin: '14px 0' }}>
      <table style={{ width: '100%', minWidth: 640, borderCollapse: 'collapse', fontSize: 14, background: 'var(--bg3)' }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  textAlign: 'left',
                  padding: '9px 12px',
                  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                  fontSize: 10,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  color: 'var(--on-navy)',
                  fontWeight: 700,
                  background: 'var(--navy)',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: '9px 12px',
                    borderBottom: '1px solid var(--gray2)',
                    verticalAlign: 'top',
                    color: ci === 0 ? 'var(--white)' : 'var(--text)',
                    fontWeight: ci === 0 ? 600 : 400,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Landing / Overview ────────────────────────────────────────────────── */

function VersionBlock({ v }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <h3
          style={{
            margin: 0,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 28,
            fontWeight: 700,
            color: v.accent,
            letterSpacing: 0.3,
          }}
        >
          {v.version}
        </h3>
        <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gray)' }}>
          Target · {v.target}
        </span>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
            fontSize: 10,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            color: v.accent,
            padding: '2px 8px',
            border: `1px solid ${v.accent}55`,
            borderRadius: 2,
          }}
        >
          {v.status}
        </span>
      </div>
      <p style={{ margin: '0 0 14px', maxWidth: 820, color: 'var(--text)' }}>{v.summary}</p>
      <div className="card-grid grid-3">
        {v.features.map((f) => (
          <Card key={f.title} title={f.title} accent={v.accent}>
            <p style={{ margin: 0 }}>{f.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function LandingView({ product }) {
  const { landing } = product;
  return (
    <>
      <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--white)', maxWidth: 820, marginTop: 4 }}>
        {landing.lede}
      </p>
      {landing.paragraphs.map((p, i) => (
        <p key={i} style={{ maxWidth: 820, lineHeight: 1.65 }}>
          {p}
        </p>
      ))}

      <ProductOutputLayers outputLayers={landing.outputLayers} accent={product.color} />

      <SectionHeader label="How it is sold" accent={product.color} />
      <div className="card-grid grid-3" style={{ marginBottom: 20 }}>
        {landing.commercialModels.map((m) => (
          <Card key={m.title} title={m.title} accent={m.accent}>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{m.body}</p>
          </Card>
        ))}
      </div>

      <SectionHeader
        label="Hosted GeoFM backbones"
        subtitle="LENS is backbone-agnostic. It hosts geospatial foundation models and selects or blends them per task. The GeoFM Embeddings API (beta) exposes the same backbones as metered encode units over your archive or AOI."
        accent="var(--cyan)"
      />
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        {product.geoFM.map((g) => (
          <Card key={g.name} title={g.name} accent="var(--cyan)">
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{g.body}</p>
          </Card>
        ))}
      </div>

      <SectionHeader
        label="A new category of question"
        subtitle="Semantic search replaces threshold queries with search-by-example."
        accent={product.color}
      />
      <table className="ptable">
        <thead>
          <tr>
            <th>Traditional approach</th>
            <th>LENS semantic search</th>
          </tr>
        </thead>
        <tbody>
          {product.queryExamples.map((q, i) => (
            <tr key={i}>
              <td className="muted">{q.old}</td>
              <td>{q.sse}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SectionHeader
        label="Version roadmap"
        subtitle="Delivery is staged: V1 is semi-operational on MSI archive; V2 adds objects, text, and SpotDiff change (in development); V3 adds SSE-powered anomaly detection, Firefly HSI re-embedding, and operator UX; V4 adds production SLAs for embeddings. Targets are engineering goals, not customer commitments."
        accent={product.color}
      />
      {product.versions.map((v) => (
        <VersionBlock key={v.version} v={v} />
      ))}

      <SectionHeader label="Same engine, different questions" accent={product.color} />
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        {product.verticalUseCases.map((u) => (
          <Card key={u.title} title={u.title} accent={u.accent} eyebrow={u.eyebrow}>
            <p style={{ margin: 0 }}>{u.body}</p>
          </Card>
        ))}
      </div>

      <Callout type="info" label="North star · NEXUS">
        {landing.northStar}{' '}
        <a href="#nexus" style={{ color: 'var(--cyan)' }}>
          Read the NEXUS white paper →
        </a>
      </Callout>
    </>
  );
}

/* ── Claims ────────────────────────────────────────────────────────────── */

function ClaimsView({ product }) {
  const { claims, color } = product;
  return (
    <>
      <Callout type="stop" label="Hard rules">
        {claims.hardRules}
      </Callout>

      <div className="never-block" style={{ margin: '20px 0 24px' }}>
        <div className="label">Never claim · {product.name}</div>
        {claims.never.map((text, i) => (
          <div key={i} style={{ padding: '10px 0', borderBottom: '1px dashed var(--gray2)', fontSize: 13, lineHeight: 1.5 }}>
            {text}
          </div>
        ))}
      </div>

      <div className={`claims-grid${claims.roadmap ? ' claims-grid-3' : ''}`}>
        <div className="claims-col now">
          <div className="col-head">Now · Semi-operational (V1)</div>
          <div>
            {claims.now.map((text, i) => (
              <div key={i} style={{ padding: '10px 12px', borderBottom: '1px dashed var(--gray2)', fontSize: 13, lineHeight: 1.5 }}>
                {text}
              </div>
            ))}
          </div>
        </div>
        <div className="claims-col eoy">
          <div className="col-head">In development · V2</div>
          <div>
            {claims.eoy.map((text, i) => (
              <div key={i} style={{ padding: '10px 12px', borderBottom: '1px dashed var(--gray2)', fontSize: 13, lineHeight: 1.5 }}>
                {text}
              </div>
            ))}
          </div>
        </div>
        {claims.roadmap && (
          <div className="claims-col future">
            <div className="col-head">Roadmap · V3</div>
            <div>
              {claims.roadmap.map((text, i) => (
                <div key={i} style={{ padding: '10px 12px', borderBottom: '1px dashed var(--gray2)', fontSize: 13, lineHeight: 1.5 }}>
                  {text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <SectionHeader label="Similarity is a hypothesis" accent={color} />
      <p style={{ maxWidth: 760, fontSize: 14, color: 'var(--gray)' }}>
        Every result is a ranked hypothesis for expert review, not an autonomous decision — especially
        in defense, carbon, and exploration. Retrieval quality depends on archive depth and sensor
        tier. LENS searches the customer&rsquo;s entitled archive, not the planet. MSI indexing
        is operational today; SSE-powered anomaly detection and Firefly VNIR HSI integration are V3 roadmap. Version targets are
        engineering goals, not customer commitments.
      </p>
    </>
  );
}

/* ── Messaging & objections ────────────────────────────────────────────── */

function ObjectionAccordion({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="acc">
      <button className="acc-head" type="button" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="row">{open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
      </button>
      {open && (
        <div className="acc-body">
          <p style={{ margin: 0 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

function MessagingView({ product }) {
  const { messaging } = product;
  return (
    <>
      <div className="card" style={{ borderLeft: '3px solid var(--red)', marginBottom: 24 }}>
        <div className="layer-label" style={{ color: 'var(--red)', marginTop: 0 }}>
          Where we are right now — say this honestly
        </div>
        <p style={{ marginBottom: 0 }}>{messaging.framing}</p>
      </div>

      <div className="eyebrow">Core differentiators</div>
      <div className="card-grid grid-3" style={{ marginBottom: 24 }}>
        {messaging.differentiators.map((d) => (
          <Card key={d.num} eyebrow={d.num} title={d.title}>
            <p className="diff-quote">{d.quote}</p>
          </Card>
        ))}
      </div>

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

      <div className="eyebrow">Objection handling</div>
      <h2 style={{ margin: '0 0 14px' }}>The questions you will get asked.</h2>
      {messaging.objections.map((obj, i) => (
        <ObjectionAccordion key={i} q={obj.q} a={obj.a} />
      ))}
    </>
  );
}

/* ── Pricing ───────────────────────────────────────────────────────────── */

function PricingView({ product }) {
  return <ProductPricingView product={product} />;
}

/* ── White paper ───────────────────────────────────────────────────────── */

function WhitePaperView() {
  return <LensWhitePaper />;
}

/* ── Root ──────────────────────────────────────────────────────────────── */

export default function SSEProduct({ subView }) {
  const product = sseProduct;
  const active = VIEWS.some((v) => v.id === subView) ? subView : 'landing';

  return (
    <ProductPageShell product={product} views={VIEWS} activeView={active}>
      {active === 'landing' && <LandingView product={product} />}
      {active === 'claims' && <ClaimsView product={product} />}
      {active === 'messaging' && <MessagingView product={product} />}
      {active === 'whitepaper' && <WhitePaperView />}
      {active === 'pricing' && <PricingView product={product} />}
      {active === 'api' && <ProductApiSchemaView product={product} />}
    </ProductPageShell>
  );
}

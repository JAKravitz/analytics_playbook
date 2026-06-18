import Card from '../components/Card.jsx';
import Callout from '../components/Callout.jsx';
import NexusArchitectureGraphic from '../components/NexusArchitectureGraphic.jsx';
import {
  OntologyFigure,
  OneSystemFigure,
  SemanticSpaceFigure,
  ThreeComponentFigure,
  BuildStatusTimeline,
  CompoundingValueFigure,
} from '../components/NexusFigures.jsx';
import { seed } from '../data/seed.js';

const MONO = "'IBM Plex Mono', ui-monospace, monospace";

const PHYSICS = [
  {
    name: 'PROSAIL',
    role: 'Vegetation inversion',
    accent: '#D4A017',
    body: 'Retrieves canopy biophysical state (LAI, chlorophyll, canopy water, dry matter, carotenoids) by inverting the physical model of light in a plant canopy.',
  },
  {
    name: 'HydroLight',
    role: 'Aquatic inversion',
    accent: '#4FC3F7',
    body: 'Aquatic radiative transfer and optical modeling: inverts water-leaving reflectance to inherent optical properties (IOPs) and water-quality constituents. Operationalized through a validated deep-learning emulator — physics-grade IOP retrieval made computationally tractable across all monitored waterbodies.',
  },
  {
    name: 'SAM + MTNF',
    role: 'Mineral unmixing',
    accent: '#F5A623',
    body: 'Spectral unmixing for mineral abundance and class against known signatures, with atmospheric and vegetation contamination handled explicitly.',
  },
];

export default function NexusWhitePaper() {
  const n = seed.nexus;

  return (
    <>
      <div className="eyebrow">{n.whitePaper.eyebrow}</div>
      <h1 className="section-title">{n.whitePaper.title}</h1>
      <p className="section-sub">{n.whitePaper.subtitle}</p>
      <p style={{ marginBottom: 24, maxWidth: 760 }}>
        <a href="#sse" style={{ color: 'var(--cyan)' }}>
          {n.whitePaper.sseLinkLabel} →
        </a>
      </p>

      {/* 01 · What NEXUS is */}
      <div className="eyebrow" style={{ marginTop: 36 }}>01 · What NEXUS is</div>
      <h2 style={{ marginTop: 0 }}>{n.unified.title}</h2>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>{n.unified.intro}</p>
      <div className="card-grid grid-2" style={{ marginBottom: 16 }}>
        {n.unified.components.map((c) => (
          <Card key={c.title} title={c.title} accent="var(--cyan)">
            <p style={{ margin: 0 }}>{c.body}</p>
          </Card>
        ))}
      </div>
      <OneSystemFigure />
      <Callout type="info" label="One system">
        <p style={{ margin: 0 }}>{n.unified.inseparable}</p>
      </Callout>
      <Callout type="info" label="Starts deep, not shallow">
        <p style={{ margin: 0 }}>{n.unified.onboardingCallout}</p>
      </Callout>

      <Callout type="warning" label="What is operational today">
        <p style={{ margin: 0 }}>{n.whatIsLiveNow}</p>
      </Callout>

      {/* 02 · Ontology */}
      <div className="eyebrow" style={{ marginTop: 36 }}>02 · Ontology &amp; philosophy</div>
      <h2 style={{ marginTop: 0 }}>{n.ontology.title}</h2>
      <p style={{ marginBottom: 14, maxWidth: 820 }}>{n.ontology.intro}</p>
      <p style={{ marginBottom: 14, maxWidth: 820 }}>{n.ontology.principle}</p>
      <OntologyFigure />
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        <Card title={n.ontology.contrast.pixelLabel} accent="var(--gray)" eyebrow="Most EO">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {n.ontology.contrast.pixel.map((it, i) => (
              <li key={i} style={{ marginBottom: 6, lineHeight: 1.5 }}>{it}</li>
            ))}
          </ul>
        </Card>
        <Card title={n.ontology.contrast.objectLabel} accent="var(--cyan)" eyebrow="NEXUS">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {n.ontology.contrast.object.map((it, i) => (
              <li key={i} style={{ marginBottom: 6, lineHeight: 1.5 }}>{it}</li>
            ))}
          </ul>
        </Card>
      </div>
      <p style={{ marginBottom: 14, maxWidth: 820 }}>{n.ontology.technical}</p>
      <Callout type="info" label="What ontology means here">
        <p style={{ margin: 0 }}>{n.ontology.plainLanguage}</p>
      </Callout>

      {/* 03 · The problem */}
      <div className="eyebrow" style={{ marginTop: 36 }}>03 · The problem</div>
      <h2 style={{ marginTop: 0 }}>{n.problem.title}</h2>
      <p style={{ marginBottom: 18, maxWidth: 760 }}>{n.problem.intro}</p>
      <div
        style={{
          border: '1px solid var(--gray2)',
          borderLeft: '2px solid var(--red)',
          background: 'var(--bg2)',
          maxWidth: 900,
          marginBottom: 18,
        }}
      >
        {n.problem.cards.map((c, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 16,
              padding: '13px 18px',
              borderTop: i ? '1px solid var(--gray2)' : 'none',
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--red)',
                minWidth: 24,
                paddingTop: 2,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <span style={{ fontWeight: 700, color: 'var(--text)' }}>{c.title}.</span>{' '}
              <span style={{ color: 'var(--gray)' }}>{c.body}</span>
            </div>
          </div>
        ))}
      </div>
      <Callout type="info" label="Why this matters">{n.problem.callout}</Callout>

      {/* 04 · Capabilities */}
      <div className="eyebrow" style={{ marginTop: 36 }}>04 · Capabilities</div>
      <h2 style={{ marginTop: 0 }}>{n.capabilities.title}</h2>
      <p style={{ marginBottom: 20, maxWidth: 820 }}>{n.capabilities.intro}</p>
      <div style={{ borderLeft: '2px solid var(--cyan-dim)', marginLeft: 16, maxWidth: 820, marginBottom: 24 }}>
        {n.capabilities.pillars.map((p, i) => (
          <div
            key={p.num}
            style={{
              display: 'flex',
              gap: 18,
              alignItems: 'flex-start',
              marginLeft: -17,
              marginBottom: i === n.capabilities.pillars.length - 1 ? 0 : 22,
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '1px solid var(--cyan)',
                background: 'var(--bg)',
                color: 'var(--cyan)',
                fontFamily: MONO,
                fontSize: 12,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {p.num}
            </span>
            <div style={{ paddingTop: 3 }}>
              <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{p.title}</div>
              <p style={{ margin: 0, color: 'var(--gray)', maxWidth: 740 }}>{p.body}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 style={{ margin: '8px 0 4px', fontSize: 16 }}>NEXUS semantic query</h3>
      <p className="muted" style={{ fontSize: 13, maxWidth: 820, margin: '0 0 12px' }}>
        The same questions, reframed from pixel rules to field-state retrieval.
      </p>
      <div style={{ border: '1px solid var(--gray2)', background: 'var(--bg2)', maxWidth: 980, marginBottom: 16 }}>
        {n.capabilities.queryContrast.old.map((oldQ, i) => {
          const nexusQ = n.capabilities.queryContrast.nexus[i];
          return (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 28px 1fr',
                gap: 14,
                alignItems: 'center',
                padding: '14px 18px',
                borderTop: i ? '1px solid var(--gray2)' : 'none',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: 'var(--gray)',
                    marginBottom: 5,
                  }}
                >
                  Traditional
                </div>
                <em style={{ color: 'var(--gray)' }}>&ldquo;{oldQ.quote}&rdquo;</em>
              </div>
              <span style={{ color: 'var(--cyan)', fontSize: 18, textAlign: 'center' }}>&rarr;</span>
              <div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: 'var(--cyan)',
                    marginBottom: 5,
                  }}
                >
                  NEXUS · {nexusQ.title}
                </div>
                <strong style={{ color: 'var(--text)' }}>&ldquo;{nexusQ.quote}&rdquo;</strong>
              </div>
            </div>
          );
        })}
      </div>
      <SemanticSpaceFigure />
      <p className="muted" style={{ fontSize: 14, maxWidth: 820, marginBottom: 18 }}>
        {n.capabilities.queryFootnote}
      </p>

      {/* 05 · Physics first */}
      <div className="eyebrow" style={{ marginTop: 36 }}>05 · Physics first</div>
      <h2 style={{ marginTop: 0 }}>Radiative transfer physics: PROSAIL, HydroLight, and domain models.</h2>
      <p style={{ marginBottom: 18, maxWidth: 760 }}>{n.physicsIntro}</p>
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        {PHYSICS.map((p) => (
          <Card key={p.name} title={p.name} accent={p.accent} eyebrow={p.role}>
            <p style={{ margin: 0 }}>{p.body}</p>
          </Card>
        ))}
      </div>
      <Callout type="info" label="Outputs are auditable">
        <p style={{ margin: 0 }}>{n.physicsAudit}</p>
      </Callout>
      <Callout type="warning" label="Physics and learned models are not in tension">
        <p style={{ margin: 0 }}>{n.physicsVsDinov3}</p>
      </Callout>

      {/* 06 · Inputs & sensors */}
      <div className="eyebrow" style={{ marginTop: 36 }}>{n.sensors.eyebrow}</div>
      <h2 style={{ marginTop: 0 }}>{n.sensors.title}</h2>
      <p style={{ marginBottom: 14, maxWidth: 820 }}>
        <strong>{n.inputs.title}:</strong>
      </p>
      <ul style={{ margin: '0 0 16px', paddingLeft: 22, maxWidth: 820, lineHeight: 1.6 }}>
        {n.inputs.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <Callout type="info" label="What happens at onboarding">
        <p style={{ margin: 0 }}>{n.inputs.onboardingNote}</p>
      </Callout>
      <div className="split-2 nexus-sensors-split" style={{ marginBottom: 24 }}>
        <Card title={n.sensors.msi.title} accent="var(--blue)">
          <p>{n.sensors.msi.body}</p>
          <div className="nexus-sensor-mock-stack">
            <div className="layer-label">Field 47 · Mock output</div>
            <pre className="nexus-mock-output">{n.sensors.msi.example.join('\n')}</pre>
          </div>
        </Card>
        <Card className="nexus-sensor-hsi" title={n.sensors.hsi.title} accent="var(--purple)">
          <p>{n.sensors.hsi.body}</p>
          <div className="nexus-sensor-mock-stack">
            <div className="layer-label">Field 47 · Mock output</div>
            <pre className="nexus-mock-output">{n.sensors.hsi.example.join('\n')}</pre>
          </div>
        </Card>
      </div>

      {/* 07 · How NEXUS works */}
      <div className="eyebrow" style={{ marginTop: 36 }}>07 · How NEXUS works</div>
      <h2 style={{ marginTop: 0 }}>From sensors to delivery.</h2>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>
        The stack composes from acquisition through cube, query, climate context, and customer
        delivery. Semantic query is part of NEXUS, not a separate product sitting on top. Five
        stages — Observe, Ingest, Understand, Retrieve, Decide — span the NEXUS Engine and the
        AURORA delivery platform.
      </p>
      <NexusArchitectureGraphic
        caption="Five-stage north-star architecture. Stages 01–04 (Observe → Retrieve) form the NEXUS Engine: multimodal constellation ingest, analysis-ready data cubes, four-engine intelligence core, and the LENS semantic foundation. Stage 05 (Decide) is the AURORA Platform: vertical scoring, alerts, and delivery for Agriculture, Forestry, Water, and Geology."
      />
      <div className="card-grid grid-2" style={{ marginBottom: 22 }}>
        {n.stack.map((s) => (
          <Card key={s.name} title={s.name} accent={s.accent} eyebrow={s.role}>
            <p style={{ margin: 0 }}>{s.body}</p>
          </Card>
        ))}
      </div>
      <div className="eyebrow" style={{ marginTop: 8 }}>Inside the NEXUS engines</div>
      <h3 style={{ margin: '0 0 12px' }}>{n.architecture.title}</h3>
      <div className="card-grid grid-3" style={{ marginBottom: 16 }}>
        {n.architecture.engines.map((e) => (
          <Card key={e.name} title={e.name} eyebrow={e.eyebrow} accent={e.accent}>
            <p style={{ margin: 0 }}>{e.body}</p>
          </Card>
        ))}
      </div>

      {/* 08 · Three-component story */}
      <div className="eyebrow" style={{ marginTop: 36 }}>08 · Three-component story</div>
      <h2 style={{ marginTop: 0 }}>How the pieces fit for technical audiences.</h2>
      <ThreeComponentFigure />
      <div className="card-grid grid-3" style={{ marginBottom: 18 }}>
        {n.threeComponents.map((c) => (
          <Card key={c.name} title={c.name} accent="var(--cyan)">
            <p style={{ margin: 0 }}>{c.body}</p>
          </Card>
        ))}
      </div>

      {/* 09 · Technical specifications */}
      <div className="eyebrow" style={{ marginTop: 36 }}>09 · Technical specifications</div>
      <h2 style={{ marginTop: 0 }}>{n.techSpecs.title}</h2>
      <table className="ptable" style={{ marginBottom: 18 }}>
        <thead>
          <tr>
            {n.techSpecs.retrievalHeaders.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {n.techSpecs.retrievals.map((row, i) => (
            <tr key={i}>
              <td className="muted">{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="ptable" style={{ marginBottom: 18 }}>
        <thead>
          <tr>
            {n.techSpecs.semanticHeaders.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {n.techSpecs.semantic.map((row, i) => (
            <tr key={i}>
              <td className="muted">{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 10 · Differentiation */}
      <div className="eyebrow" style={{ marginTop: 36 }}>10 · Differentiation</div>
      <h2 style={{ marginTop: 0 }}>{n.differentiation.title}</h2>
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        <Card title="Planetary intelligence" accent="var(--gray)" eyebrow="Most of the industry">
          <p style={{ margin: 0 }}>{n.claimContrast.planetary}</p>
        </Card>
        <Card title="Hyper-local intelligence" accent="var(--cyan)" eyebrow="Pixxel · NEXUS">
          <p style={{ margin: 0 }}>{n.claimContrast.hyperlocal}</p>
        </Card>
      </div>
      <table className="ptable">
        <thead>
          <tr>
            <th>Other platforms</th>
            <th>Pixxel · NEXUS</th>
          </tr>
        </thead>
        <tbody>
          {n.differentiation.rows.map((r, i) => (
            <tr key={i}>
              <td className="muted">{r.them}</td>
              <td>{r.us}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 11 · What this enables */}
      <div className="eyebrow" style={{ marginTop: 36 }}>11 · What this enables</div>
      <h2 style={{ marginTop: 0 }}>The same architecture, four intelligence systems.</h2>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>
        Physics and object architecture are shared. What changes is the domain and how deep the
        system has learned each monitored place.
      </p>
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        {n.vignettes.map((v) => (
          <Card key={v.persona} title={v.persona} accent={v.color} eyebrow={v.vertical}>
            <p style={{ margin: 0 }}>{v.body}</p>
          </Card>
        ))}
      </div>

      {/* 12 · Honest science & build status */}
      <div className="eyebrow" style={{ marginTop: 36 }}>12 · Honest science & build status</div>
      <h2 style={{ marginTop: 0 }}>{n.honestScience.title}</h2>
      {n.honestScience.paragraphs.map((p, i) => (
        <p key={i} style={{ marginBottom: 14, maxWidth: 820 }}>
          {p}
        </p>
      ))}
      <Callout type="info" label="Commercial advantage">
        <p style={{ margin: 0 }}>{n.honestScience.advantage}</p>
      </Callout>
      <h3 style={{ margin: '24px 0 12px' }}>{n.buildStatus.title}</h3>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>{n.buildStatus.intro}</p>
      <BuildStatusTimeline />
      <div className="card-grid grid-3" style={{ marginBottom: 18 }}>
        {n.buildStatus.columns.map((col) => (
          <Card key={col.label} accent={col.accent} eyebrow={col.label}>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {col.items.map((it, i) => (
                <li key={i} style={{ marginBottom: 6, lineHeight: 1.55 }}>
                  {it}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <Callout type="stop" label="What we do not claim">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {n.doNotClaim.map((item, i) => (
            <li key={i} style={{ marginBottom: 4, lineHeight: 1.55 }}>
              {item}
            </li>
          ))}
        </ul>
      </Callout>

      {/* 13 · Roadmap */}
      <div className="eyebrow" style={{ marginTop: 36 }}>13 · Roadmap</div>
      <h2 style={{ marginTop: 0 }}>{n.roadmap.title}</h2>
      <div className="card-grid grid-4">
        {n.roadmap.phases.map((p) => (
          <Card key={p.when} eyebrow={p.when} title={p.title}>
            <p style={{ margin: 0 }}>{p.body}</p>
          </Card>
        ))}
      </div>

      <CompoundingValueFigure />
      <Callout type="info" label={n.closing.label}>
        {n.closing.paragraphs.map((p, i) => (
          <p key={i} style={{ margin: i === 0 ? '0 0 8px' : 0 }}>
            {p}
          </p>
        ))}
      </Callout>
    </>
  );
}

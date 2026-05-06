import Card from '../components/Card.jsx';
import Callout from '../components/Callout.jsx';
import NexusGraphic from '../components/NexusGraphic.jsx';
import { seed } from '../data/seed.js';

export default function NexusWhitePaper() {
  const { nexus } = seed;

  return (
    <>
      <div className="eyebrow">Overview · NEXUS</div>
      <h1 className="section-title">A queryable intelligence cube for Earth.</h1>
      <p className="section-sub">
        The technical and commercial argument for Pixxel's analytics platform — what is broken,
        what NEXUS does about it, how the engines compose, and where the roadmap goes.
      </p>

      {/* Problem */}
      <div className="eyebrow">{nexus.problem.eyebrow}</div>
      <h2 style={{ marginTop: 0 }}>{nexus.problem.title}</h2>
      <p style={{ marginBottom: 18, maxWidth: 760 }}>{nexus.problem.intro}</p>
      <div className="card-grid grid-3" style={{ marginBottom: 18 }}>
        {nexus.problem.cards.map((c, i) => (
          <Card key={i} title={c.title}>
            <p style={{ margin: 0 }}>{c.body}</p>
          </Card>
        ))}
      </div>
      <Callout type="info" label="Why this matters">{nexus.problem.callout}</Callout>

      {/* Platform */}
      <div className="eyebrow" style={{ marginTop: 36 }}>{nexus.platform.eyebrow}</div>
      <h2 style={{ marginTop: 0 }}>{nexus.platform.title}</h2>
      <div className="card-grid grid-2" style={{ marginBottom: 16 }}>
        {nexus.platform.pillars.map((p) => (
          <Card key={p.num} eyebrow={p.num} title={p.title}>
            <p style={{ margin: 0 }}>{p.body}</p>
          </Card>
        ))}
      </div>

      {/* Architecture */}
      <div className="eyebrow" style={{ marginTop: 36 }}>{nexus.architecture.eyebrow}</div>
      <h2 style={{ marginTop: 0 }}>{nexus.architecture.title}</h2>
      <NexusGraphic />
      <div className="card-grid grid-3" style={{ marginBottom: 16 }}>
        {nexus.architecture.engines.map((e) => (
          <Card key={e.name} title={e.name}>
            <p style={{ margin: 0 }}>{e.body}</p>
          </Card>
        ))}
      </div>

      {/* Differentiation */}
      <div className="eyebrow" style={{ marginTop: 36 }}>{nexus.differentiation.eyebrow}</div>
      <h2 style={{ marginTop: 0 }}>{nexus.differentiation.title}</h2>
      <table className="ptable">
        <thead>
          <tr>
            <th>Other platforms</th>
            <th>Pixxel · NEXUS</th>
          </tr>
        </thead>
        <tbody>
          {nexus.differentiation.rows.map((r, i) => (
            <tr key={i}>
              <td className="muted">{r.them}</td>
              <td>{r.us}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sensors */}
      <div className="eyebrow" style={{ marginTop: 36 }}>{nexus.sensors.eyebrow}</div>
      <h2 style={{ marginTop: 0 }}>{nexus.sensors.title}</h2>
      <div className="split-2 nexus-sensors-split" style={{ marginBottom: 24 }}>
        <Card title={nexus.sensors.msi.title} accent="var(--blue)">
          <p>{nexus.sensors.msi.body}</p>
          <div className="nexus-sensor-mock-stack">
            <div className="layer-label">Field 47 · Mock output</div>
            <pre className="nexus-mock-output">{nexus.sensors.msi.example.join('\n')}</pre>
          </div>
        </Card>
        <Card className="nexus-sensor-hsi" title={nexus.sensors.hsi.title} accent="var(--purple)">
          <p>{nexus.sensors.hsi.body}</p>
          <div className="nexus-sensor-mock-stack">
            <div className="layer-label">Field 47 · Mock output</div>
            <pre className="nexus-mock-output">{nexus.sensors.hsi.example.join('\n')}</pre>
          </div>
        </Card>
      </div>

      {/* Roadmap */}
      <div className="eyebrow" style={{ marginTop: 36 }}>{nexus.roadmap.eyebrow}</div>
      <h2 style={{ marginTop: 0 }}>{nexus.roadmap.title}</h2>
      <div className="card-grid grid-4">
        {nexus.roadmap.phases.map((p) => (
          <Card key={p.when} eyebrow={p.when} title={p.title}>
            <p style={{ margin: 0 }}>{p.body}</p>
          </Card>
        ))}
      </div>
    </>
  );
}

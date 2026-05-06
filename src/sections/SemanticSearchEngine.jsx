import Callout from '../components/Callout.jsx';
import Card from '../components/Card.jsx';

export default function SemanticSearchEngine() {
  return (
    <>
      <div className="eyebrow">Overview · Semantic Search Engine</div>
      <h1 className="section-title">Semantic Search Engine (SSE)</h1>
      <p className="section-sub">
        Scaffold page — replace this copy with positioning, technical depth, and customer-facing
        language for the petabyte-scale semantic retrieval layer (DINOv3, SAM, archive index).
      </p>

      <Callout type="warn" label="Scaffold">
        Content pending. Link this section to validation milestones, supported object classes, and
        how SSE composes with NEXUS engines and vertical packages.
      </Callout>

      <div className="card-grid grid-2" style={{ marginTop: 24 }}>
        <Card title="Planned sections" eyebrow="Outline">
          <ul className="lang-list">
            <li>What SSE is (and is not) vs a generic embedding API</li>
            <li>Archive coverage and retrieval latency expectations</li>
            <li>Integration touchpoints: defense facility search, cross-temporal similarity, QA workflows</li>
            <li>Pilot status and AOIs where retrieval is validated</li>
          </ul>
        </Card>
        <Card title="Related playbook areas" eyebrow="Cross-links">
          <ul className="lang-list">
            <li>NEXUS page — Semantic Foundation stage</li>
            <li>Layer Catalog — row: Semantic Search (DINOv3 + SAM)</li>
            <li>Defense vertical — object & facility recognition packages</li>
          </ul>
        </Card>
      </div>
    </>
  );
}

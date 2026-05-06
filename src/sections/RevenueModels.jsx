import Callout from '../components/Callout.jsx';
import Card from '../components/Card.jsx';

export default function RevenueModels() {
  return (
    <>
      <div className="eyebrow">Commercial · Revenue models</div>
      <h1 className="section-title">Four ways we can sell Pixxel Analytics.</h1>
      <p className="section-sub">
        Packaging sketch for conversations with customers and investors. These models can stack in
        one deal (e.g. DaaS plus traits on top, or a solution package that includes SSE seats).
        Numbers and SKUs are placeholders until product and finance align.
      </p>

      <Callout type="info" label="Working draft">
        This is a first best guess — refine naming, boundaries, and pricing mechanics as NEXUS
        productizes and we see repeat buying patterns in pilots.
      </Callout>

      <div className="card-grid grid-2" style={{ marginTop: 28 }}>
        <Card eyebrow="01" title="Data as a service" accent="var(--cyan)">
          <p style={{ marginTop: 0 }}>
            <strong>What it is.</strong> Recurring access to Pixxel HSI collections and/or
            third-party imagery we normalize for the customer AOI — tasking, archive pulls, and
            delivery cadence (weekly / monthly / quarterly) as contract terms.
          </p>
          <p>
            <strong>Premium option.</strong> Same AOI and cadence, but outputs land in the{' '}
            <strong>NEXUS intelligence cube</strong> (queryable stacks, provenance, versioning)
            instead of flat file drops — priced as a uplift on base DaaS or a separate line item.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Commercial shape.</strong> Minimum commitment (AOI km² × quarters), SLA on
            capture or archive depth, optional API delivery. Natural upsell: traits and solution
            packages that consume this data.
          </p>
        </Card>

        <Card eyebrow="02" title="Traits as a service" accent="var(--blue)">
          <p style={{ marginTop: 0 }}>
            <strong>What it is.</strong> Individual analytic layers from the catalog (or bespoke
            retrievals) sold <strong>per layer</strong>, priced from a base rate per km² and
            billing frequency. Customer buys only what they need; FF (Firefly) vs open-data paths
            can carry different list behavior.
          </p>
          <p>
            <strong>How it fits.</strong> Aligns with the layer catalog and pilot calculator:
            stack multiple traits on the same AOI without forcing a full “solution” SKU.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Commercial shape.</strong> Line-item quote, optional volume tiers, clear
            sensor tier and validation grade on each layer. Often combined with DaaS when we also
            task or curate inputs.
          </p>
        </Card>

        <Card eyebrow="03" title="Solution package" accent="var(--purple)">
          <p style={{ marginTop: 0 }}>
            <strong>What it is.</strong> Outcome-oriented bundle for a <strong>named use case</strong>{' '}
            (e.g. field stress monitor, deforestation alerting, water quality screening): integrated
            layers, inference and scoring models, thresholds, and operational outputs.
          </p>
          <p>
            <strong>Includes.</strong> Alerting and change detection where applicable, report or
            dashboard templates, and a <strong>copilot / analyst assist</strong> surface that grounds
            answers in the evidence stack — not a generic chatbot bolt-on.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Commercial shape.</strong> Package price or blended rate card (platform fee +
            AOI × cadence), with SLAs on freshness and support. Best when the buyer wants an
            operational workflow, not à-la-carte layers.
          </p>
        </Card>

        <Card eyebrow="04" title="Semantic search engine" accent="var(--amber)">
          <p style={{ marginTop: 0 }}>
            <strong>What it is.</strong> SSE as a <strong>standalone product</strong>: embedding
            index over customer AOIs and/or our stacks, semantic query API, similarity and
            “find scenes like this” workflows, optional connectors to their GIS or data lake.
          </p>
          <p>
            <strong>When it stands alone.</strong> Buyers who already have imagery or vectors but
            need search, discovery, and cross-temporal reasoning without buying full NEXUS analytics
            day one.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Commercial shape.</strong> Seat- or query-based licensing, storage/indexing fee
            for AOI extent, professional services for onboarding. Often expands into traits or
            solution packages once search proves value.
          </p>
        </Card>
      </div>

      <h2 style={{ marginTop: 40, marginBottom: 12 }}>How the models relate</h2>
      <table className="ptable">
        <thead>
          <tr>
            <th>Model</th>
            <th>Buyer is usually buying…</th>
            <th>Typical attach</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data as a service</td>
            <td className="muted">Pixels, captures, reliable cadence, optional cube hosting</td>
            <td>Traits on top; solution when they want workflows</td>
          </tr>
          <tr>
            <td>Traits as a service</td>
            <td className="muted">Specific measurable outputs, defensible grades</td>
            <td>DaaS if we task; SSE for exploration across time</td>
          </tr>
          <tr>
            <td>Solution package</td>
            <td className="muted">An operational answer to a vertical problem</td>
            <td>DaaS + traits bundled; SSE for analyst workflows</td>
          </tr>
          <tr>
            <td>Semantic search engine</td>
            <td className="muted">Discovery and query over geospatial evidence</td>
            <td>Traits or packages once search drives usage</td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: 28 }}>
        <Callout type="warn" label="Open decisions">
          Where solution packages become standard SKUs vs bespoke statements of work, how cube
          premium splits between DaaS and platform fee, and whether SSE list price is public — flag
          these in the next packaging review.
        </Callout>
      </div>
    </>
  );
}

import Callout from '../components/Callout.jsx';
import Card from '../components/Card.jsx';

const PIPELINE_STAGES = [
  {
    stage: '01 · Qualify',
    owner: 'Commercial / BD',
    body: 'Confirm buyer type (govt, prime, integrator, strategic commercial), funding vehicle, timeline, and whether the ask maps to a product track or needs a custom SOW. Flag ITAR, classification, and dissemination constraints early.',
  },
  {
    stage: '02 · Scope',
    owner: 'Analytics + Commercial',
    body: 'Define AOI, monitoring period, sensor mix (MSI archive vs tasked HSI), deliverable cadence, and which NEXUS / LENS / vertical layers are in scope vs roadmap. Run a technical feasibility check — archive depth, sensor access, retrieval maturity, and delivery timeline — before committing. Document what is operational today vs analyst-produced vs in build.',
  },
  {
    stage: '03 · Security & compliance',
    owner: 'Legal · Export control · CCO',
    body: 'ITAR review, data handling, cloud vs air-gapped delivery, customer accreditation, and rules of engagement for sharing outputs externally. No pricing or technical detail leaves Pixxel without sign-off on defense or classified-adjacent work.',
  },
  {
    stage: '04 · Contract',
    owner: 'Commercial · Finance',
    body: 'Structure as FFP task order, IDIQ line item, OTA, FMS package, or direct commercial MSAs depending on buyer. Tie HSI task allocation, refresh cadence, and evidence delivery to contract periods — not open-ended SaaS tiers.',
  },
  {
    stage: '05 · Deliver',
    owner: 'Analytics · PM',
    body: 'Onboard AOI, run retrieval and indexing pipelines, produce recurring intelligence packages, and maintain an evidence chain suitable for customer review. Human analyst in the loop for defense, exploration, and any output that affects safety or policy.',
  },
];

const USE_CASE_CLUSTERS = [
  {
    title: 'Defense & intelligence',
    eyebrow: 'Contract-based',
    accent: '#EF5350',
    items: [
      'Site intelligence — persistent change, facility footprint, material and activity anomalies',
      'Archive similarity and semantic retrieval within a cleared AOI (LENS-backed)',
      'Terrain, mobility, and infrastructure context where scoped',
      'Evidence packages for analyst review — not autonomous targeting or enforcement',
    ],
  },
  {
    title: 'Strategic commercial & integrators',
    eyebrow: 'Bespoke integration',
    accent: 'var(--cyan)',
    items: [
      'Multi-vertical monitoring programs that do not fit a single TRACE / SWIPE / SCOPE package',
      'Custom API bundles, white-label delivery, or partner embedding of Pixxel layers',
      'National or regional programs requiring unified governance across AOIs',
      'Early-adopter builds that inform later productization',
    ],
  },
  {
    title: 'Science & validation programs',
    eyebrow: 'Often precursor to product',
    accent: 'var(--purple)',
    items: [
      'Regional accuracy campaigns and ground-truth programs (see Ground research page)',
      'Algorithm validation for new sensors, AOIs, or retrieval chains',
      'Joint research with government labs or universities where IP and publication rules apply',
    ],
  },
];

export default function BespokeProjects({ navigate }) {
  return (
    <>
      <div className="eyebrow">Commercial · Bespoke projects & pipeline</div>
      <h1 className="section-title">Contract work, custom scope, and the sales pipeline.</h1>
      <p className="section-sub">
        Not every engagement fits TRACE, SWIPE, SCOPE, or LENS subscription packaging. Defense,
        intelligence, large integrators, and strategic commercial programs are usually{' '}
        <strong>project- or contract-based</strong>: scope, security, and deliverables are defined
        per buyer. This page is a working map for those conversations — expect it to evolve as
        commercial and government teams align on process and templates.
      </p>

      <Callout type="info" label="Working draft">
        High-level placeholder only. Pipeline stages, owners, and use-case framing will change after
        more conversations with commercial and govt teams. Do not treat stage names or responsibilities
        as final policy.
      </Callout>

      <div className="card-grid grid-2" style={{ marginTop: 28 }}>
        <Card eyebrow="Product tracks" title="When to use standard products" accent="var(--green)">
          <p style={{ marginTop: 0 }}>
            Recurring monitoring, API access, and vertical packages on known AOIs — agriculture,
            water, geology, and semantic search — should route through the product pages and pilot /
            subscription mechanics where they fit.
          </p>
          <p style={{ marginBottom: 0 }}>
            Default here first for <strong>repeatable</strong> delivery with catalog layers and
            published pricing bands. Escalate to bespoke only when scope, security, or procurement
            path forces a custom contract.
          </p>
        </Card>

        <Card eyebrow="Bespoke track" title="When this page applies" accent="var(--amber)">
          <p style={{ marginTop: 0 }}>
            Government or defense procurement, classified or ITAR-sensitive work, multi-site
            integrator programs, or asks that combine capabilities across verticals with non-standard
            SLAs and evidence formats.
          </p>
          <p>
            Bespoke work is also how we <strong>test, build, and pilot new products and layers</strong>{' '}
            when the client and deal are worth investing in — funded R&D on a real AOI that can
            graduate into the catalog if validation and demand hold up.
          </p>
          <p style={{ marginBottom: 0 }}>
            Pricing is <strong>not</strong> list-rate SaaS — it is negotiated per contract period with
            explicit HSI tasking, refresh cadence, and deliverable definitions.
          </p>
        </Card>
      </div>

      <h2 style={{ marginTop: 40, marginBottom: 12 }}>Indicative sales pipeline</h2>
      <p className="muted" style={{ marginTop: 0, marginBottom: 16, fontSize: 13 }}>
        A starting sequence for bespoke and contract pursuits. Owners are indicative; your deal desk
        may route differently by region or vehicle.
      </p>

      <div
        style={{
          borderLeft: '2px solid var(--cyan-dim)',
          marginLeft: 16,
          maxWidth: 900,
          marginBottom: 28,
        }}
      >
        {PIPELINE_STAGES.map((s, i) => (
          <div
            key={s.stage}
            style={{
              display: 'flex',
              gap: 18,
              alignItems: 'flex-start',
              marginLeft: -17,
              marginBottom: i === PIPELINE_STAGES.length - 1 ? 0 : 22,
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
                fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                fontSize: 11,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div style={{ paddingTop: 2 }}>
              <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
                {s.stage}
                <span className="muted" style={{ fontWeight: 500, fontSize: 12, marginLeft: 10 }}>
                  · {s.owner}
                </span>
              </div>
              <p style={{ margin: 0, color: 'var(--gray)', maxWidth: 760, lineHeight: 1.55 }}>
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 8, marginBottom: 12 }}>Where engagements tend to cluster</h2>
      <div className="card-grid grid-3" style={{ marginBottom: 24 }}>
        {USE_CASE_CLUSTERS.map((c) => (
          <Card key={c.title} title={c.title} eyebrow={c.eyebrow} accent={c.accent}>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {c.items.map((item) => (
                <li key={item} style={{ marginBottom: 6, lineHeight: 1.5 }}>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <h2 style={{ marginTop: 32, marginBottom: 12 }}>Related playbook sections</h2>
      <div className="card-grid grid-2">
        <Card title="Pilot Proposal Generator" accent="var(--cyan)" eyebrow="Fixed-scope pilots">
          <p style={{ marginTop: 0 }}>
            Smaller, time-boxed analytical engagements with defined layers and conversion credit
            policy — distinct from multi-year contract monitoring.
          </p>
          <button
            type="button"
            onClick={() => navigate('quoting')}
            style={{
              marginTop: 8,
              padding: 0,
              border: 'none',
              background: 'none',
              color: 'var(--cyan)',
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Open Pilot Proposal Generator →
          </button>
        </Card>

        <Card title="Ground research & validation" accent="var(--blue)" eyebrow="Evidence build">
          <p style={{ marginTop: 0 }}>
            Field, drone HSI, and lab programs that often sit inside or ahead of a bespoke contract
            — especially when a new AOI or layer needs defensible accuracy work.
          </p>
          <button
            type="button"
            onClick={() => navigate('ground-research')}
            style={{
              marginTop: 8,
              padding: 0,
              border: 'none',
              background: 'none',
              color: 'var(--cyan)',
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Open Ground research →
          </button>
        </Card>
      </div>

      <Callout type="warn" label="Open questions — to align with commercial & govt">
        <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
          <li>Standard CRM stages and required fields for bespoke vs product opportunities</li>
          <li>Single intake path vs separate defense desk — who owns qualification?</li>
          <li>Template SOW / PWS language for site intelligence and LENS-backed retrieval</li>
          <li>Pricing framework and rate cards for contract periods (12 / 24 / 36 months)</li>
          <li>Minimum engagement size and security-review cost recovery for defense pilots</li>
          <li>Which deliverable formats are approved for external sharing (PDF, STAC, custom APIs)</li>
        </ul>
      </Callout>
    </>
  );
}

import Callout from '../components/Callout.jsx';
import Card from '../components/Card.jsx';

const NEXT_STEPS = [
  {
    num: '01',
    title: 'Playbook sign-off before packaging',
    body:
      'Decide whether we are happy with the current product framing, claims, and commercial structure in this playbook — so we can invest in proper packaging, sales enablement, and marketing materials with confidence.',
  },
  {
    num: '02',
    title: 'Customer segments by product',
    body:
      'Define the primary buyer segments to pursue for each product (TRACE, SWIPE, SCOPE, LENS) — who we lead with, who is secondary, and where we do not spend outbound effort yet.',
  },
  {
    num: '03',
    title: 'Pricing model and framework',
    body:
      'Finalize and close on the commercial pricing model: IaaS vs Aurora subscription vs token/API metering, regional and sensor multipliers, pilot economics, and when list rates are authoritative vs indicative.',
  },
  {
    num: '04',
    title: 'Bespoke projects — when to say no',
    body:
      'Align on criteria for bespoke and contract-based work: which asks route to standard products, which justify custom SOWs, and when BD should decline or defer until product or security posture catches up.',
  },
  {
    num: '05',
    title: 'Defense & intel — standard products',
    body:
      'Move beyond change detection and object search as the default D&I pitch — finalize a small set of standard defense/intelligence product packages with defined scope, delivery, and compliance boundaries.',
  },
  {
    num: '06',
    title: 'API finalization',
    body:
      'Close on customer-facing API surfaces: endpoint scope, response schemas, entitlement model, SLAs, and which layers are published vs internal-only — aligned across product pages and integrator docs.',
  },
  {
    num: '07',
    title: 'Benchmarking',
    body:
      'Establish internal accuracy benchmarks per product and run structured validation with external partners — so claims, pilot SOWs, and marketing copy rest on agreed metrics and test protocols.',
  },
  {
    num: '08',
    title: 'Firefly image quality standards',
    body:
      'Define image quality metrics and acceptance thresholds so Firefly acquisitions meet the radiometric and geometric bar required for expected retrieval accuracies across agriculture, water, geology, and search products.',
  },
];

export default function NextStepsTemp() {
  return (
    <>
      <div className="eyebrow">Commercial · Next steps (temp)</div>
      <h1 className="section-title">Decisions to close before we package and scale.</h1>
      <p className="section-sub">
        Working checklist of open commercial, product, and technical alignment items. This page is
        temporary — remove or replace once decisions are recorded elsewhere in the playbook.
      </p>

      <Callout type="warn" label="Temporary page">
        Not policy. Use this to drive internal review sessions; update or delete when each item is
        resolved and reflected in product, pricing, or bespoke-project pages.
      </Callout>

      <div style={{ marginTop: 28 }}>
        {NEXT_STEPS.map((step) => (
          <Card
            key={step.num}
            eyebrow={step.num}
            title={step.title}
            accent="var(--amber)"
            style={{ marginBottom: 16 }}
          >
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65 }}>{step.body}</p>
          </Card>
        ))}
      </div>
    </>
  );
}

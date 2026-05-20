import Callout from '../components/Callout.jsx';
import Card from '../components/Card.jsx';

const VERSIONS = [
  {
    version: 'V1',
    target: 'June 15, 2026',
    accent: 'var(--cyan)',
    status: 'In development',
    summary:
      'Foundational semantic retrieval over a customer\u2019s monitored archive — fast image- and patch-level similarity without writing SQL or chasing pixels.',
    features: [
      {
        title: 'Image search',
        body: 'Query the archive with a reference image (or scene chip) and retrieve the most spectrally and structurally similar observations across the customer\u2019s AOI and history.',
      },
      {
        title: 'Patch search',
        body: 'Search at sub-scene granularity — a field corner, a tailings cell, a reservoir embayment — so analysts can match local patterns, not whole-tile averages.',
      },
      {
        title: 'Efficient indexing',
        body: 'Image- and patch-level embedding index built for low-latency retrieval at operational AOI scale. Incremental index updates as new acquisitions ingest into the NEXUS cube.',
      },
    ],
  },
  {
    version: 'V2',
    target: 'June 30, 2026',
    accent: 'var(--purple)',
    status: 'Planned',
    summary:
      'Moves from scene fragments to persistent objects and motion — search, track, and compare change in the same semantic space as V1.',
    features: [
      {
        title: 'Object-based search',
        body: 'Retrieve and rank discrete objects (facilities, vehicles, canopy patches, water bodies) encoded as first-class entities in the embedding index — not just arbitrary patches.',
      },
      {
        title: 'Video tracking of objects',
        body: 'Associate object identities across time steps and collects — support analyst workflows that follow a target or asset through the archive.',
      },
      {
        title: 'Change detection',
        body: 'Semantic change discovery: find where the archive diverges from a reference state or trajectory, complementary to pixel-differencing and engine-based event detection.',
      },
    ],
  },
  {
    version: 'V3',
    target: 'H2 2026',
    accent: 'var(--amber)',
    status: 'Roadmap',
    summary:
      'Operator-facing query interfaces and deeper fusion with NEXUS engines — less bespoke integration per engagement.',
    features: [
      {
        title: 'Natural-language query (copilot)',
        body: 'Plain-language questions over the customer embedding space via Project Zephyr — scoped to AOI and entitlement, with answers grounded in retrieved evidence chips.',
      },
      {
        title: 'Trajectory & state similarity',
        body: 'Search by temporal pattern — e.g. \u201cfields that followed this stress curve\u201d or \u201csites that degraded like this reference event\u201d — built on sequences of embeddings, not single snapshots.',
      },
      {
        title: 'HSI-enriched embedding refresh',
        body: 'Firefly acquisitions trigger out-of-cycle re-embedding so similarity search reflects hyperspectral depth where tasked, not MSI-only appearance.',
      },
    ],
  },
  {
    version: 'V4',
    target: '2027+',
    accent: 'var(--green)',
    status: 'Roadmap',
    summary:
      'Production hardening, vertical-specialized encoders, and packaged APIs aligned with solution tiers.',
    features: [
      {
        title: 'Vertical fine-tuned encoders',
        body: 'Domain adapters for agriculture, forestry, water, geology, and defense — same index architecture, encoders tuned for the spectral and structural signals each vertical cares about.',
      },
      {
        title: 'Evidence-packaged retrieval',
        body: 'Every search result ships with provenance: acquisition date, sensor tier, and links into NEXUS Evidence Engine outputs for audit and briefing.',
      },
      {
        title: 'Production API & SLAs',
        body: 'Stable similarity-search APIs across vertical catalogs (Geology, Mining, Defense SSE modules) with documented latency, index freshness, and entitlement boundaries.',
      },
    ],
  },
];

const QUERY_EXAMPLES = [
  {
    old: '\u201cNDVI dropped more than 0.2\u201d',
    sse: '\u201cShow me every parcel that looked like Field 12 three weeks before the 2024 outbreak.\u201d',
  },
  {
    old: '\u201cDetect change between two dates\u201d',
    sse: '\u201cFind areas following the same degradation trajectory as this reference event.\u201d',
  },
  {
    old: '\u201cClassify this pixel\u201d',
    sse: '\u201cFind surfaces in this AOI with a spectral signature similar to this drill-core reference.\u201d',
  },
];

const INTEGRATIONS = [
  {
    title: 'NEXUS Cube',
    accent: 'var(--green)',
    body: 'SSE indexes object states derived from the hyper-local multimodal cube — MSI backbone, HSI depth where tasked, MicroClim context, and engine outputs.',
  },
  {
    title: 'NEXUS Engines',
    accent: 'var(--cyan)',
    body: 'Context and Event engines establish baselines and anomalies; SSE lets analysts explore the archive semantically when hypotheses need validation beyond a single alert.',
  },
  {
    title: 'Project Zephyr',
    accent: 'var(--amber)',
    body: 'Primary operator surface for search workflows — map-linked results, copilot-assisted query formulation, and saved searches for recurring monitoring tasks.',
  },
  {
    title: 'Vertical packages',
    accent: 'var(--purple)',
    body: 'Geology, Mining Lifecycle, and Defense catalogs expose similarity-search APIs as packaged capabilities — cross-archive search within the customer\u2019s entitled AOI.',
  },
];

export default function SemanticSearchEngine() {
  return (
    <>
      <div className="eyebrow">Overview · Semantic Search Engine</div>
      <h1 className="section-title">Semantic Search Engine (SSE)</h1>
      <p className="section-sub">
        The reasoning layer on top of the NEXUS cube — DINOv3-based embeddings that turn a
        customer&rsquo;s observational archive into a <strong>queryable semantic space</strong>.
        Scoped to monitored AOIs, not planetary search. See also the{' '}
        <a href="#nexus" style={{ color: 'var(--cyan)' }}>
          NEXUS overview
        </a>{' '}
        for how SSE fits the full intelligence stack.
      </p>

      <Callout type="warn" label="Indicative roadmap">
        Version targets and feature lists reflect internal planning as of May 2026. Dates and
        scope are subject to engineering validation — do not commit to customers without analytics
        and platform sign-off.
      </Callout>

      {/* ── 01 · What SSE is ────────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>
        01 · What SSE is
      </div>
      <h2 style={{ marginTop: 0 }}>Precision search over a place you already know.</h2>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>
        Generic embedding APIs search the whole internet or a global tile store. Pixxel SSE searches
        a <strong>customer-specific embedding space</strong> built from that customer&rsquo;s NEXUS
        cube — physically consistent observations, domain-validated encoders, and an index that
        deepens with every new acquisition.
      </p>
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        <Card title="SSE is" accent="var(--cyan)" eyebrow="Yes">
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
            <li>Hyper-local — scoped to entitled AOIs and archive depth</li>
            <li>Physics-aware — embeddings trained on MSI and HSI domain data</li>
            <li>Evidence-oriented — results tie back to acquisitions and object states</li>
            <li>Compounding — more observations improve retrieval quality over time</li>
          </ul>
        </Card>
        <Card title="SSE is not" accent="var(--gray)" eyebrow="No">
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
            <li>A global open-world image search engine</li>
            <li>A replacement for NEXUS Context / Event / Attribution engines</li>
            <li>Autonomous targeting or enforcement without analyst review</li>
            <li>Real-time streaming video analytics (V2 introduces archive-centric tracking)</li>
          </ul>
        </Card>
      </div>

      {/* ── 02 · How it works ───────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>
        02 · How it works
      </div>
      <h2 style={{ marginTop: 0 }}>Encode, index, retrieve.</h2>
      <div className="card-grid grid-3" style={{ marginBottom: 18 }}>
        <Card eyebrow="Step 1" title="Encode">
          <p style={{ margin: 0 }}>
            DINOv3 visual foundation model embeddings (fine-tuned on Pixxel MSI / HSI data) represent
            each image, patch, and — in V2 — persistent object instance as a vector in semantic space.
          </p>
        </Card>
        <Card eyebrow="Step 2" title="Index">
          <p style={{ margin: 0 }}>
            V1 delivers an efficient approximate-nearest-neighbor index at image and patch
            granularity, updated incrementally as the NEXUS cube ingests new scenes.
          </p>
        </Card>
        <Card eyebrow="Step 3" title="Retrieve">
          <p style={{ margin: 0 }}>
            Analysts submit a reference image, patch, object chip, or (V3+) natural-language query;
            SSE returns ranked matches with spatial footprint, acquisition metadata, and similarity
            score.
          </p>
        </Card>
      </div>

      {/* ── 03 · Query paradigm ───────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>
        03 · Query paradigm
      </div>
      <h2 style={{ marginTop: 0 }}>A new category of question.</h2>
      <table className="ptable">
        <thead>
          <tr>
            <th>Traditional approach</th>
            <th>SSE approach</th>
          </tr>
        </thead>
        <tbody>
          {QUERY_EXAMPLES.map((q, i) => (
            <tr key={i}>
              <td className="muted">{q.old}</td>
              <td>{q.sse}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── 04 · Roadmap ──────────────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>
        04 · Product roadmap
      </div>
      <h2 style={{ marginTop: 0 }}>Semantic search releases.</h2>
      <p style={{ marginBottom: 24, maxWidth: 820 }}>
        Delivery is staged: V1 establishes retrieval primitives; V2 adds objects, motion, and change;
        later releases harden operator UX and vertical packaging. Targets below are engineering goals,
        not customer commitments.
      </p>

      {VERSIONS.map((v) => (
        <div key={v.version} style={{ marginBottom: 32 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 16,
              flexWrap: 'wrap',
              marginBottom: 12,
            }}
          >
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
            <span
              style={{
                fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'var(--gray)',
              }}
            >
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
      ))}

      {/* ── 05 · Integration ──────────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>
        05 · Platform integration
      </div>
      <h2 style={{ marginTop: 0 }}>Where SSE sits in the stack.</h2>
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        {INTEGRATIONS.map((item) => (
          <Card key={item.title} title={item.title} accent={item.accent}>
            <p style={{ margin: 0 }}>{item.body}</p>
          </Card>
        ))}
      </div>

      {/* ── 06 · Vertical use cases ───────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>
        06 · Vertical use cases
      </div>
      <h2 style={{ marginTop: 0 }}>Same engine, different questions.</h2>
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        <Card title="Geology & exploration" accent="#F5A623" eyebrow="Geology">
          <p style={{ margin: 0 }}>
            Find areas spectrally similar to a known alteration signature or drill-core reference
            across a prospect AOI — supports campaign-scale similarity search packaged in the geology
            catalog.
          </p>
        </Card>
        <Card title="Mining lifecycle" accent="#9C6B2E" eyebrow="Mining">
          <p style={{ margin: 0 }}>
            Match tailings, pond, or waste-dump conditions to a reference state; track object-level
            change as site geometry evolves.
          </p>
        </Card>
        <Card title="Agriculture & forestry" accent="#D4A017" eyebrow="Monitoring">
          <p style={{ margin: 0 }}>
            Retrieve fields or stands that resemble a pre-outbreak or pre-fire condition; patch search
            supports sub-field scouting and MRV spot-checks.
          </p>
        </Card>
        <Card title="Defense & intelligence" accent="#EF5350" eyebrow="Defense">
          <p style={{ margin: 0 }}>
            Facility and material similarity within a cleared AOI — human analyst in the loop; ITAR
            and dissemination rules apply. See Defense vertical for procurement constraints.
          </p>
        </Card>
      </div>

      {/* ── 07 · Operational expectations ───────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>
        07 · Operational expectations
      </div>
      <h2 style={{ marginTop: 0 }}>What to expect at each stage.</h2>
      <table className="ptable">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>V1 (Jun 2026)</th>
            <th>V2 (Jun 2026)</th>
            <th>V3+ (roadmap)</th>
          </tr>
        </thead>
        <tbody>
          {[
            [
              'Query inputs',
              'Reference image or patch',
              '+ Object chip, track seed',
              '+ Natural language (Zephyr)',
            ],
            [
              'Index scope',
              'Per-customer AOI archive',
              'Same + object graph',
              'HSI refresh on tasking',
            ],
            [
              'Primary users',
              'Internal analysts, pilot customers',
              'Vertical solution teams',
              'Self-serve via Zephyr',
            ],
            [
              'Latency target',
              'Sub-second retrieval at AOI scale (engineering goal)',
              'Same; heavier object graph',
              'SLA TBD with platform',
            ],
            [
              'Commercial packaging',
              'Pilot / bespoke delivery',
              'Bundled in geology, mining, defense APIs',
              'Tiered with Professional+ subscription',
            ],
          ].map((row, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 600 }}>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td className="muted">{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Callout type="info" label="Honest positioning">
        <p style={{ margin: 0 }}>
          SSE retrieval quality depends on archive depth and sensor tier. Similarity is not causation — results are hypotheses for expert review, especially in
          defense, carbon, and exploration contexts. Do not promise planetary search, autonomous
          decisions, or accuracy figures without validation on the customer AOI.
        </p>
      </Callout>
    </>
  );
}

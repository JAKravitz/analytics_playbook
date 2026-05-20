import Card from '../components/Card.jsx';
import Callout from '../components/Callout.jsx';
import NexusGraphic from '../components/NexusGraphic.jsx';
import { seed } from '../data/seed.js';

/** Matches Sidebar / LayerCatalog VERTICAL_COLORS. */
const VERTICAL_COLORS = {
  agriculture: '#D4A017',
  forestry: '#5BE584',
  water: '#4FC3F7',
  geology: '#F5A623',
  mining: '#9C6B2E',
  defense: '#EF5350',
};

/** Seven layers of the full intelligence stack — from sensor to operator UI. */
const STACK = [
  {
    name: 'Firefly / Honeybee',
    role: 'Sensor layer',
    accent: 'var(--cyan)',
    body: "Physics-grade hyperspectral acquisition, radiometrically calibrated, spectrally precise. The source of Pixxel's proprietary data advantage. Firefly (VNIR) operational today; Honeybee (VNIR-SWIR) coming.",
  },
  {
    name: 'NEXUS Cube',
    role: 'Hyper-local intelligence architecture',
    accent: 'var(--green)',
    body: 'One multimodal time series object per monitored location — every observation, every biophysical retrieval, every climate forcing variable, accumulated into a physically consistent temporal record. The foundation everything else runs on.',
  },
  {
    name: 'NEXUS Engines',
    role: 'Analytics microservices',
    accent: VERTICAL_COLORS.agriculture,
    body: 'Context · Event · Attribution · Forecast · Prescription · Evidence. Domain-specific intelligence modules that run against the NEXUS cube to produce actionable outputs per vertical.',
  },
  {
    name: 'MicroClim',
    role: 'Climate forcing integration',
    accent: VERTICAL_COLORS.water,
    body: 'High-resolution climate variables downscaled to field level, fused into the NEXUS cube as the environmental context that makes biological and physical processes interpretable. Internal to the NEXUS pipeline — not a standalone product.',
  },
  {
    name: 'Semantic Search Engine',
    role: 'Reasoning layer',
    accent: 'var(--purple)',
    body: "DINOv3-based embeddings encoding every object state in a customer's NEXUS cube into a queryable semantic space. Scoped to the customer's monitored AOI. Transforms the archive from a record into a precision intelligence system.",
  },
  {
    name: 'Project Zephyr',
    role: 'Operator interface',
    accent: 'var(--amber)',
    body: "Build-your-own dashboard with integrated copilot AI, built by Pixxel's platform team — direct access to the intelligence stack without requiring a data science team.",
  },
];

const PHYSICS = [
  {
    name: 'PROSAIL',
    role: 'Vegetation inversion',
    accent: VERTICAL_COLORS.agriculture,
    body: 'Retrieves the actual biophysical state of the canopy — LAI, chlorophyll a and b, canopy water content, dry matter, carotenoids. Not proxies for these things. The things themselves, retrieved by inverting the physical model of light interacting with a plant canopy.',
  },
  {
    name: 'HydroLight',
    role: 'Aquatic inversion',
    accent: VERTICAL_COLORS.water,
    body: 'Retrieves the inherent optical properties of the water column — absorption and backscattering coefficients that describe the physical composition of the water, not just its color.',
  },
  {
    name: 'SAM + MTNF',
    role: 'Mineral unmixing',
    accent: VERTICAL_COLORS.geology,
    body: 'Spectral unmixing retrieves mineral abundance and class by comparing observed spectra against a library of known mineral signatures, accounting for atmospheric residuals and vegetation contamination.',
  },
];

const VIGNETTES = [
  {
    vertical: 'Forestry · Carbon',
    color: VERTICAL_COLORS.forestry,
    persona: 'Congo Basin carbon project developer',
    body: "A living intelligence model of every forest stand in the project area. Not a map that gets updated — a system that knows each stand's full observational history, flags degradation as it develops, produces biomass estimates with uncertainty bounds that survive registry audit, and answers questions about specific areas without requiring a new analysis run.",
  },
  {
    vertical: 'Geology · Exploration',
    color: VERTICAL_COLORS.geology,
    persona: 'Atacama exploration geologist',
    body: 'A mineral intelligence model of the target — a spectral embedding space built from Firefly acquisitions over the prospect, queryable for locations that match a reference signature, continuously updated as new acquisitions arrive, and delivering prospectivity scores that trace back to the physics of light interacting with mineral surfaces.',
  },
  {
    vertical: 'Water · Public health',
    color: VERTICAL_COLORS.water,
    persona: 'Southeast Asia water utility manager',
    body: 'A HAB intelligence model of the reservoir — phycocyanin concentrations retrieved from hyperspectral physics, anomaly detection tuned to the seasonal baseline of that specific water body, forward-looking risk assessment conditioned on the climate forcing history of that catchment, and exceedance alerts that fire before the intake is compromised.',
  },
  {
    vertical: 'Defense · Intelligence',
    color: VERTICAL_COLORS.defense,
    persona: 'Site-monitoring defense analyst',
    body: "A site intelligence model of a monitored facility — a complete observational history, anomaly detection calibrated to that site's established behavioral patterns, and a semantic query interface that finds moments in the archive that match a pattern of interest.",
  },
];

const TODAY = {
  accent: 'var(--green)',
  label: 'Today — operational',
  items: [
    'Firefly hyperspectral operational and producing data',
    'Crop classification, phenology, canopy biophysical retrievals shipping across Ag and Forestry',
    'Water quality constituents (Chl-a, phycocyanin, TSS, CDOM, IOPs) operational',
    'Mineral spectral similarity (SAM + MTNF), iron oxide and alteration mapping, Nd proxy detection in production',
    'Defense object detection, change detection, material characterization delivered to real customers',
  ],
};
const BUILDING = {
  accent: 'var(--cyan)',
  label: 'Being built now',
  items: [
    'NEXUS cube object model — connecting individual layers into a coherent per-AOI intelligence system',
    'Semantic Search Engine — making the cube semantically queryable',
    'Use-case-specific solution packages structuring layers into repeatable commercial products per vertical',
    'Project Zephyr operator interface',
  ],
};
const COMING = {
  accent: 'var(--amber)',
  label: 'Coming',
  items: [
    'Honeybee VNIR-SWIR capability',
    'SAR fusion at operational scale',
    'Full multimodal sensor suite',
    "Continuous deepening of every customer's embedding space as more observations accumulate and more models improve",
  ],
};

export default function NexusWhitePaper() {
  const { nexus } = seed;

  return (
    <>
      <div className="eyebrow">Overview · NEXUS</div>
      <h1 className="section-title">A queryable intelligence cube for Earth.</h1>
      <p className="section-sub">
        Most Earth observation companies make a <em>planetary</em> claim — global coverage,
        wall-to-wall monitoring, the whole Earth always on. Pixxel makes a different claim: a deep,
        physically grounded, semantically queryable intelligence model of <strong>every place we
        monitor</strong>. Each one unique. Each one built from the full observational history of
        that specific location. Each one getting smarter the longer it runs.
      </p>

      {/* ── 01 · The claim ──────────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>01 · The claim</div>
      <h2 style={{ marginTop: 0 }}>Two very different products.</h2>
      <p style={{ marginBottom: 18, maxWidth: 760 }}>
        A system that knows everything about everywhere at low resolution is a different product
        from a system that knows a <strong>specific place</strong> with the depth and precision that
        makes outputs defensible in a courtroom, a carbon registry, a drilling decision, or a
        military briefing. Pixxel builds the second thing.
      </p>
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        <Card title="Planetary intelligence" accent="var(--gray)" eyebrow="Most of the industry">
          <p style={{ margin: 0 }}>
            Knows everything about everywhere at low resolution. More satellites, more coverage,
            faster revisit. Coverage without depth — surveillance, not intelligence.
          </p>
        </Card>
        <Card title="Hyper-local intelligence at scale" accent="var(--cyan)" eyebrow="Pixxel · NEXUS">
          <p style={{ margin: 0 }}>
            Knows a specific field, forest stand, waterbody, or mine site with the depth and
            precision that makes outputs defensible in a courtroom, carbon registry, drilling
            decision, or military briefing.
          </p>
        </Card>
      </div>

      {/* ── 02 · The problem ────────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>02 · The problem</div>
      <h2 style={{ marginTop: 0 }}>{nexus.problem.title}</h2>
      <p style={{ marginBottom: 18, maxWidth: 760 }}>{nexus.problem.intro}</p>
      <p style={{ marginBottom: 18, maxWidth: 760 }}>
        Knowing that a pixel changed value tells you nothing about <strong>why</strong> it changed,
        whether the change is significant, what physical process drove it, or what should happen
        next. <em>Coverage without depth is surveillance, not intelligence.</em>
      </p>
      <div className="card-grid grid-3" style={{ marginBottom: 18 }}>
        {nexus.problem.cards.map((c, i) => (
          <Card key={i} title={c.title}>
            <p style={{ margin: 0 }}>{c.body}</p>
          </Card>
        ))}
      </div>
      <Callout type="info" label="Why this matters">{nexus.problem.callout}</Callout>

      {/* ── 03 · The platform ───────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>03 · The platform</div>
      <h2 style={{ marginTop: 0 }}>{nexus.platform.title}</h2>
      <p style={{ marginBottom: 18, maxWidth: 760 }}>
        Every monitored location gets its own intelligence model. Not a global model applied
        locally. Not a general-purpose classifier run over a new image. A dedicated, hyper-local
        model initialized from the full historical archive over that location, updated continuously
        as new data arrives, and tuned to the specific physical and ecological characteristics of
        that place. This becomes the product. 
      </p>
      <div className="card-grid grid-2" style={{ marginBottom: 16 }}>
        {nexus.platform.pillars.map((p) => (
          <Card key={p.num} eyebrow={p.num} title={p.title}>
            <p style={{ margin: 0 }}>{p.body}</p>
          </Card>
        ))}
      </div>
      <Callout type="info" label="Measurement vs evidence">
        <p style={{ margin: 0 }}>
          A stress score derived from a single image is a <strong>measurement</strong>. A stress
          score derived from a location&rsquo;s full physical history, benchmarked against its own
          seasonal baseline, and placed in the context of the climate conditions that preceded it —
          that is <strong>evidence</strong>.
        </p>
      </Callout>

      {/* ── 04 · Physics first ──────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>04 · Physics first</div>
      <h2 style={{ marginTop: 0 }}>Radiative transfer physics, not pattern matching.</h2>
      <p style={{ marginBottom: 18, maxWidth: 760 }}>
        The NEXUS cube is built on radiative transfer physics — not statistical pattern matching on
        top of spectral indices. Every retrieval traces back to a physical model with known
        assumptions and documented uncertainty.
      </p>
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        {PHYSICS.map((p) => (
          <Card key={p.name} title={p.name} accent={p.accent} eyebrow={p.role}>
            <p style={{ margin: 0 }}>{p.body}</p>
          </Card>
        ))}
      </div>
      <Callout type="info" label="Commercial consequence — outputs are auditable">
        Every number traces back to a physical model with known assumptions and documented
        uncertainty. That is the difference between a product that survives expert scrutiny and one
        that does not.
      </Callout>

      {/* ── 05 · Sensor architecture (MSI vs HSI) ───────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>{nexus.sensors.eyebrow.replace(/^\d+\s*·\s*/, '05 · ')}</div>
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

      {/* ── 06 · The semantic layer ─────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>06 · The semantic layer</div>
      <h2 style={{ marginTop: 0 }}>From a record to a reasoning engine.</h2>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>
        A deep, physically grounded object record is necessary but not sufficient — the question is
        how to make it queryable. The Pixxel Semantic Search Engine (SSE) encodes every observation
        and every derived object state in a customer&rsquo;s NEXUS cube as a point in a
        high-dimensional semantic space built on DINOv3 embeddings fine-tuned on Pixxel&rsquo;s
        domain data. States that are physically similar — spectrally, temporally, structurally — are
        close together.
      </p>
      <div className="card-grid grid-3" style={{ marginBottom: 18 }}>
        <Card title="Not pixel queries" accent="var(--purple)" eyebrow="Old">
          <p style={{ margin: 0 }}>
            <em>&ldquo;Show me pixels where NDVI dropped by more than 0.2.&rdquo;</em>
          </p>
        </Card>
        <Card title="Not change detection" accent="var(--purple)" eyebrow="Old">
          <p style={{ margin: 0 }}>
            <em>&ldquo;Detect change between two scenes.&rdquo;</em>
          </p>
        </Card>
        <Card title="Not surface classification" accent="var(--purple)" eyebrow="Old">
          <p style={{ margin: 0 }}>
            <em>&ldquo;Classify this surface into a label.&rdquo;</em>
          </p>
        </Card>
        <Card title="State similarity query" accent="var(--cyan)" eyebrow="New · SSE">
          <p style={{ margin: 0 }}>
            <strong>&ldquo;Show me every location in this AOI that looks the way this field did
            three weeks before last year&rsquo;s outbreak.&rdquo;</strong>
          </p>
        </Card>
        <Card title="Trajectory query" accent="var(--cyan)" eyebrow="New · SSE">
          <p style={{ margin: 0 }}>
            <strong>&ldquo;Find areas within this project following the same trajectory as this
            known degradation event.&rdquo;</strong>
          </p>
        </Card>
        <Card title="Spectral signature query" accent="var(--cyan)" eyebrow="New · SSE">
          <p style={{ margin: 0 }}>
            <strong>&ldquo;Find locations in this AOI with a spectral signature similar to this
            reference sample.&rdquo;</strong>
          </p>
        </Card>
      </div>
      <Callout type="info" label="Hyper-local by design">
        The SSE is scoped to a customer&rsquo;s monitored AOI — built on data that is physically
        consistent and domain-validated, and gets more powerful the longer the AOI has been
        monitored. The difference between a database and an intelligence system.
      </Callout>

      {/* ── 07 · Architecture ───────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>07 · Architecture</div>
      <h2 style={{ marginTop: 0 }}>The intelligence stack, layer by layer.</h2>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>
        Seven layers, composing from the sensor up. Each adds a distinct capability; together they
        produce a hyper-local intelligence system per monitored AOI.
      </p>
      <NexusGraphic />
      <div className="card-grid grid-2" style={{ marginBottom: 22 }}>
        {STACK.map((s) => (
          <Card key={s.name} title={s.name} accent={s.accent} eyebrow={s.role}>
            <p style={{ margin: 0 }}>{s.body}</p>
          </Card>
        ))}
      </div>

      <div className="eyebrow" style={{ marginTop: 8 }}>Inside the NEXUS Engines</div>
      <h3 style={{ margin: '0 0 12px' }}>{nexus.architecture.title}</h3>
      <div className="card-grid grid-3" style={{ marginBottom: 16 }}>
        {nexus.architecture.engines.map((e) => (
          <Card key={e.name} title={e.name}>
            <p style={{ margin: 0 }}>{e.body}</p>
          </Card>
        ))}
      </div>

      {/* ── 08 · Differentiation ────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>08 · Differentiation</div>
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

      {/* ── 09 · What this enables ──────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>09 · What this enables</div>
      <h2 style={{ marginTop: 0 }}>The same architecture, four different intelligence systems.</h2>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>
        The physics is the same in every case. The object architecture is the same. The semantic
        layer is the same. What changes is the domain — and the depth of knowledge the system has
        built about each specific place it monitors.
      </p>
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        {VIGNETTES.map((v) => (
          <Card key={v.persona} title={v.persona} accent={v.color} eyebrow={v.vertical}>
            <p style={{ margin: 0 }}>{v.body}</p>
          </Card>
        ))}
      </div>

      {/* ── 10 · Honest science ─────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>10 · Honest science</div>
      <h2 style={{ marginTop: 0 }}>Defensible evidence, not optimistic dashboards.</h2>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>
        Pixxel operates in markets where outputs have consequences. A carbon credit based on a
        biomass estimate has a dollar value and legal standing. A yield risk score informs an
        insurance payout. A mineral prospectivity map guides a drilling decision that costs
        millions. A water quality exceedance triggers a regulatory response.
      </p>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>
        In these contexts, overconfident outputs are not just scientifically wrong — they are
        commercially dangerous. Every Pixxel output carries a confidence layer; every claim is
        scoped to what the physics supports; we document the conditions under which outputs
        degrade (high vegetation cover over a geological target, cloud contamination, optically complex water).
      </p>
      <Callout type="info" label="Honest science is Pixxel's most durable commercial advantage">
        An exploration geologist, a carbon registry auditor, a water utility compliance officer —
        these are people who know their domain. They do not need optimistic dashboards. They need
        defensible evidence. Conservative positioning is the only strategy that survives contact
        with expert buyers.
      </Callout>

      {/* ── 11 · Where we are today ─────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>11 · Where we are today</div>
      <h2 style={{ marginTop: 0 }}>In the middle of the build — and honest about it.</h2>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>
        A significant number of production layers ship today across five verticals — real, validated
        outputs delivered to real customers, powerful individually, not yet unified into the full
        NEXUS cube architecture above. Three honest snapshots:
      </p>
      <div className="card-grid grid-3" style={{ marginBottom: 18 }}>
        {[TODAY, BUILDING, COMING].map((col) => (
          <Card key={col.label} accent={col.accent} eyebrow={col.label}>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {col.items.map((it, i) => (
                <li key={i} style={{ marginBottom: 6, lineHeight: 1.55 }}>{it}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* ── 12 · Roadmap ────────────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>12 · Roadmap</div>
      <h2 style={{ marginTop: 0 }}>{nexus.roadmap.title}</h2>
      <div className="card-grid grid-4">
        {nexus.roadmap.phases.map((p) => (
          <Card key={p.when} eyebrow={p.when} title={p.title}>
            <p style={{ margin: 0 }}>{p.body}</p>
          </Card>
        ))}
      </div>

      {/* ── Closing ─────────────────────────────────────────────────────── */}
      <Callout type="info" label="The architecture compounds by design">
        <p style={{ margin: '0 0 8px' }}>
          <strong>Every new acquisition</strong> deepens the object records.{' '}
          <strong>Every new model improvement</strong> propagates across every monitored AOI.{' '}
          <strong>Every new vertical</strong> adds a domain of intelligence. The value of a
          monitored location increases the longer it has been monitored — which means the earliest
          customers build the deepest intelligence models, and the platform becomes harder to
          displace over time.
        </p>
        <p style={{ margin: 0 }}>
          This is not a dashboard. It is not a mapping tool. It is a hyper-local intelligence system
          that knows specific places with increasing depth and precision — and delivers that
          knowledge in a form that people can act on.
        </p>
      </Callout>
    </>
  );
}

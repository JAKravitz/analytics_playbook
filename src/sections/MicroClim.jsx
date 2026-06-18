import Callout from '../components/Callout.jsx';
import Card from '../components/Card.jsx';

/** V1 atmospheric variables — 90 m resolution. */
const V1_VARIABLES = [
  { name: 'Temperature', level: '2 m', unit: 'K', id: 't2m' },
  { name: 'Surface pressure', level: '0 m', unit: 'hPa', id: 'sp' },
  { name: 'Relative humidity', level: '2 m', unit: '—', id: 'rh2m' },
  { name: 'Wind speed U', level: '10 m', unit: 'm/s', id: 'u10' },
  { name: 'Wind speed V', level: '10 m', unit: 'm/s', id: 'v10' },
  { name: 'Clear-sky radiation', level: 'Surface', unit: 'W/m²', id: 'csrad' },
  { name: 'Direct radiation', level: 'Surface', unit: 'W/m²', id: 'dirrad' },
  { name: 'Diffuse radiation', level: 'Surface', unit: 'W/m²', id: 'difrad' },
  { name: 'Precipitation', level: 'Surface', unit: 'mm', id: 'precip' },
  { name: 'Evaporation', level: 'Surface', unit: 'mm', id: 'evap' },
];

const METHODS = [
  {
    title: 'Statistical downscaling',
    accent: 'var(--blue)',
    body: 'Bias correction and spatial refinement of reanalysis and global model fields to field-relevant scales — anchoring outputs to long records while preserving local topographic and land-surface effects where the training signal supports it.',
  },
  {
    title: 'Physical (first principles)',
    accent: 'var(--cyan)',
    body: 'Radiative transfer, surface energy balance, and hydrologic constraints where governing equations and boundary conditions are well posed — especially for radiation components and evaporation-linked fluxes.',
  },
  {
    title: 'Deep learning',
    accent: 'var(--purple)',
    body: 'Learned mappings from coarse forcings and static predictors (terrain, land cover, soil) to fine-scale fields — used where nonlinear local effects dominate and sufficient validation data exists.',
  },
];

const VERSIONS = [
  {
    version: 'V1',
    target: 'May 11, 2026',
    accent: 'var(--cyan)',
    status: 'In development',
    summary:
      'First operational MicroClim delivery: ten core atmospheric variables at 90 m resolution, fused into the NEXUS cube as climate forcing context for attribution and monitoring.',
    bullets: [
      'All ten variables delivered at 90 m spatial resolution',
      'Raster delivery aligned to customer AOI and NEXUS cube grid',
      'Internal pipeline integration — not yet a public product API',
    ],
  },
  {
    version: 'V2',
    target: 'June 11, 2026',
    accent: 'var(--purple)',
    status: 'Planned',
    summary:
      'Quality and breadth upgrade on the V1 stack, plus developer-facing access for vertical teams and pilot integrations.',
    bullets: [
      'Improved accuracy and stability on all V1 variables (method mix tuned per variable)',
      'Additional fields: dew point temperature @ 2 m (K) and selected variables on pressure levels',
      'REST API and Python client endpoints for programmatic access',
    ],
  },
  {
    version: 'V3',
    target: 'H2 2026',
    accent: 'var(--amber)',
    status: 'Roadmap',
    summary:
      'Tighter NEXUS engine coupling and derived indices operators use in packages — without exposing raw climate science to every customer.',
    bullets: [
      'Derived products: VPD, growing-degree metrics, moisture stress indices where validated',
      'Higher temporal cadence options (daily → sub-daily where sources allow)',
      'Automated corroboration hooks for Context and Attribution engines',
    ],
  },
];

const INTEGRATIONS = [
  {
    title: 'NEXUS Cube',
    accent: 'var(--green)',
    body: 'MicroClim layers are fused into the hyper-local multimodal cube alongside PROSAIL- and HydroLight-derived optical layers — environmental context that explains whether spectral stress is weather-driven or something else.',
  },
  {
    title: 'Attribution Engine',
    accent: 'var(--cyan)',
    body: 'Ranked cause hypotheses (drought, heat, excess moisture) are corroborated or challenged using field-local VPD, precipitation, and radiation context — not regional reanalysis alone.',
  },
  {
    title: 'Agriculture packages',
    accent: '#D4A017',
    body: 'Field Stress Monitor and Precision Intervention Advisor reference MicroClim for weather corroboration and irrigation-window logic where packages include climate forcing.',
  },
  {
    title: 'Forestry & water',
    accent: '#5BE584',
    body: 'Wildfire risk, HAB forecasting, and hydrologic stress workflows use downscaled precip, humidity, and radiation as inputs to risk models — when those packages are climate-conditioned.',
  },
];

export default function MicroClim() {
  return (
    <>
      <div className="eyebrow">Overview · MicroClim</div>
      <h1 className="section-title">MicroClim</h1>
      <p className="section-sub">
        Field-local weather and climate context at <strong>90 m resolution</strong> — downscaled
        atmospheric forcing fused into the NEXUS cube so satellite-derived stress and attribution
        can be grounded in what actually happened meteorologically at the place being monitored.{' '}
        <strong>Internal to the NEXUS pipeline</strong> — not a standalone commercial product. See
        the{' '}
        <a href="#nexus" style={{ color: 'var(--cyan)' }}>
          NEXUS overview
        </a>{' '}
        for stack placement.
      </p>

      <Callout type="warn" label="Indicative roadmap">
        Variable lists, dates, and API scope reflect internal planning as of May 2026. Validate
        against science QA and platform engineering before customer commitments. Units and naming
        in delivery metadata may differ slightly from this reference table.
      </Callout>

      {/* ── 01 · What MicroClim is ──────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>
        01 · What MicroClim is
      </div>
      <h2 style={{ marginTop: 0 }}>Regional weather is not field weather.</h2>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>
        Coarse reanalysis and global models smooth away the topographic, land-cover, and
        micro-meteorological structure that drives crop stress, fire risk, and reservoir
        dynamics. MicroClim downscales atmospheric fields to the scale of a monitored AOI so NEXUS
        engines and vertical packages can ask: <em>did local weather support this spectral signal?</em>
      </p>
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        <Card title="MicroClim is" accent="var(--cyan)" eyebrow="Yes">
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
            <li>90 m resolution atmospheric forcing (V1 baseline)</li>
            <li>Fused into the NEXUS cube per customer AOI</li>
            <li>Multi-method — statistical, physical, and ML where each fits</li>
            <li>Corroboration for attribution — not a replacement for spectral analytics</li>
          </ul>
        </Card>
        <Card title="MicroClim is not" accent="var(--gray)" eyebrow="No">
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
            <li>A standalone weather app or consumer forecast product</li>
            <li>Sub-hourly nowcasting for all variables at launch (roadmap-dependent)</li>
            <li>Ground-truth without bias — station fusion may follow in later releases</li>
            <li>A substitute for on-farm weather stations where legal or policy requires them</li>
          </ul>
        </Card>
      </div>

      {/* ── 02 · Methods ────────────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>
        02 · Methods
      </div>
      <h2 style={{ marginTop: 0 }}>A blended downscaling stack.</h2>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>
        No single method wins for every variable and landscape. MicroClim combines approaches —
        choosing or ensemble-blending based on variable physics, data availability, and validation
        performance in each region.
      </p>
      <div className="card-grid grid-3" style={{ marginBottom: 18 }}>
        {METHODS.map((m) => (
          <Card key={m.title} title={m.title} accent={m.accent}>
            <p style={{ margin: 0 }}>{m.body}</p>
          </Card>
        ))}
      </div>

      {/* ── 03 · V1 variable catalog ────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>
        03 · V1 variable catalog
      </div>
      <h2 style={{ marginTop: 0 }}>Ten variables at 90 m · target May 11, 2026.</h2>
      <p style={{ marginBottom: 18, maxWidth: 820 }}>
        V1 delivers the following atmospheric fields at <strong>90 m spatial resolution</strong>,
        time-aligned to the NEXUS cube acquisition calendar for each AOI.
      </p>
      <table className="ptable">
        <thead>
          <tr>
            <th>Variable</th>
            <th>Level</th>
            <th>Unit</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {V1_VARIABLES.map((v) => (
            <tr key={v.id}>
              <td style={{ fontWeight: 600 }}>{v.name}</td>
              <td className="muted">{v.level}</td>
              <td
                style={{
                  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                  fontSize: 12,
                }}
              >
                {v.unit}
              </td>
              <td>
                {v.id === 'rh2m' && 'Dimensionless or % — per delivery metadata'}
                {v.id === 'csrad' && 'Clear-sky component; pairs with direct + diffuse'}
                {v.id === 'precip' && 'Accumulation per delivery timestep'}
                {v.id === 'evap' && 'Surface evaporation / evapotranspiration proxy'}
                {!['rh2m', 'csrad', 'precip', 'evap'].includes(v.id) && '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── 04 · Product roadmap ────────────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>
        04 · Product roadmap
      </div>
      <h2 style={{ marginTop: 0 }}>MicroClim releases.</h2>
      <p style={{ marginBottom: 24, maxWidth: 820 }}>
        Delivery is staged: V1 establishes the core 90 m forcing layer inside NEXUS; V2 expands
        variables and opens APIs; later releases emphasize derived indices and engine automation.
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
          <Card accent={v.accent} title={`${v.version} deliverables`}>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
              {v.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Card>
          {v.version === 'V2' && (
            <div className="card-grid grid-2" style={{ marginTop: 14 }}>
              <Card title="New variables (V2)" accent="var(--purple)" eyebrow="Expansion">
                <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                  <li>Dew point temperature @ 2 m (K)</li>
                  <li>Selected variables on pressure levels (e.g. geopotential, temperature, winds)</li>
                  <li>Per-variable method assignment documented in layer metadata</li>
                </ul>
              </Card>
              <Card title="Developer access (V2)" accent="var(--purple)" eyebrow="API">
                <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
                  <li>REST API for raster and point time-series extraction</li>
                  <li>Python client for notebook and pipeline integration</li>
                  <li>Entitlement scoped to customer AOI — not global open access</li>
                </ul>
              </Card>
            </div>
          )}
        </div>
      ))}

      {/* ── 05 · Platform integration ───────────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>
        05 · Platform integration
      </div>
      <h2 style={{ marginTop: 0 }}>Climate context inside NEXUS — not beside it.</h2>
      <div className="card-grid grid-2" style={{ marginBottom: 18 }}>
        {INTEGRATIONS.map((item) => (
          <Card key={item.title} title={item.title} accent={item.accent}>
            <p style={{ margin: 0 }}>{item.body}</p>
          </Card>
        ))}
      </div>

      {/* ── 06 · Operational expectations ───────────────────────────────── */}
      <div className="eyebrow" style={{ marginTop: 36 }}>
        06 · Operational expectations
      </div>
      <h2 style={{ marginTop: 0 }}>What to expect at each stage.</h2>
      <table className="ptable">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>V1 (May 2026)</th>
            <th>V2 (Jun 2026)</th>
            <th>V3+ (roadmap)</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Spatial resolution', '90 m', '90 m (refinement ongoing)', 'AOI-adaptive where validated'],
            ['Variable count', '10 core fields', '10 improved + dew point + pressure levels', 'Derived indices (VPD, etc.)'],
            ['Delivery', 'NEXUS cube fusion', '+ REST API & Python SDK', 'Engine-native corroboration'],
            ['Primary consumers', 'Internal pipelines, pilots', 'Vertical teams, integrations', 'Package defaults'],
            ['Validation', 'Science QA per region', 'Expanded holdout regions', 'Station fusion (TBD)'],
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
          MicroClim improves attribution and risk context but does not, by itself, prove causation.
          Downscaled fields carry model and method uncertainty — document sensor tier, archive depth,
          and climate layer lineage alongside any customer-facing stress or loss narrative. Do not
          promise station-grade accuracy or real-time forecasting until validated and explicitly
          scoped in the commercial package.
        </p>
      </Callout>
    </>
  );
}

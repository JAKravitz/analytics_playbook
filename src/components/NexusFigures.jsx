/* =========================================================================
   NEXUS white-paper figures
   Theme-aware SVG diagrams that encapsulate the architecture and philosophy.
   Colors reference CSS custom properties so they track light/dark mode.
   ========================================================================= */

const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const COND = "'Barlow Condensed', sans-serif";

const headStyle = { fontFamily: COND, fontSize: 17, letterSpacing: 1, fontWeight: 600 };
const labelStyle = { fontFamily: MONO, fontSize: 11, letterSpacing: 0.5 };
const microStyle = { fontFamily: MONO, fontSize: 9.5, letterSpacing: 0.4 };

function Figure({ caption, label, children, viewBox }) {
  return (
    <figure className="nx-figure">
      <svg viewBox={viewBox} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
        {children}
      </svg>
      {caption && <figcaption className="nx-figcaption">{caption}</figcaption>}
    </figure>
  );
}

/* ---- Arrowhead marker reused across figures ---------------------------- */
function Defs({ id, color }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 z" style={{ fill: color }} />
      </marker>
    </defs>
  );
}

/* =========================================================================
   1 · Ontology — pixels vs persistent objects
   ========================================================================= */
export function OntologyFigure() {
  // One field's record over a season. Plot region: x 90..700, y 90..250.
  const xs = [110, 202, 294, 386, 478, 570, 662];
  const yc = [200, 165, 140, 128, 132, 150, 170]; // expected-range centre (lower y = higher value)
  const half = 22;
  const meas = [198, 162, 138, 131, 150, 196, 214]; // measured state; drops out of range late season
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const anomalyFrom = 5;

  const topPts = xs.map((x, i) => `${x},${yc[i] - half}`);
  const botPts = xs.map((x, i) => `${x},${yc[i] + half}`).reverse();
  const bandPath = `M ${topPts.join(' L ')} L ${botPts.join(' L ')} Z`;
  const measPts = xs.map((x, i) => `${x},${meas[i]}`).join(' ');

  return (
    <Figure
      viewBox="0 0 820 326"
      label="A single field's persistent record, expected range, and a flagged anomaly"
      caption="NEXUS treats each place as a persistent object, not a stack of separate maps. Because every acquisition is kept on the same record, the system learns what a specific field normally does and flags deviations against its own history, not a regional average."
    >
      <Defs id="ont-arrow" color="var(--gray)" />

      {/* title */}
      <text x={60} y={32} style={{ ...headStyle, fill: 'var(--cyan)' }}>
        Field 47 · one persistent record
      </text>
      <text x={60} y={50} style={{ ...labelStyle, fill: 'var(--gray)' }}>
        satellites observe the same place repeatedly; NEXUS remembers it
      </text>

      {/* axes */}
      <line x1={90} y1={70} x2={90} y2={250} style={{ stroke: 'var(--gray2)' }} strokeWidth={1.5} />
      <line x1={90} y1={250} x2={712} y2={250} style={{ stroke: 'var(--gray2)' }} strokeWidth={1.5} markerEnd="url(#ont-arrow)" />
      <text transform="rotate(-90 58 170)" x={58} y={170} textAnchor="middle" style={{ ...microStyle, fill: 'var(--gray)' }}>
        field state (e.g. LAI)
      </text>
      <text x={690} y={272} style={{ ...microStyle, fill: 'var(--gray)' }}>
        time →
      </text>

      {/* faint per-acquisition gridlines + month labels */}
      {xs.map((x, i) => (
        <g key={`g${i}`}>
          <line x1={x} y1={72} x2={x} y2={250} style={{ stroke: 'var(--gray2)' }} strokeWidth={1} strokeOpacity={0.35} />
          <text x={x} y={268} textAnchor="middle" style={{ ...microStyle, fill: 'var(--gray)' }}>
            {months[i]}
          </text>
        </g>
      ))}

      {/* expected range band — learned from the field's own history */}
      <path d={bandPath} style={{ fill: 'var(--cyan)', stroke: 'var(--cyan)' }} fillOpacity={0.1} strokeOpacity={0.4} strokeWidth={1} strokeDasharray="4 4" />

      {/* measured trajectory */}
      <polyline points={measPts} style={{ fill: 'none', stroke: 'var(--text)' }} strokeWidth={2} />
      {xs.map((x, i) => (
        <circle
          key={`m${i}`}
          cx={x}
          cy={meas[i]}
          r={i >= anomalyFrom ? 6 : 4.5}
          style={{ fill: i >= anomalyFrom ? 'var(--red)' : 'var(--cyan)' }}
        />
      ))}

      {/* anomaly callout */}
      <line x1={596} y1={150} x2={566} y2={190} style={{ stroke: 'var(--red)' }} strokeWidth={1} strokeOpacity={0.6} />
      <text x={470} y={120} style={{ ...labelStyle, fill: 'var(--red)' }}>
        anomaly
      </text>
      <text x={470} y={136} style={{ ...microStyle, fill: 'var(--gray)' }}>
        below this field&rsquo;s own baseline
      </text>

      {/* legend */}
      <g>
        <rect x={92} y={296} width={20} height={11} rx={2} style={{ fill: 'var(--cyan)', stroke: 'var(--cyan)' }} fillOpacity={0.1} strokeOpacity={0.4} strokeWidth={1} strokeDasharray="3 3" />
        <text x={120} y={305} style={{ ...microStyle, fill: 'var(--gray)' }}>
          expected range (its history)
        </text>
        <circle cx={350} cy={301} r={4.5} style={{ fill: 'var(--cyan)' }} />
        <text x={362} y={305} style={{ ...microStyle, fill: 'var(--gray)' }}>
          measured per acquisition
        </text>
        <circle cx={566} cy={301} r={5} style={{ fill: 'var(--red)' }} />
        <text x={578} y={305} style={{ ...microStyle, fill: 'var(--gray)' }}>
          anomaly vs baseline
        </text>
      </g>
    </Figure>
  );
}

/* =========================================================================
   2 · One system — cube (memory) + query (intelligence)
   ========================================================================= */
export function OneSystemFigure() {
  return (
    <Figure
      viewBox="0 0 820 300"
      label="NEXUS as one system: intelligence cube plus semantic query"
      caption="The intelligence cube accumulates multimodal history per AOI; semantic query reasons over those biophysical states. Memory and retrieval share one object model and deepen together with every acquisition."
    >
      <Defs id="one-arrow" color="var(--cyan)" />

      {/* enclosing NEXUS boundary */}
      <rect
        x={20}
        y={28}
        width={780}
        height={200}
        rx={12}
        style={{ fill: 'var(--cyan)', stroke: 'var(--cyan)' }}
        fillOpacity={0.04}
        strokeWidth={1.5}
        strokeDasharray="6 6"
      />
      <text x={40} y={52} style={{ ...headStyle, fill: 'var(--cyan)' }}>
        NEXUS · ONE SYSTEM
      </text>

      {/* cube box */}
      <rect
        x={70}
        y={86}
        width={290}
        height={104}
        rx={8}
        style={{ fill: 'var(--green)', stroke: 'var(--green)' }}
        fillOpacity={0.12}
        strokeWidth={1.5}
      />
      <text x={215} y={120} textAnchor="middle" style={{ ...headStyle, fill: 'var(--text)' }}>
        Intelligence cube
      </text>
      <text x={215} y={142} textAnchor="middle" style={{ ...labelStyle, fill: 'var(--green-soft)' }}>
        MEMORY
      </text>
      <text x={215} y={166} textAnchor="middle" style={{ ...microStyle, fill: 'var(--gray)' }}>
        persistent multimodal time series per AOI
      </text>

      {/* query box */}
      <rect
        x={460}
        y={86}
        width={290}
        height={104}
        rx={8}
        style={{ fill: 'var(--purple)', stroke: 'var(--purple)' }}
        fillOpacity={0.12}
        strokeWidth={1.5}
      />
      <text x={605} y={120} textAnchor="middle" style={{ ...headStyle, fill: 'var(--text)' }}>
        Semantic query
      </text>
      <text x={605} y={142} textAnchor="middle" style={{ ...labelStyle, fill: 'var(--purple)' }}>
        INTELLIGENCE
      </text>
      <text x={605} y={166} textAnchor="middle" style={{ ...microStyle, fill: 'var(--gray)' }}>
        DINOv3 over biophysical state vectors
      </text>

      {/* bidirectional link */}
      <line
        x1={364}
        y1={128}
        x2={456}
        y2={128}
        style={{ stroke: 'var(--cyan)' }}
        strokeWidth={2}
        markerStart="url(#one-arrow)"
        markerEnd="url(#one-arrow)"
      />
      <text x={410} y={120} textAnchor="middle" style={{ ...microStyle, fill: 'var(--gray)' }}>
        reasons over
      </text>

      {/* input chips under cube */}
      <text x={70} y={216} style={{ ...microStyle, fill: 'var(--gray)' }}>
        feeds: acquisitions · PROSAIL and HydroLight retrievals · MicroClim forcing · engine outputs
      </text>
    </Figure>
  );
}

/* =========================================================================
   3 · Semantic query — search places by example, ranked matches
   ========================================================================= */
export function SemanticSpaceFigure() {
  const results = [
    { id: 'Field 12', score: 0.94 },
    { id: 'Field 88', score: 0.9 },
    { id: 'Field 05', score: 0.85 },
    { id: 'Field 23', score: 0.71 },
  ];
  const barX = 502;
  const barMax = 196;
  const rowY = (i) => 110 + i * 34;

  return (
    <Figure
      viewBox="0 0 820 310"
      label="Semantic query returns the most similar places, ranked"
      caption="Semantic query works like search by example. You point at one field state (here, an early water-stress signature) and NEXUS ranks the places in your AOI whose state is most similar, without anyone pre-defining a rule. The same mechanism finds matching trajectories and historical analogues. Scores reflect embedding-space proximity between biophysical state vectors — they are a retrieval aid for ranking, not calibrated risk probabilities."
    >
      <Defs id="sem-arrow" color="var(--purple)" />

      {/* title */}
      <text x={40} y={30} style={{ ...headStyle, fill: 'var(--purple)' }}>
        Query by example
      </text>
      <text x={40} y={48} style={{ ...labelStyle, fill: 'var(--gray)' }}>
        point at one state; NEXUS ranks the most similar places in your AOI
      </text>

      {/* QUERY card */}
      <rect
        x={40}
        y={78}
        width={250}
        height={150}
        rx={8}
        style={{ fill: 'var(--purple)', stroke: 'var(--purple)' }}
        fillOpacity={0.08}
        strokeWidth={1.5}
      />
      <text x={60} y={104} style={{ ...labelStyle, fill: 'var(--purple)' }}>
        QUERY · reference state
      </text>
      <text x={60} y={132} style={{ ...headStyle, fontSize: 16, fill: 'var(--text)' }}>
        Field 47 · May 24
      </text>
      <text x={60} y={160} style={{ ...microStyle, fill: 'var(--gray)' }}>
        canopy water ↓
      </text>
      <text x={60} y={178} style={{ ...microStyle, fill: 'var(--gray)' }}>
        LAI ↓ vs expected
      </text>
      <text x={60} y={196} style={{ ...microStyle, fill: 'var(--gray)' }}>
        early water-stress signature
      </text>

      {/* arrow query -> results */}
      <line
        x1={296}
        y1={153}
        x2={344}
        y2={153}
        style={{ stroke: 'var(--purple)' }}
        strokeWidth={1.8}
        markerEnd="url(#sem-arrow)"
      />
      <text x={320} y={144} textAnchor="middle" style={{ ...microStyle, fill: 'var(--gray)' }}>
        match
      </text>

      {/* RESULTS panel */}
      <rect
        x={352}
        y={78}
        width={428}
        height={150}
        rx={8}
        style={{ fill: 'var(--bg3)', stroke: 'var(--gray2)' }}
        strokeWidth={1.5}
      />
      <text x={372} y={100} style={{ ...labelStyle, fill: 'var(--cyan)' }}>
        MOST SIMILAR PLACES · ranked
      </text>
      {results.map((r, i) => (
        <g key={r.id}>
          <text x={372} y={rowY(i) + 9} style={{ ...microStyle, fill: 'var(--text)' }}>
            {r.id}
          </text>
          <rect
            x={barX}
            y={rowY(i)}
            width={barMax}
            height={12}
            rx={2}
            style={{ fill: 'var(--gray2)' }}
          />
          <rect
            x={barX}
            y={rowY(i)}
            width={barMax * r.score}
            height={12}
            rx={2}
            style={{ fill: 'var(--cyan)' }}
            fillOpacity={0.85}
          />
          <text
            x={barX + barMax + 8}
            y={rowY(i) + 10}
            style={{ ...microStyle, fill: 'var(--gray)' }}
          >
            {r.score.toFixed(2)}
          </text>
        </g>
      ))}

      {/* footer note */}
      <text x={40} y={266} style={{ ...microStyle, fill: 'var(--gray)' }}>
        no rule written in advance · same mechanism powers trajectory &amp; analogue search · scope: your AOI only
      </text>
      <text x={40} y={285} style={{ ...microStyle, fill: 'var(--gray)', fontStyle: 'italic' }}>
        scores = embedding-space proximity of biophysical state vectors; ranking aid, not calibrated risk probabilities
      </text>
    </Figure>
  );
}

/* =========================================================================
   4 · Pipeline — sensors to delivery (replaces legacy iframe)
   ========================================================================= */
export function NexusPipelineFigure() {
  const nodes = [
    { x: 16, title: 'Firefly /', title2: 'Honeybee', tag: 'SENSORS', color: 'var(--cyan)' },
    { x: 176, title: 'ISOFIT ·', title2: 'PROSAIL · HydroLight', tag: 'PHYSICS', color: 'var(--green)' },
    { x: 336, title: 'NEXUS', title2: 'cube', tag: 'MEMORY', color: 'var(--green-soft)' },
    { x: 496, title: 'Semantic', title2: 'query', tag: 'INTELLIGENCE', color: 'var(--purple)' },
    { x: 656, title: 'Aurora /', title2: 'Zenith', tag: 'DELIVERY', color: 'var(--amber)' },
  ];
  const W = 132;
  const NY = 56;
  const NH = 74;
  return (
    <Figure
      viewBox="0 0 820 220"
      label="NEXUS pipeline from sensors to delivery"
      caption="One pipeline: physics-grade acquisition, PROSAIL and HydroLight retrievals, the persistent cube (conditioned by MicroClim), semantic query, and Aurora delivery. Semantic query is a stage inside NEXUS, not a separate product layered on top."
    >
      <Defs id="pipe-arrow" color="var(--gray)" />

      {nodes.map((n, i) => (
        <g key={i}>
          <rect
            x={n.x}
            y={NY}
            width={W}
            height={NH}
            rx={8}
            style={{ fill: n.color, stroke: n.color }}
            fillOpacity={0.12}
            strokeWidth={1.5}
          />
          <text
            x={n.x + W / 2}
            y={NY + 30}
            textAnchor="middle"
            style={{ ...headStyle, fontSize: 15, fill: 'var(--text)' }}
          >
            {n.title}
          </text>
          <text
            x={n.x + W / 2}
            y={NY + 48}
            textAnchor="middle"
            style={{ ...headStyle, fontSize: 15, fill: 'var(--text)' }}
          >
            {n.title2}
          </text>
          <text
            x={n.x + W / 2}
            y={NY - 8}
            textAnchor="middle"
            style={{ ...microStyle, fill: n.color }}
          >
            {n.tag}
          </text>
          {i < nodes.length - 1 && (
            <line
              x1={n.x + W + 2}
              y1={NY + NH / 2}
              x2={n.x + W + 26}
              y2={NY + NH / 2}
              style={{ stroke: 'var(--gray)' }}
              strokeWidth={1.5}
              markerEnd="url(#pipe-arrow)"
            />
          )}
        </g>
      ))}

      {/* MicroClim feeding into the cube */}
      <rect
        x={336}
        y={168}
        width={132}
        height={36}
        rx={8}
        style={{ fill: 'var(--blue)', stroke: 'var(--blue)' }}
        fillOpacity={0.12}
        strokeWidth={1.5}
      />
      <text x={402} y={191} textAnchor="middle" style={{ ...labelStyle, fill: 'var(--text)' }}>
        MicroClim
      </text>
      <line
        x1={402}
        y1={166}
        x2={402}
        y2={132}
        style={{ stroke: 'var(--blue)' }}
        strokeWidth={1.5}
        markerEnd="url(#pipe-arrow)"
      />
    </Figure>
  );
}

/* =========================================================================
   5 · Three-component story — NEXUS / MicroClim / Aurora
   ========================================================================= */
export function ThreeComponentFigure() {
  return (
    <Figure
      viewBox="0 0 820 230"
      label="Three components: MicroClim, NEXUS, Aurora"
      caption="The clean three-component story for technical audiences: MicroClim conditions interpretation, NEXUS is the field intelligence object and query layer, and Aurora delivers it. MicroClim stays a named system; Aurora is delivery, not a second white paper."
    >
      <Defs id="tri-arrow" color="var(--gray)" />

      {/* MicroClim */}
      <rect
        x={16}
        y={70}
        width={170}
        height={90}
        rx={8}
        style={{ fill: 'var(--blue)', stroke: 'var(--blue)' }}
        fillOpacity={0.12}
        strokeWidth={1.5}
      />
      <text x={101} y={104} textAnchor="middle" style={{ ...headStyle, fill: 'var(--text)' }}>
        MicroClim
      </text>
      <text x={101} y={124} textAnchor="middle" style={{ ...labelStyle, fill: 'var(--blue)' }}>
        CLIMATE CONTEXT
      </text>
      <text x={101} y={144} textAnchor="middle" style={{ ...microStyle, fill: 'var(--gray)' }}>
        GDD · VPD · ETa/ET0
      </text>

      {/* NEXUS center */}
      <rect
        x={310}
        y={44}
        width={200}
        height={142}
        rx={10}
        style={{ fill: 'var(--cyan)', stroke: 'var(--cyan)' }}
        fillOpacity={0.1}
        strokeWidth={1.8}
      />
      <text x={410} y={74} textAnchor="middle" style={{ ...headStyle, fontSize: 19, fill: 'var(--text)' }}>
        NEXUS
      </text>
      <rect x={330} y={92} width={160} height={36} rx={6} style={{ fill: 'var(--green)', stroke: 'var(--green)' }} fillOpacity={0.14} strokeWidth={1} />
      <text x={410} y={115} textAnchor="middle" style={{ ...labelStyle, fill: 'var(--text)' }}>
        intelligence cube
      </text>
      <rect x={330} y={134} width={160} height={36} rx={6} style={{ fill: 'var(--purple)', stroke: 'var(--purple)' }} fillOpacity={0.14} strokeWidth={1} />
      <text x={410} y={157} textAnchor="middle" style={{ ...labelStyle, fill: 'var(--text)' }}>
        semantic query
      </text>

      {/* Aurora */}
      <rect
        x={634}
        y={70}
        width={170}
        height={90}
        rx={8}
        style={{ fill: 'var(--amber)', stroke: 'var(--amber)' }}
        fillOpacity={0.12}
        strokeWidth={1.5}
      />
      <text x={719} y={104} textAnchor="middle" style={{ ...headStyle, fill: 'var(--text)' }}>
        Aurora
      </text>
      <text x={719} y={124} textAnchor="middle" style={{ ...labelStyle, fill: 'var(--amber)' }}>
        DELIVERY
      </text>
      <text x={719} y={144} textAnchor="middle" style={{ ...microStyle, fill: 'var(--gray)' }}>
        APIs · Zenith · exports
      </text>

      {/* arrows */}
      <line x1={188} y1={115} x2={306} y2={115} style={{ stroke: 'var(--gray)' }} strokeWidth={1.5} markerEnd="url(#tri-arrow)" />
      <text x={247} y={106} textAnchor="middle" style={{ ...microStyle, fill: 'var(--gray)' }}>
        conditions
      </text>
      <line x1={512} y1={115} x2={630} y2={115} style={{ stroke: 'var(--gray)' }} strokeWidth={1.5} markerEnd="url(#tri-arrow)" />
      <text x={571} y={106} textAnchor="middle" style={{ ...microStyle, fill: 'var(--gray)' }}>
        delivers
      </text>
    </Figure>
  );
}

/* =========================================================================
   6 · Build-status timeline — three tiers
   ========================================================================= */
export function BuildStatusTimeline() {
  const stops = [
    { x: 150, color: 'var(--green)', tag: 'OPERATIONAL TODAY', note: 'Firefly · ISOFIT · PROSAIL · HydroLight · bespoke delivery' },
    { x: 410, color: 'var(--cyan)', tag: 'IN ACTIVE BUILD', note: 'cube architecture · MicroClim · semantic query · packaging · Zenith' },
    { x: 670, color: 'var(--amber)', tag: 'EXPECTED MID 2027', note: 'integrated NEXUS · Honeybee SWIR · Aurora monitoring path' },
  ];
  return (
    <Figure
      viewBox="0 0 820 170"
      label="NEXUS build status across three tiers"
      caption="Three-tier build status. Many layers are operational today and powerful individually; the integrated NEXUS platform described here is targeted for mid 2027."
    >
      <line x1={60} y1={56} x2={760} y2={56} style={{ stroke: 'var(--gray2)' }} strokeWidth={2} />
      {stops.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={56} r={9} style={{ fill: s.color }} />
          <circle cx={s.x} cy={56} r={15} style={{ fill: 'none', stroke: s.color }} strokeWidth={1.2} strokeOpacity={0.5} />
          <text x={s.x} y={30} textAnchor="middle" style={{ ...labelStyle, fill: s.color }}>
            {s.tag}
          </text>
          {s.note.split(' · ').map((line, j) => (
            <text
              key={j}
              x={s.x}
              y={92 + j * 15}
              textAnchor="middle"
              style={{ ...microStyle, fill: 'var(--gray)' }}
            >
              {line}
            </text>
          ))}
        </g>
      ))}
    </Figure>
  );
}

/* =========================================================================
   7 · Compounding value — depth grows with accumulated history
   ========================================================================= */
export function CompoundingValueFigure() {
  const acq = [
    [120, 232],
    [220, 218],
    [320, 196],
    [420, 164],
    [520, 122],
    [620, 80],
    [720, 56],
  ];
  return (
    <Figure
      viewBox="0 0 820 300"
      label="Intelligence depth compounds with accumulated history"
      caption="Value compounds: every acquisition deepens the object record, every model improvement propagates across AOIs, and the longer a place is monitored the more defensible the intelligence becomes."
    >
      {/* axes */}
      <line x1={70} y1={40} x2={70} y2={250} style={{ stroke: 'var(--gray2)' }} strokeWidth={1.5} />
      <line x1={70} y1={250} x2={780} y2={250} style={{ stroke: 'var(--gray2)' }} strokeWidth={1.5} />
      <text x={36} y={50} style={{ ...microStyle, fill: 'var(--gray)' }}>
        depth
      </text>
      <text x={700} y={272} style={{ ...microStyle, fill: 'var(--gray)' }}>
        time monitored
      </text>

      {/* convex compounding curve */}
      <path
        d="M120 234 C 320 224, 470 180, 560 120 S 700 60, 730 50"
        style={{ stroke: 'var(--cyan)', fill: 'none' }}
        strokeWidth={2.5}
      />
      {/* shaded area under curve */}
      <path
        d="M120 234 C 320 224, 470 180, 560 120 S 700 60, 730 50 L 730 250 L 120 250 Z"
        style={{ fill: 'var(--cyan)' }}
        fillOpacity={0.06}
      />

      {/* acquisition markers */}
      {acq.map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx} y1={250} x2={cx} y2={cy} style={{ stroke: 'var(--cyan)' }} strokeWidth={1} strokeOpacity={0.25} />
          <circle cx={cx} cy={cy} r={5} style={{ fill: 'var(--cyan)' }} />
        </g>
      ))}
      <text x={120} y={246} textAnchor="middle" style={{ ...microStyle, fill: 'var(--gray)' }}>
        first AOI
      </text>
      <text x={120} y={285} textAnchor="middle" style={{ ...microStyle, fill: 'var(--gray)' }}>
        each tick = an acquisition or engine improvement
      </text>
      <text x={730} y={42} textAnchor="middle" style={{ ...labelStyle, fill: 'var(--cyan)' }}>
        seasons of history
      </text>
    </Figure>
  );
}

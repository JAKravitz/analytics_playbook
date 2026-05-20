import Callout from '../components/Callout.jsx';
import { TYPE, mono } from '../styles/typography.js';

const VERTICAL_COLORS = {
  agriculture: '#D4A017',
  forestry: '#5BE584',
  water: '#4FC3F7',
  geology: '#F5A623',
  mining: '#9C6B2E',
  defense: '#EF5350',
};

const PILOT_ACCENT = 'var(--purple)';

function SectionDivider({ label, lineColor = 'var(--gray2)' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        margin: '28px 0 18px',
      }}
    >
      <div style={{ flex: 1, height: 2, background: lineColor }} />
      <span
        style={{
          ...mono,
          fontSize: TYPE.section,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--white)',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 2, background: lineColor }} />
    </div>
  );
}

function PrinciplePill({ children, accent = 'var(--cyan)' }) {
  return (
    <div
      style={{
        padding: '10px 14px',
        background: 'var(--bg3)',
        border: '1px solid var(--gray2)',
        borderLeft: `2px solid ${accent}`,
        marginBottom: 6,
        fontSize: TYPE.body,
        color: 'var(--text)',
        lineHeight: 1.55,
      }}
    >
      {children}
    </div>
  );
}

function DataTable({ headers, rows, firstColAccent = null }) {
  const cell = { padding: '10px 14px', fontSize: TYPE.body };
  return (
    <div style={{ overflowX: 'auto', marginTop: 12, marginBottom: 8 }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: 'var(--bg2)',
        }}
      >
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  ...mono,
                  ...cell,
                  fontSize: TYPE.tableHead,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'var(--on-navy)',
                  fontWeight: 700,
                  textAlign: 'left',
                  background: 'var(--navy)',
                  borderBottom: '1px solid var(--gray2)',
                  whiteSpace: 'nowrap',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((c, ci) => (
                <td
                  key={ci}
                  style={{
                    ...cell,
                    borderBottom: '1px solid var(--gray2)',
                    verticalAlign: 'top',
                    color:
                      ci === 0
                        ? firstColAccent || 'var(--white)'
                        : 'var(--text)',
                    fontWeight: ci === 0 ? 600 : 400,
                    fontFamily:
                      ci === 0
                        ? "'IBM Plex Mono', ui-monospace, monospace"
                        : 'inherit',
                  }}
                >
                  {c || '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NoteList({ items, fontSize = TYPE.body, color = 'var(--text)' }) {
  return (
    <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{ fontSize, color, lineHeight: 1.65, marginBottom: 4 }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function AppliesTo({ children }) {
  return (
    <p style={{ fontSize: TYPE.muted, color: 'var(--gray)', margin: '0 0 12px', lineHeight: 1.55 }}>
      <strong style={{ color: 'var(--text)' }}>Applies to:</strong> {children}
    </p>
  );
}

/** Two-column block: MSI outputs (all tiers) + HSI outputs (HSI+MSI default). */
function VerticalScopeBlock({ vertical, color, msiItems, hsiItems, inDevelopment }) {
  return (
    <div
      style={{
        border: '1px solid var(--gray2)',
        borderTop: `2px solid ${color}`,
        marginBottom: 20,
      }}
    >
      {/* Vertical header */}
      <div
        style={{
          padding: '10px 16px',
          background: 'var(--bg3)',
          borderBottom: '1px solid var(--gray2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <span
          style={{
            ...mono,
            fontSize: TYPE.vertical,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color,
          }}
        >
          {vertical}
        </span>
        {inDevelopment && inDevelopment.length > 0 && (
          <span
            style={{
              ...mono,
              fontSize: 11,
              color: 'var(--amber)',
              letterSpacing: 1,
              textTransform: 'uppercase',
              cursor: 'default',
            }}
            title={`Not in pilot scope: ${inDevelopment.join('; ')}`}
          >
            ⚠ items not in scope — hover
          </span>
        )}
      </div>

      {inDevelopment && inDevelopment.length > 0 && (
        <div
          style={{
            padding: '8px 16px 10px',
            background: 'rgba(245, 166, 35, 0.05)',
            borderBottom: '1px solid var(--gray2)',
          }}
        >
          <div
            style={{
              ...mono,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'var(--amber)',
              marginBottom: 4,
            }}
          >
            In development — not in pilot scope
          </div>
          <NoteList items={inDevelopment} fontSize={TYPE.muted} color="var(--gray)" />
        </div>
      )}

      {/* Two columns: MSI | HSI */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div
          style={{
            padding: '14px 16px',
            borderRight: '1px solid var(--gray2)',
          }}
        >
          <div
            style={{
              ...mono,
              fontSize: TYPE.label,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'var(--text)',
              marginBottom: 6,
            }}
          >
            MSI outputs — every pilot
          </div>
          <NoteList items={msiItems} fontSize={TYPE.muted} />
        </div>
        <div style={{ padding: '14px 16px' }}>
          <div
            style={{
              ...mono,
              fontSize: TYPE.label,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'var(--cyan)',
              marginBottom: 6,
            }}
          >
            HSI outputs — Hyperspectral + MSI pilots
          </div>
          <NoteList items={hsiItems} fontSize={TYPE.muted} color="var(--text)" />
          <p
            style={{
              ...mono,
              fontSize: 11,
              color: 'var(--gray)',
              margin: '10px 0 0',
              lineHeight: 1.5,
            }}
          >
            All HSI outputs delivered alongside MSI equivalents for direct comparison.
          </p>
        </div>
      </div>
    </div>
  );
}

function GeologyInclusionBlock({ tier, accent, intro, items, minimum }) {
  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--gray2)',
        borderLeft: `2px solid ${accent}`,
        padding: '14px 16px',
        marginBottom: 10,
      }}
    >
      <div
        style={{
          ...mono,
          fontSize: TYPE.label,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: accent,
          marginBottom: 8,
        }}
      >
        {tier}
      </div>
      {intro && (
        <p style={{ fontSize: TYPE.body, color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.55 }}>
          {intro}
        </p>
      )}
      {minimum && (
        <p style={{ fontSize: TYPE.body, color: 'var(--text)', margin: '0 0 8px', lineHeight: 1.55 }}>
          <strong>Minimum scope includes:</strong>
        </p>
      )}
      <NoteList items={items} />
    </div>
  );
}

function ProjectPilotCard({ title, color, scopeItems, pricingNote }) {
  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--gray2)',
        borderTop: `2px solid ${color}`,
        padding: '18px 20px',
        marginBottom: 14,
      }}
    >
      <div
        style={{
          ...mono,
          fontSize: TYPE.vertical,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color,
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div
        style={{
          ...mono,
          fontSize: TYPE.label,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--gray)',
          marginBottom: 6,
        }}
      >
        Indicative scope
      </div>
      <NoteList items={scopeItems} />
      <p
        style={{
          fontSize: TYPE.body,
          color: 'var(--text)',
          margin: '14px 0 0',
          lineHeight: 1.55,
          borderTop: '1px solid var(--gray2)',
          paddingTop: 12,
        }}
      >
        <strong>Pricing:</strong> {pricingNote}
      </p>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function PilotRevenueModel() {
  return (
    <>
      <div className="eyebrow">Commercial · Pilot pricing v2</div>
      <h1 className="section-title">Pilot revenue model.</h1>
      <p className="section-sub">
        Pixxel pilots are <strong>bespoke analytical delivery engagements</strong> — data science
        engagements where Pixxel scientists run available pipeline layers over a customer AOI and
        deliver outputs as maps, reports, and visualizations. They are not API trials or product
        demos. The{' '}
        <a href="#revenue-models" style={{ color: 'var(--cyan)' }}>
          product revenue model
        </a>{' '}
        governs subscription, campaign, and contract pricing — this page governs pilots.
      </p>

      <Callout type="warn" label="Indicative — not approved rates">
        All fees and tier scopes on this page are indicative for internal scoping. Validate against
        analyst capacity and HSI tasking economics before quoting any prospect. Open questions are
        listed at the bottom.
      </Callout>

      {/* ── What a pilot is ─────────────────────────────────────────────── */}
      <SectionDivider label="What a pilot is (and isn't)" />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--gray2)',
            borderLeft: `2px solid ${PILOT_ACCENT}`,
            padding: '16px 18px',
          }}
        >
          <div
            style={{
              ...mono,
              fontSize: TYPE.label,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: PILOT_ACCENT,
              marginBottom: 10,
              fontWeight: 700,
            }}
          >
            Current operational reality
          </div>
          <NoteList
            items={[
              'Solution packages and APIs are in development — not yet available for customer access',
              'Delivery is analyst-produced: GeoTIFFs, PDF reports, visualizations',
              'Pilot scope strictly constrained to operationally available layers — no bespoke pipeline development for pilots',
              'If a capability is on the roadmap but not yet operational, it is not in scope for any pilot tier',
              'Aurora / Zephyr / SSE not included in pilots at this stage',
            ]}
          />
        </div>
        <div
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--gray2)',
            borderLeft: '2px solid var(--amber)',
            padding: '16px 18px',
          }}
        >
          <div
            style={{
              ...mono,
              fontSize: TYPE.label,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'var(--amber)',
              marginBottom: 10,
              fontWeight: 700,
            }}
          >
            Pilot scope guardrails
          </div>
          <NoteList
            items={[
              'Pilot scope strictly constrained to operationally available layers — no bespoke pipeline development',
              'If a capability is on the roadmap but not yet operational, it is not in scope for any pilot tier',
              'Customers requesting roadmap capabilities are directed to the subscription — those ship when operational',
              'Standard answer for out-of-scope requests: "on roadmap, available through subscription when operational"',
            ]}
          />
        </div>
      </div>

      {/* ── Guiding principles ──────────────────────────────────────────── */}
      <SectionDivider label="Guiding principles" />
      <PrinciplePill accent={PILOT_ACCENT}>
        <strong>Scope lock.</strong> Pilot scope is fixed at contract signing against currently
        available layers only. Customers requesting capabilities not yet operational are directed to
        the subscription roadmap.
      </PrinciplePill>
      <PrinciplePill accent="var(--cyan)">
        <strong>HSI and MSI side-by-side.</strong> All monitoring pilots include both Firefly HSI and
        MSI outputs delivered side-by-side, allowing customers to directly compare
        hyperspectral-derived analytics against multispectral baselines. This comparison is a core
        deliverable of every monitoring pilot.
      </PrinciplePill>
      <PrinciplePill accent="var(--gray)">
        <strong>MSI-only option.</strong> Customers who explicitly want MSI-only analytics — due to
        budget, cloud cover constraints, or preference — can opt for the MSI Analytics Pilot at a{' '}
        <strong>0.60× multiplier</strong> on standard pricing. This is a downgrade from the default
        HSI-included offering, not the baseline. MSI-only pilots do not include the HSI vs. MSI
        comparison deliverable.
      </PrinciplePill>
      <PrinciplePill accent={PILOT_ACCENT}>
        <strong>Conversion incentive.</strong> Pilot fee credited toward onboarding fee on
        subscription conversion within 60 days of pilot completion. Applies to all tiers and all
        verticals.
      </PrinciplePill>
      <PrinciplePill accent={PILOT_ACCENT}>
        <strong>Regional pricing.</strong> All list prices at Tier 1 (1.0×) standard rate. Apply
        regional multiplier based on customer HQ country World Bank income classification — see{' '}
        <a href="#revenue-models" style={{ color: 'var(--cyan)' }}>
          product revenue model
        </a>
        .
      </PrinciplePill>

      {/* ── Monitoring Services Pilots ─────────────────────────────────── */}
      <SectionDivider label="Monitoring services pilots" />
      <AppliesTo>Agriculture, Forestry, Water</AppliesTo>
      <p style={{ fontSize: TYPE.body, color: 'var(--text)', margin: '0 0 12px', maxWidth: 820, lineHeight: 1.55 }}>
        Shared tier structure across monitoring verticals.{' '}
        <strong>Tiers differ only in AOI size and number of HSI tasks</strong> — scope is consistent
        across Basic, Standard, and Enterprise. MSI outputs are included in every pilot. HSI outputs
        are additionally included in the default Hyperspectral + MSI pilot. Enterprise tier is priced
        from <strong>$20,000</strong> on a project basis.
      </p>

      <div
        style={{
          ...mono,
          fontSize: TYPE.label,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--cyan)',
          margin: '16px 0 6px',
        }}
      >
        Hyperspectral + MSI pilot (default)
      </div>
      <p style={{ fontSize: TYPE.muted, color: 'var(--gray)', margin: '0 0 8px', lineHeight: 1.5 }}>
        Firefly VNIR HSI acquisition included. MSI and HSI outputs delivered side-by-side.
      </p>
      <DataTable
        headers={['', 'Basic', 'Standard', 'Enterprise']}
        firstColAccent={VERTICAL_COLORS.agriculture}
        rows={[
          ['Price', '$2,000', '$8,000', 'From $20,000 — project-based'],
          ['AOI size', 'Up to 200 km²', '200–1,000 km²', '1,000+ km² — scope by discussion'],
          [
            'HSI tasks',
            '1 Firefly acquisition',
            '2 Firefly acquisitions',
            '3+ Firefly acquisitions — by discussion',
          ],
          ['Duration', '4–6 weeks', '6–10 weeks', '10–16 weeks — by discussion'],
          [
            'Pipeline depth',
            'Foundational layers',
            'Foundational + intermediate outputs',
            'Full available stack — by discussion',
          ],
        ]}
      />

      <div
        style={{
          ...mono,
          fontSize: TYPE.label,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--gray)',
          margin: '20px 0 6px',
        }}
      >
        MSI Analytics Pilot (MSI-only, 0.60×)
      </div>
      <p style={{ fontSize: TYPE.muted, color: 'var(--gray)', margin: '0 0 8px', lineHeight: 1.5 }}>
        No Firefly acquisition. MSI outputs only. Available where HSI acquisition is not feasible or
        at customer preference. Does not include the HSI vs. MSI comparison deliverable.
      </p>
      <DataTable
        headers={['', 'Basic', 'Standard', 'Enterprise']}
        firstColAccent="var(--gray)"
        rows={[
          ['Price', '$1,200', '$4,800', 'From $12,000 — project-based'],
          ['AOI size', 'Up to 200 km²', '200–1,000 km²', '1,000+ km² — scope by discussion'],
          ['HSI tasks', 'None', 'None', 'None'],
          ['Duration', '4–6 weeks', '6–10 weeks', '10–16 weeks — by discussion'],
          [
            'Pipeline depth',
            'Foundational layers',
            'Foundational + intermediate outputs',
            'Full available stack — by discussion',
          ],
        ]}
      />
      <p
        style={{
          ...mono,
          fontSize: TYPE.muted,
          color: 'var(--gray)',
          lineHeight: 1.55,
          margin: '4px 0 16px',
        }}
      >
        Recommended for geographies with persistent cloud cover or customers with a specific
        MSI-only requirement.
      </p>

      {/* ── What is included — per vertical ─────────────────────────────── */}
      <div
        style={{
          ...mono,
          fontSize: TYPE.label,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--white)',
          margin: '24px 0 12px',
        }}
      >
        What is included — by vertical
      </div>
      <p style={{ fontSize: TYPE.body, color: 'var(--text)', margin: '0 0 14px', maxWidth: 820, lineHeight: 1.55 }}>
        Scope is consistent across Basic, Standard, and Enterprise tiers. MSI outputs are included in
        every pilot. HSI outputs are additionally included in Hyperspectral + MSI pilots.
      </p>

      <VerticalScopeBlock
        vertical="Agriculture"
        color={VERTICAL_COLORS.agriculture}
        inDevelopment={[
          'Soil NPK / SOC estimation',
          'Irrigation optimization',
          'Yield / biomass / production forecasting',
        ]}
        msiItems={[
          'Crop type classification',
          'Phenology stage and growth trajectory summary',
          'Spectral health indices: NDRE, NDVI narrowband, PRI, CIgreen, PSRI',
          'Anomaly detection against MSI seasonal baseline',
          'Summary report and GeoTIFF map outputs',
        ]}
        hsiItems={[
          'PROSAIL inversion: LAI, canopy chlorophyll (cab), canopy water content (cw), carotenoids (Car)',
          'Physiology and health score from HSI biophysical retrievals',
          'Stress attribution hypotheses where attribution pipeline is available',
          'Validation report and interpretation deck',
        ]}
      />

      <VerticalScopeBlock
        vertical="Forestry"
        color={VERTICAL_COLORS.forestry}
        inDevelopment={[]}
        msiItems={[
          'Forest cover and type classification',
          'LULC mapping',
          'Deforestation and degradation detection',
          'AI change detection over available archive',
          'Summary report and GeoTIFF map outputs',
        ]}
        hsiItems={[
          'PROSAIL inversion: LAI, cab, cw, forest physiology and health score',
          'Above-ground biomass (AGB) proxy estimation',
          'Carbon stock proxy estimation',
          'SAR cloud gap fill where available',
          'Validation report and interpretation deck',
        ]}
      />

      <VerticalScopeBlock
        vertical="Water"
        color={VERTICAL_COLORS.water}
        inDevelopment={[
          'Benthic habitat mapping (coral, algae, sand, depth)',
          'HAB forecasting',
        ]}
        msiItems={[
          'Water body classification and surface mask',
          'Water quality constituents: Chl-a, turbidity, CDOM, TSS',
          'Anomaly detection against seasonal water quality baseline',
          'Time-series summary across available archive',
          'Summary report and GeoTIFF map outputs',
        ]}
        hsiItems={[
          'Phycocyanin retrieval (cyanobacteria-specific, 620 nm absorption feature)',
          'Full IOP retrieval and absorption parameters',
          'Non-optical proxy estimates: dissolved oxygen (DO), pH, ammonia',
          'HAB classification and bloom extent',
          'Validation report and interpretation deck',
        ]}
      />

      <p
        style={{
          ...mono,
          fontSize: TYPE.muted,
          color: 'var(--gray)',
          lineHeight: 1.55,
          margin: '4px 0 16px',
        }}
      >
        If Firefly acquisition is not feasible within the pilot window for any monitoring tier: HSI
        task cost credited toward conversion onboarding fee. MSI-equivalent outputs delivered.
      </p>

      {/* ── Geology Pilots ─────────────────────────────────────────────── */}
      <SectionDivider label="Geology pilots" />
      <AppliesTo>Mineral Prospecting, REE &amp; Critical Minerals</AppliesTo>
      <Callout type="info" label="HSI-only — no Basic tier, no MSI-only option">
        No meaningful geology deliverable without Firefly acquisition. Basic tier and MSI-only option
        are not available for geology pilots.
      </Callout>
      <DataTable
        headers={['', 'Standard', 'Enterprise']}
        firstColAccent={VERTICAL_COLORS.geology}
        rows={[
          ['Price', '$8,000', 'From $20,000 — project-based'],
          ['AOI size', 'Up to 1,000 km²', '1,000+ km² — scope by discussion'],
          ['HSI tasks', '1 Firefly acquisition', '2+ Firefly acquisitions — by discussion'],
          ['Duration', '6–10 weeks', '10–16 weeks — by discussion'],
        ]}
      />

      <div
        style={{
          border: '1px solid var(--gray2)',
          borderTop: `2px solid ${VERTICAL_COLORS.geology}`,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            padding: '8px 16px 10px',
            background: 'rgba(245, 166, 35, 0.05)',
            borderBottom: '1px solid var(--gray2)',
          }}
        >
          <div
            style={{
              ...mono,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'var(--amber)',
              marginBottom: 4,
            }}
          >
            In development — not in pilot scope
          </div>
          <NoteList
            items={[
              'Full REE spectral library expansion',
              'Lithium / pegmatite detection',
              'SWIR mineral suite (requires Honeybee)',
            ]}
            fontSize={TYPE.muted}
            color="var(--gray)"
          />
        </div>
      </div>

      <div
        style={{
          ...mono,
          fontSize: TYPE.label,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--white)',
          margin: '20px 0 10px',
        }}
      >
        What is included
      </div>

      <GeologyInclusionBlock
        tier="Standard"
        accent={VERTICAL_COLORS.geology}
        items={[
          '1 Firefly VNIR acquisition over exploration target AOI',
          'NDVI masking and vegetation exclusion',
          'SAM + MTNF mineral classification and abundance mapping',
          'Iron oxide and hydrothermal alteration halo detection',
          'Nd continuum removal and REE proxy layer (where applicable)',
          'Prospectivity score and confidence layer',
          'Exploration report (~15 pages) + interpretation deck',
        ]}
      />
      <GeologyInclusionBlock
        tier="Enterprise — scope and inclusions by discussion"
        accent="var(--amber)"
        minimum
        items={[
          'Everything in Standard across a larger or more complex AOI',
          'Multi-target or multi-date comparison',
          'REE proxy layer and lithium / pegmatite assessment where applicable',
          'Drill target summary and exploration interpretation report',
        ]}
      />
      <p
        style={{
          ...mono,
          fontSize: TYPE.muted,
          color: 'var(--gray)',
          lineHeight: 1.55,
          margin: '4px 0 16px',
        }}
      >
        If Firefly acquisition is not feasible within the pilot window: full refund or rescheduling
        at customer&apos;s choice.
      </p>

      {/* ── Project-Based Pilots ────────────────────────────────────────── */}
      <SectionDivider label="Project-based pilots" />
      <p style={{ fontSize: TYPE.body, color: 'var(--text)', margin: '0 0 16px', maxWidth: 820, lineHeight: 1.55 }}>
        <strong>Applies to:</strong> Mining Lifecycle Monitoring, Defense &amp; Intelligence. These
        verticals are at an earlier commercial stage and involve more complex scoping, security
        review requirements, and bespoke deliverable definitions. Pilots are quoted on a per-project
        basis following an initial scoping conversation.
      </p>

      <ProjectPilotCard
        title="Mining lifecycle monitoring"
        color={VERTICAL_COLORS.mining}
        scopeItems={[
          'Site boundary definition and change detection over available MSI archive',
          'Tailings storage facility extent, condition, and surface change mapping',
          'Evaporation pond area and condition monitoring',
          'Waste dump characterization and surface change assessment',
          'HSI-derived surface mineralogy and oxidation front detection (subject to Firefly acquisition feasibility)',
          'AMD proxy indicators from HSI where available',
          'Site condition report and ESG-relevant summary',
        ]}
        pricingNote="By discussion. Minimum engagement ~$8,000 aligned to Standard monitoring tier — final fee determined by AOI, scope, and HSI task requirements."
      />

      <ProjectPilotCard
        title="Defense & intelligence"
        color={VERTICAL_COLORS.defense}
        scopeItems={[
          'Site boundary definition and AI change detection over available archive',
          'Facility footprint mapping and object detection',
          'Site anomaly assessment against established baseline',
          'Terrain characterization for mobility assessment where applicable',
          'Material characterization from HSI where available and permitted',
          'Site intelligence report',
        ]}
        pricingNote="By discussion. Minimum engagement $5,000 reflecting security review overhead. Final fee determined by AOI, classification requirements, HSI task requirements, and deliverable scope."
      />

      <Callout type="stop" label="ITAR / export control — Defense & Intelligence">
        Security review required before scoping. All engagements subject to compliance and export
        control review. Do not share pricing, scope, or deliverable details with any defense prospect
        without CCO, legal, and export-control sign-off.
      </Callout>

      {/* ── Pilot policies ─────────────────────────────────────────────── */}
      <SectionDivider label="Pilot policies" />
      <DataTable
        headers={['Policy', 'Detail']}
        rows={[
          [
            'Scope lock',
            'Pilot scope fixed at contract signing against currently available layers. No bespoke pipeline development. Capabilities not yet operational are not in scope.',
          ],
          [
            'HSI feasibility (monitoring services)',
            'If Firefly acquisition fails within the pilot window, HSI task cost is credited toward conversion onboarding fee and MSI-equivalent outputs are delivered.',
          ],
          [
            'HSI feasibility (geology)',
            'If Firefly acquisition fails within the pilot window, customer\u2019s choice of full refund or rescheduling.',
          ],
          [
            'MSI-only pilots',
            '0.60\u00d7 multiplier applied to standard pricing. No HSI vs. MSI comparison deliverable included. Available where HSI acquisition is not feasible or at customer preference.',
          ],
          [
            'Ground truth',
            'Enterprise and project-based pilots include ground truth comparison where customer-provided reference data is available. Pixxel does not collect ground truth as part of pilot scope.',
          ],
          [
            'Intellectual property',
            'All outputs delivered to customer. Pixxel retains the right to use anonymized and aggregated results for internal model validation.',
          ],
          [
            'Conversion window',
            'Pilot fee credited toward onboarding fee on subscription conversion within 60 days of pilot completion.',
          ],
          [
            'Duration overruns',
            'Pilot durations are ranges, not guarantees. Contract terms will define the policy for delivery beyond the upper bound.',
          ],
          [
            'Regional pricing',
            'All prices at Tier 1 (1.0\u00d7) standard rate. Apply regional multiplier based on customer HQ country World Bank income classification.',
          ],
        ]}
      />

      {/* ── Open questions ─────────────────────────────────────────────── */}
      <div style={{ marginTop: 40 }}>
        <Callout type="warn" label="Open questions for commercial review">
          <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
            {[
              'Enterprise price floor — $20,000 minimum is indicative. Confirm before publishing to sales.',
              'Defense minimum fee — $5,000 may be below security review cost. Review with defense sales team before any engagements are scoped.',
              'HSI task cost recovery at Basic tier — 1 Firefly task over 200 km² AOI costs ~$1,600 in imagery alone. At $2,000 pilot price this is margin-negative before processing. Acceptable as customer acquisition cost for now — review as customer volume grows.',
              'Analyst capacity — Enterprise and project-based pilots are time-intensive. Confirm concurrent pilot capacity before committing across multiple verticals simultaneously.',
              'In-development layer policy — standard answer for out-of-scope requests: "on roadmap, available through subscription when operational."',
            ].map((q, i) => (
              <li
                key={i}
                style={{ fontSize: TYPE.body, color: 'var(--text)', lineHeight: 1.65, marginBottom: 6 }}
              >
                {q}
              </li>
            ))}
          </ul>
        </Callout>
      </div>
    </>
  );
}

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Callout from '../components/Callout.jsx';
import { bodyText, mutedText, TYPE } from '../styles/typography.js';

// ─── Shared atoms ─────────────────────────────────────────────────────────────

const mono = {
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
};

const tableThStyle = {
  ...mono,
  fontSize: TYPE.label,
  letterSpacing: 1.2,
  textTransform: 'uppercase',
  color: 'var(--on-navy)',
  fontWeight: 700,
};

const tableCell = { padding: '9px 12px', fontSize: TYPE.body, lineHeight: 1.5 };
const tableCellCompact = { padding: '8px 11px', fontSize: TYPE.muted, lineHeight: 1.5 };

/** Per-track accent for table, badges, and section titles */
const TRACK = {
  monitoring: 'var(--cyan)',
  geology: '#F5A623',
  defense: '#EF5350',
};

function TrackBadge({ n, label, color }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '4px 12px 4px 4px',
        background: `color-mix(in srgb, ${color} 14%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 45%, transparent)`,
        borderRadius: 3,
        marginBottom: 6,
      }}
    >
      <span
        style={{
          ...mono,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 2,
          background: color,
          color: '#000',
          padding: '2px 7px',
          borderRadius: 2,
        }}
      >
        {n}
      </span>
      <span
        style={{
          ...mono,
          fontSize: TYPE.small,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function TrackSectionTitle({ accent, children }) {
  return (
    <div
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 34,
        fontWeight: 700,
        letterSpacing: 0.5,
        color: accent,
        margin: '10px 0 6px',
        lineHeight: 1.1,
      }}
    >
      {children}
    </div>
  );
}

/** One-line description directly under each track heading */
function TrackIntro({ children }) {
  return (
    <p
      style={{
        ...bodyText,
        maxWidth: 760,
        margin: '0 0 20px',
      }}
    >
      {children}
    </p>
  );
}

/** Short explanatory copy under section dividers */
function SectionBlurb({ children, style }) {
  return (
    <p
      style={{
        ...mutedText,
        color: 'var(--text)',
        maxWidth: 820,
        margin: '0 0 10px',
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/** Mono footnote under tables */
function TableFootnote({ children, style }) {
  return (
    <p
      style={{
        ...mono,
        fontSize: TYPE.small,
        color: 'var(--gray)',
        lineHeight: 1.55,
        margin: '8px 0 0',
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/** Summary table — first column (track names) uses each row's accent. */
function CommercialTracksOverviewTable() {
  const rows = [
    {
      accent: TRACK.monitoring,
      name: 'Monitoring Subscription',
      verticals: 'Agriculture, Forestry, Water, Mining Lifecycle',
      model: 'Annual/monthly SaaS (Starter = API-only)',
      pricing: 'Onboarding fee + monthly subscription + HSI tasks',
    },
    {
      accent: TRACK.geology,
      name: 'Geology Campaign Package',
      verticals: 'Mineral Prospecting, REE & Critical Minerals',
      model: 'Fixed-scope campaign',
      pricing: 'Campaign fee per AOI + HSI tasks',
    },
    {
      accent: TRACK.defense,
      name: 'Defense & Intelligence',
      verticals: 'Site Intelligence, Terrain & Mobility',
      model: 'Project / contract based',
      pricing: 'Custom — government procurement, FMS, OTA',
    },
  ];
  const cell = tableCell;
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
            {['Track', 'Verticals', 'Model', 'Pricing mechanism'].map((h, i) => (
              <th
                key={i}
                style={{
                  ...tableThStyle,
                  ...cell,
                  background: 'var(--navy)',
                  borderBottom: '1px solid var(--gray2)',
                  whiteSpace: 'nowrap',
                  textAlign: 'left',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td
                style={{
                  ...cell,
                  borderBottom: '1px solid var(--gray2)',
                  verticalAlign: 'top',
                  color: r.accent,
                  fontWeight: 700,
                  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                }}
              >
                {r.name}
              </td>
              <td style={{ ...cell, borderBottom: '1px solid var(--gray2)', color: 'var(--text)', verticalAlign: 'top' }}>
                {r.verticals}
              </td>
              <td style={{ ...cell, borderBottom: '1px solid var(--gray2)', color: 'var(--text)', verticalAlign: 'top' }}>
                {r.model}
              </td>
              <td style={{ ...cell, borderBottom: '1px solid var(--gray2)', color: 'var(--text)', verticalAlign: 'top' }}>
                {r.pricing}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
          letterSpacing: '0.14em',
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

function AddonVerticalHeading({ children, color }) {
  return (
    <div
      style={{
        ...mono,
        fontSize: TYPE.vertical,
        fontWeight: 700,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color,
        marginBottom: 10,
        borderBottom: `1px solid ${color}40`,
        paddingBottom: 6,
      }}
    >
      {children}
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--gray2)',
        marginBottom: 8,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((x) => !x)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 0,
          padding: '10px 14px',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {open
          ? <ChevronDown size={13} color="var(--gray)" />
          : <ChevronRight size={13} color="var(--gray)" />}
        <span
          style={{
            ...mono,
            fontSize: TYPE.small,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: 'var(--text)',
          }}
        >
          {title}
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 14px 14px 38px' }}>{children}</div>
      )}
    </div>
  );
}

function PrinciplePill({ children }) {
  return (
    <div
      style={{
        ...bodyText,
        padding: '10px 14px',
        background: 'var(--bg3)',
        border: '1px solid var(--gray2)',
        borderLeft: '2px solid var(--cyan)',
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}

function DataTable({ headers, rows, compact = false }) {
  const cell = compact ? tableCellCompact : tableCell;
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
                  ...tableThStyle,
                  ...cell,
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
                    color: ci === 0 ? 'var(--white)' : 'var(--text)',
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

function NoteList({ items }) {
  return (
    <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{ ...mutedText, color: 'var(--text)', marginBottom: 4 }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function DealExample({ n, title, lines, accent = 'var(--cyan)' }) {
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
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: accent,
          marginBottom: 6,
        }}
      >
        Example {n}
      </div>
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 0.4,
          color: 'var(--white)',
          marginBottom: 12,
        }}
      >
        {title}
      </div>
      <ul
        style={{
          margin: 0,
          paddingLeft: 22,
          listStylePosition: 'outside',
          color: 'var(--text)',
        }}
      >
        {lines.map((l, i) => (
          <li key={i} style={{ ...bodyText, marginBottom: 8 }}>
            <strong style={{ ...mono, fontSize: TYPE.small, letterSpacing: 0.6, color: 'var(--white)' }}>
              {l.label}:
            </strong>{' '}
            {l.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RevenueModels() {
  return (
    <>
      <div className="eyebrow">Commercial · Product revenue model v3</div>
      <h1 className="section-title">Product revenue model.</h1>
      <p className="section-sub">
        Pixxel Analytics operates three product commercial tracks reflecting different buying
        behaviors, procurement cycles, and consumption patterns across verticals. Tracks can combine
        in a single deal. Pilots are a separate track —{' '}
        <a href="#pilot-revenue-model" style={{ color: 'var(--cyan)' }}>
          see the pilot revenue model
        </a>{' '}
        for fixed-fee, fixed-scope analytical engagements.
      </p>

      <Callout type="warn" label="Indicative — not approved rates">
        All fees, prices, and percentages in this document are indicative placeholders for internal
        scoping conversations. Onboarding, subscription, campaign, and HSI task rates must be validated
        against actual compute cost before presenting to any prospect. See the Open Questions section
        at the bottom.
      </Callout>

      {/* ── Tracks overview ─────────────────────────────────────────────── */}
      <CommercialTracksOverviewTable />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* TRACK 1 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div style={{ marginTop: 40 }}>
        <TrackBadge n="Track 1" label="Monitoring Subscription" color={TRACK.monitoring} />
        <TrackSectionTitle accent={TRACK.monitoring}>
          Agriculture · Forestry · Water · Mining Lifecycle
        </TrackSectionTitle>
        <TrackIntro>
          Annual/monthly SaaS subscription. Onboarding fee recovers the initial NEXUS cube build;
          ongoing subscription governs refresh cadence, HSI task allocation, and platform access.
        </TrackIntro>
      </div>

      <SectionDivider label="Guiding principles" />
      <PrinciplePill>
        <strong>The NEXUS cube is the product.</strong> Every customer gets a hyper-local, AOI-specific
        multimodal embedding space built from the full historical archive at onboarding. Historical depth
        is the foundation — not a tier variable.
      </PrinciplePill>
      <PrinciplePill>
        <strong>Onboarding fee recovers initial compute.</strong> Building the full-archive time series
        cube, deriving trait and structural baselines, and initializing the embedding space is a
        significant one-time event — recovered as a separate non-refundable fee.
      </PrinciplePill>
      <PrinciplePill>
        <strong>Subscription governs refresh cadence and platform access.</strong> All tiers receive
        embedding refresh and Core API delivery. Starter is API-only (no Zephyr, no SSE); Professional
        and above add Project Zephyr and semantic search.
      </PrinciplePill>
      <PrinciplePill>
        <strong>Starter = integrate into your stack.</strong> Monitoring API outputs, webhooks, and
        cloud delivery — not a second dashboard. Dashboard-first buyers (utilities, ops teams) should
        start at Professional.
      </PrinciplePill>
      <PrinciplePill>
        <strong>HSI tasks enrich the cube.</strong> Firefly acquisitions ingest alongside MSI, adding
        hyperspectral trait variables, structure variables, and HSI-derived analytics to the embedding
        space.
      </PrinciplePill>
      <PrinciplePill>
        <strong>AOI size drives onboarding fee and subscription tier</strong> — not $/km².
      </PrinciplePill>

      <SectionDivider label="Onboarding fee (one-time)" />
      <SectionBlurb>
        Covers: full historical MSI archive retrieval, multimodal data cube construction, trait and
        structure baseline derivation, climate variable downscaling, DINOv3 embedding space
        initialization, and API credentials plus delivery endpoints. Project Zephyr provisioning is
        included from Professional tier upward (optional paid add-on for Starter by exception).
      </SectionBlurb>
      <DataTable
        headers={['AOI Band', 'Onboarding Fee']}
        rows={[
          ['Up to 500 km²', '$500'],
          ['500–2,500 km²', '$1,500'],
          ['2,500–10,000 km²', '$4,000'],
          ['10,000+ km²', 'Custom — commercial review required'],
        ]}
        compact
      />
      <NoteList items={[
        'Onboarding fee non-refundable',
        'Pilot fee credited toward onboarding fee on conversion within 60 days',
        'AOI expansions post-onboarding trigger pro-rata onboarding fee for incremental area',
        'HSI cube initialization included in onboarding fee if HSI tier selected at onboarding',
        'Starter onboarding provisions API access only — Zephyr not included unless upgraded at signup',
      ]} />

      <SectionDivider label="Subscription tiers" />
      <DataTable
        headers={['', 'Starter', 'Professional', 'Enterprise', 'Enterprise+']}
        rows={[
          ['AOI band', 'Up to 500 km²', '500–2,500 km²', '2,500–10,000 km²', '10,000+ km²'],
          ['Typical buyer', 'Research, integrators, dev-heavy SME', 'Regional agribusiness, carbon project, water utility, NGO ops teams', 'Large agribusiness, national forestry program, government', 'Sovereign, multinational, large insurance / financial'],
          ['MSI embedding refresh', 'Monthly', 'Weekly', 'Weekly', 'Continuous'],
          ['HSI tasks included / qtr', '2', '4', '8', 'Custom'],
          ['Monitored AOIs / boundaries', '50', '500', 'Unlimited', 'Unlimited'],
          ['API integrations', '1', '3', '10', 'Unlimited'],
          ['Dashboard seats', '0 (API only)', '5', '20', 'Custom'],
          ['Platform access', 'API only — Core APIs, delivery, webhooks; no Zephyr, no SSE', 'Zephyr + SSE semantic query', 'Zephyr + SSE + priority processing', 'Zephyr + SSE + dedicated instance + custom fine-tuning'],
          ['Support', 'Standard SLA', 'Priority SLA', 'Dedicated SLA', 'Named account manager'],
          ['Contract', 'Annual', 'Annual', 'Annual', 'Multi-year'],
          ['Billing', 'Annual / Quarterly (+10%)', 'Annual / Quarterly (+10%)', 'Annual / Quarterly (+10%)', 'Negotiated'],
        ]}
        compact
      />

      <SectionDivider label="Base package pricing (MSI only)" />
      <SectionBlurb>
        Full NEXUS cube on Sentinel-2 / Landsat. DINOv3 embedding space. No HSI tasks.
      </SectionBlurb>
      <DataTable
        headers={['', 'Starter', 'Professional', 'Enterprise', 'Enterprise+']}
        rows={[
          ['Monthly fee', '$1,500', '$4,500', '$12,000', 'Custom'],
          ['Annual fee', '$18,000', '$54,000', '$144,000', 'Custom'],
        ]}
        compact
      />

      <SectionDivider label="HSI uplift pricing (adds to MSI base)" />
      <SectionBlurb>
        Adds Firefly tasking, HSI ingestion into NEXUS cube, ISOFIT processing, HSI trait and structure
        variable derivation, and HSI-enriched embedding space.
      </SectionBlurb>
      <DataTable
        headers={['', 'Starter', 'Professional', 'Enterprise', 'Enterprise+']}
        rows={[
          ['Monthly uplift', '$2,000', '$6,000', '$16,000', 'Custom'],
          ['Annual uplift', '$24,000', '$72,000', '$192,000', 'Custom'],
          ['HSI tasks included / qtr', '2', '4', '8', 'Custom'],
          ['Combined monthly (MSI + HSI)', '$3,500', '$10,500', '$28,000', 'Custom'],
          ['Combined annual (MSI + HSI)', '$42,000', '$126,000', '$336,000', 'Custom'],
        ]}
        compact
      />

      <SectionDivider label="HSI task system" />
      <Accordion title="What is an HSI task?" defaultOpen={true}>
        <SectionBlurb>
          One HSI task = one Firefly tasking and acquisition event over the customer's subscribed AOI, including:
        </SectionBlurb>
        <NoteList items={[
          'Scene acquisition scheduling',
          'HSI trait and structure variable derivation (LAI, Cab, Cw, Cm, Car, fAGB, canopy height, forest cover fraction)',
          'Ingestion into NEXUS cube and embedding space refresh',
          'Full HSI analytics pipeline run for all subscribed API layers',
          'Aurora delivery and archiving',
        ]} />
      </Accordion>

      <Accordion title="HSI task cost — additional tasks (overage)">
        <DataTable
          headers={['AOI Band', 'Cost per additional HSI task', 'Implied $/km² (midpoint AOI)', 'Imagery floor $/km²', 'Analytics margin']}
          rows={[
            ['Up to 500 km²', '$3,500', '$14.00', '$8.00', '$6.00'],
            ['500–2,500 km²', '$14,000', '$10.00', '$8.00', '$2.00'],
            ['2,500–10,000 km²', '$52,000', '$8.67', '$8.00', '$0.67'],
            ['10,000+ km²', 'Custom', 'Custom', '$8.00', 'Negotiated'],
          ]}
          compact
        />
      </Accordion>

      <Accordion title="HSI task policy">
        <NoteList items={[
          'HSI tasks allocated quarterly, expire end of quarter — no rollover',
          'Additional tasks purchasable at overage rates at any time',
          'Unused tasks non-refundable',
          'Notification at 80% consumption with upgrade prompt',
          'HSI acquisitions trigger an immediate out-of-cycle embedding space refresh regardless of MSI cadence tier',
        ]} />
      </Accordion>

      <SectionDivider label="Embedding refresh cadence" />
      <DataTable
        headers={['Cadence', 'Typical use case']}
        rows={[
          ['Continuous (Enterprise+)', 'Near-real-time monitoring, defense, critical infrastructure'],
          ['Weekly (Professional, Enterprise)', 'Active crop season, wildfire risk, HAB monitoring'],
          ['Monthly (Starter)', 'API-driven trend feeds — carbon screening, restoration, water quality'],
          ['Quarterly', 'Available as downgrade option for cost-sensitive customers'],
          ['Annual', 'Archive-only research use cases'],
        ]}
        compact
      />
      <TableFootnote style={{ margin: '6px 0 0' }}>
        Starter is API-only: no Project Zephyr and no SSE. Threshold + webhook alerting (+10% add-on) is
        the primary notification path at Starter. Upgrade to Professional for dashboard and semantic query.
      </TableFootnote>

      <SectionDivider label="Add-on pricing" />
      <SectionBlurb style={{ marginBottom: 14 }}>
        Add-ons are priced as a % uplift on the base monthly subscription fee — applied to MSI or MSI + HSI base.
      </SectionBlurb>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        <div>
          <AddonVerticalHeading color="#D4A017">Agriculture</AddonVerticalHeading>
          <DataTable
            headers={['Add-on Group', 'Monthly uplift', 'Notes']}
            rows={[
              ['Precision Ag (Intervention, VRA, Harvest Timing)', '+20%', ''],
              ['Crop Protection (Pest, Disease Forewarning)', '+15%', ''],
              ['Seasonal Risk (Yield, Loss, Outlook, Portfolio, Evidence)', '+30%', 'Higher model complexity'],
              ['Alerting (Threshold + Webhook)', '+10%', 'Flat; applies across all subscribed outputs'],
            ]}
            compact
          />
        </div>
        <div>
          <AddonVerticalHeading color="#5BE584">Forestry</AddonVerticalHeading>
          <DataTable
            headers={['Add-on Group', 'Monthly uplift', 'Notes']}
            rows={[
              ['ARR & Restoration Monitoring', '+25%', ''],
              ['Carbon MRV & REDD+', '+35%', 'High compliance value'],
              ['Wildfire Risk & Recovery', '+25%', ''],
              ['Recovery Monitoring (shared)', '+10%', 'Discounted if combined with ARR or Wildfire'],
              ['Alerting (Threshold + Webhook)', '+10%', ''],
            ]}
            compact
          />
        </div>
        <div>
          <AddonVerticalHeading color="#4FC3F7">Water</AddonVerticalHeading>
          <DataTable
            headers={['Add-on Group', 'Monthly uplift', 'Notes']}
            rows={[
              ['HAB Monitor & Forecast', '+25%', 'Forecast model adds compute cost'],
              ['Benthic Mapping', '+30%', 'HSI tier required'],
              ['Alerting (Threshold + Webhook)', '+10%', ''],
            ]}
            compact
          />
        </div>
        <div>
          <AddonVerticalHeading color="#9C6B2E">Mining Lifecycle</AddonVerticalHeading>
          <DataTable
            headers={['Add-on Group', 'Monthly uplift', 'Notes']}
            rows={[
              ['Rehabilitation & Restoration', '+20%', 'Mining-specific; separate from forestry ARR'],
              ['Alerting (Threshold + Webhook)', '+10%', ''],
            ]}
            compact
          />
        </div>
      </div>

      <SectionDivider label="Bundling discounts" />
      <DataTable
        headers={['Scenario', 'Discount']}
        rows={[
          ['2 add-on groups from same vertical', '10% off add-on total'],
          ['3+ add-on groups from same vertical', '15% off add-on total'],
          ['Multi-vertical subscription (2+ verticals)', '10% off total subscription'],
          ['Multi-year contract (2 year)', '10% off annual total'],
          ['Multi-year contract (3 year)', '15% off annual total'],
          ['Early / strategic partner', 'Up to 20% — commercial review required'],
        ]}
        compact
      />

      <SectionDivider label="Regional & institutional multipliers" />
      <SectionBlurb style={{ marginBottom: 14 }}>
        Applies to Monitoring Subscription subscription fees and Geology Campaign campaign fees unless
        the contract specifies otherwise. Tier is determined by the{' '}
        <strong>purchaser&apos;s headquarters jurisdiction</strong> using the{' '}
        <a
          href="https://datatopics.worldbank.org/world-development-indicators/the-world-by-income-and-region.html"
          target="_blank"
          rel="noreferrer noopener"
          style={{ color: 'var(--cyan)' }}
        >
          World Bank country income classifications
        </a>{' '}
        (current fiscal year mapping). Multiply the applicable list fee by the multiplier below.
      </SectionBlurb>
      <DataTable
        headers={['Region tier', 'Classification (HQ jurisdiction)', 'Multiplier']}
        rows={[
          ['Tier 1', 'High-income economy', '1.0×'],
          ['Tier 2', 'Upper-middle-income economy', '0.75×'],
          ['Tier 3', 'Lower-middle-income & low-income economies', '0.50×'],
          ['Institutional', 'International NGOs · UN agencies · multilateral development banks (MDBs)', '0.60×'],
        ]}
        compact
      />
      <TableFootnote>
        NGO / Multilateral eligibility requires documented status; stacking with bundling discounts and
        early-partner rebates is subject to commercial review.
      </TableFootnote>

      <SectionDivider label="Illustrative deal examples" />
      <DealExample
        n="1"
        title="Regional Agribusiness — MSI only"
        accent="var(--cyan)"
        lines={[
          { label: 'Onboarding', value: '$15,000 (1,200 km² AOI)' },
          { label: 'Tier', value: 'Professional' },
          { label: 'Add-ons', value: 'Precision Ag (+20%), Alerting (+10%)' },
          { label: 'Monthly', value: '$4,500 × 1.30 = $5,850' },
          { label: 'Year 1', value: '$70,200 + $15,000 onboarding = $85,200' },
        ]}
      />
      <DealExample
        n="2"
        title="Carbon Project Developer — HSI"
        accent="var(--green)"
        lines={[
          { label: 'Onboarding', value: '$15,000 (2,000 km² AOI, HSI included)' },
          { label: 'Tier', value: 'Professional (MSI + HSI)' },
          { label: 'Add-ons', value: 'ARR & Restoration (+25%), Carbon MRV (+35%), Alerting (+10%)' },
          { label: 'Monthly', value: '$10,500 × 1.70 = $17,850' },
          { label: 'Year 1', value: '$214,200 + $15,000 onboarding = $229,200' },
        ]}
      />
      <DealExample
        n="3"
        title="Water Utility — MSI only (dashboard)"
        accent="#4FC3F7"
        lines={[
          { label: 'Onboarding', value: '$500 (300 km² reservoir network)' },
          { label: 'Tier', value: 'Professional (Zephyr + SSE — not Starter API-only)' },
          { label: 'Add-ons', value: 'HAB Monitor (+25%), Alerting (+10%)' },
          { label: 'Monthly', value: '$4,500 × 1.35 = $6,075' },
          { label: 'Year 1', value: '$72,900 + $500 onboarding = $73,400' },
        ]}
      />
      <DealExample
        n="4"
        title="Research Program — API-only Starter"
        accent="var(--cyan)"
        lines={[
          { label: 'Onboarding', value: '$500 (200 km² study AOI)' },
          { label: 'Tier', value: 'Starter (API only — no Zephyr)' },
          { label: 'Add-ons', value: 'Alerting (+10%)' },
          { label: 'Monthly', value: '$1,500 × 1.10 = $1,650' },
          { label: 'Year 1', value: '$19,800 + $500 onboarding = $20,300' },
        ]}
      />
      <DealExample
        n="5"
        title="Mining Operator — HSI, large site"
        accent="#9C6B2E"
        lines={[
          { label: 'Onboarding', value: '$4,000 (8,000 km² site, HSI included)' },
          { label: 'Tier', value: 'Enterprise (MSI + HSI)' },
          { label: 'Add-ons', value: 'Rehabilitation & Restoration (+20%), Alerting (+10%)' },
          { label: 'Monthly', value: '$28,000 × 1.30 = $36,400' },
          { label: 'Year 1', value: '$436,800 + $4,000 onboarding = $440,800' },
        ]}
      />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* TRACK 2 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div style={{ marginTop: 48 }}>
        <TrackBadge n="Track 2" label="Geology Campaign Package" color={TRACK.geology} />
        <TrackSectionTitle accent={TRACK.geology}>
          Mineral Prospecting · REE & Critical Minerals
        </TrackSectionTitle>
        <TrackIntro>
          Campaign-based, not subscription. Customers purchase a defined campaign scope over a target AOI.
          SSE spectral similarity search is the core exploration intelligence capability.
        </TrackIntro>
      </div>

      <SectionDivider label="Guiding principles" />
      <PrinciplePill>
        <strong>Campaign-based, not subscription.</strong> Exploration targets are episodic and
        mobile — customers need a defined scope deliverable, not a persistent monitoring commitment.
      </PrinciplePill>
      <PrinciplePill>
        <strong>SSE powers the campaign.</strong> Semantic / spectral similarity search across the
        campaign archive is the core exploration intelligence capability.
      </PrinciplePill>
      <PrinciplePill>
        <strong>HSI tasks are the primary consumption unit.</strong> Each task = one Firefly
        acquisition over the target AOI, full mineral mapping pipeline, ingestion into the campaign
        embedding space.
      </PrinciplePill>
      <PrinciplePill>
        <strong>Campaigns are renewable.</strong> Same target extended, or new target opened — each
        renewal is a fresh campaign package. Renewal discount of 15% applies for same AOI.
      </PrinciplePill>

      <SectionDivider label="Campaign package structure" />
      <DataTable
        headers={['Component', 'What it covers']}
        rows={[
          ['AOI definition', 'Customer-defined exploration target — any geography'],
          ['Campaign period', '6 months or 12 months'],
          ['HSI tasks', 'Defined number of Firefly acquisitions included in campaign fee'],
          ['Deliverables', 'Mineral classification map, alteration halo map, REE proxy layer, prospectivity score, confidence layer, evidence package per HSI task'],
          ['SSE access', 'Semantic / spectral similarity search over campaign AOI archive for campaign duration'],
          ['Aurora / Zephyr', 'Project Zephyr dashboard access for campaign duration'],
          ['Renewal', 'Renewable at end of period — same AOI or new target'],
        ]}
        compact
      />

      <SectionDivider label="Campaign pricing" />
      <SectionBlurb>
        Campaign fee covers NEXUS cube initialization, spectral reference library matching, and all Core
        API outputs. HSI tasks bake in $8/km² imagery floor.
      </SectionBlurb>
      <DataTable
        headers={['AOI Band', 'Campaign Fee (6 months)', 'Campaign Fee (12 months)', 'HSI tasks included', 'Additional HSI task']}
        rows={[
          ['Up to 500 km²', '$18,000', '$30,000', '2', '$3,500'],
          ['500–2,500 km²', '$45,000', '$75,000', '3', '$14,000'],
          ['2,500–10,000 km²', '$100,000', '$165,000', '4', '$52,000'],
          ['10,000+ km²', 'Custom', 'Custom', 'Custom', 'Custom'],
        ]}
        compact
      />
      <NoteList items={[
        'Campaign fee non-refundable once AOI cube build initiated',
        'VNIR-SWIR (Honeybee) tasks billed at 1.5× standard HSI task rate',
        'Renewal discount: 15% off campaign fee for same AOI renewal',
        'Multi-target discount: 10% off second and subsequent concurrent campaigns',
        'No onboarding fee — cube initialization is included in campaign fee',
      ]} />

      <SectionDivider label="Alerting add-on" />
      <DataTable
        headers={['Add-on', 'Fee', 'Notes']}
        rows={[
          ['Threshold + Webhook Alerting', '+$500/month', 'Prospectivity exceedance and target detection alerts for campaign duration'],
        ]}
        compact
      />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* TRACK 3 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div style={{ marginTop: 48 }}>
        <TrackBadge n="Track 3" label="Defense & Intelligence" color={TRACK.defense} />
        <TrackSectionTitle accent={TRACK.defense}>
          Site Intelligence · Terrain & Mobility
        </TrackSectionTitle>
        <TrackIntro>
          Project / contract based. Governed by government procurement, FMS, OTA, or direct commercial
          contract. Not a SaaS subscription — pricing TBD.
        </TrackIntro>
      </div>

      <Callout type="stop" label="ITAR / export control required">
        All defense and intelligence contracts require ITAR compliance review. Do not share pricing,
        scope, or deliverable details with any defense prospect without CCO, legal, and export-control
        sign-off.
      </Callout>

      <SectionDivider label="Commercial principles" />
      <PrinciplePill>
        <strong>Contract-defined scope.</strong> Each engagement defines AOI, monitoring period,
        deliverable set, and HSI task cadence in the contract.
      </PrinciplePill>
      <PrinciplePill>
        <strong>SSE included as core intelligence capability.</strong> Cross-archive similarity search
        and semantic query against the site embedding space is a standard contract deliverable, not an
        add-on.
      </PrinciplePill>
      <PrinciplePill>
        <strong>HSI task pricing follows standard imagery floor.</strong> $8/km² imagery cost recovered
        within contract pricing.
      </PrinciplePill>
      <PrinciplePill>
        <strong>Pricing structured around contract periods</strong> — typically 12, 24, or 36 months
        with defined refresh cadence and HSI task allocation.
      </PrinciplePill>

      <SectionDivider label="Indicative contract components" />
      <DataTable
        headers={['Component', 'Description']}
        rows={[
          ['Site onboarding', 'Full historical archive cube build, embedding space initialization, Aurora / Zephyr provisioning'],
          ['Monitoring subscription', 'Embedding refresh cadence (continuous or weekly), Core API outputs, SSE access'],
          ['HSI task allocation', 'Defined Firefly tasking cadence per contract period'],
          ['Add-on modules', 'Mobility & Terrain add-on priced per contract'],
          ['Alerting', 'Threshold alerts and webhook delivery'],
          ['Evidence / delivery', 'Machine-readable intelligence package per reporting cycle'],
        ]}
        compact
      />
      <SectionBlurb style={{ marginTop: 10 }}>
        Full pricing to be developed in coordination with defense and government sales team.
      </SectionBlurb>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* Pilots cross-link (full content lives on the Pilot revenue model) */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div style={{ marginTop: 48 }}>
        <Callout type="info" label="Pilots — separate commercial track">
          Pilots are fixed-fee, fixed-scope analytical engagements and are governed separately from
          the subscription, campaign, and contract tracks above. See the{' '}
          <a href="#pilot-revenue-model" style={{ color: 'var(--cyan)' }}>
            pilot revenue model
          </a>{' '}
          for tier structure, vertical-specific pricing, scope guardrails, and conversion credit
          policy (pilot fee → onboarding / campaign / contract).
        </Callout>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* OPEN QUESTIONS */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div style={{ marginTop: 48 }}>
        <Callout type="warn" label="Open questions for commercial review">
          <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
            {[
              'Onboarding fee calibration — fees are indicative. Validate against actual compute cost of full-archive cube build per km² before finalizing.',
              'Geology campaign fee calibration — validate against typical junior miner vs. major exploration budget benchmarks.',
              'Starter API-only exceptions — define policy for paid Zephyr viewer add-on vs. required upgrade to Professional.',
              'Quarterly / Annual refresh as downgrade — formalize whether self-serve downgrade in Aurora or a contract variation (Professional+ only for Zephyr self-serve).',
              'Geology renewal discount — 15% renewal assumes same AOI. Define policy for partial AOI renewal.',
              'Defense pricing framework — develop in coordination with defense sales team. Requires ITAR compliance review before publishing or sharing.',
              'DaaS pricing — raw and processed NEXUS cube as a separate revenue stream. Not in this model; needs its own commercial track.',
              'Monitored AOI / boundary limits — 50 for Starter may be too restrictive for fragmented parcels; API-only Starter may still need higher boundary count for integrators.',
              'SSE infrastructure cost at scale — validate compute cost of serving semantic queries across Enterprise and Enterprise+ before finalizing tier economics.',
            ].map((q, i) => (
              <li key={i} style={{ ...mutedText, color: 'var(--text)', marginBottom: 6 }}>
                {q}
              </li>
            ))}
          </ul>
        </Callout>
      </div>
    </>
  );
}

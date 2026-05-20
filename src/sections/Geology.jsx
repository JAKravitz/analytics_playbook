import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import VertHero from '../components/VertHero.jsx';
import Callout from '../components/Callout.jsx';
import {
  seedLayers,
  layersForVertical,
  groupApiRowsByKind,
  groupAddonsByFamily,
  LAYER_STATUS_LABELS,
  layerStatusColor,
} from '../data/layersCatalog.js';
import { seed } from '../data/seed.js';
import { monoStyle, TYPE } from '../styles/typography.js';


function Tag({ children, color = 'var(--gray)' }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 6px',
        border: `1px solid ${color}`,
        color,
        borderRadius: 3,
        fontSize: 10,
        fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
        textTransform: 'uppercase',
        letterSpacing: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

function StatusTag({ status, apiReady }) {
  const color = layerStatusColor(status);
  return (
    <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
      <Tag color={color}>{LAYER_STATUS_LABELS[status] || status}</Tag>
      {apiReady && (
        <span style={{ ...monoStyle, fontSize: 10 }}>· {apiReady}</span>
      )}
    </span>
  );
}

function ApiCard({ row, accent }) {
  const [open, setOpen] = useState(false);
  const hasUplift = row.upliftMsi || row.upliftVnirHsi || row.upliftVnirSwir;
  const requires = Array.isArray(row.requires) ? row.requires : [];
  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--gray2)',
        borderLeft: `2px solid ${accent}`,
        marginBottom: 10,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((x) => !x)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 0,
          padding: '12px 16px',
          textAlign: 'left',
          color: 'var(--text)',
          cursor: 'pointer',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 12,
          alignItems: 'center',
        }}
      >
        {open ? <ChevronDown size={14} color="var(--gray)" /> : <ChevronRight size={14} color="var(--gray)" />}
        <div>
          <div
            style={{
              fontWeight: 600,
              color: 'var(--white)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 18,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            {row.name}
          </div>
          {row.provides && (
            <div style={{ fontSize: 14, color: 'var(--gray)', marginTop: 2 }}>{row.provides}</div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {row.kind === 'internal' && <Tag color="var(--amber)">Internal</Tag>}
          <StatusTag status={row.status} apiReady={row.apiReady} />
          <a
            href={`#layer-spec/${row.id}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 10,
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
              color: 'var(--cyan)',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
            title="Open API specification"
          >
            <ExternalLink size={11} /> Spec
          </a>
        </div>
      </button>

      {open && (
        <div style={{ padding: '4px 16px 16px 42px' }}>
          {requires.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ ...monoStyle, textTransform: 'uppercase', marginBottom: 6 }}>Requires</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {requires.map((r) => <Tag key={r}>{r}</Tag>)}
              </div>
            </div>
          )}
          {hasUplift && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 4 }}>
              <UpliftCol label="MSI baseline" text={row.upliftMsi} accent="var(--gray)" />
              <UpliftCol label="VNIR HSI adds" text={row.upliftVnirHsi} accent="var(--cyan)" />
              <UpliftCol label="VNIR-SWIR HSI adds" text={row.upliftVnirSwir} accent="var(--purple)" />
            </div>
          )}
          <div style={{ marginTop: 12, fontSize: 12, color: 'var(--gray)', fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>
            {row.kind === 'internal'
              ? 'Included on request (no extra charge) · Tier '
              : `Base list: $${row.baseUsdPerKm2}/km² · Tier `}
            {row.tier} · Grade {row.grade}
          </div>
        </div>
      )}
    </div>
  );
}

function UpliftCol({ label, text, accent }) {
  return (
    <div style={{ background: 'var(--bg3)', border: '1px solid var(--gray2)', padding: '8px 10px' }}>
      <div style={{ ...monoStyle, color: accent, textTransform: 'uppercase', marginBottom: 4, fontSize: 10, letterSpacing: 1.2 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.55 }}>{text || '—'}</div>
    </div>
  );
}

function SectionHeader({ label, headline, subtitle, accent = 'var(--cyan)' }) {
  return (
    <div style={{ marginTop: 36, marginBottom: 18, paddingBottom: 14, borderBottom: `2px solid ${accent}` }}>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
          color: accent,
          textTransform: 'uppercase',
          fontSize: 15,
          letterSpacing: '0.22em',
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        {label}
      </div>
      {headline && (
        <div
          style={{
            marginTop: 10,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: '0.04em',
            color: 'var(--white)',
          }}
        >
          {headline}
        </div>
      )}
      {subtitle && (
        <p style={{ margin: headline ? '8px 0 0' : '10px 0 0', color: 'var(--gray)', fontSize: 13, lineHeight: 1.55, maxWidth: 720 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function Geology({ state }) {
  const v = seed.verticals.geology;
  const accent = v.color;

  const layers = Array.isArray(state?.layers) && state.layers.length ? state.layers : seedLayers;
  const geoRows = useMemo(() => layersForVertical('geology', layers), [layers]);
  const grouped = useMemo(() => groupApiRowsByKind(geoRows), [geoRows]);
  const addonFamilies = useMemo(() => groupAddonsByFamily(grouped.addon), [grouped.addon]);

  return (
    <>
      <VertHero index={4} name={v.name} sub={v.sub} desc={v.desc} accent={v.color} />

      <Callout type="info" label="SSE Campaign Package model">
        Geology is sold as an <strong>SSE Campaign Package</strong> — episodic and target-driven, not a
        continuous subscription. The customer defines an exploration AOI, purchases a campaign with a
        defined number of HSI tasks, and receives a fixed delivery scope. The Core API covers mineral
        prospecting through to prospectivity scoring; the SSE Similarity Search is the Data API for
        integrators and platform buyers.
      </Callout>

      <SectionHeader
        label="Campaign Package"
        headline="Geology Exploration"
        subtitle="Single unified package covering mineral prospecting and REE / critical mineral exploration. Customer defines an exploration target AOI, purchases a campaign with a defined number of HSI tasks and a fixed delivery scope."
        accent={accent}
      />

      <SectionHeader
        label="Core API"
        subtitle="AOI boundaries, mineral classification, alteration halos, REE proxies, prospectivity scoring, confidence, and evidence — the billable foundation of every geology campaign."
        accent={accent}
      />
      {grouped.core.map((row) => (
        <ApiCard key={row.id} row={row} accent={accent} />
      ))}

      {grouped.internal.length > 0 && (
        <>
          <SectionHeader
            label="Internal — available on request"
            subtitle="Surface validity mask, spectral reference library, and spectral similarity — bundled at no extra charge; not in the standard customer catalog."
            accent="var(--amber)"
          />
          {grouped.internal.map((row) => (
            <ApiCard key={row.id} row={row} accent="var(--amber)" />
          ))}
        </>
      )}

      {addonFamilies.length > 0 && (
        <>
          <SectionHeader
            label="Add-on catalog"
            subtitle="Data API for integrators and platform buyers, plus alerting add-ons configurable against any Core API output."
            accent="var(--purple)"
          />
          {addonFamilies.map(({ family, rows }) => (
            <div key={family} style={{ marginBottom: 18 }}>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                  color: 'var(--purple)',
                  textTransform: 'uppercase',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  marginTop: 16,
                  marginBottom: 10,
                }}
              >
                {family} {family === 'Data API' ? '' : 'add-ons'}
              </div>
              {family === 'Data API' && (
                <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--gray)', lineHeight: 1.5 }}>
                  Available to integrators and platform buyers at separate pricing. Not part of the standard campaign package.
                </p>
              )}
              {family === 'Alerting' && (
                <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--gray)', lineHeight: 1.5 }}>
                  Configurable against any Core API output. Purchased once, applies across all active subscriptions.
                </p>
              )}
              {rows.map((row) => (
                <ApiCard key={row.id} row={row} accent="var(--purple)" />
              ))}
            </div>
          ))}
        </>
      )}

      <Callout type="warn" label="Pricing & catalog">
        Per-API list rates are placeholders for the calculator. The geology campaign model is
        episodic — not per-km²/quarter like the subscription verticals. Rates reflect approximate
        campaign equivalents until commercial finalizes campaign pricing. Geology rows live in{' '}
        <code>src/data/geologyCatalogRows.js</code>.
      </Callout>
    </>
  );
}

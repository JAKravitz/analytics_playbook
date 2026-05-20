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

function DetailTable({ detail, title }) {
  if (!detail || !Array.isArray(detail.rows)) return null;
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ ...monoStyle, textTransform: 'uppercase', marginBottom: 6 }}>{title}</div>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            minWidth: 720,
            borderCollapse: 'collapse',
            fontSize: 14,
            background: 'var(--bg3)',
          }}
        >
          <thead>
            <tr>
              {detail.headers.map((h, i) => (
                <th
                  key={h + i}
                  style={{
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderBottom: '1px solid var(--gray2)',
                    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                    fontSize: 10,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    color: 'var(--on-navy)',
                    fontWeight: 700,
                    background: 'var(--navy)',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {detail.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    style={{
                      padding: '8px 10px',
                      borderBottom: '1px solid var(--gray2)',
                      verticalAlign: 'top',
                      color: ci === 0 ? 'var(--white)' : 'var(--text)',
                      fontWeight: ci === 0 ? 600 : 400,
                    }}
                  >
                    {cell || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
        {open ? (
          <ChevronDown size={14} color="var(--gray)" />
        ) : (
          <ChevronRight size={14} color="var(--gray)" />
        )}
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
              <div style={{ ...monoStyle, textTransform: 'uppercase', marginBottom: 6 }}>
                Requires
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {requires.map((r) => (
                  <Tag key={r}>{r}</Tag>
                ))}
              </div>
            </div>
          )}
          {hasUplift && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 10,
                marginTop: 4,
              }}
            >
              <UpliftCol label="MSI baseline" text={row.upliftMsi} accent="var(--gray)" />
              <UpliftCol label="VNIR HSI adds" text={row.upliftVnirHsi} accent="var(--cyan)" />
              <UpliftCol label="VNIR-SWIR HSI adds" text={row.upliftVnirSwir} accent="var(--purple)" />
            </div>
          )}
          {row.traitDetail && (
            <DetailTable detail={row.traitDetail} title="Trait detail (per-trait sensor uplift)" />
          )}
          {row.structureDetail && (
            <DetailTable
              detail={row.structureDetail}
              title="Structure detail (per-metric sensor uplift)"
            />
          )}
          <div
            style={{
              marginTop: 12,
              fontSize: 14,
              color: 'var(--gray)',
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
            }}
          >
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
      <div
        style={{
          ...monoStyle,
          color: accent,
          textTransform: 'uppercase',
          marginBottom: 4,
          fontSize: 10,
          letterSpacing: 1.2,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.55 }}>{text || '—'}</div>
    </div>
  );
}

function SectionHeader({ label, headline, subtitle, accent = 'var(--cyan)' }) {
  return (
    <div
      style={{
        marginTop: 36,
        marginBottom: 18,
        paddingBottom: 14,
        borderBottom: `2px solid ${accent}`,
      }}
    >
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
            textTransform: 'none',
          }}
        >
          {headline}
        </div>
      )}
      {subtitle && (
        <p
          style={{
            margin: headline ? '8px 0 0' : '10px 0 0',
            color: 'var(--gray)',
            fontSize: 13,
            lineHeight: 1.55,
            maxWidth: 720,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function Water({ state }) {
  const v = seed.verticals.water;
  const accent = v.color;

  const layers = Array.isArray(state?.layers) && state.layers.length ? state.layers : seedLayers;
  const waterRows = useMemo(() => layersForVertical('water', layers), [layers]);
  const grouped = useMemo(() => groupApiRowsByKind(waterRows), [waterRows]);
  const addonFamilies = useMemo(() => groupAddonsByFamily(grouped.addon), [grouped.addon]);

  return (
    <>
      <VertHero index={3} name={v.name} sub={v.sub} desc={v.desc} accent={v.color} />

      <Callout type="info" label="API-first revenue model">
        Water is sold as a <strong>base package</strong> (Water Quality Intelligence) with a billable{' '}
        <strong>Core API</strong> (including optical inversion) and <strong>internal</strong> atmospheric
        correction on request at no extra charge. HAB, benthic, and alerting add-ons attach on top.
      </Callout>

      <SectionHeader
        label="Base package"
        headline="Water Quality Intelligence"
        subtitle="Required foundation for water add-ons. Every customer starts here."
        accent={accent}
      />

      <SectionHeader
        label="Core API"
        subtitle="Waterbody boundaries, surface water mask, constituent retrievals, non-optical estimates, anomalies, exceedance triggers, confidence, and optical inversion — the billable foundation every customer subscribes to."
        accent={accent}
      />
      {grouped.core.map((row) => (
        <ApiCard key={row.id} row={row} accent={accent} />
      ))}

      {grouped.internal.length > 0 && (
        <>
          <SectionHeader
            label="Internal — available on request"
            subtitle="Internal processing layers — bundled at no extra charge; not in the standard catalog."
            accent="var(--amber)"
          />
          {grouped.internal.map((row) => (
            <ApiCard key={row.id} row={row} accent="var(--amber)" />
          ))}
        </>
      )}

      <SectionHeader
        label="Add-on catalog"
        subtitle="Optional add-on APIs on top of the Core API: HAB monitor &amp; forecast, benthic mapping, and alerting."
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
            {family} add-ons
          </div>
          {family === 'Alerting' && (
            <p
              style={{
                margin: '0 0 8px',
                fontSize: 14,
                color: 'var(--gray)',
                lineHeight: 1.5,
              }}
            >
              Configurable against any subscribed Core or Add-on API output. Purchased once, applies
              across all active subscriptions.
            </p>
          )}
          {family === 'HAB Monitor & Forecast' && (
            <p
              style={{
                margin: '0 0 8px',
                fontSize: 14,
                color: 'var(--gray)',
                lineHeight: 1.5,
              }}
            >
              Bloom monitoring is operational; forecast API is in scoping — do not commit to forecast SLAs
              until methodology is confirmed.
            </p>
          )}
          {rows.map((row) => (
            <ApiCard key={row.id} row={row} accent="var(--purple)" />
          ))}
        </div>
      ))}

      <Callout type="warn" label="Pricing & catalog">
        Per-API list rates are placeholders for the calculator until commercial signs off. Water
        rows live in <code>src/data/waterCatalogRows.js</code> and merge into{' '}
        <code>src/data/layersCatalog.js</code>; anything tagged with vertical <code>water</code>{' '}
        appears here automatically.
      </Callout>
    </>
  );
}

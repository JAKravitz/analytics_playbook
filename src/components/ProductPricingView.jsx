import Callout from './Callout.jsx';
import { AURORA_SUBSCRIPTION_PRICING_TBD, PRICING_DISCLAIMER } from '../data/productPricingShared.js';

function DataTable({ headers, rows }) {
  return (
    <div style={{ overflowX: 'auto', margin: '14px 0' }}>
      <table style={{ width: '100%', minWidth: 480, borderCollapse: 'collapse', fontSize: 14, background: 'var(--bg3)' }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  textAlign: 'left',
                  padding: '9px 12px',
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
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: '9px 12px',
                    borderBottom: '1px solid var(--gray2)',
                    color: ci === 0 ? 'var(--white)' : 'var(--text)',
                    fontWeight: ci === 0 ? 600 : 400,
                    verticalAlign: 'top',
                    lineHeight: 1.5,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionHeader({ label, subtitle, accent }) {
  return (
    <div style={{ marginTop: 36, marginBottom: 16, paddingBottom: 12, borderBottom: `2px solid ${accent}` }}>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
          color: accent,
          textTransform: 'uppercase',
          fontSize: 14,
          letterSpacing: '0.2em',
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      {subtitle && (
        <p style={{ margin: '10px 0 0', color: 'var(--gray)', fontSize: 13, lineHeight: 1.55, maxWidth: 820 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function IaaSSection({ iaas, accent }) {
  return (
    <section className="pricing-iaas-block">
      <div className="pricing-model-eyebrow" style={{ color: accent }}>
        {iaas.title}
      </div>
      <h2 className="pricing-model-headline">{iaas.headline}</h2>
      <p className="pricing-model-lede">{iaas.lede}</p>

      <div className="eyebrow" style={{ marginTop: 20, marginBottom: 8 }}>
        Engagement fee by AOI size
      </div>
      {iaas.areaPricing.formulaNote && (
        <p style={{ fontSize: 13, color: 'var(--gray)', margin: '0 0 10px', lineHeight: 1.55, maxWidth: 820 }}>
          {iaas.areaPricing.formulaNote}
        </p>
      )}
      <DataTable headers={iaas.areaPricing.headers} rows={iaas.areaPricing.rows} />

      <div className="split-2" style={{ marginTop: 20, gap: 20 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>
            What you receive
          </div>
          <ul className="lang-list">
            {iaas.deliverables.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
        {iaas.notIncluded?.length > 0 && (
          <div>
            <div className="eyebrow" style={{ marginBottom: 8, color: 'var(--amber)' }}>
              Not included
            </div>
            <ul className="lang-list">
              {iaas.notIncluded.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {iaas.notes?.length > 0 && (
        <ul className="lang-list" style={{ marginTop: 16 }}>
          {iaas.notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

function IndexBuildSection({ indexBuild, accent }) {
  return (
    <section className="pricing-iaas-block">
      <div className="pricing-model-eyebrow" style={{ color: accent }}>
        {indexBuild.title}
      </div>
      <h2 className="pricing-model-headline">{indexBuild.headline}</h2>
      <p className="pricing-model-lede">{indexBuild.lede}</p>

      <div className="eyebrow" style={{ marginTop: 20, marginBottom: 8 }}>
        Engagement fee by archive scope
      </div>
      <DataTable headers={indexBuild.headers} rows={indexBuild.rows} />

      <div className="eyebrow" style={{ marginTop: 20, marginBottom: 8 }}>
        What you receive
      </div>
      <ul className="lang-list">
        {indexBuild.deliverables.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>

      {indexBuild.notes?.length > 0 && (
        <ul className="lang-list" style={{ marginTop: 16 }}>
          {indexBuild.notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

function EmbeddingsApiSection({ embeddingsApi, accent }) {
  return (
    <section className="pricing-iaas-block">
      <div className="pricing-model-eyebrow" style={{ color: accent }}>
        {embeddingsApi.title}
        {embeddingsApi.badge && (
          <span className="pricing-tier-badge" style={{ marginLeft: 10, verticalAlign: 'middle' }}>
            {embeddingsApi.badge}
          </span>
        )}
      </div>
      <h2 className="pricing-model-headline">{embeddingsApi.headline}</h2>
      <p className="pricing-model-lede">{embeddingsApi.lede}</p>
      {embeddingsApi.unitNote && (
        <p style={{ fontSize: 13, color: 'var(--gray)', margin: '14px 0 0', lineHeight: 1.55, maxWidth: 820 }}>
          {embeddingsApi.unitNote}
        </p>
      )}

      <div className="pricing-tier-grid pricing-tier-grid-4">
        {embeddingsApi.tiers.map((tier) => (
          <div
            key={tier.name}
            className="pricing-tier-card"
            style={{ borderTopColor: tier.accent || accent }}
          >
            <div className="pricing-tier-header">
              <div>
                <div className="pricing-tier-name">{tier.name}</div>
                {tier.badge && <span className="pricing-tier-badge">{tier.badge}</span>}
              </div>
              <div className="pricing-tier-price">
                <span className="pricing-tier-amount">{tier.price}</span>
                {tier.period && <span className="pricing-tier-period">{tier.period}</span>}
              </div>
            </div>
            <p
              style={{
                margin: '0 0 12px',
                fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                fontSize: 12,
                fontWeight: 600,
                color: accent,
              }}
            >
              {tier.encodeUnits}
            </p>
            {tier.scopeNote && (
              <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--gray)', lineHeight: 1.5 }}>
                {tier.scopeNote}
              </p>
            )}
            <ul className="pricing-tier-features">
              {tier.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {embeddingsApi.betaNote && (
        <Callout type="warn" label="Beta service">
          {embeddingsApi.betaNote}
        </Callout>
      )}
    </section>
  );
}

function AuroraSection({ aurora, accent }) {
  return (
    <section className="pricing-aurora-block">
      <div className="pricing-model-eyebrow" style={{ color: accent }}>
        {aurora.title}
      </div>
      <h2 className="pricing-model-headline">{aurora.headline}</h2>
      <p className="pricing-model-lede">{aurora.lede}</p>

      <div className="pricing-capabilities-card" style={{ borderTopColor: accent }}>
        <div className="eyebrow" style={{ marginBottom: 10, color: accent }}>
          Included on every plan
        </div>
        <ul className="lang-list" style={{ margin: 0 }}>
          {aurora.capabilities.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="eyebrow" style={{ marginTop: 24, marginBottom: 8 }}>
        Subscription &amp; token pricing
      </div>
      <p style={{ fontSize: 14, color: 'var(--gray)', margin: 0, lineHeight: 1.6, maxWidth: 820 }}>
        {AURORA_SUBSCRIPTION_PRICING_TBD}
      </p>
    </section>
  );
}

function MultipliersSection({ multipliers }) {
  if (!multipliers) return null;
  const { regional, sensor, earlyAdopter } = multipliers;
  return (
    <>
      <SectionHeader
        label="Regional pricing multipliers"
        subtitle={regional.blurb}
        accent="var(--cyan)"
      />
      <DataTable headers={regional.headers} rows={regional.rows} />
      <p style={{ fontSize: 12, color: 'var(--gray)', marginTop: 8, lineHeight: 1.55 }}>
        {regional.footnote}{' '}
        <a href={regional.worldBankUrl} target="_blank" rel="noreferrer noopener" style={{ color: 'var(--cyan)' }}>
          World Bank country income classifications
        </a>
        .
      </p>

      <SectionHeader
        label="Sensor-tier multipliers"
        subtitle={sensor.blurb}
        accent="var(--purple)"
      />
      <DataTable headers={sensor.headers} rows={sensor.rows} />
      {sensor.footnote && (
        <p style={{ fontSize: 12, color: 'var(--gray)', marginTop: 8, lineHeight: 1.55 }}>
          {sensor.footnote}
        </p>
      )}

      {earlyAdopter && (
        <>
          <SectionHeader
            label="Early adopter discount"
            subtitle={earlyAdopter.blurb}
            accent="var(--amber)"
          />
          <DataTable headers={earlyAdopter.headers} rows={earlyAdopter.rows} />
          {earlyAdopter.footnote && (
            <p style={{ fontSize: 12, color: 'var(--gray)', marginTop: 8, lineHeight: 1.55 }}>
              {earlyAdopter.footnote}
            </p>
          )}
        </>
      )}
    </>
  );
}

export default function ProductPricingView({ product }) {
  const { pricing, color } = product;

  return (
    <>
      <Callout type="warn" label="Indicative — not approved rates">
        {PRICING_DISCLAIMER}
      </Callout>

      <p style={{ fontSize: 15, lineHeight: 1.65, maxWidth: 820, margin: '16px 0 24px' }}>
        {pricing.intro}
      </p>

      {pricing.embeddingsApi && (
        <EmbeddingsApiSection embeddingsApi={pricing.embeddingsApi} accent={color} />
      )}
      {pricing.iaas && <IaaSSection iaas={pricing.iaas} accent={color} />}
      {pricing.indexBuild && <IndexBuildSection indexBuild={pricing.indexBuild} accent={color} />}
      {pricing.aurora && <AuroraSection aurora={pricing.aurora} accent={color} />}

      {pricing.addOns && (
        <>
          <SectionHeader label="Add-ons" accent="var(--purple)" />
          <DataTable headers={pricing.addOns.headers} rows={pricing.addOns.rows} />
        </>
      )}

      <MultipliersSection multipliers={pricing.multipliers} />
    </>
  );
}

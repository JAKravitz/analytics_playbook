/**
 * Hero for the new product pages (replaces VertHero's "Vertical NN" framing).
 * Shows the product codename, its acronym expansion, tagline, and blurb.
 */
export default function ProductHero({ name, fullName, acronymExpansion, tagline, desc, accent }) {
  return (
    <div className="vert-hero" style={{ '--accent': accent }}>
      <div className="eyebrow" style={{ color: accent }}>
        Product · {fullName}
      </div>
      <div className="vert-name" style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        {name}
        {acronymExpansion && (
          <span
            style={{
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
              fontSize: 13,
              letterSpacing: 0.5,
              color: 'var(--gray)',
              textTransform: 'none',
              fontWeight: 400,
            }}
          >
            {acronymExpansion}
          </span>
        )}
      </div>
      {tagline && <div className="vert-sub">{tagline}</div>}
      <p className="vert-desc">{desc}</p>
    </div>
  );
}

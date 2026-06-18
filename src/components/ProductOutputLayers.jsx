const STATUS_LABELS = {
  available: 'Available',
  'semi-operational': 'Semi-operational',
  beta: 'Beta',
  'in-development': 'In development',
  roadmap: 'Roadmap',
};

const STATUS_COLORS = {
  available: 'var(--green)',
  'semi-operational': 'var(--cyan)',
  beta: 'var(--amber)',
  'in-development': 'var(--amber)',
  roadmap: 'var(--purple)',
};

function LayerRow({ layer }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(160px, 220px) 1fr',
        gap: '12px 20px',
        padding: '11px 0',
        borderBottom: '1px solid var(--gray2)',
        alignItems: 'start',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '6px 8px' }}>
        <span style={{ fontWeight: 600, color: 'var(--white)', fontSize: 14, lineHeight: 1.45 }}>
          {layer.name}
        </span>
        {layer.status && (
          <span
            style={{
              display: 'inline-block',
              padding: '1px 5px',
              border: `1px solid ${STATUS_COLORS[layer.status] || 'var(--gray)'}`,
              color: STATUS_COLORS[layer.status] || 'var(--gray)',
              borderRadius: 3,
              fontSize: 9,
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
              textTransform: 'uppercase',
              letterSpacing: 0.8,
            }}
          >
            {STATUS_LABELS[layer.status] || layer.status}
          </span>
        )}
      </div>
      <span style={{ color: 'var(--gray)', fontSize: 13, lineHeight: 1.55 }}>{layer.desc}</span>
    </div>
  );
}

function LayerGroup({ group, accent, defaultLabel }) {
  return (
    <section style={{ marginTop: 28 }}>
      <div style={{ marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${accent}` }}>
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
          {group.title || defaultLabel}
        </div>
        {group.subtitle && (
          <p style={{ margin: '8px 0 0', color: 'var(--gray)', fontSize: 13, lineHeight: 1.55, maxWidth: 820 }}>
            {group.subtitle}
          </p>
        )}
      </div>
      <div>
        {group.layers.map((layer) => (
          <LayerRow key={layer.name} layer={layer} />
        ))}
      </div>
    </section>
  );
}

/** Output layer catalog for product overview tabs — name + short description per layer. */
export default function ProductOutputLayers({ outputLayers, accent, label = 'Output layers' }) {
  if (!outputLayers?.length) return null;

  const showGroupTitles = outputLayers.length > 1 || outputLayers.some((g) => g.title);

  return (
    <>
      {outputLayers.map((group, i) => (
        <LayerGroup
          key={group.title || i}
          group={group}
          accent={accent}
          defaultLabel={showGroupTitles ? group.title : label}
        />
      ))}
    </>
  );
}

import Callout from './Callout.jsx';

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

function EndpointTable({ endpoints, accent }) {
  return (
    <div style={{ overflowX: 'auto', margin: '14px 0 24px' }}>
      <table style={{ width: '100%', minWidth: 520, borderCollapse: 'collapse', fontSize: 14, background: 'var(--bg3)' }}>
        <thead>
          <tr>
            {['Endpoint', 'Returns', 'Status'].map((h) => (
              <th
                key={h}
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
          {endpoints.map((ep) => (
            <tr key={ep.path}>
              <td style={{ padding: '9px 12px', borderBottom: '1px solid var(--gray2)', verticalAlign: 'top' }}>
                <div style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: 12, color: accent }}>
                  {ep.method || 'GET'} {ep.path}
                </div>
                <div style={{ fontWeight: 600, color: 'var(--white)', marginTop: 4 }}>{ep.name}</div>
                {ep.sensors && (
                  <div style={{ fontSize: 11, color: 'var(--gray)', marginTop: 4 }}>{ep.sensors}</div>
                )}
              </td>
              <td style={{ padding: '9px 12px', borderBottom: '1px solid var(--gray2)', color: 'var(--text)', lineHeight: 1.55, verticalAlign: 'top' }}>
                {ep.returns}
              </td>
              <td style={{ padding: '9px 12px', borderBottom: '1px solid var(--gray2)', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 6px',
                    border: `1px solid ${STATUS_COLORS[ep.status] || 'var(--gray)'}`,
                    color: STATUS_COLORS[ep.status] || 'var(--gray)',
                    borderRadius: 3,
                    fontSize: 10,
                    fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  {STATUS_LABELS[ep.status] || ep.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ProductApiSchemaView({ product }) {
  const { apiSchema, color, name } = product;
  if (!apiSchema) return null;

  return (
    <>
      <p style={{ fontSize: 15, lineHeight: 1.65, maxWidth: 820, margin: '4px 0 20px' }}>
        {apiSchema.intro}
      </p>

      {apiSchema.delivery && (
        <Callout type="info" label="Delivery">
          {apiSchema.delivery}
        </Callout>
      )}

      {apiSchema.groups.map((group) => (
        <section key={group.title} style={{ marginTop: 28 }}>
          <div style={{ marginBottom: 12, paddingBottom: 10, borderBottom: `2px solid ${color}` }}>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                color,
                textTransform: 'uppercase',
                fontSize: 14,
                letterSpacing: '0.2em',
                fontWeight: 700,
              }}
            >
              {group.title}
            </div>
            {group.subtitle && (
              <p style={{ margin: '8px 0 0', color: 'var(--gray)', fontSize: 13, lineHeight: 1.55, maxWidth: 820 }}>
                {group.subtitle}
              </p>
            )}
          </div>
          <EndpointTable endpoints={group.endpoints} accent={color} />
        </section>
      ))}

      {apiSchema.footnote && (
        <Callout type="warn" label={`${name} API — internal reference`}>
          {apiSchema.footnote}
        </Callout>
      )}
    </>
  );
}

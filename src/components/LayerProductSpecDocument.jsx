import { buildLayerSpecModel } from '../data/layerSpecContent.js';

function RichText({ text }) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i}>{part.slice(2, -2)}</strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function LayerProductSpecDocument({ layer }) {
  const model = buildLayerSpecModel(layer);

  return (
    <div className="product-spec-doc">
      <p className="product-spec-doc__cover-kicker">{model.cover.kicker}</p>
      <h1 className="product-spec-doc__cover-title">{model.cover.title}</h1>
      <p className="product-spec-doc__product-name">{model.cover.productName}</p>
      <p className="product-spec-doc__product-id">Layer ID: {model.cover.productId}</p>
      <hr className="product-spec-doc__rule" />
      <p className="product-spec-doc__footer-line">{model.cover.inquiries}</p>
      <p className="product-spec-doc__footer-line">{model.cover.copyright}</p>
      <p className="product-spec-doc__version">{model.cover.version}</p>

      <h2 className="product-spec-doc__toc-title">Table of contents</h2>
      <ul className="product-spec-doc__toc">
        {model.toc.map((row) => (
          <li key={row.num}>
            <a href={`#spec-section-${row.num}`}>
              {row.num}. {row.label}
            </a>
            <span className="product-spec-doc__toc-dots" aria-hidden />
          </li>
        ))}
      </ul>

      <div className="product-spec-doc__table-wrap">
        <table>
          <thead>
            <tr>
              {model.parametersTable.headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {model.parametersTable.rows.map(([a, b]) => (
              <tr key={a}>
                <td>{a}</td>
                <td>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {model.sections.map((sec) => (
        <section key={sec.number} id={`spec-section-${sec.number}`} className="product-spec-doc__section">
          <h2 className="product-spec-doc__section-title">
            {sec.number}. {sec.title}
          </h2>
          {sec.subsections.map((sub) => (
            <div key={sub.number} className="product-spec-doc__subsection">
              <h3 className="product-spec-doc__subsection-title">
                {sub.number} {sub.title}
              </h3>
              {sub.paragraphs?.map((p, j) => (
                <p key={j} className="product-spec-doc__p">
                  <RichText text={p} />
                </p>
              ))}
              {sub.table && (
                <div className="product-spec-doc__table-wrap">
                  <table>
                    <thead>
                      <tr>
                        {sub.table.headers.map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sub.table.rows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td key={ci}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {sub.bullets && sub.bullets.length > 0 && (
                <ul>
                  {sub.bullets.map((b) => (
                    <li key={b}>
                      <RichText text={b} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}

      <h2 className="product-spec-doc__glossary-title">Glossary</h2>
      <div className="product-spec-doc__table-wrap">
        <table>
          <thead>
            <tr>
              <th>Term</th>
              <th>Definition</th>
            </tr>
          </thead>
          <tbody>
            {model.glossary.map((g) => (
              <tr key={g.term}>
                <td>{g.term}</td>
                <td>{g.definition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="product-spec-doc__page-footer">
        <span>Pixxel Analytics Playbook</span>
        <span>{model.cover.version}</span>
      </div>
    </div>
  );
}

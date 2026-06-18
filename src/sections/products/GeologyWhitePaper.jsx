import { useState } from 'react';
import { FileDown } from 'lucide-react';
import { geologyWhitePaper as wp, geologyFigures } from '../../data/products/geology.js';

const ASSET_BASE = '/product-assets/geology/';

function Figure({ slot }) {
  const fig = geologyFigures[slot];
  const [errored, setErrored] = useState(false);
  if (!fig) return null;
  return (
    <div className="wp-figure">
      <div className="wp-figure-label">{fig.label}</div>
      <div className="wp-figure-title">{fig.title}</div>
      {fig.platformNote && <div className="wp-platform-note">{fig.platformNote}</div>}
      {errored ? (
        <div className="wp-figure-fallback">
          <div>{fig.label} — asset pending</div>
          <div className="wp-fallback-name">{ASSET_BASE}{fig.src}</div>
        </div>
      ) : (
        <div className={`wp-figure-media${fig.compact ? ' is-compact' : ''}`}>
          <img
            src={`${ASSET_BASE}${fig.src}`}
            alt={fig.title}
            loading="lazy"
            className={fig.compact ? 'wp-figure-img--compact' : undefined}
            onError={() => setErrored(true)}
          />
        </div>
      )}
      <div className="wp-figure-caption">{fig.caption}</div>
    </div>
  );
}

function Section({ section }) {
  return (
    <>
      <h2 className="wp-section">
        <span className="wp-section-num">
          {section.num} / {section.kicker}
        </span>
        {section.title}
      </h2>
      {(section.paragraphs || []).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {section.figure && <Figure slot={section.figure} />}
      {section.outcomes && (
        <div className="wp-outcome-grid">
          {section.outcomes.map((o) => (
            <div className="wp-outcome-card" key={o.label}>
              <div className="wp-outcome-label">{o.label}</div>
              <h4>{o.title}</h4>
              <p>{o.body}</p>
            </div>
          ))}
        </div>
      )}
      {section.statusGroups &&
        section.statusGroups.map((g, i) => (
          <div className={`wp-status-group ${['now', 'building', 'future'][i] || 'now'}`} key={i}>
            <div className="wp-status-label">{g.label}</div>
            <p>{g.body}</p>
          </div>
        ))}
    </>
  );
}

export default function GeologyWhitePaper() {
  return (
    <div className="wp-print-root">
      <div className="wp-actionbar">
        <button type="button" className="wp-export-btn" onClick={() => window.print()}>
          <FileDown size={14} /> Export PDF
        </button>
      </div>

      <article className="wp-scope">
        <div className="wp-container">
          <div className="wp-header-bar">
            <div className="wp-label">INTERNAL · CONFIDENTIAL</div>
            <p className="wp-text">{wp.headerBar}</p>
          </div>

          <div className="wp-illustrative-banner">{wp.illustrativeBanner}</div>

          <div className="wp-eyebrow">{wp.eyebrow}</div>
          <h1 className="wp-title">{wp.title}</h1>
          <p className="wp-lede">{wp.lede}</p>

          <div className="wp-meta-grid">
            {wp.meta.map((m) => (
              <div className="wp-meta-card" key={m.label}>
                <div className="wp-meta-label">{m.label}</div>
                <div className="wp-meta-value">{m.value}</div>
                {m.sub && <div className="wp-meta-sub">{m.sub}</div>}
              </div>
            ))}
          </div>

          {wp.sections.map((s) => (
            <Section key={s.num} section={s} />
          ))}

          <div className="wp-footer-note">{wp.footer}</div>
        </div>
      </article>
    </div>
  );
}

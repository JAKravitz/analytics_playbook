import { useState } from 'react';
import { FileDown } from 'lucide-react';
import { sseWhitePaper as wp, sseFigures } from '../../data/products/sse.js';

const ASSET_BASE = '/product-assets/sse/';

function FigurePart({ part, alt, compact, showSub }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div className="wp-figure-fallback">
        <div>{showSub ? `(${part.sub}) ` : ''}asset pending</div>
        <div className="wp-fallback-name">{ASSET_BASE}{part.src}</div>
      </div>
    );
  }
  const isCompact = part.compact ?? compact;
  return (
    <div className={`wp-figure-media${isCompact ? ' is-compact' : ''}`}>
      {showSub && part.sub && <div className="wp-figure-part-label">{part.sub}</div>}
      <img
        src={`${ASSET_BASE}${part.src}`}
        alt={part.sub ? `${alt} — ${part.sub}` : alt}
        loading="lazy"
        className={isCompact ? 'wp-figure-img--compact' : undefined}
        onError={() => setErrored(true)}
      />
    </div>
  );
}

function Figure({ slot }) {
  const fig = sseFigures[slot];
  if (!fig) return null;
  const parts = fig.parts || [{ src: fig.src }];
  const multi = parts.length > 1;
  return (
    <div className="wp-figure">
      <div className="wp-figure-label">{fig.label}</div>
      <div className="wp-figure-title">{fig.title}</div>
      {fig.platformNote && <div className="wp-platform-note">{fig.platformNote}</div>}
      <div className={multi ? 'wp-figure-parts' : undefined}>
        {parts.map((part, i) => (
          <FigurePart
            key={part.src || i}
            part={part}
            alt={fig.title}
            compact={fig.compact}
            showSub={multi}
          />
        ))}
      </div>
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
      {section.figures && section.figures.map((f) => <Figure key={f} slot={f} />)}
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

export default function LensWhitePaper() {
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

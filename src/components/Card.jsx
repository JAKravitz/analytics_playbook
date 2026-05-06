export default function Card({ title, eyebrow, children, accent, style, className = '' }) {
  return (
    <div
      className={`card ${className}`}
      style={accent ? { borderTop: `2px solid ${accent}`, ...style } : style}
    >
      {eyebrow && <div className="eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>}
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      {children}
    </div>
  );
}

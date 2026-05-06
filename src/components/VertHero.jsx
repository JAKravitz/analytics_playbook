export default function VertHero({ index, name, sub, desc, accent }) {
  return (
    <div className="vert-hero" style={{ '--accent': accent }}>
      <div className="eyebrow" style={{ color: accent }}>Vertical {String(index).padStart(2, '0')}</div>
      <div className="vert-name">{name}</div>
      <div className="vert-sub">{sub}</div>
      <p className="vert-desc">{desc}</p>
    </div>
  );
}

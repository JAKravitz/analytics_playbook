export default function Badge({ children, color = 'dim', glow = false }) {
  return (
    <span className={`badge ${color}`}>
      <span className={`dot${glow ? ' glow' : ''}`} />
      {children}
    </span>
  );
}

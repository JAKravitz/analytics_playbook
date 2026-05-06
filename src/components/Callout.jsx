export default function Callout({ type = 'info', label, children }) {
  const defaultLabel = { info: 'Note', warn: 'Watch out', stop: 'Stop' }[type] || 'Note';
  return (
    <div className={`callout ${type}`}>
      <div className="label">{label || defaultLabel}</div>
      <div>{children}</div>
    </div>
  );
}

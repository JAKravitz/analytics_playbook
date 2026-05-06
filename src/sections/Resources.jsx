import Callout from '../components/Callout.jsx';

export default function Resources() {
  return (
    <>
      <div className="eyebrow">Commercial · Resources</div>
      <h1 className="section-title">Resources index.</h1>
      <p className="section-sub">
        This section will collect links to canonical decks, validation reports, and reference
        architectures. Holding for Drive reorganization so we point to one source of truth.
      </p>

      <Callout type="warn" label="Pending Drive reorganization">
        The resources index is intentionally empty until our internal Drive is restructured.
        Targeted contents:
      </Callout>

      <ul className="lang-list" style={{ marginTop: 16 }}>
        <li>NEXUS white paper deck</li>
        <li>Product layer map (Excel)</li>
        <li>Capability matrix</li>
        <li>PROSAIL validation reports</li>
        <li>IOCCG protocol reference (water quality)</li>
        <li>Pricing workbook</li>
        <li>Pilot reference architectures</li>
        <li>Competitive battle cards</li>
      </ul>

      <p className="muted" style={{ marginTop: 24, fontSize: 12 }}>
        Until then: ask the analytics team for the current canonical version of any of the above.
      </p>
    </>
  );
}

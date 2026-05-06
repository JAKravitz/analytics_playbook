import Callout from '../components/Callout.jsx';
import Card from '../components/Card.jsx';

export default function MicroClim() {
  return (
    <>
      <div className="eyebrow">Overview · MicroClim</div>
      <h1 className="section-title">MicroClim</h1>
      <p className="section-sub">
        Downscaled weather and climate context products — field-local meteorology that corroborates
        satellite-derived stress and attribution. This page is a scaffold; fill in product
        definition, data sources, resolution, and delivery SLAs when ready.
      </p>

      <Callout type="warn" label="Scaffold">
        Add: variable list (VPD, precip, temperature, etc.), spatial resolution vs AOI size,
        update cadence, known limitations, and how MicroClim pairs with MSI/HSI layers in each
        vertical.
      </Callout>

      <div className="card-grid grid-2" style={{ marginTop: 24 }}>
        <Card title="Draft outline" eyebrow="Content">
          <ul className="lang-list">
            <li>Science story: why field-local climate beats regional reanalysis alone</li>
            <li>Operational story: when MicroClim is required vs optional in packages</li>
            <li>Commercial story: pricing hooks and pilot packaging</li>
          </ul>
        </Card>
        <Card title="Layer catalog" eyebrow="Cross-reference">
          <p style={{ margin: 0 }}>
            See the <strong>Layer Catalog</strong> row <em>MicroClim Features</em> under the Data
            engine for the current grade and status label; keep that row and this page in sync when
            you edit either.
          </p>
        </Card>
      </div>
    </>
  );
}

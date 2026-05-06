import Callout from '../components/Callout.jsx';
import Card from '../components/Card.jsx';

export default function GroundResearch() {
  return (
    <>
      <div className="eyebrow">Commercial · Ground research & validation</div>
      <h1 className="section-title">Ground truth, flight campaigns, and lab tie-outs.</h1>
      <p className="section-sub">
        Pixxel can support pilots and accuracy work with a mix of in-house field operations,
        drone-mounted HSI collections, and contracted laboratory analysis. This page is a
        high-level map of what we can do, what we typically outsource, and which instruments
        matter by vertical — not a fixed SOW catalog.
      </p>

      <Callout type="info" label="Working draft">
        Treat this as a first-pass playbook for scoping validation and research engagements.
        Specific protocols, sample counts, and lab panels should be agreed per AOI, budget, and
        claim grade.
      </Callout>

      <div className="card-grid grid-2" style={{ marginTop: 28 }}>
        <Card eyebrow="Flight" title="Drone & airborne HSI" accent="var(--cyan)">
          <p style={{ marginTop: 0 }}>
            We operate (and can mobilize partners for) <strong>Pixxel-class HSI flown on UAVs</strong>{' '}
            for localized campaigns: calibration bridges, temporal stacks co-located with ground
            sampling, and sub-pixel / mixed-pixel studies where satellite revisit is too coarse.
          </p>
          <p>
            <strong>Typical uses.</strong> Vicinity truth under satellite pixels, BRDF and
            atmosphere-sensitive comparisons, rapid iteration on retrieval algorithms before
            satellite tasking scales.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Commercial note.</strong> Price as a campaign package (mobilization, flight
            hours, processing, safety) plus optional analyst time — distinct from recurring DaaS
            satellite delivery.
          </p>
        </Card>

        <Card eyebrow="Field" title="Field assessments & protocols" accent="var(--blue)">
          <p style={{ marginTop: 0 }}>
            <strong>What we mean.</strong> Plot design, stratified sampling, GPS / RTK geolocation,
            chain of custody, and field sheets aligned to the layers we are validating (traits,
            indices, classifications).
          </p>
          <p>
            Deliverables can include photo documentation, destructive and non-destructive
            sampling plans, coordination with growers or site owners, and handoff to labs when
            wet chemistry is required.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>When it matters.</strong> Any time we need to defend a layer as
            inventory-grade, MRV-relevant, or regulator-facing — or to close a gap between model
            output and local ground conditions.
          </p>
        </Card>

        <Card eyebrow="Lab" title="Laboratory validation (contracted)" accent="var(--purple)">
          <p style={{ marginTop: 0 }}>
            For many parameters we <strong>do not run an in-house wet lab</strong> at scale. We
            specify panels, QA chains, and acceptance criteria, then contract accredited or
            specialist labs for analytes that ground spectrometry alone cannot anchor.
          </p>
          <p>
            <strong>Examples.</strong> Leaf or soil nutrient chemistry, chlorophyll / carotenoid
            extractions, water chemistry (nutrients, pigments, suspended matter proxies tied to
            IOCCG-style protocols), dry combustion or equivalent for carbon fractions where claims
            require it, and material characterization where geology or defense use cases demand it.
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Commercial note.</strong> Lab is usually a pass-through plus program management
            — customer sees one statement of work with clear turnaround and uncertainty reporting.
          </p>
        </Card>

        <Card eyebrow="Program" title="End-to-end validation programs" accent="var(--amber)">
          <p style={{ marginTop: 0 }}>
            Combine <strong>drone HSI + field + lab + satellite</strong> into a single validation
            thread: common geometry, timestamps, and metadata so retrieval uncertainty and error
            budgets can be stated honestly.
          </p>
          <p style={{ marginBottom: 0 }}>
            Useful for new verticals, new layers entering the catalog, or customer-specific AOIs
            where archive depth is thin and we need a one-time evidence build.
          </p>
        </Card>
      </div>

      <h2 style={{ marginTop: 40, marginBottom: 12 }}>Instruments & methods by vertical</h2>
      <p className="muted" style={{ marginTop: 0, marginBottom: 16, fontSize: 13 }}>
        Not exhaustive — a starting list for scoping conversations. “Nice to have” items support
        secondary QA or partner-led work when budget allows.
      </p>

      <table className="ptable">
        <thead>
          <tr>
            <th>Vertical / use case</th>
            <th>Core ground / field instruments</th>
            <th>Lab or contracted analyses (typical)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Agriculture</strong>
              <br />
              <span className="muted">Traits, stress, nutrients, yield proxies</span>
            </td>
            <td>
              ASD / spectroradiometer or equivalent leaf–canopy contact specs; LAI / ceptometer;
              SPAD or lab-calibrated chlorophyll proxies; soil moisture (TDR / capacitance) at key
              depths; weather station or MicroClim tie-in; RTK for plot corners.
            </td>
            <td>
              Wet chemistry for N–P–K and micronutrients; leaf pigment extractions; grain or
              tissue reference analysis when calibrating end-of-season traits.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Forestry & carbon</strong>
              <br />
              <span className="muted">Structure, disturbance, MRV-oriented biomass</span>
            </td>
            <td>
              Diameter tapes, hypsometers or LiDAR UAS where permitted, plot-based tree tagging,
              hemispherical photo for LAI / gap fraction; destructive subsamples only where
              policy allows.
            </td>
            <td>
              Dry combustion / elemental analysis for carbon fractions; wood density subsamples;
              pathology lab when disease attribution requires tissue confirmation.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Aquatic & water quality</strong>
              <br />
              <span className="muted">IOPs, chlorophyll, turbidity, bloom proxies</span>
            </td>
            <td>
              Multiparameter sondes (CTD, DO, pH, turbidity, chl-a fluorescence where calibrated);
              Secchi / light profiles; discrete bottle sampling with GPS and depth; underway flow-
              through setups for larger campaigns.
            </td>
            <td>
              HPLC or spectrophotometric pigment analysis; nutrient chemistry; suspended solids
              gravimetry; taxonomy or toxin panels when harmful algal blooms are in scope.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Geology & materials</strong>
              <br />
              <span className="muted">Alteration, minerals, surface composition</span>
            </td>
            <td>
              Handheld XRF or LIBS where appropriate and licensed; field spectrometers for site
              screening; controlled sample chips with documented orientation and lighting notes.
            </td>
            <td>
              XRD, SEM-EDS, ICP-MS, or clay / alteration suites depending on mineralogy claims;
              geochem labs for trace elements when spectral ambiguity remains.
            </td>
          </tr>
          <tr>
            <td>
              <strong>Defense & infrastructure</strong>
              <br />
              <span className="muted">Change, materials, mobility proxies</span>
            </td>
            <td>
              Ground truth photography with surveyed control points; penetrometer or soil strength
              kits where mobility indices are validated; material swipe or chip protocols only
              where rules of engagement and safety allow.
            </td>
            <td>
              Material ID labs for contested surfaces; soil geotech references when trafficability
              claims must align with engineering standards — scoped narrowly to the mission.
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: 28 }}>
        <Callout type="warn" label="Claims discipline">
          List which sensor tier (MSI vs HSI vs drone HSI), sample size, and lab accreditation
          on every validation summary we share externally. If we did not measure it, say so.
        </Callout>
      </div>
    </>
  );
}

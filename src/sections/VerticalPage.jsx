import VertHero from '../components/VertHero.jsx';
import PkgCard from '../components/PkgCard.jsx';
import { seed } from '../data/seed.js';

export default function VerticalPage({ id, index }) {
  const v = seed.verticals[id];
  const pkgList = seed.packages[id] || [];

  return (
    <>
      <VertHero
        index={index}
        name={v.name}
        sub={v.sub}
        desc={v.desc}
        accent={v.color}
      />

      <div className="eyebrow">Micro-packages</div>
      <h2 style={{ margin: '0 0 16px' }}>Proposed Solution Packages</h2>
      <p className="section-sub" style={{ marginBottom: 18 }}>
        Each package is an integrated set of layers that solves a specific customer decision.
        Package copy and layer lists are defined in code — use the <strong>API catalog</strong> and
        product specs for live API detail.
      </p>

      {pkgList.map((pkg, i) => (
        <PkgCard
          key={pkg.id}
          pkg={pkg}
          verticalId={id}
          defaultOpen={i === 0}
        />
      ))}
    </>
  );
}

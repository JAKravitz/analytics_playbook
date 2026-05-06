import VertHero from '../components/VertHero.jsx';
import PkgCard from '../components/PkgCard.jsx';
import { seed } from '../data/seed.js';

export default function VerticalPage({ id, index, state, setState }) {
  const v = seed.verticals[id];
  const pkgList = seed.packages[id] || [];

  const updatePackage = (pkgId, change) => {
    setState((s) => ({
      ...s,
      packages: {
        ...s.packages,
        [`${id}.${pkgId}`]: {
          ...(s.packages?.[`${id}.${pkgId}`] || {}),
          ...change,
        },
      },
    }));
  };

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
        Open a package to edit the description, then use the <strong>layer catalog</strong>{' '}
        checklists to include or exclude analytics layers (saved with the rest of the playbook).
        Defaults come from code; adjust per vertical as the roadmap moves.
      </p>

      {pkgList.map((pkg, i) => (
        <PkgCard
          key={pkg.id}
          pkg={pkg}
          verticalId={id}
          catalogLayers={state.layers}
          editableState={state.packages?.[`${id}.${pkg.id}`]}
          onChange={(change) => updatePackage(pkg.id, change)}
          defaultOpen={i === 0}
        />
      ))}
    </>
  );
}

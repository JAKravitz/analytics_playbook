import ProductHero from './ProductHero.jsx';

/**
 * Shared shell for product pages: hero + horizontal sub-view nav + active view.
 * Sub-views are hash routes: #<slug> (landing) and #<slug>/<viewId>.
 *
 * Geology (SCOPE) is the first consumer; SWIPE / Vegetation / GeoFM reuse this.
 */
export default function ProductPageShell({ product, views, activeView, children }) {
  const accent = product.color;
  return (
    <>
      <ProductHero
        name={product.name}
        fullName={product.fullName}
        acronymExpansion={product.acronymExpansion}
        tagline={product.tagline}
        desc={product.desc}
        accent={accent}
      />

      <nav className="product-nav">
        {views.map((v) => {
          const active = (activeView || 'landing') === v.id;
          const href = v.id === 'landing' ? `#${product.slug}` : `#${product.slug}/${v.id}`;
          return (
            <a
              key={v.id}
              href={href}
              className={`product-nav-pill${active ? ' is-active' : ''}`}
              style={active ? { '--pill-accent': accent } : undefined}
            >
              {v.label}
            </a>
          );
        })}
      </nav>

      <div className="product-view">{children}</div>
    </>
  );
}

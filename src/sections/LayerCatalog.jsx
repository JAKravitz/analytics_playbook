import { useMemo, useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import {
  API_CATALOG_PRODUCTS,
  API_STATUS_COLORS,
  API_STATUS_LABELS,
  API_STATUSES,
  apiCatalogEntries,
} from '../data/apiCatalog.js';

const gridCols =
  'minmax(5.5rem, 0.65fr) minmax(110px, 0.9fr) minmax(200px, 1.5fr) minmax(180px, 1.35fr) minmax(7.5rem, 0.95fr) minmax(120px, 1fr) 36px';

function FilterSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: '8px 10px',
        background: 'var(--bg3)',
        border: '1px solid var(--gray2)',
        borderRadius: 4,
        fontSize: 13,
        color: 'var(--text)',
        fontFamily: 'inherit',
        minWidth: 140,
      }}
    >
      {options.map(([v, label]) => (
        <option key={v} value={v}>
          {label}
        </option>
      ))}
    </select>
  );
}

function StatusPill({ status }) {
  const color = API_STATUS_COLORS[status] || 'var(--gray)';
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: 3,
        border: `1px solid ${color}`,
        color,
        fontSize: 10,
        fontWeight: 600,
        fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
      }}
    >
      {API_STATUS_LABELS[status] || status}
    </span>
  );
}

function CatalogRow({ entry }) {
  const productHref = `#${entry.productSection}/api`;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: gridCols,
        padding: '12px 16px',
        borderBottom: '1px solid var(--gray2)',
        columnGap: 14,
        alignItems: 'start',
        fontSize: 14,
      }}
    >
      <div>
        <span
          style={{
            fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: entry.productColor,
          }}
        >
          {entry.productName}
        </span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--gray)', lineHeight: 1.45 }}>{entry.group}</div>
      <div>
        <div
          style={{
            fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
            fontSize: 11,
            color: entry.productColor,
            lineHeight: 1.45,
          }}
        >
          {entry.method} {entry.path}
        </div>
        <div style={{ fontWeight: 600, color: 'var(--white)', marginTop: 4 }}>{entry.name}</div>
      </div>
      <div style={{ color: 'var(--text)', lineHeight: 1.5, fontSize: 13 }}>{entry.returns}</div>
      <div>
        <StatusPill status={entry.status} />
      </div>
      <div style={{ fontSize: 12, color: 'var(--gray)', lineHeight: 1.45 }}>
        {entry.sensors || '—'}
      </div>
      <a
        href={productHref}
        title={`Open ${entry.productName} API schema`}
        style={{
          display: 'flex',
          justifyContent: 'center',
          color: 'var(--cyan)',
          padding: 4,
          marginTop: 2,
        }}
        aria-label={`${entry.productName} API schema`}
      >
        <ExternalLink size={15} />
      </a>
    </div>
  );
}

export default function LayerCatalog() {
  const [search, setSearch] = useState('');
  const [filterProduct, setFilterProduct] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return apiCatalogEntries.filter((e) => {
      if (filterProduct !== 'all' && e.productId !== filterProduct) return false;
      if (filterStatus !== 'all' && e.status !== filterStatus) return false;
      if (!q) return true;
      const hay = [e.productName, e.group, e.name, e.path, e.returns, e.sensors]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [search, filterProduct, filterStatus]);

  const productCounts = useMemo(() => {
    const counts = Object.fromEntries(API_CATALOG_PRODUCTS.map(({ product }) => [product.id, 0]));
    for (const e of apiCatalogEntries) counts[e.productId] = (counts[e.productId] || 0) + 1;
    return counts;
  }, []);

  return (
    <>
      <div className="eyebrow">Overview · API catalog</div>
      <h1 className="section-title">{apiCatalogEntries.length} product API endpoints</h1>
      <p className="section-sub">
        REST surface across TRACE, SWIPE, SCOPE, and LENS — sourced from each product&apos;s{' '}
        <strong>API schema</strong> tab. LENS exposes search, SpotDiff change detection, labeling,
        anomaly detection (V3 roadmap), and hosted GeoFM embeddings; the vertical products expose
        analysis-ready layer endpoints. Pricing is on each product&apos;s <strong>Pricing</strong> tab.
        Paths and statuses are indicative for internal scoping.
      </p>

      <div
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 16,
          flexWrap: 'wrap',
          fontSize: 12,
          color: 'var(--gray)',
        }}
      >
        {API_CATALOG_PRODUCTS.map(({ product }) => (
          <span key={product.id}>
            <strong style={{ color: product.color }}>{product.name}</strong> {productCounts[product.id]}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: 10,
              top: 11,
              color: 'var(--dim)',
              pointerEvents: 'none',
            }}
          />
          <input
            placeholder="Search product, path, endpoint, or returns…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px 8px 32px',
              background: 'var(--bg3)',
              border: '1px solid var(--gray2)',
              borderRadius: 4,
              fontSize: 13,
              color: 'var(--text)',
            }}
          />
        </div>
        <FilterSelect
          value={filterProduct}
          onChange={setFilterProduct}
          options={[
            ['all', 'All products'],
            ...API_CATALOG_PRODUCTS.map(({ product }) => [product.id, product.name]),
          ]}
        />
        <FilterSelect
          value={filterStatus}
          onChange={setFilterStatus}
          options={[
            ['all', 'All status'],
            ...API_STATUSES.map((s) => [s, API_STATUS_LABELS[s] || s]),
          ]}
        />
      </div>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <div
          style={{
            minWidth: 960,
            background: 'var(--bg2)',
            border: '1px solid var(--gray2)',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: gridCols,
              padding: '10px 16px',
              background: 'var(--navy)',
              borderBottom: '1px solid var(--gray2)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--on-navy)',
              columnGap: 14,
              alignItems: 'center',
              fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
            }}
          >
            <div>Product</div>
            <div>Group</div>
            <div>Endpoint</div>
            <div>Returns</div>
            <div>Status</div>
            <div>Sensors</div>
            <div />
          </div>
          {filtered.map((entry) => (
            <CatalogRow key={entry.id} entry={entry} />
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray)', fontSize: 13 }}>
              No endpoints match these filters.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import { useMemo, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const groups = [
  {
    label: 'Overview',
    items: [
      { id: 'home', label: 'Home' },
      { id: 'layers', label: 'Layer Catalog' },
      { id: 'nexus', label: 'NEXUS' },
      { id: 'sse', label: 'Semantic Search Engine' },
      { id: 'microclim', label: 'MicroClim' },
    ],
  },
  {
    label: 'Verticals',
    items: [
      { id: 'agriculture', label: 'Agriculture' },
      { id: 'forestry', label: 'Forestry' },
      { id: 'aquatic', label: 'Aquatic' },
      { id: 'geology', label: 'Geology' },
      { id: 'defense', label: 'Defense' },
    ],
  },
  {
    label: 'Commercial',
    items: [
      { id: 'claims', label: 'What We Can Claim' },
      { id: 'messaging', label: 'Messaging & Objections' },
      { id: 'revenue-models', label: 'Revenue models' },
      { id: 'ground-research', label: 'Ground research & validation' },
      { id: 'quoting', label: 'Pilot Pricing Calculator' },
      { id: 'resources', label: 'Resources' },
    ],
  },
];

export default function Sidebar({ section, onSelect, theme, onToggleTheme }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (i) => i.label.toLowerCase().includes(q) || g.label.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="brand">Pixxel</div>
        <div className="sub">Analytics Playbook · v1</div>
      </div>
      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Search sections…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <nav className="sidebar-nav">
        {filtered.map((g) => (
          <div key={g.label}>
            <div className="nav-group-label">{g.label}</div>
            {g.items.map((it) => (
              <button
                key={it.id}
                className={`nav-item${section === it.id ? ' active' : ''}`}
                onClick={() => onSelect(it.id)}
              >
                {it.label}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span className="meta">Internal · v0.1</span>
        <button className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'light' ? <Moon size={11} /> : <Sun size={11} />}
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </aside>
  );
}

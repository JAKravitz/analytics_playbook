import { useMemo, useState } from 'react';
import { Sun, Moon, PanelLeftClose, PanelLeft } from 'lucide-react';
import { disabledSectionReason, isSectionDisabled } from '../data/navigation.js';

const groups = [
  {
    label: 'Overview',
    items: [
      { id: 'home', label: 'Home' },
      { id: 'layers', label: 'API Catalog' },
    ],
  },
  {
    label: 'Products',
    items: [
      { id: 'agriculture', label: 'TRACE · Agriculture' },
      { id: 'geology', label: 'SCOPE · Geology' },
      { id: 'water', label: 'SWIPE · Water' },
      { id: 'sse', label: 'LENS · Semantic search' },
      { id: 'microclim', label: 'MICROCLIM-WEATHER' },
      { id: 'nexus', label: 'NEXUS - NORTH STAR' },
    ],
  },
  {
    label: 'Commercial',
    items: [
      { id: 'bespoke-projects', label: 'Bespoke projects & pipeline' },
      { id: 'ground-research', label: 'Ground research & validation' },
      { id: 'commercial-requests', label: 'Analytics ticket request' },
      { id: 'quoting', label: 'Pilot Proposal Generator' },
      { id: 'resources', label: 'Resources' },
      { id: 'next-steps-temp', label: 'Next steps (temp)' },
    ],
  },
];

export default function Sidebar({
  section,
  onSelect,
  theme,
  onToggleTheme,
  collapsed,
  onToggleCollapse,
}) {
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
    <aside className={`sidebar${collapsed ? ' is-collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="brand">{collapsed ? 'P' : 'Pixxel'}</div>
          {!collapsed && <div className="sub">Analytics Playbook · v3</div>}
        </div>
        <button
          type="button"
          className="sidebar-collapse-toggle"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>
      {!collapsed && (
        <>
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
                {g.items.map((it) => {
                  const disabled = isSectionDisabled(it.id);
                  return (
                    <button
                      key={it.id}
                      type="button"
                      className={`nav-item${section === it.id ? ' active' : ''}${disabled ? ' is-disabled' : ''}`}
                      onClick={() => !disabled && onSelect(it.id)}
                      disabled={disabled}
                      title={disabled ? disabledSectionReason(it.id) : undefined}
                    >
                      {it.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </>
      )}
      <div className="sidebar-footer">
        {!collapsed && <span className="meta">Internal · v0.1</span>}
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={theme === 'light' ? 'Dark mode' : 'Light mode'}
        >
          {theme === 'light' ? <Moon size={11} /> : <Sun size={11} />}
          {!collapsed && (theme === 'light' ? 'Dark' : 'Light')}
        </button>
      </div>
    </aside>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import Badge from './Badge.jsx';
import EditableItem from './EditableItem.jsx';
import { getPackageCatalogDefaults } from '../data/packageLayerDefaults.js';

function warningSectionTitle(warning) {
  if (!warning) return 'Watch out';
  if (warning.label) return warning.label;
  if (warning.type === 'stop') return 'Stop';
  if (warning.type === 'info') return 'Note';
  return 'Watch out';
}

/** Pills for selected catalog layers + compact “Add from catalog” popover (search + pick). */
function CatalogLayerPills({ label, catalogLayers, selectedIds, onAddId, onRemoveId, subtitle, hsi }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const wrapRef = useRef(null);

  const byId = useMemo(
    () => Object.fromEntries((catalogLayers || []).map((l) => [l.id, l])),
    [catalogLayers]
  );
  const selectedLayers = useMemo(
    () => (selectedIds || []).map((id) => byId[id]).filter(Boolean),
    [selectedIds, byId]
  );
  const selectedSet = useMemo(() => new Set(selectedIds || []), [selectedIds]);

  const available = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return [...(catalogLayers || [])]
      .filter((l) => !selectedSet.has(l.id))
      .filter(
        (l) =>
          !qq ||
          l.name.toLowerCase().includes(qq) ||
          (l.id && l.id.toLowerCase().includes(qq)) ||
          (l.engine && l.engine.toLowerCase().includes(qq))
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [catalogLayers, selectedSet, q]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div style={{ marginTop: 14 }}>
      <div className="layer-label" style={hsi ? { color: 'var(--purple)' } : undefined}>
        {label}
      </div>
      {subtitle && (
        <p style={{ margin: '6px 0 10px', fontSize: 12, color: 'var(--gray)', lineHeight: 1.45 }}>
          {subtitle}
        </p>
      )}
      <div className="layer-pills" style={{ alignItems: 'center' }}>
        {selectedLayers.map((layer) => (
          <span
            key={layer.id}
            className={`layer-pill${hsi ? ' hsi' : ''}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, paddingRight: 6 }}
          >
            <span>{layer.name}</span>
            <button
              type="button"
              title="Remove from package"
              onClick={() => onRemoveId(layer.id)}
              style={{
                background: 'transparent',
                border: 0,
                color: 'var(--gray)',
                cursor: 'pointer',
                fontSize: 16,
                lineHeight: 1,
                padding: '0 2px',
              }}
            >
              ×
            </button>
          </span>
        ))}
        <span ref={wrapRef} style={{ position: 'relative', display: 'inline-flex' }}>
          <button
            type="button"
            className="layer-pill"
            onClick={() => setOpen((v) => !v)}
            style={{
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              borderStyle: 'dashed',
              background: 'transparent',
              color: 'var(--cyan)',
              fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
              fontSize: 9.5,
              letterSpacing: 0.5,
            }}
          >
            <Plus size={11} strokeWidth={2.5} />
            Add from catalog
          </button>
          {open && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: 6,
                zIndex: 30,
                minWidth: 300,
                maxWidth: 420,
                background: 'var(--bg2)',
                border: '1px solid var(--cyan-dim)',
                borderRadius: 4,
                boxShadow: '0 10px 28px rgba(0,0,0,0.45)',
              }}
            >
              <input
                type="text"
                placeholder="Search catalog…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '8px 10px',
                  background: 'var(--bg3)',
                  border: 0,
                  borderBottom: '1px solid var(--gray2)',
                  fontSize: 12,
                  color: 'var(--text)',
                  outline: 'none',
                }}
              />
              <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                {available.length === 0 && (
                  <div style={{ padding: 12, fontSize: 12, color: 'var(--gray)' }}>
                    {selectedSet.size >= (catalogLayers || []).length
                      ? 'All catalog layers are already included.'
                      : 'No matches.'}
                  </div>
                )}
                {available.map((layer) => (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => {
                      onAddId(layer.id);
                      setQ('');
                      setOpen(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 12px',
                      background: 'transparent',
                      border: 0,
                      borderBottom: '1px solid var(--gray2)',
                      color: 'var(--text)',
                      fontSize: 12,
                      cursor: 'pointer',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'var(--bg3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {layer.name}
                    <span
                      style={{
                        marginLeft: 8,
                        fontSize: 10,
                        fontFamily: 'IBM Plex Mono, ui-monospace, monospace',
                        color: 'var(--gray)',
                      }}
                    >
                      {layer.id} · {layer.tier}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </span>
      </div>
    </div>
  );
}

export default function PkgCard({
  pkg,
  editableState,
  onChange,
  defaultOpen = false,
  verticalId,
  catalogLayers = [],
}) {
  const [open, setOpen] = useState(defaultOpen);

  const badge = editableState?.badge ?? pkg.badge;
  const notes = editableState?.notes ?? pkg.notes ?? '';
  const bodyText = editableState?.body ?? pkg.body ?? '';
  const decisionText = editableState?.decision ?? pkg.decision ?? '';
  const warningText =
    editableState?.warningText ?? pkg.warning?.text ?? '';
  const customerSegments = editableState?.customerSegments ?? pkg.customerSegments ?? '';

  const catalogDefaults = useMemo(
    () => getPackageCatalogDefaults(verticalId, pkg.id),
    [verticalId, pkg.id]
  );

  const layerIds = editableState?.layerIds ?? catalogDefaults.included;
  const hsiLayerIds = editableState?.hsiLayerIds ?? catalogDefaults.hsi;

  const updateBadge = (text) => onChange?.({ badge: text, notes, body: bodyText });
  const updateNotes = (text) => onChange?.({ badge, notes: text, body: bodyText });
  const updateBody = (text) => onChange?.({ badge, notes, body: text });
  const updateDecision = (text) => onChange?.({ decision: text });
  const updateWarningText = (text) => onChange?.({ warningText: text });
  const updateCustomerSegments = (text) => onChange?.({ customerSegments: text });

  const addLayerId = (id) => {
    if (layerIds.includes(id)) return;
    onChange?.({ layerIds: [...layerIds, id] });
  };
  const removeLayerId = (id) => {
    onChange?.({ layerIds: layerIds.filter((x) => x !== id) });
  };

  const addHsiLayerId = (id) => {
    if (hsiLayerIds.includes(id)) return;
    onChange?.({ hsiLayerIds: [...hsiLayerIds, id] });
  };
  const removeHsiLayerId = (id) => {
    onChange?.({ hsiLayerIds: hsiLayerIds.filter((x) => x !== id) });
  };

  const hasCatalog = Array.isArray(catalogLayers) && catalogLayers.length > 0;
  const showIntegratedPicker = Boolean(onChange && hasCatalog);
  const showHsiPicker = Boolean(
    onChange &&
      hasCatalog &&
      ((pkg.hsiLayers && pkg.hsiLayers.length > 0) || catalogDefaults.hsi.length > 0)
  );

  return (
    <div className="pkg">
      <button
        className="pkg-header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        type="button"
      >
        <span className="pkg-num">{pkg.id}</span>
        <span>
          <div className="pkg-name">{pkg.name}</div>
          {pkg.tagline && <div className="pkg-tag">{pkg.tagline}</div>}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          {badge && <Badge color={pkg.badgeColor || 'amber'}>{badge}</Badge>}
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
      </button>

      {open && (
        <div className="pkg-body">
          {onChange ? (
            <div style={{ marginBottom: 8 }}>
              <EditableItem
                label="Package description (editable)"
                value={bodyText}
                onChange={updateBody}
                placeholder="Describe what this micro-package delivers"
                multiline
              />
            </div>
          ) : bodyText ? (
            <p className="body-text">{bodyText}</p>
          ) : null}

          {pkg.scaffold && <div className="scaffold-note">{pkg.scaffold}</div>}

          {onChange && showIntegratedPicker && (
            <CatalogLayerPills
              label="Integrated layers required"
              catalogLayers={catalogLayers}
              selectedIds={layerIds}
              onAddId={addLayerId}
              onRemoveId={removeLayerId}
              subtitle="Boxes mirror the old layout. Remove with ×, or use Add from catalog to attach layers from the Layer Catalog (saved in playbook state)."
            />
          )}

          {!onChange && pkg.layers && pkg.layers.length > 0 && (
            <>
              <div className="layer-label">Integrated layers required</div>
              <div className="layer-pills">
                {pkg.layers.map((l, i) => (
                  <span className="layer-pill" key={i}>
                    {l}
                  </span>
                ))}
              </div>
            </>
          )}

          {onChange && showHsiPicker && (
            <CatalogLayerPills
              label="HSI upgrade (optional)"
              catalogLayers={catalogLayers}
              selectedIds={hsiLayerIds}
              onAddId={addHsiLayerId}
              onRemoveId={removeHsiLayerId}
              subtitle="Optional HSI-class layers — same pill pattern; align with tasking rules in the callout below."
              hsi
            />
          )}

          {!onChange && pkg.hsiLayers && pkg.hsiLayers.length > 0 && (
            <>
              <div className="layer-label" style={{ color: 'var(--purple)' }}>
                HSI upgrade (optional)
              </div>
              <div className="layer-pills">
                {pkg.hsiLayers.map((l, i) => (
                  <span className="layer-pill hsi" key={i}>
                    {l}
                  </span>
                ))}
              </div>
            </>
          )}

          {onChange ? (
            <>
              <div className="decision-block" style={{ marginTop: 18 }}>
                <div className="pkg-section-label">Decision it enables</div>
                <EditableItem
                  label=""
                  value={decisionText}
                  onChange={updateDecision}
                  placeholder="What customer decision does this package unlock?"
                  multiline
                />
              </div>

              <div className={`callout ${pkg.warning?.type || 'warn'}`}>
                <div className="pkg-section-label">{warningSectionTitle(pkg.warning)}</div>
                <EditableItem
                  label=""
                  value={warningText}
                  onChange={updateWarningText}
                  placeholder="Risks, caveats, phrasing to avoid…"
                  multiline
                />
              </div>

              <div className="callout info" style={{ marginTop: 0 }}>
                <div className="pkg-section-label">Customer profiles / segments</div>
                <EditableItem
                  label=""
                  value={customerSegments}
                  onChange={updateCustomerSegments}
                  placeholder="Ideal buyers, farm size, regions, crop types, or other segmentation notes"
                  multiline
                />
              </div>

              <div style={{ marginTop: 18, display: 'grid', gap: 12 }}>
                <EditableItem
                  label="Status badge"
                  value={badge || ''}
                  onChange={updateBadge}
                  placeholder="e.g. Q4 2026"
                  inline
                />
                <EditableItem
                  label="Team notes"
                  value={notes}
                  onChange={updateNotes}
                  placeholder="Add any team notes for this package"
                  multiline
                />
              </div>
            </>
          ) : (
            <>
              {pkg.decision && (
                <div className="decision-block">
                  <div className="pkg-section-label">Decision it enables</div>
                  <div className="text">{pkg.decision}</div>
                </div>
              )}

              {pkg.warning && (
                <div className={`callout ${pkg.warning.type || 'warn'}`}>
                  <div className="pkg-section-label">{warningSectionTitle(pkg.warning)}</div>
                  <div className="text" style={{ color: 'var(--text)', fontSize: 13 }}>
                    {pkg.warning.text}
                  </div>
                </div>
              )}

              {pkg.customerSegments && (
                <div className="callout info" style={{ marginTop: 0 }}>
                  <div className="pkg-section-label">Customer profiles / segments</div>
                  <p className="body-text" style={{ margin: 0 }}>
                    {pkg.customerSegments}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

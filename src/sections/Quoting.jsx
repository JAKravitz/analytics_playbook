import { useMemo, useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import Callout from '../components/Callout.jsx';
import { seedLayers } from '../data/layersCatalog.js';
import { computeQuote, LAYER_BILLING_CADENCE, CADENCE_PER_QUARTER } from '../data/pricingEngine.js';
import {
  DEFAULT_QUOTE,
  DEFAULT_INPUTS,
  DEFAULT_LINES_BY_VERTICAL,
  PREFERRED_CATALOG_IDS,
  VERTICAL_META,
  EARLY_DISCOUNT_OPTIONS,
} from '../data/pricingPresets.js';

// ─── Formatting helpers ───────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 9);
const fmt2 = (n) =>
  typeof n === 'number' ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—';
const fmtUsd = (n) =>
  typeof n === 'number' ? '$' + fmt2(n) : '—';
const fmtX = (n) =>
  typeof n === 'number' ? n.toFixed(4) + '×' : '—';
const pct = (n) =>
  typeof n === 'number' ? (n * 100).toFixed(1) + '%' : '—';

// ─── Inline style constants ───────────────────────────────────────────────────

const iStyle = {
  background: 'var(--bg3)',
  border: '1px solid var(--gray2)',
  color: 'var(--text)',
  fontFamily: 'inherit',
  fontSize: 13,
  padding: '5px 8px',
  outline: 'none',
  width: '100%',
};

const numStyle = {
  ...iStyle,
  width: 110,
  textAlign: 'right',
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
};

const selStyle = { ...iStyle, cursor: 'pointer' };

const labelStyle = {
  fontSize: 11,
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  letterSpacing: '0.05em',
  color: 'var(--gray)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
  padding: '5px 0',
};

// ─── Small reusable UI atoms ──────────────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div style={labelStyle}>
      <span style={{ flex: '0 0 auto', maxWidth: '55%' }}>{label}</span>
      {children}
    </div>
  );
}

function NumInput({ value, onChange, min = 0, step = 1, style }) {
  return (
    <input
      type="number"
      style={{ ...numStyle, ...style }}
      value={value}
      min={min}
      step={step}
      onChange={(e) => onChange(+e.target.value)}
    />
  );
}

function PctInput({ value, onChange }) {
  return (
    <input
      type="number"
      style={{ ...numStyle, width: 80 }}
      value={Math.round(value * 1000) / 10}
      min={0}
      max={100}
      step={0.1}
      onChange={(e) => onChange(+(e.target.value) / 100)}
    />
  );
}

function Check({ label, checked, onChange }) {
  return (
    <label style={{ ...labelStyle, cursor: 'pointer', userSelect: 'none' }}>
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}

function SectionHead({ children, open, toggle }) {
  return (
    <button
      onClick={toggle}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: 'transparent',
        border: 0,
        borderBottom: '1px solid var(--gray2)',
        color: 'var(--white)',
        fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
        fontSize: 10,
        letterSpacing: 2,
        textTransform: 'uppercase',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      {children}
      {open ? <ChevronUp size={14} color="var(--gray)" /> : <ChevronDown size={14} color="var(--gray)" />}
    </button>
  );
}

function GroupCard({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--gray2)', marginBottom: 12 }}>
      <SectionHead open={open} toggle={() => setOpen((x) => !x)}>
        {title}
      </SectionHead>
      {open && <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>{children}</div>}
    </div>
  );
}

// ─── Volume bracket editor ────────────────────────────────────────────────────

function VolumeBrackets({ brackets, onChange }) {
  function updateBracket(i, key, val) {
    const next = brackets.map((b, idx) => (idx === i ? { ...b, [key]: val } : b));
    onChange(next);
  }
  function addBracket() {
    const last = brackets[brackets.length - 1];
    onChange([...brackets, { min: (last?.max ?? 0) + 1, max: 9_999_999, discount: 0.15 }]);
  }
  function removeBracket(i) {
    onChange(brackets.filter((_, idx) => idx !== i));
  }

  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 24px', gap: 6, marginBottom: 4 }}>
        {['Min km²', 'Max km²', 'Discount %', ''].map((h) => (
          <span key={h} style={{ fontSize: 9, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--gray)' }}>{h}</span>
        ))}
      </div>
      {brackets.map((b, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 24px', gap: 6, marginBottom: 4, alignItems: 'center' }}>
          <NumInput value={b.min} step={1} onChange={(v) => updateBracket(i, 'min', v)} />
          <NumInput value={b.max >= 9_000_000 ? '∞' : b.max} step={1} onChange={(v) => updateBracket(i, 'max', v)} />
          <PctInput value={b.discount} onChange={(v) => updateBracket(i, 'discount', v)} />
          <button className="icon-btn danger" onClick={() => removeBracket(i)} title="Remove bracket">×</button>
        </div>
      ))}
      <button className="add-btn" onClick={addBracket} style={{ marginTop: 6 }}>
        <Plus size={10} /> Add bracket
      </button>
    </div>
  );
}

// ─── Multiplier breakdown table ───────────────────────────────────────────────

function MultBreakdown({ mults, inputs }) {
  const rows = [
    { label: 'Min-AOI surcharge', val: mults.minAoiMult, note: inputs.aoiKm2 < inputs.minAoiThreshold ? `AOI below ${inputs.minAoiThreshold} km²` : 'n/a' },
    { label: 'Volume discount', val: mults.volumeDiscFactor, note: pct(mults.volumeDiscount) + ' off' },
  ];
  return (
    <div>
      {rows.map((r) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '5px 0', borderBottom: '1px solid var(--gray2)' }}>
          <span style={{ fontSize: 11, color: 'var(--gray)', fontFamily: 'IBM Plex Mono, ui-monospace, monospace' }}>{r.label}</span>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', color: 'var(--text)' }}>{fmtX(r.val)}</span>
            {r.note && <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--gray)' }}>({r.note})</span>}
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 0 0' }}>
        <span style={{ fontSize: 10, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--cyan)' }}>Total add-on factor</span>
        <span style={{ fontSize: 15, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', fontWeight: 700, color: 'var(--cyan)' }}>{fmtX(mults.totalAddonFactor)}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '5px 0 0', borderTop: '1px solid var(--gray2)', marginTop: 4 }}>
        <span style={{ fontSize: 10, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--amber)' }}>Early / strategic factor</span>
        <span style={{ fontSize: 14, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', fontWeight: 700, color: 'var(--amber)' }}>{fmtX(mults.earlyFactor)}</span>
      </div>
      <div style={{ fontSize: 10, color: 'var(--gray)', marginTop: 6, lineHeight: 1.5 }}>
        Early/strategic applies per-line (before AOI × quarters × cadence). Min-AOI and volume factors apply to the line subtotal. Client ground-truth discount and Pixxel GT fee apply in the quote summary.
      </div>
    </div>
  );
}

// ─── Line items table ─────────────────────────────────────────────────────────

const COL_WIDTHS = { chk: 28, name: 'auto', cadence: 120, base: 90, effRate: 88, preAddon: 108, del: 32 };

const CADENCE_LABELS = { quarterly: 'Quarterly', monthly: 'Monthly', weekly: 'Weekly' };

function LineRow({ line, calc, onUpdate, onRemove }) {
  const isCustom = line.source === 'custom';
  const excluded = !line.include;
  return (
    <tr style={{ opacity: excluded ? 0.45 : 1 }}>
      <td style={{ width: COL_WIDTHS.chk, textAlign: 'center' }}>
        <input
          type="checkbox"
          checked={line.include}
          onChange={(e) => onUpdate({ include: e.target.checked })}
        />
      </td>
      <td style={{ width: COL_WIDTHS.name }}>
        {isCustom ? (
          <input
            type="text"
            style={{ ...iStyle, padding: '3px 6px', fontSize: 12 }}
            value={line.name}
            placeholder="Layer name…"
            onChange={(e) => onUpdate({ name: e.target.value })}
          />
        ) : (
          <span style={{ fontSize: 12, color: 'var(--text)' }}>{line.name}</span>
        )}
        {!isCustom && line.layerId && (
          <span style={{ marginLeft: 6, fontSize: 9, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', color: 'var(--gray)', letterSpacing: 0.5 }}>{line.layerId}</span>
        )}
      </td>
      <td style={{ width: COL_WIDTHS.cadence }}>
        <select
          style={{ ...selStyle, fontSize: 11, padding: '3px 6px', fontFamily: 'IBM Plex Mono, ui-monospace, monospace' }}
          value={line.billingCadence || 'quarterly'}
          onChange={(e) => onUpdate({ billingCadence: e.target.value })}
        >
          {LAYER_BILLING_CADENCE.map((c) => (
            <option key={c} value={c}>
              {CADENCE_LABELS[c] || c} ({CADENCE_PER_QUARTER[c]}×/qtr)
            </option>
          ))}
        </select>
      </td>
      <td style={{ width: COL_WIDTHS.base }}>
        <input
          type="number"
          style={{ ...numStyle, width: '100%', padding: '3px 6px', fontSize: 12 }}
          value={line.baseUsdPerKm2}
          min={0}
          step={1}
          onChange={(e) => onUpdate({ baseUsdPerKm2: +e.target.value })}
        />
      </td>
      <td style={{ width: COL_WIDTHS.effRate, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', fontSize: 12, textAlign: 'right', color: excluded ? 'var(--gray)' : 'var(--text)' }}>
        {excluded ? '—' : fmtUsd(calc.effectiveRate)}
      </td>
      <td style={{ width: COL_WIDTHS.preAddon, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', fontSize: 12, textAlign: 'right', color: excluded ? 'var(--gray)' : 'var(--cyan)' }}>
        {excluded ? '—' : fmtUsd(calc.preAddonUsd)}
      </td>
      <td style={{ width: COL_WIDTHS.del, textAlign: 'center' }}>
        <button className="icon-btn danger" onClick={onRemove} title="Remove line">
          <Trash2 size={12} />
        </button>
      </td>
    </tr>
  );
}

// ─── Catalog picker ───────────────────────────────────────────────────────────

function CatalogPicker({ vertical, existingLayerIds, catalogLayers, onAdd }) {
  const [open, setOpen] = useState(false);
  const preferredIds = PREFERRED_CATALOG_IDS[vertical] ?? [];
  const layers = Array.isArray(catalogLayers) && catalogLayers.length ? catalogLayers : seedLayers;

  const available = layers.filter(
    (l) => preferredIds.includes(l.id) && !existingLayerIds.has(l.id)
  );
  const allOther = layers.filter(
    (l) => !preferredIds.includes(l.id) && !existingLayerIds.has(l.id)
  );

  function pick(layer) {
    const base =
      typeof layer.baseUsdPerKm2 === 'number' && !Number.isNaN(layer.baseUsdPerKm2)
        ? layer.baseUsdPerKm2
        : 0;
    onAdd({
      id: `cat-${layer.id}-${uid()}`,
      layerId: layer.id,
      source: 'catalog',
      include: true,
      name: layer.name,
      billingCadence: 'quarterly',
      baseUsdPerKm2: base,
    });
    setOpen(false);
  }

  const LayerOption = ({ layer }) => {
    const base =
      typeof layer.baseUsdPerKm2 === 'number' && !Number.isNaN(layer.baseUsdPerKm2)
        ? layer.baseUsdPerKm2
        : 0;
    return (
      <button
        onClick={() => pick(layer)}
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'left',
          background: 'transparent',
          border: 0,
          borderBottom: '1px solid var(--gray2)',
          padding: '8px 14px',
          color: 'var(--text)',
          cursor: 'pointer',
          fontSize: 12,
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = 'var(--bg3)'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        <span>{layer.name}</span>
        <span style={{ marginLeft: 10, fontSize: 9, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', color: 'var(--gray)' }}>
          ${base.toFixed(0)}/km² · {layer.tier} · {layer.status}
        </span>
      </button>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="icon-btn"
        style={{ width: 'auto', padding: '0 12px', fontSize: 10, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', letterSpacing: 1, textTransform: 'uppercase' }}
        onClick={() => setOpen((x) => !x)}
      >
        <Plus size={11} /> From catalog
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 50,
            background: 'var(--bg2)',
            border: '1px solid var(--cyan-dim)',
            minWidth: 360,
            maxHeight: 380,
            overflowY: 'auto',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ padding: '8px 14px', fontSize: 9, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--cyan)', borderBottom: '1px solid var(--gray2)' }}>
            Suggested for {VERTICAL_META[vertical]?.label}
          </div>
          {available.length === 0 && (
            <div style={{ padding: '10px 14px', fontSize: 12, color: 'var(--gray)' }}>All suggested layers already added.</div>
          )}
          {available.map((l) => <LayerOption key={l.id} layer={l} />)}
          {allOther.length > 0 && (
            <>
              <div style={{ padding: '8px 14px', fontSize: 9, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gray)', borderTop: '1px solid var(--gray2)', borderBottom: '1px solid var(--gray2)' }}>
                All other layers
              </div>
              {allOther.map((l) => <LayerOption key={l.id} layer={l} />)}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Quoting({ state, setState }) {
  const quote = state.quote && typeof state.quote === 'object' ? state.quote : DEFAULT_QUOTE;

  const [showMults, setShowMults] = useState(false);

  function setQuote(updater) {
    setState((s) => {
      const current = s.quote && typeof s.quote === 'object' ? s.quote : DEFAULT_QUOTE;
      const next = typeof updater === 'function' ? updater(current) : updater;
      return { ...s, quote: next };
    });
  }

  function setInputs(patch) {
    setQuote((q) => ({ ...q, inputs: { ...q.inputs, ...patch } }));
  }

  function setLines(updater) {
    setQuote((q) => ({
      ...q,
      lines: typeof updater === 'function' ? updater(q.lines) : updater,
    }));
  }

  function updateLine(id, patch) {
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function removeLine(id) {
    setLines((ls) => ls.filter((l) => l.id !== id));
  }

  function addCustomLine() {
    setLines((ls) => [
      ...ls,
      { id: `cust-${uid()}`, layerId: null, source: 'custom', include: true, name: '', billingCadence: 'quarterly', baseUsdPerKm2: 0 },
    ]);
  }

  function switchVertical(v) {
    if (v === quote.vertical) return;
    const hasEdits = quote.lines.some((l) => l.baseUsdPerKm2 > 0);
    const confirmed = !hasEdits || window.confirm(
      `Switch vertical to ${VERTICAL_META[v]?.label}? This will reset line items to the ${VERTICAL_META[v]?.label} defaults. Your inputs and deal context are kept.`
    );
    if (!confirmed) return;
    setQuote((q) => ({
      ...q,
      vertical: v,
      lines: (DEFAULT_LINES_BY_VERTICAL[v] ?? []).map((l) => ({ ...l })),
    }));
  }

  const { inputs, lines, vertical } = quote;

  const result = useMemo(() => computeQuote(inputs, lines), [inputs, lines]);
  const {
    mults,
    lines: computedLines,
    blendedPreAddonRate,
    blendedPostAddonRate,
    totalUsd,
    totalLocal,
    totalPreAddonUsd,
    subtotalAfterVolumeMinAoi,
    subtotalAfterClientGt,
    gtPixxelFee,
  } = result;

  const existingLayerIds = useMemo(() => new Set(lines.map((l) => l.layerId).filter(Boolean)), [lines]);
  const catalogLayers = Array.isArray(state.layers) && state.layers.length ? state.layers : seedLayers;

  const isFxEnabled = inputs.fxRate !== 1 && inputs.fxLabel && inputs.fxLabel !== 'USD';
  const isUnapproved = !VERTICAL_META[vertical]?.ratesApproved;

  return (
    <>
      <div className="eyebrow">Commercial · Quoting</div>
      <h1 className="section-title">Bespoke Pilot Pricing Calculator</h1>
      <p className="section-sub">
        Configure deal parameters and select layers to build an indicative pilot quote.
        Outputs drive internal scoping conversations — not customer-facing list prices.
      </p>

      <Callout type="warn" label="Bespoke pilots only">
        This tool is for structuring bespoke pilots, not NEXUS productized pricing. All outputs are
        indicative and require commercial review before sharing with a prospect. Per-layer list
        rates (Base $/km²) live in the{' '}
        <strong>Layer Catalog</strong> — when you add a line from the catalog here, that value is
        copied in; you can still override it per quote. Non–catalog-backed vertical presets use
        placeholder numbers until commercial signs off.
      </Callout>

      <GroupCard title="How to / framework" defaultOpen={false}>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--text)', lineHeight: 1.55 }}>
          Each included line has a <strong>base rate</strong> ($/km² per delivery), a global{' '}
          <strong>pilot fraction</strong>, contract <strong>quarters</strong>, and a per-layer{' '}
          <strong>billing cadence</strong> (quarterly = 1× per quarter, monthly = 3×, weekly = 13×).
          Line totals scale as: effective $/km² × AOI × quarters × cadence multiplier.{' '}
          <strong>Early / strategic discount</strong> applies to effective rates.{' '}
          <strong>Minimum AOI surcharge</strong> and <strong>volume brackets</strong> apply to the
          summed line subtotal. <strong>Client-provided ground truth</strong> is a discount on that
          subtotal; <strong>Pixxel-collected ground truth</strong> is a fixed USD add-on.
        </p>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--text)', lineHeight: 1.55 }}>
          <strong>Workflow:</strong> set deal context and AOI, tune global knobs to match the pilot
          shape, pick a vertical for starter lines, add or remove catalog layers (rates from Layer
          Catalog), add custom lines for work not in the catalog, then read the summary card for
          blended $/km² and total USD. Use FX fields only when you need a rough target-currency view.
        </p>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--gray)', lineHeight: 1.55 }}>
          For narrative definitions and governance, align with the Pixxel Ag Intelligence Pricing
          Framework and How-To docs bundled with the legacy model. This UI is the live playbook
          replacement for that spreadsheet — keep catalog list rates honest as capabilities mature.
        </p>
      </GroupCard>

      {/* ── Vertical selector ── */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 28 }}>
        {Object.entries(VERTICAL_META).map(([key, meta]) => (
          <button
            key={key}
            onClick={() => switchVertical(key)}
            style={{
              padding: '7px 16px',
              border: `1px solid ${vertical === key ? 'var(--cyan)' : 'var(--gray2)'}`,
              background: vertical === key ? 'rgba(2,211,254,0.06)' : 'transparent',
              color: vertical === key ? 'var(--cyan)' : 'var(--gray)',
              fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {meta.label}
          </button>
        ))}
      </div>

      {isUnapproved && (
        <Callout type="stop" label="Placeholder rates">
          Base $/km² figures for {VERTICAL_META[vertical]?.label} are placeholders. Replace with
          finance-approved rates before using in a prospect conversation.
        </Callout>
      )}

      {/* ── Deal context + main layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20, marginBottom: 28 }}>

        {/* Left column: all inputs */}
        <div>
          {/* Deal context */}
          <GroupCard title="Deal context">
            <Field label="Client name">
              <input
                type="text"
                style={{ ...iStyle, width: 160, fontSize: 12 }}
                value={quote.clientName ?? ''}
                placeholder="Prospect / client…"
                onChange={(e) => setQuote((q) => ({ ...q, clientName: e.target.value }))}
              />
            </Field>
            <Field label="Notes">
              <input
                type="text"
                style={{ ...iStyle, width: 160, fontSize: 12 }}
                value={quote.notes ?? ''}
                placeholder="Deal notes…"
                onChange={(e) => setQuote((q) => ({ ...q, notes: e.target.value }))}
              />
            </Field>
          </GroupCard>

          {/* AOI & scale */}
          <GroupCard title="AOI & scale">
            <Field label="AOI size (km²)">
              <NumInput value={inputs.aoiKm2} step={100} onChange={(v) => setInputs({ aoiKm2: v })} />
            </Field>
            <Field label="Min AOI threshold (km²)">
              <NumInput value={inputs.minAoiThreshold} step={50} onChange={(v) => setInputs({ minAoiThreshold: v })} />
            </Field>
            <Field label="Min AOI surcharge">
              <PctInput value={inputs.minAoiSurcharge} onChange={(v) => setInputs({ minAoiSurcharge: v })} />
            </Field>
            <Field label="Contract quarters">
              <NumInput value={inputs.quarters} min={1} step={1} onChange={(v) => setInputs({ quarters: Math.max(1, Math.floor(v)) })} />
            </Field>
          </GroupCard>

          <GroupCard title="Discounts & adjustments">
            <Field label="Pilot fraction (all lines)">
              <PctInput value={inputs.pilotFraction} onChange={(v) => setInputs({ pilotFraction: v })} />
            </Field>
            <Field label="Early / strategic">
              <select
                style={{ ...selStyle, width: 170, fontSize: 11 }}
                value={inputs.earlyDiscountType}
                onChange={(e) => setInputs({ earlyDiscountType: e.target.value })}
              >
                {EARLY_DISCOUNT_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </Field>
            {inputs.earlyDiscountType === 'Custom' && (
              <Field label="Custom discount %">
                <PctInput value={inputs.customDiscountPct} onChange={(v) => setInputs({ customDiscountPct: v })} />
              </Field>
            )}
            <Check
              label="Ground truth: client-provided (discount on subtotal)"
              checked={inputs.gtClient}
              onChange={(v) => setInputs({ gtClient: v })}
            />
            {inputs.gtClient && (
              <Field label="Client GT discount %">
                <PctInput value={inputs.gtClientDiscountPct} onChange={(v) => setInputs({ gtClientDiscountPct: v })} />
              </Field>
            )}
            <Check
              label="Ground truth: Pixxel collects (fixed fee)"
              checked={inputs.gtPixxel}
              onChange={(v) => setInputs({ gtPixxel: v })}
            />
            {inputs.gtPixxel && (
              <Field label="Pixxel GT fee (USD)">
                <NumInput value={inputs.gtPixxelFeeUsd} min={0} step={100} onChange={(v) => setInputs({ gtPixxelFeeUsd: v })} />
              </Field>
            )}
            <div style={{ marginTop: 8, borderTop: '1px solid var(--gray2)', paddingTop: 8 }}>
              <div style={{ fontSize: 9, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 6 }}>
                Volume discount schedule
              </div>
              <VolumeBrackets
                brackets={inputs.volumeBrackets}
                onChange={(v) => setInputs({ volumeBrackets: v })}
              />
            </div>
          </GroupCard>

          {/* FX */}
          <GroupCard title="Currency / FX" defaultOpen={false}>
            <Field label="FX rate (target / USD)">
              <NumInput value={inputs.fxRate} min={0} step={0.01} onChange={(v) => setInputs({ fxRate: v })} />
            </Field>
            <Field label="Currency label">
              <input
                type="text"
                style={{ ...iStyle, width: 80, fontSize: 12 }}
                value={inputs.fxLabel}
                placeholder="USD"
                onChange={(e) => setInputs({ fxLabel: e.target.value })}
              />
            </Field>
          </GroupCard>
        </div>

        {/* Right column: summary */}
        <div>
          {/* Multipliers breakdown */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--gray2)', marginBottom: 12 }}>
            <SectionHead open={showMults} toggle={() => setShowMults((x) => !x)}>
              Multiplier breakdown
            </SectionHead>
            {showMults && (
              <div style={{ padding: '14px 16px' }}>
                <MultBreakdown mults={mults} inputs={inputs} />
              </div>
            )}
            {!showMults && (
              <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', color: 'var(--gray)', letterSpacing: 0.5 }}>Total add-on factor</span>
                <span style={{ fontSize: 13, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', color: 'var(--cyan)', fontWeight: 700 }}>{fmtX(mults.totalAddonFactor)}</span>
              </div>
            )}
          </div>

          {/* Quote totals */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--cyan-dim)', padding: 20 }}>
            <div style={{ fontSize: 9, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 16 }}>
              Quote summary
            </div>

            {quote.clientName && (
              <div style={{ fontSize: 13, color: 'var(--white)', marginBottom: 12, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                {quote.clientName}
              </div>
            )}

            {[
              { label: 'AOI', val: `${inputs.aoiKm2.toLocaleString()} km²` },
              { label: 'Contract quarters', val: String(inputs.quarters ?? 1) },
              { label: 'Line subtotal (pre min-AOI & volume)', val: fmtUsd(totalPreAddonUsd) },
              { label: 'After min-AOI & volume', val: fmtUsd(subtotalAfterVolumeMinAoi) },
              ...(inputs.gtClient
                ? [{ label: 'After client GT discount', val: fmtUsd(subtotalAfterClientGt) }]
                : []),
              ...(inputs.gtPixxel && gtPixxelFee > 0
                ? [{ label: 'Pixxel GT fee', val: fmtUsd(gtPixxelFee) }]
                : []),
              { label: 'Blended $/km²/qtr (eff.)', val: `$${fmt2(blendedPostAddonRate)}` },
              { label: 'Early / strategic factor', val: fmtX(mults.earlyFactor) },
            ].map(({ label, val }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '5px 0', borderBottom: '1px solid var(--gray2)' }}>
                <span style={{ fontSize: 10, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--gray)' }}>{label}</span>
                <span style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', color: 'var(--text)' }}>{val}</span>
              </div>
            ))}

            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 9, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 6 }}>Total</div>
              <div style={{ fontSize: 38, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, color: 'var(--cyan)', letterSpacing: -0.5 }}>
                {fmtUsd(totalUsd)}
              </div>
              {isFxEnabled && (
                <div style={{ fontSize: 18, fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 600, color: 'var(--green-soft)', marginTop: 4 }}>
                  {inputs.fxLabel} {fmt2(totalLocal)}
                </div>
              )}
              <div style={{ fontSize: 10, color: 'var(--gray)', marginTop: 8, lineHeight: 1.5 }}>
                Indicative only. Requires commercial review before presenting to prospect.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Line items table ── */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 9, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gray)' }}>
            Line items — {computedLines.filter((l) => l.include).length} of {computedLines.length} included
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <CatalogPicker
              vertical={vertical}
              existingLayerIds={existingLayerIds}
              catalogLayers={catalogLayers}
              onAdd={(l) => setLines((ls) => [...ls, l])}
            />
            <button
              className="icon-btn"
              style={{ width: 'auto', padding: '0 12px', fontSize: 10, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', letterSpacing: 1, textTransform: 'uppercase' }}
              onClick={addCustomLine}
            >
              <Plus size={11} /> Custom line
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 820, borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>
                {[
                  { label: '✓', w: COL_WIDTHS.chk, align: 'center' },
                  { label: 'Layer / module', w: COL_WIDTHS.name, align: 'left' },
                  { label: 'Cadence', w: COL_WIDTHS.cadence, align: 'left' },
                  { label: 'Base $/km²', w: COL_WIDTHS.base, align: 'right' },
                  { label: 'Eff. rate/km²', w: COL_WIDTHS.effRate, align: 'right' },
                  { label: 'Pre-addon total', w: COL_WIDTHS.preAddon, align: 'right' },
                  { label: '', w: COL_WIDTHS.del, align: 'center' },
                ].map(({ label, w, align }) => (
                  <th key={label} style={{ width: w, textAlign: align, padding: '8px 10px', fontFamily: 'IBM Plex Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--gray)', borderBottom: '1px solid var(--gray2)', whiteSpace: 'nowrap' }}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {computedLines.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '24px 10px', textAlign: 'center', color: 'var(--gray)', fontFamily: 'IBM Plex Mono, ui-monospace, monospace', fontSize: 11 }}>
                    No lines added. Use "From catalog" or "Custom line" above.
                  </td>
                </tr>
              )}
              {computedLines.map((line) => (
                <LineRow
                  key={line.id}
                  line={line}
                  calc={line._calc}
                  onUpdate={(patch) => updateLine(line.id, patch)}
                  onRemove={() => removeLine(line.id)}
                />
              ))}
            </tbody>
            {computedLines.length > 0 && (
              <tfoot>
                <tr>
                  <td colSpan={5} style={{ padding: '10px 10px 6px', textAlign: 'right', fontFamily: 'IBM Plex Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--gray)' }}>
                    Sum of included lines (pre add-ons)
                  </td>
                  <td style={{ padding: '10px 10px 6px', textAlign: 'right', fontFamily: 'IBM Plex Mono, ui-monospace, monospace', fontSize: 13, fontWeight: 700, color: 'var(--cyan)', borderTop: '2px solid var(--gray2)' }}>
                    {fmtUsd(computedLines.reduce((s, l) => s + l._calc.preAddonUsd, 0))}
                  </td>
                  <td style={{ borderTop: '2px solid var(--gray2)' }} />
                </tr>
                <tr>
                  <td colSpan={5} style={{ padding: '2px 10px 10px', textAlign: 'right', fontFamily: 'IBM Plex Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--gray)' }}>
                    Indicative total (incl. min-AOI, volume, GT)
                  </td>
                  <td style={{ padding: '2px 10px 10px', textAlign: 'right', fontFamily: 'IBM Plex Mono, ui-monospace, monospace', fontSize: 15, fontWeight: 700, color: 'var(--white)' }}>
                    {fmtUsd(totalUsd)}
                  </td>
                  <td />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

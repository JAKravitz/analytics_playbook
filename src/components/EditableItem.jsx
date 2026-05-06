import { useEffect, useRef, useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';

export default function EditableItem({
  label,
  value,
  onChange,
  onRemove,
  placeholder = 'Click to edit',
  multiline = true,
  inline = false,
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || '');
  const ref = useRef(null);

  useEffect(() => {
    setDraft(value || '');
  }, [value]);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      const len = ref.current.value.length;
      ref.current.setSelectionRange(len, len);
    }
  }, [editing]);

  const save = () => {
    onChange?.(draft.trim());
    setEditing(false);
  };

  const cancel = () => {
    setDraft(value || '');
    setEditing(false);
  };

  if (inline) {
    return (
      <div>
        {label && (
          <div className="layer-label" style={{ margin: '0 0 6px' }}>{label}</div>
        )}
        {editing ? (
          <div className="row" style={{ alignItems: 'flex-start' }}>
            <input
              ref={ref}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save();
                if (e.key === 'Escape') cancel();
              }}
              placeholder={placeholder}
              style={{
                flex: 1,
                background: 'var(--bg3)',
                border: '1px solid var(--cyan-dim)',
                color: 'var(--text)',
                fontFamily: 'inherit',
                fontSize: 13,
                padding: '6px 10px',
                outline: 'none',
              }}
            />
            <button className="icon-btn" onClick={save} aria-label="Save"><Check size={12} /></button>
            <button className="icon-btn" onClick={cancel} aria-label="Cancel"><X size={12} /></button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            style={{
              background: 'transparent',
              border: '1px dashed var(--gray2)',
              color: value ? 'var(--text)' : 'var(--gray)',
              padding: '6px 10px',
              fontFamily: 'inherit',
              fontSize: 13,
              textAlign: 'left',
              width: '100%',
            }}
          >
            {value || placeholder}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="editable-row">
      {editing ? (
        <>
          {multiline ? (
            <textarea
              ref={ref}
              value={draft}
              rows={3}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') cancel();
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) save();
              }}
              placeholder={placeholder}
            />
          ) : (
            <input
              ref={ref}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save();
                if (e.key === 'Escape') cancel();
              }}
              placeholder={placeholder}
            />
          )}
          <div className="row">
            <button className="icon-btn" onClick={save} aria-label="Save"><Check size={12} /></button>
            <button className="icon-btn" onClick={cancel} aria-label="Cancel"><X size={12} /></button>
          </div>
        </>
      ) : (
        <>
          <div
            className="text"
            onClick={() => setEditing(true)}
            style={{ cursor: 'text' }}
          >
            {value || <span style={{ color: 'var(--dim)' }}>{placeholder}</span>}
          </div>
          <div className="row">
            <button className="icon-btn" onClick={() => setEditing(true)} aria-label="Edit">
              <Pencil size={12} />
            </button>
            {onRemove && (
              <button className="icon-btn danger" onClick={onRemove} aria-label="Remove">
                <X size={12} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

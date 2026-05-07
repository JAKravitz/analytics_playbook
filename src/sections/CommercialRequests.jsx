import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import Callout from '../components/Callout.jsx';

const REQUEST_TYPES = [
  { value: '', label: 'Select type…' },
  { value: 'Exhibit / booth', label: 'Exhibit / booth' },
  { value: 'Slide / deck asset', label: 'Slide / deck asset' },
  { value: 'One-pager / PDF', label: 'One-pager / PDF' },
  { value: 'Customer-specific narrative', label: 'Customer-specific narrative' },
  { value: 'Other', label: 'Other' },
];

const VERTICALS = [
  { value: '', label: '—' },
  { value: 'Agriculture', label: 'Agriculture' },
  { value: 'Forestry / carbon', label: 'Forestry / carbon' },
  { value: 'Aquatic', label: 'Aquatic' },
  { value: 'Geology', label: 'Geology' },
  { value: 'Defense', label: 'Defense' },
  { value: 'Cross-vertical', label: 'Cross-vertical' },
];

const iStyle = {
  background: 'var(--bg3)',
  border: '1px solid var(--gray2)',
  color: 'var(--text)',
  fontFamily: 'inherit',
  fontSize: 13,
  padding: '8px 10px',
  outline: 'none',
  width: '100%',
  borderRadius: 2,
};

const labelStyle = {
  fontSize: 11,
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  letterSpacing: '0.05em',
  color: 'var(--gray)',
  display: 'block',
  marginBottom: 6,
};

export default function CommercialRequests() {
  const [requestType, setRequestType] = useState('');
  const [title, setTitle] = useState('');
  const [vertical, setVertical] = useState('');
  const [neededBy, setNeededBy] = useState('');
  const [description, setDescription] = useState('');
  const [requesterName, setRequesterName] = useState('');
  const [requesterEmail, setRequesterEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [issueUrl, setIssueUrl] = useState('');
  const [identifier, setIdentifier] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setStatus('error');
      setMessage('Please add a short title for your request.');
      return;
    }
    if (!requestType) {
      setStatus('error');
      setMessage('Please choose a request type.');
      return;
    }

    setStatus('submitting');
    setMessage('');
    setIssueUrl('');
    setIdentifier('');

    try {
      const res = await fetch('/api/commercial-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          requestType,
          vertical: vertical || undefined,
          neededBy: neededBy || undefined,
          description,
          requesterName: requesterName.trim() || undefined,
          requesterEmail: requesterEmail.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || `Request failed (${res.status})`);
        return;
      }

      setStatus('ok');
      setMessage('Ticket created in Linear.');
      setIssueUrl(data.url || '');
      setIdentifier(data.identifier || '');
      setTitle('');
      setDescription('');
      setNeededBy('');
      setVertical('');
      setRequestType('');
      setRequesterEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(
        err?.message ||
          'Network error. If you are on localhost, run `npx vercel dev` so `/api` routes exist.'
      );
    }
  }

  return (
    <>
      <div className="eyebrow">Commercial · Requests</div>
      <h1 className="section-title">Submit a Commercial or marketing request.</h1>
      <p className="section-sub">
        Exhibits, deck assets, one-pagers, and other requests tracked in Linear. Submissions hit
        the team configured on Vercel via <code style={{ fontSize: 11 }}>LINEAR_TEAM_ID</code>.
      </p>

      <Callout type="info" label="Local development">
        <code style={{ fontSize: 11 }}>npm run dev</code> does not serve{' '}
        <code style={{ fontSize: 11 }}>/api/*</code>. From the repo root run{' '}
        <code style={{ fontSize: 11 }}>npx vercel dev</code> to run the frontend and API together
        (link the project once if prompted).
      </Callout>

      <Callout type="warn" label="Access control">
        Turn on deployment protection so only teammates can load the deployed site — anyone who can
        open the playbook can POST to this API once Linear env vars are set.
      </Callout>

      <form onSubmit={onSubmit} style={{ maxWidth: 640, marginTop: 28 }}>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Request type</label>
          <select
            style={{ ...iStyle, cursor: 'pointer' }}
            value={requestType}
            required
            onChange={(ev) => setRequestType(ev.target.value)}
          >
            {REQUEST_TYPES.map((o) => (
              <option key={o.label + o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Title</label>
          <input
            style={iStyle}
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="e.g. Q2 trade show backdrop — hyperspectral differentiation"
            maxLength={250}
          />
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}
        >
          <div>
            <label style={labelStyle}>Vertical / audience (optional)</label>
            <select
              style={{ ...iStyle, cursor: 'pointer' }}
              value={vertical}
              onChange={(ev) => setVertical(ev.target.value)}
            >
              {VERTICALS.map((o) => (
                <option key={o.label + o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Needed by (optional)</label>
            <input style={iStyle} type="date" value={neededBy} onChange={(ev) => setNeededBy(ev.target.value)} />
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Description</label>
          <textarea
            style={{ ...iStyle, minHeight: 140, resize: 'vertical' }}
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="Context, sizing, deadlines, stakeholders, assets to reuse, links…"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 22 }}>
          <div>
            <label style={labelStyle}>Your name (optional)</label>
            <input style={iStyle} value={requesterName} onChange={(ev) => setRequesterName(ev.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Email (optional)</label>
            <input style={iStyle} type="email" value={requesterEmail} onChange={(ev) => setRequesterEmail(ev.target.value)} />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          style={{
            padding: '10px 22px',
            fontSize: 13,
            fontWeight: 600,
            cursor: status === 'submitting' ? 'wait' : 'pointer',
            background: 'var(--cyan-dim)',
            border: '1px solid var(--cyan)',
            color: 'var(--cyan)',
            borderRadius: 2,
            fontFamily: 'inherit',
          }}
        >
          {status === 'submitting' ? 'Creating ticket…' : 'Create Linear ticket'}
        </button>

        {status === 'error' && message ? (
          <p role="alert" style={{ marginTop: 18, color: 'var(--red)', fontSize: 14 }}>
            {message}
          </p>
        ) : null}

        {status === 'ok' ? (
          <div
            style={{
              marginTop: 22,
              padding: 16,
              background: 'var(--bg3)',
              border: '1px solid var(--gray2)',
              borderRadius: 4,
            }}
          >
            <p style={{ margin: '0 0 8px', color: 'var(--green-soft)', fontWeight: 600 }}>{message}</p>
            {identifier && issueUrl ? (
              <a
                href={issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="row"
                style={{ color: 'var(--cyan)', fontSize: 14, gap: 6 }}
              >
                Open {identifier} in Linear <ExternalLink size={14} />
              </a>
            ) : null}
          </div>
        ) : null}
      </form>
    </>
  );
}

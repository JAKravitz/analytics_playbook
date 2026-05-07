# Pixxel Analytics Playbook

Internal commercial reference web app for the Pixxel Space Technologies analytics team. React + Vite frontend; optional **Linear** integration via **Vercel Serverless Functions** (`/api/commercial-request`).

The playbook is the analytics division’s shared guide for how we talk about Pixxel’s earth-intelligence work with customers and partners. It reflects where we are honestly: strong science and bespoke delivery today, with a clear line of sight to more productized NEXUS packages by end of 2026.

The app is organized around five verticals (agriculture, forestry, aquatic, geology, defense), a living layer catalog tied to product specs, and deep-dive pages on NEXUS (problem, platform, architecture, sensor story, roadmap). It also hosts working material on the Semantic Search Engine and MicroClim as those stories mature.

Under **Commercial**, teams will find what we can claim now vs later, messaging and objections, a first-pass revenue models page (DaaS, traits, solution packages, SSE), ground research and validation (drone HSI, field work, contracted lab work, instruments by vertical), **commercial requests** (creates Linear issues when configured), a pilot pricing calculator, and a placeholder resources list.

**Classification:** Internal, proprietary; do not share outside Pixxel without analytics review.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:5173.

To test **Linear Commercial requests** locally, `/api/*` must run too:

```bash
npx vercel dev
```

(Link the folder to your Vercel project once if prompted.) Plain `vite` alone does not serve `api/commercial-request.js`.

## Commercial requests → Linear

Deploy on **Vercel** so the [`api/commercial-request.js`](api/commercial-request.js) route is active. In the Vercel project, set **environment variables**:

| Variable | Required | Description |
|----------|----------|-------------|
| `LINEAR_API_KEY` | Yes | Linear → Settings → API → Personal API keys. Header: `Authorization: <key>`. |
| `LINEAR_TEAM_ID` | Yes | UUID of the team where issues are created. |
| `LINEAR_PROJECT_ID` | No | Default project UUID for new issues. |
| `LINEAR_LABEL_IDS` | No | Comma-separated label UUIDs (e.g. `uuid1,uuid2`). |

**Finding `LINEAR_TEAM_ID`:** In Linear → Team settings (or run a GraphQL `teams { nodes { id name } }` query against `https://api.linear.app/graphql` with the same API key).

After saving env vars, **redeploy**. The playbook page **Commercial → Commercial requests (Linear)** submits to `/api/commercial-request`. Use **deployment protection** on Vercel so only teammates can hit the deployed app and API.

## Build

```bash
npm run build
```

The static site is emitted to `dist/`. Drag and drop that folder onto [Netlify Drop](https://app.netlify.com/drop) for an instant URL, or connect this repo to Netlify / Vercel for continuous deploys.

## Editing content

Most copy lives in [`src/data/seed.js`](src/data/seed.js). Update that file and redeploy.

The pages marked editable (`What We Can Claim`, `Messaging & Objections`, package badges/notes) can also be edited in-app. Those edits persist as follows:

1. **Inside Claude’s artifact viewer** — `window.storage` shared state.
2. **Hosted (Netlify) with Supabase configured** — set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` and create a `playbook_state` table with columns `id text primary key`, `value jsonb`, `updated_at timestamptz`. Edits sync across the team.
3. **No env, no `window.storage`** — falls back to `localStorage` per browser (single-user demo only).

## Aesthetic

Dark default with a light-mode toggle in the sidebar footer. Barlow Condensed for headings, Barlow for body, IBM Plex Mono for badges and eyebrows. Cyan `#02D3FE` accent, navy table headers, fixed red confidentiality banner.

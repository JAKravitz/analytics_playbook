# Pixxel Analytics Playbook

Internal commercial reference web app for the Pixxel Space Technologies analytics team. React + Vite, no backend required.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:5173.

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

/**
 * Persistence adapter for the playbook.
 *
 * Tries, in order:
 *   1. `window.storage` (Claude artifact viewer — shared across users)
 *   2. Supabase row keyed by `STORAGE_KEY` when env vars are configured
 *      (single shared row, anyone who can open the site can read/write it)
 *   3. `localStorage` (per-browser fallback for solo dev / Netlify with no DB)
 *
 * The interface is intentionally minimal: { get, set }.
 */

export const STORAGE_KEY = 'pixxel-playbook-v1';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_TABLE = 'playbook_state';

const hasWindowStorage = () =>
  typeof window !== 'undefined' &&
  window.storage &&
  typeof window.storage.get === 'function' &&
  typeof window.storage.set === 'function';

const hasSupabase = () => Boolean(SUPABASE_URL && SUPABASE_KEY);

async function supabaseGet(key) {
  const url = `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(key)}&select=value`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`Supabase get failed: ${res.status}`);
  const rows = await res.json();
  return rows?.[0]?.value ?? null;
}

async function supabaseSet(key, value) {
  const url = `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify({ id: key, value, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`Supabase set failed: ${res.status}`);
}

export const storage = {
  backend: 'memory',

  async get(key = STORAGE_KEY) {
    try {
      if (hasWindowStorage()) {
        this.backend = 'window.storage';
        const r = await window.storage.get(key, true);
        if (r && r.value) return JSON.parse(r.value);
        return null;
      }
      if (hasSupabase()) {
        this.backend = 'supabase';
        return await supabaseGet(key);
      }
      if (typeof localStorage !== 'undefined') {
        this.backend = 'localStorage';
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      }
    } catch (err) {
      console.warn('[storage.get] failed, falling back to seed', err);
    }
    return null;
  },

  async set(key = STORAGE_KEY, value) {
    try {
      if (hasWindowStorage()) {
        await window.storage.set(key, JSON.stringify(value), true);
        return true;
      }
      if (hasSupabase()) {
        await supabaseSet(key, value);
        return true;
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      }
    } catch (err) {
      console.warn('[storage.set] failed', err);
    }
    return false;
  },
};

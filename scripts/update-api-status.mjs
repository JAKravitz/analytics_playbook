/**
 * One-off: apply catalog status + apiReady rules. Run: node scripts/update-api-status.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function matchesAny(name, patterns) {
  const n = name.toLowerCase();
  return patterns.some((p) => n.includes(p));
}

function resolveStatus(name, vertical) {
  const n = name.toLowerCase();

  if (vertical === 'geology') return 'piloting';
  if (vertical === 'mining' || vertical === 'defense') return 'scoping';

  // Cross-vertical (except geology / mining / defense handled above)
  if (matchesAny(n, ['attribution'])) return 'r&d';
  if (matchesAny(n, ['confidence'])) return 'r&d';
  if (matchesAny(n, ['climate forcing'])) return 'r&d';
  if (matchesAny(n, ['expected-state', 'expected state'])) return 'r&d';
  if (matchesAny(n, ['anomaly'])) return 'r&d';
  if (matchesAny(n, ['threshold'])) return 'scoping';
  if (matchesAny(n, ['webhook'])) return 'scoping';
  if (matchesAny(n, ['evidence'])) return 'scoping';

  if (vertical === 'agriculture') {
    if (matchesAny(n, ['harvest timing'])) return 'piloting';
    if (matchesAny(n, ['pest forewarning', 'disease forewarning'])) return 'piloting';
    if (
      matchesAny(n, [
        'intervention',
        'vra prescription',
        'yield risk',
        'loss probability',
        'seasonal outlook',
        'portfolio aggregation',
      ])
    ) {
      return 'scoping';
    }
    return 'aurora';
  }

  if (vertical === 'forestry') {
    if (
      matchesAny(n, [
        'area boundary',
        'forest cover',
        'change detection',
        'trait api',
        'structure api',
        'land cover',
        'phenology',
      ])
    ) {
      return 'aurora';
    }
    return 'scoping';
  }

  if (vertical === 'water') {
    if (
      matchesAny(n, [
        'waterbody boundary',
        'surface water mask',
        'water quality constituent',
        'non-optical estimation',
        'optical inversion',
        'temporal trend',
      ])
    ) {
      return 'aurora';
    }
    if (matchesAny(n, ['bloom extent', 'bloom severity', 'benthic habitat'])) return 'r&d';
    if (matchesAny(n, ['hab forecast', 'bleaching'])) return 'scoping';
    // HAB monitor add-ons not listed — treat as piloting
    if (matchesAny(n, ['hab classification', 'risk zone'])) return 'piloting';
    return 'scoping';
  }

  return 'scoping';
}

function patchFile(relPath, vertical, quote = '"') {
  const path = join(root, relPath);
  let text = readFileSync(path, 'utf8');
  const nameRe = quote === '"'
    ? /"name":\s*"([^"]+)"/g
    : /name:\s*'([^']+)'/g;
  const statusKey = quote === '"' ? '"status"' : 'status';
  const apiReadyKey = quote === '"' ? '"apiReady"' : 'apiReady';

  let match;
  const names = [];
  while ((match = nameRe.exec(text)) !== null) {
    names.push({ name: match[1], index: match.index });
  }

  // Process from end to start so indices stay valid
  for (let i = names.length - 1; i >= 0; i--) {
    const { name } = names[i];
    const start = names[i].index;
    const end = i < names.length - 1 ? names[i + 1].index : text.length;
    const chunk = text.slice(start, end);
    const status = resolveStatus(name, vertical);

    let updated = chunk
      .replace(
        quote === '"'
          ? /"status":\s*"(?:aurora|piloting|r&d|scoping|shipping)"/
          : /status:\s*'(?:aurora|piloting|r&d|scoping|shipping)'/,
        quote === '"' ? `"status": "${status}"` : `status: '${status}'`
      )
      .replace(
        quote === '"'
          ? /"apiReady":\s*"[^"]*"/
          : /apiReady:\s*'[^']*'/,
        quote === '"' ? `"apiReady": "TBD"` : `apiReady: 'TBD'`
      );

    // Add status/apiReady if missing in chunk (internal rows)
    if (!updated.includes(statusKey)) {
      const insertAfter = updated.match(/"kind":\s*"[^"]+"/) || updated.match(/kind:\s*'[^']+'/);
      if (insertAfter) {
        const pos = insertAfter.index + insertAfter[0].length;
        const ins =
          quote === '"'
            ? `,\n    "status": "${status}",\n    "apiReady": "TBD"`
            : `,\n    status: '${status}',\n    apiReady: 'TBD'`;
        updated = updated.slice(0, pos) + ins + updated.slice(pos);
      }
    }

    text = text.slice(0, start) + updated + text.slice(end);
  }

  writeFileSync(path, text);
  console.log(`Updated ${relPath} (${names.length} APIs, vertical=${vertical})`);
}

patchFile('src/data/layersCatalog.js', 'agriculture', "'");
patchFile('src/data/forestryCatalogRows.js', 'forestry');
patchFile('src/data/waterCatalogRows.js', 'water');
patchFile('src/data/geologyCatalogRows.js', 'geology', "'");
patchFile('src/data/miningCatalogRows.js', 'mining', "'");
patchFile('src/data/diCatalogRows.js', 'defense', "'");

console.log('Done.');

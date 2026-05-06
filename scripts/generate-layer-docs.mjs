/**
 * Generates docs/layers/lXX.md from src/data/layersCatalog.js seed rows.
 * Run: npm run gen:layer-docs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { seedLayers } from '../src/data/layersCatalog.js';
import { buildLayerSpecMarkdown } from '../src/data/layerSpecContent.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'docs', 'layers');

mkdirSync(OUT, { recursive: true });
for (const layer of seedLayers) {
  const path = join(OUT, `${layer.id}.md`);
  writeFileSync(path, buildLayerSpecMarkdown(layer), 'utf8');
}
writeFileSync(
  join(OUT, 'README.md'),
  `# Layer technical specs (v0)

Auto-generated from \`src/data/layerSpecContent.js\` — same copy as the in-app **Product Specification** view. Regenerate after catalog changes:

\`\`\`bash
npm run gen:layer-docs
\`\`\`

Files: \`l01.md\` … \`l111.md\` matching \`id\` in \`src/data/layersCatalog.js\`.

**These are drafts:** have science/product owners replace generic method text with release-specific detail and validation pointers.
`,
  'utf8'
);

console.log(`Wrote ${seedLayers.length} layer docs + README to ${OUT}`);

/**
 * Scanne `public/images/lore/carroussel/` et écrit `manifest.json` (images triées).
 * Lancé en prebuild ; en dev : `node scripts/sync-lore-carousel-manifest.mjs` après ajout de fichiers.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const carouselDir = path.join(root, 'public/images/lore/carroussel');

if (!fs.existsSync(carouselDir)) {
  fs.mkdirSync(carouselDir, { recursive: true });
}

const files = fs
  .readdirSync(carouselDir)
  .filter(
    (f) =>
      /\.(jpe?g|png|webp|gif|svg)$/i.test(f) &&
      f !== 'manifest.json' &&
      !f.startsWith('.'),
  )
  .sort();

const images = files.map((f) => `/images/lore/carroussel/${f}`);

fs.writeFileSync(
  path.join(carouselDir, 'manifest.json'),
  JSON.stringify({ images }, null, 2) + '\n',
  'utf8',
);

console.log(`[lore-carousel] ${images.length} image(s) → manifest.json`);

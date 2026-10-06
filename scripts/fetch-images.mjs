import fs from 'fs';
import path from 'path';
import { products } from '../src/data/products.js';

const root = path.resolve('public');
const ua = 'AabhaaraJewelleryStore/1.0 (demo catalogue; atelier@aabhaara.com)';

const queries = {
  rings: ['gold ring jewellery', 'diamond ring jewelry', 'emerald ring jewelry', 'signet ring gold'],
  earrings: ['jhumka earrings', 'diamond earrings jewelry', 'gold hoop earrings', 'chandbali earrings'],
  necklaces: ['gold necklace jewelry', 'kundan necklace', 'pearl necklace jewelry', 'diamond pendant jewelry', 'choker necklace gold'],
  bracelets: ['gold bracelet jewelry', 'diamond bracelet jewelry'],
  bangles: ['gold bangle jewelry', 'indian gold bangles'],
  'nose-pins': ['nose ring jewellery', 'nath nose ornament india'],
  bridal: ['indian bridal jewellery', 'bridal gold necklace india', 'maang tikka jewellery'],
  men: ['mens gold chain jewelry', 'mens gold bracelet', 'gold signet ring'],
  diamond: ['diamond necklace jewelry', 'solitaire diamond ring', 'diamond stud earrings'],
  gold: ['22k gold jewellery india', 'gold chain necklace jewelry'],
};

const skip = /drawing|sketch|design for|grave|diagram|banknote|postage|stamp|map of|watercolor|watercolour|illustration|cartoon|logo|icon|coin |coins |textile|sari |saree |dress |painting,/i;
const keep = /ring|necklace|earring|bangle|bracelet|pendant|kundan|bridal|jewel|nose|chain|diamond|gold|jhumka|pearl|brooch|tiara|choker|ornament|haar/i;

async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=30&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1400&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': ua } });
  if (!res.ok) return [];
  const data = await res.json();
  const pages = Object.values(data.query?.pages || {});
  return pages
    .map((page) => {
      const info = page.imageinfo?.[0];
      if (!info || !/jpeg|png|webp/.test(info.mime || '')) return null;
      if ((info.width || 0) < 500) return null;
      if (skip.test(page.title) || !keep.test(page.title)) return null;
      return { title: page.title, url: info.thumburl || info.url };
    })
    .filter(Boolean);
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': ua } });
  if (!res.ok) throw new Error(String(res.status));
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error('too small');
  const sig = buf.subarray(0, 4).toString('hex');
  const ok = sig.startsWith('ffd8') || sig.startsWith('89504e47') || sig.startsWith('52494646');
  if (!ok) throw new Error('not an image');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
}

const pools = {};
const used = new Set();
for (const [key, list] of Object.entries(queries)) {
  const found = [];
  for (const q of list) {
    try {
      found.push(...(await search(q)));
    } catch (error) {
      console.log('search fail', q, error.message);
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  pools[key] = found.filter((item) => {
    if (used.has(item.url)) return false;
    used.add(item.url);
    return true;
  });
  console.log(key, pools[key].length);
}

const spare = [];
function take(category) {
  const bucket = pools[category] || [];
  const item = bucket.shift() || spare.shift();
  if (bucket.length && category !== 'spare') {
    /* keep leftovers */
  }
  return item;
}

function categoryKey(product) {
  if (product.category === 'necklace-sets') return 'necklaces';
  if (pools[product.category]) return product.category;
  return 'gold';
}

for (const key of Object.keys(pools)) {
  spare.push(...pools[key].slice(40));
  pools[key] = pools[key].slice(0, 40);
}

const jobs = [];
for (const product of products) {
  const key = categoryKey(product);
  const primary = take(key);
  const secondary = take(key);
  if (primary) jobs.push([primary.url, path.join(root, product.images.primary)]);
  if (secondary) jobs.push([secondary.url, path.join(root, product.images.secondary)]);
}

const editorial = [
  ['necklaces', 'images/hero/slide-1.jpg'],
  ['bridal', 'images/hero/slide-2.jpg'],
  ['diamond', 'images/hero/slide-3.jpg'],
  ['rings', 'images/hero/slide-4.jpg'],
  ['rings', 'images/categories/rings.jpg'],
  ['earrings', 'images/categories/earrings.jpg'],
  ['necklaces', 'images/categories/necklaces.jpg'],
  ['bracelets', 'images/categories/bracelets.jpg'],
  ['nose-pins', 'images/categories/nose-pins.jpg'],
  ['necklaces', 'images/categories/necklace-sets.jpg'],
  ['bangles', 'images/categories/bangles.jpg'],
  ['bridal', 'images/categories/bridal.jpg'],
  ['gold', 'images/categories/gold.jpg'],
  ['diamond', 'images/categories/diamond.jpg'],
  ['bridal', 'images/collections/bridal-edit.jpg'],
  ['gold', 'images/about/jaipur-bench.jpg'],
  ['rings', 'images/about/artisans.jpg'],
];
for (let i = 1; i <= 8; i += 1) {
  editorial.push(['gold', `images/craftsmanship/step-0${i}.jpg`]);
}
const journalFiles = [
  'bridal-haar.jpg', 'necklace-fit.jpg', 'gold-purity.jpg', 'diamond-guide.jpg', 'jewellery-care.jpg',
  'festive.jpg', 'wedding-week.jpg', 'traditions.jpg', 'heirloom.jpg', 'mens-style.jpg',
];
for (const file of journalFiles) editorial.push(['necklaces', `images/journal/${file}`]);

for (const [key, rel] of editorial) {
  const item = take(key);
  if (item) jobs.push([item.url, path.join(root, rel)]);
}

console.log('downloads', jobs.length);
let done = 0;
let failed = 0;
for (const [url, dest] of jobs) {
  try {
    await download(url, dest);
    done += 1;
  } catch (error) {
    failed += 1;
    console.log('fail', path.basename(dest), error.message);
  }
  if (done % 20 === 0) console.log('saved', done);
  await new Promise((r) => setTimeout(r, 80));
}
console.log('saved', done, 'failed', failed);

import fs from 'fs';
import path from 'path';

const ua = 'AabhaaraJewelleryStore/1.0 (demo catalogue; atelier@aabhaara.com)';
const skip = /lamp|tower|street|college|finial|building|mosque|drawing|sketch|illustration|plate|book|page |diagram|map/i;
const queries = [
  'pair of gold earrings',
  'diamond drop earrings',
  'indian gold jhumka earrings',
  'pearl drop earrings jewelry',
  'gold hoop earrings pair',
];

const found = [];
const seen = new Set();
for (const q of queries) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=40&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1400&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': ua } });
  const data = await res.json();
  for (const page of Object.values(data.query?.pages || {})) {
    const info = page.imageinfo?.[0];
    const title = page.title || '';
    if (!info || !/earring/i.test(title) || skip.test(title)) continue;
    if (!/jpeg|png|webp/.test(info.mime || '')) continue;
    const imageUrl = info.thumburl || info.url;
    if (seen.has(imageUrl)) continue;
    seen.add(imageUrl);
    found.push({ title, url: imageUrl });
    console.log(title);
  }
  await new Promise((r) => setTimeout(r, 300));
}

const files = fs.readdirSync('public/images/products/earrings').filter((name) => name.endsWith('.jpg')).sort();
console.log('candidates', found.length, 'files', files.length);
let i = 0;
for (const name of files) {
  const item = found[i];
  if (!item) break;
  i += 1;
  const res = await fetch(item.url, { headers: { 'User-Agent': ua } });
  const buf = Buffer.from(await res.arrayBuffer());
  const jpeg = buf.subarray(0, 2).toString('hex') === 'ffd8';
  const png = buf[0] === 0x89;
  if (buf.length < 8000 || (!jpeg && !png)) {
    console.log('skip bad', name);
    continue;
  }
  fs.writeFileSync(path.join('public/images/products/earrings', name), buf);
  console.log('wrote', name);
  await new Promise((r) => setTimeout(r, 60));
}

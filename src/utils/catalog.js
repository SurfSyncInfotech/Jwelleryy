import { products } from '../data/products';

export const categoryLabels = {
  rings: 'Rings',
  earrings: 'Earrings',
  necklaces: 'Necklaces',
  bracelets: 'Bracelets',
  'nose-pins': 'Nose Pins',
  'necklace-sets': 'Necklace Sets',
  bangles: 'Bangles',
  bridal: 'Bridal Jewellery',
  gold: 'Gold Jewellery',
  diamond: 'Diamond Jewellery',
  men: "Men's Jewellery",
};

export const priceBands = [
  { id: 'under-50', label: 'Under ₹50,000', min: 0, max: 50000 },
  { id: '50-100', label: '₹50,000 – ₹1,00,000', min: 50000, max: 100000 },
  { id: '100-200', label: '₹1,00,000 – ₹2,00,000', min: 100000, max: 200000 },
  { id: 'over-200', label: 'Above ₹2,00,000', min: 200000, max: Infinity },
];

export const routeCatalog = {
  '/products': {
    eyebrow: 'The Collection',
    title: 'All Jewellery',
    lede: 'Gold, diamond, bridal, and everyday pieces from the Aabhaara atelier, arranged so you can look slowly.',
    filter: {},
  },
  '/products/rings': {
    eyebrow: 'Jewellery',
    title: 'Rings',
    lede: 'Solitaires, temple bands, and stones set by hand. Each ring is sized in the showroom.',
    filter: { category: 'rings' },
  },
  '/products/earrings': {
    eyebrow: 'Jewellery',
    title: 'Earrings',
    lede: 'Jhumkas, chandbalis, and quieter studs. Weight is considered as carefully as ornament.',
    filter: { category: 'earrings' },
  },
  '/products/necklaces': {
    eyebrow: 'Jewellery',
    title: 'Necklaces',
    lede: 'From a short diamond line to a bridal haar. Length, drape, and the neck they sit on come first.',
    filter: { category: 'necklaces' },
  },
  '/products/bracelets': {
    eyebrow: 'Jewellery',
    title: 'Bracelets',
    lede: 'Kadas, cuffs, and flexible lines in gold and diamond, finished to be worn rather than stored.',
    filter: { category: 'bracelets' },
  },
  '/products/nose-pins': {
    eyebrow: 'Jewellery',
    title: 'Nose Pins',
    lede: 'Nath and stud, traditional and pared back. A small piece that changes the whole face.',
    filter: { category: 'nose-pins' },
  },
  '/products/necklace-sets': {
    eyebrow: 'Jewellery',
    title: 'Necklace Sets',
    lede: 'Coordinated necklaces and earrings, composed as one sitting rather than matched afterwards.',
    filter: { category: 'necklace-sets' },
  },
  '/products/bangles': {
    eyebrow: 'Jewellery',
    title: 'Bangles',
    lede: 'Filigree, kundan, and plain gold. Meant to be stacked, or worn alone with a quiet sari.',
    filter: { category: 'bangles' },
  },
  '/products/bridal': {
    eyebrow: 'The Wedding Edit',
    title: 'Bridal Jewellery',
    lede: 'Haar, nath, maang tikka, and the pieces that hold a wedding week together.',
    filter: { category: 'bridal' },
  },
  '/products/gold': {
    eyebrow: 'Metal',
    title: 'Gold Jewellery',
    lede: '22K and 18K gold with a muted polish. Purity, weight, and making charges are stated plainly.',
    filter: { category: 'gold' },
  },
  '/products/diamond': {
    eyebrow: 'Stone',
    title: 'Diamond Jewellery',
    lede: 'Certified stones in settings that let the diamond read clearly, without unnecessary brightness.',
    filter: { category: 'diamond' },
  },
  '/men': {
    eyebrow: 'For Him',
    title: "Men's Jewellery",
    lede: 'Rings, chains, and bracelets with weight and restraint. Gold that sits well with a bandhgala or a linen shirt.',
    filter: { gender: 'men' },
  },
  '/men/rings': {
    eyebrow: 'For Him',
    title: "Men's Rings",
    lede: 'Signet, stone, and diamond bands. Sized in the showroom, engraved if you wish.',
    filter: { gender: 'men', subcategory: 'rings' },
  },
  '/men/chains': {
    eyebrow: 'For Him',
    title: "Men's Chains",
    lede: 'Curb, rope, and figaro links in gold, plus a quieter diamond line.',
    filter: { gender: 'men', subcategory: 'chains' },
  },
  '/men/bracelets': {
    eyebrow: 'For Him',
    title: "Men's Bracelets",
    lede: 'Links, cuffs, and ID bracelets finished for daily wear.',
    filter: { gender: 'men', subcategory: 'bracelets' },
  },
};

export const newArrivalIds = [
  'ring-003',
  'earring-002',
  'necklace-004',
  'set-004',
  'bangle-002',
  'nosepin-003',
  'bracelet-005',
  'diamond-005',
];

export function getPrice(product) {
  if (!product?.discount) return product.price;
  return Math.round(product.price * (1 - product.discount / 100));
}

export function getProductById(id) {
  return products.find((product) => product.id === id);
}

export function categoryLabel(category) {
  return categoryLabels[category] || category;
}

export function getRouteMeta(pathname) {
  return routeCatalog[pathname] || routeCatalog['/products'];
}

function matchesBase(product, filter = {}) {
  if (filter.category && product.category !== filter.category) return false;
  if (filter.gender && product.gender !== filter.gender) return false;
  if (filter.subcategory && product.subcategory !== filter.subcategory) return false;
  return true;
}

export function getBaseProducts(pathname) {
  const { filter } = getRouteMeta(pathname);
  return products.filter((product) => matchesBase(product, filter));
}

export function applyFilters(list, filters) {
  return list.filter((product) => {
    if (filters.categories?.length && !filters.categories.includes(product.category)) return false;
    if (filters.gender && product.gender !== filters.gender) return false;
    if (filters.collections?.length && !filters.collections.includes(product.collection)) return false;
    if (filters.availability?.length && !filters.availability.includes(product.availability)) return false;
    if (filters.priceBands?.length) {
      const price = getPrice(product);
      const ok = filters.priceBands.some((id) => {
        const band = priceBands.find((item) => item.id === id);
        return band && price >= band.min && price < band.max;
      });
      if (!ok) return false;
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const haystack = [
        product.name,
        product.category,
        product.material,
        product.stone,
        product.description,
        ...(product.tags || []),
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function sortProducts(list, sort) {
  const next = [...list];
  if (sort === 'price-asc') next.sort((a, b) => getPrice(a) - getPrice(b));
  if (sort === 'price-desc') next.sort((a, b) => getPrice(b) - getPrice(a));
  if (sort === 'name') next.sort((a, b) => a.name.localeCompare(b.name));
  return next;
}

export function relatedProducts(product, count = 4) {
  if (!product) return [];
  const pool = [
    ...products.filter((item) => item.id !== product.id && item.category === product.category),
    ...products.filter((item) => item.id !== product.id && item.collection === product.collection),
    ...products.filter((item) => item.id !== product.id),
  ];
  const unique = [];
  const seen = new Set();
  for (const item of pool) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    unique.push(item);
    if (unique.length === count) break;
  }
  return unique;
}

export function productsByIds(ids) {
  return ids.map((id) => getProductById(id)).filter(Boolean);
}

export function productsByCategory(category, count) {
  const list = products.filter((product) => product.category === category);
  return typeof count === 'number' ? list.slice(0, count) : list;
}

export function uniqueValues(list, key) {
  return [...new Set(list.map((item) => item[key]).filter(Boolean))];
}

export function searchProducts(query) {
  return applyFilters(products, { query }).slice(0, 8);
}

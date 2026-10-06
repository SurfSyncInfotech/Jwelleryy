import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../common/Container';
import ProductCard from '../product/ProductCard';
import {
  applyFilters,
  categoryLabels,
  getBaseProducts,
  getRouteMeta,
  priceBands,
  routeCatalog,
  sortProducts,
  uniqueValues,
} from '../../utils/catalog';

const emptyFilters = {
  categories: [],
  gender: '',
  collections: [],
  availability: [],
  priceBands: [],
};

const PAGE_SIZE = 12;

const CatalogView = () => {
  const { pathname } = useLocation();
  const meta = getRouteMeta(pathname);
  const base = useMemo(() => getBaseProducts(pathname), [pathname]);
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState('featured');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    setFilters(emptyFilters);
    setSort('featured');
    setVisible(PAGE_SIZE);
    setDrawer(false);
  }, [pathname]);

  const collections = uniqueValues(base, 'collection');
  const availability = uniqueValues(base, 'availability');
  const showCategoryFilter = pathname === '/products';
  const showGender = !pathname.startsWith('/men');

  const filtered = sortProducts(applyFilters(base, filters), sort);
  const shown = filtered.slice(0, visible);

  const toggle = (key, value) => {
    setFilters((current) => {
      const list = current[key];
      const next = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
      return { ...current, [key]: next };
    });
    setVisible(PAGE_SIZE);
  };

  const filterBody = (
    <>
      <div>
        <h2>Price</h2>
        {priceBands.map((band) => (
          <label key={band.id}>
            <input
              type="checkbox"
              checked={filters.priceBands.includes(band.id)}
              onChange={() => toggle('priceBands', band.id)}
            />
            {band.label}
          </label>
        ))}
      </div>
      {showCategoryFilter && (
        <div>
          <h2>Category</h2>
          {Object.entries(categoryLabels).filter(([id]) => id !== 'men').map(([id, label]) => (
            <label key={id}>
              <input
                type="checkbox"
                checked={filters.categories.includes(id)}
                onChange={() => toggle('categories', id)}
              />
              {label}
            </label>
          ))}
        </div>
      )}
      {showGender && (
        <div>
          <h2>Gender</h2>
          {['women', 'men'].map((gender) => (
            <label key={gender}>
              <input
                type="radio"
                name="gender"
                checked={filters.gender === gender}
                onChange={() => {
                  setFilters((current) => ({ ...current, gender }));
                  setVisible(PAGE_SIZE);
                }}
              />
              {gender === 'women' ? 'Women' : 'Men'}
            </label>
          ))}
        </div>
      )}
      <div>
        <h2>Collection</h2>
        {collections.map((collection) => (
          <label key={collection}>
            <input
              type="checkbox"
              checked={filters.collections.includes(collection)}
              onChange={() => toggle('collections', collection)}
            />
            {collection}
          </label>
        ))}
      </div>
      <div>
        <h2>Availability</h2>
        {availability.map((state) => (
          <label key={state}>
            <input
              type="checkbox"
              checked={filters.availability.includes(state)}
              onChange={() => toggle('availability', state)}
            />
            {state}
          </label>
        ))}
      </div>
      <button
        type="button"
        className="btn btn--line"
        onClick={() => {
          setFilters(emptyFilters);
          setVisible(PAGE_SIZE);
        }}
      >
        Clear filters
      </button>
    </>
  );

  const links = Object.entries(routeCatalog).filter(([path]) => path.startsWith('/products') || path === '/men');

  return (
    <>
      <header className="page-hero">
        <Container>
          <p className="eyebrow">{meta.eyebrow}</p>
          <h1>{meta.title}</h1>
          <p>{meta.lede}</p>
        </Container>
      </header>
      <Container>
        <div className="chip-row" style={{ paddingTop: '1.4rem' }} aria-label="Categories">
          {links.map(([path, item]) => (
            <Link key={path} to={path} className={`chip ${pathname === path ? 'is-active' : ''}`}>
              {item.title}
            </Link>
          ))}
        </div>
        <div className="catalog-layout">
          <aside className="filters" aria-label="Filters">{filterBody}</aside>
          <div>
            <div className="catalog-bar">
              <p>{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}</p>
              <button type="button" className="btn btn--line filter-toggle" onClick={() => setDrawer(true)}>
                Filters
              </button>
              <label>
                <span className="sr-only">Sort</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort pieces">
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price, low to high</option>
                  <option value="price-desc">Price, high to low</option>
                  <option value="name">Name</option>
                </select>
              </label>
            </div>
            {shown.length === 0 ? (
              <p>Nothing in this edit matches those filters. Clear them to see the full selection.</p>
            ) : (
              <div className="product-grid">
                {shown.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}
            {visible < filtered.length && (
              <div style={{ marginTop: '2rem' }}>
                <button type="button" className="btn btn--line" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
                  Load more
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
      {drawer && (
        <div className="filter-drawer" role="dialog" aria-modal="true" aria-label="Filters">
          <button type="button" className="btn btn--ghost" onClick={() => setDrawer(false)}>Close</button>
          {filterBody}
        </div>
      )}
    </>
  );
};

export default CatalogView;

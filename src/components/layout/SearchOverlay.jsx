import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchProducts, categoryLabel } from '../../utils/catalog';
import { formatPrice } from '../../utils/formatPrice';
import { getPrice } from '../../utils/catalog';

const SearchOverlay = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const results = query.trim().length > 1 ? searchProducts(query.trim()) : [];

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="search-title">
      <button className="modal__backdrop" aria-label="Close search" onClick={onClose} />
      <div className="modal__panel search-panel">
        <p id="search-title" className="eyebrow">Search the house</p>
        <label className="sr-only" htmlFor="site-search">Search jewellery</label>
        <div className="search-panel__row">
          <Search size={18} aria-hidden="true" />
          <input
            id="site-search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, metal, or stone"
          />
          <button type="button" onClick={onClose}>Close</button>
        </div>
        <ul className="search-panel__results">
          {results.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`} onClick={onClose}>
                <span>{product.name}</span>
                <small>{categoryLabel(product.category)} · {formatPrice(getPrice(product))}</small>
              </Link>
            </li>
          ))}
          {query.trim().length > 1 && results.length === 0 && <li className="search-panel__empty">No pieces match that search.</li>}
        </ul>
      </div>
    </div>
  );
};

export default SearchOverlay;

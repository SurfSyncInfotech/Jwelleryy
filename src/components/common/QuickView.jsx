import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import JewelleryImage from './JewelleryImage';
import Button from './Button';
import { formatPrice } from '../../utils/formatPrice';
import { categoryLabel, getPrice } from '../../utils/catalog';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const QuickView = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

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

  if (!product) return null;
  const price = getPrice(product);
  const saved = isInWishlist(product.id);

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
      <button className="modal__backdrop" aria-label="Close quick view" onClick={onClose} />
      <motion.div
        className="modal__panel modal__panel--wide"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <div className="quick-view">
          <JewelleryImage
            src={product.images.primary}
            alt={product.name}
            seed={product.id}
            category={product.category}
            label={product.name}
          />
          <div className="quick-view__copy">
            <p className="eyebrow">{categoryLabel(product.category)}</p>
            <h2 id="quick-view-title">{product.name}</h2>
            <p className="price price--large">
              {formatPrice(price)}
              {product.discount ? <span className="price--original">{formatPrice(product.price)}</span> : null}
            </p>
            <p>{product.description}</p>
            <dl className="spec-list spec-list--compact">
              <div><dt>Material</dt><dd>{product.material}</dd></div>
              <div><dt>Stone</dt><dd>{product.stone}</dd></div>
              <div><dt>Availability</dt><dd>{product.availability}</dd></div>
            </dl>
            <div className="btn-row">
              <Button
                onClick={() => {
                  addToCart(product, 1);
                  onClose();
                }}
              >
                Add to Bag
              </Button>
              <Button variant="line" to={`/product/${product.id}`} onClick={onClose}>
                View Piece
              </Button>
              <Button variant="ghost" onClick={() => toggleWishlist(product)}>
                {saved ? 'Saved' : 'Wishlist'}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default QuickView;

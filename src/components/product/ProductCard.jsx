import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import JewelleryImage from '../common/JewelleryImage';
import QuickView from '../common/QuickView';
import { formatPrice } from '../../utils/formatPrice';
import { categoryLabel, getPrice } from '../../utils/catalog';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ product, layout = 'default' }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [open, setOpen] = useState(false);
  const saved = isInWishlist(product.id);
  const price = getPrice(product);

  return (
    <motion.article
      className={`product-card product-card--${layout}`}
      whileHover={{ y: -10, scale: 1.035 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      <div className="product-card__media">
        <Link to={`/product/${product.id}`} className="product-card__image-link" aria-label={product.name}>
          <JewelleryImage
            src={product.images.primary}
            alt={`${product.name}, ${product.material}`}
            seed={product.id}
            category={product.category}
            label={categoryLabel(product.category)}
          />
          <JewelleryImage
            src={product.images.secondary}
            alt=""
            seed={`${product.id}-alt`}
            category={product.category}
            className="jewel-frame--hover"
          />
        </Link>
        <button
          className={`icon-btn product-card__wish ${saved ? 'is-on' : ''}`}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          onClick={() => toggleWishlist(product)}
        >
          <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <button className="product-card__quick" onClick={() => setOpen(true)}>
          <Eye size={15} aria-hidden="true" />
          Quick view
        </button>
      </div>
      <div className="product-card__meta">
        <p className="product-card__cat">{categoryLabel(product.category)}</p>
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="price">
          {formatPrice(price)}
          {product.discount ? <span className="price--original">{formatPrice(product.price)}</span> : null}
        </p>
      </div>
      {open && <QuickView product={product} onClose={() => setOpen(false)} />}
    </motion.article>
  );
};

export default ProductCard;

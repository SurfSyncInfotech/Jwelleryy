import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import JewelleryImage from '../components/common/JewelleryImage';
import ProductCard from '../components/product/ProductCard';
import { formatPrice } from '../utils/formatPrice';
import { categoryLabel, getPrice, getProductById, relatedProducts } from '../utils/catalog';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetails = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <Container>
        <div className="empty-state">
          <h1>This piece is not in the house</h1>
          <Button to="/products">Back to jewellery</Button>
        </div>
      </Container>
    );
  }

  const price = getPrice(product);
  const related = relatedProducts(product, 4);
  const saved = isInWishlist(product.id);

  return (
    <Container>
      <p className="eyebrow" style={{ paddingTop: '1.5rem' }}>
        <Link to={`/products/${product.category}`}>{categoryLabel(product.category)}</Link>
      </p>
      <article className="product-page">
        <div>
          <div className="gallery__stage">
            <JewelleryImage
              src={product.images.primary}
              alt={product.name}
              seed={product.id}
              category={product.category}
            />
          </div>
        </div>
        <div>
          <h1>{product.name}</h1>
          <p className="price price--large">
            {formatPrice(price)}
            {product.discount ? <span className="price--original">{formatPrice(product.price)}</span> : null}
          </p>
          <p>{product.description}</p>
          <dl className="spec-list">
            <div><dt>Material</dt><dd>{product.material}</dd></div>
            <div><dt>Purity</dt><dd>{product.purity}</dd></div>
            <div><dt>Stone</dt><dd>{product.stone}</dd></div>
            <div><dt>Weight</dt><dd>{product.weight}</dd></div>
            <div><dt>Dimensions</dt><dd>{product.dimensions}</dd></div>
            <div><dt>Availability</dt><dd>{product.availability}</dd></div>
          </dl>
          <p>Quantity</p>
          <div className="qty" aria-label="Quantity">
            <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">–</button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty((value) => value + 1)} aria-label="Increase quantity">+</button>
          </div>
          <div className="btn-row">
            <Button onClick={() => addToCart(product, qty)}>Add to Bag</Button>
            <Button
              variant="burgundy"
              onClick={() => {
                addToCart(product, qty);
                navigate('/cart');
              }}
            >
              Buy Now
            </Button>
            <Button variant="line" onClick={() => toggleWishlist(product)}>
              {saved ? 'Saved' : 'Wishlist'}
            </Button>
          </div>
          <div className="accordion">
            <details open>
              <summary>The making</summary>
              <p>{product.detailedDescription}</p>
            </details>
            <details>
              <summary>Delivery</summary>
              <p>Finished pieces leave the Mumbai showroom within five working days, with complimentary shipping above ₹50,000. Made-to-order bridal work is scheduled at the appointment and confirmed in writing.</p>
            </details>
            <details>
              <summary>Care</summary>
              <p>Wear perfume before the jewellery. Keep kundan and polki dry. Store each piece in its cotton pouch. If a claw feels loose, stop wearing it and bring it in.</p>
            </details>
            <details>
              <summary>Certification</summary>
              <p>Gold is hallmarked for the stated purity. Diamonds above the threshold we set are sold with a grading certificate. Both are available to read in the showroom before you decide.</p>
            </details>
          </div>
        </div>
      </article>
      <section className="band band--tight">
        <p className="eyebrow">You may also look at</p>
        <h2>Related pieces</h2>
        <div className="product-grid">
          {related.map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>
    </Container>
  );
};

export default ProductDetails;

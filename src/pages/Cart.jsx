import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import JewelleryImage from '../components/common/JewelleryImage';
import { formatPrice } from '../utils/formatPrice';
import { getPrice } from '../utils/catalog';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [requested, setRequested] = useState(false);

  return (
    <Container>
      <div className="empty-state" style={{ paddingBottom: '1rem' }}>
        <p className="eyebrow">Your selection</p>
        <h1>Shopping bag</h1>
      </div>
      {requested ? (
        <div className="empty-state" role="status">
          <p>The showroom has your request. We will confirm availability by telephone.</p>
          <Button to="/products">Continue looking</Button>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="empty-state">
          <p>The bag is empty.</p>
          <Button to="/products">Shop jewellery</Button>
        </div>
      ) : (
        <div className="bag-layout">
          <div>
            {cartItems.map((item) => (
              <article key={item.id} className="bag-row">
                <Link to={`/product/${item.id}`}>
                  <JewelleryImage
                    src={item.images?.primary}
                    alt=""
                    seed={item.id}
                    category={item.category}
                    ratio="portrait"
                  />
                </Link>
                <div>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </h2>
                  <p className="price">{formatPrice(getPrice(item))}</p>
                  <div className="qty">
                    <button type="button" aria-label={`Decrease ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity - 1)}>–</button>
                    <span>{item.quantity}</span>
                    <button type="button" aria-label={`Increase ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button type="button" className="btn btn--ghost" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
          <aside className="bag-summary">
            <p>Estimated total</p>
            <p className="price price--large">{formatPrice(cartTotal)}</p>
            <p>Shipping is complimentary above ₹50,000. This is a showroom request, not a payment.</p>
            <Button
              onClick={() => {
                clearCart();
                setRequested(true);
              }}
            >
              Request these pieces
            </Button>
          </aside>
        </div>
      )}
    </Container>
  );
};

export default Cart;

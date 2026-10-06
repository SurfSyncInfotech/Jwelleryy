import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import ProductCard from '../components/product/ProductCard';
import { useWishlist } from '../context/WishlistContext';

const Wishlist = () => {
  const { wishlistItems, clearWishlist } = useWishlist();

  return (
    <Container>
      <div className="empty-state" style={{ paddingBottom: '1rem' }}>
        <p className="eyebrow">Saved</p>
        <h1>Wishlist</h1>
        <p>Pieces you asked us to hold in mind. They are not reserved until they are in your bag.</p>
      </div>
      {wishlistItems.length === 0 ? (
        <div className="empty-state">
          <p>Nothing saved yet.</p>
          <Button to="/products">Browse jewellery</Button>
        </div>
      ) : (
        <>
          <div className="product-grid">
            {wishlistItems.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <button type="button" className="btn btn--ghost" onClick={clearWishlist}>Clear wishlist</button>
          <p><Link to="/products">Continue looking</Link></p>
        </>
      )}
    </Container>
  );
};

export default Wishlist;

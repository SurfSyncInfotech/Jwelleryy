import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import SearchOverlay from './SearchOverlay';

const Header = () => {
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const lightPage = pathname === '/cart' || pathname === '/wishlist' || pathname.startsWith('/product/');
  const overlay = !lightPage && !isScrolled;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const linkClass = ({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`;

  return (
    <header className={`header ${overlay ? 'header--overlay' : 'header--solid'}`}>
      <div className="container header__bar">
        <Link to="/" className="logo" aria-label="Aabhaara home">Aabhaara</Link>

        <nav className="desktop-nav" aria-label="Primary">
          <NavLink to="/" end className={linkClass}>Home</NavLink>

          <NavLink to="/products" className={linkClass}>Jewellery</NavLink>
          <NavLink to="/about" className={linkClass}>About Us</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact Us</NavLink>
          <NavLink to="/book-a-visit" className={linkClass}>Book a Visit</NavLink>
          <NavLink to="/journal" className={linkClass}>Journal</NavLink>
        </nav>

        <div className="header__tools">
          <button className="icon-btn" aria-label="Search jewellery" onClick={() => setSearchOpen(true)}>
            <Search size={18} />
          </button>
          <Link to="/wishlist" className="icon-btn" aria-label={`Wishlist, ${wishlistItems.length} items`}>
            <Heart size={18} />
            {wishlistItems.length > 0 && <span className="badge">{wishlistItems.length}</span>}
          </Link>
          <Link to="/cart" className="icon-btn" aria-label={`Shopping bag, ${cartCount} items`}>
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
          <button
            className="icon-btn header__menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setMobileOpen(false)}>Jewellery</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
            <Link to="/book-a-visit" onClick={() => setMobileOpen(false)}>Book a Visit</Link>
            <Link to="/journal" onClick={() => setMobileOpen(false)}>Journal</Link>
          </motion.nav>
        )}
      </AnimatePresence>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </header>
  );
};

export default Header;

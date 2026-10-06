import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CategoryPage from './pages/CategoryPage';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Craftsmanship from './pages/Craftsmanship';
import Contact from './pages/Contact';
import BookVisit from './pages/BookVisit';
import Journal from './pages/Journal';
import JournalArticle from './pages/JournalArticle';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Men from './pages/Men';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Frame() {
  const location = useLocation();
  const offset = location.pathname === '/cart'
    || location.pathname === '/wishlist'
    || location.pathname.startsWith('/product/');

  return (
    <div className="site">
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <motion.main
        key={location.pathname}
        className={`site-main ${offset ? 'site-main--offset' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/products/rings" element={<CategoryPage />} />
          <Route path="/products/earrings" element={<CategoryPage />} />
          <Route path="/products/necklaces" element={<CategoryPage />} />
          <Route path="/products/bracelets" element={<CategoryPage />} />
          <Route path="/products/nose-pins" element={<CategoryPage />} />
          <Route path="/products/necklace-sets" element={<CategoryPage />} />
          <Route path="/products/bangles" element={<CategoryPage />} />
          <Route path="/products/bridal" element={<CategoryPage />} />
          <Route path="/products/gold" element={<CategoryPage />} />
          <Route path="/products/diamond" element={<CategoryPage />} />
          <Route path="/men" element={<Men />} />
          <Route path="/men/rings" element={<CategoryPage />} />
          <Route path="/men/chains" element={<CategoryPage />} />
          <Route path="/men/bracelets" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/craftsmanship" element={<Craftsmanship />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-a-visit" element={<BookVisit />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalArticle />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Frame />
    </BrowserRouter>
  );
}

export default App;

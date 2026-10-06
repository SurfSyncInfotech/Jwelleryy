import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setDone(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <p className="logo logo--footer">Aabhaara</p>
          <p className="footer__lede">
            A jewellery house working between a Jaipur bench and a Mumbai showroom. Gold, diamond, and bridal pieces made to be kept.
          </p>
        </div>
        <div>
          <h2>Visit</h2>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/craftsmanship">Craftsmanship</Link></li>
            <li><Link to="/journal">Journal</Link></li>
            <li><Link to="/book-a-visit">Book a Visit</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h2>Jewellery</h2>
          <ul>
            <li><Link to="/products/rings">Rings</Link></li>
            <li><Link to="/products/earrings">Earrings</Link></li>
            <li><Link to="/products/necklaces">Necklaces</Link></li>
            <li><Link to="/products/bridal">Bridal Jewellery</Link></li>
            <li><Link to="/men">Men’s Jewellery</Link></li>
          </ul>
        </div>
        <div>
          <h2>Notes</h2>
          {done ? (
            <p role="status">Thank you. We will write when the next edit is ready.</p>
          ) : (
            <form onSubmit={onSubmit} className="footer__form">
              <label htmlFor="footer-email">Atelier notes, occasionally.</label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                autoComplete="email"
              />
              <button type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </div>
      <div className="container footer__base">
        <p>© {new Date().getFullYear()} Aabhaara. All rights reserved.</p>
        <p>18 Lotus Court, Colaba, Mumbai</p>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/common/Container';
import Reveal from '../components/common/Reveal';
import JewelleryImage from '../components/common/JewelleryImage';
import ProductCard from '../components/product/ProductCard';
import CardCarousel, { carouselItem } from '../components/common/CardCarousel';
import { categories } from '../data/categories';
import { products } from '../data/products';

function pretty(slug) {
  return slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function CategoryBand({ category, items, index }) {
  const subs = [...new Set(items.map((item) => item.subcategory))];
  const [active, setActive] = useState('all');
  const shown = active === 'all' ? items : items.filter((item) => item.subcategory === active);

  return (
    <section id={category.id} className={`band jewel-section ${index % 2 ? 'band--cream' : ''}`}>
      <Container>
        <div className="jewel-section__head">
          <Reveal>
            <JewelleryImage
              src={category.image}
              alt=""
              seed={`shop-${category.id}`}
              category={category.id}
              ratio="portrait"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">{String(index + 1).padStart(2, '0')}</p>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <Link to={`/products/${category.id}`} className="btn btn--line">View all</Link>
          </Reveal>
        </div>

        <div className="subchips" role="tablist" aria-label={`${category.name} types`}>
          <button type="button" className={active === 'all' ? 'is-on' : ''} onClick={() => setActive('all')}>
            All
          </button>
          {subs.map((sub) => (
            <button
              key={sub}
              type="button"
              className={active === sub ? 'is-on' : ''}
              onClick={() => setActive(sub)}
            >
              {pretty(sub)}
            </button>
          ))}
        </div>

        <CardCarousel key={active} label={category.name}>
          {shown.map((product) => (
            <motion.div key={product.id} className="carousel__item" variants={carouselItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </CardCarousel>
      </Container>
    </section>
  );
}

const Shop = () => (
  <>
    <header className="page-hero">
      <Container>
        <Reveal>
          <p className="eyebrow">The collection</p>
          <h1>Jewellery</h1>
          <p>
            Rings, earrings, necklaces, bangles, bridal sets, gold, and diamonds. Every type in the house is on this page.
          </p>
        </Reveal>
      </Container>
    </header>

    <div className="jewel-jump-wrap">
      <Container>
        <nav className="jewel-jump" aria-label="Jewellery types">
          {categories.map((category) => (
            <a key={category.id} href={`#${category.id}`}>{category.name}</a>
          ))}
        </nav>
      </Container>
    </div>

    {categories.map((category, index) => (
      <CategoryBand
        key={category.id}
        category={category}
        index={index}
        items={products.filter((product) => product.category === category.id)}
      />
    ))}
  </>
);

export default Shop;

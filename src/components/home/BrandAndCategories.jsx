import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import JewelleryImage from '../common/JewelleryImage';
import ProductCard from '../product/ProductCard';
import CardCarousel, { carouselItem } from '../common/CardCarousel';
import { productsByIds, newArrivalIds } from '../../utils/catalog';
import { categories } from '../../data/categories';

const shopCategories = ['rings', 'earrings', 'necklaces', 'bracelets', 'nose-pins', 'necklace-sets', 'bangles', 'bridal'];

const BrandAndCategories = () => {
  const tiles = categories.filter((item) => shopCategories.includes(item.id));
  const arrivals = productsByIds(newArrivalIds);

  return (
    <>
      <section className="band">
        <Container>
          <div className="split split--2">
            <Reveal>
              <p className="eyebrow">The house</p>
              <p className="pull">We would rather make fewer pieces, and know the hand that finished each one.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="prose prose--measure">
                <p>
                  Aabhaara began with a family of jadau setters in Jaipur and a belief that Indian jewellery did not need to shout to be remembered. The showroom in Mumbai is deliberately small. Appointments are unhurried. Estimates show purity, weight, and making, in that order.
                </p>
                <p>
                  The work sits between ceremony and ordinary days: a haar for a wedding week, a band for a Tuesday, a chain a man can forget he is wearing until the light changes.
                </p>
                <Link to="/about" className="btn btn--line">Read our story</Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="band band--tight band--cream">
        <Container>
          <Reveal>
            <p className="eyebrow">Shop by category</p>
            <h2>Eight ways to begin</h2>
          </Reveal>
          <div className="category-mosaic">
            {tiles.map((category) => (
              <Link key={category.id} to={`/products/${category.id}`} className="cat-tile">
                <JewelleryImage
                  src={category.image}
                  alt=""
                  seed={`category-${category.id}`}
                  category={category.id}
                  ratio="portrait"
                />
                <span className="cat-tile__label">
                  <span>View</span>
                  <h3>{category.name}</h3>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="band">
        <Container>
          <Reveal>
            <p className="eyebrow">Just finished</p>
            <h2>New arrivals</h2>
          </Reveal>
          <CardCarousel label="New arrivals">
            {arrivals.map((product) => (
              <motion.div key={product.id} className="carousel__item" variants={carouselItem}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </CardCarousel>
        </Container>
      </section>
    </>
  );
};

export default BrandAndCategories;

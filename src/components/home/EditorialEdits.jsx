import { Link } from 'react-router-dom';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import JewelleryImage from '../common/JewelleryImage';
import ProductCard from '../product/ProductCard';
import Button from '../common/Button';
import { productsByCategory, getProductById } from '../../utils/catalog';

const EditorialEdits = () => {
  const bridal = productsByCategory('bridal', 3);
  const gold = productsByCategory('gold', 3);
  const diamond = productsByCategory('diamond', 3);
  const menRing = getProductById('men-001');
  const menChain = getProductById('men-008');
  const menBracelet = getProductById('men-012');
  const signature = getProductById('necklace-001');

  return (
    <>
      <section className="band band--burgundy">
        <Container>
          <div className="editorial">
            <Reveal>
              <p className="eyebrow" style={{ color: '#e4c99a' }}>Bridal edit</p>
              <h2>For the week, not only the photograph</h2>
              <p>
                Haar, nath, maang tikka, and the quieter pieces that carry a bride from mehendi to the morning after. Planned as a sequence, so the heaviest gold is worn when it is needed.
              </p>
              <Button to="/products/bridal" variant="light">View bridal jewellery</Button>
            </Reveal>
            <Reveal className="editorial__media">
              <JewelleryImage
                src="/images/collections/bridal-edit.jpg"
                alt="Bridal haar arranged for a fitting"
                seed="bridal-edit"
                category="bridal"
                ratio="landscape"
                label="Wedding week"
              />
            </Reveal>
          </div>
          <div className="product-grid product-grid--3" style={{ marginTop: '2.5rem' }}>
            {bridal.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </Container>
      </section>

      <section className="band band--dark">
        <Container>
          <div className="split split--2">
            <Reveal>
              <p className="eyebrow">Gold</p>
              <h2>A muted gold, weighed honestly</h2>
              <p>22K for colour and ceremony. 18K where a stone needs a firmer setting. Every estimate names purity, gross weight, and making before the conversation turns to design.</p>
              <Button to="/products/gold" variant="line">Shop gold</Button>
            </Reveal>
            <div className="product-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {gold.slice(0, 2).map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </Container>
      </section>

      <section className="band">
        <Container>
          <Reveal>
            <p className="eyebrow">Diamonds</p>
            <h2>Light, without the glare</h2>
            <p className="prose--measure">Certified stones, chosen in daylight at Lotus Court. We care more about cut and how a setting protects the girdle than about a number on a tag.</p>
          </Reveal>
          <div className="product-grid product-grid--3">
            {diamond.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Button to="/products/diamond" variant="line">Shop diamonds</Button>
          </div>
        </Container>
      </section>

      <section className="band band--cream">
        <Container>
          <Reveal>
            <p className="eyebrow">For him</p>
            <h2>Rings, chains, bracelets</h2>
          </Reveal>
          <div className="feature-row">
            {[
              { product: menRing, href: '/men/rings', label: 'Rings' },
              { product: menChain, href: '/men/chains', label: 'Chains' },
              { product: menBracelet, href: '/men/bracelets', label: 'Bracelets' },
            ].map(({ product, href, label }) => (
              <article key={label}>
                <Link to={href}>
                  <JewelleryImage
                    src={product.images.primary}
                    alt={product.name}
                    seed={product.id}
                    category="men"
                    label={label}
                  />
                  <h3 style={{ marginTop: '0.8rem' }}>{label}</h3>
                  <p>{product.name}</p>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="band">
        <Container>
          <div className="editorial editorial--reverse editorial--top">
            <Reveal className="editorial__media">
              <JewelleryImage
                src={signature.images.primary}
                alt={signature.name}
                seed="signature-collection"
                category="necklaces"
                ratio="portrait"
                label="Signature"
              />
            </Reveal>
            <Reveal className="editorial__copy">
              <p className="eyebrow">Signature collection</p>
              <h2>{signature.name}</h2>
              <p>{signature.detailedDescription}</p>
              <Button to={`/product/${signature.id}`} variant="gold">View the piece</Button>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
};

export default EditorialEdits;

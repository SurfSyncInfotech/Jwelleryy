import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../common/Button';

const slides = [
  {
    src: '/images/hero/slide-1.jpg',
    alt: 'A gold necklace photographed in soft atelier light',
    caption: 'Signature haar',
  },
  {
    src: '/images/hero/slide-2.jpg',
    alt: 'Bridal gold jewellery arranged for a fitting',
    caption: 'Bridal edit',
  },
  {
    src: '/images/hero/slide-3.jpg',
    alt: 'A diamond jewel catching daylight',
    caption: 'Diamond light',
  },
  {
    src: '/images/hero/slide-4.jpg',
    alt: 'A gold ring on a quiet cloth',
    caption: 'Rings',
  },
];

const HeroSection = () => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        };

  useEffect(() => {
    if (reduce) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [reduce]);

  const slide = slides[index];

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__copy">
        <motion.p className="eyebrow" {...rise(0.1)}>House of Aabhaara</motion.p>
        <motion.h1 className="hero__title" {...rise(0.2)}>
          Jewellery with
          <br />
          a longer <em>memory</em>
        </motion.h1>
        <motion.p className="hero__lede" {...rise(0.35)}>
          From a Jaipur bench to a quiet room in Colaba, we make gold, diamond, and bridal pieces meant to be worn, repaired, and passed on.
        </motion.p>
        <motion.div className="btn-row" {...rise(0.5)}>
          <Button to="/products" variant="light">Shop Jewellery</Button>
          <Button to="/book-a-visit" variant="line">Book a Visit</Button>
        </motion.div>
      </div>
      <div className="hero__visual">
        <div className="hero__frame">
          <AnimatePresence mode="wait">
            <motion.img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className="hero__slide"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
          <p className="hero__caption">{slide.caption}</p>
          <div className="hero__controls">
            <button type="button" aria-label="Previous slide" onClick={() => setIndex((current) => (current - 1 + slides.length) % slides.length)}>
              <ChevronLeft size={18} />
            </button>
            <div className="hero__dots">
              {slides.map((item, dot) => (
                <button
                  key={item.src}
                  type="button"
                  className={dot === index ? 'is-active' : ''}
                  aria-label={`Show slide ${dot + 1}`}
                  onClick={() => setIndex(dot)}
                />
              ))}
            </div>
            <button type="button" aria-label="Next slide" onClick={() => setIndex((current) => (current + 1) % slides.length)}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

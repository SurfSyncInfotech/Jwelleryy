import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CardCarousel = ({ children, label }) => {
  const scroller = useRef(null);

  const move = (direction) => {
    const node = scroller.current;
    if (!node) return;
    const card = node.querySelector('.product-card, .cat-tile');
    const amount = card ? card.getBoundingClientRect().width + 16 : node.clientWidth * 0.8;
    node.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <div className="carousel">
      <div className="carousel__bar">
        <p className="sr-only">{label}</p>
        <div className="carousel__arrows">
          <button type="button" aria-label={`Previous ${label}`} onClick={() => move(-1)}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" aria-label={`Next ${label}`} onClick={() => move(1)}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <motion.div
        ref={scroller}
        className="carousel__track"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-8% 0px' }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const carouselItem = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default CardCarousel;

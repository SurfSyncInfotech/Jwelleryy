import { motion } from 'framer-motion';
import Container from '../components/common/Container';
import JewelleryImage from '../components/common/JewelleryImage';

const steps = [
  ['01', 'Inspiration', 'A conversation, a garment, sometimes a grandmother’s broken clasp. We start with the life the piece has to enter, not with a tray of trends.', 'rings'],
  ['02', 'Sketching', 'Lines are drawn at Lotus Court while you are still in the room. Proportion is checked against the neck, the hand, or the blouse, not against a mood board.', 'necklaces'],
  ['03', 'Gold preparation', 'Purity is chosen for the job. 22K where colour and softness matter. 18K where a stone needs a firmer hold. The metal is melted, rolled, and weighed before it is beautiful.', 'gold'],
  ['04', 'Stone selection', 'Diamonds are read in daylight. Polki, kundan glass, and coloured stones are chosen for how they sit in gold, not for a photograph under a lamp.', 'diamond'],
  ['05', 'Setting', 'Kundan, claw, bezel, or pavé, done by the karigar named for that technique. A setting that cannot be opened again is sent back.', 'earrings'],
  ['06', 'Polishing', 'We stop short of a mirror shine on most gold. A muted surface keeps the colour deep and hides the first year of honest wear.', 'bangles'],
  ['07', 'Quality inspection', 'Stones are checked for movement. Clasps are opened and closed. Hallmark and certificate are matched to the job card. Anything doubtful stays in Jaipur.', 'bridal'],
  ['08', 'Final piece', 'The piece returns to Mumbai for a fitting. Weight, length, and comfort are confirmed on the person who will wear it. Only then is it called finished.', 'men'],
];

const Craftsmanship = () => (
  <>
    <header className="page-hero">
      <Container>
        <p className="eyebrow">Craftsmanship</p>
        <h1>How a piece is made</h1>
        <p>Eight stages between a conversation in Colaba and a finished jewel. None of them is decorative.</p>
      </Container>
    </header>
    {steps.map(([index, title, copy, category], i) => (
      <section key={index} className={`band ${i % 2 ? 'band--cream' : ''}`}>
        <Container>
          <motion.div
            className={`editorial ${i % 2 ? 'editorial--reverse' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <JewelleryImage
              src={`/images/craftsmanship/step-${index}.jpg`}
              alt={`${title} in the Aabhaara workshop`}
              seed={`craft-${index}`}
              category={category}
              ratio="landscape"
              label={title}
            />
            <div>
              <p className="eyebrow">{index}</p>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          </motion.div>
        </Container>
      </section>
    ))}
  </>
);

export default Craftsmanship;

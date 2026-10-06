import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import Button from '../common/Button';
import { articles } from '../../data/journal';

const reasons = [
  ['01', 'Certified craftsmanship', 'Hallmarked gold and certified diamonds. The paperwork is part of the piece, not an afterthought.'],
  ['02', 'Selected materials', 'We buy stones and gold we are willing to repair in ten years. Fashion settings that cannot be opened again do not enter the house.'],
  ['03', 'Skilled artisans', 'Kundan, polki, filigree, and stone setting are done by karigars who have spent years on one technique.'],
  ['04', 'Transparent pricing', 'Purity, weight, and making charges are written on the estimate before you decide.'],
  ['05', 'Personal assistance', 'Showroom visits are by appointment, so the person across the table stays with you from the first tray to the final fit.'],
  ['06', 'Lifetime care', 'Pieces we make can return for inspection, cleaning, and resetting. Restoration is quoted before work begins.'],
];

const quotes = [
  {
    quote: 'They took the haar off the bust and made me sit with it for twenty minutes. I left with a shorter piece and a wedding I could actually wear.',
    name: 'Meera S.',
    place: 'Mumbai, bridal fitting',
  },
  {
    quote: 'The estimate listed making separately. I have bought gold for years and rarely seen it written that plainly.',
    name: 'Anil Deshpande',
    place: 'Pune, gold chain',
  },
  {
    quote: 'My mother’s ring was resized without being made to look new. That mattered more than the new bangle I also bought.',
    name: 'R. Iyer',
    place: 'Chennai, restoration',
  },
];

const HomeClose = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const featured = articles[0];
  const rest = articles.slice(1, 4);

  return (
    <>
      <section className="band band--dark">
        <Container>
          <Reveal>
            <p className="eyebrow">Craftsmanship</p>
            <h2>Eight stages, one bench</h2>
          </Reveal>
          <div className="process-list">
            {['Inspiration', 'Sketching', 'Gold preparation', 'Stone selection', 'Setting', 'Polishing', 'Inspection', 'The final piece'].map((step, index) => (
              <article key={step} className="process-step">
                <em>0{index + 1}</em>
                <h3>{step}</h3>
              </article>
            ))}
          </div>
          <div style={{ marginTop: '1.8rem' }}>
            <Button to="/craftsmanship" variant="line">See the process</Button>
          </div>
        </Container>
      </section>

      <section className="band">
        <Container>
          <div className="story-list">
            <Reveal>
              <p className="eyebrow">Indian heritage</p>
              <h2>Tradition as a way of making, not a costume</h2>
              <div className="prose">
                <p>
                  Temple repeats, kundan flush settings, and the softer light of polki are techniques our karigars still practise because they solve real problems: how gold behaves in heat, how a stone sits against silk, how a motif reads across a room.
                </p>
                <p>
                  Aabhaara does not dress those techniques up as a theme. A drawing made in Mumbai is only finished when the Jaipur bench can make it honestly. The modern part is the edit: cleaner lines, stated weights, and jewellery that can go to work the next morning.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <blockquote className="quote-block">
                <p>An heirloom is a piece someone is willing to repair.</p>
                <footer>From the Aabhaara workshop notes</footer>
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="band band--cream">
        <Container>
          <Reveal>
            <p className="eyebrow">Why clients stay</p>
            <h2>What we will not rush</h2>
          </Reveal>
          <div className="reason-list">
            {reasons.map(([index, title, copy]) => (
              <article key={index} className="reason">
                <span>{index}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="band">
        <Container>
          <p className="eyebrow">From the fitting room</p>
          <div className="quote-layout">
            <blockquote className="quote-block">
              <p>“{quotes[0].quote}”</p>
              <footer>{quotes[0].name} · {quotes[0].place}</footer>
            </blockquote>
            <div>
              {quotes.slice(1).map((item) => (
                <blockquote key={item.name} className="quote-block" style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '1.25rem' }}>“{item.quote}”</p>
                  <footer>{item.name} · {item.place}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="band band--cream">
        <Container>
          <div className="split split--2" style={{ marginBottom: '1.5rem' }}>
            <h2>Jewellery journal</h2>
            <Link to="/journal">All essays</Link>
          </div>
          <article className="journal-feature">
            <div>
              <p className="eyebrow">{featured.topic}</p>
              <h3 style={{ fontSize: '2.4rem', marginTop: 0 }}><Link to={`/journal/${featured.slug}`}>{featured.title}</Link></h3>
              <p>{featured.excerpt}</p>
            </div>
            <p>{featured.date}</p>
          </article>
          {rest.map((article) => (
            <article key={article.slug} className="journal-row">
              <p className="eyebrow">{article.date}</p>
              <h3><Link to={`/journal/${article.slug}`}>{article.title}</Link></h3>
              <p>{article.excerpt}</p>
            </article>
          ))}
        </Container>
      </section>

      <section className="band band--burgundy">
        <Container>
          <div className="split split--2">
            <div>
              <p className="eyebrow" style={{ color: '#e4c99a' }}>The showroom</p>
              <h2>Book a private visit</h2>
              <p>Lotus Court is open by appointment, Tuesday to Sunday. Come with a garment, a photograph, or only a question about an old piece.</p>
            </div>
            <div>
              <Button to="/book-a-visit" variant="light">Request a time</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="band">
        <Container>
          <div className="newsletter">
            <div>
              <p className="eyebrow">Letters</p>
              <h2>A note when there is something worth telling</h2>
              <p>New work, wedding fittings, and the occasional essay. No weekly noise.</p>
            </div>
            {done ? (
              <p role="status">Thank you. We will write when the next edit is ready.</p>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setDone(true);
                  setEmail('');
                }}
              >
                <label className="sr-only" htmlFor="home-email">Email address</label>
                <input
                  id="home-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomeClose;

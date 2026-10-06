import Container from '../components/common/Container';
import JewelleryImage from '../components/common/JewelleryImage';
import Button from '../components/common/Button';

const About = () => (
  <>
    <header className="page-hero">
      <Container>
        <p className="eyebrow">About the house</p>
        <h1>Aabhaara</h1>
        <p>A jewellery house between a Jaipur workshop and a small room in Colaba. Named for aabha, the quiet radiance of metal in morning light.</p>
      </Container>
    </header>
    <section className="band">
      <Container>
        <div className="editorial">
          <JewelleryImage
            src="/images/about/jaipur-bench.jpg"
            alt="A jeweller’s bench in the Jaipur workshop"
            seed="about-origin"
            category="gold"
            ratio="landscape"
            label="Jaipur"
          />
          <div className="prose">
            <p className="eyebrow">Origin</p>
            <h2>A bench, then a room</h2>
            <p>
              The family that became Aabhaara set kundan in Jaipur for other people’s names long before it had one of its own. The work was steady: wedding haars in season, repairs in the monsoon, a few private clients who cared which karigar had touched the gold.
            </p>
            <p>
              In 1998 the youngest setter, Leela Narang, opened a single room in Mumbai so those clients would not have to travel for a fitting. She kept the Jaipur bench and refused a larger shopfront. The house is still that size on purpose.
            </p>
          </div>
        </div>
      </Container>
    </section>
    <section className="band band--cream">
      <Container>
        <div className="story-list">
          <div className="prose">
            <p className="eyebrow">Philosophy</p>
            <h2>Make what can be worn again</h2>
            <p>
              Aabhaara does not design for a single photograph. A piece has to survive a wedding week, a decade of dinners, and at least one resizing. If a setting cannot be opened later, it does not leave the bench.
            </p>
            <p>
              We talk about weight the way other houses talk about trends. A haar that looks complete on a bust can exhaust a bride by the evening pheras. Taking something away is often the more skilled decision.
            </p>
          </div>
          <div className="prose">
            <p className="eyebrow">Design</p>
            <h2>Drawings that the bench can honour</h2>
            <p>
              Sketches are made in Mumbai with the client in the room, then sent to Jaipur with notes on purity, stone, and the garment they will meet. The karigar is allowed to refuse a line that only works on paper.
            </p>
            <p>
              Indian techniques stay in the work because they are useful: kundan for a flush face, polki for a softer light, temple repeats when a ceremony asks for them. They are not applied as costume.
            </p>
          </div>
        </div>
      </Container>
    </section>
    <section className="band">
      <Container>
        <div className="editorial editorial--reverse">
          <JewelleryImage
            src="/images/about/artisans.jpg"
            alt="Artisans reviewing a gold setting"
            seed="about-artisans"
            category="rings"
            ratio="portrait"
            label="The bench"
          />
          <div className="prose">
            <p className="eyebrow">Artisans</p>
            <h2>Names on the job card</h2>
            <p>
              Setting, filigree, polishing, and enamel are separate skills. A job card carries the name of the person responsible for each stage. Clients who want to know who made their piece can ask. We would rather say a name than “our team”.
            </p>
            <p>
              Three generations now move between the two cities. Apprentices learn one technique properly before they are asked to invent. The point of a house style is that a clasp made this year can be understood by a jeweller twenty years from now.
            </p>
          </div>
        </div>
      </Container>
    </section>
    <section className="band band--dark">
      <Container>
        <p className="eyebrow">Clients</p>
        <h2>A long conversation, not a counter</h2>
        <div className="prose prose--measure">
          <p>
            Visits are by appointment. The same person who opens the first tray stays through the estimate, the fitting, and the call six months later when a bangle needs a look. We keep notes on necklines, family pieces, and the ceremonies still ahead.
          </p>
          <p>
            Quality, for us, is hallmark, certificate, and the willingness to repair. Purity and making charges are written down before a design is approved. If we cannot say where the gold came from and who set the stone, we do not sell it.
          </p>
        </div>
        <div className="btn-row" style={{ marginTop: '1.5rem' }}>
          <Button to="/craftsmanship" variant="line">The process</Button>
          <Button to="/book-a-visit" variant="light">Book a visit</Button>
        </div>
      </Container>
    </section>
  </>
);

export default About;

import { useState } from 'react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

const faqs = [
  ['Do I need an appointment?', 'Yes for a private visit. If you are collecting a finished piece, call ahead and we will keep the room for you.'],
  ['Can you repair jewellery you did not make?', 'Often, if the gold can be worked and the stones reset safely. We will say so if a piece should stay with its original maker.'],
  ['Where is the gold hallmarked?', 'Pieces are hallmarked for the purity stated on the estimate. You can see the mark before the piece leaves with you.'],
  ['Do you ship?', 'Finished pieces ship across India. Bridal and made-to-order work is usually collected in person so the fit can be checked.'],
];

const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <>
      <header className="page-hero">
        <Container>
          <p className="eyebrow">Contact</p>
          <h1>Write, or come in</h1>
          <p>The showroom answers the telephone from Tuesday to Sunday. Monday is reserved for the bench.</p>
        </Container>
      </header>
      <section className="band">
        <Container>
          <div className="note-grid">
            <div>
              <p className="eyebrow">Showroom</p>
              <h2>Lotus Court</h2>
              <p>18 Lotus Court, Colaba<br />Mumbai 400001</p>
              <p><a href="tel:+912248902210">+91 22 4890 2210</a><br /><a href="mailto:atelier@aabhaara.com">atelier@aabhaara.com</a></p>
              <p>Tuesday to Sunday, 11:00–19:00<br />Monday by appointment only</p>
              <p>Customer care for orders already placed uses the same desk. Ask for the piece by name and we will find the job card.</p>
              <div className="map-plate" role="img" aria-label="Map placeholder for the Colaba showroom">
                <p className="eyebrow">Colaba</p>
                <h3>Showroom map</h3>
                <p>A map will sit here once the house publishes its location pin. Until then, the door is marked Aabhaara, first floor, Lotus Court.</p>
              </div>
            </div>
            <div>
              {sent ? (
                <div className="confirm" role="status">
                  <h2>We have your note</h2>
                  <p>Someone from the showroom will reply by the next working day.</p>
                </div>
              ) : (
                <form
                  className="form-grid"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="field">
                    <label htmlFor="contact-name">Name</label>
                    <input id="contact-name" name="name" required autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-email">Email</label>
                    <input id="contact-email" name="email" type="email" required autoComplete="email" />
                  </div>
                  <div className="field field--full">
                    <label htmlFor="contact-message">Message</label>
                    <textarea id="contact-message" name="message" required />
                  </div>
                  <div className="field field--full">
                    <Button type="submit">Send</Button>
                  </div>
                </form>
              )}
              <div className="accordion" style={{ marginTop: '2rem' }}>
                {faqs.map(([question, answer]) => (
                  <details key={question}>
                    <summary>{question}</summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;

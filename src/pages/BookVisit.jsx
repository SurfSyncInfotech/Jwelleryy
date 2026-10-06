import { useState } from 'react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

const interests = [
  'Bridal jewellery',
  'Gold',
  'Diamonds',
  'Rings',
  'Necklaces',
  "Men's jewellery",
  'A repair or resize',
];

const BookVisit = () => {
  const [sent, setSent] = useState(false);
  const [summary, setSummary] = useState(null);

  return (
    <>
      <header className="page-hero">
        <Container>
          <p className="eyebrow">Showroom</p>
          <h1>Book a private visit</h1>
          <p>An hour at Lotus Court, with one person from the house and the trays that match what you came to see. Tuesday to Sunday, or Monday if the piece cannot wait.</p>
        </Container>
      </header>
      <section className="band">
        <Container>
          <div className="visit-layout">
            <div className="prose">
              <h2>What to expect</h2>
              <p>Come as you are. If a wedding outfit exists, bring a photograph of the neckline. If you are buying for someone else, a ring size and a sense of their days is enough.</p>
              <p>There is no counter and no queue. Tea is offered. Estimates are written before any piece is set aside.</p>
              <p>18 Lotus Court, Colaba. The door is on the first floor.</p>
            </div>
            {sent ? (
              <div className="confirm" role="status">
                <p className="eyebrow">Requested</p>
                <h2>We will confirm {summary.name}’s visit</h2>
                <p>
                  {summary.date} at {summary.time}, for {summary.interest.toLowerCase()}. A note will go to {summary.email} once the room is held.
                </p>
              </div>
            ) : (
              <form
                className="form-grid"
                onSubmit={(event) => {
                  event.preventDefault();
                  const data = new FormData(event.currentTarget);
                  setSummary(Object.fromEntries(data.entries()));
                  setSent(true);
                }}
              >
                <div className="field">
                  <label htmlFor="visit-name">Name</label>
                  <input id="visit-name" name="name" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="visit-email">Email</label>
                  <input id="visit-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="visit-phone">Phone</label>
                  <input id="visit-phone" name="phone" type="tel" required autoComplete="tel" />
                </div>
                <div className="field">
                  <label htmlFor="visit-guests">Number of guests</label>
                  <input id="visit-guests" name="guests" type="number" min="1" max="6" defaultValue="1" required />
                </div>
                <div className="field">
                  <label htmlFor="visit-date">Preferred date</label>
                  <input id="visit-date" name="date" type="date" required />
                </div>
                <div className="field">
                  <label htmlFor="visit-time">Preferred time</label>
                  <select id="visit-time" name="time" required defaultValue="11:30">
                    {['11:30', '13:00', '15:00', '16:30', '18:00'].map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div className="field field--full">
                  <label htmlFor="visit-interest">Jewellery interest</label>
                  <select id="visit-interest" name="interest" required defaultValue={interests[0]}>
                    {interests.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </div>
                <div className="field field--full">
                  <label htmlFor="visit-message">Message</label>
                  <textarea id="visit-message" name="message" placeholder="A wedding date, a repair, a question" />
                </div>
                <div className="field field--full">
                  <Button type="submit">Request this time</Button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default BookVisit;

import { Link } from 'react-router-dom';

const AnnouncementBar = () => (
  <div className="announce">
    <p>
      Private viewings in Mumbai this month
      <span className="announce__dot" aria-hidden="true" />
      <Link to="/book-a-visit">Book a showroom visit</Link>
      <span className="announce__dot" aria-hidden="true" />
      Complimentary shipping above ₹50,000
    </p>
  </div>
);

export default AnnouncementBar;

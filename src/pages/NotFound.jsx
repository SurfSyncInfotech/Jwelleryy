import Container from '../components/common/Container';
import Button from '../components/common/Button';

const NotFound = () => (
  <Container>
    <div className="empty-state">
      <p className="eyebrow">404</p>
      <h1>This page is not in the house</h1>
      <Button to="/">Return home</Button>
    </div>
  </Container>
);

export default NotFound;

import { Link } from 'react-router-dom';
import Container from '../components/common/Container';
import JewelleryImage from '../components/common/JewelleryImage';
import { articles } from '../data/journal';

const Journal = () => {
  const [first, ...rest] = articles;
  return (
    <>
      <header className="page-hero">
        <Container>
          <p className="eyebrow">Journal</p>
          <h1>Notes from the house</h1>
          <p>Essays on bridal dressing, gold, diamonds, and the ordinary habits that keep a piece alive.</p>
        </Container>
      </header>
      <section className="band">
        <Container>
          <article className="journal-feature">
            <JewelleryImage
              src={first.image}
              alt=""
              seed={first.seed}
              category={first.category}
              ratio="landscape"
              label={first.topic}
            />
            <div>
              <p className="eyebrow">{first.topic}</p>
              <h2><Link to={`/journal/${first.slug}`}>{first.title}</Link></h2>
              <p>{first.excerpt}</p>
              <p>{first.date}</p>
            </div>
          </article>
          {rest.map((article) => (
            <article key={article.slug} className="journal-row journal-row--split">
              <p className="eyebrow">{article.topic}<br />{article.date}</p>
              <div>
                <h3><Link to={`/journal/${article.slug}`}>{article.title}</Link></h3>
                <p>{article.excerpt}</p>
              </div>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
};

export default Journal;

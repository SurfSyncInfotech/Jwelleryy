import { Link, useParams } from 'react-router-dom';
import Container from '../components/common/Container';
import JewelleryImage from '../components/common/JewelleryImage';
import { articles, getArticle } from '../data/journal';

const JournalArticle = () => {
  const { slug } = useParams();
  const article = getArticle(slug);

  if (!article) {
    return (
      <Container>
        <div className="empty-state">
          <h1>This essay is not in the journal</h1>
          <Link to="/journal">Back to the journal</Link>
        </div>
      </Container>
    );
  }

  const more = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <header className="page-hero">
        <Container>
          <p className="eyebrow">{article.topic}</p>
          <h1>{article.title}</h1>
          <p>{article.date}</p>
        </Container>
      </header>
      <section className="band">
        <Container>
          <div className="article-layout">
            <JewelleryImage
              src={article.image}
              alt=""
              seed={article.seed}
              category={article.category}
              ratio="landscape"
              label={article.topic}
            />
            <div className="prose prose--measure">
              {article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p><Link to="/journal">All essays</Link></p>
            </div>
          </div>
          <div style={{ marginTop: '3rem' }}>
            <p className="eyebrow">Continue</p>
            {more.map((item) => (
              <article key={item.slug} className="journal-row">
                <h3><Link to={`/journal/${item.slug}`}>{item.title}</Link></h3>
                <p>{item.excerpt}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default JournalArticle;

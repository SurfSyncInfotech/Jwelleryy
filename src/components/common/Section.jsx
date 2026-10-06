const Section = ({ children, className = '', id }) => (
  <section id={id} className={`band ${className}`.trim()}>
    {children}
  </section>
);

export default Section;

const Container = ({ children, className = '', size = 'xl' }) => (
  <div className={`container container--${size} ${className}`.trim()}>{children}</div>
);

export default Container;

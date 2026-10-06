import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'gold', to, className = '', type = 'button', ...props }) => {
  const classes = `btn btn--${variant} ${className}`.trim();
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;

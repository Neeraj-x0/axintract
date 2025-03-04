import PropTypes from 'prop-types';

const Button = ({ href, variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "rounded-full border border-solid transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5";
  
  const variants = {
    primary: "border-transparent bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc]",
    secondary: "border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent sm:min-w-44"
  };

  const Component = href ? 'a' : 'button';
  const linkProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...linkProps}
      {...props}
    >
      {children}
    </Component>
  );
};

Button.propTypes = {
  href: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Button; 
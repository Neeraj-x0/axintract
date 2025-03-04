import Image from 'next/image';
import PropTypes from 'prop-types';

const FooterLink = ({ href, icon, children }) => (
  <a
    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      aria-hidden
      src={icon}
      alt={`${children} icon`}
      width={16}
      height={16}
    />
    {children}
  </a>
);

FooterLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default FooterLink; 
import React from 'react';
import Image from 'next/image';
function Logo({ variant }) {
const logo = variant === "white" ? "https://res.cloudinary.com/dguddaxjl/image/upload/v1741095463/media-uploads/1741095463138-6mz04z2hq0r.png" : "https://res.cloudinary.com/dguddaxjl/image/upload/v1740983427/media-uploads/1740983426978-6uoo2jxrcvn.png"
  return (
    <Image
      src={logo}
      alt="Logo"
        width={165}
        height={34}
      className=" max-sm:h-auto max-sm:w-[120px]"
    />
  );
}

export default Logo;
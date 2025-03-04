import React from 'react';

function Button({ children, variant, onClick }) {
  const baseClasses = "px-3.5 py-2.5 text-sm font-medium rounded-md cursor-pointer";
  const variantClasses = {
    outline: "border border-solid border-neutral-900 text-neutral-900",
    solid: "text-white bg-neutral-900"
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
import React from "react";  
function Header() {
  return (
    <div className={ `flex flex-col h-full`} id="Header">
      <div className="flex flex-col gap-2 items-start justify-center text-neutral-700 max-w-[20%]">
        <span className="text-3xl font-extrabold">Hello Admin!</span>
        <span className="text-md font-semibold">
          Measure how fast you are growing Monthly Recurring Performance
          Management
        </span>
      </div>
    </div>
  );
}

export default Header;

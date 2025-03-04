import React from 'react';
import { Dropdown } from 'antd';
import './NavItem.css'; // We'll create this CSS file for custom styling

function NavItem({ text, hasDropdown, menu }) {
  // Create enhanced menu with custom styling
  const enhancedMenu = menu ? {
    ...menu,
    style: {
      minWidth: '220px', // Make dropdown wider
    },
    className: 'nav-item-dropdown',
    items: menu.items.map(item => ({
      ...item,
      className: 'nav-dropdown-item',
      style: {
        ...item.style,
        padding: '12px 16px', // Increase padding for each item
        fontSize: '15px', // Larger font size
      }
    }))
  } : undefined;

  // If hasDropdown is true, render the component with Dropdown
  if (hasDropdown && menu) {
    return (
      <Dropdown 
        menu={enhancedMenu} 
        placement="bottom" 
        arrow={{ pointAtCenter: true }}
        overlayClassName="professional-dropdown"
        trigger={['hover']} // Change to hover if preferred
      >
        <div className="flex gap-1 items-center cursor-pointer nav-item-trigger">
          <div className="text-base font-medium leading-5 text-neutral-800">
            {text}
          </div>
          <svg 
            width="19" 
            height="19" 
            viewBox="0 0 19 19" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="dropdown-icon" 
            style={{ width: '18px', height: '18px' }}
          >
            <path 
              d="M5.16992 7.33997L9.66992 11.84L14.1699 7.33997" 
              stroke="#222222" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      </Dropdown>
    );
  }
  
  // If hasDropdown is false, render the original component
  return (
    <div className="flex gap-1 items-center cursor-pointer">
      <div className="text-base font-medium leading-5 text-neutral-800">
        {text}
      </div>
      {hasDropdown && (
        <svg 
          width="19" 
          height="19" 
          viewBox="0 0 19 19" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="dropdown-icon" 
          style={{ width: '18px', height: '18px' }}
        >
          <path 
            d="M5.16992 7.33997L9.66992 11.84L14.1699 7.33997" 
            stroke="#222222" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          ></path>
        </svg>
      )}
    </div>
  );
}

export default NavItem;
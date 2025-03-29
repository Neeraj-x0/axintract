"use client";
import React, { useState } from "react";
import {
  DashboardOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  CodeOutlined,
  CommentOutlined,
  QuestionCircleOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Logo from "./Logo";
import NavItem from "./NavItem";
import Button from "./Button";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

// Define dropdown menu items for each navigation item that has a dropdown
const featuresMenuItems = [
  {
    key: "feature-header",
    label: "Key Features",
    type: "group",
    children: [
      {
        key: "feature-1",
        label: "Analytics Dashboard",
        icon: <DashboardOutlined />,
      },
      {
        key: "feature-2",
        label: "Team Collaboration",
        icon: <TeamOutlined />,
      },
      {
        key: "feature-3",
        label: "Advanced Security",
        icon: <SafetyCertificateOutlined />,
      },
    ],
  },
];

const resourcesMenuItems = [
  {
    key: "resource-1",
    label: "Documentation",
    icon: <FileTextOutlined />,
  },
  {
    key: "resource-2",
    label: "API References",
    icon: <CodeOutlined />,
  },
  {
    key: "resource-3",
    label: "Community Forum",
    icon: <CommentOutlined />,
  },
  {
    key: "resource-4",
    label: "Support Center",
    icon: <QuestionCircleOutlined />,
  },
];

// Define navigation items with their respective dropdown menus
const navItems = [
  { text: "Features", hasDropdown: true, menuItems: featuresMenuItems },
  { text: "Resources", hasDropdown: true, menuItems: resourcesMenuItems },
  { text: "Integrations", hasDropdown: false },
  { text: "Pricing", hasDropdown: false },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full bg-white text-neutral-900">
      <div className="flex justify-between items-center px-6 sm:px-10 md:px-16 lg:px-24 py-4 mx-auto my-0 relative">
        <Logo />
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 lg:gap-6 items-center">
          {navItems.map((item) => (
            <NavItem
              key={item.text}
              text={item.text}
              hasDropdown={item.hasDropdown}
              menu={item.hasDropdown ? { items: item.menuItems } : undefined}
            />
          ))}
        </nav>
        
        {/* Auth buttons */}
        <div className="hidden md:flex gap-2 lg:gap-4 items-center">
          <SignedIn>
            <Button variant="outline" className="text-sm lg:text-base">
              <Link href="/user/dashboard">Dashboard</Link>
            </Button>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button variant="outline" className="text-sm lg:text-base">
              <SignInButton
                mode="modal"
                signUpFallbackRedirectUrl="/user/dashboard"
                forceRedirectUrl="/user/dashboard"
                fallbackRedirectUrl="/user/dashboard"
              />
            </Button>
          </SignedOut>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white z-50 md:hidden">
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <div key={item.text} className="py-3 border-b border-gray-100">
                  {item.hasDropdown ? (
                    <div className="cursor-pointer">
                      <span className="font-medium">{item.text}</span>
                      <div className="pl-4 mt-2 space-y-2">
                        {item.menuItems.flatMap(group => 
                          group.children 
                            ? group.children.map(child => (
                                <div key={child.key} className="flex items-center gap-2 py-1">
                                  {child.icon}
                                  <span>{child.label}</span>
                                </div>
                              ))
                            : [
                                <div key={group.key} className="flex items-center gap-2 py-1">
                                  {group.icon}
                                  <span>{group.label}</span>
                                </div>
                              ]
                        )}
                      </div>
                    </div>
                  ) : (
                    <span className="font-medium">{item.text}</span>
                  )}
                </div>
              ))}
            </nav>
            
            {/* Mobile Auth buttons */}
            <div className="flex flex-col gap-3 p-4 border-t border-gray-100">
              <SignedIn>
                <Button variant="outline" className="w-full text-center">
                  <Link href="/user/dashboard">Dashboard</Link>
                </Button>
                <Button variant="outline" className="w-full bg-red-500 text-white text-center">
                  <SignOutButton />
                </Button>
                <div className="flex justify-center py-2">
                  <UserButton />
                </div>
              </SignedIn>
              <SignedOut>
                <Button variant="outline" className="w-full text-center">
                  <SignInButton
                    mode="modal"
                    signUpFallbackRedirectUrl="/user/dashboard"
                    forceRedirectUrl="/user/dashboard"
                    fallbackRedirectUrl="/user/dashboard"
                  />
                </Button>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
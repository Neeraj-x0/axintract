import React from "react";
import Logo from "./Logo";

const Footer = () => {
  const footerSections = [
    {
      title: "Guides",
      items: [
        { name: "Connecting Customer Data", href: "/guides/connecting-data" },
        {
          name: "Personalized Messaging",
          href: "/guides/personalized-messaging",
        },
        {
          name: "Automate Birthday Messages",
          href: "/guides/birthday-automation",
        },
      ],
    },
    {
      title: "Features",
      items: [
        { name: "Customer Data Platform", href: "/features/data-platform" },
        { name: "Segmentation", href: "/features/segmentation" },
        { name: "Multichannel Campaigns", href: "/features/multichannel" },
        { name: "Automation", href: "/features/automation" },
      ],
    },
    {
      title: "Use Cases",
      items: [
        { name: "Onboarding", href: "/use-cases/onboarding" },
        { name: "Retention", href: "/use-cases/retention" },
        { name: "Billing Notifications", href: "/use-cases/billing" },
        { name: "Email Analytics", href: "/use-cases/analytics" },
      ],
    },
    {
      title: "Company",
      items: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white px-5 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Logo section - always on top for mobile */}
        <div className="flex justify-center sm:justify-start mb-8">
          <Logo variant="white" />
        </div>

        {/* Footer sections grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
                {section.title}
              </h3>
              <nav className="flex flex-col space-y-2">
                {section.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors cursor-pointer"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Copyright - Add this for completeness */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center sm:text-left">
          <p className="text-gray-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} Axdone 360.All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

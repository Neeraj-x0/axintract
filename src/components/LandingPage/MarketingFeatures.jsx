import React from 'react';

const MarketingFeaturesGrid = () => {
  const features = [
    {
      title: 'Create Lists, Forms, and Pages',
      description: 'Create Lists to manually group customers. Use Forms and Lead Magnet Landing Pages to easily add subscribers to your Lists.'
    },
    {
      title: 'Segment Customers on-the-fly',
      description: 'Create your Segments once and Engage automatically adds and removes customers as necessary.'
    },
    {
      title: 'Create complex engagement workflows',
      description: 'Drip campaigns? We got you. But you can also create complex workflows based on if/else conditions and user data.'
    },
    {
      title: 'Send multi-channel marketing campaigns',
      description: 'Send marketing campaigns through email, SMS, push notifications and in-app messaging.'
    },
    {
      title: 'Personalize your engagement with customer data',
      description: 'Use customer attributes and event data to personalize content of messages your customers get.'
    },
    {
      title: 'Realtime analytics',
      description: 'See how your customers engage with your campaigns. Track delivery, opens, clicks, failures, and complaints in realtime.'
    },
    {
      title: 'Embed Live Chat on your website',
      description: 'Proactively engage your site visitors in real-time.'
    },
    {
      title: 'Create Shared Inboxes',
      description: 'Oversee your team-customer communication from a central inbox.'
    },
    {
      title: 'Create your Help Center',
      description: "Build a resource center that answers customer questions even when you're offline."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-800 px-4">
        All you need to send the right message at the right time
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {features.map((feature, index) => (
          <div 
            key={feature.title} 
            className="bg-white p-5 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4">
              {feature.title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingFeaturesGrid;
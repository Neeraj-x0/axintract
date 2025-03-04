import React from "react";
import { Unlink, ChartNoAxesCombined, Send } from "lucide-react";

const Features = () => {
  const quote = [
    {
      title: "Connect",
      description:
        "Connect user data with services like PostHog, Twilio Segment, Make, RudderStack, Stripe, and more. Use our APIs and SDKs to track attributes and events wherever your customers are.",
      icon: <Unlink className="text-[#1677ff] w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      title: "Nurture",
      description:
        "Get a detailed overview of user attributes and see their journey through your application. Create dynamic segments based on their attributes, events they perform or did not perform, campaigns, and more.",
      icon: <ChartNoAxesCombined className="text-[#1677ff] w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      title: "Engage",
      description:
        "Put your engagement on autopilot. Trigger dynamic workflows to send targeted customer engagement for onboarding, activation, and retention.",
      icon: <Send className="text-[#1677ff] w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  return (
    <div className="px-4 py-8 sm:p-8 lg:p-12 text-neutral-800 flex items-center justify-center">
      <div className="relative mx-auto my-0 w-full max-w-[925px]">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold font-inter mx-auto text-neutral-800 mb-6 sm:mb-8 md:mb-12 max-w-[340px] sm:max-w-[500px] md:max-w-[700px]">
          Automate your engagement for Onboarding, Conversion and Retention
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {quote.map((item, index) => (
            <div
              key={item.title}
              className="bg-white rounded-lg p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-base sm:text-lg font-semibold">{item.title}</span>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
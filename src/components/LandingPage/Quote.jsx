import React from "react";
import PatternSvg from "../../../public/Pattern.svg";
import Image from "next/image";

const Quote = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 text-white bg-[#231E32] min-h-[50vh] flex items-center justify-center relative overflow-hidden">
      <div className="relative mx-auto my-0 w-full z-10 py-8 sm:py-12 md:py-16">
        <div className="text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light w-full sm:w-5/6 md:w-4/5 lg:w-2/3 font-inter mx-auto mb-4 sm:mb-6 md:mb-8">
          "Another reason we decided to use Engage was the possibility of having
          an all-in-one customer engagement system where we could send email,
          SMS, and push notifications to customers without using multiple
          marketing tools."
        </div>
        <div className="text-left text-base sm:text-lg mx-auto w-full sm:w-5/6 md:w-4/5 lg:w-2/3 items-start flex flex-col sm:flex-row sm:items-center">
          <span className="font-medium">- Tolu Olawumi</span>
          <span className="text-gray-300 sm:ml-2 mt-1 sm:mt-0">
            Head of Marketing, Squareme
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 w-full sm:w-5/6 md:w-4/5 lg:w-2/3 opacity-50 sm:opacity-70 md:opacity-80 lg:opacity-100">
        <Image src={PatternSvg} alt="Pattern" className="w-full" priority />
      </div>
    </div>
  );
};

export default Quote;
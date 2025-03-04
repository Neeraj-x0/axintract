import Image from "next/image";
import React from "react";

const Segmentation = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-8 md:py-12 bg-white text-neutral-800">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center w-full max-w-7xl mx-auto">
        {/* Left Section: Text Content */}
        <div className="flex flex-col w-full md:w-2/5 lg:w-1/3 gap-4 md:gap-6 lg:gap-8">
          <div className="bg-[#D9E0FE] px-3 py-2 w-fit rounded-lg self-start">
            <span className="text-sm md:text-base lg:text-lg font-light text-[#344898]">
              SEGMENTATION
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-left">
            Best-in-class Customer Segmentation
          </h1>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base lg:text-lg text-left">
              Automatically group your customers based on their attributes,
              events, and actions using an intuitive segment.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-left">
              Send targeted campaigns to your Segments or use them to trigger
              dynamic workflows and campaigns across email, SMS, and push
              notifications.
            </p>
          </div>
        </div>

        {/* Right Section: Video */}
        <div className="w-full md:w-3/5 lg:w-2/3 mt-6 md:mt-0">
          <iframe
            src="https://player.cloudinary.com/embed/?public_id=kjmlrxfnuhlhr0xvl8dg&cloud_name=dguddaxjl&player[autoplay]=true&player[controls]=false&player[hideContextMenu]=true&player[seekThumbnails]=false&source[sourceTypes][0]=hls"
            className="w-full aspect-video rounded-xl shadow-lg"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            title="Dashboard Preview Video"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Segmentation;
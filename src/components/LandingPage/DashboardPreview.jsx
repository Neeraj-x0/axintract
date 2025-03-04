import React from "react";
import Image from "next/image";

function DashboardPreview() {
  return (
    <div className="p-8 max-sm:p-4">
      <div className="relative mx-auto flex flex-col items-center justify-center my-0 w-full">
        <iframe
          src="https://player.cloudinary.com/embed/?public_id=kjmlrxfnuhlhr0xvl8dg&cloud_name=dguddaxjl&player[autoplay]=true&player[controls]=false&player[hideContextMenu]=true&player[seekThumbnails]=false&source[sourceTypes][0]=hls"
          className="w-full md:w-4/5 lg:w-3/4 xl:w-3/6 h-auto aspect-video rounded-t-xl"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          title="Dashboard Preview Video"
        ></iframe>
        <div className="w-full md:w-5/6 lg:w-4/5 xl:w-4/6 border-b border-solid border-b-gray-200 mt-2"></div>
      </div>
    </div> 
  );
}

export default DashboardPreview;
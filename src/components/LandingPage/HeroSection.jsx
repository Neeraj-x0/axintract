"use client";
import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="">
      <div className="text-center w-full">
        <div className="w-full">
          All-in-one Customer Engagement and Automation Tool for SaaS
        </div>
        <div className="mb-8 text-xl leading-8 text-neutral-900 max-md:text-lg max-md:leading-7 max-sm:px-4 max-sm:py-0 max-sm:text-base max-sm:leading-6">
          Send personalized messages, create automated message workflows, and
          support customers via email, SMS, push notifications, website banners,
          live chat, and more.
        </div>

        <Button
          variant="solid"
          onClick={() => {
            router.push("/sign-up");
          }}
        >
          Get Started for free →
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;

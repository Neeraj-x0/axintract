import React from 'react';
import Button from './Button';
import Link from 'next/link';
function Hero() {
  return (
    <section className="px-0 py-10 mx-auto my-0 max-w-[921px]">
      <div className="text-center">
        <h1 className="mb-8 text-5xl font-bold leading-[62.4px] text-neutral-900 max-md:text-4xl max-md:leading-10 max-sm:px-4 max-sm:py-0 max-sm:text-3xl max-sm:leading-10">
          All-in-one Customer Engagement and Automation Tool for SaaS
        </h1>
        <p className="mb-8 text-lg leading-8 text-neutral-900 w-4/5 mx-auto max-md:text-lg max-md:leading-7 max-sm:px-4 max-sm:py-0 max-sm:text-base max-sm:leading-6">
          Send personalized messages, create automated message workflows,
          and support customers via email, SMS, push notifications, website
          banners, live chat, and more.
        </p>
        <Button variant="solid">
        <Link href="/sign-up">Get Started for free →</Link>
        </Button>
      </div>
    </section>
  );
}

export default Hero;
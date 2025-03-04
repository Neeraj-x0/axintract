'use client';
import React from 'react';
import Header from '../components/LandingPage/Header';
import Hero from '../components/LandingPage/Hero';
import DashboardPreview from '../components/LandingPage/DashboardPreview';
import Companies from '../components/LandingPage/Companies';
import Feature from '../components/LandingPage/Feature';
import Segmentation from '../components/LandingPage/Segmentation';
import Quote from '../components/LandingPage/Quote';
import MarketingFeatures from '../components/LandingPage/MarketingFeatures';
import Footer from '../components/LandingPage/Footer';

function CustomerEngagement() {
  return (
    <div className="w-full bg-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <Header />
      <Hero />
      <DashboardPreview />
      <Companies />
      <Feature />
      <Segmentation />
      <Quote />
      <MarketingFeatures />
      <Footer />

    </div>
  );
}

export default CustomerEngagement;
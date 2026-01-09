"use client";

import React from "react";
import HeroSection from "@/components/ui/hero-section-2";

const Hero: React.FC = () => {
  return (
    <HeroSection
      title={
        <>
          Empower Your <br />
          <span className="text-primary">Tech Journey</span>
        </>
      }
      subtitle="ACM RVCE brings you opportunities to learn, innovate, and connect with the global tech community. Join us to accelerate your growth in computing and shape the future of technology."
      callToAction={{
        text: "BECOME A MEMBER",
        href: "https://forms.google.com/acm-rvce-membership",
      }}
      backgroundImage="/landing/acm-landing.jpg"
      contactInfo={{
        website: "acm.rvce.edu.in",
        phone: "+91 (080) 4089-8989",
        address: "RV College of Engineering, Bengaluru",
      }}
    />
  );
};

export default Hero;

"use client";

import AboutACM from "@/components/about/about-acm";
import AboutRVCE from "@/components/about/about-rvce";
import AboutStats from "@/components/about/about-stats";

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <AboutACM />
      <AboutRVCE />
      <AboutStats />
    </div>
  );
}

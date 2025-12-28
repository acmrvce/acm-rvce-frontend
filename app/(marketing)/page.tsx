import React from "react";
import Hero from "@/components/landing/hero/hero";
import EventsAndFAQs from "@/components/landing/events-faq/events-faqs";
import Expectations from "@/components/expectations/Expectations";
import { client } from "@/sanity/lib/client";
import { topEventsQuery } from "@/sanity/lib/queries";
import { faqs } from "@/lib/config/eventsFAQS";
import DomainsBento from "@/components/landing/domains/domains-bento";
import ProjectVelocity from "@/components/landing/projects/project-velocity";
import ExpandableWorkflow from "@/components/landing/process/expandable-workflow";

import { UpcomingEvents } from "@/components/events/upcoming-events";
import { FAQSection } from "@/components/events/FAQSection";
import GithubHeatmap from "@/components/landing/github-activity/github-heatmap";

const Page = async () => {
  const events = await client.fetch(topEventsQuery);

  return (
    <React.Fragment>
      <Hero />
      <UpcomingEvents events={events} />
      <DomainsBento />  
      {/* <GithubHeatmap /> */}
      <ProjectVelocity />
      <ExpandableWorkflow />
      {/* <EventsAndFAQs events={events} faqs={faqs} /> */}
      {/* <Expectations /> */}
      <FAQSection 
        faqs={faqs} 
      />
    </React.Fragment>
  );
};

export default Page;

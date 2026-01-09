export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FAQConfig {
  title: string;
  description: string;
  categories?: string[];
  items: FAQItem[];
}

export const faqConfig: FAQConfig = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to commonly asked questions about ACM RVCE and our events.",
  categories: ["General", "Membership", "Events", "Technical"],
  items: [
    {
      question: "How can I join ACM RVCE?",
      answer:
        "You can join us by attending our orientation sessions, signing up for membership during registration drives, or contacting any of our team members.",
      category: "Membership",
    },
    {
      question: "How do I become a member?",
      answer:
        "To become a member, simply fill out the membership form available on our website. Once submitted, our team will review your application and get back to you with further details.",
      category: "Membership",
    },
    {
      question: "When do you conduct events?",
      answer:
        "We regularly organize workshops, hackathons, and tech talks throughout the academic year. Check our events page or follow our social media for updates.",
      category: "Events",
    },
    {
      question: "Can non-members attend events?",
      answer:
        "Many of our events are open to all students, while some premium workshops and competitions are exclusive to members. Each event will specify eligibility.",
      category: "Events",
    },
    {
      question: "What kind of projects does ACM RVCE work on?",
      answer:
        "Our members work on a diverse range of projects including web development, mobile applications, AI/ML, IoT, and competitive programming challenges.",
      category: "Technical",
    },
    {
      question: "How can I propose a workshop or event idea?",
      answer:
        "We welcome ideas from members! You can submit your proposal through our contact form, or speak directly with any of our core team members.",
      category: "General",
    },
    {
      question: "Are there leadership opportunities within ACM RVCE?",
      answer:
        "Absolutely! Active members have opportunities to lead specific events, projects, or even join the core committee based on their involvement and contributions.",
      category: "Membership",
    },
    {
      question: "How can freshmen get involved?",
      answer:
        "Freshmen are encouraged to join as members, attend our beginner-friendly workshops, and participate in mentorship programs specifically designed for newcomers.",
      category: "General",
    },
    {
      question: "Does ACM RVCE help with internship or job placements?",
      answer:
        "While we're not a placement cell, our network, skills development, and industry connections often help members secure internships and job opportunities.",
      category: "General",
    },
    {
      question: "How can I contribute to ACM RVCE's projects?",
      answer:
        "Check our projects page, join our coding sessions, or reach out to project leads directly. We always welcome contributors with various skill levels.",
      category: "Technical",
    },
  ],
};

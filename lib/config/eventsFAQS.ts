export interface Event {
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const events: Event[] = [
  {
    title: "CodeJam 5.0",
    date: "April 15, 2025",
    category: "Competition",
    description:
      "Our flagship coding competition with challenging algorithmic problems and exciting prizes.",
    image: "./home/img1.jpg",
  },
  {
    title: "TechTalks Series",
    date: "March 21, 2025",
    category: "Workshop",
    description:
      "Industry experts share insights on AI, cloud computing, and blockchain technologies.",
    image: "./home/img2.jpg",
  },
  {
    title: "Hackoverflow 2025",
    date: "February 8, 2025",
    category: "Hackathon",
    description:
      "A 24-hour hackathon to build innovative solutions to real-world problems.",
    image: "./home/img3.jpg",
  },
  {
    title: "Technical Paper Presentation",
    date: "January 12, 2025",
    category: "Academic",
    description:
      "Present your research and win recognition from academic and industry experts.",
    image: "./home/img0.jpg",
  },
];

export const faqs: FAQ[] = [
  {
    question: "What is ACM RVCE?",
    answer:
      "ACM RVCE is the student chapter of the Association for Computing Machinery (ACM) at RV College of Engineering. We organize events, workshops, and provide resources to help students excel in computer science and technology fields.",
  },
  {
    question: "How can I become a member of ACM RVCE?",
    answer:
      "You can become a member by filling out the membership form on our website. Membership is open to all RVCE students interested in computing and technology.",
  },
  {
    question: "What events does ACM RVCE organize?",
    answer:
      "ACM RVCE organizes coding competitions, hackathons, workshops, industry talks, and career guidance sessions. Flagship events include CodeJam, Hackoverflow, and TechTalks.",
  },
  {
    question: "Are there opportunities to contribute to ACM RVCE?",
    answer:
      "Absolutely! You can volunteer for event organization, content creation, or join our core committee during elections.",
  },
  {
    question: "How can ACM RVCE help with my career?",
    answer:
      "ACM RVCE offers resume building opportunities, job postings, networking events, interview workshops, and access to the ACM Digital Library.",
  },
];

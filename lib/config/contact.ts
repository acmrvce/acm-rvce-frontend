export interface ContactFormField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder: string;
  required: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}

export interface ContactConfig {
  title: string;
  description: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  form: {
    title: string;
    description: string;
    fields: ContactFormField[];
    submitButton: {
      text: string;
    };
    successMessage: string;
    errorMessage: string;
  };
  contactInfo: {
    title: string;
    items: Array<{
      icon: string;
      label: string;
      value: string;
      link?: string;
    }>;
  };
  mapEmbed?: string;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  animationSettings: {
    staggerChildren: number;
    listItemDelay: number;
    formFieldsDelay: number;
    contactInfoDelay: number;
  };
}

export const contactConfig: ContactConfig = {
  title: "Contact ACM RVCE",
  description:
    "Get in touch with the ACM RVCE team for any queries or feedback",
  hero: {
    title: "Contact Us",
    subtitle: "We'd love to hear from you",
    image: "/about/about-acm-image.jpg",
  },
  form: {
    title: "Send us a message",
    description:
      "Got a technical issue? Want to send us feedback about a feature? Need details about any event? Let us know.",
    fields: [
      {
        id: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      {
        id: "email",
        label: "Your email",
        type: "email",
        placeholder: "example@rvce.edu.in",
        required: true,
      },
      {
        id: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter your phone number",
        required: true,
        pattern: "[0-9]{10}",
      },
      {
        id: "subject",
        label: "Subject",
        type: "text",
        placeholder: "How can we help you?",
        required: true,
        minLength: 5,
        maxLength: 100,
      },
      {
        id: "message",
        label: "Your message",
        type: "textarea",
        placeholder: "Leave a comment...",
        required: true,
        minLength: 10,
        maxLength: 500,
      },
    ],
    submitButton: {
      text: "Send Message",
    },
    successMessage: "Thank you! Your message has been sent successfully.",
    errorMessage: "Oops! Something went wrong. Please try again later.",
  },
  contactInfo: {
    title: "Our Contact Information",
    items: [
      {
        icon: "MapPin",
        label: "Address",
        value:
          "R.V. College of Engineering, Mysore Road, Bengaluru, Karnataka 560059",
        link: "https://maps.google.com/?q=R.V.+College+of+Engineering,+Mysore+Road,+Bengaluru",
      },
      {
        icon: "Mail",
        label: "Email",
        value: "acm@rvce.edu.in",
        link: "mailto:acm@rvce.edu.in",
      },
      {
        icon: "Phone",
        label: "Chair Contact",
        value: "+91 98765 43210",
        link: "tel:+919876543210",
      },
      {
        icon: "Phone",
        label: "Vice Chair Contact",
        value: "+91 98765 43211",
        link: "tel:+919876543211",
      },
    ],
  },
  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/company/acm-rvce",
      icon: "Linkedin",
    },
    {
      platform: "GitHub",
      url: "https://github.com/acm-rvce",
      icon: "Github",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/acm_rvce",
      icon: "Instagram",
    },
  ],
  animationSettings: {
    staggerChildren: 0.1,
    listItemDelay: 0.2,
    formFieldsDelay: 0.05,
    contactInfoDelay: 0.1,
  },
};

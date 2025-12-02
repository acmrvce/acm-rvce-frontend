import React from "react";
import { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import MapEmbed from "@/components/contact/MapEmbed";
// import FAQSection from '@/components/contact/FAQSection';
import NewsletterSignup from "@/components/contact/NewsletterSignup";
import { contactConfig } from "@/lib/config/contact";
// import { faqConfig } from '@/lib/config/faq';

export const metadata: Metadata = {
  title: contactConfig.title,
  description: contactConfig.description,
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-black">
      {/* Hero section */}
      <ContactHero
        title={contactConfig.hero.title}
        subtitle={contactConfig.hero.subtitle}
        image="/gallery/img1.jpg"
        className="relative z-10"
      />

      {/* Main Content Section */}
      <section className="relative z-10">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.03] dark:opacity-[0.05]"></div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Let's Connect
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Have questions about ACM RVCE? We're here to help. Reach out to us
              and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Left Column - Contact Form */}
            <div>
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {contactConfig.form.title}
                </h3>
                <div className="h-1 w-16 bg-blue-600 rounded-full mb-4"></div>
                <p className="text-muted-foreground">
                  {contactConfig.form.description}
                </p>
              </div>

              <ContactForm
                fields={contactConfig.form.fields}
                submitButtonText={contactConfig.form.submitButton.text}
                successMessage={contactConfig.form.successMessage}
                errorMessage={contactConfig.form.errorMessage}
              />
            </div>

            {/* Right Column - Contact Info & Map */}
            <div className="space-y-8">
              <ContactInfo
                title={contactConfig.contactInfo.title}
                items={contactConfig.contactInfo.items}
                socialLinks={contactConfig.socialLinks}
              />

              {contactConfig.mapEmbed && (
                <MapEmbed
                  embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.599340738658!2d77.49692307583591!3d12.92398338746083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3e468d7d493d%3A0x6e8abd2188934b12!2sR.V.%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1712233235427!5m2!1sen!2sin"
                  className="h-[300px] md:h-[350px]"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

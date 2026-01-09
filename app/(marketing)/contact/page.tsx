"use client";

import React from "react";
import { Metadata } from "next";
import { motion } from "framer-motion";
import ContactHero from "@/components/contact/ContactHero";
import MultiStepContactForm from "@/components/contact/MultiStepContactForm";
import ImprovedContactInfo from "@/components/contact/ImprovedContactInfo";
import MapEmbed from "@/components/contact/MapEmbed";
import { contactConfig } from "@/lib/config/contact";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-black overflow-x-hidden">
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

        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10">
          {/* Section Header */}

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="max-w-4xl mx-auto mb-20 sm:mb-28 md:mb-32"
          >
            <div className="mb-8 text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
                {contactConfig.form.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                {contactConfig.form.description}
              </p>
            </div>

            <MultiStepContactForm />
          </motion.div>

          {/* Contact Info & Map Section */}
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mb-8 text-center"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
                Get In Touch
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Find us through multiple channels or visit our campus
              </p>
            </motion.div>

            {/* Full Width Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mb-6 sm:mb-8"
            >
              <ImprovedContactInfo
                title={contactConfig.contactInfo.title}
                items={contactConfig.contactInfo.items}
                socialLinks={contactConfig.socialLinks}
              />
            </motion.div>

            {/* Full Width Map */}
            {contactConfig.mapEmbed && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="mt-6 sm:mt-8"
              >
                <MapEmbed
                  embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.599340738658!2d77.49692307583591!3d12.92398338746083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3e468d7d493d%3A0x6e8abd2188934b12!2sR.V.%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1712233235427!5m2!1sen!2sin"
                  className="h-[350px] sm:h-[400px] md:h-[450px] rounded-xl overflow-hidden shadow-lg"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

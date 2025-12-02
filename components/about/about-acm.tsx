"use client";

import { motion } from "framer-motion";
import { acmSectionConfig } from "@/lib/config/about-page-config";
import {
  Code2,
  Users,
  Lightbulb,
  Shield,
  Rocket,
  Palette,
  Building2,
} from "lucide-react";

const FontStyles = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-primary { font-family: 'Manrope', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', monospace; }
  `,
    }}
  />
);

const GridBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
  </div>
);

const focusIcons: { [key: string]: any } = {
  "Competitive Programming": Code2,
  "Web and App Development": Rocket,
  "Machine Learning and AI": Lightbulb,
  Cybersecurity: Shield,
  "Tech Talks and Workshops": Users,
  "Product Design": Palette,
};

export default function AboutACM() {
  return (
    <section className="relative w-full bg-white dark:bg-[#050505] text-neutral-900 dark:text-white font-primary pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
      <FontStyles />
      <GridBackground />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Page Header - What is ACM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 px-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md mb-4 md:mb-6">
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            <span className="text-[10px] font-tech uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              About Us
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] text-neutral-900 dark:text-white mb-6 md:mb-8">
            What is <span className="text-blue-600">ACM</span>?
          </h1>

          <div className="max-w-3xl space-y-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <p>
              The{" "}
              <strong className="text-neutral-900 dark:text-white">
                Association for Computing Machinery (ACM)
              </strong>{" "}
              is the world's largest educational and scientific computing
              society, uniting computing educators, researchers and
              professionals to inspire dialogue, share resources and address the
              field's challenges.
            </p>
            <p>
              ACM strengthens the profession's collective voice through strong
              leadership, promotion of the highest standards, and recognition of
              technical excellence. ACM supports the professional growth of its
              members by providing opportunities for life-long learning, career
              development, and professional networking.
            </p>
          </div>
        </motion.div>

        {/* Section Header - About Our Chapter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md mb-6">
            <Building2 className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span className="text-[10px] font-tech uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Our Chapter
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95] text-neutral-900 dark:text-white mb-6">
            ACM RVCE Student Chapter
          </h2>

          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-sky-500" />
        </motion.div>

        {/* Hero Team Photo - Full Width Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mb-12 md:mb-20"
        >
          {/* Ambient Glow behind photo */}
          <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-violet-500/20 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-violet-500/10 rounded-2xl md:rounded-3xl blur-2xl md:blur-3xl" />

          {/* Photo Container */}
          <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-neutral-200 dark:border-white/15 bg-neutral-100 dark:bg-neutral-900 shadow-2xl">
            <img
              src={acmSectionConfig.image.src}
              alt={acmSectionConfig.image.alt}
              className="w-full h-auto"
            />

            {/* Subtle overlay gradient from bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 via-transparent to-transparent pointer-events-none" />

            {/* Top shine effect */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            {/* Label overlay - Responsive */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 bg-gradient-to-t from-neutral-900/90 via-neutral-900/60 to-transparent backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-0">
                <div>
                  <p className="text-[8px] sm:text-[10px] font-tech uppercase tracking-widest text-neutral-400 mb-1 md:mb-2">
                    Our Core Team
                  </p>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                    Leaders & Innovators
                  </h3>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-left sm:text-right">
                    <p className="text-2xl sm:text-3xl font-bold text-white font-tech">
                      150+
                    </p>
                    <p className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">
                      Members
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Section - Description & Focus Areas */}
        <div className="max-w-5xl mx-auto space-y-16 px-4">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="space-y-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {acmSectionConfig.descriptionParagraphs.map(
                (paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

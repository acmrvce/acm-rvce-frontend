"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { rvceSectionConfig } from "@/lib/config/about-page-config";
import { Trophy, Star, Award, TrendingUp } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

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

// Spotlight Card Component (like domains-bento)
const SpotlightCard = ({
  children,
  gradient,
}: {
  children: React.ReactNode;
  gradient: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 transition-all duration-500 hover:border-neutral-300 dark:hover:border-white/20 p-8"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />

      {/* Gradient Background */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br",
          gradient
        )}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default function AboutRVCE() {
  return (
    <section className="relative w-full bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-white font-primary py-20 md:py-32 overflow-hidden">
      <FontStyles />
      <GridBackground />

      {/* Accent Glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md mb-4 md:mb-6">
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            <span className="text-[10px] font-tech uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {rvceSectionConfig.title}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-[0.95] text-neutral-900 dark:text-white mb-4 md:mb-6 px-4">
            {rvceSectionConfig.heading}
          </h2>

          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-sky-500" />
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-12 md:mb-20 max-w-3xl mx-auto"
        >
          <div className="absolute -inset-4 md:-inset-8 bg-blue-500/20 dark:bg-blue-500/10 rounded-2xl md:rounded-3xl blur-2xl md:blur-3xl" />
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl md:rounded-2xl border border-neutral-200 dark:border-white/15 bg-neutral-100 dark:bg-neutral-900 shadow-xl">
            <img
              src={rvceSectionConfig.image.src}
              alt={rvceSectionConfig.image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-12 md:mb-20 px-4"
        >
          <div className="space-y-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {rvceSectionConfig.descriptionParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Achievements Grid with Spotlight Cards */}
        <div className="max-w-5xl mx-auto px-4">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 font-tech text-center text-neutral-900 dark:text-white"
          >
            {rvceSectionConfig.achievements.subheading}
          </motion.h3>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {rvceSectionConfig.achievements.list.map((achievement, index) => {
              const icons = [Trophy, Star, Award, TrendingUp];
              const gradients = [
                "from-blue-500/5 to-transparent",
                "from-indigo-500/5 to-transparent",
                "from-violet-500/5 to-transparent",
                "from-purple-500/5 to-transparent",
              ];
              const Icon = icons[index % icons.length];
              const gradient = gradients[index % gradients.length];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <SpotlightCard gradient={gradient}>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center transition-transform group-hover:scale-110 duration-500">
                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed pt-2">
                        {achievement}
                      </p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

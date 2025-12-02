"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Users, GraduationCap, UserCheck } from "lucide-react";
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

const acmStats = [
  {
    value: "500+",
    label: "Alumni Members",
    icon: GraduationCap,
    gradient: "from-blue-500/10 to-transparent",
  },
  {
    value: "150+",
    label: "Active Members",
    icon: Users,
    gradient: "from-indigo-500/10 to-transparent",
  },
  {
    value: "12",
    label: "Faculty Advisors",
    icon: UserCheck,
    gradient: "from-violet-500/10 to-transparent",
  },
];

export default function AboutStats() {
  return (
    <section className="relative w-full bg-white dark:bg-[#050505] text-neutral-900 dark:text-white font-primary py-20 md:py-32 overflow-hidden border-t border-neutral-200 dark:border-white/10">
      <FontStyles />
      <GridBackground />

      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-3 md:mb-4">
            Our Community
          </h2>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            A thriving community of students, alumni, and faculty driving
            innovation at ACM RVCE
          </p>
        </motion.div>

        {/* Stats Grid with Spotlight Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
          {acmStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <SpotlightCard gradient={stat.gradient}>
                  {/* Icon */}
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-blue-600/10 dark:bg-blue-500/10 transition-transform group-hover:scale-110 duration-500">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  {/* Value */}
                  <div className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-2 font-tech">
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-tech">
                    {stat.label}
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500" />
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/projects"
              className="group relative h-12 px-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-semibold flex items-center justify-center gap-2 overflow-hidden hover:scale-105 transition-transform shadow-lg shadow-neutral-900/20 dark:shadow-none"
            >
              <span className="relative z-10">Explore Our Projects</span>
            </a>

            <a
              href="/events"
              className="h-12 px-8 rounded-full border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-900 dark:text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <span>Upcoming Events</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

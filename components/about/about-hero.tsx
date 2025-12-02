"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

const FontStyles = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500&display=swap');
    .font-primary { font-family: 'Manrope', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', monospace; }
  `,
    }}
  />
);

const GridBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px)] bg-[size:60px_100%]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:100%_60px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
  </div>
);

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-white dark:bg-[#050505] text-neutral-900 dark:text-white font-primary overflow-hidden pt-20"
    >
      <FontStyles />
      <GridBackground />

      {/* Ambient Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-100 dark:bg-indigo-900/10 rounded-full blur-[80px] pointer-events-none mix-blend-multiply dark:mix-blend-normal opacity-50 dark:opacity-100" />

      <div className="relative z-10 flex flex-col items-center max-w-[1400px] mx-auto px-6">
        {/* Typography */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto mt-8 mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md"
          >
            <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-tech uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              About Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] text-neutral-900 dark:text-white"
          >
            Empowering <br />
            <span className="text-blue-600">Innovators</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-500 dark:text-neutral-400 font-light leading-relaxed"
          >
            We're a community of passionate technologists, designers, and
            innovators at RV College of Engineering. Together, we're shaping the
            future of computing, one project at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-3 mb-6"
          >
            <a
              href="/register"
              className="group relative h-10 px-6 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-semibold flex items-center gap-2 overflow-hidden hover:scale-105 transition-transform shadow-lg shadow-neutral-900/20 dark:shadow-none"
            >
              <span className="relative z-10">Join Our Community</span>
              <ArrowDown className="relative z-10 w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="/contact"
              className="h-10 px-6 rounded-full border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-900 dark:text-white text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <span>Get in Touch</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="w-full relative z-20 max-w-[1200px]"
        >
          <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[60%] h-[200px] bg-indigo-500/20 dark:bg-white/5 blur-[80px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-normal" />
          <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[90%] h-[200px] bg-blue-100/50 dark:bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

          <motion.div
            initial={{ opacity: 0, rotateX: 15, scale: 0.95 }}
            animate={{ opacity: 1, rotateX: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="relative aspect-[2.4/1] w-full overflow-hidden rounded-t-2xl border-x border-t border-neutral-200 dark:border-white/15 bg-neutral-100 dark:bg-neutral-900 shadow-2xl shadow-neutral-200/50 dark:shadow-black/50"
          >
            <img
              src="/about/about-acm-image.jpg"
              alt="ACM RVCE Community"
              className="absolute inset-0 w-full h-full object-cover opacity-90 dark:opacity-75"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#050505] dark:via-transparent dark:to-transparent opacity-90 dark:opacity-90" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-900/10 dark:via-white/50 to-transparent opacity-50" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden whitespace-nowrap py-3 border-t border-neutral-200 dark:border-white/5 bg-white/80 dark:bg-black/40 backdrop-blur-sm">
        <motion.div
          className="flex min-w-full gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-[10px] font-tech uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-600"
            >
              Innovation • Collaboration • Excellence{" "}
              <span className="h-0.5 w-0.5 rounded-full bg-neutral-400 dark:bg-neutral-700" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, Play, Users, Sparkles, Zap } from "lucide-react";

// --- Font Styles ---
const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-primary { font-family: 'Manrope', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', monospace; }
  `}} />
);

// --- Props Interface ---
interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  contactInfo?: {
    website: string;
    phone: string;
    address: string;
  };
}


// --- Spotlight Text ---
const SpotlightText = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div 
            className={cn("relative group overflow-hidden", className)}
            onMouseMove={onMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            200px circle at ${mouseX}px ${mouseY}px,
                            rgba(255, 255, 255, 0.15),
                            transparent 80%
                        )
                    `,
                }}
            />
            {children}
        </div>
    )
}


// --- Main Component ---
const HeroSection = ({ title, subtitle, callToAction, backgroundImage }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Removed opacity and scale transformations to keep image visible
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] w-full bg-white dark:bg-[#050505] text-neutral-900 dark:text-white font-primary overflow-hidden pt-32 pb-20"
    >
      <FontStyles />

      {/* 1. Dynamic Background (Aurora) - Adapted for Light/Dark */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[40vw] h-[40vw] bg-purple-200/40 dark:bg-purple-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
        <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-blue-200/40 dark:bg-blue-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-200/40 dark:bg-indigo-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
        {/* Noise Texture - Subtle for both */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* 2. Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16 relative">
            
            {/* Badge */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md mb-8 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-default"
            >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-tech font-medium tracking-widest uppercase text-neutral-600 dark:text-neutral-300">
                    Accepting New Members
                </span>
            </motion.div>

            {/* Headline with Staggered Reveal */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.0] mb-6 text-neutral-900 dark:text-white">
                {title}
            </h1>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto mb-10"
            >
                {subtitle}
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap items-center justify-center gap-4"
            >
                <button className="group relative h-12 px-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-bold flex items-center gap-2 overflow-hidden hover:scale-105 transition-transform shadow-lg dark:shadow-none">
                    <span className="relative z-10">{callToAction.text}</span>
                    <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {/* Hover Fill */}
                    <div className="absolute inset-0 bg-blue-600 dark:bg-blue-50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </button>

                <button className="h-12 px-8 rounded-full border border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-900 dark:text-white font-medium flex items-center gap-2 transition-all hover:scale-105">
                    <Play className="w-4 h-4 fill-current" />
                    <span>Explore</span>
                </button>
            </motion.div>
        </div>

        {/* 3. The 3D Visual Stage */}
        <div className="w-full relative perspective-[1200px] group">
            {/* <ThreeDCard className="w-full"> */}
                <motion.div
                    style={{ y }} // Only parallax movement, no opacity fade
                    className="relative w-full aspect-[21/9] md:aspect-[2.4/1] rounded-[2rem] overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900/50 shadow-2xl"
                >
                    {/* Main Image */}
                    <Image 
                        src={backgroundImage} 
                        alt="ACM Community"
                        fill
                        className="object-cover"
                        priority
                    />
                    
                    {/* Overlay Gradient (Cinema style) */}
                    <div className="absolute inset-0" />
                    
                    {/* Screen Glare Effect */}
                    <div className="absolute -inset-full pointer-events-none" />

                    {/* Floating Widgets (Parallax inside the 3D card) */}
                    {/* Widget 1: Stats */}
                    {/* <motion.div 
                        className="absolute bottom-8 left-8 p-4 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-neutral-200 dark:border-white/10 rounded-2xl flex items-center gap-4 shadow-xl translate-z-12"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-neutral-900 dark:text-white">500+ Members</div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-tech uppercase">Active Community</div>
                        </div>
                    </motion.div> */}

                    {/* Widget 2: Status */}
                    {/* <motion.div 
                        className="absolute top-8 right-8 px-4 py-2 bg-emerald-100/80 dark:bg-emerald-500/20 backdrop-blur-md border border-emerald-200 dark:border-emerald-500/30 rounded-full flex items-center gap-2 shadow-xl translate-z-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400" />
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-200 uppercase tracking-wider">System Operational</span>
                    </motion.div> */}

                </motion.div>
            {/* </ThreeDCard> */}
            
            {/* Background Glow under the card */}
            <div className="absolute -inset-4 bg-blue-500/20 blur-3xl -z-10 rounded-[3rem] opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  BrainCircuit, 
  Smartphone, 
  ShieldCheck, 
  Cpu, 
  Palette, 
  ArrowRight,
  Terminal,
  Globe,
  Github,
  Star,
  ChevronRight
} from "lucide-react";

// --- Font Styles ---
const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-primary { font-family: 'Manrope', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', monospace; }
  `}} />
);

// --- Data ---
const domains = [
  {
    id: "01",
    title: "AI & Machine Intelligence",
    subtitle: "Predictive Systems",
    description: "Building the brains of tomorrow through deep learning, neural networks, and generative AI research. We explore the cutting edge of what machines can learn.",
    icon: BrainCircuit,
    color: "text-blue-500",
    bgGradient: "from-blue-500/20 to-transparent",
    border: "group-hover:border-blue-500/50"
  },
  {
    id: "02",
    title: "Full Stack Web",
    subtitle: "Digital Architectures",
    description: "Crafting immersive, high-performance web experiences. We master modern frameworks, edge computing, and scalable cloud infrastructures.",
    icon: Globe,
    color: "text-emerald-500",
    bgGradient: "from-emerald-500/20 to-transparent",
    border: "group-hover:border-emerald-500/50"
  },
  {
    id: "03",
    title: "App Development",
    subtitle: "Mobile Ecosystems",
    description: "Engineering native and cross-platform solutions. We put powerful, buttery-smooth applications into the palms of millions.",
    icon: Smartphone,
    color: "text-orange-500",
    bgGradient: "from-orange-500/20 to-transparent",
    border: "group-hover:border-orange-500/50"
  },
  {
    id: "04",
    title: "Cybersecurity",
    subtitle: "Network Defense",
    description: "Securing the digital frontier. Our ethical hackers and analysts dive deep into cryptography, network defense, and vulnerability assessment.",
    icon: ShieldCheck,
    color: "text-purple-500",
    bgGradient: "from-purple-500/20 to-transparent",
    border: "group-hover:border-purple-500/50"
  },
  {
    id: "05",
    title: "IoT & Embedded",
    subtitle: "Connected Hardware",
    description: "Bridging the physical and digital worlds. We hack hardware, program sensors, and automate the environment around us.",
    icon: Cpu,
    color: "text-cyan-500",
    bgGradient: "from-cyan-500/20 to-transparent",
    border: "group-hover:border-cyan-500/50"
  },
  {
    id: "06",
    title: "Product Design",
    subtitle: "UI/UX & Art",
    description: "Where aesthetics meet function. We design interfaces that are not just usable, but delightful, accessible, and human-centric.",
    icon: Palette,
    color: "text-yellow-500",
    bgGradient: "from-yellow-500/20 to-transparent",
    border: "group-hover:border-yellow-500/50"
  },
  {
    id: "git",
    title: "Open Source Community",
    subtitle: "GitHub & Collaboration",
    description: "The heart of our code. Join our open source initiatives, star our repositories, and contribute to projects that matter.",
    icon: Github,
    color: "text-white",
    bgGradient: "from-neutral-500/20 to-transparent",
    border: "group-hover:border-white/50",
    href: "https://github.com/acmrvce",
    action: "Follow Us on GitHub"
  }
];

// --- Components ---

const DomainList = ({ 
  activeId, 
  setActiveId 
}: { 
  activeId: string; 
  setActiveId: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col w-full h-full justify-center">
      {domains.map((item) => (
        <div
          key={item.id}
          onMouseEnter={() => setActiveId(item.id)}
          className={cn(
            "group relative flex items-center justify-between py-6 md:py-8 cursor-pointer border-b border-neutral-200 dark:border-white/5 transition-all duration-300",
            activeId === item.id ? "pl-4 md:pl-8 opacity-100" : "opacity-50 hover:opacity-80 hover:pl-2"
          )}
        >
          {/* Active Indicator Line */}
          <div className={cn(
            "absolute left-0 top-0 bottom-0 w-1 bg-current transition-all duration-300",
            activeId === item.id ? item.color.replace('text-', 'bg-') : "bg-transparent"
          )} />

          <div className="flex items-center gap-4 md:gap-8">
            <span className="font-tech text-xs md:text-sm text-neutral-400 dark:text-neutral-600">
              {item.id}
            </span>
            <h3 className={cn(
              "text-2xl md:text-4xl font-bold tracking-tight transition-colors font-primary",
              activeId === item.id ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-500"
            )}>
              {item.title}
            </h3>
          </div>

          <div className={cn(
            "hidden md:block transition-transform duration-300",
            activeId === item.id ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
          )}>
            <ArrowRight className={cn("w-6 h-6", item.color)} />
          </div>
        </div>
      ))}
    </div>
  );
};

const DomainPreview = ({ activeDomain }: { activeDomain: typeof domains[0] }) => {
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[600px] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/10 flex flex-col justify-between p-8 md:p-12 transition-colors duration-500">
      
      {/* Dynamic Background Gradient */}
      <motion.div
        key={activeDomain.id + "bg"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-30 dark:opacity-20",
          activeDomain.bgGradient
        )}
      />

      {/* Background Icon (Huge & decorative) */}
      <motion.div
        key={activeDomain.id + "icon-bg"}
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute -bottom-20 -right-20 opacity-[0.05] dark:opacity-[0.05] pointer-events-none"
      >
        <activeDomain.icon className="w-[400px] h-[400px] text-neutral-900 dark:text-white" />
      </motion.div>

      {/* Top Content */}
      <div className="relative z-10">
        <motion.div
          key={activeDomain.id + "icon"}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white dark:bg-white/10 shadow-lg backdrop-blur-sm",
            activeDomain.color
          )}
        >
          <activeDomain.icon className="w-8 h-8" />
        </motion.div>

        <motion.div
          key={activeDomain.id + "text"}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className={cn("font-tech text-xs uppercase tracking-widest mb-2 block", activeDomain.color)}>
            {activeDomain.subtitle}
          </span>
          <h3 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
            {activeDomain.title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed max-w-md">
            {activeDomain.description}
          </p>
        </motion.div>
      </div>

      {/* Bottom Action */}
      <div className="relative z-10 mt-8">
        {activeDomain.href ? (
           <motion.a 
             href={activeDomain.href}
             target="_blank"
             rel="noopener noreferrer"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-bold shadow-lg hover:scale-105 transition-transform"
           >
              {activeDomain.id === 'git' ? <Star className="w-4 h-4 fill-current" /> : null}
              {activeDomain.action || "Learn More"}
              <ArrowRight className="w-4 h-4" />
           </motion.a>
        ) : (
            <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                className={cn("h-1 rounded-full opacity-0 mt-auto", activeDomain.color.replace('text-', 'bg-'))}
            />
        )}
      </div>
    </div>
  );
};

// --- Mobile Card (Stacked Version) ---
const MobileCard = ({ item }: { item: typeof domains[0] }) => (
    <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className={cn("absolute inset-0 opacity-10 bg-gradient-to-br", item.bgGradient)} />
        
        <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className={cn("p-3 rounded-xl bg-white dark:bg-white/10 w-fit", item.color)}>
                    <item.icon className="w-6 h-6" />
                </div>
                <span className="font-tech text-xs text-neutral-400">{item.id}</span>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.description}</p>
            </div>

            {item.href && (
                 <a href={item.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mt-2 hover:underline">
                    {item.action || "Visit Link"} <ArrowRight className="w-3 h-3" />
                 </a>
            )}
        </div>
    </div>
);

// --- Main Component ---
const DomainsBento = () => {
  const [activeId, setActiveId] = useState("01");
  const activeDomain = domains.find(d => d.id === activeId) || domains[0];

  return (
    <section className="relative w-full bg-white dark:bg-[#050505] py-24 px-4 lg:px-12 font-primary overflow-hidden border-t border-neutral-200 dark:border-white/10 ">
      <FontStyles />
      
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                <Terminal className="h-3 w-3" />
              </span>
              <span className="text-xs font-tech font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                / Technical Domains
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.9]">
              Fields of <span className="text-neutral-400 dark:text-neutral-600">Excellence.</span>
            </h2>
        </div>

        {/* Desktop Layout: Split Screen */}
        <div className="hidden lg:grid grid-cols-12 gap-12 h-[800px]">
            {/* Left: The Index List */}
            <div className="col-span-5 h-full flex flex-col justify-center">
                <DomainList activeId={activeId} setActiveId={setActiveId} />
            </div>

            {/* Right: The Holographic Preview */}
            <div className="col-span-7 h-full">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        <DomainPreview activeDomain={activeDomain} />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

        {/* Mobile Layout: Stacked Cards */}
        <div className="lg:hidden flex flex-col gap-4">
            {domains.map(domain => (
                <MobileCard key={domain.id} item={domain} />
            ))}
        </div>

      </div>
    </section>
  );
};

export default DomainsBento;
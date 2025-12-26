"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Sparkles, Code2, Rocket, Users } from "lucide-react";

// --- Font Styles ---
const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-primary { font-family: 'Manrope', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', sans-serif; }
  `}} />
);

// --- Data ---
const workflowSteps = [
  {
    id: "01",
    title: "Ideation",
    subtitle: "Sparking Innovation",
    description: "Every great project starts with a question. We gather to brainstorm, challenge assumptions, and define the problem space before writing a single line of code.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2000&auto=format&fit=crop",
    icon: Sparkles,
    color: "bg-blue-500"
  },
  {
    id: "02",
    title: "Design",
    subtitle: "Crafting Experience",
    description: "We prototype relentlessly. Our design systems focus on usability, accessibility, and aesthetics, ensuring the solution is as beautiful as it is functional.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
    icon: Users,
    color: "bg-purple-500"
  },
  {
    id: "03",
    title: "Development",
    subtitle: "Engineering Excellence",
    description: "We build scalable, robust systems using cutting-edge stacks. From microservices to blockchain nodes, our code is written to industry standards.",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2000&auto=format&fit=crop",
    icon: Code2,
    color: "bg-emerald-500"
  },
  {
    id: "04",
    title: "Deployment",
    subtitle: "Global Impact",
    description: "Shipping is just the beginning. We deploy to production, monitor performance, and iterate based on real-world feedback.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    icon: Rocket,
    color: "bg-orange-500"
  }
];

// --- Sub-Component: The Panel ---
const WorkflowPanel = ({ 
  step, 
  isActive, 
  setActive 
}: { 
  step: typeof workflowSteps[0], 
  isActive: boolean, 
  setActive: () => void 
}) => {
  return (
    <div
      onClick={setActive}
      onMouseEnter={setActive}
      className={cn(
        "relative rounded-3xl overflow-hidden cursor-pointer border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 transition-all duration-500 ease-in-out",
        // Desktop Styles (lg:):
        // - Height is always full (stretches to container)
        // - Flex grows based on active state
        "lg:h-full",
        isActive 
          ? "lg:flex-[3.5] lg:opacity-100" 
          : "lg:flex-[1] lg:opacity-60 hover:lg:opacity-100",
        
        // Mobile Styles (Default):
        // - Height animates between small/large
        // - Width is full
        isActive
          ? "h-[500px] w-full"
          : "h-[80px] w-full"
      )}
    >
      {/* Background Image */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full transition-all duration-700",
          isActive ? "opacity-100 scale-100" : "opacity-0 lg:opacity-40 scale-110" 
        )}
      >
        <img
          src={step.image}
          alt={step.title}
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10 z-20">
        
        {/* Top Number Badge */}
        <div 
          className={cn(
            "absolute w-10 h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center font-tech font-bold border backdrop-blur-md z-30 transition-all duration-500",
            isActive 
              ? "bg-white text-black border-white top-6 left-6 lg:top-10 lg:left-10" 
              : "bg-neutral-200 dark:bg-white/10 text-neutral-900 dark:text-white border-neutral-300 dark:border-white/20 top-1/2 -translate-y-1/2 left-6 lg:top-10 lg:translate-y-0 lg:left-10"
          )}
        >
          {step.id}
        </div>

        {/* Text Content */}
        <div className="relative z-10 overflow-hidden pl-2 lg:pl-0">
          
          {/* Title - Always Visible but transforms */}
          <div 
            className={cn(
                "transition-transform duration-500 ease-in-out origin-left",
                !isActive && "translate-x-12 lg:translate-x-0" 
            )}
          >
             {!isActive && (
                <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white/80 whitespace-nowrap lg:-rotate-90 lg:origin-bottom-left lg:translate-x-8 lg:-translate-y-8 transition-opacity duration-300">
                    {step.title}
                </h3>
             )}
          </div>

          {/* Active Content Reveal - Using Framer for opacity/y-slide only */}
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex flex-col gap-3 lg:gap-4"
              >
                <div className="flex items-center gap-3">
                    <span className={cn("px-3 py-1 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-widest text-white w-fit", step.color)}>
                        {step.subtitle}
                    </span>
                </div>
                
                <h3 className="font-bold text-white text-3xl lg:text-5xl leading-tight">
                  {step.title}
                </h3>
                
                <p className="text-sm lg:text-lg text-neutral-300 max-w-lg leading-relaxed line-clamp-3 lg:line-clamp-none">
                  {step.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Icon */}
        <div 
          className={cn(
            "absolute right-6 top-1/2 -translate-y-1/2 lg:top-10 lg:translate-y-0 lg:right-10 p-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white transition-all duration-500 z-30",
            isActive 
                ? "bg-white text-black border-white rotate-45 top-6 translate-y-0 opacity-100" 
                : "opacity-0 lg:opacity-100 rotate-0"
          )}
        >
          <ArrowUpRight className="w-5 h-5" />
        </div>

      </div>
    </div>
  );
};

// --- Main Component ---
const ExpandableWorkflow = () => {
  const [activeId, setActiveId] = useState("01");

  return (
    <section className="w-full bg-white dark:bg-[#050505] py-24 px-4 lg:px-12 font-primary overflow-hidden border-t border-neutral-200 dark:border-white/10">
      <FontStyles />
      
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 px-2">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-neutral-900 dark:bg-white" />
              <span className="text-xs font-tech font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Our Process
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.9]">
              How We <br/>
              <span className="text-neutral-400 dark:text-neutral-600">Innovate.</span>
            </h2>
          </div>
          
          <div className="hidden md:block text-right">
            <p className="text-sm font-tech text-neutral-500 dark:text-neutral-400">
              {"// HOVER TO EXPLORE"} <br/> {"THE WORKFLOW"}
            </p>
          </div>
        </div>

        {/* The Accordion Container */}
        {/* Mobile: Vertical Flex Column | Desktop: Horizontal Flex Row */}
        {/* On desktop, we force a specific height so h-full works on children */}
        <div className="flex flex-col lg:flex-row gap-3 w-full lg:h-[600px]">
          {workflowSteps.map((step) => (
            <WorkflowPanel 
              key={step.id} 
              step={step} 
              isActive={activeId === step.id} 
              setActive={() => setActiveId(step.id)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExpandableWorkflow;
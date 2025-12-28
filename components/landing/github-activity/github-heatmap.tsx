"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GitCommit, GitPullRequest, GitMerge, Star, TrendingUp } from "lucide-react";

// --- Font Styles ---
const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-primary { font-family: 'Manrope', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', sans-serif; }
  `}} />
);

// --- Simulation Engine ---
const generateHeatmapData = () => {
  const weeks = 52;
  const daysPerWeek = 7;
  const data = [];
  const now = new Date();
  
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < daysPerWeek; d++) {
      const isWeekend = d === 0 || d === 6;
      const baseChance = isWeekend ? 0.2 : 0.8;
      
      let count = 0;
      if (Math.random() < baseChance) {
         const intensity = Math.random();
         if (intensity > 0.9) count = Math.floor(Math.random() * 10) + 10;
         else if (intensity > 0.6) count = Math.floor(Math.random() * 5) + 3;
         else count = Math.floor(Math.random() * 3) + 1;
      }
      if (Math.random() < 0.1) count = 0;

      week.push({ count, date: new Date(now.getTime() - ((weeks - w) * 7 + (6 - d)) * 24 * 60 * 60 * 1000) });
    }
    data.push(week);
  }
  return data;
};

// --- Helper Components ---

const StatCard = ({ icon: Icon, label, value, trend }: { icon: any, label: string, value: string, trend?: string }) => (
  <div className="flex flex-col gap-2 p-4 rounded-xl bg-neutral-100/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:border-emerald-500/30 transition-colors">
    <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
      <Icon className="w-4 h-4" />
      {trend && <span className="text-[10px] font-tech text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-1"><TrendingUp className="w-3 h-3" />{trend}</span>}
    </div>
    <div>
      <div className="text-2xl font-bold font-tech text-neutral-900 dark:text-white tracking-tight">{value}</div>
      <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{label}</div>
    </div>
  </div>
);

const HeatmapCell = ({ count, date, rowIndex }: { count: number, date: Date, rowIndex: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Color Logic
  let bgClass = "bg-neutral-200 dark:bg-white/5";
  if (count > 0) bgClass = "bg-emerald-200 dark:bg-emerald-900/40";
  if (count > 3) bgClass = "bg-emerald-300 dark:bg-emerald-700/60";
  if (count > 6) bgClass = "bg-emerald-400 dark:bg-emerald-500/80";
  if (count > 10) bgClass = "bg-emerald-500 dark:bg-emerald-400";

  // Smart Positioning: Top rows (0-3) show tooltip BELOW, Bottom rows show ABOVE
  const isTopRow = rowIndex < 3;

  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ zIndex: isHovered ? 50 : 1 }} // Crucial: Brings hovered cell to front
    >
      <motion.div
        initial={false}
        className={cn("w-full h-full min-w-[10px] min-h-[10px] rounded-sm transition-colors duration-200 cursor-pointer", bgClass)}
        whileHover={{ scale: 1.3 }} // Slightly larger scale on hover
      />
      
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: isTopRow ? -5 : 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1 }}
            className={cn(
                "absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none w-max",
                isTopRow ? "top-full mt-2" : "bottom-full mb-2" // Dynamic Position
            )}
          >
            <div className="px-3 py-2 bg-neutral-900 text-white text-[10px] font-medium rounded-md shadow-2xl border border-white/20 flex flex-col items-center">
              <span className="font-bold text-emerald-400">{count} contributions</span>
              <span className="text-neutral-400">{date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            
            {/* Arrow */}
            <div className={cn(
                "w-2 h-2 bg-neutral-900 rotate-45 absolute left-1/2 -translate-x-1/2 border-white/20",
                isTopRow 
                    ? "top-[-5px] border-l border-t"  // Pointing Up
                    : "bottom-[-5px] border-r border-b" // Pointing Down
            )} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Component ---
const GithubHeatmap = () => {
  const heatmapData = useMemo(() => generateHeatmapData(), []);

  return (
    <section className="w-full bg-white dark:bg-[#050505] py-16 px-4 md:px-8 border-t border-neutral-200 dark:border-white/10 font-primary">
      <FontStyles />
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header - Compact Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
               <span className="font-tech text-xs uppercase tracking-widest text-neutral-500">Activity Log</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Open Source <span className="text-emerald-600 dark:text-emerald-400">Velocity</span>
            </h2>
          </div>
          
          <div className="flex gap-4">
             <a href="https://github.com/acmrvce" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5" />
                <span>Star on GitHub</span>
             </a>
          </div>
        </div>

        {/* Layout: Stats + Grid */}
        <div className="flex flex-col xl:flex-row gap-6">
            
            {/* 1. Stats Bar (Horizontal on mobile, vertical on desktop) */}
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-1 gap-4 xl:w-64 shrink-0">
                <StatCard 
                    icon={GitCommit} 
                    label="Commits (YTD)" 
                    value="4,289" 
                    trend="+12%"
                />
                <StatCard 
                    icon={GitPullRequest} 
                    label="PRs Merged" 
                    value="842" 
                />
                <StatCard 
                    icon={GitMerge} 
                    label="Contributors" 
                    value="64" 
                    trend="+8"
                />
                {/* Filler for 4th slot on tablet, hidden on desktop if wanted, or reused */}
                <div className="xl:hidden">
                    <StatCard 
                        icon={Star} 
                        label="Total Stars" 
                        value="1.2k" 
                        trend="+15%"
                    />
                </div>
            </div>

            {/* 2. The Heatmap Container */}
            <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex blowout */}
                <div className="w-full p-4 md:p-6 rounded-2xl bg-neutral-50 dark:bg-[#0A0A0A] border border-neutral-200 dark:border-white/5 relative group">
                    
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />

                    {/* Scrollable Grid Area */}
                    <div className="relative z-10 w-full overflow-x-auto pb-2 scrollbar-hide">
                        <div className="flex flex-col gap-2 min-w-max">
                            <div className="flex gap-[3px]">
                                {/* Days Labels */}
                                <div className="flex flex-col justify-between gap-[3px] mr-2 text-[9px] font-mono text-neutral-400 py-[1px] h-full">
                                    <span>Mon</span>
                                    <span className="invisible">Tue</span>
                                    <span>Wed</span>
                                    <span className="invisible">Thu</span>
                                    <span>Fri</span>
                                    <span className="invisible">Sat</span>
                                    <span className="invisible">Sun</span>
                                </div>

                                {/* Columns */}
                                {heatmapData.map((week, wIndex) => (
                                    <div key={wIndex} className="flex flex-col gap-[3px]">
                                        {week.map((day, dIndex) => (
                                            // Fixed size container for the cell
                                            <div key={`${wIndex}-${dIndex}`} className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px]">
                                                <HeatmapCell 
                                                    count={day.count} 
                                                    date={day.date} 
                                                    rowIndex={dIndex} // Passing index for smart positioning
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer / Legend */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t border-neutral-200 dark:border-white/5 gap-3">
                         <div className="text-xs text-neutral-400 font-tech">
                            Learn more about how we build at ACM.
                         </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-mono">
                            <span>Less</span>
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-neutral-200 dark:bg-white/5" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-200 dark:bg-emerald-900/40" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-300 dark:bg-emerald-700/60" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 dark:bg-emerald-500/80" />
                            <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500 dark:bg-emerald-400" />
                            <span>More</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default GithubHeatmap;
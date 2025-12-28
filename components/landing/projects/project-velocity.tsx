"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  AnimatePresence,
  PanInfo
} from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Trophy, X } from "lucide-react";

// --- Utility: Wrap Function ---
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- Font Styles ---
const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-primary { font-family: 'Manrope', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', sans-serif; }
  `}} />
);

// --- Data: Achievements ---
const achievements = [
  {
    id: 1,
    title: "Smart India Hackathon",
    member: "Team Syntax Error",
    prize: "1st Runner Up",
    category: "National Hackathon",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
    description: "Developed an AI-driven solution for crop disease detection using satellite imagery, helping farmers reduce yield loss by 30%."
  },
  {
    id: 2,
    title: "ICPC Regionals",
    member: "Code Wizards",
    prize: "Gold Medal",
    category: "Competitive Coding",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    description: "Qualified for the World Finals after solving 10/12 problems in the Asia-West regional contest, ranking in the top 5 nationwide."
  },
  {
    id: 3,
    title: "Google Cloud Hero",
    member: "Ananya Sharma",
    prize: "Champion",
    category: "Cloud Computing",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop",
    description: "Completed the cloud infrastructure challenge in record time, demonstrating mastery of Kubernetes and Serverless architectures."
  },
  {
    id: 4,
    title: "EthGlobal Scaling",
    member: "BlockChain Gang",
    prize: "$5k Grant",
    category: "Web3",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop",
    description: "Built a zero-knowledge proof voting system for DAOs that ensures complete voter privacy while maintaining transparency."
  },
  {
    id: 5,
    title: "NASA Space Apps",
    member: "AstroCoders",
    prize: "Global Nominee",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    description: "Created a real-time visualization tool for tracking near-earth asteroids using NASA's open API data."
  },
];

// --- Sub-Component: Achievement Card ---
const AchievementCard = ({ item, onClick }: { item: typeof achievements[0], onClick: () => void }) => {
  return (
    <div 
        onClick={onClick}
        className="group relative mx-4 h-[350px] w-[280px] md:w-[350px] shrink-0 overflow-hidden rounded-[2rem] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />

      {/* Floating Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white">
            {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-2 mb-2 opacity-80">
            <Trophy className="w-3 h-3 text-yellow-400" />
            <span className="font-tech text-xs text-yellow-400 uppercase tracking-wider">
                {item.prize}
            </span>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight mb-1">
            {item.title}
        </h3>
        <p className="text-sm text-neutral-400 line-clamp-1">
            by {item.member}
        </p>
      </div>

      {/* Hover Reveal Icon */}
      <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
        <div className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Velocity Strip ---
interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden flex flex-nowrap whitespace-nowrap">
      <motion.div className="flex flex-nowrap" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// --- Sub-Component: The Bottom Sheet Modal ---
const AchievementModal = ({ 
    item, 
    onClose 
}: { 
    item: typeof achievements[0] | null, 
    onClose: () => void 
}) => {
    // Lock body scroll when open
    useEffect(() => {
        if (item) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; }
    }, [item]);

    // Simplified Drag Logic
    const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        // If dragged down more than 150px OR dragged fast enough downwards
        if (info.offset.y > 150 || info.velocity.y > 200) {
            onClose();
        }
    };

    if (!item) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex justify-center items-end sm:items-center pointer-events-none">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }} // Fast fade
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            />
            
            {/* The Sheet - No layoutId, simple slide up/down */}
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }} // Snappy spring
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }} // Important: Constrain drag to avoid flying off
                dragElastic={{ top: 0, bottom: 0.5 }} // Elastic only at bottom for pull-down feel
                onDragEnd={onDragEnd}
                className="pointer-events-auto w-full max-w-2xl bg-white dark:bg-[#0F0F0F] rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden shadow-2xl max-h-[85vh] flex flex-col relative z-50 will-change-transform"
            >
                {/* Drag Handle Area */}
                <div className="absolute top-0 left-0 right-0 h-10 flex justify-center items-center z-20 cursor-grab active:cursor-grabbing hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <div className="w-12 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                </div>

                {/* Close Button (Desktop) */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
                >
                    <X className="w-5 h-5 text-neutral-800 dark:text-white" />
                </button>

                {/* Content */}
                <div className="flex-1 overflow-y-auto font-primary no-scrollbar" onPointerDown={(e) => e.stopPropagation()}> 
                   {/* e.stopPropagation() helps prevent drag triggering when scrolling content */}
                    {/* Hero Image */}
                    <div className="relative h-64 sm:h-80 w-full shrink-0">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 rounded-md bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider border border-yellow-500/30">
                                    {item.prize}
                                </span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                                {item.title}
                            </h2>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6 bg-white dark:bg-[#0F0F0F]">
                        {/* Meta Data */}
                        <div className="flex flex-wrap gap-4 text-sm text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-white/10 pb-6">
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider font-bold mb-1 opacity-70">Category</span>
                                <span className="text-neutral-900 dark:text-white font-medium">{item.category}</span>
                            </div>
                            <div className="w-px h-10 bg-neutral-200 dark:bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-xs uppercase tracking-wider font-bold mb-1 opacity-70">Achiever</span>
                                <span className="text-neutral-900 dark:text-white font-medium">{item.member}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">About the Win</h4>
                            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg">
                                {item.description}
                            </p>
                        </div>
                        
                        <div className="pt-4">
                            <button className="w-full py-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform">
                                View Full Case Study
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// --- Main Component ---
const ProjectVelocity = () => {
  const [selectedItem, setSelectedItem] = useState<typeof achievements[0] | null>(null);

  return (
    <section className="relative w-full bg-white dark:bg-[#050505] py-24 border-t border-neutral-200 dark:border-white/10 font-primary overflow-hidden">
      <FontStyles />
      
      {/* Background Ambience from Hero */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-200/30 dark:bg-purple-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-200/30 dark:bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
            <div className="flex items-center gap-2 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
                <span className="font-tech text-xs uppercase tracking-widest text-neutral-500">Hall of Fame</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.9]">
                Our <br/> Achievements.
            </h2>
        </div>
        <p className="max-w-sm text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Celebrating the victories, breakthroughs, and milestones of our exceptional community members on the global stage.
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-10">
        <ParallaxText baseVelocity={-1.5}>
            {achievements.map((item) => (
                <AchievementCard 
                    key={`row1-${item.id}`} 
                    item={item} 
                    onClick={() => setSelectedItem(item)}
                />
            ))}
        </ParallaxText>
        
        <ParallaxText baseVelocity={1.5}>
            {achievements.map((item) => (
                <AchievementCard 
                    key={`row2-${item.id}`} 
                    item={item} 
                    onClick={() => setSelectedItem(item)}
                />
            ))}
        </ParallaxText>
      </div>

      <AnimatePresence>
        {selectedItem && (
            <AchievementModal 
                item={selectedItem} 
                onClose={() => setSelectedItem(null)} 
            />
        )}
      </AnimatePresence>

    </section>
  );
};

export default ProjectVelocity;
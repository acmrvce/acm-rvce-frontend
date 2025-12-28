"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const images = [
  "/home/img0.jpg",
  "/home/img6jpg",
  "/team/Actual_CT/2024_CT/Aryan_C.jpg",
  "/home/img2.jpg",
  "/home/img3.jpg",
  "/team/Actual_CT/2024_CT/Tanisha_A.jpg",
  "/landing/acm-landing.jpg",
  "/team/Actual_CT/2024_CT/Prakhar_J_1.jpg",
  "/team/Actual_CT/2024_CT/Mehar_K.jpg",
  "/team/Actual_CT/2024_CT/Ayush_O.jpg",
  "/home/img0.jpg", 
  "/home/img1.jpg",
];

// --- Sub-Components ---

// Phase 1: The Mosaic Grid
const MosaicPhase = ({ progress }: { progress: number }) => {
    return (
        <motion.div 
            className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} 
            transition={{ duration: 0.8 }}
        >
             <div className="absolute inset-0 bg-[#050505]/80 z-10" />
             
             <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-[120vw] h-[120vh] rotate-6 opacity-40">
                {images.map((src, i) => (
                    <motion.div
                        key={i}
                        className="relative w-full h-full rounded-lg overflow-hidden bg-neutral-900"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ 
                            opacity: progress > (i * 2) ? 1 : 0, 
                            y: progress > (i * 2) ? 0 : 20
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <img 
                            src={src} 
                            alt="" 
                            className="w-full h-full object-cover grayscale opacity-60"
                        />
                    </motion.div>
                ))}
             </div>
        </motion.div>
    );
}

// Phase 2: The Logo Construction
const LogoPhase = () => {
    return (
        <motion.div 
            className="relative z-30 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
             {/* Glowing Backdrop */}
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute w-64 h-64 bg-blue-600/30 blur-[100px] rounded-full pointer-events-none"
             />

             {/* The SVG Logo */}
             <svg 
                width="300" 
                height="300" 
                viewBox="0 0 300 300" 
                className="w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl"
                xmlns="http://www.w3.org/2000/svg"
             >
                <g transform="translate(150, 150)">
                    
                    {/* --- The Diamond Strips --- 
                      Coordinates calculated relative to center (0,0)
                      Diamond Radius approx 90
                    */}

                    {/* 1. Right Strip (Dark Blue > Shape) */}
                    <motion.path
                        d="M 35,-55 L 90,0 L 35,55"
                        fill="transparent"
                        stroke="#005596" // ACM Dark Blue
                        strokeWidth="18"
                        strokeLinecap="butt" // Sharp edges for the cut look
                        strokeLinejoin="miter"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                    />

                    {/* 2. Top Strip (Light Blue) */}
                    <motion.path
                        d="M -50,-40 L 0,-90 L 30,-60" 
                        fill="transparent"
                        stroke="#4DB4FA" // Light Blue
                        strokeWidth="18"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
                    />

                    {/* 3. Bottom Strip (Light Blue) */}
                    <motion.path
                        d="M -50,40 L 0,90 L 30,60"
                        fill="transparent"
                        stroke="#4DB4FA" // Light Blue
                        strokeWidth="18"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
                    />

                    {/* --- Typography Group --- */}
                    <motion.g
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                    >
                        {/* "acm" - Lowercase, Bold, Shifted Left */}
                        <text 
                            x="-20" y="10" 
                            textAnchor="middle" 
                            fill="white"
                            fontSize="60" 
                            fontWeight="800" 
                            style={{ fontFamily: "var(--font-manrope), sans-serif", letterSpacing: "1.5px" }}
                        >
                            acm
                        </text>
                        
                        {/* "RVCE" - Uppercase, Smaller, Below acm */}
                        <text 
                            x="-18" y="25" 
                            textAnchor="middle" 
                            fill="#4DB4FA" // Matches light blue strips
                            fontSize="15" 
                            fontWeight="600" 
                            style={{ fontFamily: "var(--font-tech), monospace", letterSpacing: "2px", fontStyle: "italic" }}
                        >
                            RVCE
                        </text>
                    </motion.g>
                </g>
             </svg>
        </motion.div>
    )
}

export default function Preloader() {
  const [loadingPhase, setLoadingPhase] = useState<1 | 2 | 3>(1); 
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setCounter((prev) => {
        // Transition from Mosaic to Logo at 40%
        if (prev >= 50 && loadingPhase === 1) {
            setLoadingPhase(2);
        }
        
        // Stop at 100%
        if (prev >= 100) {
          clearInterval(interval);
          // Wait 2s at 100% to show the full logo
          setTimeout(() => setLoadingPhase(3), 2000); 
          return 100;
        }

        // Speed Logic:
        const increment = loadingPhase === 1 
            ? Math.floor(Math.random() * 5) + 2 
            : 1; // Slow increment for logo phase
            
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => {
      clearInterval(interval);
    };
  }, [loadingPhase]);

  // Unlock scroll on exit
  useEffect(() => {
    if (loadingPhase === 3) {
        document.body.style.overflow = "";
    }
  }, [loadingPhase]);

  return (
    <AnimatePresence mode="wait">
      {loadingPhase !== 3 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden"
          exit={{ 
            y: "-100%", 
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } // Smooth curtain lift
          }}
        >
            {/* --- PHASE 1: MOSAIC (Background) --- */}
            <AnimatePresence>
                {loadingPhase === 1 && <MosaicPhase progress={counter} />}
            </AnimatePresence>

            {/* --- PHASE 2: LOGO (Foreground) --- */}
            <AnimatePresence>
                {loadingPhase === 2 && <LogoPhase />}
            </AnimatePresence>
            
            {/* --- PERSISTENT UI: Counter --- */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50 mix-blend-difference">
                <div className="flex justify-between w-64 items-end px-1">
                    <span className="text-[10px] text-neutral-400 font-tech uppercase tracking-widest">
                        {loadingPhase === 1 ? "Initializing..." : "System Core..."}
                    </span>
                    <motion.div className="text-4xl font-bold font-tech tracking-tighter tabular-nums text-white">
                        {Math.min(counter, 100)}%
                    </motion.div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-64 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: `${counter}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                    />
                </div>
            </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
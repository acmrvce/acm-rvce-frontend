"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "./transition-context";

// --- Configuration ---
const CURVE_HEIGHT = 150;
const BRAND_COLOR = "#005596";
const DARK_COLOR = "#0a0a0a";

// --- Animation Timing ---
const ENTER_DURATION = 0.6;
const EXIT_DURATION = 0.6;

// --- Animation Variants ---
const smoothEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

// --- Helper: Get Page Title ---
const getDisplayTitle = (path: string) => {
  if (path === "/" || path === "") return "Home";
  const segment = path.split("/").filter(Boolean)[0];
  return segment ? segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ") : "Home";
};

export default function TransitionOverlay() {
  const { isTransitioning, targetPath, phase, onEnterComplete, onExitComplete } = useTransition();
  const [displayTitle, setDisplayTitle] = useState("");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Update title when transitioning
  useEffect(() => {
    if (isTransitioning && targetPath) {
      setDisplayTitle(getDisplayTitle(targetPath));
    }
  }, [isTransitioning, targetPath]);

  // Determine animation target based on phase
  const getYPosition = () => {
    if (phase === "entering") return "0%";
    if (phase === "exiting") return "-120%";
    return "-100%"; // idle - off screen
  };

  const getCurvePath = (isEntering: boolean) => {
    if (phase === "entering") return "M0 0 L100 0 L100 100 Q50 100 0 100"; // Flat bottom
    if (phase === "exiting") return "M0 0 L100 0 L100 100 Q50 0 0 100"; // Curved (trailing)
    return "M0 0 L100 0 L100 100 Q50 0 0 100"; // idle
  };

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Dark Layer (Top) */}
      <motion.div
        className="absolute inset-0 w-full h-[120vh]"
        style={{ backgroundColor: DARK_COLOR, zIndex: 2 }}
        initial={{ y: "-100%" }}
        animate={{ 
          y: getYPosition(),
        }}
        transition={{ 
          duration: phase === "entering" ? ENTER_DURATION : EXIT_DURATION, 
          ease: smoothEase,
          delay: phase === "exiting" ? 0.1 : 0
        }}
        onAnimationComplete={() => {
          if (phase === "entering") {
            onEnterComplete();
          } else if (phase === "exiting") {
            onExitComplete();
          }
        }}
      >
        {/* Bottom Curve */}
        {dimensions.width > 0 && (
          <svg 
            className="absolute top-full left-0 w-full"
            style={{ height: CURVE_HEIGHT + "px", transform: "translateY(-1px)" }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              fill={DARK_COLOR}
              initial={{ d: "M0 0 L100 0 L100 100 Q50 0 0 100" }}
              animate={{ d: getCurvePath(phase === "entering") }}
              transition={{ 
                duration: phase === "entering" ? ENTER_DURATION : EXIT_DURATION, 
                ease: smoothEase,
                delay: phase === "exiting" ? 0.1 : 0
              }}
            />
          </svg>
        )}
      </motion.div>

      {/* Blue Layer (Bottom) */}
      <motion.div
        className="absolute inset-0 w-full h-[120vh]"
        style={{ backgroundColor: BRAND_COLOR, zIndex: 1 }}
        initial={{ y: "-100%" }}
        animate={{ 
          y: getYPosition(),
        }}
        transition={{ 
          duration: phase === "entering" ? ENTER_DURATION : EXIT_DURATION, 
          ease: smoothEase,
          delay: phase === "entering" ? 0.05 : 0.15
        }}
      >
        {/* Bottom Curve */}
        {dimensions.width > 0 && (
          <svg 
            className="absolute top-full left-0 w-full"
            style={{ height: CURVE_HEIGHT + "px", transform: "translateY(-1px)" }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              fill={BRAND_COLOR}
              initial={{ d: "M0 0 L100 0 L100 100 Q50 0 0 100" }}
              animate={{ d: getCurvePath(phase === "entering") }}
              transition={{ 
                duration: phase === "entering" ? ENTER_DURATION : EXIT_DURATION, 
                ease: smoothEase,
                delay: phase === "entering" ? 0.05 : 0.15
              }}
            />
          </svg>
        )}
      </motion.div>

      {/* Page Title */}
      <motion.div
        className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: phase === "exiting" ? 0 : 1, 
          y: phase === "exiting" ? -50 : 0,
        }}
        transition={{ 
          duration: phase === "entering" ? 0.4 : 0.3, 
          ease: smoothEase, 
          delay: phase === "entering" ? 0.2 : 0 
        }}
      >
        <h1 className="text-6xl md:text-9xl font-bold text-white font-tech tracking-tighter uppercase opacity-90">
          {displayTitle}
        </h1>
      </motion.div>
    </div>
  );
}

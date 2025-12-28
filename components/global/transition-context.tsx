"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

// Session storage key shared with preloader
const SESSION_KEY = "acm-visited";

// Animation timing (should match transition-overlay.tsx)
const ENTER_DURATION = 600; // ms - time for curtain to come down
const EXIT_DURATION = 800;  // ms - time for curtain to go up (with delays)
const PAGE_LOAD_BUFFER = 300; // ms - buffer time to let page render

interface TransitionContextType {
  isTransitioning: boolean;
  targetPath: string;
  phase: "idle" | "entering" | "exiting";
  startTransition: (href: string) => void;
  onEnterComplete: () => void;
  onExitComplete: () => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPath, setTargetPath] = useState("");
  const [phase, setPhase] = useState<"idle" | "entering" | "exiting">("idle");
  const hasNavigated = useRef(false);

  const startTransition = useCallback((href: string) => {
    // Don't transition to the same page
    if (typeof window !== "undefined" && window.location.pathname === href) {
      return;
    }
    
    hasNavigated.current = false;
    setTargetPath(href);
    setPhase("entering");
    setIsTransitioning(true);
  }, []);

  const onEnterComplete = useCallback(() => {
    if (targetPath && !hasNavigated.current) {
      hasNavigated.current = true;
      // Navigate to the new page
      router.push(targetPath);
      
      // Wait for page to render, then start exit animation
      setTimeout(() => {
        setPhase("exiting");
      }, PAGE_LOAD_BUFFER);
    }
  }, [targetPath, router]);

  const onExitComplete = useCallback(() => {
    // Animation fully complete, reset everything
    setIsTransitioning(false);
    setTargetPath("");
    setPhase("idle");
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        targetPath,
        phase,
        startTransition,
        onEnterComplete,
        onExitComplete,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}

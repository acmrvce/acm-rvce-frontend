"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
};

export const LinkPreview = ({
  children,
  url,
  className,
  width = 220,
  height = 140,
}: LinkPreviewProps) => {
  // We use Microlink API to generate screenshots on the fly.
  // In a high-traffic production app, you might want to proxy this or use a paid tier.
  const src = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&colorScheme=dark&viewport.isMobile=true&viewport.deviceScaleFactor=1`;

  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Mouse Tracking Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Physics for the floating card (Spring makes it feel organic)
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Offset the tooltip so it doesn't cover the cursor
    mouseX.set(event.clientX + 15); 
    mouseY.set(event.clientY + 15);
  };

  if (!isMounted) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("relative z-10 hover:text-blue-500 transition-colors", className)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </a>

      {/* The Floating Portal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ 
                x, 
                y, 
                position: "fixed", 
                top: 0, 
                left: 0,
                zIndex: 9999, // Ensure it sits on top of everything
                pointerEvents: "none" // Let clicks pass through to underlying elements if needed
            }}
          >
            <div 
                className="overflow-hidden "
                style={{ width: width + 8, height: height + 8 }} // Tiny padding for border effect
            >
                {/* Browser Chrome (Fake UI) */}
                <div className="absolute top-2 left-2 right-2 h-4 z-20 flex items-center gap-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                     <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                     <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </div>

                {/* The Preview Image */}
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    {/* Standard img tag for reliability in this preview environment */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src}
                        alt="Preview"
                        className="w-full h-full object-cover object-top"
                        style={{ width, height }}
                        loading="eager"
                    />
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
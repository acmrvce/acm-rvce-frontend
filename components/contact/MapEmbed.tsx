"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

// Spotlight Card Component
const SpotlightCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`
    radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 80%)
  `;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn("group relative overflow-hidden rounded-xl", className)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

interface MapEmbedProps {
  embedUrl: string;
  title?: string;
  className?: string;
}

const MapEmbed: React.FC<MapEmbedProps> = ({
  embedUrl,
  title = "Location Map",
  className,
}) => {
  return (
    <SpotlightCard className={className}>
      <motion.div
        className="w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-white/10 transition-all duration-300 hover:border-neutral-300 dark:hover:border-white/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.43, 0.13, 0.23, 0.96] as unknown as any,
        }}
      >
        <div className="w-full h-full">
          <iframe
            src={embedUrl}
            title={title}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </motion.div>
    </SpotlightCard>
  );
};

export default MapEmbed;

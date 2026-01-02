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
  PanInfo,
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
  <style
    dangerouslySetInnerHTML={{
      __html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-primary { font-family: 'Manrope', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', sans-serif; }
  `,
    }}
  />
);

// --- Data: Internships (from public/internships folder) ---
// Parse internship data from filenames
// Format: "name - company.ext" or "name - company1, company2.ext"
const parseInternshipFromFilename = (filename: string) => {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");

  // Split by ' - ' to get parts
  const parts = nameWithoutExt.split(" - ");

  if (parts.length >= 2) {
    const [namePart, companyPart] = parts;

    // Capitalize name parts
    const capitalizeName = (name: string) => {
      return name
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    };

    // Parse multiple companies separated by commas
    const companies = companyPart
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    return {
      member: capitalizeName(namePart.trim()),
      title: companies[0], // Primary company
      companies: companies, // All companies
      prize:
        companies.length > 1 ? `${companies.length} Internships` : "Intern",
      category: "Internship",
    };
  }

  // Fallback if format doesn't match
  return {
    member: nameWithoutExt,
    title: "Tech Company",
    companies: ["Tech Company"],
    prize: "Intern",
    category: "Internship",
  };
};

const internshipFiles = [
  "Aditya Bhandari - Microsoft.avif",
  "Anirudh Kulkarni - Siemens, Teller, WIRIN, Samsung PRISM.avif",
  "Aryan Chaturvedi - Skysecure.avif",
  "Aryan Rai - Scorpio Group.avif",
  "Ayush  - EY.avif",
  "Kislay - CoinDCX.avif",
  "Mehar Kulkarni - Dell.avif",
  "Mihir Arya - SpikedAI.avif",
  "Pranav Jambur - IISC.avif",
  "Priyanshu Deepak - Groww.avif",
  "Smruthi S K - Deutche Bank.avif",
  "Taha - IISC, Hidevs.avif",
  "Tallam Sri Sai Subramanyam - Samsung PRISM.avif",
  "Vishal K Bhat - Linkedin, Samsung PRISM.jpg",
  "Yash Saraogi - Samsung PRISM.avif",
];

const internships = internshipFiles.map((filename, index) => {
  const parsed = parseInternshipFromFilename(filename);
  const companyList = parsed.companies.join(", ");
  return {
    id: index + 1,
    ...parsed,
    image: `/internships/${filename}`,
    description: `${parsed.member} secured ${parsed.companies.length > 1 ? `${parsed.companies.length} prestigious internships` : "an internship"} at ${companyList}, showcasing exceptional skills and dedication in their field.`,
  };
});

// --- Data: Achievements (from public/achievements folder) ---
// Parse achievement data from filenames
// Format: "name - event - position.ext" or "event - name - position.ext"
const parseAchievementFromFilename = (filename: string) => {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");

  // Split by ' - ' to get parts
  const parts = nameWithoutExt.split(" - ");

  if (parts.length >= 3) {
    // Try to identify which part is what
    const [part1, part2, part3] = parts;

    // Capitalize name parts
    const capitalizeName = (name: string) => {
      return name
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    };

    return {
      member: capitalizeName(part1.trim()),
      title: part2.trim(),
      prize: capitalizeName(part3.trim()),
      category: "Achievement",
    };
  }

  // Fallback if format doesn't match
  return {
    member: "ACM Member",
    title: nameWithoutExt,
    prize: "Winner",
    category: "Achievement",
  };
};

const achievementFiles = [
  "Yash Saraogi & Tallam Sai - Hackotsav 2025 MAHE - Winner.jpeg",
  "Aryan Rai - DSU X LETU Innoquest - Winner.jpg",
  "Vishal K Bhat - Codequest by Dell - 1st Runner up.jpeg",
  "Mohan Kartik & Pranav Jambur - HackEEE 4.0 - 1st Runner up.jpg",
  "Taha - FOSS FEST 2025 - 2nd Runner up.jpg",
  "Tallam Sai - CMRIT CTF - winner.jpeg",
  "Tallam Sai - Exuberance - Runner Up.jpeg",
  "Anirudh Kulkarni - Warpspeed - Winner.jpeg",
  "Yash Saraogi - Smart India Hackathon 2025 - Winner.jpg",
];

const achievements = achievementFiles.map((filename, index) => {
  const parsed = parseAchievementFromFilename(filename);
  return {
    id: index + 1,
    ...parsed,
    image: `/achievements/${filename}`,
    description: `Congratulations to ${parsed.member} for achieving ${parsed.prize} at ${parsed.title}! A remarkable achievement showcasing excellence and dedication.`,
  };
});

// --- Sub-Component: Achievement Card ---
type AchievementItem = (typeof achievements)[0] | (typeof internships)[0];
const AchievementCard = ({
  item,
  onClick,
}: {
  item: AchievementItem;
  onClick: () => void;
}) => {
  const hasMultipleCompanies = "companies" in item && item.companies.length > 1;

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
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white">
          {item.category}
        </span>
        {hasMultipleCompanies && (
          <span className="px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-400/30 text-[10px] font-bold uppercase tracking-widest text-purple-300">
            {item.companies.length}×
          </span>
        )}
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
        {hasMultipleCompanies && (
          <p className="text-xs text-neutral-500 mt-1">
            +{item.companies.length - 1} more{" "}
            {item.companies.length - 1 === 1 ? "company" : "companies"}
          </p>
        )}
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
  onClose,
}: {
  item: AchievementItem | null;
  onClose: () => void;
}) => {
  // Lock body scroll when open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  // Simplified Drag Logic
  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
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
        <div
          className="flex-1 overflow-y-auto font-primary no-scrollbar"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* e.stopPropagation() helps prevent drag triggering when scrolling content */}
          {/* Hero Image */}
          <div className="relative h-80 sm:h-96 w-full shrink-0">
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
                <span className="text-xs uppercase tracking-wider font-bold mb-1 opacity-70">
                  Category
                </span>
                <span className="text-neutral-900 dark:text-white font-medium">
                  {item.category}
                </span>
              </div>
              <div className="w-px h-10 bg-neutral-200 dark:bg-white/10" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-bold mb-1 opacity-70">
                  Achiever
                </span>
                <span className="text-neutral-900 dark:text-white font-medium">
                  {item.member}
                </span>
              </div>
            </div>

            {/* Multiple Companies Display for Internships */}
            {"companies" in item && item.companies.length > 1 && (
              <div>
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">
                  Companies ({item.companies.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.companies.map((company, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm font-medium border border-neutral-200 dark:border-neutral-700"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                {"companies" in item && item.companies.length > 1
                  ? "About the Journey"
                  : "About the Win"}
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Component ---
const ProjectVelocity = () => {
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(
    null
  );

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
            <span className="font-tech text-xs uppercase tracking-widest text-neutral-500">
              Hall of Fame
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.9]">
            Our <br /> Achievements.
          </h2>
        </div>
        <p className="max-w-sm text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Celebrating the victories, breakthroughs, and milestones of our
          exceptional community members on the global stage.
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-10">
        {/* First Row: Internships (placeholder data - to be updated) */}
        <ParallaxText baseVelocity={-1.5}>
          {internships.map((item) => (
            <AchievementCard
              key={`row1-${item.id}`}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </ParallaxText>

        {/* Second Row: Real Achievements from public/achievements folder */}
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

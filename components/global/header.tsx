"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import TransitionLink from "./transition-link";

// --- Configuration ---
const headerConfig = {
  brand: {
    title: "ACM RVCE",
    logo: "/logos/acm-rvce-logo.png", 
  },
  navigationLinks: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Team", href: "/team" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ]
};

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Font Injection ---
const HeaderFonts = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@400;500&display=swap');
    .font-header { font-family: 'Manrope', sans-serif; }
    .font-tech { font-family: 'Space Grotesk', monospace; }
  `}} />
);

// --- THEME ANIMATION LOGIC (From Skiper26 Reference) ---

export type AnimationVariant = "circle" | "rectangle" | "gif" | "polygon" | "circle-blur";
export type AnimationStart = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center" | "top-center" | "bottom-center" | "bottom-up" | "top-down" | "left-right" | "right-left";

interface Animation {
  name: string;
  css: string;
}

const getPositionCoords = (position: AnimationStart) => {
  switch (position) {
    case "top-left": return { cx: "0", cy: "0" };
    case "top-right": return { cx: "40", cy: "0" };
    case "bottom-left": return { cx: "0", cy: "40" };
    case "bottom-right": return { cx: "40", cy: "40" };
    case "top-center": return { cx: "20", cy: "0" };
    case "bottom-center": return { cx: "20", cy: "40" };
    // For directional positions, default to center (these are used for rectangle variant)
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left": return { cx: "20", cy: "20" };
    default: return { cx: "0", cy: "0" };
  }
};

const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  if (variant === "circle-blur") {
    if (start === "center") {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>`;
    }
    const positionCoords = getPositionCoords(start);
    if (!positionCoords) {
        // Fallback if undefined
        return ""; 
    }
    const { cx, cy } = positionCoords;
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`;
  }

  if (start === "center") return;
  if (variant === "rectangle") return "";

  const positionCoords = getPositionCoords(start);
  if (!positionCoords) return "";
  const { cx, cy } = positionCoords;

  if (variant === "circle") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`;
  }

  return "";
};

const getTransformOrigin = (start: AnimationStart) => {
  switch (start) {
    case "top-left": return "top left";
    case "top-right": return "top right";
    case "bottom-left": return "bottom left";
    case "bottom-right": return "bottom right";
    case "top-center": return "top center";
    case "bottom-center": return "bottom center";
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left": return "center";
    default: return "center";
  }
};

export const createAnimation = (variant: AnimationVariant, start: AnimationStart = "center", blur = false, url?: string): Animation => {
  const svg = generateSVG(variant, start);
  const transformOrigin = getTransformOrigin(start);

  if (variant === "rectangle") {
    const getClipPath = (direction: AnimationStart) => {
      switch (direction) {
        case "bottom-up": return { from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
        case "top-down": return { from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
        case "left-right": return { from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
        case "right-left": return { from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
        case "top-left": return { from: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
        case "top-right": return { from: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
        case "bottom-left": return { from: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
        case "bottom-right": return { from: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
        default: return { from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
      }
    };
    const clipPath = getClipPath(start);
    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
       ::view-transition-group(root) { animation-duration: 0.7s; animation-timing-function: var(--expo-out); }
       ::view-transition-new(root) { animation-name: reveal-light-${start}${blur ? "-blur" : ""}; ${blur ? "filter: blur(2px);" : ""} }
       ::view-transition-old(root), .dark::view-transition-old(root) { animation: none; z-index: -1; }
       .dark::view-transition-new(root) { animation-name: reveal-dark-${start}${blur ? "-blur" : ""}; ${blur ? "filter: blur(2px);" : ""} }
       @keyframes reveal-dark-${start}${blur ? "-blur" : ""} { from { clip-path: ${clipPath.from}; ${blur ? "filter: blur(8px);" : ""} } ${blur ? "50% { filter: blur(4px); }" : ""} to { clip-path: ${clipPath.to}; ${blur ? "filter: blur(0px);" : ""} } }
       @keyframes reveal-light-${start}${blur ? "-blur" : ""} { from { clip-path: ${clipPath.from}; ${blur ? "filter: blur(8px);" : ""} } ${blur ? "50% { filter: blur(4px); }" : ""} to { clip-path: ${clipPath.to}; ${blur ? "filter: blur(0px);" : ""} } }
      `,
    };
  }

  if (variant === "circle" && start == "center") {
    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
       ::view-transition-group(root) { animation-duration: 0.7s; animation-timing-function: var(--expo-out); }
       ::view-transition-new(root) { animation-name: reveal-light${blur ? "-blur" : ""}; ${blur ? "filter: blur(2px);" : ""} }
       ::view-transition-old(root), .dark::view-transition-old(root) { animation: none; z-index: -1; }
       .dark::view-transition-new(root) { animation-name: reveal-dark${blur ? "-blur" : ""}; ${blur ? "filter: blur(2px);" : ""} }
       @keyframes reveal-dark${blur ? "-blur" : ""} { from { clip-path: circle(0% at 50% 50%); ${blur ? "filter: blur(8px);" : ""} } ${blur ? "50% { filter: blur(4px); }" : ""} to { clip-path: circle(100.0% at 50% 50%); ${blur ? "filter: blur(0px);" : ""} } }
       @keyframes reveal-light${blur ? "-blur" : ""} { from { clip-path: circle(0% at 50% 50%); ${blur ? "filter: blur(8px);" : ""} } ${blur ? "50% { filter: blur(4px); }" : ""} to { clip-path: circle(100.0% at 50% 50%); ${blur ? "filter: blur(0px);" : ""} } }
      `,
    };
  }

  if (variant === "circle-blur") {
    if (start === "center") {
      return {
        name: `${variant}-${start}`,
        css: `
        ::view-transition-group(root) { animation-timing-function: var(--expo-out); }
        ::view-transition-new(root) { mask: url('${svg}') center / 0 no-repeat; mask-origin: content-box; animation: scale 1s; transform-origin: center; }
        ::view-transition-old(root), .dark::view-transition-old(root) { animation: scale 1s; transform-origin: center; z-index: -1; }
        @keyframes scale { to { mask-size: 350vmax; } }
        `,
      };
    }
    return {
      name: `${variant}-${start}`,
      css: `
      ::view-transition-group(root) { animation-timing-function: var(--expo-out); }
      ::view-transition-new(root) { mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat; mask-origin: content-box; animation: scale 1s; transform-origin: ${transformOrigin}; }
      ::view-transition-old(root), .dark::view-transition-old(root) { animation: scale 1s; transform-origin: ${transformOrigin}; z-index: -1; }
      @keyframes scale { to { mask-size: 350vmax; } }
      `,
    };
  }

  if (variant === "circle" && start !== "center") {
    const getClipPathPosition = (position: AnimationStart) => {
      switch (position) {
        case "top-left": return "0% 0%";
        case "top-right": return "100% 0%";
        case "bottom-left": return "0% 100%";
        case "bottom-right": return "100% 100%";
        case "top-center": return "50% 0%";
        case "bottom-center": return "50% 100%";
        default: return "50% 50%";
      }
    };
    const clipPosition = getClipPathPosition(start);
    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
       ::view-transition-group(root) { animation-duration: 1s; animation-timing-function: var(--expo-out); }
       ::view-transition-new(root) { animation-name: reveal-light-${start}${blur ? "-blur" : ""}; ${blur ? "filter: blur(2px);" : ""} }
       ::view-transition-old(root), .dark::view-transition-old(root) { animation: none; z-index: -1; }
       .dark::view-transition-new(root) { animation-name: reveal-dark-${start}${blur ? "-blur" : ""}; ${blur ? "filter: blur(2px);" : ""} }
       @keyframes reveal-dark-${start}${blur ? "-blur" : ""} { from { clip-path: circle(0% at ${clipPosition}); ${blur ? "filter: blur(8px);" : ""} } ${blur ? "50% { filter: blur(4px); }" : ""} to { clip-path: circle(150.0% at ${clipPosition}); ${blur ? "filter: blur(0px);" : ""} } }
       @keyframes reveal-light-${start}${blur ? "-blur" : ""} { from { clip-path: circle(0% at ${clipPosition}); ${blur ? "filter: blur(8px);" : ""} } ${blur ? "50% { filter: blur(4px); }" : ""} to { clip-path: circle(150.0% at ${clipPosition}); ${blur ? "filter: blur(0px);" : ""} } }
      `,
    };
  }

  return {
    name: `${variant}-${start}${blur ? "-blur" : ""}`,
    css: `
      ::view-transition-group(root) { animation-timing-function: var(--expo-in); }
      ::view-transition-new(root) { mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat; mask-origin: content-box; animation: scale-${start}${blur ? "-blur" : ""} 1s; transform-origin: ${transformOrigin}; ${blur ? "filter: blur(2px);" : ""} }
      ::view-transition-old(root), .dark::view-transition-old(root) { animation: scale-${start}${blur ? "-blur" : ""} 1s; transform-origin: ${transformOrigin}; z-index: -1; }
      @keyframes scale-${start}${blur ? "-blur" : ""} { from { ${blur ? "filter: blur(8px);" : ""} } ${blur ? "50% { filter: blur(4px); }" : ""} to { mask-size: 2000vmax; ${blur ? "filter: blur(0px);" : ""} } }
    `,
  };
};

// --- Custom Hook: useThemeToggle (Optimistic State Update) ---
export const useThemeToggle = ({
  variant = "circle",
  start = "center",
  blur = false,
  gifUrl = "",
}: {
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
} = {}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  // Sync state after hydration/change
  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const styleId = "theme-transition-styles";

  const updateStyles = useCallback((css: string, name: string) => {
    if (typeof window === "undefined") return;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    // Optimistic toggle to update UI immediately
    setIsDark((prev) => !prev);

    const animation = createAnimation(variant, start, blur, gifUrl);
    updateStyles(animation.css, animation.name);

    if (typeof window === "undefined") return;

    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [theme, setTheme, variant, start, blur, gifUrl, updateStyles]);

  // Crazy mode helpers omitted for brevity as they share logic
  return { isDark, toggleTheme };
};

// --- Theme Toggle Button ---
export const ThemeToggleButton = ({ className = "", variant = "circle", start = "top-right", blur = false }: { className?: string; variant?: AnimationVariant; start?: AnimationStart; blur?: boolean; gifUrl?: string; }) => {
  const { isDark, toggleTheme } = useThemeToggle({ variant, start, blur });

  return (
    <button
      type="button"
      className={cn(
        "size-10 cursor-pointer rounded-full bg-transparent p-0 transition-all duration-300 active:scale-90 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700",
        className,
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <motion.g
          animate={{ rotate: isDark ? -180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <path d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5" fill="currentColor" className="text-neutral-900 dark:text-white" />
          <path d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5" fill="currentColor" className="text-neutral-900 dark:text-black" />
        </motion.g>
        <motion.path
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill="currentColor"
          className="text-neutral-900 dark:text-white"
        />
      </svg>
    </button>
  );
};

// --- Mobile Menu ---
const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

interface StaggeredMenuProps {
  items: typeof headerConfig.navigationLinks;
  socialItems: typeof socialItems;
  logoUrl: string;
  logoText: string;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({ items, socialItems }) => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button 
        className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        onClick={toggleMenu}
        aria-label="Menu"
      >
         <Menu className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
      </button>

      <div 
        className={cn(
            "fixed inset-0 z-[100] bg-white dark:bg-[#0a0a0a] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
            open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-8 font-header">
             <div className="flex justify-end">
                <button 
                    onClick={toggleMenu}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 hover:scale-90 transition-transform"
                >
                    <X className="h-5 w-5 text-black dark:text-white" />
                </button>
             </div>
             
             <div className="flex flex-1 flex-col justify-center gap-4 px-4 overflow-y-auto">
                {items.map((item, idx) => (
                    <TransitionLink 
                        key={idx} 
                        href={item.href} 
                        onClick={toggleMenu}
                        className="group flex items-center gap-4 text-3xl sm:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white transition-colors hover:text-neutral-400"
                    >
                        <span className="text-sm font-mono text-neutral-400 dark:text-neutral-600 group-hover:text-blue-500">0{idx + 1}</span>
                        {item.label}
                    </TransitionLink>
                ))}
             </div>

             <div className="flex gap-6 px-4 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                {socialItems.map((social, idx) => (
                    <a key={idx} href={social.link} className="text-sm font-medium uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                        {social.label}
                    </a>
                ))}
             </div>
        </div>
      </div>
    </>
  );
};

// --- Main Header Component ---
export function Header() {
  const [pathname, setPathname] = useState("/");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setPathname(window.location.pathname);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HeaderFonts />
      <header className="fixed left-0 right-0 top-0 z-50 p-4 sm:p-6 font-header">
        <div 
            className={cn(
                "mx-auto flex h-16 max-w-[1400px] items-center justify-between rounded-full border px-4 transition-all duration-300 ease-out",
                isScrolled 
                    ? "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-neutral-200 dark:border-white/10 shadow-sm"
                    : "bg-transparent border-transparent"
            )}
        >
          {/* Logo */}
          <TransitionLink href="/" className="flex items-center gap-3 group">
             <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1 shadow-sm">
                <img 
                  src={headerConfig.brand.logo} 
                  alt={headerConfig.brand.title} 
                  className="h-full w-full object-contain"
                />
             </div>
             <span className={cn(
                "hidden sm:block text-sm font-bold tracking-tight transition-opacity duration-300 uppercase font-tech",
                isScrolled ? "text-neutral-900 dark:text-white" : "text-neutral-900 dark:text-white mix-blend-difference" 
             )}>
                {headerConfig.brand.title}
             </span>
          </TransitionLink>

          {/* Desktop Nav */}
          <nav className="hidden lg:block">
            <LayoutGroup>
              <ul className="flex items-center gap-1 bg-neutral-100/50 dark:bg-white/5 p-1 rounded-full border border-neutral-200 dark:border-white/5 backdrop-blur-sm">
                {headerConfig.navigationLinks.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href} className="relative">
                      <TransitionLink
                        href={item.href}
                        onClick={() => setPathname(item.href)}
                        className={cn(
                          "relative z-10 block px-4 py-2 text-xs font-semibold transition-colors duration-200 uppercase tracking-wide",
                          isActive 
                            ? "text-neutral-900 dark:text-white" 
                            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                        )}
                      >
                        {item.label}
                      </TransitionLink>
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 z-0 rounded-full bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </LayoutGroup>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
             <ThemeToggleButton variant="circle" start="top-right" blur={false} />
             
             <div className="lg:hidden">
                <StaggeredMenu 
                    items={headerConfig.navigationLinks} 
                    socialItems={socialItems} 
                    logoUrl={headerConfig.brand.logo} 
                    logoText={headerConfig.brand.title} 
                />
             </div>
          </div>
        </div>
      </header>
    </>
  );
}
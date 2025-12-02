"use client";

// Required libraries:
// npm install framer-motion lucide-react clsx tailwind-merge
import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Local utility function ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Main ContactHero Component ---
interface ContactHeroProps {
  title: string;
  subtitle: string;
  image: string;
  className?: string;
}

const ContactHero: React.FC<ContactHeroProps> = ({
  title,
  subtitle,
  image,
  className,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as unknown as any },
    },
  };

  const socialLinks = [
    { icon: Mail, href: "mailto:contact@acmrvce.in", label: "Email" },
    { icon: Github, href: "https://github.com/acm-rvce", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/acm-rvce",
      label: "LinkedIn",
    },
    { icon: Twitter, href: "https://twitter.com/acm_rvce", label: "Twitter" },
  ];

  return (
    <>
      {/* Self-contained animation for the background grid */}
      <style>{`
        @keyframes bg-pan {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-bg-pan {
          animation: bg-pan 20s linear infinite alternate;
          background-size: 200% 200%;
        }
      `}</style>

      <section
        className={cn(
          "relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-white dark:bg-black",
          className
        )}
      >
        {/* Background Grid and Gradients */}
        <div
          className="absolute inset-0 z-0 opacity-40 dark:opacity-20 animate-bg-pan"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, transparent, var(--background)), radial-gradient(circle at 10% 20%, #0466c830, transparent 30%), radial-gradient(circle at 90% 80%, #0353a420, transparent 30%)`,
          }}
        ></div>
        <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M20%200v40M0%2020h40%22%20stroke%3D%22%23e2e8f0%22%20stroke-width%3D%220.5%22%20stroke-linecap%3D%22square%22%2F%3E%3C%2Fsvg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M20%200v40M0%2020h40%22%20stroke%3D%22%231e293b%22%20stroke-width%3D%220.5%22%20stroke-linecap%3D%22square%22%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-white dark:from-black z-10" />

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-20 flex flex-col items-center text-center px-4"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold text-black-900 dark:text-white tracking-tight"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-black-600 dark:text-black-400 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex justify-center gap-4"
          >
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-3 bg-white/50 dark:bg-black-800/50 border border-black-200 dark:border-black-800 rounded-full text-black-600 dark:text-black-300 hover:bg-white dark:hover:bg-black-800 hover:text-blue-600 dark:hover:text-white transition-all duration-300"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            Scroll down to get in touch
          </p>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-blue-600 dark:border-blue-400 flex items-start justify-center p-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Image at the bottom */}
        <motion.div
          className="absolute bottom-0 w-full max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1] as unknown as any,
            delay: 0.4,
          }}
        >
          <img
            src={image}
            alt="Contact page illustration"
            className="w-full h-auto object-cover object-top [mask-image:linear-gradient(to_top,black_50%,transparent_100%)]"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/1280x720/1E293B/FFFFFF?text=Team+Photo";
              e.currentTarget.onerror = null;
            }}
          />
        </motion.div>
      </section>
    </>
  );
};

export default ContactHero;

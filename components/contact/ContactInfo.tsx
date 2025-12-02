"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  fadeInUpVariants,
  listItemVariants,
  socialButtonVariants,
} from "@/lib/config/animations";
import { cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";

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

interface ContactInfoProps {
  title: string;
  items: Array<{
    icon: string;
    label: string;
    value: string;
    link?: string;
  }>;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin className="h-5 w-5" />,
  Mail: <Mail className="h-5 w-5" />,
  Phone: <Phone className="h-5 w-5" />,
  Linkedin: <Linkedin className="h-5 w-5" />,
  Github: <Github className="h-5 w-5" />,
  Instagram: <Instagram className="h-5 w-5" />,
  Facebook: <Facebook className="h-5 w-5" />,
  Twitter: <Twitter className="h-5 w-5" />,
  Youtube: <Youtube className="h-5 w-5" />,
};

const ContactInfo: React.FC<ContactInfoProps> = ({
  title,
  items,
  socialLinks,
  className,
}) => {
  return (
    <motion.div
      className={cn("w-full", className)}
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
    >
      <SpotlightCard>
        <div className="border border-neutral-200 dark:border-white/10 rounded-xl shadow-sm p-4 md:p-6 transition-all duration-300 hover:border-neutral-300 dark:hover:border-white/20">
          <motion.h3
            className="text-xl md:text-2xl font-bold mb-6 text-foreground border-b border-neutral-200 dark:border-white/10 pb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h3>

          <motion.ul
            className="grid grid-cols-1 gap-4 mb-8"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {items.map((item, index) => (
              <motion.li
                key={item.label}
                className="flex items-start gap-3"
                variants={listItemVariants}
                custom={index}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <motion.div
                  className="mt-1 bg-blue-500/10 p-2 rounded-full text-blue-600 dark:text-blue-400"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {iconMap[item.icon]}
                </motion.div>
                <div>
                  <p className="font-medium text-sm text-muted-foreground">
                    {item.label}
                  </p>
                  {item.link ? (
                    <motion.a
                      href={item.link}
                      className="text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                      whileHover={{ x: 2 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {item.value}
                    </motion.a>
                  ) : (
                    <p className="text-foreground">{item.value}</p>
                  )}
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {socialLinks.length > 0 && (
            <motion.div
              className="border-t border-neutral-200 dark:border-white/10 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm font-medium mb-3 text-foreground">
                Connect with us
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-neutral-100 dark:bg-neutral-800 p-2.5 rounded-full text-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300"
                    variants={socialButtonVariants}
                    whileHover="hover"
                    initial="rest"
                    aria-label={link.platform}
                  >
                    {iconMap[link.icon]}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default ContactInfo;

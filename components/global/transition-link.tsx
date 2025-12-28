"use client";

import React, { MouseEvent } from "react";
import Link from "next/link";
import { useTransition } from "./transition-context";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
}

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...props
}: TransitionLinkProps) {
  const { startTransition } = useTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Allow external links to work normally
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      onClick?.(e);
      return;
    }

    e.preventDefault();
    onClick?.(e);
    startTransition(href);
  };

  // For external links, use regular anchor
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={className} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

"use client";

import React from "react";

// This component is deprecated and replaced by transition-overlay.tsx
// Kept for backward compatibility if imported anywhere
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {

  return <>{children}</>;
}
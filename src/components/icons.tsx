import type { SVGProps } from "react";
import type { ElementId } from "@/lib/elements";

type P = SVGProps<SVGSVGElement>;
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GoalsquareLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 40" className={className} role="img" aria-label="Goalsquare">
      <rect x="0" y="2" width="36" height="36" rx="9" fill="var(--color-gs-green)" />
      <path
        d="M9 29V13h6.5a5.5 5.5 0 0 1 0 11H12"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="25.5" cy="15" r="2.6" fill="#fff" />
      <text
        x="46"
        y="26"
        fontFamily="Archivo, Inter, sans-serif"
        fontSize="17"
        fontWeight="800"
        letterSpacing="-0.6"
        fill="currentColor"
      >
        GOALSQUARE
      </text>
    </svg>
  );
}

export const ElementIcons: Record<ElementId, (p: P) => React.ReactElement> = {
  // 01 Basic technique – goalkeeper stance + ball
  grundtechnik: (p) => (
    <svg viewBox="0 0 32 32" {...base} {...p}>
      <circle cx="16" cy="6.4" r="2.9" />
      <path d="M16 9.6v8.2M16 12.5l-4.6 2.6M16 12.5l4.6 2.6M16 17.8l-3.6 8.4M16 17.8l3.6 8.4" />
      <circle cx="26" cy="24" r="3.4" />
    </svg>
  ),
  // 02 Footwork – fast feet ladder
  beinarbeit: (p) => (
    <svg viewBox="0 0 32 32" {...base} {...p}>
      <path d="M7 27 13 5M19 27 25 5" />
      <path d="M11.4 11h10.2M10.3 15.2h10.2M9.2 19.4h10.2M8.1 23.6h10.2" />
    </svg>
  ),
  // 03 Ball protection – hands catching
  ballsicherung: (p) => (
    <svg viewBox="0 0 32 32" {...base} {...p}>
      <circle cx="16" cy="12.6" r="5.4" />
      <path d="M6.4 27v-5.1c0-2.1 1.3-3.6 3-3.6h1.7M25.6 27v-5.1c0-2.1-1.3-3.6-3-3.6h-1.7" />
      <path d="M11.1 18.3 13 21.4M20.9 18.3 19 21.4" />
    </svg>
  ),
  // 04 Positioning – angle / cone from goal
  stellungsspiel: (p) => (
    <svg viewBox="0 0 32 32" {...base} {...p}>
      <path d="M4 8h24M4 8v7M28 8v7" />
      <path d="M16 26 7.5 12M16 26l8.5-14" strokeDasharray="2.6 2.6" />
      <circle cx="16" cy="26" r="2.3" />
      <path d="M16 15.5v-3" />
    </svg>
  ),
  // 05 Game play – goal with two figures
  spielformen: (p) => (
    <svg viewBox="0 0 32 32" {...base} {...p}>
      <path d="M3.5 24V9.5h25V24" />
      <path d="M3.5 24h25M9 24V9.5M16 24V9.5M23 24V9.5M3.5 14.5h25M3.5 19.5h25" />
      <circle cx="16" cy="28.4" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export const Icon = {
  Arrow: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  ArrowUpRight: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  ),
  Check: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  ),
  CheckCircle: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.4 2.7 2.7L16.2 9" />
    </svg>
  ),
  Cart: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M3 4h2.2l2.3 11.4a1.6 1.6 0 0 0 1.6 1.3h8.1a1.6 1.6 0 0 0 1.6-1.2L21 8H6" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17.5" cy="20" r="1.3" />
    </svg>
  ),
  Play: (p: P) => (
    <svg viewBox="0 0 24 24" {...p} fill="currentColor">
      <path d="M8 5.6v12.8a.6.6 0 0 0 .93.5l9.8-6.4a.6.6 0 0 0 0-1L8.93 5.1A.6.6 0 0 0 8 5.6Z" />
    </svg>
  ),
  Globe: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  ),
  Chevron: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Close: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  Menu: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Search: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  ),
  Calendar: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </svg>
  ),
  Book: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M4 5.5A2 2 0 0 1 6 3.5h5v17H6a2 2 0 0 0-2 2z" />
      <path d="M20 5.5a2 2 0 0 0-2-2h-5v17h5a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Layers: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3.5 12.5 8.5 4.7 8.5-4.7M3.5 16.5 12 21.2l8.5-4.7" />
    </svg>
  ),
  Activity: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M3 12.5h4l2.5-7 4 14 2.5-7H21" />
    </svg>
  ),
  Monitor: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <rect x="3" y="4" width="18" height="12.5" rx="2" />
      <path d="M9 20.5h6M12 16.5v4" />
    </svg>
  ),
  Phone: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.6 18.6h2.8" />
    </svg>
  ),
  Box: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M21 8.5v7a2 2 0 0 1-1 1.7l-7 3.9a2 2 0 0 1-2 0l-7-3.9a2 2 0 0 1-1-1.7v-7a2 2 0 0 1 1-1.7l7-3.9a2 2 0 0 1 2 0l7 3.9a2 2 0 0 1 1 1.7Z" />
      <path d="m3.3 7.5 8.7 4.9 8.7-4.9M12 21v-8.6" />
    </svg>
  ),
  Download: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5M4 19.5h16" />
    </svg>
  ),
  Sparkle: (p: P) => (
    <svg viewBox="0 0 24 24" {...p} fill="currentColor">
      <path d="M12 2.5 13.8 9 20 10.8 13.8 12.6 12 19l-1.8-6.4L4 10.8 10.2 9 12 2.5Z" />
    </svg>
  ),
  Mail: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.8 7 8.2 5.6L20.2 7" />
    </svg>
  ),
  Plus: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Minus: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M5 12h14" />
    </svg>
  ),
  Trash: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M4.5 6.5h15M9.5 6.5V4.8A1.3 1.3 0 0 1 10.8 3.5h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7M6.5 6.5l.9 12.2a1.6 1.6 0 0 0 1.6 1.5h6a1.6 1.6 0 0 0 1.6-1.5l.9-12.2" />
    </svg>
  ),
  Lock: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <rect x="4.5" y="10" width="15" height="10.5" rx="2.5" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
    </svg>
  ),
  Clock: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.4 2" />
    </svg>
  ),
  Facebook: (p: P) => (
    <svg viewBox="0 0 24 24" {...p} fill="currentColor">
      <path d="M14 8.5h2.5V5.6H14c-2.2 0-3.6 1.5-3.6 3.7v1.9H8.2v3h2.2V21h3v-6.8h2.3l.4-3h-2.7v-1.5c0-.7.3-1.2 1.1-1.2Z" />
    </svg>
  ),
  Instagram: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Youtube: (p: P) => (
    <svg viewBox="0 0 24 24" {...p} fill="currentColor">
      <path d="M21.5 8.2a2.7 2.7 0 0 0-1.9-1.9C17.9 5.8 12 5.8 12 5.8s-5.9 0-7.6.5A2.7 2.7 0 0 0 2.5 8.2 28 28 0 0 0 2 12a28 28 0 0 0 .5 3.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.5-3.8ZM10.2 15V9l5 3-5 3Z" />
    </svg>
  ),
  X: (p: P) => (
    <svg viewBox="0 0 24 24" {...p} fill="currentColor">
      <path d="M17.5 3h3.1l-6.8 7.8L22 21h-6.3l-4.4-5.8L6.2 21H3.1l7.3-8.3L2.5 3h6.4l4 5.3L17.5 3Zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5Z" />
    </svg>
  ),
};

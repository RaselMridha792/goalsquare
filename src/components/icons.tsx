import Image from "next/image";
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

/** The client's official logo (4167 x 1667). */
export function GoalsquareLogo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/img/goalsquare-logo.png"
      alt="Goalsquare — World of Goalkeeping"
      width={560}
      height={224}
      priority={priority}
      sizes="240px"
      className={className}
    />
  );
}

export const ElementIcons: Record<ElementId, (p: P) => React.ReactElement> = {
  // 01 Grundtechnik — keeper diving toward the ball (base technique)
  grundtechnik: (p) => (
    <svg viewBox="0 0 32 32" {...base} {...p}>
      <circle cx="9.6" cy="9.2" r="2.5" />
      <path d="M11.9 10.7c1.6.7 3.2 1.5 4.8 2.4 1 .6 1.6 1.2 2.6 1.2h2.3" />
      <path d="M16.7 13.1c-1.1 1.4-2.4 2.6-3.9 3.6-1.6 1-3.3 1.6-5 1.9" />
      <path d="m12.8 16.7 1.9 4.4M7.8 18.6l-.9 4.6" />
      <circle cx="25.4" cy="14.4" r="4" />
      <path d="M23 11.7c1 1 1.6 2.3 1.7 3.7M27.6 12.2c-.6 1.2-.7 2.6-.3 3.9" />
    </svg>
  ),
  // 02 Beinarbeit — football boots (fast feet, footwork)
  beinarbeit: (p) => (
    <svg viewBox="0 0 32 32" {...base} {...p}>
      <path d="M4.6 10.2c1.9-.5 3.4.2 4.6 1.6 1.2 1.4 2.6 2.3 4.3 2.7l3.4.8c1.4.3 2.2 1.2 2.3 2.6l-.1 1.2H6.2c-1.1 0-1.8-.6-1.9-1.7L4 12.8Z" />
      <path d="M5.2 22.6h13.4M6.6 20.8v1.8M10 20.8v1.8M13.4 20.8v1.8M16.8 20.8v1.8" />
      <path d="M21.6 8.2c1.5-.4 2.7.2 3.6 1.3 1 1.1 2.1 1.8 3.4 2.1l1.1.3" strokeWidth="1.3" opacity=".55" />
      <path d="M22 15.6h6.6" strokeWidth="1.3" opacity=".55" />
    </svg>
  ),
  // 03 Ballsicherung — two hands catching the ball
  ballsicherung: (p) => (
    <svg viewBox="0 0 32 32" {...base} {...p}>
      <circle cx="16" cy="11.4" r="5.2" />
      <path d="M16 6.2v2.1M11.6 9.4l2 1M20.4 9.4l-2 1M13.4 15.6l1-2.1M18.6 15.6l-1-2.1" strokeWidth="1.1" />
      <path d="M10.6 15.1c-.9-.5-2-.3-2.6.5l-2.3 3a2 2 0 0 0-.2 2l1.7 4a2.4 2.4 0 0 0 2.2 1.4h4.9" />
      <path d="M21.4 15.1c.9-.5 2-.3 2.6.5l2.3 3c.4.6.5 1.3.2 2l-1.7 4a2.4 2.4 0 0 1-2.2 1.4h-4.9" />
    </svg>
  ),
  // 04 Stellungsspiel — keeper reading the game, ball in hand
  stellungsspiel: (p) => (
    <svg viewBox="0 0 32 32" {...base} {...p}>
      <circle cx="14" cy="5.6" r="2.6" />
      <path d="M14 8.6v8.1" />
      <path d="M14 11.2 9 13.4M14 11.2l6.6 2.1" />
      <path d="m14 16.7-3.6 9.7M14 16.7l3.6 9.7" />
      <circle cx="23.4" cy="13.9" r="3" />
      <path d="M4.2 22.4a11 11 0 0 1 4-8.1" strokeDasharray="2.4 2.6" opacity=".6" />
    </svg>
  ),
  // 05 Spielformen — goal with players (game forms, competition)
  spielformen: (p) => (
    <svg viewBox="0 0 32 32" {...base} {...p}>
      <path d="M4 20.6V10h24v10.6" />
      <path d="M4 20.6h24" />
      <path d="M9.2 20.6V10M15 20.6V10M20.8 20.6V10M4 15.3h24" strokeWidth="1.1" opacity=".55" />
      <circle cx="10.6" cy="25.4" r="1.9" />
      <circle cx="21.4" cy="25.4" r="1.9" />
      <path d="M13 25.4h6" strokeDasharray="2 2.2" />
      <circle cx="16" cy="14.6" r="2.2" fill="currentColor" stroke="none" />
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

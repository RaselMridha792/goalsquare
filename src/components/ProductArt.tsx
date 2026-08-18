import type { ProductAccent, ProductCategory } from "@/lib/products";

const ACCENTS: Record<ProductAccent, string> = {
  basic: "#111827",
  pro: "#f59300",
  drills: "#1f87e8",
  app: "#00b862",
  neutral: "#6b7a73",
};

/** Deterministic, brand-consistent product artwork (no photography needed). */
export default function ProductArt({
  accent,
  category,
  label,
  className = "",
}: {
  accent: ProductAccent;
  category: ProductCategory;
  label: string;
  className?: string;
}) {
  const c = ACCENTS[accent];
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label={label}>
      <defs>
        <linearGradient id={`pg-${accent}-${category}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d1b12" />
          <stop offset="1" stopColor="#16241c" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#pg-${accent}-${category})`} />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={i * 40} width="20" height="300" fill="rgba(255,255,255,.018)" />
      ))}

      {category === "subscription" ? (
        <g>
          <rect x="112" y="60" width="176" height="180" rx="22" fill="#fff" opacity=".96" />
          <rect x="128" y="86" width="144" height="10" rx="5" fill={c} opacity=".9" />
          <rect x="128" y="108" width="104" height="8" rx="4" fill="#d7dedb" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="128" y={134 + i * 26} width="144" height="18" rx="6" fill="#eef2f0" />
          ))}
          <rect x="128" y="134" width="6" height="18" rx="3" fill={c} />
          <rect x="128" y="160" width="6" height="18" rx="3" fill={c} opacity=".6" />
          <rect x="128" y="186" width="6" height="18" rx="3" fill={c} opacity=".35" />
          <rect x="128" y="214" width="86" height="14" rx="7" fill={c} />
        </g>
      ) : category === "media" ? (
        <g>
          <circle cx="200" cy="150" r="82" fill="#fff" opacity=".95" />
          <circle cx="200" cy="150" r="76" fill="none" stroke="#e2e8e5" strokeWidth="2" />
          <circle cx="200" cy="150" r="24" fill={c} opacity=".18" />
          <circle cx="200" cy="150" r="13" fill="#0d1b12" />
          <path d="M200 74a76 76 0 0 1 66 38" stroke={c} strokeWidth="7" fill="none" strokeLinecap="round" />
        </g>
      ) : category === "accessory" ? (
        <g>
          <rect x="104" y="126" width="150" height="48" rx="10" fill="#fff" opacity=".95" />
          <rect x="254" y="138" width="42" height="24" rx="4" fill="#c9d2ce" />
          <rect x="262" y="144" width="8" height="12" rx="2" fill="#0d1b12" />
          <rect x="278" y="144" width="8" height="12" rx="2" fill="#0d1b12" />
          <circle cx="132" cy="150" r="12" fill={c} opacity=".85" />
        </g>
      ) : category === "drills" ? (
        <g>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={96 + i * 14}
              y={92 + i * 14}
              width="176"
              height="116"
              rx="14"
              fill="#fff"
              opacity={0.35 + i * 0.3}
            />
          ))}
          <rect x="124" y="120" width="176" height="116" rx="14" fill="#fff" />
          <g stroke={c} strokeWidth="2.4" fill="none" strokeLinecap="round">
            <path d="M150 210 200 150l38 46" strokeDasharray="5 5" />
          </g>
          <circle cx="150" cy="210" r="7" fill={c} />
          <circle cx="238" cy="196" r="7" fill={c} />
          <circle cx="200" cy="150" r="6" fill="#0d1b12" />
        </g>
      ) : (
        <g>
          <rect x="86" y="72" width="228" height="146" rx="12" fill="#fff" opacity=".96" />
          <rect x="86" y="72" width="228" height="26" rx="12" fill={c} opacity=".92" />
          <circle cx="102" cy="85" r="4" fill="#fff" opacity=".8" />
          <circle cx="116" cy="85" r="4" fill="#fff" opacity=".55" />
          <rect x="102" y="114" width="66" height="88" rx="8" fill="#eef2f0" />
          <rect x="180" y="114" width="118" height="12" rx="6" fill="#e2e8e5" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="180" y={136 + i * 18} width={112 - i * 14} height="10" rx="5" fill="#eef2f0" />
          ))}
          <rect x="112" y="126" width="46" height="6" rx="3" fill={c} />
          <rect x="112" y="140" width="34" height="6" rx="3" fill="#c9d2ce" />
          <rect x="150" y="228" width="100" height="14" rx="7" fill="#1a2620" />
        </g>
      )}
    </svg>
  );
}

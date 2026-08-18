"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ElementIcons, Icon } from "./icons";
import type { ResolvedElement } from "@/lib/elements";

/**
 * The 5 core elements, exactly as agreed with the client on 18 Aug:
 * no pyramid – element list on the left, matrix card on the right,
 * big number instead of "STUFE", bold intro line + "Mehr erfahren…" expand,
 * plus "Beispiel-Übung" and "Video" actions.
 */
export default function ElementsExplorer({
  elements,
  compact = false,
}: {
  elements: ResolvedElement[];
  compact?: boolean;
}) {
  const t = useTranslations("elements");
  const tc = useTranslations("common");
  const [activeId, setActiveId] = useState(elements[2]?.id ?? elements[0].id);
  const [expanded, setExpanded] = useState(false);
  const [media, setMedia] = useState<"none" | "drill" | "video">("none");

  const active = elements.find((e) => e.id === activeId) ?? elements[0];

  function select(id: typeof activeId) {
    setActiveId(id);
    setExpanded(false);
    setMedia("none");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-10">
      {/* ---------------- element list ---------------- */}
      <ul className="grid content-start gap-2 self-start" role="tablist" aria-label={t("title")}>
        {elements.map((el) => {
          const on = el.id === active.id;
          const IconEl = ElementIcons[el.icon];
          return (
            <li key={el.id}>
              <button
                role="tab"
                aria-selected={on}
                onClick={() => select(el.id)}
                className={`group flex w-full items-start gap-3.5 rounded-2xl border-l-[3px] p-3.5 text-left transition-all duration-200 sm:gap-4 sm:p-4 ${
                  on ? "bg-white shadow-[0_10px_34px_-22px_rgba(0,0,0,.55)]" : "border-l-transparent hover:bg-white/70"
                }`}
                style={on ? { borderLeftColor: el.color, background: "#fff" } : undefined}
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl transition sm:h-12 sm:w-12"
                  style={{
                    background: on ? el.colorSoft : "rgba(0,0,0,.035)",
                    color: on ? el.color : "var(--color-gs-muted)",
                  }}
                >
                  <IconEl className="h-6 w-6" />
                </span>

                <span className="min-w-0 flex-1 pt-0.5">
                  <span className="flex items-center gap-2">
                    <span
                      className={`font-display text-[16.5px] font-bold tracking-tight transition sm:text-[17.5px] ${
                        on ? "text-gs-ink" : "text-gs-muted group-hover:text-gs-ink"
                      }`}
                    >
                      {el.title}
                    </span>
                    <span
                      className="ml-auto font-mono text-[11px] font-bold tabular-nums transition"
                      style={{ color: on ? el.color : "rgba(0,0,0,.2)" }}
                    >
                      {el.number}
                    </span>
                  </span>
                  {on && (
                    <span className="gs-anim mt-1.5 block text-[13.5px] leading-relaxed text-gs-muted">
                      {el.intro}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* ---------------- matrix card ---------------- */}
      <div
        key={active.id}
        className="gs-anim relative overflow-hidden rounded-3xl border-2 p-6 sm:p-8"
        style={{ borderColor: active.color, background: active.colorSoft }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-3 -top-8 select-none font-display text-[10rem] font-extrabold leading-none tracking-tighter opacity-[.10] sm:text-[13rem]"
          style={{ color: active.color }}
        >
          {active.number}
        </span>

        <div className="relative">
          <span
            className="font-display text-4xl font-extrabold leading-none tabular-nums sm:text-5xl"
            style={{ color: active.color }}
          >
            {active.number}
          </span>

          <h3 className="mt-3 flex items-center gap-2.5 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold tracking-tight">
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: active.color }}
            />
            {active.title}
          </h3>

          <p className="mt-3 max-w-prose text-[15px] font-semibold leading-relaxed text-gs-ink/85 sm:text-[16px]">
            {active.intro}
          </p>

          {expanded && (
            <div className="gs-anim mt-4 grid gap-3 border-t pt-4" style={{ borderColor: `${active.color}33` }}>
              {active.body.map((p, i) => (
                <p key={i} className="max-w-prose text-[14px] leading-relaxed text-gs-muted">
                  {p}
                </p>
              ))}
            </div>
          )}

          <p className="mt-6 text-[11px] font-bold uppercase tracking-[.16em] text-gs-muted">
            {t("contents")}
          </p>
          <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
            {active.contents.map((c) => (
              <li key={c} className="flex items-start gap-2 text-[14px] text-gs-ink/80">
                <span
                  aria-hidden
                  className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: active.color }}
                />
                {c}
              </li>
            ))}
          </ul>

          {media !== "none" && (
            <div
              className="gs-anim mt-6 overflow-hidden rounded-2xl border bg-white"
              style={{ borderColor: `${active.color}44` }}
            >
              {media === "drill" ? (
                <DrillPreview element={active} label={tc("exampleDrill")} />
              ) : (
                <VideoPreview element={active} label={tc("video")} />
              )}
            </div>
          )}

          {!compact && (
            <div
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-5 text-[14px] font-semibold"
              style={{ borderColor: `${active.color}33` }}
            >
              <button
                onClick={() => setExpanded((v) => !v)}
                className="inline-flex items-center gap-1.5 underline underline-offset-4 transition hover:opacity-70"
                style={{ color: "var(--color-gs-green-600)" }}
              >
                {expanded ? tc("showLess") : tc("showMore")}
                <Icon.Chevron className={`h-3.5 w-3.5 transition ${expanded ? "rotate-180" : ""}`} />
              </button>

              <button
                onClick={() => setMedia((m) => (m === "drill" ? "none" : "drill"))}
                className="ml-auto inline-flex items-center gap-1.5 underline underline-offset-4 transition hover:opacity-70"
                style={{ color: "var(--color-gs-green-600)" }}
              >
                <Icon.Layers className="h-4 w-4" />
                {tc("exampleDrill")}
              </button>

              <button
                onClick={() => setMedia((m) => (m === "video" ? "none" : "video"))}
                className="inline-flex items-center gap-1.5 underline underline-offset-4 transition hover:opacity-70"
                style={{ color: "var(--color-gs-green-600)" }}
              >
                <Icon.Play className="h-3.5 w-3.5" />
                {tc("video")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DrillPreview({ element, label }: { element: ResolvedElement; label: string }) {
  return (
    <figure className="m-0">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0f2417]">
        <PitchDiagram color={element.color} />
      </div>
      <figcaption className="flex items-center gap-2 px-4 py-2.5 text-[12.5px] text-gs-muted">
        <Icon.Layers className="h-3.5 w-3.5" style={{ color: element.color }} />
        {label} · {element.title}
      </figcaption>
    </figure>
  );
}

function VideoPreview({ element, label }: { element: ResolvedElement; label: string }) {
  return (
    <figure className="m-0">
      <div className="relative grid aspect-video w-full place-items-center bg-gs-ink">
        {/*
          Drop the client's original clips into /public/media (GSV0001.mp4 …).
          Until then this is a poster with a play affordance.
        */}
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          src={element.video}
          controls
          preload="none"
          playsInline
        />
        <span className="pointer-events-none relative grid h-14 w-14 place-items-center rounded-full bg-white/90 text-gs-ink">
          <Icon.Play className="ml-0.5 h-5 w-5" />
        </span>
      </div>
      <figcaption className="flex items-center gap-2 px-4 py-2.5 text-[12.5px] text-gs-muted">
        <Icon.Play className="h-3 w-3" style={{ color: element.color }} />
        {label} · {element.title}
      </figcaption>
    </figure>
  );
}

function PitchDiagram({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full">
      <defs>
        <pattern id="gsgrass" width="40" height="180" patternUnits="userSpaceOnUse">
          <rect width="20" height="180" fill="rgba(255,255,255,.028)" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill="url(#gsgrass)" />
      <g stroke="rgba(255,255,255,.45)" strokeWidth="1.4" fill="none">
        <rect x="70" y="14" width="180" height="66" />
        <rect x="118" y="14" width="84" height="30" />
        <path d="M118 14h84" strokeWidth="3" stroke="rgba(255,255,255,.85)" />
        <circle cx="160" cy="62" r="1.8" fill="rgba(255,255,255,.85)" stroke="none" />
        <path d="M112 80a48 48 0 0 0 96 0" />
      </g>
      <g stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round">
        <path d="M160 30v22" strokeDasharray="4 4" />
        <path d="M160 52 106 116" markerEnd="url(#gsArrow)" />
        <path d="M160 52l54 64" markerEnd="url(#gsArrow)" />
      </g>
      <defs>
        <marker id="gsArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 10 5 0 10z" fill={color} />
        </marker>
      </defs>
      <circle cx="106" cy="120" r="6" fill={color} />
      <circle cx="214" cy="120" r="6" fill={color} />
      <circle cx="160" cy="150" r="7" fill="#fff" />
      <text x="160" y="153.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f2417">
        TW
      </text>
    </svg>
  );
}

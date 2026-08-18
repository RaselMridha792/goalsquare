"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/routing";
import { Icon } from "./icons";

export default function LocaleSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function change(next: Locale) {
    setOpen(false);
    startTransition(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.replace({ pathname, params: params as any }, { locale: next });
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={pending}
        className={`flex h-9 items-center gap-1.5 rounded-full border px-3 text-[12.5px] font-semibold transition ${
          dark
            ? "border-white/15 text-white/85 hover:bg-white/10"
            : "border-gs-line text-gs-ink hover:bg-gs-paper"
        }`}
      >
        <span aria-hidden className="text-[14px] leading-none">
          {localeFlags[locale]}
        </span>
        <span className="uppercase tracking-wide">{locale}</span>
        <Icon.Chevron className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="gs-anim absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-gs-line bg-white p-1.5 shadow-xl"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                role="option"
                aria-selected={l === locale}
                onClick={() => change(l)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[13.5px] transition ${
                  l === locale ? "bg-gs-green-soft font-semibold text-gs-ink" : "hover:bg-gs-paper"
                }`}
              >
                <span aria-hidden>{localeFlags[l]}</span>
                {localeNames[l]}
                {l === locale && <Icon.Check className="ml-auto h-3.5 w-3.5 text-gs-green" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

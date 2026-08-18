"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "./CartProvider";
import { Icon } from "./icons";

export default function AddToCartButton({
  slug,
  className = "gs-btn gs-btn-primary",
  showQty = false,
  label,
}: {
  slug: string;
  className?: string;
  showQty?: boolean;
  label?: string;
}) {
  const t = useTranslations("common");
  const ts = useTranslations("shop");
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);

  function handle() {
    add(slug, qty);
    setDone(true);
    window.setTimeout(() => setDone(false), 1800);
  }

  return (
    <div className={showQty ? "flex flex-wrap items-center gap-3" : "contents"}>
      {showQty && (
        <div className="flex h-[46px] items-center rounded-full border border-gs-line">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="-"
            className="grid h-full w-11 place-items-center rounded-l-full transition hover:bg-gs-paper"
          >
            <Icon.Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-[14px] font-semibold tabular-nums">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            aria-label="+"
            className="grid h-full w-11 place-items-center rounded-r-full transition hover:bg-gs-paper"
          >
            <Icon.Plus className="h-4 w-4" />
          </button>
        </div>
      )}

      <button onClick={handle} className={className} aria-live="polite">
        {done ? (
          <>
            <Icon.CheckCircle className="h-4 w-4" />
            {ts("addedToCart")}
          </>
        ) : (
          <>
            <Icon.Cart className="h-4 w-4" />
            {label ?? t("addToCart")}
          </>
        )}
      </button>
    </div>
  );
}

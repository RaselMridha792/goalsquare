"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useCart } from "./CartProvider";
import { useCartLines, cartTotals } from "./CartView";
import { Icon } from "./icons";
import ProductArt from "./ProductArt";
import { formatPrice, type ResolvedProduct } from "@/lib/products";
import type { Locale } from "@/i18n/routing";

type Fields = {
  email: string; firstName: string; lastName: string; club: string;
  street: string; zip: string; city: string; country: string; phone: string;
  payment: "card" | "paypal" | "invoice";
  cardNumber: string; cardExpiry: string; cardCvc: string;
  terms: boolean;
};

const EMPTY: Fields = {
  email: "", firstName: "", lastName: "", club: "",
  street: "", zip: "", city: "", country: "DE", phone: "",
  payment: "card", cardNumber: "", cardExpiry: "", cardCvc: "", terms: false,
};

const COUNTRIES = ["DE", "AT", "CH", "BE", "NL", "FR", "LU", "IT", "ES", "GB", "US"];

export default function CheckoutFlow({
  catalog,
  locale,
}: {
  catalog: ResolvedProduct[];
  locale: Locale;
}) {
  const t = useTranslations("checkout");
  const tc = useTranslations("common");
  const tcart = useTranslations("cart");
  const router = useRouter();
  const { clear, ready } = useCart();
  const items = useCartLines(catalog);
  const { subtotal, total } = cartTotals(items);

  const [step, setStep] = useState(0);
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const needsAddress = useMemo(() => items.some((i) => i.physical), [items]);
  const steps = [t("step1"), ...(needsAddress ? [t("step2")] : []), t("step3")];

  function set<K extends keyof Fields>(k: K, v: Fields[K]) {
    setF((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  }

  function validate(current: number): boolean {
    const e: Partial<Record<keyof Fields, string>> = {};
    const isAddressStep = needsAddress && current === 1;
    const isPaymentStep = current === steps.length - 1;

    if (current === 0) {
      if (!f.email.trim()) e.email = t("required");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = t("invalidEmail");
      if (!f.firstName.trim()) e.firstName = t("required");
      if (!f.lastName.trim()) e.lastName = t("required");
    }
    if (isAddressStep) {
      if (!f.street.trim()) e.street = t("required");
      if (!f.zip.trim()) e.zip = t("required");
      if (!f.city.trim()) e.city = t("required");
    }
    if (isPaymentStep) {
      if (f.payment === "card") {
        if (f.cardNumber.replace(/\s/g, "").length < 12) e.cardNumber = t("required");
        if (!/^\d{2}\s?\/\s?\d{2}$/.test(f.cardExpiry)) e.cardExpiry = t("required");
        if (f.cardCvc.length < 3) e.cardCvc = t("required");
      }
      if (!f.terms) e.terms = t("required");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate(step)) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate(step)) return;
    setSubmitting(true);
    const order = `GS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 899999)}`;
    try {
      window.sessionStorage.setItem("gs.lastOrder", order);
    } catch {
      /* ignore */
    }
    clear();
    router.push("/kasse/danke");
  }

  if (!ready) return <p className="py-20 text-center text-gs-muted">{tc("loading")}</p>;

  if (items.length === 0) {
    return (
      <div className="grid place-items-center gap-5 rounded-3xl border border-dashed border-gs-line py-20 text-center">
        <p className="text-[15px] text-gs-muted">{tcart("empty")}</p>
        <Link href="/shop" className="gs-btn gs-btn-primary">
          {tcart("emptyCta")} <Icon.Arrow className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.35fr_.9fr]">
      <form onSubmit={submit} noValidate>
        {/* ---- stepper ---- */}
        <ol className="mb-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2">
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12.5px] font-bold transition ${
                  i < step
                    ? "bg-gs-green text-white"
                    : i === step
                      ? "bg-gs-ink text-white"
                      : "border border-gs-line text-gs-muted"
                }`}
              >
                {i < step ? <Icon.Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={`hidden text-[13px] font-semibold sm:block ${i === step ? "" : "text-gs-muted"}`}>
                {s}
              </span>
              {i < steps.length - 1 && <span className="h-px flex-1 bg-gs-line" />}
            </li>
          ))}
        </ol>

        <p className="mb-6 flex items-start gap-2 rounded-2xl border border-amber-300/60 bg-amber-50 p-3.5 text-[12.5px] leading-relaxed text-amber-900">
          <Icon.Lock className="mt-0.5 h-4 w-4 shrink-0" />
          {t("demoNotice")}
        </p>

        {/* ---- step 1: contact ---- */}
        {step === 0 && (
          <Fieldset title={t("contactTitle")}>
            <Field label={t("email")} error={errors.email} className="sm:col-span-2">
              <input
                type="email"
                autoComplete="email"
                value={f.email}
                onChange={(e) => set("email", e.target.value)}
                className={input(errors.email)}
              />
            </Field>
            <Field label={t("firstName")} error={errors.firstName}>
              <input
                autoComplete="given-name"
                value={f.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                className={input(errors.firstName)}
              />
            </Field>
            <Field label={t("lastName")} error={errors.lastName}>
              <input
                autoComplete="family-name"
                value={f.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                className={input(errors.lastName)}
              />
            </Field>
            <Field label={t("club")} className="sm:col-span-2">
              <input
                autoComplete="organization"
                value={f.club}
                onChange={(e) => set("club", e.target.value)}
                className={input()}
              />
            </Field>
          </Fieldset>
        )}

        {/* ---- step 2: address ---- */}
        {needsAddress && step === 1 && (
          <Fieldset title={t("addressTitle")}>
            <Field label={t("street")} error={errors.street} className="sm:col-span-2">
              <input
                autoComplete="street-address"
                value={f.street}
                onChange={(e) => set("street", e.target.value)}
                className={input(errors.street)}
              />
            </Field>
            <Field label={t("zip")} error={errors.zip}>
              <input
                autoComplete="postal-code"
                value={f.zip}
                onChange={(e) => set("zip", e.target.value)}
                className={input(errors.zip)}
              />
            </Field>
            <Field label={t("city")} error={errors.city}>
              <input
                autoComplete="address-level2"
                value={f.city}
                onChange={(e) => set("city", e.target.value)}
                className={input(errors.city)}
              />
            </Field>
            <Field label={t("country")}>
              <select
                value={f.country}
                onChange={(e) => set("country", e.target.value)}
                className={input()}
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("phone")}>
              <input
                autoComplete="tel"
                value={f.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={input()}
              />
            </Field>
          </Fieldset>
        )}

        {/* ---- last step: payment ---- */}
        {step === steps.length - 1 && (
          <Fieldset title={t("paymentTitle")}>
            <div className="grid gap-2.5 sm:col-span-2">
              {(
                [
                  ["card", t("payCard")],
                  ["paypal", t("payPaypal")],
                  ["invoice", t("payInvoice")],
                ] as const
              ).map(([id, label]) => (
                <label
                  key={id}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 text-[14px] transition ${
                    f.payment === id ? "border-gs-green bg-gs-green-soft" : "border-gs-line hover:bg-gs-paper"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={f.payment === id}
                    onChange={() => set("payment", id)}
                    className="h-4 w-4 accent-[var(--color-gs-green)]"
                  />
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </div>

            {f.payment === "card" && (
              <>
                <Field label={t("cardNumber")} error={errors.cardNumber} className="sm:col-span-2">
                  <input
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    value={f.cardNumber}
                    onChange={(e) =>
                      set(
                        "cardNumber",
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 16)
                          .replace(/(.{4})/g, "$1 ")
                          .trim(),
                      )
                    }
                    className={input(errors.cardNumber)}
                  />
                </Field>
                <Field label={t("cardExpiry")} error={errors.cardExpiry}>
                  <input
                    inputMode="numeric"
                    placeholder="12 / 29"
                    value={f.cardExpiry}
                    onChange={(e) => {
                      const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                      set("cardExpiry", d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d);
                    }}
                    className={input(errors.cardExpiry)}
                  />
                </Field>
                <Field label={t("cardCvc")} error={errors.cardCvc}>
                  <input
                    inputMode="numeric"
                    placeholder="123"
                    value={f.cardCvc}
                    onChange={(e) => set("cardCvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className={input(errors.cardCvc)}
                  />
                </Field>
              </>
            )}

            <label className="mt-2 flex cursor-pointer items-start gap-2.5 text-[13.5px] sm:col-span-2">
              <input
                type="checkbox"
                checked={f.terms}
                onChange={(e) => set("terms", e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[var(--color-gs-green)]"
              />
              <span className={errors.terms ? "text-red-600" : "text-gs-ink/80"}>{t("terms")}</span>
            </label>
          </Fieldset>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {step > 0 && (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="gs-btn gs-btn-ghost">
              {t("back")}
            </button>
          )}
          {step < steps.length - 1 ? (
            <button type="button" onClick={next} className="gs-btn gs-btn-primary ml-auto">
              {t("next")} <Icon.Arrow className="h-4 w-4" />
            </button>
          ) : (
            <button type="submit" disabled={submitting} className="gs-btn gs-btn-primary ml-auto disabled:opacity-60">
              <Icon.Lock className="h-4 w-4" />
              {t("placeOrder")} · {formatPrice(total, locale)}
            </button>
          )}
        </div>
      </form>

      {/* ---- summary ---- */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-gs-line bg-gs-paper p-6">
          <h2 className="font-display text-[17px] font-extrabold tracking-tight">
            {tcart("orderSummary")}
          </h2>

          <ul className="mt-5 grid gap-3">
            {items.map((i) => (
              <li key={i.slug} className="flex items-center gap-3">
                <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                  <ProductArt accent={i.accent} category={i.category} label={i.name} className="h-full w-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold">{i.name}</p>
                  <p className="text-[11.5px] text-gs-muted">
                    {tc("quantity")}: {i.qty}
                  </p>
                </div>
                <span className="text-[13.5px] font-semibold tabular-nums">
                  {formatPrice((i.price ?? 0) * i.qty, locale)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 grid gap-2.5 border-t border-gs-line pt-4 text-[14px]">
            <div className="flex justify-between">
              <dt className="text-gs-muted">{tc("subtotal")}</dt>
              <dd className="tabular-nums">{formatPrice(subtotal, locale)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gs-muted">{tc("shipping")}</dt>
              <dd className="text-gs-green-600">{tc("freeShipping")}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-gs-line pt-3">
              <dt className="font-display text-[15px] font-extrabold">{tc("total")}</dt>
              <dd className="font-display text-[22px] font-extrabold tabular-nums">
                {formatPrice(total, locale)}
              </dd>
            </div>
          </dl>
          <p className="mt-1 text-right text-[11.5px] text-gs-muted">{tc("vat")}</p>
        </div>
      </aside>
    </div>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="gs-anim rounded-3xl border border-gs-line bg-white p-6">
      <legend className="px-2 font-display text-[16px] font-extrabold tracking-tight">{title}</legend>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`grid gap-1.5 ${className}`}>
      <span className="text-[12.5px] font-semibold text-gs-ink/75">{label}</span>
      {children}
      {error && <span className="text-[12px] text-red-600">{error}</span>}
    </label>
  );
}

function input(error?: string) {
  return `h-11 w-full rounded-xl border bg-white px-3.5 text-[14px] transition focus:outline-none ${
    error ? "border-red-400 focus:border-red-500" : "border-gs-line focus:border-gs-green"
  }`;
}

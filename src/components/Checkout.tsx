import { useEffect, useRef, useState } from "react";
import { formatPrice, formatPriceExact } from "../data/products";
import { computeTotals, type CartLineView, type Totals } from "../lib/cart";
import { IconCard, IconCheck, IconLock, IconShield, IconTruck, IconX } from "./Icons";

interface CheckoutProps {
  open: boolean;
  lines: CartLineView[];
  onClose: () => void;
  onComplete: () => void;
}

const STEPS = ["Details", "Payment", "Review"];

const PROCESSING_MSGS = [
  "Contacting the payment partner…",
  "Reserving your chassis…",
  "Running a final burn-in sanity check…",
  "Stamping the serial number…",
];

interface FormState {
  email: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const INITIAL_FORM: FormState = {
  email: "",
  name: "",
  address: "",
  city: "",
  zip: "",
  country: "United States",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

const formatCardNumber = (v: string) =>
  v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

const formatExpiry = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
};

export function Checkout({ open, lines, onClose, onComplete }: CheckoutProps) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"form" | "processing" | "success">("form");
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [msgIdx, setMsgIdx] = useState(0);
  const [placed, setPlaced] = useState<{ lines: CartLineView[]; totals: Totals; orderNo: string } | null>(null);
  const timers = useRef<number[]>([]);

  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const totals = computeTotals(subtotal);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase !== "processing") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, phase, onClose]);

  useEffect(() => {
    if (phase !== "processing") return;
    const iv = window.setInterval(() => setMsgIdx((i) => (i + 1) % PROCESSING_MSGS.length), 850);
    const done = window.setTimeout(() => {
      setPhase("success");
      onComplete();
    }, 3400);
    timers.current.push(iv, done);
    return () => {
      window.clearInterval(iv);
      window.clearTimeout(done);
    };
  }, [phase, onComplete]);

  useEffect(() => () => timers.current.forEach((t) => { window.clearInterval(t); window.clearTimeout(t); }), []);

  if (!open) return null;

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let v = e.target.value;
    if (key === "cardNumber") v = formatCardNumber(v);
    if (key === "expiry") v = formatExpiry(v);
    if (key === "cvc") v = v.replace(/\D/g, "").slice(0, 4);
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (s: number) => {
    const er: Partial<Record<keyof FormState, string>> = {};
    if (s === 0) {
      if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email for the receipt";
      if (form.name.trim().length < 2) er.name = "Who should we address the box to?";
      if (form.address.trim().length < 4) er.address = "We need a street address to ship to";
      if (form.city.trim().length < 2) er.city = "Required";
      if (form.zip.trim().length < 3) er.zip = "Required";
    }
    if (s === 1) {
      if (form.cardName.trim().length < 2) er.cardName = "Name as printed on the card";
      if (form.cardNumber.replace(/\s/g, "").length !== 16) er.cardNumber = "Card number must be 16 digits";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) er.expiry = "Use MM/YY";
      if (!/^\d{3,4}$/.test(form.cvc)) er.cvc = "3–4 digits";
    }
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    setStep((s) => s + 1);
  };

  const placeOrder = () => {
    const orderNo = "CL-" + String(Math.floor(10000 + Math.random() * 89999));
    setPlaced({ lines, totals, orderNo });
    setMsgIdx(0);
    setPhase("processing");
  };

  const handleClose = () => {
    onClose();
    window.setTimeout(() => {
      setStep(0);
      setPhase("form");
      setErrors({});
      setPlaced(null);
      setForm(INITIAL_FORM);
    }, 350);
  };

  const field = (key: keyof FormState, label: string, placeholder: string, type = "text", icon?: React.ReactNode) => (
    <div>
      <label htmlFor={`f-${key}`} className="mb-1.5 block text-[11px] font-extrabold tracking-[0.14em] text-ink uppercase">
        {label}
      </label>
      <div className="relative">
        <input
          id={`f-${key}`}
          type={type}
          value={form[key]}
          onChange={set(key)}
          placeholder={placeholder}
          className={`field ${icon ? "pr-10" : ""} ${errors[key] ? "field-error" : ""}`}
          inputMode={key === "cardNumber" || key === "cvc" ? "numeric" : undefined}
        />
        {icon && <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-ink-faint">{icon}</span>}
      </div>
      {errors[key] && <p className="mt-1 text-[11.5px] font-bold text-clay">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Checkout">
      <button className="anim-fade-in absolute inset-0 bg-espresso/70 backdrop-blur-[3px]" onClick={phase === "processing" ? undefined : handleClose} aria-label="Close checkout" />

      <div className="anim-rise-in relative flex h-[95dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-paper shadow-deep md:grid md:h-[min(93dvh,54rem)] md:grid-cols-[0.85fr_1.15fr] md:rounded-xl">
        {/* summary column */}
        <aside className="flex max-h-[26dvh] shrink-0 flex-col overflow-y-auto bg-espresso p-6 text-cream md:max-h-none md:min-h-0 md:p-7">
          <p className="text-[11px] font-extrabold tracking-[0.2em] text-honey uppercase">
            Order summary · {lines.reduce((n, l) => n + l.qty, 0)} items
          </p>
          <ul className="mt-4 space-y-3.5">
            {lines.map((l) => (
              <li key={l.key} className="flex items-center gap-3">
                <img src={l.product.image} alt="" className="h-11 w-14 shrink-0 rounded-md bg-espresso-2 object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-extrabold">{l.product.name}</p>
                  <p className="text-[11px] font-semibold text-cream/55">{l.finish} · ×{l.qty}</p>
                </div>
                <p className="text-[13px] font-extrabold">{formatPrice(l.lineTotal)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-1.5 border-t border-cream/15 pt-4 text-[13px] font-semibold text-cream/70">
            <div className="flex justify-between"><dt>Subtotal</dt><dd className="text-cream">{formatPrice(totals.subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd className={totals.shipping === 0 ? "font-extrabold text-honey" : "text-cream"}>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd></div>
            <div className="flex justify-between"><dt>Tax (est.)</dt><dd className="text-cream">{formatPriceExact(totals.tax)}</dd></div>
          </dl>
          <p className="mt-3 flex items-baseline justify-between border-t border-cream/15 pt-3.5">
            <span className="text-xs font-extrabold tracking-[0.16em] uppercase">Total</span>
            <span className="font-display text-[26px] font-bold text-honey">{formatPriceExact(totals.total)}</span>
          </p>
          <ul className="mt-auto hidden space-y-2.5 pt-6 text-[12px] font-semibold text-cream/60 md:block">
            <li className="flex items-center gap-2.5"><IconShield size={15} className="text-honey" /> 5-year care plan included</li>
            <li className="flex items-center gap-2.5"><IconTruck size={15} className="text-honey" /> Insured, signature delivery</li>
            <li className="flex items-center gap-2.5"><IconLock size={15} className="text-honey" /> Simulated — nothing is charged</li>
          </ul>
        </aside>

        {/* form column */}
        <div className="relative min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
          {phase !== "processing" && (
            <button
              onClick={handleClose}
              className="btn-press absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-cream text-ink hover:bg-espresso hover:text-cream"
              aria-label="Close checkout"
            >
              <IconX size={16} />
            </button>
          )}

          {phase === "form" && (
            <>
              {/* step indicator */}
              <ol className="flex items-center gap-2 pr-10">
                {STEPS.map((label, i) => (
                  <li key={label} className={`flex items-center gap-2 ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                    <button
                      onClick={() => i < step && setStep(i)}
                      className={`btn-press flex items-center gap-2 ${i < step ? "cursor-pointer" : "cursor-default"}`}
                      aria-label={`Step ${i + 1}: ${label}`}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-extrabold transition-colors ${
                          i < step
                            ? "bg-copper text-cream"
                            : i === step
                              ? "border-2 border-copper text-copper"
                              : "border-2 border-line text-ink-faint"
                        }`}
                      >
                        {i < step ? <IconCheck size={13} /> : i + 1}
                      </span>
                      <span className={`hidden text-xs font-extrabold tracking-wide uppercase sm:block ${i <= step ? "text-ink" : "text-ink-faint"}`}>
                        {label}
                      </span>
                    </button>
                    {i < STEPS.length - 1 && <span className={`h-px flex-1 ${i < step ? "bg-copper" : "bg-line"}`} />}
                  </li>
                ))}
              </ol>

              <div key={step} className="anim-rise-in mt-6 space-y-4">
                {step === 0 && (
                  <>
                    <h3 className="font-display text-2xl font-bold text-ink">Where's it heading?</h3>
                    {field("email", "Email", "you@studio.com", "email")}
                    {field("name", "Full name", "Ada Lovelace")}
                    {field("address", "Street address", "214 Analytical Engine Way")}
                    <div className="grid grid-cols-2 gap-3">
                      {field("city", "City", "Portland")}
                      {field("zip", "Postcode", "97209")}
                    </div>
                    <div>
                      <label htmlFor="f-country" className="mb-1.5 block text-[11px] font-extrabold tracking-[0.14em] text-ink uppercase">Country</label>
                      <select id="f-country" value={form.country} onChange={set("country")} className="field cursor-pointer">
                        {["United States", "Canada", "United Kingdom", "Germany", "Japan", "Australia"].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <h3 className="font-display text-2xl font-bold text-ink">Payment</h3>
                    {field("cardName", "Name on card", "ADA LOVELACE")}
                    {field("cardNumber", "Card number", "4242 4242 4242 4242", "text", <IconCard size={17} />)}
                    <div className="grid grid-cols-2 gap-3">
                      {field("expiry", "Expiry", "MM/YY", "text")}
                      {field("cvc", "CVC", "123", "text")}
                    </div>
                    <p className="flex items-start gap-2 rounded-lg bg-moss/10 px-3.5 py-3 text-[12.5px] leading-snug font-semibold text-moss-deep">
                      <IconLock size={15} className="mt-0.5 shrink-0" />
                      This is a simulated checkout. Details are validated locally and never leave your browser.
                    </p>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h3 className="font-display text-2xl font-bold text-ink">One last look</h3>
                    <div className="rounded-lg border border-line bg-cream p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-extrabold tracking-[0.16em] text-ink-soft uppercase">Ships to</p>
                        <button onClick={() => setStep(0)} className="btn-press text-xs font-extrabold text-copper hover:text-copper-deep">Edit</button>
                      </div>
                      <p className="mt-1.5 text-[13.5px] leading-snug font-bold text-ink">
                        {form.name} · {form.address}, {form.city} {form.zip}, {form.country}
                      </p>
                      <p className="text-[12.5px] font-semibold text-ink-soft">{form.email}</p>
                    </div>
                    <div className="rounded-lg border border-line bg-cream p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-extrabold tracking-[0.16em] text-ink-soft uppercase">Paying with</p>
                        <button onClick={() => setStep(1)} className="btn-press text-xs font-extrabold text-copper hover:text-copper-deep">Edit</button>
                      </div>
                      <p className="mt-1.5 flex items-center gap-2 text-[13.5px] font-bold text-ink">
                        <IconCard size={16} className="text-copper" />
                        •••• {form.cardNumber.replace(/\s/g, "").slice(-4)} · {form.cardName}
                      </p>
                    </div>
                    <p className="text-[13px] leading-relaxed font-semibold text-ink-soft">
                      {lines.reduce((n, l) => n + l.qty, 0)} machines · burn-in starts tonight · delivery insured and signature-required.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-7 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <button onClick={() => setStep((s) => s - 1)} className="btn-press rounded-full border border-line bg-cream px-5 py-3 text-sm font-extrabold text-ink hover:border-ink">
                    Back
                  </button>
                ) : (
                  <span />
                )}
                {step < 2 ? (
                  <button onClick={next} className="btn-press rounded-full bg-ink px-7 py-3 text-sm font-extrabold text-cream shadow-card hover:bg-copper">
                    Continue to {STEPS[step + 1].toLowerCase()}
                  </button>
                ) : (
                  <button onClick={placeOrder} className="btn-press flex items-center gap-2.5 rounded-full bg-copper px-7 py-3 text-sm font-extrabold text-cream shadow-card hover:bg-copper-deep">
                    <IconLock size={15} />
                    Place order — {formatPriceExact(totals.total)}
                  </button>
                )}
              </div>
            </>
          )}

          {phase === "processing" && (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
              <svg width="72" height="72" viewBox="0 0 72 72" className="anim-spin-slow text-copper" aria-hidden="true">
                <circle cx="36" cy="36" r="30" fill="none" stroke="var(--color-line)" strokeWidth="5" />
                <circle cx="36" cy="36" r="30" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray="52 137" />
              </svg>
              <p key={msgIdx} className="anim-fade-in mt-6 font-display text-xl font-bold text-ink">
                {PROCESSING_MSGS[msgIdx]}
              </p>
              <p className="mt-2 text-[12.5px] font-bold tracking-[0.18em] text-ink-faint uppercase">
                Do not close this window
              </p>
            </div>
          )}

          {phase === "success" && placed && (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
              <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden="true">
                <circle cx="42" cy="42" r="38" fill="none" stroke="var(--color-copper)" strokeWidth="4" />
                <circle cx="42" cy="42" r="38" fill="rgba(176,102,47,0.08)" stroke="none" />
                <path d="M26 43.5 37.5 55 58 31" fill="none" stroke="var(--color-moss)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" className="check-draw" />
              </svg>
              <p className="mt-6 text-[11px] font-extrabold tracking-[0.22em] text-copper uppercase">Order confirmed</p>
              <h3 className="mt-2 font-display text-3xl font-bold text-ink">
                {placed.orderNo} is on the bench
              </h3>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-ink-soft">
                A receipt for <span className="font-extrabold text-ink">{formatPriceExact(placed.totals.total)}</span> is on
                its way to <span className="font-extrabold text-ink">{form.email || "your inbox"}</span>. Your machine joins
                tonight's burn-in queue — tracking arrives within 48 hours.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {placed.lines.map((l) => (
                  <span key={l.key} className="rounded-full border border-line bg-cream px-3 py-1 text-[12px] font-bold text-ink-soft">
                    {l.qty}× {l.product.name} · {l.finish}
                  </span>
                ))}
              </div>
              <button onClick={handleClose} className="btn-press mt-7 rounded-full bg-ink px-8 py-3.5 text-sm font-extrabold text-cream shadow-card hover:bg-copper">
                Back to the shop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

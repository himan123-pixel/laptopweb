import { useState } from "react";
import { CATEGORIES, type CategoryId } from "../data/products";
import { CoilMark, IconArrowRight, IconCheck, IconClock, IconPin } from "./Icons";

interface FooterProps {
  onCategory: (c: CategoryId | "all") => void;
  onToast: (msg: string, sub?: string) => void;
}

const BENCH_LINKS: { label: string; note: string; sub: string }[] = [
  { label: "Burn-in reports", note: "Every report ships in the box", sub: "Ask us for a sample — we'll email one over." },
  { label: "5-year care plan", note: "Included with every machine", sub: "No upsell, no asterisks, no renewal tricks." },
  { label: "Trade-ins", note: "We quote within a day", sub: "Send a photo of your old machine and we'll price it." },
  { label: "Bench journal", note: "One honest post a month", sub: "Fan curves, wood finishes, and the occasional post-mortem." },
];

export function Footer({ onCategory, onToast }: FooterProps) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const subscribe = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      onToast("That email looks off", "Check it and try again — we only send one letter a month.");
      return;
    }
    setJoined(true);
    onToast("You're on the list", "The next Bench Letter ships first Friday of the month.");
  };

  return (
    <footer className="bg-espresso text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.1fr] lg:gap-8">
        {/* brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <CoilMark size={36} />
            <span className="font-display text-2xl font-bold">Copperline</span>
          </div>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-cream/60">
            A six-person workshop building six machines very carefully. We started in a garage
            in 2016 and still solder the serial plates by hand.
          </p>
          <ul className="mt-5 space-y-2 text-[13px] font-semibold text-cream/70">
            <li className="flex items-center gap-2.5">
              <IconClock size={15} className="text-honey" /> Tue–Sat · 10:00–18:00 · visitors welcome
            </li>
            <li className="flex items-center gap-2.5">
              <IconPin size={15} className="text-honey" /> 417 Anodizing Row, Portland, OR
            </li>
          </ul>
        </div>

        {/* catalogue */}
        <nav aria-label="Catalogue">
          <p className="text-[11px] font-extrabold tracking-[0.22em] text-honey uppercase">Catalogue</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <button onClick={() => onCategory("all")} className="btn-press text-[14px] font-bold text-cream/80 hover:text-honey">
                All machines
              </button>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button onClick={() => onCategory(c.id)} className="btn-press text-[14px] font-bold text-cream/80 hover:text-honey">
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* the bench */}
        <nav aria-label="The bench">
          <p className="text-[11px] font-extrabold tracking-[0.22em] text-honey uppercase">The bench</p>
          <ul className="mt-4 space-y-2.5">
            {BENCH_LINKS.map((l) => (
              <li key={l.label}>
                <button onClick={() => onToast(l.note, l.sub)} className="btn-press text-left text-[14px] font-bold text-cream/80 hover:text-honey">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* letter */}
        <div>
          <p className="text-[11px] font-extrabold tracking-[0.22em] text-honey uppercase">The Bench Letter</p>
          <p className="mt-4 text-[13.5px] leading-relaxed text-cream/60">
            One email a month — what we built, what broke, and which fan curve we're proudest of.
          </p>
          {joined ? (
            <p className="anim-rise-in mt-4 flex items-center gap-2.5 rounded-lg border border-moss/40 bg-moss/15 px-4 py-3 text-[13.5px] font-extrabold text-cream">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-moss text-cream">
                <IconCheck size={13} />
              </span>
              You're on the list. Talk soon.
            </p>
          ) : (
            <div className="mt-4 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && subscribe()}
                placeholder="you@studio.com"
                className="w-full rounded-full border border-cream/20 bg-espresso-2 px-4 py-2.5 text-sm font-semibold text-cream placeholder:text-cream/35 focus:border-honey"
                aria-label="Email for newsletter"
              />
              <button
                onClick={subscribe}
                className="btn-press group flex shrink-0 items-center gap-2 rounded-full bg-copper px-4 py-2.5 text-sm font-extrabold text-cream hover:bg-copper-deep"
                aria-label="Subscribe"
              >
                Join
                <span className="transition-transform group-hover:translate-x-0.5"><IconArrowRight size={14} /></span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-cream/12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-[12px] font-semibold text-cream/45 sm:px-6">
          <p>© 2026 Copperline Computers · Prices include bench time</p>
          <p className="text-honey/80">Made warm in Portland, OR</p>
        </div>
      </div>
    </footer>
  );
}

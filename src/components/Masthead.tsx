import { TICKER_ITEMS, formatPrice, type Product } from "../data/products";
import { IconArrowRight, IconFan, IconFlame, IconShield, IconSpark, IconWrench, IconZap } from "./Icons";

interface MastheadProps {
  featured: Product;
  onBrowse: () => void;
  onView: (id: string) => void;
}

export function Masthead({ featured, onBrowse, onView }: MastheadProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:pt-16 lg:pb-20">
        {/* left — words */}
        <div>
          <p className="anim-fade-up flex items-center gap-2.5 text-[11px] font-extrabold tracking-[0.22em] text-copper uppercase">
            <span className="anim-ember inline-block h-2 w-2 rounded-full bg-copper" />
            The bench is open · est. 2016
          </p>

          <h1
            className="anim-fade-up mt-5 font-display text-[13.5vw] leading-[0.98] font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl xl:text-[5rem]"
            style={{ animationDelay: "90ms" }}
          >
            Quiet machines,
            <br />
            built the <em className="font-light text-copper italic">slow</em> way.
          </h1>

          <p
            className="anim-fade-up mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft sm:text-base"
            style={{ animationDelay: "180ms" }}
          >
            Six machines. No catalogues of thousands. Every laptop and tower that leaves
            Copperline is assembled, looped, and burn-in tested by one technician — then
            guaranteed for five years.
          </p>

          <div className="anim-fade-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "260ms" }}>
            <button
              onClick={onBrowse}
              className="btn-press group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-cream shadow-card hover:bg-copper"
            >
              Browse the six
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <IconArrowRight size={16} />
              </span>
            </button>
            <button
              onClick={() => onView(featured.id)}
              className="btn-press inline-flex items-center gap-2 rounded-full border border-ink/25 bg-transparent px-6 py-3.5 text-sm font-bold text-ink hover:border-copper hover:text-copper"
            >
              Meet the {featured.name}
            </button>
          </div>

          {/* bench credentials strip */}
          <dl
            className="anim-fade-up mt-10 grid grid-cols-3 divide-x divide-line border-y border-line"
            style={{ animationDelay: "340ms" }}
          >
            {[
              { icon: <IconFlame size={19} />, stat: "48 hr", cap: "burn-in, every unit" },
              { icon: <IconWrench size={19} />, stat: "128-pt", cap: "bench checklist" },
              { icon: <IconShield size={19} />, stat: "5 yr", cap: "care plan included" },
            ].map((s, i) => (
              <div key={s.stat} className={`py-4 ${i === 0 ? "pr-4" : "px-4"}`}>
                <dt className="flex items-center gap-2 text-copper">
                  {s.icon}
                  <span className="font-display text-xl font-bold text-ink sm:text-2xl">{s.stat}</span>
                </dt>
                <dd className="mt-1 text-[11px] leading-snug font-bold tracking-wide text-ink-soft uppercase">
                  {s.cap}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* right — this week on the bench */}
        <div className="relative">
          <svg
            className="pointer-events-none absolute -top-10 -right-8 h-64 w-64 text-copper/25"
            viewBox="0 0 200 200"
            aria-hidden="true"
            style={{ animation: "spin-slow 70s linear infinite" }}
          >
            <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="10 12" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 9" />
          </svg>

          <button
            onClick={() => onView(featured.id)}
            className="btn-press group relative block w-full rotate-[-2deg] overflow-hidden rounded-xl border border-line bg-studio text-left shadow-lift transition-transform duration-500 hover:rotate-0"
            aria-label={`View ${featured.name}`}
          >
            <div className="overflow-hidden">
              <img
                src={featured.image}
                alt={featured.name}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                loading="eager"
              />
            </div>
            <div className="flex items-end justify-between gap-3 px-5 pt-4 pb-5">
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.22em] text-copper uppercase">
                  This week on the bench
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-ink">{featured.name}</p>
                <p className="mt-0.5 text-sm text-ink-soft">
                  {formatPrice(featured.price)}
                  {featured.compareAt && (
                    <span className="ml-2 text-ink-faint line-through">{formatPrice(featured.compareAt)}</span>
                  )}
                </p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-cream transition-colors duration-300 group-hover:bg-copper">
                <IconArrowRight size={18} />
              </span>
            </div>
          </button>

          {/* floating spec chips */}
          <div
            className="anim-floaty absolute -top-3 right-2 hidden items-center gap-2 rounded-lg border border-line bg-cream px-3 py-2 text-xs font-bold text-ink shadow-card sm:flex"
            style={{ "--tilt": "2deg", animationDelay: "0.4s" } as React.CSSProperties}
          >
            <span className="text-copper"><IconFan size={15} /></span>
            Vapour chamber · 38 dB max
          </div>
          <div
            className="anim-floaty absolute bottom-24 -left-3 hidden items-center gap-2 rounded-lg border border-line bg-cream px-3 py-2 text-xs font-bold text-ink shadow-card sm:flex lg:-left-6"
            style={{ "--tilt": "-2.5deg", animationDelay: "1.3s" } as React.CSSProperties}
          >
            <span className="text-copper"><IconZap size={15} /></span>
            240 Hz mini-LED
          </div>

          {/* bench note */}
          <figure className="relative z-10 -mt-6 ml-auto w-[78%] rotate-[1.5deg] rounded-lg border border-line bg-espresso px-5 py-4 text-cream shadow-deep sm:w-[68%]">
            <blockquote className="font-display text-[15px] leading-snug text-cream/95 italic">
              “Retuned the fan curve by ear again. It purrs now.”
            </blockquote>
            <figcaption className="mt-2 flex items-center justify-between text-[10px] font-bold tracking-[0.18em] text-honey uppercase">
              <span>Marisol · Head of bench</span>
              <span className="text-cream/40">Unit № 0347</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* ticker */}
      <div className="relative border-y border-espresso-2 bg-espresso py-2.5" aria-hidden="true">
        <div className="marquee-track" style={{ "--marquee-speed": "38s" } as React.CSSProperties}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {TICKER_ITEMS.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-6 pr-6 text-[11px] font-bold tracking-[0.2em] whitespace-nowrap text-cream/75 uppercase"
                >
                  {item}
                  <span className="text-copper"><IconSpark size={11} /></span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

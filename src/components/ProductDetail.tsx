import { useEffect, useRef, useState } from "react";
import { categoryLabel, formatPrice, type Product } from "../data/products";
import {
  IconBasket,
  IconBox,
  IconCheck,
  IconMinus,
  IconPlus,
  IconTruck,
  IconX,
  Stars,
} from "./Icons";

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product, finish: string, qty: number) => void;
}

export function ProductDetail({ product, onClose, onAdd }: ProductDetailProps) {
  const [finishIdx, setFinishIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const low = product.stock <= 4;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(timer.current);
    };
  }, [onClose]);

  const finish = product.finishes[finishIdx];

  const handleAdd = () => {
    onAdd(product, finish.name, qty);
    setJustAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
      <button
        className="anim-fade-in absolute inset-0 bg-espresso/65 backdrop-blur-[3px]"
        onClick={onClose}
        aria-label="Close details"
      />
      <div className="anim-rise-in relative flex h-[94dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-paper shadow-deep sm:rounded-xl md:grid md:h-[min(92dvh,54rem)] md:grid-cols-[1fr_1.05fr]">
        <button
          onClick={onClose}
          className="btn-press absolute top-3.5 right-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-cream/95 text-ink shadow-sm hover:bg-espresso hover:text-cream"
          aria-label="Close"
        >
          <IconX size={16} />
        </button>

        {/* media */}
        <div className="relative max-h-[30dvh] shrink-0 overflow-hidden bg-studio md:max-h-none md:min-h-0">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          {product.badge && (
            <span className="absolute top-4 left-4 rotate-[-2.5deg] rounded bg-espresso/92 px-2.5 py-1 text-[10px] font-extrabold tracking-[0.16em] text-honey uppercase shadow-sm">
              {product.badge}
            </span>
          )}
          <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-espresso/90 px-3 py-1.5 text-[11px] font-bold text-cream shadow-sm">
            <IconTruck size={13} className="text-honey" />
            {product.leadTime}
          </span>
        </div>

        {/* info */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">
          <p className="text-[10px] font-extrabold tracking-[0.2em] text-copper uppercase">
            {product.series} · {categoryLabel(product.category)}
          </p>
          <h3 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {product.name}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <Stars rating={product.rating} size={14} />
            <span className="text-[13px] font-bold text-ink-soft">
              {product.rating.toFixed(1)} · {product.reviews} bench reviews
            </span>
          </div>

          <p className="mt-3 flex items-baseline gap-2.5">
            <span className="font-display text-3xl font-bold text-ink">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-lg font-semibold text-ink-faint line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </p>

          <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">{product.description}</p>

          {/* finish */}
          <div className="mt-5">
            <p className="text-[11px] font-extrabold tracking-[0.16em] text-ink uppercase">
              Finish — <span className="text-copper">{finish.name}</span>
            </p>
            <div className="mt-2.5 flex gap-2.5">
              {product.finishes.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setFinishIdx(i)}
                  className={`btn-press h-9 w-9 rounded-full border-2 transition-all ${
                    i === finishIdx
                      ? "scale-110 border-copper shadow-card"
                      : "border-ink/15 hover:scale-105 hover:border-ink/40"
                  }`}
                  style={{ backgroundColor: f.hex }}
                  aria-label={`Finish ${f.name}`}
                  aria-pressed={i === finishIdx}
                />
              ))}
            </div>
          </div>

          {/* qty + add */}
          <div className="mt-5 flex flex-wrap items-stretch gap-3">
            <div className="flex items-center rounded-full border border-line bg-cream">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                className="btn-press flex h-12 w-11 items-center justify-center text-ink-soft hover:text-copper disabled:opacity-30"
                aria-label="Decrease quantity"
              >
                <IconMinus size={15} />
              </button>
              <span className="w-7 text-center text-[15px] font-extrabold text-ink" aria-live="polite">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                disabled={qty >= product.stock}
                className="btn-press flex h-12 w-11 items-center justify-center text-ink-soft hover:text-copper disabled:opacity-30"
                aria-label="Increase quantity"
              >
                <IconPlus size={15} />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className={`btn-press flex flex-1 items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-extrabold shadow-card transition-colors ${
                justAdded
                  ? "bg-moss text-cream"
                  : "bg-copper text-cream hover:bg-copper-deep"
              }`}
            >
              {justAdded ? (
                <>
                  <IconCheck size={17} /> On the bench
                </>
              ) : (
                <>
                  <IconBasket size={17} />
                  Add to cart — {formatPrice(product.price * qty)}
                </>
              )}
            </button>
          </div>

          <p className={`mt-3 flex items-center gap-2 text-[13px] font-bold ${low ? "text-clay" : "text-moss"}`}>
            <IconBox size={15} />
            {low
              ? `Only ${product.stock} left — reserved once it hits your cart`
              : `${product.stock} in stock · free 5-year care plan`}
          </p>

          {/* highlights */}
          <ul className="mt-6 grid gap-2 border-t border-line pt-5 sm:grid-cols-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-[13.5px] leading-snug font-semibold text-ink">
                <span className="mt-0.5 shrink-0 text-copper">
                  <IconCheck size={15} />
                </span>
                {h}
              </li>
            ))}
          </ul>

          {/* spec table */}
          <div className="mt-6 overflow-hidden rounded-lg border border-line">
            <p className="bg-espresso px-4 py-2.5 text-[11px] font-extrabold tracking-[0.2em] text-honey uppercase">
              Full specification
            </p>
            <dl>
              {product.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-baseline justify-between gap-4 px-4 py-2.5 text-[13.5px] ${
                    i % 2 === 0 ? "bg-cream" : "bg-paper"
                  }`}
                >
                  <dt className="shrink-0 font-bold text-ink-soft">{s.label}</dt>
                  <dd className="text-right font-bold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

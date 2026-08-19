import { useEffect } from "react";
import { formatPrice, formatPriceExact, FREE_SHIPPING_THRESHOLD } from "../data/products";
import { computeTotals, type CartLineView } from "../lib/cart";
import { IconArrowRight, IconBasket, IconLock, IconMinus, IconPlus, IconTrash, IconTruck, IconX } from "./Icons";

interface CartDrawerProps {
  open: boolean;
  lines: CartLineView[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
  onBrowse: () => void;
}

export function CartDrawer({ open, lines, onClose, onUpdateQty, onRemove, onCheckout, onBrowse }: CartDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const totals = computeTotals(subtotal);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button className="anim-fade-in absolute inset-0 bg-espresso/60 backdrop-blur-[2px]" onClick={onClose} aria-label="Close cart" />

      <aside className="anim-drawer absolute top-0 right-0 flex h-full w-full max-w-[430px] flex-col bg-paper shadow-deep">
        {/* header */}
        <div className="flex items-center justify-between border-b border-line bg-cream px-5 py-4">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-bold text-ink">
            Your bench
            {count > 0 && (
              <span className="rounded-full bg-copper px-2 py-0.5 text-[11px] font-extrabold text-cream">
                {count} {count === 1 ? "item" : "items"}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="btn-press flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink hover:bg-espresso hover:text-cream"
            aria-label="Close cart"
          >
            <IconX size={16} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-line text-ink-faint">
              <IconBasket size={36} />
            </span>
            <div>
              <p className="font-display text-2xl font-bold text-ink">Nothing on the bench yet</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                Six machines are waiting in the catalogue. Pick one and we'll start warming up the solder.
              </p>
            </div>
            <button
              onClick={onBrowse}
              className="btn-press group mt-2 inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-bold text-cream shadow-card hover:bg-copper-deep"
            >
              Browse the six
              <span className="transition-transform group-hover:translate-x-1"><IconArrowRight size={15} /></span>
            </button>
          </div>
        ) : (
          <>
            {/* lines */}
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {lines.map((l) => (
                <li key={l.key} className="anim-rise-in flex gap-3.5 py-4">
                  <img
                    src={l.product.image}
                    alt={l.product.name}
                    className="h-16 w-20 shrink-0 rounded-lg border border-line bg-studio object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-[14px] font-extrabold text-ink">{l.product.name}</p>
                      <p className="shrink-0 text-[14px] font-extrabold text-ink">{formatPrice(l.lineTotal)}</p>
                    </div>
                    <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                      {l.finish} · {formatPrice(l.product.price)} each
                    </p>
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-line bg-cream">
                        <button
                          onClick={() => onUpdateQty(l.key, -1)}
                          disabled={l.qty <= 1}
                          className="btn-press flex h-8 w-9 items-center justify-center text-ink-soft hover:text-copper disabled:opacity-30"
                          aria-label={`Decrease ${l.product.name} quantity`}
                        >
                          <IconMinus size={13} />
                        </button>
                        <span className="w-6 text-center text-[13px] font-extrabold text-ink" aria-live="polite">{l.qty}</span>
                        <button
                          onClick={() => onUpdateQty(l.key, 1)}
                          disabled={l.qty >= l.product.stock}
                          className="btn-press flex h-8 w-9 items-center justify-center text-ink-soft hover:text-copper disabled:opacity-30"
                          aria-label={`Increase ${l.product.name} quantity`}
                        >
                          <IconPlus size={13} />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(l.key)}
                        className="btn-press flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold text-ink-faint hover:bg-clay/10 hover:text-clay"
                        aria-label={`Remove ${l.product.name} from cart`}
                      >
                        <IconTrash size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* footer */}
            <div className="border-t border-line bg-cream px-5 py-5">
              {totals.freeShipping ? (
                <p className="mb-4 flex items-center gap-2 rounded-lg bg-moss/12 px-3 py-2.5 text-[13px] font-extrabold text-moss-deep">
                  <IconTruck size={16} className="text-moss" />
                  Free insured shipping unlocked
                </p>
              ) : (
                <div className="mb-4">
                  <p className="text-[12.5px] font-bold text-ink-soft">
                    <span className="text-copper">{formatPrice(totals.remaining)}</span> away from free shipping
                  </p>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-parch">
                    <div
                      className="h-full rounded-full bg-copper transition-all duration-500 ease-out"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )}

              <dl className="space-y-1.5 text-[13.5px] font-semibold text-ink-soft">
                <div className="flex justify-between"><dt>Subtotal</dt><dd className="text-ink">{formatPrice(totals.subtotal)}</dd></div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className={totals.shipping === 0 ? "font-extrabold text-moss" : "text-ink"}>
                    {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
                  </dd>
                </div>
                <div className="flex justify-between"><dt>Tax (est.)</dt><dd className="text-ink">{formatPriceExact(totals.tax)}</dd></div>
              </dl>
              <p className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
                <span className="text-sm font-extrabold tracking-wide text-ink uppercase">Total</span>
                <span className="font-display text-[26px] font-bold text-ink">{formatPriceExact(totals.total)}</span>
              </p>
              <button
                onClick={onCheckout}
                className="btn-press mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-ink py-3.5 text-[15px] font-extrabold text-cream shadow-card hover:bg-copper"
              >
                <IconLock size={16} />
                Checkout securely
              </button>
              <p className="mt-2.5 text-center text-[11px] font-semibold text-ink-faint">
                Simulated checkout — no real payment is taken.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

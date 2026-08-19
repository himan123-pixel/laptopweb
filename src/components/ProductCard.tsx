import { formatPrice, type Product } from "../data/products";
import { IconBasket, IconPlus, Stars } from "./Icons";

interface ProductCardProps {
  product: Product;
  index: number;
  onOpen: (id: string) => void;
  onQuickAdd: (p: Product) => void;
}

export function ProductCard({ product, index, onOpen, onQuickAdd }: ProductCardProps) {
  const low = product.stock <= 4;

  return (
    <article
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-line bg-cream shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-copper/45 hover:shadow-lift"
      onClick={() => onOpen(product.id)}
      style={{ transitionDelay: `${(index % 3) * 40}ms` }}
    >
      {/* media */}
      <div className="relative overflow-hidden bg-studio">
        <img
          src={product.image}
          alt={`${product.name} — ${product.category}`}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rotate-[-2.5deg] rounded bg-espresso/92 px-2.5 py-1 text-[10px] font-extrabold tracking-[0.16em] text-honey uppercase shadow-sm">
            {product.badge}
          </span>
        )}
        {product.compareAt && (
          <span className="absolute top-3 right-3 rounded bg-clay px-2 py-1 text-[10px] font-extrabold tracking-wide text-cream uppercase shadow-sm">
            Save {formatPrice(product.compareAt - product.price)}
          </span>
        )}
        {low && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-cream/95 px-2.5 py-1 text-[11px] font-extrabold text-clay shadow-sm">
            <span className="anim-ember h-1.5 w-1.5 rounded-full bg-clay" />
            Only {product.stock} left
          </span>
        )}

        {/* hover quick actions */}
        <div
          className="absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 sm:translate-y-16 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onOpen(product.id)}
            className="btn-press flex-1 rounded-lg bg-cream/95 px-3 py-2.5 text-[13px] font-extrabold text-ink shadow-card backdrop-blur-sm hover:bg-cream"
          >
            Details
          </button>
          <button
            onClick={() => onQuickAdd(product)}
            aria-label={`Add ${product.name} to cart`}
            className="btn-press flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-copper px-3 py-2.5 text-[13px] font-extrabold text-cream shadow-card hover:bg-copper-deep"
          >
            <IconPlus size={14} />
            Add
          </button>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-extrabold tracking-[0.18em] text-copper uppercase">
            {product.series}
          </p>
          <span className="flex items-center gap-1.5 text-xs font-bold text-ink-soft">
            <Stars rating={product.rating} size={12} />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="mt-1.5 font-display text-[22px] leading-tight font-bold text-ink transition-colors group-hover:text-copper">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[13.5px] leading-snug text-ink-soft">{product.tagline}</p>

        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {product.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-line bg-paper px-2.5 py-0.5 text-[11px] font-bold text-ink-soft"
            >
              {chip}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line/80 pt-4">
          <div>
            <p className="font-display text-xl font-bold text-ink">
              {formatPrice(product.price)}
              {product.compareAt && (
                <span className="ml-2 align-middle text-sm font-semibold text-ink-faint line-through">
                  {formatPrice(product.compareAt)}
                </span>
              )}
            </p>
            <p className={`mt-0.5 text-[11px] font-bold ${low ? "text-clay" : "text-moss"}`}>
              {low ? `Low stock · ${product.stock} on the shelf` : "In stock"}
            </p>
          </div>
          <div className="flex items-center gap-1.5" aria-label="Available finishes">
            {product.finishes.map((f) => (
              <span
                key={f.name}
                title={f.name}
                className="h-3.5 w-3.5 rounded-full border border-ink/15 transition-transform hover:scale-125"
                style={{ backgroundColor: f.hex }}
              />
            ))}
          </div>
        </div>
      </div>

      <span className="sr-only">
        <IconBasket size={12} />
      </span>
    </article>
  );
}

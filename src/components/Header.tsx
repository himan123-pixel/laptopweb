import { useState } from "react";
import { formatPrice } from "../data/products";
import { CoilMark, IconBasket, IconSearch, IconX } from "./Icons";

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  search: string;
  onSearch: (v: string) => void;
  onOpenCart: () => void;
}

export function Header({ cartCount, cartTotal, search, onSearch, onOpenCart }: HeaderProps) {
  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <div className="sticky top-0 z-40">
      {/* announcement strip */}
      <div className="bg-espresso text-cream/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1.5 text-[11px] tracking-[0.14em] uppercase sm:px-6">
          <p className="flex items-center gap-2 truncate">
            <span className="anim-ember inline-block h-1.5 w-1.5 rounded-full bg-honey" />
            <span className="truncate">Bench report · 4 build slots left this week</span>
          </p>
          <p className="hidden shrink-0 text-cream/60 sm:block">Tue–Sat · 10:00–18:00 · Portland, OR</p>
        </div>
      </div>

      {/* main bar */}
      <header className="border-b border-line bg-paper/92 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <a
            href="#top"
            className="btn-press flex shrink-0 items-center gap-2.5"
            aria-label="Copperline home"
          >
            <CoilMark size={34} />
            <span className="leading-none">
              <span className="block font-display text-[22px] font-bold tracking-tight text-ink">
                Copperline
              </span>
              <span className="mt-0.5 hidden text-[9px] font-bold tracking-[0.24em] text-ink-soft uppercase sm:block">
                Bench-built computers
              </span>
            </span>
          </a>

          {/* desktop search */}
          <div className="relative mx-auto hidden w-full max-w-sm md:block">
            <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-faint">
              <IconSearch size={16} />
            </span>
            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search the bench — try “OLED” or “silent”"
              className="field rounded-full py-2.5 pr-9 pl-10 text-sm"
              aria-label="Search products"
            />
            {search && (
              <button
                onClick={() => onSearch("")}
                className="btn-press absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-0.5 text-ink-soft hover:bg-parch hover:text-ink"
                aria-label="Clear search"
              >
                <IconX size={14} />
              </button>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            {/* mobile search toggle */}
            <button
              onClick={() => setMobileSearch((s) => !s)}
              className="btn-press rounded-full border border-line bg-cream p-2.5 text-ink hover:border-copper hover:text-copper md:hidden"
              aria-label={mobileSearch ? "Close search" : "Open search"}
            >
              {mobileSearch ? <IconX size={17} /> : <IconSearch size={17} />}
            </button>

            <button
              onClick={onOpenCart}
              className="btn-press relative flex items-center gap-2.5 rounded-full border border-line bg-cream py-2 pr-4 pl-3 text-ink shadow-sm hover:border-copper hover:shadow-card"
              aria-label={`Open cart, ${cartCount} items`}
            >
              <span className="text-copper">
                <IconBasket size={19} />
              </span>
              <span className="hidden text-sm font-bold sm:block">
                {cartCount > 0 ? formatPrice(cartTotal) : "Bench"}
              </span>
              {cartCount > 0 && (
                <span
                  key={cartCount}
                  className="anim-bump absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-copper px-1 text-[11px] font-extrabold text-cream shadow-sm"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* mobile search row */}
        {mobileSearch && (
          <div className="anim-rise-in border-t border-line/70 px-4 pt-2.5 pb-3 md:hidden">
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-faint">
                <IconSearch size={16} />
              </span>
              <input
                autoFocus
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search machines, specs, finishes…"
                className="field rounded-full py-2.5 pr-9 pl-10 text-sm"
                aria-label="Search products"
              />
              {search && (
                <button
                  onClick={() => onSearch("")}
                  className="btn-press absolute top-1/2 right-3 -translate-y-1/2 text-ink-soft"
                  aria-label="Clear search"
                >
                  <IconX size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

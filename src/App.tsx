import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CartDrawer } from "./components/CartDrawer";
import { Checkout } from "./components/Checkout";
import { FilterBar, type SortId } from "./components/FilterBar";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { IconSearch } from "./components/Icons";
import { Masthead } from "./components/Masthead";
import { ProductCard } from "./components/ProductCard";
import { ProductDetail } from "./components/ProductDetail";
import { Reveal } from "./components/Reveal";
import { Toasts, type Toast } from "./components/Toasts";
import {
  CATEGORIES,
  PRODUCTS,
  categoryLabel,
  formatPrice,
  getProduct,
  type CategoryId,
  type Product,
} from "./data/products";
import { computeTotals, type CartLine, type CartLineView } from "./lib/cart";

const CART_KEY = "copperline-cart-v1";

const BUILD_STEPS = [
  { n: "01", t: "Assemble", d: "One technician builds your machine start to finish — no line, no hand-offs." },
  { n: "02", t: "Loop & comb", d: "Cables combed flat, loops pressure-tested, thermal paste cured properly." },
  { n: "03", t: "48-hr burn-in", d: "Two days of sustained load while the fan curve is drawn by ear, not spreadsheet." },
  { n: "04", t: "Sign & ship", d: "The builder signs the report, the box leaves insured, the care plan is live." },
];

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed.filter((l) => getProduct(l.productId)) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [sort, setSort] = useState<SortId>("featured");
  const [cart, setCart] = useState<CartLine[]>(loadCart);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* private mode — fine */
    }
  }, [cart]);

  const pushToast = useCallback((msg: string, sub?: string) => {
    const id = ++toastId.current;
    setToasts((ts) => [...ts.slice(-2), { id, msg, sub }]);
    window.setTimeout(() => setToasts((ts) => ts.filter((t) => t.id !== id)), 3200);
  }, []);

  /* ---------- cart ---------- */
  const cartLines: CartLineView[] = useMemo(
    () =>
      cart
        .map((l) => {
          const product = getProduct(l.productId);
          return product ? { ...l, product, lineTotal: product.price * l.qty } : null;
        })
        .filter((l): l is CartLineView => l !== null),
    [cart],
  );

  const cartCount = cartLines.reduce((n, l) => n + l.qty, 0);
  const cartSubtotal = cartLines.reduce((n, l) => n + l.lineTotal, 0);
  const cartTotals = computeTotals(cartSubtotal);

  const addToCart = useCallback(
    (product: Product, finish: string, qty: number) => {
      let clamped = false;
      setCart((prev) => {
        const key = `${product.id}:${finish}`;
        const existing = prev.find((l) => l.key === key);
        const current = existing?.qty ?? 0;
        const nextQty = Math.min(product.stock, current + qty);
        clamped = current + qty > product.stock;
        if (existing) return prev.map((l) => (l.key === key ? { ...l, qty: nextQty } : l));
        return [...prev, { key, productId: product.id, finish, qty: nextQty }];
      });
      pushToast(
        `${product.name} · ${finish}`,
        clamped
          ? `Only ${product.stock} in stock — we've reserved them all for you`
          : `Added to your bench · ${formatPrice(product.price * qty)}`,
      );
    },
    [pushToast],
  );

  const quickAdd = useCallback(
    (product: Product) => addToCart(product, product.finishes[0].name, 1),
    [addToCart],
  );

  const updateQty = useCallback((key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) => {
          if (l.key !== key) return l;
          const stock = getProduct(l.productId)?.stock ?? 99;
          return { ...l, qty: Math.max(1, Math.min(stock, l.qty + delta)) };
        })
        .filter((l) => l.qty > 0),
    );
  }, []);

  const removeLine = useCallback(
    (key: string) => {
      const line = cart.find((l) => l.key === key);
      setCart((prev) => prev.filter((l) => l.key !== key));
      if (line) {
        const p = getProduct(line.productId);
        if (p) pushToast(`${p.name} removed`, "Taken off your bench.");
      }
    },
    [cart, pushToast],
  );

  /* ---------- catalogue filtering ---------- */
  const counts = useMemo(() => {
    const c = Object.fromEntries(CATEGORIES.map((cat) => [cat.id, 0])) as Record<CategoryId, number>;
    for (const p of PRODUCTS) c[p.category] += 1;
    return c;
  }, []);

  const filtered = useMemo(() => {
    let list = category === "all" ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === category);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [
          p.name,
          p.series,
          p.tagline,
          p.description,
          p.badge ?? "",
          categoryLabel(p.category),
          ...p.chips,
          ...p.finishes.map((f) => f.name),
          ...p.specs.flatMap((s) => [s.label, s.value]),
        ]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      default:
        break;
    }
    return list;
  }, [category, search, sort]);

  /* ---------- navigation ---------- */
  const scrollToBench = useCallback(() => {
    document.getElementById("bench")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const openDetail = useCallback((id: string) => setDetailId(id), []);

  const footerCategory = useCallback(
    (c: CategoryId | "all") => {
      setCategory(c);
      setSearch("");
      requestAnimationFrame(() => scrollToBench());
    },
    [scrollToBench],
  );

  const startCheckout = useCallback(() => {
    if (cartLines.length === 0) return;
    setCartOpen(false);
    setCheckoutOpen(true);
  }, [cartLines.length]);

  const detailProduct = detailId ? getProduct(detailId) : undefined;
  const featured = getProduct("ember-gt16") ?? PRODUCTS[0];

  return (
    <div id="top" className="grain min-h-dvh">
      <div className="heat-glow">
        <Header
          cartCount={cartCount}
          cartTotal={cartTotals.subtotal}
          search={search}
          onSearch={setSearch}
          onOpenCart={() => setCartOpen(true)}
        />

        <main>
          <Masthead featured={featured} onBrowse={scrollToBench} onView={openDetail} />

          {/* catalogue */}
          <section id="bench" className="relative mx-auto max-w-6xl scroll-mt-28 px-4 py-14 sm:px-6 lg:py-20">
            <Reveal>
              <FilterBar
                counts={counts}
                total={PRODUCTS.length}
                active={category}
                onCategory={setCategory}
                sort={sort}
                onSort={setSort}
                resultCount={filtered.length}
                search={search}
                onClearAll={() => {
                  setSearch("");
                  setCategory("all");
                }}
              />
            </Reveal>

            {filtered.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 3) * 90}>
                    <ProductCard product={p} index={i} onOpen={openDetail} onQuickAdd={quickAdd} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="anim-rise-in mt-10 flex flex-col items-center rounded-xl border-2 border-dashed border-line bg-cream/60 px-6 py-16 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-parch text-ink-faint">
                  <IconSearch size={26} />
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                  Nothing on the bench matches “{search.trim()}”
                </h3>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-soft">
                  Try a spec (“OLED”, “silent”, “RTX”), a finish (“moss”), or clear the filters to see all six machines.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("all");
                  }}
                  className="btn-press mt-5 rounded-full bg-copper px-6 py-3 text-sm font-extrabold text-cream shadow-card hover:bg-copper-deep"
                >
                  Show all six machines
                </button>
              </div>
            )}
          </section>

          {/* how a copperline gets built */}
          <section className="bg-espresso text-cream" aria-label="How we build">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
              <Reveal>
                <p className="text-[11px] font-extrabold tracking-[0.22em] text-honey uppercase">The process</p>
                <h2 className="mt-2 max-w-xl font-display text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                  How a Copperline gets <em className="font-light text-honey italic">built</em>
                </h2>
              </Reveal>
              <ol className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
                {BUILD_STEPS.map((s, i) => (
                  <Reveal key={s.n} delay={i * 110}>
                    <li className="group relative border-t border-dashed border-cream/25 pt-5 transition-colors hover:border-honey/70">
                      <span className="font-display text-4xl font-light text-copper transition-colors group-hover:text-honey">
                        {s.n}
                      </span>
                      <h3 className="mt-2 font-display text-xl font-bold">{s.t}</h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-cream/60">{s.d}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>
        </main>

        <Footer onCategory={footerCategory} onToast={pushToast} />
      </div>

      {/* overlays */}
      {detailProduct && (
        <ProductDetail
          product={detailProduct}
          onClose={() => setDetailId(null)}
          onAdd={(p, finish, qty) => addToCart(p, finish, qty)}
        />
      )}

      <CartDrawer
        open={cartOpen}
        lines={cartLines}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeLine}
        onCheckout={startCheckout}
        onBrowse={() => {
          setCartOpen(false);
          requestAnimationFrame(() => scrollToBench());
        }}
      />

      <Checkout
        open={checkoutOpen}
        lines={cartLines}
        onClose={() => setCheckoutOpen(false)}
        onComplete={() => setCart([])}
      />

      <Toasts toasts={toasts} onDismiss={(id) => setToasts((ts) => ts.filter((t) => t.id !== id))} />
    </div>
  );
}

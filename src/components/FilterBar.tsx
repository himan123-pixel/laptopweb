import { CATEGORIES, type CategoryId } from "../data/products";
import { IconChevronDown, IconSearch, IconX } from "./Icons";

export type SortId = "featured" | "price-asc" | "price-desc" | "rating";

const SORTS: { id: SortId; label: string }[] = [
  { id: "featured", label: "Bench order" },
  { id: "price-asc", label: "Price · low to high" },
  { id: "price-desc", label: "Price · high to low" },
  { id: "rating", label: "Top rated" },
];

interface FilterBarProps {
  counts: Record<CategoryId, number>;
  total: number;
  active: CategoryId | "all";
  onCategory: (c: CategoryId | "all") => void;
  sort: SortId;
  onSort: (s: SortId) => void;
  resultCount: number;
  search: string;
  onClearAll: () => void;
}

export function FilterBar({
  counts,
  total,
  active,
  onCategory,
  sort,
  onSort,
  resultCount,
  search,
  onClearAll,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <p className="text-[11px] font-extrabold tracking-[0.22em] text-copper uppercase">
            The catalogue
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            The bench
          </h2>
        </div>
        <p className="text-sm font-bold text-ink-soft" role="status">
          {resultCount} {resultCount === 1 ? "machine" : "machines"}
          {search.trim() && (
            <>
              {" "}matching <span className="text-copper">“{search.trim()}”</span>
            </>
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* category pills */}
        <div className="no-scrollbar -mx-1 flex flex-1 gap-2 overflow-x-auto px-1 py-1" role="tablist" aria-label="Category filters">
          <button
            role="tab"
            aria-selected={active === "all"}
            onClick={() => onCategory("all")}
            className={`btn-press flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-bold whitespace-nowrap transition-colors ${
              active === "all"
                ? "border-ink bg-ink text-cream shadow-card"
                : "border-line bg-cream text-ink hover:border-copper hover:text-copper"
            }`}
          >
            All machines
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${
                active === "all" ? "bg-cream/20 text-cream" : "bg-parch text-ink-soft"
              }`}
            >
              {total}
            </span>
          </button>
          {CATEGORIES.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                title={c.blurb}
                onClick={() => onCategory(isActive ? "all" : c.id)}
                className={`btn-press flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-copper bg-copper text-cream shadow-card"
                    : "border-line bg-cream text-ink hover:border-copper hover:text-copper"
                }`}
              >
                {c.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${
                    isActive ? "bg-cream/25 text-cream" : "bg-parch text-ink-soft"
                  }`}
                >
                  {counts[c.id] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* sort */}
        <label className="relative shrink-0">
          <span className="sr-only">Sort products</span>
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value as SortId)}
            className="field w-48 cursor-pointer appearance-none rounded-full py-2.5 pr-9 pl-4 text-[13px] font-bold"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-ink-soft">
            <IconChevronDown size={15} />
          </span>
        </label>
      </div>

      {search.trim() && (
        <button
          onClick={onClearAll}
          className="btn-press inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-copper/50 bg-copper/8 px-3.5 py-1.5 text-xs font-bold text-copper hover:bg-copper/15"
        >
          <IconSearch size={13} />
          Clear search & filters
          <IconX size={12} />
        </button>
      )}
    </div>
  );
}

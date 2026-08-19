import { IconCheck, IconX } from "./Icons";

export interface Toast {
  id: number;
  msg: string;
  sub?: string;
}

interface ToastsProps {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}

export function Toasts({ toasts, onDismiss }: ToastsProps) {
  if (toasts.length === 0) return null;
  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[80] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2.5">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="anim-toast pointer-events-auto flex items-start gap-3 rounded-xl border border-espresso-2 bg-espresso px-4 py-3.5 text-cream shadow-deep"
          role="status"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-copper text-cream">
            <IconCheck size={13} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] leading-snug font-extrabold">{t.msg}</p>
            {t.sub && <p className="mt-0.5 text-[12px] font-semibold text-cream/60">{t.sub}</p>}
          </div>
          <button
            onClick={() => onDismiss(t.id)}
            className="btn-press shrink-0 rounded-full p-1 text-cream/50 hover:bg-cream/10 hover:text-cream"
            aria-label="Dismiss notification"
          >
            <IconX size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}

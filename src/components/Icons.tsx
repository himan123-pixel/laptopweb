import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function I({ size = 18, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconSearch = (p: IconProps) => (
  <I {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20.5 20.5-4.9-4.9" />
  </I>
);

export const IconX = (p: IconProps) => (
  <I {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </I>
);

export const IconPlus = (p: IconProps) => (
  <I {...p}>
    <path d="M12 5v14M5 12h14" />
  </I>
);

export const IconMinus = (p: IconProps) => (
  <I {...p}>
    <path d="M5 12h14" />
  </I>
);

export const IconTrash = (p: IconProps) => (
  <I {...p}>
    <path d="M4 7h16" />
    <path d="M9.5 7V4.5h5V7" />
    <path d="M6.2 7l1 12.1a1.8 1.8 0 0 0 1.8 1.6h6a1.8 1.8 0 0 0 1.8-1.6l1-12.1" />
    <path d="M10 11v6M14 11v6" />
  </I>
);

export const IconBasket = (p: IconProps) => (
  <I {...p}>
    <path d="M4.6 9h14.8l-1.4 10.3a2 2 0 0 1-2 1.7H8a2 2 0 0 1-2-1.7Z" />
    <path d="M8.5 9 12 3l3.5 6" />
    <path d="M9.7 13v4.2M14.3 13v4.2" />
  </I>
);

export const IconStar = (p: IconProps) => (
  <I {...p} strokeWidth={0}>
    <path
      fill="currentColor"
      d="M12 2.8 14.8 8.6l6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9Z"
    />
  </I>
);

export const IconCheck = (p: IconProps) => (
  <I {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </I>
);

export const IconArrowRight = (p: IconProps) => (
  <I {...p}>
    <path d="M4 12h15M13.5 6l6 6-6 6" />
  </I>
);

export const IconChevronDown = (p: IconProps) => (
  <I {...p}>
    <path d="m6 9 6 6 6-6" />
  </I>
);

export const IconChip = (p: IconProps) => (
  <I {...p}>
    <rect x="7" y="7" width="10" height="10" rx="1.6" />
    <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
  </I>
);

export const IconFan = (p: IconProps) => (
  <I {...p}>
    <circle cx="12" cy="12" r="1.9" />
    <path d="M12 10.1c-.4-3.6.9-6.1 3.4-6.6.6 2.6-.6 5-3.4 6.6Z" />
    <path d="M10.4 13c-3.5.9-6.2 0-7.1-2.4 2.5-1 5.1-.2 7.1 2.4Z" />
    <path d="M13.5 13.2c2.8 2.2 3.7 4.8 2.3 7-2.2-1.5-2.9-4.1-2.3-7Z" />
  </I>
);

export const IconShield = (p: IconProps) => (
  <I {...p}>
    <path d="M12 3 5 5.8V12c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V5.8Z" />
    <path d="m9 12 2.2 2.2L15.4 10" />
  </I>
);

export const IconTruck = (p: IconProps) => (
  <I {...p}>
    <path d="M2.5 6.5h11v9h-11Z" />
    <path d="M13.5 10h4l3 3v2.5h-7Z" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="16.5" cy="17.5" r="1.8" />
  </I>
);

export const IconBox = (p: IconProps) => (
  <I {...p}>
    <path d="M12 3 4 7v10l8 4 8-4V7Z" />
    <path d="m4 7 8 4 8-4M12 11v10" />
  </I>
);

export const IconFlame = (p: IconProps) => (
  <I {...p}>
    <path d="M12 3c1.2 3.2 5 5.2 5 9.4A5.2 5.2 0 0 1 12 17.6a5.2 5.2 0 0 1-5-5.2C7 8.2 10.8 6.6 12 3Z" />
    <path d="M12 21.5c-2.4 0-4-1.4-4-3.3 0-1.8 1.6-2.7 4-2.7s4 .9 4 2.7c0 1.9-1.6 3.3-4 3.3Z" />
  </I>
);

export const IconLock = (p: IconProps) => (
  <I {...p}>
    <rect x="5" y="11" width="14" height="9.5" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    <path d="M12 15v2" />
  </I>
);

export const IconCard = (p: IconProps) => (
  <I {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
    <path d="M3 10h18M7 15h4" />
  </I>
);

export const IconPin = (p: IconProps) => (
  <I {...p}>
    <path d="M12 21s-6.2-5.6-6.2-10.2a6.2 6.2 0 1 1 12.4 0C18.2 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.6" r="2.2" />
  </I>
);

export const IconClock = (p: IconProps) => (
  <I {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.2V12l3.4 2" />
  </I>
);

export const IconSpark = (p: IconProps) => (
  <I {...p}>
    <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
  </I>
);

export const IconWrench = (p: IconProps) => (
  <I {...p}>
    <path d="M14.5 6.2a4.6 4.6 0 0 0-6.1 5.9L3 17.5 6.5 21l5.4-5.4a4.6 4.6 0 0 0 5.9-6.1l-3 3-2.8-.7-.7-2.8Z" />
  </I>
);

export const IconZap = (p: IconProps) => (
  <I {...p}>
    <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12Z" />
  </I>
);

export const IconScale = (p: IconProps) => (
  <I {...p}>
    <path d="M12 4v16M7 20h10" />
    <path d="M12 4 5.5 7.5M12 4l6.5 3.5" />
    <path d="M3 13.5 5.5 7.5 8 13.5a2.7 2.7 0 0 1-5 0ZM16 13.5l2.5-6 2.5 6a2.7 2.7 0 0 1-5 0Z" />
  </I>
);

export const CoilMark = ({ size = 34 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="var(--color-copper)" />
    <circle
      cx="16"
      cy="16"
      r="8.5"
      fill="none"
      stroke="var(--color-cream)"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeDasharray="40 14"
      transform="rotate(-50 16 16)"
    />
    <circle cx="16" cy="16" r="2.6" fill="var(--color-cream)" />
  </svg>
);

export const Stars = ({ rating, size = 13 }: { rating: number; size?: number }) => {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-[2px]" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={i < full ? "text-honey" : "text-line"}>
          <IconStar size={size} />
        </span>
      ))}
    </span>
  );
};

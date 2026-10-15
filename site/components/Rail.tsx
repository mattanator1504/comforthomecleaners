"use client";

import { useEffect, useRef, useState } from "react";

// apple.com-style card rail. Scrolling is the browser's own: real momentum,
// rubber-banding and snap points come for free (apple-design §6, §9).
// The buttons only nudge it, and disable at the ends.
export default function Rail({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = ref.current!;
    const update = () => {
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const el = ref.current!;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div>
      <div ref={ref} role="region" aria-label={label} tabIndex={0} className="rail flex gap-5 overflow-x-auto pb-6 pt-2">
        {children}
      </div>
      <div className="mx-auto flex max-w-6xl justify-end gap-3 px-4 sm:px-6">
        {[
          { d: -1 as const, l: "Previous", dis: atStart, path: "m14 6-6 6 6 6" },
          { d: 1 as const, l: "Next", dis: atEnd, path: "m10 6 6 6-6 6" },
        ].map((b) => (
          <button
            key={b.l}
            type="button"
            onClick={() => nudge(b.d)}
            disabled={b.dis}
            aria-label={`${b.l} cards`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-mist text-ink transition-opacity hover:bg-[#dcdce1] disabled:opacity-35"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d={b.path} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

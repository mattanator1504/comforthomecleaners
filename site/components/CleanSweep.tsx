"use client";

import { useState } from "react";

// Hero moment: a light-beam sweeps across the room on load, "cleaning" it.
// Afterwards the visitor can drag the beam themselves.
export default function CleanSweep({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  // Until the visitor touches it, a CSS animation drives the sweep (works before JS loads).
  const [pos, setPos] = useState<number | null>(null);
  const p = pos ?? 62;

  return (
    <div className="sweep relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[1387/1016] sm:rounded-[40px] lg:aspect-auto lg:h-[min(78vh,780px)]">
      {/* Before: the same room, tired and dim */}
      <img
        src={src}
        width={width}
        height={height}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[64%_50%]"
        style={{ filter: "sepia(0.45) saturate(0.55) brightness(0.74) contrast(0.88) blur(0.6px)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .4 0 0 0 0 .32 0 0 0 .35 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* After: crisp and bright */}
      <div className={`absolute inset-0 ${pos === null ? "sweep-clip" : ""}`} style={pos === null ? undefined : { clipPath: `inset(0 ${100 - p}% 0 0)` }}>
        <img
          src={src}
          width={width}
          height={height}
          alt={alt}
          fetchPriority="high"
          className="h-full w-full object-cover object-[64%_50%]"
          style={{ filter: "saturate(1.06) brightness(1.04)" }}
        />
      </div>

      {/* Beam + handle */}
      <div className={`pointer-events-none absolute inset-y-0 ${pos === null ? "sweep-beam" : ""}`} style={pos === null ? undefined : { left: `${p}%` }} aria-hidden="true">
        <div className="sweep-line absolute inset-y-0 -left-px w-0.5" />
        <div className="glass absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </div>
      </div>

      <span className="glass pointer-events-none absolute left-4 top-4 rounded-full px-3 py-1.5 text-[14px] font-medium text-ink sm:left-6 sm:top-6">
        Comfort clean
      </span>
      <span className="glass-dark pointer-events-none absolute right-4 top-4 rounded-full px-3 py-1.5 text-[14px] font-medium text-white sm:right-6 sm:top-6">
        Lived-in
      </span>

      <label className="absolute inset-0 cursor-ew-resize">
        <span className="sr-only">Drag to compare the room before and after a clean</span>
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={p}
          onChange={(e) => setPos(Number(e.target.value))}
          className="h-full w-full cursor-ew-resize opacity-0"
        />
      </label>
    </div>
  );
}

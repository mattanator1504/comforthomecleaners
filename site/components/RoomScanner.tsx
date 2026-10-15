"use client";

import { useState } from "react";
import { rooms } from "@/content/home";
import { Check } from "./Icons";

// Apple-style segmented control. The selection pill slides with a CSS
// transition (interruptible: a quick second tap retargets from where it is).
export default function RoomScanner() {
  const [active, setActive] = useState(0);
  const n = rooms.length;

  return (
    <div>
      <div className="flex justify-center">
        <div role="tablist" aria-label="Rooms" className="relative grid w-full max-w-md rounded-full bg-mist p-1" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          <span
            aria-hidden="true"
            className="absolute inset-y-1 left-1 rounded-full bg-white shadow-[0_2px_8px_rgb(0_0_0/0.12)] transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
            style={{ width: `calc((100% - 0.5rem) / ${n})`, transform: `translateX(${active * 100}%)` }}
          />
          {rooms.map((r, i) => (
            <button
              key={r.id}
              role="tab"
              id={`tab-${r.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${r.id}`}
              onClick={() => setActive(i)}
              className={`relative z-10 min-h-11 rounded-full px-3 text-[15px] font-medium transition-colors ${i === active ? "text-ink" : "text-ink/60 hover:text-ink"}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <div className="relative overflow-hidden rounded-[28px] bg-mist">
          {rooms.map((r, i) => (
            <img
              key={r.id}
              src={r.image.src}
              width={r.image.w}
              height={r.image.h}
              alt={r.image.alt}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,filter,transform] duration-500 ${
                i === active ? "scale-100 opacity-100 blur-0" : "scale-[1.03] opacity-0 blur-[2px]"
              }`}
            />
          ))}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[460px]" />
        </div>

        {rooms.map((r, i) => (
          <div
            key={r.id}
            role="tabpanel"
            id={`panel-${r.id}`}
            aria-labelledby={`tab-${r.id}`}
            hidden={i !== active}
            className="rounded-[28px] bg-white p-7 sm:p-10"
          >
            <h3 className="text-[28px] font-bold tracking-[-0.02em]">{r.label}</h3>
            <p className="mt-3 text-[17px] leading-relaxed text-slate">{r.intro}</p>
            <ul key={active} className="settle mt-7 space-y-4">
              {r.items.map((it) => (
                <li key={it} className="flex items-start gap-3 text-[17px] text-ink">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-aqua text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

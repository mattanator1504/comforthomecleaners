"use client";

import { useState } from "react";
import { rooms } from "@/content/home";
import { Check } from "./Icons";

// Apple-style segmented control: pick a room, see the checklist.
export default function RoomScanner() {
  const [active, setActive] = useState(0);
  const room = rooms[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
      <div className="relative overflow-hidden rounded-[32px] bg-mist">
        {rooms.map((r, i) => (
          <img
            key={r.id}
            src={r.image.src}
            width={r.image.w}
            height={r.image.h}
            alt={r.image.alt}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/60 to-transparent" />
        <p className="glass-dark absolute bottom-4 left-4 rounded-full px-4 py-2 text-[14px] font-medium text-white">
          {room.items.length} checkpoints · {room.label}
        </p>
      </div>

      <div className="glass rounded-[32px] p-5 sm:p-8">
        <div role="tablist" aria-label="Rooms" className="flex flex-wrap gap-1 rounded-full bg-ink/[0.06] p-1">
          {rooms.map((r, i) => (
            <button
              key={r.id}
              role="tab"
              id={`tab-${r.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${r.id}`}
              onClick={() => setActive(i)}
              className={`min-h-11 flex-1 rounded-full px-3 text-[14px] font-medium transition ${
                i === active ? "bg-white text-ink" : "text-ink/60 hover:text-ink"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {rooms.map((r, i) => (
          <div key={r.id} role="tabpanel" id={`panel-${r.id}`} aria-labelledby={`tab-${r.id}`} hidden={i !== active} className="mt-6">
            <p className="text-[15px] leading-relaxed text-slate">{r.intro}</p>
            <ul key={active} className="settle mt-5 grid gap-2.5">
              {r.items.map((it) => (
                <li key={it} className="flex items-start gap-3 rounded-2xl bg-white/70 px-4 py-3 text-[15px] text-ink">
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

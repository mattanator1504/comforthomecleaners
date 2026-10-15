"use client";

import { useEffect, useRef } from "react";

// Hero before/after, built to the apple-design rules:
//  - a CSS sweep plays on load (works before any script runs)
//  - grabbing it interrupts from the *on-screen* position, never the target (§3)
//  - drags track 1:1 and respect the grab offset (§2), with rubber-band edges (§9)
//  - release hands velocity to a spring and projects momentum forward (§5, §6)
//  - keyboard arrows move it on the same spring

const MIN = 2;
const MAX = 98;

// Apple's projection: where a flick would come to rest (decelerationRate 0.998)
const project = (v: number, d = 0.998) => ((v / 1000) * d) / (1 - d);

// Rubber-band past the edges: the further out, the less it follows
const rubberband = (over: number, dim: number, c = 0.55) => (over * dim * c) / (dim + c * Math.abs(over));

export default function CleanSweep({ src, width, height, alt }: { src: string; width: number; height: number; alt: string }) {
  const root = useRef<HTMLDivElement>(null);
  const clip = useRef<HTMLDivElement>(null);
  const beam = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const clipEl = clip.current!;
    const beamEl = beam.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let pos = 62; // percent
    let vel = 0; // percent per second
    let target = 62;
    let raf = 0;
    let live = false; // has JS taken over from the CSS sweep?
    let dragging = false;
    let grabOffset = 0;
    let catchUp = false; // tapped away from the beam: spring to the finger, then track 1:1
    let history: { x: number; t: number }[] = [];
    // Spring: damping ratio and response in seconds (Apple's two parameters)
    let zeta = 1;
    let response = 0.4;

    const render = () => {
      clipEl.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
      beamEl.style.left = `${pos}%`;
      el.setAttribute("aria-valuenow", String(Math.round(pos)));
    };

    // Read the live, on-screen value of the CSS sweep and take over from there
    const takeOver = () => {
      if (live) return;
      const r = el.getBoundingClientRect();
      const b = beamEl.getBoundingClientRect();
      pos = ((b.left - r.left) / r.width) * 100;
      clipEl.classList.remove("sweep-clip");
      beamEl.classList.remove("sweep-beam");
      live = true;
      render();
    };

    const step = (dt: number) => {
      const k = Math.pow((2 * Math.PI) / response, 2);
      const c = (4 * Math.PI * zeta) / response;
      const a = -k * (pos - target) - c * vel;
      vel += a * dt;
      pos += vel * dt;
    };

    const loop = (() => {
      let last = 0;
      const tick = (t: number) => {
        const dt = Math.min(0.032, last ? (t - last) / 1000 : 1 / 60);
        last = t;
        step(dt);
        render();
        const settled = Math.abs(pos - target) < 0.02 && Math.abs(vel) < 0.05;
        if (catchUp && Math.abs(pos - target) < 0.6) catchUp = false;
        if (dragging && !catchUp) {
          last = 0;
          raf = 0;
          return;
        }
        if (settled) {
          pos = target;
          vel = 0;
          render();
          last = 0;
          raf = 0;
          return;
        }
        raf = requestAnimationFrame(tick);
      };
      return () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };
    })();

    const springTo = (to: number, opts: { zeta?: number; response?: number } = {}) => {
      target = Math.min(MAX, Math.max(MIN, to));
      zeta = opts.zeta ?? 1;
      response = opts.response ?? 0.4;
      if (reduce) {
        pos = target;
        vel = 0;
        render();
        return;
      }
      loop();
    };

    const pct = (clientX: number) => {
      const r = el.getBoundingClientRect();
      return ((clientX - r.left) / r.width) * 100;
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      takeOver();
      el.setPointerCapture(e.pointerId);
      dragging = true;
      const p = pct(e.clientX);
      const near = Math.abs(p - pos) < (32 / el.getBoundingClientRect().width) * 100;
      grabOffset = near ? pos - p : 0; // respect where they grabbed the beam
      history = [{ x: e.clientX, t: e.timeStamp }];
      if (!near) {
        catchUp = true;
        springTo(p, { zeta: 1, response: 0.3 });
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
        vel = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      history.push({ x: e.clientX, t: e.timeStamp });
      if (history.length > 6) history.shift();
      let p = pct(e.clientX) + grabOffset;
      if (p < MIN) p = MIN - rubberband(MIN - p, 100);
      if (p > MAX) p = MAX + rubberband(p - MAX, 100);
      if (catchUp) {
        target = p;
        loop();
        return;
      }
      pos = p;
      render();
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      catchUp = false;
      const w = el.getBoundingClientRect().width;
      // Velocity from the last 100ms only: a finger that stopped before lifting has none
      const recent = history.filter((h) => e.timeStamp - h.t < 100);
      const first = recent[0];
      const lastH = recent[recent.length - 1];
      const dt = first && lastH ? (lastH.t - first.t) / 1000 : 0;
      const vPx = recent.length > 1 && dt > 0 ? (lastH.x - first.x) / dt : 0; // px/s
      const vPct = (vPx / w) * 100;
      vel = vPct; // velocity handoff
      const flick = Math.abs(vPx) > 300;
      springTo(pos + (project(vPx) / w) * 100, flick ? { zeta: 0.8, response: 0.4 } : { zeta: 1, response: 0.35 });
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    };

    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, number> = { ArrowLeft: -5, ArrowRight: 5, ArrowDown: -5, ArrowUp: 5, PageDown: -20, PageUp: 20 };
      if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        takeOver();
        springTo(e.key === "Home" ? MIN : MAX);
        return;
      }
      if (!(e.key in map)) return;
      e.preventDefault();
      takeOver();
      springTo(target + map[e.key]);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={root}
      role="slider"
      tabIndex={0}
      aria-label="Compare the room before and after a clean"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={62}
      aria-valuetext="Drag to compare"
      className="sweep relative aspect-[4/5] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[24px] sm:aspect-[16/9] sm:rounded-[32px]"
    >
      {/* Before: the same room, tired and dim */}
      <img
        src={src}
        width={width}
        height={height}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        draggable={false}
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
      <div ref={clip} className="sweep-clip absolute inset-0 will-change-[clip-path]">
        <img
          src={src}
          width={width}
          height={height}
          alt={alt}
          fetchPriority="high"
          draggable={false}
          className="h-full w-full object-cover object-[64%_50%]"
          style={{ filter: "saturate(1.06) brightness(1.04)" }}
        />
      </div>

      {/* Beam + handle */}
      <div ref={beam} className="sweep-beam pointer-events-none absolute inset-y-0" aria-hidden="true">
        <div className="sweep-line absolute inset-y-0 -left-px w-0.5" />
        <div className="material absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_4px_16px_rgb(0_0_0/0.18)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </div>
      </div>

      <span className="material pointer-events-none absolute left-4 top-4 rounded-full px-3 py-1.5 text-[13px] font-semibold text-ink sm:left-6 sm:top-6">
        Comfort clean
      </span>
      <span className="glass-dark pointer-events-none absolute right-4 top-4 rounded-full px-3 py-1.5 text-[13px] font-semibold text-white sm:right-6 sm:top-6">
        Lived-in
      </span>
    </div>
  );
}

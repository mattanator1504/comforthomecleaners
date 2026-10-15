"use client";

import { useEffect } from "react";

// Site-wide motion, kept tiny and CSS-led:
//  - [data-reveal] elements rise, fade and un-blur as they enter the viewport
//    (children of [data-stagger] cascade one after another)
//  - [data-count] numbers count up once when seen
//  - <html data-scrolled> once the page moves, so the header can tighten
// Nothing is hidden until this runs, so the page reads fine without JS.
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => root.toggleAttribute("data-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        const el = child as HTMLElement;
        el.setAttribute("data-reveal", "");
        el.style.setProperty("--reveal-delay", reduce ? "0ms" : `${Math.min(i, 8) * 70}ms`);
      });
    });

    const vh = window.innerHeight;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => el.getBoundingClientRect().top > vh * 0.9,
    );
    targets.forEach((el) => el.setAttribute("data-hidden", ""));
    root.setAttribute("data-motion", "");

    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.removeAttribute("data-hidden");
          reveal.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    targets.forEach((el) => reveal.observe(el));

    const counter = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        counter.unobserve(el);
        if (reduce) return;
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 1600);
          el.textContent = `${Math.round(end * (1 - Math.pow(1 - k, 4)))}${suffix}`;
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    });
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => counter.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      reveal.disconnect();
      counter.disconnect();
    };
  }, []);

  return null;
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";

function Stepper({ label, name, value, onChange }: { label: string; name: string; value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#d2d2d7] bg-white px-4 py-1.5">
      <span id={`${name}-label`} className="text-[15px] text-ink">
        {label}
      </span>
      <div className="flex items-center gap-1" role="group" aria-labelledby={`${name}-label`}>
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-ink/70 hover:bg-mist"
          aria-label={`Fewer ${label.toLowerCase()}`}
        >
          −
        </button>
        <output name={name} aria-live="polite" className="w-6 text-center text-[17px] tabular-nums">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(12, value + 1))}
          className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-ink/70 hover:bg-mist"
          aria-label={`More ${label.toLowerCase()}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

const field =
  "mt-1.5 block w-full rounded-xl border border-[#d2d2d7] bg-white px-4 py-3.5 text-[17px] text-ink placeholder:text-slate/70 outline-none transition focus:border-aqua focus:ring-4 focus:ring-aqua/15";

export default function QuoteForm() {
  const router = useRouter();
  const [beds, setBeds] = useState(2);
  const [baths, setBaths] = useState(1);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("company")) return; // honeypot
    const lead = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      address: String(fd.get("address") || ""),
      bedrooms: beds,
      bathrooms: baths,
      page: window.location.pathname,
      utm: Object.fromEntries(new URLSearchParams(window.location.search)),
    };
    setState("sending");

    if (site.leadWebhook) {
      try {
        const r = await fetch(site.leadWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
        if (!r.ok) throw new Error(String(r.status));
        router.push("/thank-you");
      } catch {
        setState("error");
      }
      return;
    }

    const body = [
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Address: ${lead.address}`,
      `Bedrooms: ${beds}`,
      `Bathrooms: ${baths}`,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Quote request: first appointment")}&body=${encodeURIComponent(body)}`;
    setTimeout(() => router.push("/thank-you"), 600);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-[16px] font-medium text-ink">
          Name
          <input name="name" autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block text-[16px] font-medium text-ink">
          Phone <span className="text-aqua">*</span>
          <input name="phone" type="tel" required autoComplete="tel" className={field} placeholder="(414) 000-0000" />
        </label>
      </div>
      <label className="block text-[16px] font-medium text-ink">
        Email <span className="text-aqua">*</span>
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@email.com" />
      </label>
      <label className="block text-[16px] font-medium text-ink">
        Address <span className="text-aqua">*</span>
        <input name="address" required autoComplete="street-address" className={field} placeholder="Street, city, ZIP" />
      </label>
      <fieldset className="grid gap-2 sm:grid-cols-2">
        <legend className="mb-1.5 text-[16px] font-medium text-ink">
          Home size <span className="text-aqua">*</span>
        </legend>
        <Stepper label="Bedrooms" name="bedrooms" value={beds} onChange={setBeds} />
        <Stepper label="Bathrooms" name="bathrooms" value={baths} onChange={setBaths} />
      </fieldset>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <button
        type="submit"
        disabled={state === "sending"}
        className="press mt-2 flex min-h-14 items-center justify-center rounded-full bg-aqua px-8 text-[17px] font-medium text-white transition-colors hover:bg-aqua-deep disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send my quote request"}
      </button>
      {state === "error" && (
        <p role="alert" className="text-[15px] text-red-700">
          That didn&apos;t send. Please call <a className="underline" href={`tel:${site.phone}`}>{site.phoneDisplay}</a> or email{" "}
          <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
      <p className="text-[14px] text-ink/80">
        We reply with a quote for your first appointment. Prefer to talk? Call{" "}
        <a href={`tel:${site.phone}`} className="font-medium text-aqua underline-offset-2 hover:underline">
          {site.phoneDisplay}
        </a>
        .
      </p>
    </form>
  );
}

import { reviews, reviewStats, type Review } from "@/content/reviews";
import { site } from "@/lib/site";
import { Facebook } from "./Icons";

const initials = (n: string) =>
  n
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

export function ReviewCard({ r, large = false }: { r: Review; large?: boolean }) {
  return (
    <figure data-spotlight className={`glass break-inside-avoid rounded-[28px] ${large ? "p-8 sm:p-10" : "p-6 sm:p-7"}`}>
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium text-aqua-deep">{r.topic}</span>
      </div>
      <blockquote className={`mt-4 text-ink ${large ? "text-[22px] leading-snug tracking-[-0.015em] sm:text-[28px]" : "text-[17px] leading-relaxed"}`}>
        &ldquo;{r.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-aqua text-[14px] font-medium text-white">
          {initials(r.name)}
        </span>
        <span>
          <span className="block text-[15px] font-medium text-ink">{r.name}</span>
          <span className="block text-[13px] text-slate">Facebook recommendation</span>
        </span>
      </figcaption>
    </figure>
  );
}

// Big stat + masonry wall of real reviews.
export default function ReviewWall({ limit }: { limit?: number }) {
  const [first, ...rest] = reviews;
  const list = limit ? rest.slice(0, limit - 1) : rest;
  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_2fr]">
      <div data-stagger className="flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-[28px] bg-night p-8 text-white">
                    <p className="relative text-[88px] font-semibold leading-none tracking-[-0.06em] text-glow" data-count="100" data-suffix="%">
            {reviewStats.recommend}
          </p>
          <p className="relative mt-3 text-[17px] text-white/80">
            of {reviewStats.count} Facebook reviewers recommend {site.name}.
          </p>
          <a
            href={site.social.facebookReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium text-ink hover:bg-glow"
          >
            <Facebook className="h-4 w-4 text-[#1877f2]" />
            Read every review on Facebook
          </a>
        </div>
        <ReviewCard r={first} />
      </div>
      <div data-stagger className="gap-4 sm:columns-2 [&>*]:mb-4">
        {list.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const ETSY_URL =
  "https://www.etsy.com/listing/1593207612/tall-kiteboard-handle-custom-engraving";
const IG_URL = "https://www.instagram.com/trap.handle/";

// Embeds
const YT_REVIEW_EMBED = "https://www.youtube.com/embed/gE1oH_un8gA";
const YT_DLAB_EMBED = "https://www.youtube.com/embed/Kex3zCCO9tI";

// Watch links (for buttons)
const YT_REVIEW_WATCH = "https://www.youtube.com/watch?v=gE1oH_un8gA";
const YT_DLAB_WATCH = "https://www.youtube.com/watch?v=Kex3zCCO9tI";

// Background videos (public/)
// Prefer MP4 (best autoplay support). Keep MOV as fallback.
const GLOBAL_BG_MP4 = "/hero.mp4";
const GLOBAL_BG_MOV = "/hero.mov";
const DESIGN_BG_MP4 = "/spinningCustom.mp4";
const DESIGN_BG_MOV = "/spinningCustom.mov";

type EtsyReview = {
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  author: string;
  date?: string;
  meta?: string;
};

const ETSY_REVIEWS: EtsyReview[] = [
  {
    rating: 5,
    quote: "Great product — keep up the good work!",
    author: "Robbie C.",
    date: "May 10, 2024",
    meta: "Width 20 cm • Yellow w black text",
  },
  {
    rating: 5,
    quote: "Sturdy and easy to grab. The custom text is a nice touch.",
    author: "Gil C.",
    date: "Dec 6, 2023",
    meta: "Width 21.5 cm • Black on Black",
  },
  {
    rating: 5,
    quote:
      "Great quality and very durable. Made board-offs and getting the board back on my feet way easier.",
    author: "Gil C.",
    date: "Dec 6, 2023",
    meta: "Width 17 cm • Black on Black",
  },
  {
    rating: 4,
    quote: "Very attentive seller. Recommended. Good product.",
    author: "Juan Jose",
    date: "Jul 31, 2025",
    meta: "Width 18 cm • Yellow w black text",
  },
  {
    rating: 5,
    quote: "Arrived quickly, excellent quality — I recommend it.",
    author: "Paolo",
    date: "Jul 20, 2024",
    meta: "Width 18 cm • Red w black text",
  },
  {
    rating: 5,
    quote: "Very good quality product!",
    author: "Nicolas",
    date: "Jul 17, 2024",
    meta: "Width 18 cm • Blue on Blue",
  },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${full} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "text-white" : "text-white/25"}>
          ★
        </span>
      ))}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      // Use a cubic-bezier tuple so TS + Framer Motion agree on the type.
      ease: [0.16, 1, 0.3, 1],
    },
  },
} satisfies Variants;

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition will-change-transform";
  const primary =
    "bg-white text-black hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(255,255,255,0.12)] active:translate-y-0";
  const ghost =
    "border border-white/20 text-white hover:border-white/40 hover:bg-white/5";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`${base} ${variant === "primary" ? primary : ghost}`}
    >
      {children}
    </a>
  );
}

/**
 * Create: public/colors/manifest.json
 * { "files": ["black.png","grey.jpg","pink.png","orange.png","green.png","blue.png"] }
 */
function ColorCarousel() {
  const fallback = useMemo(
    () => ["black.png", "grey.jpg", "pink.png", "orange.png", "green.png", "blue.png"],
    []
  );

  const [files, setFiles] = useState<string[]>(fallback);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/colors/manifest.json", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { files?: string[] };
        if (!mounted) return;
        if (Array.isArray(data.files) && data.files.length) {
          setFiles(data.files);
          setIndex(0);
        }
      } catch {
        // keep fallback
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fallback]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % files.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [files.length]);

  const prev = () => setIndex((i) => (i - 1 + files.length) % files.length);
  const next = () => setIndex((i) => (i + 1) % files.length);

  const current = files[index] || files[0];
  const label = current ? current.replace(/\.(png|jpg|jpeg|webp)$/i, "") : "color";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/35 backdrop-blur">
      <div className="relative aspect-[16/10] sm:aspect-[16/9]">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={`/colors/${current}`}
            alt={`${label} Trap Handle`}
            fill
            className="object-contain p-6 sm:p-8"
            priority={index === 0}
          />
        </motion.div>

        <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/85 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
          {label.toUpperCase()}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
          <button
            type="button"
            onClick={prev}
            className="rounded-full border border-white/15 bg-black/45 px-3 py-2 text-xs font-semibold text-white/85 backdrop-blur hover:border-white/25 hover:bg-black/55"
            aria-label="Previous color"
          >
            ←
          </button>

          <div className="flex items-center gap-2">
            {files.map((f, i) => (
              <button
                key={f}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${f}`}
                className={[
                  "h-2 w-2 rounded-full transition",
                  i === index ? "bg-white" : "bg-white/25 hover:bg-white/40",
                ].join(" ")}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="rounded-full border border-white/15 bg-black/45 px-3 py-2 text-xs font-semibold text-white/85 backdrop-blur hover:border-white/25 hover:bg-black/55"
            aria-label="Next color"
          >
            →
          </button>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_360px_at_50%_25%,rgba(255,255,255,0.10),transparent_60%)]" />
      </div>
    </div>
  );
}

export default function Page() {
  const { scrollYProgress } = useScroll();
  const glowX = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);

  // ✅ even tighter
  const SECTION_Y = "py-2 sm:py-3";
  const HERO_PY = "pt-3 pb-2 sm:pt-4 sm:pb-3";

  const globalVidRef = useRef<HTMLVideoElement | null>(null);
  const designVidRef = useRef<HTMLVideoElement | null>(null);

  // Safari/iOS sometimes needs a “nudge” even with muted+playsInline.
  useEffect(() => {
    const tryPlay = async (el: HTMLVideoElement | null) => {
      if (!el) return;
      try {
        el.muted = true;
        el.playsInline = true;
        await el.play();
      } catch {
        // ignore; user gesture may be required in some environments
      }
    };
    tryPlay(globalVidRef.current);
    tryPlay(designVidRef.current);
  }, []);

  return (
    <div className="relative isolate min-h-screen bg-black text-white overflow-hidden">
      {/* Global background video */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <video
          ref={globalVidRef}
          className="h-full w-full object-cover opacity-40 md:opacity-50"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={GLOBAL_BG_MP4} type="video/mp4" />
          <source src={GLOBAL_BG_MOV} type="video/quicktime" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45" />
      </div>

      {/* Background energy */}
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_20%_10%,rgba(255,255,255,0.10),transparent_60%),radial-gradient(900px_600px_at_80%_20%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(700px_500px_at_50%_90%,rgba(255,255,255,0.05),transparent_60%)]" />
        <motion.div
          style={{ left: glowX }}
          className="absolute top-[-20%] h-[140%] w-[40%] rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.09),transparent)] blur-2xl"
        />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-black/10 to-black/20" />
      </div>

      {/* Nav */}
      <header className="relative z-30 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 xl:px-14 pt-4">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl shadow-[0_18px_70px_rgba(0,0,0,0.45)] sm:px-5">
          <div className="flex items-center gap-3">
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-wide">TRAP HANDLE</div>
              <div className="text-xs text-white/60">The handle that will unlock that next trick.</div>
            </div>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <a href="#design" className="text-sm text-white/70 hover:text-white">
              Design
            </a>
            <a href="#featured" className="text-sm text-white/70 hover:text-white">
              Featured
            </a>
            <a href="#reviews" className="text-sm text-white/70 hover:text-white">
              Reviews
            </a>
          </div>

          <div className="md:hidden" />
        </div>
      </header>

      <main className="relative z-20">
        {/* HERO */}
        <section className={`relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 xl:px-14 ${HERO_PY}`}>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className={[
              "relative overflow-hidden rounded-[2.75rem]",
              "border border-white/14 ring-1 ring-white/10",
              "bg-black/55 backdrop-blur-xl",
              "shadow-[0_35px_140px_rgba(0,0,0,0.75)]", // slightly reduced
            ].join(" ")}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[360px] w-[360px] sm:h-[440px] sm:w-[440px] md:h-[560px] md:w-[560px] opacity-[0.09]">
                  <Image
                    src="/hero-logo.png"
                    alt="Trap Handle mark"
                    fill
                    sizes="(min-width: 768px) 560px, (min-width: 640px) 440px, 360px"
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_30%_30%,rgba(255,255,255,0.08),transparent_60%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35" />
            </div>

            <div className="relative p-6 sm:p-8 md:p-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur">
                  Built for board-offs • Custom engraved • ASA durable
                </div>

                <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
                  The handle built for{" "}
                  <span className="text-white/65">big-air moments</span>.
                </h1>

                <p className="mt-4 text-base text-white/75 md:text-lg">
                  A tall kiteboard handle designed for confident grabs, clean board-offs,
                  and a premium feel.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={ETSY_URL}>Buy</Button>
                  <Button href={IG_URL} variant="ghost">
                    Watch it in action
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* DESIGN */}
        <section
          id="design"
          className={`relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 xl:px-14 ${SECTION_Y}`}
        >
          <div className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/5 shadow-[0_28px_110px_rgba(0,0,0,0.65)]">
            <div className="pointer-events-none absolute inset-0">
              <video
                ref={designVidRef}
                className="h-full w-full object-cover opacity-45 sm:opacity-50"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={DESIGN_BG_MP4} type="video/mp4" />
                <source src={DESIGN_BG_MOV} type="video/quicktime" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
              <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_25%_15%,rgba(255,255,255,0.12),transparent_60%)]" />
            </div>

            <div className="relative p-6 sm:p-8 md:p-10">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur">
                  Design + materials + customization
                </div>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                  Built for real sessions.
                </h2>

                <p className="mt-3 max-w-2xl text-base text-white/75 md:text-lg">
                  Shaped for control, printed in a material that holds up to sun and salt,
                  and finished with engraving that makes your board feel personal.
                </p>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur">
                  <div className="text-sm font-extrabold text-white/90">Why ASA</div>
                  <p className="mt-3 text-sm text-white/75">
                    ASA is chosen specifically for kiteboarding: it’s{" "}
                    <span className="font-semibold text-white">UV resistant</span> and
                    holds up better outdoors than typical 3D-print plastics.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur">
                  <div className="text-sm font-extrabold text-white/90">
                    Ergonomics-first shape
                  </div>
                  <p className="mt-3 text-sm text-white/75">
                    Built around <span className="font-semibold text-white">how your hand actually grabs</span>{" "}
                    during board-offs — iterated with pro + novice feedback and an{" "}
                    <span className="font-semibold text-white">ergonomics engineer</span>.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur">
                  <div className="text-sm font-extrabold text-white/90">Custom engraving</div>
                  <p className="mt-3 text-sm text-white/75">
                    Add a name, number, crew tag — or{" "}
                    <span className="font-semibold text-white">contact info</span> so a lost board can find its way back.
                  </p>
                </div>
              </div>

              {/* ✅ tighter overall, but still a clean separation */}
              <div className="mt-12 space-y-4">
                <div className="text-sm font-extrabold text-white/90">Colors</div>
                <ColorCarousel />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED*/}
        <section
          id="featured"
          className={`relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 xl:px-14 ${SECTION_Y}`}
        >
          <div className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/5 shadow-[0_28px_110px_rgba(0,0,0,0.65)]">
            <div className="relative p-6 sm:p-8 md:p-10">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur">
                  Featured
                </div>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                  Seen and tested.
                </h2>

                <p className="mt-3 max-w-2xl text-base text-white/75 md:text-lg">
                  Trap Handle has been independently reviewed and appears in official product footage.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-extrabold text-white/90">
                        Reviewed by Mackiteboarding
                      </div>
                      <p className="mt-2 text-sm text-white/70">
                        Independent breakdown of the handle and how it rides.
                      </p>
                    </div>
                    <Button href={YT_REVIEW_WATCH} variant="ghost">
                      Watch
                    </Button>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                    <div className="aspect-video">
                      <iframe
                        className="h-full w-full"
                        src={YT_REVIEW_EMBED}
                        title="Mackiteboarding review"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-extrabold text-white/90">
                        Featured in Rebel D/LAB footage
                      </div>
                      <p className="mt-2 text-sm text-white/70">
                        Appears in official product footage during high-end riding.
                      </p>
                    </div>
                    <Button href={YT_DLAB_WATCH} variant="ghost">
                      Watch
                    </Button>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                    <div className="aspect-video">
                      <iframe
                        className="h-full w-full"
                        src={YT_DLAB_EMBED}
                        title="Rebel D/LAB product footage"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-white/55">
                    Appearance does not imply sponsorship or endorsement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section
          id="reviews"
          className={`relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 xl:px-14 ${SECTION_Y}`}
        >
          <div className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/5 shadow-[0_28px_110px_rgba(0,0,0,0.65)]">
            <div className="relative p-6 sm:p-8 md:p-10">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur">
                  Rider feedback
                </div>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                  Rider-approved.
                </h2>

                <p className="mt-3 max-w-2xl text-base text-white/75 md:text-lg">
                  Verified buyers using the handle in real conditions.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {ETSY_REVIEWS.slice(0, 6).map((r, idx) => (
                  <div
                    key={`${r.author}-${idx}`}
                    className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur"
                  >
                    <div className="text-sm font-extrabold">
                      <Stars rating={r.rating} />
                    </div>

                    <p className="mt-3 text-sm text-white/80">“{r.quote}”</p>

                    <div className="mt-4 text-xs text-white/55">
                      {r.author}
                      {r.date ? ` • ${r.date}` : ""}
                    </div>

                    {r.meta && <div className="mt-2 text-xs text-white/45">{r.meta}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10 xl:px-14 pb-10 pt-3">
          <div className="flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-5 md:flex-row md:items-center">
            <div className="text-xs text-white/55">
              © {new Date().getFullYear()} Trap Handle •{" "}
              <span className="ml-1">We don’t ride. We fly.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
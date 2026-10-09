import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type EventItem = {
  slug: string;
  title: string;
  location: string;
  year: string;
  type: "Kongre" | "Eğitim" | "Workshop";
  photoCount: number;
};

const events: EventItem[] = [
  {
    slug: "istanbul-ultraclear-2026",
    title: "İstanbul UltraClear Workshop",
    location: "İstanbul, Türkiye",
    year: "2026",
    type: "Workshop",
    photoCount: 4,
  },
  {
    slug: "istanbul-neogen-2026",
    title: "İstanbul NeoGen Workshop",
    location: "İstanbul, Türkiye",
    year: "2026",
    type: "Workshop",
    photoCount: 3,
  },
  {
    slug: "almanya-2026",
    title: "Almanya UltraClear Eğitimi",
    location: "Almanya",
    year: "2026",
    type: "Eğitim",
    photoCount: 3,
  },
  {
    slug: "ingiltere-2026",
    title: "İngiltere NeoGen Eğitimi",
    location: "İngiltere",
    year: "2026",
    type: "Eğitim",
    photoCount: 2,
  },
  {
    slug: "paris-2026",
    title: "Paris İMCAS 2026",
    location: "Paris, Fransa",
    year: "2026",
    type: "Kongre",
    photoCount: 4,
  },
  {
    slug: "paris-2025",
    title: "Paris İMCAS 2025",
    location: "Paris, Fransa",
    year: "2025",
    type: "Kongre",
    photoCount: 4,
  },
];

const typeStyle: Record<string, { color: string; border: string }> = {
  Kongre:   { color: "rgba(36,184,189,0.75)",  border: "rgba(36,184,189,0.25)"  },
  Eğitim:   { color: "rgba(43,143,208,0.75)",  border: "rgba(43,143,208,0.25)"  },
  Workshop: { color: "rgba(168,85,247,0.75)",  border: "rgba(168,85,247,0.25)"  },
};

function photoUrl(slug: string, n: number) {
  return `/events/${slug}/${n}.jpg`;
}

export default function Etkinliklerimiz() {
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  return (
    <div className="min-h-screen bg-[#F0F6FC] text-foreground font-sans">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative pt-0 pb-0 overflow-hidden" style={{ minHeight: "520px" }}>
        {/* Background: horizontal filmstrip of all cover photos */}
        <div className="absolute inset-0 flex">
          {events.map((ev, i) => (
            <div key={ev.slug} className="flex-1 relative overflow-hidden">
              <img
                src={photoUrl(ev.slug, 1)}
                alt=""
                aria-hidden
                className="w-full h-full object-cover"
                style={{ opacity: 0.32 }}
              />
              {/* vertical seam */}
              {i < events.length - 1 && (
                <div className="absolute right-0 top-0 bottom-0 w-px bg-white/80" />
              )}
            </div>
          ))}
        </div>

        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F0F6FC]/70 via-transparent to-[#F0F6FC]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F0F6FC]/60 via-transparent to-[#F0F6FC]/60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 55% at 50% 60%, rgba(36,184,189,0.08) 0%, transparent 70%)" }}
        />

        {/* Hero text — centered */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6"
          style={{ minHeight: "520px" }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[11px] font-semibold tracking-[0.36em] uppercase text-[#1A9CA1] mb-6"
          >
            EMCR Medikal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black leading-[0.95] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
          >
            Etkinliklerimiz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="text-[#607084] text-[15px] leading-relaxed max-w-md"
          >
            Ulusal ve uluslararası kongre, eğitim ve workshop etkinliklerinden kareler.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── EVENTS ────────────────────────────────────────────────── */}
      <section className="pt-10 pb-28 surface-white">
        <div className="max-w-[1440px] mx-auto">
          {events.map((ev, i) => {
            const col = typeStyle[ev.type];
            const isEven = i % 2 === 0;
            const photos = Array.from({ length: ev.photoCount }, (_, k) => photoUrl(ev.slug, k + 1));
            const [cover, ...rest] = photos;

            return (
              <motion.article
                key={ev.slug}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Large index number watermark */}
                <div
                  className="absolute top-6 pointer-events-none select-none z-0 font-display font-black leading-none"
                  style={{
                    fontSize: "clamp(120px, 16vw, 200px)",
                    color: "rgba(16,36,59,0.025)",
                    letterSpacing: "-0.05em",
                    [isEven ? "right" : "left"]: "1.5rem",
                  }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className={`relative z-10 grid lg:grid-cols-2 gap-0 ${isEven ? "" : "lg:[direction:rtl]"}`}>

                  {/* Featured photo */}
                  <div className={`relative flex items-center overflow-hidden bg-[#E5F0F8] ${isEven ? "lg:rounded-r-none" : "lg:rounded-l-none"}`}>
                    <motion.button
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-[420px] sm:h-[520px] block focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-2"
                      onClick={() => setLightbox({ src: cover, title: ev.title })}
                      aria-label={`${ev.title} — büyük fotoğraf`}
                    >
                      <img
                        src={cover}
                        alt={ev.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/12 transition-colors duration-300" />
                    </motion.button>
                  </div>

                  {/* Info + thumbnails */}
                  <div
                    className={`flex flex-col justify-center px-10 md:px-16 lg:px-20 py-16 lg:py-20 bg-[#F0F6FC] ${isEven ? "" : "lg:[direction:ltr]"}`}
                  >
                    {/* Meta row */}
                    <div className="flex items-center gap-3 mb-8">
                      <span
                        className="text-[10px] font-bold tracking-[0.22em] uppercase px-3 py-1 rounded-full border"
                        style={{ color: col.color, borderColor: col.border, background: `${col.color.replace("0.75", "0.07")}` }}
                      >
                        {ev.type}
                      </span>
                      <span className="text-[11px] text-foreground/28 font-medium">{ev.location}</span>
                      <span className="text-[11px] text-foreground/22">·</span>
                      <span className="text-[11px] text-foreground/28 font-medium">{ev.year}</span>
                    </div>

                    {/* Title */}
                    <h2
                      className="font-display font-black leading-[0.95] tracking-[-0.02em] mb-10 text-foreground/90"
                      style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                    >
                      {ev.title}
                    </h2>

                    {/* Thumbnail strip */}
                    {rest.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {rest.slice(0, 3).map((src, pi) => (
                          <button
                            key={pi}
                            onClick={() => setLightbox({ src, title: ev.title })}
                            aria-label={`${ev.title} fotoğraf ${pi + 2}`}
                             className="relative overflow-hidden rounded-lg bg-[#E5F0F8] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
                            style={{ aspectRatio: "4/3" }}
                          >
                            <img
                              src={src}
                              alt=""
                              className="w-full h-full object-contain"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/80 mx-10 md:mx-14" />
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden surface-ice">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(36,184,189,0.055) 0%, transparent 65%)" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <h2
              className="font-display font-bold leading-tight mb-5"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Etkinlik ve Eğitim Bilgileri{" "}
              <span className="text-primary">için Bize Ulaşın</span>
            </h2>
            <p className="text-[#607084] max-w-lg mx-auto mb-8 text-[15px] leading-relaxed">
              Yaklaşan etkinliklerimiz veya özel demo talepleri için iletişime geçebilirsiniz.
            </p>
            <a
              href="mailto:info@emcr.com.tr"
              className="inline-flex items-center gap-2 h-12 px-8 text-[14px] font-semibold bg-primary text-[#10243B] hover:bg-primary/90 rounded-xl transition-all"
            >
              İletişime Geç
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* ── LIGHTBOX ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#10243B]/85 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full rounded-2xl object-contain max-h-[82vh]"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all"
                aria-label="Kapat"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

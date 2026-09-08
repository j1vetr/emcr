import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
};

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
    photoCount: 4,
  },
  {
    slug: "almanya-2026",
    title: "Almanya UltraClear Eğitimi",
    location: "Almanya",
    year: "2026",
    type: "Eğitim",
    photoCount: 4,
  },
  {
    slug: "ingiltere-2026",
    title: "İngiltere NeoGen Eğitimi",
    location: "İngiltere",
    year: "2026",
    type: "Eğitim",
    photoCount: 4,
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
    photoCount: 5,
  },
];

const typeStyle: Record<string, { bg: string; text: string; border: string }> = {
  Kongre:   { bg: "rgba(79,195,195,0.08)",  text: "rgba(79,195,195,0.85)",  border: "rgba(79,195,195,0.22)"  },
  Eğitim:   { bg: "rgba(56,189,248,0.08)",  text: "rgba(56,189,248,0.85)",  border: "rgba(56,189,248,0.22)"  },
  Workshop: { bg: "rgba(168,85,247,0.08)",  text: "rgba(168,85,247,0.85)",  border: "rgba(168,85,247,0.22)"  },
};

function photoUrl(slug: string, n: number) {
  return `/events/${slug}/${n}.jpg`;
}

export default function Etkinliklerimiz() {
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 45% at 20% 0%, rgba(20,184,166,0.06) 0%, transparent 60%)" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-5"
          >
            Etkinliklerimiz
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold leading-[1.05] max-w-2xl mb-5"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)" }}
          >
            Kongre, Eğitim{" "}
            <span className="text-primary">ve Workshop</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="text-foreground/48 text-lg leading-relaxed max-w-xl"
          >
            EMCR Medikal olarak ulusal ve uluslararası etkinliklerde yer alıyor, doktor eğitimleri ve
            workshop'lar düzenliyoruz.
          </motion.p>
        </div>
      </section>

      {/* ── EVENT CARDS ─────────────────────────────────────── */}
      <section className="pb-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 space-y-20">
          {events.map((ev, i) => {
            const col = typeStyle[ev.type];
            const photos = Array.from({ length: ev.photoCount }, (_, k) => photoUrl(ev.slug, k + 1));

            return (
              <motion.div
                key={ev.slug}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
              >
                {/* Event header */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span
                    className="text-[10.5px] font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full border"
                    style={{ background: col.bg, color: col.text, borderColor: col.border }}
                  >
                    {ev.type}
                  </span>
                  <span className="text-[11px] font-medium text-foreground/30 tracking-wide">
                    {ev.year}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-foreground/30">
                    <MapPin size={11} className="opacity-60" />
                    {ev.location}
                  </span>
                </div>

                <h2
                  className="font-display font-bold leading-tight mb-7"
                  style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", color: "rgba(255,255,255,0.88)" }}
                >
                  {ev.title}
                </h2>

                {/* Photo grid */}
                <div
                  className={`grid gap-2 ${
                    photos.length >= 4
                      ? "grid-cols-2 md:grid-cols-4"
                      : photos.length === 3
                      ? "grid-cols-1 md:grid-cols-3"
                      : "grid-cols-1 md:grid-cols-2"
                  }`}
                >
                  {photos.map((src, pi) => (
                    <motion.button
                      key={pi}
                      whileHover={{ scale: 1.015 }}
                      transition={{ duration: 0.25 }}
                      className="relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      style={{ aspectRatio: "4/3" }}
                      onClick={() => setLightbox({ src, title: ev.title })}
                      aria-label={`${ev.title} fotoğraf ${pi + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${ev.title} ${pi + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/15 transition-colors duration-300" />
                    </motion.button>
                  ))}
                </div>

                {/* Divider */}
                {i < events.length - 1 && (
                  <div className="mt-20 h-px bg-white/[0.06]" />
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 bg-[#070b17] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(20,184,166,0.055) 0%, transparent 65%)" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-5">
              Etkinlik ve Eğitim Bilgileri{" "}
              <span className="text-primary">için Bize Ulaşın</span>
            </h2>
            <p className="text-foreground/42 max-w-lg mx-auto mb-8 text-[15px] leading-relaxed">
              Yaklaşan etkinliklerimiz veya özel demo talepleri için iletişime geçebilirsiniz.
            </p>
            <a
              href="mailto:info@emcr.com.tr"
              className="inline-flex items-center gap-2 h-12 px-8 text-[14px] font-semibold bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-xl transition-all"
            >
              İletişime Geç
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* ── LIGHTBOX ─────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full rounded-2xl object-contain max-h-[80vh]"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all"
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

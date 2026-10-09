import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import neogenLogo from "@assets/neogen-logo.webp";
import ultraClearLogo from "@assets/ultraclear-logo.png";
import neogenDevicePlatform from "@assets/neogen-platform.webp";
import ultraClearStudio from "@assets/ultraclear-studio.webp";
import baRef1 from "@assets/ref1_1781870893595.jpg";
import baRef2 from "@assets/ref2_1781870893596.jpg";
import baRef3 from "@assets/ref3_1781870893597.jpg";
import baRef4 from "@assets/ref4_1781870893597.jpg";
import baRef5 from "@assets/ref5_1781870893598.jpg";
import baRef6 from "@assets/ref6_1781870893598.jpg";
import ucRef1 from "@assets/ref1_1781871404352.jpg";
import ucRef2 from "@assets/ref2_1781871404353.jpg";
import ucRef3 from "@assets/ref3_1781871404353.jpg";
import ucRef4 from "@assets/ref4_1781871404353.jpg";
import ucRef5 from "@assets/ref5_1781871404354.jpg";
import ucRef6 from "@assets/ref6_1781871404354.jpg";
import heroDeviceImg from "@assets/hero-device.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
};

const baPatients = [
  { img: baRef1, label: "Yüz Yenileme" },
  { img: baRef2, label: "Cilt Tonu Eşitleme" },
  { img: baRef3, label: "Derin Dermal Yenilenme" },
  { img: baRef4, label: "Leke ve Ton Düzeltme" },
  { img: baRef5, label: "Göz Çevresi ve Cilt Tonu" },
  { img: baRef6, label: "Sıkılaştırma ve Yenileme" },
];

const ucPatients = [
  { img: ucRef1, label: "Cilt Tonu Düzeltme" },
  { img: ucRef2, label: "Rosacea · Kızarıklık" },
  { img: ucRef3, label: "Cilt Yenileme · Sıkılaştırma" },
  { img: ucRef4, label: "Pigmentasyon · Leke" },
  { img: ucRef5, label: "Gözenek ve Doku" },
  { img: ucRef6, label: "Akne İzleri" },
];

// YouTube segment definitions (seconds)
const SEG_A_START = 15;
const SEG_A_END   = 31;
const SEG_B_START = 36;
const SEG_B_END   = 46;

export default function Home() {
  const [activePatient, setActivePatient] = useState(0);
  const [ucActivePatient, setUcActivePatient] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const ytContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ytPlayerRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // YouTube IFrame API
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    const initPlayer = () => {
      if (!ytContainerRef.current) return;
      ytPlayerRef.current = new win.YT.Player(ytContainerRef.current, {
        videoId: "NFQNsYPq3WU",
        playerVars: {
          autoplay: 1, mute: 1, controls: 0, disablekb: 1,
          fs: 0, loop: 0, modestbranding: 1, rel: 0,
          iv_load_policy: 3, cc_load_policy: 0, playsinline: 1,
          start: SEG_A_START,
        },
        events: {
          onReady: (e: { target: any }) => { e.target.mute(); e.target.playVideo(); },
          onStateChange: (e: { data: number; target: any }) => {
            if (e.data === 1) {
              setVideoReady(true);
              if (!intervalRef.current) {
                intervalRef.current = setInterval(() => {
                  const p = ytPlayerRef.current;
                  if (!p?.getCurrentTime) return;
                  const t = p.getCurrentTime() as number;
                  const s = p.getPlayerState() as number;
                  if (t >= SEG_A_END && t < SEG_B_START) p.seekTo(SEG_B_START, true);
                  else if (t >= SEG_B_END) p.seekTo(SEG_A_START, true);
                  if (s === 2 || s === 0) p.playVideo();
                }, 150);
              }
            }
            if (e.data === 0) { e.target.seekTo(SEG_A_START, true); e.target.playVideo(); }
          },
        },
      });
    };

    if (win.YT && win.YT.Player) {
      initPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.head.appendChild(tag);
      const prev = win.onYouTubeIframeAPIReady;
      win.onYouTubeIframeAPIReady = () => { if (prev) prev(); initPlayer(); };
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      ytPlayerRef.current?.destroy?.();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] overflow-hidden bg-[#F0F6FC]"
      >
        {/* ── z-0: YouTube video — full-screen cinematic background ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%", height: "100%",
              minWidth: "177.78vh", minHeight: "56.25vw",
              opacity: videoReady ? 1 : 0,
              transition: "opacity 1.8s ease",
            }}
          >
            <div ref={ytContainerRef} style={{ width: "100%", height: "100%" }} />
          </div>
        </div>

        {/* ── z-1: Cinematic overlays ───────────────────────────── */}
        {/* Light overlay keeps the background video subtle */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-[#F0F6FC]/60" />
        {/* Light vignette softens the edges while preserving the center */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 75% at 58% 48%, transparent 0%, rgba(240,246,252,0.35) 55%, rgba(240,246,252,0.75) 90%)",
          }}
        />
        {/* Teal shimmer — subtle brand color in center */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 55% 45% at 58% 50%, rgba(36,184,189,0.04) 0%, transparent 70%)",
          }}
        />

        {/* ── z-2: Top + bottom edge fades ─────────────────────── */}
        <div className="absolute inset-x-0 top-0 h-36 z-[2] pointer-events-none bg-gradient-to-b from-[#F0F6FC] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 z-[2] pointer-events-none bg-gradient-to-t from-[#F0F6FC] via-[#F0F6FC]/80 to-transparent" />

        {/* ── Hero content — centered, cinematic ───────────────── */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center text-center px-6"
        >
          <div className="pt-28 pb-8 md:pt-[clamp(80px,9vh,120px)] md:pb-[clamp(80px,9vh,120px)]">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 mb-10"
            >
              <div className="h-px w-6 bg-primary/60" />
              <span className="text-[10.5px] font-medium tracking-[0.28em] uppercase text-primary/75">
                Medikal Estetik Teknolojisi
              </span>
              <div className="h-px w-6 bg-primary/60" />
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                className="font-display font-black leading-[0.9] tracking-[-0.025em] text-foreground text-[clamp(1.85rem,9vw,4rem)] md:text-[clamp(4rem,9.5vw,10rem)]"
              >
                Medikal Estetiğin
              </h1>
              <h1
                className="font-display font-black leading-[0.9] tracking-[-0.025em] text-[clamp(1.85rem,9vw,4rem)] md:text-[clamp(4rem,9.5vw,10rem)]"
                style={{
                  background: "linear-gradient(110deg, #24B8BD 0%, #1FA3A8 40%, #2B8FD0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingBottom: "0.18em",
                }}
              >
                Geleceği
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-[15px] text-[#607084] leading-[1.85] max-w-[480px] mx-auto"
            >
              NeoGen Plasma ve UltraClear sistemlerinin Türkiye tek yetkili distribütörü.
              Klinikler için medikal teknoloji, eğitim ve teknik destek.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center justify-center gap-4 mt-10"
            >
              <a
                href="mailto:info@emcr.com.tr"
                className="h-12 px-8 inline-flex items-center gap-2.5 text-[13.5px] font-semibold bg-primary text-[#10243B] rounded-xl hover:bg-primary/90 transition-all"
                style={{ boxShadow: "0 0 36px rgba(36,184,189,0.30), 0 4px 20px rgba(16,36,59,0.087)" }}
              >
                İletişime Geç
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/urunler/neogen-plasma"
                className="h-12 px-8 inline-flex items-center gap-2 text-[13.5px] font-medium text-foreground/65 hover:text-foreground border border-[#D9E6EF] hover:border-[#D9E6EF] rounded-xl hover:bg-[#E5F0F8] transition-all"
              >
                Ürünleri Keşfet
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Product logos — bottom left + right anchor */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-4 mb-16 md:mb-0 md:mt-0 md:absolute md:bottom-20 md:left-0 md:right-0 flex items-stretch justify-center z-10"
          >
            <div
              className="flex items-stretch divide-x"
              style={{ borderLeft: "1px solid rgba(16,36,59,0.07)", borderRight: "1px solid rgba(16,36,59,0.07)" }}
            >
              {/* NeoGen */}
              <Link
                href="/urunler/neogen-plasma"
                className="group flex flex-col items-center justify-center gap-3 px-5 sm:px-10 py-4 sm:py-5 min-h-11 hover:bg-[#E5F0F8] transition-colors"
                style={{ borderRight: "1px solid rgba(16,36,59,0.07)" }}
              >
                <img
                  src={neogenLogo}
                  alt="NeoGen Plasma"
                  className="w-auto object-contain transition-all duration-300 group-hover:opacity-75"
                  style={{ height: "44px", opacity: 0.6 }}
                />
              </Link>
              {/* UltraClear */}
              <Link
                href="/urunler/ultraclear"
                className="group flex flex-col items-center justify-center gap-3 px-5 sm:px-10 py-4 sm:py-5 min-h-11 hover:bg-[#E5F0F8] transition-colors"
              >
                <img
                  src={ultraClearLogo}
                  alt="UltraClear"
                  className="w-auto object-contain transition-all duration-300 group-hover:opacity-70"
                  style={{ height: "30px", opacity: 0.85, filter: "brightness(0) saturate(100%) invert(11%) sepia(38%) saturate(1500%) hue-rotate(184deg) brightness(92%)" }}
                />
              </Link>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="hidden md:flex absolute bottom-9 flex-col items-center gap-2.5"
          >
            <motion.div
              animate={{ scaleY: [1, 1.5, 1], opacity: [0.22, 0.55, 0.22] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-primary/55 to-transparent origin-top"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── NEOGEN BRAND ──────────────────────────────────────────── */}
      <section id="neogen" className="relative overflow-hidden lg:min-h-screen surface-white pt-16 lg:pt-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[300px] sm:h-[420px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[55%] flex items-center justify-center pointer-events-none"
        >
          <div className="hidden lg:block absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute w-[min(680px,92vw)] h-[min(680px,92vw)] rounded-full border border-primary/20"
            style={{ boxShadow: "0 0 80px rgba(36,184,189,0.06), inset 0 0 80px rgba(36,184,189,0.03)" }} />
          <div className="absolute w-[min(500px,70vw)] h-[min(500px,70vw)] rounded-full border border-primary/10" />
          <div className="absolute w-[min(320px,50vw)] h-[min(320px,50vw)] bg-primary/5 blur-[80px] rounded-full" />
          <img
            src={neogenDevicePlatform}
            alt="NeoGen Plasma Device"
            className="relative z-20 w-full h-full object-contain object-center"
            style={{ filter: "drop-shadow(0 30px 100px rgba(16,36,59,0.175))" }}
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        <div className="relative z-10 lg:min-h-screen flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-14 py-14 lg:py-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[520px]"
            >
              <img src={neogenLogo} alt="NeoGen" className="w-full max-w-[240px] mb-10 opacity-95" />
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#1A9CA1] mb-5" lang="en">
                Nitrogen Plasma
              </p>
              <h2 className="font-display font-bold leading-[1.05] mb-6" style={{ fontSize: "clamp(2.4rem, 3.6vw, 4rem)" }}>
                Yüzeyden Derine<br />
                <span className="text-primary">Yenilenme.</span>
              </h2>
              <p className="text-[#607084] text-base leading-relaxed mb-10">
                NeoGen Plasma, tek bir dalga boyuna bağlı kalmadan epidermisten dermise tüm
                cilt mimarisini onaran ve lazer olmayan non-invaziv bir teknolojidir.
                İyonize azot plazması, enerjiyi dokuya kısa süreli, kontrollü ve homojen şekilde aktarır.
              </p>

              <div className="flex items-center gap-4">
                <Button asChild className="h-11 px-7 text-[13px] font-semibold bg-primary text-[#10243B] hover:bg-primary/90 rounded-sm">
                  <Link href="/urunler/neogen-plasma">Detaylı İncele</Link>
                </Button>
                <button
                  onClick={() => scrollTo("results")}
                  className="text-[12px] tracking-widest text-[#607084] hover:text-foreground/60 transition-colors flex items-center gap-2"
                >
                  KLİNİK SONUÇLAR <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NEOGEN BEFORE / AFTER ─────────────────────────────────── */}
      <section id="results" className="relative surface-ice overflow-hidden py-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-primary/4 blur-[120px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="flex items-end justify-between mb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#1A9CA1] mb-3">
                NeoGen Plasma
              </p>
              <h2 className="font-display font-bold leading-[1]" style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }}>
                Gerçek Sonuçlar.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden md:flex items-center gap-6"
            >
              <span className="font-display text-4xl font-bold tabular-nums text-foreground/20 tracking-tight select-none">
                {String(activePatient + 1).padStart(2, "0")}
                <span className="text-xl text-foreground/10 mx-1">/</span>06
              </span>
              <div className="flex gap-2">
                {[-1, 1].map((dir, di) => (
                  <button
                    key={di}
                    onClick={() => setActivePatient(p => (p + dir + baPatients.length) % baPatients.length)}
                    className="w-11 h-11 rounded-full border border-[#D9E6EF] hover:border-primary/40 hover:bg-[#E5F0F8] flex items-center justify-center transition-all duration-300"
                  >
                    <ChevronRight size={16} className={`text-[#607084] hover:text-foreground transition-colors ${dir === -1 ? "rotate-180" : ""}`} />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden mb-4 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
          >
            {baPatients.map((p, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ opacity: activePatient === i ? 1 : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <img src={p.img} alt={`Hasta ${i + 1}`} className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
              </motion.div>
            ))}
            <div className="absolute top-3 left-3 sm:top-5 sm:left-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-[#D9E6EF] text-foreground/70">ÖNCE</span>
            </div>
            <div className="absolute top-3 right-3 sm:top-5 sm:right-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary">SONRA</span>
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/80 z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 flex items-end justify-between gap-3">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white">
                NeoGen Plasma · {baPatients[activePatient].label}
              </p>
              <div className="hidden sm:block font-display font-bold text-6xl text-[#10243B]/5 select-none leading-none tabular-nums">
                {String(activePatient + 1).padStart(2, "0")}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {baPatients.map((p, i) => (
              <motion.button
                key={i}
                onClick={() => setActivePatient(i)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className={`relative rounded-xl overflow-hidden aspect-video transition-all duration-400 group ${
                  activePatient === i
                    ? "ring-2 ring-primary/60 ring-offset-1 ring-offset-[#E5F0F8]"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <img src={p.img} alt={`Hasta ${i + 1}`} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <div className={`absolute inset-0 transition-all duration-400 ${activePatient === i ? "bg-black/10" : "bg-black/35"}`} />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-bold tracking-widest text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ULTRACLEAR ────────────────────────────────────────────── */}
      <section id="ultraclear" className="relative overflow-hidden lg:min-h-screen surface-white pt-16 lg:pt-0">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
          <span className="font-display font-black leading-none text-[#10243B]/[0.025]" style={{ fontSize: "clamp(10rem, 28vw, 32rem)" }}>
            02
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[300px] sm:h-[420px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[58%] pointer-events-none"
        >
          <div className="hidden lg:block absolute inset-y-0 left-0 w-56 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
          <img src={ultraClearStudio} alt="UltraClear Laser Device" className="w-full h-full object-cover object-center" loading="lazy" decoding="async" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute z-20 top-[18%] left-4 sm:left-20 px-4 py-2.5 rounded-xl backdrop-blur-md bg-white/80 border border-sky-600/20"
          >
            <p className="text-[9px] tracking-[0.25em] uppercase text-sky-600/70 mb-0.5">Dalga Boyu</p>
            <p className="text-[13px] font-semibold text-foreground/90">2910 nm</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute z-20 bottom-[24%] left-4 sm:left-12 px-4 py-2.5 rounded-xl backdrop-blur-md bg-white/80 border border-[#D9E6EF]"
          >
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#607084] mb-0.5">Uyumluluk</p>
            <p className="text-[13px] font-semibold text-foreground/80">Tüm Cilt Tipleri</p>
          </motion.div>
        </motion.div>

        <div className="relative z-10 lg:min-h-screen flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-14 py-14 lg:py-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[480px]"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-px bg-sky-600/60" />
                <p className="text-[10px] font-semibold tracking-[0.35em] text-sky-600/70">
                  2910 NM · COLD FIBER LASER
                </p>
              </div>

              <h2 className="font-display font-bold leading-[1.0] mb-3" style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)" }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-sky-600 to-primary">
                  UltraClear™
                </span>
              </h2>
              <p className="font-display font-light text-foreground/60 leading-snug mb-10" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}>
                2910 nm dalga boyunda çalışan dünyanın ilk ve tek soğuk fiber lazer teknolojisi.
              </p>

              <div className="mb-10 border-t border-[#D9E6EF]">
                {[
                  { label: "TEKNOLOJİ", value: "Soğuk Ablasyon (Cold Ablation)" },
                  { label: "UYGULAMA", value: "Yenileme · Leke · Sıkılaştırma" },
                  { label: "CİLT TİPİ", value: "Fitzpatrick I–VI Tüm Tipler" },
                  { label: "İYİLEŞME", value: "Minimal Downtime" },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.55 }}
                    className="flex items-center gap-5 py-4 border-b border-[#D9E6EF] group hover:border-sky-600/20 transition-colors"
                  >
                    <span className="text-[9px] tracking-[0.25em] text-sky-600/50 w-20 flex-shrink-0 font-medium">{s.label}</span>
                    <span className="text-sm text-foreground/65 group-hover:text-foreground/85 transition-colors">{s.value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-5">
                <Button asChild className="h-11 px-7 text-[13px] font-semibold rounded-sm bg-sky-600/10 border border-sky-600/30 hover:bg-sky-600/20 text-sky-600 hover:text-sky-200 transition-all duration-300">
                  <Link href="/urunler/ultraclear">Detaylı İncele</Link>
                </Button>
                <button
                  onClick={() => scrollTo("ultraclear-results")}
                  className="text-[12px] tracking-widest text-[#607084] hover:text-foreground/60 transition-colors flex items-center gap-2"
                >
                  KLİNİK SONUÇLAR <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ULTRACLEAR BEFORE / AFTER ─────────────────────────────── */}
      <section id="ultraclear-results" className="relative surface-ice overflow-hidden py-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-sky-600/3 blur-[100px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="flex items-end justify-between mb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-sky-600/60 mb-3">
                UltraClear™
              </p>
              <h2 className="font-display font-bold leading-[1]" style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }}>
                Gerçek Sonuçlar.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden md:flex items-center gap-6"
            >
              <span className="font-display text-4xl font-bold tabular-nums text-foreground/20 tracking-tight select-none">
                {String(ucActivePatient + 1).padStart(2, "0")}
                <span className="text-xl text-foreground/10 mx-1">/</span>06
              </span>
              <div className="flex gap-2">
                {[-1, 1].map((dir, di) => (
                  <button
                    key={di}
                    onClick={() => setUcActivePatient(p => (p + dir + ucPatients.length) % ucPatients.length)}
                    className="w-11 h-11 rounded-full border border-[#D9E6EF] hover:border-sky-600/40 hover:bg-[#E5F0F8] flex items-center justify-center transition-all duration-300"
                  >
                    <ChevronRight size={16} className={`text-[#607084] ${dir === -1 ? "rotate-180" : ""}`} />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden mb-4 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
          >
            {ucPatients.map((p, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ opacity: ucActivePatient === i ? 1 : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <img src={p.img} alt={`UltraClear hasta ${i + 1}`} className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
              </motion.div>
            ))}
            <div className="absolute top-3 left-3 sm:top-5 sm:left-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-[#D9E6EF] text-foreground/70">ÖNCE</span>
            </div>
            <div className="absolute top-3 right-3 sm:top-5 sm:right-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-sky-600/20 backdrop-blur-md border border-sky-600/30 text-sky-600">SONRA</span>
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/80 z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 flex items-end justify-between gap-3">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white">
                UltraClear™ · {ucPatients[ucActivePatient].label}
              </p>
              <div className="hidden sm:block font-display font-bold text-6xl text-[#10243B]/5 select-none leading-none tabular-nums">
                {String(ucActivePatient + 1).padStart(2, "0")}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {ucPatients.map((p, i) => (
              <motion.button
                key={i}
                onClick={() => setUcActivePatient(i)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className={`relative rounded-xl overflow-hidden aspect-video transition-all duration-400 group ${
                  ucActivePatient === i
                    ? "ring-2 ring-sky-600/60 ring-offset-1 ring-offset-[#E5F0F8]"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <img src={p.img} alt={`UltraClear ${i + 1}`} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <div className={`absolute inset-0 transition-all duration-400 ${ucActivePatient === i ? "bg-black/10" : "bg-black/35"}`} />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-bold tracking-widest text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

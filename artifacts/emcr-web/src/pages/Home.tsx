import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronRight, Activity, Layers, Settings, GraduationCap } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import neogenLogo from "@assets/neogen-logo.webp";
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
  { img: baRef1, label: "Yüz Yenileme · 1 Seans" },
  { img: baRef2, label: "Cilt Tonu Eşitleme · 2 Seans" },
  { img: baRef3, label: "Derin Dermal Yenilenme · 1 Seans" },
  { img: baRef4, label: "Leke & Ton Düzeltme · 2 Seans" },
  { img: baRef5, label: "Göz Çevresi & Cilt Tonu · 1 Seans" },
  { img: baRef6, label: "Sıkılaştırma & Yenileme · 3 Seans" },
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
        className="relative min-h-screen overflow-hidden bg-[#070b17]"
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
        {/* Base dark — reduces video to tasteful atmosphere */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-[#070b17]/62" />
        {/* Radial vignette — darker at edges, video peaks through center */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 75% at 58% 48%, transparent 0%, rgba(7,11,23,0.45) 55%, rgba(7,11,23,0.85) 90%)",
          }}
        />
        {/* Teal shimmer — subtle brand color in center */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 55% 45% at 58% 50%, rgba(20,184,166,0.04) 0%, transparent 70%)",
          }}
        />

        {/* ── z-2: Top + bottom edge fades ─────────────────────── */}
        <div className="absolute inset-x-0 top-0 h-36 z-[2] pointer-events-none bg-gradient-to-b from-[#070b17] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 z-[2] pointer-events-none bg-gradient-to-t from-[#070b17] via-[#070b17]/80 to-transparent" />

        {/* ── Hero content — centered, cinematic ───────────────── */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center text-center px-6"
        >
          <div style={{ paddingTop: "clamp(80px,9vh,120px)", paddingBottom: "clamp(80px,9vh,120px)" }}>

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
                className="font-display font-black leading-[0.9] tracking-[-0.025em] text-foreground"
                style={{ fontSize: "clamp(4rem, 9.5vw, 10rem)" }}
              >
                Medikal Estetiğin
              </h1>
              <h1
                className="font-display font-black leading-[0.9] tracking-[-0.025em]"
                style={{
                  fontSize: "clamp(4rem, 9.5vw, 10rem)",
                  background: "linear-gradient(110deg, #2dd4bf 0%, #5eead4 40%, #38bdf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
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
              className="mt-8 text-[15px] text-foreground/45 leading-[1.85] max-w-[480px] mx-auto"
            >
              NeoGen Plasma ve UltraClear sistemlerinin Türkiye yetkili distribütörü.
              Kliniğiniz için FDA onaylı, klinik kanıtlı premium teknoloji.
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
                className="h-12 px-8 inline-flex items-center gap-2.5 text-[13.5px] font-semibold bg-primary text-[#07090f] rounded-xl hover:bg-primary/90 transition-all"
                style={{ boxShadow: "0 0 36px rgba(20,184,166,0.30), 0 4px 20px rgba(0,0,0,0.35)" }}
              >
                İletişime Geç
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/urunler/neogen-plasma"
                className="h-12 px-8 inline-flex items-center gap-2 text-[13.5px] font-medium text-foreground/65 hover:text-foreground border border-white/[0.14] hover:border-white/25 rounded-xl hover:bg-white/[0.05] transition-all"
              >
                Ürünleri Keşfet
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-9 flex flex-col items-center gap-2.5"
          >
            <span className="text-[9px] tracking-[0.38em] uppercase text-foreground/22">Keşfet</span>
            <motion.div
              animate={{ scaleY: [1, 1.5, 1], opacity: [0.22, 0.55, 0.22] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-primary/55 to-transparent origin-top"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── NEOGEN BRAND ──────────────────────────────────────────── */}
      <section id="neogen" className="relative overflow-hidden min-h-screen bg-[#070b17]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 right-0 w-[55%] flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#070b17] to-transparent z-10" />
          <div className="absolute w-[680px] h-[680px] rounded-full border border-primary/20"
            style={{ boxShadow: "0 0 80px rgba(79,195,195,0.06), inset 0 0 80px rgba(79,195,195,0.03)" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full border border-primary/10" />
          <div className="absolute w-[320px] h-[320px] bg-primary/5 blur-[80px] rounded-full" />
          <img
            src={neogenDevicePlatform}
            alt="NeoGen Plasma Device"
            className="relative z-20 w-full h-full object-contain object-center"
            style={{ filter: "drop-shadow(0 30px 100px rgba(0,0,0,0.7))" }}
          />
        </motion.div>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-14 py-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[520px]"
            >
              <img src={neogenLogo} alt="NeoGen" className="w-full max-w-[240px] mb-10 invert opacity-95" />
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/70 mb-5">
                Nitrogen Plasma
              </p>
              <h2 className="font-display font-bold leading-[1.05] mb-6" style={{ fontSize: "clamp(2.4rem, 3.6vw, 4rem)" }}>
                Kontrollü Enerji.<br />
                <span className="text-primary">Görünür Sonuç.</span>
              </h2>
              <p className="text-foreground/50 text-base leading-relaxed mb-10">
                NeoGen Plasma, nitrogen gazını plazma enerjisine dönüştürerek cilt yüzeyi
                korunurken derin dermal yenilenme sağlar. Kontrollü termal etki,
                protokol esnekliği ve üstün klinik sonuçlar tek sistemde.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  { icon: <Activity className="w-4 h-4" />, title: "Kontrollü Termal Etki", desc: "Epidermisi koruyarak derin dermal ısınma" },
                  { icon: <Settings className="w-4 h-4" />, title: "Protokol Esnekliği", desc: "Düşükten yükseğe enerjiye geniş yelpaze" },
                  { icon: <Layers className="w-4 h-4" />, title: "Doku ve Ton Odaklı", desc: "Kapsamlı cilt kalitesi iyileştirmesi" },
                  { icon: <GraduationCap className="w-4 h-4" />, title: "Klinik Destek", desc: "Sürekli eğitim ve teknik danışmanlık" },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.55 }}
                    className="flex flex-col gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-primary/25 hover:bg-white/[0.05] transition-all group"
                  >
                    <div className="text-primary w-fit group-hover:scale-110 transition-transform">{f.icon}</div>
                    <h4 className="font-semibold text-[13px] leading-snug">{f.title}</h4>
                    <p className="text-foreground/45 text-[11px] leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Button asChild className="h-11 px-7 text-[13px] font-semibold bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-sm">
                  <Link href="/urunler/neogen-plasma">Detaylı İncele</Link>
                </Button>
                <button
                  onClick={() => scrollTo("results")}
                  className="text-[12px] tracking-widest text-foreground/35 hover:text-foreground/60 transition-colors flex items-center gap-2"
                >
                  KLİNİK SONUÇLAR <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NEOGEN BEFORE / AFTER ─────────────────────────────────── */}
      <section id="results" className="relative bg-[#060a15] overflow-hidden py-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-primary/4 blur-[120px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="flex items-end justify-between mb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-3">
                KLİNİK KANIT · NeoGen Plasma
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
                    className="w-10 h-10 rounded-full border border-white/10 hover:border-primary/40 hover:bg-white/5 flex items-center justify-center transition-all duration-300"
                  >
                    <ChevronRight size={16} className={`text-foreground/50 hover:text-foreground transition-colors ${dir === -1 ? "rotate-180" : ""}`} />
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
            className="relative rounded-2xl overflow-hidden mb-4"
            style={{ aspectRatio: "21/9" }}
          >
            {baPatients.map((p, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ opacity: activePatient === i ? 1 : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <img src={p.img} alt={`Hasta ${i + 1}`} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a15]/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060a15]/30 via-transparent to-[#060a15]/30" />
              </motion.div>
            ))}
            <div className="absolute top-5 left-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-foreground/70">ÖNCE</span>
            </div>
            <div className="absolute top-5 right-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary">SONRA</span>
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10 z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex items-end justify-between">
              <p className="text-[10px] tracking-[0.25em] uppercase text-primary/70">
                NeoGen Plasma · {baPatients[activePatient].label}
              </p>
              <div className="font-display font-bold text-6xl text-white/5 select-none leading-none tabular-nums">
                {String(activePatient + 1).padStart(2, "0")}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-6 gap-2">
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
                    ? "ring-2 ring-primary/60 ring-offset-1 ring-offset-[#060a15]"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <img src={p.img} alt={`Hasta ${i + 1}`} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <div className={`absolute inset-0 transition-all duration-400 ${activePatient === i ? "bg-primary/10" : "bg-black/30"}`} />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-bold tracking-widest text-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ULTRACLEAR ────────────────────────────────────────────── */}
      <section id="ultraclear" className="relative overflow-hidden min-h-screen bg-[#040810]">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
          <span className="font-display font-black leading-none text-white/[0.025]" style={{ fontSize: "clamp(18rem, 28vw, 32rem)" }}>
            02
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 right-0 w-[58%] pointer-events-none"
        >
          <div className="absolute inset-y-0 left-0 w-56 bg-gradient-to-r from-[#040810] to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#040810] to-transparent z-10" />
          <img src={ultraClearStudio} alt="UltraClear Laser Device" className="w-full h-full object-cover object-center" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute z-20 top-[22%] left-20 px-4 py-2.5 rounded-xl backdrop-blur-md bg-white/5 border border-sky-400/20"
          >
            <p className="text-[9px] tracking-[0.25em] uppercase text-sky-400/70 mb-0.5">Teknoloji</p>
            <p className="text-[13px] font-semibold text-foreground/90">Soğuk Ablasyon</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute z-20 bottom-[28%] left-12 px-4 py-2.5 rounded-xl backdrop-blur-md bg-white/5 border border-white/10"
          >
            <p className="text-[9px] tracking-[0.25em] uppercase text-foreground/40 mb-0.5">Uyumluluk</p>
            <p className="text-[13px] font-semibold text-foreground/80">Tüm Cilt Tipleri</p>
          </motion.div>
        </motion.div>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-14 py-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[480px]"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-8 h-px bg-sky-400/60" />
                <p className="text-[10px] font-semibold tracking-[0.35em] text-sky-400/70">
                  SOĞUK ABLASYON · CO₂ LAZER
                </p>
              </div>

              <h2 className="font-display font-bold leading-[1.0] mb-3" style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)" }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-sky-300 to-primary">
                  UltraClear™
                </span>
              </h2>
              <p className="font-display font-light text-foreground/60 leading-snug mb-10" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}>
                Işık Hızında<br />Cilt Yenileme.
              </p>

              <div className="mb-10 border-t border-white/[0.06]">
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
                    className="flex items-center gap-5 py-4 border-b border-white/[0.05] group hover:border-sky-400/20 transition-colors"
                  >
                    <span className="text-[9px] tracking-[0.25em] text-sky-400/50 w-20 flex-shrink-0 font-medium">{s.label}</span>
                    <span className="text-sm text-foreground/65 group-hover:text-foreground/85 transition-colors">{s.value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-5">
                <Button asChild className="h-11 px-7 text-[13px] font-semibold rounded-sm bg-sky-400/10 border border-sky-400/30 hover:bg-sky-400/20 text-sky-300 hover:text-sky-200 transition-all duration-300">
                  <Link href="/urunler/ultraclear">Detaylı İncele</Link>
                </Button>
                <button
                  onClick={() => scrollTo("ultraclear-results")}
                  className="text-[12px] tracking-widest text-foreground/35 hover:text-foreground/60 transition-colors flex items-center gap-2"
                >
                  KLİNİK SONUÇLAR <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ULTRACLEAR BEFORE / AFTER ─────────────────────────────── */}
      <section id="ultraclear-results" className="relative bg-[#04080e] overflow-hidden py-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-sky-400/3 blur-[100px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="flex items-end justify-between mb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-sky-400/60 mb-3">
                KLİNİK KANIT · UltraClear™
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
                    className="w-10 h-10 rounded-full border border-white/10 hover:border-sky-400/40 hover:bg-white/5 flex items-center justify-center transition-all duration-300"
                  >
                    <ChevronRight size={16} className={`text-foreground/50 ${dir === -1 ? "rotate-180" : ""}`} />
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
            className="relative rounded-2xl overflow-hidden mb-4"
            style={{ aspectRatio: "21/9" }}
          >
            {ucPatients.map((p, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ opacity: ucActivePatient === i ? 1 : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <img src={p.img} alt={`UltraClear hasta ${i + 1}`} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04080e]/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#04080e]/30 via-transparent to-[#04080e]/30" />
              </motion.div>
            ))}
            <div className="absolute top-5 left-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-foreground/70">ÖNCE</span>
            </div>
            <div className="absolute top-5 right-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-sky-400/20 backdrop-blur-md border border-sky-400/30 text-sky-300">SONRA</span>
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10 z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex items-end justify-between">
              <p className="text-[10px] tracking-[0.25em] uppercase text-sky-400/70">
                UltraClear™ · {ucPatients[ucActivePatient].label}
              </p>
              <div className="font-display font-bold text-6xl text-white/5 select-none leading-none tabular-nums">
                {String(ucActivePatient + 1).padStart(2, "0")}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-6 gap-2">
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
                    ? "ring-2 ring-sky-400/60 ring-offset-1 ring-offset-[#04080e]"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <img src={p.img} alt={`UltraClear ${i + 1}`} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                <div className={`absolute inset-0 transition-all duration-400 ${ucActivePatient === i ? "bg-sky-400/10" : "bg-black/30"}`} />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-bold tracking-widest text-foreground/60">
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

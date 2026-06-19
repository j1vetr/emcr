import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronRight, ArrowRight, Activity, Zap, Layers,
  GraduationCap, Settings, ShieldCheck, Wrench,
  Phone, Mail, MapPin, Instagram, Linkedin, Youtube
} from "lucide-react";

import { Button } from "@/components/ui/button";

import emcrLogoWhite from "@assets/ChatGPT_Image_19_Haz_2026_12_54_31_1781862958295.png";
import neogenLogo from "@assets/a1_1781862958294.png";
import evoStill1 from "@assets/evo-still-1.webp";
import evoStill2 from "@assets/evo-still-2.webp";
import evoStill3 from "@assets/evo-still-3.webp";
import neogenEvoFront from "@assets/neogen-evo-front.webp";
import neogenDevicePlatform from "@assets/ChatGPT_Image_19_Haz_2026_14_45_57_1781870711491.png";
import heroDeviceImg from "@assets/hero-device.webp";
import showcaseVideo from "@assets/showcase.mp4";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, delay: i * 0.1, ease: "easeOut" }
  })
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDevice, setActiveDevice] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const showcaseVideoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveDevice(p => (p + 1) % 3), 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const video = showcaseVideoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.src = showcaseVideo;
          video.load();
          video.play().catch(() => {});
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "Hakkımızda", id: "about" },
    { label: "NeoGen", id: "neogen" },
    { label: "UltraClear", id: "ultraclear" },
    { label: "Klinik Sonuçlar", id: "results" },
    { label: "İletişim", id: "contact" },
  ];

  const deviceImages = [evoStill1, evoStill2, evoStill3];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans" data-testid="home-page">

      {/* ── HEADER ────────────────────────────────────────────────── */}
      <header
        data-testid="header"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-background/70 backdrop-blur-2xl border-b border-white/[0.06]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-testid="logo-button">
            <img src={emcrLogoWhite} alt="EMCR Medikal" className="h-12 md:h-16 object-contain" />
          </button>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                data-testid={`nav-${l.id}`}
                className="text-[13px] font-medium tracking-wide text-foreground/60 hover:text-foreground transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={() => scrollTo("contact")}
              data-testid="header-cta"
              className="h-11 px-6 text-sm font-semibold bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-full shadow-[0_0_24px_rgba(79,195,195,0.25)]"
            >
              İletişim
            </Button>
          </div>

          <button
            className="lg:hidden text-foreground/80"
            onClick={() => setMobileOpen(p => !p)}
            data-testid="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden absolute top-full inset-x-0 bg-background/95 backdrop-blur-2xl border-b border-white/10 p-8 flex flex-col gap-6"
            >
              {navLinks.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="text-xl font-medium text-left hover:text-primary transition-colors">
                  {l.label}
                </button>
              ))}
              <Button onClick={() => scrollTo("contact")} className="mt-2 w-full bg-primary text-[#0a0e1a] rounded-full">
                İletişim
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden flex items-center bg-background"
        data-testid="hero-section"
      >
        {/* Device image — right side, bleeds to edge */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-y-0 right-0 w-[78%] z-0 pointer-events-none"
        >
          <img
            src={heroDeviceImg}
            alt="NeoGen EVO Device"
            className="absolute inset-0 w-full h-full object-cover object-left"
          />
          {/* Left-to-right gradient so image fades into dark background */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </motion.div>

        {/* Subtle orb behind text */}
        <div className="absolute left-0 top-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[140px] pointer-events-none z-0" />

        {/* Left text content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-28 pb-24"
        >
          <div className="max-w-[520px]">

            {/* Label */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/70 mb-8"
            >
              Premium Sistem
            </motion.p>

            {/* Main headline */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <h1
                className="font-display font-bold leading-[0.9] mb-0"
                style={{ fontSize: "clamp(4.5rem, 9vw, 8.5rem)" }}
              >
                <span className="text-foreground">Neo</span><span className="text-primary">Gen</span>
              </h1>
              <h1
                className="font-display font-bold leading-[0.9] mb-6"
                style={{ fontSize: "clamp(4.5rem, 9vw, 8.5rem)" }}
              >
                <span className="text-foreground">Plasma</span>
              </h1>
            </motion.div>

            {/* Accent line */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="w-10 h-0.5 bg-primary mb-8"
            />

            {/* Body text */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-[15px] text-foreground/50 leading-relaxed mb-10 max-w-[400px]"
            >
              Klinikler için ileri seviye cilt yenileme, elastikiyet,
              ton ve doku kalitesi odaklı premium enerji tabanlı sistem.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap items-center gap-4"
            >
              <Button
                onClick={() => scrollTo("contact")}
                data-testid="hero-cta-primary"
                className="h-13 px-7 text-[14px] font-semibold bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-sm"
              >
                İletişime Geç
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                onClick={() => scrollTo("neogen")}
                data-testid="hero-cta-secondary"
                variant="ghost"
                className="h-13 px-7 text-[14px] font-medium border border-white/20 hover:bg-white/5 rounded-sm"
              >
                Teknolojiyi İncele
              </Button>
            </motion.div>

            {/* KEŞFET scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="flex flex-col items-center gap-3 mt-16 w-fit"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/25">Keşfet</span>
              <motion.div
                animate={{ scaleY: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-px h-10 bg-gradient-to-b from-foreground/40 to-transparent origin-top"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── DEVICE TRIO ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background pt-24 pb-0" data-testid="device-trio">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[1440px] mx-auto px-6 md:px-14 flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-4">
              Premium Sistem
            </p>
            <h2
              className="font-display font-bold leading-[1] whitespace-nowrap"
              style={{ fontSize: "clamp(2.2rem, 4.8vw, 4.8rem)" }}
            >
              NeoGen <span className="text-primary">EVO</span>
              {"  "}
              <span
                className="italic font-light tracking-tight"
                style={{
                  WebkitTextStroke: "1px rgba(79,195,195,0.6)",
                  color: "transparent",
                  textShadow: "none",
                  letterSpacing: "-0.01em",
                }}
              >
                Üç Boyut.
              </span>
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-2 mb-1">
            {[0, 1, 2].map(i => (
              <button
                key={i}
                onClick={() => setActiveDevice(i)}
                data-testid={`device-dot-${i}`}
                className={`h-px rounded-full transition-all duration-500 ${
                  activeDevice === i ? "w-12 bg-primary" : "w-6 bg-white/20 hover:bg-white/35"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Staggered gallery — bottom-aligned */}
        <div className="flex items-end gap-3 px-6 md:px-14 max-w-[1440px] mx-auto">
          {deviceImages.map((img, i) => {
            const heights = [520, 660, 580];
            const isActive = activeDevice === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveDevice(i)}
                className="relative flex-1 rounded-2xl overflow-hidden cursor-pointer group"
                style={{ height: heights[i] }}
              >
                {/* Teal top accent line on active */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 z-20 transition-all duration-500"
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg, transparent, rgba(79,195,195,0.8), transparent)"
                      : "transparent",
                  }}
                />

                {/* Image */}
                <motion.img
                  src={img}
                  alt={`NeoGen EVO açı ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  animate={{ scale: isActive ? 1.03 : 1, filter: isActive ? "brightness(1)" : "brightness(0.7)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />

                {/* Ghost number — top right */}
                <div
                  className="absolute top-4 right-5 font-display font-bold leading-none select-none z-10 transition-opacity duration-500"
                  style={{
                    fontSize: "clamp(4rem, 7vw, 7rem)",
                    WebkitTextStroke: "1px rgba(255,255,255,0.08)",
                    color: "transparent",
                    opacity: isActive ? 0.6 : 0.25,
                  }}
                >
                  {["01", "02", "03"][i]}
                </div>

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c18]/95 via-[#080c18]/20 to-transparent z-10" />

                {/* Bottom label — slides up on hover/active */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  animate={{ y: isActive ? 0 : 8, opacity: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className="w-6 h-px mb-3 transition-all duration-500"
                    style={{ background: isActive ? "rgba(79,195,195,0.8)" : "rgba(255,255,255,0.2)" }}
                  />
                  <p className="text-[10px] tracking-[0.3em] uppercase text-primary/70 mb-1.5">
                    {["Açı 01", "Açı 02", "Açı 03"][i]}
                  </p>
                  <p className="font-display font-semibold text-base text-foreground/90">
                    NeoGen EVO System
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom fade into next section */}
        <div className="h-24 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* ── NEOGEN BRAND MOMENT ───────────────────────────────────── */}
      <section id="neogen" className="relative overflow-hidden min-h-screen flex items-center bg-[#070b17]" data-testid="brand-section">
        {/* Subtle ambient glow right side */}
        <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/6 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 w-full py-24">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 items-center">

            {/* ── LEFT COLUMN ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Logo */}
              <img
                src={neogenLogo}
                alt="NeoGen"
                className="w-full max-w-[260px] mb-10 invert opacity-95"
              />

              {/* Label */}
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/70 mb-5">
                Nitrogen Plasma
              </p>

              {/* Heading */}
              <h2
                className="font-display font-bold leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.4rem, 3.8vw, 4rem)" }}
              >
                Kontrollü Enerji.<br />
                <span className="text-primary">Görünür Sonuç.</span>
              </h2>

              {/* Description */}
              <p className="text-foreground/50 text-base leading-relaxed mb-10 max-w-[440px]">
                NeoGen Plasma, nitrogen gazını plazma enerjisine dönüştürerek cilt yüzeyi
                korunurken derin dermal yenilenme sağlar. Kontrollü termal etki,
                protokol esnekliği ve üstün klinik sonuçlar tek sistemde.
              </p>

              {/* Feature grid — 2×2 */}
              <div className="grid grid-cols-2 gap-3">
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
            </motion.div>

            {/* ── RIGHT COLUMN — device + ring ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Outer decorative ring */}
              <div
                className="absolute w-[520px] h-[520px] rounded-full border border-primary/25 pointer-events-none"
                style={{ boxShadow: "0 0 60px rgba(79,195,195,0.08), inset 0 0 60px rgba(79,195,195,0.04)" }}
              />
              {/* Inner ring */}
              <div className="absolute w-[380px] h-[380px] rounded-full border border-primary/10 pointer-events-none" />
              {/* Core glow */}
              <div className="absolute w-[280px] h-[280px] bg-primary/6 blur-[60px] rounded-full pointer-events-none" />

              {/* Device image */}
              <img
                src={neogenDevicePlatform}
                alt="NeoGen Plasma Device"
                className="relative z-10 w-full max-w-[520px] object-contain"
                style={{ filter: "drop-shadow(0 20px 80px rgba(0,0,0,0.6))" }}
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden" data-testid="how-it-works">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-4">Teknoloji</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl">
              Nasıl <span className="text-primary">Çalışır?</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-16 left-0 right-0 h-px">
              <div className="h-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { n: "01", title: "Enerji Aktarımı", body: "Nitrogen gazı UHF enerjisi ile plazma durumuna geçirilir ve cilt yüzeyine iletilir." },
                { n: "02", title: "Kontrollü Yenilenme", body: "Epidermis bütünlüğü korunurken alt katmanlarda hassas termal etki yaratılır." },
                { n: "03", title: "Protokol Esnekliği", body: "Hastanın ihtiyacına göre özelleştirilebilir enerji seviyeleri ve tedavi protokolleri." },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                  className="relative text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-8 relative">
                    <div className="absolute inset-0 rounded-full bg-primary/8 border border-primary/20 shadow-[0_0_40px_rgba(79,195,195,0.1)]" />
                    <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-4xl text-primary">
                      {s.n}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4">{s.title}</h3>
                  <p className="text-foreground/50 leading-relaxed">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO SHOWCASE ────────────────────────────────────────── */}
      <section id="results" className="relative overflow-hidden" data-testid="video-section">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-4">Klinik Belgeler</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl mb-4">
              Klinik <span className="text-primary">Sonuçlar</span>
            </h2>
            <p className="text-foreground/45 text-lg max-w-xl">
              Gerçek klinik ortamlarında gerçek tedavi sonuçları.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-[#0f1423] shadow-2xl"
          >
            <video
              ref={showcaseVideoRef}
              muted
              loop
              playsInline
              preload="none"
              className="w-full aspect-video object-cover"
              data-testid="showcase-video"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080c18]/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-xs tracking-[0.2em] uppercase text-primary/70 mb-2">NeoGen EVO</p>
              <p className="font-display font-semibold text-xl text-foreground/90">
                Nitrogen Plasma Skin Regeneration
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT / VALUE PROPS ───────────────────────────────────── */}
      <section id="about" className="py-32 bg-[#080c18] relative overflow-hidden" data-testid="value-props">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(79,195,195,0.05)_0%,_transparent_60%)]" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-4">Klinik Değer</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl max-w-3xl leading-tight">
              Kliniğiniz İçin Üst Segment{" "}
              <span className="text-primary">Plasma Teknolojisi</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: "01", icon: <Activity className="w-6 h-6" />, title: "Kontrollü Termal Etki", body: "Epidermisi koruyarak derin dermal ısınma ile optimal klinik sonuç." },
              { n: "02", icon: <Zap className="w-6 h-6" />, title: "Protokol Esnekliği", body: "Düşük enerjiden yüksek enerjiye geniş tedavi yelpazen, tek sistem." },
              { n: "03", icon: <Layers className="w-6 h-6" />, title: "Doku, Ton, Elastikiyet", body: "Kapsamlı cilt kalitesi iyileştirmesi, ölçülebilir hasta memnuniyeti." },
              { n: "04", icon: <GraduationCap className="w-6 h-6" />, title: "Eğitim ve Destek", body: "Kurulum, eğitim ve sürekli teknik danışmanlık hizmeti." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-primary/25 hover:bg-white/[0.04] transition-all duration-400 group cursor-default"
              >
                <p className="text-[11px] tracking-[0.2em] text-foreground/25 mb-6 font-mono">{f.n}</p>
                <div className="text-primary mb-5 group-hover:scale-110 transition-transform w-fit">
                  {f.icon}
                </div>
                <h3 className="font-display font-semibold text-lg mb-3">{f.title}</h3>
                <p className="text-foreground/45 text-sm leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ULTRACLEAR ────────────────────────────────────────────── */}
      <section id="ultraclear" className="py-32 relative overflow-hidden" data-testid="ultraclear-section">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-[#0a0e1a]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(79,195,195,0.07)_0%,_transparent_65%)]" />
            <div className="relative z-10 p-12 md:p-20 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-foreground/60 text-xs tracking-widest uppercase mb-8">
                  Premium Laser System
                </div>
                <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-primary">UltraClear™</span>
                  <br />
                  <span className="text-foreground/80 text-[0.75em]">Yeni Nesil Lazer</span>
                </h2>
                <p className="text-foreground/50 text-lg leading-relaxed mb-10 max-w-lg">
                  Soğuk ablasyon teknolojisi ile ağrısız, hızlı iyileşme süreci ve
                  her cilt tipine uygun cilt yenileme devrimi. Kliniğinizdeki lazer
                  portföyünü bir üst seviyeye taşıyın.
                </p>
                <Button
                  data-testid="ultraclear-cta"
                  className="h-13 px-8 text-[15px] font-semibold rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-foreground"
                >
                  UltraClear'ı İncele
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="relative flex items-center justify-center min-h-[320px]">
                <div className="absolute inset-0 bg-sky-400/5 blur-[80px] rounded-full" />
                <div className="relative z-10 w-full max-w-[400px] mx-auto aspect-square rounded-2xl bg-[#0f1620] border border-white/[0.05] flex items-center justify-center p-8 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-display font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-br from-sky-300 to-primary">UC</p>
                      <p className="text-foreground/30 text-sm tracking-widest mt-2">ULTRA CLEAR</p>
                      <p className="text-foreground/20 text-xs mt-1">Cold Ablation Technology</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST ─────────────────────────────────────────────────── */}
      <section className="py-32 bg-[#080c18] relative" data-testid="trust-section">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-primary/60 mb-4">Satış Sonrası</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
              Satıştan Sonra da <span className="text-primary">Yanınızdayız</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: <Settings className="w-6 h-6" />, title: "Kurulum Desteği", n: "01" },
              { icon: <GraduationCap className="w-6 h-6" />, title: "Doktor Eğitimi", n: "02" },
              { icon: <Wrench className="w-6 h-6" />, title: "Teknik Servis", n: "03" },
              { icon: <Activity className="w-6 h-6" />, title: "Klinik Adaptasyon", n: "04" },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "Türkiye Distribütör", n: "05" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, borderColor: "rgba(79,195,195,0.3)" }}
                className="p-8 rounded-2xl bg-white/[0.025] border border-white/[0.06] text-center transition-all duration-300"
              >
                <p className="text-[10px] font-mono text-foreground/20 mb-5">{item.n}</p>
                <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary mx-auto mb-5">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-sm leading-snug text-foreground/80">{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer id="contact" className="bg-[#060912] border-t border-white/[0.04] pt-24 pb-12" data-testid="footer">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 md:col-span-1 space-y-6">
              <img src={emcrLogoWhite} alt="EMCR Medikal" className="h-12 object-contain" />
              <p className="text-foreground/35 text-sm leading-relaxed">
                Premium medikal estetik teknolojileri ve kesintisiz klinik destek hizmetleri.
              </p>
              <div className="flex gap-3">
                {[<Instagram size={16} />, <Linkedin size={16} />, <Youtube size={16} />].map((icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/40 transition-all">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold text-sm mb-6 text-foreground/70">Ürünler</p>
              <ul className="space-y-3 text-sm text-foreground/35">
                {["NeoGen Plasma", "NeoGen EVO", "UltraClear", "Klinik Çözümler"].map(item => (
                  <li key={item}>
                    <button onClick={() => scrollTo("neogen")} className="hover:text-primary transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-sm mb-6 text-foreground/70">Şirket</p>
              <ul className="space-y-3 text-sm text-foreground/35">
                {["Hakkımızda", "Klinik Sonuçlar", "Distribütörlük", "Demo Talebi"].map(item => (
                  <li key={item}>
                    <button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-semibold text-sm mb-6 text-foreground/70">İletişim</p>
              <ul className="space-y-4 text-sm text-foreground/35">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary/60 flex-shrink-0 mt-0.5" />
                  İstanbul, Türkiye
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary/60 flex-shrink-0" />
                  info@emcr.com.tr
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary/60 flex-shrink-0" />
                  +90 XXX XXX XX XX
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/20">
            <p>© 2025 EMCR Medikal. Tüm hakları saklıdır.</p>
            <p>NeoGen® ve UltraClear™ tescilli markadır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

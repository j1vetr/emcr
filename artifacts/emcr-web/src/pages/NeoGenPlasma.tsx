import { useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ChevronRight, ShieldCheck, Play, Pause, ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import neogenLogo from "@assets/neogen-logo.webp";
import baRef1 from "@assets/ref1_1781870893595.jpg";
import baRef2 from "@assets/ref2_1781870893596.jpg";
import baRef3 from "@assets/ref3_1781870893597.jpg";
import baRef4 from "@assets/ref4_1781870893597.jpg";
import baRef5 from "@assets/ref5_1781870893598.jpg";
import baRef6 from "@assets/ref6_1781870893598.jpg";

import neogenDeviceTransparent from "@assets/yeni_fot_1784560619600.png";
import neogenEvoDevice from "@assets/neogen-evo-device.webp";
import neogenTreatment from "@assets/neogen-treatment.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const patients = [
  { img: baRef1, label: "Yüz Yenileme · 1 Seans" },
  { img: baRef2, label: "Cilt Tonu Eşitleme · 2 Seans" },
  { img: baRef3, label: "Derin Dermal Yenilenme · 1 Seans" },
  { img: baRef4, label: "Leke & Ton Düzeltme · 2 Seans" },
  { img: baRef5, label: "Göz Çevresi & Cilt Tonu · 1 Seans" },
  { img: baRef6, label: "Sıkılaştırma & Yenileme · 3 Seans" },
];

const mechanisms = [
  "Cilt Sıkılaştırma",
  "Yüzey Yenileme",
  "Derin Rejenerasyon",
];

const indications = [
  { label: "Yüz Kırışıklıkları (Facial Rhytides)" },
  { label: "Yüz Dışı Kırışıklıklar (Non-facial Rhytides)" },
  { label: "Akne İzleri (Acne Scars)" },
  { label: "Pigmente Lezyonlar (Pigmented Lesions)" },
  { label: "Aktinik Keratoz (Actinic Keratosis)" },
  { label: "Seboreik Keratoz (Seborrhoeic Keratosis)" },
  { label: "Viral Papilloma (Viral Papillomata)" },
  { label: "Cilt Laksitesi ve Sarkma" },
  { label: "Göz Çevresi (Periorbital) Bölge" },
  { label: "Vücut Cilt Yenilemesi" },
];

const specs = [
  { label: "Gaz", value: "Medikal Kalite Azot (N₂)" },
  { label: "Enerji Aralığı", value: "0.5 J – 4.0 J" },
  { label: "Nabız Hızı", value: "Çift Nabız (Double Pulse)" },
  { label: "Tekrar Hızı", value: "1.0 – 2.5 Hz" },
  { label: "Nozullar", value: "25 mm / 5 mm" },
  { label: "Yüzey Sıcaklığı", value: "70 – 165 °C / 15 ms nabız" },
  { label: "Cihaz Sınıfı", value: "Class IIb" },
  { label: "Cilt Tipi", value: "Fitzpatrick I–VI Tüm Tipler" },
];

export default function NeoGenPlasma() {
  const [activePatient, setActivePatient] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoPlaying) { videoRef.current.pause(); } else { videoRef.current.play(); }
    setVideoPlaying(!videoPlaying);
  };

  return (
    <div className="min-h-screen bg-[#F0F6FC] text-foreground font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F0F6FC]" style={{ minHeight: "92vh" }}>
        {/* Subtle teal glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 50% 60% at 68% 50%, rgba(36,184,189,0.08) 0%, transparent 65%)",
          }}
        />

        <div className="max-w-[1440px] mx-auto px-6 md:px-14 h-full">
          <div
            className="grid lg:grid-cols-2 gap-8 items-center"
            style={{ minHeight: "92vh", paddingTop: "clamp(90px, 11vh, 140px)", paddingBottom: "clamp(60px, 8vh, 100px)" }}
          >
            {/* ── Sol: cihaz görseli ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center lg:justify-start relative"
            >
              {/* Teal orb */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: "460px", height: "460px",
                  background: "radial-gradient(circle, rgba(36,184,189,0.09) 0%, transparent 70%)",
                  filter: "blur(60px)",
                  top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />

              <img
                src={neogenDeviceTransparent}
                alt="NeoGen Plasma EVO"
                className="relative w-full object-contain"
                style={{ maxHeight: "700px", display: "block" }}
                fetchPriority="high"
                decoding="async"
              />
            </motion.div>

            {/* ── Sağ: metin ───────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              {/* Logo */}
              <img
                src={neogenLogo}
                alt="NeoGen"
                className="w-auto h-8 mb-10 opacity-80"
              />

              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-5 bg-primary/55" />
                <span className="text-[10px] font-medium tracking-[0.28em] uppercase text-[#1A9CA1]" lang="en">
                  Nitrogen Plasma Skin Regeneration
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-display font-black leading-[0.92] tracking-[-0.025em] mb-7"
                style={{ fontSize: "clamp(3rem, 5.5vw, 6rem)" }}
              >
                Plazma ile
                <br />
                <span
                  style={{
                    background: "linear-gradient(110deg, #24B8BD 0%, #1FA3A8 55%, #2B8FD0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.12em",
                    display: "inline-block",
                  }}
                >
                  Derin Yenilenme
                </span>
              </h1>

              <p className="text-[14.5px] text-[#607084] leading-[1.85] mb-8 max-w-[420px]">
                Azot gazını plazma enerjisine dönüştüren sistem. Cilt yüzeyini
                korurken derin dermal yenilenme süreci başlatır.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:info@emcr.com.tr"
                  className="h-11 px-7 inline-flex items-center gap-2.5 text-[13px] font-semibold bg-primary text-[#10243B] rounded-xl hover:bg-primary/90 transition-all"
                  style={{ boxShadow: "0 0 28px rgba(36,184,189,0.25), 0 4px 14px rgba(16,36,59,0.075)" }}
                >
                  Demo Talep Et
                  <ArrowRight size={14} />
                </a>
                <Link
                  href="/teknik-destek"
                  className="h-11 px-7 inline-flex items-center gap-2 text-[13px] font-medium text-[#607084] hover:text-foreground border border-[#D9E6EF] hover:border-[#D9E6EF] rounded-xl hover:bg-[#E5F0F8] transition-all"
                >
                  Teknik Destek
                  <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F0F6FC] to-transparent pointer-events-none" />
      </section>

      {/* ── PSR TECHNOLOGY ───────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden bg-[#F0F6FC]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 5% 50%, rgba(36,184,189,0.055) 0%, transparent 65%)",
          }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">

            {/* Left: Treatment image */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                className="relative rounded-3xl overflow-hidden border border-[#D9E6EF]"
                style={{ aspectRatio: "1/1" }}
              >
                <img
                  src={neogenTreatment}
                  alt="NeoGen Plasma Uygulama"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F0F6FC]/60 via-transparent to-transparent" />
                {/* Label overlay */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <span
                    className="text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full border border-primary/30 bg-white/75 backdrop-blur-md text-primary"
                  >
                    Klinik Uygulama · NeoGen PSR
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right: Technology text */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#1A9CA1] mb-6">
                Teknoloji
              </p>
              <h2
                className="font-display font-black leading-[0.94] tracking-[-0.02em] mb-7"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3.6rem)" }}
              >
                Nitrojen Plazma{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #24B8BD 0%, #2B8FD0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.08em",
                    display: "inline-block",
                  }}
                >
                  Nasıl Çalışır?
                </span>
              </h2>

              <p className="text-[15px] text-[#607084] leading-[1.85] mb-8">
                NeoGen, ultra yüksek radyo frekansıyla tüpten gelen medikal kalite azot gazını
                iyonize ederek nozulda nitrojen plazma oluşturur. Bu plazma, yüzeyi açmadan
                cildin tüm mimarisini ısıtır ve <strong className="text-foreground/70 font-semibold">15 milisaniyelik kontrollü darbelerle</strong>{" "}
                70–165°C arasında termal etki üretir.
              </p>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3 MECHANISMS ─────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden bg-[#F0F6FC]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 100%, rgba(36,184,189,0.05) 0%, transparent 65%)",
          }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-18 flex items-end justify-between flex-wrap gap-6"
          >
            <div>
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#1A9CA1] mb-5">
                3 Temel Etki Mekanizması
              </p>
              <h2
                className="font-display font-black leading-[0.94] tracking-[-0.022em]"
                style={{ fontSize: "clamp(2rem, 3.8vw, 4rem)" }}
              >
                Tek Sistemde{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #24B8BD 0%, #2B8FD0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.08em",
                    display: "inline-block",
                  }}
                >
                  Üç Sonuç
                </span>
              </h2>
            </div>
            <p className="text-[14px] text-[#607084] max-w-xs leading-relaxed">
              NeoGen tek seansta sıkılaştırma, yüzey yenileme ve derin kolajen
              rejenerasyonunu eş zamanlı olarak gerçekleştirir.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-5">
            {mechanisms.map((title, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="relative flex min-h-[140px] items-center justify-center border border-[#D9E6EF] border-t-2 border-t-primary bg-white px-6 py-8 text-center rounded-xl"
                >
                  <h3 className="font-display font-semibold text-[clamp(1.3rem,2.2vw,1.75rem)] leading-tight tracking-tight text-[#10243B]">
                    {title}
                  </h3>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDICATIONS + SPECS ──────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden bg-[#F0F6FC]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 90% 20%, rgba(36,184,189,0.05) 0%, transparent 65%)",
          }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-20">

            {/* Indications */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#1A9CA1] mb-6">
                Endikasyonlar
              </p>
              <h2
                className="font-display font-black leading-[0.94] tracking-[-0.022em] mb-4"
                style={{ fontSize: "clamp(2rem, 3.2vw, 3.2rem)" }}
              >
                Hangi Durumlarda{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #24B8BD 0%, #2B8FD0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.08em",
                    display: "inline-block",
                  }}
                >
                  Kullanılır?
                </span>
              </h2>
              <div className="space-y-0">
                {indications.map((ind, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i * 0.4}
                    className="flex items-center gap-4 py-3.5 border-b border-[#D9E6EF] group hover:border-primary/18 transition-colors"
                  >
                    <ChevronRight size={13} className="text-[#1A9CA1] flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-[14px] text-foreground/60 group-hover:text-foreground/82 transition-colors flex-1 leading-snug">
                      {ind.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Specs */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#1A9CA1] mb-6">
                Teknik Özellikler
              </p>
              <h2
                className="font-display font-black leading-[0.94] tracking-[-0.022em] mb-10"
                style={{ fontSize: "clamp(2rem, 3.2vw, 3.2rem)" }}
              >
                NeoGen{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #24B8BD 0%, #2B8FD0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.08em",
                    display: "inline-block",
                  }}
                >
                  Sistem Detayları
                </span>
              </h2>

              <div className="rounded-2xl border border-[#D9E6EF] overflow-hidden bg-white/80">
                {specs.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 px-6 py-3.5 border-b border-[#D9E6EF] last:border-0 hover:bg-[#E5F0F8] transition-colors group"
                  >
                    <span className="text-[10px] tracking-[0.18em] uppercase text-[#1A9CA1] w-32 flex-shrink-0 font-medium">
                      {s.label}
                    </span>
                    <span className="text-[13.5px] text-[#607084] group-hover:text-foreground/78 transition-colors">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Distributor badge */}
              <div className="mt-6 p-6 rounded-2xl border border-primary/18 bg-primary/[0.04] relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[13.5px] text-foreground/90 mb-2">
                      Türkiye Tek Yetkili Distribütörü
                    </p>
                    <p className="text-[13px] text-[#607084] leading-[1.8]">
                      EMCR Medikal Teknolojiler, NeoGen Plasma'nın Türkiye tek yetkili distribütörüdür.
                      Kurulum, eğitim ve teknik servis hizmetleri kapsamlıdır.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DEMO VIDEO ───────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-[#F0F6FC]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(36,184,189,0.05) 0%, transparent 65%)",
          }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#1A9CA1] mb-4">Canlı Uygulama</p>
            <h2
              className="font-display font-black leading-[0.94] tracking-[-0.022em]"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
            >
              NeoGen Plasma{" "}
              <span
                style={{
                  background: "linear-gradient(110deg, #24B8BD 0%, #2B8FD0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingBottom: "0.08em",
                  display: "inline-block",
                }}
              >
                Uygulamada
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-[#D9E6EF] bg-black max-w-4xl mx-auto"
            style={{ aspectRatio: "16/9" }}
          >
            <video
              ref={videoRef}
              src="/neogen-demo.mp4"
              className="w-full h-full object-cover"
              playsInline
              onEnded={() => setVideoPlaying(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <button
              onClick={toggleVideo}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <div
                className={`w-16 h-16 rounded-full border border-white/40 bg-[#10243B]/45 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50 group-hover:bg-primary/10 ${videoPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
              >
                {videoPlaying
                  ? <Pause size={20} className="text-white" />
                  : <Play size={20} className="text-white ml-1" />
                }
              </div>
            </button>
            {!videoPlaying && (
              <div className="absolute bottom-5 left-6 z-10">
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary">
                  Demo · NeoGen Plasma PSR
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ───────────────────────────────────────── */}
      <section className="py-24 bg-[#F0F6FC] relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(36,184,189,0.04) 0%, transparent 65%)" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#1A9CA1] mb-4">
                Uygulama Sonuçları
              </p>
              <h2
                className="font-display font-black leading-[0.94] tracking-[-0.022em]"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
              >
                Gerçek{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #24B8BD 0%, #2B8FD0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.08em",
                    display: "inline-block",
                  }}
                >
                  Sonuçlar.
                </span>
              </h2>
            </motion.div>

            <div className="hidden md:flex items-center gap-5">
              <span className="font-display text-5xl font-black tabular-nums text-foreground/12">
                {String(activePatient + 1).padStart(2, "0")}
                <span className="text-2xl text-foreground/8 mx-1">/</span>06
              </span>
              <div className="flex gap-2">
                {([-1, 1] as const).map((dir, di) => (
                  <button
                    key={di}
                    onClick={() => setActivePatient((p) => (p + dir + patients.length) % patients.length)}
                    className="w-10 h-10 rounded-full border border-[#D9E6EF] hover:border-primary/40 hover:bg-[#E5F0F8] flex items-center justify-center transition-all"
                  >
                    <ChevronRight size={16} className={`text-[#607084] ${dir === -1 ? "rotate-180" : ""}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden mb-4 border border-[#D9E6EF]" style={{ aspectRatio: "21/9" }}>
            {patients.map((p, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ opacity: activePatient === i ? 1 : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <img src={p.img} alt={`Hasta ${i + 1}`} className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F0F6FC]/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#F0F6FC]/25 via-transparent to-[#F0F6FC]/25" />
              </motion.div>
            ))}
            <div className="absolute top-5 left-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-[#D9E6EF] text-foreground/65">ÖNCE</span>
            </div>
            <div className="absolute top-5 right-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary">SONRA</span>
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/80 z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex items-end justify-between">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#1A9CA1]">
                NeoGen Plasma · {patients[activePatient].label}
              </p>
              <div className="font-display font-black text-6xl text-[#10243B]/[0.04] select-none leading-none tabular-nums">
                {String(activePatient + 1).padStart(2, "0")}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {patients.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePatient(i)}
                className={`relative rounded-xl overflow-hidden aspect-video transition-all duration-300 group ${
                  activePatient === i
                    ? "ring-2 ring-primary/60 ring-offset-1 ring-offset-[#F0F6FC]"
                    : "opacity-45 hover:opacity-70"
                }`}
              >
                <img src={p.img} alt={`${i + 1}`} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 transition-all ${activePatient === i ? "bg-primary/10" : "bg-white/35"}`} />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-bold tracking-widest text-[#607084]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden bg-[#F0F6FC]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(36,184,189,0.07) 0%, transparent 65%)",
          }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#1A9CA1] mb-6">
              Sıradaki Adım
            </p>
            <h2
              className="font-display font-black leading-[0.94] tracking-[-0.022em] mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 4.5rem)" }}
            >
              Kliniğiniz İçin{" "}
              <span
                style={{
                  background: "linear-gradient(110deg, #24B8BD 0%, #2B8FD0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingBottom: "0.1em",
                  display: "inline-block",
                }}
              >
                Demo Talep Edin
              </span>
            </h2>
            <p className="text-[15px] text-[#607084] max-w-lg mx-auto mb-11 leading-[1.85]">
              NeoGen Plasma'yı kliniğinizde deneyimlemek için bizimle iletişime geçin.
              Yetkili uzmanlarımız size özel sunum ve teklif hazırlasın.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:info@emcr.com.tr"
                className="h-13 px-9 inline-flex items-center gap-2.5 text-[14px] font-semibold bg-primary text-[#10243B] rounded-xl hover:bg-primary/90 transition-all"
                style={{ boxShadow: "0 0 40px rgba(36,184,189,0.28), 0 4px 20px rgba(16,36,59,0.087)" }}
              >
                Demo Talep Et
                <ArrowRight size={15} />
              </a>
              <Link
                href="/teknik-destek"
                className="h-13 px-9 inline-flex items-center gap-2 text-[14px] font-medium text-foreground/60 hover:text-foreground border border-[#D9E6EF] hover:border-[#D9E6EF] rounded-xl hover:bg-[#E5F0F8] transition-all"
              >
                Teknik Destek
                <ChevronRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

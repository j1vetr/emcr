import { useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ChevronRight, ShieldCheck, Play, Pause, ArrowRight,
  Zap, Layers, Activity, Star, Clock,
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

const DEVICE_IMG = "https://www.neogenplasma.co.uk/wp-content/uploads/2026/02/NeoGen-Evo-Right-Large-683x1024.webp";
const TREATMENT_IMG = "https://www.neogenplasma.co.uk/wp-content/uploads/2026/02/DSC01427-Large-1200-x-1200-1024x1016.webp";

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
  {
    n: "01",
    icon: Zap,
    title: "Cilt Sıkılaştırma",
    subtitle: "Skin Tightening",
    desc: "Plazma darbesi cilde çarptığında termal enerji ani bir ısıya dönüşür ve doku hemen kontrakte olur. Bu anlık sıkılaşma görünür kırışıklık azalmasını tetikler.",
    detail: "Stratum corneum ve epidermal katmanlar tedavi boyunca bütünlüğünü korur, doğal bir biyolojik pansuman görevi üstlenir. Ablative teknolojilerdeki komplikasyon riskleri en aza indirilir.",
    downtime: "1–3 gün",
    result: "Anlık doku kontraksiyonu",
  },
  {
    n: "02",
    icon: Layers,
    title: "Yüzey Yenileme",
    subtitle: "Skin Resurfacing",
    desc: "İyileşme bölgesi (Zone of Thermal Damage) ile modifikasyon bölgesi (Zone of Thermal Modification) arasında yeni bir epidermis oluşur.",
    detail: "Derinin doğal bariyeri korunduğu için enfeksiyon riski ve komplikasyonlar klasik ablative yöntemlere kıyasla belirgin şekilde azdır. Düşük enerjide 1–2 gün, yüksek enerjide 3–5 gün iyileşme.",
    downtime: "3–5 gün",
    result: "Tam yüzey tedavisi",
  },
  {
    n: "03",
    icon: Activity,
    title: "Derin Rejenerasyon",
    subtitle: "Skin Regeneration",
    desc: "Tüm cilt yüzeyi tedavi edilir — ablative teknolojilerdeki gibi tedavisiz adacıklar oluşmaz. Retikular dermise kadar uzanan yeniden modelleme kaskadı başlatılır.",
    detail: "Neokollajenizasyon, neovaskülarizasyon ve fibroblast migrasyonu ile uzun dönemli çalışmalar tedaviden 12 ay sonrasına kadar süren kolajen üretimini belgelemektedir.",
    downtime: "5–7 gün",
    result: "12 ay kolajen üretimi",
  },
];

const clinicalStats = [
  { value: "12", unit: "Ay", label: "Belgelenmiş Kolajen Üretimi", icon: Clock },
  { value: "7", unit: "", label: "FDA 510(k) Onaylı Endikasyon", icon: ShieldCheck },
  { value: "I–VI", unit: "", label: "Tüm Fitzpatrick Cilt Tipleri", icon: Star },
  { value: "15", unit: "ms", label: "Kontrollü Nabız Süresi", icon: Zap },
  { value: "0.5–4", unit: "J", label: "Ayarlanabilir Enerji Aralığı", icon: Activity },
];

const indications = [
  { label: "Yüz Kırışıklıkları (Facial Rhytides)", fda: true },
  { label: "Yüz Dışı Kırışıklıklar (Non-facial Rhytides)", fda: true },
  { label: "Akne İzleri (Acne Scars)", fda: true },
  { label: "Pigmente Lezyonlar (Pigmented Lesions)", fda: true },
  { label: "Aktinik Keratoz (Actinic Keratosis)", fda: true },
  { label: "Seboreik Keratoz (Seborrhoeic Keratosis)", fda: true },
  { label: "Viral Papilloma (Viral Papillomata)", fda: true },
  { label: "Cilt Laksitesi ve Sarkma", fda: false },
  { label: "Göz Çevresi (Periorbital) Bölge", fda: false },
  { label: "Vücut Cilt Yenilemesi", fda: false },
];

const specs = [
  { label: "Enerji Tipi", value: "UHF (Ultra Yüksek Frekans) RF" },
  { label: "Gaz", value: "Medikal Kalite Azot (N₂)" },
  { label: "Enerji Aralığı", value: "0.5 J – 4.0 J" },
  { label: "Nabız Hızı", value: "Çift Nabız (Double Pulse)" },
  { label: "Tekrar Hızı", value: "1.0 – 2.5 Hz" },
  { label: "Nozullar", value: "25 mm / 5 mm" },
  { label: "Yüzey Sıcaklığı", value: "70 – 165 °C / 15 ms nabız" },
  { label: "Cihaz Sınıfı", value: "Class IIb" },
  { label: "Cilt Tipi", value: "Fitzpatrick I–VI Tüm Tipler" },
  { label: "Onay", value: "CE Mark · FDA 510(k) K132754" },
  { label: "Sistem Ağırlığı", value: "18 kg" },
  { label: "Boyutlar", value: "470 × 430 × 1060 mm" },
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
    <div className="min-h-screen bg-[#070b17] text-foreground font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden bg-[#070b17] flex items-center">
        {/* Atmospheric glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 72% 45%, rgba(20,184,166,0.10) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 75% 70%, rgba(56,189,248,0.05) 0%, transparent 55%)",
          }}
        />
        {/* Fine grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Device image — right side */}
        <div className="absolute right-0 top-0 bottom-0 w-[48%] pointer-events-none overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-64 z-10 bg-gradient-to-r from-[#070b17] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 z-10 bg-gradient-to-t from-[#070b17] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 z-10 bg-gradient-to-b from-[#070b17] to-transparent" />
          {/* Teal orb behind device */}
          <div
            className="absolute z-0 pointer-events-none"
            style={{
              right: "10%", top: "20%", width: "340px", height: "340px",
              background: "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <img
            src={DEVICE_IMG}
            alt="NeoGen Plasma EVO Cihazı"
            className="relative z-[5] w-full h-full object-contain object-center"
            style={{ filter: "drop-shadow(0 30px 90px rgba(0,0,0,0.8))" }}
          />
        </div>

        {/* Left content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14"
          style={{ paddingTop: "clamp(100px, 13vh, 160px)", paddingBottom: "clamp(80px, 10vh, 130px)" }}
        >
          <div className="max-w-[560px]">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Logo */}
              <img
                src={neogenLogo}
                alt="NeoGen"
                className="w-auto h-8 mb-10 invert opacity-85"
              />

              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-7">
                <div className="h-px w-6 bg-primary/60" />
                <span className="text-[10.5px] font-medium tracking-[0.28em] uppercase text-primary/70">
                  Nitrogen Plasma Skin Regeneration
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-display font-black leading-[0.93] tracking-[-0.025em] mb-8"
                style={{ fontSize: "clamp(2.8rem, 5vw, 5.5rem)" }}
              >
                Kontrollü Enerji.
                <br />
                <span
                  style={{
                    background: "linear-gradient(110deg, #14b8a6 0%, #5eead4 50%, #38bdf8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.1em",
                    display: "inline-block",
                  }}
                >
                  Görünür Sonuç.
                </span>
              </h1>

              <p className="text-[15px] text-foreground/45 leading-[1.85] mb-9 max-w-[440px]">
                NeoGen, azot gazını plazma enerjisine dönüştürerek cilt yüzeyini korurken
                retikular dermise kadar derin yenilenme sağlar. Tek sistemde sıkılaştırma,
                yenileme ve 12 aya uzanan kolajen rejenerasyonu.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-9">
                {["CE Mark", "FDA 510(k) K132754", "7 Onaylı Endikasyon", "Class IIb"].map((b) => (
                  <span
                    key={b}
                    className="text-[10px] font-medium tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border border-primary/22 text-primary/65 bg-primary/[0.04]"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:info@emcr.com.tr"
                  className="h-12 px-7 inline-flex items-center gap-2.5 text-[13.5px] font-semibold bg-primary text-[#07090f] rounded-xl hover:bg-primary/90 transition-all"
                  style={{ boxShadow: "0 0 32px rgba(20,184,166,0.28), 0 4px 16px rgba(0,0,0,0.3)" }}
                >
                  Demo Talep Et
                  <ArrowRight size={15} />
                </a>
                <Link
                  href="/teknik-destek"
                  className="h-12 px-7 inline-flex items-center gap-2 text-[13.5px] font-medium text-foreground/60 hover:text-foreground border border-white/[0.12] hover:border-white/20 rounded-xl hover:bg-white/[0.04] transition-all"
                >
                  Teknik Destek
                  <ChevronRight size={15} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070b17] to-transparent pointer-events-none z-20" />
      </section>

      {/* ── PSR TECHNOLOGY ───────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden bg-[#060a14]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 5% 50%, rgba(20,184,166,0.055) 0%, transparent 65%)",
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
                className="relative rounded-3xl overflow-hidden border border-white/[0.07]"
                style={{ aspectRatio: "1/1" }}
              >
                <img
                  src={TREATMENT_IMG}
                  alt="NeoGen Plasma Uygulama"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/60 via-transparent to-transparent" />
                {/* Label overlay */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <span
                    className="text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full border border-primary/30 bg-black/40 backdrop-blur-md text-primary"
                  >
                    Klinik Uygulama · NeoGen PSR
                  </span>
                </div>
              </div>
              {/* Floating stat card */}
              <div
                className="absolute -bottom-5 -right-5 p-5 rounded-2xl border border-white/[0.09] bg-[#060a14]/90 backdrop-blur-md"
                style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}
              >
                <p
                  className="font-display font-black leading-none mb-1"
                  style={{
                    fontSize: "2.4rem",
                    background: "linear-gradient(135deg, #14b8a6, #38bdf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  12<span className="text-[55%] ml-1">Ay</span>
                </p>
                <p className="text-[11px] text-foreground/40 tracking-wide">Kolajen Üretimi</p>
              </div>
            </motion.div>

            {/* Right: Technology text */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-primary/65 mb-6">
                Teknoloji
              </p>
              <h2
                className="font-display font-black leading-[0.94] tracking-[-0.02em] mb-7"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3.6rem)" }}
              >
                Nitrojen Plazma{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #14b8a6 0%, #38bdf8 100%)",
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

              <p className="text-[15px] text-foreground/45 leading-[1.85] mb-8">
                NeoGen, ultra yüksek radyo frekansıyla tüpten gelen medikal kalite azot gazını
                iyonize ederek nozulda nitrojen plazma oluşturur. Bu plazma, yüzeyi açmadan
                cildin tüm mimarisini ısıtır ve <strong className="text-foreground/70 font-semibold">15 milisaniyelik kontrollü darbelerle</strong>{" "}
                70–165°C arasında termal etki üretir.
              </p>

              {/* Key differentiator */}
              <div className="relative p-6 rounded-2xl border border-primary/18 bg-primary/[0.04] mb-8 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-primary/60 to-primary/20" />
                <p className="text-[14px] text-foreground/55 leading-[1.85] pl-2">
                  <span className="text-primary font-semibold">Kritik fark:</span>{" "}
                  Azot plazması belirli bir kromofor hedefine veya dalga boyuna bağlı değildir.
                  Penetrasyon derinliği cildin nem düzeyi ile yönetilir — bu sayede{" "}
                  <span className="text-foreground/80 font-medium">Fitzpatrick I'den VI'ya tüm cilt tonlarında</span>{" "}
                  güvenle kullanılır. Hipopiğmentasyon riski yoktur.
                </p>
              </div>

              {/* Mini feature pills */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Non-ablative yüzey koruma", detail: "Stratum corneum sağlam kalır" },
                  { label: "Tüm cilt tipleri", detail: "Fitzpatrick I–VI" },
                  { label: "Çift nabız teknolojisi", detail: "1.0–2.5 Hz tekrar hızı" },
                  { label: "Hızlı iyileşme", detail: "1–7 gün protokole göre" },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.035] transition-colors"
                  >
                    <p className="text-[13px] font-semibold text-foreground/75 mb-1">{f.label}</p>
                    <p className="text-[11.5px] text-foreground/35">{f.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3 MECHANISMS ─────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden bg-[#070b17]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 100%, rgba(20,184,166,0.05) 0%, transparent 65%)",
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
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-primary/65 mb-5">
                3 Temel Etki Mekanizması
              </p>
              <h2
                className="font-display font-black leading-[0.94] tracking-[-0.022em]"
                style={{ fontSize: "clamp(2rem, 3.8vw, 4rem)" }}
              >
                Tek Sistemde{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #14b8a6 0%, #38bdf8 100%)",
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
            <p className="text-[14px] text-foreground/35 max-w-xs leading-relaxed">
              NeoGen tek seansta sıkılaştırma, yüzey yenileme ve derin kolajen
              rejenerasyonunu eş zamanlı olarak gerçekleştirir.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-5">
            {mechanisms.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="group relative p-8 rounded-3xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.035] hover:border-primary/25 transition-all duration-400 overflow-hidden"
                >
                  {/* Teal top accent */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Number + icon row */}
                  <div className="flex items-center justify-between mb-7">
                    <span className="text-[12px] font-mono text-foreground/18 group-hover:text-primary/35 transition-colors">
                      {m.n}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-primary/[0.07] border border-primary/[0.12] flex items-center justify-center text-primary/65 group-hover:bg-primary/[0.12] group-hover:text-primary group-hover:border-primary/25 transition-all">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="font-display font-black text-[1.25rem] text-foreground/90 mb-1 group-hover:text-foreground transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-[9.5px] tracking-[0.2em] uppercase text-primary/40 mb-5 font-medium">
                    {m.subtitle}
                  </p>
                  <p className="text-[14px] text-foreground/50 leading-[1.85] mb-5">
                    {m.desc}
                  </p>
                  <p className="text-[13px] text-foreground/32 leading-[1.8] mb-7 italic">
                    {m.detail}
                  </p>

                  {/* Footer */}
                  <div className="border-t border-white/[0.06] pt-5 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] tracking-widest uppercase text-foreground/25 mb-1">İyileşme</p>
                      <p className="text-[13px] font-semibold text-primary/80">{m.downtime}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] tracking-widest uppercase text-foreground/25 mb-1">Sonuç</p>
                      <p className="text-[12px] text-foreground/45">{m.result}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CLINICAL STATS ───────────────────────────────────────── */}
      <section className="py-0 relative overflow-hidden bg-[#060a14]">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-white/[0.05]">
            {clinicalStats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.5}
                className="px-6 py-10 md:py-12 hover:bg-white/[0.015] transition-colors group"
              >
                <p
                  className="font-display font-black leading-none mb-2"
                  style={{
                    fontSize: "clamp(2rem, 3.2vw, 3rem)",
                    background: "linear-gradient(135deg, #14b8a6, #38bdf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                  {s.unit && <span className="text-[55%] ml-1 opacity-80">{s.unit}</span>}
                </p>
                <p className="text-[12px] text-foreground/38 leading-snug mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </section>

      {/* ── INDICATIONS + SPECS ──────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden bg-[#070b17]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 90% 20%, rgba(20,184,166,0.05) 0%, transparent 65%)",
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
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-primary/65 mb-6">
                Endikasyonlar
              </p>
              <h2
                className="font-display font-black leading-[0.94] tracking-[-0.022em] mb-4"
                style={{ fontSize: "clamp(2rem, 3.2vw, 3.2rem)" }}
              >
                Hangi Durumlarda{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #14b8a6 0%, #38bdf8 100%)",
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
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex items-center gap-1.5 text-[12px] text-foreground/40">
                  <span className="w-2 h-2 rounded-full bg-primary/60 inline-block" />
                  FDA 510(k) onaylı
                </span>
                <span className="text-foreground/15">·</span>
                <span className="text-[12px] text-foreground/30">7 / 10 endikasyon FDA onaylı</span>
              </div>

              <div className="space-y-0">
                {indications.map((ind, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i * 0.4}
                    className="flex items-center gap-4 py-3.5 border-b border-white/[0.05] group hover:border-primary/18 transition-colors"
                  >
                    <ChevronRight size={13} className="text-primary/50 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-[14px] text-foreground/60 group-hover:text-foreground/82 transition-colors flex-1 leading-snug">
                      {ind.label}
                    </span>
                    {ind.fda ? (
                      <span className="text-[9px] tracking-[0.15em] font-semibold text-primary/65 border border-primary/25 rounded-full px-2.5 py-1 flex-shrink-0 bg-primary/[0.06]">
                        FDA
                      </span>
                    ) : (
                      <span className="text-[9px] tracking-[0.12em] text-foreground/22 flex-shrink-0 w-10" />
                    )}
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
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-primary/65 mb-6">
                Teknik Özellikler
              </p>
              <h2
                className="font-display font-black leading-[0.94] tracking-[-0.022em] mb-10"
                style={{ fontSize: "clamp(2rem, 3.2vw, 3.2rem)" }}
              >
                NeoGen{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #14b8a6 0%, #38bdf8 100%)",
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

              <div className="rounded-2xl border border-white/[0.07] overflow-hidden bg-white/[0.015]">
                {specs.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 px-6 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.025] transition-colors group"
                  >
                    <span className="text-[10px] tracking-[0.18em] uppercase text-primary/40 w-32 flex-shrink-0 font-medium">
                      {s.label}
                    </span>
                    <span className="text-[13.5px] text-foreground/58 group-hover:text-foreground/78 transition-colors">
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
                      Türkiye Yetkili Distribütörü
                    </p>
                    <p className="text-[13px] text-foreground/42 leading-[1.8]">
                      EMCR Medikal Teknolojiler, NeoGen Plasma'nın Türkiye yetkili distribütörüdür.
                      Kurulum, sertifikalı eğitim ve tam teknik servis güvencesiyle teslim edilmektedir.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DEMO VIDEO ───────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden bg-[#060a14]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(20,184,166,0.05) 0%, transparent 65%)",
          }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-primary/65 mb-4">Canlı Uygulama</p>
            <h2
              className="font-display font-black leading-[0.94] tracking-[-0.022em]"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
            >
              NeoGen Plasma{" "}
              <span
                style={{
                  background: "linear-gradient(110deg, #14b8a6 0%, #38bdf8 100%)",
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
            className="relative rounded-3xl overflow-hidden border border-white/[0.07] bg-black max-w-4xl mx-auto"
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
                className={`w-16 h-16 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50 group-hover:bg-primary/10 ${videoPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}
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
      <section className="py-24 bg-[#070b17] relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.04) 0%, transparent 65%)" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-primary/65 mb-4">
                Klinik Kanıt
              </p>
              <h2
                className="font-display font-black leading-[0.94] tracking-[-0.022em]"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
              >
                Gerçek{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #14b8a6 0%, #38bdf8 100%)",
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
                    className="w-10 h-10 rounded-full border border-white/10 hover:border-primary/40 hover:bg-white/[0.04] flex items-center justify-center transition-all"
                  >
                    <ChevronRight size={16} className={`text-foreground/45 ${dir === -1 ? "rotate-180" : ""}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden mb-4 border border-white/[0.05]" style={{ aspectRatio: "21/9" }}>
            {patients.map((p, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ opacity: activePatient === i ? 1 : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <img src={p.img} alt={`Hasta ${i + 1}`} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b17]/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#070b17]/25 via-transparent to-[#070b17]/25" />
              </motion.div>
            ))}
            <div className="absolute top-5 left-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-foreground/65">ÖNCE</span>
            </div>
            <div className="absolute top-5 right-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary">SONRA</span>
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10 z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex items-end justify-between">
              <p className="text-[10px] tracking-[0.25em] uppercase text-primary/70">
                NeoGen Plasma · {patients[activePatient].label}
              </p>
              <div className="font-display font-black text-6xl text-white/[0.04] select-none leading-none tabular-nums">
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
                    ? "ring-2 ring-primary/60 ring-offset-1 ring-offset-[#070b17]"
                    : "opacity-45 hover:opacity-70"
                }`}
              >
                <img src={p.img} alt={`${i + 1}`} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 transition-all ${activePatient === i ? "bg-primary/10" : "bg-black/25"}`} />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-bold tracking-widest text-foreground/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden bg-[#060a14]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(20,184,166,0.07) 0%, transparent 65%)",
          }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-primary/65 mb-6">
              Sıradaki Adım
            </p>
            <h2
              className="font-display font-black leading-[0.94] tracking-[-0.022em] mb-6"
              style={{ fontSize: "clamp(2.2rem, 4vw, 4.5rem)" }}
            >
              Kliniğiniz İçin{" "}
              <span
                style={{
                  background: "linear-gradient(110deg, #14b8a6 0%, #38bdf8 100%)",
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
            <p className="text-[15px] text-foreground/40 max-w-lg mx-auto mb-11 leading-[1.85]">
              NeoGen Plasma'yı kliniğinizde deneyimlemek için bizimle iletişime geçin.
              Yetkili uzmanlarımız size özel sunum ve teklif hazırlasın.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:info@emcr.com.tr"
                className="h-13 px-9 inline-flex items-center gap-2.5 text-[14px] font-semibold bg-primary text-[#07090f] rounded-xl hover:bg-primary/90 transition-all"
                style={{ boxShadow: "0 0 40px rgba(20,184,166,0.28), 0 4px 20px rgba(0,0,0,0.35)" }}
              >
                Demo Talep Et
                <ArrowRight size={15} />
              </a>
              <Link
                href="/teknik-destek"
                className="h-13 px-9 inline-flex items-center gap-2 text-[14px] font-medium text-foreground/60 hover:text-foreground border border-white/[0.13] hover:border-white/22 rounded-xl hover:bg-white/[0.04] transition-all"
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

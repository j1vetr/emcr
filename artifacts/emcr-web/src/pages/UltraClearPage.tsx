import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, ShieldCheck, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ucDeviceImg from "@assets/ultraclear-device.webp";
import ucTreatment2 from "@assets/ultraclear-treatment2.png";
import ucTreatment3 from "@assets/ultraclear-treatment3.png";
import ucRef1 from "@assets/ref1_1781871404352.jpg";
import ucRef2 from "@assets/ref2_1781871404353.jpg";
import ucRef3 from "@assets/ref3_1781871404353.jpg";
import ucRef4 from "@assets/ref4_1781871404353.jpg";
import ucRef5 from "@assets/ref5_1781871404354.jpg";
import ucRef6 from "@assets/ref6_1781871404354.jpg";

const ucPatients = [
  { img: ucRef1, label: "Cilt Tonu Düzeltme" },
  { img: ucRef2, label: "Rosacea · Kızarıklık" },
  { img: ucRef3, label: "Cilt Yenileme · Sıkılaştırma" },
  { img: ucRef4, label: "Pigmentasyon · Leke" },
  { img: ucRef5, label: "Gözenek Ve Doku" },
  { img: ucRef6, label: "Akne İzleri" },
];

const indications = [
  "İnce Çizgiler Ve Kırışıklıklar",
  "Cilt Laksitesi Ve Sarkma",
  "Akne İzleri Ve Skar",
  "Güneş Hasarı Ve Pigmentasyon",
  "Doku Ve Ton Düzensizliği",
  "Gözenek Sıkılaştırma",
  "Melazma",
  "Göz Kapağı ve Tedavisi",
  "Genel Cilt Kalitesi İyileştirme",
];

const specs = [
  { label: "Dalga Boyu", value: "2910 nm (Erbiyum Florür Cam Fiber)" },
  { label: "Platform", value: "Cold Fiber Laser" },
  { label: "Nabız", value: "3DIntelliPulse® / Ablasyon ve Koagülasyon Optimizasyonu" },
  { label: "Tedavi Modu", value: "Ablative" },
  { label: "Cilt Tipi", value: "Fitzpatrick I–VI Tüm Tipler" },
  { label: "Üretici", value: "Acclaro Medical Corporation, Smithfield RI, ABD" },
  { label: "İyileşme", value: "0–7 gün (moda göre)" },
];

const modes = [
  {
    id: "clear",
    name: "Clear",
    group: "ablative",
    depth: "Stratum Corneum",
    desc: "Yüzeysel pigmentasyon ve vasküler diskromi için hafif ablasyon.",
    tags: ["Pigmentasyon", "Vasküler diskromi", "Güneş lekeleri", "Cilt tonu"],
  },
  {
    id: "clearplus",
    name: "Clear+",
    group: "ablative",
    depth: "Epidermis",
    desc: "Epidermal lezyonlar ve cilt yüzeyi dokusu için optimize yenileme.",
    tags: ["Yaşlılık lekeleri", "İnce çizgiler", "Cilt dokusu"],
  },
  {
    id: "ultra",
    name: "Ultra",
    group: "ablative",
    depth: "Deri + Dermis",
    desc: "Derin kolajen yenilemesi için dermise ulaşan güçlü ablasyon.",
    tags: ["Kolajen yenilemesi", "Kırışıklık ve çizgiler", "Akne izleri"],
  },
  {
    id: "ultraclear",
    name: "UltraClear",
    group: "ablative",
    depth: "Yüzeysel + Derin",
    desc: "Tek geçişte hem yüzeysel hem derin doku yenilemeyi birleştirir.",
    tags: ["Kolajen yenilemesi", "Kırışıklık ve çizgiler", "Yara ve akne izleri"],
  },
  {
    id: "lasercoring",
    name: "Laser-Coring™",
    group: "coring",
    depth: "Dermis",
    desc: "Mikro kanallar açarak derin doku karotlaması ve kolajen stimülasyonu.",
    tags: ["Kolajen yenilemesi", "Derin kırışıklıklar"],
  },
  {
    id: "surgical",
    name: "Surgical",
    group: "surgical",
    depth: "Hassas Kesim",
    desc: "Lazer yoluyla göz kapağı dahil çok şekilli hassas cerrahi kesim.",
    tags: ["Blefaroplasti", "Göz kapağı"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function UltraClearPage() {
  const [activePatient, setActivePatient] = useState(0);

  return (
    <div className="min-h-screen bg-[#F0F6FC] text-foreground font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden flex items-center" style={{ background: "#F0F6FC" }}>
        {/* Atmospheric glow — azure top right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 78% 28%, rgba(43,143,208,0.10) 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 82% 60%, rgba(43,143,208,0.05) 0%, transparent 55%)",
          }}
        />

        {/* Device image — right panel */}
        <div className="absolute right-0 top-0 bottom-0 w-[52%] pointer-events-none overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-72 z-10 bg-gradient-to-r from-[#F0F6FC] to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-40 z-10 bg-gradient-to-t from-[#F0F6FC] to-transparent" />
          <div className="absolute top-0 inset-x-0 h-32 z-10 bg-gradient-to-b from-[#F0F6FC] to-transparent" />
          {/* Azure orb behind device */}
          <div
            className="absolute z-0"
            style={{
              right: "8%", top: "15%", width: "380px", height: "380px",
              background: "radial-gradient(circle, rgba(43,143,208,0.09) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          <img
            src={ucDeviceImg}
            alt="UltraClear 2910nm Cihazı"
            className="relative z-[5] w-full h-full object-contain object-center"
            style={{ filter: "drop-shadow(0 30px 80px rgba(16,36,59,0.212))" }}
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Left content */}
        <div
          className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14"
          style={{ paddingTop: "clamp(100px, 12vh, 150px)", paddingBottom: "clamp(80px, 10vh, 120px)" }}
        >
          <div className="max-w-[540px]">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-6 bg-sky-600/60" />
                <span className="text-[10.5px] font-medium tracking-[0.28em] uppercase text-sky-600/70" lang="en">
                  2910 nm · Cold Fiber Laser · 3DMIRACL®
                </span>
              </div>

              {/* Brand name */}
              <h1
                className="font-display font-black tracking-[-0.03em] leading-[0.88] mb-5"
                style={{ fontSize: "clamp(3.5rem, 7vw, 7.5rem)" }}
              >
                <span
                  style={{
                    background: "linear-gradient(125deg, #1C6FA8 0%, #2B8FD0 40%, #4A6FC9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.1em",
                    display: "inline-block",
                  }}
                >
                  Ultra
                </span>
                <span className="text-foreground/90">Clear</span>
                <span className="text-sky-600/70 text-[45%] align-super ml-1">®</span>
              </h1>

              {/* Sub-headline */}
              <p
                className="font-display font-light text-[#607084] leading-[1.3] mb-8"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.65rem)" }}
              >
                Dünyanın İlk<br />
                <span className="text-foreground/65 font-normal">2910 nm Cold Fiber Laser.</span>
              </p>

              <p className="text-[15px] text-[#607084] leading-[1.9] mb-9 max-w-[420px]">
                3DMIRACL® platformuyla çalışan UltraClear, suyun maksimum absorpsiyon noktasında
                çalışarak Fitzpatrick I'den VI'ya tüm cilt tiplerine güvenle uygulanabilen
                devrimsel fiber lazer sistemidir.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:info@emcr.com.tr"
                  className="h-12 px-7 inline-flex items-center gap-2.5 text-[13.5px] font-semibold rounded-xl transition-all text-[#10243B]"
                  style={{
                    background: "#24B8BD",
                    boxShadow: "0 0 32px rgba(43,143,208,0.25), 0 4px 16px rgba(16,36,59,0.087)",
                  }}
                >
                  Bilgi Al
                  <ArrowRight size={15} />
                </a>
                <Link
                  href="/teknik-destek"
                  className="h-12 px-7 inline-flex items-center gap-2 text-[13.5px] font-medium text-[#607084] hover:text-foreground border border-[#D9E6EF] hover:border-[#D9E6EF] rounded-xl hover:bg-[#E5F0F8] transition-all"
                >
                  Teknik Destek
                  <ChevronRight size={15} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F0F6FC] to-transparent pointer-events-none z-20" />
      </section>

      {/* ── 2910 nm — THE TECHNOLOGY MOMENT ─────────────────────── */}
      <section className="py-0 relative overflow-hidden" style={{ background: "#F0F6FC" }}>
        <div className="grid md:grid-cols-[1fr_45%]">

          {/* Left: giant 2910 editorial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative px-6 md:px-14 py-24 lg:py-32 flex flex-col justify-center"
          >
            {/* Giant number — decorative */}
            <div
              className="absolute right-0 top-0 bottom-0 select-none pointer-events-none flex items-center"
              aria-hidden
            >
              <span
                className="font-display font-black leading-none"
                style={{
                  fontSize: "clamp(180px, 22vw, 280px)",
                  background: "linear-gradient(to bottom, rgba(43,143,208,0.06) 0%, rgba(43,143,208,0.01) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.05em",
                }}
              >
                2910
              </span>
            </div>

            <div className="relative z-10 max-w-[500px]">
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-sky-600/65 mb-6">
                Neden 2910 nm?
              </p>
              <h2
                className="font-display font-black leading-[0.93] tracking-[-0.025em] mb-8"
                style={{ fontSize: "clamp(2.2rem, 3.8vw, 4rem)" }}
              >
                Suyun Zirve{" "}
                <br />
                <span
                  style={{
                    background: "linear-gradient(110deg, #24B8BD 0%, #2B8FD0 50%, #4A6FC9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.1em",
                    display: "inline-block",
                  }}
                >
                  Absorpsiyon Noktası
                </span>
              </h2>

              <p className="text-[15px] text-[#607084] leading-[1.88] mb-7">
                2910 nm, suyun en yüksek absorpsiyon gösterdiği dalga boyudur. Cilt dokusu büyük oranda
                sudan oluştuğu için bu dalga boyu doku ile{" "}
                <span className="text-foreground/72 font-semibold">maksimum etkileşim</span> sağlar.
                Hem ablasyon hem koagülasyon enerjisi optimize edilir, kollateral ısıl hasar minimumda tutulur.
              </p>

              {/* Technology note */}
              <div className="relative p-6 rounded-2xl border border-sky-600/16 bg-sky-600/[0.04] overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                  style={{ background: "linear-gradient(to bottom, #2B8FD0, #4A6FC9)" }}
                />
                <p className="text-[13.5px] text-[#607084] leading-[1.85] pl-2">
                  2910 nm dalga boyu, Erbiyum florür cam fiber teknolojisiyle üretilir. Bu dalga boyunda
                  hem ablasyon hem koagülasyon enerjisi{" "}
                  <span className="text-foreground/75 font-medium">bağımsız olarak optimize</span> edilebilir.
                  3DIntelliPulse® nabız yönetimi kollateral ısıl etkiyi sınırlı tutar.
                </p>
              </div>

              {/* Mini specs */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { v: "3DMIRACL®", l: "Platform" },
                  { v: "I–VI", l: "Fitzpatrick" },
                  { v: "0–7", l: "Gün İyileşme" },
                ].map((s, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[#D9E6EF] bg-white/80 text-center">
                    <p className="text-[13px] font-bold text-sky-600/80 mb-1">{s.v}</p>
                    <p className="text-[10.5px] text-[#607084]">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: treatment image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden min-h-[520px]"
          >
            <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#F0F6FC] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-28 z-10 bg-gradient-to-t from-[#F0F6FC] to-transparent" />
            <img
              src={ucTreatment2}
              alt="UltraClear Klinik Uygulama"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            {/* Overlay label */}
            <div className="absolute bottom-8 right-6 z-20">
              <span className="text-[9.5px] font-medium tracking-[0.24em] uppercase px-3 py-1.5 rounded-full border border-sky-600/30 bg-white/75 backdrop-blur-md text-sky-600/80">
                Klinik Uygulama
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6 MOD ────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden" style={{ background: "#F0F6FC" }}>
        {/* Subtle atmospheric glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(43,143,208,0.055) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-sky-600/60 mb-4">
              3DMIRACL® Platform
            </p>
            <h2
              className="font-display font-black leading-[0.95] tracking-[-0.025em] mb-5"
              style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.8rem)" }}
            >
              6 Mod.{" "}
              <span
                style={{
                  background: "linear-gradient(110deg, #24B8BD 0%, #2B8FD0 55%, #4A6FC9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Tek Başlık.
              </span>
            </h2>
            <p className="text-[15px] text-[#607084] max-w-lg mx-auto leading-relaxed">
              Sabit kol yok, sarf yok. Aynı sistem üzerinde altı farklı uygulama protokolü.
            </p>
          </motion.div>

          {/* Mode cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {modes.map((m, i) => (
              <motion.div
                key={m.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative flex flex-col rounded-2xl border overflow-hidden"
                style={{
                  background:
                    m.group === "surgical"
                      ? "linear-gradient(160deg, rgba(74,111,201,0.07) 0%, rgba(58,95,184,0.03) 100%)"
                      : m.group === "coring"
                      ? "linear-gradient(160deg, rgba(43,143,208,0.07) 0%, rgba(43,143,208,0.03) 100%)"
                      : "rgba(43,143,208,0.035)",
                  borderColor:
                    m.group === "surgical"
                      ? "rgba(74,111,201,0.14)"
                      : m.group === "coring"
                      ? "rgba(43,143,208,0.18)"
                      : "rgba(43,143,208,0.10)",
                }}
              >
                {/* Top accent line */}
                <div
                  className="h-[2px] w-full"
                  style={{
                    background:
                      m.group === "surgical"
                        ? "linear-gradient(90deg, #4A6FC9 0%, #3A5FB8 100%)"
                        : m.group === "coring"
                        ? "linear-gradient(90deg, #2B8FD0 0%, #24B8BD 100%)"
                        : "linear-gradient(90deg, rgba(43,143,208,0.4) 0%, rgba(125,211,252,0.6) 100%)",
                  }}
                />

                <div className="flex flex-col flex-1 p-5">
                  {/* Mode name */}
                  <p
                    className="font-display font-black text-[1.05rem] leading-tight mb-1"
                    style={{
                      color:
                        m.group === "surgical"
                          ? "#4A6FC9"
                          : "#24B8BD",
                    }}
                  >
                    {m.name}
                  </p>

                  {/* Depth label */}
                  <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#607084] mb-4">
                    {m.depth}
                  </p>

                  {/* Description */}
                  <p className="text-[12px] text-[#607084] leading-[1.7] mb-5 flex-1">
                    {m.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-col gap-1.5">
                    {m.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10.5px] text-[#607084] leading-snug flex items-start gap-1.5"
                      >
                        <span
                          className="mt-[5px] shrink-0 w-1 h-1 rounded-full"
                          style={{
                            background:
                              m.group === "surgical"
                                ? "#4A6FC9"
                                : "#2B8FD0",
                            opacity: 0.55,
                          }}
                        />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Group label at bottom */}
                <div
                  className="px-5 py-2.5 text-[9.5px] font-semibold tracking-[0.18em] uppercase border-t"
                  style={{
                    borderColor:
                      m.group === "surgical"
                        ? "rgba(74,111,201,0.12)"
                        : m.group === "coring"
                        ? "rgba(43,143,208,0.14)"
                        : "rgba(43,143,208,0.08)",
                    color:
                      m.group === "surgical"
                        ? "rgba(165,180,252,0.5)"
                        : m.group === "coring"
                        ? "rgba(43,143,208,0.5)"
                        : "rgba(43,143,208,0.35)",
                  }}
                >
                  {m.group === "surgical"
                    ? "Surgical Mod"
                    : m.group === "coring"
                    ? "Laser-Coring™ Mod"
                    : "Fraksiyonel Ablatif"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IN ACTION — treatment3 full-width editorial ───────────── */}
      <section className="relative overflow-hidden" style={{ background: "#F0F6FC" }}>
        <div className="grid md:grid-cols-2">

          {/* Left image panel */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative overflow-hidden"
            style={{ minHeight: "520px" }}
          >
            <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-[#F0F6FC] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 z-10 bg-gradient-to-t from-[#F0F6FC] to-transparent" />
            <img
              src={ucTreatment3}
              alt="UltraClear Sistem Uygulaması"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              style={{ objectPosition: "center 30%" }}
            />
            <div className="absolute top-6 left-6 z-20">
              <span className="text-[9.5px] font-medium tracking-[0.24em] uppercase px-3 py-1.5 rounded-full border border-sky-600/30 bg-white/75 backdrop-blur-md text-sky-600/80">
                3DMIRACL® Platform
              </span>
            </div>
          </motion.div>

          {/* Right text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center px-10 md:px-14 lg:px-20 py-20"
          >
            <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-sky-600/65 mb-6">
              3DMIRACL® Platform
            </p>
            <h2
              className="font-display font-black leading-[0.93] tracking-[-0.025em] mb-7"
              style={{ fontSize: "clamp(2rem, 3.2vw, 3.2rem)" }}
            >
              Cold Fiber{" "}
              <span
                style={{
                  background: "linear-gradient(110deg, #24B8BD 0%, #2B8FD0 55%, #4A6FC9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingBottom: "0.1em",
                  display: "inline-block",
                }}
              >
                Laser
              </span>
            </h2>
            <p className="text-[15px] text-[#607084] leading-[1.88] mb-8">
              UltraClear'ın 2910 nm dalga boyu cold fiber laser
              mimarisiyle sunulur. 3DIntelliPulse® teknolojisi ablasyon ve koagülasyon
              enerjisini bağımsız olarak optimize ederek farklı cilt tiplerinde kontrollü
              uygulama imkanı sağlar.
            </p>

            <ul className="space-y-4">
              {[
                { title: "Tüm Cilt Tipleri" },
                { title: "Protokol Esnekliği" },
                { title: "Kontrollü Enerji Sunumu" },
                { title: "Geniş Endikasyon Aralığı" },
              ].map((f, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.4}
                  className="flex items-start gap-3.5"
                >
                  <div className="mt-[7px] w-1.5 h-1.5 rounded-full bg-sky-600/65 flex-shrink-0" />
                  <div>
                    <p className="text-[14px] font-semibold text-foreground/78">{f.title}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── INDICATIONS + SPECS ──────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#F0F6FC" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 45% at 10% 50%, rgba(43,143,208,0.045) 0%, transparent 65%)" }}
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
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-sky-600/65 mb-6">
                Endikasyonlar
              </p>
              <h2
                className="font-display font-black leading-[0.93] tracking-[-0.025em] mb-8"
                style={{ fontSize: "clamp(2rem, 3.2vw, 3.2rem)" }}
              >
                Hangi Durumlarda{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #24B8BD 0%, #2B8FD0 55%, #4A6FC9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.1em",
                    display: "inline-block",
                  }}
                >
                  Kullanılır?
                </span>
              </h2>

              {/* Magazine-style 2-col indication list */}
              <div className="grid grid-cols-1 gap-0">
                {indications.map((ind, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i * 0.35}
                    className="flex items-center gap-4 py-3.5 border-b border-[#D9E6EF] group hover:border-sky-600/18 transition-colors"
                  >
                    <span className="text-[10px] font-mono text-sky-600/25 w-5 flex-shrink-0 group-hover:text-sky-600/50 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ChevronRight size={12} className="text-sky-600/40 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-[14px] text-[#607084] group-hover:text-foreground/80 transition-colors leading-snug">
                      {ind}
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
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-sky-600/65 mb-6">
                Teknik Özellikler
              </p>
              <h2
                className="font-display font-black leading-[0.93] tracking-[-0.025em] mb-10"
                style={{ fontSize: "clamp(2rem, 3.2vw, 3.2rem)" }}
              >
                UltraClear{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #24B8BD 0%, #2B8FD0 55%, #4A6FC9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.1em",
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
                    className="flex items-start gap-5 px-6 py-3.5 border-b border-[#D9E6EF] last:border-0 hover:bg-sky-600/[0.02] transition-colors group"
                  >
                    <span className="text-[10px] tracking-[0.16em] uppercase text-sky-600/38 w-28 flex-shrink-0 font-medium pt-0.5">
                      {s.label}
                    </span>
                    <span className="text-[13.5px] text-[#607084] group-hover:text-foreground/78 transition-colors leading-relaxed">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 rounded-2xl border border-sky-600/16 bg-sky-600/[0.04] relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(43,143,208,0.3), transparent)" }}
                />
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[13.5px] text-foreground/90 mb-2">Türkiye Tek Yetkili Distribütörü</p>
                    <p className="text-[13px] text-[#607084] leading-[1.8]">
                      EMCR Medikal Teknolojiler, UltraClear'ın Türkiye tek yetkili distribütörüdür.
                      Kurulum, eğitim ve teknik servis hizmetleri kapsamlıdır.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ───────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#F0F6FC" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-sky-600/65 mb-4">Uygulama Sonuçları</p>
              <h2
                className="font-display font-black leading-[0.93] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
              >
                Gerçek{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #24B8BD 0%, #2B8FD0 55%, #4A6FC9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.1em",
                    display: "inline-block",
                  }}
                >
                  Sonuçlar.
                </span>
              </h2>
            </motion.div>
            <div className="hidden md:flex items-center gap-5">
              <span className="font-display text-5xl font-black tabular-nums text-foreground/10">
                {String(activePatient + 1).padStart(2, "0")}
                <span className="text-2xl text-foreground/6 mx-1">/</span>06
              </span>
              <div className="flex gap-2">
                {([-1, 1] as const).map((dir, di) => (
                  <button
                    key={di}
                    onClick={() => setActivePatient((p) => (p + dir + ucPatients.length) % ucPatients.length)}
                    className="w-10 h-10 rounded-full border border-[#D9E6EF] hover:border-sky-600/40 hover:bg-sky-600/[0.05] flex items-center justify-center transition-all"
                  >
                    <ChevronRight size={16} className={`text-[#607084] ${dir === -1 ? "rotate-180" : ""}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden mb-4 border border-[#D9E6EF]" style={{ aspectRatio: "21/9" }}>
            {ucPatients.map((p, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ opacity: activePatient === i ? 1 : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <img src={p.img} alt={`Hasta ${i + 1}`} className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </motion.div>
            ))}
            <div className="absolute top-5 left-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-[#D9E6EF] text-foreground/65">ÖNCE</span>
            </div>
            <div className="absolute top-5 right-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-sky-600/20 backdrop-blur-md border border-sky-600/30 text-sky-600">SONRA</span>
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/80 z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex items-end justify-between">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white">
                UltraClear® · {ucPatients[activePatient].label}
              </p>
              <div className="font-display font-black text-6xl text-[#10243B]/[0.04] select-none leading-none tabular-nums">
                {String(activePatient + 1).padStart(2, "0")}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {ucPatients.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePatient(i)}
                className={`relative rounded-xl overflow-hidden aspect-video transition-all duration-300 group ${
                  activePatient === i ? "ring-2 ring-sky-600/55 ring-offset-1 ring-offset-[#F0F6FC]" : "opacity-45 hover:opacity-70"
                }`}
              >
                <img src={p.img} alt={`${i + 1}`} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                <div className={`absolute inset-0 transition-all ${activePatient === i ? "bg-black/10" : "bg-black/35"}`} />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-bold tracking-widest text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#F0F6FC" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(43,143,208,0.07) 0%, transparent 65%)" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-sky-600/65 mb-6">
              Sıradaki Adım
            </p>
            <h2
              className="font-display font-black leading-[0.93] tracking-[-0.025em] mb-7"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 5rem)" }}
            >
              Kliniğinizde{" "}
              <span
                style={{
                  background: "linear-gradient(125deg, #1C6FA8 0%, #2B8FD0 45%, #4A6FC9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingBottom: "0.1em",
                  display: "inline-block",
                }}
              >
                Deneyimleyin
              </span>
            </h2>
            <p className="text-[15px] text-[#607084] max-w-lg mx-auto mb-11 leading-[1.88]">
              UltraClear'ı kliniğinizde keşfetmek için bizimle iletişime geçin.
              Uzmanlarımız size özel demo ve teklif hazırlasın.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:info@emcr.com.tr"
                className="h-12 px-8 inline-flex items-center gap-2.5 text-[14px] font-semibold rounded-xl transition-all text-[#10243B]"
                style={{
                  background: "#24B8BD",
                  boxShadow: "0 0 40px rgba(43,143,208,0.22), 0 4px 20px rgba(16,36,59,0.087)",
                }}
              >
                Demo Talep Et
                <ArrowRight size={15} />
              </a>
              <Link
                href="/teknik-destek"
                className="h-12 px-8 inline-flex items-center gap-2 text-[14px] font-medium text-[#607084] hover:text-foreground border border-[#D9E6EF] hover:border-[#D9E6EF] rounded-xl hover:bg-[#E5F0F8] transition-all"
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

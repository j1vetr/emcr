import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, ShieldCheck, Award, ArrowRight } from "lucide-react";
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

const awards = [
  { pub: "NewBeauty", award: "Beauty Choice Award", cat: "Best Laser Resurfacing", year: "2025" },
  { pub: "Allure", award: "Best of Beauty", cat: "Best In-Office Treatment", year: "2025" },
  { pub: "Harper's Bazaar", award: "Anti-Aging Award", cat: "Best Skin Resurfacing Innovation", year: "2025" },
];

const modes = [
  {
    n: "01", title: "Non-Ablative", downtime: "0 gün",
    desc: "Sıfır iyileşme süresi. Kolajen stimülasyonu, cilt tonu iyileştirme ve genel parlaklık artışı. Sosyal hayata aynı gün dönüş.",
    detail: "3DIntelliPulse® teknolojisi ablasyon enerjisini kontrollü şekilde sunarken kollateral ısıl hasarı minimumda tutar.",
    tag: "Sıfır Downtime",
  },
  {
    n: "02", title: "Micro-Ablative", downtime: "1–3 gün",
    desc: "Orta seviye yenileme. İnce çizgiler, doku düzensizliği ve pigmentasyon sorunlarında etkin, kısa iyileşmeli tedavi.",
    detail: "2910 nm dalga boyu su ile maksimum etkileşim sağlar. Bu Erbiyum lazerler içindeki en yüksek su absorpsiyon noktasıdır.",
    tag: "Dengeli Protokol",
  },
  {
    n: "03", title: "Ablative", downtime: "5–7 gün",
    desc: "Kapsamlı cilt yenilemesi. Derin kırışıklıklar, belirgin akne izleri ve ciddi fotohasar vakalarında tam ablative yenileme.",
    detail: "CO₂ lazere eşdeğer klinik sonuç, ancak belirgin şekilde daha az downtime, risk ve tedavi sonrası komplikasyon.",
    tag: "Maksimum Etki",
  },
];

const indications = [
  "İnce Çizgiler Ve Kırışıklıklar",
  "Cilt Laksitesi Ve Sarkma",
  "Akne İzleri Ve Skar",
  "Güneş Hasarı Ve Pigmentasyon",
  "Doku Ve Ton Düzensizliği",
  "Gözenek Sıkılaştırma",
  "Melazma Tedavisi",
  "Rosacea Ve Vasküler Lezyonlar",
  "Genel Cilt Kalitesi İyileştirme",
];

const specs = [
  { label: "Dalga Boyu", value: "2910 nm (Erbiyum Florür Cam Fiber)" },
  { label: "Platform", value: "3DMIRACL® Cold Fiber Laser" },
  { label: "Nabız", value: "3DIntelliPulse® — Ablasyon & Koagülasyon Optimizasyonu" },
  { label: "Tedavi Modu", value: "Non-Ablative / Micro-Ablative / Ablative" },
  { label: "Cilt Tipi", value: "Fitzpatrick I–VI Tüm Tipler" },
  { label: "Üretici", value: "Acclaro Medical Corporation, Smithfield RI, ABD" },
  { label: "Kuruluş", value: "2018" },
  { label: "İyileşme", value: "0–7 gün (moda göre)" },
  { label: "Onay", value: "CE Mark · FDA Clearance" },
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
  const [openMode, setOpenMode] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#04080d] text-foreground font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden flex items-center" style={{ background: "#04080d" }}>
        {/* Atmospheric glow — azure top right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 78% 28%, rgba(56,189,248,0.10) 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 82% 60%, rgba(99,179,237,0.05) 0%, transparent 55%)",
          }}
        />

        {/* Device image — right panel */}
        <div className="absolute right-0 top-0 bottom-0 w-[52%] pointer-events-none overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-72 z-10 bg-gradient-to-r from-[#04080d] to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-40 z-10 bg-gradient-to-t from-[#04080d] to-transparent" />
          <div className="absolute top-0 inset-x-0 h-32 z-10 bg-gradient-to-b from-[#04080d] to-transparent" />
          {/* Azure orb behind device */}
          <div
            className="absolute z-0"
            style={{
              right: "8%", top: "15%", width: "380px", height: "380px",
              background: "radial-gradient(circle, rgba(56,189,248,0.09) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          <img
            src={ucDeviceImg}
            alt="UltraClear 2910nm Cihazı"
            className="relative z-[5] w-full h-full object-contain object-center"
            style={{ filter: "drop-shadow(0 30px 80px rgba(0,0,0,0.85))" }}
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
                <div className="h-px w-6 bg-sky-400/60" />
                <span className="text-[10.5px] font-medium tracking-[0.28em] uppercase text-sky-400/70">
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
                    background: "linear-gradient(125deg, #bae6fd 0%, #38bdf8 40%, #818cf8 100%)",
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
                <span className="text-sky-400/70 text-[45%] align-super ml-1">®</span>
              </h1>

              {/* Sub-headline */}
              <p
                className="font-display font-light text-foreground/45 leading-[1.3] mb-8"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.65rem)" }}
              >
                Dünyanın İlk<br />
                <span className="text-foreground/65 font-normal">2910 nm Cold Fiber Laser.</span>
              </p>

              <p className="text-[15px] text-foreground/42 leading-[1.9] mb-9 max-w-[420px]">
                3DMIRACL® platformuyla çalışan UltraClear, suyun maksimum absorpsiyon noktasında
                çalışarak Fitzpatrick I'den VI'ya tüm cilt tiplerine güvenle uygulanabilen
                devrimsel fiber lazer sistemidir.
              </p>

              {/* Award mini-badges */}
              <div className="flex flex-wrap gap-2 mb-9">
                {awards.map((a) => (
                  <span
                    key={a.pub}
                    className="inline-flex items-center gap-1.5 text-[9.5px] tracking-[0.14em] font-medium uppercase px-3 py-1.5 rounded-full border border-sky-400/20 text-sky-400/60 bg-sky-400/[0.04]"
                  >
                    <Award size={8} className="flex-shrink-0" />
                    {a.pub} {a.year}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:info@emcr.com.tr"
                  className="h-12 px-7 inline-flex items-center gap-2.5 text-[13.5px] font-semibold rounded-xl transition-all text-[#04080d]"
                  style={{
                    background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                    boxShadow: "0 0 32px rgba(56,189,248,0.25), 0 4px 16px rgba(0,0,0,0.35)",
                  }}
                >
                  Bilgi Al
                  <ArrowRight size={15} />
                </a>
                <Link
                  href="/teknik-destek"
                  className="h-12 px-7 inline-flex items-center gap-2 text-[13.5px] font-medium text-foreground/55 hover:text-foreground border border-white/[0.11] hover:border-white/20 rounded-xl hover:bg-white/[0.04] transition-all"
                >
                  Teknik Destek
                  <ChevronRight size={15} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#04080d] to-transparent pointer-events-none z-20" />
      </section>

      {/* ── AWARDS STRIP ─────────────────────────────────────────── */}
      <section className="relative py-0 border-y border-white/[0.04] overflow-hidden" style={{ background: "#040810" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 80% at 50% 50%, rgba(56,189,248,0.03) 0%, transparent 70%)" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="grid md:grid-cols-3 divide-x divide-white/[0.05]">
            {awards.map((a, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.5}
                className="flex items-center gap-5 px-8 py-9 group hover:bg-sky-400/[0.02] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl border border-sky-400/20 bg-sky-400/[0.05] flex items-center justify-center flex-shrink-0 group-hover:border-sky-400/35 transition-colors">
                  <Award size={16} className="text-sky-400/60" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-sky-400/50 mb-0.5">{a.year} · {a.cat}</p>
                  <p className="text-[13.5px] font-semibold text-foreground/75">
                    {a.pub} <span className="text-foreground/40 font-normal">— {a.award}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2910 nm — THE TECHNOLOGY MOMENT ─────────────────────── */}
      <section className="py-0 relative overflow-hidden" style={{ background: "#070b17" }}>
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
                  background: "linear-gradient(to bottom, rgba(56,189,248,0.06) 0%, rgba(56,189,248,0.01) 100%)",
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
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-sky-400/65 mb-6">
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
                    background: "linear-gradient(110deg, #7dd3fc 0%, #38bdf8 50%, #818cf8 100%)",
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

              <p className="text-[15px] text-foreground/44 leading-[1.88] mb-7">
                2910 nm, suyun en yüksek absorpsiyon gösterdiği dalga boyudur. Cilt dokusu büyük oranda
                sudan oluştuğu için bu dalga boyu doku ile{" "}
                <span className="text-foreground/72 font-semibold">maksimum etkileşim</span> sağlar.
                Hem ablasyon hem koagülasyon enerjisi optimize edilir, kollateral ısıl hasar minimumda tutulur.
              </p>

              {/* Comparison callout */}
              <div className="relative p-6 rounded-2xl border border-sky-400/16 bg-sky-400/[0.04] overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                  style={{ background: "linear-gradient(to bottom, #38bdf8, #818cf8)" }}
                />
                <p className="text-[13.5px] text-foreground/50 leading-[1.85] pl-2">
                  <span className="text-sky-300 font-semibold">CO₂ 10.600 nm</span> ve{" "}
                  <span className="text-sky-300 font-semibold">Er:YAG 2.940 nm</span> ile kıyaslandığında,
                  UltraClear'ın 2910 nm fiber platformu çok daha kontrollü enerji sunumu ve daha az
                  yan etki profiliyle{" "}
                  <span className="text-foreground/75 font-medium">klinik açıdan üstün</span> sonuçlar ortaya koyar.
                </p>
              </div>

              {/* Mini specs */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { v: "3DMIRACL®", l: "Platform" },
                  { v: "I–VI", l: "Fitzpatrick" },
                  { v: "0–7", l: "Gün İyileşme" },
                ].map((s, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
                    <p className="text-[13px] font-bold text-sky-300/80 mb-1">{s.v}</p>
                    <p className="text-[10.5px] text-foreground/32">{s.l}</p>
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
            <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#070b17] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-28 z-10 bg-gradient-to-t from-[#070b17] to-transparent" />
            <img
              src={ucTreatment2}
              alt="UltraClear Klinik Uygulama"
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay label */}
            <div className="absolute bottom-8 right-6 z-20">
              <span className="text-[9.5px] font-medium tracking-[0.24em] uppercase px-3 py-1.5 rounded-full border border-sky-400/30 bg-black/40 backdrop-blur-md text-sky-400/80">
                Klinik Uygulama
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3 TREATMENT MODES (editorial stacked) ────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#04080d" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 40% at 90% 80%, rgba(56,189,248,0.045) 0%, transparent 65%)" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">

          <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[380px_1fr] gap-16 items-start">

            {/* Left sticky */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="md:sticky md:top-24"
            >
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-sky-400/65 mb-6">
                Protokol Esnekliği
              </p>
              <h2
                className="font-display font-black leading-[0.93] tracking-[-0.025em] mb-6"
                style={{ fontSize: "clamp(2rem, 3vw, 3.2rem)" }}
              >
                Üç Farklı{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #7dd3fc 0%, #38bdf8 55%, #818cf8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    paddingBottom: "0.1em",
                    display: "inline-block",
                  }}
                >
                  Tedavi Modu
                </span>
              </h2>
              <p className="text-[14px] text-foreground/38 leading-[1.85]">
                Sıfır downtimeden tam ablative yenilemeye kadar geniş tedavi yelpazesi.
                Her hastanın ihtiyacına özel protokol seçimi.
              </p>
            </motion.div>

            {/* Right: stacked editorial rows */}
            <div className="space-y-0">
              {modes.map((m, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.4}
                  className="border-b border-white/[0.06] last:border-0 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenMode(openMode === i ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-8 text-left group hover:bg-sky-400/[0.02] -mx-4 px-4 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-5 flex-1">
                      <span className="text-[12px] font-mono text-foreground/18 group-hover:text-sky-400/40 transition-colors w-6 flex-shrink-0">
                        {m.n}
                      </span>
                      <div>
                        <h3 className="font-display font-black text-[1.35rem] text-foreground/85 group-hover:text-foreground transition-colors mb-1">
                          {m.title}
                        </h3>
                        <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-sky-400/45 px-2.5 py-1 rounded-full border border-sky-400/18 bg-sky-400/[0.04]">
                          {m.tag}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className="text-[9.5px] tracking-widest uppercase text-foreground/22 mb-0.5">İyileşme</p>
                        <p className="text-[13px] font-semibold text-sky-400/75">{m.downtime}</p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center transition-all ${openMode === i ? "border-sky-400/40 bg-sky-400/10" : ""}`}
                      >
                        <span
                          className={`block w-2.5 border-t border-foreground/30 transition-all duration-300 ${openMode === i ? "rotate-90 border-sky-400" : ""}`}
                        />
                      </div>
                    </div>
                  </button>

                  <motion.div
                    animate={{ height: openMode === i ? "auto" : 0, opacity: openMode === i ? 1 : 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-11 pr-4">
                      <p className="text-[14.5px] text-foreground/52 leading-[1.88] mb-3">{m.desc}</p>
                      <p className="text-[13px] text-foreground/32 leading-[1.8] italic">{m.detail}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IN ACTION — treatment3 full-width editorial ───────────── */}
      <section className="relative overflow-hidden" style={{ background: "#070b17" }}>
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
            <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-[#070b17] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 z-10 bg-gradient-to-t from-[#070b17] to-transparent" />
            <img
              src={ucTreatment3}
              alt="UltraClear Sistem Uygulaması"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 30%" }}
            />
            <div className="absolute top-6 left-6 z-20">
              <span className="text-[9.5px] font-medium tracking-[0.24em] uppercase px-3 py-1.5 rounded-full border border-sky-400/30 bg-black/40 backdrop-blur-md text-sky-400/80">
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
            <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-sky-400/65 mb-6">
              Klinik Üstünlük
            </p>
            <h2
              className="font-display font-black leading-[0.93] tracking-[-0.025em] mb-7"
              style={{ fontSize: "clamp(2rem, 3.2vw, 3.2rem)" }}
            >
              Precison Beyond{" "}
              <span
                style={{
                  background: "linear-gradient(110deg, #7dd3fc 0%, #38bdf8 55%, #818cf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingBottom: "0.1em",
                  display: "inline-block",
                }}
              >
                CO₂
              </span>
            </h2>
            <p className="text-[15px] text-foreground/44 leading-[1.88] mb-8">
              Geleneksel ablative lazer tedavilerinde kaçınılamayan ısıl hasar ve uzun iyileşme
              süreleri, UltraClear'ın cold fiber laser mimarisiyle geçmişte kaldı. Hem ablative
              etkinlik hem de non-ablative konfor aynı platformda.
            </p>

            <ul className="space-y-4">
              {[
                { title: "Tüm Cilt Tipleri", sub: "Hiperpigmentasyon riski olmadan Fitzpatrick I–VI" },
                { title: "Daha Az Yan Etki", sub: "CO₂'ye göre belirgin daha az komplikasyon profili" },
                { title: "Esnek Protokol", sub: "Aynı seansta birden fazla mod kombinasyonu" },
                { title: "Hızlı İyileşme", sub: "Non-ablative modda 0 gün, ablative'de 5–7 gün" },
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
                  <div className="mt-[7px] w-1.5 h-1.5 rounded-full bg-sky-400/65 flex-shrink-0" />
                  <div>
                    <p className="text-[14px] font-semibold text-foreground/78 mb-0.5">{f.title}</p>
                    <p className="text-[13px] text-foreground/38">{f.sub}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── INDICATIONS + SPECS ──────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#04080d" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 45% at 10% 50%, rgba(56,189,248,0.045) 0%, transparent 65%)" }}
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
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-sky-400/65 mb-6">
                Endikasyonlar
              </p>
              <h2
                className="font-display font-black leading-[0.93] tracking-[-0.025em] mb-8"
                style={{ fontSize: "clamp(2rem, 3.2vw, 3.2rem)" }}
              >
                Hangi Durumlarda{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #7dd3fc 0%, #38bdf8 55%, #818cf8 100%)",
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
                    className="flex items-center gap-4 py-3.5 border-b border-white/[0.05] group hover:border-sky-400/18 transition-colors"
                  >
                    <span className="text-[10px] font-mono text-sky-400/25 w-5 flex-shrink-0 group-hover:text-sky-400/50 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ChevronRight size={12} className="text-sky-400/40 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-[14px] text-foreground/58 group-hover:text-foreground/80 transition-colors leading-snug">
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
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-sky-400/65 mb-6">
                Teknik Özellikler
              </p>
              <h2
                className="font-display font-black leading-[0.93] tracking-[-0.025em] mb-10"
                style={{ fontSize: "clamp(2rem, 3.2vw, 3.2rem)" }}
              >
                UltraClear{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #7dd3fc 0%, #38bdf8 55%, #818cf8 100%)",
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

              <div className="rounded-2xl border border-white/[0.07] overflow-hidden bg-white/[0.015]">
                {specs.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-5 px-6 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-sky-400/[0.02] transition-colors group"
                  >
                    <span className="text-[10px] tracking-[0.16em] uppercase text-sky-400/38 w-28 flex-shrink-0 font-medium pt-0.5">
                      {s.label}
                    </span>
                    <span className="text-[13.5px] text-foreground/55 group-hover:text-foreground/78 transition-colors leading-relaxed">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 rounded-2xl border border-sky-400/16 bg-sky-400/[0.04] relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.3), transparent)" }}
                />
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[13.5px] text-foreground/90 mb-2">Türkiye Yetkili Distribütörü</p>
                    <p className="text-[13px] text-foreground/40 leading-[1.8]">
                      EMCR Medikal Teknolojiler, UltraClear'ın Türkiye yetkili distribütörüdür.
                      Tüm kurulum, sertifikalı eğitim ve teknik servis hizmetleri kapsamlıdır.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ───────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#04080d" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-sky-400/65 mb-4">Klinik Kanıt</p>
              <h2
                className="font-display font-black leading-[0.93] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
              >
                Gerçek{" "}
                <span
                  style={{
                    background: "linear-gradient(110deg, #7dd3fc 0%, #38bdf8 55%, #818cf8 100%)",
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
                    className="w-10 h-10 rounded-full border border-white/10 hover:border-sky-400/40 hover:bg-sky-400/[0.05] flex items-center justify-center transition-all"
                  >
                    <ChevronRight size={16} className={`text-foreground/40 ${dir === -1 ? "rotate-180" : ""}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden mb-4 border border-white/[0.05]" style={{ aspectRatio: "21/9" }}>
            {ucPatients.map((p, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ opacity: activePatient === i ? 1 : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <img src={p.img} alt={`Hasta ${i + 1}`} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04080d]/60 via-transparent to-transparent" />
              </motion.div>
            ))}
            <div className="absolute top-5 left-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-foreground/65">ÖNCE</span>
            </div>
            <div className="absolute top-5 right-6 z-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full bg-sky-400/20 backdrop-blur-md border border-sky-400/30 text-sky-300">SONRA</span>
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10 z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex items-end justify-between">
              <p className="text-[10px] tracking-[0.25em] uppercase text-sky-400/65">
                UltraClear® · {ucPatients[activePatient].label}
              </p>
              <div className="font-display font-black text-6xl text-white/[0.04] select-none leading-none tabular-nums">
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
                  activePatient === i ? "ring-2 ring-sky-400/55 ring-offset-1 ring-offset-[#04080d]" : "opacity-45 hover:opacity-70"
                }`}
              >
                <img src={p.img} alt={`${i + 1}`} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 transition-all ${activePatient === i ? "bg-sky-400/10" : "bg-black/25"}`} />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-bold tracking-widest text-foreground/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#070b17" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(56,189,248,0.07) 0%, transparent 65%)" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-sky-400/65 mb-6">
              Sıradaki Adım
            </p>
            <h2
              className="font-display font-black leading-[0.93] tracking-[-0.025em] mb-7"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 5rem)" }}
            >
              Kliniğinizde{" "}
              <span
                style={{
                  background: "linear-gradient(125deg, #bae6fd 0%, #38bdf8 45%, #818cf8 100%)",
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
            <p className="text-[15px] text-foreground/38 max-w-lg mx-auto mb-11 leading-[1.88]">
              UltraClear'ı kliniğinizde keşfetmek için bizimle iletişime geçin.
              Uzmanlarımız size özel demo ve teklif hazırlasın.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:info@emcr.com.tr"
                className="h-12 px-8 inline-flex items-center gap-2.5 text-[14px] font-semibold rounded-xl transition-all text-[#04080d]"
                style={{
                  background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                  boxShadow: "0 0 40px rgba(56,189,248,0.22), 0 4px 20px rgba(0,0,0,0.35)",
                }}
              >
                Demo Talep Et
                <ArrowRight size={15} />
              </a>
              <Link
                href="/teknik-destek"
                className="h-12 px-8 inline-flex items-center gap-2 text-[14px] font-medium text-foreground/55 hover:text-foreground border border-white/[0.12] hover:border-white/22 rounded-xl hover:bg-white/[0.04] transition-all"
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

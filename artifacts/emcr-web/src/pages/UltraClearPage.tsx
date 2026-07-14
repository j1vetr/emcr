import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ultraClearStudio from "@assets/ultraclear-studio.webp";
import ucRef1 from "@assets/ref1_1781871404352.jpg";
import ucRef2 from "@assets/ref2_1781871404353.jpg";
import ucRef3 from "@assets/ref3_1781871404353.jpg";
import ucRef4 from "@assets/ref4_1781871404353.jpg";
import ucRef5 from "@assets/ref5_1781871404354.jpg";
import ucRef6 from "@assets/ref6_1781871404354.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};

const ucPatients = [
  { img: ucRef1, label: "Cilt Tonu Düzeltme" },
  { img: ucRef2, label: "Rosacea · Kızarıklık" },
  { img: ucRef3, label: "Cilt Yenileme · Sıkılaştırma" },
  { img: ucRef4, label: "Pigmentasyon · Leke" },
  { img: ucRef5, label: "Gözenek ve Doku" },
  { img: ucRef6, label: "Akne İzleri" },
];

const modes = [
  {
    n: "01",
    title: "Non-Ablative",
    color: "rgba(56,189,248,0.1)",
    border: "rgba(56,189,248,0.2)",
    desc: "Sıfır iyileşme süresi. Kolajen stimülasyonu, cilt tonu iyileştirme ve genel parlaklık artışı. Sosyal hayata dönüş aynı gün.",
    downtime: "0 gün",
  },
  {
    n: "02",
    title: "Micro-Ablative",
    color: "rgba(56,189,248,0.07)",
    border: "rgba(56,189,248,0.15)",
    desc: "Orta seviye yenileme. İnce çizgiler, doku düzensizliği ve pigmentasyon sorunlarında etkin, kısa iyileşmeli tedavi.",
    downtime: "1–3 gün",
  },
  {
    n: "03",
    title: "Ablative",
    color: "rgba(56,189,248,0.05)",
    border: "rgba(56,189,248,0.12)",
    desc: "Kapsamlı cilt yenilemesi. Derin kırışıklıklar, belirgin akne izleri ve ciddi fotohasar vakalarında tam ablative yenileme.",
    downtime: "5–7 gün",
  },
];

const indications = [
  "İnce Çizgiler ve Kırışıklıklar",
  "Cilt Laksitesi ve Sarkma",
  "Akne İzleri ve Skar",
  "Güneş Hasarı ve Pigmentasyon",
  "Doku ve Ton Düzensizliği",
  "Gözenek Sıkılaştırma",
  "Melazma Tedavisi",
  "Genel Cilt Kalitesi İyileştirme",
];

const specs = [
  { label: "DALGA BOYU", value: "1.94 µm" },
  { label: "TEKNOLOJİ", value: "Erbium Fiber Laser (Soğuk Ablasyon)" },
  { label: "MOD", value: "Non-Ablative / Micro-Ablative / Ablative" },
  { label: "CİLT TİPİ", value: "Fitzpatrick I–VI Tüm Tipler" },
  { label: "İYİLEŞME", value: "0–7 gün (moda göre)" },
  { label: "ONAY", value: "CE, FDA Clearance" },
];

export default function UltraClearPage() {
  const [activePatient, setActivePatient] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden bg-[#040810] flex items-center">
        <div className="absolute inset-y-0 right-0 w-[58%] pointer-events-none">
          <div className="absolute inset-y-0 left-0 w-56 bg-gradient-to-r from-[#040810] to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#040810] to-transparent z-10" />
          <img
            src={ultraClearStudio}
            alt="UltraClear Laser Device"
            className="w-full h-full object-cover object-center"
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute z-20 top-[25%] left-16 px-4 py-2.5 rounded-xl backdrop-blur-md bg-white/5 border border-sky-400/20"
          >
            <p className="text-[9px] tracking-[0.25em] uppercase text-sky-400/70 mb-0.5">Teknoloji</p>
            <p className="text-[13px] font-semibold text-foreground/90">Soğuk Ablasyon</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute z-20 bottom-[28%] left-10 px-4 py-2.5 rounded-xl backdrop-blur-md bg-white/5 border border-white/10"
          >
            <p className="text-[9px] tracking-[0.25em] uppercase text-foreground/40 mb-0.5">Uyumluluk</p>
            <p className="text-[13px] font-semibold text-foreground/80">Tüm Cilt Tipleri</p>
          </motion.div>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14 pt-36 pb-24">
          <div className="max-w-[500px]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-sky-400/60" />
                <p className="text-[10px] font-semibold tracking-[0.35em] text-sky-400/70">
                  SOĞUK ABLASYON · ERBİYUM FİBER LAZER
                </p>
              </div>
              <h1
                className="font-display font-bold leading-[1.0] mb-3"
                style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-sky-300 to-primary">
                  UltraClear™
                </span>
              </h1>
              <p className="font-display font-light text-foreground/55 leading-snug mb-8" style={{ fontSize: "clamp(1.3rem, 2.2vw, 2rem)" }}>
                Işık Hızında<br />Cilt Yenileme.
              </p>
              <p className="text-foreground/45 text-base leading-relaxed mb-10 max-w-[400px]">
                1.94 µm Erbium Fiber Lazer teknolojisiyle çalışan UltraClear, Fitzpatrick I'den
                VI'ya tüm cilt tiplerine güvenle uygulanabilen, minimal iyileşme süreli
                bir lazer yenileme sistemidir.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="h-11 px-7 text-[13px] font-semibold rounded-sm bg-sky-400/10 border border-sky-400/30 hover:bg-sky-400/20 text-sky-300 hover:text-sky-200 transition-all"
                >
                  <a href="mailto:info@emcr.com.tr">Bilgi Al</a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="h-11 px-7 text-[13px] font-medium border border-white/15 hover:bg-white/5 rounded-sm"
                >
                  <Link href="/teknik-destek">Teknik Destek</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modes */}
      <section className="py-28 bg-[#04080e] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.04)_0%,_transparent_60%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-sky-400/60 mb-4">Teknoloji</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">
              Üç Farklı{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-primary">
                Tedavi Modu
              </span>
            </h2>
            <p className="text-foreground/45 max-w-xl mx-auto text-base">
              UltraClear, sıfır downtimeden tam ablative yenilemeye kadar geniş bir tedavi yelpazesi sunar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {modes.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="p-8 rounded-2xl border transition-all hover:scale-[1.02]"
                style={{ background: m.color, borderColor: m.border }}
              >
                <p className="text-[11px] font-mono text-foreground/25 mb-3">{m.n}</p>
                <h3 className="font-display font-bold text-2xl text-sky-300 mb-4">{m.title}</h3>
                <p className="text-foreground/55 text-sm leading-relaxed mb-6">{m.desc}</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400/50" />
                  <span className="text-[11px] text-foreground/40 tracking-wider">İyileşme: {m.downtime}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Indications + Specs */}
      <section className="py-28 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-sky-400/60 mb-4">Endikasyonlar</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-8">
                Hangi Durumlarda<br />
                <span className="text-sky-300">Kullanılır?</span>
              </h2>
              <div className="space-y-0">
                {indications.map((ind, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className="flex items-center gap-4 py-3 border-b border-white/[0.05] group hover:border-sky-400/20 transition-colors"
                  >
                    <ChevronRight size={14} className="text-sky-400/60 flex-shrink-0" />
                    <span className="text-foreground/65 text-sm group-hover:text-foreground/85 transition-colors">{ind}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-sky-400/60 mb-4">Teknik Özellikler</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-8">
                Sistem<br />
                <span className="text-sky-300">Detayları</span>
              </h2>
              <div className="border-t border-white/[0.06]">
                {specs.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 py-4 border-b border-white/[0.05] hover:border-sky-400/15 transition-colors group"
                  >
                    <span className="text-[9px] tracking-[0.25em] text-sky-400/50 w-24 flex-shrink-0 font-medium">{s.label}</span>
                    <span className="text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors">{s.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 rounded-2xl bg-sky-400/5 border border-sky-400/15">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-foreground/90 mb-2">Yetkili Distribütör</p>
                    <p className="text-foreground/45 text-sm leading-relaxed">
                      EMCR Medikal, UltraClear'ın Türkiye yetkili distribütörüdür.
                      Tüm kurulum, eğitim ve teknik servis hizmetleri kapsamlıdır.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Before / After Gallery */}
      <section className="py-28 bg-[#04080e] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[220px] bg-sky-400/3 blur-[100px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="flex items-end justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-sky-400/60 mb-3">
                KLİNİK KANIT · UltraClear™
              </p>
              <h2 className="font-display font-bold leading-[1]" style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}>
                Gerçek Sonuçlar.
              </h2>
            </motion.div>
            <div className="hidden md:flex items-center gap-6">
              <span className="font-display text-4xl font-bold tabular-nums text-foreground/20">
                {String(activePatient + 1).padStart(2, "0")}
                <span className="text-xl text-foreground/10 mx-1">/</span>06
              </span>
              <div className="flex gap-2">
                {[-1, 1].map((dir, di) => (
                  <button
                    key={di}
                    onClick={() => setActivePatient((p) => (p + dir + ucPatients.length) % ucPatients.length)}
                    className="w-10 h-10 rounded-full border border-white/10 hover:border-sky-400/40 hover:bg-white/5 flex items-center justify-center transition-all"
                  >
                    <ChevronRight size={16} className={`text-foreground/50 ${dir === -1 ? "rotate-180" : ""}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden mb-4" style={{ aspectRatio: "21/9" }}>
            {ucPatients.map((p, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ opacity: activePatient === i ? 1 : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <img src={p.img} alt={`Hasta ${i + 1}`} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04080e]/60 via-transparent to-transparent" />
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
                UltraClear™ · {ucPatients[activePatient].label}
              </p>
              <div className="font-display font-bold text-6xl text-white/5 select-none leading-none tabular-nums">
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
                  activePatient === i
                    ? "ring-2 ring-sky-400/60 ring-offset-1 ring-offset-[#04080e]"
                    : "opacity-50 hover:opacity-75"
                }`}
              >
                <img src={p.img} alt={`${i + 1}`} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 transition-all ${activePatient === i ? "bg-sky-400/10" : "bg-black/30"}`} />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-bold tracking-widest text-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.06)_0%,_transparent_65%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-sky-400/60 mb-5">Sıradaki Adım</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
              Kliniğiniz İçin{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-primary">
                Demo Talep Edin
              </span>
            </h2>
            <p className="text-foreground/45 max-w-lg mx-auto mb-10">
              UltraClear'ı kliniğinizde keşfetmek için uzman ekibimizle iletişime geçin.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                className="h-12 px-8 text-[14px] font-semibold rounded-sm bg-sky-400/10 border border-sky-400/30 hover:bg-sky-400/20 text-sky-300"
              >
                <a href="mailto:info@emcr.com.tr">Demo Talep Et</a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-12 px-8 text-[14px] font-medium border border-white/15 hover:bg-white/5 rounded-sm"
              >
                <Link href="/teknik-destek">Teknik Destek</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

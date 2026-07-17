import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, ShieldCheck, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import neogenLogo from "@assets/neogen-logo.webp";
import neogenDevicePlatform from "@assets/neogen-platform.webp";
import baRef1 from "@assets/ref1_1781870893595.jpg";
import baRef2 from "@assets/ref2_1781870893596.jpg";
import baRef3 from "@assets/ref3_1781870893597.jpg";
import baRef4 from "@assets/ref4_1781870893597.jpg";
import baRef5 from "@assets/ref5_1781870893598.jpg";
import baRef6 from "@assets/ref6_1781870893598.jpg";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
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
    title: "Cilt Sıkılaştırma",
    subtitle: "Skin Tightening",
    desc: "Plazma darbesi cilde çarptığında termal enerji ani bir ısıya dönüşür ve doku hemen kontrakte olur. Bu anlık sıkılaşma görünür kırışıklık azalmasını tetikler.",
    detail: "Stratum corneum ve epidermal katmanlar tedavi boyunca bütünlüğünü korur, doğal bir biyolojik pansuman görevi üstlenir.",
    downtime: "1–3 gün",
    color: "rgba(79,195,195,0.15)",
    border: "rgba(79,195,195,0.3)",
  },
  {
    n: "02",
    title: "Yüzey Yenileme",
    subtitle: "Skin Resurfacing",
    desc: "İyileşme bölgesi (Zone of Thermal Damage) ile modifikasyon bölgesi (Zone of Thermal Modification) arasında yeni bir epidermis oluşur. Düşük enerjide 1–2 gün, yüksek enerjide 3–5 gün içinde tamamlanır.",
    detail: "Derinin doğal bariyeri korunduğu için enfeksiyon riski ve komplikasyonlar klasik ablative yöntemlere kıyasla belirgin şekilde azdır.",
    downtime: "3–5 gün",
    color: "rgba(79,195,195,0.09)",
    border: "rgba(79,195,195,0.2)",
  },
  {
    n: "03",
    title: "Derin Rejenerasyon",
    subtitle: "Skin Regeneration",
    desc: "Tüm cilt yüzeyi tedavi edilir — ablative teknolojilerdeki gibi tedavisiz adacıklar oluşmaz. Retikular dermise kadar uzanan yeniden modelleme kaskadı başlatılır.",
    detail: "Neokollajenizasyon, neovaskülarizasyon ve fibroblast migrasyonu ile uzun dönemli çalışmalar tedaviden 12 ay sonrasına kadar süren kolajen üretimini belgeliyor.",
    downtime: "5–7 gün",
    color: "rgba(79,195,195,0.05)",
    border: "rgba(79,195,195,0.12)",
  },
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
  { label: "ENERJİ TİPİ", value: "UHF (Ultra Yüksek Frekans) RF" },
  { label: "GAZ", value: "Medikal Kalite Azot (N₂)" },
  { label: "ENERJİ ARALIĞI", value: "0.5 J – 4.0 J" },
  { label: "NABIZ HIZI", value: "Çift Nabız (Double Pulse)" },
  { label: "TEKRAR HIZI", value: "1.0 – 2.5 Hz" },
  { label: "NOZULLAR", value: "25 mm / 5 mm" },
  { label: "SICAKLIK (YÜZEY)", value: "70 – 165 °C / 15 ms nabız" },
  { label: "CİHAZ SINIFI", value: "Class IIb" },
  { label: "CİLT TİPİ", value: "Fitzpatrick I–VI Tüm Tipler" },
  { label: "ONAY", value: "CE Mark · FDA 510(k) K132754" },
  { label: "SİSTEM AĞIRLIĞI", value: "18 kg" },
  { label: "BOYUTLAR", value: "470 × 430 × 1060 mm" },
];

export default function NeoGenPlasma() {
  const [activePatient, setActivePatient] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setVideoPlaying(!videoPlaying);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden bg-[#070b17] flex items-center">
        <div className="absolute inset-y-0 right-0 w-[55%] pointer-events-none">
          <div className="absolute inset-y-0 left-0 w-52 bg-gradient-to-r from-[#070b17] to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b17]/40 via-transparent to-transparent z-10" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-primary/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-[420px] h-[420px] rounded-full border border-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-[260px] h-[260px] bg-primary/5 blur-[80px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <img
            src={neogenDevicePlatform}
            alt="NeoGen Plasma Device"
            className="relative z-20 w-full h-full object-contain object-center"
            style={{ filter: "drop-shadow(0 20px 80px rgba(0,0,0,0.7))" }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14 pt-28 pb-20">
          <div className="max-w-[520px]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={neogenLogo}
                alt="NeoGen"
                className="w-full max-w-[200px] mb-8 invert opacity-90"
              />
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/70 mb-5">
                Nitrogen Plasma Skin Regeneration
              </p>
              <h1
                className="font-display font-bold leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.6rem, 4vw, 4.5rem)" }}
              >
                Kontrollü Enerji.<br />
                <span className="text-primary">Görünür Sonuç.</span>
              </h1>
              <p className="text-foreground/50 text-base leading-relaxed mb-8 max-w-[420px]">
                NeoGen, azot gazını plazma enerjisine dönüştürerek cilt yüzeyini korurken
                retikular dermise kadar derin yenilenme sağlar. Tek sistemde sıkılaştırma,
                yenileme ve rejenerasyon.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-primary/25 text-primary/70">
                  CE Mark
                </span>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-primary/25 text-primary/70">
                  FDA 510(k)
                </span>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-primary/25 text-primary/70">
                  7 Onaylı Endikasyon
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="h-11 px-7 text-[13px] font-semibold bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-sm"
                >
                  <a href="mailto:info@emcr.com.tr">Teklif Alın</a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="h-11 px-7 text-[13px] font-medium border border-white/20 hover:bg-white/5 rounded-sm"
                >
                  <Link href="/teknik-destek">Teknik Destek</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#060a15] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(79,195,195,0.05)_0%,_transparent_60%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 text-center"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-4">Teknoloji</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Nasıl <span className="text-primary">Çalışır?</span>
            </h2>
            <p className="text-foreground/45 max-w-2xl mx-auto text-base leading-relaxed">
              NeoGen, ultra yüksek radyo frekansıyla tüpten gelen medikal kalite azot gazını iyonize ederek
              nozulda nitrojen plazma oluşturur. Bu plazma, yüzeyi açmadan cildin tüm mimarisini ısıtır
              ve 15 milisaniyelik kontrollü darbelerle 70–165°C arasında termal etki üretir.
            </p>
          </motion.div>

          {/* Key differentiator callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mb-16 p-5 rounded-2xl bg-primary/5 border border-primary/15 flex items-start gap-4"
          >
            <div className="w-1 self-stretch rounded-full bg-primary/40 flex-shrink-0" />
            <p className="text-foreground/60 text-sm leading-relaxed">
              <span className="text-primary font-semibold">Kritik fark:</span> Azot plazması belirli bir
              kromofor hedefine veya dalga boyuna bağlı değildir. Penetrasyon derinliği cildin nem
              düzeyi ile yönetilir; bu sayede Fitzpatrick I'den VI'ya tüm cilt tonlarında güvenle kullanılır.
            </p>
          </motion.div>

          {/* 3 Mechanisms */}
          <div className="grid md:grid-cols-3 gap-5">
            {mechanisms.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="relative p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
                style={{ background: m.color, borderColor: m.border }}
              >
                <p className="text-[11px] font-mono text-foreground/25 mb-3">{m.n}</p>
                <h3 className="font-display font-bold text-xl text-primary mb-1">{m.title}</h3>
                <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/30 mb-4">{m.subtitle}</p>
                <p className="text-foreground/55 text-sm leading-relaxed mb-4">{m.desc}</p>
                <p className="text-foreground/35 text-xs leading-relaxed mb-6 italic">{m.detail}</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  <span className="text-[11px] text-foreground/40 tracking-wider">İyileşme: {m.downtime}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video */}
      <section className="py-20 relative overflow-hidden bg-[#070b17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(79,195,195,0.06)_0%,_transparent_65%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-4">Canlı Uygulama</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              NeoGen Plasma <span className="text-primary">Uygulamada</span>
            </h2>
            <p className="text-foreground/45 max-w-lg mx-auto text-sm">
              Gerçek klinik ortamında NeoGen Plasma uygulamasını izleyin.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-black max-w-4xl mx-auto"
            style={{ aspectRatio: "16/9" }}
          >
            <video
              ref={videoRef}
              src="/neogen-demo.mp4"
              className="w-full h-full object-cover"
              playsInline
              onEnded={() => setVideoPlaying(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
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

      {/* Indications + Specs */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Indications */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-4">Endikasyonlar</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">
                Hangi Durumlarda<br />
                <span className="text-primary">Kullanılır?</span>
              </h2>
              <p className="text-foreground/40 text-sm mb-8 leading-relaxed">
                7'si FDA 510(k) onaylı toplam 10 endikasyon.
                <span className="inline-flex items-center gap-1.5 ml-2 text-primary/60">
                  <span className="w-2 h-2 rounded-full bg-primary/50 inline-block" />
                  FDA onaylı
                </span>
              </p>
              <div className="space-y-0">
                {indications.map((ind, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className="flex items-center gap-4 py-3 border-b border-white/[0.05] group hover:border-primary/20 transition-colors"
                  >
                    <ChevronRight size={14} className="text-primary/60 flex-shrink-0" />
                    <span className="text-foreground/65 text-sm group-hover:text-foreground/85 transition-colors flex-1">{ind.label}</span>
                    {ind.fda && (
                      <span className="text-[9px] tracking-[0.15em] font-semibold text-primary/50 border border-primary/20 rounded-full px-2 py-0.5 flex-shrink-0">
                        FDA
                      </span>
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
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-4">
                Teknik Özellikler
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-8">
                NeoGen PSR<br />
                <span className="text-primary">Sistem Detayları</span>
              </h2>
              <div className="border-t border-white/[0.06]">
                {specs.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 py-3.5 border-b border-white/[0.05] hover:border-primary/15 transition-colors group"
                  >
                    <span className="text-[9px] tracking-[0.22em] text-primary/45 w-28 flex-shrink-0 font-medium">{s.label}</span>
                    <span className="text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/15">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-foreground/90 mb-2">Türkiye Yetkili Distribütörü</p>
                    <p className="text-foreground/45 text-sm leading-relaxed">
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

      {/* Before / After Gallery */}
      <section className="py-20 bg-[#060a15] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-primary/4 blur-[100px] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="flex items-end justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-3">
                Klinik Kanıt · NeoGen Plasma
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
                    onClick={() => setActivePatient((p) => (p + dir + patients.length) % patients.length)}
                    className="w-10 h-10 rounded-full border border-white/10 hover:border-primary/40 hover:bg-white/5 flex items-center justify-center transition-all"
                  >
                    <ChevronRight
                      size={16}
                      className={`text-foreground/50 ${dir === -1 ? "rotate-180" : ""}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden mb-4" style={{ aspectRatio: "21/9" }}>
            {patients.map((p, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ opacity: activePatient === i ? 1 : 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <img src={p.img} alt={`Hasta ${i + 1}`} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a15]/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060a15]/20 via-transparent to-[#060a15]/20" />
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
                NeoGen Plasma · {patients[activePatient].label}
              </p>
              <div className="font-display font-bold text-6xl text-white/5 select-none leading-none tabular-nums">
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
                    ? "ring-2 ring-primary/60 ring-offset-1 ring-offset-[#060a15]"
                    : "opacity-50 hover:opacity-75"
                }`}
              >
                <img src={p.img} alt={`${i + 1}`} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 transition-all ${activePatient === i ? "bg-primary/10" : "bg-black/30"}`} />
                <span className="absolute bottom-1.5 left-2 text-[9px] font-bold tracking-widest text-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(79,195,195,0.07)_0%,_transparent_65%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-5">Sıradaki Adım</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
              Kliniğiniz İçin <span className="text-primary">Demo Talep Edin</span>
            </h2>
            <p className="text-foreground/45 max-w-lg mx-auto mb-10">
              NeoGen Plasma'yı kliniğinizde deneyimlemek için bizimle iletişime geçin.
              Yetkili uzmanlarımız size özel sunum ve teklif hazırlasın.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                className="h-12 px-8 text-[14px] font-semibold bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-sm"
              >
                <a href="mailto:info@emcr.com.tr">Demo Talep Et</a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-12 px-8 text-[14px] font-medium border border-white/20 hover:bg-white/5 rounded-sm"
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

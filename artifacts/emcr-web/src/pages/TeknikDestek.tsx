import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench, ShieldCheck, GraduationCap, Phone, Mail,
  ChevronDown, Settings, Activity, Zap, Clock, ArrowRight,
  MapPin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const faqs = [
  {
    q: "Garanti Süresi Ne Kadardır?",
    a: "EMCR Medikal aracılığıyla satın alınan tüm NeoGen Plasma ve UltraClear sistemleri 2 yıl üretici garantisi kapsamındadır. Garanti kapsamı: cihaz gövdesi, elektronik bileşenler ve lazer/plazma modüllerini içermektedir.",
  },
  {
    q: "Periyodik Bakım Ne Zaman Yapılmalıdır?",
    a: "Her iki sistemde de yılda bir kez üretici spesifikasyonlarına uygun periyodik bakım önerilmektedir. Yoğun klinik kullanımında 6 ayda bir bakım yapılması cihaz ömrünü uzatır. Randevu için teknik destek hattımızı arayabilir ya da info@emcr.com.tr adresine e-posta gönderebilirsiniz.",
  },
  {
    q: "Cihazda Arıza Olduğunda Nasıl Başvururum?",
    a: "Teknik destek hattımızı arayarak veya info@emcr.com.tr adresine e-posta göndererek talepte bulunabilirsiniz. Hata kodu ve cihaz bilgilerini iletmeniz durumunda teknik ekibimiz en kısa sürede size ulaşır.",
  },
  {
    q: "Yedek Parça Temin Süresi Ne Kadar?",
    a: "Standart yedek parçalar Türkiye deposundan 1–3 iş gününde karşılanmaktadır. Özel bileşenler için üretici firmayla koordinasyon sağlanmaktadır. Ortalama temin süresi 5–10 iş günüdür. Tüm parçalar üretici onaylı orijinal parçalardır.",
  },
  {
    q: "Operatör Eğitimi Kim Tarafından Verilir?",
    a: "EMCR Medikal ve üretici firmadan sertifikalı eğitmenler tarafından verilen uygulamalı eğitim, cihaz teslimatı ile birlikte yapılmaktadır. İleri seviye protokol eğitimleri için yıllık eğitim takviminize bakabilirsiniz.",
  },
  {
    q: "Garanti Dışı Kalan Cihazlarım İçin Servis Var Mı?",
    a: "Evet. Garanti süresi dolan cihazlar için EMCR Medikal bünyesinde ücretli teknik servis hizmeti sunulmaktadır. Yıllık bakım sözleşmesi imzalayarak kapsamlı bir koruma paketi elde edebilir, beklenmedik arıza maliyetlerini minimize edebilirsiniz.",
  },
];

const services = [
  {
    num: "01",
    icon: Settings,
    title: "Kurulum ve Devreye Alma",
    desc: "Cihaz teslimatında yerinde kurulum, hassas kalibrasyon ve ilk çalıştırma hizmetleri. Klinik ortamınıza özel yerleşim planlaması ve bağlantı kurulumu dahildir.",
  },
  {
    num: "02",
    icon: GraduationCap,
    title: "Operatör Eğitimi",
    desc: "Sertifikalı eğitmenler eşliğinde uygulamalı protokol eğitimi ve sertifikasyon. Teorik bilgi ve klinik uygulama bir arada sunulmaktadır.",
  },
  {
    num: "03",
    icon: Activity,
    title: "Periyodik Bakım",
    desc: "Üretici spesifikasyonlarına uygun yıllık bakım, kalibrasyon ve sistem kontrol hizmetleri. Önleyici bakım ile cihaz ömrünü ve performansını koruyun.",
  },
  {
    num: "04",
    icon: Wrench,
    title: "Teknik Servis ve Onarım",
    desc: "Eğitimli EMCR teknisyenlerince hızlı arıza müdahalesi ve orijinal yedek parça temini. Türkiye genelinde yerinde servis kapasitesi.",
  },
  {
    num: "05",
    icon: ShieldCheck,
    title: "Garanti Kapsamı",
    desc: "2 yıl üretici garantisi. Cihaz gövdesi, elektronik bileşenler ve lazer/plazma modülleri dahil kapsamlı güvence.",
  },
  {
    num: "06",
    icon: Zap,
    title: "Uzaktan Destek",
    desc: "Telefon ve video konferans ile uzaktan teknik danışmanlık ve protokol desteği. Acil durumlarda anında erişim.",
  },
];

const stats = [
  { value: "2", unit: "Yıl", label: "Üretici Garantisi", icon: ShieldCheck },
  { value: "24", unit: "Saat", label: "Müdahale Hedefi", icon: Clock },
  { value: "100%", unit: "", label: "Orijinal OEM Parça", icon: ShieldCheck },
  { value: "7/5", unit: "", label: "Teknik Destek Hattı", icon: Phone },
];

type FormState = {
  name: string;
  clinic: string;
  device: string;
  phone: string;
  issue: string;
};

export default function TeknikDestek() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "", clinic: "", device: "NeoGen Plasma", phone: "", issue: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Teknik Destek Talebi | ${form.device} | ${form.clinic}`);
    const body = encodeURIComponent(
      `İsim: ${form.name}\nKlinik: ${form.clinic}\nCihaz: ${form.device}\nTelefon: ${form.phone}\n\nSorun:\n${form.issue}`
    );
    window.location.href = `mailto:info@emcr.com.tr?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#070b17] text-foreground font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-28 overflow-hidden">
        {/* Background atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 15% 40%, rgba(20,184,166,0.07) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 85% 70%, rgba(56,189,248,0.04) 0%, transparent 60%)",
          }}
        />
        {/* Fine grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-10"
            >
              <div className="h-px w-8 bg-primary/60" />
              <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-primary/70">
                Teknik Destek
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black leading-[0.92] tracking-[-0.025em] mb-8"
              style={{ fontSize: "clamp(3rem, 6vw, 6.5rem)" }}
            >
              Satıştan Sonra Da{" "}
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
                Yanınızdayız
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-[17px] text-foreground/45 leading-[1.85] max-w-2xl"
            >
              EMCR Medikal, kapsamlı kurulum, sertifikalı eğitim, periyodik bakım
              ve teknik servis hizmetleriyle cihazınızın tüm yaşam döngüsü boyunca yanınızdadır.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────── */}
      <section className="relative py-0 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="relative px-8 py-10 bg-white/[0.015] hover:bg-white/[0.03] transition-colors group"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p
                  className="font-display font-black leading-none tracking-tight mb-1"
                  style={{
                    fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
                    background: "linear-gradient(135deg, #14b8a6, #38bdf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                  {s.unit && (
                    <span className="text-[55%] ml-1 opacity-80">{s.unit}</span>
                  )}
                </p>
                <p className="text-[12px] text-foreground/40 tracking-wide mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMITMENT ───────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-[40%] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 80% 40%, rgba(20,184,166,0.055) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-16 items-center">

            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-primary/65 mb-6">
                Servis Taahhüdümüz
              </p>
              <h2
                className="font-display font-black leading-[0.95] tracking-[-0.02em] mb-7"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
              >
                EMCR Medikal{" "}
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
                  Teknik Altyapısı
                </span>
              </h2>
              <p className="text-[15px] text-foreground/45 leading-[1.85] mb-8">
                EMCR Medikal bünyesinde yetiştirilmiş, üretici firmalar tarafından
                sertifikalandırılmış teknik ekibimiz, kurulum gününden itibaren
                cihazınızın kesintisiz ve verimli çalışmasını güvence altına alır.
                Orijinal yedek parça stoku ve yerinde servis kapasitesiyle
                Türkiye genelinde hızlı müdahale sunmaktayız.
              </p>
              <ul className="space-y-3">
                {[
                  "Üretici sertifikalı EMCR teknik ekibi",
                  "Orijinal OEM yedek parça garantisi",
                  "Türkiye geneli yerinde servis kapasitesi",
                  "Önleyici bakım ve uzaktan izleme desteği",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-[14px] text-foreground/50">
                    <div className="mt-[6px] w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: decorative panel */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative p-8 rounded-3xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
                <div
                  className="absolute bottom-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.08) 0%, transparent 70%)" }}
                />
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {[
                    { label: "Yılda Ortalama", value: "120+", sub: "Servis Ziyareti" },
                    { label: "Türkiye Geneli", value: "81", sub: "İlde Hizmet" },
                    { label: "Stokta Hazır", value: "250+", sub: "Yedek Parça" },
                    { label: "İlk Müdahale", value: "<24s", sub: "Yanıt Süresi" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.025] hover:bg-white/[0.04] transition-colors"
                    >
                      <p className="text-[10px] text-foreground/30 tracking-widest uppercase mb-2">{item.label}</p>
                      <p
                        className="font-display font-black leading-none mb-1"
                        style={{
                          fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)",
                          background: "linear-gradient(135deg, #14b8a6, #38bdf8)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {item.value}
                      </p>
                      <p className="text-[12px] text-foreground/35">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-[#080c18]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(20,184,166,0.04) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-16 flex-wrap gap-6"
          >
            <div>
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-primary/65 mb-4">Hizmetler</p>
              <h2
                className="font-display font-black leading-[0.95] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
              >
                Kapsamlı{" "}
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
                  Destek Paketi
                </span>
              </h2>
            </div>
            <p className="text-sm text-foreground/35 max-w-xs leading-relaxed">
              Kurulumdan yıllık bakıma, eğitimden acil servise — tüm süreç EMCR güvencesinde.
            </p>
          </motion.div>

          {/* Service rows — editorial numbered list */}
          <div className="space-y-0">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.5}
                  className="group flex items-start gap-6 md:gap-10 py-8 border-b border-white/[0.06] last:border-0 hover:bg-white/[0.01] -mx-4 px-4 rounded-xl transition-colors cursor-default"
                >
                  {/* Number */}
                  <span className="text-[13px] font-mono text-foreground/18 pt-1 w-7 flex-shrink-0 group-hover:text-primary/40 transition-colors">
                    {s.num}
                  </span>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-primary/[0.07] border border-primary/[0.12] flex items-center justify-center text-primary/70 flex-shrink-0 group-hover:bg-primary/[0.12] group-hover:border-primary/25 group-hover:text-primary transition-all">
                    <Icon className="w-4.5 h-4.5" size={18} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-[17px] text-foreground/85 mb-2 group-hover:text-foreground transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-[14px] text-foreground/40 leading-[1.8] max-w-2xl">
                      {s.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    size={16}
                    className="text-foreground/15 flex-shrink-0 mt-1.5 group-hover:text-primary/50 group-hover:translate-x-1 transition-all"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 55% 45% at 10% 60%, rgba(20,184,166,0.045) 0%, transparent 65%)",
          }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="grid md:grid-cols-[380px_1fr] gap-16 items-start">

            {/* Left sticky label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:sticky md:top-28"
            >
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-primary/65 mb-6">SSS</p>
              <h2
                className="font-display font-black leading-[0.95] tracking-[-0.02em] mb-6"
                style={{ fontSize: "clamp(2rem, 3vw, 3rem)" }}
              >
                Sık Sorulan{" "}
                <br />
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
                  Sorular
                </span>
              </h2>
              <p className="text-[14px] text-foreground/38 leading-[1.85]">
                Cevap bulamazsanız teknik destek hattımızı arayın veya
                e-posta gönderin — size 24 saat içinde geri dönelim.
              </p>
            </motion.div>

            {/* Right: accordion */}
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.5}
                  className="rounded-2xl border border-white/[0.07] overflow-hidden bg-white/[0.015]"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-5 px-6 py-5 text-left hover:bg-white/[0.025] transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-[11px] font-mono text-primary/30 mt-[3px] flex-shrink-0 group-hover:text-primary/60 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium text-[14.5px] text-foreground/80 group-hover:text-foreground/95 transition-colors leading-snug">
                        {faq.q}
                      </span>
                    </div>
                    <ChevronDown
                      size={15}
                      className={`text-primary/50 flex-shrink-0 mt-0.5 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-white/[0.05]">
                          <p className="text-[13.5px] text-foreground/45 leading-[1.9] pt-4 pl-[calc(11px+1rem)]">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden bg-[#080c18]">
        <div className="absolute inset-0 pointer-events-none">
          <div
            style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 60% 55% at 80% 30%, rgba(20,184,166,0.06) 0%, transparent 65%)",
            }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-primary/65 mb-6">
                Destek Talebi
              </p>
              <h2
                className="font-display font-black leading-[0.95] tracking-[-0.02em] mb-7"
                style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)" }}
              >
                Teknik{" "}
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
                  Destek Formu
                </span>
              </h2>
              <p className="text-[15px] text-foreground/42 leading-[1.85] mb-10">
                Cihazınızla ilgili teknik sorun, bakım talebi veya sorularınız için
                formu doldurun. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
              </p>

              <div className="space-y-5">
                <a
                  href="tel:+902972060272"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-primary/60 group-hover:border-primary/25 group-hover:bg-primary/[0.06] group-hover:text-primary transition-all">
                    <Phone size={14} />
                  </div>
                  <div>
                    <p className="text-[11px] text-foreground/28 uppercase tracking-widest mb-0.5">Telefon</p>
                    <p className="text-[14px] text-foreground/60 group-hover:text-foreground/90 transition-colors">
                      +90 297 206 02 72
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:info@emcr.com.tr"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-primary/60 group-hover:border-primary/25 group-hover:bg-primary/[0.06] group-hover:text-primary transition-all">
                    <Mail size={14} />
                  </div>
                  <div>
                    <p className="text-[11px] text-foreground/28 uppercase tracking-widest mb-0.5">E-posta</p>
                    <p className="text-[14px] text-foreground/60 group-hover:text-foreground/90 transition-colors">
                      info@emcr.com.tr
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-primary/60 flex-shrink-0">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <p className="text-[11px] text-foreground/28 uppercase tracking-widest mb-0.5">Adres</p>
                    <p className="text-[13.5px] text-foreground/45 leading-relaxed">
                      Nispetiye Mah. Aytar Cad.<br />
                      Erdölen İş Merkezi No:38 Kat 1<br />
                      Beşiktaş / İstanbul
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative p-8 md:p-10 rounded-3xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                {sent ? (
                  <div className="text-center py-14">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                      <ShieldCheck className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3">Talebiniz Alındı</h3>
                    <p className="text-foreground/40 text-sm leading-relaxed max-w-xs mx-auto">
                      E-posta istemciniz açıldı. Mesajı göndermek için lütfen onaylayın.
                      Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-7 text-xs text-foreground/28 hover:text-primary transition-colors"
                    >
                      Yeni Talep Oluştur →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10.5px] font-medium text-foreground/35 mb-2.5 tracking-widest uppercase">
                          Adınız Soyadınız
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[13.5px] text-foreground/80 placeholder:text-foreground/20 focus:outline-none focus:border-primary/40 focus:bg-white/[0.055] transition-all"
                          placeholder="Dr. Adı Soyadı"
                        />
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-medium text-foreground/35 mb-2.5 tracking-widest uppercase">
                          Telefon
                        </label>
                        <input
                          value={form.phone}
                          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                          className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[13.5px] text-foreground/80 placeholder:text-foreground/20 focus:outline-none focus:border-primary/40 focus:bg-white/[0.055] transition-all"
                          placeholder="+90 5XX XXX XX XX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-medium text-foreground/35 mb-2.5 tracking-widest uppercase">
                        Klinik / Kurum Adı
                      </label>
                      <input
                        required
                        value={form.clinic}
                        onChange={(e) => setForm((f) => ({ ...f, clinic: e.target.value }))}
                        className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[13.5px] text-foreground/80 placeholder:text-foreground/20 focus:outline-none focus:border-primary/40 focus:bg-white/[0.055] transition-all"
                        placeholder="Klinik Adı"
                      />
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-medium text-foreground/35 mb-2.5 tracking-widest uppercase">
                        Cihaz
                      </label>
                      <div className="relative">
                        <select
                          value={form.device}
                          onChange={(e) => setForm((f) => ({ ...f, device: e.target.value }))}
                          className="w-full h-11 px-4 pr-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[13.5px] text-foreground/80 focus:outline-none focus:border-primary/40 focus:bg-white/[0.055] transition-all appearance-none"
                          style={{ colorScheme: "dark", backgroundColor: "#0d1422", color: "rgba(255,255,255,0.8)" }}
                        >
                          <option value="NeoGen Plasma" style={{ backgroundColor: "#0d1422", color: "rgba(255,255,255,0.85)" }}>NeoGen Plasma</option>
                          <option value="UltraClear" style={{ backgroundColor: "#0d1422", color: "rgba(255,255,255,0.85)" }}>UltraClear</option>
                          <option value="Diğer" style={{ backgroundColor: "#0d1422", color: "rgba(255,255,255,0.85)" }}>Diğer</option>
                        </select>
                        <ChevronDown size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/30 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-medium text-foreground/35 mb-2.5 tracking-widest uppercase">
                        Sorun / Talep Açıklaması
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.issue}
                        onChange={(e) => setForm((f) => ({ ...f, issue: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[13.5px] text-foreground/80 placeholder:text-foreground/20 focus:outline-none focus:border-primary/40 focus:bg-white/[0.055] transition-all resize-none"
                        placeholder="Lütfen sorun veya talebinizi açıklayın..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-12 text-[13.5px] font-semibold bg-primary text-[#07090f] hover:bg-primary/90 rounded-xl transition-all flex items-center justify-center gap-2.5"
                      style={{ boxShadow: "0 0 28px rgba(20,184,166,0.22), 0 4px 14px rgba(0,0,0,0.3)" }}
                    >
                      Destek Talebi Gönder
                      <ArrowRight size={15} />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

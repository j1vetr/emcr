import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench, ShieldCheck, GraduationCap, Phone, Mail,
  ChevronDown, Settings, Activity, Zap, Clock, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
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
    icon: <Settings className="w-6 h-6" />,
    title: "Kurulum Ve Devreye Alma",
    desc: "Cihaz teslimatında yerinde kurulum, hassas kalibrasyon ve ilk çalıştırma hizmetleri.",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Operatör Eğitimi",
    desc: "Sertifikalı eğitmenler eşliğinde uygulamalı protokol eğitimi ve sertifikasyon.",
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Periyodik Bakım",
    desc: "Üretici spesifikasyonlarına uygun yıllık bakım, kalibrasyon ve sistem kontrol hizmetleri.",
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Teknik Servis Ve Onarım",
    desc: "Eğitimli EMCR teknisyenlerince hızlı arıza müdahalesi ve orijinal yedek parça temini.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Garanti Kapsamı",
    desc: "2 yıl üretici garantisi. Cihaz gövdesi, elektronik ve lazer/plazma modülleri dahil.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Uzaktan Destek",
    desc: "Telefon ve video konferans ile uzaktan teknik danışmanlık ve protokol desteği.",
  },
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
  const [form, setForm] = useState<FormState>({ name: "", clinic: "", device: "NeoGen Plasma", phone: "", issue: "" });
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
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(79,195,195,0.06)_0%,_transparent_55%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-6">
            Teknik Destek
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display font-bold leading-[1.05] max-w-3xl mb-6"
            style={{ fontSize: "clamp(2.2rem, 4vw, 4.5rem)" }}>
            Satıştan Sonra Da{" "}
            <span className="text-primary">Yanınızdayız</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-foreground/50 text-lg leading-relaxed max-w-xl">
            EMCR Medikal, kapsamlı kurulum, sertifikalı eğitim, periyodik bakım ve teknik servis
            hizmetleriyle cihazınızın tüm yaşam döngüsü boyunca yanınızdadır.
          </motion.p>
        </div>
      </section>

      {/* Service Commitment */}
      <section className="py-12 bg-[#080c18] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="p-8 md:p-12 rounded-3xl bg-white/[0.025] border border-white/[0.06] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-4">
                  Servis Taahhüdümüz
                </p>
                <h2 className="font-display font-bold text-2xl md:text-3xl mb-5">
                  EMCR Medikal{" "}
                  <span className="text-primary">Teknik Altyapısı</span>
                </h2>
                <p className="text-foreground/50 leading-relaxed mb-5">
                  EMCR Medikal bünyesinde yetiştirilmiş, üretici firmalar tarafından sertifikalandırılmış
                  teknik ekibimiz, kurulum gününden itibaren cihazınızın kesintisiz ve verimli
                  çalışmasını güvence altına alır. Orijinal yedek parça stoku ve yerinde servis
                  kapasitesiyle Türkiye genelinde hızlı müdahale sunmaktayız.
                </p>
                <ul className="space-y-2">
                  {[
                    "Üretici sertifikalı EMCR teknik ekibi",
                    "Orijinal OEM yedek parça garantisi",
                    "Türkiye geneli yerinde servis kapasitesi",
                    "Önleyici bakım ve uzaktan izleme desteği",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-foreground/55">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "2", label: "Yıl Garanti", icon: <ShieldCheck className="w-4 h-4" /> },
                  { n: "24s", label: "Müdahale Hedefi", icon: <Clock className="w-4 h-4" /> },
                  { n: "100%", label: "Orijinal Parça", icon: <Star className="w-4 h-4" /> },
                  { n: "7/5", label: "Teknik Hat", icon: <Phone className="w-4 h-4" /> },
                ].map((s, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                    <p className="font-display font-bold text-3xl text-primary mb-1">{s.n}</p>
                    <p className="text-foreground/40 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-12 text-center">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-4">Hizmetler</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              Kapsamlı <span className="text-primary">Destek Paketi</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="p-7 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-primary/25 hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h3 className="font-semibold text-base mb-2 text-foreground/85">{s.title}</h3>
                <p className="text-foreground/45 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#080c18] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(79,195,195,0.04)_0%,_transparent_60%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-12">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-4">SSS</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              Sık Sorulan <span className="text-primary">Sorular</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="rounded-2xl bg-white/[0.025] border border-white/[0.06] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-white/[0.03] transition-colors"
                >
                  <span className="font-medium text-[15px] text-foreground/80">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-primary/60 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-white/[0.05]">
                        <p className="text-foreground/50 text-sm leading-relaxed pt-4">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,195,195,0.05)_0%,_transparent_55%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-4">
                Destek Talebi
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
                Teknik Destek<br />
                <span className="text-primary">Formu</span>
              </h2>
              <p className="text-foreground/50 leading-relaxed mb-8">
                Cihazınızla ilgili teknik sorun, bakım talebi veya sorularınız için aşağıdaki
                formu doldurun. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-foreground/40">
                  <Phone size={14} className="text-primary/60" />
                  <a href="tel:+90XXXXXXXXXX" className="hover:text-primary transition-colors">+90 XXX XXX XX XX</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/40">
                  <Mail size={14} className="text-primary/60" />
                  <a href="mailto:info@emcr.com.tr" className="hover:text-primary transition-colors">info@emcr.com.tr</a>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.025] border border-white/[0.06]">
              {sent ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">Talebiniz Alındı</h3>
                  <p className="text-foreground/45 text-sm">
                    E-posta istemciniz açıldı. Mesajı göndermek için lütfen onaylayın.
                    Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-xs text-foreground/30 hover:text-primary transition-colors"
                  >
                    Yeni Talep Oluştur
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-foreground/40 mb-2 tracking-wider uppercase">
                      Adınız Soyadınız
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-foreground/80 placeholder:text-foreground/25 focus:outline-none focus:border-primary/40 transition-colors"
                      placeholder="Dr. Adı Soyadı"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-foreground/40 mb-2 tracking-wider uppercase">
                      Klinik / Kurum Adı
                    </label>
                    <input
                      required
                      value={form.clinic}
                      onChange={(e) => setForm((f) => ({ ...f, clinic: e.target.value }))}
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-foreground/80 placeholder:text-foreground/25 focus:outline-none focus:border-primary/40 transition-colors"
                      placeholder="Klinik Adı"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-foreground/40 mb-2 tracking-wider uppercase">
                      Cihaz
                    </label>
                    <select
                      value={form.device}
                      onChange={(e) => setForm((f) => ({ ...f, device: e.target.value }))}
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-foreground/80 focus:outline-none focus:border-primary/40 transition-colors appearance-none"
                    >
                      <option value="NeoGen Plasma">NeoGen Plasma</option>
                      <option value="UltraClear">UltraClear</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-foreground/40 mb-2 tracking-wider uppercase">
                      Telefon
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full h-11 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-foreground/80 placeholder:text-foreground/25 focus:outline-none focus:border-primary/40 transition-colors"
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-foreground/40 mb-2 tracking-wider uppercase">
                      Sorun / Talep Açıklaması
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.issue}
                      onChange={(e) => setForm((f) => ({ ...f, issue: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-foreground/80 placeholder:text-foreground/25 focus:outline-none focus:border-primary/40 transition-colors resize-none"
                      placeholder="Lütfen sorun veya talebinizi açıklayın..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 text-sm font-semibold bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-xl"
                  >
                    Destek Talebi Gönder
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

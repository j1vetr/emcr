import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, ChevronDown, Zap, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
};

type Device = "neogen" | "ultraclear" | "her-ikisi";

interface Indication {
  name: string;
  description: string;
  device: Device;
  sessions: string;
  downtime: string;
  notes: string;
}

const indications: Indication[] = [
  {
    name: "Yüz Kırışıklıkları",
    description: "Alın, göz çevresi, nasolabial kıvrımlar ve dudak çevresindeki yüzeysel ile derin kırışıklıklar. Her iki sistem de yüksek etkinlik gösterir. Seçim yaşa, derinliğe ve hasta profiline göre yapılır.",
    device: "her-ikisi",
    sessions: "1–3 seans",
    downtime: "1–7 gün",
    notes: "NeoGen yüksek enerji modunda CO₂'ye eşdeğer sonuç verir. UltraClear ablative modda derin kırışıklar için idealdir.",
  },
  {
    name: "Cilt Sıkılaştırma ve Laksitesi",
    description: "Yüz, boyun ve dekolte bölgesinde cilt sarkması. Doku gerginliği ve kolajen yenilenmesi yoluyla sıkılaştırma. İki sistem birbirini tamamlar.",
    device: "her-ikisi",
    sessions: "1–3 seans",
    downtime: "3–7 gün",
    notes: "Birden fazla seans planlanan hastalarda NeoGen'in düşük enerji protokolleri bakım tedavisi olarak kullanılabilir.",
  },
  {
    name: "Akne İzleri ve Skar",
    description: "Yüzeysel ve orta derinlikte akne izleri, atrofik skar dokusu. NeoGen için FDA 510(k) onaylı endikasyon. UltraClear micro-ablative ve ablative modlarında etkin.",
    device: "her-ikisi",
    sessions: "2–4 seans",
    downtime: "3–7 gün",
    notes: "Derin box-car ve ice-pick izlerinde UltraClear ablative mod önerilir. Yüzeysel izlerde NeoGen düşük enerji protokolü yeterli olabilir.",
  },
  {
    name: "Pigmentasyon ve Melazma",
    description: "Güneş lekesi, yaşa bağlı pigmentasyon, melazma ve genel ton düzensizliği. NeoGen pigmente lezyonlarda FDA onaylıdır. UltraClear dalga boyu pigment seçiciliği nedeniyle etkilidir.",
    device: "her-ikisi",
    sessions: "1–3 seans",
    downtime: "1–5 gün",
    notes: "Melazma'da provokasyon riski gözetilerek NeoGen düşük enerji tercih edilebilir. Aktinik keratoz için NeoGen FDA onaylıdır.",
  },
  {
    name: "Göz Çevresi (Periorbital) Tedavi",
    description: "Alt göz kapağı kırışıklıkları, üst kapak sarkması ve göz çevresi cilt kalitesi. NeoGen, göz çevresinde uygulama için spesifik onayı olan ender sistemlerden biridir.",
    device: "neogen",
    sessions: "1–2 seans",
    downtime: "3–5 gün",
    notes: "Periorbital bölgede lazer kullanımı uzmanlık gerektirir. NeoGen'in ablative olmayan yüzey koruma özelliği bu bölgede avantaj sağlar.",
  },
  {
    name: "Yüz Dışı Cilt Yenileme",
    description: "Boyun, dekolte, eller, kol iç yüzü ve vücut bölgelerinde cilt kalitesi iyileştirmesi ve sıkılaştırma.",
    device: "neogen",
    sessions: "1–3 seans",
    downtime: "2–5 gün",
    notes: "NeoGen yüz dışı kırışıklar için FDA 510(k) onaylıdır. Vücut bölgelerinde lazer tedavisinin iyileşme süreci yüz bölgesinden farklı yönetilmelidir.",
  },
  {
    name: "Aktinik Keratoz",
    description: "Güneş hasarına bağlı prekanseröz lezyonlar. NeoGen bu endikasyon için FDA 510(k) onaylı ve klinik literatürde desteklidir.",
    device: "neogen",
    sessions: "1–2 seans",
    downtime: "3–7 gün",
    notes: "Dermatolojik değerlendirme sonrası uygulanmalıdır. NeoGen FDA 510(k) K132754 kapsamında onaylı.",
  },
  {
    name: "Seboreik Keratoz",
    description: "Benign pigmente epidermal lezyonlar. Fiziksel kaldırma yerine termal enerji ile etkili tedavi. NeoGen FDA onaylı.",
    device: "neogen",
    sessions: "1 seans",
    downtime: "3–5 gün",
    notes: "Histopatolojik şüphe durumunda önce biyopsi önerilir.",
  },
  {
    name: "Viral Papilloma (Siğil)",
    description: "HPV kaynaklı viral papillomalar. NeoGen'in termal etkisi ile etkin tedavi. FDA 510(k) kapsamında onaylı endikasyon.",
    device: "neogen",
    sessions: "1–3 seans",
    downtime: "3–7 gün",
    notes: "NeoGen FDA 510(k) K132754 kapsamında 7 onaylı endikasyondan biri.",
  },
  {
    name: "Rosacea ve Vasküler Lezyonlar",
    description: "Yaygın yüz kızarıklığı, telanjiektazi ve rosacea. UltraClear'ın 2910 nm dalga boyu vasküler hedeflerde etkindir, non-ablative modda sıfır downtime ile başlanabilir.",
    device: "ultraclear",
    sessions: "2–4 seans",
    downtime: "0–3 gün",
    notes: "Non-ablative mod ile başlayarak hasta toleransı ve cilt yanıtı değerlendirilebilir.",
  },
  {
    name: "Genel Cilt Kalitesi ve Parlaklık",
    description: "Doku düzensizliği, genişlemiş gözenekler, kabalık ve mat görünüm. Minimum prosedür süresi ile maksimum yenileme. Her iki sistem de etkin.",
    device: "ultraclear",
    sessions: "1–3 seans",
    downtime: "0–3 gün",
    notes: "UltraClear non-ablative mod ile aynı gün sosyal hayata dönüş mümkün. Bakım protokolleri için ideal.",
  },
];

const deviceColors: Record<Device, { label: string; bg: string; border: string; text: string; dot: string }> = {
  neogen: {
    label: "NeoGen Plasma",
    bg: "rgba(79,195,195,0.08)",
    border: "rgba(79,195,195,0.25)",
    text: "text-primary",
    dot: "bg-primary",
  },
  ultraclear: {
    label: "UltraClear",
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.25)",
    text: "text-sky-300",
    dot: "bg-sky-400",
  },
  "her-ikisi": {
    label: "Her İki Sistem",
    bg: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.1)",
    text: "text-foreground/70",
    dot: "bg-foreground/40",
  },
};

const filters: { label: string; value: Device | "all" }[] = [
  { label: "Tümü", value: "all" },
  { label: "NeoGen Plasma", value: "neogen" },
  { label: "UltraClear", value: "ultraclear" },
  { label: "Her İkisi", value: "her-ikisi" },
];

export default function TedaviEndikasyonlari() {
  const [activeFilter, setActiveFilter] = useState<Device | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = activeFilter === "all"
    ? indications
    : indications.filter((ind) => ind.device === activeFilter || (activeFilter === "her-ikisi" && ind.device === "her-ikisi"));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#070b17]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(79,195,195,0.07)_0%,_rgba(56,189,248,0.04)_40%,_transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-6">
              Klinik Rehber
            </p>
            <h1
              className="font-display font-bold leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)" }}
            >
              Tedavi<br />
              <span className="text-primary">Endikasyonları</span>
            </h1>
            <p className="text-foreground/50 text-base leading-relaxed max-w-xl mb-10">
              Cilt sorununa göre hangi sistem, kaç seans ve ne kadar iyileşme süresi. NeoGen Plasma
              ve UltraClear için klinik endikasyon rehberi. Doktorlar ve estetik klinikler için.
            </p>

            {/* Device legend */}
            <div className="flex flex-wrap gap-5">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-[11px] tracking-[0.15em] text-foreground/50 uppercase font-medium">NeoGen Plasma</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span className="text-[11px] tracking-[0.15em] text-foreground/50 uppercase font-medium">UltraClear</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-foreground/30" />
                <span className="text-[11px] tracking-[0.15em] text-foreground/50 uppercase font-medium">Her İkisi</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-10 bg-[#060912] border-y border-white/[0.04]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n: "11", label: "Tedavi Endikasyonu" },
              { n: "7", label: "FDA Onaylı (NeoGen)" },
              { n: "2", label: "Premium Sistem" },
              { n: "I–VI", label: "Fitzpatrick Tüm Tipler" },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="text-center"
              >
                <p className="font-display font-bold text-3xl text-primary mb-1">{s.n}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-foreground/35">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Indications */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(79,195,195,0.04)_0%,_transparent_60%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-14">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-5 py-2 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase transition-all duration-200 border ${
                  activeFilter === f.value
                    ? "bg-primary text-[#0a0e1a] border-primary"
                    : "border-white/10 text-foreground/45 hover:border-white/20 hover:text-foreground/70"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Accordion list */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="space-y-3"
            >
              {filtered.map((ind, i) => {
                const dc = deviceColors[ind.device];
                const isOpen = openIndex === i;
                return (
                  <motion.div
                    key={ind.name}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    className="rounded-2xl border overflow-hidden transition-all duration-300"
                    style={{ background: dc.bg, borderColor: dc.border }}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center gap-5 p-6 text-left group"
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dc.dot}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-display font-semibold text-lg text-foreground/90 group-hover:text-foreground transition-colors">
                            {ind.name}
                          </h3>
                          <span className={`text-[9px] tracking-[0.18em] font-semibold uppercase px-2.5 py-1 rounded-full border ${dc.text} border-current/30 opacity-70`}>
                            {dc.label}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 flex-shrink-0">
                        <div className="hidden md:block text-right">
                          <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/30 mb-0.5">Seans</p>
                          <p className="text-sm font-semibold text-foreground/60">{ind.sessions}</p>
                        </div>
                        <div className="hidden md:block text-right">
                          <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/30 mb-0.5">İyileşme</p>
                          <p className="text-sm font-semibold text-foreground/60">{ind.downtime}</p>
                        </div>
                        <ChevronDown
                          size={16}
                          className={`text-foreground/30 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-white/[0.05] pt-5">
                            <div className="grid md:grid-cols-3 gap-6">
                              <div className="md:col-span-2">
                                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                                  {ind.description}
                                </p>
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                  <ChevronRight size={14} className={`${dc.text} flex-shrink-0 mt-0.5`} />
                                  <p className="text-foreground/40 text-xs leading-relaxed italic">
                                    {ind.notes}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                  <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/30 mb-1">Tavsiye Edilen Seans</p>
                                  <p className={`font-display font-bold text-xl ${dc.text}`}>{ind.sessions}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                  <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/30 mb-1">İyileşme Süresi</p>
                                  <p className={`font-display font-bold text-xl ${dc.text}`}>{ind.downtime}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                  <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/30 mb-1.5">Sistem</p>
                                  <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${dc.dot}`} />
                                    <p className={`text-sm font-semibold ${dc.text}`}>{dc.label}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Comparison callout */}
      <section className="py-16 bg-[#060912] border-y border-white/[0.04]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="grid md:grid-cols-2 gap-8">
            {/* NeoGen card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-primary/20 bg-primary/5 hover:border-primary/35 transition-all group"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Zap size={15} className="text-primary" />
                </div>
                <p className="font-display font-bold text-lg text-foreground/90">NeoGen Plasma</p>
              </div>
              <p className="text-foreground/50 text-sm leading-relaxed mb-5">
                Azot plazma enerji sistemi. Cilt yüzeyi korunarak dermal mimari boyunca termal etki.
                7 FDA onaylı endikasyon, tüm vücut uygulaması, göz çevresi dahil.
              </p>
              <ul className="space-y-2 mb-6">
                {["Epidermal yüzey bütünlüğü korunur", "Yüz dışı bölgelerde onaylı", "Periorbital bölge uygulaması", "Bakım protokolü seçeneği"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground/55">
                    <ChevronRight size={12} className="text-primary/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="h-10 px-6 text-[12px] font-semibold bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-sm">
                <Link href="/urunler/neogen-plasma">NeoGen Plasma Sayfası</Link>
              </Button>
            </motion.div>

            {/* UltraClear card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl border border-sky-400/20 bg-sky-400/5 hover:border-sky-400/35 transition-all group"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-sky-400/15 border border-sky-400/30 flex items-center justify-center">
                  <Layers size={15} className="text-sky-400" />
                </div>
                <p className="font-display font-bold text-lg text-foreground/90">UltraClear</p>
              </div>
              <p className="text-foreground/50 text-sm leading-relaxed mb-5">
                2910 nm cold fiber laser. Sıfır downtimeden tam ablative yenilemeye üç mod.
                Trifecta ödüllü platform, tüm Fitzpatrick tipleri.
              </p>
              <ul className="space-y-2 mb-6">
                {["Sıfır downtime (non-ablative mod)", "Tüm cilt tiplerinde güvenli", "3DMIRACL® & 3DIntelliPulse®", "Aynı gün sosyal hayata dönüş"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground/55">
                    <ChevronRight size={12} className="text-sky-400/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="h-10 px-6 text-[12px] font-semibold rounded-sm bg-sky-400/10 border border-sky-400/30 hover:bg-sky-400/20 text-sky-300">
                <Link href="/urunler/ultraclear">UltraClear Sayfası</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(79,195,195,0.06)_0%,_transparent_65%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-5">Danışmanlık</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
              Hangi Sistem <span className="text-primary">Kliniğiniz İçin Doğru?</span>
            </h2>
            <p className="text-foreground/45 max-w-lg mx-auto mb-10">
              Hasta profilinize ve klinik hedeflerinize göre en uygun sistemi birlikte belirleyelim.
              Uzman ekibimiz ücretsiz değerlendirme sunar.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                className="h-12 px-8 text-[14px] font-semibold bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-sm"
              >
                <a href="mailto:info@emcr.com.tr">Ücretsiz Danışmanlık Al</a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-12 px-8 text-[14px] font-medium border border-white/20 hover:bg-white/5 rounded-sm"
              >
                <Link href="/iletisim">İletişim</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

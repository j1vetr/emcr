import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
};

type Event = {
  date: string;
  title: string;
  location: string;
  type: string;
  desc: string;
  upcoming?: boolean;
  link?: string;
};

const events: Event[] = [
  {
    date: "Eylül 2025",
    title: "EADV Kongresi 2025",
    location: "Amsterdam, Hollanda",
    type: "Kongre",
    desc: "Avrupa Dermatoloji ve Venereoloji Akademisi'nin yıllık kongresi. NeoGen Plasma ve UltraClear sistemleri ile klinik vaka sunumları.",
    upcoming: true,
  },
  {
    date: "Kasım 2025",
    title: "Türk Dermatoloji Kongresi 2025",
    location: "İstanbul, Türkiye",
    type: "Kongre",
    desc: "Türk Dermatoloji Derneği'nin yıllık kongresinde EMCR Medikal standı ve canlı demonstrasyonlar.",
    upcoming: true,
  },
  {
    date: "Haziran 2025",
    title: "EMCR Klinik Eğitim Günü",
    location: "İstanbul, Türkiye",
    type: "Eğitim",
    desc: "NeoGen Plasma ve UltraClear kullanıcıları için protokol güncellemeleri, vaka paylaşımları ve uygulamalı eğitim.",
    upcoming: true,
  },
  {
    date: "Nisan 2025",
    title: "IMCAS World Congress 2025",
    location: "Paris, Fransa",
    type: "Kongre",
    desc: "Dünya çapında medikal estetik profesyonellerini bir araya getiren prestijli kongre. Soğuk ablasyon teknolojisi oturumu.",
  },
  {
    date: "Mart 2025",
    title: "UltraClear Lansman Eğitimi",
    location: "İstanbul, Türkiye",
    type: "Eğitim",
    desc: "UltraClear lazer sisteminin Türkiye lansmanı kapsamında gerçekleştirilen ilk kullanıcı eğitim günü.",
  },
  {
    date: "Kasım 2024",
    title: "Türk Dermatoloji Kongresi 2024",
    location: "Antalya, Türkiye",
    type: "Kongre",
    desc: "EMCR Medikal, NeoGen Plasma ile Türk Dermatoloji Kongresi'nde en çok ilgi gören standlar arasında yer aldı.",
  },
  {
    date: "Eylül 2024",
    title: "EADV Kongresi 2024",
    location: "Viyana, Avusturya",
    type: "Kongre",
    desc: "Avrupa'nın en büyük dermatoloji kongresinde NeoGen Plasma klinik verileri sunuldu, EMCR ekibi temsil etti.",
  },
  {
    date: "Temmuz 2024",
    title: "NeoGen Plasma Doktor Eğitimi",
    location: "Ankara, Türkiye",
    type: "Eğitim",
    desc: "Merkezi Anadolu bölgesi klinikleri için NeoGen Plasma protokol eğitimi ve uygulamalı sertifikasyon günü.",
  },
  {
    date: "Mayıs 2024",
    title: "AMWC Medikal Estetik Kongresi",
    location: "Monaco",
    type: "Kongre",
    desc: "Dünya Medikal Estetik Kongresi'nde NeoGen ve UltraClear teknolojileri uluslararası meslektaşlarla paylaşıldı.",
  },
];

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  Kongre: { bg: "rgba(79,195,195,0.08)", text: "rgba(79,195,195,0.8)", border: "rgba(79,195,195,0.2)" },
  Eğitim: { bg: "rgba(56,189,248,0.08)", text: "rgba(56,189,248,0.8)", border: "rgba(56,189,248,0.2)" },
  Demo: { bg: "rgba(168,85,247,0.08)", text: "rgba(168,85,247,0.8)", border: "rgba(168,85,247,0.2)" },
};

export default function Etkinliklerimiz() {
  const upcoming = events.filter((e) => e.upcoming);
  const past = events.filter((e) => !e.upcoming);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(79,195,195,0.06)_0%,_transparent_55%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-6"
          >
            Etkinliklerimiz
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold leading-[1.05] max-w-2xl mb-6"
            style={{ fontSize: "clamp(2.8rem, 5vw, 5.5rem)" }}
          >
            Kongre, Eğitim &{" "}
            <span className="text-primary">Demo Günleri</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-foreground/50 text-lg leading-relaxed max-w-xl"
          >
            EMCR Medikal olarak ulusal ve uluslararası medikal estetik etkinliklerinde aktif
            rol alıyor, klinik eğitimler ve demonstrasyon günleri düzenliyoruz.
          </motion.p>
        </div>
      </section>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="py-16 bg-[#080c18] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(79,195,195,0.04)_0%,_transparent_60%)] pointer-events-none" />
          <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/70">
                Yaklaşan Etkinlikler
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcoming.map((ev, i) => {
                const col = typeColors[ev.type] ?? typeColors["Kongre"];
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className="p-7 rounded-2xl bg-white/[0.03] border border-primary/20 hover:border-primary/35 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider mb-5 border"
                      style={{ background: col.bg, color: col.text, borderColor: col.border }}
                    >
                      {ev.type}
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3 group-hover:text-primary transition-colors">{ev.title}</h3>
                    <p className="text-foreground/45 text-sm leading-relaxed mb-6">{ev.desc}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-foreground/35">
                        <Calendar size={12} className="text-primary/50" />
                        {ev.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-foreground/35">
                        <MapPin size={12} className="text-primary/50" />
                        {ev.location}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      <section className="py-20 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-foreground/30 mb-10">
            Geçmiş Etkinlikler
          </p>

          <div className="space-y-3">
            {past.map((ev, i) => {
              const col = typeColors[ev.type] ?? typeColors["Kongre"];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="flex flex-col md:flex-row md:items-center gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.03] transition-all duration-300 group"
                >
                  <div className="md:w-28 flex-shrink-0">
                    <p className="text-sm text-foreground/30 font-medium">{ev.date}</p>
                  </div>
                  <div
                    className="hidden md:flex items-center justify-center w-20 flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider border"
                    style={{ background: col.bg, color: col.text, borderColor: col.border }}
                  >
                    {ev.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base text-foreground/80 group-hover:text-foreground/95 transition-colors mb-1">{ev.title}</h3>
                    <p className="text-foreground/40 text-sm leading-relaxed line-clamp-1">{ev.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground/30 flex-shrink-0">
                    <MapPin size={12} />
                    {ev.location}
                  </div>
                  {ev.link && (
                    <a href={ev.link} target="_blank" rel="noopener noreferrer" className="text-foreground/25 hover:text-primary transition-colors flex-shrink-0">
                      <ExternalLink size={15} />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#070b17] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(79,195,195,0.06)_0%,_transparent_60%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-5">
              Etkinlik ve Eğitim Bilgileri için{" "}
              <span className="text-primary">Bize Ulaşın</span>
            </h2>
            <p className="text-foreground/45 max-w-lg mx-auto mb-8">
              Yaklaşan etkinliklerimiz, özel eğitim günleri veya demo talepleri için iletişime geçebilirsiniz.
            </p>
            <a
              href="mailto:info@emcr.com.tr"
              className="inline-flex items-center gap-2 h-12 px-8 text-[14px] font-semibold bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-sm transition-all"
            >
              İletişime Geç
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

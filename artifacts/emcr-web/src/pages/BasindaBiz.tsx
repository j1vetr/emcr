import { motion } from "framer-motion";
import { ExternalLink, Newspaper } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
};

type PressItem = {
  publication: string;
  category: string;
  date: string;
  headline: string;
  excerpt: string;
  url: string;
  featured?: boolean;
  accentColor: string;
  borderColor: string;
};

const pressItems: PressItem[] = [
  {
    publication: "Elite Hayat",
    category: "Manşet",
    date: "2025",
    headline: "Medical Estetikte Türkiye'de Bir İlk",
    excerpt:
      "EMCR Medikal, NeoGen Plasma ve UltraClear sistemleri ile Türkiye'de medikal estetik alanında çığır açıyor. Nitrojen plazma teknolojisi ve soğuk fiber lazer sistemleri ilk kez ülkemizde hizmet sunmaya başladı.",
    url: "https://elitehayat.com/manset/medical-estetikte-turkiyede-bir-ilk/",
    featured: true,
    accentColor: "rgba(79,195,195,0.12)",
    borderColor: "rgba(79,195,195,0.2)",
  },
  {
    publication: "Klass Magazin",
    category: "Güzellik ve Sağlık",
    date: "2025",
    headline: "UltraClear Türkiye'de İlk Kez Tanıtıldı",
    excerpt:
      "2910 nm dalga boyunda çalışan UltraClear soğuk fiber lazer sistemi, EMCR Medikal aracılığıyla Türkiye pazarına girdi. 3DMIRACL® teknolojisiyle cilt yenileme ve resurfacing alanında yeni bir dönem başlıyor.",
    url: "https://www.klassmagazin.com/ultraclear-turkiyede-ilk-kez-tanitildi",
    featured: false,
    accentColor: "rgba(56,189,248,0.10)",
    borderColor: "rgba(56,189,248,0.2)",
  },
];

export default function BasindaBiz() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#070b17]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(79,195,195,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <Newspaper className="w-4 h-4 text-primary/60" />
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary/60">
                Basın Haberleri
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-5"
              style={{
                background: "linear-gradient(135deg, #ffffff 30%, rgba(255,255,255,0.55) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                paddingBottom: "0.1em",
                display: "inline-block",
              }}
            >
              Basında Biz
            </h1>

            <p className="text-foreground/45 text-base md:text-lg leading-relaxed max-w-xl">
              EMCR Medikal ve Türkiye'ye getirdiğimiz medikal estetik teknolojileri hakkında ulusal medyada yer alan haberler.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Press Cards ─────────────────────────────────────────────────── */}
      <section className="relative bg-[#070b17] pb-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {pressItems.map((item, i) => (
              <motion.a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${item.accentColor} 0%, rgba(255,255,255,0.02) 100%)`,
                  borderColor: item.borderColor,
                }}
              >
                {/* Top bar */}
                <div
                  className="h-[2px] w-full"
                  style={{ background: `linear-gradient(90deg, ${item.borderColor.replace("0.2", "0.7")}, transparent)` }}
                />

                <div className="flex flex-col flex-1 p-8">
                  {/* Meta row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border"
                        style={{ borderColor: item.borderColor, color: item.borderColor.replace("0.2", "0.8") }}
                      >
                        {item.category}
                      </span>
                      <span className="text-foreground/25 text-[11px]">{item.date}</span>
                    </div>
                    <ExternalLink
                      className="w-4 h-4 text-foreground/25 transition-all duration-300 group-hover:text-foreground/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>

                  {/* Publication */}
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-foreground/35 mb-3">
                    {item.publication}
                  </p>

                  {/* Headline */}
                  <h2 className="text-xl md:text-2xl font-bold leading-snug tracking-tight text-foreground/90 mb-4 group-hover:text-white transition-colors duration-300">
                    {item.headline}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-foreground/45 text-sm leading-relaxed flex-1">
                    {item.excerpt}
                  </p>

                  {/* CTA */}
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold"
                    style={{ color: item.borderColor.replace("0.2", "0.75") }}>
                    <span>Haberi Oku</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

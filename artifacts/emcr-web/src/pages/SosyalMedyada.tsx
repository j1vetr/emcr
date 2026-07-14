import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
};

const INSTAGRAM_URL = "https://www.instagram.com/emcrmedikal/";

const posts = [
  {
    label: "NeoGen Plasma · Klinik Sonuç",
    desc: "Nitrogen plasma teknolojisiyle gerçekleştirilen cilt yenileme seansı sonrası dikkat çekici dönüşüm.",
  },
  {
    label: "UltraClear™ · Live Demo",
    desc: "Kongre salonunda canlı demonstrasyon ile UltraClear soğuk ablasyon teknolojisinin farkını yaşayın.",
  },
  {
    label: "Eğitim Günü",
    desc: "Klinik operatörlerimizin katıldığı protokol eğitim günümüzden kareler.",
  },
  {
    label: "NeoGen Plasma · Before & After",
    desc: "Tek seans ile elde edilen yüz yenileme sonuçları. Gerçek hasta, gerçek klinik ortam.",
  },
  {
    label: "EADV Kongresi",
    desc: "Uluslararası dermatoloji kongresinde EMCR Medikal standı ve klinik oturumu sunumu.",
  },
  {
    label: "UltraClear™ · Cilt Tonu",
    desc: "Fitzpatrick IV cilt tipi hastada non-ablative mod uygulaması ve hafta sonrası sonuç karşılaştırması.",
  },
];

export default function SosyalMedyada() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(131,58,180,0.05)_0%,_rgba(79,195,195,0.04)_50%,_transparent_75%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div className="flex items-center gap-3 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Instagram size={18} className="text-[#E1306C]/70" />
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-foreground/40">
              Sosyal Medyada Biz
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold leading-[1.05] max-w-2xl mb-6"
            style={{ fontSize: "clamp(2.8rem, 5vw, 5.5rem)" }}
          >
            EMCR Medikal{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1306C] via-[#fd5949] to-primary">
              Instagram'da
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-foreground/50 text-lg leading-relaxed max-w-xl mb-8"
          >
            Klinik sonuçlar, canlı demonstrasyonlar, etkinlik kareleri ve ürün güncellemeleri
            için Instagram sayfamızı takip edin.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 h-11 px-6 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Instagram size={16} />
            @emcrmedikal
          </motion.a>
        </div>
      </section>

      {/* Pinned Video */}
      <section className="py-16 bg-[#080c18] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-2 rounded-full bg-[#E1306C]/70 animate-pulse" />
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-foreground/35">
              Sabitlenmiş Video
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-[#0d1422] shadow-2xl"
          >
            {/* Instagram Embed — replace the src with the actual pinned post embed URL */}
            <div
              className="w-full flex items-center justify-center"
              style={{ minHeight: 480 }}
            >
              <iframe
                src="https://www.instagram.com/p/REPLACE_WITH_POST_ID/embed"
                className="w-full"
                style={{ height: 540, border: "none", background: "transparent" }}
                loading="lazy"
                title="EMCR Medikal Instagram Pinned Video"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              />
            </div>

            {/* Overlay for when embed hasn't loaded or is replaced */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#0d1422] z-10 pointer-events-none opacity-0"
              id="ig-placeholder"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] flex items-center justify-center">
                <Instagram size={28} className="text-white" />
              </div>
              <div className="text-center">
                <p className="font-display font-bold text-2xl mb-2">Sabitlenmiş Video</p>
                <p className="text-foreground/40 text-sm max-w-xs">
                  Instagram embed URL'sini güncellemek için
                  <code className="mx-1 px-1.5 py-0.5 rounded bg-white/5 text-xs text-primary">SosyalMedyada.tsx</code>
                  dosyasındaki REPLACE_WITH_POST_ID kısmını değiştirin.
                </p>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white text-sm font-semibold hover:opacity-90 transition-opacity pointer-events-auto"
              >
                <ExternalLink size={14} />
                Instagram'da Görüntüle
              </a>
            </div>
          </motion.div>

          <p className="mt-4 text-foreground/25 text-xs text-center">
            Instagram embed URL'sini <code className="text-primary/60">SosyalMedyada.tsx</code> dosyasındaki
            <code className="text-primary/60"> REPLACE_WITH_POST_ID</code> alanıyla güncelleyin.
          </p>
        </div>
      </section>

      {/* Post Grid */}
      <section className="py-20 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="flex items-center justify-between mb-10">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-foreground/30">
              Son Paylaşımlar
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-foreground/35 hover:text-primary transition-colors"
            >
              Tümünü Gör
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <motion.a
                key={i}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="group block rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
              >
                {/* Placeholder image area */}
                <div className="relative aspect-square bg-[#0d1422] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#833AB4]/30 via-[#E1306C]/30 to-[#F77737]/30 border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Instagram size={22} className="text-foreground/30" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080c18]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <span className="text-[10px] font-semibold tracking-widest text-foreground/40">
                      @emcrmedikal
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4]/5 via-[#E1306C]/5 to-[#F77737]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5">
                  <p className="font-semibold text-sm text-foreground/75 mb-2 group-hover:text-foreground/95 transition-colors">
                    {post.label}
                  </p>
                  <p className="text-foreground/40 text-xs leading-relaxed line-clamp-2">{post.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 h-12 px-8 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white font-semibold hover:opacity-90 transition-opacity text-sm"
            >
              <Instagram size={16} />
              Tüm Paylaşımları Gör
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

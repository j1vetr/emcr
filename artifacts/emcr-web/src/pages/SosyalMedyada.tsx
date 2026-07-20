import { useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const INSTAGRAM_URL = "https://www.instagram.com/emcrmedikal/";

const POSTS = [
  "https://www.instagram.com/p/DVSgo3VDERP/",
  "https://www.instagram.com/p/Daz3Iacu7ST/",
  "https://www.instagram.com/p/DZrg9FjjOHB/",
  "https://www.instagram.com/p/DYegICyscIv/",
  "https://www.instagram.com/p/DTStkgNDKjo/",
  "https://www.instagram.com/p/DPhONh0Cnpu/",
  "https://www.instagram.com/p/DPWdtBPjKfz/",
];

export default function SosyalMedyada() {
  useEffect(() => {
    const scriptId = "instagram-embed-script";
    if (document.getElementById(scriptId)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).instgrm?.Embeds?.process();
      return;
    }
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* ── Hero: sol başlık + sağ pinli gönderi ─────────────────────── */}
      <section className="relative pt-24 pb-10 overflow-hidden bg-[#070b17]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 80% 40%, rgba(225,48,108,0.05) 0%, rgba(20,184,166,0.04) 60%, transparent 100%)",
          }}
        />

        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Sol — başlık + metin */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-7">
                <Instagram size={17} className="text-[#E1306C]/75" />
                <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-foreground/40">
                  Sosyal Medyada Biz
                </p>
              </div>

              <h1
                className="font-display font-bold leading-[1.05] mb-7"
                style={{ fontSize: "clamp(2.6rem, 4vw, 4.4rem)" }}
              >
                EMCR Medikal{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(110deg, #833AB4, #E1306C, #F77737)",
                    display: "inline-block",
                    paddingBottom: "0.08em",
                  }}
                >
                  Instagram'da
                </span>
              </h1>

              <p className="text-foreground/45 text-[15px] leading-relaxed max-w-md mb-10">
                Klinik sonuçlar, canlı demonstrasyonlar, etkinlik kareleri ve
                ürün güncellemeleri için sayfamızı takip edin.
              </p>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 h-11 px-6 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(90deg, #833AB4, #E1306C, #F77737)" }}
              >
                <Instagram size={15} />
                @emcrmedikal
              </a>
            </motion.div>

            {/* Sağ — öne çıkan (pinli) gönderi */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-[380px]">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E1306C]/70 animate-pulse" />
                  <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-foreground/30">
                    Öne Çıkan Gönderi
                  </p>
                </div>
                <div style={{ maxHeight: "520px", overflow: "hidden", borderRadius: "16px" }}>
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={POSTS[0]}
                    data-instgrm-version="14"
                    style={{
                      background: "#0d1422",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "16px",
                      maxWidth: "380px",
                      width: "100%",
                      minWidth: "260px",
                      margin: "0",
                      padding: "0",
                    }}
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Diğer postlar — 3'lü grid ─────────────────────────────────── */}
      <section className="py-16 bg-[#080c18]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="flex items-center justify-between mb-10">
            <p className="text-[10.5px] font-semibold tracking-[0.3em] uppercase text-foreground/30">
              Son Paylaşımlar
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11.5px] text-foreground/30 hover:text-primary transition-colors"
            >
              Tümünü Gör
              <ExternalLink size={11} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.slice(1).map((url, i) => (
              <motion.div
                key={url}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center"
              >
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                  style={{
                    background: "#0d1422",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                    maxWidth: "480px",
                    width: "100%",
                    minWidth: "280px",
                    margin: "0",
                    padding: "0",
                  }}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 h-12 px-8 rounded-full text-white font-semibold hover:opacity-90 transition-opacity text-[13.5px]"
              style={{ background: "linear-gradient(90deg, #833AB4, #E1306C, #F77737)" }}
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

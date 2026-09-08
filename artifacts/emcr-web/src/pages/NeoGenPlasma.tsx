import { useState, useEffect } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Assets
import neogenLogo from "@assets/neogen-logo.webp";
import neogenDevice from "@assets/yeni_fot_1784560619600.png";
import neogenTreatment from "@assets/neogen-treatment.webp";

const getAssetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}`;
};

export default function NeoGenPlasma() {
  const prefersReducedMotion = useReducedMotion();
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const origTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const origDesc = metaDesc ? metaDesc.getAttribute("content") : "";

    document.title = "NeoGen Plasma | EMCR Medikal";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content", 
        "EMCR Medikal, NeoGen Plasma sisteminin Türkiye distribütörüdür. Cihaz bilgileri ve destek için iletişime geçin."
      );
    }

    return () => {
      document.title = origTitle;
      if (metaDesc && origDesc !== null) {
        metaDesc.setAttribute("content", origDesc);
      }
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="min-h-screen bg-[#080C16] text-[#F2EFE9] font-sans selection:bg-[#0D9488]/30">
      <Navbar />

      <main className="pt-[100px] md:pt-[140px] pb-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-12 gap-px bg-[#182336] border border-[#182336]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Hero Text Cell */}
            <motion.div variants={itemVariants} className="md:col-span-7 bg-[#0B101A] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center min-h-[50vh]">
              <img src={neogenLogo} alt="NeoGen" className="w-auto h-8 md:h-10 mb-8 object-contain self-start opacity-90 invert" />
              
              <span className="block text-xs font-bold tracking-[0.15em] uppercase text-[#0D9488] mb-5" lang="en">
                Nitrogen Plasma Skin Regeneration
              </span>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F2EFE9] mb-6 leading-[1.05]">
                Nitrojen Plazma Sistemi
              </h1>
              
              <p className="text-lg md:text-xl text-[#9AA6B8] max-w-xl leading-relaxed mb-8">
                Klinikler için tasarlanmış, azot gazı ve RF enerjisi ile çalışan plazma teknolojisi.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:info@emcr.com.tr" 
                  className="inline-flex items-center justify-center bg-[#0D9488] text-[#080C16] px-8 py-4 text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#14B8A6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2EFE9]"
                >
                  İletişime Geç
                </a>
              </div>
            </motion.div>

            {/* Hero Device Image Cell */}
            <motion.div variants={itemVariants} className="md:col-span-5 bg-[#0B101A] p-6 sm:p-8 lg:p-12 flex flex-col items-center justify-center relative min-h-[400px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square bg-[#080C16] rounded-full" />
              <img 
                src={neogenDevice} 
                alt="NeoGen Cihazı" 
                className="w-full max-w-[280px] object-contain relative z-10 drop-shadow-2xl"
                fetchPriority="high"
              />
            </motion.div>

            {/* Sistem Bileşenleri Cell */}
            <motion.div variants={itemVariants} className="md:col-span-12 bg-[#0B101A] p-6 sm:p-8 lg:p-12">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-[#9AA6B8] mb-8">Sistem Bileşenleri</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                <div>
                  <h3 className="text-[#F2EFE9] font-bold mb-3">Nitrojen gazı</h3>
                  <p className="text-sm text-[#9AA6B8] leading-relaxed">
                    Medikal kalite azot gazı, sistem içerisinde iyonize edilerek nitrojen plazmaya dönüştürülür.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#F2EFE9] font-bold mb-3">RF kaynağı</h3>
                  <p className="text-sm text-[#9AA6B8] leading-relaxed">
                    Gazın plazma haline geçişi, cihaza entegre radyo frekans enerji kaynağı kullanılarak sağlanır.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#F2EFE9] font-bold mb-3">Uygulama nozulu</h3>
                  <p className="text-sm text-[#9AA6B8] leading-relaxed">
                    Üretilen plazma enerjisi, ergonomik tasarımlı el probu ve nozul aracılığıyla yüzeye iletilir.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#F2EFE9] font-bold mb-3">Kontrol ekranı</h3>
                  <p className="text-sm text-[#9AA6B8] leading-relaxed">
                    Cihazın üzerindeki entegre dokunmatik ekran sayesinde tüm sistem parametreleri yönetilir.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Video Title Cell */}
            <motion.div variants={itemVariants} className="md:col-span-4 bg-[#0B101A] p-6 sm:p-8 lg:p-12">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-[#9AA6B8] mb-4">Sistem Tanıtımı</h2>
              <div className="h-0.5 w-6 bg-[#0D9488]"></div>
            </motion.div>

            {/* Video Player Cell */}
            <motion.div variants={itemVariants} className="md:col-span-8 bg-[#0B101A] p-6 sm:p-8 lg:p-12 flex flex-col">
              <div className="relative aspect-video w-full bg-[#080C16]">
                <video
                  src={getAssetUrl("/neogen-demo.mp4")}
                  poster={neogenTreatment}
                  className="w-full h-full object-contain"
                  controls
                  playsInline
                  preload="metadata"
                  onError={() => setVideoError(true)}
                />
              </div>
              {videoError && (
                <div className="mt-4 p-4 border border-[#182336] bg-[#0B101A] text-sm text-[#9AA6B8]">
                  Medya yüklenemedi. <a href={getAssetUrl("/neogen-demo.mp4")} target="_blank" rel="noopener noreferrer" className="text-[#0D9488] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0D9488]">Dosyayı doğrudan görüntülemek için tıklayın.</a>
                </div>
              )}
            </motion.div>

            {/* Context Title Cell */}
            <motion.div variants={itemVariants} className="md:col-span-4 bg-[#0B101A] p-6 sm:p-8 lg:p-12">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-[#9AA6B8] mb-4">Etkinlikler</h2>
              <div className="h-0.5 w-6 bg-[#0D9488]"></div>
            </motion.div>

            {/* Context Content Cell */}
            <motion.div variants={itemVariants} className="md:col-span-8 bg-[#0B101A] p-0 flex flex-col md:flex-row">
              <Link href="/etkinliklerimiz" className="flex-1 p-2 sm:p-3 md:p-4 border-b md:border-b-0 md:border-r border-[#182336] group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0D9488]">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#080C16]">
                  <img 
                    src={getAssetUrl("/events/paris-2026/1.jpg")} 
                    alt="Paris IMCAS 2026 Kongresi" 
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-[filter,opacity] duration-500" 
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#0B101A] text-[#F2EFE9] px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase">
                    Paris IMCAS 2026
                  </div>
                </div>
              </Link>
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                <p className="text-[#9AA6B8] text-base leading-relaxed">
                  Uluslararası kongreler ve medikal etkinliklerdeki güncel ürün sunumlarımızı inceleyin.
                </p>
                <div>
                  <Link 
                    href="/etkinliklerimiz" 
                    className="inline-flex items-center text-[11px] md:text-xs font-bold tracking-wider uppercase text-[#0D9488] hover:text-[#14B8A6] transition-colors mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2EFE9]"
                  >
                    Tüm Etkinlikler &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Distributor Title Cell */}
            <motion.div variants={itemVariants} className="md:col-span-4 bg-[#0B101A] p-6 sm:p-8 lg:p-12">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-[#9AA6B8] mb-4">Türkiye Distribütörü</h2>
              <div className="h-0.5 w-6 bg-[#0D9488]"></div>
            </motion.div>

            {/* Distributor Content Cell */}
            <motion.div variants={itemVariants} className="md:col-span-8 bg-[#0B101A] p-6 sm:p-8 lg:p-12">
              <div className="flex flex-col space-y-6 text-[#F2EFE9] text-base md:text-lg leading-relaxed max-w-3xl">
                <p>
                  EMCR Medikal, NeoGen Plasma sisteminin Türkiye distribütörüdür.
                </p>
                <p>
                  Ürün bilgisi, eğitim ve destek talepleriniz için ekibimizle iletişime geçebilirsiniz.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link 
                    href="/teknik-destek" 
                    className="inline-flex items-center justify-center bg-transparent border border-[#182336] text-[#F2EFE9] px-8 py-4 text-xs font-bold tracking-[0.15em] uppercase hover:border-[#9AA6B8] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2EFE9]"
                  >
                    Teknik Destek
                  </Link>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Assets
import neogenLogo from "@assets/neogen-logo.webp";
import neogenDevice from "@assets/yeni_fot_1784560619600.png";
import neogenTreatment from "@assets/neogen-treatment.webp";
import neogenPlatform from "@assets/neogen-platform.webp";

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

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: prefersReducedMotion ? 0 : 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 }
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#04161C] text-[#F4F1EA] font-sans selection:bg-[#B69A72]/30 selection:text-white">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-[100dvh] w-full flex items-center pt-24 md:pt-0 overflow-hidden bg-[#04161C]">
          
          <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center h-full mt-4 lg:mt-0">
            
            {/* Text Content */}
            <motion.div 
              className="lg:col-span-7 flex flex-col items-start justify-center pt-6 pb-4 lg:py-0"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.img 
                variants={fadeUp}
                src={neogenLogo} 
                alt="NeoGen Logo" 
                className="h-10 md:h-14 lg:h-16 mb-12 opacity-90 invert object-contain" 
              />
              
              <motion.span 
                variants={fadeUp}
                className="block text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-[#B69A72] mb-6" 
                lang="en"
              >
                Nitrogen Plasma Skin Regeneration
              </motion.span>
              
              <motion.h1 
                variants={fadeUp}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-medium tracking-tighter text-[#F4F1EA] mb-8 leading-[0.95]"
              >
                Nitrojen<br/>
                <span className="text-[#8FA5AE]">Plazma</span><br/>
                Sistemi
              </motion.h1>
              
              <motion.p 
                variants={fadeUp}
                className="text-lg md:text-2xl text-[#8FA5AE] max-w-xl font-light leading-relaxed mb-12"
              >
                Klinikler için tasarlanmış, azot gazı ve RF enerjisi ile çalışan ileri düzey plazma teknolojisi.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
                <a 
                  href="mailto:info@emcr.com.tr" 
                  className="group relative inline-flex items-center justify-center bg-[#B69A72] text-[#04161C] px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase overflow-hidden transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04161C] focus-visible:ring-[#B69A72]"
                >
                  <span className="relative z-10 transition-colors group-hover:text-white">İletişime Geç</span>
                  <div className="absolute inset-0 bg-[#967C5A] transform scale-x-0 origin-left transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-x-100" />
                </a>
              </motion.div>
            </motion.div>
            
            {/* Hero Image */}
            <motion.div 
              className="lg:col-span-5 relative w-full h-[440px] lg:h-screen flex items-center justify-center lg:justify-end"
              initial={{ opacity: 1, scale: prefersReducedMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <img 
                src={neogenDevice} 
                alt="NeoGen Cihazı" 
                className="max-w-none w-auto h-full lg:absolute lg:w-[160%] xl:w-[180%] lg:h-auto object-contain object-center z-10 transform lg:translate-x-1/4"
                fetchPriority="high"
              />
            </motion.div>
          </div>
        </section>

        {/* PLATFORM / FEATURES (Matte Light Surface) */}
        <section className="bg-[#EBE7DF] text-[#061F28] py-24 md:py-40">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
              
              {/* Image side */}
              <div className="order-2 lg:order-1 relative group">
                <div className="overflow-hidden bg-[#D9D3C8] aspect-[4/5] md:aspect-square w-full relative">
                  <img 
                    src={neogenPlatform} 
                    alt="NeoGen Platformu" 
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-[#04161C]/5 mix-blend-multiply pointer-events-none" />
                </div>
              </div>

              {/* Text side */}
              <div className="order-1 lg:order-2 flex flex-col justify-center pt-8">
                <div className="mb-16">
                  <span className="block text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-[#B69A72] mb-6">
                    Teknoloji
                  </span>
                  <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight leading-[1.05]">
                    Sistem Bileşenleri
                  </h2>
                </div>

                <div className="flex flex-col gap-10 md:gap-14">
                  {/* Feature 1 */}
                  <div className="flex flex-col gap-3 relative before:absolute before:-left-6 before:top-2 before:bottom-0 before:w-px before:bg-[#061F28]/10">
                    <h3 className="text-xl md:text-2xl font-display font-medium text-[#04161C]">Nitrojen gazı</h3>
                    <p className="text-[#061F28]/70 text-base md:text-lg font-light leading-relaxed max-w-md">
                      Medikal kalite azot gazı, sistem içerisinde iyonize edilerek nitrojen plazmaya dönüştürülür.
                    </p>
                  </div>
                  
                  {/* Feature 2 */}
                  <div className="flex flex-col gap-3 relative before:absolute before:-left-6 before:top-2 before:bottom-0 before:w-px before:bg-[#061F28]/10">
                    <h3 className="text-xl md:text-2xl font-display font-medium text-[#04161C]">RF kaynağı</h3>
                    <p className="text-[#061F28]/70 text-base md:text-lg font-light leading-relaxed max-w-md">
                      Gazın plazma haline geçişi, cihaza entegre radyo frekans enerji kaynağı kullanılarak sağlanır.
                    </p>
                  </div>
                  
                  {/* Feature 3 */}
                  <div className="flex flex-col gap-3 relative before:absolute before:-left-6 before:top-2 before:bottom-0 before:w-px before:bg-[#061F28]/10">
                    <h3 className="text-xl md:text-2xl font-display font-medium text-[#04161C]">Uygulama nozulu</h3>
                    <p className="text-[#061F28]/70 text-base md:text-lg font-light leading-relaxed max-w-md">
                      Üretilen plazma enerjisi, ergonomik tasarımlı el probu ve nozul aracılığıyla yüzeye iletilir.
                    </p>
                  </div>
                  
                  {/* Feature 4 */}
                  <div className="flex flex-col gap-3 relative before:absolute before:-left-6 before:top-2 before:bottom-0 before:w-px before:bg-[#061F28]/10">
                    <h3 className="text-xl md:text-2xl font-display font-medium text-[#04161C]">Kontrol ekranı</h3>
                    <p className="text-[#061F28]/70 text-base md:text-lg font-light leading-relaxed max-w-md">
                      Cihazın üzerindeki entegre dokunmatik ekran sayesinde tüm sistem parametreleri yönetilir.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* VIDEO EXPERIENCE */}
        <section className="bg-[#04161C] text-[#F4F1EA] py-24 md:py-40">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
               <span className="block text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-[#B69A72] mb-6">
                İşleyiş
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight mb-8">
                Sistem Tanıtımı
              </h2>
            </div>
            
            <div className="max-w-6xl mx-auto relative group">
              <div className="relative aspect-video w-full bg-[#020A0D] overflow-hidden shadow-2xl ring-1 ring-white/10">
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
                <div className="mt-8 text-center text-[#8FA5AE] font-light">
                  Medya yüklenemedi. <a href={getAssetUrl("/neogen-demo.mp4")} target="_blank" rel="noopener noreferrer" className="text-[#B69A72] hover:text-[#D9C8AF] transition-colors underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B69A72] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04161C]">Dosyayı doğrudan görüntülemek için tıklayın.</a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CONTEXT / DISTRIBUTION (Warm mid-tone) */}
        <section className="bg-[#1C2C32] text-[#F4F1EA] py-24 md:py-32 border-t border-white/5">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
              
              <div className="flex flex-col justify-between">
                <div>
                  <span className="block text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-[#B69A72] mb-6">
                    Türkiye Distribütörü
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-8">
                    EMCR Medikal
                  </h2>
                  <p className="text-[#8FA5AE] text-lg md:text-xl font-light leading-relaxed max-w-md mb-12">
                    NeoGen Plasma sisteminin Türkiye distribütörü olarak ürün bilgisi, eğitim ve destek hizmetleri sunuyoruz.
                  </p>
                </div>
                
                <div>
                  <Link 
                    href="/teknik-destek" 
                    className="inline-flex items-center text-sm md:text-base font-medium tracking-wider text-[#F4F1EA] hover:text-[#B69A72] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B69A72] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C2C32]"
                  >
                    Teknik Destek Talebi
                    <span className="ml-4 w-8 h-px bg-[#B69A72] group-hover:w-12 transition-all duration-300" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-16 lg:pt-0 lg:pl-24">
                <div>
                  <span className="block text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-[#B69A72] mb-6">
                    Kongre & Sunumlar
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-8">
                    Etkinlikler
                  </h2>
                  <p className="text-[#8FA5AE] text-lg md:text-xl font-light leading-relaxed max-w-md mb-12">
                    Uluslararası kongreler ve medikal etkinliklerdeki güncel ürün sunumlarımızı inceleyin.
                  </p>
                </div>
                
                <div>
                  <Link 
                    href="/etkinliklerimiz" 
                    className="inline-flex items-center text-sm md:text-base font-medium tracking-wider text-[#F4F1EA] hover:text-[#B69A72] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B69A72] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C2C32]"
                  >
                    Tüm Etkinlikleri Görüntüle
                    <span className="ml-4 w-8 h-px bg-[#B69A72] group-hover:w-12 transition-all duration-300" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
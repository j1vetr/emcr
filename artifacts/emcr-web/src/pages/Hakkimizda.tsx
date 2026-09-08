import { motion, useReducedMotion, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const getAssetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}`;
};

export default function Hakkimizda() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 1, y: prefersReducedMotion ? 0 : 12 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" } 
    }
  };

  const stagger: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1017] text-[#F4F1EB] font-sans selection:bg-[#AD7F4D]/30">
      <Navbar />

      <main className="pt-[100px] md:pt-[140px] pb-0">
        
        {/* Hero Section - Deep Ink */}
        <motion.div 
          className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 mb-16 md:mb-24 relative"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <div className="pt-4 md:pt-8 mb-10 md:mb-16">
             <motion.span variants={fadeUp} className="block text-sm font-bold tracking-[0.25em] uppercase text-[#AD7F4D] mb-10">
                Hakkımızda
             </motion.span>
             <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight text-[#F4F1EB] mb-12 max-w-5xl leading-[1.05]">
                Medikal Teknoloji Distribütörü
             </motion.h1>
             <motion.p variants={fadeUp} className="text-xl md:text-3xl text-[#8E9BAE] max-w-4xl leading-[1.4] font-light">
                EMCR Medikal, NeoGen Plasma ve UltraClear sistemlerinin Türkiye distribütörü olarak kliniklere donanım tedariki ve teknik destek hizmetleri sunmaktadır.
             </motion.p>
          </div>

          <motion.div variants={fadeUp} className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm group bg-[#0C121A]">
             <img 
               src={getAssetUrl("/events/paris-2026/1.jpg")} 
               alt="Paris Etkinliği" 
               className="w-full h-full object-cover object-[center_20%] transition-transform duration-1000 group-hover:scale-105 motion-reduce:transition-none" 
               loading="lazy"
             />
             <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex items-center gap-4 bg-[#0B1017] px-4 py-3">
                <div className="w-2 h-2 rounded-full bg-[#AD7F4D]"></div>
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#F4F1EB]">
                  Paris 2026
                </span>
             </div>
          </motion.div>
        </motion.div>

        {/* Warm Light Matte Surface - Edge to Edge */}
        <div className="bg-[#F4F1EB] text-[#0C121A] py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
             <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-center">
                
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                  className="w-full md:w-[40%] aspect-[3/4] md:aspect-[4/5] relative overflow-hidden order-2 md:order-1 rounded-sm group bg-[#D1CCC0]"
                >
                   <img 
                     src={getAssetUrl("/events/istanbul-ultraclear-2026/2.jpg")} 
                     alt="İstanbul Etkinliği" 
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 motion-reduce:transition-none" 
                     loading="lazy"
                   />
                   <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#AD7F4D]"></div>
                      <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#F4F1EB] drop-shadow-md">
                        İstanbul 2026
                      </span>
                   </div>
                </motion.div>
                
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={stagger}
                  className="flex-1 order-1 md:order-2"
                >
                   <motion.h2 variants={fadeUp} className="text-sm font-bold tracking-[0.25em] uppercase text-[#AD7F4D] mb-12">
                     Kurumsal Profil
                   </motion.h2>
                   <motion.div variants={fadeUp} className="space-y-12 text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.3] text-[#0C121A] font-display font-medium tracking-tight">
                     <p>
                       Ayrıca düzenlediğimiz eğitimler ve uygulamalı atölye çalışmaları ile medikal profesyonelleri bir araya getiriyoruz.
                     </p>
                     <p className="text-[#6B7A90]">
                       Ürün bilgisi, eğitim ve teknik destek talepleriniz için ekibimizle doğrudan iletişime geçebilirsiniz.
                     </p>
                   </motion.div>
                   <motion.div variants={fadeUp} className="mt-20">
                     <Link 
                       href="/teknik-destek" 
                       className="group/link inline-flex items-center text-sm font-bold tracking-[0.2em] uppercase text-[#0C121A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD7F4D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F4F1EB]"
                     >
                       <span className="border-b-2 border-[#0C121A] pb-1 group-hover/link:border-[#AD7F4D] group-hover/link:text-[#AD7F4D] transition-colors motion-reduce:transition-none">
                         Teknik Destek Talebi
                       </span>
                       <span className="ml-4 text-2xl font-normal group-hover/link:text-[#AD7F4D] group-hover/link:translate-x-2 transition-all motion-reduce:transition-none">&rarr;</span>
                     </Link>
                   </motion.div>
                </motion.div>

             </div>
          </div>
        </div>

        {/* Portfolio & Contact Section - Deep Ink */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 mt-16 md:mt-24">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mb-16 md:mb-24"
          >
             <motion.h2 variants={fadeUp} className="text-sm font-bold tracking-[0.25em] uppercase text-[#AD7F4D] mb-20 text-center">
               Portföyümüz
             </motion.h2>
             
             <div className="flex flex-col md:flex-row items-center justify-center gap-24 md:gap-40">
                <motion.div variants={fadeUp} className="group relative flex flex-col items-center text-center">
                  <h3 className="font-display text-5xl md:text-6xl font-bold text-[#F4F1EB] mb-6">NeoGen Plasma</h3>
                  <p className="text-[#8E9BAE] text-xl mb-12 font-light">Nitrojen Plazma Teknolojisi</p>
                  <Link 
                    href="/urunler/neogen-plasma" 
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-[#2C3A4F] text-[#AD7F4D] group-hover:bg-[#F4F1EB] group-hover:border-[#F4F1EB] group-hover:text-[#0C121A] transition-all duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD7F4D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B1017]"
                    aria-label="NeoGen Plasma ürününü incele"
                  >
                    <span className="text-2xl leading-none">&rarr;</span>
                  </Link>
                </motion.div>

                <motion.div variants={fadeUp} className="hidden md:block w-px bg-[#2C3A4F] h-32"></motion.div>
                <motion.div variants={fadeUp} className="block md:hidden h-px bg-[#2C3A4F] w-32"></motion.div>

                <motion.div variants={fadeUp} className="group relative flex flex-col items-center text-center">
                  <h3 className="font-display text-5xl md:text-6xl font-bold text-[#F4F1EB] mb-6">UltraClear</h3>
                  <p className="text-[#8E9BAE] text-xl mb-12 font-light"><span lang="en">Cold Fiber Laser</span></p>
                  <Link 
                    href="/urunler/ultraclear" 
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-[#2C3A4F] text-[#AD7F4D] group-hover:bg-[#F4F1EB] group-hover:border-[#F4F1EB] group-hover:text-[#0C121A] transition-all duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD7F4D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B1017]"
                    aria-label="UltraClear ürününü incele"
                  >
                    <span className="text-2xl leading-none">&rarr;</span>
                  </Link>
                </motion.div>
             </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="border-t border-[#2C3A4F] pt-24 pb-16"
          >
            <motion.h2 variants={fadeUp} className="text-sm font-bold tracking-[0.25em] uppercase text-[#AD7F4D] mb-16">
              İletişim Bilgileri
            </motion.h2>
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-40">
              <motion.div variants={fadeUp} className="flex-1">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#6B7A90] mb-8">Merkez Ofis</p>
                <p className="leading-[1.8] text-2xl text-[#F4F1EB] font-light">
                  Nispetiye Mah. Aytar Cad.<br />
                  Erdölen İş Merkezi No: 38 Kat 1<br />
                  Beşiktaş / İstanbul
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="flex-1 flex flex-col md:flex-row gap-16 lg:gap-32">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#6B7A90] mb-8">E-posta</p>
                  <a href="mailto:info@emcr.com.tr" className="text-2xl text-[#F4F1EB] hover:text-[#AD7F4D] transition-colors font-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD7F4D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B1017]">info@emcr.com.tr</a>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#6B7A90] mb-8">Telefon</p>
                  <a href="tel:+902972060272" className="text-2xl text-[#F4F1EB] hover:text-[#AD7F4D] transition-colors font-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AD7F4D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0B1017]">+90 297 206 02 72</a>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08
      }
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
    <div className="min-h-screen bg-[#080C16] text-[#F2EFE9] font-sans selection:bg-[#B89461]/30">
      <Navbar />

      <main className="pt-[100px] md:pt-[140px] pb-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-12 gap-px bg-[#182336] border border-[#182336]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Header Cell */}
            <motion.div variants={itemVariants} className="md:col-span-12 bg-[#0B101A] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-end min-h-[35vh]">
              <span className="block text-xs font-bold tracking-[0.15em] uppercase text-[#B89461] mb-6">Hakkımızda</span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F2EFE9] mb-6 max-w-4xl leading-[1.05]">
                Medikal Teknolojide Tek Yetkili Distribütör
              </h1>
              <p className="text-lg md:text-xl text-[#9AA6B8] max-w-2xl leading-relaxed">
                EMCR Medikal, NeoGen Plasma ve UltraClear sistemlerinin Türkiye tek yetkili distribütörü olarak kliniklere donanım tedariki ve teknik destek hizmetleri sunmaktadır.
              </p>
            </motion.div>

            {/* Photo 1 Cell */}
            <motion.div variants={itemVariants} className="md:col-span-6 bg-[#0B101A] p-2 sm:p-3 md:p-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden group bg-[#080C16]">
                <img 
                  src={getAssetUrl("/events/paris-2026/1.jpg")} 
                  alt="Paris Etkinliği" 
                  className="w-full h-full object-cover grayscale transition-[filter,transform] duration-700 ease-in-out motion-safe:group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:transition-none" 
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 bg-[#0B101A] text-[#F2EFE9] px-3 py-1.5 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                  Paris 2026
                </div>
              </div>
            </motion.div>

            {/* Photo 2 Cell */}
            <motion.div variants={itemVariants} className="md:col-span-6 bg-[#0B101A] p-2 sm:p-3 md:p-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden group bg-[#080C16]">
                <img 
                  src={getAssetUrl("/events/istanbul-ultraclear-2026/2.jpg")} 
                  alt="İstanbul Etkinliği" 
                  className="w-full h-full object-cover grayscale transition-[filter,transform] duration-700 ease-in-out motion-safe:group-hover:scale-[1.03] group-hover:grayscale-0 motion-reduce:transition-none" 
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 bg-[#0B101A] text-[#F2EFE9] px-3 py-1.5 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                  İstanbul 2026
                </div>
              </div>
            </motion.div>

            {/* Kurumsal Profil Title Cell */}
            <motion.div variants={itemVariants} className="md:col-span-4 bg-[#0B101A] p-6 sm:p-8 lg:p-12">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-[#9AA6B8] mb-4">Kurumsal Profil</h2>
              <div className="h-0.5 w-6 bg-[#182336]"></div>
            </motion.div>

            {/* Kurumsal Profil Content Cell */}
            <motion.div variants={itemVariants} className="md:col-span-8 bg-[#0B101A] p-6 sm:p-8 lg:p-12">
              <div className="flex flex-col space-y-6 text-[#F2EFE9] text-base md:text-lg leading-relaxed max-w-3xl">
                <p>
                  EMCR Medikal, NeoGen Plasma ve UltraClear sistemlerinin Türkiye tek yetkili distribütörü olarak kliniklere donanım tedariki ve teknik destek hizmetleri sunmaktadır.
                </p>
                <p>
                  Ayrıca düzenlediğimiz{" "}
                  <Link href="/etkinliklerimiz" className="text-[#B89461] hover:text-[#D1AD77] transition-colors motion-reduce:transition-none">
                    eğitimler ve uygulamalı atölye çalışmaları
                  </Link>{" "}
                  ile medikal profesyonelleri bir araya getiriyoruz.
                </p>
                <p>
                  Ürün bilgisi, eğitim ve teknik destek talepleriniz için ekibimizle iletişime geçebilirsiniz.
                </p>
                <div>
                  <Link 
                    href="/teknik-destek" 
                    className="inline-flex items-center text-[11px] md:text-xs font-bold tracking-wider uppercase text-[#B89461] hover:text-[#D1AD77] transition-colors motion-reduce:transition-none mt-2"
                  >
                    Teknik Destek Talebi &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Portföy Title Cell */}
            <motion.div variants={itemVariants} className="md:col-span-4 bg-[#0B101A] p-6 sm:p-8 lg:p-12">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-[#9AA6B8] mb-4">Portföyümüz</h2>
              <div className="h-0.5 w-6 bg-[#182336]"></div>
            </motion.div>

            {/* Portföy Content Cell */}
            <motion.div variants={itemVariants} className="md:col-span-8 bg-[#0B101A] p-0 flex flex-col md:flex-row">
              <Link href="/urunler/neogen-plasma" className="flex-1 p-6 sm:p-8 lg:p-12 border-b md:border-b-0 md:border-r border-[#182336] group hover:bg-[#111826] transition-colors motion-reduce:transition-none cursor-pointer flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F2EFE9] mb-2 group-hover:text-[#B89461] transition-colors motion-reduce:transition-none">NeoGen Plasma</h3>
                  <p className="text-[#9AA6B8] text-sm md:text-base leading-relaxed">Nitrojen Plazma Teknolojisi</p>
                </div>
                <div className="mt-8 md:mt-12">
                  <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-[#9AA6B8] group-hover:text-[#F2EFE9] transition-colors motion-reduce:transition-none">İncele &rarr;</span>
                </div>
              </Link>
              <Link href="/urunler/ultraclear" className="flex-1 p-6 sm:p-8 lg:p-12 group hover:bg-[#111826] transition-colors motion-reduce:transition-none cursor-pointer flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F2EFE9] mb-2 group-hover:text-[#B89461] transition-colors motion-reduce:transition-none">UltraClear</h3>
                  <p className="text-[#9AA6B8] text-sm md:text-base leading-relaxed"><span lang="en">Cold Fiber Laser</span></p>
                </div>
                <div className="mt-8 md:mt-12">
                  <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-[#9AA6B8] group-hover:text-[#F2EFE9] transition-colors motion-reduce:transition-none">İncele &rarr;</span>
                </div>
              </Link>
            </motion.div>

            {/* İletişim Title Cell */}
            <motion.div variants={itemVariants} className="md:col-span-4 bg-[#0B101A] p-6 sm:p-8 lg:p-12">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-[#9AA6B8] mb-4">İletişim Bilgileri</h2>
              <div className="h-0.5 w-6 bg-[#182336]"></div>
            </motion.div>

            {/* İletişim Content Cell */}
            <motion.div variants={itemVariants} className="md:col-span-8 bg-[#0B101A] p-6 sm:p-8 lg:p-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12 text-[#F2EFE9]">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9AA6B8] mb-3">Merkez Ofis</p>
                  <p className="leading-relaxed text-sm md:text-base text-[#F2EFE9]">
                    Nispetiye Mah. Aytar Cad.<br />
                    Erdölen İş Merkezi No: 38 Kat 1<br />
                    Beşiktaş / İstanbul
                  </p>
                </div>
                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9AA6B8] mb-3">E-posta</p>
                    <a href="mailto:info@emcr.com.tr" className="text-[#F2EFE9] hover:text-[#B89461] text-sm md:text-base transition-colors motion-reduce:transition-none">info@emcr.com.tr</a>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#9AA6B8] mb-3">Telefon</p>
                    <a href="tel:+902972060272" className="text-[#F2EFE9] hover:text-[#B89461] text-sm md:text-base transition-colors motion-reduce:transition-none">+90 297 206 02 72</a>
                  </div>
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

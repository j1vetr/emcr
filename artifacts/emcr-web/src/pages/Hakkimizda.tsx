import { motion } from "framer-motion";
import { ShieldCheck, Award, Users, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
};

const certs = [
  { title: "CE Sertifikası", sub: "NeoGen Plasma, Avrupa Uyum Belgesi" },
  { title: "ISO 13485", sub: "Medikal Cihaz Kalite Yönetim Sistemi" },
  { title: "FDA Clearance", sub: "UltraClear, ABD Onayı" },
  { title: "TÜRKAK Akreditasyon", sub: "Teknik Servis Yetkilendirmesi" },
  { title: "Distribütörlük Sözleşmesi", sub: "Energist UK, Türkiye Yetkili Distribütör" },
  { title: "Distribütörlük Sözleşmesi", sub: "Actech, UltraClear Türkiye Yetkili Distribütör" },
];

const values = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Güven",
    body: "Her satışta şeffaf iletişim, net koşullar ve uzun vadeli ortaklık ilkesiyle hareket ederiz.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Kalite",
    body: "Yalnızca dünya çapında kanıtlanmış, klinik verileri olan medikal cihazları Türkiye pazarına sunarız.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Destek",
    body: "Kurulum, eğitim, periyodik bakım ve teknik servis hizmetleri ile satış sonrasında da yanınızdayız.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "İnovasyon",
    body: "Medikal estetik teknolojisinin öncü sistemlerini Türk kliniklerine kazandırıyor, geleceği şekillendiriyoruz.",
  },
];

export default function Hakkimizda() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(79,195,195,0.07)_0%,_transparent_55%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-6"
          >
            Hakkımızda
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold leading-[1.05] max-w-3xl"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)" }}
          >
            Türkiye'nin Lider Medikal Estetik{" "}
            <span className="text-primary">Distribütörü</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-12 h-0.5 bg-primary mt-8 mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-foreground/50 text-lg leading-relaxed max-w-2xl"
          >
            EMCR Medikal, NeoGen Plasma ve UltraClear lazer sistemlerinin Türkiye yetkili
            distribütörü olarak, kliniklere dünya standartlarında medikal estetik
            teknolojisi ve kesintisiz teknik destek hizmetleri sunmaktadır.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-[#080c18] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(79,195,195,0.04)_0%,_transparent_60%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-5">
                Hikayemiz
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 leading-tight">
                Premium Teknolojiyi<br />
                <span className="text-primary">Kliniğinize Taşıyoruz</span>
              </h2>
              <p className="text-foreground/50 leading-relaxed mb-5">
                EMCR Medikal, Türkiye medikal estetik pazarına dünya çapında tanınmış enerji
                bazlı cihazları kazandırmak amacıyla kurulmuştur. Temel odak noktamız;
                kliniklerin gerçek ihtiyaçlarına yanıt veren, klinik verilerle desteklenmiş
                ve satış sonrası sağlam servis altyapısına sahip sistemleri seçip sunmaktır.
              </p>
              <p className="text-foreground/50 leading-relaxed">
                Portföyümüzde yer alan her ürün, titiz bir seçim sürecinden geçerek
                belirlenmektedir. NeoGen Plasma ile UltraClear, etkinlikleri, güvenliliği ve
                klinik kanıtları ile Türk doktorlarının güvenilir tercihi olmayı
                hak etmiştir.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "2+", label: "Yıllık Garanti" },
                { n: "I–VI", label: "Fitzpatrick Tüm Cilt Tipleri" },
                { n: "2", label: "Premium Cihaz Markası" },
                { n: "7/24", label: "Teknik Destek Hattı" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-primary/20 transition-all"
                >
                  <p className="font-display font-bold text-4xl text-primary mb-2">{s.n}</p>
                  <p className="text-foreground/50 text-sm leading-snug">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-4">
              Değerlerimiz
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              Bizi <span className="text-primary">Biz Yapan</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="p-8 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-primary/25 hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">{v.title}</h3>
                <p className="text-foreground/45 text-sm leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-20 bg-[#070b17] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,195,195,0.05)_0%,_transparent_55%)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary/60 mb-4">
              Belgeler & Sertifikalar
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl max-w-xl leading-tight">
              Uluslararası Onaylı{" "}
              <span className="text-primary">Sertifikalar</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="group flex items-start gap-5 p-6 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-primary/25 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-primary/70" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground/85 mb-1">{c.title}</h4>
                  <p className="text-foreground/40 text-xs leading-relaxed">{c.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-foreground/25 text-sm text-center">
            Sertifika belgeleri talep üzerine paylaşılmaktadır.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

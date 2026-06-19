import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Menu, X, CheckCircle2, ChevronRight, Activity, Zap, Layers,
  GraduationCap, Settings, ShieldCheck, Phone, Mail, MapPin, Wrench,
  Instagram, Linkedin, Youtube
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import emcrLogo from "@assets/emcr-logo.png";
import heroImg from "@/assets/images/neogen-hero.png";
import neogenEvoImg from "@/assets/images/neogen-evo.png";
import ultraClearImg from "@/assets/images/ultraclear.png";
import before1 from "@/assets/images/before-1.png";
import after1 from "@/assets/images/after-1.png";

// Schema for demo form
const formSchema = z.object({
  name: z.string().min(2, { message: "Ad Soyad en az 2 karakter olmalıdır." }),
  clinic: z.string().min(2, { message: "Klinik/Kurum Adı zorunludur." }),
  phone: z.string().min(10, { message: "Geçerli bir telefon numarası giriniz." }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  city: z.string().min(2, { message: "Şehir zorunludur." }),
  message: z.string().optional(),
});

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      clinic: "",
      phone: "",
      email: "",
      city: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Demo talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.");
    form.reset();
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Hakkımızda", id: "about" },
    { name: "NeoGen", id: "neogen" },
    { name: "UltraClear", id: "ultraclear" },
    { name: "Klinik Sonuçlar", id: "results" },
    { name: "İletişim", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* 1. Sticky Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <button onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 z-50">
            <div className="bg-white/10 p-1.5 rounded-md backdrop-blur-sm">
              <img src={emcrLogo} alt="EMCR Medikal" className="h-8 md:h-10 object-contain" />
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button onClick={() => scrollTo("demo-form")} className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
              Demo Talep Et
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-6 pt-20">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => scrollTo(link.id)}
                className="text-2xl font-display font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}
            <Button onClick={() => scrollTo("demo-form")} size="lg" className="mt-4 bg-primary text-primary-foreground">
              Demo Talep Et
            </Button>
          </div>
        )}
      </header>

      {/* 2. Premium Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background z-0"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] z-0 opacity-50"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Üst Segment Medikal Teknoloji
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">
                NeoGen Plasma
              </h1>
              <h2 className="text-2xl md:text-3xl text-primary font-light mb-6">
                Nitrogen Plasma ile Kontrollü Cilt Yenilenmesi
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Klinikler için ileri seviye cilt yenileme, elastikiyet, ton ve doku kalitesi odaklı premium enerji tabanlı sistem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => scrollTo("demo-form")} size="lg" className="text-base h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(79,195,195,0.3)]">
                  Demo Talep Et
                </Button>
                <Button onClick={() => scrollTo("neogen")} size="lg" variant="outline" className="text-base h-14 px-8 border-border hover:bg-white/5">
                  Teknolojiyi İncele
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
              <img 
                src={heroImg} 
                alt="NeoGen Plasma Device" 
                className="relative z-10 w-full h-auto object-cover rounded-2xl border border-white/10 shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Value Proposition Section */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Kliniğiniz İçin Üst Segment <span className="text-primary">Plasma Teknolojisi</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Activity className="w-8 h-8 text-primary" />, title: "Kontrollü Termal Etki", desc: "Epidermisi koruyarak derin dermal ısınma sağlar." },
              { icon: <Settings className="w-8 h-8 text-primary" />, title: "Protokol Esnekliği", desc: "Düşük enerjiden yüksek enerjiye geniş tedavi yelpazesi." },
              { icon: <Layers className="w-8 h-8 text-primary" />, title: "Doku, Ton ve Elastikiyet Odaklı", desc: "Kapsamlı cilt kalitesi iyileştirmesi sunar." },
              { icon: <GraduationCap className="w-8 h-8 text-primary" />, title: "Eğitim ve Teknik Destek", desc: "Sürekli klinik ve teknik danışmanlık hizmeti." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-white/5 hover:border-primary/50 transition-all duration-300 group h-full">
                  <CardContent className="p-8">
                    <div className="mb-6 p-4 rounded-xl bg-background inline-block group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 font-display">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-24 bg-card/30 border-y border-white/5 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Nitrogen Plasma Teknolojisi <span className="text-primary">Nasıl Çalışır?</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 z-0"></div>
            
            {[
              { num: "01", title: "Enerji Aktarımı", desc: "Nitrogen gazı UHF enerjisi ile plazmaya dönüştürülür ve cilde aktarılır." },
              { num: "02", title: "Kontrollü Yenilenme Süreci", desc: "Cilt yüzeyi bozulmadan alt katmanlarda termal etki yaratılır." },
              { num: "03", title: "Klinik Protokol Esnekliği", desc: "Hastanın ihtiyacına göre özelleştirilebilir enerji seviyeleri." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 text-center flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full bg-background border-2 border-primary flex items-center justify-center text-3xl font-bold text-primary font-display mb-6 shadow-[0_0_30px_rgba(79,195,195,0.2)]">
                  {step.num}
                </div>
                <h3 className="text-2xl font-semibold mb-3 font-display">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Before/After Gallery */}
      <section id="results" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Klinik <span className="text-primary">Sonuçlar</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden bg-card border-white/5 group">
                  <div className="relative aspect-[4/3] flex">
                    <div className="w-1/2 relative overflow-hidden">
                      <img src={before1} alt="Before" className="absolute inset-0 w-[200%] h-full object-cover max-w-none" style={{ filter: "blur(0.5px)" }} />
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-md">Öncesi</div>
                    </div>
                    <div className="w-px bg-white/20 z-10"></div>
                    <div className="w-1/2 relative overflow-hidden">
                      <img src={after1} alt="After" className="absolute inset-0 w-[200%] h-full object-cover max-w-none -translate-x-1/2" />
                      <div className="absolute bottom-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded backdrop-blur-md">Sonrası</div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-2">Cilt Yenileme Tedavisi</h4>
                    <p className="text-sm text-muted-foreground">Tek seans yüksek enerji protokolü sonucu gözlemlenen doku ve ton iyileşmesi.</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NeoGen EVO Device Section */}
      <section id="neogen" className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src={neogenEvoImg} alt="NeoGen EVO System" className="w-full h-auto rounded-2xl border border-white/10 shadow-2xl" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">NeoGen EVO <span className="text-primary">Sistem</span></h2>
              <p className="text-lg text-muted-foreground mb-10">
                Gelişmiş plazma teknolojisi ile klinik operasyonlarınıza değer katan, hasta konforunu ve sonuç kalitesini maksimize eden premium cihaz.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Farklı Tedavi Protokolleri", icon: <Layers /> },
                  { title: "Klinik Kullanım Esnekliği", icon: <Settings /> },
                  { title: "Hasta Deneyimi Odaklı", icon: <CheckCircle2 /> },
                  { title: "Distribütör Eğitim ve Servis", icon: <Wrench /> }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-primary mt-1">{feature.icon}</div>
                    <h4 className="font-medium text-foreground/90">{feature.title}</h4>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. UltraClear Section */}
      <section id="ultraclear" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden bg-gradient-to-br from-card to-background border border-white/10 relative"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-20 flex flex-col justify-center relative z-10">
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6 w-fit border border-white/10">
                  Premium Laser System
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-primary">UltraClear™</span> ile Yeni Nesil Lazer Yaklaşımı
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Soğuk ablasyon teknolojisi ile ağrısız, hızlı ve her cilt tipine uygun cilt yenileme devrimi. Kliniğinizdeki lazer portföyünü bir üst seviyeye taşıyın.
                </p>
                <Button size="lg" variant="secondary" className="w-fit">UltraClear'ı İncele</Button>
              </div>
              <div className="relative min-h-[400px]">
                <img src={ultraClearImg} alt="UltraClear Laser" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-card to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. Trust / After-Sales Section */}
      <section className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Satıştan Sonra da <span className="text-primary">Kliniğinizin Yanındayız</span></h2>
            <p className="text-muted-foreground text-lg">Cihaz yatırımınızın ilk gününden itibaren kesintisiz destek ile operasyonel sürekliliğinizi garanti ediyoruz.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: <Settings />, title: "Kurulum Desteği" },
              { icon: <GraduationCap />, title: "Doktor ve Ekip Eğitimi" },
              { icon: <Wrench />, title: "Teknik Servis" },
              { icon: <Activity />, title: "Klinik Adaptasyon" },
              { icon: <ShieldCheck />, title: "Türkiye Distribütör Desteği" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-white/5 rounded-2xl p-6 text-center hover:bg-white/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h4 className="font-medium text-sm md:text-base">{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Demo Request Form */}
      <section id="demo-form" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-primary/5 blur-[120px] rounded-full z-0 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/60 backdrop-blur-xl border-white/10 shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Kliniğiniz için NeoGen demosu talep edin</h2>
                  <p className="text-muted-foreground">İletişim bilgilerinizi bırakın, uzman ekibimiz en kısa sürede size ulaşsın.</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Ad Soyad</FormLabel>
                            <FormControl>
                              <Input placeholder="Dr. Ahmet Yılmaz" className="bg-background/50 border-white/10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="clinic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Klinik/Kurum Adı</FormLabel>
                            <FormControl>
                              <Input placeholder="Yılmaz Estetik" className="bg-background/50 border-white/10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Telefon</FormLabel>
                            <FormControl>
                              <Input placeholder="05XX XXX XX XX" className="bg-background/50 border-white/10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">E-posta</FormLabel>
                            <FormControl>
                              <Input placeholder="ahmet@klinik.com" className="bg-background/50 border-white/10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80">Şehir</FormLabel>
                          <FormControl>
                            <Input placeholder="İstanbul" className="bg-background/50 border-white/10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80">Mesaj (Opsiyonel)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Eklemek istedikleriniz..." 
                              className="bg-background/50 border-white/10 min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14">
                      Demo Talep Et
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer id="contact" className="bg-card border-t border-white/5 pt-20 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="bg-white/10 p-2 rounded-md inline-block">
                <img src={emcrLogo} alt="EMCR Medikal" className="h-10 object-contain" />
              </div>
              <p className="text-muted-foreground">
                Premium medikal estetik teknolojileri ve kesintisiz klinik destek hizmetleri.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display text-lg font-semibold mb-6">Hızlı Linkler</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors">Hakkımızda</button></li>
                <li><button onClick={() => scrollTo("neogen")} className="hover:text-primary transition-colors">NeoGen Plasma</button></li>
                <li><button onClick={() => scrollTo("ultraclear")} className="hover:text-primary transition-colors">UltraClear Lazer</button></li>
                <li><button onClick={() => scrollTo("results")} className="hover:text-primary transition-colors">Klinik Sonuçlar</button></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-display text-lg font-semibold mb-6">İletişim</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="text-primary shrink-0 mt-1" size={20} />
                  <span>İstanbul, Türkiye</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-primary shrink-0" size={20} />
                  <a href="mailto:info@emcr.com.tr" className="hover:text-primary transition-colors">info@emcr.com.tr</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-primary shrink-0" size={20} />
                  <a href="tel:+905555555555" className="hover:text-primary transition-colors">+90 XXX XXX XX XX</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground/60">
            <p>&copy; {new Date().getFullYear()} EMCR Medikal. Tüm hakları saklıdır.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition-colors">Kullanım Koşulları</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

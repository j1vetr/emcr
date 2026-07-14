import { Link } from "wouter";
import { Instagram, MapPin, Mail, Phone } from "lucide-react";
import emcrLogoWhite from "@assets/emcr-logo-white.webp";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#060912] border-t border-white/[0.04] pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1 space-y-5">
            <img src={emcrLogoWhite} alt="EMCR Medikal" className="h-11 object-contain" />
            <p className="text-foreground/35 text-sm leading-relaxed max-w-[200px]">
              NeoGen Plasma ve UltraClear sistemlerinin Türkiye yetkili distribütörü.
            </p>
            <a
              href="https://www.instagram.com/emcrmedikal/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-9 h-9 rounded-full border border-white/[0.08] items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/40 transition-all"
            >
              <Instagram size={15} />
            </a>
          </div>

          <div>
            <p className="font-semibold text-sm mb-5 text-foreground/70">Ürünler</p>
            <ul className="space-y-3 text-sm text-foreground/40">
              <li>
                <Link href="/urunler/neogen-plasma" className="hover:text-primary transition-colors">
                  NeoGen Plasma
                </Link>
              </li>
              <li>
                <Link href="/urunler/ultraclear" className="hover:text-primary transition-colors">
                  UltraClear
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm mb-5 text-foreground/70">Şirket</p>
            <ul className="space-y-3 text-sm text-foreground/40">
              <li>
                <Link href="/hakkimizda" className="hover:text-primary transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/etkinliklerimiz" className="hover:text-primary transition-colors">
                  Etkinliklerimiz
                </Link>
              </li>
              <li>
                <Link href="/basinda-biz/sosyal-medyada-biz" className="hover:text-primary transition-colors">
                  Sosyal Medyada Biz
                </Link>
              </li>
              <li>
                <Link href="/teknik-destek" className="hover:text-primary transition-colors">
                  Teknik Destek
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm mb-5 text-foreground/70">İletişim</p>
            <ul className="space-y-4 text-sm text-foreground/40">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary/60 flex-shrink-0 mt-0.5" />
                İstanbul, Türkiye
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary/60 flex-shrink-0" />
                <a href="mailto:info@emcr.com.tr" className="hover:text-primary transition-colors">
                  info@emcr.com.tr
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary/60 flex-shrink-0" />
                +90 XXX XXX XX XX
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/20">
          <p>© 2026 EMCR Medikal. Tüm hakları saklıdır.</p>
          <p>NeoGen® ve UltraClear™ tescilli markadır.</p>
        </div>
      </div>
    </footer>
  );
}

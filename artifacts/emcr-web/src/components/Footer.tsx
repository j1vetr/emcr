import { Link } from "wouter";
import { Instagram, MapPin, Mail, Phone } from "lucide-react";
import emcrLogoWhite from "@assets/emcr-logo-white.webp";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-b from-[#E5F0F8] to-white border-t border-[#D9E6EF] pt-16 md:pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-5">
            <img src={emcrLogoWhite} alt="EMCR Medikal" className="h-11 object-contain" style={{ filter: "brightness(0) saturate(100%) invert(11%) sepia(38%) saturate(1500%) hue-rotate(184deg) brightness(92%)" }} loading="lazy" decoding="async" />
            <p className="text-[#607084] text-sm leading-relaxed max-w-[220px]">
              NeoGen Plasma ve UltraClear sistemlerinin Türkiye tek yetkili distribütörü.
            </p>
            <a
              href="https://www.instagram.com/emcrmedikal/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-11 h-11 rounded-full border border-[#D9E6EF] items-center justify-center text-primary hover:bg-primary hover:text-[#10243B] hover:border-primary transition-all"
              aria-label="Instagram"
            >
              <Instagram size={15} />
            </a>
          </div>

          {/* Products */}
          <div>
            <p className="font-semibold text-sm mb-5 text-[#10243B]">Ürünler</p>
            <ul className="space-y-1 md:space-y-3 text-sm text-[#607084]">
              <li>
                <Link href="/urunler/neogen-plasma" className="inline-flex items-center min-h-9 md:min-h-0 hover:text-primary transition-colors break-words">
                  NeoGen Plasma
                </Link>
              </li>
              <li>
                <Link href="/urunler/ultraclear" className="inline-flex items-center min-h-9 md:min-h-0 hover:text-primary transition-colors break-words">
                  UltraClear
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold text-sm mb-5 text-[#10243B]">Şirket</p>
            <ul className="space-y-1 md:space-y-3 text-sm text-[#607084]">
              <li>
                <Link href="/hakkimizda" className="inline-flex items-center min-h-9 md:min-h-0 hover:text-primary transition-colors break-words">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/etkinliklerimiz" className="inline-flex items-center min-h-9 md:min-h-0 hover:text-primary transition-colors break-words">
                  Etkinliklerimiz
                </Link>
              </li>
              <li>
                <Link href="/basinda-biz/sosyal-medyada-biz" className="inline-flex items-center min-h-9 md:min-h-0 hover:text-primary transition-colors break-words">
                  Sosyal Medyada Biz
                </Link>
              </li>
              <li>
                <Link href="/teknik-destek" className="inline-flex items-center min-h-9 md:min-h-0 hover:text-primary transition-colors break-words">
                  Teknik Destek
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-semibold text-sm mb-5 text-[#10243B]">İletişim</p>
            <ul className="space-y-4 text-sm text-[#607084]">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1A9CA1] flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Nispetiye Mah. Aytar Cad.<br />
                  Erdölen İş Merkezi No: 38 Kat 1<br />
                  Beşiktaş / İstanbul
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#1A9CA1] flex-shrink-0" />
                <a href="mailto:info@emcr.com.tr" className="inline-flex items-center min-h-9 md:min-h-0 hover:text-primary transition-colors break-words">
                  info@emcr.com.tr
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#1A9CA1] flex-shrink-0" />
                <a href="tel:+905330670001" className="inline-flex items-center min-h-9 md:min-h-0 hover:text-primary transition-colors break-words">
                  +90 533 067 00 01
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal name + copyright */}
        <div className="border-t border-[#D9E6EF] pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-foreground/20">
          <div className="space-y-1">
            <p>© 2026 EMCR Medikal Teknolojiler Tic. Ltd. Şti. Tüm Hakları Saklıdır.</p>
            <p className="text-foreground/15">Nispetiye Mah. Aytar Cad. Erdölen İş Merkezi No: 38 Kat 1 Beşiktaş / İstanbul</p>
          </div>
          <p className="text-foreground/15">NeoGen® ve UltraClear® tescilli markalardır.</p>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Phone, Mail, MapPin, ArrowUpRight, Zap, Layers, ChevronDown } from "lucide-react";
import emcrLogoWhite from "@assets/emcr-logo-white.webp";

const TOPBAR_H = 32; // px — matches h-8

type Product = {
  label: string;
  sub: string;
  href: string;
  tag: string;
  color: string;
  border: string;
  accent: string;
  iconKey: "zap" | "layers";
};

const products: Product[] = [
  {
    label: "NeoGen Plasma",
    sub: "Nitrogen Plasma Skin Regeneration",
    href: "/urunler/neogen-plasma",
    tag: "FDA 510(k) · CE",
    color: "rgba(79,195,195,0.07)",
    border: "rgba(79,195,195,0.18)",
    accent: "text-primary",
    iconKey: "zap",
  },
  {
    label: "UltraClear",
    sub: "2910 nm Cold Fiber Laser · 3DMIRACL®",
    href: "/urunler/ultraclear",
    tag: "Trifecta 2025",
    color: "rgba(56,189,248,0.05)",
    border: "rgba(56,189,248,0.16)",
    accent: "text-sky-300",
    iconKey: "layers",
  },
];

function ProductIcon({ iconKey }: { iconKey: Product["iconKey"] }) {
  if (iconKey === "zap") return <Zap size={15} className="text-primary" />;
  return <Layers size={15} className="text-sky-400" />;
}

type NavItem = {
  label: string;
  href?: string;
  mega?: boolean;
  sub?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Ürünler", mega: true },
  { label: "Etkinliklerimiz", href: "/etkinliklerimiz" },
  { label: "Basında Biz", sub: [{ label: "Sosyal Medyada Biz", href: "/basinda-biz/sosyal-medyada-biz" }] },
  { label: "Teknik Destek", href: "/teknik-destek" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const isHome = location === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    setScrolled(window.scrollY > 50);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setOpenDropdown(null);
  }, [location]);

  const isActive = (href: string) =>
    location === href || location.startsWith(href + "/");

  return (
    <>
      {/* ── TOP CONTACT BAR ─────────────────────────────────────── */}
      <div
        className="fixed inset-x-0 z-50 h-8 transition-transform duration-500"
        style={{
          top: 0,
          transform: scrolled ? `translateY(-${TOPBAR_H}px)` : "translateY(0)",
          background: "rgba(4,7,18,0.98)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 h-full flex items-center justify-between">
          {/* Left: tagline */}
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/25 font-medium hidden md:block">
            Türkiye Yetkili Distribütör
            <span className="mx-3 text-foreground/15">·</span>
            NeoGen Plasma &amp; UltraClear
          </p>

          {/* Right: contact items */}
          <div className="flex items-center gap-5 ml-auto">
            <a
              href="tel:+902972060272"
              className="flex items-center gap-1.5 text-[10px] text-foreground/35 hover:text-primary transition-colors tracking-wide"
            >
              <Phone size={10} className="text-primary/50" />
              +90 297 206 02 72
            </a>
            <span className="text-foreground/15">·</span>
            <a
              href="mailto:info@emcr.com.tr"
              className="flex items-center gap-1.5 text-[10px] text-foreground/35 hover:text-primary transition-colors tracking-wide"
            >
              <Mail size={10} className="text-primary/50" />
              info@emcr.com.tr
            </a>
            <span className="text-foreground/15 hidden md:block">·</span>
            <span className="hidden md:flex items-center gap-1.5 text-[10px] text-foreground/25 tracking-wide">
              <MapPin size={10} className="text-foreground/25" />
              Beşiktaş, İstanbul
            </span>
            <span className="text-foreground/15">·</span>
            <a
              href="https://www.instagram.com/emcrmedikal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-foreground/30 hover:text-primary transition-colors"
            >
              <Instagram size={10} />
              <span className="hidden sm:inline">@emcrmedikal</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ─────────────────────────────────────────── */}
      <header
        className="fixed inset-x-0 z-40 transition-all duration-500"
        style={{ top: scrolled ? 0 : TOPBAR_H }}
      >
        <div
          className={`transition-all duration-500 ${
            transparent
              ? "bg-transparent border-b border-transparent"
              : "bg-[#070b17]/92 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.5)]"
          }`}
        >
          {/* Top accent line — only when not transparent */}
          {!transparent && (
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          )}

          <div className="max-w-[1440px] mx-auto px-6 md:px-14 flex items-center justify-between"
            style={{ height: transparent ? "90px" : "68px", transition: "height 0.5s ease" }}
          >
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative z-10">
              <img
                src={emcrLogoWhite}
                alt="EMCR Medikal"
                className="object-contain transition-all duration-500"
                style={{ height: transparent ? "64px" : "44px" }}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center">
              {navItems.map((item) => {
                const active = item.href ? isActive(item.href) : location.startsWith("/urunler");
                const hasDropdown = item.mega || item.sub;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasDropdown && setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`relative flex items-center px-5 py-2 text-[12px] font-medium tracking-[0.1em] uppercase transition-all duration-200
                          ${active
                            ? "text-foreground/95"
                            : "text-foreground/45 hover:text-foreground/80"
                          }`}
                      >
                        {item.label}
                        {active && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-5 bg-primary rounded-full" />
                        )}
                      </Link>
                    ) : (
                      <button
                        className={`relative flex items-center gap-1 px-5 py-2 text-[12px] font-medium tracking-[0.1em] uppercase transition-all duration-200
                          ${active
                            ? "text-foreground/95"
                            : "text-foreground/45 hover:text-foreground/80"
                          }`}
                      >
                        {item.label}
                        <ChevronDown size={9} className={`opacity-50 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`} />
                        {active && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-5 bg-primary rounded-full" />
                        )}
                      </button>
                    )}

                    {/* Products mega dropdown */}
                    {item.mega && (
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
                            style={{
                              background: "rgba(8,12,24,0.99)",
                              border: "1px solid rgba(255,255,255,0.07)",
                              transformOrigin: "top center",
                            }}
                          >
                            <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                            <div className="p-4 space-y-2">
                              {products.map((p) => (
                                <Link
                                  key={p.href}
                                  href={p.href}
                                  className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-200 hover:scale-[1.01]"
                                  style={{ background: p.color, border: `1px solid ${p.border}` }}
                                >
                                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: p.color, border: `1px solid ${p.border}` }}>
                                    <ProductIcon iconKey={p.iconKey} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <span className={`font-semibold text-[13px] ${p.accent}`}>{p.label}</span>
                                      <span className={`text-[8px] tracking-[0.2em] font-semibold uppercase px-1.5 py-0.5 rounded-full border border-current/30 opacity-60 ${p.accent}`}>{p.tag}</span>
                                    </div>
                                    <p className="text-foreground/35 text-[11px]">{p.sub}</p>
                                  </div>
                                  <ArrowUpRight size={14} className="text-foreground/20 group-hover:text-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
                                </Link>
                              ))}
                            </div>
                            <div className="border-t border-white/[0.05] px-5 py-3 flex items-center justify-between">
                              <Link href="/tedavi-endikasyonlari" className="text-[10px] text-foreground/30 hover:text-primary transition-colors tracking-wide flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-primary/50" />
                                Tedavi Endikasyonları Rehberi
                              </Link>
                              <span className="text-[9px] tracking-[0.2em] text-foreground/15 uppercase">2 Sistem</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* Regular sub-dropdown */}
                    {item.sub && (
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[200px] rounded-xl overflow-hidden shadow-2xl"
                            style={{ background: "rgba(8,12,24,0.99)", border: "1px solid rgba(255,255,255,0.07)" }}
                          >
                            <div className="h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
                            {item.sub.map((s) => (
                              <Link key={s.href} href={s.href}
                                className="flex items-center gap-2.5 px-5 py-3 text-[11px] tracking-wide text-foreground/40 hover:text-foreground/85 hover:bg-white/[0.04] transition-all">
                                <span className="w-1 h-1 rounded-full bg-foreground/25" />
                                {s.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+902972060272"
                className="text-[11px] text-foreground/35 hover:text-foreground/70 transition-colors tracking-wide flex items-center gap-1.5">
                <Phone size={11} className="text-primary/50" />
                +90 297 206 02 72
              </a>
              <div className="w-px h-4 bg-white/[0.08]" />
              <a href="mailto:info@emcr.com.tr"
                className="h-9 px-6 text-[11px] font-semibold tracking-[0.1em] uppercase bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-lg inline-flex items-center transition-all shadow-[0_0_20px_rgba(79,195,195,0.22)] hover:shadow-[0_0_32px_rgba(79,195,195,0.4)]">
                İletişim
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-9 h-9 rounded-lg border border-white/[0.1] flex items-center justify-center text-foreground/60 hover:text-foreground/90 transition-all"
              onClick={() => setMobileOpen((p) => !p)}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mx-4 mt-2 rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: "rgba(8,12,24,0.99)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="p-3 flex flex-col gap-0.5">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.href ? (
                      <Link href={item.href}
                        className={`flex items-center px-4 py-3 rounded-xl text-[13px] font-medium transition-all ${
                          item.href && isActive(item.href)
                            ? "bg-white/[0.06] text-foreground/90"
                            : "text-foreground/50 hover:bg-white/[0.04] hover:text-foreground/80"
                        }`}>
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => setMobileExpanded((p) => p === item.label ? null : item.label)}
                          className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-[13px] font-medium text-foreground/50 hover:bg-white/[0.04] hover:text-foreground/80 transition-all"
                        >
                          {item.label}
                          <ChevronDown size={13} className={`opacity-40 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              {item.mega && (
                                <div className="px-3 py-2 space-y-2">
                                  {products.map((p) => (
                                    <Link key={p.href} href={p.href}
                                      className="flex items-center gap-3 p-3 rounded-xl"
                                      style={{ background: p.color, border: `1px solid ${p.border}` }}>
                                      <ProductIcon iconKey={p.iconKey} />
                                      <div>
                                        <p className={`font-semibold text-[12px] ${p.accent}`}>{p.label}</p>
                                        <p className="text-foreground/30 text-[10px]">{p.tag}</p>
                                      </div>
                                    </Link>
                                  ))}
                                  <Link href="/tedavi-endikasyonlari"
                                    className="block px-3 py-2 text-[11px] text-foreground/30 hover:text-primary transition-colors">
                                    Tedavi Endikasyonları Rehberi
                                  </Link>
                                </div>
                              )}
                              {item.sub && (
                                <div className="pl-4 pb-2">
                                  {item.sub.map((s) => (
                                    <Link key={s.href} href={s.href}
                                      className="block px-4 py-2.5 text-[12px] text-foreground/40 hover:text-primary transition-colors">
                                      {s.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}
                <div className="mt-2 pt-3 border-t border-white/[0.05] flex items-center gap-3">
                  <a href="mailto:info@emcr.com.tr"
                    className="flex-1 h-10 bg-primary text-[#0a0e1a] rounded-xl font-semibold text-[13px] flex items-center justify-center shadow-[0_0_20px_rgba(79,195,195,0.2)]">
                    İletişim
                  </a>
                  <a href="https://www.instagram.com/emcrmedikal/" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-white/[0.1] flex items-center justify-center text-foreground/35 hover:text-primary transition-all">
                    <Instagram size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

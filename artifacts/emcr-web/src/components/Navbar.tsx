import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, ArrowUpRight, Zap, Layers, ChevronDown } from "lucide-react";
import emcrLogoWhite from "@assets/emcr-logo-white.webp";

const products = [
  {
    label: "NeoGen Plasma",
    sub: "Nitrogen Plasma Skin Regeneration",
    href: "/urunler/neogen-plasma",
    tag: "CE · FDA 510(k)",
    color: "rgba(79,195,195,0.08)",
    border: "rgba(79,195,195,0.2)",
    accent: "text-primary",
    dot: "bg-primary",
    icon: <Zap size={16} className="text-primary" />,
  },
  {
    label: "UltraClear",
    sub: "2910 nm Cold Fiber Laser Platform",
    href: "/urunler/ultraclear",
    tag: "3DMIRACL® · Trifecta 2025",
    color: "rgba(56,189,248,0.06)",
    border: "rgba(56,189,248,0.18)",
    accent: "text-sky-300",
    dot: "bg-sky-400",
    icon: <Layers size={16} className="text-sky-400" />,
  },
];

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
  {
    label: "Basında Biz",
    sub: [{ label: "Sosyal Medyada Biz", href: "/basinda-biz/sosyal-medyada-biz" }],
  },
  { label: "Teknik Destek", href: "/teknik-destek" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const isHome = location === "/";
  const transparent = isHome && !isScrolled;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    setIsScrolled(window.scrollY > 40);
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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        transparent ? "py-5" : "py-0"
      }`}
    >
      {/* Main bar */}
      <div
        className={`transition-all duration-500 ${
          transparent
            ? "mx-5 md:mx-10 mt-4 rounded-2xl bg-[#080c18]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
            : "bg-[#070b17]/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_2px_30px_rgba(0,0,0,0.5)]"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative z-10">
            <img
              src={emcrLogoWhite}
              alt="EMCR Medikal"
              className="h-7 md:h-8 object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
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
                      className={`relative px-4 py-2 rounded-lg text-[12px] font-medium tracking-[0.08em] transition-all duration-200 flex items-center gap-1
                        ${active
                          ? "text-foreground/90 bg-white/[0.06]"
                          : "text-foreground/45 hover:text-foreground/80 hover:bg-white/[0.04]"
                        }`}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-px bg-primary rounded-full" />
                      )}
                    </Link>
                  ) : (
                    <button
                      className={`relative px-4 py-2 rounded-lg text-[12px] font-medium tracking-[0.08em] transition-all duration-200 flex items-center gap-1.5
                        ${active
                          ? "text-foreground/90 bg-white/[0.06]"
                          : "text-foreground/45 hover:text-foreground/80 hover:bg-white/[0.04]"
                        }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={10}
                        className={`transition-transform duration-200 opacity-60 ${openDropdown === item.label ? "rotate-180" : ""}`}
                      />
                      {active && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-px bg-primary rounded-full" />
                      )}
                    </button>
                  )}

                  {/* Products mega dropdown */}
                  {item.mega && (
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[460px] rounded-2xl bg-[#0a0f1e]/98 backdrop-blur-2xl border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden"
                          style={{ transformOrigin: "top center" }}
                        >
                          {/* Top accent line */}
                          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                          <div className="p-4 space-y-2.5">
                            {products.map((p) => (
                              <Link
                                key={p.href}
                                href={p.href}
                                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group hover:scale-[1.01]"
                                style={{ background: p.color, border: `1px solid ${p.border}` }}
                              >
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                  style={{ background: p.color, border: `1px solid ${p.border}` }}
                                >
                                  {p.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <p className={`font-semibold text-[13px] ${p.accent}`}>{p.label}</p>
                                    <span className={`text-[8px] tracking-[0.2em] font-semibold uppercase px-1.5 py-0.5 rounded-full opacity-60 border border-current/40 ${p.accent}`}>
                                      {p.tag}
                                    </span>
                                  </div>
                                  <p className="text-foreground/40 text-[11px] tracking-wide">{p.sub}</p>
                                </div>
                                <ArrowUpRight
                                  size={14}
                                  className="text-foreground/20 group-hover:text-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
                                />
                              </Link>
                            ))}
                          </div>

                          {/* Footer link */}
                          <div className="border-t border-white/[0.05] px-4 py-3 flex items-center justify-between">
                            <Link
                              href="/tedavi-endikasyonlari"
                              className="text-[11px] text-foreground/35 hover:text-primary transition-colors tracking-[0.08em] flex items-center gap-1.5"
                            >
                              <span className="w-1 h-1 rounded-full bg-primary/50" />
                              Tedavi Endikasyonları Rehberi
                            </Link>
                            <span className="text-[9px] tracking-[0.2em] text-foreground/20 uppercase">
                              2 Ürün
                            </span>
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
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[200px] rounded-xl bg-[#0a0f1e]/98 backdrop-blur-2xl border border-white/[0.07] shadow-2xl overflow-hidden py-1.5"
                        >
                          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-1" />
                          {item.sub.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              className="flex items-center gap-2.5 px-5 py-2.5 text-[11px] tracking-[0.06em] text-foreground/45 hover:text-foreground/90 hover:bg-white/[0.04] transition-all"
                            >
                              <ChevronDown size={10} className="-rotate-90 opacity-40" />
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

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://www.instagram.com/emcrmedikal/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-foreground/30 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <Instagram size={14} />
            </a>
            <div className="w-px h-4 bg-white/[0.08]" />
            <a
              href="mailto:info@emcr.com.tr"
              className="h-8 px-5 text-[11px] font-semibold tracking-[0.08em] bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-lg inline-flex items-center transition-all shadow-[0_0_18px_rgba(79,195,195,0.2)] hover:shadow-[0_0_28px_rgba(79,195,195,0.35)]"
            >
              İletişim
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-foreground/60 hover:text-foreground/90 hover:bg-white/[0.04] transition-all"
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
            className="lg:hidden mx-5 mt-2 rounded-2xl bg-[#0a0f1e]/98 backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-hidden"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="p-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl text-[13px] font-medium tracking-wide transition-all ${
                        item.href && isActive(item.href)
                          ? "bg-white/[0.06] text-foreground/90"
                          : "text-foreground/55 hover:bg-white/[0.04] hover:text-foreground/80"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          setMobileExpanded((p) =>
                            p === item.label ? null : item.label
                          )
                        }
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-[13px] font-medium tracking-wide text-foreground/55 hover:bg-white/[0.04] hover:text-foreground/80 transition-all"
                      >
                        {item.label}
                        <ChevronDown
                          size={13}
                          className={`opacity-50 transition-transform ${
                            mobileExpanded === item.label ? "rotate-180" : ""
                          }`}
                        />
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
                            {/* Products in mobile */}
                            {item.mega && (
                              <div className="px-3 py-2 space-y-2">
                                {products.map((p) => (
                                  <Link
                                    key={p.href}
                                    href={p.href}
                                    className="flex items-center gap-3 p-3 rounded-xl transition-all"
                                    style={{ background: p.color, border: `1px solid ${p.border}` }}
                                  >
                                    {p.icon}
                                    <div>
                                      <p className={`font-semibold text-[12px] ${p.accent}`}>{p.label}</p>
                                      <p className="text-foreground/35 text-[10px]">{p.sub}</p>
                                    </div>
                                  </Link>
                                ))}
                                <Link
                                  href="/tedavi-endikasyonlari"
                                  className="block px-3 py-2 text-[11px] text-foreground/35 hover:text-primary transition-colors tracking-wide"
                                >
                                  Tedavi Endikasyonları Rehberi
                                </Link>
                              </div>
                            )}
                            {/* Regular sub */}
                            {item.sub && (
                              <div className="pl-4 pr-3 pb-2">
                                {item.sub.map((s) => (
                                  <Link
                                    key={s.href}
                                    href={s.href}
                                    className="block px-4 py-2.5 text-[12px] text-foreground/45 hover:text-primary transition-colors"
                                  >
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

              {/* Mobile bottom bar */}
              <div className="mt-2 pt-3 border-t border-white/[0.06] flex items-center gap-3">
                <a
                  href="mailto:info@emcr.com.tr"
                  className="flex-1 h-10 bg-primary text-[#0a0e1a] rounded-xl font-semibold text-[13px] flex items-center justify-center shadow-[0_0_20px_rgba(79,195,195,0.2)]"
                >
                  İletişim
                </a>
                <a
                  href="https://www.instagram.com/emcrmedikal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center text-foreground/35 hover:text-primary hover:border-primary/30 transition-all"
                >
                  <Instagram size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

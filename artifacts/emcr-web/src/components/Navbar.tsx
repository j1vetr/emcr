import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Phone, ArrowUpRight,
} from "lucide-react";
import emcrLogoWhite from "@assets/emcr-logo-white.webp";
import neogenLogo from "@assets/neogen-logo.webp";
import ultraClearLogo from "@assets/ultraclear-logo.png";

type Product = {
  label: string;
  href: string;
  logo: string;
  logoInvert: boolean;
  accentClass: string;
};

const products: Product[] = [
  {
    label: "NeoGen Plasma",
    href: "/urunler/neogen-plasma",
    logo: neogenLogo,
    logoInvert: false,
    accentClass: "text-primary",
  },
  {
    label: "UltraClear",
    href: "/urunler/ultraclear",
    logo: ultraClearLogo,
    logoInvert: true,
    accentClass: "text-sky-600",
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
  { label: "Basında Biz", sub: [{ label: "Basın Haberleri", href: "/basinda-biz" }, { label: "Sosyal Medyada Biz", href: "/basinda-biz/sosyal-medyada-biz" }] },
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    setScrolled(window.scrollY > 40);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    location === href || location.startsWith(href + "/");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Top accent line */}
        <div
          className="h-px transition-opacity duration-500"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(36,184,189,0.5) 40%, rgba(36,184,189,0.8) 50%, rgba(36,184,189,0.5) 60%, transparent 100%)",
            opacity: transparent ? 0.5 : 0.9,
          }}
        />

        <div
          className="transition-all duration-500"
          style={{
            background: transparent ? "rgba(240,246,252,0.55)" : "rgba(240,246,252,0.86)",
            backdropFilter: transparent ? "blur(14px) saturate(140%)" : "blur(24px) saturate(160%)",
            WebkitBackdropFilter: transparent ? "blur(14px) saturate(140%)" : "blur(24px) saturate(160%)",
            boxShadow: transparent ? "none" : "0 1px 0 rgba(16,36,59,0.04), 0 16px 48px rgba(16,36,59,0.138)",
          }}
        >
          <div
            className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between transition-all duration-500"
            style={{ height: transparent ? "88px" : "66px" }}
          >
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 block">
              <img
                src={emcrLogoWhite}
                alt="EMCR Medikal"
                className="object-contain transition-all duration-500"
                style={{ height: transparent ? "clamp(40px, 11vw, 54px)" : "38px", maxWidth: "58vw", filter: "brightness(0) saturate(100%) invert(11%) sepia(38%) saturate(1500%) hue-rotate(184deg) brightness(92%)" }}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center">
              {navItems.map((item) => {
                const active = item.href
                  ? isActive(item.href)
                  : location.startsWith("/urunler");
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
                        className={`relative flex items-center px-4 py-2 text-[13.5px] font-medium tracking-[0.015em] transition-colors duration-200 ${
                          active ? "text-foreground" : "text-[#607084] hover:text-foreground/90"
                        }`}
                      >
                        {item.label}
                        {active && (
                          <span className="absolute bottom-0 left-4 right-4 h-px bg-primary/60 rounded-full" />
                        )}
                      </Link>
                    ) : (
                      <button
                        className={`relative flex items-center gap-1 px-4 py-2 text-[13.5px] font-medium tracking-[0.015em] transition-colors duration-200 ${
                          active ? "text-foreground" : "text-[#607084] hover:text-foreground/90"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={11}
                          className={`opacity-40 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180 opacity-70" : ""}`}
                        />
                        {active && (
                          <span className="absolute bottom-0 left-4 right-4 h-px bg-primary/60 rounded-full" />
                        )}
                      </button>
                    )}

                    {/* ── Products mega dropdown ────────────────── */}
                    {item.mega && (
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] rounded-2xl overflow-hidden"
                            style={{
                              background: "rgba(240,246,252,0.99)",
                              border: "1px solid rgba(16,36,59,0.07)",
                              boxShadow: "0 30px 80px rgba(16,36,59,0.188), 0 0 0 0.5px rgba(16,36,59,0.04)",
                            }}
                          >
                            <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                            <div className="p-3 grid grid-cols-2 gap-2">
                              {products.map((p) => (
                                <Link
                                  key={p.href}
                                  href={p.href}
                                  className="group relative flex flex-col items-center text-center gap-5 px-6 py-7 rounded-xl transition-all duration-200 border border-transparent hover:border-[#D9E6EF] hover:bg-[#E5F0F8]"
                                >
                                  {/* Product logo — centered, large */}
                                  <div className="flex items-center justify-center h-12">
                                    <img
                                      src={p.logo}
                                      alt={p.label}
                                      className="w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
                                      style={{
                                        maxHeight: "44px",
                                        maxWidth: "160px",
                                        filter: p.logoInvert ? "brightness(0) saturate(100%) invert(11%) sepia(38%) saturate(1500%) hue-rotate(184deg) brightness(92%)" : "none",
                                        opacity: 0.72,
                                      }}
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  </div>
                                </Link>
                              ))}
                            </div>

                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* Sub dropdown */}
                    {item.sub && (
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[210px] rounded-xl overflow-hidden"
                            style={{
                              background: "rgba(240,246,252,0.99)",
                              border: "1px solid rgba(16,36,59,0.07)",
                              boxShadow: "0 20px 60px rgba(16,36,59,0.15)",
                            }}
                          >
                            <div className="h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
                            {item.sub.map((s) => (
                              <Link
                                key={s.href}
                                href={s.href}
                                className="flex items-center gap-2.5 px-5 py-3.5 text-[12px] tracking-[0.01em] text-[#607084] hover:text-foreground/85 hover:bg-[#E5F0F8] transition-all"
                              >
                                <span className="w-1 h-1 rounded-full bg-foreground/25 flex-shrink-0" />
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
            <div className="hidden lg:flex items-center gap-5">
              <a
                href="tel:+905330670001"
                className="flex items-center gap-2 text-[12.5px] text-[#607084] hover:text-foreground/70 transition-colors"
              >
                <Phone size={12} className="text-[#1A9CA1] flex-shrink-0" />
                +90 533 067 00 01
              </a>
              <Link
                href="/teknik-destek"
                className="h-9 px-5 text-[12.5px] font-semibold bg-primary text-[#10243B] rounded-lg inline-flex items-center gap-1.5 hover:bg-primary/90 transition-all"
                style={{ boxShadow: "0 0 28px rgba(36,184,189,0.22)" }}
              >
                İletişim
                <ArrowUpRight size={12} />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-12 h-12 -mr-1 rounded-xl border border-[#D9E6EF] bg-white/60 flex items-center justify-center text-[#10243B] hover:bg-white transition-all"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              data-testid="button-mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "x" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              id="mobile-menu"
              data-testid="nav-mobile-drawer"
              className="lg:hidden mx-3 mt-2 rounded-2xl overflow-y-auto overscroll-contain max-h-[calc(100dvh-88px)]"
              style={{
                background: "rgba(240,246,252,0.99)",
                border: "1px solid rgba(16,36,59,0.07)",
                boxShadow: "0 24px 80px rgba(16,36,59,0.175)",
                backdropFilter: "blur(24px)",
              }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
              <div className="p-3 flex flex-col gap-0.5">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`flex items-center min-h-12 px-4 py-3 rounded-xl text-[15px] sm:text-[13px] font-medium tracking-[0.01em] transition-all ${
                          item.href && isActive(item.href)
                            ? "bg-white/80 text-foreground/90"
                            : "text-[#607084] hover:bg-[#E5F0F8] hover:text-foreground/80"
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
                          className="flex items-center justify-between w-full min-h-12 px-4 py-3 rounded-xl text-[15px] sm:text-[13px] font-medium tracking-[0.01em] text-[#607084] hover:bg-[#E5F0F8] hover:text-foreground/80 transition-all"
                        >
                          {item.label}
                          <ChevronDown
                            size={16}
                            className={`opacity-50 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`}
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
                              {item.mega && (
                                <div className="px-3 py-2 space-y-2">
                                  {products.map((p) => (
                                    <Link
                                      key={p.href}
                                      href={p.href}
                                      className="flex items-center gap-4 p-4 rounded-xl border border-[#D9E6EF] bg-white/80 hover:bg-[#E5F0F8] transition-colors"
                                    >
                                      <img
                                        src={p.logo}
                                        alt={p.label}
                                        className="h-6 w-auto object-contain flex-shrink-0"
                                        style={{
                                          filter: p.logoInvert ? "brightness(0) saturate(100%) invert(11%) sepia(38%) saturate(1500%) hue-rotate(184deg) brightness(92%)" : "none",
                                          opacity: 0.72,
                                        }}
                                        loading="lazy"
                                        decoding="async"
                                      />
                                      <div>
                                        <p className={`font-semibold text-[12px] ${p.accentClass}`}>{p.label}</p>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              )}
                              {item.sub && (
                                <div className="pl-4 pb-2">
                                  {item.sub.map((s) => (
                                    <Link
                                      key={s.href}
                                      href={s.href}
                                      className="flex items-center min-h-12 px-4 py-2.5 text-[14px] sm:text-[12px] tracking-[0.01em] text-[#607084] hover:text-primary transition-colors"
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

                <div className="mt-2 pt-3 border-t border-[#D9E6EF] flex items-center gap-3">
                  <a
                    href="mailto:info@emcr.com.tr"
                    className="flex-1 h-12 bg-primary text-[#10243B] rounded-xl font-semibold text-[13px] flex items-center justify-center gap-1.5"
                    style={{ boxShadow: "0 0 20px rgba(36,184,189,0.2)" }}
                  >
                    İletişim
                    <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="tel:+905330670001"
                    aria-label="Telefon ile ara"
                    className="w-12 h-12 rounded-xl border border-[#D9E6EF] flex items-center justify-center text-[#607084] hover:text-primary transition-all"
                  >
                    <Phone size={15} />
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

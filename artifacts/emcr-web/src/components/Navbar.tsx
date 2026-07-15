import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Instagram } from "lucide-react";
import emcrLogoWhite from "@assets/emcr-logo-white.webp";

type Sub = { label: string; href: string };
type NavItem = { label: string; href?: string; dropdown?: Sub[] };

const navItems: NavItem[] = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  {
    label: "Ürünler",
    dropdown: [
      { label: "NeoGen Plasma", href: "/urunler/neogen-plasma" },
      { label: "UltraClear", href: "/urunler/ultraclear" },
    ],
  },
  { label: "Etkinliklerimiz", href: "/etkinliklerimiz" },
  {
    label: "Basında Biz",
    dropdown: [
      { label: "Sosyal Medyada Biz", href: "/basinda-biz/sosyal-medyada-biz" },
    ],
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
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    setIsScrolled(window.scrollY > 60);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        transparent
          ? "py-6 bg-transparent"
          : "py-4 bg-background/80 backdrop-blur-2xl border-b border-white/[0.05]"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 flex items-center justify-between">
        <Link href="/">
          <img
            src={emcrLogoWhite}
            alt="EMCR Medikal"
            className="h-8 md:h-9 object-contain cursor-pointer"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-[12px] font-medium tracking-[0.12em] text-foreground/50 hover:text-foreground/90 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <button className="flex items-center gap-1 text-[12px] font-medium tracking-[0.12em] text-foreground/50 hover:text-foreground/90 transition-colors duration-200">
                  {item.label}
                  <ChevronDown
                    size={10}
                    className={`transition-transform duration-200 ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}

              {item.dropdown && (
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.14 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-5 min-w-[190px] rounded-xl bg-[#0d1422]/98 backdrop-blur-2xl border border-white/[0.07] shadow-2xl overflow-hidden py-1.5"
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-5 py-2.5 text-[11px] tracking-[0.06em] text-foreground/50 hover:text-foreground/90 hover:bg-white/[0.04] transition-all"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a
            href="https://www.instagram.com/emcrmedikal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/30 hover:text-primary transition-colors duration-200"
          >
            <Instagram size={15} />
          </a>
          <a
            href="mailto:info@emcr.com.tr"
            className="h-8 px-5 text-[11px] font-semibold tracking-[0.06em] bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-full inline-flex items-center transition-colors shadow-[0_0_20px_rgba(79,195,195,0.18)]"
          >
            İletişim
          </a>
        </div>

        <button
          className="lg:hidden text-foreground/70 p-1"
          onClick={() => setMobileOpen((p) => !p)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden absolute top-full inset-x-0 bg-background/97 backdrop-blur-2xl border-b border-white/10 py-6 px-8 flex flex-col gap-1"
          >
            {navItems.map((item) => (
              <div key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block py-3 text-base font-medium tracking-wide hover:text-primary transition-colors"
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
                      className="flex items-center justify-between w-full py-3 text-base font-medium tracking-wide hover:text-primary transition-colors"
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          mobileExpanded === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && item.dropdown && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-5 border-l border-primary/20 ml-1 mb-2"
                        >
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block py-2.5 text-sm text-foreground/50 hover:text-primary transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}
            <div className="pt-5 mt-3 border-t border-white/[0.06] flex items-center gap-4">
              <a
                href="mailto:info@emcr.com.tr"
                className="flex-1 h-10 bg-primary text-[#0a0e1a] rounded-full font-semibold text-sm flex items-center justify-center"
              >
                İletişim
              </a>
              <a
                href="https://www.instagram.com/emcrmedikal/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/30 transition-all"
              >
                <Instagram size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

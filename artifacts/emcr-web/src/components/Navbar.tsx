import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
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
          : "py-3 bg-background/75 backdrop-blur-2xl border-b border-white/[0.06]"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/">
          <img
            src={emcrLogoWhite}
            alt="EMCR Medikal"
            className="h-12 md:h-14 object-contain cursor-pointer"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
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
                  className="text-[13px] font-medium tracking-wide text-foreground/60 hover:text-foreground transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <button className="flex items-center gap-1 text-[13px] font-medium tracking-wide text-foreground/60 hover:text-foreground transition-colors duration-200">
                  {item.label}
                  <ChevronDown
                    size={12}
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
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full left-0 mt-4 min-w-[210px] rounded-2xl bg-[#0d1422]/98 backdrop-blur-2xl border border-white/[0.07] shadow-2xl overflow-hidden py-2"
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-5 py-3 text-[13px] text-foreground/55 hover:text-foreground hover:bg-white/[0.04] transition-all"
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

        <div className="hidden lg:flex items-center gap-5">
          <a
            href="https://www.instagram.com/emcrmedikal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/35 hover:text-primary transition-colors"
          >
            <Instagram size={17} />
          </a>
          <Button
            asChild
            className="h-10 px-6 text-sm font-semibold bg-primary text-[#0a0e1a] hover:bg-primary/90 rounded-full shadow-[0_0_24px_rgba(79,195,195,0.22)]"
          >
            <a href="mailto:info@emcr.com.tr">İletişim</a>
          </Button>
        </div>

        <button
          className="lg:hidden text-foreground/80 p-1"
          onClick={() => setMobileOpen((p) => !p)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
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
                    className="block py-3 text-lg font-medium hover:text-primary transition-colors"
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
                      className="flex items-center justify-between w-full py-3 text-lg font-medium hover:text-primary transition-colors"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
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
                              className="block py-2.5 text-base text-foreground/55 hover:text-primary transition-colors"
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
              <Button asChild className="flex-1 bg-primary text-[#0a0e1a] rounded-full font-semibold">
                <a href="mailto:info@emcr.com.tr">İletişim</a>
              </Button>
              <a
                href="https://www.instagram.com/emcrmedikal/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/30 transition-all"
              >
                <Instagram size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

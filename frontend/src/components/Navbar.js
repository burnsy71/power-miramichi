import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/LanguageContext";

export default function Navbar({ activeSection }) {
  const { lang, t, toggleLang } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "platform", label: t.nav.platform },
    { id: "get-involved", label: t.nav.getInvolved },
    { id: "contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      data-testid="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-nav border-b border-[#E5DFD3] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo / Name */}
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2 group"
            data-testid="nav-logo"
          >
            <span
              className={`font-serif text-lg lg:text-xl font-bold tracking-tight transition-colors ${
                scrolled ? "text-[#1E392A]" : "text-white"
              }`}
            >
              Shawn Power
            </span>
            <span
              className={`hidden sm:inline text-xs tracking-widest uppercase font-sans font-medium transition-colors ${
                scrolled ? "text-[#CC5A37]" : "text-[#E2AA54]"
              }`}
            >
              {t.nav.forMayor}
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                data-testid={`nav-${link.id}-link`}
                className={`px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-200 ${
                  activeSection === link.id
                    ? scrolled
                      ? "bg-[#1E392A] text-white"
                      : "bg-white/20 text-white"
                    : scrolled
                    ? "text-[#1E392A]/70 hover:text-[#1E392A] hover:bg-[#F3EFE7]"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              data-testid="lang-toggle"
              className={`ml-2 px-3 py-1.5 rounded-full text-xs font-sans font-bold tracking-wider border transition-all duration-200 ${
                scrolled
                  ? "border-[#1E392A]/20 text-[#1E392A] hover:bg-[#1E392A] hover:text-white"
                  : "border-white/30 text-white hover:bg-white/20"
              }`}
            >
              {lang === "en" ? "FR" : "EN"}
            </button>

            <button
              onClick={() => scrollTo("get-involved")}
              data-testid="nav-donate-cta"
              className="ml-2 px-6 py-2.5 rounded-full bg-[#CC5A37] text-white text-sm font-sans font-semibold hover:bg-[#B34A2D] transition-colors"
            >
              {t.nav.donate}
            </button>
          </div>

          {/* Mobile: Lang Toggle + Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              data-testid="mobile-lang-toggle"
              className={`px-2.5 py-1 rounded-full text-xs font-sans font-bold tracking-wider border transition-colors ${
                scrolled
                  ? "border-[#1E392A]/20 text-[#1E392A]"
                  : "border-white/30 text-white"
              }`}
            >
              {lang === "en" ? "FR" : "EN"}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="mobile-menu-toggle"
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? "text-[#1E392A]" : "text-white"
              }`}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden glass-nav border-t border-[#E5DFD3] animate-fade-in"
        >
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                data-testid={`mobile-nav-${link.id}-link`}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-sans font-medium transition-colors ${
                  activeSection === link.id
                    ? "bg-[#1E392A] text-white"
                    : "text-[#1E392A]/70 hover:bg-[#F3EFE7] hover:text-[#1E392A]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("get-involved")}
              data-testid="mobile-donate-cta"
              className="w-full mt-2 px-6 py-3 rounded-full bg-[#CC5A37] text-white text-sm font-sans font-semibold"
            >
              {t.nav.donate}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

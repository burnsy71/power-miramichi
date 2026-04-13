import { ArrowDown } from "lucide-react";
import { useLang } from "@/LanguageContext";

const LANDSCAPE = "/images/hero-landscape.jpeg";
const PORTRAIT = "/images/shawn-torso.jpg";

export default function Hero() {
  const { t } = useLang();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#1E392A]"
    >
      {/* Landscape backdrop — desaturated and darkened */}
      <div className="absolute inset-0">
        <img
          src={LANDSCAPE}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(30,57,42,0.95) 0%, rgba(30,57,42,0.85) 45%, rgba(30,57,42,0.55) 65%, rgba(30,57,42,0.2) 100%)",
          }}
        />
      </div>

      {/* Portrait — right side on desktop, hidden on mobile (mobile gets text-only over darker bg) */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[48%] xl:w-[45%]">
        <img
          src={PORTRAIT}
          alt="Shawn Power"
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-y-0 left-0 w-40"
          style={{
            background:
              "linear-gradient(90deg, rgba(30,57,42,0.85) 0%, rgba(30,57,42,0) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-0 w-full">
        <div className="max-w-2xl">
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#E2AA54]/40 text-[#E2AA54] text-xs tracking-[0.2em] uppercase font-sans font-medium mb-8">
              {t.hero.location}
            </span>
          </div>

          <h1
            data-testid="hero-title"
            className="animate-fade-in-up font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.05] mb-6"
            style={{ animationDelay: "0.2s" }}
          >
            {t.hero.name}
            <span className="block text-[#E2AA54] mt-2">{t.hero.forMayor}</span>
          </h1>

          <p
            data-testid="hero-slogan"
            className="animate-fade-in-up font-serif text-xl sm:text-2xl text-white/90 italic leading-relaxed mb-4 max-w-2xl"
            style={{ animationDelay: "0.3s" }}
          >
            {t.hero.slogan}
          </p>

          <p
            data-testid="hero-tagline"
            className="animate-fade-in-up font-sans text-sm tracking-[0.15em] uppercase text-[#E2AA54] font-medium mb-10"
            style={{ animationDelay: "0.35s" }}
          >
            {t.hero.tagline}
          </p>

          <div
            className="animate-fade-in-up flex flex-wrap gap-4"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={() => scrollTo("platform")}
              data-testid="hero-platform-cta"
              className="px-8 py-4 rounded-full bg-[#CC5A37] text-white font-sans font-semibold text-base hover:bg-[#B34A2D] transition-colors"
            >
              {t.hero.ctaPlatform}
            </button>
            <button
              onClick={() => scrollTo("get-involved")}
              data-testid="hero-volunteer-cta"
              className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-sans font-medium text-base hover:bg-white/10 transition-colors"
            >
              {t.hero.ctaJoin}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo("about")}
        data-testid="hero-scroll-indicator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors animate-bounce"
      >
        <span className="text-xs font-sans tracking-widest uppercase">{t.hero.scroll}</span>
        <ArrowDown size={18} />
      </button>
    </section>
  );
}

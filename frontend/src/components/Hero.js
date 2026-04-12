import { ArrowDown } from "lucide-react";

const HERO_BG = "https://images.unsplash.com/photo-1571862729121-3c9e75b95c97?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwxfHxNaXJhbWljaGklMjByaXZlcnxlbnwwfHx8fDE3NzU5OTA3NDd8MA&ixlib=rb-4.1.0&q=85";

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Miramichi River"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-0">
        <div className="max-w-3xl">
          <div className="animate-fade-in-up stagger-child delay-100" style={{ opacity: 1 }}>
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#E2AA54]/40 text-[#E2AA54] text-xs tracking-[0.2em] uppercase font-sans font-medium mb-8">
              Miramichi, New Brunswick
            </span>
          </div>

          <h1
            data-testid="hero-title"
            className="animate-fade-in-up stagger-child delay-200 font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.05] mb-6"
            style={{ opacity: 1 }}
          >
            Shawn Power
            <span className="block text-[#E2AA54] mt-2">for Mayor</span>
          </h1>

          <p
            data-testid="hero-slogan"
            className="animate-fade-in-up stagger-child delay-300 font-serif text-xl sm:text-2xl text-white/90 italic leading-relaxed mb-10 max-w-2xl"
            style={{ opacity: 1 }}
          >
            "The time for debate has passed. The time for action is now."
          </p>

          <div
            className="animate-fade-in-up stagger-child delay-400 flex flex-wrap gap-4"
            style={{ opacity: 1 }}
          >
            <button
              onClick={() => scrollTo("platform")}
              data-testid="hero-platform-cta"
              className="px-8 py-4 rounded-full bg-[#CC5A37] text-white font-sans font-semibold text-base hover:bg-[#B34A2D] transition-colors"
            >
              See the Platform
            </button>
            <button
              onClick={() => scrollTo("get-involved")}
              data-testid="hero-volunteer-cta"
              className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-sans font-medium text-base hover:bg-white/10 transition-colors"
            >
              Join the Movement
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("about")}
        data-testid="hero-scroll-indicator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors animate-bounce"
      >
        <span className="text-xs font-sans tracking-widest uppercase">Scroll</span>
        <ArrowDown size={18} />
      </button>
    </section>
  );
}

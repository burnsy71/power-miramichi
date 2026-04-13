import { Building2, Receipt, Medal, Route, BusFront } from "lucide-react";
import { useLang } from "@/LanguageContext";

const BRIDGE_IMG = "/images/bridge.webp";

const icons = [Building2, Receipt, Medal, Route, BusFront];

export default function Platform() {
  const { t } = useLang();
  const items = t.platform.items;

  return (
    <section
      id="platform"
      data-testid="platform-section"
      className="py-24 lg:py-32 bg-[#F3EFE7]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <span className="inline-block text-xs tracking-[0.25em] uppercase font-sans font-medium text-[#CC5A37] mb-4">
            {t.platform.label}
          </span>
          <h2
            data-testid="platform-heading"
            className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E392A] mb-4"
          >
            {t.platform.heading}
          </h2>
          <p className="font-sans text-lg text-[#1E392A]/60 max-w-2xl">
            {t.platform.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Planning Commission - Large */}
          <div
            data-testid="platform-card-planning"
            className="col-span-12 md:col-span-8 platform-card rounded-2xl bg-[#FDFCF8] border border-[#E5DFD3] p-8 lg:p-10"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="p-3 rounded-xl bg-[#1E392A] text-white shrink-0">
                <Building2 size={22} />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#1E392A]">
                  {items[0].title}
                </h3>
                <p className="font-sans text-sm text-[#CC5A37] font-medium mt-1">
                  {items[0].summary}
                </p>
              </div>
            </div>
            <p className="font-sans text-base text-[#1E392A]/70 leading-relaxed">
              {items[0].detail}
            </p>
          </div>

          {/* Taxes - Dark */}
          <div
            data-testid="platform-card-taxes"
            className="col-span-12 md:col-span-4 platform-card rounded-2xl bg-[#1E392A] p-8 lg:p-10 text-white"
          >
            <div className="p-3 rounded-xl bg-white/10 w-fit mb-5">
              <Receipt size={22} />
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-2">
              {items[1].title}
            </h3>
            <p className="font-sans text-sm text-[#E2AA54] font-medium mb-4">
              {items[1].summary}
            </p>
            <p className="font-sans text-sm text-white/70 leading-relaxed">
              {items[1].detail}
            </p>
          </div>

          {/* Veterans */}
          <div
            data-testid="platform-card-veterans"
            className="col-span-12 md:col-span-4 platform-card rounded-2xl bg-[#FDFCF8] border border-[#E5DFD3] p-8 lg:p-10"
          >
            <div className="p-3 rounded-xl bg-[#CC5A37] text-white w-fit mb-5">
              <Medal size={22} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1E392A] mb-2">
              {items[2].title}
            </h3>
            <p className="font-sans text-sm text-[#CC5A37] font-medium mb-4">
              {items[2].summary}
            </p>
            <p className="font-sans text-sm text-[#1E392A]/70 leading-relaxed">
              {items[2].detail}
            </p>
          </div>

          {/* Bypass */}
          <div
            data-testid="platform-card-bypass"
            className="col-span-12 md:col-span-4 platform-card rounded-2xl bg-[#FDFCF8] border border-[#E5DFD3] p-8 lg:p-10"
          >
            <div className="p-3 rounded-xl bg-[#E2AA54] text-[#1E392A] w-fit mb-5">
              <Route size={22} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1E392A] mb-2">
              {items[3].title}
            </h3>
            <p className="font-sans text-sm text-[#CC5A37] font-medium mb-4">
              {items[3].summary}
            </p>
            <p className="font-sans text-sm text-[#1E392A]/70 leading-relaxed">
              {items[3].detail}
            </p>
          </div>

          {/* Centennial Bridge */}
          <div
            data-testid="platform-card-bridge"
            className="col-span-12 md:col-span-4 platform-card rounded-2xl overflow-hidden relative"
          >
            <img
              src={BRIDGE_IMG}
              alt="Bridge"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E392A] via-[#1E392A]/70 to-transparent" />
            <div className="relative p-8 lg:p-10 flex flex-col justify-end min-h-[320px] text-white">
              <div className="p-3 rounded-xl bg-white/15 w-fit mb-4">
                <BusFront size={22} />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">
                {items[4].title}
              </h3>
              <p className="font-sans text-sm text-[#E2AA54] font-medium mb-3">
                {items[4].summary}
              </p>
              <p className="font-sans text-xs text-white/70 leading-relaxed">
                {items[4].detail}
              </p>
            </div>
          </div>
        </div>

        {/* Council quote */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-[#FDFCF8] border border-[#E5DFD3]">
            <p className="font-serif text-lg text-[#1E392A] italic leading-relaxed max-w-xl">
              {t.platform.councilQuote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

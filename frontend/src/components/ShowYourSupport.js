import { ArrowRight } from "lucide-react";
import { useLang } from "@/LanguageContext";

const BADGE_EXAMPLE = "/images/badge-example.png";

export default function ShowYourSupport() {
  const { t } = useLang();
  const s = t.showYourSupport;

  return (
    <section
      id="show-your-support"
      data-testid="show-your-support-section"
      className="py-24 lg:py-32 bg-[#1E392A] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Badge preview */}
          <div className="order-2 lg:order-1">
            <div className="relative max-w-md mx-auto">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-30"
                style={{ background: "radial-gradient(circle, #E2AA54 0%, transparent 70%)" }}
              />
              <img
                src={BADGE_EXAMPLE}
                alt={s.imageAlt}
                className="relative w-full h-auto rounded-full shadow-2xl"
              />
            </div>
          </div>

          {/* Copy + CTA */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-xs tracking-[0.25em] uppercase font-sans font-medium text-[#E2AA54] mb-4">
              {s.kicker}
            </span>
            <h2
              data-testid="show-your-support-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight"
            >
              {s.heading}
            </h2>
            <p className="font-sans text-lg text-white/75 leading-relaxed mb-8 max-w-lg">
              {s.body}
            </p>
            <ul className="space-y-3 mb-10 text-white/85 font-sans text-base">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E2AA54] shrink-0" />
                <span>{s.bullet1}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E2AA54] shrink-0" />
                <span>{s.bullet2}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E2AA54] shrink-0" />
                <span>{s.bullet3}</span>
              </li>
            </ul>
            <a
              href="/support/"
              data-testid="show-your-support-cta"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#CC5A37] text-white font-sans font-semibold text-base hover:bg-[#B34A2D] transition-colors"
            >
              {s.cta}
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

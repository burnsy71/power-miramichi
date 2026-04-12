import { useLang } from "@/LanguageContext";

const PORTRAIT = "https://customer-assets.emergentagent.com/job_miramichi-power/artifacts/8y40uqb5_IMG_2329.jpeg";

export default function About() {
  const { t } = useLang();

  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-24 lg:py-32 bg-[#FDFCF8]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <span className="inline-block text-xs tracking-[0.25em] uppercase font-sans font-medium text-[#CC5A37] mb-4">
          {t.about.label}
        </span>
        <h2
          data-testid="about-heading"
          className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E392A] mb-16"
        >
          {t.about.heading}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#F3EFE7] border border-[#E5DFD3]">
                <img
                  src={PORTRAIT}
                  alt="Shawn Power"
                  data-testid="about-portrait"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-[#CC5A37]/10 -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-[#E2AA54]/15 -z-10" />
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              <p className="font-sans text-lg text-[#1E392A]/80 leading-relaxed">
                {t.about.bio}
              </p>

              <p className="font-sans text-lg text-[#1E392A]/80 leading-relaxed">
                <em className="text-[#1E392A]/50 font-light">{t.about.bioPlaceholder}</em>
              </p>

              <div className="mt-10 p-8 rounded-2xl bg-[#F3EFE7] border border-[#E5DFD3]">
                <h3 className="font-serif text-xl font-semibold text-[#1E392A] mb-5">
                  {t.about.coreBeliefs}
                </h3>
                <ul className="space-y-3">
                  {t.about.beliefs.map((belief, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#CC5A37] shrink-0" />
                      <span className="font-sans text-base text-[#1E392A]/80">
                        {belief}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

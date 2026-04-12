import { Phone, Mail, Facebook, MapPin, ArrowUp } from "lucide-react";
import { useLang } from "@/LanguageContext";

const FB_URL = "https://www.facebook.com/share/1L3ByXJ88o/?mibextid=wwXIfr";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      data-testid="contact-footer"
      className="bg-[#1E392A] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <span className="inline-block text-xs tracking-[0.25em] uppercase font-sans font-medium text-[#E2AA54] mb-6">
              {f.label}
            </span>
            <h2
              data-testid="contact-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8"
            >
              {f.heading1}<br />
              <span className="text-[#E2AA54]">{f.heading2}</span><br />
              {f.heading3}
            </h2>
            <p className="font-sans text-lg text-white/60 max-w-md leading-relaxed">
              {f.subtitle}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-6">
              <a
                href="tel:5067789410"
                data-testid="contact-phone"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl bg-white/10 group-hover:bg-[#CC5A37] transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-white/40 mb-0.5">
                    {f.phone}
                  </p>
                  <p className="font-sans text-lg font-medium text-white group-hover:text-[#E2AA54] transition-colors">
                    (506) 778-9410
                  </p>
                </div>
              </a>

              <a
                href="mailto:powerformayor@gmail.com"
                data-testid="contact-email"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl bg-white/10 group-hover:bg-[#CC5A37] transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-white/40 mb-0.5">
                    {f.email}
                  </p>
                  <p className="font-sans text-lg font-medium text-white group-hover:text-[#E2AA54] transition-colors">
                    powerformayor@gmail.com
                  </p>
                </div>
              </a>

              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-facebook"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl bg-white/10 group-hover:bg-[#CC5A37] transition-colors">
                  <Facebook size={20} />
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-white/40 mb-0.5">
                    {f.facebook}
                  </p>
                  <p className="font-sans text-lg font-medium text-white group-hover:text-[#E2AA54] transition-colors">
                    {f.facebookText}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/10">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-white/40 mb-0.5">
                    {f.location}
                  </p>
                  <p className="font-sans text-lg font-medium text-white">
                    {f.locationText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
          <p className="font-sans text-sm text-white/40">
            {f.copyright}
          </p>
          <button
            onClick={scrollToTop}
            data-testid="back-to-top"
            className="p-2 rounded-full bg-white/10 hover:bg-[#CC5A37] transition-colors"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

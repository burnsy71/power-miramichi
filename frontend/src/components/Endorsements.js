import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { useLang } from "@/LanguageContext";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Endorsements() {
  const { lang, t } = useLang();
  const [endorsements, setEndorsements] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/settings`),
      axios.get(`${API}/endorsements`),
    ]).then(([settingsRes, endorsementsRes]) => {
      setVisible(settingsRes.data.show_endorsements === true);
      setEndorsements(endorsementsRes.data);
    }).catch(() => {});
  }, []);

  if (!visible || endorsements.length === 0) return null;

  return (
    <section
      id="endorsements"
      data-testid="endorsements-section"
      className="py-24 lg:py-32 bg-[#F3EFE7]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs tracking-[0.25em] uppercase font-sans font-medium text-[#CC5A37] mb-4">
            {t.endorsements.label}
          </span>
          <h2
            data-testid="endorsements-heading"
            className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E392A] mb-4"
          >
            {t.endorsements.heading}
          </h2>
          <p className="font-sans text-lg text-[#1E392A]/60 max-w-xl mx-auto">
            {t.endorsements.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {endorsements.map((e, i) => {
            const name = lang === "fr" && e.name_fr ? e.name_fr : e.name;
            const title = lang === "fr" && e.title_fr ? e.title_fr : e.title;
            const quote = lang === "fr" && e.quote_fr ? e.quote_fr : e.quote;

            return (
              <div
                key={e.id || i}
                data-testid={`endorsement-card-${i}`}
                className="platform-card rounded-2xl bg-[#FDFCF8] border border-[#E5DFD3] p-8 flex flex-col"
              >
                <div className="p-2 rounded-lg bg-[#CC5A37]/10 w-fit mb-5">
                  <Quote size={18} className="text-[#CC5A37]" />
                </div>
                <p className="font-sans text-base text-[#1E392A]/75 leading-relaxed italic flex-1 mb-6">
                  "{quote}"
                </p>
                <div className="border-t border-[#E5DFD3] pt-5">
                  <p className="font-serif text-base font-semibold text-[#1E392A]">
                    {name}
                  </p>
                  {title && (
                    <p className="font-sans text-sm text-[#CC5A37] mt-0.5">
                      {title}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

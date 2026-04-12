import { createContext, useContext, useState } from "react";
import translations from "@/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  const t = translations[lang];

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "fr" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

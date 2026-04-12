import { useState, useEffect } from "react";
import "@/App.css";
import { LanguageProvider } from "@/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Platform from "@/components/Platform";
import CommunityVideo from "@/components/CommunityVideo";
import GetInvolved from "@/components/GetInvolved";
import Footer from "@/components/Footer";

function AppContent() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "platform", "video", "get-involved", "contact"];
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF8]">
      <Navbar activeSection={activeSection} />
      <Hero />
      <About />
      <Platform />
      <CommunityVideo />
      <GetInvolved />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;

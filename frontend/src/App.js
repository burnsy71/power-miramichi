import { useState, useEffect } from "react";
import "@/App.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Platform from "@/components/Platform";
import GetInvolved from "@/components/GetInvolved";
import Footer from "@/components/Footer";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "platform", "get-involved", "contact"];
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
      <GetInvolved />
      <Footer />
    </div>
  );
}

export default App;

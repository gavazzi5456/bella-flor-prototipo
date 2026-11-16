import { useState } from "react";
import { site } from "./data/siteData";
import { emptyPreferences } from "./lib/message";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CategoryGrid } from "./components/CategoryGrid";
import { HowItWorks } from "./components/HowItWorks";
import { ConsultationBuilder } from "./components/ConsultationBuilder";
import { About } from "./components/About";
import { Location } from "./components/Location";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
export default function App() {
  const [preferences, setPreferences] = useState({ ...emptyPreferences });
  return (
    <div id="inicio">
      <a href="#conteudo" className="skip-link">
        {site.skip}
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <CategoryGrid
          selected={preferences.category}
          onSelect={(category) =>
            setPreferences((current) => ({ ...current, category }))
          }
        />
        <HowItWorks />
        <ConsultationBuilder value={preferences} onChange={setPreferences} />
        <About />
        <Location />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}

import React from "react";
import "../styles.css";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Image Section */}
      <section className="hero-image-section">
        <img src="/hero.jpg" alt="Landskap" className="hero-image" />
      </section>

      {/* Hero Section - Text */}
      <section className="hero-text-section">
        <div className="hero-content">
          <h1>Veien til lønnsom bærekraft</h1>
          <p>
            Vi hjelper deg å identifisere og prioritere tiltak som gir best
            resultat for bærekraftig utvikling.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="service">
          <img src="/lys-icon.png" alt="Idea Icon" />
          <h3>Identifisere og prioritere</h3>
          <p>Vi identifiserer, sammenligner, og prioriterer de tiltak som best utnytter dine ressurser, og gir deg et klart konkurransefortrinn i ditt marked.</p>
        </div>
        <div className="service">
          <img src="/vann-icon.png" alt="Digital Twin Icon" />
          <h3>Digital tvilling</h3>
          <p>Med en digital tvilling (digital prototype) kan du bedre forstå og sammenligne hvordan ulike løsninger vil påvirke og prestere i ulike fremtidsscenarioer. Dette gjør det raskere og enklere å vurdere hvilke tiltak man skal gå videre med i et raskt skiftende landskap.</p>
        </div>
        <div className="service">
          <img src="/plante-icon.png" alt="Data Icon" />
          <h3>Dokumentert datagrunnlag</h3>
          <p>Vi leverer et databasert beslutningsgrunnlag som dokumenterer bl.a. risiko og verdi assosiert med analyserte tiltak. Dette gjør det enkelt å kommunisere nytten av nødvendige tiltak og investeringer til beslutningstakere og interessenter.</p>
        </div>
      </section>

      {/* Hero Text Sections */}
      <section className="main-text-section">
        <div className="main-content">
          <h1>Hva er ISY Decision Making?</h1>
          <p>
            ISY Decision Making er et digitalt verktøy for tverrfaglig
            samhandling og bærekraftig beslutningstaking. Verktøyet er utviklet
            for å bedre identifisere, sammenligne, og prioritere tiltak i
            prosjekt, organisasjon og i verdikjeder med flere aktører. Med ISY
            Decision Making får du et databasert beslutningsgrunnlag presentert på
            et verdispåk som gir mening for deg, din bedrift, og ditt prosjekt.
          </p>
        </div>
      </section>

      <section className="main-text-section">
        <div className="main-content">
          <h1>Hvordan fungerer det?</h1>
          <p>
            ISY Decision Making digitaliserer den tilgjengelige informasjon om
            din organisasjon i en digital tvilling – en simulering av det aktuelle
            scenarioet. Løsninger blir så analysert- og kryssanalysert i
            1000-talls simulajsoner. Resultatet av analysene leveres i en integrert
            samhandlingsplattform som du bruker til å ta strategiske avgjørelser.
          </p>
        </div>
      </section>

      <section className="main-text-section">
        <div className="main-content">
          <h1>Hvorfor ISY Decision Making?</h1>
          <p>
            Med digital simulering og beslutningsorientert analyse* kan vi
            eksponentielt øke antall analyserte tiltak og hendelser på kortere tid
            enn ellers. Dette gjør at vi kan gi bedre svar, identifisere hvor det
            finnes størst usikkerhet, og levere et grunnlag for bedre
            beslutningstaking – med redusert bruk av ressurser.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Pure Logic</p>
      </footer>
    </div>
  );
};

export default Home;

import React from "react";
import "../styles.css";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-image-section">
        <img src="/images/2222.jpg" alt="Landskap" className="hero-image" />
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
          <img src="/images/lys-icon.png" alt="Idea Icon" />
          <h3>Identifisere og prioritere</h3>
          <p>Vi identifiserer, sammenligner, og prioriterer de tiltak som best utnytter dine ressurser, og gir deg et klart konkurransefortrinn i ditt marked.</p>
        </div>
        <div className="service">
          <img src="/images/vann-icon.png" alt="Digital Twin Icon" />
          <h3>Digital tvilling</h3>
          <p>Med en digital tvilling (digital prototype) kan du bedre forstå og sammenligne hvordan ulike løsninger vil påvirke og prestere i ulike fremtidsscenarioer. Dette gjør det raskere og enklere å vurdere hvilke tiltak man skal gå videre med i et raskt skiftende landskap.</p>
        </div>
        <div className="service">
          <img src="/images/plante-icon.png" alt="Data Icon" />
          <h3>Dokumentert datagrunnlag</h3>
          <p>Vi leverer et databasert beslutningsgrunnlag som dokumenterer bl.a. risiko og verdi assosiert med analyserte tiltak. Dette gjør det enkelt å kommunisere nytten av nødvendige tiltak og investeringer til beslutningstakere og interessenter.</p>
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

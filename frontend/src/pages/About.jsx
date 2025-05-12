import React from "react";
import "../styles/styles.css"; // Correct relative path
import "../styles/about.css"; // Correct relative path

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>Om oss</h1>
      </section>

      <section className="about-content">
        <div className="content-left">
          <img src="/images/network.png" alt="Network Icon" />
          <p>
            Pure Logic har sju faste ansatte samt et bredt partnernettverk og
            ressurser vi aktiverer etter behov. Vi jobber med bærekraft først,
            og den høye og tverrfaglige kompetansen sikrer at vi kan tilpasse
            verktøy og metoder til hver enkelt kunde.
          </p>
        </div>
        <div className="content-right">
          <p>
            Pure Logic ble stiftet i 2015 med en enkel målsetting om å hjelpe
            andre til å ta bedre valg. Vi bruker omtrent 30% av årlig
            omsetning på forskning og utvikling, hvilket er mye, men likevel
            sentralt i vår filosofi for å skape et vedvarende
            konkurransefortrinn.
          </p>
        </div>
      </section>

      <section className="team-section">
        <div className="team-member">
          <img src="/images/profil-mann.jpg" alt="Ola Normann" />
          <h3>Ola Normann</h3>
          <p>
            <a href="mailto:ola@nordmann.no">ola@nordmann.no</a>
          </p>
          <p>95 98 70 66</p>
        </div>

        <div className="team-member">
          <img src="/images/profil-dame.png" alt="Kari Normann" />
          <h3>Kari Normann</h3>
          <p>
            <a href="mailto:kari@nordmann.no">kari@nordmann.no</a>
          </p>
          <p>95 98 70 66</p>
        </div>

        <div className="team-member">
          <img src="/images/profil-mann.jpg" alt="Ola Normann" />
          <h3>Ola Normann</h3>
          <p>
            <a href="mailto:ola@nordmann.no">ola@nordmann.no</a>
          </p>
          <p>95 98 70 66</p>
        </div>

        <div className="team-member">
          <img src="/images/profil-dame.png" alt="Kari Normann" />
          <h3>Kari Normann</h3>
          <p>
            <a href="mailto:kari@nordmann.no">kari@nordmann.no</a>
          </p>
          <p>95 98 70 66</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2025 Pure Logic</p>
      </footer>
    </div>
  );
};

export default About;

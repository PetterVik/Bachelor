import React, { useState, useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Navbar from "../components/Navbar";
import "../styles.css";
import "./Home.css";

const Home = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    // Initial check on mount
    handleResize();

    // Set up event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Navbar isScrolled={currentSection > 0} />

      <ReactFullpage
        navigation
        navigationPosition="right"
        scrollingSpeed={500}
        easing="easeInOutCubic"
        css3={true}
        scrollOverflow={true}  // Ensures scroll doesn't skip sections.
        controlArrows={false}  // Disable the control arrows
        showActiveTooltip={false}  // Disable active tooltip for navigation
        onLeave={(origin, destination, direction) => {
          setCurrentSection(destination.index);
        }}
        afterLoad={(origin, destination, direction) => {
          setCurrentSection(destination.index);  // Ensure smooth loading after the section is loaded
        }}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              {/* Combined Section for Mobile */}
              {isMobile ? (
                <div className="section">
                  <div className="home-container">
                    <div className="hero-image-section">
                      <img src="/hero.jpg" alt="Landskap" className="hero-image" />
                    </div>
                    <div className="hero-text-section">
                      <div className="hero-content">
                        <h1>Veien til lønnsom bærekraft</h1>
                        <p>Vi hjelper deg å identifisere og prioritere tiltak som gir best resultat for bærekraftig utvikling.</p>
                      </div>
                    </div>
                  </div>

                  <section className="services">
                    <div className="service">
                      <img src="/lys-icon.png" alt="Idea Icon" className="img-part1" />
                      <h3>Identifisere og prioritere</h3>
                      <p>Vi identifiserer, sammenligner, og prioriterer de tiltak som best utnytter dine ressurser, og gir deg et klart konkurransefortrinn i ditt marked.</p>
                    </div>
                    <div className="service">
                      <img src="/vann-icon.png" alt="Digital Twin Icon" className="img-part2" />
                      <h3>Digital tvilling</h3>
                      <p>Med en digital tvilling (digital prototype) kan du bedre forstå og sammenligne hvordan ulike løsninger vil påvirke og prestere i ulike fremtidsscenarioer. Dette gjør det raskere og enklere å vurdere hvilke tiltak man skal gå videre med i et raskt skiftende landskap.</p>
                    </div>
                    <div className="service">
                      <img src="/plante-icon.png" alt="Data Icon" className="img-part3" />
                      <h3>Dokumentert datagrunnlag</h3>
                      <p>Vi leverer et databasert beslutningsgrunnlag som dokumenterer bl.a. risiko og verdi assosiert med analyserte tiltak. Dette gjør det enkelt å kommunisere nytten av nødvendige tiltak og investeringer til beslutningstakere og interessenter.</p>
                    </div>
                  </section>
                </div>
              ) : (
                <>
                  {/* Section 1 */}
                  <div className="section">
                    <div className="home-container">
                      <div className="hero-image-section">
                        <img src="/hero.jpg" alt="Landskap" className="hero-image" />
                      </div>
                      <div className="hero-text-section">
                        <div className="hero-content">
                          <h1>Veien til lønnsom bærekraft</h1>
                          <p>Vi hjelper deg å identifisere og prioritere tiltak som gir best resultat for bærekraftig utvikling.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="section">
                    <section className="services">
                      <div className="service">
                        <img src="/lys-icon.png" alt="Idea Icon" className="img-part1" />
                        <h3>Identifisere og prioritere</h3>
                        <p>Vi identifiserer, sammenligner, og prioriterer de tiltak som best utnytter dine ressurser, og gir deg et klart konkurransefortrinn i ditt marked.</p>
                      </div>
                      <div className="service">
                        <img src="/vann-icon.png" alt="Digital Twin Icon" className="img-part2" />
                        <h3>Digital tvilling</h3>
                        <p>Med en digital tvilling (digital prototype) kan du bedre forstå og sammenligne hvordan ulike løsninger vil påvirke og prestere i ulike fremtidsscenarioer. Dette gjør det raskere og enklere å vurdere hvilke tiltak man skal gå videre med i et raskt skiftende landskap.</p>
                      </div>
                      <div className="service">
                        <img src="/plante-icon.png" alt="Data Icon" className="img-part3" />
                        <h3>Dokumentert datagrunnlag</h3>
                        <p>Vi leverer et databasert beslutningsgrunnlag som dokumenterer bl.a. risiko og verdi assosiert med analyserte tiltak. Dette gjør det enkelt å kommunisere nytten av nødvendige tiltak og investeringer til beslutningstakere og interessenter.</p>
                      </div>
                    </section>
                  </div>
                </>
              )}

              {/* Section 3 */}
              <div className="section">
                <section className="main-text-section">
                  <div className="main-content">
                    <h1>Hva er ISY Decision Making?</h1>
                    <p>ISY Decision Making er et digitalt verktøy for tverrfaglig samhandling og bærekraftig beslutningstaking. Verktøyet er utviklet for å bedre identifisere, sammenligne, og prioritere tiltak i prosjekt, organisasjon og i verdikjeder med flere aktører. Med ISY Decision Making får du et databasert beslutningsgrunnlag presentert på et verdispåk som gir mening for deg, din bedrift, og ditt prosjekt.</p>
                  </div>
                </section>
              </div>

              {/* Section 4 */}
              <div className="section">
                <section className="main-text-section">
                  <div className="main-content">
                    <h1>Hvordan fungerer det?</h1>
                    <p>ISY Decision Making digitaliserer den tilgjengelige informasjon om din organisasjon i en digital tvilling – en simulering av det aktuelle scenarioet. Løsninger blir så analysert- og kryssanalysert i 1000-talls simulajsoner. Resultatet av analysene leveres i en integrert samhandlingsplattform som du bruker til å ta strategiske avgjørelser.</p>
                  </div>
                </section>
              </div>

              {/* Section 5 (with Footer inside) */}
              <div className="section section-5">
                <section className="main-text-section">
                  <div className="main-content">
                    <h1>Hvorfor ISY Decision Making?</h1>
                    <p>Med digital simulering og beslutningsorientert analyse kan vi eksponentielt øke antall analyserte tiltak og hendelser på kortere tid enn ellers. Dette gjør at vi kan gi bedre svar, identifisere hvor det finnes størst usikkerhet, og levere et grunnlag for bedre beslutningstaking – med redusert bruk av ressurser.</p>
                  </div>
                </section>

                {/* Footer Section inside Section 5 */}
                <footer className="footer">
                  <p>© 2025 Pure Logic</p>
                </footer>
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </>
  );
};

export default Home;

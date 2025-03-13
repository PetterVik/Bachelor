import React from "react";
import "../styles.css"; 
import "./contact.css"; 

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Header Section */}
      <section className="contact-header">
        <h1>Kontakt oss</h1>
      </section>

  

           {/* Kontakt med ekspert Section */}
        <section className="contact-booking">
          <h2>Vår ekspertise, ditt behov</h2>
          <p>
            Ingen løsninger passer for alle. Ønsket mål og verdiforståelse vil være ulikt mellom bedrift til bedrift. Derfor arbeider vi sammen med deg for å tilpasse vårt verktøy og metoder til ditt behov.             Ønsker du å finne ut mer om hvordan vi kan hjelpe deg med bærekraftig verdiskapning, lønnsom bærekraft, og bedre beslutninger?

          </p>
          <p>
            Ta kontakt for en gratis 30 minutters konsultasjon med en av våre eksperter.
          </p>
          
          {/* Book Appointment Button */}
          <button className="book-appointment-btn">Book en tid</button>
        </section>

        {/* Kontaktinformasjon og Google Maps seksjon */}
      <section className="contact-info-and-map">
        <div className="contact-info">
          <h2>
          <img src="/assets/adresse.png" alt="Adresse Icon" style={{ width: '30px', marginRight: '10px' }} />
          Adresse:
          </h2>
          <p>Kjørboveien 16</p>
          <p>1337 Sandvika</p>
          
          <h2>
          <img src="/assets/adresse.png" alt="E-post Icon" style={{ width: '20px', marginRight: '10px' }} />
          E-post:
          </h2>
          <p>post@purelogic.no</p>
          
          <h2>
          <img src="/assets/adresse.png" alt="Telefon Icon" style={{ width: '20px', marginRight: '10px' }} />
          Telefon:
          </h2>
          <p>+47 95106883</p>
        </div>
        <div className="contact-map">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2001.7220936416961!2d10.523994077274423!3d59.88696297488916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464113b40ef359df%3A0x47508fd7c656c438!2sKj%C3%B8rboveien%2016%2C%201337%20Sandvika!5e0!3m2!1sen!2sno!4v1741187137992!5m2!1sen!2sno"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;


import React, { useState, useRef } from "react";
import "../styles.css";
import "./contact.css";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Sett opp norsk lokaliseringsformat
moment.locale("nb");
const localizer = momentLocalizer(moment);

const Contact = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: ""
  });

  // Referanse til kalendercontaineren (eller booking-skjemaet)
  const calendarRef = useRef(null);

  const scrollToCalendar = () => {
    if (calendarRef.current) {
      const elementTop = calendarRef.current.getBoundingClientRect().top;
      const offset = window.pageYOffset + elementTop - 110; 
      // "150" er antall piksler du vil trekke fra (juster etter ønske)

      window.scrollTo({
        top: offset,
        behavior: "smooth"
      });
    }
  };

  // Generer ledige tidsluker – kun tirsdager (day() === 2) og torsdager (day() === 4)
  // med tidene: 10:00, 10:30, 11:00, 11:30 og 12:00 (hver tidsluke varer i 30 minutter)
  const generateSlots = () => {
    const slots = [];
    const startDate = moment().startOf("day");
    const endDate = moment().add(2, "months").endOf("day");
    let day = startDate.clone();

    // Definer tidene som en liste (10, 10.5, 11, 11.5, 12)
    const times = [10, 10.5, 11, 11.5, 12];

    while (day.isBefore(endDate)) {
      // 2 = tirsdag, 4 = torsdag
      if (day.day() === 2 || day.day() === 4) {
        times.forEach((t) => {
          const hour = Math.floor(t);
          const minute = (t - hour) * 60;
          const slotStart = day.clone().set({
            hour: hour,
            minute: minute,
            second: 0,
            millisecond: 0
          });
          const slotEnd = slotStart.clone().add(30, "minutes");
          slots.push({
            start: slotStart.toDate(),
            end: slotEnd.toDate(),
            title: "Ledig time"
          });
        });
      }
      day.add(1, "day");
    }
    return slots;
  };

  // Bruk onSelectEvent for å fange klikk på et "Ledig time"-event
  const handleSelectEvent = (event) => {
    setSelectedSlot(event);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler sending av data til backend og e-postbekreftelse
    console.log("Booking lagret:", { ...formData, time: selectedSlot.start });
    alert(`Takk for din booking! En bekreftelse er sendt til ${formData.email}.`);
    // Tilbakestill state slik at kalender og skjema lukkes
    setSelectedSlot(null);
    setFormData({
      name: "",
      email: "",
      subject: "",
      description: ""
    });
    setShowCalendar(false);
  };

  

  const handleBookTime = () => {
    setShowCalendar(true);
    // Vent litt så elementet rendres før scroll
    setTimeout(scrollToCalendar, 100);
  };

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
          Ingen løsninger passer for alle. Ønsket mål og verdiforståelse vil være
          ulikt mellom bedrift til bedrift. Derfor arbeider vi sammen med deg for
          å tilpasse vårt verktøy og metoder til ditt behov. Ønsker du å finne ut
          mer om hvordan vi kan hjelpe deg med bærekraftig verdiskapning, lønnsom
          bærekraft, og bedre beslutninger?
        </p>
        <p>
          Ta kontakt for en gratis 30 minutters konsultasjon med en av våre eksperter.
        </p>
        {/* Book Appointment Button med scroll-funksjonalitet */}
        <button
          className="book-appointment-btn"
          onClick={handleBookTime}
        >
          Book en tid
        </button>
      </section>

      {/* Kalender-visning for booking */}
      {showCalendar && !selectedSlot && (
        <div className="calendar-container" ref={calendarRef}>
          <h2>Velg en ledig tid</h2>
          <Calendar
            localizer={localizer}
            events={generateSlots()}
            defaultView="work_week"
            views={["work_week"]}
            step={30}
            onSelectEvent={handleSelectEvent}
            min={new Date(0, 0, 0, 10, 0, 0)}
            max={new Date(0, 0, 0, 12, 30, 0)}
            style={{ height: 500, margin: "30px 0" }}
            formats={{
              dayFormat: (date, culture, localizer) =>
                localizer.format(date, "ddd DD/MM", culture)
            }}
          />
          <button onClick={() => setShowCalendar(false)}>
            Avbryt booking
          </button>
        </div>
      )}

      {/* Booking-skjema når en slot er valgt */}
      {showCalendar && selectedSlot && (
        <div className="booking-form-container" ref={calendarRef}>
          <h2>Bestill konsultasjon</h2>
          <p>
            Valgt tid:{" "}
            {moment(selectedSlot.start).format("dddd, MMMM Do YYYY, HH:mm")}
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Navn:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="email">Epost:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="subject">Emne:</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleInputChange}
            />

            <label htmlFor="description">Melding:</label>
            <textarea
              name="description"
              id="description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>

            <button type="submit">Bestill konsultasjon</button>
          </form>
          <button onClick={() => setSelectedSlot(null)}>
            Tilbake til kalender
          </button>
        </div>
      )}

      {/* Kontaktinformasjon og kart */}
      <section className="contact-info-and-map">
        <div className="contact-info">
          <h2>
            <img
              src="/assets/adress.png"
              alt="Adresse Icon"
              style={{ width: "30px", marginRight: "10px" }}
            />
            Adresse:
          </h2>
          <p>Kjørboveien 16</p>
          <p>1337 Sandvika</p>

          <h2>
            <img
              src="/assets/email.png"
              alt="E-post Icon"
              style={{ width: "20px", marginRight: "10px" }}
            />
            E-post:
          </h2>
          <p>
            <a href="mailto:post@purelogic.no">post@purelogic.no</a>
          </p>


          <h2>
            <img
              src="/assets/phone.png"
              alt="Telefon Icon"
              style={{ width: "20px", marginRight: "10px" }}
            />
            Telefon:
          </h2>
          <p>+47 951 06 883</p>
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

      <footer className="footer">
        <p>© 2025 Pure Logic</p>
      </footer>
    </div>
  );
};

export default Contact;

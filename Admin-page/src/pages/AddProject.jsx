// src/pages/AddProject.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/AddProject.css';
import axios from 'axios';

const AddProject = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      keywords: '',
      subtitle: '',
      text: '',
      visibleOnWebsite: false,
      sections: [{ subtitle: '', text: '' }],
    });

    // Handle input changes
    const handleChange = (e, index) => {
        const { name, value, files } = e.target;
        if (name === 'subtitle' || name === 'text') {
            const updatedSections = [...formData.sections];
            updatedSections[index][name] = value;
            setFormData({ ...formData, sections: updatedSections });
        } else if (name === 'image') {
            // Håndter bildedata separat, men vi vil fremdeles lagre det i state
            // Du kan eventuelt utvide for å vise forhåndsvisning av bildet
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Legge til et nøkkelord m.m. (kodestumpen er uendret)
    // ... (Samme for handleKeywordChange, handleCustomKeywordChange, removeKeyword osv.)
    // ... (Samme for addSection, removeSection)

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
          // Opprett FormData for å håndtere både tekstfelter og evt. bilde
          const data = new FormData();
          data.append('title', formData.title);
          data.append('description', formData.description);
          data.append('keywords', formData.keywords);  // Om du lagrer i en streng
          data.append('visibleOnWebsite', formData.visibleOnWebsite);

          if (formData.image) {
            data.append('image', formData.image);
          }
          // Lagrer sections som JSON-streng
          data.append('sections', JSON.stringify(formData.sections));

          // Send POST-forespørsel til .NET-backend (bytt evt. til riktig port/URL)
          const response = await axios.post('http://localhost:5123/api/projects', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          // Logg hele responsen for å se strukturen
          console.log("Hele responsen:", response);
          console.log("response.data:", response.data);

          // Viser ID dersom serveren returnerer { id: 123, ... }
          console.log("Nytt prosjekt opprettet med id:", response.data.id);

          // Du kan eventuelt vise en melding i UI:
          alert("Prosjekt opprettet!");
        } catch (error) {
          console.error("Feil under oppretting av prosjekt:", error);
          alert("Det oppstod en feil ved opprettelsen av prosjektet.");
        }
    };

    return (
        <>
        <Navbar />
        <div className="add-project-container">
            <h2>Legg til nytt prosjekt</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Prosjekt tittel</label>
                <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label>Last opp bilde</label>
                <label htmlFor="file-input" className="custom-file-upload">
                    Bla gjennom datamaskinen her
                </label>
                <input
                id="file-input"
                type="file"
                name="image"
                onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Kort beskrivelse</label>
                <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                />
            </div>

            {/* Her skulle nøkkelord-logikk vært, hvis det eksisterer i originalen */}
            {/* ... */}
            
            {formData.sections.map((section, index) => (
            <div key={index} className="form-group">
                <label>Underoverskrift</label>
                <select
                name="subtitle"
                value={section.subtitle}
                onChange={(e) => handleChange(e, index)}
                required
                >
                    <option value="" disabled>Velg underoverskrift</option>
                    <option value="Intro">Intro</option>
                    <option value="Oppdrag">Oppdrag</option>
                    <option value="Løsning">Løsning</option>
                    <option value="Resultat">Resultat</option>
                </select>

                <label>Tekst</label>
                <textarea
                type="text"
                name="text"
                value={section.text}
                onChange={(e) => handleChange(e, index)}
                required
                />
                {index > 0 && (
                <button
                    type="button"
                    className="remove-section-button"
                    onClick={() => {
                      const updatedSections = formData.sections.filter((_, i) => i !== index);
                      setFormData({ ...formData, sections: updatedSections });
                    }}
                >
                    x
                </button>
                )}
            </div>
            ))}

            <button
            type="button"
            className="add-section-button"
            onClick={() => {
                setFormData({
                ...formData,
                sections: [...formData.sections, { subtitle: '', text: '' }],
                });
            }}
            >
            + Legg til et nytt avsnitt
            </button>

            <div className="form-group">
            <label>Synlig på nettside:</label>
                <div>
                    <label>
                    <input 
                        type="radio" 
                        name="visibleOnWebsite" 
                        value="yes" 
                        checked={formData.visibleOnWebsite === 'yes'} 
                        onChange={handleChange} 
                    />
                    Ja
                    </label>
                    <label>
                    <input 
                        type="radio" 
                        name="visibleOnWebsite" 
                        value="no" 
                        checked={formData.visibleOnWebsite === 'no'} 
                        onChange={handleChange} 
                    />
                    Nei
                    </label>
                </div>
            </div>

            <div>
                <button type="submit" className="submit">Last opp prosjekt</button>
            </div>
            </form>
        </div>
        </>
    );
};

export default AddProject;

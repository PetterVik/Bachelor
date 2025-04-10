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
    sections: [{ subtitle: '', text: '' }], // State for multiple sections
    image: null,
  });
  
  // State for tilbakemelding
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Forhåndsdefinerte nøkkelord
  const predefinedKeywords = [
    'Grønn industri',
    'Solkraft',
    'Areal - og eiendomsutvikling',
    'LCA og klimagass',
    'Vindkraft',
    'Vann',
    'Industriarkitektur',
  ];
  
  // Legge til et nøkkelord
  const handleKeywordChange = (e) => {
    const selectedKeyword = e.target.value;
    if (!formData.keywords.includes(selectedKeyword) && formData.keywords.length < 5) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, selectedKeyword],
      });
      // Nullstiller rullegardinen etter valg
      e.target.value = ''; // Setter verdien til tomt igjen
    }
  };

  // Legge til eget nøkkelord
  const handleCustomKeywordChange = (e) => {
    const customKeyword = e.target.value;
    if (customKeyword && !formData.keywords.includes(customKeyword) && formData.keywords.length < 5) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, customKeyword],
      });
    }
  };

  // Fjerne et nøkkelord
  const removeKeyword = (keyword) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((kw) => kw !== keyword),
    });
  };

  // Handle input changes
  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      // For filinput hentes filobjektet direkte
      setFormData({ ...formData, image: files[0] });
    } else if (name === 'subtitle' || name === 'text') {
      const updatedSections = [...formData.sections];
      updatedSections[index][name] = value;
      setFormData({ ...formData, sections: updatedSections });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Add a new section
  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { subtitle: '', text: '' }],
    });
  };

  // Remove a section
  const removeSection = (index) => {
    const updatedSections = formData.sections.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      sections: updatedSections,
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Opprett FormData for å håndtere både tekst og fil
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('keywords', formData.keywords);
    data.append('visibleOnWebsite', formData.visibleOnWebsite);
    if (formData.image) {
      data.append('image', formData.image);
    }
    // Seksjoner sendes som en JSON-streng
    data.append('sections', JSON.stringify(formData.sections));

    try {
      const response = await axios.post('http://localhost:5123/api/projects', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Logging for å se hele responsen og strukturen i response.data
      console.log("Hele responsen:", response);
      console.log("response.data:", response.data);
      
      // Bruk response.data.id eller response.data.Id avhengig av hva backend returnerer
      console.log('Nytt prosjekt opprettet med id:', response.data.id || response.data.Id);
      setSuccessMessage('Nytt prosjekt har blitt lagt til!');
      setErrorMessage('');
    } catch (error) {
      console.error('Feil under opprettelse av prosjekt:', error);
      console.error('error.message:', error.message);
      console.error('error.stack:', error.stack);
      setErrorMessage('Det oppstod en feil under opprettelsen av prosjektet.');
      setSuccessMessage('');
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
  
          {/* Nøkkelord */}
          <div className="form-group">
            <label>Nøkkelord</label>
            <select onChange={handleKeywordChange} disabled={formData.keywords.length >= 5}>
              <option value="" disabled selected>
                Velg nøkkelord
              </option>
              {predefinedKeywords.sort().map((keyword, index) => (
                <option key={index} value={keyword}>
                  {keyword}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Nytt nøkkelord"
              onBlur={handleCustomKeywordChange}
              maxLength="50"
              disabled={formData.keywords.length >= 5}
            />
          </div>
          <div>
            {formData.keywords.length > 0 && (
              <div>
                <strong>Valgte nøkkelord:</strong>
                <ul>
                  {formData.keywords.map((keyword, index) => (
                    <li key={index}>
                      {keyword}{' '}
                      <button type="button" onClick={() => removeKeyword(keyword)}>
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
  
          {formData.sections.map((section, index) => (
            <div key={index} className="form-group">
              <label>Underoverskrift</label>
              <select
                name="subtitle"
                value={section.subtitle}
                onChange={(e) => handleChange(e, index)}
                required
              >
                <option value="" disabled selected>
                  Velg underoverskrift
                </option>
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
                  onClick={() => removeSection(index)}
                >
                  x
                </button>
              )}
            </div>
          ))}
  
          <button
            type="button"
            className="add-section-button"
            onClick={addSection}
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

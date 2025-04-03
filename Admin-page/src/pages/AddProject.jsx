import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddProject.css';

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    visibleOnWebsite: false,
    sections: [{ subtitle: '', text: '' }],
    image: null,
  });
  
  // State for tilbakemelding
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Håndterer input-endringer, med spesiell behandling for bilde og seksjoner
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

  // Legger til en ny seksjon
  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { subtitle: '', text: '' }],
    });
  };

  // Fjerner en seksjon
  const removeSection = (index) => {
    const updatedSections = formData.sections.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      sections: updatedSections,
    });
  };

  // Håndterer innsending av skjemaet og sender data til backend
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
      // Vis en suksessmelding uten å tømme skjemaet
      setSuccessMessage('Nytt prosjekt har blitt lagt til!');
      setErrorMessage('');
      console.log('Nytt prosjekt opprettet med id:', response.data.project.id);
    } catch (error) {
      console.error('Feil under opprettelse av prosjekt:', error);
      setErrorMessage('Det oppstod en feil under opprettelsen av prosjektet.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="add-project-container">
      <h2>Legg til nytt prosjekt</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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
          <input
            type="file"
            name="image"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Kort beskrivelse</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Nøkkelord</label>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
          />
        </div>

        {formData.sections.map((section, index) => (
          <div key={index} className="form-group">
            <label>Underoverskrift</label>
            <input
              type="text"
              name="subtitle"
              value={section.subtitle}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <label>Tekst</label>
            <textarea
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
                -
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

        <div>
          <button type="submit">Last opp prosjekt</button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;

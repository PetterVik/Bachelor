// src/pages/AddProject.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/AddProject.css';

const AddProject = () => {
  const [fileName, setFileName] = useState('Bla gjennom datamaskinen her');

  const [formData, setFormData] = useState({
    title: '',
    image: null,
    description: '',
    keywords: [],
    subtitle: '',
    text: '',
    visibleOnWebsite: false,
    sections: [{ subtitle: '', text: '' }],
  });

  const predefinedKeywords = [
    'Grønn industri',
    'Solkraft',
    'Areal - og eiendomsutvikling',
    'LCA og klimagass',
    'Vindkraft',
    'Vann',
    'Industriarkitektur',
  ];

  const handleKeywordChange = (e) => {
    const selectedKeyword = e.target.value;
    if (!formData.keywords.includes(selectedKeyword) && formData.keywords.length < 5) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, selectedKeyword],
      });
      e.target.value = '';
    }
  };

  const handleCustomKeywordChange = (e) => {
    const customKeyword = e.target.value;
    if (
      customKeyword &&
      !formData.keywords.includes(customKeyword) &&
      formData.keywords.length < 5
    ) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, customKeyword],
      });
    }
  };

  const removeKeyword = (keyword) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((kw) => kw !== keyword),
    });
  };

  const handleChange = (e, index) => {
    const { name, value, type, files } = e.target;

    if (name === 'image' && type === 'file') {
      const file = files?.[0];
      if (file) {
        setFileName(file.name);
        setFormData({
          ...formData,
          image: file,
        });
      } else {
        setFileName('Bla gjennom datamaskinen her');
        setFormData({
          ...formData,
          image: null,
        });
      }
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

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { subtitle: '', text: '' }],
    });
  };

  const removeSection = (index) => {
    const updatedSections = formData.sections.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      sections: updatedSections,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // TODO: Erstatt med faktisk innsending til API
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
              {fileName}
            </label>
            <input
              id="file-input"
              type="file"
              name="image"
              onChange={handleChange}
              style={{ display: 'none' }}
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
            <select
              onChange={handleKeywordChange}
              disabled={formData.keywords.length >= 5}
              defaultValue=""
            >
              <option value="" disabled>
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

          {formData.sections.map((section, index) => (
            <div key={index} className="form-group">
              <label>Underoverskrift</label>
              <select
                name="subtitle"
                value={section.subtitle}
                onChange={(e) => handleChange(e, index)}
                required
              >
                <option value="" disabled>
                  Velg underoverskrift
                </option>
                <option value="Intro">Intro</option>
                <option value="Oppdrag">Oppdrag</option>
                <option value="Løsning">Løsning</option>
                <option value="Resultat">Resultat</option>
              </select>

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
                  x
                </button>
              )}
            </div>
          ))}

          <button type="button" className="add-section-button" onClick={addSection}>
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
            <button type="submit" className="submit">
              Last opp prosjekt
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProject;

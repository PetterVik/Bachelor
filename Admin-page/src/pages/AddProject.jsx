//importerer nødvendige biblioteker og komponenter
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/AddProject.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
    const navigate = useNavigate(); 
    const [fileName, setFileName] = useState('Bla gjennom datamaskinen her');

    const [formData, setFormData] = useState({  //holder på feltene i skjemaet
      title: '',
      description: '',
      keywords: [], 
      subtitle: '',
      text: '',
      visibleOnWebsite: 'yes', 
      sections: [{ subtitle: '', text: '' }],
      image: null,
    });
  
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
        if (
            selectedKeyword &&
            !formData.keywords.includes(selectedKeyword) &&
            formData.keywords.length < 5
        ) {
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

    // Fjerne et nøkkelord
    const removeKeyword = (keyword) => {
        setFormData({
            ...formData,
            keywords: formData.keywords.filter((kw) => kw !== keyword),
        });
    };
  
    // Handtere input endringer
    const handleChange = (e, index) => {
        const { name, value, type, files } = e.target;

        if (name === 'description') {
            // Splitte teksten i ord og sjekke lengden
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount <= 30) {
                setFormData({
                    ...formData,
                    [name]: value,
                });
            } else {
                alert("Du kan ikke skrive mer enn 30 ord.");
            }
        } else if (name === 'image' && type === 'file') {
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

    // Legge til ny seksjon
    const addSection = () => {
        setFormData({
            ...formData,
            sections: [...formData.sections, { subtitle: '', text: '' }],
        });
    };

    // Fjerne seksjon
    const removeSection = (index) => {
        const updatedSections = formData.sections.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            sections: updatedSections,
        });
    };

    // Håndtere innsending av skjema
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Skal sende dette skjemaet:', formData);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            // keywords er et array → lag en kommaseparert streng
            data.append('keywords', formData.keywords.join(','));
            // Convert 'yes'/'no' til 'true'/'false' hvis serveren forventer boolean
            const isVisible = formData.visibleOnWebsite === 'yes' ? 'true' : 'false';
            data.append('visibleOnWebsite', isVisible);

            if (formData.image) {
                data.append('image', formData.image);
            }
            // Sections sendes som en JSON-streng
            data.append('sections', JSON.stringify(formData.sections));

            const response = await axios.post('http://localhost:5123/api/projects', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Hele responsen:', response);
            console.log('response.data:', response.data);
            console.log('Nytt prosjekt opprettet med id:', response.data.id || response.data.Id);

            alert('Prosjekt opprettet!');
        } catch (error) {
            console.error('Feil under opprettelse av prosjekt:', error);
            alert('Det oppstod en feil under opprettelsen av prosjektet.');
        }
    };

    return (
        <>
            <Navbar />

            <div className="back-button-container">
                <button onClick={() => navigate('/dashboard')} className="tilbake-knapp">
                Tilbake til Dashboard
                </button>
            </div>

            
            <div className="add-project-container">  {/* Container for å legge til prosjekt */}
                <h2>Legg til nytt prosjekt</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Prosjekttittel</label>
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
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
  
                    {/* Nøkkelord */}
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
                    <div>
                        {Array.isArray(formData.keywords) && formData.keywords.length > 0 && (
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
                                <option value="" disabled>
                                    Velg underoverskrift
                                </option>   {/* Rullegardinmeny for underoverskrifter*/}
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
                                <input  //radioknapp for synlig eller ikke på nettsiden
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

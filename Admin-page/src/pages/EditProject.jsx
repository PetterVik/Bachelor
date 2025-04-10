// src/pages/EditProject.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/AddProject.css';
import axios from 'axios';

const EditProject = () => {
    const [fileName, setFileName] = useState('Bla gjennom datamaskinen her');
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        keywords: [],
        subtitle: '',
        text: '',
        visibleOnWebsite: 'no',
        sections: [{ subtitle: '', text: '' }],
        image: null,
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

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:5123/api/projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Feil ved henting av prosjekter:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectSelect = async (e) => {
        const projectId = e.target.value;
        const selected = projects.find(project => project.id.toString() === projectId.toString());

        if (!selected) {
            console.error("Fant ikke prosjekt med ID:", projectId);
            return;
        }

        // Parse longDescription (sections) like in ProjectDetail.jsx
        let sections = [];
        try {
            if (selected.longDescription) {
                sections = JSON.parse(selected.longDescription);
            }
        } catch (err) {
            console.error("Feil ved parsing av longDescription:", err);
        }

        setSelectedProject(selected);

        setFormData({
            title: selected.title || '',
            description: selected.description || '',
            keywords: selected.keywords ? selected.keywords.split(',') : [],
            visibleOnWebsite: selected.visibleOnWebsite === 'true' ? 'yes' : 'no',
            sections: sections.length > 0 ? sections : [{ subtitle: '', text: '' }],
            image: null,
        });
    };

    const handleKeywordChange = (e) => {
        const selectedKeyword = e.target.value;
        if (selectedKeyword && !formData.keywords.includes(selectedKeyword) && formData.keywords.length < 5) {
            setFormData({
                ...formData,
                keywords: [...formData.keywords, selectedKeyword],
            });
            e.target.value = '';
        }
    };

    const handleCustomKeywordChange = (e) => {
        const customKeyword = e.target.value;
        if (customKeyword && !formData.keywords.includes(customKeyword) && formData.keywords.length < 5) {
            setFormData({
                ...formData,
                keywords: [...formData.keywords, customKeyword],
            });
        }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('keywords', formData.keywords.join(','));
            data.append('visibleOnWebsite', formData.visibleOnWebsite === 'yes' ? 'true' : 'false');
            if (formData.image) {
                data.append('image', formData.image);
            }
            data.append('sections', JSON.stringify(formData.sections));

            const response = await axios.post(
                `http://localhost:5123/api/projects/${selectedProject.id}`, data, { 
                headers: { 
                    'Content-Type': 'multipart/form-data', 
                }, 
            });

            alert('Prosjekt oppdatert!');
        } catch (error) {
            console.error('Feil under oppdatering av prosjekt:', error);
            alert('Det oppstod en feil under oppdateringen av prosjektet.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="add-project-container">
                <h2>Rediger prosjekt</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Velg prosjekt</label>
                        <select onChange={handleProjectSelect} required>
                            <option value="" disabled>Velg et prosjekt</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedProject && (
                        <>
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
                                <label>Last opp nytt bilde</label>
                                <label htmlFor="file-input" className="custom-file-upload">
                                    {fileName === 'Bla gjennom datamaskinen her' ? 'Hvis du ønsker å ENDRE bildet, last opp nytt her' : fileName}
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
                                    <option value="" disabled>Velg nøkkelord</option>
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
                                        <strong>Nåværende nøkkelord:</strong>
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
                                <button type="submit" className="submit">Oppdater prosjekt</button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </>
    );
};

export default EditProject;

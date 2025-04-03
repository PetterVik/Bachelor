// src/pages/AddProject.jsx
import React, { useState } from 'react';
import '../styles/AddProject.css';

const AddProject = () => {
    const [formData, setFormData] = useState({
      title: '',
      startDate: '',
      endDate: '',
      description: '',
      keywords: '',
      subtitle: '',
      text: '',
      visibleOnWebsite: false,
      sections: [{ subtitle: '', text: '' }], // State for multiple sections
    });
  
  
   
  // Handle input changes
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'subtitle' || name === 'text') {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the data to the API (to be added later)
        console.log(formData);
    };
  
  
    return (
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

            {/* Remove button for the section */}
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


        {/* Button to add more sections */}
        <button
          type="button"
          className="add-section-button"
          onClick={addSection}
        >
          + Legg til et nytt avsnitt
        </button>


        {/* Submit button */}
        <div>
          <button type="submit">Last opp prosjekt</button>
        </div>
      </form>
    </div>
  );
};

export default AddProject; 
         
 
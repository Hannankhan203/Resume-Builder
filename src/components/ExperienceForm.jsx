import React from 'react';
import { useResume } from '../contexts/ResumeContext';

export const ExperienceForm = () => {
  const { activeResume, updateResume } = useResume();

  const handleAddExperience = () => {
    updateResume(activeResume.id, {
      experience: [
        ...activeResume.experience,
        {
          id: Date.now().toString(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    });
  };

  const handleRemoveExperience = (id) => {
    updateResume(activeResume.id, {
      experience: activeResume.experience.filter(exp => exp.id !== id)
    });
  };

  const handleExperienceChange = (id, e) => {
    const { name, value } = e.target;
    updateResume(activeResume.id, {
      experience: activeResume.experience.map(exp =>
        exp.id === id ? { ...exp, [name]: value } : exp
      )
    });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>Experience</h2>
        <button onClick={handleAddExperience}>Add Experience</button>
      </div>
      {activeResume.experience.map(exp => (
        <div key={exp.id} className="experience-entry">
          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              name="company"
              value={exp.company || ''}
              onChange={(e) => handleExperienceChange(exp.id, e)}
            />
          </div>
          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={exp.position || ''}
              onChange={(e) => handleExperienceChange(exp.id, e)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="text"
                name="startDate"
                value={exp.startDate || ''}
                onChange={(e) => handleExperienceChange(exp.id, e)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="text"
                name="endDate"
                value={exp.endDate || ''}
                onChange={(e) => handleExperienceChange(exp.id, e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={exp.description || ''}
              onChange={(e) => handleExperienceChange(exp.id, e)}
            />
          </div>
          <button
            className="remove-btn"
            onClick={() => handleRemoveExperience(exp.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};
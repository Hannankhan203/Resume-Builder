import React, { useState } from 'react';
import { useResume } from '../contexts/ResumeContext';

export const SkillsForm = () => {
  const { activeResume, updateResume } = useResume();
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !activeResume.skills.includes(newSkill.trim())) {
      updateResume(activeResume.id, {
        skills: [...activeResume.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    updateResume(activeResume.id, {
      skills: activeResume.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  return (
    <div className="form-section">
      <h2>Skills</h2>
      <div className="form-group">
        <label>Add Skill</label>
        <div className="skill-input-container">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type skill and press Enter"
          />
          <button onClick={handleAddSkill}>Add</button>
        </div>
      </div>
      <div className="skills-list">
        {activeResume.skills.map((skill, index) => (
          <div key={index} className="skill-tag">
            {skill}
            <button onClick={() => handleRemoveSkill(skill)} className="remove-skill">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
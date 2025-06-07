import React from 'react';
import { useResume } from '../contexts/ResumeContext';

export const SummaryForm = () => {
  const { activeResume, updateResume } = useResume();

  const handleChange = (e) => {
    updateResume(activeResume.id, {
      summary: e.target.value
    });
  };

  return (
    <div className="form-section">
      <h2>Professional Summary</h2>
      <div className="form-group">
        <textarea
          value={activeResume.summary || ''}
          onChange={handleChange}
          placeholder="Briefly describe your professional background and skills"
        />
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { useResume } from '../contexts/ResumeContext';

export const ResumeManager = () => {
  const {
    resumes,
    activeResumeId,
    activeResume,
    setActiveResumeId,
    createNewResume,
    updateResume,
    deleteResume,
    duplicateResume
  } = useResume();
  const [newName, setNewName] = useState('');

  const handleSaveName = () => {
    if (newName.trim()) {
      updateResume(activeResumeId, { name: newName.trim() });
      setNewName('');
    }
  };

  return (
    <div className="resume-manager">
      <div className="manager-header">
        <h2>My Resumes</h2>
        <button onClick={createNewResume}>New Resume</button>
      </div>
      <div className="resume-list">
        {Object.values(resumes).map(resume => (
          <div
            key={resume.id}
            className={`resume-item ${activeResumeId === resume.id ? 'active' : ''}`}
            onClick={() => setActiveResumeId(resume.id)}
          >
            <span>{resume.name}</span>
            <div className="resume-item-actions">
              <button
                className="duplicate-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  const newId = duplicateResume(resume.id);
                  setActiveResumeId(newId);
                }}
              >
                Duplicate
              </button>
              {resume.id !== 'default' && (
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteResume(resume.id);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="save-section">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
          placeholder="Rename current resume"
        />
        <button onClick={handleSaveName}>Save</button>
      </div>
    </div>
  );
};
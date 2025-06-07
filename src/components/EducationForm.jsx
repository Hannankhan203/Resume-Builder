import React from "react";
import { useResume } from "../contexts/ResumeContext";

export const EducationForm = () => {
  const { activeResume, updateResume } = useResume();

  const handleAddEducation = () => {
    updateResume(activeResume.id, {
      education: [
        ...activeResume.education,
        {
          id: Date.now().toString(),
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          gpa: "",
          description: "",
        },
      ],
    });
  };

  const handleRemoveEducation = (id) => {
    updateResume(activeResume.id, {
      education: activeResume.education.filter((edu) => edu.id !== id),
    });
  };

  const handleEducationChange = (id, e) => {
    const { name, value } = e.target;
    updateResume(activeResume.id, {
      education: activeResume.education.map((edu) =>
        edu.id === id ? { ...edu, [name]: value } : edu
      ),
    });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>Education</h2>
        <button onClick={handleAddEducation}>Add Education</button>
      </div>
      {activeResume.education.map((edu) => (
        <div key={edu.id} className="education-entry">
          <div className="form-group">
            <label>Institution</label>
            <input
              type="text"
              name="institution"
              value={edu.institution || ""}
              onChange={(e) => handleEducationChange(edu.id, e)}
            />
          </div>
          <div className="form-group">
            <label>Degree</label>
            <input
              type="text"
              name="degree"
              value={edu.degree || ""}
              onChange={(e) => handleEducationChange(edu.id, e)}
            />
          </div>
          <div className="form-group">
            <label>Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={edu.fieldOfStudy || ""}
              onChange={(e) => handleEducationChange(edu.id, e)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="text"
                name="startDate"
                value={edu.startDate || ""}
                onChange={(e) => handleEducationChange(edu.id, e)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="text"
                name="endDate"
                value={edu.endDate || ""}
                onChange={(e) => handleEducationChange(edu.id, e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>GPA</label>
            <input
              type="text"
              name="gpa"
              value={edu.gpa || ""}
              onChange={(e) => handleEducationChange(edu.id, e)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={edu.description || ""}
              onChange={(e) => handleEducationChange(edu.id, e)}
            />
          </div>
          <button
            className="remove-btn"
            onClick={() => handleRemoveEducation(edu.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

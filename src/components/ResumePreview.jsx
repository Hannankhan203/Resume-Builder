import React from "react";
import { useResume } from "../contexts/ResumeContext";
import { TemplateTwo } from "../templates/TemplateTwo";
import PDFExportButton from "./PDFExportButton";

export const ResumePreview = () => {
  const { activeResume } = useResume();

  const renderTemplate = () => {
    switch (activeResume.template) {
      case "template2":
        return <TemplateTwo />;
      default:
        return (
          <div className="resume-template template1">
            <header className="resume-header">
              <h1>{activeResume.personalInfo.fullName}</h1>
              <div className="contact-info">
                {activeResume.personalInfo.email && (
                  <span>{activeResume.personalInfo.email}</span>
                )}
                {activeResume.personalInfo.phone && (
                  <span>{activeResume.personalInfo.phone}</span>
                )}
                {activeResume.personalInfo.address && (
                  <span>{activeResume.personalInfo.address}</span>
                )}
                {activeResume.personalInfo.linkedIn && (
                  <span>{activeResume.personalInfo.linkedIn}</span>
                )}
                {activeResume.personalInfo.github && (
                  <span>{activeResume.personalInfo.github}</span>
                )}
              </div>
            </header>

            {activeResume.summary && (
              <section className="resume-section">
                <h2>Summary</h2>
                <p>{activeResume.summary}</p>
              </section>
            )}

            {activeResume.experience.length > 0 && (
              <section className="resume-section">
                <h2>Experience</h2>
                {activeResume.experience.map((exp) => (
                  <div key={exp.id} className="section-item">
                    <div className="section-header">
                      <h3>{exp.company}</h3>
                      <div className="date-range">
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>
                    <div className="section-subheader">{exp.position}</div>
                    {exp.description && (
                      <p className="section-content">{exp.description}</p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {activeResume.education.length > 0 && (
              <section className="resume-section">
                <h2>Education</h2>
                {activeResume.education.map((edu) => (
                  <div key={edu.id} className="section-item">
                    <div className="section-header">
                      <h3>{edu.institution}</h3>
                      <div className="date-range">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                    <div className="section-subheader">
                      {edu.degree} in {edu.fieldOfStudy}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {activeResume.skills.length > 0 && (
              <section className="resume-section">
                <h2>Skills</h2>
                <div className="skills-list">
                  {activeResume.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        );
    }
  };

  return (
    <div className="resume-preview-container">
      <div className="preview-controls">
        <PDFExportButton />
      </div>
      <div id="resume-preview" className="resume-preview">
        {renderTemplate()}
      </div>
    </div>
  );
};

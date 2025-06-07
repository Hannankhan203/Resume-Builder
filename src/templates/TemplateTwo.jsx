import React from "react";
import { useResume } from "../contexts/ResumeContext";

export const TemplateTwo = () => {
  const { activeResume } = useResume();

  return (
    <div
      className="resume-template template2"
      style={{
        width: "595px",
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: "20px",
        margin: "0 auto",
      }}
    >
      <header className="resume-header">
        <div className="header-left">
          <h1>{activeResume.personalInfo.fullName}</h1>
          <div className="contact-info">
            {activeResume.personalInfo.email && (
              <span>{activeResume.personalInfo.email}</span>
            )}
            {activeResume.personalInfo.phone && (
              <span>{activeResume.personalInfo.phone}</span>
            )}
          </div>
        </div>
        <div className="header-right">
          {activeResume.personalInfo.address && (
            <span>{activeResume.personalInfo.address}</span>
          )}
          {activeResume.personalInfo.linkedIn && (
            <span style={{cursor: 'pointer'}}>{activeResume.personalInfo.linkedIn}</span>
          )}
          {activeResume.personalInfo.github && (
            <span style={{cursor: 'pointer'}}>{activeResume.personalInfo.github}</span>
          )}
          {activeResume.personalInfo.portfolio && (
            <span style={{cursor: 'pointer'}}>{activeResume.personalInfo.portfolio}</span>
          )}
        </div>
      </header>

      {activeResume.summary && (
        <section className="resume-section">
          <h2>PROFESSIONAL SUMMARY</h2>
          <p>{activeResume.summary}</p>
        </section>
      )}

      {activeResume.experience.length > 0 && (
        <section className="resume-section">
          <h2>WORK EXPERIENCE</h2>
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
          <h2>EDUCATION</h2>
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
          <h2>SKILLS</h2>
          <div className="skills-list">
            {activeResume.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {activeResume.projects.length > 0 && (
        <section className="resume-section">
          <h2>PROJECTS</h2>
          {activeResume.projects.map((project) => (
            <div key={project.id} className="section-item">
              <div className="section-header">
                <h3>{project.name}</h3>
              </div>
              {project.description && (
                <p className="section-content">{project.description}</p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="skills-list">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="skill-tag">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

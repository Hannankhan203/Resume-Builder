import React from "react";
import { useResume } from "../contexts/ResumeContext";

export const TemplateTwo = () => {
  const { activeResume } = useResume();

  return (
    <div
      className="resume-template template2"
      style={{
        width: "800px",
        backgroundColor: "#fff",
        color: "#000",
        padding: "40px",
        margin: "0 auto",
        display: "flex",
        gap: "40px",
        fontSize: "11pt",
        lineHeight: 1.4,
      }}
    >
      {/* LEFT COLUMN */}
      <div style={{ flex: 2, minWidth: 0 }}>
        <h1 style={{ fontSize: "28px", margin: 0 }}>{activeResume.personalInfo.fullName}</h1>
        {activeResume.personalInfo.title && (
          <div style={{ fontSize: "13px", marginBottom: 10 }}>{activeResume.personalInfo.title}</div>
        )}
        {activeResume.summary && (
          <section className="resume-section">
            <h2 style={{ fontSize: "18px", color: "#2c3e50", borderBottom: "2px solid #3498db", paddingBottom: 5, marginBottom: 15 }}>PROFILE</h2>
            <p style={{ margin: 0 }}>{activeResume.summary}</p>
          </section>
        )}
        {activeResume.education.length > 0 && (
          <section className="resume-section">
            <h2 style={{ fontSize: "18px", color: "#2c3e50", borderBottom: "2px solid #3498db", paddingBottom: 5, marginBottom: 15 }}>EDUCATION</h2>
            {activeResume.education.map((edu) => (
              <div key={edu.id} className="section-item" style={{ marginBottom: 8 }}>
                <div className="section-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <h3 style={{ margin: 0, fontSize: "16px" }}>{edu.institution}</h3>
                  <div className="date-range" style={{ fontStyle: "italic", color: "#555" }}>{edu.startDate} - {edu.endDate}</div>
                </div>
                <div className="section-subheader" style={{ fontWeight: "bold", color: "#3498db", marginBottom: 2 }}>
                  {edu.degree} - {edu.fieldOfStudy}
                </div>
              </div>
            ))}
          </section>
        )}
        {activeResume.experience.length > 0 && (
          <section className="resume-section">
            <h2 style={{ fontSize: "18px", color: "#2c3e50", borderBottom: "2px solid #3498db", paddingBottom: 5, marginBottom: 15 }}>EXPERIENCE</h2>
            {activeResume.experience.map((exp) => (
              <div key={exp.id} className="section-item" style={{ marginBottom: 8 }}>
                <div className="section-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <h3 style={{ margin: 0, fontSize: "16px" }}>{exp.company}</h3>
                  <div className="date-range" style={{ fontStyle: "italic", color: "#555" }}>{exp.startDate} - {exp.endDate}</div>
                </div>
                <div className="section-subheader" style={{ fontWeight: "bold", color: "#3498db", marginBottom: 2 }}>{exp.position}</div>
                {exp.description && (
                  <p className="section-content" style={{ margin: 0 }}>{exp.description}</p>
                )}
              </div>
            ))}
          </section>
        )}
        {activeResume.projects.length > 0 && (
          <section className="resume-section">
            <h2 style={{ fontSize: "18px", color: "#2c3e50", borderBottom: "2px solid #3498db", paddingBottom: 5, marginBottom: 15 }}>PROJECTS</h2>
            {activeResume.projects.map((project) => (
              <div key={project.id} className="section-item" style={{ marginBottom: 8 }}>
                <div className="section-header" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 2 }}>
                  <h3 style={{ margin: 0, fontSize: "16px" }}>{project.name}</h3>
                </div>
                {project.description && (
                  <p className="section-content" style={{ margin: 0 }}>{project.description}</p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="skills-list" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="skill-tag" style={{ background: "#e0e0e0", padding: "5px 10px", borderRadius: 15, fontSize: 13 }}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
      {/* RIGHT COLUMN */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: 15 }}>
          {activeResume.personalInfo.address && (
            <div>{activeResume.personalInfo.address}</div>
          )}
          {activeResume.personalInfo.city && (
            <div>{activeResume.personalInfo.city}</div>
          )}
        </div>
        <div style={{ marginBottom: 15 }}>
          {activeResume.personalInfo.phone && (
            <div style={{ fontWeight: "bold" }}>{activeResume.personalInfo.phone}</div>
          )}
          {activeResume.personalInfo.email && (
            <div style={{ fontWeight: "bold" }}>{activeResume.personalInfo.email}</div>
          )}
          {activeResume.personalInfo.portfolio && (
            <div><a href={activeResume.personalInfo.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a></div>
          )}
          {activeResume.personalInfo.github && (
            <div><a href={activeResume.personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a></div>
          )}
          {activeResume.personalInfo.linkedIn && (
            <div><a href={activeResume.personalInfo.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
          )}
        </div>
        {activeResume.skills.length > 0 && (
          <section className="resume-section">
            <h2 style={{ fontSize: "18px", color: "#2c3e50", borderBottom: "2px solid #3498db", paddingBottom: 5, marginBottom: 15 }}>SKILLS</h2>
            <div className="skills-list" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {activeResume.skills.map((skill, index) => (
                <span key={index} className="skill-tag" style={{ background: "#e0e0e0", padding: "5px 10px", borderRadius: 15, fontSize: 13 }}>{skill}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

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
          <div
            className="resume-template template1"
            style={{ width: "800px", backgroundColor: "#fff", color: "#000", fontFamily: 'Arial, sans-serif', padding: 0 }}
          >
            {/* Personal Info Section */}
            {(activeResume.personalInfo.fullName || activeResume.personalInfo.email || activeResume.personalInfo.phone || activeResume.personalInfo.address || activeResume.personalInfo.linkedIn || activeResume.personalInfo.github || activeResume.personalInfo.portfolio) && (
              <section className="resume-section" style={{ marginBottom: 10 }}>
                {activeResume.personalInfo.fullName && (
                  <div style={{ fontWeight: 'bold', color: '#0000ee', fontSize: 24, marginBottom: 0 }}>{activeResume.personalInfo.fullName}</div>
                )}
                <div style={{ fontSize: 15, marginBottom: 0 }}>
                  {activeResume.personalInfo.email && <span style={{ marginRight: 15 }}>{activeResume.personalInfo.email}</span>}
                  {activeResume.personalInfo.phone && <span style={{ marginRight: 15 }}>{activeResume.personalInfo.phone}</span>}
                  {activeResume.personalInfo.address && <span style={{ marginRight: 15 }}>{activeResume.personalInfo.address}</span>}
                </div>
                <div style={{ fontSize: 15, marginTop: 2 }}>
                {activeResume.personalInfo.linkedIn && (
                    <a href={activeResume.personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: '#0000ee', marginRight: 15 }}>LinkedIn</a>
                )}
                {activeResume.personalInfo.github && (
                    <a href={activeResume.personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: '#0000ee', marginRight: 15 }}>GitHub</a>
                )}
                {activeResume.personalInfo.portfolio && (
                    <a href={activeResume.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: '#0000ee', marginRight: 15 }}>Portfolio</a>
                )}
              </div>
              </section>
            )}

            {/* Education Section */}
            {activeResume.education.length > 0 && (
              <section className="resume-section" style={{ marginBottom: 0 }}>
                {activeResume.education.map((edu, idx) => (
                  <div key={edu.id || idx} style={{ marginBottom: idx === activeResume.education.length - 1 ? 0 : 10 }}>
                    <div style={{ fontWeight: 'bold', color: '#0000ee', fontSize: 22, marginBottom: 0 }}>{edu.institution}</div>
                    <div style={{ fontSize: 16, marginBottom: 0 }}>{edu.startDate} - {edu.endDate}</div>
                    <div style={{ fontStyle: 'italic', fontSize: 16, marginBottom: 0 }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</div>
                  </div>
                ))}
              </section>
            )}

            {/* Training Section (if any) */}
            {activeResume.experience.filter(exp => exp.type === 'training').length > 0 && (
              <section className="resume-section" style={{ marginBottom: 0 }}>
                {activeResume.experience.filter(exp => exp.type === 'training').map((exp, idx) => (
                  <div key={exp.id || idx} style={{ marginBottom: idx === activeResume.experience.length - 1 ? 0 : 10 }}>
                    <div style={{ fontWeight: 'bold', color: '#0000ee', fontSize: 22, marginBottom: 0 }}>{exp.company}</div>
                    <div style={{ fontSize: 16, marginBottom: 0 }}>{exp.startDate} - {exp.endDate}</div>
                    <div style={{ fontStyle: 'italic', fontSize: 16, marginBottom: 0 }}>{exp.position}</div>
                  </div>
                ))}
              </section>
            )}

            {/* Skills Section */}
            {activeResume.skills.length > 0 && (
              <section className="resume-section" style={{ marginBottom: 0 }}>
                <div style={{ fontWeight: 'bold', color: '#0000ee', fontSize: 22, marginBottom: 0 }}>Skills</div>
                <div style={{ fontSize: 16, marginTop: 2, marginBottom: 10 }}>
                  {activeResume.skills.join(', ')}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {activeResume.projects.length > 0 && (
              <section className="resume-section" style={{ marginBottom: 0 }}>
                <div style={{ fontWeight: 'bold', color: '#0000ee', fontSize: 22, marginBottom: 0 }}>Projects</div>
                {activeResume.projects.map((project, idx) => (
                  <div key={project.id || idx} style={{ marginBottom: 10 }}>
                    <div style={{ fontWeight: 'bold', color: '#0000ee', fontSize: 18 }}>{project.name}</div>
                    {project.technologies && project.technologies.length > 0 && (
                      <div style={{ fontSize: 15, marginBottom: 0 }}>Tech Used: {project.technologies.join(', ')}</div>
                    )}
                    {project.description && (
                      <div style={{ fontSize: 15, marginBottom: 0 }}>{project.description}</div>
                    )}
                    {project.link && (
                      <div style={{ fontSize: 15, color: '#000', textDecoration: 'underline', marginBottom: 0 }}>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: '#0000ee' }}>{project.link}</a>
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>
        );
    }
  };

  return (
    <div
      className="resume-preview-container"
      style={{ backgroundColor: "#f5f5f5", padding: "20px" }}
    >
      <div className="preview-controls">
        <PDFExportButton />
      </div>
      <div
        id="resume-preview"
        className="resume-preview"
        style={{
          backgroundColor: "white",
          color: "black",
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

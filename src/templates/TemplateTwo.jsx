import React from "react";
import { useResume } from "../contexts/ResumeContext";

export const TemplateTwo = () => {
  const { activeResume } = useResume();

  return (
    <div
      className="resume-template template2"
      style={{
        width: "900px",
        backgroundColor: "#fff",
        color: "#000",
        padding: "40px 40px 40px 40px",
        margin: "0 auto",
        display: "flex",
        gap: "40px",
        fontSize: "15px",
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.3,
      }}
    >
      {/* LEFT COLUMN */}
      <div style={{ flex: 2, minWidth: 0 }}>
        {/* Name */}
        {activeResume.personalInfo.fullName && (
          <div style={{ fontWeight: 'bold', color: '#000', fontSize: 38, marginBottom: 10 }}>{activeResume.personalInfo.fullName}</div>
        )}
        {/* Profile/Summary */}
        {activeResume.summary && (
          <div style={{ marginBottom: 25 }}>
            <div style={{ fontWeight: 'bold', color: '#1546a0', fontSize: 18, letterSpacing: 1, marginBottom: 0 }}>PROFILE</div>
            <div style={{ marginTop: 0, whiteSpace: 'pre-line' }}>{activeResume.summary}</div>
          </div>
        )}
        {/* Education */}
        {activeResume.education.length > 0 && (
          <div style={{ marginBottom: 25 }}>
            <div style={{ fontWeight: 'bold', color: '#1546a0', fontSize: 18, letterSpacing: 1, marginBottom: 0 }}>EDUCATION</div>
            {activeResume.education.map((edu, idx) => (
              <div key={edu.id || idx} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 'bold', color: '#000', fontSize: 19 }}>{edu.institution}</div>
                <div style={{ fontSize: 15, marginBottom: 0 }}>{edu.startDate} - {edu.endDate}</div>
                <div style={{ fontStyle: 'italic', fontSize: 15, marginBottom: 0 }}>{edu.degree}{edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ''}</div>
              </div>
            ))}
          </div>
        )}
        {/* Experience */}
        {activeResume.experience.length > 0 && (
          <div style={{ marginBottom: 25 }}>
            <div style={{ fontWeight: 'bold', color: '#1546a0', fontSize: 18, letterSpacing: 1, marginBottom: 0 }}>EXPERIENCE</div>
            {activeResume.experience.map((exp, idx) => (
              <div key={exp.id || idx} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 'bold', color: '#000', fontSize: 19 }}>{exp.company}</div>
                <div style={{ fontSize: 15, marginBottom: 0 }}>{exp.startDate} - {exp.endDate}</div>
                <div style={{ fontStyle: 'italic', fontSize: 15, marginBottom: 0 }}>{exp.position}</div>
                {exp.description && (
                  <div style={{ fontSize: 15, marginBottom: 0 }}>{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Projects */}
        {activeResume.projects.length > 0 && (
          <div style={{ marginBottom: 25 }}>
            <div style={{ fontWeight: 'bold', color: '#1546a0', fontSize: 18, letterSpacing: 1, marginBottom: 0 }}>PROJECTS</div>
            {activeResume.projects.map((project, idx) => (
              <div key={project.id || idx} style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 'bold', color: '#000', fontSize: 17 }}>{project.name}</div>
                {project.technologies && project.technologies.length > 0 && (
                  <div style={{ fontSize: 15, marginBottom: 0 }}>Tech Used - {project.technologies.join(', ')}</div>
                )}
                {project.description && (
                  <div style={{ fontSize: 15, marginBottom: 0 }}>{project.description}</div>
                )}
                {project.link && (
                  <div style={{ fontSize: 15, marginTop: 2 }}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: '#1546a0', textDecoration: 'underline' }}>{project.link}</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* RIGHT COLUMN */}
      <div style={{ flex: 1, minWidth: 0, marginTop: 10 }}>
        {/* Address */}
        {(activeResume.personalInfo.address || activeResume.personalInfo.city) && (
          <div style={{ fontSize: 15, marginBottom: 10 }}>
            {activeResume.personalInfo.address && <div>{activeResume.personalInfo.address}</div>}
            {activeResume.personalInfo.city && <div>{activeResume.personalInfo.city}</div>}
          </div>
        )}
        {/* Contact Info */}
        {(activeResume.personalInfo.phone || activeResume.personalInfo.email) && (
          <div style={{ marginBottom: 10 }}>
            {activeResume.personalInfo.phone && <div style={{ fontWeight: 'bold', color: '#000' }}>{activeResume.personalInfo.phone}</div>}
            {activeResume.personalInfo.email && <div style={{ fontWeight: 'bold', color: '#000' }}>{activeResume.personalInfo.email}</div>}
          </div>
        )}
        {/* Links */}
        {(activeResume.personalInfo.portfolio || activeResume.personalInfo.github || activeResume.personalInfo.linkedIn) && (
          <div style={{ marginBottom: 10 }}>
            {activeResume.personalInfo.portfolio && (
              <div><a href={activeResume.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: '#1546a0', fontWeight: 'bold', textDecoration: 'underline', display: 'block' }}>Portfolio</a></div>
            )}
            {activeResume.personalInfo.github && (
              <div><a href={activeResume.personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: '#1546a0', fontWeight: 'bold', textDecoration: 'underline', display: 'block' }}>GitHub</a></div>
            )}
            {activeResume.personalInfo.linkedIn && (
              <div><a href={activeResume.personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: '#1546a0', fontWeight: 'bold', textDecoration: 'underline', display: 'block' }}>LinkedIn</a></div>
            )}
          </div>
        )}
        {/* Skills */}
        {activeResume.skills.length > 0 && (
          <div style={{ marginTop: 30 }}>
            <div style={{ fontWeight: 'bold', color: '#1546a0', fontSize: 18, letterSpacing: 1, marginBottom: 0 }}>SKILLS</div>
            <div style={{ fontSize: 15, marginTop: 5, whiteSpace: 'pre-line' }}>
              {activeResume.skills.map((skill, idx) => (
                <div key={idx}>{skill}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { useResume } from "../contexts/ResumeContext";

export const ProjectsForm = () => {
  const { activeResume, updateResume } = useResume();
  const [newTech, setNewTech] = useState("");

  const handleAddProject = () => {
    updateResume(activeResume.id, {
      projects: [
        ...activeResume.projects,
        {
          id: Date.now().toString(),
          name: "",
          description: "",
          technologies: [],
        },
      ],
    });
  };

  const handleRemoveProject = (id) => {
    updateResume(activeResume.id, {
      projects: activeResume.projects.filter((project) => project.id !== id),
    });
  };

  const handleProjectChange = (id, e) => {
    const { name, value } = e.target;
    updateResume(activeResume.id, {
      projects: activeResume.projects.map((project) =>
        project.id === id ? { ...project, [name]: value } : project
      ),
    });
  };

  const handleAddTech = (projectId) => {
    if (newTech.trim()) {
      updateResume(activeResume.id, {
        projects: activeResume.projects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                technologies: [...project.technologies, newTech.trim()],
              }
            : project
        ),
      });
      setNewTech("");
    }
  };

  const handleRemoveTech = (projectId, techToRemove) => {
    updateResume(activeResume.id, {
      projects: activeResume.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              technologies: project.technologies.filter(
                (tech) => tech !== techToRemove
              ),
            }
          : project
      ),
    });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>Projects</h2>
        <button onClick={handleAddProject}>Add Project</button>
      </div>
      {activeResume.projects.map((project) => (
        <div key={project.id} className="project-entry">
          <div className="form-group">
            <label>Project Name</label>
            <input
              type="text"
              name="name"
              value={project.name || ""}
              onChange={(e) => handleProjectChange(project.id, e)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={project.description || ""}
              onChange={(e) => handleProjectChange(project.id, e)}
            />
          </div>
          <div className="form-group">
            <label>Technologies</label>
            <div className="tech-input-container">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleAddTech(project.id)
                }
                placeholder="Add technology"
              />
              <button onClick={() => handleAddTech(project.id)}>Add</button>
            </div>
            <div className="tech-tags">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                  <button
                    onClick={() => handleRemoveTech(project.id, tech)}
                    className="remove-tech"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <button
            className="remove-btn"
            onClick={() => handleRemoveProject(project.id)}
          >
            Remove Project
          </button>
        </div>
      ))}
    </div>
  );
};

import React from "react";
import { useResume } from "../contexts/ResumeContext";

export const TemplateSelector = () => {
  const { activeResume, updateResume } = useResume();

  if (!activeResume) return null; // Add null check

  return (
    <div className="template-selector">
      <h2>Select Template</h2>
      <div className="template-options">
        <div
          className={`template-option ${
            activeResume.template === "template1" ? "active" : ""
          }`}
          onClick={() =>
            updateResume(activeResume.id, { template: "template1" })
          }
        >
          <div className="template-thumbnail template1-thumbnail"></div>
          <span>Classic</span>
        </div>
        <div
          className={`template-option ${
            activeResume.template === "template2" ? "active" : ""
          }`}
          onClick={() =>
            updateResume(activeResume.id, { template: "template2" })
          }
        >
          <div className="template-thumbnail template2-thumbnail"></div>
          <span>Modern</span>
        </div>
      </div>
    </div>
  );
};

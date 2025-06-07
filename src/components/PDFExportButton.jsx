import React from "react";
import { useResume } from "../contexts/ResumeContext";
import { exportToPDF } from "../utils/pdfExporter";

const PDFExportButton = () => {
  const { activeResume } = useResume();

  const handleExport = () => {
    exportToPDF("resume-preview", {
      ...activeResume.pdfSettings,
      fileName: activeResume.pdfSettings.fileName || activeResume.name,
      personalInfo: activeResume.personalInfo,
    });
  };

  return (
    <button onClick={handleExport} className="pdf-export-button">
      Export to PDF
    </button>
  );
};

export default PDFExportButton;

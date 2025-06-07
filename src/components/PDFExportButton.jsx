import React from "react";
import { useResume } from "../contexts/ResumeContext";
import { exportToPDFjsPDFOnly, exportToPDFClassic } from "../utils/pdfExporter";

const PDFExportButton = () => {
  const { activeResume } = useResume();

  const handleExport = () => {
    if (activeResume.template === "template2") {
      exportToPDFjsPDFOnly(activeResume);
    } else {
      exportToPDFClassic(activeResume);
    }
  };

  return (
    <>
      <button onClick={handleExport} className="pdf-export-button">
        Export to PDF
      </button>
    </>
  );
};

export default PDFExportButton;

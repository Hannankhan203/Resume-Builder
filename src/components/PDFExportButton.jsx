import React from "react";
import { useResume } from "../contexts/ResumeContext";
import { exportToPDFjsPDFOnly } from "../utils/pdfExporter";

const PDFExportButton = () => {
  const { activeResume } = useResume();

  return (
    <>
      <button onClick={() => exportToPDFjsPDFOnly(activeResume)} className="pdf-export-button">
        Export to PDF
      </button>
    </>
  );
};

export default PDFExportButton;

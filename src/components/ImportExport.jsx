import React, { useRef } from "react";
import { useResume } from "../contexts/ResumeContext";

export const ImportExport = () => {
  const { exportResume, importResume } = useResume();
  const fileInputRef = useRef(null);

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importResume(file);
    }
    e.target.value = null;
  };

  return (
    <div className="import-export">
      <button onClick={exportResume} className="export-btn">
        Export JSON
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        accept=".json"
        style={{ display: "none" }}
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="import-btn"
      >
        Import JSON
      </button>
    </div>
  );
};

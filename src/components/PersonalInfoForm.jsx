import React from "react";
import { useResume } from "../contexts/ResumeContext";

export const PersonalInfoForm = () => {
  const { activeResume, updateResume } = useResume();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateResume(activeResume.id, {
      personalInfo: {
        ...activeResume.personalInfo,
        [name]: value,
      },
    });
  };

  return (
    <div className="form-section">
      <h2>Personal Information</h2>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={activeResume.personalInfo.fullName || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={activeResume.personalInfo.email || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={activeResume.personalInfo.phone || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={activeResume.personalInfo.address || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>LinkedIn</label>
        <input
          type="url"
          name="linkedIn"
          value={activeResume.personalInfo.linkedIn || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>GitHub</label>
        <input
          type="url"
          name="github"
          value={activeResume.personalInfo.github || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Portfolio</label>
        <input
          type="url"
          name="portfolio"
          value={activeResume.personalInfo.portfolio || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

# Resume Builder

A modern, feature-rich web application for creating, customizing, and exporting professional resumes. Instantly preview your changes, choose from multiple templates, and export your resume as a PDF or JSON file.

🌐 **Live Demo:** [https://resume-builder-203.netlify.app/](Resume Builder)

---

## Features

### Multiple Resume Templates
Choose between "Classic" and "Modern" templates to best showcase your experience and skills.

### Drag-and-Drop Section Ordering
Easily reorder resume sections (Personal Info, Summary, Education, Experience, Skills, Projects) to fit your needs.

### Dark Mode
Toggle between light and dark themes for comfortable editing.

### Multi-Resume Management
Create, duplicate, rename, and delete multiple resumes within the app.

### Import/Export
- Export your resume data as a JSON file for backup or sharing
- Import previously saved JSON files to continue editing

### PDF Export
Download a print-ready PDF of your resume with a single click.

### Live Preview
Instantly see your changes reflected in the resume preview pane.

---

## Usage

### Add/Edit Resume Sections
Fill out your personal information, summary, education, experience, skills, and projects using the provided forms.

### Switch Templates
Use the "Select Template" panel to toggle between available resume designs.

### Reorder Sections
Drag and drop sections in the "Section Order" panel to customize the layout.

### Export Options
- Click "Export to PDF" to download your resume as a PDF
- Use "Export JSON" to save your resume data
- Use "Import JSON" to load a previously saved resume

### Manage Multiple Resumes
Create new resumes, duplicate existing ones, or delete resumes as needed.

### Dark Mode
Click the sun/moon icon in the header to toggle dark mode.

## Tech Stack
- **Frontend:** React (with Context API for state management)
- **PDF Generation:** jsPDF, html2canvas
- **Drag-and-Drop:** @hello-pangea/dnd
- **Styling:** CSS

---

## Folder Structure

~~~bash
resume-builder/
├── public/
├── src/
│ ├── components/
│ ├── contexts/
│ ├── templates/
│ ├── utils/
│ ├── App.js
│ └── index.js
├── package.json
└── README.md



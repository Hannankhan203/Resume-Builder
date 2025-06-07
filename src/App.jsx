import React from "react";
import { ResumeProvider } from "./contexts/ResumeContext";
import { PersonalInfoForm } from "./components/PersonalInfoForm";
import { SummaryForm } from "./components/SummaryForm";
import { EducationForm } from "./components/EducationForm";
import { ExperienceForm } from "./components/ExperienceForm";
import { SkillsForm } from "./components/SkillsForm";
import { ProjectsForm } from "./components/ProjectsForm";
import { ResumePreview } from "./components/ResumePreview";
import { ResumeManager } from "./components/ResumeManager";
import { SectionOrder } from "./components/SectionOrder";
import { TemplateSelector } from "./components/TemplateSelector";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { ImportExport } from "./components/ImportExport";
import "./App.css";

function App() {
  return (
    <ResumeProvider>
      <div className="app">
        <header className="app-header">
          <h1>Resume Builder</h1>
          <DarkModeToggle />
        </header>
        <main>
          <div className="editor">
            <ResumeManager />
            <ImportExport />
            <TemplateSelector />
            <SectionOrder />
            <PersonalInfoForm />
            <SummaryForm />
            <EducationForm />
            <ExperienceForm />
            <SkillsForm />
            <ProjectsForm />
          </div>
          <div className="preview">
            <ResumePreview />
          </div>
        </main>
      </div>
    </ResumeProvider>
  );
}

export default App;

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const defaultResume = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedIn: "",
    github: "",
    portfolio: "",
  },
  summary: "",
  education: [],
  experience: [],
  skills: [],
  projects: [],
  sectionOrder: [
    "personalInfo",
    "summary",
    "education",
    "experience",
    "skills",
    "projects",
  ],
  template: "template1",
  pdfSettings: {
    fileName: "my-resume",
    orientation: "portrait",
    format: "a4",
  },
};

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState(() => {
    const savedResumes = localStorage.getItem("resumes");
    return savedResumes
      ? JSON.parse(savedResumes)
      : {
          default: { ...defaultResume, id: "default", name: "My Resume" },
        };
  });
  const [activeResumeId, setActiveResumeId] = useState("default");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const activeResume = useMemo(() => {
    return (
      resumes[activeResumeId] || {
        ...defaultResume,
        id: "default",
        name: "My Resume",
      }
    );
  }, [resumes, activeResumeId]);

  useEffect(() => {
    localStorage.setItem("resumes", JSON.stringify(resumes));
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [resumes, darkMode]);

  const createNewResume = () => {
    const newId = Date.now().toString();
    const newResume = {
      ...defaultResume,
      id: newId,
      name: `Resume ${Object.keys(resumes).length + 1}`,
    };
    setResumes((prev) => ({
      ...prev,
      [newId]: newResume,
    }));
    setActiveResumeId(newId);
    return newId;
  };

  const updateResume = (id, updates) => {
    setResumes((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        ...updates,
      },
    }));
  };

  const deleteResume = (id) => {
    if (id === "default") return;
    setResumes((prev) => {
      const newResumes = { ...prev };
      delete newResumes[id];
      return newResumes;
    });
    if (activeResumeId === id) {
      setActiveResumeId("default");
    }
  };

  const duplicateResume = (id) => {
    const newId = Date.now().toString();
    setResumes((prev) => ({
      ...prev,
      [newId]: {
        ...prev[id],
        id: newId,
        name: `${prev[id].name} (Copy)`,
      },
    }));
    return newId;
  };

  const reorderSections = (startIndex, endIndex) => {
    const result = Array.from(activeResume.sectionOrder);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    updateResume(activeResumeId, {
      sectionOrder: result,
    });
  };

  const changeTemplate = (templateName) => {
    updateResume(activeResumeId, {
      template: templateName,
    });
  };

  const exportResume = () => {
    const dataStr = JSON.stringify(activeResume, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportName = `${activeResume.name || "resume"}.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportName);
    linkElement.click();
  };

  const importResume = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const newId = Date.now().toString();
        setResumes((prev) => ({
          ...prev,
          [newId]: {
            ...defaultResume,
            ...data,
            id: newId,
            name: data.name || "Imported Resume",
          },
        }));
        setActiveResumeId(newId);
      } catch (error) {
        alert("Invalid resume file");
      }
    };
    reader.readAsText(file);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        activeResumeId,
        activeResume,
        darkMode,
        setActiveResumeId,
        createNewResume,
        updateResume,
        deleteResume,
        duplicateResume,
        reorderSections,
        changeTemplate,
        exportResume,
        importResume,
        toggleDarkMode,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};

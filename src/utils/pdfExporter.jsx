import { jsPDF } from "jspdf";

export const exportToPDFjsPDFOnly = (resume, settings = {}) => {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Layout
  const leftX = 12;
  const rightX = pageWidth * 0.65 + 6; // Sidebar starts at ~65% + gap
  const leftColWidth = rightX - leftX - 8;
  const rightColWidth = pageWidth - rightX - 10;
  let y = 22;
  const lineHeight = 6.2;
  const sectionSpacing = 6;
  const subSectionSpacing = 2;
  const blue = [41, 76, 139];
  const black = [0, 0, 0];

  // Helper: Blue all-caps section header
  function addSectionHeader(title, col = 'left', yOverride = null) {
    const x = col === 'left' ? leftX : rightX;
    let headerY = yOverride !== null ? yOverride : (col === 'left' ? y : yRight);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(...blue);
    pdf.text(title.toUpperCase(), x, headerY);
    if (col === 'left') {
      y = headerY + lineHeight - 2;
    } else {
      yRight = headerY + lineHeight - 2;
    }
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    pdf.setTextColor(...black);
  }

  // Helper: Add a blue underlined link
  function addLink(text, url, x, y) {
    pdf.setTextColor(...blue);
    pdf.textWithLink(text, x, y, { url });
    pdf.setTextColor(...black);
  }

  // Helper: Add a bold subheader
  function addSubHeader(text, x, y) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text(text, x, y);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
  }

  // LEFT COLUMN (main content, page 1 only)
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(24);
  pdf.text(resume.personalInfo.fullName || '', leftX, y);
  y += 11;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(13);
  if (resume.personalInfo.title) {
    pdf.text(resume.personalInfo.title, leftX, y);
    y += 8;
  }
  if (resume.summary) {
    addSectionHeader('Profile');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    const summaryLines = pdf.splitTextToSize(resume.summary, leftColWidth);
    pdf.text(summaryLines, leftX, y);
    y += lineHeight * summaryLines.length - 6;
  }
  if (resume.education && resume.education.length) {
    addSectionHeader('Education');
    resume.education.forEach(edu => {
      addSubHeader(edu.institution, leftX, y);
      y += lineHeight - 1.5;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`${edu.startDate} - ${edu.endDate}`, leftX, y);
      y += lineHeight - 2.5;
      pdf.text(`${edu.degree} - ${edu.fieldOfStudy}`, leftX, y);
      y += lineHeight - 1.5;
      if (edu.description) {
        const eduDescLines = pdf.splitTextToSize(edu.description, leftColWidth);
        pdf.text(eduDescLines, leftX, y);
        y += lineHeight * eduDescLines.length;
      }
      y += subSectionSpacing;
    });
    y += sectionSpacing;
  }
  // Add Experience section
  if (resume.experience && resume.experience.length) {
    addSectionHeader('Experience');
    resume.experience.forEach(exp => {
      addSubHeader(exp.company, leftX, y);
      y += lineHeight - 1.5;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`${exp.startDate} - ${exp.endDate}`, leftX, y);
      y += lineHeight - 2.5;
      pdf.text(exp.position, leftX, y);
      y += lineHeight - 1.5;
      if (exp.description) {
        const expDescLines = pdf.splitTextToSize(exp.description, leftColWidth);
        pdf.text(expDescLines, leftX, y);
        y += lineHeight * expDescLines.length;
      }
      y += subSectionSpacing;
    });
    y += sectionSpacing;
  }
  // RIGHT COLUMN (sidebar, page 1 only)
  let yRight = 22;
  if (resume.personalInfo.address) {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const addressLines = pdf.splitTextToSize(resume.personalInfo.address, rightColWidth);
    pdf.text(addressLines, rightX, yRight);
    yRight += lineHeight * addressLines.length;
  }
  if (resume.personalInfo.city) {
    const cityLines = pdf.splitTextToSize(resume.personalInfo.city, rightColWidth);
    pdf.text(cityLines, rightX, yRight);
    yRight += lineHeight * cityLines.length;
  }
  if (resume.personalInfo.phone) {
    pdf.setFont('helvetica', 'bold');
    pdf.text(resume.personalInfo.phone, rightX, yRight, { maxWidth: rightColWidth });
    yRight += lineHeight - 2.5;
  }
  if (resume.personalInfo.email) {
    pdf.text(resume.personalInfo.email, rightX, yRight, { maxWidth: rightColWidth });
    yRight += lineHeight - 2.5;
  }
  if (resume.personalInfo.portfolio) {
    addLink('Portfolio', resume.personalInfo.portfolio, rightX, yRight);
    yRight += lineHeight - 2.5;
  }
  if (resume.personalInfo.github) {
    addLink('GitHub', resume.personalInfo.github, rightX, yRight);
    yRight += lineHeight - 2.5;
  }
  if (resume.personalInfo.linkedIn) {
    addLink('LinkedIn', resume.personalInfo.linkedIn, rightX, yRight);
    yRight += lineHeight - 2.5;
  }
  yRight += sectionSpacing + 2;
  if (resume.skills && resume.skills.length) {
    addSectionHeader('Skills', 'right');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    let skillsY = yRight;
    resume.skills.forEach(skill => {
      const skillLines = pdf.splitTextToSize(skill, rightColWidth);
      pdf.text(skillLines, rightX, skillsY);
      skillsY += lineHeight * skillLines.length - 1;
    });
    yRight = skillsY + sectionSpacing;
  }
  if (resume.certificates && resume.certificates.length) {
    addSectionHeader('Certificates', 'right');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    let certY = yRight;
    resume.certificates.forEach(cert => {
      pdf.text(cert, rightX, certY, { maxWidth: rightColWidth });
      certY += lineHeight - 3.5;
    });
    yRight = certY + sectionSpacing;
  }
  if (resume.projects && resume.projects.length) {
    let projectsHeaderAdded = false;
    resume.projects.forEach((project, idx) => {
      let projLines = 1;
      if (project.technologies && project.technologies.length) {
        const techLine = `Tech Used - ${project.technologies.join(', ')}`;
        projLines += pdf.splitTextToSize(techLine, leftColWidth).length;
      }
      if (project.link) projLines += 1;
      if (project.description) projLines += pdf.splitTextToSize(project.description, leftColWidth).length;
      const projHeight = lineHeight * projLines + subSectionSpacing;
      if (y + projHeight > pageHeight - 18) {
        pdf.addPage();
        y = 22;
        projectsHeaderAdded = false; // Need to re-add header on new page
      }
      if (!projectsHeaderAdded) {
        addSectionHeader('Projects');
        projectsHeaderAdded = true;
      }
      addSubHeader(project.name, leftX, y);
      y += lineHeight - 1.5;
      if (project.technologies && project.technologies.length) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const techLine = `Tech Used - ${project.technologies.join(', ')}`;
        const techLines = pdf.splitTextToSize(techLine, leftColWidth);
        pdf.text(techLines, leftX, y);
        y += lineHeight * techLines.length - 2;
      }
      if (project.link) {
        addLink(project.link, project.link, leftX, y);
        y += lineHeight - 2;
      }
      if (project.description) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const projDescLines = pdf.splitTextToSize(project.description, leftColWidth);
        pdf.text(projDescLines, leftX, y);
        y += lineHeight * projDescLines.length;
      }
      y += subSectionSpacing;
    });
    y += sectionSpacing;
  }

  pdf.save(`${settings.fileName || resume.name || 'resume'}.pdf`);
};

export const exportToPDFClassic = (resume, settings = {}) => {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const leftX = 18;
  const Leftx1 = 135;
  const Leftx2 = 150;
  const Leftx3 = 165;
  // let y1 = 16;
  let y1 = 22;
  // let y3 = 24;
  const contentWidth = pageWidth - 2 * leftX;
  let y = 22;
  const lineHeight = 8;
  const sectionSpacing = 6;
  const subSectionSpacing = 4;
  const pageHeight = pdf.internal.pageSize.getHeight();
  const bottomMargin = 20;
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 255);
  pdf.setFontSize(34);
  pdf.text(resume.personalInfo.fullName || '', leftX, y);
  y += 8;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(16);
  // Contact info
  let contactInfo = [];
  if (resume.personalInfo.email) contactInfo.push(resume.personalInfo.email);
  if (resume.personalInfo.phone) contactInfo.push(resume.personalInfo.phone);
  if (resume.personalInfo.address) contactInfo.push(resume.personalInfo.address);
  if (contactInfo.length) {
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    const contactLines = pdf.splitTextToSize(contactInfo.join(' | '), contentWidth);
    pdf.text(contactLines, leftX, y);
    y += lineHeight * contactLines.length - 22;
  }
  // Add blue clickable links for Portfolio, GitHub, LinkedIn
  function addLink(text, url, x, y) {
    pdf.setTextColor(0, 0, 255);
    pdf.textWithLink(text, x, y, { url });
    pdf.setTextColor(0, 0, 0);
  }
  if (resume.personalInfo.portfolio) {
    addLink('Portfolio', resume.personalInfo.portfolio, Leftx1, y1);
    y += lineHeight - 2;
  }
  if (resume.personalInfo.github) {
    addLink('GitHub', resume.personalInfo.github, Leftx2, y1);
    y += lineHeight - 2;
  }
  if (resume.personalInfo.linkedIn) {
    addLink('LinkedIn', resume.personalInfo.linkedIn, Leftx3, y1);
    y += lineHeight + 1;
  }
  // Ensure y is set after the last link
  const lastLinkY = Math.max(y, y1, y1, y1);
  y = lastLinkY + lineHeight;
  // Summary
  if (resume.summary) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 255);
    pdf.text('Summary', leftX, y);
    pdf.setTextColor(0, 0, 0);
    y += lineHeight;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    const summaryLines = pdf.splitTextToSize(resume.summary, contentWidth);
    pdf.text(summaryLines, leftX, y);
    y += lineHeight * summaryLines.length - 10;
    y += sectionSpacing;
  }
  // Experience
  if (resume.experience && resume.experience.length) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 255);
    pdf.text('Experience', leftX, y);
    pdf.setTextColor(0, 0, 0);
    y += lineHeight;
    resume.experience.forEach(exp => {
      // Estimate height for this experience entry
      let expLines = 1; // company
      if (exp.startDate || exp.endDate) expLines += 1;
      if (exp.position) expLines += 1;
      if (exp.description) expLines += pdf.splitTextToSize(exp.description, contentWidth).length;
      const expHeight = lineHeight * expLines + sectionSpacing;
      if (y + expHeight > pageHeight - bottomMargin) {
        pdf.addPage();
        y = 22;
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.text('Experience', leftX, y);
        y += lineHeight;
      }
      // Company Name
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 255);
      pdf.text(exp.company, leftX, y);
      pdf.setTextColor(0, 0, 0);
      y += lineHeight - 1;
      // Date
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      if (exp.startDate || exp.endDate) {
        pdf.text(`${exp.startDate} - ${exp.endDate}`, leftX, y);
        y += lineHeight - 2;
      }
      // Position
      if (exp.position) {
        pdf.setFont('helvetica', 'italic');
        pdf.setFontSize(12);
        pdf.text(exp.position, leftX, y);
        y += lineHeight - 1;
      }
      // Description
      if (exp.description) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const expDescLines = pdf.splitTextToSize(exp.description, contentWidth);
        pdf.text(expDescLines, leftX, y);
        y += lineHeight * expDescLines.length;
      }
      y += sectionSpacing;
    });
  }
  // Education
  if (resume.education && resume.education.length) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 255);
    pdf.text('Education', leftX, y);
    pdf.setTextColor(0, 0, 0);
    y += lineHeight;
    resume.education.forEach(edu => {
      // Estimate height for this education entry
      let eduLines = 1; // institution
      if (edu.startDate || edu.endDate) eduLines += 1;
      if (edu.degree || edu.fieldOfStudy) eduLines += 1;
      if (edu.description) eduLines += pdf.splitTextToSize(edu.description, contentWidth).length;
      const eduHeight = lineHeight * eduLines + sectionSpacing;
      if (y + eduHeight > pageHeight - bottomMargin) {
        pdf.addPage();
        y = 22;
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.text('Education', leftX, y);
        y += lineHeight;
      }
      // Institution Name
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 255);
      pdf.text(edu.institution, leftX, y);
      pdf.setTextColor(0, 0, 0);
      y += lineHeight - 1;
      // Date
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      if (edu.startDate || edu.endDate) {
        pdf.text(`${edu.startDate} - ${edu.endDate}`, leftX, y);
        y += lineHeight - 2;
      }
      // Degree/Field
      if (edu.degree || edu.fieldOfStudy) {
        pdf.setFont('helvetica', 'italic');
        pdf.setFontSize(12);
        pdf.text(`${edu.degree} in ${edu.fieldOfStudy}`, leftX, y);
        y += lineHeight - 4;
      }
      // Description
      if (edu.description) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
        const eduDescLines = pdf.splitTextToSize(edu.description, contentWidth);
        pdf.text(eduDescLines, leftX, y);
        y += lineHeight * eduDescLines.length;
      }
      y += sectionSpacing;
    });
  }
  // Skills
  if (resume.skills && resume.skills.length) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 255);
    pdf.text('Skills', leftX, y);
    pdf.setTextColor(0, 0, 0);
    y += lineHeight;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    const skillsLine = resume.skills.join(', ');
    pdf.text(skillsLine, leftX, y, { maxWidth: contentWidth });
    y += lineHeight * skillsLine.length - 10;
    y += sectionSpacing;
  }
  // Projects
  if (resume.projects && resume.projects.length) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 255);
    pdf.text('Projects', leftX, y);
    pdf.setTextColor(0, 0, 0);
    y += lineHeight;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    resume.projects.forEach(project => {
      // Estimate height for this project entry
      let projLines = 1; // name
      if (project.technologies && project.technologies.length) projLines += 1;
      if (project.description) projLines += pdf.splitTextToSize(project.description, contentWidth).length;
      if (project.link) projLines += 1;
      const projHeight = lineHeight * projLines + subSectionSpacing;
      if (y + projHeight > pageHeight - bottomMargin) {
        pdf.addPage();
        y = 22;
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 255);
        pdf.text('Projects', leftX, y);
        pdf.setTextColor(0, 0, 0);
        y += lineHeight;
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
      }
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 255);
      pdf.text(project.name, leftX, y);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      y += lineHeight - 2;
      if (project.technologies && project.technologies.length) {
        pdf.text(`Tech Used: ${project.technologies.join(', ')}`, leftX, y);
        y += lineHeight - 2;
      }
      if (project.description) {
        const projDescLines = pdf.splitTextToSize(project.description, contentWidth);
        pdf.text(projDescLines, leftX, y);
        y += lineHeight * projDescLines.length;
      }
      if (project.link) {
        pdf.text(project.link, leftX, y);
        y += lineHeight - 2;
      }
      y += subSectionSpacing;
    });
    y += sectionSpacing;
  }
  pdf.save(`${settings.fileName || resume.name || 'resume'}.pdf`);
};

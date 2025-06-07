import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (elementId, settings) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Create a print-optimized clone with exact dimensions
  const clone = element.cloneNode(true);
  clone.id = "pdf-export-clone";

  // Apply compact styling
  clone.style.cssText = `
    position: absolute;
    left: px;
    width: 110mm; 
    min-height: auto;
    padding-right: 20mm;
    margin: 0;
    background: white;
    color: black;
    box-sizing: border-box;
    font-size: 11pt;
    line-height: 1;
  `;

  document.body.appendChild(clone);

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      width: clone.scrollWidth,
      height: clone.scrollHeight,
      logging: true,
      useCORS: true,
      backgroundColor: "#ffffff",
      letterRendering: true,
      onclone: (clonedDoc) => {
        clonedDoc.body.style.background = "white";
      },
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Calculate dynamic height based on content
    const imgWidth = 200; // mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Multi-page support
    const pageHeight = pdf.internal.pageSize.getHeight();
    let remainingHeight = imgHeight;
    // let position = 0;
    let pageNum = 0;
    while (remainingHeight > 0) {
      if (pageNum > 0) pdf.addPage();
      const sliceHeight = Math.min(remainingHeight, pageHeight);
      // Calculate the portion of the canvas to use for this page
      const sourceY = (imgHeight - remainingHeight) * (canvas.height / imgHeight);
      const sourceHeight = sliceHeight * (canvas.height / imgHeight);
      // Create a temporary canvas for the slice
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = sourceHeight;
      const ctx = pageCanvas.getContext('2d');
      ctx.drawImage(
        canvas,
        0, sourceY, canvas.width, sourceHeight, // source
        0, 0, canvas.width, sourceHeight        // destination
      );
      const imgData = pageCanvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 0, imgWidth, sliceHeight);
      remainingHeight -= sliceHeight;
      pageNum++;
    }

    pdf.save(`${settings.fileName || "resume"}.pdf`);
  } catch (error) {
    console.error("PDF generation error:", error);
  } finally {
    const cloneToRemove = document.getElementById("pdf-export-clone");
    if (cloneToRemove) document.body.removeChild(cloneToRemove);
  }
};

// New: Direct jsPDF export (no html2canvas, no image slicing)
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
    y += lineHeight * summaryLines.length - 8;
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
        y += lineHeight * eduDescLines.length - 1000;
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
    addLink('Contact via Email', `mailto:${resume.personalInfo.email}`, rightX, yRight);
    yRight += lineHeight - 2.5;
  }
  if (resume.personalInfo.portfolio) {
    addLink('Portfolio', resume.personalInfo.portfolio, rightX, yRight);
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
      skillsY += lineHeight * skillLines.length;
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
  // PROJECTS SECTION: Start on current page if space, otherwise add page as needed
  if (resume.projects && resume.projects.length) {
    // Only add the section header if at least one project fits on the current page
    let projectsHeaderAdded = false;
    resume.projects.forEach((project, idx) => {
      // Estimate height for this project
      let projLines = 1; // name
      if (project.technologies && project.technologies.length) {
        const techLine = `Tech Used - ${project.technologies.join(', ')}`;
        projLines += pdf.splitTextToSize(techLine, leftColWidth).length;
      }
      if (project.link) projLines += 1;
      if (project.description) projLines += pdf.splitTextToSize(project.description, leftColWidth).length;
      const projHeight = lineHeight * projLines + subSectionSpacing;
      // If not enough space for this project, add a new page
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
        y += lineHeight * techLines.length;
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

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
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let y = 20;
  const leftMargin = 20;
  const rightMargin = 20;
  const contentWidth = pageWidth - leftMargin - rightMargin;
  const lineHeight = 8;
  const sectionSpacing = 10;
  const cardSpacing = 2;
  const underlineSpacing = 6; // Space after section underline before content
  const bottomPadding = 5;

  // Helper: Add section title
  function addSectionTitle(title) {
    pdf.setFontSize(15);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, leftMargin, y);
    y += underlineSpacing; // Small gap after heading
    pdf.setDrawColor(41, 128, 185);
    pdf.setLineWidth(1);
    pdf.line(leftMargin, y, pageWidth - rightMargin, y);
    y += underlineSpacing; // Equal gap after line
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
  }

  // Helper: Add a card (for education, experience, projects)
  function addCard({ title, subtitle, description, tags, link }) {
    const cardTop = y;
    const cardPadding = 2;
    let cardHeight = 18 + (description ? 7 : 0);
    // Calculate tag lines and height
    let tagLines = 0;
    if (tags && tags.length) {
      let tagX = leftMargin + 3;
      // let tagY = 0;
      tagLines = 1;
      tags.forEach(tag => {
        const tagWidth = pdf.getTextWidth(tag) + 6;
        if (tagX + tagWidth > leftMargin + contentWidth - 3) {
          tagX = leftMargin + 3;
          tagLines++;
        }
        tagX += tagWidth + 2;
      });
      cardHeight += tagLines * 10;
    }
    // Before drawing the card, check if it fits on the current page
    if (y + cardHeight > pageHeight - 25) {
      pdf.addPage();
      y = 25;
    }
    pdf.setDrawColor(41, 128, 185);
    pdf.setLineWidth(1);
    pdf.setFillColor(245, 245, 245);
    pdf.roundedRect(leftMargin, y, contentWidth, cardHeight, 4, 4, 'FD');
    y += cardPadding + 5;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.text(title, leftMargin + 3, y);
    if (link) {
      pdf.setTextColor(41, 128, 185);
      pdf.textWithLink(link, leftMargin + 3, y + 6, { url: link });
      pdf.setTextColor(0, 0, 0);
    }
    if (subtitle) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.text(subtitle, leftMargin + 3, y + 6);
    }
    if (description) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.text(description, leftMargin + 3, y + 12);
    }
    if (tags && tags.length) {
      let tagX = leftMargin + 3;
      let tagY = y + 17;
      pdf.setFontSize(10);
      tags.forEach(tag => {
        const tagWidth = pdf.getTextWidth(tag) + 6;
        if (tagX + tagWidth > leftMargin + contentWidth - 3) {
          tagX = leftMargin + 3;
          tagY += 10;
        }
        pdf.setFillColor(220, 220, 220);
        pdf.roundedRect(tagX, tagY - 5, tagWidth, 7, 2, 2, 'F');
        pdf.text(tag, tagX + 3, tagY);
        tagX += tagWidth + 2;
      });
    }
    y = cardTop + cardHeight + cardSpacing;
  }

  // Render sections in order
  (resume.sectionOrder || [
    'personalInfo', 'summary', 'education', 'experience', 'skills', 'projects'
  ]).forEach(section => {
    if (y > pageHeight - 35) {
      pdf.addPage();
      y = 25;
    }
    switch (section) {
      case 'personalInfo': {
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text(resume.personalInfo.fullName || '', pageWidth / 2, y, { align: 'center' });
        y += lineHeight;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        let infoLine = [
          resume.personalInfo.email,
          resume.personalInfo.phone,
          resume.personalInfo.address
        ].filter(Boolean).join('   ');
        if (infoLine) {
          pdf.text(infoLine, pageWidth / 2, y, { align: 'center' });
          y += lineHeight - 2;
        }
        let linksLine = [
          resume.personalInfo.linkedIn,
          resume.personalInfo.github,
          resume.personalInfo.portfolio
        ].filter(Boolean).join('   ');
        if (linksLine) {
          pdf.setTextColor(41, 128, 185);
          pdf.text(linksLine, pageWidth / 2, y, { align: 'center' });
          pdf.setTextColor(0, 0, 0);
          y += lineHeight - 2;
        }
        y += sectionSpacing;
        break;
      }
      case 'summary': {
        if (resume.summary) {
          addSectionTitle('Summary');
          pdf.text(resume.summary, leftMargin, y, { maxWidth: contentWidth });
          y += lineHeight + 2;
          y += bottomPadding; // Add bottom padding after summary description
        }
        break;
      }
      case 'education': {
        if (resume.education && resume.education.length) {
          y += 6; // Extra space before Education section
          addSectionTitle('Education');
          resume.education.forEach((edu, idx) => {
            addCard({
              title: edu.institution,
              subtitle: `${edu.degree} in ${edu.fieldOfStudy}  ${edu.startDate} - ${edu.endDate}`,
              description: edu.description,
              tags: edu.gpa ? [`GPA: ${edu.gpa}`] : []
            });
            // Add bottomPadding only after the last card
            if (idx === resume.education.length - 1) {
              y += bottomPadding;
            }
          });
          y += sectionSpacing;
        }
        break;
      }
      case 'experience': {
        if (resume.experience && resume.experience.length) {
          addSectionTitle('Experience');
          resume.experience.forEach((exp, idx) => {
            addCard({
              title: exp.company,
              subtitle: `${exp.position}  ${exp.startDate} - ${exp.endDate}`,
              description: exp.description
            });
            // Add bottomPadding only after the last card
            if (idx === resume.experience.length - 1) {
              y += bottomPadding;
            }
          });
          y += sectionSpacing;
        }
        break;
      }
      case 'skills': {
        if (resume.skills && resume.skills.length) {
          addSectionTitle('Skills');
          y += 4; // Extra space after the underline before skills tags
          let tagX = leftMargin;
          let tagY = y + 2;
          pdf.setFontSize(10);
          resume.skills.forEach(skill => {
            const tagWidth = pdf.getTextWidth(skill) + 6;
            if (tagX + tagWidth > pageWidth - rightMargin) {
              tagX = leftMargin;
              tagY += 10;
            }
            pdf.setFillColor(220, 220, 220);
            pdf.roundedRect(tagX, tagY - 5, tagWidth, 7, 2, 2, 'F');
            pdf.text(skill, tagX + 3, tagY);
            tagX += tagWidth + 2;
          });
          y = tagY + 10;
          y += sectionSpacing;
        }
        break;
      }
      case 'projects': {
        if (resume.projects && resume.projects.length) {
          // Calculate total height needed for heading + all cards
          let projY = y;
          let totalHeight = 0;
          // Heading height
          totalHeight += 15; // heading + underline + spacing
          resume.projects.forEach(project => {
            let cardHeight = 18 + (project.description ? 7 : 0);
            // Calculate tag lines and height
            let tagLines = 0;
            if (project.technologies && project.technologies.length) {
              let tagX = leftMargin + 3;
              tagLines = 1;
              project.technologies.forEach(tag => {
                const tagWidth = pdf.getTextWidth(tag) + 6;
                if (tagX + tagWidth > leftMargin + contentWidth - 3) {
                  tagX = leftMargin + 3;
                  tagLines++;
                }
                tagX += tagWidth + 2;
              });
              cardHeight += tagLines * 10;
            }
            totalHeight += cardHeight + cardSpacing;
          });
          if (projY + totalHeight > pageHeight - 25) {
            pdf.addPage();
            y = 25;
          }
          addSectionTitle('Projects');
          resume.projects.forEach((project, idx) => {
            addCard({
              title: project.name,
              subtitle: project.description,
              description: project.link,
              tags: project.technologies
            });
            // Add bottomPadding only after the last card
            if (idx === resume.projects.length - 1) {
              y += bottomPadding;
            }
          });
          y += sectionSpacing;
        }
        break;
      }
      default:
        break;
    }
  });

  pdf.save(`${settings.fileName || resume.name || 'resume'}.pdf`);
};

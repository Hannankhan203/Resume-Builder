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

    // Center content vertically if there's extra space
    const pageHeight = pdf.internal.pageSize.getHeight();
    const yPos = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 0;

    pdf.addImage(canvas, "PNG", 10, yPos, imgWidth, imgHeight);
    pdf.save(`${settings.fileName || "resume"}.pdf`);
  } catch (error) {
    console.error("PDF generation error:", error);
  } finally {
    const cloneToRemove = document.getElementById("pdf-export-clone");
    if (cloneToRemove) document.body.removeChild(cloneToRemove);
  }
};

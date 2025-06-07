import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (elementId, settings) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Create a clean clone
  const clone = element.cloneNode(true);
  clone.id = "pdf-export-clone";
  clone.style.width = "700px"; // Reduced from 800px to fit better
  clone.style.padding = "20px";
  clone.style.boxSizing = "border-box";
  clone.style.background = "#ffffff";
  document.body.appendChild(clone);

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      windowWidth: 700, // Match the clone width
      logging: true,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Calculate dimensions with safer margins
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 5; // Reduced from 10mm to 5mm
    const imgWidth = pageWidth - (margin * 2);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Center the content horizontally
    pdf.addImage(canvas, "PNG", margin, 10, imgWidth, imgHeight);
    
    pdf.save(`${settings.fileName || "resume"}.pdf`);
  } catch (error) {
    console.error("PDF generation error:", error);
  } finally {
    const cloneToRemove = document.getElementById("pdf-export-clone");
    if (cloneToRemove) document.body.removeChild(cloneToRemove);
  }
};
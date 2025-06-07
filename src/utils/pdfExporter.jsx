import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (elementId, settings) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Create a clean clone of the element
  const clone = element.cloneNode(true);
  clone.id = "pdf-export-clone";

  // Apply necessary styles to the clone
  clone.style.position = "absolute";
  clone.style.left = "-9999px";
  clone.style.top = "0";
  clone.style.width = "800px";
  clone.style.height = "auto";
  clone.style.visibility = "visible";
  clone.style.background = "#ffffff";
  clone.style.color = "#000000";

  // Find and modify all child elements to ensure white background
  const allElements = clone.querySelectorAll("*");
  allElements.forEach((el) => {
    el.style.background = "#ffffff";
    el.style.color = "#000000";
    el.style.boxShadow = "none";
  });

  document.body.appendChild(clone);

  // Small delay to ensure rendering
  await new Promise((resolve) => setTimeout(resolve, 100));

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      logging: true,
      useCORS: true,
      backgroundColor: "#ffffff",
      letterRendering: true,
      removeContainer: true,
      onclone: (document) => {
        // Ensure all elements have white background in the cloned document
        document.querySelectorAll("*").forEach((el) => {
          el.style.background = "#ffffff";
          el.style.color = "#000000";
        });
      },
    });

    const pdf = new jsPDF({
      orientation: settings.orientation || "portrait",
      unit: "mm",
      format: settings.format || "a4",
    });

    const imgWidth = pdf.internal.pageSize.getWidth() - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(canvas, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`${settings.fileName || "resume"}.pdf`);
  } catch (error) {
    console.error("PDF generation error:", error);
  } finally {
    // Always clean up
    const cloneToRemove = document.getElementById("pdf-export-clone");
    if (cloneToRemove) {
      document.body.removeChild(cloneToRemove);
    }
  }
};

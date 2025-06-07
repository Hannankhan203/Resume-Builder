import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (elementId, settings) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const originalStyles = {
    position: element.style.position,
    overflow: element.style.overflow,
    height: element.style.height,
    width: element.style.width,
  };

  element.style.position = "absolute";
  element.style.overflow = "visible";
  element.style.height = "auto";
  element.style.width = "800px";

  const canvas = await html2canvas(element, {
    scale: 1,
    logging: false,
    useCORS: true,
    scrollX: 0,
    scrollY: 0,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    letterRendering: true,
  });

  Object.assign(element.style, originalStyles);

  const pdf = new jsPDF({
    orientation: settings.orientation || "portrait",
    unit: "mm",
    format: settings.format || "a4",
  });

  const imgWidth = 190; // mm (A4 width - margins)
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // const imgProps = pdf.getImageProperties(imgData);
  // const pdfWidth = pdf.internal.pageSize.getWidth();
  // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(canvas, "PNG", 10, 10, imgWidth, imgHeight);
  pdf.save(`${settings.fileName || "resume"}.pdf`);
};

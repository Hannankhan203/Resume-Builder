import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (elementId, settings) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const originalStyles = {
    overflow: element.style.overflow,
    height: element.style.height
  };
  
  element.style.overflow = 'visible';
  element.style.height = 'auto';

  const canvas = await html2canvas(element, {
    scale: 2,
    logging: false,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
  });

  element.style.overflow = originalStyles.overflow;
  element.style.height = originalStyles.height;

  const imgData = canvas.toDataURL("image/png", 1.0);
  const pdf = new jsPDF({
    orientation: settings.orientation || "portrait",
    unit: "mm",
    format: settings.format || "a4",
  });

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${settings.fileName || "resume"}.pdf`);
};

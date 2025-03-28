"use client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TrackerChartPdfTamplate from "@/components/pages/report/TrackerChartPdfTamplate";

import { createRoot } from "react-dom/client";

export const useChartDataDownload = () => {
  const downloadChartDataAsCSV = (chartData, filename = "chart-data.csv") => {
    if (!chartData || !chartData.datasets || !chartData.labels) {
      console.error("Invalid chart data format");
      return;
    }

    const { labels, datasets } = chartData;

    // Create CSV header
    let csvContent = "Month";
    datasets.forEach((dataset) => {
      csvContent += `,${dataset.label}`;
    });
    csvContent += "\n";

    // Add data rows
    labels.forEach((month, index) => {
      csvContent += month;
      datasets.forEach((dataset) => {
        csvContent += `,${dataset.data[index]}%`;
      });
      csvContent += "\n";
    });

    // Create a blob with the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link
    if (typeof window !== "undefined") {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const downloadChartDataAsPdf = async (ref, fileName) => {
    try {
      // Capture the component as a canvas
      const canvas = await html2canvas(ref.current, {
        scale: 2, // Increase resolution
        useCORS: true, // Handle cross-origin images if any
      });

      // Convert canvas to image data
      const imgData = canvas.toDataURL("image/png");

      // Initialize jsPDF
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions to fit the PDF page
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the image to the PDF
      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Download the PDF with the provided file name
      doc.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return { downloadChartDataAsCSV, downloadChartDataAsPdf };
};

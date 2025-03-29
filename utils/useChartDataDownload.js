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

  const downloadChartDataAsPdf = async (
    ref,
    fileName = "chart-report.pdf",
    options = {}
  ) => {
    try {
      if (!ref?.current) throw new Error("Chart reference is not available");

      const canvas = ref.current.querySelector("canvas");
      if (!canvas) throw new Error("Canvas element not found in chart");

      // Lower resolution: 150 DPI (instead of 300 DPI)
      const a4WidthPx = 1240; // 210mm * 150 DPI / 25.4
      const a4HeightPx = 1754; // 297mm * 150 DPI / 25.4
      const marginPx = 59; // ~10mm at 150 DPI

      // Preserve original aspect ratio
      const originalAspectRatio = canvas.width / canvas.height;

      const tempContainer = document.createElement("div");
      tempContainer.style.position = "fixed";
      tempContainer.style.left = "-10000px";
      tempContainer.style.top = "0";
      tempContainer.style.width = `${a4WidthPx}px`;
      tempContainer.style.backgroundColor = "white";
      tempContainer.style.padding = `${marginPx}px`;

      // Header setup with adjusted sizes for lower DPI
      const header = document.createElement("div");
      header.style.marginBottom = "30px";
      header.style.borderBottom = "1px solid #eee";
      header.style.paddingBottom = "15px";

      const type = document.createElement("h1");
      type.textContent = options.type || "";
      type.style.margin = "0";
      type.style.color = "#333";
      type.style.fontSize = "40px"; // Adjusted for 150 DPI
      header.appendChild(type);

      tempContainer.appendChild(header);
      const topic = document.createElement("h1");
      topic.textContent = options.topic || "Chart Report";
      topic.style.margin = "0";
      topic.style.color = "#333";
      topic.style.fontSize = "30px"; // Adjusted for 150 DPI
      tempContainer.appendChild(topic);
      if (options.question) {
        const question = document.createElement("p");
        question.textContent = options.question;
        question.style.margin = "8px 0 0";
        question.style.color = "#666";
        question.style.fontSize = "26px";
        tempContainer.appendChild(question);
      }

      // Capture chart
      const chartImage = canvas.toDataURL("image/png", 1);  
      const chartImgElement = document.createElement("img");
      chartImgElement.src = chartImage;

      const headerHeight = header.offsetHeight || 75; 
      const maxChartWidth = a4WidthPx - 2 * marginPx;
      const maxChartHeight = a4HeightPx - 2 * marginPx - headerHeight - 60;

      let chartWidth, chartHeight;
      if (originalAspectRatio > 1) {
        // Wide chart
        chartWidth = maxChartWidth;
        chartHeight = chartWidth / originalAspectRatio;
        if (chartHeight > maxChartHeight) {
          chartHeight = maxChartHeight;
          chartWidth = chartHeight * originalAspectRatio;
        }
      } else {
        // Tall or square chart
        chartHeight = maxChartHeight;
        chartWidth = chartHeight * originalAspectRatio;
        if (chartWidth > maxChartWidth) {
          chartWidth = maxChartWidth;
          chartHeight = chartWidth / originalAspectRatio;
        }
      }

      chartImgElement.style.width = `${chartWidth}px`;
      chartImgElement.style.height = `${chartHeight}px`;
      chartImgElement.style.objectFit = "contain";

      const chartContainer = document.createElement("div");
      chartContainer.style.margin = "30px 0";
      chartContainer.style.textAlign = "center";
      chartContainer.appendChild(chartImgElement);
      tempContainer.appendChild(chartContainer);

      if (options.includeTimestamp) {
        const timestamp = document.createElement("div");
        timestamp.style.marginTop = "30px";
        timestamp.style.fontSize = "18px";
        timestamp.style.color = "#999";
        timestamp.style.textAlign = "right";
        timestamp.textContent = `Generated on ${new Date().toLocaleString()}`;
        tempContainer.appendChild(timestamp);
      }

      document.body.appendChild(tempContainer);

      const pdfCanvas = await html2canvas(tempContainer, {
        scale: 1,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        width: a4WidthPx,
        height: a4HeightPx,
      });

      const imgData = pdfCanvas.toDataURL("image/png", 1); 
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const widthInMm = (a4WidthPx * 25.4) / 150;
      const heightInMm = (a4HeightPx * 25.4) / 150;

      pdf.addImage(
        imgData,
        "PNG",
        (pageWidth - widthInMm) / 2,
        (pageHeight - heightInMm) / 2,
        widthInMm,
        heightInMm,
        null,
        "FAST" 
      );

      document.body.removeChild(tempContainer);

      if (options.returnBlob) {
        return pdf.output("blob");
      } else {
        pdf.save(fileName);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      if (options.onError) options.onError(error);
    }
  };

  return { downloadChartDataAsCSV, downloadChartDataAsPdf };
};

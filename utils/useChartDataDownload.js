export const useChartDataDownload = () => {
    const downloadChartDataAsCSV = (chartData, filename = 'chart-data.csv') => {
      if (!chartData || !chartData.datasets || !chartData.labels) {
        console.error('Invalid chart data format');
        return;
      }
  
      const { labels, datasets } = chartData;
      
      // Create CSV header
      let csvContent = 'Month';
      datasets.forEach(dataset => {
        csvContent += `,${dataset.label}`;
      });
      csvContent += '\n';
      
      // Add data rows
      labels.forEach((month, index) => {
        csvContent += month;
        datasets.forEach(dataset => {
          csvContent += `,${dataset.data[index]}%`;
        });
        csvContent += '\n';
      });
      
      // Create a blob with the CSV data
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // Create a download link
      if (typeof window !== 'undefined') {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    };
  
    return { downloadChartDataAsCSV };
  };
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportChartAsImage = async (elementId: string, filename: string = 'chart') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Chart element not found');
    }

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Error exporting chart as image:', error);
    throw error;
  }
};

export const exportChartAsPDF = async (elementId: string, filename: string = 'chart') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Chart element not found');
    }

    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape');

    const imgWidth = 280;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error exporting chart as PDF:', error);
    throw error;
  }
};

export const exportDashboardData = (data: Record<string, unknown>, filename: string = 'dashboard-data') => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = `${filename}.json`;
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting dashboard data:', error);
    throw error;
  }
};
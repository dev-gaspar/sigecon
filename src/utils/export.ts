import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToExcel = (data: any[], filename: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const exportToPDF = (data: Record<string, any>[], filename: string, title: string) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(16);
  doc.text(title, 14, 15);

  // Add date
  doc.setFontSize(10);
  doc.text(`Generado el: ${new Date().toLocaleString()}`, 14, 25);

  // Convert data to array format for autoTable
  const headers = Object.keys(data[0]);
  const rows: any[][] = data.map(item => Object.values(item));

  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 30,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [63, 81, 181] },
  });

  doc.save(`${filename}.pdf`);
};
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBRL(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount || 0);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '-';
  const [year, month, day] = dateString.split('-');
  if (!year || !month || !day) return dateString;
  return `${day}/${month}/${year}`;
}

export function getDaysCountdown(targetDate: string): { days: number; hours: number; isPast: boolean } {
  if (!targetDate) return { days: 0, hours: 0, isPast: false };
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours, isPast: false };
}

export function exportToCSV(filename: string, rows: object[]) {
  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateSimplePDF(title: string, headers: string[], rows: (string | number)[][]) {
  const doc = new jsPDF();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(title, 14, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  let y = 32;

  // Header row
  doc.setFont('helvetica', 'bold');
  doc.text(headers.join(' | '), 14, y);
  y += 6;
  doc.setLineWidth(0.5);
  doc.line(14, y, 196, y);
  y += 8;

  // Data rows
  doc.setFont('helvetica', 'normal');
  rows.forEach((row) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    const lineText = row.map((val) => String(val)).join('  —  ');
    doc.text(lineText.substring(0, 95), 14, y);
    y += 7;
  });

  doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatação BRL elegante
export function formatBRL(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount || 0);
}

// Formatação de data civil sem problemas de conversão UTC (ex: "14/11/2026")
export function formatDate(dateString: string): string {
  if (!dateString) return '-';
  // Aceita formatos YYYY-MM-DD
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }
  return dateString;
}

// Extenso da data civil para convites e cabeçalhos
export function formatDateLong(dateString: string): string {
  if (!dateString) return '-';
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;

  const [yearStr, monthStr, dayStr] = parts;
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return `${day} de ${months[month] || ''} de ${year}`;
}

// Cálculo de contagem regressiva em dias civis
export function getDaysCountdown(targetDateStr: string): { days: number; hours: number; isPast: boolean } {
  if (!targetDateStr) return { days: 0, hours: 0, isPast: false };

  const parts = targetDateStr.split('-');
  if (parts.length !== 3) return { days: 0, hours: 0, isPast: false };

  const target = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const diff = target - today;

  if (diff < 0) {
    return { days: 0, hours: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours: 0, isPast: false };
}

// Exportação em CSV
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

// Geração de PDF Limpo Monocromático
export function generateSimplePDF(title: string, headers: string[], rows: (string | number)[][]) {
  const doc = new jsPDF();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(title, 14, 20);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  let y = 32;

  doc.setFont('helvetica', 'bold');
  doc.text(headers.join('  |  '), 14, y);
  y += 5;
  doc.setLineWidth(0.3);
  doc.line(14, y, 196, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  rows.forEach((row) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    const lineText = row.map((val) => String(val)).join('  —  ');
    doc.text(lineText.substring(0, 95), 14, y);
    y += 6;
  });

  doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
}

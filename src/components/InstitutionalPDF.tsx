"use client";

import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FileDown } from 'lucide-react';

export function InstitutionalPDF() {
  const downloadPDF = async () => {
    const dashboard = document.getElementById('institutional-dashboard');
    if (!dashboard) return;

    try {
      const canvas = await html2canvas(dashboard, {
        scale: 2,
        backgroundColor: '#0B0F1A',
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`COGNIQ-Institutional-Report-${new Date().toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error('PDF Generation Failed:', error);
    }
  };

  return (
    <button
      onClick={downloadPDF}
      className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-all group lg:w-auto w-full justify-center"
    >
      <FileDown className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
      Export Institutional Dossier
    </button>
  );
}

import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFConfig {
  orientation?: 'p' | 'portrait' | 'l' | 'landscape';
  format?: string;
  filenamePrefix?: string;
}

export const useFormPDF = (config: PDFConfig = {}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePDF = async (
    elementId: string, 
    filename?: string,
    onSuccess?: () => void  // ADDED: Success callback
  ): Promise<boolean> => {
    setIsGenerating(true);
    setError(null);

    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Print area not found');
      }

      const originalDisplay = element.style.display;
      const originalPosition = element.style.position;
      element.style.display = 'block';
      element.style.position = 'relative';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      element.style.display = originalDisplay;
      element.style.position = originalPosition;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF(
        config.orientation || 'p',
        'mm',
        config.format || 'a4'
      );

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 5;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      const finalFilename = filename || 
        `${config.filenamePrefix || 'document'}-${new Date().toISOString().split('T')[0]}.pdf`;
      
      const pdfBlob = pdf.output('blob');

      if ('showSaveFilePicker' in window) {
        try {
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: finalFilename,
            types: [{
              description: 'PDF Files',
              accept: { 'application/pdf': ['.pdf'] }
            }]
          });

          const writable = await handle.createWritable();
          await writable.write(pdfBlob);
          await writable.close();

          setIsGenerating(false);
          
          // CHANGED: Call success callback instead of alert
          if (onSuccess) onSuccess();
          
          return true;
        } catch (err: any) {
          if (err.name === 'AbortError') {
            setIsGenerating(false);
            return false;
          }
          throw err;
        }
      } else {
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = finalFilename;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 100);

        setIsGenerating(false);
        
        // CHANGED: Call success callback instead of alert
        if (onSuccess) onSuccess();
        
        return true;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error generating PDF:', err);
      setIsGenerating(false);
      return false;
    }
  };

  return {
    generatePDF,
    isGenerating,
    error
  };
};
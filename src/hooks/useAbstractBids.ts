// hooks/useAbstractBids.ts

import { useState } from 'react';
import { AbstractBidsFormData, AbstractBidsItem, DEFAULT_ABSTRACT_BIDS_FORM_DATA } from '../types/abstract-bids.types';
import { useSuccessModal } from './ui-hooks/useSuccessModal';
import { useFormHistory } from './ui-hooks/useFormHistory';

export const useAbstractBids = () => {
  const [formData, setFormData] = useState<AbstractBidsFormData>(DEFAULT_ABSTRACT_BIDS_FORM_DATA);
  
  // Sample bidder names
  const bidderNames = [
    'DOUBLE R SPORTS AND CORPORATE WEAR',
    'RCL TAILORING SHOP',
    'EDZ TAILORING SHOP'
  ];
  
  // Sample items with bidder data
  const [items] = useState<AbstractBidsItem[]>([
    {
      id: '1',
      itemNo: 1,
      quantity: '16',
      unit: 'PCS',
      description: 'JERSEY UNIFORM',
      bidders: [
        { id: 'b1-1', name: bidderNames[0], unitPrice: '650.00', totalValue: '10,400.00' },
        { id: 'b1-2', name: bidderNames[1], unitPrice: '750.00', totalValue: '12,000.00' },
        { id: 'b1-3', name: bidderNames[2], unitPrice: '800.00', totalValue: '12,800.00' }
      ]
    }
  ]);
  
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const successModal = useSuccessModal();
  const historyModal = useFormHistory('abstract-bids');

  const updateFormData = (updates: Partial<AbstractBidsFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSaveDraft = () => {
    console.log('Saving Abstract of Bids draft...', formData);
    // TODO: Implement API call to save draft
    successModal.showSuccess(
      'Your Abstract of Bids has been saved as draft.',
      'Draft Saved'
    );
  };

  const handleSubmitForApproval = () => {
    console.log('Submitting Abstract of Bids for approval...', formData);
    // TODO: Implement API call to submit for approval
    successModal.showSuccess(
      'Your Abstract of Bids has been submitted for approval.',
      'Submitted Successfully'
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);

      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      await new Promise(resolve => setTimeout(resolve, 100));
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      await new Promise(resolve => setTimeout(resolve, 100));

      const html2canvas = (window as any).html2canvas;
      const jsPDFLib = (window as any).jspdf;

      if (!html2canvas || !jsPDFLib || !jsPDFLib.jsPDF) {
        throw new Error('Libraries failed to load');
      }

      const { jsPDF } = jsPDFLib;
      const element = document.getElementById('printable-area');
      
      if (!element) {
        throw new Error('Print area not found');
      }

      const originalDisplay = element.style.display;
      element.style.display = 'block';
      element.style.position = 'absolute';
      element.style.left = '-9999px';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      element.style.display = originalDisplay;
      element.style.position = '';
      element.style.left = '';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'legal'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const margin = 10;
      const availableWidth = pdfWidth - (2 * margin);
      const availableHeight = pdfHeight - (2 * margin);
      const widthRatio = availableWidth / imgWidth;
      const scaledHeight = imgHeight * widthRatio;

      if (scaledHeight <= availableHeight) {
        pdf.addImage(imgData, 'PNG', margin, margin, availableWidth, scaledHeight);
      } else {
        let remainingHeight = scaledHeight;
        let sourceY = 0;
        let pageNumber = 0;

        while (remainingHeight > 0) {
          if (pageNumber > 0) pdf.addPage();

          const heightForThisPage = Math.min(availableHeight, remainingHeight);
          const sourceHeight = heightForThisPage / widthRatio;
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvas.width;
          pageCanvas.height = sourceHeight;
          const pageCtx = pageCanvas.getContext('2d');

          if (pageCtx) {
            pageCtx.drawImage(
              canvas,
              0, sourceY,
              canvas.width, sourceHeight,
              0, 0,
              canvas.width, sourceHeight
            );
            const pageImgData = pageCanvas.toDataURL('image/png');
            pdf.addImage(pageImgData, 'PNG', margin, margin, availableWidth, heightForThisPage);
          }

          sourceY += sourceHeight;
          remainingHeight -= heightForThisPage;
          pageNumber++;
        }
      }

      const pdfBlob = pdf.output('blob');
      const defaultFilename = `AbstractOfBids-${new Date().toISOString().split('T')[0]}.pdf`;

      if ('showSaveFilePicker' in window) {
        try {
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: defaultFilename,
            types: [{
              description: 'PDF Files',
              accept: { 'application/pdf': ['.pdf'] }
            }]
          });
          const writable = await handle.createWritable();
          await writable.write(pdfBlob);
          await writable.close();

          successModal.showSuccess('Your PDF has been saved successfully!', 'PDF Saved');
        } catch (err: any) {
          if (err.name !== 'AbortError') {
            throw err;
          }
        }
      } else {
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = defaultFilename;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 100);

        successModal.showSuccess('Your PDF has been downloaded successfully!', 'PDF Generated');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    formData,
    items,
    bidderNames,
    showPreview,
    isGenerating,
    setShowPreview,
    updateFormData,
    handleSaveDraft,
    handleSubmitForApproval,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    successModal: {
      isOpen: successModal.isOpen,
      onClose: successModal.closeModal,
      title: successModal.modalTitle,
      message: successModal.modalMessage
    },
    historyModal: {
      isOpen: historyModal.showHistoryModal,
      onClose: historyModal.handleCloseHistory,
      items: historyModal.historyItems,
      onViewHistory: historyModal.handleViewHistory,
      onSelectItem: historyModal.handleSelectItem
    }
  };
};

export default useAbstractBids;
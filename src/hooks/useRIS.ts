// hooks/useRIS.ts

import { useState } from 'react';
import { RISFormData, RISItem, DEFAULT_RIS_FORM_DATA } from '../types/ris.types';
import { useSuccessModal } from './ui-hooks/useSuccessModal';
import { ApprovedFormItem } from '../components/ui/ApprovedFormsModal';

export const useRIS = () => {
  const [formData, setFormData] = useState<RISFormData>(DEFAULT_RIS_FORM_DATA);
  const [items] = useState<RISItem[]>([
    {
      id: '1',
      itemNo: 1,
      stockNo: 'BP-2025-001',
      unitOfIssue: 'ream',
      description: 'Bond Paper, A4 size, 80gsm',
      requisitionQty: '10',
      issuanceQty: '10',
      remarks: ''
    },
    {
      id: '2',
      itemNo: 2,
      stockNo: 'BP-2025-002',
      unitOfIssue: 'box',
      description: 'Ballpen, black ink',
      requisitionQty: '5',
      issuanceQty: '5',
      remarks: ''
    },
    {
      id: '3',
      itemNo: 3,
      stockNo: 'ST-2025-001',
      unitOfIssue: 'pcs',
      description: 'Stapler, heavy duty',
      requisitionQty: '3',
      issuanceQty: '3',
      remarks: ''
    }
  ]);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showApprovedModal, setShowApprovedModal] = useState(false);

  // Mock approved forms data - Replace with API call
  const [approvedForms] = useState<ApprovedFormItem[]>([
    {
      id: 'ris-1',
      formNumber: 'RIS-2024-001',
      title: 'Office Supplies Request - Finance Department',
      dateApproved: '2024-11-15',
      approvedBy: 'John Doe',
      department: 'Finance'
    },
    {
      id: 'ris-2',
      formNumber: 'RIS-2024-002',
      title: 'IT Equipment Request',
      dateApproved: '2024-11-20',
      approvedBy: 'Jane Smith',
      department: 'IT'
    },
    {
      id: 'ris-3',
      formNumber: 'RIS-2024-003',
      title: 'Stationery Items - HR Department',
      dateApproved: '2024-11-25',
      approvedBy: 'John Doe',
      department: 'HR'
    }
  ]);

  const successModal = useSuccessModal();

  const updateFormData = (updates: Partial<RISFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Changed from handleSaveDraft to handleUpdate
  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      console.log('Updating approved RIS...', formData);
      
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // const response = await fetch('/api/ris/update', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ formData, items })
      // });
      
      // if (!response.ok) throw new Error('Update failed');
      
      successModal.showSuccess(
        'Your Requisition & Issue Slip has been updated successfully.',
        'RIS Updated'
      );
    } catch (error) {
      console.error('Error updating RIS:', error);
      successModal.showSuccess(
        'Failed to update the RIS. Please try again.',
        'Update Failed'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // Load an approved form when selected from the modal
  const handleSelectApprovedForm = async (form: ApprovedFormItem) => {
    try {
      console.log('Loading approved form:', form);
      
      // TODO: Replace with actual API call to fetch full form data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // const response = await fetch(`/api/ris/approved/${form.id}`);
      // if (!response.ok) throw new Error('Failed to load form');
      // const fullData = await response.json();
      
      // Mock loading form data
      setFormData({
        ...DEFAULT_RIS_FORM_DATA,
        office: form.department || '',
        reference: '',
        fund: '01',
        risNo: form.formNumber,
        date: form.dateApproved,
        purpose: form.title,
        approvedBy: {
          signature: '',
          name: form.approvedBy,
          position: 'Department Head',
          date: form.dateApproved
        }
      });
      
      setShowApprovedModal(false);
      
      successModal.showSuccess(
        `Successfully loaded ${form.formNumber}`,
        'Form Loaded'
      );
    } catch (error) {
      console.error('Error loading approved form:', error);
      successModal.showSuccess(
        'Failed to load the approved form. Please try again.',
        'Load Failed'
      );
    }
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

      // Load libraries
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

      // Temporarily show element for capture
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

      // Restore original display
      element.style.display = originalDisplay;
      element.style.position = '';
      element.style.left = '';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter'
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
        // Multi-page handling
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
      const defaultFilename = `RIS-${formData.risNo || 'draft'}-${new Date().toISOString().split('T')[0]}.pdf`;

      // Try to use File System Access API
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
        // Fallback download
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
    showPreview,
    isGenerating,
    isUpdating,
    setShowPreview,
    updateFormData,
    handleUpdate,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    successModal: {
      isOpen: successModal.isOpen,
      onClose: successModal.closeModal,
      title: successModal.modalTitle,
      message: successModal.modalMessage
    },
    approvedModal: {
      isOpen: showApprovedModal,
      onClose: () => setShowApprovedModal(false),
      onViewApproved: () => setShowApprovedModal(true),
      items: approvedForms,
      onSelectItem: handleSelectApprovedForm
    }
  };
};

export default useRIS;
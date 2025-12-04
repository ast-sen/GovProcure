import { useState } from 'react';
import { AbstractBidsFormData, AbstractBidsItem, DEFAULT_ABSTRACT_BIDS_FORM_DATA } from '../types/abstract-bids.types';
import { ApprovedFormItem } from '../components/ui/ApprovedFormsModal';

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
  const [isUpdating, setIsUpdating] = useState(false);
  const [showApprovedModal, setShowApprovedModal] = useState(false);

  // Mock approved forms data - Replace with API call
  const [approvedForms] = useState<ApprovedFormItem[]>([
    {
      id: 'ab-1',
      formNumber: 'AB-2024-001',
      title: 'Construction Materials Bidding',
      dateApproved: '2024-11-08',
      approvedBy: 'John Doe',
      department: 'Engineering'
    },
    {
      id: 'ab-2',
      formNumber: 'AB-2024-002',
      title: 'IT Equipment Procurement',
      dateApproved: '2024-11-15',
      approvedBy: 'Jane Smith',
      department: 'IT'
    },
    {
      id: 'ab-3',
      formNumber: 'AB-2024-003',
      title: 'Office Furniture Supply',
      dateApproved: '2024-11-22',
      approvedBy: 'John Doe',
      department: 'Admin'
    }
  ]);

  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    title: '',
    message: '',
  });

  const updateFormData = (updates: Partial<AbstractBidsFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Changed from handleSaveDraft to handleUpdate
  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      console.log('Updating approved Abstract of Bids...', formData);
      
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // const response = await fetch('/api/abstract-bids/update', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ formData, items })
      // });
      
      // if (!response.ok) throw new Error('Update failed');
      
      setSuccessModal({
        isOpen: true,
        title: 'Abstract of Bids Updated',
        message: 'Your Abstract of Bids has been updated successfully.'
      });
    } catch (error) {
      console.error('Error updating Abstract of Bids:', error);
      setSuccessModal({
        isOpen: true,
        title: 'Update Failed',
        message: 'Failed to update the Abstract of Bids. Please try again.'
      });
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
      
      // const response = await fetch(`/api/abstract-bids/approved/${form.id}`);
      // if (!response.ok) throw new Error('Failed to load form');
      // const fullData = await response.json();
      
      // Mock loading form data
      setFormData({
        ...DEFAULT_ABSTRACT_BIDS_FORM_DATA,
        openedOn: form.dateApproved,
        openedAt: form.department || '',
        openedAtTime: '10:00 AM',
        forFurnishing: form.title,
        forOffice: form.department || '',
        awardRecommendedTo: form.supplier || ''
      });
      
      // You would also load the items and bidders from the API
      // setItems(fullData.items);
      
      setShowApprovedModal(false);
      
      setSuccessModal({
        isOpen: true,
        title: 'Form Loaded',
        message: `Successfully loaded ${form.formNumber}`
      });
    } catch (error) {
      console.error('Error loading approved form:', error);
      setSuccessModal({
        isOpen: true,
        title: 'Load Failed',
        message: 'Failed to load the approved form. Please try again.'
      });
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

          setSuccessModal({
            isOpen: true,
            title: 'PDF Saved',
            message: 'Your PDF has been saved successfully!'
          });
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

        setSuccessModal({
          isOpen: true,
          title: 'PDF Generated',
          message: 'Your PDF has been downloaded successfully!'
        });
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
    isUpdating,
    setShowPreview,
    updateFormData,
    handleUpdate,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    successModal: {
      isOpen: successModal.isOpen,
      onClose: () => setSuccessModal(prev => ({ ...prev, isOpen: false })),
      title: successModal.title,
      message: successModal.message
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

export default useAbstractBids;
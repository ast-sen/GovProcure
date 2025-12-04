import { useState } from 'react';
import { POItem, POFormData } from '../types/purchase-order.types';
import { ApprovedFormItem } from '../components/ui/ApprovedFormsModal';

export const usePurchaseOrder = () => {
  const [items, setItems] = useState<POItem[]>([
    {
      id: '1',
      itemNo: 1,
      quantity: 10,
      unit: 'pcs',
      particulars: 'Bond Paper, A4 size, 80gsm',
      unitCost: '',
      amount: '',
    },
    {
      id: '2',
      itemNo: 2,
      quantity: 5,
      unit: 'box',
      particulars: 'Ballpen, black ink',
      unitCost: '',
      amount: '',
    },
    {
      id: '3',
      itemNo: 3,
      quantity: 3,
      unit: 'pcs',
      particulars: 'Stapler, heavy duty',
      unitCost: '',
      amount: '',
    },
  ]);

  const [formData, setFormData] = useState<POFormData>({
    supplierAddress: '',
    gentlemen: '',
    placeOfDelivery: 'KADINGILAN, BUKIDNON',
    dateOfDelivery: '',
    deliveryTerm: '',
    paymentTerm: '',
    conformeDate: new Date().toISOString().split('T')[0],
  });

  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showApprovedModal, setShowApprovedModal] = useState(false);

  // Mock approved forms data - Replace with API call
  const [approvedForms] = useState<ApprovedFormItem[]>([
    {
      id: 'po-1',
      formNumber: 'PO-2024-001',
      title: 'Office Supplies Purchase',
      dateApproved: '2024-11-15',
      approvedBy: 'John Doe',
      amount: 25000,
      supplier: 'ABC Office Supplies Inc.'
    },
    {
      id: 'po-2',
      formNumber: 'PO-2024-002',
      title: 'IT Equipment Purchase',
      dateApproved: '2024-11-20',
      approvedBy: 'Jane Smith',
      amount: 150000,
      supplier: 'Tech Solutions Corp.'
    },
    {
      id: 'po-3',
      formNumber: 'PO-2024-003',
      title: 'Furniture and Fixtures',
      dateApproved: '2024-11-25',
      approvedBy: 'John Doe',
      amount: 85000,
      supplier: 'Modern Office Furniture'
    }
  ]);

  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    title: '',
    message: '',
  });

  const updateFormData = (updates: Partial<POFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const updateItem = (id: string, field: 'unitCost' | 'amount', value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        if (field === 'unitCost') {
          const unitCost = parseFloat(value) || 0;
          updatedItem.amount = (item.quantity * unitCost).toFixed(2);
        }
        
        if (field === 'amount' && item.quantity > 0) {
          const amount = parseFloat(value) || 0;
          updatedItem.unitCost = (amount / item.quantity).toFixed(2);
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0).toFixed(2);
  };

  const calculatePenalty = () => {
    const total = parseFloat(calculateTotal());
    return (total * 0.001).toFixed(2);
  };

  // Changed from handleSave to handleUpdate
  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      console.log('Updating approved Purchase Order...');
      console.log('Form Data:', formData);
      console.log('Items:', items);
      console.log('Total:', calculateTotal());
      
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // const response = await fetch('/api/purchase-orders/update', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ formData, items })
      // });
      
      // if (!response.ok) throw new Error('Update failed');
      
      setSuccessModal({
        isOpen: true,
        title: 'Purchase Order Updated',
        message: 'Your Purchase Order has been updated successfully.'
      });
    } catch (error) {
      console.error('Error updating Purchase Order:', error);
      setSuccessModal({
        isOpen: true,
        title: 'Update Failed',
        message: 'Failed to update the Purchase Order. Please try again.'
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
      
      // const response = await fetch(`/api/purchase-orders/approved/${form.id}`);
      // if (!response.ok) throw new Error('Failed to load form');
      // const fullData = await response.json();
      
      // Mock loading form data
      setFormData({
        supplierAddress: form.supplier || '',
        gentlemen: form.supplier || '',
        placeOfDelivery: 'KADINGILAN, BUKIDNON',
        dateOfDelivery: form.dateApproved,
        deliveryTerm: '30 days',
        paymentTerm: 'Net 30',
        conformeDate: form.dateApproved
      });
      
      // You would also load the items from the API
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
      const downloadBtn = document.getElementById('download-btn');
      if (downloadBtn) {
        downloadBtn.innerHTML = '<span>Loading libraries...</span>';
      }

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
        alert('Print area not found');
        return;
      }

      if (downloadBtn) {
        downloadBtn.innerHTML = '<span>Generating PDF...</span>';
      }

      const originalDisplay = element.style.display;
      element.style.display = 'block';
      element.style.position = 'absolute';
      element.style.left = '-9999px';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      element.style.display = originalDisplay;
      element.style.position = '';
      element.style.left = '';

      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'landscape',
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
        let remainingHeight = scaledHeight;
        let sourceY = 0;
        let pageNumber = 0;
        
        while (remainingHeight > 0) {
          if (pageNumber > 0) {
            pdf.addPage();
          }
          
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
      const defaultFilename = `PO-${new Date().toISOString().split('T')[0]}.pdf`;

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
      const downloadBtn = document.getElementById('download-btn');
      if (downloadBtn) {
        downloadBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg><span>PDF</span>';
      }
    }
  };

  return {
    formData,
    items,
    showPreview,
    isGenerating,
    isUpdating,
    setShowPreview,
    updateItem,
    updateFormData,
    calculateTotal,
    calculatePenalty,
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

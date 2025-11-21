import { useState } from 'react';
import { PPMPItem, PPMPFormData } from '../types/ppmp.types';
import { INITIAL_PPMP_ITEM } from '../utils/constants/ppmp.constants';
import { useFormPDF } from './shared/useFormPDF';
import { useSuccessModal } from './ui-hooks/useSuccessModal'; 
import { useFormHistory } from './ui-hooks/useFormHistory';

export const usePPMP = () => {
  const [showPreview, setShowPreview] = useState(false);
  const { generatePDF, isGenerating } = useFormPDF({
    orientation: 'landscape',
    format: 'legal',
    filenamePrefix: 'PPMP'
  });
  
  // ADDED: Success modal hook
  const { isOpen, modalMessage, modalTitle, showSuccess, closeModal } = useSuccessModal();

   const {
    showHistoryModal,
    historyItems,
    handleViewHistory,
    handleCloseHistory,
    handleSelectItem
  } = useFormHistory('purchase-request');

  const [formData, setFormData] = useState<PPMPFormData>({
    endUserName: '',
    officeAgency: '',
    preparedBy: '',
    approvedBy: '',
  });

  const [items, setItems] = useState<PPMPItem[]>([
    { id: '1', ...INITIAL_PPMP_ITEM }
  ]);

  const addNewItem = () => {
    const newItem: PPMPItem = {
      id: Date.now().toString(),
      ...INITIAL_PPMP_ITEM
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof PPMPItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const updateFormData = (updates: Partial<PPMPFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Items:', items);
    
    // CHANGED: Show success modal instead of alert
    showSuccess('PPMP has been saved successfully!', 'PPMP Saved');
  };

  const handlePrint = () => {
    window.print();
  };

   const handleSaveDraft = () => {
    console.log('Saving as draft...');
    console.log('Form Data:', formData);
    console.log('Items:', items);
    showSuccess('Purchase Request has been saved as draft!', 'Draft Saved');
  };

  const handleSubmitForApproval = () => {
    console.log('Submitting for approval...');
    console.log('Form Data:', formData);
    console.log('Items:', items);
    showSuccess('Purchase Request has been submitted for approval!', 'Submitted Successfully');
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = async () => {
    const filename = `PPMP-${new Date().toISOString().split('T')[0]}.pdf`;
    
    // CHANGED: Pass success callback
    const success = await generatePDF('printable-area', filename, () => {
      showSuccess('Your PDF has been saved successfully!', 'PDF Saved');
    });
    
    if (!success) {
      console.log('PDF generation cancelled');
    }
  };

  return {
    formData,
    items,
    showPreview,
    isGenerating,
    setShowPreview,
    addNewItem,
    removeItem,
    updateItem,
    updateFormData,
    handleSubmit,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    handleSaveDraft,          
    handleSubmitForApproval,   
    
    // ADDED: Return success modal props
    successModal: {
      isOpen,
      message: modalMessage,
      title: modalTitle,
      onClose: closeModal
    },
    historyModal: {
      isOpen: showHistoryModal,
      items: historyItems,
      onClose: handleCloseHistory,
      onSelectItem: handleSelectItem,
      onViewHistory: handleViewHistory
    }
  };
};
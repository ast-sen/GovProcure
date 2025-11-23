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
  
  const { isOpen, modalMessage, modalTitle, showSuccess, closeModal } = useSuccessModal();
  
  // Save draft modal state
  const [saveDraftModalOpen, setSaveDraftModalOpen] = useState(false);
  const [saveDraftLoading, setSaveDraftLoading] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');

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
    transactionNumber: '',
  });

  const [items, setItems] = useState<PPMPItem[]>([
    { id: '1', ...INITIAL_PPMP_ITEM }
  ]);

  const addNewItem = (category?: string) => {
    const newItem: PPMPItem = {
      id: Date.now().toString(),
      ...INITIAL_PPMP_ITEM,
      category: category || 'COMMON USED SUPPLIES'
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
    showSuccess('PPMP has been saved successfully!', 'PPMP Saved');
  };

  const handlePrint = () => {
    window.print();
  };

  // Internal save draft logic (without modal)
  const saveDraft = (title: string) => {
    console.log('Saving as draft with title:', title);
    console.log('Form Data:', formData);
    console.log('Items:', items);
    // Add your actual save logic here (API call, localStorage, etc.)
  };

  // Handler for save draft modal
  const handleSaveDraftWithTitle = async (title: string) => {
    setSaveDraftLoading(true);
    try {
      // Store the title
      setDraftTitle(title);
      
      // Call save draft logic
      saveDraft(title);
      
      // Close modal and show success
      setSaveDraftModalOpen(false);
      showSuccess(`Your draft "${title}" has been saved successfully!`, 'Draft Saved');
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setSaveDraftLoading(false);
    }
  };

  // Legacy handler (if still needed elsewhere)
  const handleSaveDraft = () => {
    setSaveDraftModalOpen(true);
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
    
    const success = await generatePDF('printable-area', filename, () => {
      showSuccess('Your PDF has been saved successfully!', 'PDF Saved');
    });
    
    if (!success) {
      console.log('PDF generation cancelled');
    }
  };

  const saveDraftModal = {
    isOpen: saveDraftModalOpen,
    isLoading: saveDraftLoading,
    open: () => setSaveDraftModalOpen(true),
    close: () => setSaveDraftModalOpen(false),
    onSave: handleSaveDraftWithTitle,
  };

  return {
    formData,
    items,
    showPreview,
    isGenerating,
    draftTitle,
    saveDraftModal,
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
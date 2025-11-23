import { useState } from 'react';
import { PRItem, PRFormData } from '../types/purchase-request.types';
import { useFormPDF } from './shared/useFormPDF';
import { useSuccessModal } from './ui-hooks/useSuccessModal'; 
import { useFormHistory } from './ui-hooks/useFormHistory';

const INITIAL_PR_ITEM: Omit<PRItem, 'id' | 'itemNo'> = {
  quantity: '',
  unitOfIssue: '',
  itemDescription: '',
  estimatedUnitCost: '',
  estimatedCost: '',
};

export const usePurchaseRequest = () => {
  const [showPreview, setShowPreview] = useState(false);
  const { generatePDF, isGenerating } = useFormPDF({
    orientation: 'portrait',
    format: 'a4',
    filenamePrefix: 'PR'
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

  const [formData, setFormData] = useState<PRFormData>({
    department: '',
    section: '',
    prNo: '',
    date: new Date().toISOString().split('T')[0],
    purpose: '',
    requestedBy: { name: '', designation: '', signature: '' },
    approvedBy: { name: 'Municipal Mayor', designation: 'Head of Office/Department', signature: '' }
  });

  const [items, setItems] = useState<PRItem[]>([
    { id: '1', itemNo: 1, ...INITIAL_PR_ITEM }
  ]);

  const addNewItem = () => {
    const newItem: PRItem = {
      id: Date.now().toString(),
      itemNo: items.length + 1,
      ...INITIAL_PR_ITEM
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      const updatedItems = items.filter(item => item.id !== id);
      const renumberedItems = updatedItems.map((item, index) => ({
        ...item,
        itemNo: index + 1
      }));
      setItems(renumberedItems);
    }
  };

  const updateItem = (id: string, field: keyof PRItem, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        if (field === 'quantity' || field === 'estimatedUnitCost') {
          const qty = parseFloat(field === 'quantity' ? value : updatedItem.quantity) || 0;
          const unitCost = parseFloat(field === 'estimatedUnitCost' ? value : updatedItem.estimatedUnitCost) || 0;
          updatedItem.estimatedCost = (qty * unitCost).toFixed(2);
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const updateFormData = (updates: Partial<PRFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      return sum + (parseFloat(item.estimatedCost) || 0);
    }, 0).toFixed(2);
  };

  // Internal save draft logic
  const saveDraft = (title: string) => {
    console.log('Saving PR as draft with title:', title);
    console.log('Form Data:', formData);
    console.log('Items:', items);
    // Add your actual save logic here (API call, localStorage, etc.)
  };

  // Handler for save draft modal
  const handleSaveDraftWithTitle = async (title: string) => {
    setSaveDraftLoading(true);
    try {
      setDraftTitle(title);
      saveDraft(title);
      setSaveDraftModalOpen(false);
      showSuccess(`Your draft "${title}" has been saved successfully!`, 'Draft Saved');
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setSaveDraftLoading(false);
    }
  };

  // Opens the save draft modal
  const handleSaveDraft = () => {
    setSaveDraftModalOpen(true);
  };

  const handleSubmitForApproval = () => {
    console.log('Submitting for approval...');
    showSuccess('Purchase Request has been submitted for approval!', 'Submitted Successfully');
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Items:', items);
    console.log('Total:', calculateTotal());
    showSuccess('Purchase Request has been saved successfully!', 'Request Saved');
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = async () => {
    const filename = `PR-${formData.prNo || 'draft'}-${new Date().toISOString().split('T')[0]}.pdf`;
    
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
    calculateTotal,
    handleSaveDraft,
    handleSubmitForApproval,
    handleSubmit,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    
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
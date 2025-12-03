import { useState } from 'react';
import { APPItem, APPFormData } from '../types/app.types';
import { INITIAL_APP_ITEM } from '../utils/constants/app.constants';
import { useFormPDF } from './shared/useFormPDF';
import { useSuccessModal } from './ui-hooks/useSuccessModal';
import { useFormHistory } from './ui-hooks/useFormHistory';

export const useAPP = () => {
  const [showPreview, setShowPreview] = useState(false);
  const { generatePDF, isGenerating } = useFormPDF({
    orientation: 'landscape',
    format: 'legal',
    filenamePrefix: 'APP'
  });
  
  const { isOpen, modalMessage, modalTitle, showSuccess, closeModal } = useSuccessModal();
  
  const {
    showHistoryModal,
    historyItems,
    handleViewHistory,
    handleCloseHistory,
    handleSelectItem
  } = useFormHistory('annual-procurement-plan');

  const [formData, setFormData] = useState<APPFormData>({
    department: '',
    officeSection: '',
    preparedBy: '',
    reviewedBy: '',
  });

  const [items, setItems] = useState<APPItem[]>([
    { id: '1', itemNo: 1, ...INITIAL_APP_ITEM }
  ]);

  const addNewItem = () => {
    const newItem: APPItem = {
      id: Date.now().toString(),
      itemNo: items.length + 1,
      ...INITIAL_APP_ITEM
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

  const updateItem = (id: string, field: keyof APPItem, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-calculate total cost
        if (field === 'quantity' || field === 'unitCost') {
          const qty = parseFloat(field === 'quantity' ? value : updatedItem.quantity) || 0;
          const cost = parseFloat(field === 'unitCost' ? value : updatedItem.unitCost) || 0;
          updatedItem.totalCost = (qty * cost).toFixed(2);
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const updateFormData = (updates: Partial<APPFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => {
      return sum + (parseFloat(item.totalCost) || 0);
    }, 0).toFixed(2);
  };

  const handleSaveDraft = () => {
    console.log('Saving APP as draft...');
    console.log('Form Data:', formData);
    console.log('Items:', items);
    showSuccess('Annual Procurement Plan has been saved as draft!', 'Draft Saved');
  };

  const handleSubmitForApproval = () => {
    console.log('Submitting APP for approval...');
    console.log('Form Data:', formData);
    console.log('Items:', items);
    showSuccess('Annual Procurement Plan has been submitted for approval!', 'Submitted Successfully');
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = async () => {
    const filename = `APP-${new Date().toISOString().split('T')[0]}.pdf`;
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
    calculateGrandTotal,
    handleSaveDraft,
    handleSubmitForApproval,
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

import { useState } from 'react';
import { IARItem, IARFormData } from '../types/iar.types';
import { SAMPLE_IAR_ITEMS } from '../utils/constants/iar.constants';
import { useFormPDF } from './shared/useFormPDF';
import { useSuccessModal } from './ui-hooks/useSuccessModal';
import { useFormHistory } from './ui-hooks/useFormHistory';

export const useIAR = () => {
  const [showPreview, setShowPreview] = useState(false);
  const { generatePDF, isGenerating } = useFormPDF({
    orientation: 'landscape',
    format: 'legal',
    filenamePrefix: 'IAR'
  });
  
  const { isOpen, modalMessage, modalTitle, showSuccess, closeModal } = useSuccessModal();
  
  const {
    showHistoryModal,
    historyItems,
    handleViewHistory,
    handleCloseHistory,
    handleSelectItem
  } = useFormHistory('inspection-acceptance');

  const [formData, setFormData] = useState<IARFormData>({
    supplier: '',
    prNo: '',
    prDate: '',
    poNo: '',
    dateReceived: '',
    dateInspected: '',
    inspectionOfficer: '',
    acceptanceComplete: false,
    acceptancePartial: false,
    propertyOfficer: '',
  });

  const [items] = useState<IARItem[]>(SAMPLE_IAR_ITEMS);

  const updateFormData = (updates: Partial<IARFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // ADD THESE TWO NEW FUNCTIONS
  const handleSaveDraft = () => {
    console.log('Saving IAR as draft...');
    console.log('Form Data:', formData);
    console.log('Items:', items);
    showSuccess('Inspection & Acceptance Report has been saved as draft!', 'Draft Saved');
  };

  const handleSubmitForApproval = () => {
    console.log('Submitting IAR for approval...');
    console.log('Form Data:', formData);
    console.log('Items:', items);
    showSuccess('Inspection & Acceptance Report has been submitted for approval!', 'Submitted Successfully');
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = async () => {
    const filename = `IAR-${formData.poNo || 'draft'}-${new Date().toISOString().split('T')[0]}.pdf`;
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
    updateFormData,
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
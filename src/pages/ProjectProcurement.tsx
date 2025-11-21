import React from 'react';
import { PPMPForm } from '../components/forms/ppmp/PPMPForm';
import { PPMPPreviewModal } from '../components/templates/ppmp/PPMPPreviewModal';
import { PPMPPrintTemplate } from '../components/templates/ppmp/PPMPPrintTemplate';
import { SuccessModal } from '../components/ui/SuccessModal';  // ADD THIS
import { usePPMP } from '../hooks/usePPMP';
import { PPMPProps } from '../types/ppmp.types';
import { HistoryModal } from '../components/ui/HistoryModal';

export const Procurement: React.FC<PPMPProps> = ({ onNavigate }) => {
  const {
    formData,
    items,
    showPreview,
    isGenerating,
    setShowPreview,
    addNewItem,
    removeItem,
    updateItem,
    updateFormData,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    handleSaveDraft,        
    handleSubmitForApproval, 
    historyModal,      
    successModal  
  } = usePPMP();

  return (
    <>
      <PPMPForm
        formData={formData}
        items={items}
        onNavigate={onNavigate}
        onUpdateFormData={updateFormData}
        onUpdateItem={updateItem}
        onRemoveItem={removeItem}
        onAddItem={addNewItem}
        onSubmit={handleSaveDraft}
        onSubmitForApproval={handleSubmitForApproval}
        onPrint={handlePrint}
        onPreview={handlePreview}
        onViewHistory={historyModal.onViewHistory}
        onDownloadPDF={handleDownloadPDF}
        isGenerating={isGenerating}
      />
      
      {showPreview && (
        <PPMPPreviewModal
          formData={formData}
          items={items}
          onClose={() => setShowPreview(false)}
          onDownloadPDF={handleDownloadPDF}
          onPrint={handlePrint}
        />
      )}
      
      <PPMPPrintTemplate
        formData={formData}
        items={items}
      />
      
      // ADD THIS SUCCESS MODAL
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={successModal.onClose}
        title={successModal.title}
        message={successModal.message}
      />

      <HistoryModal
              isOpen={historyModal.isOpen}
              onClose={historyModal.onClose}
              items={historyModal.items}
              onSelectItem={historyModal.onSelectItem}
      />
    </>
  );
};

export default Procurement;
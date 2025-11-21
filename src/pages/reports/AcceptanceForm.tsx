import React from 'react';
import { IARForm } from '../../components/forms/iar/IARForm';
import { IARPreviewModal } from '../../components/templates/iar/IARPreviewModal';
import { IARPrintTemplate } from '../../components/templates/iar/IARPrintTemplate';
import { SuccessModal } from '../../components/ui/SuccessModal';
import { HistoryModal } from '../../components/ui/HistoryModal';  // ADD THIS
import { useIAR } from '../../hooks/useIAR';
import { IARProps } from '../../types/iar.types';

export const AcceptanceForm: React.FC<IARProps> = ({ onNavigate }) => {
  const {
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
    successModal,
    historyModal
  } = useIAR();

  return (
    <>
      <IARForm
        formData={formData}
        items={items}
        onNavigate={onNavigate}
        onUpdateFormData={updateFormData}
        onSubmit={handleSaveDraft}           // ADD THIS
        onSubmitForApproval={handleSubmitForApproval}  // ADD THIS
        onPrint={handlePrint}
        onPreview={handlePreview}
        onDownloadPDF={handleDownloadPDF}
        onViewHistory={historyModal.onViewHistory}  // ADD THIS
        isGenerating={isGenerating}
      />
      
      {showPreview && (
        <IARPreviewModal
          formData={formData}
          items={items}
          onClose={() => setShowPreview(false)}
          onDownloadPDF={handleDownloadPDF}
          onPrint={handlePrint}
        />
      )}
      
      <IARPrintTemplate
        formData={formData}
        items={items}
      />
      
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

export default AcceptanceForm;
import React from 'react';
import { PPMPForm } from '../components/forms/ppmp-form/PPMPForm';
import { PPMPPreviewModal } from '../components/templates/ppmp-temp/PPMPPreviewModal';
import { PPMPPrintTemplate } from '../components/templates/ppmp-temp/PPMPPrintTemplate';
import { SuccessModal } from '../components/ui/SuccessModal';
import { HistoryModal } from '../components/ui/HistoryModal';
import SaveDraftModal from '../components/ui/SaveDraftModal';
import { usePPMP } from '../hooks/usePPMP';
import { useSidebarWidth } from '../components/layout/Layout';
import { PPMPProps } from '../types/ppmp.types';

export const Procurement: React.FC<PPMPProps> = ({ onNavigate }) => {
  // Get sidebar width from context
  const { sidebarWidth } = useSidebarWidth();

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
    successModal,
    saveDraftModal, 
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
        sidebarWidth={sidebarWidth}
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

      <SaveDraftModal
        isOpen={saveDraftModal.isOpen}
        onClose={saveDraftModal.close}
        onSave={saveDraftModal.onSave}
        isLoading={saveDraftModal.isLoading}
        docType="PPMP"
        office={formData.officeAgency}
        transactionNumber={formData.transactionNumber}
      />
    </>
  );
};

export default Procurement;
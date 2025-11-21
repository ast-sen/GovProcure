import React from 'react';
import { PRForm } from '../components/forms/purchase-request/PRForm';
import { PRPreviewModal } from '../components/templates/purchase-request/PRPreviewModal';
import { PRPrintTemplate } from '../components/templates/purchase-request/PRPrintTemplate';
import { SuccessModal } from '../components/ui/SuccessModal';
import { HistoryModal } from '../components/ui/HistoryModal';
import { usePurchaseRequest } from '../hooks/usePurchaseRequest';
import { PurchaseRequestProps } from '../types/purchase-request.types';

export const PurchaseRequest: React.FC<PurchaseRequestProps> = ({ onNavigate }) => {
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
    calculateTotal,
    handleSaveDraft,
    handleSubmitForApproval,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    successModal,
    historyModal
  } = usePurchaseRequest();

  return (
    <>
      <PRForm
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
        onDownloadPDF={handleDownloadPDF}
        onViewHistory={historyModal.onViewHistory}  
        calculateTotal={calculateTotal}
        isGenerating={isGenerating}
      />
      
      {showPreview && (
        <PRPreviewModal
          formData={formData}
          items={items}
          calculateTotal={calculateTotal}
          onClose={() => setShowPreview(false)}
          onDownloadPDF={handleDownloadPDF}
          onPrint={handlePrint}
        />
      )}
      
      <PRPrintTemplate
        formData={formData}
        items={items}
        total={calculateTotal()}
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

export default PurchaseRequest;
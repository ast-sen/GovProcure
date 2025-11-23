import React from 'react';
import { PRForm } from '../components/forms/purchase-request-form/PRForm';
import { PRPreviewModal } from '../components/templates/purchase-request-temp/PRPreviewModal';
import { PRPrintTemplate } from '../components/templates/purchase-request-temp/PRPrintTemplate';
import { SuccessModal } from '../components/ui/SuccessModal';
import { HistoryModal } from '../components/ui/HistoryModal';
import { usePurchaseRequest } from '../hooks/usePurchaseRequest';
import { PurchaseRequestProps } from '../types/purchase-request.types';
import { useTheme } from '../context/ThemeContext';

export const PurchaseRequest: React.FC<PurchaseRequestProps> = ({ onNavigate }) => {
  const { styles } = useTheme();
  
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
    <div className={styles.bgMain}>
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
    </div>
  );
};

export default PurchaseRequest;
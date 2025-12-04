import React from 'react';
import { POForm } from '../../components/forms/po-form/POForm';
import { POPreviewModal } from '../../components/templates/purchase-order-temp/POPreviewModal';
import { POPrintTemplate } from '../../components/templates/purchase-order-temp/POPrintTemplate';
import { SuccessModal } from '../../components/ui/SuccessModal';
import { ApprovedFormsModal } from '../../components/ui/ApprovedFormsModal';
import { usePurchaseOrder } from '../../hooks/usePurchaseOrder';
import { PurchaseOrderProps } from '../../types/purchase-order.types';
import { useTheme } from '../../context/ThemeContext';

export const PurchaseOrder: React.FC<PurchaseOrderProps> = ({ onNavigate }) => {
  const { styles } = useTheme();
  
  const {
    formData,
    items,
    showPreview,
    isGenerating,
    isUpdating,
    setShowPreview,
    updateItem,
    updateFormData,
    calculateTotal,
    calculatePenalty,
    handleUpdate,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    successModal,
    approvedModal
  } = usePurchaseOrder();

  return (
    <div className={styles.bgMain}>
      <POForm
        formData={formData}
        items={items}
        onNavigate={onNavigate}
        onUpdateFormData={updateFormData}
        onUpdateItem={updateItem}
        onUpdate={handleUpdate}
        onPrint={handlePrint}
        onPreview={handlePreview}
        onDownloadPDF={handleDownloadPDF}
        onViewApproved={approvedModal.onViewApproved}
        calculateTotal={calculateTotal}
        calculatePenalty={calculatePenalty}
        isGenerating={isGenerating}
        isUpdating={isUpdating}
      />
      
      {showPreview && (
        <POPreviewModal
          formData={formData}
          items={items}
          calculateTotal={calculateTotal}
          onClose={() => setShowPreview(false)}
          onDownloadPDF={handleDownloadPDF}
          onPrint={handlePrint}
        />
      )}
      
      <POPrintTemplate
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
      
      <ApprovedFormsModal
        isOpen={approvedModal.isOpen}
        onClose={approvedModal.onClose}
        items={approvedModal.items}
        onSelectItem={approvedModal.onSelectItem}
        formTypeLabel="Purchase Order"
      />
    </div>
  );
};

export default PurchaseOrder;
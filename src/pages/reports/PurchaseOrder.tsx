import React from 'react';
import { POForm } from '../../components/forms/po-form/POForm';
import { POPreviewModal } from '../../components/templates/purchase-order-temp/POPreviewModal';
import { POPrintTemplate } from '../../components/templates/purchase-order-temp/POPrintTemplate';
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
    setShowPreview,
    updateItem,
    updateFormData,
    calculateTotal,
    calculatePenalty,
    handleSave,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
  } = usePurchaseOrder();

  return (
    <div className={styles.bgMain}>
      <POForm
        formData={formData}
        items={items}
        onNavigate={onNavigate}
        onUpdateFormData={updateFormData}
        onUpdateItem={updateItem}
        onSubmit={handleSave}
        onPrint={handlePrint}
        onPreview={handlePreview}
        onDownloadPDF={handleDownloadPDF}
        calculateTotal={calculateTotal}
        calculatePenalty={calculatePenalty}
        isGenerating={isGenerating}
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
    </div>
  );
};

export default PurchaseOrder;
import React from 'react';
import { APPForm } from '../../components/forms/app-form/APPForm';
import { APPPreviewModal } from '../../components/templates/app-temp/APPPreviewModal';
import { APPPrintTemplate } from '../../components/templates/app-temp/APPPrintTemplate';
import { SuccessModal } from '../../components/ui/SuccessModal';
import { ApprovedFormsModal } from '../../components/ui/ApprovedFormsModal';
import { useAPP } from '../../hooks/useAPP';
import { APPProps } from '../../types/app.types';
import { useTheme } from '../../context/ThemeContext';

export const AnnualProcurementPlan: React.FC<APPProps> = ({ onNavigate }) => {
  const { styles } = useTheme();
  
  const {
    formData,
    items,
    showPreview,
    isGenerating,
    isUpdating,
    setShowPreview,
    addNewItem,
    removeItem,
    updateItem,
    updateFormData,
    calculateGrandTotal,
    handleUpdate,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    successModal,
    approvedModal
  } = useAPP();

  return (
    <div className={styles.bgMain}>
      <style>{`
        @media print {
          @page { 
            size: legal landscape; 
            margin: 0.5in; 
          }
          * { 
            print-color-adjust: exact; 
            -webkit-print-color-adjust: exact; 
          }
          body * { 
            visibility: hidden; 
          }
          #printable-area, #printable-area * { 
            visibility: visible; 
          }
          #printable-area { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
          }
          .no-print { 
            display: none !important; 
          }
        }
      `}</style>

      <APPForm
        formData={formData}
        items={items}
        onNavigate={onNavigate}
        onUpdateFormData={updateFormData}
        onUpdateItem={updateItem}
        onRemoveItem={removeItem}
        onAddItem={addNewItem}
        onUpdate={handleUpdate}
        onPrint={handlePrint}
        onPreview={handlePreview}
        onDownloadPDF={handleDownloadPDF}
        onViewApproved={approvedModal.onViewApproved}
        calculateGrandTotal={calculateGrandTotal}
        isGenerating={isGenerating}
        isUpdating={isUpdating}
      />
      
      {showPreview && (
        <APPPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          formData={formData}
          items={items}
        />
      )}
      
      <APPPrintTemplate
        formData={formData}
        items={items}
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
        formTypeLabel="Annual Procurement Plan"
      />
    </div>
  );
};

export default AnnualProcurementPlan;
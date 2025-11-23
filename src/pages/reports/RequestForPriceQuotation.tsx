import React from 'react';
import { RFQForm } from '../../components/forms/rfq-form/RFQForm';
import { RFQPreviewModal } from '../../components/templates/rfq-temp/RFQPreviewModal';
import { RFQPrintTemplate } from '../../components/templates/rfq-temp/RFQPrintTemplate';
import { SuccessModal } from '../../components/ui/SuccessModal';
import { HistoryModal } from '../../components/ui/HistoryModal';
import { useRFQ } from '../../hooks/useRFQ';
import { RFQProps } from '../../types/rfq.types';
import { useTheme } from '../../context/ThemeContext';

export const RequestForPriceQuotation: React.FC<RFQProps> = ({ onNavigate }) => {
  const { styles } = useTheme();
  
  const {
    formData,
    items,
    showPreview,
    isGenerating,
    setShowPreview,
    updateFormData,
    updateItems,
    handleSaveDraft,
    handleSubmitForApproval,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    successModal,
    historyModal
  } = useRFQ();

  return (
    <div className={styles.bgMain}>
      <style>{`
        @media print {
          @page { 
            size: letter portrait; 
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

      <RFQForm
        formData={formData}
        items={items}
        onNavigate={onNavigate}
        onUpdateFormData={updateFormData}
        onUpdateItems={updateItems}
        onSubmit={handleSaveDraft}
        onSubmitForApproval={handleSubmitForApproval}
        onPrint={handlePrint}
        onPreview={handlePreview}
        onDownloadPDF={handleDownloadPDF}
        onViewHistory={historyModal.onViewHistory}
        isGenerating={isGenerating}
      />
      
      {showPreview && (
        <RFQPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          formData={formData}
          items={items}
        />
      )}
      
      <RFQPrintTemplate
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
    </div>
  );
};

export default RequestForPriceQuotation;
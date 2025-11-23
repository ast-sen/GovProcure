import React from 'react';
import { AbstractBidsForm } from '../../components/forms/abstract-bids-form/AbstractBidsForm';
import { AbstractBidsPreviewModal } from '../../components/templates/abstract-bids-temp/AbstractBidsPreviewModal';
import { AbstractBidsPrintTemplate } from '../../components/templates/abstract-bids-temp/AbstractBidsPrintTemplate';
import { SuccessModal } from '../../components/ui/SuccessModal';
import { HistoryModal } from '../../components/ui/HistoryModal';
import { useAbstractBids } from '../../hooks/useAbstractBids';
import { AbstractBidsProps } from '../../types/abstract-bids.types';
import { useTheme } from '../../context/ThemeContext';

export const AbstractOfBids: React.FC<AbstractBidsProps> = ({ onNavigate }) => {
  const { styles } = useTheme();
  
  const {
    formData,
    items,
    bidderNames,
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
  } = useAbstractBids();

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

      <AbstractBidsForm
        formData={formData}
        items={items}
        bidderNames={bidderNames}
        onNavigate={onNavigate}
        onUpdateFormData={updateFormData}
        onSubmit={handleSaveDraft}
        onSubmitForApproval={handleSubmitForApproval}
        onPrint={handlePrint}
        onPreview={handlePreview}
        onDownloadPDF={handleDownloadPDF}
        onViewHistory={historyModal.onViewHistory}
        isGenerating={isGenerating}
      />
      
      {showPreview && (
        <AbstractBidsPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          formData={formData}
          items={items}
          bidderNames={bidderNames}
        />
      )}
      
      <AbstractBidsPrintTemplate
        formData={formData}
        items={items}
        bidderNames={bidderNames}
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

export default AbstractOfBids;
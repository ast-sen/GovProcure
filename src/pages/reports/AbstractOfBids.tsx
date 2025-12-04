import React from 'react';
import { AbstractBidsForm } from '../../components/forms/abstract-bids-form/AbstractBidsForm';
import { AbstractBidsPreviewModal } from '../../components/templates/abstract-bids-temp/AbstractBidsPreviewModal';
import { AbstractBidsPrintTemplate } from '../../components/templates/abstract-bids-temp/AbstractBidsPrintTemplate';
import { SuccessModal } from '../../components/ui/SuccessModal';
import { ApprovedFormsModal } from '../../components/ui/ApprovedFormsModal';
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
    isUpdating,
    setShowPreview,
    updateFormData,
    handleUpdate,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    successModal,
    approvedModal
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
        onUpdate={handleUpdate}
        onPrint={handlePrint}
        onPreview={handlePreview}
        onDownloadPDF={handleDownloadPDF}
        onViewApproved={approvedModal.onViewApproved}
        isGenerating={isGenerating}
        isUpdating={isUpdating}
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
      
      <ApprovedFormsModal
        isOpen={approvedModal.isOpen}
        onClose={approvedModal.onClose}
        items={approvedModal.items}
        onSelectItem={approvedModal.onSelectItem}
        formTypeLabel="Abstract of Bids"
      />
    </div>
  );
};

export default AbstractOfBids;
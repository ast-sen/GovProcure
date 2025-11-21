import React from 'react';
import { ObligationSlipForm } from '../../components/forms/obligation-slip/ObligationSlipForm';
import { ObligationSlipPreviewModal } from '../../components/templates/os/ObligationSlipPreviewModal';
import { ObligationSlipPrintTemplate } from '../../components/templates/os/ObligationSlipPrintTemplate';
import { SuccessModal } from '../../components/ui/SuccessModal';
import { HistoryModal } from '../../components/ui/HistoryModal';
import { useObligationSlip } from '../../hooks/useObligationSlip';
import { ObligationSlipHistoryItem, ObligationSlipProps } from '../../types/obligation-slip.types';

export const ObligationSlip: React.FC<ObligationSlipProps> = ({ onNavigate }) => {
  const {
    formData,
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
  } = useObligationSlip();

  return (
    <>
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

      <ObligationSlipForm
        formData={formData}
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
        <ObligationSlipPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          formData={formData}
        />
      )}
      
      <ObligationSlipPrintTemplate
        formData={formData}
      />
      
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={successModal.onClose}
        title={successModal.title}
        message={successModal.message}
      />
      
      <HistoryModal<ObligationSlipHistoryItem>
        isOpen={historyModal.isOpen}
        items={historyModal.items}
        onSelectItem={historyModal.onSelectItem}
        onClose={historyModal.onClose}
      />

    </>
  );
};

export default ObligationSlip;



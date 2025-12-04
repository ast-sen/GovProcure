import React from 'react';
import { RISForm } from '../../components/forms/ris-form/RISForm';
import { RISPreviewModal } from '../../components/templates/ris-temp/RISPreviewModal';
import { RISPrintTemplate } from '../../components/templates/ris-temp/RISPrintTemplate';
import { SuccessModal } from '../../components/ui/SuccessModal';
import { ApprovedFormsModal } from '../../components/ui/ApprovedFormsModal';
import { useRIS } from '../../hooks/useRIS';
import { RISProps } from '../../types/ris.types';

export const RequisitionIssueSlip: React.FC<RISProps> = ({ onNavigate }) => {
  const {
    formData,
    items,
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
  } = useRIS();

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

      <RISForm
        formData={formData}
        items={items}
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
        <RISPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          formData={formData}
          items={items}
        />
      )}
      
      <RISPrintTemplate
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
        formTypeLabel="Requisition & Issue Slip"
      />
    </>
  );
};

export default RequisitionIssueSlip;
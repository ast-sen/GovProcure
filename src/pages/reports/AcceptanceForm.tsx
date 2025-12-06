import React from 'react';
import { IARForm } from '../../components/forms/iar-form/IARForm';
import { IARPreviewModal } from '../../components/templates/iar-temp/IARPreviewModal';
import { IARPrintTemplate } from '../../components/templates/iar-temp/IARPrintTemplate';
import { SuccessModal } from '../../components/ui/SuccessModal';
import { ApprovedFormsModal } from '../../components/ui/ApprovedFormsModal';
import { useIAR } from '../../hooks/useIAR';
import { IARProps } from '../../types/iar.types';
import { useTheme } from '../../context/ThemeContext';

export const AcceptanceForm: React.FC<IARProps> = ({ onNavigate }) => {
  const { styles } = useTheme();
  
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
  } = useIAR();

  return (
    <div className={styles.bgMain}>
      <IARForm
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
        <IARPreviewModal
          formData={formData}
          items={items}
          onClose={() => setShowPreview(false)}
          onDownloadPDF={handleDownloadPDF}
          onPrint={handlePrint}
        />
      )}
      
      <IARPrintTemplate
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
        formTypeLabel="Inspection & Acceptance Report"
      />
    </div>
  );
};

export default AcceptanceForm;
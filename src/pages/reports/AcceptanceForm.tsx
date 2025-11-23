import React from 'react';
import { IARForm } from '../../components/forms/iar-form/IARForm';
import { IARPreviewModal } from '../../components/templates/iar-temp/IARPreviewModal';
import { IARPrintTemplate } from '../../components/templates/iar-temp/IARPrintTemplate';
import { SuccessModal } from '../../components/ui/SuccessModal';
import { HistoryModal } from '../../components/ui/HistoryModal';
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
    setShowPreview,
    updateFormData,
    handleSaveDraft,
    handleSubmitForApproval,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    successModal,
    historyModal
  } = useIAR();

  return (
    <div className={styles.bgMain}>
      <IARForm
        formData={formData}
        items={items}
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
      
      <HistoryModal
        isOpen={historyModal.isOpen}
        onClose={historyModal.onClose}
        items={historyModal.items}
        onSelectItem={historyModal.onSelectItem}
      />
    </div>
  );
};

export default AcceptanceForm;
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ObligationSlipFormHeader } from './ObligationSlipFormHeader';
import { ObligationSlipItemsTable } from './ObligationSlipItemsTable';
import { ObligationSlipSignatureSection } from './ObligationSlipSignatureSection';
import { FormActions } from '../shared/FormActions';
import { ObligationSlipFormData, ObligationSlipProps } from '../../../types/obligation-slip.types';
import { useTheme } from '../../../context/ThemeContext';

interface ObligationSlipFormProps extends ObligationSlipProps {
  formData: ObligationSlipFormData;
  onUpdateFormData: (updates: Partial<ObligationSlipFormData>) => void;
  onSubmit: () => void;
  onSubmitForApproval: () => void;
  onPrint: () => void;
  onPreview: () => void;
  onDownloadPDF: () => void;
  onViewHistory: () => void;
  isGenerating?: boolean;
}

export const ObligationSlipForm: React.FC<ObligationSlipFormProps> = ({
  formData,
  onNavigate,
  onUpdateFormData,
  onSubmit,
  onSubmitForApproval,
  onPrint,
  onPreview,
  onDownloadPDF,
  onViewHistory,
  isGenerating = false
}) => {
  const { styles } = useTheme();

  return (
    <div className={`p-6 no-print ${styles.bgMain} min-h-screen`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {onNavigate && (
            <button
              onClick={() => onNavigate('reports')}
              className={`flex items-center gap-2 px-4 py-2 ${styles.textSecondary} ${styles.hoverBg} rounded-lg transition-colors`}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          )}
          <div>
            <h1 className={`text-3xl font-bold ${styles.textPrimary}`}>
              Obligation Slip
            </h1>
            <p className={`${styles.textSecondary} mt-1`}>ANNEX G</p>
          </div>
        </div>
        
        <FormActions
          onSave={onSubmit}
          onSubmit={onSubmitForApproval}
          onPrint={onPrint}
          onPreview={onPreview}
          onDownloadPDF={onDownloadPDF}
          onViewHistory={onViewHistory}
          saveLabel="Save"
          isLoading={isGenerating}
        />
      </div>

      <div className={`${styles.bgCard} rounded-lg shadow max-w-5xl mx-auto`}>
        <ObligationSlipFormHeader 
          formData={formData} 
          onFormDataChange={onUpdateFormData} 
        />
        
        <ObligationSlipItemsTable
          formData={formData}
          onFormDataChange={onUpdateFormData}
        />

        <ObligationSlipSignatureSection
          formData={formData}
          onFormDataChange={onUpdateFormData}
        />
      </div>
    </div>
  );
};
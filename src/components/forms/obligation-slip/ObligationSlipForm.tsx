import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ObligationSlipFormHeader } from './ObligationSlipFormHeader';
import { ObligationSlipItemsTable } from './ObligationSlipItemsTable';
import { ObligationSlipSignatureSection } from './ObligationSlipSignatureSection';
import { FormActions } from '../shared/FormActions';
import { ObligationSlipFormData, ObligationSlipProps } from '../../../types/obligation-slip.types';

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
  return (
    <div className="p-6 no-print bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {onNavigate && (
            <button
              onClick={() => onNavigate('reports')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Obligation Slip
            </h1>
            <p className="text-gray-600 mt-1">ANNEX G</p>
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

      <div className="bg-white rounded-lg shadow max-w-5xl mx-auto">
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
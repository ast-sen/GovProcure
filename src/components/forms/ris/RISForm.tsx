import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { RISFormHeader } from './RISFormHeader';
import { RISItemsTable } from './RISItemsTable';
import { RISSignatureSection } from './RISSignatureSection';
import { FormActions } from '../shared/FormActions';
import { RISItem, RISFormData, RISProps } from '../../../types/ris.types';

interface RISFormProps extends RISProps {
  formData: RISFormData;
  items: RISItem[];
  onUpdateFormData: (updates: Partial<RISFormData>) => void;
  onSubmit: () => void;
  onSubmitForApproval: () => void;
  onPrint: () => void;
  onPreview: () => void;
  onDownloadPDF: () => void;
  onViewHistory: () => void;
  isGenerating?: boolean;
}

export const RISForm: React.FC<RISFormProps> = ({
  formData,
  items,
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
              Requisition & Issue Slip
            </h1>
            <p className="text-gray-600 mt-1">ANNEX RIS</p>
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

      <div className="bg-white rounded-lg shadow max-w-7xl mx-auto">
        <RISFormHeader 
          formData={formData} 
          onFormDataChange={onUpdateFormData} 
        />
        
        <div className="p-6">
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> All item details are loaded from inventory and are read-only.
            </p>
          </div>
          
          <RISItemsTable items={items} />
        </div>

        <RISSignatureSection
          formData={formData}
          onFormDataChange={onUpdateFormData}
        />
      </div>
    </div>
  );
};

export default RISForm;
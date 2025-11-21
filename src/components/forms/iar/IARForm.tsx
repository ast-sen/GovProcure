import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { IARFormHeader } from './IARFormHeader';
import { IARItemsTable } from './IARTItemsTable';
import { IARInspectionSection } from './IARInspectionSection';
import { IARAcceptanceSection } from './IARAcceptanceSection';
import { FormActions } from '../shared/FormActions';
import { IARItem, IARFormData, IARProps } from '../../../types/iar.types';

interface IARFormProps extends IARProps {
  formData: IARFormData;
  items: IARItem[];
  onUpdateFormData: (updates: Partial<IARFormData>) => void;
  onSubmit: () => void;
  onSubmitForApproval: () => void;  // ADD THIS
  onPrint: () => void;
  onPreview: () => void;
  onDownloadPDF: () => void;
  onViewHistory: () => void;  // ADD THIS
  isGenerating?: boolean;
}

export const IARForm: React.FC<IARFormProps> = ({
  formData,
  items,
  onNavigate,
  onUpdateFormData,
  onSubmit,
  onSubmitForApproval,  // ADD THIS
  onPrint,
  onPreview,
  onDownloadPDF,
  onViewHistory,  // ADD THIS
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
              Inspection & Acceptance Report
            </h1>
            <p className="text-gray-600 mt-1">ANNEX G-7</p>
          </div>
        </div>
        
        <FormActions
          onSave={onSubmit}
          onSubmit={onSubmitForApproval}  // ADD THIS
          onPrint={onPrint}
          onPreview={onPreview}
          onDownloadPDF={onDownloadPDF}
          onViewHistory={onViewHistory}  // ADD THIS
          saveLabel="Save"
          isLoading={isGenerating}
        />
      </div>

      <div className="bg-white rounded-lg shadow max-w-7xl mx-auto">
        <IARFormHeader formData={formData} onUpdate={onUpdateFormData} />
        
        <div className="p-6">
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> All item details are loaded from the Purchase Order and are read-only.
            </p>
          </div>
          
          <IARItemsTable items={items} />
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <IARInspectionSection
            inspectionOfficer={formData.inspectionOfficer}
            onUpdate={(inspectionOfficer) => onUpdateFormData({ inspectionOfficer })}
          />
          
          <IARAcceptanceSection
            acceptanceComplete={formData.acceptanceComplete}
            acceptancePartial={formData.acceptancePartial}
            propertyOfficer={formData.propertyOfficer}
            onUpdate={onUpdateFormData}
          />
        </div>
      </div>
    </div>
  );
};
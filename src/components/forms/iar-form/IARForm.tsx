import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { IARFormHeader } from './IARFormHeader';
import { IARItemsTable } from './IARTItemsTable';
import { IARInspectionSection } from './IARInspectionSection';
import { IARAcceptanceSection } from './IARAcceptanceSection';
import { FormActions } from '../shared/FormActions';
import { IARItem, IARFormData, IARProps } from '../../../types/iar.types';
import { useTheme } from '../../../context/ThemeContext';

interface IARFormProps extends IARProps {
  formData: IARFormData;
  items: IARItem[];
  onUpdateFormData: (updates: Partial<IARFormData>) => void;
  onSubmit: () => void;
  onSubmitForApproval: () => void;
  onPrint: () => void;
  onPreview: () => void;
  onDownloadPDF: () => void;
  onViewHistory: () => void;
  isGenerating?: boolean;
}

export const IARForm: React.FC<IARFormProps> = ({
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
  const { styles, darkMode } = useTheme();

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
              Inspection & Acceptance Report
            </h1>
            <p className={`${styles.textSecondary} mt-1`}>ANNEX G-7</p>
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

      <div className={`${styles.bgCard} rounded-lg shadow max-w-7xl mx-auto`}>
        <IARFormHeader formData={formData} onUpdate={onUpdateFormData} />
        
        <div className="p-6">
          <div className={`mb-4 p-4 ${darkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded-lg`}>
            <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
              <strong>Note:</strong> All item details are loaded from the Purchase Order and are read-only.
            </p>
          </div>
          
          <IARItemsTable items={items} />
        </div>

        <div className={`p-6 border-t ${styles.border} ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
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
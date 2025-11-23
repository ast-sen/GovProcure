import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { RFQFormHeader } from './RFQFormHeader';
import { RFQItemsTable } from './RFQItemsTable';
import { RFQFooterSection } from './RFQFooterSection';
import { FormActions } from '../shared/FormActions';
import { RFQFormData, RFQItem, RFQProps } from '../../../types/rfq.types';
import { useTheme } from '../../../context/ThemeContext';

interface RFQFormProps extends RFQProps {
  formData: RFQFormData;
  items: RFQItem[];
  onUpdateFormData: (updates: Partial<RFQFormData>) => void;
  onUpdateItems: (items: RFQItem[]) => void;
  onSubmit: () => void;
  onSubmitForApproval: () => void;
  onPrint: () => void;
  onPreview: () => void;
  onDownloadPDF: () => void;
  onViewHistory: () => void;
  isGenerating?: boolean;
}

export const RFQForm: React.FC<RFQFormProps> = ({
  formData,
  items,
  onNavigate,
  onUpdateFormData,
  onUpdateItems,
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
              Request for Price Quotation (RFQ)
            </h1>
            <p className={`${styles.textSecondary} mt-1`}>Office of the Bids and Awards Committee</p>
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
        <RFQFormHeader 
          formData={formData} 
          onFormDataChange={onUpdateFormData} 
        />
        
        <RFQItemsTable
          items={items}
          onItemsChange={onUpdateItems}
        />

        <RFQFooterSection
          formData={formData}
          onFormDataChange={onUpdateFormData}
        />
      </div>
    </div>
  );
};
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { APPFormHeader } from './APPFormHeader';
import { APPItemsTable } from './APPItemsTable';
import { APPFormFooter } from './APPFormFooter';
import { ReportFormActions } from '../shared/ReportFormActions.tsx';
import { APPItem, APPFormData, APPProps } from '../../../types/app.types';
import { useTheme } from '../../../context/ThemeContext';

interface APPFormProps extends APPProps {
  formData: APPFormData;
  items: APPItem[];
  onUpdateFormData: (updates: Partial<APPFormData>) => void;
  onUpdateItem: (id: string, field: keyof APPItem, value: string) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
  onUpdate: () => void; 
  onPrint: () => void;
  onPreview: () => void;
  onDownloadPDF: () => void;
  onViewApproved: () => void;  
  calculateGrandTotal: () => string;
  isGenerating?: boolean;
  isUpdating?: boolean;  // New loading state
}

export const APPForm: React.FC<APPFormProps> = ({
  formData,
  items,
  onNavigate,
  onUpdateFormData,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
  onUpdate,
  onPrint,
  onPreview,
  onDownloadPDF,
  onViewApproved,
  calculateGrandTotal,
  isGenerating = false,
  isUpdating = false
}) => {
  const { styles } = useTheme();

  return (
    <div className={`p-6 no-print ${styles.bgMain} min-h-screen`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {onNavigate && (
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 ${styles.textSecondary} ${styles.hoverBg} rounded-lg transition-colors`}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          )}
          <div>
            <h1 className={`text-3xl font-bold ${styles.textPrimary}`}>
              Annual Procurement Plan (APP)
            </h1>
            <p className={`${styles.textSecondary} mt-1`}>For the year 2025</p>
          </div>
        </div>
        
        <ReportFormActions
          onUpdate={onUpdate}
          onPrint={onPrint}
          onPreview={onPreview}
          onDownloadPDF={onDownloadPDF}
          onViewApproved={onViewApproved}
          updateLabel="Update APP"
          isLoading={isGenerating}
          isUpdating={isUpdating}
        />
      </div>

      <div className={`${styles.bgCard} rounded-lg shadow`}>
        <APPFormHeader formData={formData} onUpdate={onUpdateFormData} />
        
        <APPItemsTable
          items={items}
          onUpdateItem={onUpdateItem}
          onRemoveItem={onRemoveItem}
          onAddItem={onAddItem}
          calculateGrandTotal={calculateGrandTotal}
        />
        
        <APPFormFooter formData={formData} onUpdate={onUpdateFormData} />
      </div>
    </div>
  );
};
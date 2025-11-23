import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PPMPFormHeader } from './PPMPFormHeader';
import { PPMPFormTable } from './PPMPFormTable';
import { PPMPFormFooter } from './PPMPFormFooter';
import { FormActions } from '../shared/FormActions';
import { PPMPItem, PPMPFormData, PPMPProps } from '../../../types/ppmp.types';
import { useTheme } from '../../../context/ThemeContext';

interface PPMPFormProps extends PPMPProps {
  formData: PPMPFormData;
  items: PPMPItem[];
  onUpdateFormData: (updates: Partial<PPMPFormData>) => void;
  onUpdateItem: (id: string, field: keyof PPMPItem, value: string) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: (category?: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSubmitForApproval: () => void;
  onPrint: () => void;
  onPreview: () => void;
  onDownloadPDF: () => void;
  onViewHistory: () => void;
  isGenerating?: boolean;
  sidebarWidth: number; 
}

export const PPMPForm: React.FC<PPMPFormProps> = ({
  formData,
  items,
  onNavigate,
  onUpdateFormData,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
  onSubmit,
  onSubmitForApproval,
  onViewHistory,
  onPrint,
  onPreview,
  onDownloadPDF,
  isGenerating = false
}) => {
  const { styles } = useTheme();

  return (
    <div className={`p-6 no-print ${styles.bgMain} min-h-screen transition-colors duration-300`}>
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
              Project Procurement Management Plan (PPMP)
            </h1>
            <p className={`${styles.textSecondary} mt-1`}>Calendar Year 2025</p>
          </div>
        </div>
        <FormActions
          onSave={() => onSubmit({} as React.FormEvent)}
          onPrint={onPrint}
          onSubmit={onSubmitForApproval} 
          onPreview={onPreview}
          onDownloadPDF={onDownloadPDF}
          onViewHistory={onViewHistory}
          saveLabel="Save"
          isLoading={isGenerating}
        />
      </div>

      <form onSubmit={onSubmit} className={`${styles.bgCard} rounded-lg shadow transition-colors duration-300`}>
        <PPMPFormHeader formData={formData} onUpdate={onUpdateFormData} />
        
        <PPMPFormTable
          items={items}
          onUpdateItem={onUpdateItem}
          onRemoveItem={onRemoveItem}
          onAddItem={onAddItem}
        />
        
        <PPMPFormFooter formData={formData} onUpdate={onUpdateFormData} />
      </form>
    </div>
  );
};
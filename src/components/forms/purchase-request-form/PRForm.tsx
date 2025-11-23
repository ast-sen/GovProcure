import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PRFormHeader } from './PRFormHeader';
import { PRItemsTable } from './PRItemsTable';
import { PRPurposeSection } from './PRPurposeSection';
import { PRSignatures } from './PRSignatures';
import { FormActions } from '../shared/FormActions';
import { PRItem, PRFormData, PurchaseRequestProps } from '../../../types/purchase-request.types';
import { useTheme } from '../../../context/ThemeContext';

interface PRFormProps extends PurchaseRequestProps {
  formData: PRFormData;
  items: PRItem[];
  onUpdateFormData: (updates: Partial<PRFormData>) => void;
  onUpdateItem: (id: string, field: keyof PRItem, value: string) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
  onSubmit: () => void;
  onSubmitForApproval: () => void; 
  onPrint: () => void;
  onPreview: () => void;
  onDownloadPDF: () => void;
  onViewHistory: () => void
  calculateTotal: () => string;
  isGenerating?: boolean;
}

export const PRForm: React.FC<PRFormProps> = ({
  formData,
  items,
  onNavigate,
  onUpdateFormData,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
  onSubmit,
  onSubmitForApproval,
  onPrint,
  onPreview,
  onDownloadPDF,
  onViewHistory,
  calculateTotal,
  isGenerating = false
}) => {
  const { styles, darkMode } = useTheme();

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
            <h1 className={`text-3xl font-bold ${styles.textPrimary}`}>Purchase Request</h1>
            <p className={`${styles.textSecondary} mt-1`}>Create and manage purchase requests</p>
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
        <PRFormHeader formData={formData} onUpdate={onUpdateFormData} />
        
        <PRItemsTable
          items={items}
          onUpdateItem={onUpdateItem}
          onRemoveItem={onRemoveItem}
          onAddItem={onAddItem}
          calculateTotal={calculateTotal}
        />
        
        <div className={`p-6 border-t ${styles.border} ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <PRPurposeSection
            purpose={formData.purpose}
            onUpdate={(purpose) => onUpdateFormData({ purpose })}
          />
          
          <PRSignatures
            requestedBy={formData.requestedBy}
            approvedBy={formData.approvedBy}
            onUpdateRequested={(updates) => 
              onUpdateFormData({ requestedBy: { ...formData.requestedBy, ...updates } })
            }
          />
        </div>
      </div>
    </div>
  );
};
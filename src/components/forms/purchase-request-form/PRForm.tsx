import React from 'react';
import { ArrowLeft, Tag, X } from 'lucide-react';
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
  onViewHistory: () => void;
  onOpenCategoryModal: () => void; // New
  onClearCategory: () => void; // New
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
  onOpenCategoryModal,
  onClearCategory,
  calculateTotal,
  isGenerating = false
}) => {
  const { styles, darkMode, themeColors } = useTheme();

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

      {/* Category Selection Section */}
      <div className={`${styles.bgCard} rounded-lg shadow mb-6 p-4 max-w-7xl mx-auto`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Tag size={20} className={themeColors.primaryText} />
            <div>
              <p className={`text-sm font-semibold ${styles.textPrimary}`}>Item Category</p>
              <p className={`text-xs ${styles.textMuted}`}>
                {formData.category ? 'All items must be in this category' : 'No category selected - items can be from any category'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {formData.category ? (
              <>
                <div className={`px-4 py-2 ${themeColors.primaryLight} rounded-lg`}>
                  <span className={`font-semibold ${themeColors.primaryText}`}>{formData.category}</span>
                </div>
                <button
                  onClick={onClearCategory}
                  className={`p-2 ${styles.hoverBg} rounded-lg transition-colors`}
                  title="Clear category"
                >
                  <X size={18} className={styles.textSecondary} />
                </button>
              </>
            ) : (
              <button
                onClick={onOpenCategoryModal}
                className={`flex items-center gap-2 px-4 py-2 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors font-medium`}
              >
                <Tag size={18} />
                Choose Category
              </button>
            )}
          </div>
        </div>
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
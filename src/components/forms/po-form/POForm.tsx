import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { POFormHeader } from './POFormHeader';
import { POItemsTable } from './POItemsTable';
import { POSignatures } from './POSignatures';
import { FormActions } from '../shared/FormActions';
import { POItem, POFormData, PurchaseOrderProps } from '../../../types/purchase-order.types';
import { useTheme } from '../../../context/ThemeContext';

interface POFormProps extends PurchaseOrderProps {
  formData: POFormData;
  items: POItem[];
  onUpdateFormData: (updates: Partial<POFormData>) => void;
  onUpdateItem: (id: string, field: 'unitCost' | 'amount', value: string) => void;
  onSubmit: () => void;
  onPrint: () => void;
  onPreview: () => void;
  onDownloadPDF: () => void;
  calculateTotal: () => string;
  calculatePenalty: () => string;
  isGenerating?: boolean;
}

export const POForm: React.FC<POFormProps> = ({
  formData,
  items,
  onNavigate,
  onUpdateFormData,
  onUpdateItem,
  onSubmit,
  onPrint,
  onPreview,
  onDownloadPDF,
  calculateTotal,
  calculatePenalty,
  isGenerating = false
}) => {
  const { styles, darkMode } = useTheme();

  return (
    <div className={`p-6 no-print ${styles.bgMain} min-h-screen`}>
      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: letter landscape;
            margin: 0.5in;
          }
          
          * {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          body * {
            visibility: hidden;
          }
          
          #printable-area, #printable-area * {
            visibility: visible;
          }
          
          #printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          
          .no-print {
            display: none !important;
          }
        }
      `}</style>

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
            <h1 className={`text-3xl font-bold ${styles.textPrimary}`}>Purchase Order</h1>
            <p className={`${styles.textSecondary} mt-1`}>ANNEX G-5</p>
          </div>
        </div>
        <FormActions
          onSave={onSubmit}
          onPrint={onPrint}
          onPreview={onPreview}
          onDownloadPDF={onDownloadPDF}
          saveLabel="Save Order"
          isLoading={isGenerating} onSubmit={function (): void {
            throw new Error('Function not implemented.');
          } } onViewHistory={function (): void {
            throw new Error('Function not implemented.');
          } }        />
      </div>

      <div className={`${styles.bgCard} rounded-lg shadow-lg max-w-7xl mx-auto border ${styles.border}`}>
        <POFormHeader formData={formData} onUpdate={onUpdateFormData} />
        
        <POItemsTable
          items={items}
          onUpdateItem={onUpdateItem}
          calculateTotal={calculateTotal}
        />

        <div className={`p-6 border-t ${styles.border}`}>
          <div className={`p-4 ${darkMode ? 'bg-amber-900/30 border-amber-700' : 'bg-amber-50 border-amber-200'} border rounded-lg mb-6`}>
            <p className={`text-sm ${darkMode ? 'text-amber-400' : 'text-amber-900'}`}>
              <strong>Note:</strong> In case of failure to make the full delivery within the time specified above, 
              a penalty of one-tenth (1/10) of one percent for every day of delay shall be imposed.
            </p>
            <p className={`text-sm ${darkMode ? 'text-amber-400' : 'text-amber-900'} mt-2`}>
              <strong>Calculated Penalty per Day:</strong> ₱ {calculatePenalty()}
            </p>
          </div>

          <POSignatures
            conformeDate={formData.conformeDate}
            onUpdateConformeDate={(date) => onUpdateFormData({ conformeDate: date })}
          />
        </div>
      </div>
    </div>
  );
};

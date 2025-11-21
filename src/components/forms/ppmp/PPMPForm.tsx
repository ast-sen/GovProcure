import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PPMPFormHeader } from './PPMPFormHeader';
import { PPMPFormTable } from './PPMPFormTable';
import { PPMPFormFooter } from './PPMPFormFooter';
import { FormActions } from '../shared/FormActions';
import { PPMPItem, PPMPFormData, PPMPProps } from '../../../types/ppmp.types';

interface PPMPFormProps extends PPMPProps {
  formData: PPMPFormData;
  items: PPMPItem[];
  onUpdateFormData: (updates: Partial<PPMPFormData>) => void;
  onUpdateItem: (id: string, field: keyof PPMPItem, value: string) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onSubmitForApproval: () => void;
  onPrint: () => void;
  onPreview: () => void;
  onDownloadPDF: () => void;
  onViewHistory: () => void;
  isGenerating?: boolean;
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
  return (
    <div className="p-6 no-print bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {onNavigate && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Project Procurement Management Plan (PPMP)
            </h1>
            <p className="text-gray-600 mt-1">Calendar Year 2025</p>
          </div>
        </div>
        <FormActions
        onSave={() => onSubmit({} as React.FormEvent)} // Wrap it
        onPrint={onPrint}
        onSubmit={onSubmitForApproval} 
        onPreview={onPreview}
        onDownloadPDF={onDownloadPDF}
        onViewHistory={onViewHistory}
        saveLabel="Save"
        isLoading={isGenerating}
        />
      </div>

      <form onSubmit={onSubmit} className="bg-white rounded-lg shadow">
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
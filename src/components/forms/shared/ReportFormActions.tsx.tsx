import React from 'react';
import { Save, Printer, Eye, Download, Clock } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface ReportFormActionsProps {
  onUpdate: () => void;  // Single update action instead of save dropdown
  onPrint: () => void;
  onPreview: () => void;
  onDownloadPDF: () => void;
  onViewApproved: () => void;  // View approved forms
  updateLabel?: string;
  showPreview?: boolean;
  showDownload?: boolean;
  showPrint?: boolean;
  showApproved?: boolean;
  isLoading?: boolean;
  isUpdating?: boolean;  // Separate loading state for update button
}

export const ReportFormActions: React.FC<ReportFormActionsProps> = ({
  onUpdate,
  onPrint,
  onPreview,
  onDownloadPDF,
  onViewApproved,
  updateLabel = 'Update',
  showPreview = true,
  showDownload = false,
  showPrint = true,
  showApproved = true,
  isLoading = false,
  isUpdating = false
}) => {
  const { styles, darkMode, themeColors } = useTheme();

  return (
    <div className="flex gap-2">
      {showApproved && (
        <button
          type="button"
          onClick={onViewApproved}
          className={`flex items-center gap-2 px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${styles.textPrimary} border ${styles.border} rounded-lg transition-colors`}
          disabled={isLoading}
        >
          <Clock size={20} />
          View Approved
        </button>
      )}

      {showPreview && (
        <button
          type="button"
          onClick={onPreview}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          disabled={isLoading}
        >
          <Eye size={20} />
          Preview
        </button>
      )}
      
      {showDownload && (
        <button
          type="button"
          onClick={onDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          disabled={isLoading}
        >
          <Download size={20} />
          {isLoading ? 'Generating...' : 'PDF'}
        </button>
      )}
      
      {showPrint && (
        <button
          type="button"
          onClick={onPrint}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          disabled={isLoading}
        >
          <Printer size={20} />
          Print
        </button>
      )}
      
      {/* Single Update Button (No Dropdown) */}
      <button
        type="button"
        onClick={onUpdate}
        className={`flex items-center gap-2 px-6 py-2 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors font-medium min-w-[120px] justify-center`}
        disabled={isLoading || isUpdating}
      >
        <Save size={20} />
        <span>{isUpdating ? 'Updating...' : updateLabel}</span>
      </button>
    </div>
  );
};

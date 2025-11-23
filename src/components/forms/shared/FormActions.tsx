import React, { useState, useRef, useEffect } from 'react';
import { Save, Printer, Eye, Download, ChevronDown, Clock } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface FormActionsProps {
  onSave: () => void;
  onSubmit: () => void;  // NEW: Separate submit action
  onPrint: () => void;
  onPreview: () => void;
  onDownloadPDF: () => void;
  onViewHistory: () => void;  // NEW: Open history modal
  saveLabel?: string;
  showPreview?: boolean;
  showDownload?: boolean;
  showPrint?: boolean;
  showHistory?: boolean;  // NEW: Show history button
  isLoading?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onSave,
  onSubmit,
  onPrint,
  onPreview,
  onDownloadPDF,
  onViewHistory,
  saveLabel = 'Save',
  showPreview = true,
  showDownload = false,
  showPrint = true,
  showHistory = true,
  isLoading = false
}) => {
  const { styles, darkMode } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSaveDraft = () => {
    setShowDropdown(false);
    onSave();
  };

  const handleSubmitForApproval = () => {
    setShowDropdown(false);
    onSubmit();
  };

  return (
    <div className="flex gap-2">
      {showHistory && (
        <button
          type="button"
          onClick={onViewHistory}
          className={`flex items-center gap-2 px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${styles.textPrimary} border ${styles.border} rounded-lg transition-colors`}
          disabled={isLoading}
        >
          <Clock size={20} />
          History
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
          id="download-btn"
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
      
      {/* Save Dropdown Button */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-w-[100px] justify-between"
          disabled={isLoading}
        >
          <div className="flex items-center gap-2">
            <Save size={20} />
            <span>{saveLabel}</span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className={`absolute right-0 mt-2 w-56 ${styles.bgCard} rounded-lg shadow-xl border ${styles.border} z-50 overflow-hidden`}>
            <button
              onClick={handleSaveDraft}
              className={`w-full px-4 py-3 text-left ${darkMode ? 'hover:bg-blue-900/30' : 'hover:bg-blue-50'} transition-colors flex items-start gap-3 border-b ${styles.border}`}
            >
              <Save size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className={`font-semibold ${styles.textPrimary}`}>Save as Draft</div>
                <div className={`text-xs ${styles.textMuted} mt-0.5`}>Save without submitting</div>
              </div>
            </button>
            
            <button
              onClick={handleSubmitForApproval}
              className={`w-full px-4 py-3 text-left ${darkMode ? 'hover:bg-green-900/30' : 'hover:bg-green-50'} transition-colors flex items-start gap-3`}
            >
              <div className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <div className={`font-semibold ${styles.textPrimary}`}>Submit for Approval</div>
                <div className={`text-xs ${styles.textMuted} mt-0.5`}>Send to approver</div>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
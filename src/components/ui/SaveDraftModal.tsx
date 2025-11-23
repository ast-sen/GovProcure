import React, { useState, useEffect } from 'react';
import { X, Save, FileText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SaveDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
  defaultTitle?: string;
  isLoading?: boolean;
  docType?: string;
  office?: string;
  transactionNumber?: string;
}

const generateDefaultTitle = (
  docType?: string,
  office?: string,
  transactionNumber?: string
): string => {
  const parts = [docType, office, transactionNumber].filter(Boolean);
  return parts.length > 0 ? parts.join(' - ') : '';
};

const SaveDraftModal: React.FC<SaveDraftModalProps> = ({
  isOpen,
  onClose,
  onSave,
  defaultTitle = '',
  isLoading = false,
  docType,
  office,
  transactionNumber,
}) => {
  const { darkMode, styles, themeColors } = useTheme();
  const [title, setTitle] = useState(defaultTitle);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const generatedTitle = generateDefaultTitle(docType, office, transactionNumber);
      setTitle(defaultTitle || generatedTitle);
      setError('');
    }
  }, [isOpen, defaultTitle, docType, office, transactionNumber]);

  const handleSave = () => {
    if (!title.trim()) {
      setError('Please enter a title for your draft');
      return;
    }
    onSave(title.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSave();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative ${styles.bgCard} rounded-lg shadow-xl w-full max-w-md transform transition-all`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b ${styles.border}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${themeColors.primaryLight} rounded-lg`}>
                <FileText className={themeColors.primaryText} size={20} />
              </div>
              <h3 className={`text-lg font-semibold ${styles.textPrimary}`}>Save Draft</h3>
            </div>
            <button
              onClick={onClose}
              className={`p-2 ${styles.hoverBg} rounded-lg transition-colors`}
            >
              <X size={20} className={styles.textMuted} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <label className={`block text-sm font-medium ${styles.textPrimary} mb-2`}>
              Draft Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter a title for your draft..."
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow ${styles.bgInput} ${
                error ? 'border-red-500' : ''
              }`}
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
            <p className={`mt-2 text-sm ${styles.textMuted}`}>
              Give your draft a descriptive title so you can easily find it later.
            </p>
          </div>

          {/* Footer */}
          <div className={`flex gap-3 justify-end p-4 border-t ${styles.border} ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-b-lg`}>
            <button
              onClick={onClose}
              disabled={isLoading}
              className={`px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${styles.textPrimary} rounded-lg transition-colors font-medium disabled:opacity-50`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`px-4 py-2 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Draft
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveDraftModal;
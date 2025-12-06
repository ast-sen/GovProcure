import React from 'react';
import { X, Tag } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { DEFAULT_CATEGORIES } from '../../../utils/constants/category.constant';

interface CategorySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  currentCategory?: string;
}

export const CategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  currentCategory
}) => {
  const { styles, themeColors } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div className={`${styles.bgCard} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col transition-colors duration-300`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${styles.border}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 ${themeColors.primaryLight} rounded-lg`}>
              <Tag size={24} className={themeColors.primaryText} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${styles.textPrimary}`}>Choose Category</h2>
              <p className={`text-sm ${styles.textMuted} mt-1`}>
                All items in this PR will be under the same category
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`${styles.textMuted} hover:${styles.textSecondary} transition-colors rounded-full p-2 ${styles.hoverBg}`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Category List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DEFAULT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`p-4 text-left rounded-lg border-2 transition-all ${
                  currentCategory === category
                    ? `${themeColors.primaryBorder} ${themeColors.primaryLight}`
                    : `${styles.border} ${styles.bgCard} ${styles.hoverBg}`
                }`}
              >
                <div className="flex items-center gap-2">
                  <Tag 
                    size={18} 
                    className={currentCategory === category ? themeColors.primaryText : styles.textSecondary} 
                  />
                  <span className={`font-medium text-sm ${
                    currentCategory === category ? themeColors.primaryText : styles.textPrimary
                  }`}>
                    {category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${styles.border} ${styles.bgInput}`}>
          <div className="flex items-center justify-between">
            <p className={`text-sm ${styles.textSecondary}`}>
              {currentCategory ? (
                <>Current: <span className={`font-semibold ${themeColors.primaryText}`}>{currentCategory}</span></>
              ) : (
                'No category selected'
              )}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
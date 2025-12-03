import React from 'react';
import { APPFormData } from '../../../types/app.types';
import { useTheme } from '../../../context/ThemeContext';

interface APPFormFooterProps {
  formData: APPFormData;
  onUpdate: (updates: Partial<APPFormData>) => void;
}

export const APPFormFooter: React.FC<APPFormFooterProps> = ({ formData, onUpdate }) => {
  const { styles, darkMode } = useTheme();

  return (
    <div className={`p-6 border-t ${styles.border} ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Prepared by:
          </label>
          <input
            type="text"
            value={formData.preparedBy}
            onChange={(e) => onUpdate({ preparedBy: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${styles.bgInput}`}
            placeholder="Name and designation"
          />
        </div>
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Reviewed/Recommend by:
          </label>
          <input
            type="text"
            value={formData.reviewedBy}
            onChange={(e) => onUpdate({ reviewedBy: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${styles.bgInput}`}
            placeholder="Name and designation"
          />
        </div>
      </div>
    </div>
  );
};
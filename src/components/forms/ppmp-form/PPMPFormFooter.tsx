import React from 'react';
import { PPMPFormData } from '../../../types/ppmp.types';
import { useTheme } from '../../../context/ThemeContext';

interface PPMPFormFooterProps {
  formData: PPMPFormData;
  onUpdate: (updates: Partial<PPMPFormData>) => void;
}

export const PPMPFormFooter: React.FC<PPMPFormFooterProps> = ({ formData, onUpdate }) => {
  const { darkMode, styles } = useTheme();

  return (
    <div className={`p-6 border-t ${styles.border} ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Prepared By:
          </label>
          <input
            type="text"
            value={formData.preparedBy}
            onChange={(e) => onUpdate({ preparedBy: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${styles.bgInput}`}
            placeholder="Name and position"
          />
        </div>
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Approved By:
          </label>
          <input
            type="text"
            value={formData.approvedBy}
            onChange={(e) => onUpdate({ approvedBy: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${styles.bgInput}`}
            placeholder="Municipal Mayor"
          />
        </div>
      </div>
    </div>
  );
};
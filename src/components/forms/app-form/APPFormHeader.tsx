import React from 'react';
import { APPFormData } from '../../../types/app.types';
import { useTheme } from '../../../context/ThemeContext';

interface APPFormHeaderProps {
  formData: APPFormData;
  onUpdate: (updates: Partial<APPFormData>) => void;
}

export const APPFormHeader: React.FC<APPFormHeaderProps> = ({ formData, onUpdate }) => {
  const { styles } = useTheme();

  return (
    <div className={`p-6 border-b ${styles.border}`}>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Department/Office:
          </label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => onUpdate({ department: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
            placeholder="Enter department"
          />
        </div>
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Office/Section:
          </label>
          <input
            type="text"
            value={formData.officeSection}
            onChange={(e) => onUpdate({ officeSection: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
            placeholder="Enter section"
          />
        </div>
      </div>
    </div>
  );
};
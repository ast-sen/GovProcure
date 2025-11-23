import React from 'react';
import { IARFormData } from '../../../types/iar.types';
import { useTheme } from '../../../context/ThemeContext';

interface IARAcceptanceSectionProps {
  acceptanceComplete: boolean;
  acceptancePartial: boolean;
  propertyOfficer: string;
  onUpdate: (updates: Partial<IARFormData>) => void;
}

export const IARAcceptanceSection: React.FC<IARAcceptanceSectionProps> = ({
  acceptanceComplete,
  acceptancePartial,
  propertyOfficer,
  onUpdate
}) => {
  const { styles } = useTheme();

  return (
    <div className="mb-6">
      <h3 className={`text-sm font-semibold ${styles.textPrimary} mb-3`}>ACCEPTANCE</h3>
      <div className={`border ${styles.border} rounded-lg p-4 ${styles.bgCard}`}>
        <div className="flex gap-8 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptanceComplete}
              onChange={(e) => onUpdate({ 
                acceptanceComplete: e.target.checked,
                acceptancePartial: !e.target.checked && acceptancePartial
              })}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className={`text-sm font-medium ${styles.textPrimary}`}>Complete</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptancePartial}
              onChange={(e) => onUpdate({ 
                acceptancePartial: e.target.checked,
                acceptanceComplete: !e.target.checked && acceptanceComplete
              })}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className={`text-sm font-medium ${styles.textPrimary}`}>Partial</span>
          </label>
        </div>
        <div>
          <label className={`block text-xs font-semibold ${styles.textSecondary} mb-2`}>
            Property Officer:
          </label>
          <input
            type="text"
            value={propertyOfficer}
            onChange={(e) => onUpdate({ propertyOfficer: e.target.value })}
            className={`w-full md:w-96 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${styles.bgInput}`}
            placeholder="Enter name and position"
          />
        </div>
      </div>
    </div>
  );
};
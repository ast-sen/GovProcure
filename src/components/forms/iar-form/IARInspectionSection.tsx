import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

interface IARInspectionSectionProps {
  inspectionOfficer: string;
  onUpdate: (value: string) => void;
}

export const IARInspectionSection: React.FC<IARInspectionSectionProps> = ({
  inspectionOfficer,
  onUpdate
}) => {
  const { styles } = useTheme();

  return (
    <div className="mb-6">
      <h3 className={`text-sm font-semibold ${styles.textPrimary} mb-3`}>INSPECTION</h3>
      <div className={`border ${styles.border} rounded-lg p-4 ${styles.bgCard}`}>
        <p className={`text-sm ${styles.textPrimary} mb-3`}>
          Inspected, verified and found OK as to quantity and specifications
        </p>
        <div>
          <label className={`block text-xs font-semibold ${styles.textSecondary} mb-2`}>
            Inspection Officer:
          </label>
          <input
            type="text"
            value={inspectionOfficer}
            onChange={(e) => onUpdate(e.target.value)}
            className={`w-full md:w-96 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${styles.bgInput}`}
            placeholder="Enter name and position"
          />
        </div>
      </div>
    </div>
  );
};
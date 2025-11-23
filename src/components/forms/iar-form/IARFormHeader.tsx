import React from 'react';
import { IARFormData } from '../../../types/iar.types';
import { useTheme } from '../../../context/ThemeContext';

interface IARFormHeaderProps {
  formData: IARFormData;
  onUpdate: (updates: Partial<IARFormData>) => void;
}

export const IARFormHeader: React.FC<IARFormHeaderProps> = ({ formData, onUpdate }) => {
  const { styles } = useTheme();

  return (
    <div className={`p-6 border-b ${styles.border}`}>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Supplier:
          </label>
          <input
            type="text"
            value={formData.supplier}
            onChange={(e) => onUpdate({ supplier: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
            placeholder="Enter supplier name"
          />
        </div>
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            P.R. No.:
          </label>
          <input
            type="text"
            value={formData.prNo}
            onChange={(e) => onUpdate({ prNo: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
            placeholder="PR-2025-000"
          />
        </div>
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            P.R. Date:
          </label>
          <input
            type="date"
            value={formData.prDate}
            onChange={(e) => onUpdate({ prDate: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            P.O. No.:
          </label>
          <input
            type="text"
            value={formData.poNo}
            onChange={(e) => onUpdate({ poNo: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
            placeholder="PO-2025-000"
          />
        </div>
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Date Received:
          </label>
          <input
            type="date"
            value={formData.dateReceived}
            onChange={(e) => onUpdate({ dateReceived: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
          />
        </div>
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Date Inspected:
          </label>
          <input
            type="date"
            value={formData.dateInspected}
            onChange={(e) => onUpdate({ dateInspected: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
          />
        </div>
      </div>
    </div>
  );
};
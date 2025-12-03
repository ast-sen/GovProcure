import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

interface POSignaturesProps {
  conformeDate: string;
  onUpdateConformeDate: (date: string) => void;
}

export const POSignatures: React.FC<POSignaturesProps> = ({
  conformeDate,
  onUpdateConformeDate,
}) => {
  const { styles, darkMode } = useTheme();

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className={`border ${styles.border} rounded-lg p-4 ${styles.bgCard}`}>
        <h3 className={`text-sm font-semibold ${styles.textPrimary} mb-4`}>Conforme:</h3>
        <div className="space-y-4">
          <div className={`h-16 border-b-2 ${darkMode ? 'border-gray-600' : 'border-gray-400'} flex items-end justify-center pb-1`}>
            <span className={`text-xs ${styles.textMuted}`}>(Signature Over Printed Name)</span>
          </div>
          <div>
            <label className={`block text-xs ${styles.textSecondary} mb-1`}>Date:</label>
            <input
              type="date"
              value={conformeDate}
              onChange={(e) => onUpdateConformeDate(e.target.value)}
              className={`w-full px-3 py-2 border ${styles.border} rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${styles.bgInput} transition-colors`}
            />
          </div>
        </div>
      </div>

      <div className={`border ${styles.border} rounded-lg p-4 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
        <h3 className={`text-sm font-semibold ${styles.textPrimary} mb-4`}>Approved By:</h3>
        <div className="space-y-2 text-center">
          <div className={`h-16 border-b-2 ${darkMode ? 'border-gray-600' : 'border-gray-400'} flex items-end justify-center pb-1`}>
            <span className={`text-xs ${styles.textMuted}`}>(Signature)</span>
          </div>
          <div className="pt-2">
            <p className={`text-sm font-medium ${styles.textPrimary}`}>Municipal Mayor</p>
          </div>
        </div>
      </div>
    </div>
  );
};
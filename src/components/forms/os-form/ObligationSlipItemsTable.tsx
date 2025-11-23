import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

interface ObligationSlipItemsTableProps {
  formData: {
    particulars: string;
    accountCode: string;
    amount: string;
  };
  onFormDataChange: (updates: Partial<any>) => void;
}

export const ObligationSlipItemsTable: React.FC<ObligationSlipItemsTableProps> = ({ 
  formData, 
  onFormDataChange 
}) => {
  const { styles, darkMode } = useTheme();

  return (
    <div className="p-6">
      <table className={`w-full border-collapse border ${styles.border}`}>
        <thead>
          <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
            <th className={`border ${styles.border} px-4 py-3 text-center font-bold ${styles.textPrimary}`}>
              PARTICULARS
            </th>
            <th className={`border ${styles.border} px-4 py-3 text-center font-bold ${styles.textPrimary} w-48`}>
              ACCOUNT CODE
            </th>
            <th className={`border ${styles.border} px-4 py-3 text-center font-bold ${styles.textPrimary} w-48`}>
              AMOUNT
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={`border ${styles.border} p-0`}>
              <textarea
                value={formData.particulars}
                onChange={(e) => onFormDataChange({ particulars: e.target.value })}
                className={`w-full h-64 px-4 py-3 border-0 focus:ring-2 focus:ring-blue-500 resize-none ${styles.bgInput}`}
                placeholder="PAYMENT ............"
              />
            </td>
            <td className={`border ${styles.border} p-0 align-top`}>
              <input
                type="text"
                value={formData.accountCode}
                onChange={(e) => onFormDataChange({ accountCode: e.target.value })}
                className={`w-full h-full px-4 py-3 border-0 focus:ring-2 focus:ring-blue-500 ${styles.bgInput}`}
                placeholder="Enter code"
              />
            </td>
            <td className={`border ${styles.border} p-0 align-top`}>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) => onFormDataChange({ amount: e.target.value })}
                className={`w-full h-full px-4 py-3 border-0 focus:ring-2 focus:ring-blue-500 text-right ${styles.bgInput}`}
                placeholder="0.00"
              />
            </td>
          </tr>
          <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <td colSpan={2} className={`border ${styles.border} px-4 py-3 text-right font-bold ${styles.textPrimary}`}>
              TOTAL :
            </td>
            <td className={`border ${styles.border} px-4 py-3 text-right font-bold ${styles.textPrimary}`}>
              {formData.amount || '0.00'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
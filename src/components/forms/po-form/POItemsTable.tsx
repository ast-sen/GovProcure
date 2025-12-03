import React from 'react';
import { POItem } from '../../../types/purchase-order.types';
import { useTheme } from '../../../context/ThemeContext';

interface POItemsTableProps {
  items: POItem[];
  onUpdateItem: (id: string, field: 'unitCost' | 'amount', value: string) => void;
  calculateTotal: () => string;
}

export const POItemsTable: React.FC<POItemsTableProps> = ({
  items,
  onUpdateItem,
  calculateTotal,
}) => {
  const { styles, darkMode } = useTheme();

  return (
    <div className="p-6">
      <div className={`mb-4 p-4 ${darkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded-lg`}>
        <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>
          <strong>Note:</strong> Items are loaded from the database. Only Unit Cost and Amount fields are editable.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
              <th className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-20`}>
                Item No.
              </th>
              <th className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-24`}>
                Quantity
              </th>
              <th className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-24`}>
                Unit
              </th>
              <th className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center`}>
                PARTICULARS
              </th>
              <th className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-40`}>
                Unit Cost
              </th>
              <th className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-40`}>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className={styles.hoverBg}>
                <td className={`border ${styles.border} px-3 py-2 text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm font-medium ${styles.textPrimary}`}>{item.itemNo}</span>
                </td>
                <td className={`border ${styles.border} px-3 py-2 text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm ${styles.textPrimary}`}>{item.quantity}</span>
                </td>
                <td className={`border ${styles.border} px-3 py-2 text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm ${styles.textPrimary}`}>{item.unit}</span>
                </td>
                <td className={`border ${styles.border} px-3 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm ${styles.textPrimary}`}>{item.particulars}</span>
                </td>
                <td className={`border ${styles.border} px-2 py-2`}>
                  <input
                    type="number"
                    value={item.unitCost}
                    onChange={(e) => onUpdateItem(item.id, 'unitCost', e.target.value)}
                    className={`w-full px-2 py-1 text-sm border ${styles.border} rounded focus:ring-2 focus:ring-blue-500 ${styles.bgInput} transition-colors`}
                    placeholder="0.00"
                    step="0.01"
                  />
                </td>
                <td className={`border ${styles.border} px-2 py-2`}>
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) => onUpdateItem(item.id, 'amount', e.target.value)}
                    className={`w-full px-2 py-1 text-sm border ${styles.border} rounded focus:ring-2 focus:ring-blue-500 ${styles.bgInput} transition-colors`}
                    placeholder="0.00"
                    step="0.01"
                  />
                </td>
              </tr>
            ))}
            {Array.from({ length: Math.max(0, 15 - items.length) }).map((_, idx) => (
              <tr key={`empty-${idx}`}>
                <td className={`border ${styles.border} px-3 py-2 text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm ${styles.textMuted}`}>{items.length + idx + 1}</span>
                </td>
                <td className={`border ${styles.border} px-3 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>&nbsp;</td>
                <td className={`border ${styles.border} px-3 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>&nbsp;</td>
                <td className={`border ${styles.border} px-3 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>&nbsp;</td>
                <td className={`border ${styles.border} px-2 py-2`}>&nbsp;</td>
                <td className={`border ${styles.border} px-2 py-2`}>&nbsp;</td>
              </tr>
            ))}
            <tr className={darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}>
              <td colSpan={5} className={`border ${styles.border} px-3 py-3 text-right`}>
                <span className={`text-sm font-bold ${styles.textPrimary}`}>TOTAL:</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3`}>
                <span className={`text-sm font-bold ${styles.textPrimary}`}>₱ {calculateTotal()}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

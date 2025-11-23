import React from 'react';
import { IARItem } from '../../../types/iar.types';
import { useTheme } from '../../../context/ThemeContext';

interface IARItemsTableProps {
  items: IARItem[];
}

export const IARItemsTable: React.FC<IARItemsTableProps> = ({ items }) => {
  const { styles, darkMode } = useTheme();

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
            <th className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-20`}>
              Item<br/>No.
            </th>
            <th className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-24`}>
              Unit
            </th>
            <th className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-32`}>
              Quantity
            </th>
            <th className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center`}>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
              <td className={`border ${styles.border} px-3 py-3 text-center`}>
                <span className={`text-sm font-medium ${styles.textPrimary}`}>{item.itemNo}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3 text-center`}>
                <span className={`text-sm ${styles.textPrimary}`}>{item.unit}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3 text-center`}>
                <span className={`text-sm ${styles.textPrimary}`}>{item.quantity}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3`}>
                <span className={`text-sm ${styles.textPrimary}`}>{item.description}</span>
              </td>
            </tr>
          ))}
          {Array.from({ length: Math.max(0, 30 - items.length) }).map((_, idx) => (
            <tr key={`empty-${idx}`} className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
              <td className={`border ${styles.border} px-3 py-3 text-center`}>
                <span className={`text-xs ${styles.textMuted}`}>{items.length + idx + 1}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3`}>&nbsp;</td>
              <td className={`border ${styles.border} px-3 py-3`}>&nbsp;</td>
              <td className={`border ${styles.border} px-3 py-3`}>&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
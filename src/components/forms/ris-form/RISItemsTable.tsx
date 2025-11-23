import React from 'react';
import { RISItem } from '../../../types/ris.types';
import { useTheme } from '../../../context/ThemeContext';

interface RISItemsTableProps {
  items: RISItem[];
  onUpdateItem?: (id: string, updates: Partial<RISItem>) => void;
  onRemoveItem?: (id: string) => void;
  onAddItem?: () => void;
}

export const RISItemsTable: React.FC<RISItemsTableProps> = ({ 
  items,
  onUpdateItem: _onUpdateItem,
  onRemoveItem: _onRemoveItem,
  onAddItem: _onAddItem 
}) => {
  const { styles, darkMode } = useTheme();
  const totalRows = 30;
  const emptyRowsCount = Math.max(0, totalRows - items.length);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
            <th 
              className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-20`}
              rowSpan={2}
            >
              Item<br/>No.
            </th>
            <th 
              className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-32`}
              rowSpan={2}
            >
              Stock No.
            </th>
            <th 
              className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-24`}
              rowSpan={2}
            >
              Unit of<br/>Issue
            </th>
            <th 
              className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center`}
              rowSpan={2}
            >
              Item Description
            </th>
            <th 
              className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
              colSpan={1}
            >
              Requisition
            </th>
            <th 
              className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
              colSpan={2}
            >
              Issuance
            </th>
          </tr>
          <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
            <th className={`border ${styles.border} px-3 py-2 text-sm font-semibold ${styles.textPrimary} text-center w-24`}>
              Quantity
            </th>
            <th className={`border ${styles.border} px-3 py-2 text-sm font-semibold ${styles.textPrimary} text-center w-24`}>
              Quantity
            </th>
            <th className={`border ${styles.border} px-3 py-2 text-sm font-semibold ${styles.textPrimary} text-center w-40`}>
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className={`${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'}`}>
              <td className={`border ${styles.border} px-3 py-3 text-center`}>
                <span className={`text-sm font-medium ${styles.textPrimary}`}>{item.itemNo}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3 text-center`}>
                <span className={`text-sm ${styles.textPrimary}`}>{item.stockNo}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3 text-center`}>
                <span className={`text-sm ${styles.textPrimary}`}>{item.unitOfIssue}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3`}>
                <span className={`text-sm ${styles.textPrimary}`}>{item.description}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3 text-center`}>
                <span className={`text-sm ${styles.textPrimary}`}>{item.requisitionQty}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3 text-center`}>
                <span className={`text-sm ${styles.textPrimary}`}>{item.issuanceQty}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3`}>
                <span className={`text-sm ${styles.textPrimary}`}>{item.remarks}</span>
              </td>
            </tr>
          ))}
          {Array.from({ length: emptyRowsCount }).map((_, idx) => (
            <tr key={`empty-${idx}`} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
              <td className={`border ${styles.border} px-3 py-3 text-center`}>
                <span className={`text-xs ${styles.textMuted}`}>{items.length + idx + 1}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3`}>&nbsp;</td>
              <td className={`border ${styles.border} px-3 py-3`}>&nbsp;</td>
              <td className={`border ${styles.border} px-3 py-3`}>&nbsp;</td>
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

export default RISItemsTable;
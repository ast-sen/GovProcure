import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { APPItem } from '../../../types/app.types';
import { MONTHS } from '../../../utils/constants/app.constants';
import { useTheme } from '../../../context/ThemeContext';

interface APPItemsTableProps {
  items: APPItem[];
  onUpdateItem: (id: string, field: keyof APPItem, value: string) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
  calculateGrandTotal: () => string;
}

export const APPItemsTable: React.FC<APPItemsTableProps> = ({
  items,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
  calculateGrandTotal
}) => {
  const { styles, darkMode } = useTheme();

  return (
    <div className="p-6 overflow-x-auto">
      <div className="min-w-max">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-yellow-400">
              <th className={`border ${styles.border} px-2 py-2 text-xs font-bold`} rowSpan={2}>
                TOTAL
              </th>
              <th className={`border ${styles.border} px-2 py-2 text-xs font-bold text-center`} colSpan={12}>
                This is a month-by-month procurement plan for your convenience while planning
              </th>
              <th className={`border ${styles.border} px-2 py-2 text-xs font-bold`} rowSpan={2}>
                Item No.
              </th>
              <th className={`border ${styles.border} px-2 py-2 text-xs font-bold`} rowSpan={2}>
                Description
              </th>
              <th className={`border ${styles.border} px-2 py-2 text-xs font-bold`} rowSpan={2}>
                Unit Cost
              </th>
              <th className={`border ${styles.border} px-2 py-2 text-xs font-bold`} rowSpan={2}>
                Quantity
              </th>
              <th className={`border ${styles.border} px-2 py-2 text-xs font-bold`} rowSpan={2}>
                Total Cost<br/>(Estimated<br/>Amount)
              </th>
              <th className={`border ${styles.border} px-2 py-2 text-xs font-bold`} rowSpan={2}>
                Configurer/<br/>Qty per<br/>month
              </th>
              <th className={`border ${styles.border} px-2 py-2 text-xs font-bold`} rowSpan={2}>
                Qty, as of<br/>fill-out<br/>(Amount)
              </th>
              <th className={`border ${styles.border} px-2 py-2 text-xs font-bold`} rowSpan={2}>
                Qty, as of<br/>2nd, 3rd, fill-<br/>out Updating<br/>(Amount)
              </th>
              <th className={`border ${styles.border} px-2 py-2 text-xs font-bold`} rowSpan={2}>
                Total<br/>Estimated<br/>Budget
              </th>
              <th className={`border ${styles.border} px-2 py-2 text-xs font-bold no-print`} rowSpan={2}>
                Actions
              </th>
            </tr>
            <tr className="bg-yellow-300">
              {MONTHS.map((month) => (
                <th key={month.key} className={`border ${styles.border} px-2 py-2 text-xs font-bold`}>
                  {month.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className={styles.hoverBg}>
                <td className={`border ${styles.border} px-2 py-2 bg-yellow-100`}>
                  <input
                    type="number"
                    value={item.totalCost}
                    className={`w-16 px-1 py-1 text-xs border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${styles.textPrimary}`}
                    readOnly
                  />
                </td>
                
                {MONTHS.map((month) => (
                  <td key={month.key} className={`border ${styles.border} px-1 py-2`}>
                    <input
                      type="number"
                      value={item[month.key as keyof APPItem] as string}
                      onChange={(e) => onUpdateItem(item.id, month.key as keyof APPItem, e.target.value)}
                      className={`w-12 px-1 py-1 text-xs border rounded ${styles.bgInput}`}
                      placeholder="0"
                    />
                  </td>
                ))}

                <td className={`border ${styles.border} px-2 py-2 text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-xs font-medium ${styles.textPrimary}`}>{item.itemNo}</span>
                </td>
                <td className={`border ${styles.border} px-2 py-2`}>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                    className={`w-48 px-2 py-1 text-xs border rounded ${styles.bgInput}`}
                    placeholder="Item description"
                  />
                </td>
                <td className={`border ${styles.border} px-2 py-2`}>
                  <input
                    type="number"
                    value={item.unitCost}
                    onChange={(e) => onUpdateItem(item.id, 'unitCost', e.target.value)}
                    className={`w-20 px-2 py-1 text-xs border rounded ${styles.bgInput}`}
                    placeholder="0.00"
                    step="0.01"
                  />
                </td>
                <td className={`border ${styles.border} px-2 py-2`}>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onUpdateItem(item.id, 'quantity', e.target.value)}
                    className={`w-16 px-2 py-1 text-xs border rounded ${styles.bgInput}`}
                    placeholder="0"
                  />
                </td>
                <td className={`border ${styles.border} px-2 py-2`}>
                  <input
                    type="number"
                    value={item.totalCost}
                    className={`w-24 px-2 py-1 text-xs border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${styles.textPrimary}`}
                    readOnly
                  />
                </td>
                <td className={`border ${styles.border} px-2 py-2`}>
                  <input
                    type="text"
                    value={item.configurer}
                    onChange={(e) => onUpdateItem(item.id, 'configurer', e.target.value)}
                    className={`w-20 px-2 py-1 text-xs border rounded ${styles.bgInput}`}
                    placeholder="Config"
                  />
                </td>
                <td className={`border ${styles.border} px-2 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <input
                    type="text"
                    className={`w-20 px-2 py-1 text-xs border rounded ${styles.bgInput}`}
                    placeholder="N/A"
                  />
                </td>
                <td className={`border ${styles.border} px-2 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <input
                    type="text"
                    className={`w-20 px-2 py-1 text-xs border rounded ${styles.bgInput}`}
                    placeholder="N/A"
                  />
                </td>
                <td className={`border ${styles.border} px-2 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <input
                    type="number"
                    value={item.totalCost}
                    className={`w-24 px-2 py-1 text-xs border rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${styles.textPrimary}`}
                    readOnly
                  />
                </td>
                <td className={`border ${styles.border} px-2 py-2 text-center no-print`}>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className={`p-1 text-red-600 ${darkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50'} rounded`}
                    disabled={items.length === 1}
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            
            {/* Grand Total Row */}
            <tr className="bg-yellow-100 font-bold">
              <td className={`border ${styles.border} px-2 py-2 text-xs`}>
                ₱{calculateGrandTotal()}
              </td>
              <td colSpan={12} className={`border ${styles.border} px-2 py-2 text-xs text-center`}>
                GRAND TOTAL
              </td>
              <td colSpan={7} className={`border ${styles.border} px-2 py-2 text-xs text-right`}>
                ₱{calculateGrandTotal()}
              </td>
              <td className={`border ${styles.border} no-print`}></td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={onAddItem}
        className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Plus size={20} />
        Add New Item
      </button>
    </div>
  );
};
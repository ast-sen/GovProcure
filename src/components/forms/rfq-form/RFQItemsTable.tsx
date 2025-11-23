import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { RFQItem } from '../../../types/rfq.types';
import { useTheme } from '../../../context/ThemeContext';

interface RFQItemsTableProps {
  items: RFQItem[];
  onItemsChange: (items: RFQItem[]) => void;
}

export const RFQItemsTable: React.FC<RFQItemsTableProps> = ({ 
  items, 
  onItemsChange 
}) => {
  const { styles, darkMode } = useTheme();
  
  const updateItem = (id: string, field: keyof RFQItem, value: string) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        
        // Auto-calculate total price
        if (field === 'quantity' || field === 'unitPrice') {
          const qty = parseFloat(field === 'quantity' ? value : item.quantity) || 0;
          const price = parseFloat(field === 'unitPrice' ? value : item.unitPrice) || 0;
          updated.totalPrice = (qty * price).toFixed(2);
        }
        
        return updated;
      }
      return item;
    });
    onItemsChange(updatedItems);
  };

  const addItem = () => {
    const newItem: RFQItem = {
      id: Date.now().toString(),
      itemNo: items.length + 1,
      quantity: '',
      unitOfIssue: '',
      itemDescription: '',
      unitPrice: '',
      totalPrice: ''
    };
    onItemsChange([...items, newItem]);
  };

  const removeItem = (id: string) => {
    const filtered = items.filter(item => item.id !== id);
    // Renumber items
    const renumbered = filtered.map((item, index) => ({
      ...item,
      itemNo: index + 1
    }));
    onItemsChange(renumbered);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h3 className={`text-lg font-bold ${styles.textPrimary}`}>Items</h3>
        <button
          onClick={addItem}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          <span>Add Item</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className={`w-full border-collapse border ${styles.border}`}>
          <thead>
            <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
              <th className={`border ${styles.border} px-3 py-2 text-center font-bold ${styles.textPrimary} w-16`}>
                ITEM NO.
              </th>
              <th className={`border ${styles.border} px-3 py-2 text-center font-bold ${styles.textPrimary} w-24`}>
                Quantity
              </th>
              <th className={`border ${styles.border} px-3 py-2 text-center font-bold ${styles.textPrimary} w-32`}>
                Unit of Issue
              </th>
              <th className={`border ${styles.border} px-3 py-2 text-center font-bold ${styles.textPrimary}`}>
                ITEM DESCRIPTION
              </th>
              <th className={`border ${styles.border} px-3 py-2 text-center font-bold ${styles.textPrimary} w-32`}>
                unit price
              </th>
              <th className={`border ${styles.border} px-3 py-2 text-center font-bold ${styles.textPrimary} w-32`}>
                Total price
              </th>
              <th className={`border ${styles.border} px-3 py-2 text-center font-bold ${styles.textPrimary} w-16`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className={`border ${styles.border} px-3 py-2 text-center ${styles.textPrimary}`}>
                  {item.itemNo}
                </td>
                <td className={`border ${styles.border} p-0`}>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                    className={`w-full h-full px-3 py-2 border-0 focus:ring-2 focus:ring-blue-500 ${styles.bgInput}`}
                    placeholder="25"
                  />
                </td>
                <td className={`border ${styles.border} p-0`}>
                  <input
                    type="text"
                    value={item.unitOfIssue}
                    onChange={(e) => updateItem(item.id, 'unitOfIssue', e.target.value)}
                    className={`w-full h-full px-3 py-2 border-0 focus:ring-2 focus:ring-blue-500 ${styles.bgInput}`}
                    placeholder="PAX"
                  />
                </td>
                <td className={`border ${styles.border} p-0`}>
                  <textarea
                    value={item.itemDescription}
                    onChange={(e) => updateItem(item.id, 'itemDescription', e.target.value)}
                    className={`w-full h-full px-3 py-2 border-0 focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px] ${styles.bgInput}`}
                    placeholder="PACK LUNCH&#10;****** NOTHING FOLLOWS ******"
                  />
                </td>
                <td className={`border ${styles.border} p-0`}>
                  <input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                    className={`w-full h-full px-3 py-2 border-0 focus:ring-2 focus:ring-blue-500 text-right ${styles.bgInput}`}
                    placeholder="166.00"
                  />
                </td>
                <td className={`border ${styles.border} px-3 py-2 text-right font-semibold ${styles.textPrimary}`}>
                  {item.totalPrice || '0.00'}
                </td>
                <td className={`border ${styles.border} px-3 py-2 text-center`}>
                  <button
                    onClick={() => removeItem(item.id)}
                    className={`p-2 text-red-600 ${darkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50'} rounded transition-colors`}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
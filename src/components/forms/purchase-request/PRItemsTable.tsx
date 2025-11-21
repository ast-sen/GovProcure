import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { PRItem } from '../../../types/purchase-request.types';

interface PRItemsTableProps {
  items: PRItem[];
  onUpdateItem: (id: string, field: keyof PRItem, value: string) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
  calculateTotal: () => string;
}

export const PRItemsTable: React.FC<PRItemsTableProps> = ({
  items,
  onUpdateItem,
  onRemoveItem,
  onAddItem,
  calculateTotal
}) => {
  return (
    <div className="p-6 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-20">
              Item<br/>No.
            </th>
            <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-24">
              Quantity
            </th>
            <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-32">
              Unit
            </th>
            <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center">
              Item Description
            </th>
            <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-40">
              Unit Cost
            </th>
            <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-40">
              Total Cost
            </th>
            <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-20 no-print">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-center">
                <span className="text-sm font-medium text-gray-700">{item.itemNo}</span>
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateItem(item.id, 'quantity', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                  placeholder="0"
                  step="1"
                />
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <input
                  type="text"
                  value={item.unitOfIssue}
                  onChange={(e) => onUpdateItem(item.id, 'unitOfIssue', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                  placeholder="pcs, box, etc."
                />
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <input
                  type="text"
                  value={item.itemDescription}
                  onChange={(e) => onUpdateItem(item.id, 'itemDescription', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter item description"
                />
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <input
                  type="number"
                  value={item.estimatedUnitCost}
                  onChange={(e) => onUpdateItem(item.id, 'estimatedUnitCost', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                  step="0.01"
                />
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <input
                  type="number"
                  value={item.estimatedCost}
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 bg-gray-50"
                  placeholder="0.00"
                  step="0.01"
                  readOnly
                />
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center no-print">
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  disabled={items.length === 1}
                  title="Delete item"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
          <tr className="bg-blue-50">
            <td colSpan={5} className="border border-gray-300 px-3 py-3 text-right">
              <span className="text-sm font-bold text-gray-700">TOTAL:</span>
            </td>
            <td className="border border-gray-300 px-3 py-3">
              <span className="text-sm font-bold text-gray-800">₱ {calculateTotal()}</span>
            </td>
            <td className="border border-gray-300 no-print"></td>
          </tr>
        </tbody>
      </table>

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
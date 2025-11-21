import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { PPMPItem } from '../../../types/ppmp.types';
import { MONTHS } from '../../../utils/constants/ppmp.constants';

interface PPMPFormTableProps {
  items: PPMPItem[];
  onUpdateItem: (id: string, field: keyof PPMPItem, value: string) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
}

export const PPMPFormTable: React.FC<PPMPFormTableProps> = ({
  items,
  onUpdateItem,
  onRemoveItem,
  onAddItem
}) => {
  return (
    <div className="p-6 overflow-x-auto">
      <div className="min-w-max">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-3 text-xs font-semibold text-gray-700 text-center" rowSpan={3}>
                General<br/>Description
              </th>
              <th className="border border-gray-300 px-3 py-3 text-xs font-semibold text-gray-700 text-center" rowSpan={3}>
                Unit
              </th>
              <th className="border border-gray-300 px-3 py-3 text-xs font-semibold text-gray-700 text-center" rowSpan={3}>
                Qty/Size
              </th>
              <th className="border border-gray-300 px-3 py-3 text-xs font-semibold text-gray-700 text-center" rowSpan={3}>
                Estimated<br/>Budget
              </th>
              <th className="border border-gray-300 px-2 py-3 text-xs font-semibold text-gray-700 text-center" colSpan={24}>
                Milestone of Activities
              </th>
              <th className="border border-gray-300 px-2 py-3 text-xs font-semibold text-gray-700 text-center no-print" rowSpan={3}>
                Actions
              </th>
            </tr>
            <tr className="bg-gray-100">
              {MONTHS.map((month) => (
                <th key={month.key} className="border border-gray-300 px-2 py-2 text-xs font-semibold text-gray-700" colSpan={2}>
                  {month.name}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-50">
              {MONTHS.map((month) => [
                <th key={`${month.key}-qty-label`} className="border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-700 bg-blue-50">
                  Qty
                </th>,
                <th key={`${month.key}-amt-label`} className="border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-700 bg-green-50">
                  Amt
                </th>
              ])}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="text"
                    value={item.generalDescription}
                    onChange={(e) => onUpdateItem(item.id, 'generalDescription', e.target.value)}
                    className="w-48 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                    placeholder="Item description"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => onUpdateItem(item.id, 'unit', e.target.value)}
                    className="w-20 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                    placeholder="pcs"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="text"
                    value={item.qtySize}
                    onChange={(e) => onUpdateItem(item.id, 'qtySize', e.target.value)}
                    className="w-24 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="number"
                    value={item.estimatedBudget}
                    onChange={(e) => onUpdateItem(item.id, 'estimatedBudget', e.target.value)}
                    className="w-32 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                    placeholder="0.00"
                    step="0.01"
                  />
                </td>
                
                {MONTHS.map((month) => [
                  <td key={`${item.id}-${month.key}-qty`} className="border border-gray-300 px-1 py-2 bg-blue-50">
                    <input
                      type="number"
                      value={item[`${month.key}_qty` as keyof PPMPItem] as string}
                      onChange={(e) => onUpdateItem(item.id, `${month.key}_qty` as keyof PPMPItem, e.target.value)}
                      className="w-16 px-1 py-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>,
                  <td key={`${item.id}-${month.key}-amt`} className="border border-gray-300 px-1 py-2 bg-green-50">
                    <input
                      type="number"
                      value={item[`${month.key}_amt` as keyof PPMPItem] as string}
                      onChange={(e) => onUpdateItem(item.id, `${month.key}_amt` as keyof PPMPItem, e.target.value)}
                      className="w-20 px-1 py-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </td>
                ])}

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
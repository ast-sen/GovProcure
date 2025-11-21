import React from 'react';
import { IARItem } from '../../../types/iar.types';

interface IARItemsTableProps {
  items: IARItem[];
}

export const IARItemsTable: React.FC<IARItemsTableProps> = ({ items }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-20">
              Item<br/>No.
            </th>
            <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-24">
              Unit
            </th>
            <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-32">
              Quantity
            </th>
            <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-3 text-center">
                <span className="text-sm font-medium text-gray-700">{item.itemNo}</span>
              </td>
              <td className="border border-gray-300 px-3 py-3 text-center">
                <span className="text-sm text-gray-700">{item.unit}</span>
              </td>
              <td className="border border-gray-300 px-3 py-3 text-center">
                <span className="text-sm text-gray-700">{item.quantity}</span>
              </td>
              <td className="border border-gray-300 px-3 py-3">
                <span className="text-sm text-gray-700">{item.description}</span>
              </td>
            </tr>
          ))}
          {Array.from({ length: Math.max(0, 30 - items.length) }).map((_, idx) => (
            <tr key={`empty-${idx}`} className="bg-gray-50">
              <td className="border border-gray-300 px-3 py-3 text-center">
                <span className="text-xs text-gray-400">{items.length + idx + 1}</span>
              </td>
              <td className="border border-gray-300 px-3 py-3">&nbsp;</td>
              <td className="border border-gray-300 px-3 py-3">&nbsp;</td>
              <td className="border border-gray-300 px-3 py-3">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
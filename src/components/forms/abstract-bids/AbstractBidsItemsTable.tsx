// components/forms/abstract-bids/AbstractBidsItemsTable.tsx

import React from 'react';
import { AbstractBidsItem } from '../../../types/abstract-bids.types';

interface AbstractBidsItemsTableProps {
  items: AbstractBidsItem[];
  bidderNames: string[];
}

export const AbstractBidsItemsTable: React.FC<AbstractBidsItemsTableProps> = ({ 
  items,
  bidderNames
}) => {
  const totalRows = 20;
  const emptyRowsCount = Math.max(0, totalRows - items.length);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th 
              className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-16" 
              rowSpan={2}
            >
              Item<br/>No.
            </th>
            <th 
              className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-24" 
              rowSpan={2}
            >
              Quantity
            </th>
            <th 
              className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-20" 
              rowSpan={2}
            >
              Unit
            </th>
            <th 
              className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center" 
              rowSpan={2}
            >
              Item Description
            </th>
            {bidderNames.map((bidderName, index) => (
              <th 
                key={index}
                className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center bg-gray-200" 
                colSpan={2}
              >
                {bidderName}
              </th>
            ))}
          </tr>
          <tr className="bg-gray-100">
            {bidderNames.map((_, index) => (
              <React.Fragment key={index}>
                <th className="border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 text-center w-24">
                  Unit Price
                </th>
                <th className="border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 text-center w-32">
                  Total Value
                </th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="bg-white hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-3 text-center">
                <span className="text-sm font-medium text-gray-700">{item.itemNo}</span>
              </td>
              <td className="border border-gray-300 px-3 py-3 text-center">
                <span className="text-sm text-gray-700">{item.quantity}</span>
              </td>
              <td className="border border-gray-300 px-3 py-3 text-center">
                <span className="text-sm text-gray-700">{item.unit}</span>
              </td>
              <td className="border border-gray-300 px-3 py-3">
                <span className="text-sm text-gray-700">{item.description}</span>
              </td>
              {item.bidders.map((bidder) => (
                <React.Fragment key={bidder.id}>
                  <td className="border border-gray-300 px-3 py-3 text-center">
                    <span className="text-sm text-gray-700">{bidder.unitPrice}</span>
                  </td>
                  <td className="border border-gray-300 px-3 py-3 text-center">
                    <span className="text-sm text-gray-700">{bidder.totalValue}</span>
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
          {Array.from({ length: emptyRowsCount }).map((_, idx) => (
            <tr key={`empty-${idx}`} className="bg-white">
              <td className="border border-gray-300 px-3 py-3 text-center">
                <span className="text-xs text-gray-400">{items.length + idx + 1}</span>
              </td>
              <td className="border border-gray-300 px-3 py-3">&nbsp;</td>
              <td className="border border-gray-300 px-3 py-3">&nbsp;</td>
              <td className="border border-gray-300 px-3 py-3">&nbsp;</td>
              {bidderNames.map((_, index) => (
                <React.Fragment key={index}>
                  <td className="border border-gray-300 px-3 py-3">&nbsp;</td>
                  <td className="border border-gray-300 px-3 py-3">&nbsp;</td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbstractBidsItemsTable;
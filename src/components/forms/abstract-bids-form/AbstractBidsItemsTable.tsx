// components/forms/abstract-bids/AbstractBidsItemsTable.tsx

import React from 'react';
import { AbstractBidsItem } from '../../../types/abstract-bids.types';
import { useTheme } from '../../../context/ThemeContext';

interface AbstractBidsItemsTableProps {
  items: AbstractBidsItem[];
  bidderNames: string[];
}

export const AbstractBidsItemsTable: React.FC<AbstractBidsItemsTableProps> = ({ 
  items,
  bidderNames
}) => {
  const { styles, darkMode } = useTheme();
  const totalRows = 20;
  const emptyRowsCount = Math.max(0, totalRows - items.length);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
            <th 
              className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-16`}
              rowSpan={2}
            >
              Item<br/>No.
            </th>
            <th 
              className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-24`}
              rowSpan={2}
            >
              Quantity
            </th>
            <th 
              className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center w-20`}
              rowSpan={2}
            >
              Unit
            </th>
            <th 
              className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center`}
              rowSpan={2}
            >
              Item Description
            </th>
            {bidderNames.map((bidderName, index) => (
              <th 
                key={index}
                className={`border ${styles.border} px-3 py-3 text-sm font-semibold ${styles.textPrimary} text-center ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
                colSpan={2}
              >
                {bidderName}
              </th>
            ))}
          </tr>
          <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
            {bidderNames.map((_, index) => (
              <React.Fragment key={index}>
                <th className={`border ${styles.border} px-3 py-2 text-sm font-semibold ${styles.textPrimary} text-center w-24`}>
                  Unit Price
                </th>
                <th className={`border ${styles.border} px-3 py-2 text-sm font-semibold ${styles.textPrimary} text-center w-32`}>
                  Total Value
                </th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className={`${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'}`}>
              <td className={`border ${styles.border} px-3 py-3 text-center`}>
                <span className={`text-sm font-medium ${styles.textPrimary}`}>{item.itemNo}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3 text-center`}>
                <span className={`text-sm ${styles.textPrimary}`}>{item.quantity}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3 text-center`}>
                <span className={`text-sm ${styles.textPrimary}`}>{item.unit}</span>
              </td>
              <td className={`border ${styles.border} px-3 py-3`}>
                <span className={`text-sm ${styles.textPrimary}`}>{item.description}</span>
              </td>
              {item.bidders.map((bidder) => (
                <React.Fragment key={bidder.id}>
                  <td className={`border ${styles.border} px-3 py-3 text-center`}>
                    <span className={`text-sm ${styles.textPrimary}`}>{bidder.unitPrice}</span>
                  </td>
                  <td className={`border ${styles.border} px-3 py-3 text-center`}>
                    <span className={`text-sm ${styles.textPrimary}`}>{bidder.totalValue}</span>
                  </td>
                </React.Fragment>
              ))}
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
              {bidderNames.map((_, index) => (
                <React.Fragment key={index}>
                  <td className={`border ${styles.border} px-3 py-3`}>&nbsp;</td>
                  <td className={`border ${styles.border} px-3 py-3`}>&nbsp;</td>
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
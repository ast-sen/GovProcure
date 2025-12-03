import React from 'react';
import { X } from 'lucide-react';
import { APPFormData, APPItem } from '../../../types/app.types';
import { MONTHS } from '../../../utils/constants/app.constants';
import { useTheme } from '../../../context/ThemeContext';

interface APPPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: APPFormData;
  items: APPItem[];
}

export const APPPreviewModal: React.FC<APPPreviewModalProps> = ({
  isOpen,
  onClose,
  formData,
  items
}) => {
  const { styles, darkMode } = useTheme();

  if (!isOpen) return null;

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + parseFloat(item.totalCost || '0'), 0).toFixed(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className={`${styles.bgCard} rounded-lg shadow-xl w-full max-w-[95vw] max-h-[90vh] overflow-hidden flex flex-col`}>
        {/* Modal Header */}
        <div className={`flex items-center justify-between p-4 border-b ${styles.border}`}>
          <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Preview - Annual Procurement Plan</h2>
          <button
            onClick={onClose}
            className={`p-2 ${styles.hoverBg} rounded-lg transition-colors`}
          >
            <X size={24} className={styles.textPrimary} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-4">
            {/* Header Section */}
            <div className="text-center mb-4">
              <h1 className={`text-xl font-bold ${styles.textPrimary}`}>
                APP Form #4 - Annual Procurement Plan as Procurement List
              </h1>
              <p className={`text-sm ${styles.textSecondary} mt-1`}>
                Province of [Province Name], Municipality/Department/Office
              </p>
              <p className={`text-sm ${styles.textSecondary}`}>For the year 2025</p>
            </div>

            {/* Department Info */}
            <div className={`grid grid-cols-2 gap-4 p-3 border ${styles.border} rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-sm`}>
              <div>
                <span className={`font-semibold ${styles.textPrimary}`}>Department/Office: </span>
                <span className={styles.textSecondary}>{formData.department || 'N/A'}</span>
              </div>
              <div>
                <span className={`font-semibold ${styles.textPrimary}`}>Office/Section: </span>
                <span className={styles.textSecondary}>{formData.officeSection || 'N/A'}</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className={`w-full border-collapse border ${styles.border} text-[10px]`}>
                <thead>
                  <tr className="bg-yellow-400">
                    <th className={`border border-gray-800 px-1 py-3 font-bold`} rowSpan={2} style={{writingMode: 'vertical-rl', transform: 'rotate(180deg)'}}>
                      TOTAL
                    </th>
                    {MONTHS.map((month) => (
                      <th key={month.key} className={`border border-gray-800 px-1 py-2 font-bold text-center min-w-[30px]`}>
                        {month.name}
                      </th>
                    ))}
                    <th className={`border border-gray-800 px-2 py-2 font-bold min-w-[50px]`} rowSpan={2}>
                      Item No.
                    </th>
                    <th className={`border border-gray-800 px-2 py-2 font-bold min-w-[200px]`} rowSpan={2}>
                      Description
                    </th>
                    <th className={`border border-gray-800 px-2 py-2 font-bold min-w-[80px]`} rowSpan={2}>
                      Unit Cost
                    </th>
                    <th className={`border border-gray-800 px-2 py-2 font-bold min-w-[70px]`} rowSpan={2}>
                      Quantity
                    </th>
                    <th className={`border border-gray-800 px-2 py-2 font-bold min-w-[90px]`} rowSpan={2}>
                      Total Cost<br/>(Estimated Amount)
                    </th>
                    <th className={`border border-gray-800 px-2 py-2 font-bold min-w-[80px]`} rowSpan={2}>
                      Configurer/<br/>Qty per month
                    </th>
                    <th className={`border border-gray-800 px-2 py-2 font-bold min-w-[80px]`} rowSpan={2}>
                      Qty, as of<br/>1st fill-out
                    </th>
                    <th className={`border border-gray-800 px-2 py-2 font-bold min-w-[80px]`} rowSpan={2}>
                      Qty, as of<br/>2nd/3rd<br/>Updating
                    </th>
                    <th className={`border border-gray-800 px-2 py-2 font-bold min-w-[90px]`} rowSpan={2}>
                      Total<br/>Estimated<br/>Budget
                    </th>
                  </tr>
                  <tr className="bg-yellow-300">
                    <th colSpan={12} className={`border border-gray-800 px-2 py-1 font-normal text-[9px] text-center`}>
                      This is a month-by-month procurement plan for your convenience while planning
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className={`border border-gray-800 px-1 py-2 bg-yellow-100 text-center font-semibold`}>
                        ₱{item.totalCost || '0.00'}
                      </td>
                      
                      {MONTHS.map((month) => (
                        <td key={month.key} className={`border border-gray-800 px-1 py-2 text-center`}>
                          {(item[month.key as keyof APPItem] as string) || '0'}
                        </td>
                      ))}

                      <td className={`border border-gray-800 px-2 py-2 text-center font-medium`}>
                        {item.itemNo}
                      </td>
                      <td className={`border border-gray-800 px-2 py-2`}>
                        {item.description || 'N/A'}
                      </td>
                      <td className={`border border-gray-800 px-2 py-2 text-right`}>
                        ₱{parseFloat(item.unitCost || '0').toFixed(2)}
                      </td>
                      <td className={`border border-gray-800 px-2 py-2 text-center`}>
                        {item.quantity || '0'}
                      </td>
                      <td className={`border border-gray-800 px-2 py-2 text-right font-semibold`}>
                        ₱{item.totalCost || '0.00'}
                      </td>
                      <td className={`border border-gray-800 px-2 py-2 text-center`}>
                        {item.configurer || 'N/A'}
                      </td>
                      <td className={`border border-gray-800 px-2 py-2 text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        —
                      </td>
                      <td className={`border border-gray-800 px-2 py-2 text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        —
                      </td>
                      <td className={`border border-gray-800 px-2 py-2 text-right ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        ₱{item.totalCost || '0.00'}
                      </td>
                    </tr>
                  ))}
                  
                  {/* Grand Total Row */}
                  <tr className="bg-yellow-100 font-bold">
                    <td className={`border border-gray-800 px-2 py-2 text-center`}>
                      ₱{calculateGrandTotal()}
                    </td>
                    <td colSpan={12} className={`border border-gray-800 px-2 py-2 text-center`}>
                      GRAND TOTAL
                    </td>
                    <td colSpan={7} className={`border border-gray-800 px-2 py-2 text-right text-base`}>
                      ₱{calculateGrandTotal()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Section */}
            <div className={`grid grid-cols-2 gap-8 p-4 mt-6`}>
              <div>
                <p className={`text-sm font-semibold ${styles.textPrimary} mb-1`}>Prepared by:</p>
                <div className="mt-12 border-t border-gray-400 pt-1">
                  <p className={`text-center text-sm ${styles.textSecondary}`}>{formData.preparedBy || '(Name and Designation)'}</p>
                </div>
              </div>
              <div>
                <p className={`text-sm font-semibold ${styles.textPrimary} mb-1`}>Reviewed/Recommend by:</p>
                <div className="mt-12 border-t border-gray-400 pt-1">
                  <p className={`text-center text-sm ${styles.textSecondary}`}>{formData.reviewedBy || '(Name and Designation)'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`flex justify-end gap-3 p-4 border-t ${styles.border}`}>
          <button
            onClick={onClose}
            className={`px-6 py-2 border ${styles.border} ${styles.textPrimary} rounded-lg ${styles.hoverBg} transition-colors`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { APPFormData, APPItem } from '../../../types/app.types';
import { MONTHS } from '../../../utils/constants/app.constants';

interface APPPrintTemplateProps {
  formData: APPFormData;
  items: APPItem[];
}

export const APPPrintTemplate: React.FC<APPPrintTemplateProps> = ({
  formData,
  items
}) => {
  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + parseFloat(item.totalCost || '0'), 0).toFixed(2);
  };

  return (
    <div id="printable-area" className="hidden print:block p-4 bg-white text-black">
      {/* Header */}
      <div className="text-center mb-3">
        <h1 className="text-sm font-bold mb-1">
          APP Form #4 - Annual Procurement Plan as Procurement List
        </h1>
        <p className="text-xs">Province of __________, Municipality/Department/Office</p>
        <p className="text-xs">For the year 2025</p>
      </div>

      {/* Department Info */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div>
          <span className="font-semibold">Department/Office: </span>
          <span>{formData.department || '_________________'}</span>
        </div>
        <div>
          <span className="font-semibold">Office/Section: </span>
          <span>{formData.officeSection || '_________________'}</span>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-4">
        <table className="w-full border-collapse border-2 border-gray-800" style={{fontSize: '8px'}}>
          <thead>
            <tr className="bg-yellow-400">
              <th className="border-2 border-gray-800 px-1 py-2 font-bold" rowSpan={2} style={{writingMode: 'vertical-rl', transform: 'rotate(180deg)', width: '20px'}}>
                TOTAL
              </th>
              {MONTHS.map((month) => (
                <th key={month.key} className="border border-gray-800 px-1 py-1 font-bold text-center" style={{minWidth: '25px'}}>
                  {month.name}
                </th>
              ))}
              <th className="border-2 border-gray-800 px-1 py-1 font-bold" rowSpan={2} style={{minWidth: '35px'}}>
                Item No.
              </th>
              <th className="border-2 border-gray-800 px-1 py-1 font-bold" rowSpan={2} style={{minWidth: '150px'}}>
                Description
              </th>
              <th className="border-2 border-gray-800 px-1 py-1 font-bold" rowSpan={2} style={{minWidth: '50px'}}>
                Unit Cost
              </th>
              <th className="border-2 border-gray-800 px-1 py-1 font-bold" rowSpan={2} style={{minWidth: '45px'}}>
                Quantity
              </th>
              <th className="border-2 border-gray-800 px-1 py-1 font-bold" rowSpan={2} style={{minWidth: '60px'}}>
                Total Cost<br/>(Estimated<br/>Amount)
              </th>
              <th className="border-2 border-gray-800 px-1 py-1 font-bold" rowSpan={2} style={{minWidth: '50px'}}>
                Configurer/<br/>Qty per<br/>month
              </th>
              <th className="border-2 border-gray-800 px-1 py-1 font-bold" rowSpan={2} style={{minWidth: '50px'}}>
                Qty, as of<br/>1st fill-out<br/>(Amount)
              </th>
              <th className="border-2 border-gray-800 px-1 py-1 font-bold" rowSpan={2} style={{minWidth: '50px'}}>
                Qty, as of<br/>2nd, 3rd<br/>Updating
              </th>
              <th className="border-2 border-gray-800 px-1 py-1 font-bold" rowSpan={2} style={{minWidth: '60px'}}>
                Total<br/>Estimated<br/>Budget
              </th>
            </tr>
            <tr className="bg-yellow-300">
              <th colSpan={12} className="border border-gray-800 px-1 py-1 font-normal text-center" style={{fontSize: '7px'}}>
                This is a month-by-month procurement plan for your convenience while planning
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, _index) => (
              <tr key={item.id} style={{pageBreakInside: 'avoid'}}>
                <td className="border-2 border-gray-800 px-1 py-1 bg-yellow-100 text-center font-semibold">
                  ₱{item.totalCost || '0.00'}
                </td>
                
                {MONTHS.map((month) => (
                  <td key={month.key} className="border border-gray-800 px-1 py-1 text-center">
                    {(item[month.key as keyof APPItem] as string) || '0'}
                  </td>
                ))}

                <td className="border-2 border-gray-800 px-1 py-1 text-center font-medium">
                  {item.itemNo}
                </td>
                <td className="border-2 border-gray-800 px-1 py-1">
                  {item.description || 'N/A'}
                </td>
                <td className="border-2 border-gray-800 px-1 py-1 text-right">
                  ₱{parseFloat(item.unitCost || '0').toFixed(2)}
                </td>
                <td className="border-2 border-gray-800 px-1 py-1 text-center">
                  {item.quantity || '0'}
                </td>
                <td className="border-2 border-gray-800 px-1 py-1 text-right font-semibold">
                  ₱{item.totalCost || '0.00'}
                </td>
                <td className="border-2 border-gray-800 px-1 py-1 text-center">
                  {item.configurer || '—'}
                </td>
                <td className="border-2 border-gray-800 px-1 py-1 text-center bg-gray-100">
                  —
                </td>
                <td className="border-2 border-gray-800 px-1 py-1 text-center bg-gray-100">
                  —
                </td>
                <td className="border-2 border-gray-800 px-1 py-1 text-right bg-gray-100">
                  ₱{item.totalCost || '0.00'}
                </td>
              </tr>
            ))}
            
            {/* Grand Total Row */}
            <tr className="bg-yellow-100 font-bold">
              <td className="border-2 border-gray-800 px-1 py-2 text-center">
                ₱{calculateGrandTotal()}
              </td>
              <td colSpan={12} className="border-2 border-gray-800 px-1 py-2 text-center">
                GRAND TOTAL
              </td>
              <td colSpan={7} className="border-2 border-gray-800 px-1 py-2 text-right" style={{fontSize: '10px'}}>
                ₱{calculateGrandTotal()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="grid grid-cols-2 gap-12 mt-8 text-xs">
        <div>
          <p className="font-semibold mb-1">Prepared by:</p>
          <div className="mt-16 border-t-2 border-gray-800 pt-1">
            <p className="text-center">{formData.preparedBy || '(Name and Designation)'}</p>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-1">Reviewed/Recommend by:</p>
          <div className="mt-16 border-t-2 border-gray-800 pt-1">
            <p className="text-center">{formData.reviewedBy || '(Name and Designation)'}</p>
          </div>
        </div>
      </div>

      {/* Print Date */}
      <div className="text-center mt-6" style={{fontSize: '7px'}}>
        <p className="text-gray-600">
          Printed on: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
};
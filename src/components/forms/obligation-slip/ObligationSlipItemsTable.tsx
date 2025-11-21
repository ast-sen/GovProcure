import React from 'react';

interface ObligationSlipItemsTableProps {
  formData: {
    particulars: string;
    accountCode: string;
    amount: string;
  };
  onFormDataChange: (updates: Partial<any>) => void;
}

export const ObligationSlipItemsTable: React.FC<ObligationSlipItemsTableProps> = ({ 
  formData, 
  onFormDataChange 
}) => {
  return (
    <div className="p-6">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-700">
              PARTICULARS
            </th>
            <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-700 w-48">
              ACCOUNT CODE
            </th>
            <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-700 w-48">
              AMOUNT
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-0">
              <textarea
                value={formData.particulars}
                onChange={(e) => onFormDataChange({ particulars: e.target.value })}
                className="w-full h-64 px-4 py-3 border-0 focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="PAYMENT ............"
              />
            </td>
            <td className="border border-gray-300 p-0 align-top">
              <input
                type="text"
                value={formData.accountCode}
                onChange={(e) => onFormDataChange({ accountCode: e.target.value })}
                className="w-full h-full px-4 py-3 border-0 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter code"
              />
            </td>
            <td className="border border-gray-300 p-0 align-top">
              <input
                type="text"
                value={formData.amount}
                onChange={(e) => onFormDataChange({ amount: e.target.value })}
                className="w-full h-full px-4 py-3 border-0 focus:ring-2 focus:ring-blue-500 text-right"
                placeholder="0.00"
              />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td colSpan={2} className="border border-gray-300 px-4 py-3 text-right font-bold text-gray-700">
              TOTAL :
            </td>
            <td className="border border-gray-300 px-4 py-3 text-right font-bold text-gray-900">
              {formData.amount || '0.00'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
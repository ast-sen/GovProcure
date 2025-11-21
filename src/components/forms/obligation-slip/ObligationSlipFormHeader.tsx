import React from 'react';

interface ObligationSlipFormHeaderProps {
  formData: {
    no: string;
    date: string;
    payee: string;
    address: string;
    responsibilityCenter: string;
    fppa: string;
  };
  onFormDataChange: (updates: Partial<any>) => void;
}

export const ObligationSlipFormHeader: React.FC<ObligationSlipFormHeaderProps> = ({ 
  formData, 
  onFormDataChange 
}) => {
  return (
    <div>
      <div className="border-b-2 border-gray-800 p-6">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 flex-shrink-0">
            <div className="w-full h-full rounded-full border-4 border-blue-800 flex items-center justify-center bg-blue-50">
              <span className="text-blue-800 font-bold text-xs text-center">SEAL</span>
            </div>
          </div>
          
          <div className="flex-1 text-center">
            <h2 className="text-sm font-semibold text-gray-700">Republic of the Philippines</h2>
            <h3 className="text-sm font-bold text-gray-800">PROVINCE OF BUKIDNON</h3>
            <h4 className="text-sm font-bold text-gray-800">MUNICIPALITY OF KADINGILAN</h4>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">OBLIGATION SLIP</h1>
            <p className="text-sm text-gray-600 mt-2">Page 1 of 1</p>
          </div>
          
          <div className="w-20 h-20 flex-shrink-0 opacity-0">
            <div className="w-full h-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No.:</label>
            <input
              type="text"
              value={formData.no}
              onChange={(e) => onFormDataChange({ no: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => onFormDataChange({ date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Payee/Office:</label>
            <input
              type="text"
              value={formData.payee}
              onChange={(e) => onFormDataChange({ payee: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter payee name or office"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Address:</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => onFormDataChange({ address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Responsibility Center:</label>
              <input
                type="text"
                value={formData.responsibilityCenter}
                onChange={(e) => onFormDataChange({ responsibilityCenter: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter responsibility center"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">F/P.P.A:</label>
              <input
                type="text"
                value={formData.fppa}
                onChange={(e) => onFormDataChange({ fppa: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter F/P.P.A"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
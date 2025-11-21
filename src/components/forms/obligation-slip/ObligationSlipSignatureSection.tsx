import React from 'react';

interface ObligationSlipSignatureSectionProps {
  formData: {
    requestedBy: string;
    requestedByPosition: string;
    requestedByDate: string;
    fundsAvailableBy: string;
    fundsAvailableByPosition: string;
    fundsAvailableByDate: string;
  };
  onFormDataChange: (updates: Partial<any>) => void;
}

export const ObligationSlipSignatureSection: React.FC<ObligationSlipSignatureSectionProps> = ({ 
  formData, 
  onFormDataChange 
}) => {
  return (
    <div className="p-6 border-t-2 border-gray-300">
      <div className="grid grid-cols-2 gap-6">
        <div className="border border-gray-300 p-4">
          <h3 className="font-bold text-gray-700 mb-4 text-center">A. REQUESTED BY :</h3>
          
          <div className="mb-4">
            <p className="text-xs text-gray-600 mb-2">Certified: Charges to appropriation/allotment necessary, lawful and under my direct supervision</p>
            <div className="border-b border-gray-400 h-16 mb-2"></div>
            <label className="block text-xs text-gray-600 mb-1">Signature:</label>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">Printed name:</label>
            <input
              type="text"
              value={formData.requestedBy}
              onChange={(e) => onFormDataChange({ requestedBy: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="JERRY A. CANOY JR."
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">Position:</label>
            <input
              type="text"
              value={formData.requestedByPosition}
              onChange={(e) => onFormDataChange({ requestedByPosition: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="MUNICIPAL MAYOR"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date:</label>
            <input
              type="date"
              value={formData.requestedByDate}
              onChange={(e) => onFormDataChange({ requestedByDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="border border-gray-300 p-4">
          <h3 className="font-bold text-gray-700 mb-4 text-center">B. FUNDS AVAILABLE</h3>
          
          <div className="mb-4">
            <p className="text-xs text-gray-600 mb-2">Certified: Appropriation/Allotment available and obligated for the purposes as indicated above</p>
            <div className="border-b border-gray-400 h-16 mb-2"></div>
            <label className="block text-xs text-gray-600 mb-1">Signature:</label>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">Printed name:</label>
            <input
              type="text"
              value={formData.fundsAvailableBy}
              onChange={(e) => onFormDataChange({ fundsAvailableBy: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="MARIA RHESA C. CANOY"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">Position:</label>
            <input
              type="text"
              value={formData.fundsAvailableByPosition}
              onChange={(e) => onFormDataChange({ fundsAvailableByPosition: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Mun. Budget Officer"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date:</label>
            <input
              type="date"
              value={formData.fundsAvailableByDate}
              onChange={(e) => onFormDataChange({ fundsAvailableByDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm font-bold text-gray-600">ANNEX G</p>
      </div>
    </div>
  );
};
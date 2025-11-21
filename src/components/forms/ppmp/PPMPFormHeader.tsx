import React from 'react';
import { PPMPFormData } from '../../../types/ppmp.types';

interface PPMPFormHeaderProps {
  formData: PPMPFormData;
  onUpdate: (updates: Partial<PPMPFormData>) => void;
}

export const PPMPFormHeader: React.FC<PPMPFormHeaderProps> = ({ formData, onUpdate }) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            END USER NAME:
          </label>
          <input
            type="text"
            value={formData.endUserName}
            onChange={(e) => onUpdate({ endUserName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter end user name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            OFFICE/AGENCY:
          </label>
          <input
            type="text"
            value={formData.officeAgency}
            onChange={(e) => onUpdate({ officeAgency: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter office/agency"
          />
        </div>
      </div>
    </div>
  );
};
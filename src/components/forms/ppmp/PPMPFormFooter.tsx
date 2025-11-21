import React from 'react';
import { PPMPFormData } from '../../../types/ppmp.types';

interface PPMPFormFooterProps {
  formData: PPMPFormData;
  onUpdate: (updates: Partial<PPMPFormData>) => void;
}

export const PPMPFormFooter: React.FC<PPMPFormFooterProps> = ({ formData, onUpdate }) => {
  return (
    <div className="p-6 border-t border-gray-200 bg-gray-50">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Prepared By:
          </label>
          <input
            type="text"
            value={formData.preparedBy}
            onChange={(e) => onUpdate({ preparedBy: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Name and position"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Approved By:
          </label>
          <input
            type="text"
            value={formData.approvedBy}
            onChange={(e) => onUpdate({ approvedBy: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Municipal Mayor"
          />
        </div>
      </div>
    </div>
  );
};
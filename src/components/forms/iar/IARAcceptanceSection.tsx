import React from 'react';
import { IARFormData } from '../../../types/iar.types';

interface IARAcceptanceSectionProps {
  acceptanceComplete: boolean;
  acceptancePartial: boolean;
  propertyOfficer: string;
  onUpdate: (updates: Partial<IARFormData>) => void;
}

export const IARAcceptanceSection: React.FC<IARAcceptanceSectionProps> = ({
  acceptanceComplete,
  acceptancePartial,
  propertyOfficer,
  onUpdate
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">ACCEPTANCE</h3>
      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <div className="flex gap-8 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptanceComplete}
              onChange={(e) => onUpdate({ 
                acceptanceComplete: e.target.checked,
                acceptancePartial: !e.target.checked && acceptancePartial
              })}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Complete</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptancePartial}
              onChange={(e) => onUpdate({ 
                acceptancePartial: e.target.checked,
                acceptanceComplete: !e.target.checked && acceptanceComplete
              })}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Partial</span>
          </label>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            Property Officer:
          </label>
          <input
            type="text"
            value={propertyOfficer}
            onChange={(e) => onUpdate({ propertyOfficer: e.target.value })}
            className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Enter name and position"
          />
        </div>
      </div>
    </div>
  );
};
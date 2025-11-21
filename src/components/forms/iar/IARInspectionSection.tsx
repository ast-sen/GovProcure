import React from 'react';

interface IARInspectionSectionProps {
  inspectionOfficer: string;
  onUpdate: (value: string) => void;
}

export const IARInspectionSection: React.FC<IARInspectionSectionProps> = ({
  inspectionOfficer,
  onUpdate
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">INSPECTION</h3>
      <div className="border border-gray-300 rounded-lg p-4 bg-white">
        <p className="text-sm text-gray-700 mb-3">
          Inspected, verified and found OK as to quantity and specifications
        </p>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            Inspection Officer:
          </label>
          <input
            type="text"
            value={inspectionOfficer}
            onChange={(e) => onUpdate(e.target.value)}
            className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Enter name and position"
          />
        </div>
      </div>
    </div>
  );
};
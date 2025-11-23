import React from 'react';
import { AbstractBidsFormData } from '../../../types/abstract-bids.types';
import { useTheme } from '../../../context/ThemeContext';

interface AbstractBidsFormHeaderProps {
  formData: Pick<AbstractBidsFormData, 'openedOn' | 'openedAt' | 'openedAtTime' | 'forFurnishing' | 'forOffice'>;
  onFormDataChange: (updates: Partial<AbstractBidsFormData>) => void;
}

export const AbstractBidsFormHeader: React.FC<AbstractBidsFormHeaderProps> = ({ 
  formData, 
  onFormDataChange 
}) => {
  const { styles, darkMode } = useTheme();

  return (
    <div className={`p-6 border-b ${styles.border} ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <div className="grid grid-cols-1 gap-4">
        {/* First Row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
              Abstract of bids opened on:
            </label>
            <input
              type="date"
              value={formData.openedOn}
              onChange={(e) => onFormDataChange({ openedOn: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
              At (Location):
            </label>
            <input
              type="text"
              value={formData.openedAt}
              onChange={(e) => onFormDataChange({ openedAt: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
              placeholder="Enter location"
            />
          </div>
          <div>
            <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
              At (Time):
            </label>
            <input
              type="time"
              value={formData.openedAtTime}
              onChange={(e) => onFormDataChange({ openedAtTime: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
              For Furnishing:
            </label>
            <input
              type="text"
              value={formData.forFurnishing}
              onChange={(e) => onFormDataChange({ forFurnishing: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
              placeholder="Enter what is being furnished"
            />
          </div>
          <div>
            <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
              For the Office of the:
            </label>
            <input
              type="text"
              value={formData.forOffice}
              onChange={(e) => onFormDataChange({ forOffice: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
              placeholder="Enter office name"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbstractBidsFormHeader;
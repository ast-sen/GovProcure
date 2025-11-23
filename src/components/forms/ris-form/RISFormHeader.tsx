import React from 'react';
import { RISFormData } from '../../../types/ris.types';
import { useTheme } from '../../../context/ThemeContext';

interface RISFormHeaderProps {
  formData: Pick<RISFormData, 'office' | 'reference' | 'fund' | 'risNo' | 'date'>;
  onFormDataChange: (updates: Partial<RISFormData>) => void;
}

export const RISFormHeader: React.FC<RISFormHeaderProps> = ({ 
  formData, 
  onFormDataChange 
}) => {
  const { styles } = useTheme();

  return (
    <div className={`p-6 border-b ${styles.border}`}>
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
              Office:
            </label>
            <input
              type="text"
              value={formData.office}
              onChange={(e) => onFormDataChange({ office: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
              placeholder="Enter office name"
            />
          </div>
          <div>
            <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
              Reference:
            </label>
            <input
              type="text"
              value={formData.reference}
              onChange={(e) => onFormDataChange({ reference: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
              placeholder="Enter reference number"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
              Fund:
            </label>
            <input
              type="text"
              value={formData.fund}
              onChange={(e) => onFormDataChange({ fund: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
              placeholder="Enter fund source"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
                RIS No./s:
              </label>
              <input
                type="text"
                value={formData.risNo}
                onChange={(e) => onFormDataChange({ risNo: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
                placeholder="RIS-2025-000"
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
                Date:
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => onFormDataChange({ date: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RISFormHeader;
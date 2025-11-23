import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

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
  const { styles, darkMode } = useTheme();

  return (
    <div className={`p-6 border-t-2 ${styles.border}`}>
      <div className="grid grid-cols-2 gap-6">
        <div className={`border ${styles.border} p-4`}>
          <h3 className={`font-bold ${styles.textPrimary} mb-4 text-center`}>A. REQUESTED BY :</h3>
          
          <div className="mb-4">
            <p className={`text-xs ${styles.textSecondary} mb-2`}>Certified: Charges to appropriation/allotment necessary, lawful and under my direct supervision</p>
            <div className={`border-b ${darkMode ? 'border-gray-500' : 'border-gray-400'} h-16 mb-2`}></div>
            <label className={`block text-xs ${styles.textSecondary} mb-1`}>Signature:</label>
          </div>

          <div className="mb-4">
            <label className={`block text-xs font-medium ${styles.textPrimary} mb-1`}>Printed name:</label>
            <input
              type="text"
              value={formData.requestedBy}
              onChange={(e) => onFormDataChange({ requestedBy: e.target.value })}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${styles.bgInput}`}
              placeholder="JERRY A. CANOY JR."
            />
          </div>

          <div className="mb-4">
            <label className={`block text-xs font-medium ${styles.textPrimary} mb-1`}>Position:</label>
            <input
              type="text"
              value={formData.requestedByPosition}
              onChange={(e) => onFormDataChange({ requestedByPosition: e.target.value })}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${styles.bgInput}`}
              placeholder="MUNICIPAL MAYOR"
            />
          </div>

          <div>
            <label className={`block text-xs font-medium ${styles.textPrimary} mb-1`}>Date:</label>
            <input
              type="date"
              value={formData.requestedByDate}
              onChange={(e) => onFormDataChange({ requestedByDate: e.target.value })}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${styles.bgInput}`}
            />
          </div>
        </div>

        <div className={`border ${styles.border} p-4`}>
          <h3 className={`font-bold ${styles.textPrimary} mb-4 text-center`}>B. FUNDS AVAILABLE</h3>
          
          <div className="mb-4">
            <p className={`text-xs ${styles.textSecondary} mb-2`}>Certified: Appropriation/Allotment available and obligated for the purposes as indicated above</p>
            <div className={`border-b ${darkMode ? 'border-gray-500' : 'border-gray-400'} h-16 mb-2`}></div>
            <label className={`block text-xs ${styles.textSecondary} mb-1`}>Signature:</label>
          </div>

          <div className="mb-4">
            <label className={`block text-xs font-medium ${styles.textPrimary} mb-1`}>Printed name:</label>
            <input
              type="text"
              value={formData.fundsAvailableBy}
              onChange={(e) => onFormDataChange({ fundsAvailableBy: e.target.value })}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${styles.bgInput}`}
              placeholder="MARIA RHESA C. CANOY"
            />
          </div>

          <div className="mb-4">
            <label className={`block text-xs font-medium ${styles.textPrimary} mb-1`}>Position:</label>
            <input
              type="text"
              value={formData.fundsAvailableByPosition}
              onChange={(e) => onFormDataChange({ fundsAvailableByPosition: e.target.value })}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${styles.bgInput}`}
              placeholder="Mun. Budget Officer"
            />
          </div>

          <div>
            <label className={`block text-xs font-medium ${styles.textPrimary} mb-1`}>Date:</label>
            <input
              type="date"
              value={formData.fundsAvailableByDate}
              onChange={(e) => onFormDataChange({ fundsAvailableByDate: e.target.value })}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${styles.bgInput}`}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className={`text-sm font-bold ${styles.textSecondary}`}>ANNEX G</p>
      </div>
    </div>
  );
};
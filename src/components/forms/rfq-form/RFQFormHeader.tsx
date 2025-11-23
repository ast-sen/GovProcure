import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

interface RFQFormHeaderProps {
  formData: {
    department: string;
    section: string;
    prNo: string;
    sectionInfo: string;
    alobsNo: string;
    date: string;
  };
  onFormDataChange: (updates: Partial<any>) => void;
}

export const RFQFormHeader: React.FC<RFQFormHeaderProps> = ({ 
  formData, 
  onFormDataChange 
}) => {
  const { styles, darkMode } = useTheme();

  return (
    <div>
      <div className={`border-b-2 ${darkMode ? 'border-gray-600' : 'border-gray-800'} p-6`}>
        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 flex-shrink-0">
            <div className="w-full h-full rounded-full border-4 border-blue-800 flex items-center justify-center bg-blue-50">
              <span className="text-blue-800 font-bold text-xs text-center">SEAL</span>
            </div>
          </div>
          
          <div className="flex-1 text-center">
            <h2 className={`text-sm font-semibold ${styles.textSecondary}`}>Republic of the Philippines</h2>
            <h3 className={`text-sm font-bold ${styles.textPrimary}`}>PROVINCE OF BUKIDNON</h3>
            <h4 className={`text-sm font-bold ${styles.textPrimary}`}>MUNICIPALITY OF KADINGILAN</h4>
            <h5 className={`text-sm font-bold ${styles.textPrimary} mt-2`}>OFFICE OF THE BIDS AND AWARDS COMMITTEE</h5>
            <h1 className={`text-xl font-bold ${styles.textPrimary} mt-3`}>REQUEST FOR PRICE QUOTATION (RFQ)</h1>
          </div>
          
          <div className="w-20 h-20 flex-shrink-0 opacity-0"></div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className={`block text-sm font-bold ${styles.textPrimary} mb-1`}>Department:</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => onFormDataChange({ department: e.target.value })}
                className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
                placeholder="MMO OTHER MOOE"
              />
            </div>
            
            <div>
              <label className={`block text-sm font-bold ${styles.textPrimary} mb-1`}>Section:</label>
              <input
                type="text"
                value={formData.section}
                onChange={(e) => onFormDataChange({ section: e.target.value })}
                className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
                placeholder="Enter section"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className={`block text-sm font-bold ${styles.textPrimary} mb-1`}>PR No.:</label>
              <input
                type="text"
                value={formData.prNo}
                onChange={(e) => onFormDataChange({ prNo: e.target.value })}
                className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
                placeholder="1000-01-15-B-2025-1101"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className={`block text-sm font-bold ${styles.textPrimary} mb-1`}>Section:</label>
                <input
                  type="text"
                  value={formData.sectionInfo}
                  onChange={(e) => onFormDataChange({ sectionInfo: e.target.value })}
                  className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-bold ${styles.textPrimary} mb-1`}>ALOBS No.:</label>
                <input
                  type="text"
                  value={formData.alobsNo}
                  onChange={(e) => onFormDataChange({ alobsNo: e.target.value })}
                  className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-bold ${styles.textPrimary} mb-1`}>Date:</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => onFormDataChange({ date: e.target.value })}
                  className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
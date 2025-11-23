import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

interface RFQFooterSectionProps {
  formData: {
    receivedBy: string;
    nameOfEstablishment: string;
    printedNameSignature: string;
    address: string;
    cellphoneNumber: string;
    tin: string;
    vat: string;
    nonVat: boolean;
    vatExempt: boolean;
    bacChairman: string;
  };
  onFormDataChange: (updates: Partial<any>) => void;
}

export const RFQFooterSection: React.FC<RFQFooterSectionProps> = ({ 
  formData, 
  onFormDataChange 
}) => {
  const { styles, darkMode } = useTheme();

  return (
    <div className={`p-6 border-t-2 ${styles.border}`}>
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="text-right">
            <p className={`text-sm font-medium ${styles.textPrimary}`}>Very truly yours,</p>
            <div className={`mt-8 mb-2 border-b-2 ${darkMode ? 'border-gray-500' : 'border-gray-400'}`}></div>
            <input
              type="text"
              value={formData.bacChairman}
              onChange={(e) => onFormDataChange({ bacChairman: e.target.value })}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-semibold ${styles.bgInput}`}
              placeholder="ENGR. FELIX O. OGABANG, JR."
            />
            <p className={`text-sm ${styles.textSecondary} mt-1`}>BAC Chairman</p>
          </div>

          <div>
            <label className={`block text-sm font-bold ${styles.textPrimary} mb-1`}>Received by:</label>
            <input
              type="text"
              value={formData.receivedBy}
              onChange={(e) => onFormDataChange({ receivedBy: e.target.value })}
              className={`w-full px-3 py-2 border-b-2 ${darkMode ? 'border-gray-500' : 'border-gray-400'} bg-transparent focus:outline-none focus:border-blue-500 ${styles.textPrimary}`}
              placeholder="BULAC EATERY"
            />
          </div>

          <div>
            <label className={`block text-sm font-bold ${styles.textPrimary} mb-1`}>Name of Establishment:</label>
            <input
              type="text"
              value={formData.nameOfEstablishment}
              onChange={(e) => onFormDataChange({ nameOfEstablishment: e.target.value })}
              className={`w-full px-3 py-2 border-b-2 ${darkMode ? 'border-gray-500' : 'border-gray-400'} bg-transparent focus:outline-none focus:border-blue-500 ${styles.textPrimary}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-bold ${styles.textPrimary} mb-1`}>Printed Name and Signature:</label>
            <input
              type="text"
              value={formData.printedNameSignature}
              onChange={(e) => onFormDataChange({ printedNameSignature: e.target.value })}
              className={`w-full px-3 py-2 border-b-2 ${darkMode ? 'border-gray-500' : 'border-gray-400'} bg-transparent focus:outline-none focus:border-blue-500 ${styles.textPrimary}`}
              placeholder="Kadingilan, Buk"
            />
          </div>

          <div>
            <label className={`block text-sm font-bold ${styles.textPrimary} mb-1`}>Address:</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => onFormDataChange({ address: e.target.value })}
              className={`w-full px-3 py-2 border-b-2 ${darkMode ? 'border-gray-500' : 'border-gray-400'} bg-transparent focus:outline-none focus:border-blue-500 ${styles.textPrimary}`}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-bold ${styles.textPrimary} mb-1`}>TIN:</label>
            <input
              type="text"
              value={formData.tin}
              onChange={(e) => onFormDataChange({ tin: e.target.value })}
              className={`w-full px-3 py-2 border-b-2 ${darkMode ? 'border-gray-500' : 'border-gray-400'} bg-transparent focus:outline-none focus:border-blue-500 ${styles.textPrimary}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-bold ${styles.textPrimary} mb-1`}>VAT:</label>
            <input
              type="text"
              value={formData.vat}
              onChange={(e) => onFormDataChange({ vat: e.target.value })}
              className={`w-full px-3 py-2 border-b-2 ${darkMode ? 'border-gray-500' : 'border-gray-400'} bg-transparent focus:outline-none focus:border-blue-500 ${styles.textPrimary}`}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="nonVat"
              checked={formData.nonVat}
              onChange={(e) => onFormDataChange({ nonVat: e.target.checked, vatExempt: false })}
              className="w-4 h-4"
            />
            <label htmlFor="nonVat" className={`text-sm font-bold ${styles.textPrimary}`}>NON-VAT</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="vatExempt"
              checked={formData.vatExempt}
              onChange={(e) => onFormDataChange({ vatExempt: e.target.checked, nonVat: false })}
              className="w-4 h-4"
            />
            <label htmlFor="vatExempt" className={`text-sm font-bold ${styles.textPrimary}`}>VAT EXEMPT</label>
          </div>

          <div>
            <label className={`block text-sm font-bold ${styles.textPrimary} mb-1`}>Cellphone Number:</label>
            <input
              type="text"
              value={formData.cellphoneNumber}
              onChange={(e) => onFormDataChange({ cellphoneNumber: e.target.value })}
              className={`w-full px-3 py-2 border-b-2 ${darkMode ? 'border-gray-500' : 'border-gray-400'} bg-transparent focus:outline-none focus:border-blue-500 ${styles.textPrimary}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
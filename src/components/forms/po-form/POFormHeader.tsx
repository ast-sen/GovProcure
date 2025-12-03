import React from 'react';
import { POFormData } from '../../../types/purchase-order.types';
import { useTheme } from '../../../context/ThemeContext';

interface POFormHeaderProps {
  formData: POFormData;
  onUpdate: (updates: Partial<POFormData>) => void;
}

export const POFormHeader: React.FC<POFormHeaderProps> = ({ formData, onUpdate }) => {
  const { styles } = useTheme();

  return (
    <div className={`p-6 border-b ${styles.border}`}>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Supplier Address:
          </label>
          <textarea
            value={formData.supplierAddress}
            onChange={(e) => onUpdate({ supplierAddress: e.target.value })}
            className={`w-full px-4 py-2 border ${styles.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${styles.bgInput} transition-colors`}
            placeholder="Enter supplier address"
            rows={2}
          />
        </div>
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Gentlemen:
          </label>
          <textarea
            value={formData.gentlemen}
            onChange={(e) => onUpdate({ gentlemen: e.target.value })}
            className={`w-full px-4 py-2 border ${styles.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${styles.bgInput} transition-colors`}
            placeholder="Enter message"
            rows={2}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Place of Delivery:
          </label>
          <input
            type="text"
            value={formData.placeOfDelivery}
            onChange={(e) => onUpdate({ placeOfDelivery: e.target.value })}
            className={`w-full px-4 py-2 border ${styles.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput} transition-colors`}
          />
        </div>
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Date of Delivery:
          </label>
          <input
            type="date"
            value={formData.dateOfDelivery}
            onChange={(e) => onUpdate({ dateOfDelivery: e.target.value })}
            className={`w-full px-4 py-2 border ${styles.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput} transition-colors`}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Delivery Term:
          </label>
          <input
            type="text"
            value={formData.deliveryTerm}
            onChange={(e) => onUpdate({ deliveryTerm: e.target.value })}
            className={`w-full px-4 py-2 border ${styles.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput} transition-colors`}
            placeholder="Enter delivery term"
          />
        </div>
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Payment Term:
          </label>
          <input
            type="text"
            value={formData.paymentTerm}
            onChange={(e) => onUpdate({ paymentTerm: e.target.value })}
            className={`w-full px-4 py-2 border ${styles.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput} transition-colors`}
            placeholder="Enter payment term"
          />
        </div>
      </div>
    </div>
  );
};
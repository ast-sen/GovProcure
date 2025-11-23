import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

interface PRPurposeSectionProps {
  purpose: string;
  onUpdate: (purpose: string) => void;
}

export const PRPurposeSection: React.FC<PRPurposeSectionProps> = ({ purpose, onUpdate }) => {
  const { styles } = useTheme();

  return (
    <div className="mb-6">
      <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
        Purpose:
      </label>
      <textarea
        value={purpose}
        onChange={(e) => onUpdate(e.target.value)}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${styles.bgInput}`}
        placeholder="Enter the purpose of this purchase request"
        rows={3}
      />
    </div>
  );
};
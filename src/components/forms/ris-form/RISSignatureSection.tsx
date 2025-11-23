import React from 'react';
import { RISFormData } from '../../../types/ris.types';
import { useTheme } from '../../../context/ThemeContext';

interface RISSignatureSectionProps {
  formData: Pick<
    RISFormData,
    'purpose' | 'requestedBy' | 'approvedBy' | 'issuedBy' | 'receivedBy'
  >;
  onFormDataChange: (updates: Partial<RISFormData>) => void;
}

export const RISSignatureSection: React.FC<RISSignatureSectionProps> = ({
  formData,
  onFormDataChange
}) => {
  const { styles } = useTheme();

  const handleSignatureChange = (
    section: 'requestedBy' | 'approvedBy' | 'issuedBy' | 'receivedBy',
    field: 'signature' | 'name' | 'position' | 'date',
    value: string
  ) => {
    onFormDataChange({
      [section]: {
        ...formData[section],
        [field]: value
      }
    });
  };

  const sections = [
    { key: 'requestedBy' as const, label: 'REQUESTED BY:' },
    { key: 'approvedBy' as const, label: 'APPROVED BY:' },
    { key: 'issuedBy' as const, label: 'ISSUED BY:' },
    { key: 'receivedBy' as const, label: 'RECEIVED BY:' }
  ];

  return (
    <div className={`p-6 border-t ${styles.border}`}>
      {/* Purpose Section */}
      <div className="mb-6">
        <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
          Purpose:
        </label>
        <textarea
          value={formData.purpose}
          onChange={(e) => onFormDataChange({ purpose: e.target.value })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 
            focus:ring-blue-500 focus:border-transparent resize-none ${styles.bgInput}`}
          rows={3}
          placeholder="Enter the purpose of this requisition..."
        />
      </div>

      {/* Signature Grid */}
      <div className="grid grid-cols-4 gap-4">
        {sections.map(({ key, label }) => (
          <div
            key={key}
            className={`border rounded-lg p-4 ${styles.border} ${styles.bgCard}`}
          >
            <h3 className={`text-xs font-bold ${styles.textPrimary} mb-3 text-center`}>
              {label}
            </h3>

            <div className="space-y-3">
              {/* Signature */}
              <div>
                <label className={`block text-xs ${styles.textSecondary} mb-1`}>
                  Signature:
                </label>
                <input
                  type="text"
                  value={formData[key].signature}
                  onChange={(e) => handleSignatureChange(key, 'signature', e.target.value)}
                  className={`w-full px-3 py-2 text-sm border rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
                  placeholder="Sign here"
                />
              </div>

              {/* Name */}
              <div>
                <label className={`block text-xs ${styles.textSecondary} mb-1`}>
                  Printed name:
                </label>
                <input
                  type="text"
                  value={formData[key].name}
                  onChange={(e) => handleSignatureChange(key, 'name', e.target.value)}
                  className={`w-full px-3 py-2 text-sm border rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
                  placeholder="Full name"
                />
              </div>

              {/* Position */}
              <div>
                <label className={`block text-xs ${styles.textSecondary} mb-1`}>
                  Position:
                </label>
                <input
                  type="text"
                  value={formData[key].position}
                  onChange={(e) => handleSignatureChange(key, 'position', e.target.value)}
                  className={`w-full px-3 py-2 text-sm border rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
                  placeholder="Position"
                />
              </div>

              {/* Date */}
              <div>
                <label className={`block text-xs ${styles.textSecondary} mb-1`}>
                  Date:
                </label>
                <input
                  type="date"
                  value={formData[key].date}
                  onChange={(e) => handleSignatureChange(key, 'date', e.target.value)}
                  className={`w-full px-3 py-2 text-sm border rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RISSignatureSection;

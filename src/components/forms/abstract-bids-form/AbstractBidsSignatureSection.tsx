// components/forms/abstract-bids/AbstractBidsSignatureSection.tsx

import React from 'react';
import { AbstractBidsFormData, BACMember } from '../../../types/abstract-bids.types';
import { useTheme } from '../../../context/ThemeContext';

interface AbstractBidsSignatureSectionProps {
  formData: Pick<AbstractBidsFormData, 'awardRecommendedTo' | 'bacMembers'>;
  onFormDataChange: (updates: Partial<AbstractBidsFormData>) => void;
}

export const AbstractBidsSignatureSection: React.FC<AbstractBidsSignatureSectionProps> = ({ 
  formData, 
  onFormDataChange 
}) => {
  const { styles, darkMode } = useTheme();

  const handleBACMemberChange = (
    memberKey: keyof AbstractBidsFormData['bacMembers'],
    field: keyof BACMember,
    value: string
  ) => {
    onFormDataChange({
      bacMembers: {
        ...formData.bacMembers,
        [memberKey]: {
          ...formData.bacMembers[memberKey],
          [field]: value
        }
      }
    });
  };

  const bacMemberSections = [
    { key: 'chairman' as const, label: 'Chairman' },
    { key: 'viceChairman' as const, label: 'Vice Chairman' },
    { key: 'member1' as const, label: 'Member 1' },
    { key: 'member2' as const, label: 'Member 2' },
    { key: 'member3' as const, label: 'Member 3' }
  ];

  return (
    <div className={`p-6 border-t ${styles.border} ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      {/* Award Recommendation */}
      <div className="mb-6">
        <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
          Award Recommended to:
        </label>
        <input
          type="text"
          value={formData.awardRecommendedTo}
          onChange={(e) => onFormDataChange({ awardRecommendedTo: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
          placeholder="Enter recommended awardee"
        />
      </div>

      {/* BAC Committee Section */}
      <div className="mb-6">
        <h3 className={`text-lg font-bold ${styles.textPrimary} mb-4 text-center`}>
          BIDS AND AWARDS COMMITTEE
        </h3>
      </div>

      {/* BAC Members Grid */}
      <div className="grid grid-cols-5 gap-4">
        {bacMemberSections.map(({ key, label }) => (
          <div key={key} className={`border ${styles.border} rounded-lg p-4 ${styles.bgCard}`}>
            <h4 className={`text-xs font-bold ${styles.textPrimary} mb-3 text-center`}>
              {label.toUpperCase()}
            </h4>
            <div className="space-y-3">
              {key === 'chairman' && (
                <div>
                  <label className={`block text-xs ${styles.textSecondary} mb-1`}>
                    Status:
                  </label>
                  <input
                    type="text"
                    value={formData.bacMembers[key].role}
                    onChange={(e) => handleBACMemberChange(key, 'role', e.target.value)}
                    className={`w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 ${styles.bgInput}`}
                    placeholder="APPROVED"
                  />
                </div>
              )}
              <div>
                <label className={`block text-xs ${styles.textSecondary} mb-1`}>
                  Name:
                </label>
                <input
                  type="text"
                  value={formData.bacMembers[key].name}
                  onChange={(e) => handleBACMemberChange(key, 'name', e.target.value)}
                  className={`w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 ${styles.bgInput}`}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className={`block text-xs ${styles.textSecondary} mb-1`}>
                  Position:
                </label>
                <input
                  type="text"
                  value={formData.bacMembers[key].position}
                  onChange={(e) => handleBACMemberChange(key, 'position', e.target.value)}
                  className={`w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 ${styles.bgInput}`}
                  placeholder="Position/Role"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className={`text-sm ${styles.textSecondary}`}>ANNEX G-4</p>
      </div>
    </div>
  );
};

export default AbstractBidsSignatureSection;
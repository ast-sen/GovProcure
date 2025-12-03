import { useState } from 'react';
import { X } from 'lucide-react';
import { ProfileTab } from '../components/profile/ProfileTab';
import { SecurityTab } from '../components/profile/SecurityTab';
import { useProfile } from '../hooks/profile/useProfile';
import { useSecurity } from '../hooks/profile/useSecurity';
import { ProfileModalProps } from '../types/profile.types';
import { useTheme } from '../context/ThemeContext';

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { styles } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  const profileHook = useProfile();
  const securityHook = useSecurity();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative ${styles.bgCard} rounded-lg shadow-2xl w-full max-w-3xl border ${styles.border}`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${styles.border}`}>
            <h2 className={`text-2xl font-bold ${styles.textPrimary}`}>My Profile</h2>
            <button
              onClick={onClose}
              className={`p-2 ${styles.hoverBg} rounded-lg transition-colors`}
            >
              <X size={24} className={styles.textSecondary} />
            </button>
          </div>

          {/* Tabs */}
          <div className={`flex border-b ${styles.border}`}>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? `${styles.textPrimary} border-b-2 border-blue-600`
                  : `${styles.textSecondary} ${styles.hoverBg}`
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'security'
                  ? `${styles.textPrimary} border-b-2 border-blue-600`
                  : `${styles.textSecondary} ${styles.hoverBg}`
              }`}
            >
              Security
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'profile' ? (
              <ProfileTab {...profileHook} />
            ) : (
              <SecurityTab {...securityHook} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
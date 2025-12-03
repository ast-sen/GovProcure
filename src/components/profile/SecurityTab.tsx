import { Lock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { SecurityData } from '../../types/profile.types';
import { useTheme } from '../../context/ThemeContext';

interface SecurityTabProps {
  securityData: SecurityData;
  updateSecurityField: (field: keyof SecurityData, value: string) => void;
  handleChangePassword: () => Promise<boolean>;
  resetSecurityForm: () => void;
}

export const SecurityTab = ({
  securityData,
  updateSecurityField,
  handleChangePassword,
  resetSecurityForm,
}: SecurityTabProps) => {
  const { styles, themeColors } = useTheme();
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordStrength = (password: string): { strength: string; color: string; width: string } => {
    if (!password) return { strength: '', color: '', width: '0%' };
    if (password.length < 6) return { strength: 'Weak', color: 'bg-red-500', width: '33%' };
    if (password.length < 10) return { strength: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { strength: 'Strong', color: 'bg-green-500', width: '100%' };
  };

  const passwordStrength = getPasswordStrength(securityData.newPassword);

  const handleSubmit = async () => {
    const success = await handleChangePassword();
    if (success) {
      setShowPasswords({ current: false, new: false, confirm: false });
    }
  };

  return (
    <div>
      {/* Security Header */}
      <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${styles.border}`}>
        <div className={`p-3 ${themeColors.primary} rounded-lg`}>
          <Shield className="text-white" size={24} />
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${styles.textPrimary}`}>
            Password & Security
          </h3>
          <p className={`text-sm ${styles.textSecondary}`}>
            Manage your password and account security
          </p>
        </div>
      </div>

      {/* Security Notice */}
      <div className={`flex gap-3 p-4 ${styles.bgCard} border ${styles.border} rounded-lg mb-6`}>
        <AlertCircle size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className={`text-sm ${styles.textPrimary} font-medium mb-1`}>
            Password Requirements
          </p>
          <ul className={`text-xs ${styles.textSecondary} space-y-1`}>
            <li>• Minimum 8 characters long</li>
            <li>• Mix of uppercase and lowercase letters recommended</li>
            <li>• Include numbers and special characters for better security</li>
          </ul>
        </div>
      </div>

      {/* Password Change Form */}
      <div className="space-y-5">
        {/* Current Password */}
        <div>
          <label className={`block text-sm font-medium ${styles.textSecondary} mb-2`}>
            Current Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className={styles.textMuted} />
            </div>
            <input
              type={showPasswords.current ? 'text' : 'password'}
              value={securityData.currentPassword}
              onChange={(e) => updateSecurityField('currentPassword', e.target.value)}
              className={`w-full pl-10 pr-10 py-2.5 ${styles.bgCard} ${styles.textPrimary} border ${styles.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPasswords.current ? (
                <EyeOff size={18} className={styles.textMuted} />
              ) : (
                <Eye size={18} className={styles.textMuted} />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className={`block text-sm font-medium ${styles.textSecondary} mb-2`}>
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className={styles.textMuted} />
            </div>
            <input
              type={showPasswords.new ? 'text' : 'password'}
              value={securityData.newPassword}
              onChange={(e) => updateSecurityField('newPassword', e.target.value)}
              className={`w-full pl-10 pr-10 py-2.5 ${styles.bgCard} ${styles.textPrimary} border ${styles.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPasswords.new ? (
                <EyeOff size={18} className={styles.textMuted} />
              ) : (
                <Eye size={18} className={styles.textMuted} />
              )}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {securityData.newPassword && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs ${styles.textSecondary}`}>Password Strength:</span>
                <span className={`text-xs font-medium ${styles.textPrimary}`}>
                  {passwordStrength.strength}
                </span>
              </div>
              <div className={`h-1.5 ${styles.bgCard} rounded-full overflow-hidden`}>
                <div 
                  className={`h-full ${passwordStrength.color} transition-all duration-300`}
                  style={{ width: passwordStrength.width }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className={`block text-sm font-medium ${styles.textSecondary} mb-2`}>
            Confirm New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className={styles.textMuted} />
            </div>
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              value={securityData.confirmPassword}
              onChange={(e) => updateSecurityField('confirmPassword', e.target.value)}
              className={`w-full pl-10 pr-10 py-2.5 ${styles.bgCard} ${styles.textPrimary} border ${styles.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                securityData.confirmPassword && 
                securityData.newPassword !== securityData.confirmPassword
                  ? 'border-red-500'
                  : ''
              }`}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPasswords.confirm ? (
                <EyeOff size={18} className={styles.textMuted} />
              ) : (
                <Eye size={18} className={styles.textMuted} />
              )}
            </button>
          </div>
          {securityData.confirmPassword && 
           securityData.newPassword !== securityData.confirmPassword && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              Passwords do not match
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-4">
          <button
            type="button"
            onClick={resetSecurityForm}
            className={`px-6 py-2 ${styles.bgCard} ${styles.textPrimary} rounded-lg ${styles.hoverBg} transition-colors font-medium border ${styles.border}`}
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={`px-6 py-2 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors font-medium flex items-center gap-2`}
          >
            <Lock size={18} />
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};
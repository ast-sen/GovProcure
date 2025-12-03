import { Lock, Key } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { useSecurity } from '../../hooks/settings/useSecurity';

export const SecurityCard = () => {
  const { styles, darkMode } = useTheme();
  const { twoFactorAuth, setTwoFactorAuth, handleChangePassword } = useSecurity();

  return (
    <div className={`${styles.bgCard} rounded-xl shadow-lg border ${styles.border} p-6 transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <Lock className="text-green-600" size={24} />
        </div>
        <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Security</h2>
      </div>

      <div className="space-y-4">
        <div className={`flex items-center justify-between p-3 rounded-lg ${styles.hoverBg} transition-colors`}>
          <div className="flex items-center gap-3">
            <Key size={20} className={styles.textSecondary} />
            <div>
              <p className={`font-medium ${styles.textPrimary}`}>Two-Factor Authentication</p>
              <p className={`text-sm ${styles.textSecondary}`}>Add extra layer of security</p>
            </div>
          </div>
          <ToggleSwitch 
            checked={twoFactorAuth} 
            onChange={() => setTwoFactorAuth(!twoFactorAuth)}
            activeColor="bg-green-600"
          />
        </div>

        <button 
          onClick={handleChangePassword}
          className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${styles.textPrimary} rounded-lg transition-all font-medium text-left flex items-center gap-3 shadow-sm hover:shadow-md`}
        >
          <Lock size={20} />
          Change Password
        </button>
      </div>
    </div>
  );
};
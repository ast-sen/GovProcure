import { Bell, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { useNotifications } from '../../hooks/settings/useNotifications';

export const NotificationsCard = () => {
  const { themeColors, styles } = useTheme();
  const { emailNotifications, setEmailNotifications, systemNotifications, setSystemNotifications } = useNotifications();

  return (
    <div className={`${styles.bgCard} rounded-xl shadow-lg border ${styles.border} p-6 transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 ${themeColors.primaryLight} rounded-lg`}>
          <Bell className={themeColors.primaryText} size={24} />
        </div>
        <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Notifications</h2>
      </div>

      <div className="space-y-4">
        <div className={`flex items-center justify-between p-3 rounded-lg ${styles.hoverBg} transition-colors`}>
          <div className="flex items-center gap-3">
            <Mail size={20} className={styles.textSecondary} />
            <div>
              <p className={`font-medium ${styles.textPrimary}`}>Email Notifications</p>
              <p className={`text-sm ${styles.textSecondary}`}>Receive updates via email</p>
            </div>
          </div>
          <ToggleSwitch 
            checked={emailNotifications} 
            onChange={() => setEmailNotifications(!emailNotifications)}
            activeColor={themeColors.primary}
          />
        </div>

        <div className={`flex items-center justify-between p-3 rounded-lg ${styles.hoverBg} transition-colors`}>
          <div className="flex items-center gap-3">
            <Bell size={20} className={styles.textSecondary} />
            <div>
              <p className={`font-medium ${styles.textPrimary}`}>System Notifications</p>
              <p className={`text-sm ${styles.textSecondary}`}>Show in-app notifications</p>
            </div>
          </div>
          <ToggleSwitch 
            checked={systemNotifications} 
            onChange={() => setSystemNotifications(!systemNotifications)}
            activeColor={themeColors.primary}
          />
        </div>
      </div>
    </div>
  );
};
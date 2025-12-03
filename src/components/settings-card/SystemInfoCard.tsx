import { useTheme } from '../../context/ThemeContext';

export const SystemInfoCard = () => {
  const { styles, darkMode, theme, themeColors } = useTheme();

  return (
    <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-blue-50 to-purple-50'} rounded-xl shadow-lg border ${styles.border} p-6 transition-all duration-300 hover:shadow-xl`}>
      <h3 className={`font-bold ${styles.textPrimary} mb-3`}>System Information</h3>
      <div className="space-y-2 text-sm">
        <div className={`flex justify-between p-2 rounded ${styles.hoverBg} transition-colors`}>
          <span className={styles.textSecondary}>Version:</span>
          <span className={`font-medium ${styles.textPrimary}`}>1.0.0</span>
        </div>
        <div className={`flex justify-between p-2 rounded ${styles.hoverBg} transition-colors`}>
          <span className={styles.textSecondary}>Last Updated:</span>
          <span className={`font-medium ${styles.textPrimary}`}>Nov 26, 2024</span>
        </div>
        <div className={`flex justify-between p-2 rounded ${styles.hoverBg} transition-colors`}>
          <span className={styles.textSecondary}>Database:</span>
          <span className="font-medium text-green-500">Connected</span>
        </div>
        <div className={`flex justify-between p-2 rounded ${styles.hoverBg} transition-colors`}>
          <span className={styles.textSecondary}>Theme:</span>
          <span className={`font-medium capitalize ${themeColors.primaryText}`}>{theme}</span>
        </div>
        <div className={`flex justify-between p-2 rounded ${styles.hoverBg} transition-colors`}>
          <span className={styles.textSecondary}>Mode:</span>
          <span className={`font-medium ${styles.textPrimary}`}>{darkMode ? 'Dark' : 'Light'}</span>
        </div>
      </div>
    </div>
  );
};
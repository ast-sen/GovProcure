import { Settings, ArrowLeft, Save, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { AdminManagementCard } from '../../components/settings-card/AdminManagementCard';
import { AppearanceCard } from '../../components/settings-card/AppearanceCard';
import { NotificationsCard } from '../../components/settings-card/NotificationsCard';
import { SecurityCard } from '../../components/settings-card/SecurityCard';
import { LanguageCard } from '../../components/settings-card/LanguageCard';
import { DataManagementCard } from '../../components/settings-card/DataManagementCard';
import { SystemInfoCard } from '../../components/settings-card/SystemInfoCard';
import { useSettings } from '../../hooks/settings/useSettings';

interface SettingsScreenProps {
  onNavigate?: (nav: string) => void;
}

export const SettingsScreen = ({ onNavigate }: SettingsScreenProps) => {
  const { themeColors, styles, darkMode } = useTheme();
  const { saveMessage, handleSaveSettings } = useSettings();

  return (
    <div className={`min-h-screen ${styles.bgMain} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            {onNavigate && (
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center gap-2 px-3 py-2 ${styles.textSecondary} ${styles.hoverBg} rounded-lg transition-colors`}
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
            )}
            <div className={`p-2 ${themeColors.primaryLight} rounded-lg`}>
              <Settings className={themeColors.primaryText} size={32} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${styles.textPrimary}`}>Settings</h1>
              <p className={styles.textSecondary}>Manage your application preferences and configurations</p>
            </div>
          </div>
        </div>

        {/* Save Success Message */}
        {saveMessage && (
          <div className={`mb-4 p-4 ${darkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-100 border-green-300'} border rounded-lg flex items-center gap-2`}>
            <Check className="text-green-600" size={20} />
            <span className={`${darkMode ? 'text-green-400' : 'text-green-800'} font-medium`}>{saveMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <AdminManagementCard onNavigate={onNavigate} />
            <AppearanceCard />
            <NotificationsCard />
            <SecurityCard />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <LanguageCard />
            <DataManagementCard />
            <SystemInfoCard />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveSettings}
            className={`px-6 py-3 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors font-medium flex items-center gap-2 shadow-lg`}
          >
            <Save size={20} />
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;

// src/pages/SettingsScreen.tsx
import { useState } from 'react';
import {
  Settings,
  ArrowLeft,
  Palette,
  Moon,
  Sun,
  Bell,
  Lock,
  Globe,
  Database,
  Shield,
  Mail,
  Download,
  Trash2,
  Save,
  RefreshCw,
  Key,
  Check
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SettingsScreenProps {
  onNavigate?: (nav: string) => void;
}

export const SettingsScreen = ({ onNavigate }: SettingsScreenProps) => {
  const { darkMode, setDarkMode, theme, setTheme, themeColors, styles } = useTheme();
  
  const [language, setLanguage] = useState('english');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const themes = [
    { name: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { name: 'purple', label: 'Purple', color: 'bg-purple-500' },
    { name: 'green', label: 'Green', color: 'bg-green-500' },
    { name: 'red', label: 'Red', color: 'bg-red-500' },
    { name: 'orange', label: 'Orange', color: 'bg-orange-500' },
    { name: 'teal', label: 'Teal', color: 'bg-teal-500' }
  ];

  const handleSaveSettings = () => {
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleExportData = () => {
    alert('Data export initiated. You will receive a download link via email.');
  };

  const handleClearCache = () => {
    if (confirm('Are you sure you want to clear cache?')) {
      alert('Cache cleared successfully!');
    }
  };

  // Toggle Switch Component
  const ToggleSwitch = ({ checked, onChange, activeColor = 'bg-blue-600' }: { checked: boolean; onChange: () => void; activeColor?: string }) => (
    <div
      className={`w-14 h-8 rounded-full transition-colors cursor-pointer ${checked ? activeColor : 'bg-gray-400'}`}
      onClick={onChange}
    >
      <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform mt-1 ${checked ? 'translate-x-7 ml-1' : 'translate-x-1'}`} />
    </div>
  );

  return (
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
        <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center gap-2">
          <Check className="text-green-600" size={20} />
          <span className="text-green-800 font-medium">{saveMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
       <div className="lg:col-span-2 space-y-6">
          <div className={`${styles.bgCard} rounded-xl shadow p-6 transition-colors duration-300`}>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-red-600" size={24} />
                <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Admin Management</h2>
              </div>
              <p className={`${styles.textSecondary} text-sm mb-4`}>Manage administrative users and permissions</p>
              
              <button
                onClick={() => onNavigate && onNavigate('admin-login')}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium w-full"
              >
                <Lock size={20} />
                Admin Login
              </button>

              <div className={`mt-4 p-4 ${darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border rounded-lg`}>
                <div className="flex items-start gap-2">
                  <Shield size={18} className="text-yellow-600 mt-0.5" />
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>Admin Access Required</p>
                    <p className={`text-xs ${darkMode ? 'text-yellow-500' : 'text-yellow-700'} mt-1`}>Only users with admin privileges can modify system settings</p>
                  </div>
                </div>
              </div>
            </div>
          {/* Appearance Settings */}
          <div className={`${styles.bgCard} rounded-xl shadow p-6 transition-colors duration-300`}>
            <div className="flex items-center gap-3 mb-4">
              <Palette className="text-purple-600" size={24} />
              <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Appearance</h2>
            </div>

            {/* Dark Mode Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon size={20} className="text-purple-400" /> : <Sun size={20} className="text-yellow-500" />}
                  <div>
                    <p className={`font-medium ${styles.textPrimary}`}>Dark Mode</p>
                    <p className={`text-sm ${styles.textSecondary}`}>Toggle dark/light theme</p>
                  </div>
                </div>
                <ToggleSwitch 
                  checked={darkMode} 
                  onChange={() => setDarkMode(!darkMode)} 
                  activeColor="bg-purple-600"
                />
              </div>
            </div>

            {/* Theme Colors */}
            <div>
              <label className={`block text-sm font-medium ${styles.textSecondary} mb-3`}>Theme Color</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {themes.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setTheme(t.name)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      theme === t.name
                        ? `border-gray-800 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`
                        : `${darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center`}>
                      {theme === t.name && <Check size={16} className="text-white" />}
                    </div>
                    <span className={`text-xs font-medium ${styles.textPrimary}`}>{t.label}</span>
                  </button>
                ))}
              </div>
              <p className={`text-xs ${styles.textSecondary} mt-3`}>Theme color will apply to buttons, icons, and accents throughout the app.</p>
            </div>
          </div>

          {/* Notifications */}
          <div className={`${styles.bgCard} rounded-xl shadow p-6 transition-colors duration-300`}>
            <div className="flex items-center gap-3 mb-4">
              <Bell className={themeColors.primaryText} size={24} />
              <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
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

              <div className="flex items-center justify-between">
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

          {/* Security */}
          <div className={`${styles.bgCard} rounded-xl shadow p-6 transition-colors duration-300`}>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-green-600" size={24} />
              <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
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

              <button className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${styles.textPrimary} rounded-lg transition-colors font-medium text-left flex items-center gap-3`}>
                <Lock size={20} />
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Language */}
          <div className={`${styles.bgCard} rounded-xl shadow p-6 transition-colors duration-300`}>
            <div className="flex items-center gap-3 mb-4">
              <Globe className={themeColors.primaryText} size={24} />
              <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Language</h2>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${styles.bgInput}`}
            >
              <option value="english">English</option>
              <option value="filipino">Filipino</option>
              <option value="spanish">Spanish</option>
            </select>
          </div>

          {/* Data Management */}
          <div className={`${styles.bgCard} rounded-xl shadow p-6 transition-colors duration-300`}>
            <div className="flex items-center gap-3 mb-4">
              <Database className="text-purple-600" size={24} />
              <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Data Management</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <RefreshCw size={20} className={styles.textSecondary} />
                  <div>
                    <p className={`font-medium ${styles.textPrimary}`}>Auto Backup</p>
                    <p className={`text-sm ${styles.textSecondary}`}>Daily automatic backups</p>
                  </div>
                </div>
                <ToggleSwitch 
                  checked={autoBackup} 
                  onChange={() => setAutoBackup(!autoBackup)}
                  activeColor="bg-purple-600"
                />
              </div>

              <button
                onClick={handleExportData}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Export Data
              </button>

              <button
                onClick={handleClearCache}
                className={`w-full px-4 py-3 ${darkMode ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-100 text-red-700 hover:bg-red-200'} rounded-lg transition-colors font-medium flex items-center justify-center gap-2`}
              >
                <Trash2 size={20} />
                Clear Cache
              </button>
            </div>
          </div>

          {/* System Info */}
          <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-blue-50 to-purple-50'} rounded-xl shadow p-6 transition-colors duration-300`}>
            <h3 className={`font-bold ${styles.textPrimary} mb-3`}>System Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={styles.textSecondary}>Version:</span>
                <span className={`font-medium ${styles.textPrimary}`}>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className={styles.textSecondary}>Last Updated:</span>
                <span className={`font-medium ${styles.textPrimary}`}>Nov 9, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className={styles.textSecondary}>Database:</span>
                <span className="font-medium text-green-500">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className={styles.textSecondary}>Theme:</span>
                <span className={`font-medium capitalize ${themeColors.primaryText}`}>{theme}</span>
              </div>
              <div className="flex justify-between">
                <span className={styles.textSecondary}>Mode:</span>
                <span className={`font-medium ${styles.textPrimary}`}>{darkMode ? 'Dark' : 'Light'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveSettings}
          className={`px-6 py-3 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors font-medium flex items-center gap-2`}
        >
          <Save size={20} />
          Save All Settings
        </button>
      </div>

      
    </div>
  );
};

export default SettingsScreen;
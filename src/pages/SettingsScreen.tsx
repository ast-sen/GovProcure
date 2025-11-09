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
  UserPlus,
  Users,
  Key
} from 'lucide-react';

interface SettingsScreenProps {
    onNavigate?: (nav: string) => void;
}

export const SettingsScreen = ({ onNavigate }: SettingsScreenProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState('blue');
  const [language, setLanguage] = useState('english');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showManageUsersModal, setShowManageUsersModal] = useState(false);

  const themes = [
    { name: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { name: 'purple', label: 'Purple', color: 'bg-purple-500' },
    { name: 'green', label: 'Green', color: 'bg-green-500' },
    { name: 'red', label: 'Red', color: 'bg-red-500' },
    { name: 'orange', label: 'Orange', color: 'bg-orange-500' },
    { name: 'teal', label: 'Teal', color: 'bg-teal-500' }
  ];

  const handleSaveSettings = () => {
    // TODO: Save settings to backend
    console.log('Saving settings...');
    alert('Settings saved successfully!');
  };

  const handleExportData = () => {
    console.log('Exporting data...');
    alert('Data export initiated. You will receive a download link via email.');
  };

  const handleClearCache = () => {
    if (confirm('Are you sure you want to clear cache? This will log you out.')) {
      console.log('Clearing cache...');
      alert('Cache cleared successfully!');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        {onNavigate && (
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back </span>
              </button>
            )}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Settings className="text-gray-600" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-600">Manage your application preferences and configurations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Admin Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-red-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Admin Management</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">Manage administrative users and permissions</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => setShowAdminModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <UserPlus size={20} />
                Add New Admin
              </button>
              <button
                onClick={() => setShowManageUsersModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                <Users size={20} />
                Manage Users
              </button>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield size={18} className="text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Admin Access Required</p>
                  <p className="text-xs text-yellow-700 mt-1">Only users with admin privileges can modify system settings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="text-purple-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Appearance</h2>
            </div>

            {/* Dark Mode Toggle */}
            <div className="mb-6">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon size={20} className="text-gray-600" /> : <Sun size={20} className="text-yellow-500" />}
                  <div>
                    <p className="font-medium text-gray-800">Dark Mode</p>
                    <p className="text-sm text-gray-600">Toggle dark/light theme</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-14 h-8 rounded-full transition-colors ${
                      darkMode ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform mt-1 ${
                        darkMode ? 'translate-x-7 ml-1' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </div>
              </label>
            </div>

            {/* Theme Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Theme Color</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {themes.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setTheme(t.name)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      theme === t.name
                        ? 'border-gray-800 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full ${t.color}`} />
                    <span className="text-xs font-medium text-gray-700">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-14 h-8 rounded-full transition-colors ${
                      emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setEmailNotifications(!emailNotifications)}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform mt-1 ${
                        emailNotifications ? 'translate-x-7 ml-1' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </div>
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">System Notifications</p>
                    <p className="text-sm text-gray-600">Show in-app notifications</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={systemNotifications}
                    onChange={(e) => setSystemNotifications(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-14 h-8 rounded-full transition-colors ${
                      systemNotifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setSystemNotifications(!systemNotifications)}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform mt-1 ${
                        systemNotifications ? 'translate-x-7 ml-1' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-green-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Security</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <Key size={20} className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add extra layer of security</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={twoFactorAuth}
                    onChange={(e) => setTwoFactorAuth(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-14 h-8 rounded-full transition-colors ${
                      twoFactorAuth ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform mt-1 ${
                        twoFactorAuth ? 'translate-x-7 ml-1' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </div>
              </label>

              <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-left flex items-center gap-3">
                <Lock size={20} />
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - System Settings */}
        <div className="space-y-6">
          {/* Language */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Language</h2>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="english">English</option>
              <option value="filipino">Filipino</option>
              <option value="spanish">Spanish</option>
            </select>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="text-purple-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Data Management</h2>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer mb-4">
                <div className="flex items-center gap-3">
                  <RefreshCw size={20} className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Auto Backup</p>
                    <p className="text-sm text-gray-600">Daily automatic backups</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={autoBackup}
                    onChange={(e) => setAutoBackup(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-14 h-8 rounded-full transition-colors ${
                      autoBackup ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setAutoBackup(!autoBackup)}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform mt-1 ${
                        autoBackup ? 'translate-x-7 ml-1' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </div>
              </label>

              <button
                onClick={handleExportData}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Export Data
              </button>

              <button
                onClick={handleClearCache}
                className="w-full px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Trash2 size={20} />
                Clear Cache
              </button>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow p-6">
            <h3 className="font-bold text-gray-800 mb-3">System Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Version:</span>
                <span className="font-medium text-gray-800">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium text-gray-800">Nov 9, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Database:</span>
                <span className="font-medium text-green-600">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
        >
          <Save size={20} />
          Save All Settings
        </button>
      </div>

      {/* Add Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowAdminModal(false)} />
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Admin</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter admin name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Super Admin</option>
                    <option>BAC Admin</option>
                    <option>Finance Admin</option>
                    <option>Department Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Admin added successfully!');
                    setShowAdminModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Add Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Users Modal */}
      {showManageUsersModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowManageUsersModal(false)} />
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Manage Users</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800">John Admin</td>
                      <td className="px-4 py-3 text-sm text-gray-600">john@example.com</td>
                      <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">Super Admin</span></td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">Remove</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-800">Jane Smith</td>
                      <td className="px-4 py-3 text-sm text-gray-600">jane@example.com</td>
                      <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">BAC Admin</span></td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">Remove</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowManageUsersModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;
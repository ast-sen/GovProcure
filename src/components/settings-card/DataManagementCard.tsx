import { Database, RefreshCw, Download, Trash2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { useDataManagement } from '../../hooks/settings/useDataManagement';
import { useSettings } from '../../hooks/settings/useSettings';

export const DataManagementCard = () => {
  const { styles, darkMode } = useTheme();
  const { autoBackup, setAutoBackup } = useDataManagement();
  const { handleExportData, handleClearCache } = useSettings();

  return (
    <div className={`${styles.bgCard} rounded-xl shadow-lg border ${styles.border} p-6 transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Database className="text-purple-600" size={24} />
        </div>
        <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Data Management</h2>
      </div>

      <div className="space-y-3">
        <div className={`flex items-center justify-between mb-4 p-3 rounded-lg ${styles.hoverBg} transition-colors`}>
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
          className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Download size={20} />
          Export Data
        </button>

        <button
          onClick={handleClearCache}
          className={`w-full px-4 py-3 ${darkMode ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-100 text-red-700 hover:bg-red-200'} rounded-lg transition-all font-medium flex items-center justify-center gap-2 shadow-sm hover:shadow-md`}
        >
          <Trash2 size={20} />
          Clear Cache
        </button>
      </div>
    </div>
  );
};
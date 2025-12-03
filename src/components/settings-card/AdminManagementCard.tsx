import { Shield, Lock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface AdminManagementCardProps {
  onNavigate?: (nav: string) => void;
}

export const AdminManagementCard = ({ onNavigate }: AdminManagementCardProps) => {
  const { styles, darkMode } = useTheme();

  return (
    <div className={`${styles.bgCard} rounded-xl shadow-lg border ${styles.border} p-6 transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-100 rounded-lg">
          <Shield className="text-red-600" size={24} />
        </div>
        <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Admin Management</h2>
      </div>
      <p className={`${styles.textSecondary} text-sm mb-4`}>Manage administrative users and permissions</p>
      
      <button
        onClick={() => onNavigate && onNavigate('admin-login')}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium w-full shadow-md hover:shadow-lg"
      >
        <Lock size={20} />
        Admin Login
      </button>

      <div className={`mt-4 p-4 ${darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border rounded-lg transition-colors`}>
        <div className="flex items-start gap-2">
          <Shield size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className={`text-sm font-medium ${darkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>Admin Access Required</p>
            <p className={`text-xs ${darkMode ? 'text-yellow-500' : 'text-yellow-700'} mt-1`}>Only users with admin privileges can modify system settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};
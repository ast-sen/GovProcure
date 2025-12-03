import { Users, UserPlus, Activity, Briefcase, Package, FileText, RotateCcw, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const AdminSidebar = ({ activeSection, setActiveSection }: AdminSidebarProps) => {
  const { styles, themeColors } = useTheme();
  
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'enroll', label: 'Enroll/Create User', icon: UserPlus },
    { id: 'manage', label: 'Manage Users', icon: Users },
    { id: 'logs', label: 'Activity Logs', icon: Activity },
    { id: 'designation', label: 'Designations', icon: Briefcase },
    { id: 'units', label: 'Units', icon: Package },
    { id: 'items', label: 'Items', icon: FileText },
    { id: 'reset', label: 'Reset PR & PO Number', icon: RotateCcw },
  ];

  return (
    <div className={`${styles.bgCard} rounded-lg shadow-sm border ${styles.border} p-4`}>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? `${themeColors.primaryLight} ${themeColors.primaryText}`
                  : `${styles.textPrimary} ${styles.hoverBg}`
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          );
        })}
      </nav>
    </div>
  );
};

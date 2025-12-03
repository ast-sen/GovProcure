import { useState } from 'react';
import { Users, ArrowLeft, Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { AdminSidebar } from '../../components/settings/AdminSidebar';
import { OverviewSection } from './admin-section/OverviewSection';
import { EnrollUserSection } from './admin-section/EnrollUserSection';
import { ManageUsersSection } from './admin-section/ManageUsersSection';
import { ActivityLogsSection } from './admin-section/ActivityLogsSection';
import { DesignationSection } from './admin-section/DesignationSection';
import { UnitsSection } from './admin-section/UnitsSection';
import { ItemsSection } from './admin-section/ItemsSection';
import { ResetNumbersSection } from './admin-section/ResetNumbersSection';

interface AdminDashboardProps {
  onNavigate?: (nav: string) => void;
}

export const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
  const { styles, themeColors } = useTheme();
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'enroll':
        return <EnrollUserSection />;
      case 'manage':
        return <ManageUsersSection searchTerm={searchTerm} />;
      case 'logs':
        return <ActivityLogsSection searchTerm={searchTerm} />;
      case 'designation':
        return <DesignationSection searchTerm={searchTerm} />;
      case 'units':
        return <UnitsSection searchTerm={searchTerm} />;
      case 'items':
        return <ItemsSection searchTerm={searchTerm} />;
      case 'reset':
        return <ResetNumbersSection />;
      default:
        return <OverviewSection />;
    }
  };

  const showSearch = ['manage', 'logs', 'designation', 'units', 'items'].includes(activeSection);

  return (
    <div className={`min-h-screen ${styles.bgMain}`}>
      {/* Header */}
      <div className={`${styles.bgHeader} shadow-sm border-b ${styles.border}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('settings')}
                  className={`flex items-center gap-2 px-3 py-2 ${styles.textSecondary} ${styles.hoverBg} rounded-lg transition-colors`}
                >
                  <ArrowLeft size={20} />
                  <span>Back</span>
                </button>
              )}
              <div className={`w-10 h-10 ${themeColors.primary} rounded-lg flex items-center justify-center`}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${styles.textPrimary}`}>Admin Management</h1>
                <p className={styles.textSecondary}>Manage your application preferences and configurations</p>
              </div>
            </div>
            {showSearch && (
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${styles.textMuted} w-5 h-5`} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 ${themeColors.primaryBorder} focus:border-transparent ${styles.bgInput}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <AdminSidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
import { Users, Activity, Briefcase, Package } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export const OverviewSection = () => {
  const { styles, darkMode } = useTheme();
  
  const stats = [
    { label: 'Total Users', value: '248', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Active Today', value: '89', change: '+8%', icon: Activity, color: 'green' },
    { label: 'Designations', value: '15', change: '+2', icon: Briefcase, color: 'purple' },
    { label: 'Total Items', value: '1,247', change: '+45', icon: Package, color: 'orange' },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'Created new user account', time: '5 minutes ago' },
    { user: 'Jane Smith', action: 'Updated designation list', time: '15 minutes ago' },
    { user: 'Admin', action: 'Reset PR number', time: '1 hour ago' },
    { user: 'Mike Johnson', action: 'Added new item to inventory', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${styles.bgCard} rounded-lg shadow-sm border ${styles.border} p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${styles.textSecondary}`}>{stat.label}</p>
                  <p className={`text-3xl font-bold ${styles.textPrimary} mt-1`}>{stat.value}</p>
                  <p className="text-sm text-green-600 mt-2">{stat.change} from last month</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${styles.bgCard} rounded-lg shadow-sm border ${styles.border} p-6`}>
        <h3 className={`text-lg font-semibold ${styles.textPrimary} mb-4`}>Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, idx) => (
            <div key={idx} className={`flex items-center justify-between py-3 border-b ${styles.border} last:border-0`}>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full flex items-center justify-center`}>
                  <span className={`text-sm font-medium ${styles.textPrimary}`}>{activity.user[0]}</span>
                </div>
                <div>
                  <p className={`text-sm font-medium ${styles.textPrimary}`}>{activity.user}</p>
                  <p className={`text-sm ${styles.textSecondary}`}>{activity.action}</p>
                </div>
              </div>
              <span className={`text-xs ${styles.textMuted}`}>{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

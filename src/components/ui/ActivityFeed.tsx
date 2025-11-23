import { Activity } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const { styles } = useTheme();

  return (
    <div className={`${styles.bgCard} rounded-lg shadow transition-colors duration-300`}>
      <div className={`px-6 py-4 border-b ${styles.border}`}>
        <h3 className={`text-lg font-semibold ${styles.textPrimary}`}>Recent Activity</h3>
      </div>
      <div className={`divide-y ${styles.border}`}>
        {activities.map(activity => (
          <div 
            key={activity.id} 
            className={`px-6 py-4 ${styles.hoverBg} transition-colors`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`${styles.textPrimary} font-medium`}>{activity.action}</p>
                <p className={`text-sm ${styles.textSecondary}`}>by {activity.user}</p>
              </div>
              <span className={`text-sm ${styles.textMuted}`}>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
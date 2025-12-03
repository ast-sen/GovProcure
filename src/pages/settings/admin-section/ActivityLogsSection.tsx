import { useActivityLogs } from '../../../hooks/admin/useActivityLogs';
import { useTheme } from '../../../context/ThemeContext';

interface ActivityLogsSectionProps {
  searchTerm: string;
}

export const ActivityLogsSection = ({ searchTerm }: ActivityLogsSectionProps) => {
  const { filterLogs } = useActivityLogs();
  const { styles, darkMode } = useTheme();
  const filteredLogs = filterLogs(searchTerm);

  return (
    <div className={`${styles.bgCard} rounded-lg shadow-sm border ${styles.border}`}>
      <div className={`p-6 border-b ${styles.border}`}>
        <h2 className={`text-xl font-semibold ${styles.textPrimary}`}>Activity Logs</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b ${styles.border}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${styles.textSecondary} uppercase`}>User</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${styles.textSecondary} uppercase`}>Action</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${styles.textSecondary} uppercase`}>Timestamp</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${styles.textSecondary} uppercase`}>IP Address</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${styles.border}`}>
            {filteredLogs.map((log) => (
              <tr key={log.id} className={styles.hoverBg}>
                <td className={`px-6 py-4 text-sm font-medium ${styles.textPrimary}`}>{log.user}</td>
                <td className={`px-6 py-4 text-sm ${styles.textSecondary}`}>{log.action}</td>
                <td className={`px-6 py-4 text-sm ${styles.textSecondary}`}>{log.timestamp}</td>
                <td className={`px-6 py-4 text-sm ${styles.textSecondary}`}>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

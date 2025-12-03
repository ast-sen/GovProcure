import { Eye, Edit, Trash2 } from 'lucide-react';
import { useUserManagement } from '../../../hooks/admin/useUserManagement';
import { useTheme } from '../../../context/ThemeContext';

interface ManageUsersSectionProps {
  searchTerm: string;
}

export const ManageUsersSection = ({ searchTerm }: ManageUsersSectionProps) => {
  const { filterUsers } = useUserManagement();
  const { styles, darkMode } = useTheme();
  const filteredUsers = filterUsers(searchTerm);

  return (
    <div className={`${styles.bgCard} rounded-lg shadow-sm border ${styles.border}`}>
      <div className={`p-6 border-b ${styles.border} flex items-center justify-between`}>
        <h2 className={`text-xl font-semibold ${styles.textPrimary}`}>Manage Users</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b ${styles.border}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${styles.textSecondary} uppercase`}>Name</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${styles.textSecondary} uppercase`}>Email</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${styles.textSecondary} uppercase`}>Designation</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${styles.textSecondary} uppercase`}>Status</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${styles.textSecondary} uppercase`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${styles.border}`}>
            {filteredUsers.map((user, idx) => (
              <tr key={idx} className={styles.hoverBg}>
                <td className={`px-6 py-4 text-sm font-medium ${styles.textPrimary}`}>{user.name}</td>
                <td className={`px-6 py-4 text-sm ${styles.textSecondary}`}>{user.email}</td>
                <td className={`px-6 py-4 text-sm ${styles.textSecondary}`}>{user.designation}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Eye className="w-4 h-4" /></button>
                    <button className={`p-1 ${styles.textSecondary} hover:bg-gray-100 rounded`}><Edit className="w-4 h-4" /></button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
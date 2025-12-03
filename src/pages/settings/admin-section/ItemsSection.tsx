import { Plus, Eye, Trash2 } from 'lucide-react';
import { useItems } from '../../../hooks/admin/useItems';
import { useTheme } from '../../../context/ThemeContext';

interface ItemsSectionProps {
  searchTerm: string;
}

export const ItemsSection = ({ searchTerm }: ItemsSectionProps) => {
  const { filterItems } = useItems();
  const { styles, themeColors, darkMode } = useTheme();
  const filteredItems = filterItems(searchTerm);

  return (
    <div className={`${styles.bgCard} rounded-lg shadow-sm border ${styles.border}`}>
      <div className={`p-6 border-b ${styles.border} flex items-center justify-between`}>
        <h2 className={`text-xl font-semibold ${styles.textPrimary}`}>Items</h2>
        <button className={`flex items-center space-x-2 px-4 py-2 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors`}>
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b ${styles.border}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${styles.textSecondary} uppercase`}>
                Item Name
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${styles.textSecondary} uppercase`}>
                Category
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${styles.textSecondary} uppercase`}>
                Unit
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${styles.textSecondary} uppercase`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${styles.border}`}>
            {filteredItems.map((item) => (
              <tr key={item.id} className={styles.hoverBg}>
                <td className={`px-6 py-4 text-sm font-medium ${styles.textPrimary}`}>{item.name}</td>
                <td className={`px-6 py-4 text-sm ${styles.textSecondary}`}>{item.category}</td>
                <td className={`px-6 py-4 text-sm ${styles.textSecondary}`}>{item.unit}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
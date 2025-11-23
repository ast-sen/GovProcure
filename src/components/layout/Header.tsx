// src/components/layout/Header.tsx
import { Bell, Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function Header() {
  const { styles, themeColors } = useTheme();

  return (
    <header className={`${styles.bgHeader} border-b px-6 py-4 transition-colors duration-300`}>
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search 
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${styles.textMuted}`} 
              size={20} 
            />
            <input
              type="text"
              placeholder="Search PRs, reports, suppliers..."
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${styles.bgInput}`}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 ml-6">
          <button 
            className={`relative p-2 ${styles.hoverBg} rounded-lg transition-colors`}
          >
            <Bell size={20} className={styles.textSecondary} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className={`w-10 h-10 ${themeColors.primary} rounded-full flex items-center justify-center text-white font-medium`}>
            AU
          </div>
        </div>
      </div>
    </header>
  );
}
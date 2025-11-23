import { QuickAction } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface QuickActionCardProps {
  action: QuickAction;
  onClick?: () => void;
}

export function QuickActionCard({ action, onClick }: QuickActionCardProps) {
  const { darkMode, styles } = useTheme();
  const Icon = action.icon;
  
  return (
    <button
      onClick={onClick}
      className={`${styles.bgCard} rounded-lg shadow p-6 ${darkMode ? 'hover:bg-gray-700' : 'hover:shadow-lg'} transition-all text-left group`}
    >
      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon size={24} className="text-white" />
      </div>
      <h4 className={`font-semibold ${styles.textPrimary} mb-2`}>{action.title}</h4>
      <p className={`text-sm ${styles.textSecondary}`}>{action.description}</p>
    </button>
  );
}
import { Stat } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface StatCardProps {
  stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
  const { styles } = useTheme();

  return (
    <div className={`${styles.bgCard} rounded-lg shadow p-6 transition-colors duration-300`}>
      <p className={`text-sm ${styles.textSecondary} mb-1`}>{stat.label}</p>
      <p className={`text-3xl font-bold ${styles.textPrimary} mb-2`}>{stat.value}</p>
      <p className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : styles.textSecondary}`}>
        {stat.change} from last month
      </p>
    </div>
  );
}
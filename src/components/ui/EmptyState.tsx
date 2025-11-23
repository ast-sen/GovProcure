import { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface EmptyStateProps {
  icon: ReactNode;
  message: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

const EmptyState = ({
  icon,
  message,
  description,
  action,
  className = '',
}: EmptyStateProps) => {
  const { styles } = useTheme();

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className={`flex justify-center mx-auto ${styles.textMuted} mb-3`}>{icon}</div>
      <p className={`${styles.textSecondary} font-medium`}>{message}</p>
      {description && (
        <p className={`${styles.textMuted} text-sm mt-1`}>{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;
import { useTheme } from '../../context/ThemeContext';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CONFIG = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

const LoadingSpinner = ({
  message = 'Loading...',
  size = 'md',
  className = '',
}: LoadingSpinnerProps) => {
  const { styles, themeColors } = useTheme();

  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 ${themeColors.primaryBorder} ${SIZE_CONFIG[size]}`}
      />
      {message && <span className={`ml-3 ${styles.textSecondary}`}>{message}</span>}
    </div>
  );
};

export default LoadingSpinner;
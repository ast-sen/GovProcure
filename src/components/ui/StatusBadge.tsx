import { CheckCircle, XCircle, Clock, Edit } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
  const { darkMode } = useTheme();

  const STATUS_CONFIG: Record<string, { light: string; dark: string; icon: React.ElementType }> = {
    Draft: { 
      light: 'bg-gray-100 text-gray-800', 
      dark: 'bg-gray-700 text-gray-300', 
      icon: Edit 
    },
    Pending: { 
      light: 'bg-yellow-100 text-yellow-800', 
      dark: 'bg-yellow-900/50 text-yellow-400', 
      icon: Clock 
    },
    Approved: { 
      light: 'bg-green-100 text-green-800', 
      dark: 'bg-green-900/50 text-green-400', 
      icon: CheckCircle 
    },
    Rejected: { 
      light: 'bg-red-100 text-red-800', 
      dark: 'bg-red-900/50 text-red-400', 
      icon: XCircle 
    },
  };

  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  const Icon = config.icon;
  const iconSize = size === 'sm' ? 12 : 14;
  const style = darkMode ? config.dark : config.light;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${style}`}
    >
      <Icon size={iconSize} />
      {status}
    </span>
  );
};

export default StatusBadge;
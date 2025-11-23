import { FileText, DollarSign, FileBarChart, FileCheck } from 'lucide-react';
import { DocumentType } from '../../types/approval.types';
import { useTheme } from '../../context/ThemeContext';

interface TypeBadgeProps {
  type: DocumentType;
  size?: 'sm' | 'md';
}

const TypeBadge = ({ type, size = 'md' }: TypeBadgeProps) => {
  const { darkMode } = useTheme();

  const TYPE_CONFIG: Record<DocumentType, { light: string; dark: string; icon: React.ElementType; label: string }> = {
    PPMP: { 
      light: 'bg-purple-100 text-purple-700', 
      dark: 'bg-purple-900/50 text-purple-400', 
      icon: FileText, 
      label: 'PPMP' 
    },
    PR: { 
      light: 'bg-blue-100 text-blue-700', 
      dark: 'bg-blue-900/100 text-blue-400', 
      icon: DollarSign, 
      label: 'PR' 
    },
    APP: { 
      light: 'bg-green-100 text-green-700', 
      dark: 'bg-green-900/100 text-green-400', 
      icon: FileBarChart, 
      label: 'APP' 
    },
    APPC: { 
      light: 'bg-orange-100 text-orange-700', 
      dark: 'bg-orange-900/100 text-orange-400', 
      icon: FileCheck, 
      label: 'APPC' 
    },
  };

  const config = TYPE_CONFIG[type];
  
  // Handle case where type might not exist in config
  if (!config) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
        {type}
      </span>
    );
  }

  const Icon = config.icon;
  const iconSize = size === 'sm' ? 10 : 12;
  const style = darkMode ? config.dark : config.light;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${style}`}
    >
      <Icon size={iconSize} />
      {config.label}
    </span>
  );
};

export default TypeBadge;
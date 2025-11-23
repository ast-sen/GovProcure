import { Filter } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface FilterButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasActiveFilters: boolean;
  className?: string;
}

const FilterButton = ({
  onClick,
  hasActiveFilters,
  className = '',
}: FilterButtonProps) => {
  const { darkMode, styles } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${styles.textPrimary} rounded-lg transition-colors ${className}`}
    >
      <Filter size={18} />
      <span className="font-medium">Filters</span>
      {hasActiveFilters && (
        <span className="ml-1 px-2 py-0.5 bg-indigo-600 text-white text-xs rounded-full">
          Active
        </span>
      )}
    </button>
  );
};

export default FilterButton;
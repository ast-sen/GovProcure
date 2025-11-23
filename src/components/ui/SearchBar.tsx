import { Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}: SearchBarProps) => {
  const { styles } = useTheme();

  return (
    <div className={`relative flex-1 ${className}`}>
      <Search
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${styles.textMuted}`}
        size={20}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow ${styles.bgInput}`}
      />
    </div>
  );
};

export default SearchBar;
import { useTheme } from '../../context/ThemeContext';

interface FilterPillsProps<T extends string> {
  options: T[];
  selected: T;
  onSelect: (value: T) => void;
  label: string;
  activeColor?: string;
}

function FilterPills<T extends string>({
  options,
  selected,
  onSelect,
  label,
  activeColor = 'bg-indigo-600',
}: FilterPillsProps<T>) {
  const { darkMode, styles } = useTheme();

  return (
    <div>
      <label className={`block text-sm font-medium ${styles.textPrimary} mb-2`}>
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected === option;
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isSelected
                  ? `${activeColor} text-white`
                  : `${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FilterPills;
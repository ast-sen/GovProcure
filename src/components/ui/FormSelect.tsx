import { useTheme } from '../../context/ThemeContext';

interface FormSelectProps {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export const FormSelect = ({ label, value, onChange, options, placeholder, required }: FormSelectProps) => {
  const { styles, themeColors } = useTheme();
  
  return (
    <div>
      <label className={`block text-sm font-medium ${styles.textPrimary} mb-2`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${themeColors.primaryBorder} focus:border-transparent ${styles.bgInput} transition-colors`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
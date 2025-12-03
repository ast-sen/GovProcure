import { useTheme } from '../../context/ThemeContext';

interface FormInputProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

export const FormInput = ({ label, type = 'text', value, onChange, placeholder, required }: FormInputProps) => {
  const { styles, themeColors } = useTheme();
  
  return (
    <div>
      <label className={`block text-sm font-medium ${styles.textPrimary} mb-2`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${themeColors.primaryBorder} focus:border-transparent ${styles.bgInput} transition-colors`}
      />
    </div>
  );
};
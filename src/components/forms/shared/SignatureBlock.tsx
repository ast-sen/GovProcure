import { useTheme } from '../../../context/ThemeContext';

interface SignatureBlockProps {
  label: string;
  name?: string;
  designation?: string;
  editable?: boolean;
  onNameChange?: (value: string) => void;
  onDesignationChange?: (value: string) => void;
}

export const SignatureBlock: React.FC<SignatureBlockProps> = ({
  label,
  name = '',
  designation = '',
  editable = false,
  onNameChange,
  onDesignationChange
}) => {
  const { styles, darkMode } = useTheme();

  if (editable) {
    return (
      <div className={`border ${styles.border} rounded-lg p-4`}>
        <h3 className={`text-sm font-semibold ${styles.textPrimary} mb-4`}>{label}</h3>
        <div className="space-y-4">
          <div>
            <label className={`block text-xs ${styles.textSecondary} mb-1`}>Printed Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange?.(e.target.value)}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${styles.bgInput}`}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className={`block text-xs ${styles.textSecondary} mb-1`}>Designation:</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => onDesignationChange?.(e.target.value)}
              className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${styles.bgInput}`}
              placeholder="Enter position/designation"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border ${styles.border} rounded-lg p-4 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
      <h3 className={`text-sm font-semibold ${styles.textPrimary} mb-4`}>{label}</h3>
      <div className="space-y-2 text-center">
        <div className={`h-16 border-b-2 ${darkMode ? 'border-gray-500' : 'border-gray-400'} flex items-end justify-center pb-1`}>
          <span className={`text-xs ${styles.textMuted}`}>(Signature)</span>
        </div>
        <div className="pt-2">
          <p className={`text-sm font-medium ${styles.textPrimary}`}>{name}</p>
          <p className={`text-xs ${styles.textSecondary} italic`}>{designation}</p>
        </div>
      </div>
    </div>
  );
};
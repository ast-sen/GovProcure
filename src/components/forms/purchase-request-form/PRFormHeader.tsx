import { PRFormData } from '../../../types/purchase-request.types';
import { useTheme } from '../../../context/ThemeContext';

interface PRFormHeaderProps {
  formData: PRFormData;
  onUpdate: (updates: Partial<PRFormData>) => void;
}

export const PRFormHeader: React.FC<PRFormHeaderProps> = ({ formData, onUpdate }) => {
  const { styles } = useTheme();

  return (
    <div className={`p-6 border-b ${styles.border}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Department:
          </label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => onUpdate({ department: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
            placeholder="Enter department name"
          />
        </div>
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Section:
          </label>
          <input
            type="text"
            value={formData.section}
            onChange={(e) => onUpdate({ section: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
            placeholder="Enter section"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            P.R. No.:
          </label>
          <input
            type="text"
            value={formData.prNo}
            onChange={(e) => onUpdate({ prNo: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
            placeholder="PR-2024-000"
          />
        </div>
        <div>
          <label className={`block text-sm font-semibold ${styles.textPrimary} mb-2`}>
            Date:
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => onUpdate({ date: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${styles.bgInput}`}
          />
        </div>
      </div>
    </div>
  );
};
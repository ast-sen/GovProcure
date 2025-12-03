import { Plus, Trash2 } from 'lucide-react';
import { useUnits } from '../../../hooks/admin/useUnits';
import { useTheme } from '../../../context/ThemeContext';

interface UnitsSectionProps {
  searchTerm: string;
}

export const UnitsSection = ({ searchTerm }: UnitsSectionProps) => {
  const { filterUnits } = useUnits();
  const { styles, themeColors } = useTheme();
  const filteredUnits = filterUnits(searchTerm);

  return (
    <div className={`${styles.bgCard} rounded-lg shadow-sm border ${styles.border}`}>
      <div className={`p-6 border-b ${styles.border} flex items-center justify-between`}>
        <h2 className={`text-xl font-semibold ${styles.textPrimary}`}>Units</h2>
        <button className={`flex items-center space-x-2 px-4 py-2 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors`}>
          <Plus className="w-4 h-4" />
          <span>Add Unit</span>
        </button>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className={`flex items-center justify-between p-4 border ${styles.border} rounded-lg ${styles.hoverBg}`}
            >
              <div>
                <h3 className={`font-medium ${styles.textPrimary}`}>{unit.name}</h3>
                <p className={`text-sm ${styles.textSecondary}`}>Abbreviation: {unit.abbreviation}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
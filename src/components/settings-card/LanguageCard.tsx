import { Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../hooks/settings/useLanguage';

export const LanguageCard = () => {
  const { themeColors, styles } = useTheme();
  const { language, setLanguage, languageOptions } = useLanguage();

  return (
    <div className={`${styles.bgCard} rounded-xl shadow-lg border ${styles.border} p-6 transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 ${themeColors.primaryLight} rounded-lg`}>
          <Globe className={themeColors.primaryText} size={24} />
        </div>
        <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Language</h2>
      </div>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${themeColors.primaryBorder} focus:border-transparent transition-colors ${styles.bgInput}`}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
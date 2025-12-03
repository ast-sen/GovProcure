import { ToggleSwitch } from "../ui/ToggleSwitch";
import { useTheme } from '../../context/ThemeContext';
import { Check, Moon, Palette, Sun } from "lucide-react";

export const AppearanceCard = () => {
  const { darkMode, setDarkMode, theme, setTheme, styles } = useTheme();

  const themes = [
    { name: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { name: 'purple', label: 'Purple', color: 'bg-purple-500' },
    { name: 'green', label: 'Green', color: 'bg-green-500' },
    { name: 'red', label: 'Red', color: 'bg-red-500' },
    { name: 'orange', label: 'Orange', color: 'bg-orange-500' },
    { name: 'teal', label: 'Teal', color: 'bg-teal-500' }
  ];

  return (
    <div className={`${styles.bgCard} rounded-xl shadow-lg border ${styles.border} p-6 transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Palette className="text-purple-600" size={24} />
        </div>
        <h2 className={`text-xl font-bold ${styles.textPrimary}`}>Appearance</h2>
      </div>

      {/* Dark Mode Toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon size={20} className="text-purple-400" /> : <Sun size={20} className="text-yellow-500" />}
            <div>
              <p className={`font-medium ${styles.textPrimary}`}>Dark Mode</p>
              <p className={`text-sm ${styles.textSecondary}`}>Toggle dark/light theme</p>
            </div>
          </div>
          <ToggleSwitch 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
            activeColor="bg-purple-600"
          />
        </div>
      </div>

      {/* Theme Colors */}
      <div>
        <label className={`block text-sm font-medium ${styles.textPrimary} mb-3`}>Theme Color</label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => setTheme(t.name)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                theme === t.name
                  ? `${styles.border} ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-md`
                  : `${styles.border} ${styles.hoverBg}`
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center shadow-sm`}>
                {theme === t.name && <Check size={16} className="text-white" />}
              </div>
              <span className={`text-xs font-medium ${styles.textPrimary}`}>{t.label}</span>
            </button>
          ))}
        </div>
        <p className={`text-xs ${styles.textSecondary} mt-3`}>Theme color will apply to buttons, icons, and accents throughout the app.</p>
      </div>
    </div>
  );
};
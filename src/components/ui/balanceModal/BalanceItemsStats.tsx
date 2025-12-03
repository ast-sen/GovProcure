import { useTheme } from "../../../context/ThemeContext";

interface BalanceItemsStatsProps {
  totalItems: number;
  totalAvailable: number;
  totalUsed: number;
  onStatClick: (type: 'total' | 'available' | 'used') => void;
}

export const BalanceItemsStats = ({ totalItems, totalAvailable, totalUsed, onStatClick }: BalanceItemsStatsProps) => {
  const { themeColors } = useTheme();

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <button
        onClick={() => onStatClick('total')}
        className={`${themeColors.primaryLight} rounded-lg p-4 text-left hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:${themeColors.primaryBorder} group`}
      >
        <p className={`text-sm ${themeColors.primaryText} font-medium`}>Total Items</p>
        <p className={`text-2xl font-bold ${themeColors.primaryText}`}>{totalItems}</p>
        <p className={`text-xs ${themeColors.primaryText} opacity-60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity`}>Click to view details →</p>
      </button>
      <button
        onClick={() => onStatClick('available')}
        className="bg-green-50 rounded-lg p-4 text-left hover:bg-green-100 hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-green-300 group"
      >
        <p className="text-sm text-green-600 font-medium">Total Available</p>
        <p className="text-2xl font-bold text-green-800">{totalAvailable}</p>
        <p className="text-xs text-green-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to view details →</p>
      </button>
      <button
        onClick={() => onStatClick('used')}
        className="bg-orange-50 rounded-lg p-4 text-left hover:bg-orange-100 hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-orange-300 group"
      >
        <p className="text-sm text-orange-600 font-medium">Total Used</p>
        <p className="text-2xl font-bold text-orange-800">{totalUsed}</p>
        <p className="text-xs text-orange-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to view details →</p>
      </button>
    </div>
  );
};
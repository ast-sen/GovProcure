import { BalanceItem } from '../../../types/balance-items.types';
import { useTheme } from '../../../context/ThemeContext';
import { getStockStatus } from '../../../utils/balance-items.utils';

interface BalanceItemsTableProps {
  items: BalanceItem[];
  totalUsed: number;
  totalAvailable: number;
}

export const BalanceItemsTable = ({ items }: BalanceItemsTableProps) => {
  const { styles } = useTheme();

  return (
    <div className="border rounded-lg overflow-hidden" style={{ borderColor: styles.border.replace('border-', '') }}>
      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
        <table className="w-full">
          <thead className={`${styles.bgInput} sticky top-0 z-10`}>
            <tr className={`border-b ${styles.border}`}>
              <th className={`px-4 py-3 text-left text-sm font-semibold ${styles.textPrimary}`}>Description</th>
              <th className={`px-4 py-3 text-left text-sm font-semibold ${styles.textPrimary}`}>Unit</th>
              <th className={`px-4 py-3 text-right text-sm font-semibold ${styles.textPrimary}`}>Used (pcs)</th>
              <th className={`px-4 py-3 text-right text-sm font-semibold ${styles.textPrimary}`}>Available (pcs)</th>
              <th className={`px-4 py-3 text-right text-sm font-semibold ${styles.textPrimary}`}>Total</th>
              <th className={`px-4 py-3 text-center text-sm font-semibold ${styles.textPrimary}`}>Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${styles.border}`}>
            {items.map((item) => {
              const { isLowStock } = getStockStatus(item.used, item.total);
              return (
                <tr key={item.id} className={`${styles.hoverBg} transition-colors`}>
                  <td className={`px-4 py-3 text-sm ${styles.textPrimary}`}>{item.description}</td>
                  <td className={`px-4 py-3 text-sm ${styles.textSecondary}`}>{item.unit}</td>
                  <td className={`px-4 py-3 text-sm ${styles.textPrimary} text-right font-medium`}>{item.used}</td>
                  <td className={`px-4 py-3 text-sm ${styles.textPrimary} text-right font-medium`}>{item.available}</td>
                  <td className={`px-4 py-3 text-sm ${styles.textSecondary} text-right`}>{item.total}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isLowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {isLowStock ? 'Low Stock' : 'Available'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
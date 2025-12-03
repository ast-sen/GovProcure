import { X, ArrowLeft } from 'lucide-react';
import { StatModalData } from '../../../types/balance-items.types';
import { useTheme } from '../../../context/ThemeContext';

interface StatDetailModalProps {
  data: StatModalData;
  onClose: () => void;
}

export const StatDetailModal = ({ data, onClose }: StatDetailModalProps) => {
  const { themeColors, styles } = useTheme();

  const getHeaderColor = (color: 'primary' | 'green' | 'orange') => {
    switch (color) {
      case 'primary':
        return themeColors.primary;
      case 'green':
        return 'bg-green-600';
      case 'orange':
        return 'bg-orange-500';
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className={`relative ${styles.bgCard} rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden`}>
        <div className={`${getHeaderColor(data.color)} text-white p-4 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h3 className="text-lg font-bold">{data.title}</h3>
              <p className="text-sm opacity-90">{data.items.length} items</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh]">
          <table className="w-full">
            <thead className={`${styles.bgInput} sticky top-0`}>
              <tr>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${styles.textPrimary}`}>Description</th>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${styles.textPrimary}`}>Unit</th>
                {data.showColumn === 'all' && (
                  <>
                    <th className={`px-4 py-3 text-right text-sm font-semibold ${styles.textPrimary}`}>Used</th>
                    <th className={`px-4 py-3 text-right text-sm font-semibold ${styles.textPrimary}`}>Available</th>
                  </>
                )}
                {data.showColumn === 'used' && (
                  <th className={`px-4 py-3 text-right text-sm font-semibold ${styles.textPrimary}`}>Used (pcs)</th>
                )}
                {data.showColumn === 'available' && (
                  <th className={`px-4 py-3 text-right text-sm font-semibold ${styles.textPrimary}`}>Available (pcs)</th>
                )}
              </tr>
            </thead>
            <tbody className={`divide-y ${styles.border}`}>
              {data.items.map(item => (
                <tr key={item.id} className={styles.hoverBg}>
                  <td className={`px-4 py-3 text-sm ${styles.textPrimary}`}>{item.description}</td>
                  <td className={`px-4 py-3 text-sm ${styles.textSecondary}`}>{item.unit}</td>
                  {data.showColumn === 'all' && (
                    <>
                      <td className={`px-4 py-3 text-sm ${styles.textPrimary} text-right font-medium`}>{item.used}</td>
                      <td className={`px-4 py-3 text-sm ${styles.textPrimary} text-right font-medium`}>{item.available}</td>
                    </>
                  )}
                  {data.showColumn === 'used' && (
                    <td className={`px-4 py-3 text-sm ${styles.textPrimary} text-right font-medium`}>{item.used}</td>
                  )}
                  {data.showColumn === 'available' && (
                    <td className={`px-4 py-3 text-sm ${styles.textPrimary} text-right font-medium`}>{item.available}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`p-4 border-t ${styles.border} ${styles.bgInput} flex justify-end`}>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
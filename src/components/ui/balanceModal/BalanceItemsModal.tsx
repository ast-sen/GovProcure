import { useState } from 'react';
import { X, Search, Download, RefreshCw, Package } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useBalanceItems } from '../../../hooks/useBalanceItems';
import { filterItems,calculateTotals, exportToCSV } from '../../../utils/balance-items.utils';
import { BalanceItemsModalProps,StatModal,StatModalData } from '../../../types/balance-items.types';
import { BalanceItemsTable } from './BalanceItemsTable';
import { BalanceItemsStats } from './BalanceItemsStats';
import { StatDetailModal } from './StatDetailModal';

const BalanceItemsModal = ({ isOpen, onClose }: BalanceItemsModalProps) => {
  const { themeColors, styles } = useTheme();
  const { items, loading, error, fetchBalanceItems } = useBalanceItems(isOpen);
  const [searchTerm, setSearchTerm] = useState('');
  const [statModal, setStatModal] = useState<StatModal>({ open: false, type: null });

  const filteredItems = filterItems(items, searchTerm);
  const { totalUsed, totalAvailable } = calculateTotals(filteredItems);

  const getStatModalData = (): StatModalData | null => {
    switch (statModal.type) {
      case 'total':
        return { title: 'All Items', color: 'primary', items: filteredItems, showColumn: 'all' };
      case 'available':
        return { title: 'Available Items', color: 'green', items: filteredItems.filter(i => i.available > 0), showColumn: 'available' };
      case 'used':
        return { title: 'Used Items', color: 'orange', items: filteredItems.filter(i => i.used > 0), showColumn: 'used' };
      default:
        return null;
    }
  };

  const handleStatClick = (type: 'total' | 'available' | 'used') => {
    setStatModal({ open: true, type });
  };

  const closeStatModal = () => setStatModal({ open: false, type: null });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative ${styles.bgCard} rounded-lg shadow-xl w-full max-w-6xl`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${styles.border}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${themeColors.primaryLight} rounded-lg`}>
                <Package className={themeColors.primaryText} size={24} />
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${styles.textPrimary}`}>Balance Items</h2>
                <p className={`text-sm ${styles.textSecondary}`}>Available items from Annual Procurement Plan</p>
              </div>
            </div>
            <button onClick={onClose} className={`p-2 ${styles.hoverBg} rounded-lg transition-colors`}>
              <X size={24} className={styles.textSecondary} />
            </button>
          </div>

          {/* Toolbar */}
          <div className={`p-6 border-b ${styles.border} ${styles.bgInput}`}>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${styles.textMuted}`} size={20} />
                <input
                  type="text"
                  placeholder="Search by description or unit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${styles.bgCard} ${styles.border} ${styles.textPrimary}`}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={fetchBalanceItems}
                  disabled={loading}
                  className={`flex items-center gap-2 px-4 py-2 ${styles.bgCard} border ${styles.border} rounded-lg ${styles.hoverBg} transition-colors disabled:opacity-50`}
                >
                  <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                  <span className="font-medium">Refresh</span>
                </button>
                <button
                  onClick={() => exportToCSV(filteredItems)}
                  className={`flex items-center gap-2 px-4 py-2 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors`}
                >
                  <Download size={18} />
                  <span className="font-medium">Export CSV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className={`mb-4 p-4 ${themeColors.primaryLight} border ${themeColors.primaryBorder} rounded-lg`}>
                <p className={`${themeColors.primaryText} text-sm font-medium`}>📊 Demo Mode</p>
                <p className={`${themeColors.primaryText} opacity-80 text-xs mt-1`}>Currently displaying sample data for demonstration purposes.</p>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className={`animate-spin ${themeColors.primaryText}`} size={32} />
                <span className={`ml-3 ${styles.textSecondary}`}>Loading balance items...</span>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <Package size={48} className={`mx-auto ${styles.textMuted} mb-3`} />
                <p className={styles.textSecondary}>No items found</p>
              </div>
            ) : (
              <>
                <BalanceItemsTable items={filteredItems} totalUsed={totalUsed} totalAvailable={totalAvailable} />
                <BalanceItemsStats 
                  totalItems={filteredItems.length}
                  totalAvailable={totalAvailable}
                  totalUsed={totalUsed}
                  onStatClick={handleStatClick}
                />
              </>
            )}
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-between p-6 border-t ${styles.border} ${styles.bgInput}`}>
            <p className={`text-sm ${styles.textSecondary}`}>Showing {filteredItems.length} of {items.length} items</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Stat Detail Modal */}
      {statModal.open && getStatModalData() && (
        <StatDetailModal data={getStatModalData()!} onClose={closeStatModal} />
      )}
    </div>
  );
};

export default BalanceItemsModal;
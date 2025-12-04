import { useState } from 'react';
import { X, Search, FileText, CheckCircle, Calendar, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface ApprovedFormItem {
  id: string;
  formNumber: string;
  title: string;
  dateApproved: string;
  approvedBy: string;
  amount?: number;
  supplier?: string;
  department?: string;
}

interface ApprovedFormsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ApprovedFormItem[];
  onSelectItem: (item: ApprovedFormItem) => void;
  formTypeLabel?: string; // e.g., "Purchase Order", "Abstract of Bids"
}

export function ApprovedFormsModal({
  isOpen,
  onClose,
  items,
  onSelectItem,
  formTypeLabel = "Form"
}: ApprovedFormsModalProps) {
  const { darkMode, styles, themeColors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredItems = items.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.formNumber.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.approvedBy?.toLowerCase().includes(query) ||
      item.dateApproved.toLowerCase().includes(query) ||
      item.supplier?.toLowerCase().includes(query) ||
      item.department?.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return null;
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div className={`${styles.bgCard} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col transition-colors duration-300`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${styles.border}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 ${themeColors.primaryLight} rounded-lg`}>
              <CheckCircle size={24} className={themeColors.primaryText} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${styles.textPrimary}`}>
                Approved {formTypeLabel}s
              </h2>
              <p className={`text-sm ${styles.textMuted} mt-1`}>
                Select a form to view or update
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`${styles.textMuted} hover:${styles.textSecondary} transition-colors rounded-full p-2 ${styles.hoverBg}`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className={`p-6 border-b ${styles.border}`}>
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${styles.textMuted}`} size={20} />
            <input
              type="text"
              placeholder="Search by form number, title, approver, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${styles.bgInput} ${styles.border} ${styles.textPrimary}`}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={56} className={`mx-auto ${styles.textMuted} mb-4`} />
              <p className={`${styles.textSecondary} text-lg font-medium`}>
                {searchQuery ? 'No forms found' : `No approved ${formTypeLabel.toLowerCase()}s`}
              </p>
              <p className={`${styles.textMuted} text-sm mt-2`}>
                {searchQuery 
                  ? 'Try adjusting your search terms' 
                  : `There are no approved ${formTypeLabel.toLowerCase()}s available at this time`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className={`w-full text-left p-4 border ${styles.border} rounded-lg hover:border-blue-500 ${darkMode ? 'hover:bg-blue-900/20' : 'hover:bg-blue-50'} transition-all group`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`p-2.5 rounded-lg ${themeColors.primaryLight} flex-shrink-0`}>
                        <FileText size={20} className={themeColors.primaryText} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold ${styles.textPrimary} group-hover:text-blue-500 transition-colors truncate`}>
                              {item.title}
                            </h3>
                            <p className={`text-sm font-mono ${themeColors.primaryText} mt-0.5`}>
                              {item.formNumber}
                            </p>
                          </div>
                        </div>
                        
                        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm ${styles.textSecondary}`}>
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} className={styles.textMuted} />
                            <span>{formatDate(item.dateApproved)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User size={14} className={styles.textMuted} />
                            <span className="truncate">{item.approvedBy}</span>
                          </div>
                          {item.amount && (
                            <div className="flex items-center gap-1.5 font-medium text-green-600 dark:text-green-400">
                              <span>₱</span>
                              <span>{formatCurrency(item.amount)}</span>
                            </div>
                          )}
                          {item.supplier && (
                            <div className="flex items-center gap-1.5">
                              <span className="truncate">{item.supplier}</span>
                            </div>
                          )}
                          {item.department && (
                            <div className="flex items-center gap-1.5">
                              <span>{item.department}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 ${
                      darkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700'
                    }`}>
                      Approved
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${styles.border} ${styles.bgInput}`}>
          <div className={`flex items-center justify-between text-sm ${styles.textSecondary}`}>
            <span>
              Showing {filteredItems.length} of {items.length} approved {formTypeLabel.toLowerCase()}s
            </span>
            <button
              onClick={onClose}
              className={`px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
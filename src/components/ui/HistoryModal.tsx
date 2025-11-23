import { useState } from 'react';
import { X, Search, FileText, Clock, CheckCircle } from 'lucide-react';
import { HistoryItem } from '../../types/index';
import { useTheme } from '../../context/ThemeContext';

interface HistoryModalProps<T extends HistoryItem> {
  isOpen: boolean;
  onClose: () => void;
  items: T[];
  onSelectItem: (item: T) => void;
}

export function HistoryModal<T extends HistoryItem>({
  isOpen,
  onClose,
  items,
  onSelectItem
}: HistoryModalProps<T>) {
  const { darkMode, styles } = useTheme();

  const [activeTab, setActiveTab] = useState<'drafts' | 'submitted'>('drafts');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredItems = items
    .filter(item => item.status === activeTab)
    .filter(item => {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.prNo?.toLowerCase().includes(query) ||
        item.date.toLowerCase().includes(query)
      );
    })
    .slice(0, 10);

  const draftCount = items.filter(item => item.status === 'draft').length;
  const submittedCount = items.filter(item => item.status === 'submitted').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div className={`${styles.bgCard} rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col transition-colors duration-300`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${styles.border}`}>
          <div>
            <h2 className={`text-2xl font-bold ${styles.textPrimary}`}>Document History</h2>
            <p className={`text-sm ${styles.textMuted} mt-1`}>View and manage your recent documents</p>
          </div>
          <button
            onClick={onClose}
            className={`${styles.textMuted} hover:${styles.textSecondary} transition-colors rounded-full p-2 ${styles.hoverBg}`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${styles.border} px-6`}>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors relative ${
              activeTab === 'drafts'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : `${styles.textMuted} hover:${styles.textSecondary}`
            }`}
          >
            <FileText size={18} />
            Drafts
            <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              {draftCount}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('submitted')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors relative ${
              activeTab === 'submitted'
                ? 'text-green-500 border-b-2 border-green-500'
                : `${styles.textMuted} hover:${styles.textSecondary}`
            }`}
          >
            <CheckCircle size={18} />
            Submitted
            <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              {submittedCount}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className={`p-6 border-b ${styles.border}`}>
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${styles.textMuted}`} size={20} />
            <input
              type="text"
              placeholder="Search by title, PR number, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${styles.bgInput}`}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className={`mx-auto ${styles.textMuted} mb-4`} />
              <p className={`${styles.textSecondary} text-lg font-medium`}>No {activeTab} found</p>
              <p className={`${styles.textMuted} text-sm mt-2`}>
                {searchQuery ? 'Try adjusting your search' : `You haven't saved any ${activeTab} yet`}
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
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        item.status === 'draft' 
                          ? darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                          : darkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-600'
                      }`}>
                        <FileText size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold ${styles.textPrimary} group-hover:text-blue-500 transition-colors truncate`}>
                          {item.title}
                        </h3>
                        <div className={`flex items-center gap-3 mt-1 text-sm ${styles.textMuted}`}>
                          {item.prNo && (
                            <span className="font-medium">{item.prNo}</span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'draft'
                        ? darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        : darkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.status === 'draft' ? 'Draft' : 'Submitted'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${styles.border} ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className={`flex items-center justify-between text-sm ${styles.textSecondary}`}>
            <span>Showing {filteredItems.length} of {activeTab === 'drafts' ? draftCount : submittedCount} {activeTab}</span>
            <button
              onClick={onClose}
              className={`px-4 py-2 ${styles.textPrimary} hover:opacity-80 font-medium`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
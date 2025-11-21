import { useState } from 'react';
import { X, Search, FileText, Clock, CheckCircle } from 'lucide-react';
import { HistoryItem } from '../../types/index';

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

  const [activeTab, setActiveTab] = useState<'drafts' | 'submitted'>('drafts');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Filter items based on active tab and search query
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
    .slice(0, 10); // Show only 10 most recent

  const draftCount = items.filter(item => item.status === 'draft').length;
  const submittedCount = items.filter(item => item.status === 'submitted').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Document History</h2>
            <p className="text-sm text-gray-500 mt-1">View and manage your recent documents</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-2 hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => setActiveTab('drafts')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors relative ${
              activeTab === 'drafts'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText size={18} />
            Drafts
            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
              {draftCount}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('submitted')}
            className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors relative ${
              activeTab === 'submitted'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <CheckCircle size={18} />
            Submitted
            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
              {submittedCount}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title, PR number, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">No {activeTab} found</p>
              <p className="text-gray-400 text-sm mt-2">
                {searchQuery ? 'Try adjusting your search' : `You haven't saved any ${activeTab} yet`}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        item.status === 'draft' 
                          ? 'bg-gray-100 text-gray-600' 
                          : 'bg-green-100 text-green-600'
                      }`}>
                        <FileText size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
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
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-green-100 text-green-700'
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
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {filteredItems.length} of {activeTab === 'drafts' ? draftCount : submittedCount} {activeTab}</span>
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

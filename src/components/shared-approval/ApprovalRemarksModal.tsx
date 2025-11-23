import { XCircle, Eye } from 'lucide-react';
import { BaseApprovalItem, Remark } from '../../types/approval.types';
import { useTheme } from '../../context/ThemeContext';

interface ApprovalRemarksModalProps<T extends BaseApprovalItem> {
  open: boolean;
  item: T | null;
  remarks: Remark[];
  newRemark: string;
  onRemarkChange: (value: string) => void;
  onAddRemark: () => void;
  onClose: () => void;
}

function ApprovalRemarksModal<T extends BaseApprovalItem>({
  open,
  item,
  remarks,
  newRemark,
  onRemarkChange,
  onAddRemark,
  onClose,
}: ApprovalRemarksModalProps<T>) {
  const { styles, darkMode, themeColors } = useTheme();

  if (!open || !item) return null;

  const canAddRemark = newRemark.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative ${styles.bgCard} rounded-lg shadow-xl w-full max-w-2xl`}>
          {/* Header */}
          <div className={`p-6 border-b ${styles.border}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`text-xl font-bold ${styles.textPrimary} mb-1`}>
                  Remarks & Comments
                </h3>
                <p className={`text-sm ${styles.textSecondary}`}>{item.title}</p>
                <p className={`text-xs ${styles.textMuted} mt-1`}>{item.transactionNumber}</p>
              </div>
              <button
                onClick={onClose}
                className={`p-2 ${styles.hoverBg} rounded-lg transition-colors`}
              >
                <XCircle size={20} className={styles.textSecondary} />
              </button>
            </div>
          </div>

          {/* Remarks List */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {remarks.length === 0 ? (
              <div className="text-center py-8">
                <Eye size={48} className={`mx-auto ${styles.textMuted} mb-3`} />
                <p className={styles.textSecondary}>No remarks yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {remarks.map((remark) => (
                  <div
                    key={remark.id}
                    className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 border ${styles.border}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 ${themeColors.primaryLight} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <span className={`${themeColors.primaryText} font-semibold text-sm`}>
                          {remark.author.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className={`font-semibold ${styles.textPrimary} text-sm`}>
                              {remark.author}
                            </p>
                            <p className={`text-xs ${styles.textMuted}`}>{remark.date}</p>
                          </div>
                        </div>
                        <p className={`${styles.textSecondary} text-sm`}>{remark.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Remark Section */}
          <div className={`p-6 border-t ${styles.border} ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <label className={`block text-sm font-medium ${styles.textPrimary} mb-2`}>
              Add New Remark
            </label>
            <textarea
              value={newRemark}
              onChange={(e) => onRemarkChange(e.target.value)}
              placeholder="Enter your remarks here..."
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-${themeColors.primaryText.split('-')[1]}-500 focus:border-transparent resize-none ${styles.bgInput}`}
            />
            <div className="flex gap-3 justify-end mt-3">
              <button
                onClick={onClose}
                className={`px-4 py-2 ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} ${styles.textPrimary} rounded transition-colors font-medium`}
              >
                Close
              </button>
              <button
                onClick={onAddRemark}
                disabled={!canAddRemark}
                className={`px-4 py-2 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Add Remark
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApprovalRemarksModal;
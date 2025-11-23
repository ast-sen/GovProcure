import { XCircle, Eye, CheckCircle, FileText } from 'lucide-react';
import { BaseApprovalItem, Remark } from '../../types/approval.types'; 
import StatusBadge from '../ui/StatusBadge';
import TypeBadge from '../ui/TypeBadge';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ApprovalDetailModalProps<T extends BaseApprovalItem & { status: string }> {
  open: boolean;
  item: T | null;
  remarks: Remark[];
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  onViewRemarks: () => void;
  onReview: () => void;
}

function ApprovalDetailModal<T extends BaseApprovalItem & { status: string }>({
  open,
  item,
  remarks,
  onClose,
  onApprove,
  onReject,
  onViewRemarks,
  onReview,
}: ApprovalDetailModalProps<T>) {
  const { darkMode, styles, themeColors } = useTheme();
  const [actionsOpen, setActionsOpen] = useState(false);

  if (!open || !item) return null;

  const dateField = 'dateSubmitted' in item 
    ? (item as any).dateSubmitted 
    : (item as any).dateCreated;

  const infoBgClass = darkMode ? 'bg-gray-700' : 'bg-gray-50';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative ${styles.bgCard} rounded-lg shadow-xl w-full max-w-3xl transition-colors duration-300`}>
          {/* Header */}
          <div className={`p-6 border-b ${styles.border}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <TypeBadge type={item.type} />
                  <StatusBadge status={item.status} />
                </div>
                <h3 className={`text-xl font-bold ${styles.textPrimary} mb-1`}>{item.title}</h3>
                <p className={`text-sm ${styles.textSecondary}`}>{item.transactionNumber}</p>
                {item.prNumber && (
                  <p className={`text-sm ${styles.textSecondary}`}>PR Number: {item.prNumber}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className={`p-2 ${styles.hoverBg} rounded-lg transition-colors`}
              >
                <XCircle size={20} className={styles.textSecondary} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
            {/* Summary Section */}
            <div>
              <h4 className={`text-sm font-semibold ${styles.textSecondary} uppercase mb-3`}>
                Request Summary
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className={`${infoBgClass} rounded-lg p-3`}>
                  <p className={`text-xs ${styles.textMuted} mb-1`}>Requested By</p>
                  <p className={`font-medium ${styles.textPrimary}`}>{item.requestedBy}</p>
                </div>
                <div className={`${infoBgClass} rounded-lg p-3`}>
                  <p className={`text-xs ${styles.textMuted} mb-1`}>Department</p>
                  <p className={`font-medium ${styles.textPrimary}`}>{item.department}</p>
                </div>
                <div className={`${infoBgClass} rounded-lg p-3`}>
                  <p className={`text-xs ${styles.textMuted} mb-1`}>Amount</p>
                  <p className={`font-medium ${styles.textPrimary} text-lg`}>
                    ₱{item.amount.toLocaleString()}
                  </p>
                </div>
                <div className={`${infoBgClass} rounded-lg p-3`}>
                  <p className={`text-xs ${styles.textMuted} mb-1`}>Date Submitted</p>
                  <p className={`font-medium ${styles.textPrimary}`}>
                    {new Date(dateField).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <div>
                <h4 className={`text-sm font-semibold ${styles.textSecondary} uppercase mb-2`}>
                  Description
                </h4>
                <p className={`${styles.textPrimary} ${infoBgClass} rounded-lg p-3`}>
                  {item.description}
                </p>
              </div>
            )}

            {/* Remarks Section */}
            <div>
              <h4 className={`text-sm font-semibold ${styles.textSecondary} uppercase mb-3`}>
                Remarks & Comments
              </h4>
              {remarks.length === 0 ? (
                <div className={`text-center py-6 ${infoBgClass} rounded-lg`}>
                  <Eye size={32} className={`mx-auto ${styles.textMuted} mb-2`} />
                  <p className={`text-sm ${styles.textSecondary}`}>No remarks yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {remarks.map((remark) => (
                    <div
                      key={remark.id}
                      className={`${infoBgClass} rounded-lg p-3 border ${styles.border}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 ${themeColors.primaryLight} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <span className={`${themeColors.primaryText} font-semibold text-sm`}>
                            {remark.author.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`font-semibold ${styles.textPrimary} text-sm`}>
                              {remark.author}
                            </p>
                            <p className={`text-xs ${styles.textMuted}`}>{remark.date}</p>
                          </div>
                          <p className={`${styles.textSecondary} text-sm`}>{remark.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className={`p-6 border-t ${styles.border} ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} flex justify-end relative gap-3 rounded-b-lg`}>
            <div className="relative">
              <button
                onClick={() => setActionsOpen(!actionsOpen)}
                className={`px-4 py-2 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors font-medium flex items-center gap-2`}
              >
                Actions
                <svg
                  className={`w-4 h-4 transform transition-transform ${actionsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropup Menu */}
              {actionsOpen && (
                <div className={`absolute bottom-full mb-2 right-0 w-56 ${styles.bgCard} border ${styles.border} rounded-lg shadow-lg z-50 flex flex-col overflow-hidden`}>
                  <button
                    onClick={onApprove}
                    className={`w-full px-4 py-2 text-left ${darkMode ? 'hover:bg-green-900/30 text-green-400' : 'hover:bg-green-100 text-green-700'} flex items-center gap-2`}
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button
                    onClick={onViewRemarks}
                    className={`w-full px-4 py-2 text-left ${styles.hoverBg} ${styles.textSecondary} flex items-center gap-2`}
                  >
                    <Eye size={18} />
                    View Remarks
                  </button>
                  <button
                    onClick={onReview}
                    className={`w-full px-4 py-2 text-left ${darkMode ? 'hover:bg-blue-900/30 text-blue-400' : 'hover:bg-blue-100 text-blue-700'} flex items-center gap-2`}
                  >
                    <FileText size={18} />
                    Review
                  </button>
                  <button
                    onClick={onReject}
                    className={`w-full px-4 py-2 text-left ${darkMode ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-100 text-red-700'} flex items-center gap-2`}
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApprovalDetailModal;
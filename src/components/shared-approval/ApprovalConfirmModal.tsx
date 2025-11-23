import { BaseApprovalItem } from '../../types/approval.types';
import { useTheme } from '../../context/ThemeContext';

interface ApprovalConfirmModalProps<T extends BaseApprovalItem> {
  open: boolean;
  item: T | null;
  actionType: 'approve' | 'reject' | null;
  remark: string;
  onRemarkChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

function ApprovalConfirmModal<T extends BaseApprovalItem>({
  open,
  item,
  actionType,
  remark,
  onRemarkChange,
  onConfirm,
  onCancel,
}: ApprovalConfirmModalProps<T>) {
  const { styles, darkMode } = useTheme();

  if (!open || !item || !actionType) return null;

  const isReject = actionType === 'reject';
  const actionLabel = actionType.charAt(0).toUpperCase() + actionType.slice(1);
  const canConfirm = !isReject || remark.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onCancel} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative ${styles.bgCard} rounded-lg shadow-xl w-full max-w-md p-6`}>
          {/* Header */}
          <h3 className={`text-lg font-bold ${styles.textPrimary} mb-2`}>
            Confirm {actionLabel}
          </h3>
          <p className={`${styles.textSecondary} mb-4`}>
            Are you sure you want to {actionType} this request?
          </p>

          {/* Item Info */}
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded p-3 mb-4`}>
            <p className={`text-sm font-medium ${styles.textPrimary}`}>{item.title}</p>
            <p className={`text-xs ${styles.textMuted} mt-1`}>{item.transactionNumber}</p>
          </div>

          {/* Remarks Input */}
          <div className="mb-4">
            <label className={`block text-sm font-medium ${styles.textPrimary} mb-2`}>
              Remarks {isReject && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={remark}
              onChange={(e) => onRemarkChange(e.target.value)}
              placeholder={`Enter your remarks for ${actionType}ing this request...`}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${styles.bgInput}`}
            />
            {isReject && !remark.trim() && (
              <p className="text-xs text-red-600 mt-1">
                Remarks are required for rejection
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className={`px-4 py-2 ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} ${styles.textPrimary} rounded transition-colors font-medium`}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!canConfirm}
              className={`px-4 py-2 text-white rounded transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                actionType === 'approve'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              Confirm {actionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApprovalConfirmModal;
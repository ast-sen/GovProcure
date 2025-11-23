import { useState, useCallback } from 'react';
import { Remark, BaseApprovalItem } from '../../types/approval.types';

// ==================== TYPES ====================
type ActionType = 'approve' | 'reject' | null;

interface UseApprovalActionsOptions<T extends BaseApprovalItem> {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  authorName: string;
  defaultRemarks?: Remark[];
}

interface UseApprovalActionsReturn<T extends BaseApprovalItem> {
  // State
  selectedItem: T | null;
  setSelectedItem: (item: T | null) => void;
  remarksList: Remark[];
  setRemarksList: React.Dispatch<React.SetStateAction<Remark[]>>;
  
  // Modal visibility
  showDetailModal: boolean;
  setShowDetailModal: (show: boolean) => void;
  showConfirmModal: boolean;
  setShowConfirmModal: (show: boolean) => void;
  showRemarksModal: boolean;
  setShowRemarksModal: (show: boolean) => void;
  
  // Action state
  actionType: ActionType;
  setActionType: (type: ActionType) => void;
  newRemark: string;
  setNewRemark: (remark: string) => void;
  confirmRemark: string;
  setConfirmRemark: (remark: string) => void;
  
  // Handlers
  handleOpenDetail: (item: T) => void;
  handleAction: (action: 'approve' | 'reject') => void;
  handleAddRemark: () => void;
  confirmAction: () => void;
  resetModals: () => void;
}

// ==================== DEFAULT VALUES ====================
const DEFAULT_REMARKS: Remark[] = [
  {
    id: 1,
    author: 'BAC Admin',
    text: 'Documents verified and forwarded for approval.',
    date: '2024-11-05 10:30 AM',
  },
];

// ==================== HOOK ====================
export function useApprovalActions<
  T extends BaseApprovalItem & { status: string }
>({
  setItems,
  authorName,
  defaultRemarks = DEFAULT_REMARKS,
}: UseApprovalActionsOptions<T>): UseApprovalActionsReturn<T> {

  
  // Selected item
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [remarksList, setRemarksList] = useState<Remark[]>(defaultRemarks);
  
  // Modal visibility
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRemarksModal, setShowRemarksModal] = useState(false);
  
  // Action state
  const [actionType, setActionType] = useState<ActionType>(null);
  const [newRemark, setNewRemark] = useState('');
  const [confirmRemark, setConfirmRemark] = useState('');

  // Open detail modal for an item
  const handleOpenDetail = useCallback((item: T) => {
    setSelectedItem(item);
    setRemarksList(defaultRemarks);
    setShowDetailModal(true);
  }, [defaultRemarks]);

  // Initiate approve/reject action
  const handleAction = useCallback((action: 'approve' | 'reject') => {
    setActionType(action);
    setShowDetailModal(false);
    setShowConfirmModal(true);
  }, []);

  // Add a new remark
  const handleAddRemark = useCallback(() => {
    if (!newRemark.trim() || !selectedItem) return;

    const remark: Remark = {
      id: remarksList.length + 1,
      author: authorName,
      text: newRemark,
      date: new Date().toLocaleString(),
    };

    setRemarksList(prev => [...prev, remark]);
    setNewRemark('');

    // Update item remarks
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === selectedItem.id
          ? { ...item, remarks: [...(item.remarks || []), newRemark] }
          : item
      )
    );
  }, [newRemark, selectedItem, remarksList.length, authorName, setItems]);

  // Confirm approve/reject action
  const confirmAction = useCallback(() => {
    if (!selectedItem || !actionType) return;

    const remark: Remark = {
      id: remarksList.length + 1,
      author: authorName,
      text: confirmRemark || `Request ${actionType}d`,
      date: new Date().toLocaleString(),
    };

    setRemarksList(prev => [...prev, remark]);

    // Update item status
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === selectedItem.id
          ? {
              ...item,
              status: actionType === 'approve' ? 'Approved' : 'Rejected',
              lastUpdated: new Date().toISOString().split('T')[0],
              remarks: [...(item.remarks || []), remark.text],
            }
          : item
      )
    );

    // Reset state
    setShowConfirmModal(false);
    setConfirmRemark('');
    setSelectedItem(null);
    setActionType(null);
  }, [selectedItem, actionType, remarksList.length, authorName, confirmRemark, setItems]);

  // Reset all modals
  const resetModals = useCallback(() => {
    setShowDetailModal(false);
    setShowConfirmModal(false);
    setShowRemarksModal(false);
    setSelectedItem(null);
    setActionType(null);
    setNewRemark('');
    setConfirmRemark('');
  }, []);

  return {
    // State
    selectedItem,
    setSelectedItem,
    remarksList,
    setRemarksList,
    
    // Modal visibility
    showDetailModal,
    setShowDetailModal,
    showConfirmModal,
    setShowConfirmModal,
    showRemarksModal,
    setShowRemarksModal,
    
    // Action state
    actionType,
    setActionType,
    newRemark,
    setNewRemark,
    confirmRemark,
    setConfirmRemark,
    
    // Handlers
    handleOpenDetail,
    handleAction,
    handleAddRemark,
    confirmAction,
    resetModals,
  };
}

export default useApprovalActions;
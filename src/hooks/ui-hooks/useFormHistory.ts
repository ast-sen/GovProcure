import { useState } from 'react';
import { HistoryItem } from '../../types/common.types';

export const useFormHistory = (formType: string) => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // TODO: Replace with actual data from your backend/localStorage
  const [historyItems] = useState<HistoryItem[]>([
    {
      id: '1',
      title: 'Office Supplies Purchase Request',
      type: formType,
      status: 'draft',
      date: '2025-01-15',
      prNo: 'PR-2025-001'
    },
    {
      id: '2',
      title: 'IT Equipment Procurement',
      type: formType,
      status: 'submitted',
      date: '2025-01-14',
      prNo: 'PR-2025-002'
    },
    {
      id: '3',
      title: 'Janitorial Services',
      type: formType,
      status: 'draft',
      date: '2025-01-13',
      prNo: 'PR-2025-003'
    },
    // Add more sample items...
  ]);

  const handleViewHistory = () => {
    setShowHistoryModal(true);
  };

  const handleCloseHistory = () => {
    setShowHistoryModal(false);
  };

  const handleSelectItem = (item: HistoryItem) => {
    console.log('Selected item:', item);
    // TODO: Load the selected form data
    setShowHistoryModal(false);
  };

  return {
    showHistoryModal,
    historyItems,
    handleViewHistory,
    handleCloseHistory,
    handleSelectItem
  };
};
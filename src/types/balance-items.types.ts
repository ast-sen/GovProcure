export interface BalanceItem {
  id: number;
  description: string;
  unit: string;
  used: number;
  available: number;
  total: number;
}

export interface BalanceItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface StatModal {
  open: boolean;
  type: 'total' | 'available' | 'used' | null;
}

export interface StatModalData {
  title: string;
  color: 'primary' | 'green' | 'orange';
  items: BalanceItem[];
  showColumn: 'all' | 'available' | 'used';
}
import { BalanceItem } from '../types/balance-items.types';

export const filterItems = (items: BalanceItem[], searchTerm: string): BalanceItem[] => {
  return items.filter(item =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const calculateTotals = (items: BalanceItem[]) => {
  const totalUsed = items.reduce((sum, item) => sum + item.used, 0);
  const totalAvailable = items.reduce((sum, item) => sum + item.available, 0);
  return { totalUsed, totalAvailable };
};

export const exportToCSV = (items: BalanceItem[]) => {
  const headers = ['Description', 'Unit', 'Used (pcs)', 'Available (pcs)', 'Total'];
  const rows = items.map(item => [
    item.description, item.unit, item.used, item.available, item.total
  ]);
  const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `balance-items-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
};

export const getStockStatus = (used: number, total: number): { isLowStock: boolean; percentage: number } => {
  const percentage = (used / total) * 100;
  return {
    isLowStock: percentage >= 80,
    percentage
  };
};
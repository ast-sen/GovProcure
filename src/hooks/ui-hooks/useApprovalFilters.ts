import { useState, useMemo } from 'react';

// ==================== TYPES ====================
interface UseApprovalFiltersOptions<T, TType extends string, TStatus extends string> {
  items: T[];
  searchFields: (keyof T)[];
  initialType: TType;
  initialStatus: TStatus;
}

interface UseApprovalFiltersReturn<T, TType extends string, TStatus extends string> {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterType: TType;
  setFilterType: (value: TType) => void;
  filterStatus: TStatus;
  setFilterStatus: (value: TStatus) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  filteredItems: T[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

// ==================== HOOK ====================
export function useApprovalFilters<T, TType extends string, TStatus extends string>({
  items,
  searchFields,
  initialType,
  initialStatus,
}: UseApprovalFiltersOptions<T, TType, TStatus>): UseApprovalFiltersReturn<T, TType, TStatus> {
  
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<TType>(initialType);
  const [filterStatus, setFilterStatus] = useState<TStatus>(initialStatus);
  const [showFilters, setShowFilters] = useState(false);

  // Filtered items - memoized for performance
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search filter - check all specified fields
      const matchesSearch = searchFields.some((field) => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });

      // Type filter
      const matchesType = filterType === 'All' || (item as any).type === filterType;

      // Status filter
      const matchesStatus = filterStatus === 'All' || (item as any).status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [items, searchTerm, filterType, filterStatus, searchFields]);

  // Check if any filters are active
  const hasActiveFilters = filterType !== 'All' || filterStatus !== 'All';

  // Clear all filters to initial state
  const clearFilters = () => {
    setFilterType(initialType);
    setFilterStatus(initialStatus);
  };

  return {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
    showFilters,
    setShowFilters,
    filteredItems,
    hasActiveFilters,
    clearFilters,
  };
}

export default useApprovalFilters;
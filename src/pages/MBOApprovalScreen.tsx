import { useState, useEffect } from 'react';
import { ArrowLeft, Users } from 'lucide-react';
import useApprovalFilters from '../hooks/ui-hooks/useApprovalFilters';
import useApprovalActions from '../hooks/ui-hooks/useApprovalActions';
import { useTheme } from '../context/ThemeContext';

import StatusBadge from '../components/ui/StatusBadge';
import TypeBadge from '../components/ui/TypeBadge';
import { StatCard } from '../components/ui/StatCard';
import SearchBar from '../components/ui/SearchBar';
import FilterButton from '../components/ui/FilterButton';
import FilterPills from '../components/ui/FilterPills';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';

import ApprovalTable from '../components/shared-approval/ApprovalTable';
import ApprovalDetailModal from '../components/shared-approval/ApprovalDetailModal';
import ApprovalConfirmModal from '../components/shared-approval/ApprovalConfirmModal';
import ApprovalRemarksModal from '../components/shared-approval/ApprovalRemarksModal';
import { MBOItem } from '../types/approval.types';
import { MBOTypeFilter } from '../types/approval.types';
import { ExtendedStatusFilter } from '../types/approval.types';

import { fetchMBOItems, MOCK_MBO_DATA } from '../demo-data/mockApprovalData';

const AUTHOR_NAME = 'MBO Officer';
const TYPE_OPTIONS: MBOTypeFilter[] = ['All', 'PPMP', 'PR', 'APP', 'APPC'];
const STATUS_OPTIONS: ExtendedStatusFilter[] = ['All', 'Draft', 'Pending', 'Approved', 'Rejected', 'Re-Opened'];
const SEARCH_FIELDS: (keyof MBOItem)[] = ['title', 'transactionNumber', 'prNumber', 'fiscalYear', 'requestedBy', 'department'];

const TABLE_COLUMNS = [
  { key: 'type', label: 'Type', render: (item: MBOItem) => <TypeBadge type={item.type} /> },
  { key: 'transactionNumber', label: 'Transaction #' },
  { key: 'reference', label: 'Reference', render: (item: MBOItem) => item.prNumber || (item.fiscalYear ? `FY ${item.fiscalYear}` : '-') },
  { key: 'title', label: 'Title' },
  { key: 'requestedBy', label: 'Requested By' },
  { key: 'department', label: 'Department' },
  { key: 'items', label: 'Items', align: 'center' as const, render: (item: MBOItem) => item.items || '-' },
  { key: 'amount', label: 'Amount', align: 'right' as const, format: (val: number) => `₱${val.toLocaleString()}` },
  { key: 'status', label: 'Status', align: 'center' as const, render: (item: MBOItem) => <StatusBadge status={item.status} /> },
];

interface MBOApprovalScreenProps {
  onNavigate?: (nav: string) => void;
}

export const MBOApprovalScreen = ({ onNavigate }: MBOApprovalScreenProps) => {
  const { styles, themeColors } = useTheme();
  const [items, setItems] = useState<MBOItem[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    searchTerm, setSearchTerm,
    filterType, setFilterType,
    filterStatus, setFilterStatus,
    showFilters, setShowFilters,
    filteredItems, hasActiveFilters, clearFilters
  } = useApprovalFilters<MBOItem, MBOTypeFilter, ExtendedStatusFilter>({
    items,
    searchFields: SEARCH_FIELDS,
    initialType: 'All',
    initialStatus: 'All',
  });

  const {
    selectedItem,
    remarksList,
    showDetailModal, setShowDetailModal,
    showConfirmModal, setShowConfirmModal,
    showRemarksModal, setShowRemarksModal,
    actionType,
    newRemark, setNewRemark,
    confirmRemark, setConfirmRemark,
    handleOpenDetail,
    handleAction,
    handleAddRemark,
    confirmAction,
  } = useApprovalActions<MBOItem>({
    items,
    setItems,
    authorName: AUTHOR_NAME,
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchMBOItems();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch MBO items:', error);
        setItems(MOCK_MBO_DATA);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const statusCounts = {
    draft: items.filter(i => i.status === 'Draft').length,
    pending: items.filter(i => i.status === 'Pending').length,
    approved: items.filter(i => i.status === 'Approved').length,
    rejected: items.filter(i => i.status === 'Rejected').length,
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className={`p-6 min-h-screen ${styles.bgMain} transition-colors duration-300`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          {onNavigate && (
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 ${styles.textSecondary} ${styles.hoverBg} rounded-lg transition-colors`}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 ${themeColors.primaryLight} rounded-lg`}>
                <Users className={themeColors.primaryText} size={32} />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${styles.textPrimary}`}>Municipal Budget Office</h1>
                <p className={styles.textSecondary}>Manage procurement plans, purchase requests, and annual procurement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard stat={{ label: 'Draft', value: statusCounts.draft, change: '', trend: 'up' }} />
        <StatCard stat={{ label: 'Pending', value: statusCounts.pending, change: '', trend: 'up' }} />
        <StatCard stat={{ label: 'Approved', value: statusCounts.approved, change: '', trend: 'up' }} />
        <StatCard stat={{ label: 'Rejected', value: statusCounts.rejected, change: '', trend: 'down' }} />
      </div>

      {/* Search & Filters */}
      <div className={`${styles.bgCard} rounded-lg shadow p-4 mb-6 transition-colors duration-300`}>
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by title, transaction number, PR number, fiscal year, requester, or department..."
          />
          <FilterButton
            isOpen={showFilters}
            onClick={() => setShowFilters(!showFilters)}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {showFilters && (
          <div className={`mt-4 pt-4 border-t ${styles.border}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FilterPills options={TYPE_OPTIONS} selected={filterType} onSelect={setFilterType} label="Document Type" />
              <FilterPills options={STATUS_OPTIONS} selected={filterStatus} onSelect={setFilterStatus} label="Status" />
            </div>
            {hasActiveFilters && (
              <button onClick={clearFilters} className={`mt-4 text-sm ${themeColors.primaryText} hover:opacity-80 font-medium`}>
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className={`${styles.bgCard} rounded-lg shadow transition-colors duration-300`}>
        <div className={`p-4 border-b ${styles.border} flex items-center justify-between`}>
          <p className={`text-sm ${styles.textSecondary}`}>
            Showing <span className="font-semibold">{filteredItems.length}</span> of <span className="font-semibold">{items.length}</span> items
          </p>
          <p className={`text-sm ${styles.textSecondary}`}>
            Total Amount: <span className={`font-semibold ${themeColors.primaryText}`}>₱{totalAmount.toLocaleString()}</span>
          </p>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading items..." />
        ) : filteredItems.length === 0 ? (
          <EmptyState icon={<Users size={48} />} message="No items found" />
        ) : (
          <ApprovalTable
            items={filteredItems}
            columns={TABLE_COLUMNS}
            onRowClick={handleOpenDetail}
          />
        )}
      </div>

      {/* Modals */}
      <ApprovalDetailModal
        open={showDetailModal}
        item={selectedItem}
        remarks={remarksList}
        onClose={() => setShowDetailModal(false)}
        onApprove={() => handleAction('approve')}
        onReject={() => handleAction('reject')}
        onReview={() => ""}
        onViewRemarks={() => {
          setShowDetailModal(false);
          setShowRemarksModal(true);
        }}
      />

      <ApprovalConfirmModal
        open={showConfirmModal}
        item={selectedItem}
        actionType={actionType}
        remark={confirmRemark}
        onRemarkChange={setConfirmRemark}
        onConfirm={confirmAction}
        onCancel={() => {
          setShowConfirmModal(false);
          setConfirmRemark('');
          setShowDetailModal(true);
        }}
      />

      <ApprovalRemarksModal
        open={showRemarksModal}
        item={selectedItem}
        remarks={remarksList}
        newRemark={newRemark}
        onRemarkChange={setNewRemark}
        onAddRemark={handleAddRemark}
        onClose={() => {
          setShowRemarksModal(false);
          setShowDetailModal(true);
        }}
      />
    </div>
  );
};

export default MBOApprovalScreen;
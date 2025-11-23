import { useState, useEffect } from 'react';
import { UserCheck, ArrowLeft } from 'lucide-react';
import { ApprovalRequest, TypeFilter, StatusFilter } from '../types/approval.types';
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

import { fetchHeadOfficeApprovals, MOCK_HEAD_OFFICE_DATA } from '../demo-data/mockApprovalData';

const AUTHOR_NAME = 'Head of Office';
const TYPE_OPTIONS: TypeFilter[] = ['All', 'PPMP', 'PR', 'APP'];
const STATUS_OPTIONS: StatusFilter[] = ['All', 'Pending', 'Approved', 'Rejected', 'Re-Opened'];
const SEARCH_FIELDS: (keyof ApprovalRequest)[] = ['title', 'transactionNumber', 'prNumber', 'requestedBy', 'department'];

const TABLE_COLUMNS = [
  { key: 'type', label: 'Type', render: (item: ApprovalRequest) => <TypeBadge type={item.type} /> },
  { key: 'transactionNumber', label: 'Transaction #' },
  { key: 'title', label: 'Title' },
  { key: 'requestedBy', label: 'Requested By' },
  { key: 'department', label: 'Department' },
  { key: 'amount', label: 'Amount', align: 'right' as const, format: (val: number) => `₱${val.toLocaleString()}` },
  { key: 'status', label: 'Status', align: 'center' as const, render: (item: ApprovalRequest) => <StatusBadge status={item.status} /> },
];

interface HeadOfficeApprovalScreenProps {
  onNavigate?: (nav: string) => void;
}

const HeadOfficeApprovalScreen = ({ onNavigate }: HeadOfficeApprovalScreenProps) => {
  const { styles, themeColors } = useTheme();
  const [items, setItems] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    searchTerm, setSearchTerm,
    filterType, setFilterType,
    filterStatus, setFilterStatus,
    showFilters, setShowFilters,
    filteredItems, hasActiveFilters, clearFilters
  } = useApprovalFilters<ApprovalRequest, TypeFilter, StatusFilter>({
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
  } = useApprovalActions<ApprovalRequest>({
    items,
    setItems,
    authorName: AUTHOR_NAME,
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchHeadOfficeApprovals();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch approvals:', error);
        setItems(MOCK_HEAD_OFFICE_DATA);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const statusCounts = {
    pending: items.filter(i => i.status === 'Pending').length,
    approved: items.filter(i => i.status === 'Approved').length,
    rejected: items.filter(i => i.status === 'Rejected').length,
  };

  return (
    <div className="p-6">
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
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 ${themeColors.primaryLight} rounded-lg`}>
              <UserCheck className={themeColors.primaryText} size={32} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${styles.textPrimary}`}>Head of Office Approval</h1>
              <p className={styles.textSecondary}>Review and approve PPMP and PR requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard stat={{ label: 'Pending Approval', value: statusCounts.pending, change: '', trend: 'up' }} />
        <StatCard stat={{ label: 'Approved', value: statusCounts.approved, change: '', trend: 'up' }} />
        <StatCard stat={{ label: 'Rejected', value: statusCounts.rejected, change: '', trend: 'down' }} />
      </div>

      {/* Search & Filters */}
      <div className={`${styles.bgCard} rounded-lg shadow p-4 mb-6`}>
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by title, transaction number, PR number, requester, or department..."
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
      <div className={`${styles.bgCard} rounded-lg shadow`}>
        <div className={`p-4 border-b ${styles.border}`}>
          <p className={`text-sm ${styles.textSecondary}`}>
            Showing <span className="font-semibold">{filteredItems.length}</span> of <span className="font-semibold">{items.length}</span> requests
          </p>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading requests..." />
        ) : filteredItems.length === 0 ? (
          <EmptyState icon={<UserCheck size={48} />} message="No requests found" />
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

export default HeadOfficeApprovalScreen;
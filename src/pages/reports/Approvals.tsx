// src/pages/reports/Approvals.tsx

import { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, RotateCcw, Clock, ArrowLeft } from 'lucide-react';

// Hooks
import useApprovalFilters from '../../hooks/ui-hooks/useApprovalFilters';
import useApprovalActions from '../../hooks/ui-hooks/useApprovalActions';
import { useTheme } from '../../context/ThemeContext';

// UI Components
import StatusBadge from '../../components/ui/StatusBadge';
import TypeBadge from '../../components/ui/TypeBadge';
import SearchBar from '../../components/ui/SearchBar';
import FilterButton from '../../components/ui/FilterButton';
import FilterPills from '../../components/ui/FilterPills';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';

// Shared Components
import ApprovalTable from '../../components/shared-approval/ApprovalTable';
import ApprovalDetailModal from '../../components/shared-approval/ApprovalDetailModal';
import ApprovalConfirmModal from '../../components/shared-approval/ApprovalConfirmModal';
import ApprovalRemarksModal from '../../components/shared-approval/ApprovalRemarksModal';

// Types & Data
import { ApprovalReportItem, fetchApprovalsData, MOCK_APPROVALS_DATA } from '../../demo-data/mockApprovalData';

// ==================== TYPES ====================
interface ApprovalsScreenProps {
  onNavigate?: (nav: string) => void;
}

type TypeFilter = 'All' | 'PPMP' | 'PR';
type StatusFilter = 'All' | 'Pending' | 'Approved' | 'Cancelled' | 'Reopened';

// ==================== CONSTANTS ====================
const AUTHOR_NAME = 'Approvals Officer';
const TYPE_OPTIONS: TypeFilter[] = ['All', 'PPMP', 'PR'];
const STATUS_OPTIONS: StatusFilter[] = ['All', 'Pending', 'Approved', 'Cancelled', 'Reopened'];
const SEARCH_FIELDS: (keyof ApprovalReportItem)[] = ['title', 'transactionNumber', 'prNumber', 'requestedBy', 'department'];

const TABLE_COLUMNS = [
  { key: 'type', label: 'Type', render: (item: ApprovalReportItem) => <TypeBadge type={item.type} /> },
  { key: 'transactionNumber', label: 'Transaction #' },
  { key: 'prNumber', label: 'PR Number', render: (item: ApprovalReportItem) => item.prNumber || '-' },
  { key: 'title', label: 'Title' },
  { key: 'requestedBy', label: 'Requested By' },
  { key: 'department', label: 'Department' },
  { key: 'amount', label: 'Amount', align: 'right' as const, format: (val: number) => `₱${val.toLocaleString()}` },
  { key: 'status', label: 'Status', align: 'center' as const, render: (item: ApprovalReportItem) => <StatusBadge status={item.status} /> },
  { key: 'lastUpdated', label: 'Last Updated', render: (item: ApprovalReportItem) => new Date(item.lastUpdated).toLocaleDateString() },
];

const StatusCard = ({
  label,
  count,
  color,
  icon: Icon
}: {
  label: string;
  count: number;
  color: string; 
  icon: React.ElementType;
}) => {
  const { styles } = useTheme();

  const colorMap: Record<string, string> = {
    yellow: "text-yellow-600 border-yellow-500",
    green: "text-green-600 border-green-500",
    red: "text-red-600 border-red-500",
    blue: "text-blue-600 border-blue-500"
  };

  const iconColorMap: Record<string, string> = {
    yellow: "text-yellow-500",
    green: "text-green-500",
    red: "text-red-500",
    blue: "text-blue-500"
  };

  return (
    <div
      className={`
        ${styles.bgCard}
        rounded-lg shadow p-6 flex items-center justify-between
        border-l-4
        ${colorMap[color]}
        transition-colors duration-300
      `}
    >
      <div>
        <p className={`text-sm ${styles.textSecondary}`}>{label}</p>
        <p className={`text-2xl font-bold ${colorMap[color].split(" ")[0]}`}>
          {count}
        </p>
      </div>

      <Icon className={`h-8 w-8 opacity-80 ${iconColorMap[color]}`} />
    </div>
  );
};


// ==================== MAIN COMPONENT ====================
export const ApprovalsScreen = ({ onNavigate }: ApprovalsScreenProps) => {
  const { styles, themeColors } = useTheme();
  const [items, setItems] = useState<ApprovalReportItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Custom Hooks
  const {
    searchTerm, setSearchTerm,
    filterType, setFilterType,
    filterStatus, setFilterStatus,
    showFilters, setShowFilters,
    filteredItems, hasActiveFilters, clearFilters
  } = useApprovalFilters<ApprovalReportItem, TypeFilter, StatusFilter>({
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
  } = useApprovalActions<ApprovalReportItem>({
    items,
    setItems,
    authorName: AUTHOR_NAME,
  });

  // Fetch data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchApprovalsData();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch approvals:', error);
        setItems(MOCK_APPROVALS_DATA);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Status counts
  const statusCounts = {
    pending: items.filter(i => i.status === 'Pending').length,
    approved: items.filter(i => i.status === 'Approved').length,
    cancelled: items.filter(i => i.status === 'Cancelled').length,
    reopened: items.filter(i => i.status === 'Reopened').length
  };

  return (
    <div className={`p-6 min-h-screen ${styles.bgMain} transition-colors duration-300`}>
      {/* Header */}
      <div className="mb-6">
        {onNavigate && (
          <button
            onClick={() => onNavigate('reports')}
            className={`flex items-center gap-2 px-2 py-3 ${styles.textSecondary} ${styles.hoverBg} rounded-lg transition-colors mb-4`}
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        )}
        <h1 className={`text-3xl font-bold ${styles.textPrimary} mb-2`}>Approvals Management</h1>
        <p className={styles.textSecondary}>Track and manage approval status for PPMP and PR documents</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatusCard label="Pending" count={statusCounts.pending} color="yellow" icon={Clock} />
        <StatusCard label="Approved" count={statusCounts.approved} color="green" icon={CheckCircle} />
        <StatusCard label="Cancelled" count={statusCounts.cancelled} color="red" icon={XCircle} />
        <StatusCard label="Reopened" count={statusCounts.reopened} color="blue" icon={RotateCcw} />
      </div>

      {/* Search and Filters */}
      <div className={`${styles.bgCard} rounded-lg shadow p-4 mb-6 transition-colors duration-300`}>
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
              <FilterPills
                options={TYPE_OPTIONS}
                selected={filterType}
                onSelect={setFilterType}
                label="Document Type"
              />
              <FilterPills
                options={STATUS_OPTIONS}
                selected={filterStatus}
                onSelect={setFilterStatus}
                label="Status"
              />
            </div>
            {hasActiveFilters && (
              <button onClick={clearFilters} className={`mt-4 text-sm ${themeColors.primaryText} hover:opacity-80 font-medium`}>
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Table */}
      <div className={`${styles.bgCard} rounded-lg shadow transition-colors duration-300`}>
        <div className={`p-4 border-b ${styles.border}`}>
          <p className={`text-sm ${styles.textSecondary}`}>
            Showing <span className="font-semibold">{filteredItems.length}</span> of{' '}
            <span className="font-semibold">{items.length}</span> items
          </p>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading approvals..." />
        ) : filteredItems.length === 0 ? (
          <EmptyState
            icon={<Search size={48} />}
            message="No items found matching your criteria"
          />
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

export default ApprovalsScreen;
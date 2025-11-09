import { useState, useEffect } from 'react';
import { Search, Filter, FileText, DollarSign, CheckCircle, XCircle, RotateCcw, Clock, ArrowLeft } from 'lucide-react';

interface ApprovalItem {
  id: number;
  type: 'PPMP' | 'PR';
  transactionNumber: string;
  prNumber?: string;
  title: string;
  requestedBy: string;
  department: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Cancelled' | 'Reopened';
  dateSubmitted: string;
  lastUpdated: string;
}

interface ApprovalsScreenProps {
  onNavigate?: (nav: string) => void;
}

export const ApprovalsScreen = ({ onNavigate }: ApprovalsScreenProps) => {
  const [items, setItems] = useState<ApprovalItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'PPMP' | 'PR'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Cancelled' | 'Reopened'>('All');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch approvals data
  const fetchApprovals = async () => {
    setLoading(true);
    
    // TODO: Replace with your actual API endpoint
    const USE_MOCK_DATA = true;
    
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        loadMockData();
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const response = await fetch('/api/approvals');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.warn('API not available, using mock data');
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    setItems([
      {
        id: 1,
        type: 'PPMP',
        transactionNumber: 'TXN-2024-001',
        title: 'Office Supplies Procurement Plan Q4',
        requestedBy: 'John Doe',
        department: 'Admin',
        amount: 125000,
        status: 'Pending',
        dateSubmitted: '2024-11-01',
        lastUpdated: '2024-11-05'
      },
      {
        id: 2,
        type: 'PR',
        transactionNumber: 'TXN-2024-002',
        prNumber: 'PR-2024-045',
        title: 'Computer Equipment Purchase',
        requestedBy: 'Jane Smith',
        department: 'IT',
        amount: 450000,
        status: 'Approved',
        dateSubmitted: '2024-10-28',
        lastUpdated: '2024-10-30'
      },
      {
        id: 3,
        type: 'PR',
        transactionNumber: 'TXN-2024-003',
        prNumber: 'PR-2024-046',
        title: 'Printer Maintenance Supplies',
        requestedBy: 'Mike Johnson',
        department: 'IT',
        amount: 35000,
        status: 'Pending',
        dateSubmitted: '2024-11-03',
        lastUpdated: '2024-11-03'
      },
      {
        id: 4,
        type: 'PPMP',
        transactionNumber: 'TXN-2024-004',
        title: 'Medical Supplies Annual Plan',
        requestedBy: 'Sarah Williams',
        department: 'Health',
        amount: 850000,
        status: 'Cancelled',
        dateSubmitted: '2024-10-15',
        lastUpdated: '2024-10-20'
      },
      {
        id: 5,
        type: 'PR',
        transactionNumber: 'TXN-2024-005',
        prNumber: 'PR-2024-047',
        title: 'Vehicle Fuel Allocation',
        requestedBy: 'Robert Brown',
        department: 'Transport',
        amount: 180000,
        status: 'Reopened',
        dateSubmitted: '2024-10-25',
        lastUpdated: '2024-11-04'
      },
      {
        id: 6,
        type: 'PPMP',
        transactionNumber: 'TXN-2024-006',
        title: 'Training Materials Procurement',
        requestedBy: 'Emily Davis',
        department: 'HR',
        amount: 95000,
        status: 'Approved',
        dateSubmitted: '2024-10-20',
        lastUpdated: '2024-10-22'
      },
      {
        id: 7,
        type: 'PR',
        transactionNumber: 'TXN-2024-007',
        prNumber: 'PR-2024-048',
        title: 'Cleaning Supplies',
        requestedBy: 'David Wilson',
        department: 'Maintenance',
        amount: 42000,
        status: 'Pending',
        dateSubmitted: '2024-11-06',
        lastUpdated: '2024-11-06'
      },
      {
        id: 8,
        type: 'PR',
        transactionNumber: 'TXN-2024-008',
        prNumber: 'PR-2024-049',
        title: 'Security Equipment Upgrade',
        requestedBy: 'Lisa Anderson',
        department: 'Security',
        amount: 320000,
        status: 'Approved',
        dateSubmitted: '2024-10-18',
        lastUpdated: '2024-10-25'
      }
    ]);
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  // Filter items based on search and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transactionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.prNumber && item.prNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Get status badge
  const getStatusBadge = (status: ApprovalItem['status']) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Approved: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
      Reopened: 'bg-blue-100 text-blue-800'
    };

    const icons = {
      Pending: <Clock size={14} />,
      Approved: <CheckCircle size={14} />,
      Cancelled: <XCircle size={14} />,
      Reopened: <RotateCcw size={14} />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  // Get type badge
  const getTypeBadge = (type: 'PPMP' | 'PR') => {
    return type === 'PPMP' ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium">
        <FileText size={12} />
        PPMP
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">
        <DollarSign size={12} />
        PR
      </span>
    );
  };

  // Count by status
  const statusCounts = {
    pending: items.filter(i => i.status === 'Pending').length,
    approved: items.filter(i => i.status === 'Approved').length,
    cancelled: items.filter(i => i.status === 'Cancelled').length,
    reopened: items.filter(i => i.status === 'Reopened').length
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        {onNavigate && (
            <button
                onClick={() => onNavigate('reports')}
                className="flex items-center gap-2 px-2 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back </span>
              </button>
            )}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Approvals Management</h1>
        <p className="text-gray-600">Track and manage approval status for PPMP and PR documents</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
            </div>
            <Clock size={32} className="text-yellow-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts.approved}</p>
            </div>
            <CheckCircle size={32} className="text-green-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">{statusCounts.cancelled}</p>
            </div>
            <XCircle size={32} className="text-red-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Reopened</p>
              <p className="text-2xl font-bold text-blue-600">{statusCounts.reopened}</p>
            </div>
            <RotateCcw size={32} className="text-blue-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title, transaction number, PR number, requester, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Filter size={18} />
            <span className="font-medium">Filters</span>
            {(filterType !== 'All' || filterStatus !== 'All') && (
              <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                Active
              </span>
            )}
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                <div className="flex gap-2">
                  {['All', 'PPMP', 'PR'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterType === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Pending', 'Approved', 'Cancelled', 'Reopened'].map(status => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterStatus === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {(filterType !== 'All' || filterStatus !== 'All') && (
              <button
                onClick={() => {
                  setFilterType('All');
                  setFilterStatus('All');
                }}
                className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredItems.length}</span> of <span className="font-semibold">{items.length}</span> items
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading approvals...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">No items found matching your criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Transaction #</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">PR Number</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Requested By</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Department</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Amount</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      {getTypeBadge(item.type)}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {item.transactionNumber}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.prNumber || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {item.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.requestedBy}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.department}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 text-right font-medium">
                      ₱{item.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(item.lastUpdated).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalsScreen;
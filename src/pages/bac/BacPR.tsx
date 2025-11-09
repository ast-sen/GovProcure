import { useState, useEffect } from 'react';
import { Search, Filter, DollarSign, CheckCircle, XCircle, RotateCcw, Clock, Eye, ArrowLeft } from 'lucide-react';

interface PRItem {
  id: number;
  transactionNumber: string;
  prNumber: string;
  title: string;
  requestedBy: string;
  department: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Cancelled' | 'Reopened';
  dateSubmitted: string;
  lastUpdated: string;
  description?: string;
  remarks?: string[];
}

interface Remark {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface PRManagementScreenProps {
  onNavigate: (nav: string) => void;
}

export const PRManagementScreen = ({ onNavigate }: PRManagementScreenProps) => {
  const [items, setItems] = useState<PRItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Cancelled' | 'Reopened'>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PRItem | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRemarksModal, setShowRemarksModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'cancel' | 'reopen' | null>(null);
  const [newRemark, setNewRemark] = useState('');
  const [remarksList, setRemarksList] = useState<Remark[]>([]);

  // Fetch PR data
  const fetchPRs = async () => {
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
      const response = await fetch('/api/purchase-requests');
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
        transactionNumber: 'TXN-2024-002',
        prNumber: 'PR-2024-045',
        title: 'Computer Equipment Purchase',
        requestedBy: 'Jane Smith',
        department: 'IT',
        amount: 450000,
        status: 'Approved',
        dateSubmitted: '2024-10-28',
        lastUpdated: '2024-10-30',
        description: 'Purchase of desktop computers and monitors for office upgrade',
        remarks: ['Budget verified', 'Specifications approved']
      },
      {
        id: 2,
        transactionNumber: 'TXN-2024-003',
        prNumber: 'PR-2024-046',
        title: 'Printer Maintenance Supplies',
        requestedBy: 'Mike Johnson',
        department: 'IT',
        amount: 35000,
        status: 'Pending',
        dateSubmitted: '2024-11-03',
        lastUpdated: '2024-11-03',
        description: 'Toner cartridges and maintenance kits for office printers'
      },
      {
        id: 3,
        transactionNumber: 'TXN-2024-005',
        prNumber: 'PR-2024-047',
        title: 'Vehicle Fuel Allocation',
        requestedBy: 'Robert Brown',
        department: 'Transport',
        amount: 180000,
        status: 'Reopened',
        dateSubmitted: '2024-10-25',
        lastUpdated: '2024-11-04',
        description: 'Monthly fuel allocation for government vehicles'
      },
      {
        id: 4,
        transactionNumber: 'TXN-2024-007',
        prNumber: 'PR-2024-048',
        title: 'Cleaning Supplies',
        requestedBy: 'David Wilson',
        department: 'Maintenance',
        amount: 42000,
        status: 'Pending',
        dateSubmitted: '2024-11-06',
        lastUpdated: '2024-11-06',
        description: 'Janitorial supplies and cleaning equipment'
      },
      {
        id: 5,
        transactionNumber: 'TXN-2024-008',
        prNumber: 'PR-2024-049',
        title: 'Security Equipment Upgrade',
        requestedBy: 'Lisa Anderson',
        department: 'Security',
        amount: 320000,
        status: 'Approved',
        dateSubmitted: '2024-10-18',
        lastUpdated: '2024-10-25',
        description: 'CCTV cameras and access control systems'
      },
      {
        id: 6,
        transactionNumber: 'TXN-2024-009',
        prNumber: 'PR-2024-050',
        title: 'Office Furniture',
        requestedBy: 'Karen White',
        department: 'Admin',
        amount: 280000,
        status: 'Cancelled',
        dateSubmitted: '2024-10-20',
        lastUpdated: '2024-10-28',
        description: 'Desks, chairs, and filing cabinets for new office space'
      },
      {
        id: 7,
        transactionNumber: 'TXN-2024-010',
        prNumber: 'PR-2024-051',
        title: 'Medical Supplies',
        requestedBy: 'Dr. James Brown',
        department: 'Health',
        amount: 195000,
        status: 'Pending',
        dateSubmitted: '2024-11-07',
        lastUpdated: '2024-11-07',
        description: 'First aid kits and basic medical supplies'
      },
      {
        id: 8,
        transactionNumber: 'TXN-2024-011',
        prNumber: 'PR-2024-052',
        title: 'Training Equipment',
        requestedBy: 'Maria Garcia',
        department: 'HR',
        amount: 125000,
        status: 'Approved',
        dateSubmitted: '2024-10-30',
        lastUpdated: '2024-11-02',
        description: 'Projectors and training materials for employee development'
      }
    ]);
  };

  useEffect(() => {
    fetchPRs();
  }, []);

  // Filter items based on search and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transactionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.prNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Handle opening remarks modal
  const handleOpenRemarks = (item: PRItem) => {
    setSelectedItem(item);
    setRemarksList([
      {
        id: 1,
        author: 'BAC Admin',
        text: 'Initial review completed. All documents are in order.',
        date: '2024-11-05 10:30 AM'
      },
      {
        id: 2,
        author: 'Budget Officer',
        text: 'Budget allocation confirmed for this request.',
        date: '2024-11-05 02:15 PM'
      }
    ]);
    setShowRemarksModal(true);
  };

  // Add new remark
  const handleAddRemark = async () => {
    if (!newRemark.trim() || !selectedItem) return;

    const remark: Remark = {
      id: remarksList.length + 1,
      author: 'BAC Admin',
      text: newRemark,
      date: new Date().toLocaleString()
    };

    setRemarksList([...remarksList, remark]);
    setNewRemark('');

    setItems(items.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          remarks: [...(item.remarks || []), newRemark]
        };
      }
      return item;
    }));
  };

  // Handle action confirmation
  const handleAction = (item: PRItem, action: 'approve' | 'cancel' | 'reopen') => {
    setSelectedItem(item);
    setActionType(action);
    setShowConfirmModal(true);
  };

  // Confirm action
  const confirmAction = async () => {
    if (!selectedItem || !actionType) return;

    console.log(`${actionType} PR ${selectedItem.prNumber}`);

    setItems(items.map(item => {
      if (item.id === selectedItem.id) {
        let newStatus: PRItem['status'] = item.status;
        if (actionType === 'approve') newStatus = 'Approved';
        if (actionType === 'cancel') newStatus = 'Cancelled';
        if (actionType === 'reopen') newStatus = 'Reopened';

        return {
          ...item,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));

    setShowConfirmModal(false);
    setSelectedItem(null);
    setActionType(null);
  };

  // Get status badge
  const getStatusBadge = (status: PRItem['status']) => {
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

  // Count by status
  const statusCounts = {
    pending: items.filter(i => i.status === 'Pending').length,
    approved: items.filter(i => i.status === 'Approved').length,
    cancelled: items.filter(i => i.status === 'Cancelled').length,
    reopened: items.filter(i => i.status === 'Reopened').length
  };

  // Get action buttons based on status
  const getActionButtons = (item: PRItem) => {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleOpenRemarks(item)}
          className="px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-1"
          title="View/Add Remarks"
        >
          <Eye size={14} />
          Remarks
        </button>

        {item.status === 'Pending' && (
          <>
            <button
              onClick={() => handleAction(item, 'approve')}
              className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-1"
            >
              <CheckCircle size={14} />
              Approve
            </button>
            <button
              onClick={() => handleAction(item, 'cancel')}
              className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-1"
            >
              <XCircle size={14} />
              Cancel
            </button>
          </>
        )}

        {item.status === 'Approved' && (
          <button
            onClick={() => handleAction(item, 'reopen')}
            className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1"
          >
            <RotateCcw size={14} />
            Reopen
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
         {onNavigate && (
              <button
                onClick={() => onNavigate('bac-menu')}
                className="flex items-center gap-2 px-2 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
            )}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="text-green-600" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Purchase Request Management</h1>
            <p className="text-gray-600">Manage and track purchase requests</p>
          </div>
        </div>
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
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title, PR number, transaction number, requester, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Filter size={18} />
            <span className="font-medium">Status Filter</span>
            {filterStatus !== 'All' && (
              <span className="ml-1 px-2 py-0.5 bg-green-600 text-white text-xs rounded-full">
                Active
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Pending', 'Approved', 'Cancelled', 'Reopened'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === status
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {filterStatus !== 'All' && (
              <button
                onClick={() => setFilterStatus('All')}
                className="mt-4 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Clear filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredItems.length}</span> of <span className="font-semibold">{items.length}</span> Purchase Requests
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600">Loading purchase requests...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">No purchase requests found matching your criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">PR Number</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Transaction #</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Requested By</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Department</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Amount</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Last Updated</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-green-700">
                      {item.prNumber}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.transactionNumber}
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
                    <td className="px-4 py-3 text-center">
                      {getActionButtons(item)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowConfirmModal(false)} />
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Confirm {actionType?.charAt(0).toUpperCase()}{actionType?.slice(1)}
              </h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to {actionType} this Purchase Request?
              </p>
              
              <div className="bg-gray-50 rounded p-3 mb-4">
                <p className="text-sm font-medium text-gray-700">{selectedItem.title}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedItem.prNumber}</p>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className={`px-4 py-2 text-white rounded transition-colors font-medium ${
                    actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                    actionType === 'cancel' ? 'bg-red-600 hover:bg-red-700' :
                    'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Confirm {actionType?.charAt(0).toUpperCase()}{actionType?.slice(1)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remarks Modal */}
      {showRemarksModal && selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowRemarksModal(false)} />
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Remarks & Comments</h3>
                    <p className="text-sm text-gray-600">{selectedItem.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedItem.prNumber} - {selectedItem.transactionNumber}</p>
                  </div>
                  <button
                    onClick={() => setShowRemarksModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XCircle size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                {remarksList.length === 0 ? (
                  <div className="text-center py-8">
                    <Eye size={48} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600">No remarks yet. Be the first to add one!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {remarksList.map((remark) => (
                      <div key={remark.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-green-600 font-semibold text-sm">
                                {remark.author.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{remark.author}</p>
                              <p className="text-xs text-gray-500">{remark.date}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm ml-10">{remark.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add New Remark
                </label>
                <textarea
                  value={newRemark}
                  onChange={(e) => setNewRemark(e.target.value)}
                  placeholder="Enter your remarks here..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
                <div className="flex gap-3 justify-end mt-3">
                  <button
                    onClick={() => setShowRemarksModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors font-medium"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleAddRemark}
                    disabled={!newRemark.trim()}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Remark
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PRManagementScreen;
import { useState, useEffect } from 'react';
import { Search, Filter, FileText, CheckCircle, XCircle, RotateCcw, Clock, Eye, ArrowLeft } from 'lucide-react';

interface PPMPItem {
  id: number;
  transactionNumber: string;
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

interface PPMPManagementScreenProps {
   onNavigate?: (nav: string) => void;
}

const PPMPManagementScreen = ({ onNavigate }: PPMPManagementScreenProps) => {
  const [items, setItems] = useState<PPMPItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Cancelled' | 'Reopened'>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PPMPItem | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRemarksModal, setShowRemarksModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'cancel' | 'reopen' | null>(null);
  const [newRemark, setNewRemark] = useState('');
  const [remarksList, setRemarksList] = useState<Remark[]>([]);

  // Fetch PPMP data
  const fetchPPMPs = async () => {
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
      const response = await fetch('/api/ppmp');
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
        transactionNumber: 'PPMP-2024-001',
        title: 'Office Supplies Procurement Plan Q4 2024',
        requestedBy: 'John Doe',
        department: 'Admin',
        amount: 125000,
        status: 'Pending',
        dateSubmitted: '2024-11-01',
        lastUpdated: '2024-11-05',
        description: 'Quarterly procurement plan for office supplies including paper, pens, folders, and other stationery items.',
        remarks: ['Please review item quantities', 'Budget allocation confirmed']
      },
      {
        id: 2,
        transactionNumber: 'PPMP-2024-002',
        title: 'Medical Supplies Annual Plan 2025',
        requestedBy: 'Sarah Williams',
        department: 'Health',
        amount: 850000,
        status: 'Cancelled',
        dateSubmitted: '2024-10-15',
        lastUpdated: '2024-10-20',
        description: 'Annual procurement plan for medical supplies and equipment for health services.'
      },
      {
        id: 3,
        transactionNumber: 'PPMP-2024-003',
        title: 'Training Materials Procurement 2024',
        requestedBy: 'Emily Davis',
        department: 'HR',
        amount: 95000,
        status: 'Approved',
        dateSubmitted: '2024-10-20',
        lastUpdated: '2024-10-22',
        description: 'Procurement plan for training materials, manuals, and educational resources.'
      },
      {
        id: 4,
        transactionNumber: 'PPMP-2024-004',
        title: 'IT Equipment Procurement Plan Q1 2025',
        requestedBy: 'Michael Chen',
        department: 'IT',
        amount: 750000,
        status: 'Pending',
        dateSubmitted: '2024-11-03',
        lastUpdated: '2024-11-03',
        description: 'First quarter procurement plan for computers, printers, and networking equipment.'
      },
      {
        id: 5,
        transactionNumber: 'PPMP-2024-005',
        title: 'Building Maintenance Supplies 2025',
        requestedBy: 'Robert Martinez',
        department: 'Maintenance',
        amount: 320000,
        status: 'Approved',
        dateSubmitted: '2024-10-18',
        lastUpdated: '2024-10-25',
        description: 'Annual procurement plan for building maintenance supplies and equipment.'
      },
      {
        id: 6,
        transactionNumber: 'PPMP-2024-006',
        title: 'Security Equipment Upgrade Plan',
        requestedBy: 'Lisa Anderson',
        department: 'Security',
        amount: 580000,
        status: 'Reopened',
        dateSubmitted: '2024-10-10',
        lastUpdated: '2024-11-04',
        description: 'Procurement plan for security system upgrades and surveillance equipment.'
      },
      {
        id: 7,
        transactionNumber: 'PPMP-2024-007',
        title: 'Vehicle Fleet Maintenance Plan',
        requestedBy: 'David Thompson',
        department: 'Transport',
        amount: 450000,
        status: 'Pending',
        dateSubmitted: '2024-11-06',
        lastUpdated: '2024-11-06',
        description: 'Annual procurement plan for vehicle maintenance parts and supplies.'
      },
      {
        id: 8,
        transactionNumber: 'PPMP-2024-008',
        title: 'Library Resources Procurement',
        requestedBy: 'Jennifer Lee',
        department: 'Education',
        amount: 180000,
        status: 'Approved',
        dateSubmitted: '2024-10-12',
        lastUpdated: '2024-10-15',
        description: 'Procurement plan for library books, journals, and digital resources.'
      }
    ]);
  };

  useEffect(() => {
    fetchPPMPs();
  }, []);

  // Filter items based on search and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transactionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Handle opening remarks modal
  const handleOpenRemarks = (item: PPMPItem) => {
    setSelectedItem(item);
    // Load remarks for this item (mock data for now)
    setRemarksList([
      {
        id: 1,
        author: 'BAC Admin',
        text: 'Initial review completed. Please verify budget allocation.',
        date: '2024-11-05 10:30 AM'
      },
      {
        id: 2,
        author: 'Finance Officer',
        text: 'Budget has been allocated and approved.',
        date: '2024-11-05 02:15 PM'
      }
    ]);
    setShowRemarksModal(true);
  };

  // Add new remark
  const handleAddRemark = async () => {
    if (!newRemark.trim() || !selectedItem) return;

    // TODO: Replace with actual API call
    const remark: Remark = {
      id: remarksList.length + 1,
      author: 'BAC Admin', // This should come from logged-in user
      text: newRemark,
      date: new Date().toLocaleString()
    };

    setRemarksList([...remarksList, remark]);
    setNewRemark('');

    // Update item remarks in state
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
  const handleAction = (item: PPMPItem, action: 'approve' | 'cancel' | 'reopen') => {
    setSelectedItem(item);
    setActionType(action);
    setShowConfirmModal(true);
  };

  // Confirm action
  const confirmAction = async () => {
    if (!selectedItem || !actionType) return;

    // TODO: Replace with actual API call
    console.log(`${actionType} PPMP ${selectedItem.transactionNumber}`);

    // Update local state
    setItems(items.map(item => {
      if (item.id === selectedItem.id) {
        let newStatus: PPMPItem['status'] = item.status;
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
  const getStatusBadge = (status: PPMPItem['status']) => {
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
  const getActionButtons = (item: PPMPItem) => {
    return (
      <div className="flex gap-2">
        {/* Remarks button - always available */}
        <button
          onClick={() => handleOpenRemarks(item)}
          className="px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-1"
          title="View/Add Remarks"
        >
          <Eye size={14} />
          Remarks
        </button>

        {/* Status-specific buttons */}
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
                onClick={() => onNavigate('reports')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
            )}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FileText className="text-purple-600" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">PPMP Management</h1>
            <p className="text-gray-600">Project Procurement Management Plan - Review and manage procurement plans</p>
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
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title, transaction number, requester, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Filter size={18} />
            <span className="font-medium">Status Filter</span>
            {filterStatus !== 'All' && (
              <span className="ml-1 px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                Active
              </span>
            )}
          </button>
        </div>

        {/* Filter Options */}
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
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {filterStatus !== 'All' && (
              <button
                onClick={() => setFilterStatus('All')}
                className="mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium"
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
            Showing <span className="font-semibold">{filteredItems.length}</span> of <span className="font-semibold">{items.length}</span> PPMPs
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600">Loading PPMPs...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">No PPMPs found matching your criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
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
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
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
                Are you sure you want to {actionType} this PPMP?
              </p>
              
              <div className="bg-gray-50 rounded p-3 mb-4">
                <p className="text-sm font-medium text-gray-700">{selectedItem.title}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedItem.transactionNumber}</p>
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
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Remarks & Comments</h3>
                    <p className="text-sm text-gray-600">{selectedItem.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{selectedItem.transactionNumber}</p>
                  </div>
                  <button
                    onClick={() => setShowRemarksModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XCircle size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Remarks List */}
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
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 font-semibold text-sm">
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

              {/* Add Remark Section */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add New Remark
                </label>
                <textarea
                  value={newRemark}
                  onChange={(e) => setNewRemark(e.target.value)}
                  placeholder="Enter your remarks here..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
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
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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

export default PPMPManagementScreen;
import { useState, useEffect } from 'react';
import { Search, Filter, FileText, DollarSign, FileBarChart, ShoppingCart, CheckCircle, XCircle, Clock, Eye, Shield, ArrowLeft } from 'lucide-react';

interface MayorApprovalRequest {
  id: number;
  type: 'PPMP' | 'PR' | 'APP' | 'PO';
  transactionNumber: string;
  prNumber?: string;
  poNumber?: string;
  fiscalYear?: string;
  title: string;
  requestedBy: string;
  department: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
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

interface MayorApprovalScreenProps {
    onNavigate?: (nav: string) => void;
}

const MayorApprovalScreen = ({ onNavigate }: MayorApprovalScreenProps) => {
  const [items, setItems] = useState<MayorApprovalRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'PPMP' | 'PR' | 'APP' | 'PO'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MayorApprovalRequest | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRemarksModal, setShowRemarksModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [newRemark, setNewRemark] = useState('');
  const [remarksList, setRemarksList] = useState<Remark[]>([]);

  const fetchApprovals = async () => {
    setLoading(true);
    const USE_MOCK_DATA = true;
    
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        loadMockData();
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const response = await fetch('/api/mayor-approvals');
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
        transactionNumber: 'PPMP-2024-001',
        title: 'Office Supplies Procurement Plan Q4 2024',
        requestedBy: 'John Doe',
        department: 'Admin',
        amount: 125000,
        status: 'Pending',
        dateSubmitted: '2024-11-01',
        lastUpdated: '2024-11-08',
        description: 'Quarterly procurement plan for office supplies'
      },
      {
        id: 2,
        type: 'PR',
        transactionNumber: 'TXN-2024-003',
        prNumber: 'PR-2024-046',
        title: 'Printer Maintenance Supplies',
        requestedBy: 'Mike Johnson',
        department: 'IT',
        amount: 35000,
        status: 'Pending',
        dateSubmitted: '2024-11-03',
        lastUpdated: '2024-11-08',
        description: 'Toner cartridges and maintenance kits'
      },
      {
        id: 3,
        type: 'APP',
        transactionNumber: 'APP-2025-001',
        fiscalYear: '2025',
        title: 'Annual Procurement Plan FY 2025',
        requestedBy: 'Maria Santos',
        department: 'Planning',
        amount: 15000000,
        status: 'Pending',
        dateSubmitted: '2024-11-01',
        lastUpdated: '2024-11-08',
        description: 'Comprehensive annual procurement plan'
      },
      {
        id: 4,
        type: 'PO',
        transactionNumber: 'TXN-2024-050',
        poNumber: 'PO-2024-100',
        title: 'Computer Equipment Purchase Order',
        requestedBy: 'Jane Smith',
        department: 'IT',
        amount: 450000,
        status: 'Approved',
        dateSubmitted: '2024-10-28',
        lastUpdated: '2024-11-05',
        description: 'Purchase order for desktop computers'
      },
      {
        id: 5,
        type: 'PPMP',
        transactionNumber: 'PPMP-2024-007',
        title: 'Vehicle Fleet Maintenance Plan',
        requestedBy: 'David Thompson',
        department: 'Transport',
        amount: 450000,
        status: 'Approved',
        dateSubmitted: '2024-11-06',
        lastUpdated: '2024-11-07',
        description: 'Annual procurement plan for vehicle maintenance'
      },
      {
        id: 6,
        type: 'PR',
        transactionNumber: 'TXN-2024-010',
        prNumber: 'PR-2024-051',
        title: 'Medical Supplies',
        requestedBy: 'Dr. James Brown',
        department: 'Health',
        amount: 195000,
        status: 'Rejected',
        dateSubmitted: '2024-11-07',
        lastUpdated: '2024-11-08',
        description: 'First aid kits and basic medical supplies'
      },
      {
        id: 7,
        type: 'PO',
        transactionNumber: 'TXN-2024-052',
        poNumber: 'PO-2024-101',
        title: 'Security Equipment Purchase Order',
        requestedBy: 'Lisa Anderson',
        department: 'Security',
        amount: 320000,
        status: 'Pending',
        dateSubmitted: '2024-11-06',
        lastUpdated: '2024-11-08',
        description: 'CCTV and surveillance equipment'
      },
      {
        id: 8,
        type: 'APP',
        transactionNumber: 'APP-2025-003',
        fiscalYear: '2025',
        title: 'Education Supplies Annual Plan',
        requestedBy: 'Teacher Linda Garcia',
        department: 'Education',
        amount: 4200000,
        status: 'Pending',
        dateSubmitted: '2024-10-20',
        lastUpdated: '2024-11-08',
        description: 'Educational materials and classroom supplies'
      }
    ]);
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transactionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.prNumber && item.prNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.poNumber && item.poNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.fiscalYear && item.fiscalYear.includes(searchTerm)) ||
      item.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleOpenRemarks = (item: MayorApprovalRequest) => {
    setSelectedItem(item);
    setRemarksList([
      {
        id: 1,
        author: 'BAC Chairperson',
        text: 'All requirements verified and compliant with procurement guidelines.',
        date: '2024-11-05 10:30 AM'
      },
      {
        id: 2,
        author: 'Head of Office',
        text: 'Budget allocation confirmed. Ready for final approval.',
        date: '2024-11-07 02:15 PM'
      }
    ]);
    setShowRemarksModal(true);
  };

  const handleAddRemark = async () => {
    if (!newRemark.trim() || !selectedItem) return;

    const remark: Remark = {
      id: remarksList.length + 1,
      author: 'Mayor',
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

  const handleAction = (item: MayorApprovalRequest, action: 'approve' | 'reject') => {
    setSelectedItem(item);
    setActionType(action);
    setShowConfirmModal(true);
  };

  const confirmAction = async () => {
    if (!selectedItem || !actionType) return;

    setItems(items.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          status: actionType === 'approve' ? 'Approved' : 'Rejected',
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));

    setShowConfirmModal(false);
    setSelectedItem(null);
    setActionType(null);
  };

  const getStatusBadge = (status: MayorApprovalRequest['status']) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Approved: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800'
    };

    const icons = {
      Pending: <Clock size={14} />,
      Approved: <CheckCircle size={14} />,
      Rejected: <XCircle size={14} />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  const getTypeBadge = (type: 'PPMP' | 'PR' | 'APP' | 'PO') => {
    const badges = {
      PPMP: { color: 'bg-purple-100 text-purple-700', icon: <FileText size={12} />, label: 'PPMP' },
      PR: { color: 'bg-blue-100 text-blue-700', icon: <DollarSign size={12} />, label: 'PR' },
      APP: { color: 'bg-pink-100 text-pink-700', icon: <FileBarChart size={12} />, label: 'APP' },
      PO: { color: 'bg-green-100 text-green-700', icon: <ShoppingCart size={12} />, label: 'PO' }
    };

    const badge = badges[type];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded ${badge.color} text-xs font-medium`}>
        {badge.icon}
        {badge.label}
      </span>
    );
  };

  const statusCounts = {
    pending: items.filter(i => i.status === 'Pending').length,
    approved: items.filter(i => i.status === 'Approved').length,
    rejected: items.filter(i => i.status === 'Rejected').length
  };

  const typeCounts = {
    ppmp: items.filter(i => i.type === 'PPMP').length,
    pr: items.filter(i => i.type === 'PR').length,
    app: items.filter(i => i.type === 'APP').length,
    po: items.filter(i => i.type === 'PO').length
  };

  const getActionButtons = (item: MayorApprovalRequest) => {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleOpenRemarks(item)}
          className="px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-1"
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
              onClick={() => handleAction(item, 'reject')}
              className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-1"
            >
              <XCircle size={14} />
              Reject
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4">
            {onNavigate && (
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
            )}
            
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Shield className="text-amber-600" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Mayor's Office - Final Approval</h1>
            <p className="text-gray-600">Review and approve PPMP, PR, APP, and PO requests</p>
          </div>
        </div>
      </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Approval</p>
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
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
            </div>
            <XCircle size={32} className="text-red-500 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-purple-600 font-medium">PPMP</p>
              <p className="text-xl font-bold text-purple-700">{typeCounts.ppmp}</p>
            </div>
            <FileText size={24} className="text-purple-400" />
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-600 font-medium">PR</p>
              <p className="text-xl font-bold text-blue-700">{typeCounts.pr}</p>
            </div>
            <DollarSign size={24} className="text-blue-400" />
          </div>
        </div>

        <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-pink-600 font-medium">APP</p>
              <p className="text-xl font-bold text-pink-700">{typeCounts.app}</p>
            </div>
            <FileBarChart size={24} className="text-pink-400" />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-600 font-medium">PO</p>
              <p className="text-xl font-bold text-green-700">{typeCounts.po}</p>
            </div>
            <ShoppingCart size={24} className="text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title, transaction number, PR/PO number, fiscal year, requester, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Filter size={18} />
            <span className="font-medium">Filters</span>
            {(filterType !== 'All' || filterStatus !== 'All') && (
              <span className="ml-1 px-2 py-0.5 bg-amber-600 text-white text-xs rounded-full">Active</span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                <div className="flex flex-wrap gap-2">
                  {['All', 'PPMP', 'PR', 'APP', 'PO'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterType === type ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterStatus === status ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {(filterType !== 'All' || filterStatus !== 'All') && (
              <button
                onClick={() => {
                  setFilterType('All');
                  setFilterStatus('All');
                }}
                className="mt-4 text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredItems.length}</span> of <span className="font-semibold">{items.length}</span> requests
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            <span className="ml-3 text-gray-600">Loading requests...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Shield size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">No requests found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Transaction #</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Reference</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Requested By</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Department</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Amount</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">{getTypeBadge(item.type)}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.transactionNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.prNumber || item.poNumber || (item.fiscalYear ? `FY ${item.fiscalYear}` : '-')}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">{item.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.requestedBy}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.department}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 text-right font-medium">₱{item.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">{getStatusBadge(item.status)}</td>
                    <td className="px-4 py-3 text-center">{getActionButtons(item)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showConfirmModal && selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowConfirmModal(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Confirm {actionType?.charAt(0).toUpperCase()}{actionType?.slice(1)}
              </h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to {actionType} this request as Mayor?
              </p>
              <div className="bg-gray-50 rounded p-3 mb-4">
                <p className="text-sm font-medium text-gray-700">{selectedItem.title}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedItem.transactionNumber}</p>
                <p className="text-xs text-amber-600 font-medium mt-2">This is the final approval.</p>
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
                    actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    <p className="text-xs text-gray-500 mt-1">{selectedItem.transactionNumber}</p>
                  </div>
                  <button onClick={() => setShowRemarksModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <XCircle size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                {remarksList.length === 0 ? (
                  <div className="text-center py-8">
                    <Eye size={48} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600">No remarks yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {remarksList.map((remark) => (
                      <div key={remark.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <span className="text-amber-600 font-semibold text-sm">{remark.author.charAt(0)}</span>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Add New Remark</label>
                <textarea
                  value={newRemark}
                  onChange={(e) => setNewRemark(e.target.value)}
                  placeholder="Enter your remarks here..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
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
                    className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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

export default MayorApprovalScreen;
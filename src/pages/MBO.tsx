import { useState, useEffect } from 'react';
import { Search, Filter, FileText, DollarSign, FileBarChart, Plus, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, ArrowLeft, Users } from 'lucide-react';

interface MBOItem {
  id: number;
  type: 'PPMP' | 'PR' | 'APP';
  transactionNumber: string;
  prNumber?: string;
  fiscalYear?: string;
  title: string;
  requestedBy: string;
  department: string;
  amount: number;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected';
  dateCreated: string;
  lastUpdated: string;
  description?: string;
  items?: number;
}

interface MBOScreenProps {
  onNavigate?: (nav: string) => void;
}

const MBOApproval = ({ onNavigate }: MBOScreenProps) => {
  const [items, setItems] = useState<MBOItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'PPMP' | 'PR' | 'APP'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Draft' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MBOItem | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const fetchMBOItems = async () => {
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
      const response = await fetch('/api/mbo-items');
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
        status: 'Approved',
        dateCreated: '2024-10-15',
        lastUpdated: '2024-11-08',
        description: 'Quarterly procurement plan for office supplies including paper, pens, folders',
        items: 15
      },
      {
        id: 2,
        type: 'PPMP',
        transactionNumber: 'PPMP-2024-007',
        title: 'Vehicle Fleet Maintenance Plan',
        requestedBy: 'David Thompson',
        department: 'Transport',
        amount: 450000,
        status: 'Pending',
        dateCreated: '2024-11-01',
        lastUpdated: '2024-11-06',
        description: 'Annual procurement plan for vehicle maintenance and spare parts',
        items: 8
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
        status: 'Draft',
        dateCreated: '2024-11-03',
        lastUpdated: '2024-11-05',
        description: 'Toner cartridges and maintenance kits for office printers',
        items: 5
      },
      {
        id: 4,
        type: 'PR',
        transactionNumber: 'TXN-2024-010',
        prNumber: 'PR-2024-051',
        title: 'Medical Supplies',
        requestedBy: 'Dr. James Brown',
        department: 'Health',
        amount: 195000,
        status: 'Approved',
        dateCreated: '2024-10-28',
        lastUpdated: '2024-11-07',
        description: 'First aid kits and basic medical supplies for health centers',
        items: 12
      },
      {
        id: 5,
        type: 'APP',
        transactionNumber: 'APP-2025-001',
        fiscalYear: '2025',
        title: 'Annual Procurement Plan FY 2025',
        requestedBy: 'Maria Santos',
        department: 'Planning',
        amount: 15000000,
        status: 'Pending',
        dateCreated: '2024-10-01',
        lastUpdated: '2024-11-01',
        description: 'Comprehensive annual procurement plan for all departments',
        items: 125
      },
      {
        id: 6,
        type: 'APP',
        transactionNumber: 'APP-2025-003',
        fiscalYear: '2025',
        title: 'Education Supplies Annual Plan',
        requestedBy: 'Teacher Linda Garcia',
        department: 'Education',
        amount: 4200000,
        status: 'Draft',
        dateCreated: '2024-10-20',
        lastUpdated: '2024-10-25',
        description: 'Educational materials and classroom supplies for public schools',
        items: 67
      },
      {
        id: 7,
        type: 'PPMP',
        transactionNumber: 'PPMP-2024-012',
        title: 'IT Equipment Procurement Plan',
        requestedBy: 'Sarah Williams',
        department: 'IT',
        amount: 890000,
        status: 'Pending',
        dateCreated: '2024-11-05',
        lastUpdated: '2024-11-08',
        description: 'Computers, servers, and networking equipment',
        items: 22
      },
      {
        id: 8,
        type: 'PR',
        transactionNumber: 'TXN-2024-025',
        prNumber: 'PR-2024-063',
        title: 'Building Maintenance Materials',
        requestedBy: 'Robert Martinez',
        department: 'Engineering',
        amount: 275000,
        status: 'Rejected',
        dateCreated: '2024-11-02',
        lastUpdated: '2024-11-07',
        description: 'Cement, paint, and other construction materials',
        items: 18
      }
    ]);
  };

  useEffect(() => {
    fetchMBOItems();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transactionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.prNumber && item.prNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.fiscalYear && item.fiscalYear.includes(searchTerm)) ||
      item.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleViewDetails = (item: MBOItem) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const handleDelete = (itemId: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== itemId));
    }
  };

  const getStatusBadge = (status: MBOItem['status']) => {
    const styles = {
      Draft: 'bg-gray-100 text-gray-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Approved: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800'
    };

    const icons = {
      Draft: <Edit size={14} />,
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

  const getTypeBadge = (type: 'PPMP' | 'PR' | 'APP') => {
    const badges = {
      PPMP: { color: 'bg-blue-100 text-blue-700', icon: <FileText size={12} />, label: 'PPMP' },
      PR: { color: 'bg-green-100 text-green-700', icon: <DollarSign size={12} />, label: 'Purchase Request' },
      APP: { color: 'bg-purple-100 text-purple-700', icon: <FileBarChart size={12} />, label: 'APP' }
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
    draft: items.filter(i => i.status === 'Draft').length,
    pending: items.filter(i => i.status === 'Pending').length,
    approved: items.filter(i => i.status === 'Approved').length,
    rejected: items.filter(i => i.status === 'Rejected').length
  };

  const typeCounts = {
    ppmp: items.filter(i => i.type === 'PPMP').length,
    pr: items.filter(i => i.type === 'PR').length,
    app: items.filter(i => i.type === 'APP').length
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

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
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Municipal Budget Office</h1>
                <p className="text-gray-600">Manage procurement plans, purchase requests, and annual procurement</p>
              </div>
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus size={20} />
            New Item
          </button>
        </div>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-gray-600">{statusCounts.draft}</p>
            </div>
            <Edit size={32} className="text-gray-500 opacity-50" />
          </div>
        </div>

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
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
            </div>
            <XCircle size={32} className="text-red-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Type Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-600 font-medium">PPMP</p>
              <p className="text-xl font-bold text-blue-700">{typeCounts.ppmp}</p>
              <p className="text-xs text-blue-600 mt-1">Procurement Plans</p>
            </div>
            <FileText size={32} className="text-blue-400" />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-600 font-medium">PR</p>
              <p className="text-xl font-bold text-green-700">{typeCounts.pr}</p>
              <p className="text-xs text-green-600 mt-1">Purchase Requests</p>
            </div>
            <DollarSign size={32} className="text-green-400" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-purple-600 font-medium">APP</p>
              <p className="text-xl font-bold text-purple-700">{typeCounts.app}</p>
              <p className="text-xs text-purple-600 mt-1">Annual Plans</p>
            </div>
            <FileBarChart size={32} className="text-purple-400" />
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
              placeholder="Search by title, transaction number, PR number, fiscal year, requester, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Filter size={18} />
            <span className="font-medium">Filters</span>
            {(filterType !== 'All' || filterStatus !== 'All') && (
              <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">Active</span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                <div className="flex flex-wrap gap-2">
                  {['All', 'PPMP', 'PR', 'APP'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterType === type ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  {['All', 'Draft', 'Pending', 'Approved', 'Rejected'].map(status => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterStatus === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredItems.length}</span> of <span className="font-semibold">{items.length}</span> items
          </p>
          <p className="text-sm text-gray-600">
            Total Amount: <span className="font-semibold text-blue-600">₱{totalAmount.toLocaleString()}</span>
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading items...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">No items found</p>
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
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Items</th>
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
                      {item.prNumber || (item.fiscalYear ? `FY ${item.fiscalYear}` : '-')}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 max-w-xs truncate">{item.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.requestedBy}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.department}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 text-center">{item.items || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 text-right font-medium">₱{item.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">{getStatusBadge(item.status)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleViewDetails(item)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowDetailsModal(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeBadge(selectedItem.type)}
                      {getStatusBadge(selectedItem.status)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedItem.title}</h3>
                    <p className="text-sm text-gray-600">{selectedItem.transactionNumber}</p>
                  </div>
                  <button 
                    onClick={() => setShowDetailsModal(false)} 
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XCircle size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Requested By</label>
                    <p className="text-gray-800 font-medium">{selectedItem.requestedBy}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
                    <p className="text-gray-800 font-medium">{selectedItem.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
                    <p className="text-gray-800 font-bold text-lg">₱{selectedItem.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Number of Items</label>
                    <p className="text-gray-800 font-medium">{selectedItem.items || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Date Created</label>
                    <p className="text-gray-800">{new Date(selectedItem.dateCreated).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Last Updated</label>
                    <p className="text-gray-800">{new Date(selectedItem.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </div>

                {selectedItem.description && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-700">{selectedItem.description}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors font-medium"
                  >
                    Close
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Edit Details
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

export default MBOApproval;
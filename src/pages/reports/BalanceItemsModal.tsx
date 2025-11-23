import { useState, useEffect } from 'react';
import { X, Search, Download, RefreshCw, Package, ArrowLeft } from 'lucide-react';

interface BalanceItem {
  id: number;
  description: string;
  unit: string;
  used: number;
  available: number;
  total: number;
}

interface BalanceItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StatModal {
  open: boolean;
  type: 'total' | 'available' | 'used' | null;
}

interface StatModalData {
  title: string;
  color: 'blue' | 'green' | 'orange';
  items: BalanceItem[];
  showColumn: 'all' | 'available' | 'used';
}

const BalanceItemsModal = ({ isOpen, onClose }: BalanceItemsModalProps) => {
  const [items, setItems] = useState<BalanceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [statModal, setStatModal] = useState<StatModal>({ open: false, type: null });

  const loadMockData = () => {
    setItems([
      { id: 1, description: 'Bond Paper, Long, 20lbs', unit: 'Ream', used: 45, available: 155, total: 200 },
      { id: 2, description: 'Ballpen, Blue Ink', unit: 'Box', used: 12, available: 38, total: 50 },
      { id: 3, description: 'Printer Ink, Black (HP)', unit: 'Cartridge', used: 8, available: 17, total: 25 },
      { id: 4, description: 'Folder, Expandable', unit: 'Piece', used: 67, available: 133, total: 200 },
      { id: 5, description: 'Stapler, Heavy Duty', unit: 'Piece', used: 3, available: 7, total: 10 },
      { id: 6, description: 'Whiteboard Marker, Assorted', unit: 'Box', used: 15, available: 35, total: 50 },
      { id: 7, description: 'Envelopes, Long Brown', unit: 'Box', used: 20, available: 80, total: 100 },
      { id: 8, description: 'Clipboard, Plastic', unit: 'Piece', used: 8, available: 12, total: 20 }
    ]);
  };

  const fetchBalanceItems = async () => {
    setLoading(true);
    setError(null);

    const USE_MOCK_DATA = true;

    if (USE_MOCK_DATA) {
      setTimeout(() => {
        loadMockData();
        setLoading(false);
        setError('Using demo data - API not configured');
      }, 500);
      return;
    }

    try {
      const response = await fetch('/api/balance-items', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();
      setItems(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.warn('API not available, using mock data:', errorMessage);
      setError('Using demo data - API not configured');
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchBalanceItems();
  }, [isOpen]);

  const filteredItems = items.filter(item =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUsed = filteredItems.reduce((sum, item) => sum + item.used, 0);
  const totalAvailable = filteredItems.reduce((sum, item) => sum + item.available, 0);

  const exportToCSV = () => {
    const headers = ['Description', 'Unit', 'Used (pcs)', 'Available (pcs)', 'Total'];
    const rows = filteredItems.map(item => [
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

  const getStatModalData = (): StatModalData | null => {
    switch (statModal.type) {
      case 'total':
        return { title: 'All Items', color: 'blue', items: filteredItems, showColumn: 'all' };
      case 'available':
        return { title: 'Available Items', color: 'green', items: filteredItems.filter(i => i.available > 0), showColumn: 'available' };
      case 'used':
        return { title: 'Used Items', color: 'orange', items: filteredItems.filter(i => i.used > 0), showColumn: 'used' };
      default:
        return null;
    }
  };

  const colorMap: Record<'blue' | 'green' | 'orange', string> = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    orange: 'bg-orange-500'
  };

  const closeStatModal = () => setStatModal({ open: false, type: null });

  const StatDetailModal = () => {
    const data = getStatModalData();
    if (!data) return null;

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeStatModal} />
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
          <div className={`${colorMap[data.color]} text-white p-4 flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <button onClick={closeStatModal} className="p-1 hover:bg-white/20 rounded">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h3 className="text-lg font-bold">{data.title}</h3>
                <p className="text-sm opacity-90">{data.items.length} items</p>
              </div>
            </div>
            <button onClick={closeStatModal} className="p-1 hover:bg-white/20 rounded">
              <X size={20} />
            </button>
          </div>
          <div className="overflow-y-auto max-h-[60vh]">
            <table className="w-full">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Unit</th>
                  {data.showColumn === 'all' && (
                    <>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Used</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Available</th>
                    </>
                  )}
                  {data.showColumn === 'used' && (
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Used (pcs)</th>
                  )}
                  {data.showColumn === 'available' && (
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Available (pcs)</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.items.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">{item.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.unit}</td>
                    {data.showColumn === 'all' && (
                      <>
                        <td className="px-4 py-3 text-sm text-gray-800 text-right font-medium">{item.used}</td>
                        <td className="px-4 py-3 text-sm text-gray-800 text-right font-medium">{item.available}</td>
                      </>
                    )}
                    {data.showColumn === 'used' && (
                      <td className="px-4 py-3 text-sm text-gray-800 text-right font-medium">{item.used}</td>
                    )}
                    {data.showColumn === 'available' && (
                      <td className="px-4 py-3 text-sm text-gray-800 text-right font-medium">{item.available}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t bg-gray-50 flex justify-end">
            <button
              onClick={closeStatModal}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Balance Items</h2>
                <p className="text-sm text-gray-600">Available items from Annual Procurement Plan</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Toolbar */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by description or unit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={fetchBalanceItems}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                  <span className="font-medium">Refresh</span>
                </button>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download size={18} />
                  <span className="font-medium">Export CSV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm font-medium">📊 Demo Mode</p>
                <p className="text-blue-700 text-xs mt-1">Currently displaying sample data for demonstration purposes.</p>
                <p className="text-blue-600 text-xs mt-1">To connect to your database, set USE_MOCK_DATA to false</p>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="animate-spin text-blue-600" size={32} />
                <span className="ml-3 text-gray-600">Loading balance items...</span>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600">No items found</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Unit</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Used (pcs)</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Available (pcs)</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredItems.map((item) => {
                        const percentageUsed = (item.used / item.total) * 100;
                        const isLowStock = percentageUsed >= 80;
                        return (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-800">{item.description}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{item.unit}</td>
                            <td className="px-4 py-3 text-sm text-gray-800 text-right font-medium">{item.used}</td>
                            <td className="px-4 py-3 text-sm text-gray-800 text-right font-medium">{item.available}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-right">{item.total}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isLowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {isLowStock ? 'Low Stock' : 'Available'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                      <tr>
                        <td colSpan={2} className="px-4 py-3 text-sm font-bold text-gray-800">Total</td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-800 text-right">{totalUsed}</td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-800 text-right">{totalAvailable}</td>
                        <td colSpan={2}></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Clickable Summary Stats */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setStatModal({ open: true, type: 'total' })}
                    className="bg-blue-50 rounded-lg p-4 text-left hover:bg-blue-100 hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-blue-300 group"
                  >
                    <p className="text-sm text-blue-600 font-medium">Total Items</p>
                    <p className="text-2xl font-bold text-blue-800">{filteredItems.length}</p>
                    <p className="text-xs text-blue-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to view details →</p>
                  </button>
                  <button
                    onClick={() => setStatModal({ open: true, type: 'available' })}
                    className="bg-green-50 rounded-lg p-4 text-left hover:bg-green-100 hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-green-300 group"
                  >
                    <p className="text-sm text-green-600 font-medium">Total Available</p>
                    <p className="text-2xl font-bold text-green-800">{totalAvailable}</p>
                    <p className="text-xs text-green-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to view details →</p>
                  </button>
                  <button
                    onClick={() => setStatModal({ open: true, type: 'used' })}
                    className="bg-orange-50 rounded-lg p-4 text-left hover:bg-orange-100 hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-orange-300 group"
                  >
                    <p className="text-sm text-orange-600 font-medium">Total Used</p>
                    <p className="text-2xl font-bold text-orange-800">{totalUsed}</p>
                    <p className="text-xs text-orange-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to view details →</p>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600">Showing {filteredItems.length} of {items.length} items</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Stat Detail Modal */}
      {statModal.open && <StatDetailModal />}
    </div>
  );
};

export default BalanceItemsModal;
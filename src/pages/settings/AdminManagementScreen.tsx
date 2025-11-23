import { useState } from 'react';
import { Users, UserPlus, Activity, Briefcase, Package, FileText, RotateCcw, ChevronRight, Search, Plus, Edit, Trash2, Eye, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface AdminDashboardProps {
  onNavigate?: (nav: string) => void;
}

export const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
  const { styles } = useTheme();
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'enroll', label: 'Enroll/Create User', icon: UserPlus },
    { id: 'manage', label: 'Manage Users', icon: Users },
    { id: 'logs', label: 'Activity Logs', icon: Activity },
    { id: 'designation', label: 'Designations', icon: Briefcase },
    { id: 'units', label: 'Units', icon: Package },
    { id: 'items', label: 'Items', icon: FileText },
    { id: 'reset', label: 'Reset PR & PO Number', icon: RotateCcw },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'enroll':
        return <EnrollUserSection />;
      case 'manage':
        return <ManageUsersSection searchTerm={searchTerm} />;
      case 'logs':
        return <ActivityLogsSection searchTerm={searchTerm} />;
      case 'designation':
        return <DesignationSection searchTerm={searchTerm} />;
      case 'units':
        return <UnitsSection searchTerm={searchTerm} />;
      case 'items':
        return <ItemsSection searchTerm={searchTerm} />;
      case 'reset':
        return <ResetNumbersSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('settings')}
                  className={`flex items-center gap-2 px-3 py-2 ${styles.textSecondary} ${styles.hoverBg} rounded-lg transition-colors`}
                >
                  <ArrowLeft size={20} />
                  <span>Back</span>
                </button>
              )}
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
                <p className="text-sm text-gray-500">Manage your application preferences and configurations</p>
              </div>
            </div>
            {(activeSection === 'manage' || activeSection === 'logs' || activeSection === 'designation' || activeSection === 'units' || activeSection === 'items') && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewSection() {
  const stats = [
    { label: 'Total Users', value: '248', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Active Today', value: '89', change: '+8%', icon: Activity, color: 'green' },
    { label: 'Designations', value: '15', change: '+2', icon: Briefcase, color: 'purple' },
    { label: 'Total Items', value: '1,247', change: '+45', icon: Package, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-2">{stat.change} from last month</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { user: 'John Doe', action: 'Created new user account', time: '5 minutes ago' },
            { user: 'Jane Smith', action: 'Updated designation list', time: '15 minutes ago' },
            { user: 'Admin', action: 'Reset PR number', time: '1 hour ago' },
            { user: 'Mike Johnson', action: 'Added new item to inventory', time: '2 hours ago' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">{activity.user[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EnrollUserSection() {
  const handleCreateUser = () => {
    // Handle user creation logic
    alert('User created successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Enroll/Create New User</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Select Designation</option>
              <option>Manager</option>
              <option>Supervisor</option>
              <option>Staff</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Select Department</option>
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Select Role</option>
            <option>Admin</option>
            <option>User</option>
            <option>Viewer</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={handleCreateUser} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create User
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ManageUsersSection({ searchTerm }: { searchTerm: string }) {
  const users = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive' },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Manage Users</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredUsers.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Eye className="w-4 h-4" /></button>
                    <button className="p-1 text-gray-600 hover:bg-gray-50 rounded"><Edit className="w-4 h-4" /></button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ActivityLogsSection({ searchTerm }: { searchTerm: string }) {
  const logs = [
    { user: 'John Doe', action: 'Created new user', timestamp: '2025-01-15 10:30 AM', ip: '192.168.1.1' },
    { user: 'Jane Smith', action: 'Updated designation', timestamp: '2025-01-15 09:15 AM', ip: '192.168.1.2' },
    { user: 'Admin', action: 'Reset PR number', timestamp: '2025-01-15 08:00 AM', ip: '192.168.1.3' },
  ];

  const filteredLogs = logs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Activity Logs</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredLogs.map((log, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.user}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{log.action}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{log.timestamp}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DesignationSection({ searchTerm }: { searchTerm: string }) {
  const [designations, setDesignations] = useState([
    { id: 1, name: 'Manager', count: 15 },
    { id: 2, name: 'Supervisor', count: 32 },
    { id: 3, name: 'Staff', count: 89 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newDesignation, setNewDesignation] = useState('');

  const filteredDesignations = designations.filter(designation =>
    designation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDesignation = () => {
    if (newDesignation.trim()) {
      setDesignations([...designations, { 
        id: designations.length + 1, 
        name: newDesignation, 
        count: 0 
      }]);
      setNewDesignation('');
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Designations</h2>
          <button onClick={() => setShowModal(true)} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span>Add Designation</span>
          </button>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {filteredDesignations.map((designation) => (
              <div key={designation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div>
                  <h3 className="font-medium text-gray-900">{designation.name}</h3>
                  <p className="text-sm text-gray-500">{designation.count} users</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded"><Edit className="w-4 h-4" /></button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Designation</h3>
            <input 
              type="text" 
              placeholder="Designation Name" 
              value={newDesignation}
              onChange={(e) => setNewDesignation(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4" 
            />
            <div className="flex space-x-2">
              <button onClick={handleAddDesignation} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function UnitsSection({ searchTerm }: { searchTerm: string }) {
  const units = [
    { id: 1, name: 'Pieces', abbreviation: 'pcs' },
    { id: 2, name: 'Kilograms', abbreviation: 'kg' },
    { id: 3, name: 'Liters', abbreviation: 'L' },
  ];

  const filteredUnits = units.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.abbreviation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Units</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>Add Unit</span>
        </button>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          {filteredUnits.map((unit) => (
            <div key={unit.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <h3 className="font-medium text-gray-900">{unit.name}</h3>
                <p className="text-sm text-gray-500">Abbreviation: {unit.abbreviation}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded"><Edit className="w-4 h-4" /></button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ItemsSection({ searchTerm }: { searchTerm: string }) {
  const items = [
    { id: 1, name: 'Office Chair', category: 'Furniture', unit: 'pcs', stock: 45 },
    { id: 2, name: 'Printer Paper', category: 'Supplies', unit: 'reams', stock: 200 },
    { id: 3, name: 'Laptop', category: 'Electronics', unit: 'pcs', stock: 15 },
  ];

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Items</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.unit}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.stock}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Eye className="w-4 h-4" /></button>
                    <button className="p-1 text-gray-600 hover:bg-gray-50 rounded"><Edit className="w-4 h-4" /></button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ResetNumbersSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Reset PR Number</h2>
        <p className="text-gray-600 mb-4">Current PR Number: <span className="font-semibold">PR-2025-0234</span></p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New PR Starting Number</label>
            <input type="text" placeholder="PR-2025-0001" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Reset PR Number
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Reset PO Number</h2>
        <p className="text-gray-600 mb-4">Current PO Number: <span className="font-semibold">PO-2025-0156</span></p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New PO Starting Number</label>
            <input type="text" placeholder="PO-2025-0001" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Reset PO Number
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
            <p className="text-sm text-yellow-700 mt-1">Resetting numbers will affect all future transactions. This action cannot be undone.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Package, FileText, ClipboardCheck, CheckCircle, TrendingUp } from 'lucide-react';
import BalanceItemsModal from './BalanceItemsModal'; // Import the modal

interface ReportsMenuProps {
  onNavigate: (nav: string) => void;
}

export const ReportsMenu = ({ onNavigate }: ReportsMenuProps) => {
  // State for controlling the Balance Items modal
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  const reportModules = [
    {
      title: 'Balance Items',
      description: 'View available items from the Annual Procurement Plan',
      icon: <Package size={40} />,
      nav: 'reports-balance-items',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      useModal: true // Flag to indicate this uses a modal
    },
    {
      title: 'Purchase Order',
      description: 'Generate and track purchase order reports',
      icon: <FileText size={40} />,
      nav: 'reports-purchase-order',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      useModal: false
    },
    {
      title: 'Inspection & Acceptance',
      description: 'Manage inspection and acceptance form reports',
      icon: <ClipboardCheck size={40} />,
      nav: 'reports-inspection-acceptance',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      useModal: false
    },
    {
      title: 'Approvals',
      description: 'Track and monitor approval status across all processes',
      icon: <CheckCircle size={40} />,
      nav: 'reports-approvals',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      useModal: false
    }
  ];

  // Handle click based on whether it should open a modal or navigate
  const handleModuleClick = (module: typeof reportModules[0]) => {
    if (module.useModal && module.nav === 'reports-balance-items') {
      setShowBalanceModal(true);
    } else {
      onNavigate(module.nav);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Reports Management
        </h1>
        <p className="text-gray-600">
          Generate and view comprehensive reports for procurement activities
        </p>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportModules.map((module) => (
          <button
            key={module.nav}
            onClick={() => handleModuleClick(module)}
            className="block group text-left w-full"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
              {/* Icon Header */}
              <div className={`${module.color} ${module.hoverColor} p-6 transition-colors flex items-center justify-center`}>
                <div className="text-white">
                  {module.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {module.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {module.description}
                </p>

                {/* Action Button */}
                <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                  <span>View Report</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Stats Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div 
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setShowBalanceModal(true)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Available Items</p>
                <p className="text-3xl font-bold text-blue-600">156</p>
              </div>
              <Package size={32} className="text-blue-500 opacity-50" />
            </div>
            <div className="mt-2">
              <span className="text-xs text-green-600 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                12% from last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Purchase Orders</p>
                <p className="text-3xl font-bold text-green-600">43</p>
              </div>
              <FileText size={32} className="text-green-500 opacity-50" />
            </div>
            <div className="mt-2">
              <span className="text-xs text-gray-600">
                8 pending approval
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">IAF Completed</p>
                <p className="text-3xl font-bold text-orange-600">27</p>
              </div>
              <ClipboardCheck size={32} className="text-orange-500 opacity-50" />
            </div>
            <div className="mt-2">
              <span className="text-xs text-gray-600">
                5 awaiting inspection
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approvals</p>
                <p className="text-3xl font-bold text-purple-600">89%</p>
              </div>
              <CheckCircle size={32} className="text-purple-500 opacity-50" />
            </div>
            <div className="mt-2">
              <span className="text-xs text-gray-600">
                Approval rate this quarter
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Reports Generated</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            <div 
              className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setShowBalanceModal(true)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Package size={20} className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Q4 Balance Items Report</p>
                    <p className="text-sm text-gray-600">Complete inventory of available APP items</p>
                    <p className="text-xs text-gray-500 mt-1">Generated 1 hour ago</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Ready</span>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <FileText size={20} className="text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">November Purchase Orders</p>
                    <p className="text-sm text-gray-600">Monthly PO summary and status</p>
                    <p className="text-xs text-gray-500 mt-1">Generated 3 hours ago</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Ready</span>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <ClipboardCheck size={20} className="text-orange-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">IAF Compliance Report</p>
                    <p className="text-sm text-gray-600">Inspection and acceptance tracking report</p>
                    <p className="text-xs text-gray-500 mt-1">Generated yesterday</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Ready</span>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-purple-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Approval Pipeline Status</p>
                    <p className="text-sm text-gray-600">Current approval workflows and bottlenecks</p>
                    <p className="text-xs text-gray-500 mt-1">Generated 2 days ago</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Export Options</h3>
        <p className="text-sm text-gray-600 mb-4">
          Export reports in various formats for further analysis and record-keeping
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
            Export to PDF
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
            Export to Excel
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
            Export to CSV
          </button>
        </div>
      </div>

      {/* Balance Items Modal */}
      <BalanceItemsModal 
        isOpen={showBalanceModal}
        onClose={() => setShowBalanceModal(false)}
      />
    </div>
  );
};

export default ReportsMenu;
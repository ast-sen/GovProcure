import { FileText, DollarSign, FileBarChart, ArrowRight } from 'lucide-react';

interface BACMenuProps {
  onNavigate: (nav: string) => void;
}

const BACMenu = ({ onNavigate }: BACMenuProps) => {
  const bacModules = [
    {
      title: 'PPMP',
      description: 'Project Procurement Management Plan - Manage and review procurement plans',
      icon: <FileText size={40} />,
      nav: 'bac-ppmp',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      title: 'Purchase Request',
      description: 'Manage and track purchase requests.',
      icon: <DollarSign size={40} />,
      nav: 'bac-pr',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      title: 'APP',
      description: 'Annual Procurement Plan - Plan and track annual procurement activities',
      icon: <FileBarChart size={40} />,
      nav: 'bac-app',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Bids and Awards Committee (BAC) Menu
        </h1>
        <p className="text-gray-600">
          Select a module to manage procurement processes and documentation
        </p>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bacModules.map((module) => (
          <button
            key={module.nav}
            onClick={() => onNavigate(module.nav)}
            className="block group text-left w-full"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
              {/* Icon Header */}
              <div className={`${module.color} ${module.hoverColor} p-6 transition-colors`}>
                <div className="text-white">
                  {module.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {module.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {module.description}
                </p>

                {/* Action Button */}
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Access Module</span>
                  <ArrowRight size={18} className="ml-2" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Stats Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending PPMPs</p>
                <p className="text-3xl font-bold text-blue-600">12</p>
              </div>
              <FileText size={32} className="text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Payrolls</p>
                <p className="text-3xl font-bold text-green-600">8</p>
              </div>
              <DollarSign size={32} className="text-green-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">APP Items</p>
                <p className="text-3xl font-bold text-purple-600">45</p>
              </div>
              <FileBarChart size={32} className="text-purple-500 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            <div className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <FileText size={20} className="text-blue-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">PPMP Updated</p>
                    <p className="text-sm text-gray-600">Office Supplies PPMP has been revised</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <DollarSign size={20} className="text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Purchase Request Processed</p>
                    <p className="text-sm text-gray-600">MBO PR has been completed</p>
                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <FileBarChart size={20} className="text-purple-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">APP Approved</p>
                    <p className="text-sm text-gray-600">2025 Annual Procurement Plan approved</p>
                    <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BACMenu;
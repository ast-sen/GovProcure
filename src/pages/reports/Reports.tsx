import { useState } from 'react';
import { Package, FileText, ClipboardCheck, CheckCircle, FileBox, FolderCheck, Handshake, Files } from 'lucide-react';
import BalanceItemsModal from './BalanceItemsModal';
import { useTheme } from '../../context/ThemeContext';

interface ReportsMenuProps {
  onNavigate: (nav: string) => void;
}

export const ReportsMenu = ({ onNavigate }: ReportsMenuProps) => {
  const { styles } = useTheme();
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  const reportModules = [
    {
      title: 'Balance Items',
      description: 'View available items from the Annual Procurement Plan',
      icon: <Package size={40} />,
      nav: 'reports-balance-items',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      useModal: true
    },
    {
      title: 'Obligation Slip',
      description: 'Track and monitor approval status across all processes',
      icon: <Files size={40} />,
      nav: 'reports-os',
      color: 'bg-cyan-500',
      hoverColor: 'hover:bg-cyan-600',
      useModal: false
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
      title: 'Request for Quotation',
      description: 'Track and monitor approval status across all processes',
      icon: <CheckCircle size={40} />,
      nav: 'reports-rfq',
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600',
      useModal: false
    },
    {
      title: 'Approvals',
      description: 'Track and monitor approval status across all processes',
      icon: <FolderCheck size={40} />,
      nav: 'reports-approvals',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      useModal: false
    },
    {
      title: 'Abstract of Bids',
      description: 'Track and monitor approval status across all processes',
      icon: <Handshake size={40} />,
      nav: 'reports-abstract',
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600',
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
      title: 'Requisition & Issue Slip',
      description: 'Track and monitor approval status across all processes',
      icon: <FileBox size={40} />,
      nav: 'reports-ris',
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600',
      useModal: false
    },
  ];

  // Report Summary data
  const reportSummary = [
    {
      label: 'Purchase Request',
      value: 27,
      icon: <ClipboardCheck size={32} />,
      color: 'orange',
      subtitle: '5 awaiting inspection',
      onClick: () => onNavigate('reports-approvals')
    },
    {
      label: 'Project Procurement Plan',
      value: 43,
      icon: <FileText size={32} />,
      color: 'green',
      subtitle: '8 pending approval',
      onClick: () => onNavigate('project-procurement')
    },
    {
      label: 'Annual Procurement Plan',
      value: 2,
      icon: <CheckCircle size={32} />,
      color: 'purple',
      subtitle: 'Approval rate this quarter',
      onClick: () => onNavigate('reports-approvals')
    },
    {
      label: 'Archives',
      value: 156,
      icon: <FolderCheck size={32} />,
      color: 'blue',
      subtitle: 'Files from previous years',
      onClick: () => setShowBalanceModal(true)
    },
  ];

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
        <h1 className={`text-3xl font-bold ${styles.textPrimary} mb-2`}>
          Reports Management
        </h1>
        <p className={styles.textSecondary}>
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
            <div className={`${styles.bgCard} rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full`}>
              <div className={`${module.color} ${module.hoverColor} p-6 transition-colors flex items-center justify-center`}>
                <div className="text-white">
                  {module.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold ${styles.textPrimary} mb-2`}>
                  {module.title}
                </h3>
                <p className={`${styles.textSecondary} mb-4 text-sm`}>
                  {module.description}
                </p>
                <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                  <span>View Report</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Report Summary Section */}
      <div className="mt-12">
        <h2 className={`text-2xl font-bold ${styles.textPrimary} mb-4`}>Report Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {reportSummary.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`${styles.bgCard} rounded-lg shadow p-6 text-left hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${styles.textSecondary} text-sm`}>{item.label}</p>
                  <p className={`text-3xl font-bold text-${item.color}-600`}>{item.value}</p>
                </div>
                <div className={`text-${item.color}-500 opacity-50`}>
                  {item.icon}
                </div>
              </div>
              <div className="mt-2">
                <span className={`text-xs ${styles.textSecondary}`}>
                  {item.subtitle}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Reports Section */}
      <div className="mt-8">
        <h2 className={`text-2xl font-bold ${styles.textPrimary} mb-4`}>Recent Reports Generated</h2>
        <div className={`${styles.bgCard} rounded-lg shadow overflow-hidden`}>
          <div className={`divide-y ${styles.border}`}>
            <button 
              className={`w-full p-4 ${styles.hoverBg} transition-colors text-left`}
              onClick={() => setShowBalanceModal(true)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Package size={20} className="text-blue-500 mt-1" />
                  <div>
                    <p className={`font-semibold ${styles.textPrimary}`}>Q4 Balance Items Report</p>
                    <p className={`text-sm ${styles.textSecondary}`}>Complete inventory of available APP items</p>
                    <p className={`text-xs ${styles.textMuted} mt-1`}>Generated 1 hour ago</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Ready</span>
              </div>
            </button>

            <button 
              className={`w-full p-4 ${styles.hoverBg} transition-colors text-left`}
              onClick={() => onNavigate('reports-purchase-order')}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <FileText size={20} className="text-green-500 mt-1" />
                  <div>
                    <p className={`font-semibold ${styles.textPrimary}`}>November Purchase Orders</p>
                    <p className={`text-sm ${styles.textSecondary}`}>Monthly PO summary and status</p>
                    <p className={`text-xs ${styles.textMuted} mt-1`}>Generated 3 hours ago</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Ready</span>
              </div>
            </button>

            <button 
              className={`w-full p-4 ${styles.hoverBg} transition-colors text-left`}
              onClick={() => onNavigate('reports-inspection-acceptance')}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <ClipboardCheck size={20} className="text-orange-500 mt-1" />
                  <div>
                    <p className={`font-semibold ${styles.textPrimary}`}>IAF Compliance Report</p>
                    <p className={`text-sm ${styles.textSecondary}`}>Inspection and acceptance tracking report</p>
                    <p className={`text-xs ${styles.textMuted} mt-1`}>Generated yesterday</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Ready</span>
              </div>
            </button>

            <button 
              className={`w-full p-4 ${styles.hoverBg} transition-colors text-left`}
              onClick={() => onNavigate('reports-approvals')}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-purple-500 mt-1" />
                  <div>
                    <p className={`font-semibold ${styles.textPrimary}`}>Approval Pipeline Status</p>
                    <p className={`text-sm ${styles.textSecondary}`}>Current approval workflows and bottlenecks</p>
                    <p className={`text-xs ${styles.textMuted} mt-1`}>Generated 2 days ago</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Ready</span>
              </div>
            </button>
          </div>
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
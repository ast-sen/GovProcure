import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Procurement } from './pages/ProjectProcurement';
import { PurchaseRequest} from './pages/PurchaseRequest';
import { ReportsMenu } from './pages/reports/Reports';
import BACMenu from './pages/bac/BacMenu';
import PurchaseOrder from './pages/reports/PurchaseOrder';
import InspectionAcceptanceReport from './pages/reports/AcceptanceForm';
import ApprovalsScreen from './pages/reports/Approvals';
import PPMPManagementScreen from './pages/bac/BacPPMP';

function App() {
  const [activeNav, setActiveNav] = useState('dashboard');

  const renderPage = () => {
    switch (activeNav) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveNav}/>;
      case 'bac-menu':
        return <BACMenu onNavigate={setActiveNav} />;
      case 'bac-ppmp':
        return <PPMPManagementScreen onNavigate={setActiveNav} />;
      // case 'bac-menu':
      //   return <BACMenu onNavigate={setActiveNav} />;
      // case 'bac-menu':
      //   return <BACMenu onNavigate={setActiveNav} />;
      case 'project-procurement':
        return <Procurement onNavigate={setActiveNav} />;
      case 'purchase-request':
        return <PurchaseRequest onNavigate={setActiveNav} />;
      case 'reports-purchase-order':
        return <PurchaseOrder onNavigate={setActiveNav} />;
      case 'reports-inspection-acceptance':
        return <InspectionAcceptanceReport onNavigate={setActiveNav} />;
      case 'reports-approvals':
        return<ApprovalsScreen onNavigate={setActiveNav} />
      case 'reports':
        return <ReportsMenu onNavigate={setActiveNav} />;
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">Settings content coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeNav={activeNav} onNavChange={setActiveNav}>
      {renderPage()}
    </Layout>
  );
}

export default App;
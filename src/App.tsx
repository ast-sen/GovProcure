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
import PRManagementScreen from './pages/bac/BacPR';
import APPManagementScreen from './pages/bac/BacApp';
import SettingsScreen from './pages/SettingsScreen';

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
      case 'bac-pr':
        return <PRManagementScreen onNavigate={setActiveNav} />;
      case 'bac-app':
        return <APPManagementScreen onNavigate={setActiveNav} />;
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
        return <SettingsScreen onNavigate={setActiveNav} />;
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
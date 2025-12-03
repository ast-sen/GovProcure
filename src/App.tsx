import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Procurement } from './pages/ProjectProcurement';
import { PurchaseRequest} from './pages/PurchaseRequest';
import { ReportsMenu } from './pages/reports/Reports';
import PurchaseOrder from './pages/reports/PurchaseOrder';
import InspectionAcceptanceReport from './pages/reports/AcceptanceForm';
import ApprovalsScreen from './pages/reports/Approvals';
import SettingsScreen from './pages/settings/SettingsScreen';
import HeadOfficeApprovalScreen from './pages/HeadOfficeApprovalScreen';
import RequisitionIssueSlip from './pages/reports/RequisitionIssueSlip';
import AbstractOfBids from './pages/reports/AbstractOfBids';
import ObligationSlip from './pages/reports/ObligationSlip';
import RequestForPriceQuotation from './pages/reports/RequestForPriceQuotation';
import MBOApprovalScreen from './pages/MBOApprovalScreen';
import { AdminDashboard } from './pages/settings/AdminManagementScreen';
import AnnualProcurementPlan from './pages/reports/AnnualProcurementPlan';

function App() {
  const [activeNav, setActiveNav] = useState('dashboard');

  const renderPage = () => {
    switch (activeNav) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveNav} />;
      case 'head-of-office':
        return <HeadOfficeApprovalScreen onNavigate={setActiveNav} />;
      case 'mbo-approval':
        return <MBOApprovalScreen onNavigate={setActiveNav} />;
      case 'project-procurement':
        return <Procurement onNavigate={setActiveNav} />;
      case 'purchase-request':
        return <PurchaseRequest onNavigate={setActiveNav} />;
      case 'reports-purchase-order':
        return <PurchaseOrder onNavigate={setActiveNav} />;
      case 'reports-inspection-acceptance':
        return <InspectionAcceptanceReport onNavigate={setActiveNav} />;
      case 'reports-abstract':
        return <AbstractOfBids onNavigate={setActiveNav} />;
      case 'reports-approvals':
        return <ApprovalsScreen onNavigate={setActiveNav} />;
      case 'reports-ris':
        return <RequisitionIssueSlip onNavigate={setActiveNav} />;
      case 'reports-os':
        return <ObligationSlip onNavigate={setActiveNav} />;
      case 'reports-rfq':
        return <RequestForPriceQuotation onNavigate={setActiveNav} />;
      case 'reports':
        return <ReportsMenu onNavigate={setActiveNav} />;
      case 'reports-app':
        return <AnnualProcurementPlan onNavigate={setActiveNav} />;
      case 'settings':
        return <SettingsScreen onNavigate={setActiveNav} />;
      case 'admin-login':
        return <AdminDashboard onNavigate={setActiveNav} />;
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
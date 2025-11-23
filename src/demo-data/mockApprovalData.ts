import { ApprovalRequest, MBOItem } from "../types/approval.types";

// ==================== HEAD OFFICE MOCK DATA ====================
export const MOCK_HEAD_OFFICE_DATA: ApprovalRequest[] = [
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
    lastUpdated: '2024-11-05',
    description: 'Quarterly procurement plan for office supplies',
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
    lastUpdated: '2024-11-03',
    description: 'Toner cartridges and maintenance kits',
  },
  {
    id: 3,
    type: 'PPMP',
    transactionNumber: 'PPMP-2024-004',
    title: 'IT Equipment Procurement Plan Q1 2025',
    requestedBy: 'Michael Chen',
    department: 'IT',
    amount: 750000,
    status: 'Approved',
    dateSubmitted: '2024-11-03',
    lastUpdated: '2024-11-04',
    description: 'First quarter procurement plan for computers',
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
    status: 'Pending',
    dateSubmitted: '2024-11-07',
    lastUpdated: '2024-11-07',
    description: 'First aid kits and basic medical supplies',
  },
  {
    id: 5,
    type: 'PPMP',
    transactionNumber: 'PPMP-2024-007',
    title: 'Vehicle Fleet Maintenance Plan',
    requestedBy: 'David Thompson',
    department: 'Transport',
    amount: 450000,
    status: 'Rejected',
    dateSubmitted: '2024-11-06',
    lastUpdated: '2024-11-08',
    description: 'Annual procurement plan for vehicle maintenance',
  },
  {
    id: 6,
    type: 'PR',
    transactionNumber: 'TXN-2024-007',
    prNumber: 'PR-2024-048',
    title: 'Cleaning Supplies',
    requestedBy: 'David Wilson',
    department: 'Maintenance',
    amount: 42000,
    status: 'Approved',
    dateSubmitted: '2024-11-06',
    lastUpdated: '2024-11-08',
    description: 'Janitorial supplies and cleaning equipment',
  },
];

// ==================== MBO MOCK DATA ====================
export const MOCK_MBO_DATA: MBOItem[] = [
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
    items: 15,
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
    items: 8,
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
    items: 5,
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
    items: 12,
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
    items: 125,
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
    items: 67,
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
    items: 22,
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
    items: 18,
  },
];

// ==================== APPROVALS REPORT MOCK DATA ====================
// Extended type for Approvals Report with different status options
type ApprovalReportItem = Omit<ApprovalRequest, 'status'> & {
  status: 'Pending' | 'Approved' | 'Cancelled' | 'Reopened';
};

export const MOCK_APPROVALS_DATA: ApprovalReportItem[] = [
  {
    id: 1,
    type: 'PPMP',
    transactionNumber: 'TXN-2024-001',
    title: 'Office Supplies Procurement Plan Q4',
    requestedBy: 'John Doe',
    department: 'Admin',
    amount: 125000,
    status: 'Pending',
    dateSubmitted: '2024-11-01',
    lastUpdated: '2024-11-05'
  },
  {
    id: 2,
    type: 'PR',
    transactionNumber: 'TXN-2024-002',
    prNumber: 'PR-2024-045',
    title: 'Computer Equipment Purchase',
    requestedBy: 'Jane Smith',
    department: 'IT',
    amount: 450000,
    status: 'Approved',
    dateSubmitted: '2024-10-28',
    lastUpdated: '2024-10-30'
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
    status: 'Pending',
    dateSubmitted: '2024-11-03',
    lastUpdated: '2024-11-03'
  },
  {
    id: 4,
    type: 'PPMP',
    transactionNumber: 'TXN-2024-004',
    title: 'Medical Supplies Annual Plan',
    requestedBy: 'Sarah Williams',
    department: 'Health',
    amount: 850000,
    status: 'Cancelled',
    dateSubmitted: '2024-10-15',
    lastUpdated: '2024-10-20'
  },
  {
    id: 5,
    type: 'PR',
    transactionNumber: 'TXN-2024-005',
    prNumber: 'PR-2024-047',
    title: 'Vehicle Fuel Allocation',
    requestedBy: 'Robert Brown',
    department: 'Transport',
    amount: 180000,
    status: 'Reopened',
    dateSubmitted: '2024-10-25',
    lastUpdated: '2024-11-04'
  },
  {
    id: 6,
    type: 'PPMP',
    transactionNumber: 'TXN-2024-006',
    title: 'Training Materials Procurement',
    requestedBy: 'Emily Davis',
    department: 'HR',
    amount: 95000,
    status: 'Approved',
    dateSubmitted: '2024-10-20',
    lastUpdated: '2024-10-22'
  },
  {
    id: 7,
    type: 'PR',
    transactionNumber: 'TXN-2024-007',
    prNumber: 'PR-2024-048',
    title: 'Cleaning Supplies',
    requestedBy: 'David Wilson',
    department: 'Maintenance',
    amount: 42000,
    status: 'Pending',
    dateSubmitted: '2024-11-06',
    lastUpdated: '2024-11-06'
  },
  {
    id: 8,
    type: 'PR',
    transactionNumber: 'TXN-2024-008',
    prNumber: 'PR-2024-049',
    title: 'Security Equipment Upgrade',
    requestedBy: 'Lisa Anderson',
    department: 'Security',
    amount: 320000,
    status: 'Approved',
    dateSubmitted: '2024-10-18',
    lastUpdated: '2024-10-25'
  }
];

// ==================== FETCH FUNCTIONS ====================
export const fetchHeadOfficeApprovals = async (): Promise<ApprovalRequest[]> => {
  const USE_MOCK_DATA = true;

  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_HEAD_OFFICE_DATA;
  }

  const response = await fetch('/api/head-office-approvals');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

export const fetchMBOItems = async (): Promise<MBOItem[]> => {
  const USE_MOCK_DATA = true;

  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_MBO_DATA;
  }

  const response = await fetch('/api/mbo-items');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

export const fetchApprovalsData = async (): Promise<ApprovalReportItem[]> => {
  const USE_MOCK_DATA = true;

  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_APPROVALS_DATA;
  }

  const response = await fetch('/api/approvals');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

// Export the type for use in components
export type { ApprovalReportItem };
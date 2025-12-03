
export type BaseStatus = 'Pending' | 'Approved' | 'Rejected' | 'Re-Opened';
export type ExtendedStatus = BaseStatus | 'Draft';
export type DocumentType = 'PPMP' | 'PR' | 'APP' | 'APPC';

export type TypeFilter = 'All' | 'PPMP' | 'PR' | 'APP' | 'APPC';
export type MBOTypeFilter = 'All' | DocumentType;
export type StatusFilter = 'All' | BaseStatus;
export type ExtendedStatusFilter = 'All' | ExtendedStatus;

export interface Remark {
  id: number;
  author: string;
  text: string;
  date: string;
}

export interface BaseApprovalItem {
  status: string;
  id: number;
  type: DocumentType;
  transactionNumber: string;
  prNumber?: string;
  title: string;
  requestedBy: string;
  department: string;
  amount: number;
  description?: string;
  remarks?: string[];
  lastUpdated: string;
}

export interface ApprovalRequest extends BaseApprovalItem {
  type: 'PPMP' | 'PR' | 'APP' | 'APPC';
  status: BaseStatus;
  dateSubmitted: string;
}

export interface MBOItem extends BaseApprovalItem {
  status: ExtendedStatus;
  fiscalYear?: string;
  dateCreated: string;
  items?: number;
}

export interface ApprovalScreenProps {
  onNavigate?: (nav: string) => void;
}

export interface TableColumn<T> {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (item: T) => React.ReactNode;
  format?: (value: any) => string;
}
import { HistoryItem } from ".";

export interface ObligationSlipFormData {
  no: string;
  date: string;
  payee: string;
  address: string;
  responsibilityCenter: string;
  fppa: string;
  particulars: string;
  accountCode: string;
  amount: string;
  requestedBy: string;
  requestedByPosition: string;
  requestedByDate: string;
  fundsAvailableBy: string;
  fundsAvailableByPosition: string;
  fundsAvailableByDate: string;
}

export interface ObligationSlipItem {
  particulars: string;
  accountCode: string;
  amount: string;
}

export interface ObligationSlipProps {
  onNavigate?: (page: string) => void;
}

export interface ObligationSlipHistoryItem extends HistoryItem {
  type: 'obligation-slip';  
  formData: ObligationSlipFormData;  
  payee?: string;
  amount?: string;
}
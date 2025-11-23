import { HistoryItem } from ".";

export interface RFQFormData {
  department: string;
  section: string;
  prNo: string;
  sectionInfo: string;
  alobsNo: string;
  date: string;
  receivedBy: string;
  nameOfEstablishment: string;
  printedNameSignature: string;
  address: string;
  cellphoneNumber: string;
  tin: string;
  vat: string;
  nonVat: boolean;
  vatExempt: boolean;
  bacChairman: string;
}

export interface RFQItem {
  id: string;
  itemNo: number;
  quantity: string;
  unitOfIssue: string;
  itemDescription: string;
  unitPrice: string;
  totalPrice: string;
}

export interface RFQProps {
  onNavigate?: (page: string) => void;
}

export interface RFQHistoryItem extends HistoryItem {
  type: 'rfq';
  formData: RFQFormData;
  items: RFQItem[];
  department?: string;
  totalAmount?: string;
}
export interface PRItem {
  id: string;
  itemNo: number;
  quantity: string;
  unitOfIssue: string;
  itemDescription: string;
  estimatedUnitCost: string;
  estimatedCost: string;
}

export interface PRSignatory {
  signature: string;
  name: string;
  designation: string;
}

export interface PRFormData {
  department: string;
  section: string;
  prNo: string;
  date: string;
  purpose: string;
  requestedBy: PRSignatory;
  approvedBy: PRSignatory;
}

export interface PurchaseRequestProps {
  onNavigate?: (nav: string) => void;
}
export interface POItem {
  id: string;
  itemNo: number;
  quantity: number;
  unit: string;
  particulars: string;
  unitCost: string;
  amount: string;
}

export interface POFormData {
  supplierAddress: string;
  gentlemen: string;
  placeOfDelivery: string;
  dateOfDelivery: string;
  deliveryTerm: string;
  paymentTerm: string;
  conformeDate: string;
}

export interface PurchaseOrderProps {
  onNavigate?: (nav: string) => void;
}

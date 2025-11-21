export interface PPMPItem {
  id: string;
  generalDescription: string;
  unit: string;
  qtySize: string;
  estimatedBudget: string;
  jan_qty: string;
  jan_amt: string;
  feb_qty: string;
  feb_amt: string;
  mar_qty: string;
  mar_amt: string;
  apr_qty: string;
  apr_amt: string;
  may_qty: string;
  may_amt: string;
  jun_qty: string;
  jun_amt: string;
  jul_qty: string;
  jul_amt: string;
  aug_qty: string;
  aug_amt: string;
  sep_qty: string;
  sep_amt: string;
  oct_qty: string;
  oct_amt: string;
  nov_qty: string;
  nov_amt: string;
  dec_qty: string;
  dec_amt: string;
}

export interface PPMPFormData {
  endUserName: string;
  officeAgency: string;
  preparedBy: string;
  approvedBy: string;
}

export interface PPMPProps {
  onNavigate?: (nav: string) => void;
}

export interface Month {
  name: string;
  key: string;
}
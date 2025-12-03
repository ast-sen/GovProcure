export interface APPItem {
  id: string;
  itemNo: number;
  description: string;
  unitCost: string;
  quantity: string;
  totalCost: string;
  configurer: string;
  jan: string;
  feb: string;
  mar: string;
  apr: string;
  may: string;
  jun: string;
  jul: string;
  aug: string;
  sep: string;
  oct: string;
  nov: string;
  dec: string;
}

export interface APPFormData{
  department: string;
  officeSection: string;
  preparedBy: string;
  reviewedBy: string;
}

export interface APPProps {
  onNavigate?: (nav: string) => void;
}
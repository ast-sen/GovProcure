export interface IARItem {
  id: string;
  itemNo: number;
  unit: string;
  quantity: string;
  description: string;
}

export interface IARSignatory {
  signature: string;
  name: string;
  designation: string;
  date: string;
}

export interface IARFormData  {
  supplier: string;
  prNo: string;
  prDate: string;
  poNo: string;
  dateReceived: string;
  dateInspected: string;
  inspectionOfficer: string;
  acceptanceComplete: boolean;
  acceptancePartial: boolean;
  propertyOfficer: string;
}

export interface IARProps {
  onNavigate?: (nav: string) => void;
}
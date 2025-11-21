
export interface RISItem {
  id: string;
  itemNo: number;
  stockNo: string;
  unitOfIssue: string;
  description: string;
  requisitionQty: string;
  issuanceQty: string;
  remarks: string;
}

export interface RISSignatory {
  signature: string;
  name: string;
  position: string;
  date: string;
}

export interface RISFormData {
  // Header fields
  office: string;
  reference: string;
  fund: string;
  risNo: string;
  date: string;
  
  // Purpose
  purpose: string;
  
  // Signatories
  requestedBy: RISSignatory;
  approvedBy: RISSignatory;
  issuedBy: RISSignatory;
  receivedBy: RISSignatory;
}

export interface RISProps {
  onNavigate?: (destination: string) => void;
}

export interface RISFormHeaderProps {
  formData: Pick<RISFormData, 'office' | 'reference' | 'fund' | 'risNo' | 'date'>;
  onFormDataChange: (updates: Partial<RISFormData>) => void;
}

export interface RISItemsTableProps {
  items: RISItem[];
  onUpdateItem?: (id: string, updates: Partial<RISItem>) => void;
  onRemoveItem?: (id: string) => void;
  onAddItem?: () => void;
}

export interface RISSignatureSectionProps {
  formData: Pick<RISFormData, 'purpose' | 'requestedBy' | 'approvedBy' | 'issuedBy' | 'receivedBy'>;
  onFormDataChange: (updates: Partial<RISFormData>) => void;
}

export interface RISPrintTemplateProps {
  formData: RISFormData;
  items: RISItem[];
}

export interface RISPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: RISFormData;
  items: RISItem[];
}

// Default values
export const DEFAULT_RIS_SIGNATORY: RISSignatory = {
  signature: '',
  name: '',
  position: '',
  date: ''
};

export const DEFAULT_RIS_FORM_DATA: RISFormData = {
  office: '',
  reference: '',
  fund: '',
  risNo: '',
  date: '',
  purpose: '',
  requestedBy: {
    ...DEFAULT_RIS_SIGNATORY,
    name: 'JERRY A. CANOY JR.',
    position: 'MUNICIPAL MAYOR'
  },
  approvedBy: {
    ...DEFAULT_RIS_SIGNATORY,
    name: 'JERRY A. CANOY JR.',
    position: 'MUNICIPAL MAYOR'
  },
  issuedBy: {
    ...DEFAULT_RIS_SIGNATORY,
    name: 'HANNAH LEI P. DUBLIN',
    position: 'LO-I'
  },
  receivedBy: {
    ...DEFAULT_RIS_SIGNATORY,
    name: 'JERRY A. CANOY JR.',
    position: 'MUNICIPAL MAYOR'
  }
};
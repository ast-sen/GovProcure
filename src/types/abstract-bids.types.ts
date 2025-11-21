
export interface BidderColumn {
  id: string;
  name: string;
  unitPrice: string;
  totalValue: string;
}

export interface AbstractBidsItem {
  id: string;
  itemNo: number;
  quantity: string;
  unit: string;
  description: string;
  bidders: BidderColumn[];
}

export interface BACMember {
  name: string;
  position: string;
  role: string;
}

export interface AbstractBidsFormData {
  // Header fields
  openedOn: string;
  openedAt: string;
  openedAtTime: string;
  forFurnishing: string;
  forOffice: string;
  
  // Award recommendation
  awardRecommendedTo: string;
  
  // BAC Members
  bacMembers: {
    chairman: BACMember;
    viceChairman: BACMember;
    member1: BACMember;
    member2: BACMember;
    member3: BACMember;
  };
}

export interface AbstractBidsProps {
  onNavigate?: (destination: string) => void;
}

export interface AbstractBidsFormHeaderProps {
  formData: Pick<AbstractBidsFormData, 'openedOn' | 'openedAt' | 'openedAtTime' | 'forFurnishing' | 'forOffice'>;
  onFormDataChange: (updates: Partial<AbstractBidsFormData>) => void;
}

export interface AbstractBidsItemsTableProps {
  items: AbstractBidsItem[];
  bidderNames: string[];
  onUpdateItem?: (id: string, updates: Partial<AbstractBidsItem>) => void;
  onRemoveItem?: (id: string) => void;
  onAddItem?: () => void;
}

export interface AbstractBidsSignatureSectionProps {
  formData: Pick<AbstractBidsFormData, 'awardRecommendedTo' | 'bacMembers'>;
  onFormDataChange: (updates: Partial<AbstractBidsFormData>) => void;
}

export interface AbstractBidsPrintTemplateProps {
  formData: AbstractBidsFormData;
  items: AbstractBidsItem[];
  bidderNames: string[];
}

export interface AbstractBidsPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: AbstractBidsFormData;
  items: AbstractBidsItem[];
  bidderNames: string[];
}

// Default values
export const DEFAULT_BAC_MEMBER: BACMember = {
  name: '',
  position: '',
  role: ''
};

export const DEFAULT_ABSTRACT_BIDS_FORM_DATA: AbstractBidsFormData = {
  openedOn: '',
  openedAt: '',
  openedAtTime: '',
  forFurnishing: '',
  forOffice: '',
  awardRecommendedTo: '',
  bacMembers: {
    chairman: {
      name: 'ENGR. FELIX O. OGABANG JR.',
      position: 'MUN.ENGINEER/BAC CHAIRMAN',
      role: 'APPROVED'
    },
    viceChairman: {
      name: 'JULIETO E. BARINQUE',
      position: 'HRMO/BAC VICE CHAIRMAN',
      role: ''
    },
    member1: {
      name: 'MARIA DOLORES A.GECONCILLO',
      position: 'MPDC/BAC MEMBER',
      role: ''
    },
    member2: {
      name: 'DELIA G. FELISAN',
      position: 'RO I/BAC MEMBER',
      role: ''
    },
    member3: {
      name: '',
      position: 'BAC MEMBER',
      role: ''
    }
  }
};
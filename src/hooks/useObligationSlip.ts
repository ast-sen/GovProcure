import { useState } from 'react';
import { ObligationSlipFormData, ObligationSlipHistoryItem } from '../types/obligation-slip.types';

export const useObligationSlip = () => {
  const [formData, setFormData] = useState<ObligationSlipFormData>({
    no: '',
    date: '',
    payee: 'DOUBLE R SPORTS AND CORPORATE WEAR',
    address: 'KADINGILAN BUKIDNON',
    responsibilityCenter: '',
    fppa: '',
    particulars: 'PAYMENT ............',
    accountCode: '',
    amount: '10,400.00',
    requestedBy: 'JERRY A. CANOY JR.',
    requestedByPosition: 'MUNICIPAL MAYOR',
    requestedByDate: '',
    fundsAvailableBy: 'MARIA RHESA C. CANOY',
    fundsAvailableByPosition: 'Mun. Budget Officer',
    fundsAvailableByDate: ''
  });

  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Success Modal State
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    title: '',
    message: ''
  });

  // History Modal State with ObligationSlipHistoryItem type
  const [historyModal, setHistoryModal] = useState({
    isOpen: false,
    items: [] as ObligationSlipHistoryItem[]
  });

  const updateFormData = (updates: Partial<ObligationSlipFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', formData);
    setSuccessModal({
      isOpen: true,
      title: 'Draft Saved',
      message: 'Your obligation slip has been saved as a draft successfully.'
    });
  };

  const handleSubmitForApproval = () => {
    console.log('Submitting for approval...', formData);
    setSuccessModal({
      isOpen: true,
      title: 'Submitted for Approval',
      message: 'Your obligation slip has been submitted for approval successfully.'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = () => {
    console.log('Downloading PDF...');
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setSuccessModal({
        isOpen: true,
        title: 'PDF Generated',
        message: 'Your obligation slip PDF has been downloaded successfully.'
      });
    }, 2000);
  };

  const handleViewHistory = () => {
    // Mock history data with ObligationSlipHistoryItem type
    const mockHistory: ObligationSlipHistoryItem[] = [
      { 
        id: '1',
        type: 'obligation-slip',
        title: 'Obligation Slip - ABC Corp', 
        prNo: 'OS-2024-001',
        status: 'draft',
        date: '2024-01-15',
        payee: 'ABC Corp',
        amount: '5,000.00',
        formData: { 
          ...formData, 
          no: 'OS-2024-001', 
          payee: 'ABC Corp',
          amount: '5,000.00',
          date: '2024-01-15'
        }
      },
      { 
        id: '2',
        type: 'obligation-slip',
        title: 'Obligation Slip - XYZ Services', 
        prNo: 'OS-2024-002',
        status: 'submitted',
        date: '2024-01-20',
        payee: 'XYZ Services',
        amount: '8,500.00',
        formData: { 
          ...formData, 
          no: 'OS-2024-002', 
          payee: 'XYZ Services',
          amount: '8,500.00',
          date: '2024-01-20'
        }
      },
      { 
        id: '3',
        type: 'obligation-slip',
        title: 'Obligation Slip - Double R Sports', 
        prNo: 'OS-2024-003',
        status: 'draft',
        date: '2024-02-01',
        payee: 'Double R Sports',
        amount: '10,400.00',
        formData: { 
          ...formData, 
          no: 'OS-2024-003',
          date: '2024-02-01'
        }
      },
      { 
        id: '4',
        type: 'obligation-slip',
        title: 'Obligation Slip - Office Supplies', 
        prNo: 'OS-2024-004',
        status: 'submitted',
        date: '2024-02-05',
        payee: 'Office Supplies Co.',
        amount: '12,350.00',
        formData: { 
          ...formData, 
          no: 'OS-2024-004', 
          payee: 'Office Supplies Co.',
          amount: '12,350.00',
          date: '2024-02-05'
        }
      },
      { 
        id: '5',
        type: 'obligation-slip',
        title: 'Obligation Slip - Equipment Purchase', 
        prNo: 'OS-2024-005',
        status: 'draft',
        date: '2024-02-10',
        payee: 'Equipment Corp',
        amount: '25,000.00',
        formData: { 
          ...formData, 
          no: 'OS-2024-005', 
          payee: 'Equipment Corp',
          amount: '25,000.00',
          date: '2024-02-10'
        }
      }
    ];
    
    setHistoryModal({
      isOpen: true,
      items: mockHistory
    });
  };

  const handleSelectHistoryItem = (item: ObligationSlipHistoryItem) => {
    console.log('Selected history item:', item);
    if (item.formData) {
      setFormData(item.formData);
    }
    setHistoryModal({ ...historyModal, isOpen: false });
    setSuccessModal({
      isOpen: true,
      title: 'Document Loaded',
      message: `Successfully loaded ${item.title}`
    });
  };

  return {
    formData,
    showPreview,
    isGenerating,
    setShowPreview,
    updateFormData,
    handleSaveDraft,
    handleSubmitForApproval,
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    successModal: {
      ...successModal,
      onClose: () => setSuccessModal({ ...successModal, isOpen: false })
    },
    historyModal: {
      ...historyModal,
      onClose: () => setHistoryModal({ ...historyModal, isOpen: false }),
      onViewHistory: handleViewHistory,
      onSelectItem: handleSelectHistoryItem
    }
  };
};

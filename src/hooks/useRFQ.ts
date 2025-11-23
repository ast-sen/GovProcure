import { useState } from 'react';
import { RFQFormData, RFQItem, RFQHistoryItem } from '../types/rfq.types';

export const useRFQ = () => {
  const [formData, setFormData] = useState<RFQFormData>({
    department: 'MMO OTHER MOOE',
    section: '',
    prNo: '1000-01-15-B-2025-1101',
    sectionInfo: '',
    alobsNo: '',
    date: '',
    receivedBy: 'BULAC EATERY',
    nameOfEstablishment: '',
    printedNameSignature: 'Kadingilan, Buk',
    address: '',
    cellphoneNumber: '',
    tin: '',
    vat: '',
    nonVat: false,
    vatExempt: false,
    bacChairman: 'ENGR. FELIX O. OGABANG, JR.'
  });

  const [items, setItems] = useState<RFQItem[]>([
    {
      id: '1',
      itemNo: 1,
      quantity: '25',
      unitOfIssue: 'PAX',
      itemDescription: 'PACK LUNCH\n\n****** NOTHING FOLLOWS ******',
      unitPrice: '166.00',
      totalPrice: '4150.00'
    }
  ]);

  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    title: '',
    message: ''
  });

  const [historyModal, setHistoryModal] = useState({
    isOpen: false,
    items: [] as RFQHistoryItem[]
  });

  const updateFormData = (updates: Partial<RFQFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const updateItems = (newItems: RFQItem[]) => {
    setItems(newItems);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', { formData, items });
    setSuccessModal({
      isOpen: true,
      title: 'Draft Saved',
      message: 'Your RFQ has been saved as a draft successfully.'
    });
  };

  const handleSubmitForApproval = () => {
    console.log('Submitting for approval...', { formData, items });
    setSuccessModal({
      isOpen: true,
      title: 'Submitted for Approval',
      message: 'Your RFQ has been submitted for approval successfully.'
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
        message: 'Your RFQ PDF has been downloaded successfully.'
      });
    }, 2000);
  };

  const handleViewHistory = () => {
    const mockHistory: RFQHistoryItem[] = [
      {
        id: '1',
        type: 'rfq',
        title: 'RFQ - Pack Lunch Services',
        prNo: 'RFQ-2024-001',
        status: 'draft',
        date: '2024-01-15',
        department: 'MMO OTHER MOOE',
        totalAmount: '4,150.00',
        formData: formData,
        items: items
      },
      {
        id: '2',
        type: 'rfq',
        title: 'RFQ - Office Supplies',
        prNo: 'RFQ-2024-002',
        status: 'submitted',
        date: '2024-01-20',
        department: 'General Services',
        totalAmount: '12,500.00',
        formData: formData,
        items: items
      }
    ];

    setHistoryModal({
      isOpen: true,
      items: mockHistory
    });
  };

  const handleSelectHistoryItem = (item: RFQHistoryItem) => {
    console.log('Selected history item:', item);
    if (item.formData) {
      setFormData(item.formData);
    }
    if (item.items) {
      setItems(item.items);
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
    items,
    showPreview,
    isGenerating,
    setShowPreview,
    updateFormData,
    updateItems,
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
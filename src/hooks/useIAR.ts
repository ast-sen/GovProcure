import { useState } from 'react';
import { IARItem, IARFormData } from '../types/iar.types';
import { SAMPLE_IAR_ITEMS } from '../utils/constants/iar.constants';
import { useFormPDF } from './shared/useFormPDF';
import { useSuccessModal } from './ui-hooks/useSuccessModal';
import { ApprovedFormItem } from '../components/ui/ApprovedFormsModal';

export const useIAR = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showApprovedModal, setShowApprovedModal] = useState(false);
  
  const { generatePDF, isGenerating } = useFormPDF({
    orientation: 'landscape',
    format: 'legal',
    filenamePrefix: 'IAR'
  });
  
  const { isOpen, modalMessage, modalTitle, showSuccess, closeModal } = useSuccessModal();

  // Mock approved forms data - Replace with API call
  const [approvedForms] = useState<ApprovedFormItem[]>([
    {
      id: 'iar-1',
      formNumber: 'IAR-2024-001',
      title: 'Office Supplies Inspection',
      dateApproved: '2024-11-15',
      approvedBy: 'John Doe',
      supplier: 'ABC Office Supplies Inc.',
      department: 'Finance'
    },
    {
      id: 'iar-2',
      formNumber: 'IAR-2024-002',
      title: 'IT Equipment Acceptance',
      dateApproved: '2024-11-20',
      approvedBy: 'Jane Smith',
      supplier: 'Tech Solutions Corp.',
      department: 'IT'
    },
    {
      id: 'iar-3',
      formNumber: 'IAR-2024-003',
      title: 'Furniture Delivery Inspection',
      dateApproved: '2024-11-25',
      approvedBy: 'John Doe',
      supplier: 'Modern Office Furniture',
      department: 'Admin'
    }
  ]);

  const [formData, setFormData] = useState<IARFormData>({
    supplier: '',
    prNo: '',
    prDate: '',
    poNo: '',
    dateReceived: '',
    dateInspected: '',
    inspectionOfficer: '',
    acceptanceComplete: false,
    acceptancePartial: false,
    propertyOfficer: '',
  });

  const [items] = useState<IARItem[]>(SAMPLE_IAR_ITEMS);

  const updateFormData = (updates: Partial<IARFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Changed from handleSaveDraft to handleUpdate
  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      console.log('Updating approved IAR...');
      console.log('Form Data:', formData);
      console.log('Items:', items);
      
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // const response = await fetch('/api/iar/update', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ formData, items })
      // });
      
      // if (!response.ok) throw new Error('Update failed');
      
      showSuccess('Inspection & Acceptance Report has been updated successfully!', 'IAR Updated');
    } catch (error) {
      console.error('Error updating IAR:', error);
      showSuccess('Failed to update the IAR. Please try again.', 'Update Failed');
    } finally {
      setIsUpdating(false);
    }
  };

  // Load an approved form when selected from the modal
  const handleSelectApprovedForm = async (form: ApprovedFormItem) => {
    try {
      console.log('Loading approved form:', form);
      
      // TODO: Replace with actual API call to fetch full form data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // const response = await fetch(`/api/iar/approved/${form.id}`);
      // if (!response.ok) throw new Error('Failed to load form');
      // const fullData = await response.json();
      
      // Mock loading form data
      setFormData({
        supplier: form.supplier || '',
        prNo: form.formNumber.replace('IAR-', 'PR-'),
        prDate: form.dateApproved,
        poNo: form.formNumber.replace('IAR-', 'PO-'),
        dateReceived: form.dateApproved,
        dateInspected: form.dateApproved,
        inspectionOfficer: form.approvedBy,
        acceptanceComplete: true,
        acceptancePartial: false,
        propertyOfficer: form.approvedBy
      });
      
      // You would also load the items from the API
      // setItems(fullData.items);
      
      setShowApprovedModal(false);
      
      showSuccess(`Successfully loaded ${form.formNumber}`, 'Form Loaded');
    } catch (error) {
      console.error('Error loading approved form:', error);
      showSuccess('Failed to load the approved form. Please try again.', 'Load Failed');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = async () => {
    const filename = `IAR-${formData.poNo || 'draft'}-${new Date().toISOString().split('T')[0]}.pdf`;
    const success = await generatePDF('printable-area', filename, () => {
      showSuccess('Your PDF has been saved successfully!', 'PDF Saved');
    });
    
    if (!success) {
      console.log('PDF generation cancelled');
    }
  };

  return {
    formData,
    items,
    showPreview,
    isGenerating,
    isUpdating,
    setShowPreview,
    updateFormData,
    handleUpdate,           // Changed from handleSaveDraft
    handlePrint,
    handlePreview,
    handleDownloadPDF,
    
    successModal: {
      isOpen,
      message: modalMessage,
      title: modalTitle,
      onClose: closeModal
    },
    
    approvedModal: {
      isOpen: showApprovedModal,
      onClose: () => setShowApprovedModal(false),
      onViewApproved: () => setShowApprovedModal(true),
      items: approvedForms,
      onSelectItem: handleSelectApprovedForm
    }
  };
};
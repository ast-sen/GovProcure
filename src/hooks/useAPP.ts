import { useState } from 'react';
import { APPItem, APPFormData } from '../types/app.types';
import { INITIAL_APP_ITEM } from '../utils/constants/app.constants';
import { useFormPDF } from './shared/useFormPDF';
import { useSuccessModal } from './ui-hooks/useSuccessModal';
import { ApprovedFormItem } from '../components/ui/ApprovedFormsModal';

export const useAPP = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showApprovedModal, setShowApprovedModal] = useState(false);
  
  const { generatePDF, isGenerating } = useFormPDF({
    orientation: 'landscape',
    format: 'legal',
    filenamePrefix: 'APP'
  });
  
  const { isOpen, modalMessage, modalTitle, showSuccess, closeModal } = useSuccessModal();

  // Mock approved forms data - Replace with API call
  const [approvedForms] = useState<ApprovedFormItem[]>([
    {
      id: 'app-1',
      formNumber: 'APP-2024-001',
      title: 'Annual Procurement Plan 2024 - Finance',
      dateApproved: '2024-01-15',
      approvedBy: 'John Doe',
      amount: 5000000,
      department: 'Finance'
    },
    {
      id: 'app-2',
      formNumber: 'APP-2024-002',
      title: 'Annual Procurement Plan 2024 - IT',
      dateApproved: '2024-01-20',
      approvedBy: 'Jane Smith',
      amount: 8500000,
      department: 'IT'
    },
    {
      id: 'app-3',
      formNumber: 'APP-2024-003',
      title: 'Annual Procurement Plan 2024 - Admin',
      dateApproved: '2024-01-25',
      approvedBy: 'John Doe',
      amount: 3200000,
      department: 'Admin'
    }
  ]);

  const [formData, setFormData] = useState<APPFormData>({
    department: '',
    officeSection: '',
    preparedBy: '',
    reviewedBy: '',
  });

  const [items, setItems] = useState<APPItem[]>([
    { id: '1', itemNo: 1, ...INITIAL_APP_ITEM }
  ]);

  const addNewItem = () => {
    const newItem: APPItem = {
      id: Date.now().toString(),
      itemNo: items.length + 1,
      ...INITIAL_APP_ITEM
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      const updatedItems = items.filter(item => item.id !== id);
      const renumberedItems = updatedItems.map((item, index) => ({
        ...item,
        itemNo: index + 1
      }));
      setItems(renumberedItems);
    }
  };

  const updateItem = (id: string, field: keyof APPItem, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-calculate total cost
        if (field === 'quantity' || field === 'unitCost') {
          const qty = parseFloat(field === 'quantity' ? value : updatedItem.quantity) || 0;
          const cost = parseFloat(field === 'unitCost' ? value : updatedItem.unitCost) || 0;
          updatedItem.totalCost = (qty * cost).toFixed(2);
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const updateFormData = (updates: Partial<APPFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => {
      return sum + (parseFloat(item.totalCost) || 0);
    }, 0).toFixed(2);
  };

  // Changed from handleSaveDraft to handleUpdate
  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      console.log('Updating approved APP...');
      console.log('Form Data:', formData);
      console.log('Items:', items);
      console.log('Grand Total:', calculateGrandTotal());
      
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // const response = await fetch('/api/app/update', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ formData, items })
      // });
      
      // if (!response.ok) throw new Error('Update failed');
      
      showSuccess('Annual Procurement Plan has been updated successfully!', 'APP Updated');
    } catch (error) {
      console.error('Error updating APP:', error);
      showSuccess('Failed to update the APP. Please try again.', 'Update Failed');
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
      
      // const response = await fetch(`/api/app/approved/${form.id}`);
      // if (!response.ok) throw new Error('Failed to load form');
      // const fullData = await response.json();
      
      // Mock loading form data
      setFormData({
        department: form.department || '',
        officeSection: form.department || '',
        preparedBy: '',
        reviewedBy: form.approvedBy
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
    const filename = `APP-${new Date().toISOString().split('T')[0]}.pdf`;
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
    addNewItem,
    removeItem,
    updateItem,
    updateFormData,
    calculateGrandTotal,
    handleUpdate,
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
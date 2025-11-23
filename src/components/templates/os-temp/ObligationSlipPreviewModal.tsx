import React from 'react';
import { X } from 'lucide-react';
import { ObligationSlipFormData } from '../../../types/obligation-slip.types';

interface ObligationSlipPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ObligationSlipFormData;
}

export const ObligationSlipPreviewModal: React.FC<ObligationSlipPreviewModalProps> = ({
  isOpen,
  onClose,
  formData
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Preview - Obligation Slip</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8">
          <div className="border-2 border-gray-800 rounded">
            <div className="border-b-2 border-gray-800 p-6 text-center">
              <h2 className="text-sm font-semibold text-gray-700">Republic of the Philippines</h2>
              <h3 className="text-sm font-bold text-gray-800">PROVINCE OF BUKIDNON</h3>
              <h4 className="text-sm font-bold text-gray-800">MUNICIPALITY OF KADINGILAN</h4>
              <h1 className="text-2xl font-bold text-gray-900 mt-3">OBLIGATION SLIP</h1>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><strong>No.:</strong> {formData.no || 'N/A'}</div>
                <div><strong>Date:</strong> {formData.date || 'N/A'}</div>
              </div>
              
              <div><strong>Payee/Office:</strong> {formData.payee}</div>
              <div><strong>Address:</strong> {formData.address}</div>
              
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Responsibility Center:</strong> {formData.responsibilityCenter || 'N/A'}</div>
                <div><strong>F/P.P.A:</strong> {formData.fppa || 'N/A'}</div>
              </div>
              
              <div className="border border-gray-300 rounded p-4">
                <h3 className="font-bold mb-2">Particulars:</h3>
                <p className="whitespace-pre-wrap">{formData.particulars}</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div><strong>Account Code:</strong> {formData.accountCode || 'N/A'}</div>
                  <div><strong>Amount:</strong> ₱{formData.amount}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="border border-gray-300 rounded p-4">
                  <h4 className="font-bold mb-2">Requested By:</h4>
                  <p>{formData.requestedBy}</p>
                  <p className="text-sm text-gray-600">{formData.requestedByPosition}</p>
                  <p className="text-sm">{formData.requestedByDate || 'Date not set'}</p>
                </div>
                <div className="border border-gray-300 rounded p-4">
                  <h4 className="font-bold mb-2">Funds Available:</h4>
                  <p>{formData.fundsAvailableBy}</p>
                  <p className="text-sm text-gray-600">{formData.fundsAvailableByPosition}</p>
                  <p className="text-sm">{formData.fundsAvailableByDate || 'Date not set'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
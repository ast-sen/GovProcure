import React from 'react';
import { X } from 'lucide-react';
import { RFQFormData, RFQItem } from '../../../types/rfq.types';

interface RFQPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: RFQFormData;
  items: RFQItem[];
}

export const RFQPreviewModal: React.FC<RFQPreviewModalProps> = ({
  isOpen,
  onClose,
  formData,
  items
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Preview - RFQ</h2>
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
              <h5 className="text-sm font-bold text-gray-800 mt-2">OFFICE OF THE BIDS AND AWARDS COMMITTEE</h5>
              <h1 className="text-xl font-bold text-gray-900 mt-3">REQUEST FOR PRICE QUOTATION (RFQ)</h1>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Department:</strong> {formData.department}</div>
                <div><strong>PR No.:</strong> {formData.prNo}</div>
                <div><strong>Section:</strong> {formData.section || 'N/A'}</div>
                <div><strong>Date:</strong> {formData.date || 'N/A'}</div>
              </div>
              
              <div className="border border-gray-300 rounded overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-2 text-xs">No.</th>
                      <th className="border px-2 py-2 text-xs">Qty</th>
                      <th className="border px-2 py-2 text-xs">Unit</th>
                      <th className="border px-2 py-2 text-xs">Description</th>
                      <th className="border px-2 py-2 text-xs">Unit Price</th>
                      <th className="border px-2 py-2 text-xs">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id}>
                        <td className="border px-2 py-2 text-center text-sm">{item.itemNo}</td>
                        <td className="border px-2 py-2 text-center text-sm">{item.quantity}</td>
                        <td className="border px-2 py-2 text-center text-sm">{item.unitOfIssue}</td>
                        <td className="border px-2 py-2 text-sm whitespace-pre-wrap">{item.itemDescription}</td>
                        <td className="border px-2 py-2 text-right text-sm">{item.unitPrice}</td>
                        <td className="border px-2 py-2 text-right text-sm">{item.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <p className="font-bold mb-2">Received by: {formData.receivedBy}</p>
                  <p><strong>Establishment:</strong> {formData.nameOfEstablishment || 'N/A'}</p>
                  <p><strong>Address:</strong> {formData.address || 'N/A'}</p>
                </div>
                <div>
                  <p><strong>TIN:</strong> {formData.tin || 'N/A'}</p>
                  <p><strong>VAT:</strong> {formData.vat || 'N/A'}</p>
                  <p><strong>Contact:</strong> {formData.cellphoneNumber || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

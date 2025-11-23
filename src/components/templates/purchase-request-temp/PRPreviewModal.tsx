import React from 'react';
import { X, Download, Printer } from 'lucide-react';
import { PRItem, PRFormData } from '../../../types/purchase-request.types';

interface PRPreviewModalProps {
  formData: PRFormData;
  items: PRItem[];
  calculateTotal: () => string;
  onClose: () => void;
  onDownloadPDF: () => void;
  onPrint: () => void;
}

export const PRPreviewModal: React.FC<PRPreviewModalProps> = ({
  formData,
  items,
  calculateTotal,
  onClose,
  onDownloadPDF,
  onPrint
}) => {
  const formatCurrency = (value: string) => {
    return parseFloat(value || '0').toLocaleString('en-PH', { minimumFractionDigits: 2 });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 no-print">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Preview Purchase Request</h2>
          <div className="flex gap-2">
            <button
              onClick={onDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={18} />
              Download PDF
            </button>
            <button
              onClick={onPrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Printer size={18} />
              Print
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <X size={18} />
              Close
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <div className="bg-white shadow-lg mx-auto" style={{ width: '210mm', padding: '20mm' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '10px', borderBottom: '3px solid #000' }}>
              <h1 style={{ fontSize: '11pt', fontWeight: 'bold', margin: '3px 0' }}>Republic of the Philippines</h1>
              <h2 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '5px 0' }}>Municipality of Kadingilan</h2>
              <h3 style={{ fontSize: '12pt', fontWeight: 'bold', margin: '3px 0' }}>Province of Bukidnon</h3>
              <h2 style={{ fontSize: '12pt', fontWeight: 'bold', marginTop: '15px' }}>PURCHASE REQUEST</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px', fontSize: '10pt' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                <strong>Entity Name:</strong>
                <span style={{ borderBottom: '1px solid #000', flex: 1 }}>{formData.department}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                <strong>PR No.:</strong>
                <span style={{ borderBottom: '1px solid #000', flex: 1 }}>{formData.prNo}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                <strong>Office/Section:</strong>
                <span style={{ borderBottom: '1px solid #000', flex: 1 }}>{formData.section}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                <strong>Date:</strong>
                <span style={{ borderBottom: '1px solid #000', flex: 1 }}>
                  {new Date(formData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt', marginBottom: '15px' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', textAlign: 'center', width: '50px' }}>Item No.</th>
                  <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', textAlign: 'center', width: '70px' }}>Quantity</th>
                  <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', textAlign: 'center', width: '80px' }}>Unit</th>
                  <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', textAlign: 'center' }}>Description</th>
                  <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', textAlign: 'center', width: '100px' }}>Unit Cost</th>
                  <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', textAlign: 'center', width: '100px' }}>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>{item.itemNo}</td>
                    <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>{item.unitOfIssue}</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{item.itemDescription}</td>
                    <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'right' }}>₱{formatCurrency(item.estimatedUnitCost)}</td>
                    <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'right' }}>₱{formatCurrency(item.estimatedCost)}</td>
                  </tr>
                ))}
                {Array.from({ length: Math.max(0, 5 - items.length) }).map((_, idx) => (
                  <tr key={`empty-${idx}`}>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                  </tr>
                ))}
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <td colSpan={5} style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>TOTAL AMOUNT:</td>
                  <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>₱{formatCurrency(calculateTotal())}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginBottom: '20px', fontSize: '10pt' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Purpose:</div>
              <div style={{ border: '1px solid #000', padding: '8px', minHeight: '60px' }}>{formData.purpose}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '30px', fontSize: '10pt' }}>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Requested by:</div>
                <div style={{ borderBottom: '1px solid #000', marginTop: '40px', textAlign: 'center' }}>&nbsp;</div>
                <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '5px' }}>{formData.requestedBy.name}</div>
                <div style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '3px' }}>{formData.requestedBy.designation}</div>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Approved by:</div>
                <div style={{ borderBottom: '1px solid #000', marginTop: '40px', textAlign: 'center' }}>&nbsp;</div>
                <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '5px' }}>{formData.approvedBy.name}</div>
                <div style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '3px' }}>{formData.approvedBy.designation}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
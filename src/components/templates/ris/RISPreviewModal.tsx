import React from 'react';
import { X } from 'lucide-react';
import { RISPreviewModalProps } from '../../../types/ris.types';

export const RISPreviewModal: React.FC<RISPreviewModalProps> = ({
  isOpen,
  onClose,
  formData,
  items
}) => {
  if (!isOpen) return null;

  const totalRows = 30;
  const emptyRowsCount = Math.max(0, totalRows - items.length);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 no-print">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Preview RIS (Letter Portrait)
          </h2>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <X size={18} />
            Close
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <div 
            className="bg-white shadow-lg mx-auto" 
            style={{ width: '8.5in', minHeight: '11in', padding: '0.5in' }}
          >
            {/* Header */}
            <div style={{ 
              position: 'relative', 
              textAlign: 'center', 
              marginBottom: '15px', 
              border: '2px solid #000', 
              padding: '10px' 
            }}>
              <div style={{ 
                position: 'absolute', 
                top: '10px', 
                left: '10px', 
                width: '60px', 
                height: '60px', 
                border: '2px solid #000', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '8pt' 
              }}>
                LOGO
              </div>
              <h1 style={{ fontSize: '16pt', fontWeight: 'bold', margin: '5px 0' }}>
                REQUISITION AND ISSUE SLIP
              </h1>
              <p style={{ fontSize: '11pt', margin: '3px 0' }}>
                MUNICIPALITY OF KADINGILAN
              </p>
              <p style={{ fontSize: '10pt', margin: '3px 0', fontStyle: 'italic' }}>
                LGU
              </p>
              <p style={{ fontSize: '9pt', margin: '3px 0' }}>
                Page 1 of 1
              </p>
            </div>

            {/* Top Info Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '10px', 
              marginBottom: '10px' 
            }}>
              <div style={{ border: '1px solid #000', padding: '8px', fontSize: '9pt' }}>
                <div style={{ marginBottom: '5px' }}>
                  <strong>Office:</strong> {formData.office}
                </div>
                <div>
                  <strong>Reference:</strong> {formData.reference}
                </div>
              </div>
              <div style={{ border: '1px solid #000', padding: '8px', fontSize: '9pt' }}>
                <div style={{ marginBottom: '5px' }}>
                  <strong>FUND:</strong> {formData.fund}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div><strong>RIS No./s:</strong> {formData.risNo}</div>
                  <div><strong>Date:</strong> {formData.date}</div>
                </div>
              </div>
            </div>

            {/* Table */}
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              fontSize: '8pt', 
              marginBottom: '10px' 
            }}>
              <thead>
                <tr>
                  <th rowSpan={2} style={{ 
                    width: '40px', 
                    border: '1px solid #000', 
                    padding: '4px', 
                    backgroundColor: '#e5e7eb', 
                    textAlign: 'center', 
                    fontSize: '7pt' 
                  }}>
                    ITEM<br/>NO.
                  </th>
                  <th rowSpan={2} style={{ 
                    width: '80px', 
                    border: '1px solid #000', 
                    padding: '4px', 
                    backgroundColor: '#e5e7eb', 
                    textAlign: 'center', 
                    fontSize: '7pt' 
                  }}>
                    Stock No.
                  </th>
                  <th rowSpan={2} style={{ 
                    width: '60px', 
                    border: '1px solid #000', 
                    padding: '4px', 
                    backgroundColor: '#e5e7eb', 
                    textAlign: 'center', 
                    fontSize: '7pt' 
                  }}>
                    Unit of<br/>Issue
                  </th>
                  <th rowSpan={2} style={{ 
                    border: '1px solid #000', 
                    padding: '4px', 
                    backgroundColor: '#e5e7eb', 
                    textAlign: 'center', 
                    fontSize: '7pt' 
                  }}>
                    ITEM DESCRIPTION
                  </th>
                  <th colSpan={1} style={{ 
                    border: '1px solid #000', 
                    padding: '4px', 
                    backgroundColor: '#d1d5db', 
                    textAlign: 'center', 
                    fontSize: '7pt' 
                  }}>
                    REQUISITION
                  </th>
                  <th colSpan={2} style={{ 
                    border: '1px solid #000', 
                    padding: '4px', 
                    backgroundColor: '#d1d5db', 
                    textAlign: 'center', 
                    fontSize: '7pt' 
                  }}>
                    ISSUANCE
                  </th>
                </tr>
                <tr>
                  <th style={{ 
                    width: '60px', 
                    border: '1px solid #000', 
                    padding: '4px', 
                    backgroundColor: '#e5e7eb', 
                    textAlign: 'center', 
                    fontSize: '7pt' 
                  }}>
                    Quantity
                  </th>
                  <th style={{ 
                    width: '60px', 
                    border: '1px solid #000', 
                    padding: '4px', 
                    backgroundColor: '#e5e7eb', 
                    textAlign: 'center', 
                    fontSize: '7pt' 
                  }}>
                    Quantity
                  </th>
                  <th style={{ 
                    width: '100px', 
                    border: '1px solid #000', 
                    padding: '4px', 
                    backgroundColor: '#e5e7eb', 
                    textAlign: 'center', 
                    fontSize: '7pt' 
                  }}>
                    REMARKS
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                      {item.itemNo}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                      {item.stockNo}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                      {item.unitOfIssue}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'left' }}>
                      {item.description}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                      {item.requisitionQty}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                      {item.issuanceQty}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'left' }}>
                      {item.remarks}
                    </td>
                  </tr>
                ))}
                {Array.from({ length: emptyRowsCount }).map((_, idx) => (
                  <tr key={`empty-${idx}`}>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '3px', 
                      textAlign: 'center', 
                      fontSize: '7pt', 
                      color: '#9ca3af' 
                    }}>
                      {items.length + idx + 1}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
                    <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
                    <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
                    <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
                    <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
                    <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Purpose Section */}
            <div style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              marginBottom: '10px', 
              fontSize: '9pt' 
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                Purpose:
              </div>
              <div style={{ minHeight: '40px' }}>
                {formData.purpose}
              </div>
            </div>

            {/* Signature Section */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8pt' }}>
              <tbody>
                <tr>
                  {['requestedBy', 'approvedBy', 'issuedBy', 'receivedBy'].map((section) => {
                    const sectionData = formData[section as keyof typeof formData] as any;
                    const label = 
                      section === 'requestedBy' ? 'REQUESTED BY:' :
                      section === 'approvedBy' ? 'APPROVED BY:' :
                      section === 'issuedBy' ? 'ISSUED BY:' : 'RECEIVED BY:';
                    
                    return (
                      <td 
                        key={section} 
                        style={{ 
                          border: '1px solid #000', 
                          padding: '8px', 
                          width: '25%', 
                          verticalAlign: 'top' 
                        }}
                      >
                        <div style={{ 
                          fontWeight: 'bold', 
                          textAlign: 'center', 
                          marginBottom: '5px' 
                        }}>
                          {label}
                        </div>
                        <div style={{ marginTop: '30px' }}>&nbsp;</div>
                        <div style={{ 
                          borderTop: '1px solid #000', 
                          paddingTop: '2px', 
                          marginTop: '20px', 
                          textAlign: 'center' 
                        }}>
                          <strong>{sectionData.name}</strong>
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '7pt' }}>
                          Signature
                        </div>
                        <div style={{ 
                          marginTop: '5px', 
                          textAlign: 'center', 
                          fontSize: '7pt' 
                        }}>
                          <strong>Printed name:</strong> {sectionData.name}
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '7pt' }}>
                          <strong>Position:</strong> {sectionData.position}
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '7pt' }}>
                          <strong>Date:</strong> {sectionData.date}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>

            {/* Footer */}
            <div style={{ marginTop: '15px', fontSize: '8pt', fontWeight: 'bold' }}>
              ANNEX RIS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RISPreviewModal;
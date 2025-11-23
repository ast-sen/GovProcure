// templates/abstract-bids/AbstractBidsPreviewModal.tsx

import React from 'react';
import { X } from 'lucide-react';
import { AbstractBidsPreviewModalProps } from '../../../types/abstract-bids.types';

export const AbstractBidsPreviewModal: React.FC<AbstractBidsPreviewModalProps> = ({
  isOpen,
  onClose,
  formData,
  items,
  bidderNames
}) => {
  if (!isOpen) return null;

  const totalRows = 20;
  const emptyRowsCount = Math.max(0, totalRows - items.length);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 no-print">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Preview Abstract of Bids (Legal Landscape)
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
            style={{ width: '14in', minHeight: '8.5in', padding: '0.5in' }}
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
              <h1 style={{ fontSize: '18pt', fontWeight: 'bold', margin: '5px 0' }}>
                ABSTRACT OF BIDS
              </h1>
              <p style={{ fontSize: '12pt', margin: '3px 0' }}>
                MUNICIPALITY OF KADINGILAN
              </p>
              <p style={{ fontSize: '11pt', margin: '3px 0' }}>
                LGU
              </p>
              <p style={{ fontSize: '9pt', margin: '3px 0' }}>
                Page 1 of 1
              </p>
            </div>

            {/* Header Info */}
            <div style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              marginBottom: '10px', 
              fontSize: '9pt',
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}>
              <div>
                <strong>Abstract of bids opened on</strong> {formData.openedOn}
              </div>
              <div>
                <strong>at</strong> {formData.openedAt}
              </div>
              <div>
                <strong>o'clock A.M. For Furnishing</strong> {formData.forFurnishing}
              </div>
            </div>

            <div style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              marginBottom: '10px', 
              fontSize: '9pt' 
            }}>
              <strong>For the Office of the:</strong> {formData.forOffice}
            </div>

            {/* Main Table */}
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              fontSize: '7pt', 
              marginBottom: '10px' 
            }}>
              <thead>
                <tr>
                  <th rowSpan={2} style={{ 
                    width: '30px', 
                    border: '1px solid #000', 
                    padding: '4px', 
                    backgroundColor: '#e5e7eb', 
                    textAlign: 'center' 
                  }}>
                    ITEM<br/>NO.
                  </th>
                  <th rowSpan={2} style={{ 
                    width: '50px', 
                    border: '1px solid #000', 
                    padding: '4px', 
                    backgroundColor: '#e5e7eb', 
                    textAlign: 'center' 
                  }}>
                    Quantity
                  </th>
                  <th rowSpan={2} style={{ 
                    width: '40px', 
                    border: '1px solid #000', 
                    padding: '4px', 
                    backgroundColor: '#e5e7eb', 
                    textAlign: 'center' 
                  }}>
                    Unit
                  </th>
                  <th rowSpan={2} style={{ 
                    border: '1px solid #000', 
                    padding: '4px', 
                    backgroundColor: '#e5e7eb', 
                    textAlign: 'center' 
                  }}>
                    ITEM DESCRIPTION
                  </th>
                  {bidderNames.map((bidderName, index) => (
                    <th 
                      key={index}
                      colSpan={2} 
                      style={{ 
                        border: '1px solid #000', 
                        padding: '4px', 
                        backgroundColor: '#d1d5db', 
                        textAlign: 'center' 
                      }}
                    >
                      {bidderName}
                    </th>
                  ))}
                </tr>
                <tr>
                  {bidderNames.map((_, index) => (
                    <React.Fragment key={index}>
                      <th style={{ 
                        width: '60px', 
                        border: '1px solid #000', 
                        padding: '4px', 
                        backgroundColor: '#e5e7eb', 
                        textAlign: 'center' 
                      }}>
                        Unit Price
                      </th>
                      <th style={{ 
                        width: '70px', 
                        border: '1px solid #000', 
                        padding: '4px', 
                        backgroundColor: '#e5e7eb', 
                        textAlign: 'center' 
                      }}>
                        Total Value
                      </th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                      {item.itemNo}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                      {item.quantity}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                      {item.unit}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'left' }}>
                      {item.description}
                    </td>
                    {item.bidders.map((bidder) => (
                      <React.Fragment key={bidder.id}>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                          {bidder.unitPrice}
                        </td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                          {bidder.totalValue}
                        </td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
                {Array.from({ length: emptyRowsCount }).map((_, idx) => (
                  <tr key={`empty-${idx}`}>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '3px', 
                      textAlign: 'center', 
                      color: '#9ca3af' 
                    }}>
                      {items.length + idx + 1}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
                    <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
                    <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
                    {bidderNames.map((_, index) => (
                      <React.Fragment key={index}>
                        <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
                        <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Award Recommendation */}
            <div style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              marginBottom: '10px', 
              fontSize: '9pt' 
            }}>
              <strong>Award Recommended to:</strong> {formData.awardRecommendedTo}
            </div>

            {/* BAC Committee */}
            <div style={{ 
              textAlign: 'center', 
              fontSize: '10pt', 
              fontWeight: 'bold', 
              marginBottom: '10px' 
            }}>
              BIDS AND AWARDS COMMITTEE
            </div>

            {/* BAC Members Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8pt' }}>
              <tbody>
                <tr>
                  <td style={{ 
                    border: '1px solid #000', 
                    padding: '8px', 
                    width: '20%', 
                    verticalAlign: 'top' 
                  }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      {formData.bacMembers.chairman.role}:
                    </div>
                    <div style={{ marginTop: '30px' }}>&nbsp;</div>
                    <div style={{ 
                      borderTop: '1px solid #000', 
                      paddingTop: '2px', 
                      marginTop: '20px', 
                      textAlign: 'center' 
                    }}>
                      <strong>{formData.bacMembers.chairman.name}</strong>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '7pt' }}>
                      {formData.bacMembers.chairman.position}
                    </div>
                  </td>
                  <td style={{ 
                    border: '1px solid #000', 
                    padding: '8px', 
                    width: '20%', 
                    verticalAlign: 'top' 
                  }}>
                    <div style={{ marginTop: '30px' }}>&nbsp;</div>
                    <div style={{ 
                      borderTop: '1px solid #000', 
                      paddingTop: '2px', 
                      marginTop: '20px', 
                      textAlign: 'center' 
                    }}>
                      <strong>{formData.bacMembers.viceChairman.name}</strong>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '7pt' }}>
                      {formData.bacMembers.viceChairman.position}
                    </div>
                  </td>
                  <td style={{ 
                    border: '1px solid #000', 
                    padding: '8px', 
                    width: '20%', 
                    verticalAlign: 'top' 
                  }}>
                    <div style={{ marginTop: '30px' }}>&nbsp;</div>
                    <div style={{ 
                      borderTop: '1px solid #000', 
                      paddingTop: '2px', 
                      marginTop: '20px', 
                      textAlign: 'center' 
                    }}>
                      <strong>{formData.bacMembers.member1.name}</strong>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '7pt' }}>
                      {formData.bacMembers.member1.position}
                    </div>
                  </td>
                  <td style={{ 
                    border: '1px solid #000', 
                    padding: '8px', 
                    width: '20%', 
                    verticalAlign: 'top' 
                  }}>
                    <div style={{ marginTop: '30px' }}>&nbsp;</div>
                    <div style={{ 
                      borderTop: '1px solid #000', 
                      paddingTop: '2px', 
                      marginTop: '20px', 
                      textAlign: 'center' 
                    }}>
                      <strong>{formData.bacMembers.member2.name}</strong>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '7pt' }}>
                      {formData.bacMembers.member2.position}
                    </div>
                  </td>
                  <td style={{ 
                    border: '1px solid #000', 
                    padding: '8px', 
                    width: '20%', 
                    verticalAlign: 'top' 
                  }}>
                    <div style={{ marginTop: '30px' }}>&nbsp;</div>
                    <div style={{ 
                      borderTop: '1px solid #000', 
                      paddingTop: '2px', 
                      marginTop: '20px', 
                      textAlign: 'center' 
                    }}>
                      <strong>{formData.bacMembers.member3.name}</strong>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '7pt' }}>
                      {formData.bacMembers.member3.position}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Footer */}
            <div style={{ marginTop: '15px', fontSize: '8pt', fontWeight: 'bold' }}>
              ANNEX G-4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbstractBidsPreviewModal;
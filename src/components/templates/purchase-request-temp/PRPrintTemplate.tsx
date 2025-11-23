import React from 'react';
import { PRItem, PRFormData } from '../../../types/purchase-request.types';

interface PRPrintTemplateProps {
  formData: PRFormData;
  items: PRItem[];
  total: string;
}

export const PRPrintTemplate: React.FC<PRPrintTemplateProps> = ({ formData, items, total }) => {
  const formatCurrency = (value: string) => {
    return parseFloat(value || '0').toLocaleString('en-PH', { minimumFractionDigits: 2 });
  };

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 15mm 20mm;
          }
          
          * {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          body * {
            visibility: hidden;
          }
          
          #printable-area, #printable-area * {
            visibility: visible;
          }
          
          #printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
          }
          
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div id="printable-area" style={{ display: 'none' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '10px', borderBottom: '3px solid #000' }}>
          <h1 style={{ fontSize: '11pt', fontWeight: 'bold', margin: '3px 0', textTransform: 'uppercase' }}>
            Republic of the Philippines
          </h1>
          <h2 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '5px 0', textTransform: 'uppercase' }}>
            Municipality of Kadingilan
          </h2>
          <h3 style={{ fontSize: '12pt', fontWeight: 'bold', margin: '3px 0' }}>
            Province of Bukidnon
          </h3>
          <h2 style={{ fontSize: '12pt', fontWeight: 'bold', marginTop: '15px' }}>PURCHASE REQUEST</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px', fontSize: '10pt' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <strong style={{ whiteSpace: 'nowrap' }}>Entity Name:</strong>
            <span style={{ borderBottom: '1px solid #000', flex: 1, minHeight: '20px' }}>{formData.department}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <strong style={{ whiteSpace: 'nowrap' }}>PR No.:</strong>
            <span style={{ borderBottom: '1px solid #000', flex: 1, minHeight: '20px' }}>{formData.prNo}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <strong style={{ whiteSpace: 'nowrap' }}>Office/Section:</strong>
            <span style={{ borderBottom: '1px solid #000', flex: 1, minHeight: '20px' }}>{formData.section}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <strong style={{ whiteSpace: 'nowrap' }}>Date:</strong>
            <span style={{ borderBottom: '1px solid #000', flex: 1, minHeight: '20px' }}>
              {new Date(formData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt', marginBottom: '15px', border: '1px solid #000' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', width: '50px' }}>
                Item No.
              </th>
              <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', width: '70px' }}>
                Quantity
              </th>
              <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', width: '80px' }}>
                Unit
              </th>
              <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>
                Description
              </th>
              <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', width: '100px' }}>
                Unit Cost
              </th>
              <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', width: '100px' }}>
                Total Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center', verticalAlign: 'top' }}>
                  {item.itemNo}
                </td>
                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center', verticalAlign: 'top' }}>
                  {item.quantity}
                </td>
                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center', verticalAlign: 'top' }}>
                  {item.unitOfIssue}
                </td>
                <td style={{ border: '1px solid #000', padding: '5px', verticalAlign: 'top' }}>
                  {item.itemDescription}
                </td>
                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', verticalAlign: 'top' }}>
                  ₱{formatCurrency(item.estimatedUnitCost)}
                </td>
                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', verticalAlign: 'top' }}>
                  ₱{formatCurrency(item.estimatedCost)}
                </td>
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
              <td colSpan={5} style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>
                TOTAL AMOUNT:
              </td>
              <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>
                ₱{formatCurrency(total)}
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginBottom: '20px', fontSize: '10pt' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Purpose:</div>
          <div style={{ border: '1px solid #000', padding: '8px', minHeight: '60px' }}>
            {formData.purpose}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '30px', fontSize: '10pt' }}>
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Requested by:</div>
            <div style={{ borderBottom: '1px solid #000', marginTop: '40px', paddingTop: '2px', textAlign: 'center', minHeight: '20px' }}>
              &nbsp;
            </div>
            <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '5px' }}>
              {formData.requestedBy.name}
            </div>
            <div style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '3px' }}>
              {formData.requestedBy.designation}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Approved by:</div>
            <div style={{ borderBottom: '1px solid #000', marginTop: '40px', paddingTop: '2px', textAlign: 'center', minHeight: '20px' }}>
              &nbsp;
            </div>
            <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '5px' }}>
              {formData.approvedBy.name}
            </div>
            <div style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '3px' }}>
              {formData.approvedBy.designation}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
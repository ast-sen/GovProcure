import React from 'react';
import { IARItem, IARFormData } from '../../../types/iar.types';

interface IARPrintTemplateProps {
  formData: IARFormData;
  items: IARItem[];
}

export const IARPrintTemplate: React.FC<IARPrintTemplateProps> = ({ formData, items }) => {
  return (
    <>
      <style>{`
        @media print {
          @page {
            size: legal landscape;
            margin: 0.5in;
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
          }
          
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div 
        id="printable-area" 
        style={{ 
          display: 'none', 
          padding: '15mm', 
          backgroundColor: '#ffffff', 
          width: '355.6mm', 
          minHeight: '215.9mm' 
        }}
      >
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '10px', border: '2px solid #000', padding: '8px' }}>
          <div style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '9pt', fontWeight: 'bold' }}>
            ANNEX G-7
          </div>
          <h1 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '3px 0' }}>
            INSPECTION & ACCEPTANCE REPORT
          </h1>
          <p style={{ fontSize: '10pt', margin: '2px 0' }}>Kadingilan, Bukidnon</p>
          <p style={{ fontSize: '10pt', margin: '2px 0' }}>LGU</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px', marginBottom: '8px', border: '1px solid #000', padding: '5px', fontSize: '8pt' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <strong>Supplier:</strong>
            <span>{formData.supplier}</span>
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <strong>P.R. No:</strong>
            <span>{formData.prNo}</span>
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <strong>P.R. Date:</strong>
            <span>{formData.prDate}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px', marginBottom: '8px', border: '1px solid #000', padding: '5px', fontSize: '8pt' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <strong>P.O. No:</strong>
            <span>{formData.poNo}</span>
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <strong>Date Received:</strong>
            <span>{formData.dateReceived}</span>
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <strong>Date Inspected:</strong>
            <span>{formData.dateInspected}</span>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8pt', marginBottom: '8px', border: '1px solid #000' }}>
          <thead>
            <tr>
              <th style={{ width: '50px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '7pt' }}>
                Item No.
              </th>
              <th style={{ width: '70px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '7pt' }}>
                Unit
              </th>
              <th style={{ width: '80px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '7pt' }}>
                Quantity
              </th>
              <th style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '7pt' }}>
                Description
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
                  {item.unit}
                </td>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                  {item.quantity}
                </td>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'left' }}>
                  {item.description}
                </td>
              </tr>
            ))}
            {Array.from({ length: Math.max(0, 30 - items.length) }).map((_, idx) => (
              <tr key={`empty-${idx}`}>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                  {items.length + idx + 1}
                </td>
                <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
                <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
                <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ border: '1px solid #000', padding: '8px', margin: '8px 0', fontSize: '8pt' }}>
          <div style={{ fontWeight: 'bold', fontSize: '8pt', marginBottom: '3px' }}>INSPECTION</div>
          <p style={{ marginBottom: '10px', fontSize: '8pt' }}>
            Inspected, verified and found OK as to quantity and specifications
          </p>
          <div style={{ borderBottom: '1px solid #000', margin: '25px 0 3px 0', textAlign: 'center' }}>
            {formData.inspectionOfficer}
          </div>
          <div style={{ textAlign: 'center', fontSize: '7pt', marginTop: '2px' }}>
            Inspection Officer
          </div>
        </div>

        <div style={{ border: '1px solid #000', padding: '8px', margin: '8px 0', fontSize: '8pt' }}>
          <div style={{ fontWeight: 'bold', fontSize: '8pt', marginBottom: '3px' }}>ACCEPTANCE</div>
          <div style={{ display: 'flex', gap: '20px', margin: '10px 0', fontSize: '9pt' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '15px', height: '15px', border: '1px solid #000', display: 'inline-block', textAlign: 'center', fontWeight: 'bold' }}>
                {formData.acceptanceComplete ? '✓' : ''}
              </div>
              <span>Complete</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '15px', height: '15px', border: '1px solid #000', display: 'inline-block', textAlign: 'center', fontWeight: 'bold' }}>
                {formData.acceptancePartial ? '✓' : ''}
              </div>
              <span>Partial</span>
            </div>
          </div>
          <div style={{ borderBottom: '1px solid #000', margin: '25px 0 3px 0', textAlign: 'center' }}>
            {formData.propertyOfficer}
          </div>
          <div style={{ textAlign: 'center', fontSize: '7pt', marginTop: '2px' }}>
            Property Officer
          </div>
        </div>
      </div>
    </>
  );
};

import React from 'react';
import { PPMPItem, PPMPFormData } from '../../../types/ppmp.types';
import { MONTHS } from '../../../utils/constants/ppmp.constants';

interface PPMPPrintTemplateProps {
  formData: PPMPFormData;
  items: PPMPItem[];
}

export const PPMPPrintTemplate: React.FC<PPMPPrintTemplateProps> = ({ formData, items }) => {
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
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <h1 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '5px 0' }}>
            PROJECT PROCUREMENT MANAGEMENT PLAN (PPMP)
          </h1>
          <p style={{ fontSize: '10pt', margin: '5px 0' }}>Calendar Year 2025</p>
        </div>

        <div style={{ fontSize: '9pt', marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <div><strong>END USER NAME:</strong> {formData.endUserName}</div>
            <div><strong>OFFICE/AGENCY:</strong> {formData.officeAgency}</div>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7pt', border: '1px solid #000' }}>
          <thead>
            <tr>
              <th rowSpan={3} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>
                General Description
              </th>
              <th rowSpan={3} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>
                Unit
              </th>
              <th rowSpan={3} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>
                Qty/Size
              </th>
              <th rowSpan={3} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>
                Estimated Budget
              </th>
              <th colSpan={24} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>
                Milestone of Activities
              </th>
            </tr>
            <tr>
              {MONTHS.map((month) => (
                <th key={month.key} colSpan={2} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>
                  {month.name}
                </th>
              ))}
            </tr>
            <tr>
              {MONTHS.map((month) => [
                <th key={`${month.key}-qty`} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#dbeafe', fontWeight: 'bold', textAlign: 'center' }}>
                  Qty
                </th>,
                <th key={`${month.key}-amt`} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#dcfce7', fontWeight: 'bold', textAlign: 'center' }}>
                  Amt
                </th>
              ])}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                  {item.generalDescription}
                </td>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                  {item.unit}
                </td>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                  {item.qtySize}
                </td>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                  {item.estimatedBudget}
                </td>
                {MONTHS.map((month) => [
                  <td key={`${item.id}-${month.key}-qty`} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#dbeafe', textAlign: 'center' }}>
                    {item[`${month.key}_qty` as keyof PPMPItem]}
                  </td>,
                  <td key={`${item.id}-${month.key}-amt`} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#dcfce7', textAlign: 'center' }}>
                    {item[`${month.key}_amt` as keyof PPMPItem]}
                  </td>
                ])}
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px', fontSize: '9pt' }}>
          <div style={{ textAlign: 'center', width: '40%' }}>
            <div>Prepared By:</div>
            <div style={{ borderBottom: '1px solid #000', margin: '40px 0 5px 0', minWidth: '200px' }}>
              {formData.preparedBy}
            </div>
          </div>
          <div style={{ textAlign: 'center', width: '40%' }}>
            <div>Approved By:</div>
            <div style={{ borderBottom: '1px solid #000', margin: '40px 0 5px 0', minWidth: '200px' }}>
              {formData.approvedBy}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
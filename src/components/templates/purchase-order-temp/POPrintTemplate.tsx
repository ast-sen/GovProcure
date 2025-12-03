import React from 'react';
import { POItem, POFormData } from '../../../types/purchase-order.types';

interface POPrintTemplateProps {
  formData: POFormData;
  items: POItem[];
  total: string;
}

export const POPrintTemplate: React.FC<POPrintTemplateProps> = ({
  formData,
  items,
  total,
}) => {
  return (
    <div id="printable-area" style={{ display: 'none', padding: '15mm', backgroundColor: '#ffffff', width: '279.4mm', minHeight: '215.9mm' }}>
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '10px', border: '2px solid #000', padding: '8px' }}>
        <div style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '9pt', fontWeight: 'bold' }}>ANNEX G-5</div>
        <h1 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '3px 0' }}>PURCHASE ORDER</h1>
        <p style={{ fontSize: '10pt', margin: '2px 0' }}>Kadingilan</p>
        <p style={{ fontSize: '10pt', margin: '2px 0' }}>LGU</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginBottom: '8px', border: '1px solid #000', padding: '5px', fontSize: '8pt' }}>
        <div>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
            <strong>Supplier Address:</strong>
            <span>{formData.supplierAddress}</span>
          </div>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
            <strong>Place of Delivery:</strong>
            <span>{formData.placeOfDelivery}</span>
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <strong>Delivery Term:</strong>
            <span>{formData.deliveryTerm}</span>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
            <strong>Gentlemen:</strong>
            <span>{formData.gentlemen}</span>
          </div>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
            <strong>Date of Delivery:</strong>
            <span>{formData.dateOfDelivery}</span>
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <strong>Payment Term:</strong>
            <span>{formData.paymentTerm}</span>
          </div>
        </div>
      </div>

      <div style={{ border: '1px solid #000', padding: '5px', margin: '8px 0', fontSize: '8pt' }}>
        <p>Please furnish this office the following articles subject to the terms and conditions contained herein:</p>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt', marginBottom: '8px', border: '1px solid #000' }}>
        <thead>
          <tr>
            <th style={{ width: '40px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '8pt' }}>Item No.</th>
            <th style={{ width: '60px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '8pt' }}>Quantity</th>
            <th style={{ width: '60px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '8pt' }}>Unit</th>
            <th style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '8pt' }}>PARTICULARS</th>
            <th style={{ width: '80px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '8pt' }}>Unit Cost</th>
            <th style={{ width: '90px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '8pt' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.itemNo}</td>
              <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.quantity}</td>
              <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.unit}</td>
              <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'left' }}>{item.particulars}</td>
              <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'right' }}>{item.unitCost}</td>
              <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'right' }}>{item.amount}</td>
            </tr>
          ))}
          {Array.from({ length: Math.max(0, 15 - items.length) }).map((_, idx) => (
            <tr key={`empty-${idx}`}>
              <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{items.length + idx + 1}</td>
              <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
              <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
              <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
              <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
              <td style={{ border: '1px solid #000', padding: '3px' }}>&nbsp;</td>
            </tr>
          ))}
          <tr>
            <td colSpan={5} style={{ border: '1px solid #000', padding: '3px', textAlign: 'right', fontWeight: 'bold' }}>TOTAL:</td>
            <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'right', fontWeight: 'bold' }}>₱ {total}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ border: '1px solid #000', padding: '5px', margin: '5px 0', fontSize: '7pt' }}>
        <p>In case of failure to make the full delivery within the time specified above, a penalty of one-tenth (1/10) of one percent for every day of delay shall be imposed.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px', fontSize: '9pt' }}>
        <div style={{ border: '1px solid #000', padding: '8px', minHeight: '80px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '3px', fontSize: '8pt' }}>Conforme:</div>
          <div style={{ borderBottom: '1px solid #000', margin: '30px 0 3px 0', textAlign: 'center' }}>&nbsp;</div>
          <div style={{ textAlign: 'center', fontSize: '7pt', marginTop: '2px' }}>(Signature Over Printed Name)</div>
          <div style={{ marginTop: '10px', fontSize: '8pt' }}>
            <strong>Date:</strong> {formData.conformeDate}
          </div>
        </div>

        <div style={{ border: '1px solid #000', padding: '8px', minHeight: '80px' }}>
          <div style={{ borderBottom: '1px solid #000', margin: '30px 0 3px 0', textAlign: 'center' }}>&nbsp;</div>
          <div style={{ textAlign: 'center', marginTop: '5px' }}>
            <strong>Municipal Mayor</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
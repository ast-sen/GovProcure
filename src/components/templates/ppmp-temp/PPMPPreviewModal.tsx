import React from 'react';
import { X, Download, Printer } from 'lucide-react';
import { PPMPItem, PPMPFormData } from '../../../types/ppmp.types';
import { MONTHS } from '../../../utils/constants/ppmp.constants';

interface PPMPPreviewModalProps {
  formData: PPMPFormData;
  items: PPMPItem[];
  onClose: () => void;
  onDownloadPDF: () => void;
  onPrint: () => void;
}

export const PPMPPreviewModal: React.FC<PPMPPreviewModalProps> = ({
  formData,
  items,
  onClose,
  onDownloadPDF,
  onPrint
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 no-print">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Preview PPMP (Legal Landscape)</h2>
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
          <div className="bg-white shadow-lg mx-auto" style={{ width: '355.6mm', minHeight: '215.9mm', padding: '15mm' }}>
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

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7pt' }}>
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
        </div>
      </div>
    </div>
  );
};

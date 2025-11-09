import { useState } from 'react';
import { Save, Printer, ArrowLeft } from 'lucide-react';

interface IARItem {
  id: string;
  itemNo: number;
  unit: string;
  quantity: string;
  description: string;
}

interface InspectionAcceptanceReportProps {
  onNavigate?: (nav: string) => void;
}

export const InspectionAcceptanceReport = ({ onNavigate }: InspectionAcceptanceReportProps) => {
  const [formData, setFormData] = useState({
    supplier: '',
    prNo: '',
    prDate: '',
    poNo: '',
    dateReceived: '',
    dateInspected: '',
    inspectionOfficer: '',
    acceptanceComplete: false,
    acceptancePartial: false,
    propertyOfficer: '',
  });

  // Simulated database data - in real app, this would come from your backend/PO
  // All fields are read-only since they come from the Purchase Order
  const items: IARItem[] = [
    {
      id: '1',
      itemNo: 1,
      unit: 'pcs',
      quantity: '10',
      description: 'Bond Paper, A4 size, 80gsm',
    },
    {
      id: '2',
      itemNo: 2,
      unit: 'box',
      quantity: '5',
      description: 'Ballpen, black ink',
    },
    {
      id: '3',
      itemNo: 3,
      unit: 'pcs',
      quantity: '3',
      description: 'Stapler, heavy duty',
    },
  ];

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Items:', items);
    alert('Inspection & Acceptance Report saved successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

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
          
          .print-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 8pt;
          }
          
          .print-table th,
          .print-table td {
            border: 1px solid #000 !important;
            padding: 3px !important;
            text-align: center;
          }
          
          .print-table th {
            background-color: #e5e7eb !important;
            font-weight: bold;
            font-size: 7pt;
          }
          
          .print-header {
            text-align: center;
            margin-bottom: 10px;
            border: 2px solid #000;
            padding: 8px;
            position: relative;
          }
          
          .print-header h1 {
            font-size: 14pt;
            font-weight: bold;
            margin: 3px 0;
          }
          
          .print-header .subtitle {
            font-size: 10pt;
            margin: 2px 0;
          }
          
          .print-header .annex {
            position: absolute;
            top: 8px;
            left: 8px;
            font-size: 9pt;
            font-weight: bold;
          }
          
          .print-info {
            font-size: 8pt;
            margin-bottom: 8px;
          }
          
          .print-info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 5px;
            margin-bottom: 8px;
            border: 1px solid #000;
            padding: 5px;
          }
          
          .print-info-item {
            display: flex;
            gap: 5px;
            font-size: 8pt;
          }
          
          .print-inspection-section {
            border: 1px solid #000;
            padding: 8px;
            margin: 8px 0;
            font-size: 8pt;
          }
          
          .print-checkbox-section {
            display: flex;
            gap: 20px;
            margin: 10px 0;
            font-size: 9pt;
          }
          
          .checkbox-item {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .checkbox {
            width: 15px;
            height: 15px;
            border: 1px solid #000;
            display: inline-block;
          }
          
          .checkbox.checked::after {
            content: '✓';
            display: block;
            text-align: center;
            font-weight: bold;
          }
          
          .print-signatures {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
            font-size: 8pt;
          }
          
          .signature-block {
            border: 1px solid #000;
            padding: 8px;
            min-height: 80px;
          }
          
          .signature-label {
            font-weight: bold;
            margin-bottom: 3px;
            font-size: 8pt;
          }
          
          .signature-line {
            border-bottom: 1px solid #000;
            margin: 25px 0 3px 0;
            text-align: center;
          }
          
          .text-right {
            text-align: right;
          }
          
          .text-left {
            text-align: left;
          }
          
          .text-center {
            text-align: center;
          }
          
          .font-bold {
            font-weight: bold;
          }
        }
      `}</style>

      {/* Screen View */}
      <div className="p-6 no-print bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {onNavigate && (
              <button
                onClick={() => onNavigate('reports')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back </span>
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Inspection & Acceptance Report
              </h1>
              <p className="text-gray-600 mt-1">ANNEX G-7</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Printer size={20} />
              Print
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={20} />
              Save Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow max-w-7xl mx-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Supplier:
                </label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter supplier name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  P.R. No.:
                </label>
                <input
                  type="text"
                  value={formData.prNo}
                  onChange={(e) => setFormData({ ...formData, prNo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="PR-2025-000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  P.R. Date:
                </label>
                <input
                  type="date"
                  value={formData.prDate}
                  onChange={(e) => setFormData({ ...formData, prDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  P.O. No.:
                </label>
                <input
                  type="text"
                  value={formData.poNo}
                  onChange={(e) => setFormData({ ...formData, poNo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="PO-2025-000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date Received:
                </label>
                <input
                  type="date"
                  value={formData.dateReceived}
                  onChange={(e) => setFormData({ ...formData, dateReceived: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date Inspected:
                </label>
                <input
                  type="date"
                  value={formData.dateInspected}
                  onChange={(e) => setFormData({ ...formData, dateInspected: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> All item details are loaded from the Purchase Order and are read-only.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-20">
                      Item<br/>No.
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-24">
                      Unit
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-32">
                      Quantity
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-3 text-center">
                        <span className="text-sm font-medium text-gray-700">{item.itemNo}</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-3 text-center">
                        <span className="text-sm text-gray-700">{item.unit}</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-3 text-center">
                        <span className="text-sm text-gray-700">{item.quantity}</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-3">
                        <span className="text-sm text-gray-700">{item.description}</span>
                      </td>
                    </tr>
                  ))}
                  {/* Empty rows */}
                  {Array.from({ length: Math.max(0, 30 - items.length) }).map((_, idx) => (
                    <tr key={`empty-${idx}`} className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-3 text-center">
                        <span className="text-xs text-gray-400">{items.length + idx + 1}</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-3">&nbsp;</td>
                      <td className="border border-gray-300 px-3 py-3">&nbsp;</td>
                      <td className="border border-gray-300 px-3 py-3">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">INSPECTION</h3>
              <div className="border border-gray-300 rounded-lg p-4 bg-white">
                <p className="text-sm text-gray-700 mb-3">
                  Inspected, verified and found OK as to quantity and specifications
                </p>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    Inspection Officer:
                  </label>
                  <input
                    type="text"
                    value={formData.inspectionOfficer}
                    onChange={(e) => setFormData({ ...formData, inspectionOfficer: e.target.value })}
                    className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter name and position"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">ACCEPTANCE</h3>
              <div className="border border-gray-300 rounded-lg p-4 bg-white">
                <div className="flex gap-8 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptanceComplete}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        acceptanceComplete: e.target.checked,
                        acceptancePartial: !e.target.checked && formData.acceptancePartial
                      })}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Complete</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptancePartial}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        acceptancePartial: e.target.checked,
                        acceptanceComplete: !e.target.checked && formData.acceptanceComplete
                      })}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Partial</span>
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    Property Officer:
                  </label>
                  <input
                    type="text"
                    value={formData.propertyOfficer}
                    onChange={(e) => setFormData({ ...formData, propertyOfficer: e.target.value })}
                    className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter name and position"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print View */}
      <div id="printable-area" style={{ display: 'none' }}>
        <div className="print-header" style={{ position: 'relative' }}>
          <div className="annex">ANNEX G-7</div>
          <h1>INSPECTION & ACCEPTANCE REPORT</h1>
          <p className="subtitle">Kadingilan, Bukidnon</p>
          <p className="subtitle">LGU</p>
        </div>

        <div className="print-info-grid">
          <div className="print-info-item">
            <strong>Supplier:</strong>
            <span>{formData.supplier}</span>
          </div>
          <div className="print-info-item">
            <strong>P.R. No:</strong>
            <span>{formData.prNo}</span>
          </div>
          <div className="print-info-item">
            <strong>P.R. Date:</strong>
            <span>{formData.prDate}</span>
          </div>
        </div>

        <div className="print-info-grid">
          <div className="print-info-item">
            <strong>P.O. No:</strong>
            <span>{formData.poNo}</span>
          </div>
          <div className="print-info-item">
            <strong>Date Received:</strong>
            <span>{formData.dateReceived}</span>
          </div>
          <div className="print-info-item">
            <strong>Date Inspected:</strong>
            <span>{formData.dateInspected}</span>
          </div>
        </div>

        <table className="print-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>Item No.</th>
              <th style={{ width: '70px' }}>Unit</th>
              <th style={{ width: '80px' }}>Quantity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="text-center">{item.itemNo}</td>
                <td className="text-center">{item.unit}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-left">{item.description}</td>
              </tr>
            ))}
            {Array.from({ length: Math.max(0, 30 - items.length) }).map((_, idx) => (
              <tr key={`empty-${idx}`}>
                <td className="text-center">{items.length + idx + 1}</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="print-inspection-section">
          <div className="signature-label">INSPECTION</div>
          <p style={{ marginBottom: '10px', fontSize: '8pt' }}>
            Inspected, verified and found OK as to quantity and specifications
          </p>
          <div className="signature-line">{formData.inspectionOfficer}</div>
          <div className="text-center" style={{ fontSize: '7pt', marginTop: '2px' }}>
            Inspection Officer
          </div>
        </div>

        <div className="print-inspection-section">
          <div className="signature-label">ACCEPTANCE</div>
          <div className="print-checkbox-section">
            <div className="checkbox-item">
              <div className={`checkbox ${formData.acceptanceComplete ? 'checked' : ''}`}></div>
              <span>Complete</span>
            </div>
            <div className="checkbox-item">
              <div className={`checkbox ${formData.acceptancePartial ? 'checked' : ''}`}></div>
              <span>Partial</span>
            </div>
          </div>
          <div className="signature-line">{formData.propertyOfficer}</div>
          <div className="text-center" style={{ fontSize: '7pt', marginTop: '2px' }}>
            Property Officer
          </div>
        </div>
      </div>
    </>
  );
};

export default InspectionAcceptanceReport;
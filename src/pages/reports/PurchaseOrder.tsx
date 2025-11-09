import { useState } from 'react';
import { Save, Printer, ArrowLeft } from 'lucide-react';

interface POItem {
  id: string;
  itemNo: number;
  quantity: number;
  unit: string;
  particulars: string;
  unitCost: string;
  amount: string;
}

interface PurchaseOrderProps {
  onNavigate?: (nav: string) => void;
}

export const PurchaseOrder = ({ onNavigate }: PurchaseOrderProps) => {
  // Simulated database data - in real app, this would come from your backend
  const [items, setItems] = useState<POItem[]>([
    {
      id: '1',
      itemNo: 1,
      quantity: 10,
      unit: 'pcs',
      particulars: 'Bond Paper, A4 size, 80gsm',
      unitCost: '',
      amount: '',
    },
    {
      id: '2',
      itemNo: 2,
      quantity: 5,
      unit: 'box',
      particulars: 'Ballpen, black ink',
      unitCost: '',
      amount: '',
    },
    {
      id: '3',
      itemNo: 3,
      quantity: 3,
      unit: 'pcs',
      particulars: 'Stapler, heavy duty',
      unitCost: '',
      amount: '',
    },
  ]);

  const [formData, setFormData] = useState({
    supplierAddress: '',
    gentlemen: '',
    placeOfDelivery: 'KADINGILAN, BUKIDNON',
    dateOfDelivery: '',
    deliveryTerm: '',
    paymentTerm: '',
    conformeDate: new Date().toISOString().split('T')[0],
  });

  const updateItem = (id: string, field: 'unitCost' | 'amount', value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-calculate amount when unit cost changes
        if (field === 'unitCost') {
          const unitCost = parseFloat(value) || 0;
          updatedItem.amount = (item.quantity * unitCost).toFixed(2);
        }
        
        // Auto-calculate unit cost when amount changes
        if (field === 'amount' && item.quantity > 0) {
          const amount = parseFloat(value) || 0;
          updatedItem.unitCost = (amount / item.quantity).toFixed(2);
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0).toFixed(2);
  };

  const calculatePenalty = () => {
    const total = parseFloat(calculateTotal());
    return (total * 0.001).toFixed(2); // 1/10 of 1% = 0.001
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Items:', items);
    console.log('Total:', calculateTotal());
    alert('Purchase Order saved successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: letter landscape;
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
            font-size: 9pt;
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
            font-size: 8pt;
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
            grid-template-columns: 1fr 1fr;
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
          
          .print-notes {
            border: 1px solid #000;
            padding: 5px;
            margin: 8px 0;
            font-size: 8pt;
          }
          
          .print-signatures {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 15px;
            font-size: 9pt;
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
            margin: 30px 0 3px 0;
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
                <span>Back</span>
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Purchase Order
              </h1>
              <p className="text-gray-600 mt-1">ANNEX G-5</p>
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
              Save Order
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow max-w-7xl mx-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Supplier Address:
                </label>
                <textarea
                  value={formData.supplierAddress}
                  onChange={(e) => setFormData({ ...formData, supplierAddress: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter supplier address"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gentlemen:
                </label>
                <textarea
                  value={formData.gentlemen}
                  onChange={(e) => setFormData({ ...formData, gentlemen: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter message"
                  rows={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Place of Delivery:
                </label>
                <input
                  type="text"
                  value={formData.placeOfDelivery}
                  onChange={(e) => setFormData({ ...formData, placeOfDelivery: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Delivery:
                </label>
                <input
                  type="date"
                  value={formData.dateOfDelivery}
                  onChange={(e) => setFormData({ ...formData, dateOfDelivery: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Term:
                </label>
                <input
                  type="text"
                  value={formData.deliveryTerm}
                  onChange={(e) => setFormData({ ...formData, deliveryTerm: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter delivery term"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Term:
                </label>
                <input
                  type="text"
                  value={formData.paymentTerm}
                  onChange={(e) => setFormData({ ...formData, paymentTerm: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter payment term"
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Items are loaded from the database. Only Unit Cost and Amount fields are editable.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-20">
                      Item No.
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-24">
                      Quantity
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-24">
                      Unit
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center">
                      PARTICULARS
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-40">
                      Unit Cost
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-40">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 text-center bg-gray-50">
                        <span className="text-sm font-medium text-gray-700">{item.itemNo}</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center bg-gray-50">
                        <span className="text-sm text-gray-700">{item.quantity}</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center bg-gray-50">
                        <span className="text-sm text-gray-700">{item.unit}</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 bg-gray-50">
                        <span className="text-sm text-gray-700">{item.particulars}</span>
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          value={item.unitCost}
                          onChange={(e) => updateItem(item.id, 'unitCost', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          value={item.amount}
                          onChange={(e) => updateItem(item.id, 'amount', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </td>
                    </tr>
                  ))}
                  {/* Empty rows to fill space (common in government forms) */}
                  {Array.from({ length: Math.max(0, 15 - items.length) }).map((_, idx) => (
                    <tr key={`empty-${idx}`}>
                      <td className="border border-gray-300 px-3 py-2 text-center bg-gray-50">
                        <span className="text-sm text-gray-400">{items.length + idx + 1}</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 bg-gray-50">&nbsp;</td>
                      <td className="border border-gray-300 px-3 py-2 bg-gray-50">&nbsp;</td>
                      <td className="border border-gray-300 px-3 py-2 bg-gray-50">&nbsp;</td>
                      <td className="border border-gray-300 px-2 py-2">&nbsp;</td>
                      <td className="border border-gray-300 px-2 py-2">&nbsp;</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50">
                    <td colSpan={5} className="border border-gray-300 px-3 py-3 text-right">
                      <span className="text-sm font-bold text-gray-700">TOTAL:</span>
                    </td>
                    <td className="border border-gray-300 px-3 py-3">
                      <span className="text-sm font-bold text-gray-800">₱ {calculateTotal()}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-900">
                <strong>Note:</strong> In case of failure to make the full delivery within the time specified above, 
                a penalty of one-tenth (1/10) of one percent for every day of delay shall be imposed.
              </p>
              <p className="text-sm text-amber-900 mt-2">
                <strong>Calculated Penalty per Day:</strong> ₱ {calculatePenalty()}
              </p>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-2 gap-8">
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Conforme:</h3>
                <div className="space-y-4">
                  <div className="h-16 border-b-2 border-gray-400 flex items-end justify-center pb-1">
                    <span className="text-xs text-gray-500">(Signature Over Printed Name)</span>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Date:</label>
                    <input
                      type="date"
                      value={formData.conformeDate}
                      onChange={(e) => setFormData({ ...formData, conformeDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-4 bg-blue-50">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Approved By:</h3>
                <div className="space-y-2 text-center">
                  <div className="h-16 border-b-2 border-gray-400 flex items-end justify-center pb-1">
                    <span className="text-xs text-gray-500">(Signature)</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm font-medium text-gray-800">Municipal Mayor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print View */}
      <div id="printable-area" style={{ display: 'none' }}>
        <div className="print-header" style={{ position: 'relative' }}>
          <div className="annex">ANNEX G-5</div>
          <h1>PURCHASE ORDER</h1>
          <p className="subtitle">Kadingilan</p>
          <p className="subtitle">LGU</p>
        </div>

        <div className="print-info-grid">
          <div>
            <div className="print-info-item">
              <strong>Supplier Address:</strong>
              <span>{formData.supplierAddress}</span>
            </div>
            <div className="print-info-item" style={{ marginTop: '5px' }}>
              <strong>Place of Delivery:</strong>
              <span>{formData.placeOfDelivery}</span>
            </div>
            <div className="print-info-item" style={{ marginTop: '5px' }}>
              <strong>Delivery Term:</strong>
              <span>{formData.deliveryTerm}</span>
            </div>
          </div>
          <div>
            <div className="print-info-item">
              <strong>Gentlemen:</strong>
              <span>{formData.gentlemen}</span>
            </div>
            <div className="print-info-item" style={{ marginTop: '5px' }}>
              <strong>Date of Delivery:</strong>
              <span>{formData.dateOfDelivery}</span>
            </div>
            <div className="print-info-item" style={{ marginTop: '5px' }}>
              <strong>Payment Term:</strong>
              <span>{formData.paymentTerm}</span>
            </div>
          </div>
        </div>

        <div className="print-notes">
          <p>Please furnish this office the following articles subject to the terms and conditions contained herein:</p>
        </div>

        <table className="print-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>Item No.</th>
              <th style={{ width: '60px' }}>Quantity</th>
              <th style={{ width: '60px' }}>Unit</th>
              <th>PARTICULARS</th>
              <th style={{ width: '80px' }}>Unit Cost</th>
              <th style={{ width: '90px' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="text-center">{item.itemNo}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-center">{item.unit}</td>
                <td className="text-left">{item.particulars}</td>
                <td className="text-right">{item.unitCost}</td>
                <td className="text-right">{item.amount}</td>
              </tr>
            ))}
            {Array.from({ length: Math.max(0, 15 - items.length) }).map((_, idx) => (
              <tr key={`empty-${idx}`}>
                <td className="text-center">{items.length + idx + 1}</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} className="text-right font-bold">TOTAL:</td>
              <td className="text-right font-bold">₱ {calculateTotal()}</td>
            </tr>
          </tbody>
        </table>

        <div className="print-notes" style={{ fontSize: '7pt', marginTop: '5px' }}>
          <p>In case of failure to make the full delivery within the time specified above, a penalty of one-tenth (1/10) of one percent for every day of delay shall be imposed.</p>
        </div>

        <div className="print-signatures">
          <div className="signature-block">
            <div className="signature-label">Conforme:</div>
            <div className="signature-line">\u00A0</div>
            <div className="text-center" style={{ fontSize: '7pt', marginTop: '2px' }}>
              (Signature Over Printed Name)
            </div>
            <div style={{ marginTop: '10px', fontSize: '8pt' }}>
              <strong>Date:</strong> {formData.conformeDate}
            </div>
          </div>

          <div className="signature-block">
            <div className="signature-line">\u00A0</div>
            <div className="text-center" style={{ marginTop: '5px' }}>
              <strong>Municipal Mayor</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseOrder;
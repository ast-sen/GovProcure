import { useState } from 'react';
import { Save, Printer, ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface PRItem {
  id: string;
  itemNo: number;
  quantity: string;
  unitOfIssue: string;
  itemDescription: string;
  estimatedUnitCost: string;
  estimatedCost: string;
}

interface PurchaseRequestProps {
  onNavigate?: (nav: string) => void;
}

export const PurchaseRequest = ({ onNavigate }: PurchaseRequestProps) => {
  const [formData, setFormData] = useState({
    department: '',
    prNo: '',
    date: new Date().toISOString().split('T')[0],
    purpose: '',
    signature: '',
    printedName: '',
    designation: '',
  });

  const [items, setItems] = useState<PRItem[]>([
    {
      id: '1',
      itemNo: 1,
      quantity: '',
      unitOfIssue: '',
      itemDescription: '',
      estimatedUnitCost: '',
      estimatedCost: '',
    }
  ]);

  const addNewItem = () => {
    const newItem: PRItem = {
      id: Date.now().toString(),
      itemNo: items.length + 1,
      quantity: '',
      unitOfIssue: '',
      itemDescription: '',
      estimatedUnitCost: '',
      estimatedCost: '',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      const updatedItems = items.filter(item => item.id !== id);
      // Renumber items
      const renumberedItems = updatedItems.map((item, index) => ({
        ...item,
        itemNo: index + 1
      }));
      setItems(renumberedItems);
    }
  };

  const updateItem = (id: string, field: keyof PRItem, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-calculate estimated cost when quantity or unit cost changes
        if (field === 'quantity' || field === 'estimatedUnitCost') {
          const qty = parseFloat(field === 'quantity' ? value : updatedItem.quantity) || 0;
          const unitCost = parseFloat(field === 'estimatedUnitCost' ? value : updatedItem.estimatedUnitCost) || 0;
          updatedItem.estimatedCost = (qty * unitCost).toFixed(2);
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      return sum + (parseFloat(item.estimatedCost) || 0);
    }, 0).toFixed(2);
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Items:', items);
    console.log('Total:', calculateTotal());
    alert('Purchase Request saved successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: letter portrait;
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
            font-size: 10pt;
          }
          
          .print-table th,
          .print-table td {
            border: 1px solid #000 !important;
            padding: 4px !important;
            text-align: left;
          }
          
          .print-table th {
            background-color: #e5e7eb !important;
            font-weight: bold;
            text-align: center;
          }
          
          .print-header {
            text-align: center;
            margin-bottom: 15px;
            border: 2px solid #000;
            padding: 10px;
          }
          
          .print-header h1 {
            font-size: 16pt;
            font-weight: bold;
            margin: 5px 0;
            color: #1e40af;
          }
          
          .print-header .subtitle {
            font-size: 11pt;
            margin: 2px 0;
          }
          
          .print-header .annex {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 10pt;
            font-weight: bold;
            color: #1e40af;
          }
          
          .print-info {
            font-size: 10pt;
            margin-bottom: 10px;
          }
          
          .print-info-grid {
            display: grid;
            grid-template-columns: 1fr auto auto;
            gap: 10px;
            margin-bottom: 10px;
            border: 1px solid #000;
            padding: 8px;
          }
          
          .print-info-item {
            display: flex;
            gap: 5px;
          }
          
          .print-purpose {
            border: 1px solid #000;
            padding: 8px;
            margin-bottom: 10px;
            min-height: 60px;
          }
          
          .print-signatures {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 20px;
            font-size: 10pt;
          }
          
          .signature-block {
            border: 1px solid #000;
            padding: 10px;
            min-height: 100px;
          }
          
          .signature-label {
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .signature-line {
            border-bottom: 1px solid #000;
            margin: 40px 0 5px 0;
            text-align: center;
          }
          
          .designation-line {
            border-bottom: 1px solid #000;
            margin: 20px 0 5px 0;
            text-align: center;
            font-style: italic;
          }
          
          .text-right {
            text-align: right;
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
                onClick={() => onNavigate('bac-menu')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to BAC Menu</span>
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Purchase Request
              </h1>
              <p className="text-gray-600 mt-1">ANNEX G-6</p>
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
              Save Request
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow max-w-7xl mx-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department:
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter department name"
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
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date:
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-20">
                    Item<br/>No.
                  </th>
                  <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-24">
                    Quantity
                  </th>
                  <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-32">
                    Unit of Issue
                  </th>
                  <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center">
                    Item Description
                  </th>
                  <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-40">
                    Estimated<br/>Unit Cost
                  </th>
                  <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-40">
                    Estimated<br/>Cost
                  </th>
                  <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-20 no-print">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      <span className="text-sm font-medium text-gray-700">{item.itemNo}</span>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                        placeholder="0"
                        step="1"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={item.unitOfIssue}
                        onChange={(e) => updateItem(item.id, 'unitOfIssue', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                        placeholder="pcs, box, etc."
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        value={item.itemDescription}
                        onChange={(e) => updateItem(item.id, 'itemDescription', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter item description"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        value={item.estimatedUnitCost}
                        onChange={(e) => updateItem(item.id, 'estimatedUnitCost', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        value={item.estimatedCost}
                        onChange={(e) => updateItem(item.id, 'estimatedCost', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 bg-gray-50"
                        placeholder="0.00"
                        step="0.01"
                        readOnly
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center no-print">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        disabled={items.length === 1}
                        title="Delete item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-50">
                  <td colSpan={5} className="border border-gray-300 px-3 py-3 text-right">
                    <span className="text-sm font-bold text-gray-700">TOTAL:</span>
                  </td>
                  <td className="border border-gray-300 px-3 py-3">
                    <span className="text-sm font-bold text-gray-800">₱ {calculateTotal()}</span>
                  </td>
                  <td className="border border-gray-300 no-print"></td>
                </tr>
              </tbody>
            </table>

            <button
              type="button"
              onClick={addNewItem}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={20} />
              Add New Item
            </button>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Purpose:
              </label>
              <textarea
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter the purpose of this purchase request"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Requested By:</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Signature:</label>
                    <input
                      type="text"
                      value={formData.signature}
                      onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="(Leave blank for manual signature)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Printed Name:</label>
                    <input
                      type="text"
                      value={formData.printedName}
                      onChange={(e) => setFormData({ ...formData, printedName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Designation:</label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Enter position/designation"
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
                    <p className="text-xs text-gray-600 italic">(Designation)</p>
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
          <div className="annex">ANNEX G-6</div>
          <h1>PURCHASE REQUEST</h1>
          <p className="subtitle"><em>KADINGILAN, BUKIDNON</em></p>
          <p className="subtitle"><strong>LGU</strong></p>
        </div>

        <div className="print-info-grid">
          <div className="print-info-item">
            <strong>Department:</strong>
            <span>{formData.department}</span>
          </div>
          <div className="print-info-item">
            <strong>P.R. No.</strong>
            <span>{formData.prNo}</span>
          </div>
          <div className="print-info-item">
            <strong>Date:</strong>
            <span>{formData.date}</span>
          </div>
        </div>

        <table className="print-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>Item<br/>No.</th>
              <th style={{ width: '70px' }}>Quantity</th>
              <th style={{ width: '90px' }}>Unit of Issue</th>
              <th>Item Description</th>
              <th style={{ width: '100px' }}>Estimated<br/>Unit Cost</th>
              <th style={{ width: '100px' }}>Estimated<br/>Cost</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="text-center">{item.itemNo}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-center">{item.unitOfIssue}</td>
                <td>{item.itemDescription}</td>
                <td className="text-right">{item.estimatedUnitCost}</td>
                <td className="text-right">{item.estimatedCost}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} className="text-right font-bold">total:</td>
              <td className="text-right font-bold">₱ {calculateTotal()}</td>
            </tr>
          </tbody>
        </table>

        <div className="print-purpose">
          <div className="font-bold" style={{ marginBottom: '5px' }}>Purpose:</div>
          <div>{formData.purpose}</div>
        </div>

        <div className="print-signatures">
          <div className="signature-block">
            <div className="signature-label">Signature:</div>
            <div className="signature-line">{formData.signature || '\u00A0'}</div>
            <div className="signature-label" style={{ marginTop: '10px' }}>Printed Name:</div>
            <div className="signature-line">{formData.printedName}</div>
            <div className="signature-label" style={{ marginTop: '10px' }}>Designation:</div>
            <div className="designation-line">{formData.designation}</div>
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

export default PurchaseRequest;
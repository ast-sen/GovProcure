import { useState } from 'react';
import { Save, Printer, ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface PPMPItem {
  id: string;
  generalDescription: string;
  unit: string;
  qtySize: string;
  estimatedBudget: string;
  jan_qty: string;
  jan_amt: string;
  feb_qty: string;
  feb_amt: string;
  mar_qty: string;
  mar_amt: string;
  apr_qty: string;
  apr_amt: string;
  may_qty: string;
  may_amt: string;
  jun_qty: string;
  jun_amt: string;
  jul_qty: string;
  jul_amt: string;
  aug_qty: string;
  aug_amt: string;
  sep_qty: string;
  sep_amt: string;
  oct_qty: string;
  oct_amt: string;
  nov_qty: string;
  nov_amt: string;
  dec_qty: string;
  dec_amt: string;
}

interface PPMPProps {
  onNavigate?: (nav: string) => void;
}

export const Procurement = ({ onNavigate }: PPMPProps) => {
  const [formData, setFormData] = useState({
    endUserName: '',
    officeAgency: '',
    preparedBy: '',
    approvedBy: '',
  });

  const [items, setItems] = useState<PPMPItem[]>([
    {
      id: '1',
      generalDescription: '',
      unit: '',
      qtySize: '',
      estimatedBudget: '',
      jan_qty: '', jan_amt: '',
      feb_qty: '', feb_amt: '',
      mar_qty: '', mar_amt: '',
      apr_qty: '', apr_amt: '',
      may_qty: '', may_amt: '',
      jun_qty: '', jun_amt: '',
      jul_qty: '', jul_amt: '',
      aug_qty: '', aug_amt: '',
      sep_qty: '', sep_amt: '',
      oct_qty: '', oct_amt: '',
      nov_qty: '', nov_amt: '',
      dec_qty: '', dec_amt: '',
    }
  ]);

  const months = [
    { name: 'JAN', key: 'jan' },
    { name: 'FEB', key: 'feb' },
    { name: 'MAR', key: 'mar' },
    { name: 'APR', key: 'apr' },
    { name: 'MAY', key: 'may' },
    { name: 'JUN', key: 'jun' },
    { name: 'JUL', key: 'jul' },
    { name: 'AUG', key: 'aug' },
    { name: 'SEP', key: 'sep' },
    { name: 'OCT', key: 'oct' },
    { name: 'NOV', key: 'nov' },
    { name: 'DEC', key: 'dec' }
  ];

  const addNewItem = () => {
    const newItem: PPMPItem = {
      id: Date.now().toString(),
      generalDescription: '',
      unit: '',
      qtySize: '',
      estimatedBudget: '',
      jan_qty: '', jan_amt: '',
      feb_qty: '', feb_amt: '',
      mar_qty: '', mar_amt: '',
      apr_qty: '', apr_amt: '',
      may_qty: '', may_amt: '',
      jun_qty: '', jun_amt: '',
      jul_qty: '', jul_amt: '',
      aug_qty: '', aug_amt: '',
      sep_qty: '', sep_amt: '',
      oct_qty: '', oct_amt: '',
      nov_qty: '', nov_amt: '',
      dec_qty: '', dec_amt: '',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof PPMPItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Items:', items);
    alert('PPMP saved successfully!');
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
            font-size: 7pt;
          }
          
          .print-table th,
          .print-table td {
            border: 1px solid #000 !important;
            padding: 3px !important;
            text-align: center;
            font-size: 7pt;
          }
          
          .print-table th {
            background-color: #e5e7eb !important;
            font-weight: bold;
          }
          
          .bg-blue-50 {
            background-color: #dbeafe !important;
          }
          
          .bg-green-50 {
            background-color: #dcfce7 !important;
          }
          
          .print-header {
            text-align: center;
            margin-bottom: 15px;
          }
          
          .print-header h1 {
            font-size: 14pt;
            font-weight: bold;
            margin: 5px 0;
          }
          
          .print-info {
            font-size: 9pt;
            margin-bottom: 10px;
          }
          
          .print-info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          }
          
          .print-signatures {
            display: flex;
            justify-content: space-around;
            margin-top: 30px;
            font-size: 9pt;
          }
          
          .signature-block {
            text-align: center;
            width: 40%;
          }
          
          .signature-line {
            border-bottom: 1px solid #000;
            margin: 40px 0 5px 0;
            min-width: 200px;
          }
        }
      `}</style>

      {/* Screen View */}
      <div className="p-6 no-print">
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
                Project Procurement Management Plan (PPMP)
              </h1>
              <p className="text-gray-600 mt-1">Calendar Year 2025</p>
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
              Save PPMP
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  END USER NAME:
                </label>
                <input
                  type="text"
                  value={formData.endUserName}
                  onChange={(e) => setFormData({ ...formData, endUserName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter end user name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  OFFICE/AGENCY:
                </label>
                <input
                  type="text"
                  value={formData.officeAgency}
                  onChange={(e) => setFormData({ ...formData, officeAgency: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter office/agency"
                />
              </div>
            </div>
          </div>

          <div className="p-6 overflow-x-auto">
            <div className="min-w-max">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-3 text-xs font-semibold text-gray-700 text-center" rowSpan={3}>
                      General<br/>Description
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-xs font-semibold text-gray-700 text-center" rowSpan={3}>
                      Unit
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-xs font-semibold text-gray-700 text-center" rowSpan={3}>
                      Qty/Size
                    </th>
                    <th className="border border-gray-300 px-3 py-3 text-xs font-semibold text-gray-700 text-center" rowSpan={3}>
                      Estimated<br/>Budget
                    </th>
                    <th className="border border-gray-300 px-2 py-3 text-xs font-semibold text-gray-700 text-center" colSpan={24}>
                      Milestone of Activities
                    </th>
                    <th className="border border-gray-300 px-2 py-3 text-xs font-semibold text-gray-700 text-center" rowSpan={3}>
                      Actions
                    </th>
                  </tr>
                  <tr className="bg-gray-100">
                    {months.map((month) => (
                      <th key={month.key} className="border border-gray-300 px-2 py-2 text-xs font-semibold text-gray-700" colSpan={2}>
                        {month.name}
                      </th>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    {months.map((month) => [
                      <th key={`${month.key}-qty-label`} className="border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-700 bg-blue-50">
                        Qty
                      </th>,
                      <th key={`${month.key}-amt-label`} className="border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-700 bg-green-50">
                        Amt
                      </th>
                    ])}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={item.generalDescription}
                          onChange={(e) => updateItem(item.id, 'generalDescription', e.target.value)}
                          className="w-48 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                          placeholder="Item description"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                          className="w-20 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                          placeholder="pcs"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={item.qtySize}
                          onChange={(e) => updateItem(item.id, 'qtySize', e.target.value)}
                          className="w-24 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          value={item.estimatedBudget}
                          onChange={(e) => updateItem(item.id, 'estimatedBudget', e.target.value)}
                          className="w-32 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                          placeholder="0.00"
                          step="0.01"
                        />
                      </td>
                      
                      {months.map((month) => [
                        <td key={`${item.id}-${month.key}-qty`} className="border border-gray-300 px-1 py-2 bg-blue-50">
                          <input
                            type="number"
                            value={item[`${month.key}_qty` as keyof PPMPItem] as string}
                            onChange={(e) => updateItem(item.id, `${month.key}_qty` as keyof PPMPItem, e.target.value)}
                            className="w-16 px-1 py-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                            placeholder="0"
                          />
                        </td>,
                        <td key={`${item.id}-${month.key}-amt`} className="border border-gray-300 px-1 py-2 bg-green-50">
                          <input
                            type="number"
                            value={item[`${month.key}_amt` as keyof PPMPItem] as string}
                            onChange={(e) => updateItem(item.id, `${month.key}_amt` as keyof PPMPItem, e.target.value)}
                            className="w-20 px-1 py-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                            placeholder="0.00"
                            step="0.01"
                          />
                        </td>
                      ])}

                      <td className="border border-gray-300 px-2 py-2 text-center">
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
                </tbody>
              </table>
            </div>

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
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prepared By:
                </label>
                <input
                  type="text"
                  value={formData.preparedBy}
                  onChange={(e) => setFormData({ ...formData, preparedBy: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Name and position"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Approved By:
                </label>
                <input
                  type="text"
                  value={formData.approvedBy}
                  onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Municipal Mayor"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Print View */}
      <div id="printable-area" style={{ display: 'none' }}>
        <div className="print-header">
          <h1>PROJECT PROCUREMENT MANAGEMENT PLAN (PPMP)</h1>
          <p>Calendar Year 2025</p>
        </div>

        <div className="print-info">
          <div className="print-info-row">
            <div><strong>END USER NAME:</strong> {formData.endUserName}</div>
            <div><strong>OFFICE/AGENCY:</strong> {formData.officeAgency}</div>
          </div>
        </div>

        <table className="print-table">
          <thead>
            <tr>
              <th rowSpan={3}>General Description</th>
              <th rowSpan={3}>Unit</th>
              <th rowSpan={3}>Qty/Size</th>
              <th rowSpan={3}>Estimated Budget</th>
              <th colSpan={24}>Milestone of Activities</th>
            </tr>
            <tr>
              {months.map((month) => (
                <th key={month.key} colSpan={2}>{month.name}</th>
              ))}
            </tr>
            <tr>
              {months.map((month) => [
                <th key={`${month.key}-qty`} className="bg-blue-50">Qty</th>,
                <th key={`${month.key}-amt`} className="bg-green-50">Amt</th>
              ])}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.generalDescription}</td>
                <td>{item.unit}</td>
                <td>{item.qtySize}</td>
                <td>{item.estimatedBudget}</td>
                {months.map((month) => [
                  <td key={`${item.id}-${month.key}-qty`} className="bg-blue-50">
                    {item[`${month.key}_qty` as keyof PPMPItem]}
                  </td>,
                  <td key={`${item.id}-${month.key}-amt`} className="bg-green-50">
                    {item[`${month.key}_amt` as keyof PPMPItem]}
                  </td>
                ])}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="print-signatures">
          <div className="signature-block">
            <div>Prepared By:</div>
            <div className="signature-line">{formData.preparedBy}</div>
          </div>
          <div className="signature-block">
            <div>Approved By:</div>
            <div className="signature-line">{formData.approvedBy}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Procurement;
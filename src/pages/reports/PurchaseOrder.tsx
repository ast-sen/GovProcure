import { useState } from 'react';
import { Save, Printer, ArrowLeft, Download, Eye, X } from 'lucide-react';

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
  const [showPreview, setShowPreview] = useState(false);
  
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

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  };

  const updateItem = (id: string, field: 'unitCost' | 'amount', value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        if (field === 'unitCost') {
          const unitCost = parseFloat(value) || 0;
          updatedItem.amount = (item.quantity * unitCost).toFixed(2);
        }
        
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
    return (total * 0.001).toFixed(2);
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

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = async () => {
    try {
      const downloadBtn = document.getElementById('download-btn');
      if (downloadBtn) {
        downloadBtn.innerHTML = '<span>Loading libraries...</span>';
      }

      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      await new Promise(resolve => setTimeout(resolve, 100));
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      await new Promise(resolve => setTimeout(resolve, 100));

      const html2canvas = (window as any).html2canvas;
      const jsPDFLib = (window as any).jspdf;

      if (!html2canvas || !jsPDFLib || !jsPDFLib.jsPDF) {
        throw new Error('Libraries failed to load');
      }

      const { jsPDF } = jsPDFLib;

      const element = document.getElementById('printable-area');
      if (!element) {
        alert('Print area not found');
        if (downloadBtn) {
          downloadBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg><span>PDF</span>';
        }
        return;
      }

      if (downloadBtn) {
        downloadBtn.innerHTML = '<span>Generating PDF...</span>';
      }

      const originalDisplay = element.style.display;
      element.style.display = 'block';
      element.style.position = 'absolute';
      element.style.left = '-9999px';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      element.style.display = originalDisplay;
      element.style.position = '';
      element.style.left = '';

      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'letter'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const margin = 10;
      const availableWidth = pdfWidth - (2 * margin);
      const availableHeight = pdfHeight - (2 * margin);
      
      const widthRatio = availableWidth / imgWidth;
      const scaledHeight = imgHeight * widthRatio;
      
      if (scaledHeight <= availableHeight) {
        pdf.addImage(imgData, 'PNG', margin, margin, availableWidth, scaledHeight);
      } else {
        let remainingHeight = scaledHeight;
        let sourceY = 0;
        let pageNumber = 0;
        
        while (remainingHeight > 0) {
          if (pageNumber > 0) {
            pdf.addPage();
          }
          
          const heightForThisPage = Math.min(availableHeight, remainingHeight);
          const sourceHeight = heightForThisPage / widthRatio;
          
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvas.width;
          pageCanvas.height = sourceHeight;
          const pageCtx = pageCanvas.getContext('2d');
          
          if (pageCtx) {
            pageCtx.drawImage(
              canvas,
              0, sourceY,
              canvas.width, sourceHeight,
              0, 0,
              canvas.width, sourceHeight
            );
            
            const pageImgData = pageCanvas.toDataURL('image/png');
            pdf.addImage(pageImgData, 'PNG', margin, margin, availableWidth, heightForThisPage);
          }
          
          sourceY += sourceHeight;
          remainingHeight -= heightForThisPage;
          pageNumber++;
        }
      }
      
      const pdfBlob = pdf.output('blob');
      const defaultFilename = `PO-${new Date().toISOString().split('T')[0]}.pdf`;

      if ('showSaveFilePicker' in window) {
        try {
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: defaultFilename,
            types: [{
              description: 'PDF Files',
              accept: { 'application/pdf': ['.pdf'] }
            }]
          });

          const writable = await handle.createWritable();
          await writable.write(pdfBlob);
          await writable.close();
          
          if (downloadBtn) {
            downloadBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg><span>PDF</span>';
          }

          alert('PDF saved successfully!');
        } catch (err: any) {
          if (err.name === 'AbortError') {
            if (downloadBtn) {
              downloadBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg><span>PDF</span>';
            }
          } else {
            throw err;
          }
        }
      } else {
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = defaultFilename;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 100);
        
        if (downloadBtn) {
          downloadBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg><span>PDF</span>';
        }

        alert('PDF generated successfully!');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      const downloadBtn = document.getElementById('download-btn');
      if (downloadBtn) {
        downloadBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg><span>PDF</span>';
      }
    }
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
              onClick={handlePreview}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Eye size={20} />
              Preview
            </button>
            <button
              id="download-btn"
              type="button"
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={20} />
              PDF
            </button>
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

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Preview Purchase Order (Letter Landscape)</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download size={18} />
                  Download PDF
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Printer size={18} />
                  Print
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <X size={18} />
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6 bg-gray-100">
              <div className="bg-white shadow-lg mx-auto" style={{ width: '279.4mm', minHeight: '215.9mm', padding: '15mm' }}>
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

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt', marginBottom: '8px' }}>
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
                      <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'right', fontWeight: 'bold' }}>₱ {calculateTotal()}</td>
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
            </div>
          </div>
        </div>
      )}

      {/* Print View */}
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
              <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'right', fontWeight: 'bold' }}>₱ {calculateTotal()}</td>
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
    </>
  );
};

export default PurchaseOrder;
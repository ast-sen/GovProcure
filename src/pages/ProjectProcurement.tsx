import { useState } from 'react';
import { Save, Printer, ArrowLeft, Plus, Trash2, Download, Eye, X } from 'lucide-react';

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
  const [showPreview, setShowPreview] = useState(false);
  
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
      script.onload = () => {
        console.log(`Loaded: ${src}`);
        resolve();
      };
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  };

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
        format: 'legal'
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
      const defaultFilename = `PPMP-${new Date().toISOString().split('T')[0]}.pdf`;

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

      {/* Screen View */}
      <div className="p-6 no-print bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {onNavigate && (
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
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
                    <th className="border border-gray-300 px-2 py-3 text-xs font-semibold text-gray-700 text-center no-print" rowSpan={3}>
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

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Preview PPMP (Legal Landscape)</h2>
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
              <div className="bg-white shadow-lg mx-auto" style={{ width: '355.6mm', minHeight: '215.9mm', padding: '15mm' }}>
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                  <h1 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '5px 0' }}>PROJECT PROCUREMENT MANAGEMENT PLAN (PPMP)</h1>
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
                      <th rowSpan={3} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>General Description</th>
                      <th rowSpan={3} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>Unit</th>
                      <th rowSpan={3} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>Qty/Size</th>
                      <th rowSpan={3} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>Estimated Budget</th>
                      <th colSpan={24} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>Milestone of Activities</th>
                    </tr>
                    <tr>
                      {months.map((month) => (
                        <th key={month.key} colSpan={2} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>{month.name}</th>
                      ))}
                    </tr>
                    <tr>
                      {months.map((month) => [
                        <th key={`${month.key}-qty`} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#dbeafe', fontWeight: 'bold', textAlign: 'center' }}>Qty</th>,
                        <th key={`${month.key}-amt`} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#dcfce7', fontWeight: 'bold', textAlign: 'center' }}>Amt</th>
                      ])}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.generalDescription}</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.unit}</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.qtySize}</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.estimatedBudget}</td>
                        {months.map((month) => [
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
                    <div style={{ borderBottom: '1px solid #000', margin: '40px 0 5px 0', minWidth: '200px' }}>{formData.preparedBy}</div>
                  </div>
                  <div style={{ textAlign: 'center', width: '40%' }}>
                    <div>Approved By:</div>
                    <div style={{ borderBottom: '1px solid #000', margin: '40px 0 5px 0', minWidth: '200px' }}>{formData.approvedBy}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print View */}
      <div id="printable-area" style={{ display: 'none', padding: '15mm', backgroundColor: '#ffffff', width: '355.6mm', minHeight: '215.9mm' }}>
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <h1 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '5px 0' }}>PROJECT PROCUREMENT MANAGEMENT PLAN (PPMP)</h1>
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
              <th rowSpan={3} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>General Description</th>
              <th rowSpan={3} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>Unit</th>
              <th rowSpan={3} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>Qty/Size</th>
              <th rowSpan={3} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>Estimated Budget</th>
              <th colSpan={24} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>Milestone of Activities</th>
            </tr>
            <tr>
              {months.map((month) => (
                <th key={month.key} colSpan={2} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center' }}>{month.name}</th>
              ))}
            </tr>
            <tr>
              {months.map((month) => [
                <th key={`${month.key}-qty`} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#dbeafe', fontWeight: 'bold', textAlign: 'center' }}>Qty</th>,
                <th key={`${month.key}-amt`} style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#dcfce7', fontWeight: 'bold', textAlign: 'center' }}>Amt</th>
              ])}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.generalDescription}</td>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.unit}</td>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.qtySize}</td>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.estimatedBudget}</td>
                {months.map((month) => [
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
            <div style={{ borderBottom: '1px solid #000', margin: '40px 0 5px 0', minWidth: '200px' }}>{formData.preparedBy}</div>
          </div>
          <div style={{ textAlign: 'center', width: '40%' }}>
            <div>Approved By:</div>
            <div style={{ borderBottom: '1px solid #000', margin: '40px 0 5px 0', minWidth: '200px' }}>{formData.approvedBy}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Procurement;
import { useState } from 'react';
import { Save, Printer, ArrowLeft, Download, Eye, X } from 'lucide-react';

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
  const [showPreview, setShowPreview] = useState(false);
  
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

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    console.log('Items:', items);
    alert('Inspection & Acceptance Report saved successfully!');
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
      const defaultFilename = `IAR-${formData.poNo || 'draft'}-${new Date().toISOString().split('T')[0]}.pdf`;

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
                onClick={() => onNavigate('reports')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
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

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Preview IAR (Legal Landscape)</h2>
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
                <div style={{ position: 'relative', textAlign: 'center', marginBottom: '10px', border: '2px solid #000', padding: '8px' }}>
                  <div style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '9pt', fontWeight: 'bold' }}>ANNEX G-7</div>
                  <h1 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '3px 0' }}>INSPECTION & ACCEPTANCE REPORT</h1>
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

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8pt', marginBottom: '8px' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '50px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '7pt' }}>Item No.</th>
                      <th style={{ width: '70px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '7pt' }}>Unit</th>
                      <th style={{ width: '80px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '7pt' }}>Quantity</th>
                      <th style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '7pt' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.itemNo}</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.unit}</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.quantity}</td>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'left' }}>{item.description}</td>
                      </tr>
                    ))}
                    {Array.from({ length: Math.max(0, 30 - items.length) }).map((_, idx) => (
                      <tr key={`empty-${idx}`}>
                        <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{items.length + idx + 1}</td>
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
                  <div style={{ borderBottom: '1px solid #000', margin: '25px 0 3px 0', textAlign: 'center' }}>{formData.inspectionOfficer}</div>
                  <div style={{ textAlign: 'center', fontSize: '7pt', marginTop: '2px' }}>Inspection Officer</div>
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
                  <div style={{ borderBottom: '1px solid #000', margin: '25px 0 3px 0', textAlign: 'center' }}>{formData.propertyOfficer}</div>
                  <div style={{ textAlign: 'center', fontSize: '7pt', marginTop: '2px' }}>Property Officer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print View */}
      <div id="printable-area" style={{ display: 'none', padding: '15mm', backgroundColor: '#ffffff', width: '355.6mm', minHeight: '215.9mm' }}>
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '10px', border: '2px solid #000', padding: '8px' }}>
          <div style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '9pt', fontWeight: 'bold' }}>ANNEX G-7</div>
          <h1 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '3px 0' }}>INSPECTION & ACCEPTANCE REPORT</h1>
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
              <th style={{ width: '50px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '7pt' }}>Item No.</th>
              <th style={{ width: '70px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '7pt' }}>Unit</th>
              <th style={{ width: '80px', border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '7pt' }}>Quantity</th>
              <th style={{ border: '1px solid #000', padding: '3px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '7pt' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.itemNo}</td>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.unit}</td>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{item.quantity}</td>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'left' }}>{item.description}</td>
              </tr>
            ))}
            {Array.from({ length: Math.max(0, 30 - items.length) }).map((_, idx) => (
              <tr key={`empty-${idx}`}>
                <td style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>{items.length + idx + 1}</td>
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
          <div style={{ borderBottom: '1px solid #000', margin: '25px 0 3px 0', textAlign: 'center' }}>{formData.inspectionOfficer}</div>
          <div style={{ textAlign: 'center', fontSize: '7pt', marginTop: '2px' }}>Inspection Officer</div>
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
          <div style={{ borderBottom: '1px solid #000', margin: '25px 0 3px 0', textAlign: 'center' }}>{formData.propertyOfficer}</div>
          <div style={{ textAlign: 'center', fontSize: '7pt', marginTop: '2px' }}>Property Officer</div>
        </div>
      </div>
    </>
  );
};

export default InspectionAcceptanceReport;
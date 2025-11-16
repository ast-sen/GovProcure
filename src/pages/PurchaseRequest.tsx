import { useState } from 'react';
import { Save, Printer, ArrowLeft, Plus, Trash2, Download, Eye, X } from 'lucide-react';

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
  const [showPreview, setShowPreview] = useState(false);
  
  const [formData, setFormData] = useState({
    department: '',
    section: '',
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

  const handleDownloadPDF = async () => {
    try {
      const downloadBtn = document.getElementById('download-btn');
      if (downloadBtn) {
        downloadBtn.innerHTML = '<span>Loading libraries...</span>';
      }

      // Load libraries sequentially
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      
      // Wait a bit for html2canvas to be available
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      
      // Wait a bit for jsPDF to be available
      await new Promise(resolve => setTimeout(resolve, 100));

      // Access from window object
      const html2canvas = (window as any).html2canvas;
      const jsPDFLib = (window as any).jspdf;

      console.log('html2canvas:', html2canvas);
      console.log('jsPDFLib:', jsPDFLib);

      if (!html2canvas) {
        throw new Error('html2canvas library not loaded');
      }

      if (!jsPDFLib || !jsPDFLib.jsPDF) {
        throw new Error('jsPDF library not loaded');
      }

      const { jsPDF } = jsPDFLib;

      const element = document.getElementById('printable-area');
      if (!element) {
        alert('Print area not found');
        if (downloadBtn) {
          downloadBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg><span>PDF</span>';
        }
        return;
      }

      // Show generating state
      if (downloadBtn) {
        downloadBtn.innerHTML = '<span>Generating PDF...</span>';
      }

      // Temporarily show the print area
      const originalDisplay = element.style.display;
      const originalPosition = element.style.position;
      element.style.display = 'block';
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.top = '0';

      console.log('Starting canvas generation...');

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      console.log('Canvas generated:', canvas.width, 'x', canvas.height);

      // Hide it again
      element.style.display = originalDisplay;
      element.style.position = originalPosition;
      element.style.left = '';
      element.style.top = '';

      const imgData = canvas.toDataURL('image/png');
      console.log('Image data length:', imgData.length);
      
      // Legal size paper: 215.9mm x 355.6mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'legal'
      });
      
      console.log('PDF created');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      console.log('PDF dimensions:', pdfWidth, 'x', pdfHeight);
      
      // Calculate scaling to fit width with margins
      const margin = 10;
      const availableWidth = pdfWidth - (2 * margin);
      const availableHeight = pdfHeight - (2 * margin);
      
      const widthRatio = availableWidth / imgWidth;
      const scaledHeight = imgHeight * widthRatio;
      
      console.log('Scaled height:', scaledHeight, 'Available height:', availableHeight);
      
      // If content fits on one page
      if (scaledHeight <= availableHeight) {
        console.log('Single page PDF');
        pdf.addImage(imgData, 'PNG', margin, margin, availableWidth, scaledHeight);
      } else {
        // Content needs multiple pages
        console.log('Multi-page PDF');
        let remainingHeight = scaledHeight;
        let sourceY = 0;
        let pageNumber = 0;
        
        while (remainingHeight > 0) {
          if (pageNumber > 0) {
            pdf.addPage();
            console.log('Added page', pageNumber + 1);
          }
          
          const heightForThisPage = Math.min(availableHeight, remainingHeight);
          const sourceHeight = heightForThisPage / widthRatio;
          
          // Create a temporary canvas for this page section
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
      
      // Generate the PDF as a blob
      const pdfBlob = pdf.output('blob');
      
      // Default filename
      const defaultFilename = `PR-${formData.prNo || 'draft'}-${new Date().toISOString().split('T')[0]}.pdf`;
      
      console.log('PDF blob created, size:', pdfBlob.size);

      // Check if File System Access API is supported
      if ('showSaveFilePicker' in window) {
        try {
          // Show save dialog with file picker
          const handle = await (window as any).showSaveFilePicker({
            suggestedName: defaultFilename,
            types: [{
              description: 'PDF Files',
              accept: { 'application/pdf': ['.pdf'] }
            }]
          });

          // Create a writable stream
          const writable = await handle.createWritable();
          
          // Write the PDF blob to the file
          await writable.write(pdfBlob);
          
          // Close the file
          await writable.close();
          
          console.log('PDF saved via File System Access API');
          
          // Reset button
          if (downloadBtn) {
            downloadBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg><span>PDF</span>';
          }

          alert('PDF saved successfully!');
        } catch (err: any) {
          // User cancelled or error occurred
          if (err.name === 'AbortError') {
            console.log('User cancelled save dialog');
            if (downloadBtn) {
              downloadBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg><span>PDF</span>';
            }
          } else {
            throw err;
          }
        }
      } else {
        // Fallback for browsers that don't support File System Access API
        // Create a download link
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = defaultFilename;
        link.click();
        
        // Clean up
        setTimeout(() => URL.revokeObjectURL(url), 100);
        
        console.log('PDF downloaded via fallback method');
        
        // Reset button
        if (downloadBtn) {
          downloadBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg><span>PDF</span>';
        }

        alert('PDF generated successfully! Check your downloads folder.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Reset button on error
      const downloadBtn = document.getElementById('download-btn');
      if (downloadBtn) {
        downloadBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg><span>PDF</span>';
      }
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: legal portrait;
            margin: 15mm 20mm;
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
            padding: 0;
          }
          
          .no-print {
            display: none !important;
          }

          /* Header Styles */
          .print-header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #000;
          }

          .print-header h1 {
            font-size: 11pt;
            font-weight: bold;
            margin: 3px 0;
            text-transform: uppercase;
          }

          .print-header h2 {
            font-size: 14pt;
            font-weight: bold;
            margin: 5px 0;
            text-transform: uppercase;
          }

          .print-header h3 {
            font-size: 12pt;
            font-weight: bold;
            margin: 3px 0;
          }

          /* Info Grid */
          .print-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 15px;
            font-size: 10pt;
          }

          .print-info-item {
            display: flex;
            align-items: baseline;
            gap: 5px;
          }

          .print-info-item strong {
            white-space: nowrap;
          }

          .print-info-item span {
            border-bottom: 1px solid #000;
            flex: 1;
            min-height: 20px;
            padding-left: 5px;
          }

          /* Table Styles */
          .print-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9pt;
            margin-bottom: 15px;
          }
          
          .print-table th,
          .print-table td {
            border: 1px solid #000;
            padding: 5px;
          }
          
          .print-table th {
            background-color: #e5e7eb;
            font-weight: bold;
            text-align: center;
            font-size: 9pt;
          }

          .print-table td {
            vertical-align: top;
          }

          .print-table .text-center {
            text-align: center;
          }

          .print-table .text-right {
            text-align: right;
          }

          .print-table .font-bold {
            font-weight: bold;
          }

          .print-table tbody tr.total-row {
            background-color: #f3f4f6;
          }

          /* Purpose Section */
          .print-purpose {
            margin-bottom: 20px;
            font-size: 10pt;
          }

          .print-purpose-label {
            font-weight: bold;
            margin-bottom: 5px;
          }

          .print-purpose-content {
            border: 1px solid #000;
            padding: 8px;
            min-height: 60px;
            white-space: pre-wrap;
          }

          /* Signatures */
          .print-signatures {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 30px;
            font-size: 10pt;
          }

          .signature-block {
            page-break-inside: avoid;
          }

          .signature-label {
            font-weight: bold;
            margin-bottom: 5px;
          }

          .signature-line {
            border-bottom: 1px solid #000;
            margin-top: 40px;
            padding-top: 2px;
            text-align: center;
            min-height: 20px;
          }

          .signature-name {
            font-weight: bold;
            text-align: center;
            margin-top: 5px;
          }

          .signature-designation {
            text-align: center;
            font-style: italic;
            margin-top: 3px;
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
                Purchase Request
              </h1>
              <p className="text-gray-600 mt-1">Create and manage purchase requests (Legal Size)</p>
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
              Save Request
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow max-w-7xl mx-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
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
                  Section:
                </label>
                <input
                  type="text"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter section"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  P.R. No.:
                </label>
                <input
                  type="text"
                  value={formData.prNo}
                  onChange={(e) => setFormData({ ...formData, prNo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="PR-2024-000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date:
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
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
                    Unit
                  </th>
                  <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center">
                    Item Description
                  </th>
                  <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-40">
                    Unit Cost
                  </th>
                  <th className="border border-gray-300 px-3 py-3 text-sm font-semibold text-gray-700 text-center w-40">
                    Total Cost
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-gray-300 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Requested By:</h3>
                <div className="space-y-4">
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
                    <p className="text-xs text-gray-600 italic">Head of Office/Department</p>
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
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Preview Purchase Request (Legal Size)</h2>
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

            {/* Modal Content - Scrollable Preview */}
            <div className="flex-1 overflow-auto p-6 bg-gray-100">
              <div className="bg-white shadow-lg mx-auto" style={{ width: '215.9mm', minHeight: '355.6mm', padding: '20mm' }}>
                {/* Preview Content - Matches Print View */}
                <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '10px', borderBottom: '3px solid #000' }}>
                  <h1 style={{ fontSize: '11pt', fontWeight: 'bold', margin: '3px 0', textTransform: 'uppercase' }}>Republic of the Philippines</h1>
                  <h2 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '5px 0', textTransform: 'uppercase' }}>Municipality of Kadingilan</h2>
                  <h3 style={{ fontSize: '12pt', fontWeight: 'bold', margin: '3px 0' }}>Province of Bukidnon</h3>
                  <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginTop: '15px', margin: '5px 0', textTransform: 'uppercase' }}>PURCHASE REQUEST</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px', fontSize: '10pt' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                    <strong style={{ whiteSpace: 'nowrap' }}>Entity Name:</strong>
                    <span style={{ borderBottom: '1px solid #000', flex: 1, minHeight: '20px', paddingLeft: '5px' }}>{formData.department}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                    <strong style={{ whiteSpace: 'nowrap' }}>PR No.:</strong>
                    <span style={{ borderBottom: '1px solid #000', flex: 1, minHeight: '20px', paddingLeft: '5px' }}>{formData.prNo}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                    <strong style={{ whiteSpace: 'nowrap' }}>Office/Section:</strong>
                    <span style={{ borderBottom: '1px solid #000', flex: 1, minHeight: '20px', paddingLeft: '5px' }}>{formData.section}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                    <strong style={{ whiteSpace: 'nowrap' }}>Date:</strong>
                    <span style={{ borderBottom: '1px solid #000', flex: 1, minHeight: '20px', paddingLeft: '5px' }}>{new Date(formData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt', marginBottom: '15px', border: '1px solid #000' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '9pt', width: '50px' }}>Item No.</th>
                      <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '9pt', width: '70px' }}>Quantity</th>
                      <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '9pt', width: '80px' }}>Unit</th>
                      <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '9pt' }}>Description</th>
                      <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '9pt', width: '100px' }}>Unit Cost</th>
                      <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '9pt', width: '100px' }}>Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center', verticalAlign: 'top' }}>{item.itemNo}</td>
                        <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center', verticalAlign: 'top' }}>{item.quantity}</td>
                        <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center', verticalAlign: 'top' }}>{item.unitOfIssue}</td>
                        <td style={{ border: '1px solid #000', padding: '5px', verticalAlign: 'top' }}>{item.itemDescription}</td>
                        <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', verticalAlign: 'top' }}>₱{parseFloat(item.estimatedUnitCost || '0').toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                        <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', verticalAlign: 'top' }}>₱{parseFloat(item.estimatedCost || '0').toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                    {Array.from({ length: Math.max(0, 5 - items.length) }).map((_, idx) => (
                      <tr key={`empty-${idx}`}>
                        <td style={{ border: '1px solid #000', padding: '5px', height: '25px' }}>&nbsp;</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: '#f3f4f6' }}>
                      <td colSpan={5} style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>TOTAL AMOUNT:</td>
                      <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>₱{parseFloat(calculateTotal()).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ marginBottom: '20px', fontSize: '10pt' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Purpose:</div>
                  <div style={{ border: '1px solid #000', padding: '8px', minHeight: '60px', whiteSpace: 'pre-wrap' }}>{formData.purpose}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '30px', fontSize: '10pt' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Requested by:</div>
                    <div style={{ borderBottom: '1px solid #000', marginTop: '40px', paddingTop: '2px', textAlign: 'center', minHeight: '20px' }}>&nbsp;</div>
                    <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '5px' }}>{formData.printedName}</div>
                    <div style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '3px' }}>{formData.designation}</div>
                  </div>

                  <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Approved by:</div>
                    <div style={{ borderBottom: '1px solid #000', marginTop: '40px', paddingTop: '2px', textAlign: 'center', minHeight: '20px' }}>&nbsp;</div>
                    <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '5px' }}>Municipal Mayor</div>
                    <div style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '3px' }}>Head of Office/Department</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print View - Professional Government Format (Legal Size) */}
      <div id="printable-area" style={{ display: 'none', padding: '20mm', backgroundColor: '#ffffff', width: '215.9mm', minHeight: '355.6mm' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '10px', borderBottom: '3px solid #000' }}>
          <h1 style={{ fontSize: '11pt', fontWeight: 'bold', margin: '3px 0', textTransform: 'uppercase' }}>Republic of the Philippines</h1>
          <h2 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '5px 0', textTransform: 'uppercase' }}>Municipality of Kadingilan</h2>
          <h3 style={{ fontSize: '12pt', fontWeight: 'bold', margin: '3px 0' }}>Province of Bukidnon</h3>
          <h2 style={{ fontSize: '14pt', fontWeight: 'bold', marginTop: '15px', margin: '5px 0', textTransform: 'uppercase' }}>PURCHASE REQUEST</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px', fontSize: '10pt' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <strong style={{ whiteSpace: 'nowrap' }}>Entity Name:</strong>
            <span style={{ borderBottom: '1px solid #000', flex: 1, minHeight: '20px', paddingLeft: '5px' }}>{formData.department}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <strong style={{ whiteSpace: 'nowrap' }}>PR No.:</strong>
            <span style={{ borderBottom: '1px solid #000', flex: 1, minHeight: '20px', paddingLeft: '5px' }}>{formData.prNo}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <strong style={{ whiteSpace: 'nowrap' }}>Office/Section:</strong>
            <span style={{ borderBottom: '1px solid #000', flex: 1, minHeight: '20px', paddingLeft: '5px' }}>{formData.section}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
            <strong style={{ whiteSpace: 'nowrap' }}>Date:</strong>
            <span style={{ borderBottom: '1px solid #000', flex: 1, minHeight: '20px', paddingLeft: '5px' }}>{new Date(formData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt', marginBottom: '15px', border: '1px solid #000' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '9pt', width: '50px' }}>Item No.</th>
              <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '9pt', width: '70px' }}>Quantity</th>
              <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '9pt', width: '80px' }}>Unit</th>
              <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '9pt' }}>Description</th>
              <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '9pt', width: '100px' }}>Unit Cost</th>
              <th style={{ border: '1px solid #000', padding: '5px', backgroundColor: '#e5e7eb', fontWeight: 'bold', textAlign: 'center', fontSize: '9pt', width: '100px' }}>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center', verticalAlign: 'top' }}>{item.itemNo}</td>
                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center', verticalAlign: 'top' }}>{item.quantity}</td>
                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center', verticalAlign: 'top' }}>{item.unitOfIssue}</td>
                <td style={{ border: '1px solid #000', padding: '5px', verticalAlign: 'top' }}>{item.itemDescription}</td>
                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', verticalAlign: 'top' }}>₱{parseFloat(item.estimatedUnitCost || '0').toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', verticalAlign: 'top' }}>₱{parseFloat(item.estimatedCost || '0').toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
              </tr>
            ))}
            {Array.from({ length: Math.max(0, 5 - items.length) }).map((_, idx) => (
              <tr key={`empty-${idx}`}>
                <td style={{ border: '1px solid #000', padding: '5px', height: '25px' }}>&nbsp;</td>
                <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
                <td style={{ border: '1px solid #000', padding: '5px' }}>&nbsp;</td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#f3f4f6' }}>
              <td colSpan={5} style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>TOTAL AMOUNT:</td>
              <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>₱{parseFloat(calculateTotal()).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginBottom: '20px', fontSize: '10pt' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Purpose:</div>
          <div style={{ border: '1px solid #000', padding: '8px', minHeight: '60px', whiteSpace: 'pre-wrap' }}>{formData.purpose}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '30px', fontSize: '10pt' }}>
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Requested by:</div>
            <div style={{ borderBottom: '1px solid #000', marginTop: '40px', paddingTop: '2px', textAlign: 'center', minHeight: '20px' }}>&nbsp;</div>
            <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '5px' }}>{formData.printedName}</div>
            <div style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '3px' }}>{formData.designation}</div>
          </div>

          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Approved by:</div>
            <div style={{ borderBottom: '1px solid #000', marginTop: '40px', paddingTop: '2px', textAlign: 'center', minHeight: '20px' }}>&nbsp;</div>
            <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '5px' }}>Municipal Mayor</div>
            <div style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '3px' }}>Head of Office/Department</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseRequest;
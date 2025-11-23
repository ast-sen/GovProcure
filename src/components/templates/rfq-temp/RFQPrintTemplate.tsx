import React from 'react';
import { RFQFormData, RFQItem } from '../../../types/rfq.types';

interface RFQPrintTemplateProps {
  formData: RFQFormData;
  items: RFQItem[];
}

export const RFQPrintTemplate: React.FC<RFQPrintTemplateProps> = ({
  formData,
  items
}) => {
  return (
    <div id="printable-area" className="hidden print:block">
      <div className="p-8">
        <div className="border-2 border-gray-800">
          <div className="border-b-2 border-gray-800 p-6">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 flex-shrink-0">
                <div className="w-full h-full rounded-full border-4 border-blue-800 flex items-center justify-center bg-blue-50">
                  <span className="text-blue-800 font-bold text-xs text-center">SEAL</span>
                </div>
              </div>
              
              <div className="flex-1 text-center">
                <h2 className="text-sm font-semibold">Republic of the Philippines</h2>
                <h3 className="text-sm font-bold">PROVINCE OF BUKIDNON</h3>
                <h4 className="text-sm font-bold">MUNICIPALITY OF KADINGILAN</h4>
                <h5 className="text-sm font-bold mt-2">OFFICE OF THE BIDS AND AWARDS COMMITTEE</h5>
                <h1 className="text-xl font-bold mt-3">REQUEST FOR PRICE QUOTATION (RFQ)</h1>
              </div>
              
              <div className="w-20 h-20 flex-shrink-0"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Department:</strong> {formData.department}</p>
                <p><strong>Section:</strong> {formData.section || '_________________'}</p>
              </div>
              <div>
                <p><strong>PR No.:</strong> {formData.prNo}</p>
                <p><strong>Date:</strong> {formData.date || '_________________'}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2 text-center font-bold w-12">ITEM NO.</th>
                  <th className="border border-gray-300 px-2 py-2 text-center font-bold w-20">Quantity</th>
                  <th className="border border-gray-300 px-2 py-2 text-center font-bold w-24">Unit of Issue</th>
                  <th className="border border-gray-300 px-2 py-2 text-center font-bold">ITEM DESCRIPTION</th>
                  <th className="border border-gray-300 px-2 py-2 text-center font-bold w-24">unit price</th>
                  <th className="border border-gray-300 px-2 py-2 text-center font-bold w-24">Total price</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 px-2 py-2 text-center">{item.itemNo}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">{item.quantity}</td>
                    <td className="border border-gray-300 px-2 py-2 text-center">{item.unitOfIssue}</td>
                    <td className="border border-gray-300 px-2 py-2 whitespace-pre-wrap">{item.itemDescription}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{item.unitPrice}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">{item.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t-2 border-gray-300">
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="text-right">
                  <p className="mb-8">Very truly yours,</p>
                  <div className="border-b-2 border-gray-400 mb-2"></div>
                  <p className="font-bold">{formData.bacChairman}</p>
                  <p className="text-xs">BAC Chairman</p>
                </div>
                <div>
                  <p><strong>Received by:</strong> {formData.receivedBy || '_________________'}</p>
                </div>
                <div>
                  <p><strong>Name of Establishment:</strong></p>
                  <p className="border-b border-gray-400">{formData.nameOfEstablishment || '_________________'}</p>
                </div>
                <div>
                  <p><strong>Printed Name and Signature:</strong></p>
                  <p className="border-b border-gray-400">{formData.printedNameSignature || '_________________'}</p>
                </div>
                <div>
                  <p><strong>Address:</strong></p>
                  <p className="border-b border-gray-400">{formData.address || '_________________'}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p><strong>TIN:</strong></p>
                  <p className="border-b border-gray-400">{formData.tin || '_________________'}</p>
                </div>
                <div>
                  <p><strong>VAT:</strong></p>
                  <p className="border-b border-gray-400">{formData.vat || '_________________'}</p>
                </div>
                <div>
                  <p><strong>{formData.nonVat ? '☑' : '☐'} NON-VAT</strong></p>
                </div>
                <div>
                  <p><strong>{formData.vatExempt ? '☑' : '☐'} VAT EXEMPT</strong></p>
                </div>
                <div>
                  <p><strong>Cellphone Number:</strong></p>
                  <p className="border-b border-gray-400">{formData.cellphoneNumber || '_________________'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
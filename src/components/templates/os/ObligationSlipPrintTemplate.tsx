import React from 'react';
import { ObligationSlipFormData } from '../../../types/obligation-slip.types';

interface ObligationSlipPrintTemplateProps {
  formData: ObligationSlipFormData;
}

export const ObligationSlipPrintTemplate: React.FC<ObligationSlipPrintTemplateProps> = ({
  formData
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
                <h2 className="text-sm font-semibold text-gray-700">Republic of the Philippines</h2>
                <h3 className="text-sm font-bold text-gray-800">PROVINCE OF BUKIDNON</h3>
                <h4 className="text-sm font-bold text-gray-800">MUNICIPALITY OF KADINGILAN</h4>
                <h1 className="text-3xl font-bold text-gray-900 mt-4">OBLIGATION SLIP</h1>
                <p className="text-sm text-gray-600 mt-2">Page 1 of 1</p>
              </div>
              
              <div className="w-20 h-20 flex-shrink-0"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">No.:</span> {formData.no || '_________________'}
              </div>
              <div>
                <span className="font-medium">Date:</span> {formData.date || '_________________'}
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-b border-gray-300">
            <div className="space-y-3">
              <div>
                <strong>Payee/Office:</strong> {formData.payee}
              </div>
              <div>
                <strong>Address:</strong> {formData.address}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Responsibility Center:</strong> {formData.responsibilityCenter || 'N/A'}
                </div>
                <div>
                  <strong>F/P.P.A:</strong> {formData.fppa || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-center font-bold">
                    PARTICULARS
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-bold w-48">
                    ACCOUNT CODE
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-bold w-48">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 align-top" style={{ minHeight: '200px' }}>
                    <div className="whitespace-pre-wrap">{formData.particulars}</div>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 align-top">
                    {formData.accountCode}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 align-top text-right">
                    {formData.amount}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan={2} className="border border-gray-300 px-4 py-3 text-right font-bold">
                    TOTAL :
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-bold">
                    {formData.amount || '0.00'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t-2 border-gray-300">
            <div className="grid grid-cols-2 gap-6">
              <div className="border border-gray-300 p-4">
                <h3 className="font-bold text-center mb-4">A. REQUESTED BY :</h3>
                <div className="mb-4">
                  <p className="text-xs mb-2">Certified: Charges to appropriation/allotment necessary, lawful and under my direct supervision</p>
                  <div className="border-b border-gray-400 h-16 mb-2"></div>
                  <p className="text-xs">Signature:</p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium">Printed name:</p>
                  <p className="font-bold">{formData.requestedBy}</p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium">Position:</p>
                  <p>{formData.requestedByPosition}</p>
                </div>
                <div>
                  <p className="text-xs font-medium">Date:</p>
                  <p>{formData.requestedByDate || '_________________'}</p>
                </div>
              </div>

              <div className="border border-gray-300 p-4">
                <h3 className="font-bold text-center mb-4">B. FUNDS AVAILABLE</h3>
                <div className="mb-4">
                  <p className="text-xs mb-2">Certified: Appropriation/Allotment available and obligated for the purposes as indicated above</p>
                  <div className="border-b border-gray-400 h-16 mb-2"></div>
                  <p className="text-xs">Signature:</p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium">Printed name:</p>
                  <p className="font-bold">{formData.fundsAvailableBy}</p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium">Position:</p>
                  <p>{formData.fundsAvailableByPosition}</p>
                </div>
                <div>
                  <p className="text-xs font-medium">Date:</p>
                  <p>{formData.fundsAvailableByDate || '_________________'}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm font-bold">ANNEX G</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
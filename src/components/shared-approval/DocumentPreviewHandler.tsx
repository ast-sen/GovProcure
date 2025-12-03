import { useTheme } from '../../context/ThemeContext';

import { APPPreviewModal } from '../templates/app-temp/APPPreviewModal';
import { AbstractBidsPreviewModal } from '../templates/abstract-bids-temp/AbstractBidsPreviewModal';
import { IARPreviewModal } from '../templates/iar-temp/IARPreviewModal';
import { ObligationSlipPreviewModal } from '../templates/os-temp/ObligationSlipPreviewModal';
import { PPMPPreviewModal } from '../templates/ppmp-temp/PPMPPreviewModal';
import { POPreviewModal } from '../templates/purchase-order-temp/POPreviewModal';
import { PRPreviewModal } from '../templates/purchase-request-temp/PRPreviewModal';
import { RFQPreviewModal } from '../templates/rfq-temp/RFQPreviewModal';
import { RISPreviewModal } from '../templates/ris-temp/RISPreviewModal';

import { BaseApprovalItem } from '../../types/approval.types';
import { DEFAULT_ABSTRACT_BIDS_FORM_DATA } from '../../types/abstract-bids.types';
import { DEFAULT_RIS_FORM_DATA } from '../../types/ris.types';

interface DocumentPreviewHandlerProps {
  isOpen: boolean;
  onClose: () => void;
  item: BaseApprovalItem | null;
}

export function DocumentPreviewHandler({
  isOpen,
  onClose,
  item,
}: DocumentPreviewHandlerProps) {
  const { styles } = useTheme();

  if (!isOpen || !item) return null;

  // No-op handlers for modals that require these props
  const handleDownloadPDF = () => {
    console.log('Download PDF not implemented in preview mode');
  };

  const handlePrint = () => {
    console.log('Print not implemented in preview mode');
  };

  const calculateTotal = () => '0.00';

  // Helper function to render fallback modal
  const renderFallback = (message?: string) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className={`${styles.bgCard} rounded-lg shadow-xl p-6 max-w-md`}>
        <h3 className={`text-lg font-bold ${styles.textPrimary} mb-4`}>
          Preview Not Available
        </h3>
        <p className={styles.textSecondary}>
          {message || `Preview is not yet implemented for ${item.type} type documents.`}
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  // Get the document type as string for switch comparison
  const documentType = item.type as string;

  switch (documentType) {
    case 'APP':
      return (
        <APPPreviewModal
          isOpen={isOpen}
          onClose={onClose}
          formData={{
            department: item.department,
            officeSection: item.requestedBy,
            preparedBy: item.requestedBy,
            reviewedBy: '',
          }}
          items={[]}
        />
      );

    case 'APPC':
      return (
        <AbstractBidsPreviewModal
          isOpen={isOpen}
          onClose={onClose}
          formData={{
            openedOn: new Date().toISOString().split('T')[0],
            openedAt: '',
            openedAtTime: '',
            forFurnishing: item.description || '',
            forOffice: item.department,
            awardRecommendedTo: '',
            bacMembers: DEFAULT_ABSTRACT_BIDS_FORM_DATA.bacMembers,
          }}
          items={[]}
          bidderNames={['Bidder 1', 'Bidder 2', 'Bidder 3']}
        />
      );

    case 'IAR':
      return (
        <IARPreviewModal
          onClose={onClose}
          onDownloadPDF={handleDownloadPDF}
          onPrint={handlePrint}
          formData={{
            supplier: '',
            prNo: item.prNumber || '',
            prDate: '',
            poNo: '',
            dateReceived: new Date().toISOString().split('T')[0],
            dateInspected: new Date().toISOString().split('T')[0],
            inspectionOfficer: '',
            acceptanceComplete: false,
            acceptancePartial: false,
            propertyOfficer: '',
          }}
          items={[]}
        />
      );

    case 'OS':
      return (
        <ObligationSlipPreviewModal
          isOpen={isOpen}
          onClose={onClose}
          formData={{
            no: item.transactionNumber,
            date: new Date().toISOString().split('T')[0],
            payee: '',
            address: '',
            responsibilityCenter: '',
            fppa: '',
            particulars: item.description || '',
            accountCode: '',
            amount: item.amount.toString(),
            requestedBy: item.requestedBy,
            requestedByPosition: '',
            requestedByDate: '',
            fundsAvailableBy: '',
            fundsAvailableByPosition: '',
            fundsAvailableByDate: '',
          }}
        />
      );

    case 'PPMP':
      return (
        <PPMPPreviewModal
          onClose={onClose}
          onDownloadPDF={handleDownloadPDF}
          onPrint={handlePrint}
          formData={{
            transactionNumber: item.transactionNumber,
            title: item.title,
            endUserName: item.requestedBy,
            officeAgency: item.department,
            preparedBy: item.requestedBy,
            approvedBy: '',
          }}
          items={[]}
        />
      );

    case 'PO':
      return (
        <POPreviewModal
          calculateTotal={calculateTotal}
          onClose={onClose}
          onDownloadPDF={handleDownloadPDF}
          onPrint={handlePrint}
          formData={{
            supplierAddress: '',
            gentlemen: '',
            placeOfDelivery: '',
            dateOfDelivery: new Date().toISOString().split('T')[0],
            deliveryTerm: '',
            paymentTerm: '',
            conformeDate: '',
          }}
          items={[]}
        />
      );

    case 'PR':
      return (
        <PRPreviewModal
          calculateTotal={calculateTotal}
          onClose={onClose}
          onDownloadPDF={handleDownloadPDF}
          onPrint={handlePrint}
          formData={{
            department: item.department,
            section: '',
            prNo: item.prNumber || item.transactionNumber,
            date: new Date().toISOString().split('T')[0],
            purpose: item.description || '',
            requestedBy: {
              signature: '',
              name: item.requestedBy,
              designation: '',
            },
            approvedBy: {
              signature: '',
              name: '',
              designation: '',
            },
          }}
          items={[]}
        />
      );

    case 'RFQ':
      return (
        <RFQPreviewModal
          isOpen={isOpen}
          onClose={onClose}
          formData={{
            department: item.department,
            section: '',
            prNo: item.prNumber || '',
            sectionInfo: '',
            alobsNo: '',
            date: new Date().toISOString().split('T')[0],
            receivedBy: '',
            nameOfEstablishment: '',
            printedNameSignature: '',
            address: '',
            cellphoneNumber: '',
            tin: '',
            vat: '',
            nonVat: false,
            vatExempt: false,
            bacChairman: '',
          }}
          items={[]}
        />
      );

    case 'RIS':
      return (
        <RISPreviewModal
          isOpen={isOpen}
          onClose={onClose}
          formData={{
            office: item.department,
            reference: '',
            fund: '',
            risNo: item.transactionNumber,
            date: new Date().toISOString().split('T')[0],
            purpose: item.description || '',
            requestedBy: DEFAULT_RIS_FORM_DATA.requestedBy,
            approvedBy: DEFAULT_RIS_FORM_DATA.approvedBy,
            issuedBy: DEFAULT_RIS_FORM_DATA.issuedBy,
            receivedBy: DEFAULT_RIS_FORM_DATA.receivedBy,
          }}
          items={[]}
        />
      );

    default:
      return renderFallback();
  }
}

export default DocumentPreviewHandler;
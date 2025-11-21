export const RIS_CONSTANTS = {
  // Form Configuration
  FORM_TITLE: 'REQUISITION AND ISSUE SLIP',
  FORM_SUBTITLE: 'MUNICIPALITY OF KADINGILAN',
  FORM_ENTITY: 'LGU',
  ANNEX_LABEL: 'ANNEX RIS',
  
  // Table Configuration
  TOTAL_ROWS: 30,
  
  // PDF Configuration
  PDF: {
    ORIENTATION: 'portrait' as const,
    FORMAT: 'letter' as const,
    MARGIN: 10, // in mm
    SCALE: 2,
  },
  
  // Print Configuration
  PRINT: {
    PAGE_SIZE: 'letter portrait',
    MARGIN: '0.5in',
  },
  
  // Page Dimensions
  DIMENSIONS: {
    WIDTH: '8.5in',
    MIN_HEIGHT: '11in',
    PADDING: '0.5in',
  },
  
  // Column Headers
  TABLE_HEADERS: {
    REQUISITION: 'REQUISITION',
    ISSUANCE: 'ISSUANCE',
    ITEM_NO: 'ITEM NO.',
    STOCK_NO: 'Stock No.',
    UNIT_OF_ISSUE: 'Unit of Issue',
    ITEM_DESCRIPTION: 'ITEM DESCRIPTION',
    QUANTITY: 'Quantity',
    REMARKS: 'REMARKS',
  },
  
  // Section Labels
  SECTIONS: {
    REQUESTED_BY: 'REQUESTED BY:',
    APPROVED_BY: 'APPROVED BY:',
    ISSUED_BY: 'ISSUED BY:',
    RECEIVED_BY: 'RECEIVED BY:',
  },
  
  // Field Labels
  FIELDS: {
    OFFICE: 'Office:',
    REFERENCE: 'Reference:',
    FUND: 'FUND:',
    RIS_NO: 'RIS No./s:',
    DATE: 'Date:',
    PURPOSE: 'Purpose:',
    SIGNATURE: 'Signature:',
    PRINTED_NAME: 'Printed name:',
    POSITION: 'Position:',
  },
  
  // Placeholders
  PLACEHOLDERS: {
    OFFICE: 'Enter office name',
    REFERENCE: 'Enter reference number',
    FUND: 'Enter fund source',
    RIS_NO: 'RIS-2025-000',
    PURPOSE: 'Enter the purpose of this requisition...',
    NAME: 'Full name',
    POSITION: 'Position',
    SIGNATURE: 'Sign here',
    STOCK_NO: 'Stock number',
    UNIT: 'Unit',
    DESCRIPTION: 'Item description',
    QUANTITY: 'Qty',
  },
  
  // Messages
  MESSAGES: {
    SAVE_SUCCESS: 'Requisition & Issue Slip saved successfully!',
    SUBMIT_SUCCESS: 'Requisition & Issue Slip submitted for approval!',
    PDF_GENERATING: 'Generating PDF...',
    PDF_SUCCESS: 'PDF saved successfully!',
    PDF_DOWNLOADED: 'PDF generated successfully!',
    LOADING_LIBRARIES: 'Loading libraries...',
    PRINT_AREA_NOT_FOUND: 'Print area not found',
    NOTE: 'All item details are loaded from inventory and are read-only.',
  },
  
  // File Names
  FILE_NAME_TEMPLATE: (risNo: string) => 
    `RIS-${risNo || 'draft'}-${new Date().toISOString().split('T')[0]}.pdf`,
};

export default RIS_CONSTANTS;
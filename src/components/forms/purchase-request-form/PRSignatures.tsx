import React from 'react';
import { SignatureBlock } from '../shared/SignatureBlock';
import { PRSignatory } from '../../../types/purchase-request.types';

interface PRSignaturesProps {
  requestedBy: PRSignatory;
  approvedBy: PRSignatory;
  onUpdateRequested: (updates: Partial<PRSignatory>) => void;
}

export const PRSignatures: React.FC<PRSignaturesProps> = ({
  requestedBy,
  approvedBy,
  onUpdateRequested
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <SignatureBlock
        label="Requested By:"
        name={requestedBy.name}
        designation={requestedBy.designation}
        editable
        onNameChange={(name) => onUpdateRequested({ name })}
        onDesignationChange={(designation) => onUpdateRequested({ designation })}
      />
      
      <SignatureBlock
        label="Approved By:"
        name={approvedBy.name}
        designation={approvedBy.designation}
        editable={false}
      />
    </div>
  );
};
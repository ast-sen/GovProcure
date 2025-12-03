import { useState } from 'react';

export const useDataManagement = () => {
  const [autoBackup, setAutoBackup] = useState(true);

  return {
    autoBackup,
    setAutoBackup,
  };
};
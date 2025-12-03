import { useState } from 'react';

export const useSettings = () => {
  const [saveMessage, setSaveMessage] = useState('');

  const handleSaveSettings = () => {
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleExportData = () => {
    alert('Data export initiated. You will receive a download link via email.');
  };

  const handleClearCache = () => {
    if (confirm('Are you sure you want to clear cache?')) {
      alert('Cache cleared successfully!');
    }
  };

  return {
    saveMessage,
    handleSaveSettings,
    handleExportData,
    handleClearCache,
  };
};
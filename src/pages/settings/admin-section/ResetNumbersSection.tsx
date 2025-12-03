import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

export const ResetNumbersSection = () => {
  const { styles, darkMode } = useTheme();
  const [prNumber, setPrNumber] = useState('PR-2025-0001');
  const [poNumber, setPoNumber] = useState('PO-2025-0001');

  const handleResetPR = () => {
    if (confirm('Are you sure you want to reset the PR number? This action cannot be undone.')) {
      alert('PR number has been reset successfully!');
    }
  };

  const handleResetPO = () => {
    if (confirm('Are you sure you want to reset the PO number? This action cannot be undone.')) {
      alert('PO number has been reset successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className={`${styles.bgCard} rounded-lg shadow-sm border ${styles.border} p-6`}>
        <h2 className={`text-xl font-semibold ${styles.textPrimary} mb-4`}>Reset PR Number</h2>
        <p className={`${styles.textSecondary} mb-4`}>
          Current PR Number: <span className={`font-semibold ${styles.textPrimary}`}>PR-2025-0234</span>
        </p>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${styles.textPrimary} mb-2`}>
              New PR Starting Number
            </label>
            <input
              type="text"
              value={prNumber}
              onChange={(e) => setPrNumber(e.target.value)}
              placeholder="PR-2025-0001"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${styles.bgInput}`}
            />
          </div>
          <button
            onClick={handleResetPR}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reset PR Number
          </button>
        </div>
      </div>

      <div className={`${styles.bgCard} rounded-lg shadow-sm border ${styles.border} p-6`}>
        <h2 className={`text-xl font-semibold ${styles.textPrimary} mb-4`}>Reset PO Number</h2>
        <p className={`${styles.textSecondary} mb-4`}>
          Current PO Number: <span className={`font-semibold ${styles.textPrimary}`}>PO-2025-0156</span>
        </p>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${styles.textPrimary} mb-2`}>
              New PO Starting Number
            </label>
            <input
              type="text"
              value={poNumber}
              onChange={(e) => setPoNumber(e.target.value)}
              placeholder="PO-2025-0001"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${styles.bgInput}`}
            />
          </div>
          <button
            onClick={handleResetPO}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reset PO Number
          </button>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border rounded-lg p-4`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className={`text-sm font-medium ${darkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>Warning</h3>
            <p className={`text-sm ${darkMode ? 'text-yellow-500' : 'text-yellow-700'} mt-1`}>
              Resetting numbers will affect all future transactions. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
import { useState, useEffect } from 'react';
import { BalanceItem } from '../types/balance-items.types';
import { MOCK_BALANCE_ITEMS } from '../demo-data/balance-items.data';

export const useBalanceItems = (isOpen: boolean) => {
  const [items, setItems] = useState<BalanceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMockData = () => {
    setItems(MOCK_BALANCE_ITEMS);
  };

  const fetchBalanceItems = async () => {
    setLoading(true);
    setError(null);

    const USE_MOCK_DATA = true;

    if (USE_MOCK_DATA) {
      setTimeout(() => {
        loadMockData();
        setLoading(false);
        setError('Using demo data - API not configured');
      }, 500);
      return;
    }

    try {
      const response = await fetch('/api/balance-items', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();
      setItems(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.warn('API not available, using mock data:', errorMessage);
      setError('Using demo data - API not configured');
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchBalanceItems();
  }, [isOpen]);

  return { items, loading, error, fetchBalanceItems };
};
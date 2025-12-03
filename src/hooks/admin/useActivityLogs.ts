import { useState } from 'react';
import { ActivityLog } from '../../types/admin.types';

export const useActivityLogs = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([
    { id: 1, user: 'John Doe', action: 'Created new user', timestamp: '2025-01-15 10:30 AM', ip: '192.168.1.1' },
    { id: 2, user: 'Jane Smith', action: 'Updated designation', timestamp: '2025-01-15 09:15 AM', ip: '192.168.1.2' },
    { id: 3, user: 'Admin', action: 'Reset PR number', timestamp: '2025-01-15 08:00 AM', ip: '192.168.1.3' },
  ]);

  const addLog = (log: Omit<ActivityLog, 'id'>) => {
    const newLog = { ...log, id: logs.length + 1 };
    setLogs([newLog, ...logs]);
  };

  const filterLogs = (searchTerm: string) => {
    return logs.filter(log =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return { logs, addLog, filterLogs };
};
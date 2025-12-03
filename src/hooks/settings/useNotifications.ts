import { useState } from 'react';

export const useNotifications = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);

  return {
    emailNotifications,
    setEmailNotifications,
    systemNotifications,
    setSystemNotifications,
  };
};
import { useState } from 'react';

export const useSecurity = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handleChangePassword = () => {
    alert('Change password functionality coming soon!');
  };

  return {
    twoFactorAuth,
    setTwoFactorAuth,
    handleChangePassword,
  };
};
import { useState } from 'react';
import { SecurityData } from '../../types/profile.types';

export const useSecurity = () => {
  const [securityData, setSecurityData] = useState<SecurityData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const updateSecurityField = (field: keyof SecurityData, value: string) => {
    setSecurityData(prev => ({ ...prev, [field]: value }));
  };

  const handleChangePassword = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('New passwords do not match!');
      return false;
    }
    
    if (securityData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return false;
    }

    try {
      // TODO: Send to backend
      console.log('Changing password...');
      alert('Password changed successfully!');
      setSecurityData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      return true;
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password');
      return false;
    }
  };

  const resetSecurityForm = () => {
    setSecurityData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return {
    securityData,
    updateSecurityField,
    handleChangePassword,
    resetSecurityForm,
  };
};
import { useState } from 'react';
import { ProfileData } from '../../types/profile.types';

export const useProfile = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: 'Admin User',
    email: 'admin@gov.ph',
    phone: '+63 912 345 6789',
    position: 'BAC Administrator',
    department: 'Bids and Awards Committee',
    location: 'Plaridel, Northern Mindanao',
    dateJoined: '2024-01-15',
    profilePicture: undefined,
    eSignature: undefined,
  });

  const [isEditing, setIsEditing] = useState(false);

  const updateProfileField = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      // TODO: Save to backend
      console.log('Saving profile:', profileData);
      alert('Profile updated successfully!');
      setIsEditing(false);
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile');
      return false;
    }
  };

  const handleImageUpload = async (file: File, type: 'profilePicture' | 'eSignature') => {
    try {
      // Convert to base64 or upload to server
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileData(prev => ({ ...prev, [type]: base64String }));
        alert(`${type === 'profilePicture' ? 'Profile picture' : 'E-Signature'} uploaded successfully!`);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  const removeImage = (type: 'profilePicture' | 'eSignature') => {
    setProfileData(prev => ({ ...prev, [type]: undefined }));
  };

  return {
    profileData,
    isEditing,
    setIsEditing,
    updateProfileField,
    handleSaveProfile,
    handleImageUpload,
    removeImage,
  };
};
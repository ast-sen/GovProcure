export interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  location: string;
  dateJoined: string;
  profilePicture?: string;
  eSignature?: string;
}

export interface SecurityData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}
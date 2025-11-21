import { useState } from 'react';

export const useSuccessModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('Success!');

  const showSuccess = (message: string, title?: string) => {
    setModalMessage(message);
    if (title) setModalTitle(title);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    modalMessage,
    modalTitle,
    showSuccess,
    closeModal
  };
};

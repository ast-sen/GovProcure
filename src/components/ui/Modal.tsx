import { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal = ({ isOpen, title, children, size = 'md' }: ModalProps) => {
  const { styles } = useTheme();
  
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'w-96',
    md: 'w-[500px]',
    lg: 'w-[700px]',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${styles.bgCard} rounded-lg p-6 ${sizeClasses[size]}`}>
        <h3 className={`text-lg font-semibold mb-4 ${styles.textPrimary}`}>{title}</h3>
        {children}
      </div>
    </div>
  );
};

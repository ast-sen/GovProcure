import { Upload, X, FileSignature } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ESignatureSectionProps {
  eSignature?: string;
  onSignatureUpload: (file: File) => void;
  onRemoveSignature: () => void;
  isEditing: boolean;
}

export const ESignatureSection = ({
  eSignature,
  onSignatureUpload,
  onRemoveSignature,
  isEditing,
}: ESignatureSectionProps) => {
  const { styles, themeColors } = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      onSignatureUpload(file);
    }
  };

  return (
    <div className={`mb-6 pb-6 border-b ${styles.border}`}>
      <div className="flex items-center gap-2 mb-3">
        <FileSignature size={20} className={styles.textPrimary} />
        <h3 className={`text-lg font-semibold ${styles.textPrimary}`}>
          E-Signature
        </h3>
      </div>
      
      <p className={`text-sm ${styles.textSecondary} mb-4`}>
        Upload your electronic signature for official documents (PNG, JPG - Max 2MB)
      </p>

      {eSignature ? (
        <div className={`relative inline-block p-4 ${styles.bgCard} border ${styles.border} rounded-lg`}>
          <img
            src={eSignature}
            alt="E-Signature"
            className="max-h-24 object-contain"
          />
          {isEditing && (
            <button
              onClick={onRemoveSignature}
              className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      ) : (
        <label className={`block w-full p-6 border-2 border-dashed ${styles.border} rounded-lg ${
          isEditing ? 'cursor-pointer hover:border-blue-500' : 'cursor-not-allowed opacity-60'
        } transition-colors`}>
          <div className="flex flex-col items-center gap-2">
            <div className={`p-3 ${themeColors.primary} ${themeColors.primaryHover} rounded-full text-white`}>
              <Upload size={24} />
            </div>
            <p className={`text-sm font-medium ${styles.textPrimary}`}>
              {isEditing ? 'Click to upload signature' : 'No signature uploaded'}
            </p>
            {isEditing && (
              <p className={`text-xs ${styles.textMuted}`}>
                PNG, JPG up to 2MB
              </p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={!isEditing}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};
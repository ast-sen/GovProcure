import { Camera, X } from 'lucide-react';
import { ProfileData } from '../../types/profile.types';
import { useTheme } from '../../context/ThemeContext';

interface ProfilePictureSectionProps {
  profileData: ProfileData;
  onImageUpload: (file: File) => void;
  onRemoveImage: () => void;
}

export const ProfilePictureSection = ({
  profileData,
  onImageUpload,
  onRemoveImage,
}: ProfilePictureSectionProps) => {
  const { styles, themeColors } = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      onImageUpload(file);
    }
  };

  return (
    <div className={`flex items-center gap-6 mb-6 pb-6 border-b ${styles.border}`}>
      <div className="relative">
        {profileData.profilePicture ? (
          <>
            <img
              src={profileData.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button
              onClick={onRemoveImage}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className={`w-24 h-24 ${themeColors.primary} rounded-full flex items-center justify-center text-white text-3xl font-bold`}>
            {profileData.fullName.charAt(0)}
          </div>
        )}
        <label className="absolute bottom-0 right-0 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors cursor-pointer">
          <Camera size={16} />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      <div>
        <h3 className={`text-xl font-bold ${styles.textPrimary}`}>{profileData.fullName}</h3>
        <p className={`text-sm ${styles.textSecondary}`}>{profileData.position}</p>
        <p className={`text-xs ${styles.textMuted} mt-1`}>{profileData.department}</p>
      </div>
    </div>
  );
};
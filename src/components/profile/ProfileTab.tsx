import { ProfilePictureSection } from './ProfilePictureSection';
import { ProfileFormSection } from './ProfileFormSection';
import { ESignatureSection } from './EsignatureSection';
import { ProfileData } from '../../types/profile.types';
import { useTheme } from '../../context/ThemeContext';

interface ProfileTabProps {
  profileData: ProfileData;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  updateProfileField: (field: keyof ProfileData, value: string) => void;
  handleSaveProfile: () => void;
  handleImageUpload: (file: File, type: 'profilePicture' | 'eSignature') => void;
  removeImage: (type: 'profilePicture' | 'eSignature') => void;
}

export const ProfileTab = ({
  profileData,
  isEditing,
  setIsEditing,
  updateProfileField,
  handleSaveProfile,
  handleImageUpload,
  removeImage,
}: ProfileTabProps) => {
  const { styles, themeColors } = useTheme();

  return (
    <div>
      {/* Profile Picture Section */}
      <ProfilePictureSection
        profileData={profileData}
        onImageUpload={(file) => handleImageUpload(file, 'profilePicture')}
        onRemoveImage={() => removeImage('profilePicture')}
      />

      {/* E-Signature Section */}
      <ESignatureSection
        eSignature={profileData.eSignature}
        onSignatureUpload={(file) => handleImageUpload(file, 'eSignature')}
        onRemoveSignature={() => removeImage('eSignature')}
        isEditing={isEditing}
      />

      {/* Profile Form */}
      <ProfileFormSection
        profileData={profileData}
        isEditing={isEditing}
        updateProfileField={updateProfileField}
      />

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end mt-6">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className={`px-6 py-2 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors font-medium`}
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className={`px-6 py-2 ${styles.bgCard} ${styles.textPrimary} rounded-lg ${styles.hoverBg} transition-colors font-medium border ${styles.border}`}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className={`px-6 py-2 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors font-medium flex items-center gap-2`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
};  
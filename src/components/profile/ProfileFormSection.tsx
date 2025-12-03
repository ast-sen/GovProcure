import { ProfileData } from '../../types/profile.types';
import { useTheme } from '../../context/ThemeContext';

interface ProfileFormSectionProps {
  profileData: ProfileData;
  isEditing: boolean;
  updateProfileField: (field: keyof ProfileData, value: string) => void;
}

export const ProfileFormSection = ({
  profileData,
  isEditing,
  updateProfileField,
}: ProfileFormSectionProps) => {
  const { styles } = useTheme();

  const FormField = ({ 
    label, 
    value, 
    field, 
    type = 'text',
    disabled = false 
  }: { 
    label: string; 
    value: string; 
    field: keyof ProfileData; 
    type?: string;
    disabled?: boolean;
  }) => (
    <div>
      <label className={`block text-sm font-medium ${styles.textSecondary} mb-2`}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => updateProfileField(field, e.target.value)}
        disabled={!isEditing || disabled}
        className={`w-full px-4 py-2 ${styles.bgCard} ${styles.textPrimary} border ${styles.border} rounded-lg transition-colors ${
          isEditing && !disabled
            ? `focus:outline-none focus:ring-2 focus:ring-blue-500`
            : `opacity-60 cursor-not-allowed`
        }`}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          label="Full Name" 
          value={profileData.fullName} 
          field="fullName" 
        />
        <FormField 
          label="Email" 
          value={profileData.email} 
          field="email" 
          type="email"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          label="Phone Number" 
          value={profileData.phone} 
          field="phone" 
          type="tel"
        />
        <FormField 
          label="Position" 
          value={profileData.position} 
          field="position" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          label="Department" 
          value={profileData.department} 
          field="department" 
        />
        <FormField 
          label="Location" 
          value={profileData.location} 
          field="location" 
        />
      </div>

      <FormField 
        label="Date Joined" 
        value={profileData.dateJoined} 
        field="dateJoined" 
        type="date"
        disabled={true}
      />
    </div>
  );
};
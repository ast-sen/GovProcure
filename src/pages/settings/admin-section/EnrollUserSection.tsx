import { useState } from 'react';
import { FormInput } from '../../../components/ui/FormInput';
import { FormSelect } from '../../../components/ui/FormSelect';
import { useUserManagement } from '../../../hooks/admin/useUserManagement';
import { useTheme } from '../../../context/ThemeContext';

export const EnrollUserSection = () => {
  const { addUser } = useUserManagement();
  const { styles, themeColors, darkMode } = useTheme();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    designation: '',
    department: ''
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleCreateUser = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    addUser({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      designation: formData.designation,
      department: formData.department,
      status: 'Active'
    });

    alert('User created successfully!');
    
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      designation: '',
      department: ''
    });
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      designation: '',
      department: ''
    });
  };

  const designationOptions = [
    { value: '', label: 'Select Designation' },
    { value: 'manager', label: 'Manager' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'staff', label: 'Staff' },
    { value: 'team-lead', label: 'Team Lead' },
    { value: 'senior-staff', label: 'Senior Staff' }
  ];

  const departmentOptions = [
    { value: '', label: 'Select Department' },
    { value: 'it', label: 'IT' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
    { value: 'procurement', label: 'Procurement' },
    { value: 'admin', label: 'Administration' }
  ];

  return (
    <div className={`${styles.bgCard} rounded-lg shadow-sm border ${styles.border} p-6`}>
      <div className="mb-6">
        <h2 className={`text-xl font-semibold ${styles.textPrimary}`}>Enroll/Create New User</h2>
        <p className={`text-sm ${styles.textSecondary} mt-1`}>Add a new user to the system with their details and permissions</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="First Name"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            placeholder="Enter first name"
            required
          />
          <FormInput
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            placeholder="Enter last name"
            required
          />
        </div>
        
        <FormInput
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="user@example.com"
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            label="Designation"
            value={formData.designation}
            onChange={handleChange('designation')}
            options={designationOptions}
            required
          />
          <FormSelect
            label="Department"
            value={formData.department}
            onChange={handleChange('department')}
            options={departmentOptions}
            required
          />
        </div>

        <div className={`${darkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4`}>
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>User Access Information</h4>
              <p className={`text-xs ${darkMode ? 'text-blue-500' : 'text-blue-700'} mt-1`}>
                New users will receive an email with login credentials. They will be required to change their password on first login.
              </p>
            </div>
          </div>
        </div>
        
        <div className={`flex items-center space-x-4 pt-4 border-t ${styles.border}`}>
          <button
            onClick={handleCreateUser}
            className={`px-6 py-2.5 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors font-medium flex items-center space-x-2`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create User</span>
          </button>
          <button
            onClick={handleCancel}
            className={`px-6 py-2.5 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${styles.textPrimary} rounded-lg transition-colors font-medium`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

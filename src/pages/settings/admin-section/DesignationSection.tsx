import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useDesignations } from '../../../hooks/admin/useDesignations';
import { Modal } from '../../../components/ui/Modal';
import { FormInput } from '../../../components/ui/FormInput';
import { useTheme } from '../../../context/ThemeContext';

interface DesignationSectionProps {
  searchTerm: string;
}

export const DesignationSection = ({ searchTerm }: DesignationSectionProps) => {
  const { addDesignation, filterDesignations } = useDesignations();
  const { styles, themeColors, darkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [newDesignation, setNewDesignation] = useState('');

  const filteredDesignations = filterDesignations(searchTerm);

  const handleAddDesignation = () => {
    if (newDesignation.trim()) {
      addDesignation(newDesignation);
      setNewDesignation('');
      setShowModal(false);
    }
  };

  return (
    <>
      <div className={`${styles.bgCard} rounded-lg shadow-sm border ${styles.border}`}>
        <div className={`p-6 border-b ${styles.border} flex items-center justify-between`}>
          <h2 className={`text-xl font-semibold ${styles.textPrimary}`}>Designations</h2>
          <button
            onClick={() => setShowModal(true)}
            className={`flex items-center space-x-2 px-4 py-2 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Designation</span>
          </button>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {filteredDesignations.map((designation) => (
              <div
                key={designation.id}
                className={`flex items-center justify-between p-4 border ${styles.border} rounded-lg ${styles.hoverBg}`}
              >
                <div>
                  <h3 className={`font-medium ${styles.textPrimary}`}>{designation.name}</h3>
                  <p className={`text-sm ${styles.textSecondary}`}>{designation.count} users</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Designation">
        <FormInput
          label="Designation Name"
          value={newDesignation}
          onChange={(e) => setNewDesignation(e.target.value)}
          placeholder="Enter designation name"
          required
        />
        <div className="flex space-x-2 mt-4">
          <button
            onClick={handleAddDesignation}
            className={`flex-1 px-4 py-2 ${themeColors.primary} ${themeColors.primaryHover} text-white rounded-lg transition-colors`}
          >
            Add
          </button>
          <button
            onClick={() => setShowModal(false)}
            className={`flex-1 px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${styles.textPrimary} rounded-lg transition-colors`}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};
import { Eye, Edit, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ActionButtons = ({ onView, onEdit, onDelete }: ActionButtonsProps) => {
  return (
    <div className="flex items-center space-x-2">
      {onView && (
        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
          <Eye className="w-4 h-4" />
        </button>
      )}
      {onEdit && (
        <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
          <Edit className="w-4 h-4" />
        </button>
      )}
      {onDelete && (
        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
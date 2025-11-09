import { QuickAction } from '../../types';

interface QuickActionCardProps {
  action: QuickAction;
  onClick?: () => void;
}

export function QuickActionCard({ action, onClick }: QuickActionCardProps) {
  const Icon = action.icon;
  
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left group"
    >
      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon size={24} className="text-white" />
      </div>
      <h4 className="font-semibold text-gray-800 mb-2">{action.title}</h4>
      <p className="text-sm text-gray-600">{action.description}</p>
    </button>
  );
}
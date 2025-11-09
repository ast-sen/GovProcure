import { Stat } from '../../types';

interface StatCardProps {
  stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
      <p className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</p>
      <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-gray-600'}`}>
        {stat.change} from last month
      </p>
    </div>
  );
}
import { FileText, List, BarChart3, FolderOpen, UserCheck, FileArchiveIcon } from 'lucide-react';
import { QuickAction, Activity, Stat } from '../types';
import { StatCard } from '../components/ui/StatCard';
import { QuickActionCard } from '../components/ui/QuickActionCard';
import { ActivityFeed } from '../components/ui/ActivityFeed';
import { useTheme } from '../context/ThemeContext';

interface DashboardProps {
  onNavigate?: (nav: string) => void;
}

const quickActions: QuickAction[] = [
  { 
    id: 'project-procurement',
    title: 'Project Procurement', 
    icon: FileText, 
    description: 'Create new project procurement plan',
    color: 'bg-blue-500'
  },
  { 
    id: 'purchase-request',
    title: 'Purchase Request', 
    icon: List, 
    description: 'Create new purchase request',
    color: 'bg-green-500'
  },
  { 
    id: 'reports',
    title: 'Reports', 
    icon: BarChart3, 
    description: 'View all available forms',
    color: 'bg-purple-500'
  }
];

const approvalActions: QuickAction[] = [
  { 
    id: 'head-of-office',
    title: 'Head of Office', 
    icon: UserCheck, 
    description: 'Head of Office approvals',
    color: 'bg-indigo-500'
  },
  { 
    id: 'mbo-approval',
    title: 'MBO Approval', 
    icon: FolderOpen, 
    description: 'Municipal Budget Office',
    color: 'bg-orange-500'
  },
  { 
    id: 'accounting-office',
    title: 'Voucher', 
    icon: FileArchiveIcon, 
    description: 'Generate Voucher',
    color: 'bg-rose-500'
  }
];

const stats: Stat[] = [
  { label: 'Pending PRs', value: '24', change: '+12%', trend: 'up' },
  { label: 'Approved This Month', value: '156', change: '+8%', trend: 'up' },
  { label: 'Total Budget Used', value: '₱2.4M', change: '68%', trend: 'neutral' },
  { label: 'Total Available Budget', value: '₱950K', change: '-75%', trend: 'down' }
];

const recentActivities: Activity[] = [
  { id: 1, action: 'PR-2024-001 submitted', time: '2 hours ago', user: 'John Doe' },
  { id: 2, action: 'BAC meeting scheduled', time: '4 hours ago', user: 'Jane Smith' },
  { id: 3, action: 'Report generated', time: '1 day ago', user: 'Admin' },
  { id: 4, action: 'PR-2024-002 approved', time: '2 days ago', user: 'Mary Johnson' }
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const { styles } = useTheme();

  const handleQuickAction = (actionId: string) => {
    console.log('Quick action clicked:', actionId);
    if (onNavigate) {
      console.log('Navigating to:', actionId);
      onNavigate(actionId);
    } else {
      console.log('onNavigate function not provided');
    }
  };

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-6">
        <h2 className={`text-2xl font-bold ${styles.textPrimary}`}>Welcome back, Admin!</h2>
        <p className={styles.textSecondary}>Here's what's happening with your procurement today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className={`text-xl font-semibold ${styles.textPrimary} mb-4`}>Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map(action => (
            <QuickActionCard 
              key={action.id} 
              action={action}
              onClick={() => handleQuickAction(action.id)}
            />
          ))}
        </div>
      </div>

      {/* For Approval Section */}
      <div className="mb-6">
        <h3 className={`text-xl font-semibold ${styles.textPrimary} mb-4`}>For Approval</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {approvalActions.map(action => (
            <QuickActionCard 
              key={action.id} 
              action={action}
              onClick={() => handleQuickAction(action.id)}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <ActivityFeed activities={recentActivities} />
    </>
  );
}
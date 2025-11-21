export interface NavItem {
  id: string;
  label: string;
  icon: any;
}

export interface QuickAction {
  id: string;
  title: string;
  icon: any;
  description: string;
  color: string;
}

export interface Activity {
  id: number;
  action: string;
  time: string;
  user: string;
}

export interface Stat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}
export interface HistoryItem {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'submitted';
  date: string;
  prNo?: string;
}
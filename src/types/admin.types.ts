export interface User {
  id: number;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  designation?: string;
  department?: string;
  status: 'Active' | 'Inactive';
}

export interface ActivityLog {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  ip: string;
}

export interface Designation {
  id: number;
  name: string;
  count: number;
}

export interface Unit {
  id: number;
  name: string;
  abbreviation: string;
}

export interface Item {
  id: number;
  name: string;
  category: string;
  unit: string;
}

export interface Stat {
  label: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

export interface RecentActivity {
  user: string;
  action: string;
  time: string;
}
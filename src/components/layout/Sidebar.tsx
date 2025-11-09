import { 
  Home,
  ShoppingCart,
  DollarSign,
  UserStar,
  Folder,
  Settings,
  Menu,
  X,
  User,
  LogOut
} from 'lucide-react';
import { NavItem } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  activeNav: string;
  onToggle: () => void;
  onNavClick: (navId: string) => void;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'project-procurement', label: 'Project Procurement', icon: ShoppingCart },
  { id: 'purchase-request', label: 'Purchase Request', icon: DollarSign },
  { id: 'reports', label: 'Reports', icon: Folder },
  { id: 'bac-menu', label: 'BAC Menu', icon: UserStar },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export function Sidebar({ isOpen, activeNav, onToggle, onNavClick }: SidebarProps) {
  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {isOpen && <h1 className="text-xl font-bold">GovProcure</h1>}
        <button 
          onClick={onToggle}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeNav === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-800 text-gray-300'
              }`}
            >
              <Icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-gray-800">
        <div className={`flex items-center gap-3 ${!isOpen && 'justify-center'}`}>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          {isOpen && (
            <div className="flex-1">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@gov.ph</p>
            </div>
          )}
        </div>
        {isOpen && (
          <button className="w-full mt-3 flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}

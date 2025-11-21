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
import { useState } from 'react';
import ProfileModal from '../../pages/ProfileModal';

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
  { id: 'mbo-approval', label: 'MBO Approval', icon: UserStar },
  { id: 'settings', label: 'Settings', icon: Settings }
];


export function Sidebar({ isOpen, activeNav, onToggle, onNavClick }: SidebarProps) {
  
  const [showProfileModal, setShowProfileModal] = useState(false);
  
    const handleLogout = () => {
    console.log('Logging out...');
  };

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
        <button
          onClick={() => setShowProfileModal(true)}
          className={`w-full flex items-center gap-3 hover:bg-gray-800 rounded-lg p-2 transition-colors ${!isOpen && 'justify-center'}`}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={20} />
          </div>
          {isOpen && (
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@gov.ph</p>
            </div>
          )}
        </button>
        
        {isOpen && (
          <button 
            onClick={handleLogout}
            className="w-full mt-3 flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        )}
      </div>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </aside>
  );
}

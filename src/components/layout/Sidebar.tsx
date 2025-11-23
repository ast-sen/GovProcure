// src/components/layout/Sidebar.tsx
import { 
  Home,
  ShoppingCart,
  DollarSign,
  UserCheck,
  Folder,
  Settings,
  Menu,
  X,
  User,
  LogOut,
  FolderOpen
} from 'lucide-react';
import { NavItem } from '../../types';
import { useState } from 'react';
import ProfileModal from '../../pages/ProfileModal';
import { useTheme } from '../../context/ThemeContext';

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
  { id: 'head-of-office', label: 'Head of Office', icon: UserCheck },
  { id: 'mbo-approval', label: 'MBO Approval', icon: FolderOpen },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export function Sidebar({ isOpen, activeNav, onToggle, onNavClick }: SidebarProps) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { darkMode, themeColors } = useTheme();

  // Sidebar can have its own dark variant or follow theme
  const sidebarBg = darkMode ? 'bg-black' : 'bg-gray-900';
  const sidebarBorder = darkMode ? 'border-gray-800' : 'border-gray-800';
  const sidebarHover = darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-800';

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} ${sidebarBg} text-white transition-all duration-300 flex flex-col`}>
      {/* Logo */}
      <div className={`p-5 flex items-center justify-between border-b ${sidebarBorder}`}>
        {isOpen && <h1 className="text-xl font-bold">GovProcure</h1>}
        <button 
          onClick={onToggle}
          className={`p-2 ${sidebarHover} rounded-lg transition-colors`}
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
                  ? `${themeColors.primary} text-white` 
                  : `${sidebarHover} text-gray-300`
              }`}
            >
              <Icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Profile */}
      <div className={`p-4 border-t ${sidebarBorder}`}>
        <button
          onClick={() => setShowProfileModal(true)}
          className={`w-full flex items-center gap-3 ${sidebarHover} rounded-lg p-2 transition-colors ${!isOpen && 'justify-center'}`}
        >
          <div className={`w-10 h-10 ${themeColors.primary} rounded-full flex items-center justify-center flex-shrink-0`}>
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
            className={`w-full mt-3 flex items-center gap-2 px-4 py-2 text-sm text-gray-300 ${sidebarHover} rounded-lg transition-colors`}
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
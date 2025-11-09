import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ReactNode, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
  activeNav: string;
  onNavChange: (navId: string) => void;
}

export function Layout({ children, activeNav, onNavChange }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        isOpen={sidebarOpen}
        activeNav={activeNav}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNavClick={onNavChange}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
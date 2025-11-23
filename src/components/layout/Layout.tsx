import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ReactNode, useState, createContext, useContext } from 'react';
import { useTheme } from '../../context/ThemeContext';

// Sidebar width constants
const SIDEBAR_EXPANDED_WIDTH = 256;
const SIDEBAR_COLLAPSED_WIDTH = 80;

interface SidebarContextType {
  sidebarWidth: number;
  isOpen: boolean;
}

const SidebarContext = createContext<SidebarContextType>({
  sidebarWidth: SIDEBAR_EXPANDED_WIDTH,
  isOpen: true,
});

export const useSidebarWidth = () => useContext(SidebarContext);

interface LayoutProps {
  children: ReactNode;
  activeNav: string;
  onNavChange: (navId: string) => void;
}

export function Layout({ children, activeNav, onNavChange }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { styles } = useTheme();

  const sidebarWidth = sidebarOpen ? SIDEBAR_EXPANDED_WIDTH : SIDEBAR_COLLAPSED_WIDTH;

  return (
    <SidebarContext.Provider value={{ sidebarWidth, isOpen: sidebarOpen }}>
      <div className={`flex h-screen ${styles.bgMain} transition-colors duration-300`}>
        <Sidebar 
          isOpen={sidebarOpen}
          activeNav={activeNav}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onNavClick={onNavChange}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className={`flex-1 overflow-auto p-6 ${styles.bgMain} transition-colors duration-300`}>
            {children}
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
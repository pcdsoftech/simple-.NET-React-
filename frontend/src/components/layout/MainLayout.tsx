import React, { useState, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
  backUrl?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  showBackButton = true,
  backUrl = '/'
}) => {
  // Sidebar closed by default on mobile
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Function to close sidebar (for overlay/menu item click)
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onToggleSidebar={() => setSidebarOpen(true)} />

      {showBackButton && (
        <div className="mt-5 px-5 text-gray-600 text-sm">
          <a href={backUrl}>
            <FontAwesomeIcon icon={faChevronLeft} size="xs" /> back
          </a>
        </div>
      )}

      <div className="flex flex-1 relative">
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onClose={handleCloseSidebar}
        />

        <main className="flex-1 pt-4 px-2 sm:px-4 md:py-5">
          <div className="max-w-4xl w-full mx-auto">
            <h1 className="text-xl md:text-2xl font-bold mb-3 pb-3">
              {title}
            </h1>
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
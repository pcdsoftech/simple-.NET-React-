import React, { useState } from 'react';
import { Users } from "lucide-react";
import { Button } from "../ui/SidebarButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight, faUser, faHome, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../../hooks/useAuth';

type SidebarProps = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, onClose }) => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const menuItems = [
    { icon: faHome, label: 'Home', href: '/dashboard' },
    { icon: faUser, label: 'Profile', href: '/profile' },
    { icon: faCog, label: 'Settings', href: '/settings' },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-30 lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Staff Hub</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-3" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
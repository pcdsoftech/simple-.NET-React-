import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ChevronDown } from 'lucide-react';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { mockUser } from '../../types/user';
import ThemeToggle from '../ui/ThemeToggle';

type HeaderProps = {
  onToggleSidebar: () => void;
};

const navItems = ['Home', 'Provider', 'Content', 'Listing', 'Form', 'Banner', 'Student', 'Report'];

const Header: React.FC<HeaderProps> = () => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle clicks outside the drawer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerOpen]);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:bg-gray-900">
          <h2 className="font-bold text-xl dark:hover:bg-gray-800 text-gray-700 dark:text-white">Menu</h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>
        <nav className="flex flex-col p-4 bg-white dark:bg-gray-900">
          {navItems.map((item, idx) => (
            <a
              href="#"
              key={idx}
              onClick={() => setDrawerOpen(false)}
              className="py-3 px-2 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-white"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
                <FontAwesomeIcon icon={faBell} className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
                <FontAwesomeIcon icon={faQuestion} className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header; 
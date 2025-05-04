import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Card from '../ui/Card';

const PermissionsSection: React.FC = () => {
  const permissions = [
    {
      name: 'View Dashboard',
      description: 'Access to view the main dashboard',
      granted: true,
    },
    {
      name: 'Manage Users',
      description: 'Create, edit, and delete user accounts',
      granted: true,
    },
    {
      name: 'View Reports',
      description: 'Access to view and generate reports',
      granted: false,
    },
    {
      name: 'System Settings',
      description: 'Modify system-wide settings',
      granted: false,
    },
  ];

  return (
    <Card className="bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-3 mb-6">
        <FontAwesomeIcon
          icon={faUserShield}
          className="w-6 h-6 text-blue-500 dark:text-blue-400"
        />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Permissions
        </h2>
      </div>

      <div className="space-y-4">
        {permissions.map((permission, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {permission.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {permission.description}
              </p>
            </div>
            <div className="flex items-center">
              {permission.granted ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="w-5 h-5 text-green-500 dark:text-green-400"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faTimes}
                  className="w-5 h-5 text-red-500 dark:text-red-400"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PermissionsSection; 

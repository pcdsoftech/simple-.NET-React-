import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import ChangePasswordForm from './ChangePasswordForm';
import Card from '../ui/Card';

type SecuritySectionProps = {
  showChangePassword: boolean;
  onShowChangePassword: (show: boolean) => void;
};

const SecuritySection: React.FC<SecuritySectionProps> = ({
  showChangePassword,
  onShowChangePassword,
}) => {
  return (
    <Card className="bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon
            icon={faShieldAlt}
            className="w-6 h-6 text-blue-500 dark:text-blue-400"
          />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Security Settings
          </h2>
        </div>
      </div>

      {showChangePassword ? (
        <ChangePasswordForm onCancel={() => onShowChangePassword(false)} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faLock}
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Password</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last changed 3 months ago
                </p>
              </div>
            </div>
            <button
              onClick={() => onShowChangePassword(true)}
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SecuritySection; 
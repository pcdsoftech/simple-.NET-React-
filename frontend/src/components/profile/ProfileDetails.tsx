import React, { useRef, useState } from 'react';
import { mockUser, User } from '../../types/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Card from '../ui/Card';

type ProfileDetailsProps = {
  user: User;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | undefined>(mockUser.avatar);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="flex flex-col items-center justify-center w-full mb-8 bg-white dark:bg-gray-800 px-4 py-6">
      <div className="flex flex-col items-center w-full">
        <div className="relative w-24 h-24 mb-4">
          <img
            src={avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-md"
          />
          <button
            onClick={handleAvatarClick}
            className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white w-9 h-9 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Change avatar"
          >
            <FontAwesomeIcon icon={faPen} size="sm" />
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        <div className="text-center w-full">
          <div className="mb-2">
            <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Full name</span>
            <span className="block text-lg md:text-xl font-bold text-gray-900 dark:text-white break-words">{user.name}</span>
          </div>
          <div>
            <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</span>
            <span className="block text-base md:text-lg text-gray-900 dark:text-gray-100 break-all">{user.email}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileDetails;
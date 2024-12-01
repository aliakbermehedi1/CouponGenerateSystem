import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DropdownNotification from './DropdownNotification';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownMessage from './DropdownMessage';
import DropdownUser from './DropdownUser';
import Logo from '../images/logo/mainLogo.png';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  // Handle Logout Function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage

      const response = await fetch(
        'https://arabian-hunter-backend.vercel.app/api/userInfo/logout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        // Clear relevant localStorage items
        const keysToRemove = [
          'jwtToken',
          'UserName',
          'BranchName',
          'RollName',
          'LoginID',
        ];
        keysToRemove.forEach((key) => localStorage.removeItem(key));

        // Navigate to the login page
        navigate('/auth/signin');
      } else {
        console.error('Failed to logout:', data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="sticky top-0 z-[999] flex w-full bg-[#1565C0] shadow-lg dark:bg-boxdark">
      <div className="flex flex-grow items-center justify-between py-4 px-4 md:px-6 2xl:px-11">
        {/* Sidebar Toggle and Logo */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Sidebar Toggle */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              {/* Icon Lines */}
              <span className="absolute right-0 h-full w-full">
                {['delay-0', 'delay-150', 'delay-200'].map((delay, idx) => (
                  <span
                    key={idx}
                    className={`my-1 block h-0.5 w-0 rounded-sm bg-white duration-200 dark:bg-white ${
                      !sidebarOpen && `${delay} !w-full`
                    }`}
                  ></span>
                ))}
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-white duration-200 dark:bg-white ${
                    !sidebarOpen && '!h-0 delay-0'
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-white duration-200 dark:bg-white ${
                    !sidebarOpen && '!h-0 delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>

          {/* Logo */}
          <Link to="/" className="block flex-shrink-0 lg:hidden">
            <img src={Logo} alt="Logo" className="w-20 h-12" />
          </Link>
        </div>

        {/* Right-Side Content */}
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-4">
            <DarkModeSwitcher />
            <DropdownNotification />
            <DropdownMessage />
          </ul>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-6 py-2 text-white border-2 border-[#FDE047] rounded-full hover:bg-[#3178C8] font-semibold"
          >
            Logout
          </button>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;

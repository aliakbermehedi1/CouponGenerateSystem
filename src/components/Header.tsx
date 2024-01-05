import DropdownNotification from './DropdownNotification';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownMessage from './DropdownMessage';
import Logo from '../images/logo/mainLogo.png';
import DropdownUser from './DropdownUser';
import React, { useState } from 'react';

const Header: React.FC<{
  sidebarOpen: boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}> = ({ sidebarOpen, setSidebarOpen }) => {
  // START LOGOUT
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('jwtToken'); // Replace with your actual token key

      // Make a POST request to the logout endpoint on your server
      const response = await fetch(
        'http://localhost:8080/api/userInfo/logout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Attach the token to the Authorization header
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        // Clear the token from localStorage
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('UserName');
        localStorage.removeItem('BranchName');
        localStorage.removeItem('RollName');
        localStorage.removeItem('LoginID');

        // Redirect to the login page or any other page after successful logout
        navigate('/auth/signin');
      } else {
        // Handle logout failure, e.g., show an error message
        console.error('Failed to logout:', data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  // END LOGOUT

  return (
    <header className="sticky top-0 z-999 flex w-full bg-[#1565C0] drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen); // Corrected this line
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-white delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-300' // Corrected this line
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-white delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-white delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-white delay-300 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-white duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={Logo} alt="Logo" className="w-20 h-12" />
          </Link>
        </div>

        <div className="hidden sm:block">
        
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
            {/* <!-- Chat Notification Area --> */}
          </ul>

          <div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 text-white border-[2px] border-[#FDE047] rounded-full hover:bg-[#3178C8] font-semibold"
            >
              Logout
            </button>
          </div>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;

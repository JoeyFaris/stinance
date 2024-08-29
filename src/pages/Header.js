import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaUser } from 'react-icons/fa';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <FaChartLine className="h-8 w-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl text-blue-800">FinTrack</span>
          </div>
          <nav className="flex items-center">
            <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
            <Link to="/expenses" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Expenses</Link>
            <Link to="/investments" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Investments</Link>
            <Link to="/reports" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Reports</Link>
            <div className="relative ml-3">
              <div>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaUser className="h-6 w-6" />
                </button>
              </div>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign In</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Create Account</a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
